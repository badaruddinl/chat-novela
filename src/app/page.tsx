"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  ChatComposer,
  ChatHeader,
  ChatSidebar,
  ChatThread,
} from "@/components/sections/chat";

type MessageVersion = {
  id: string;
  content: string;
  createdAt: string;
  versionNumber: number;
};

type ApiMessageVersion = {
  id: string;
  content: string;
  created_at: string;
  version_number: number;
};

type ApiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  active_version_id?: string | null;
  versions?: ApiMessageVersion[];
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  versions?: MessageVersion[];
  activeVersionId?: string | null;
};

type Conversation = {
  id: string;
  title: string;
  updatedAt: string;
  lastMessageRole: "user" | "assistant" | null;
  lastMessageContent: string | null;
  lastMessageCreatedAt: string | null;
};

type ApiConversation = {
  id: string;
  title: string;
  updated_at: string;
  last_message_role: "user" | "assistant" | null;
  last_message_content: string | null;
  last_message_created_at: string | null;
};

const normalizeMessages = (apiMessages: ApiMessage[]): Message[] =>
  apiMessages.map((message) => ({
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.created_at,
    activeVersionId: message.active_version_id ?? null,
    versions: message.versions?.map((version) => ({
      id: version.id,
      content: version.content,
      createdAt: version.created_at,
      versionNumber: version.version_number,
    })),
  }));

const normalizeConversations = (
  apiConversations: ApiConversation[]
): Conversation[] =>
  apiConversations.map((conversation) => ({
    id: conversation.id,
    title: conversation.title,
    updatedAt: conversation.updated_at,
    lastMessageRole: conversation.last_message_role,
    lastMessageContent: conversation.last_message_content,
    lastMessageCreatedAt: conversation.last_message_created_at,
  }));

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revisionTargetId, setRevisionTargetId] = useState<string | null>(null);
  const [revisionDraft, setRevisionDraft] = useState("");
  const [regenerateTargetId, setRegenerateTargetId] = useState<string | null>(
    null
  );
  const [autoScroll, setAutoScroll] = useState(true);
  const [isThreadScrolled, setIsThreadScrolled] = useState(false);
  const [isComposerHidden, setIsComposerHidden] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const refreshConversations = async () => {
    try {
      const response = await fetch("/api/conversations");
      const data = (await response.json()) as {
        conversations: ApiConversation[];
      };
      if (!response.ok) {
        setError("Gagal memuat daftar chat.");
        return [];
      }
      const normalized = normalizeConversations(data.conversations);
      setConversations(normalized);
      return normalized;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat daftar chat."
      );
      return [];
    }
  };

  useEffect(() => {
    void refreshConversations().then((data) => {
      if (data.length > 0) {
        setActiveConversationId(data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!activeConversationId) return;
    void fetch(`/api/messages?conversationId=${activeConversationId}`)
      .then((res) => res.json())
      .then((data) => setMessages(normalizeMessages(data.messages)));
  }, [activeConversationId]);

  useEffect(() => {
    if (!autoScroll) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, autoScroll]);

  const memoryItems = useMemo(
    () =>
      conversations.map((conversation) => {
        const previewContent =
          conversation.lastMessageContent &&
          conversation.lastMessageContent.length > 80
            ? `${conversation.lastMessageContent.slice(0, 80)}…`
            : conversation.lastMessageContent;
        return {
          id: conversation.id,
          title: conversation.title,
          role: conversation.lastMessageRole,
          preview: previewContent ?? "Belum ada pesan.",
          updatedAt: conversation.updatedAt,
          lastMessageCreatedAt: conversation.lastMessageCreatedAt,
        };
      }),
    [conversations]
  );

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    let targetConversationId = activeConversationId;
    if (!targetConversationId) {
      try {
        const response = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Percakapan Baru" }),
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.error ?? "Gagal membuat percakapan baru.");
          return;
        }
        targetConversationId = data.conversationId;
        setActiveConversationId(targetConversationId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal membuat percakapan baru."
        );
        return;
      }
    }
    setIsSending(true);
    setError(null);
    setAutoScroll(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: trimmed,
          conversationId: targetConversationId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal mengirim pesan.");
        return;
      }
      setMessages(normalizeMessages(data.messages));
      setInput("");
      void refreshConversations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim pesan.");
    } finally {
      setIsSending(false);
    }
  };

  const handlePartialRevision = async (
    messageId: string,
    instruction: string
  ) => {
    const trimmed = instruction.trim();
    if (!trimmed) return;
    setIsSending(true);
    setError(null);
    setAutoScroll(true);

    try {
      const response = await fetch("/api/revise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId,
          instruction: trimmed,
          mode: "partial",
          conversationId: activeConversationId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal melakukan revisi.");
        return;
      }
      setMessages(normalizeMessages(data.messages));
      setRevisionTargetId(null);
      setRevisionDraft("");
      void refreshConversations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal melakukan revisi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleRegenerate = async (messageId: string) => {
    setIsSending(true);
    setError(null);
    setAutoScroll(true);

    try {
      const response = await fetch("/api/revise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId,
          mode: "regenerate",
          conversationId: activeConversationId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal melakukan regenerate.");
        return;
      }
      setMessages(normalizeMessages(data.messages));
      setRegenerateTargetId(null);
      void refreshConversations();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal melakukan regenerate."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSwitchVersion = async (messageId: string, versionId: string) => {
    setIsSending(true);
    setError(null);
    setAutoScroll(true);
    try {
      const response = await fetch("/api/revise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, mode: "switch", versionId }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal mengganti versi.");
        return;
      }
      setMessages(normalizeMessages(data.messages));
      void refreshConversations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengganti versi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleScroll = (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ) => {
    const bottomOffset = scrollHeight - scrollTop - clientHeight;
    setAutoScroll(bottomOffset < 120);
    setIsThreadScrolled(scrollTop > 12);
  };

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setRevisionTargetId(null);
    setRevisionDraft("");
    setRegenerateTargetId(null);
    setError(null);
    setAutoScroll(false);
  };

  const handleCreateConversation = async () => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Percakapan Baru" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal membuat percakapan baru.");
        return;
      }
      setMessages([]);
      setActiveConversationId(data.conversationId);
      void refreshConversations();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal membuat percakapan baru."
      );
    } finally {
      setIsSending(false);
    }
  };

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === activeConversationId
      ),
    [conversations, activeConversationId]
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <ChatSidebar
        items={memoryItems.map((item) => ({
          id: item.id,
          title: item.title,
          preview: item.preview,
          updatedAtLabel: new Date(item.updatedAt).toLocaleString("id-ID"),
        }))}
        activeId={activeConversationId}
        totalCount={conversations.length}
        isSending={isSending}
        isCollapsed={isSidebarCollapsed}
        onCreate={handleCreateConversation}
        onSelect={handleSelectConversation}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      <div className="flex flex-1 flex-col">
        <ChatHeader
          title={activeConversation?.title ?? "Asisten penulisan novel"}
          subtitle="Tulis prompt atau bab, dan gunakan revisi sebagian atau regenerate total langsung dari respons."
        />

        <ChatThread
          messages={messages}
          isSending={isSending}
          revisionTargetId={revisionTargetId}
          revisionDraft={revisionDraft}
          regenerateTargetId={regenerateTargetId}
          onOpenRevision={(messageId) => {
            setRevisionTargetId(messageId);
            setRevisionDraft("");
            setRegenerateTargetId(null);
          }}
          onOpenRegenerate={(messageId) => {
            setRegenerateTargetId(messageId);
            setRevisionTargetId(null);
            setRevisionDraft("");
          }}
          onCancelRevision={() => {
            setRevisionTargetId(null);
            setRevisionDraft("");
          }}
          onCancelRegenerate={() => setRegenerateTargetId(null)}
          onRevisionDraftChange={setRevisionDraft}
          onPartialRevision={handlePartialRevision}
          onRegenerate={handleRegenerate}
          onSwitchVersion={handleSwitchVersion}
          onScroll={handleScroll}
          messagesContainerRef={messagesContainerRef}
          messagesEndRef={messagesEndRef}
        />

        <ChatComposer
          value={input}
          isSending={isSending}
          error={error}
          isCompact={isThreadScrolled}
          isHidden={isComposerHidden}
          onToggleHidden={() => setIsComposerHidden((prev) => !prev)}
          onChange={setInput}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}
