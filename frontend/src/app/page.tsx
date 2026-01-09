"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Icon } from "@iconify/react";
import {
  ChatComposer,
  ChatHeader,
  NewChatComposer,
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
  hidden?: boolean;
  versions?: ApiMessageVersion[];
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  versions?: MessageVersion[];
  activeVersionId?: string | null;
  hidden?: boolean;
};

type Conversation = {
  id: string;
  title: string;
  updatedAt: string;
  pinned: boolean;
  lastMessageRole: "user" | "assistant" | null;
  lastMessageContent: string | null;
  lastMessageCreatedAt: string | null;
};

type ApiConversation = {
  id: string;
  title: string;
  updated_at: string;
  pinned: boolean;
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
    hidden: message.hidden ?? false,
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
    pinned: conversation.pinned,
    lastMessageRole: conversation.last_message_role,
    lastMessageContent: conversation.last_message_content,
    lastMessageCreatedAt: conversation.last_message_created_at,
  }));

const getDraftKey = (conversationId: string | null) =>
  `chat-draft:${conversationId ?? "new"}`;

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    const key = getDraftKey(activeConversationId);
    const stored =
      typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    setInput(stored ?? "");
    if (!activeConversationId) {
      setMessages([]);
    }
  }, [activeConversationId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = getDraftKey(activeConversationId);
    if (input.trim().length === 0) {
      sessionStorage.removeItem(key);
      return;
    }
    sessionStorage.setItem(key, input);
  }, [input, activeConversationId]);

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
          pinned: conversation.pinned,
        };
      }),
    [conversations]
  );

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setIsSending(true);
    setError(null);
    setAutoScroll(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: trimmed,
          conversationId: activeConversationId ?? undefined,
        }),
      });

      const data = (await response.json()) as {
        messages: ApiMessage[];
        conversationId?: string;
        error?: string;
      };
      if (!response.ok) {
        setError(data.error ?? "Gagal mengirim pesan.");
        return;
      }
      const nextConversationId =
        activeConversationId ?? data.conversationId ?? null;
      if (!activeConversationId && nextConversationId) {
        setActiveConversationId(nextConversationId);
      }
      setMessages(normalizeMessages(data.messages));
      setInput("");
      if (nextConversationId) {
        sessionStorage.removeItem(getDraftKey(nextConversationId));
      }
      sessionStorage.removeItem(getDraftKey(null));
      void refreshConversations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim pesan.");
    } finally {
      setIsSending(false);
    }
  };

  const applyMessagesResponse = async (
    response: Response,
    fallbackError: string
  ) => {
    const data = (await response.json()) as {
      messages?: ApiMessage[];
      error?: string;
    };
    if (!response.ok) {
      setError(data.error ?? fallbackError);
      return;
    }
    setMessages(normalizeMessages(data.messages ?? []));
    void refreshConversations();
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

  const handleHideMessage = async (messageId: string) => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages/${messageId}/hide`, {
        method: "POST",
      });
      await applyMessagesResponse(response, "Gagal menyembunyikan pesan.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menyembunyikan pesan."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleUnhideMessage = async (messageId: string) => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages/${messageId}/unhide`, {
        method: "POST",
      });
      await applyMessagesResponse(response, "Gagal menampilkan pesan.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menampilkan pesan.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      await applyMessagesResponse(response, "Gagal menghapus pesan.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus pesan.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteMessageVersion = async (
    messageId: string,
    versionId: string
  ) => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/messages/${messageId}/versions/${versionId}`,
        { method: "DELETE" }
      );
      await applyMessagesResponse(response, "Gagal menghapus versi.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus versi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleLockVersion = async (messageId: string, versionId: string) => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages/${messageId}/lock-version`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionId }),
      });
      await applyMessagesResponse(response, "Gagal mengunci versi.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunci versi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyalin pesan.");
    }
  };

  const handleShareMessage = async (content: string) => {
    if (typeof navigator === "undefined") return;
    if ("share" in navigator) {
      try {
        await navigator.share({ text: content });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Gagal share pesan.");
        return;
      }
    }
    await handleCopyMessage(content);
  };

  const handleShareConversation = async (conversationId: string) => {
    const conversation = conversations.find(
      (item) => item.id === conversationId
    );
    const baseText = conversation
      ? `${conversation.title}\n${conversation.lastMessageContent ?? ""}`.trim()
      : conversationId;
    if ("share" in navigator) {
      try {
        await navigator.share({ text: baseText });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Gagal share chat.");
        return;
      }
    }
    await handleCopyMessage(baseText);
  };

  const handleTogglePinConversation = async (
    conversationId: string,
    pinned: boolean
  ) => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/conversations/${conversationId}/${pinned ? "unpin" : "pin"}`,
        { method: "POST" }
      );
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Gagal memperbarui sematan.");
        return;
      }
      void refreshConversations();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memperbarui sematan."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(`/api/conversations/${conversationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Gagal menghapus chat.");
        return;
      }
      const updated = await refreshConversations();
      if (activeConversationId === conversationId) {
        setActiveConversationId(updated[0]?.id ?? null);
      }
      setMessages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus chat.");
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
    setIsSidebarOpen(false);
  };

  const handleStartNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
    setRevisionTargetId(null);
    setRevisionDraft("");
    setRegenerateTargetId(null);
    setError(null);
    setAutoScroll(false);
    setIsSidebarOpen(false);
  };

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === activeConversationId
      ),
    [conversations, activeConversationId]
  );

  const isDraftConversation = activeConversationId === null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <ChatSidebar
        items={memoryItems.map((item) => ({
          id: item.id,
          title: item.title,
          preview: item.preview,
          updatedAtLabel: new Date(item.updatedAt).toLocaleString("id-ID"),
          pinned: item.pinned,
        }))}
        activeId={activeConversationId}
        totalCount={conversations.length}
        isSending={isSending}
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isSidebarOpen}
        isDraft={isDraftConversation}
        onCreate={handleStartNewChat}
        onSelect={handleSelectConversation}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        onCloseMobile={() => setIsSidebarOpen(false)}
        onShareConversation={handleShareConversation}
        onTogglePinConversation={handleTogglePinConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        {isDraftConversation && !isSidebarOpen && (
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-200 transition hover:border-slate-600 lg:hidden"
            aria-label="Buka sidebar"
          >
            <Icon icon="solar:hamburger-menu-linear" className="text-lg" />
          </button>
        )}
        {!isDraftConversation && (
          <ChatHeader
            title={activeConversation?.title ?? "Chat Baru"}
            // subtitle={
            //   isDraftConversation
            //     ? "Mulai dengan menulis prompt pertama Anda."
            //     : "Tulis prompt atau bab, dan gunakan revisi sebagian atau regenerate total langsung dari respons."
            // }
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          />
        )}

        <ChatThread
          messages={messages}
          isSending={isSending}
          revisionTargetId={revisionTargetId}
          revisionDraft={revisionDraft}
          regenerateTargetId={regenerateTargetId}
          onCopyMessage={handleCopyMessage}
          onShareMessage={handleShareMessage}
          onHideMessage={handleHideMessage}
          onUnhideMessage={handleUnhideMessage}
          onDeleteMessage={handleDeleteMessage}
          onDeleteMessageVersion={handleDeleteMessageVersion}
          onLockVersion={handleLockVersion}
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

        {isDraftConversation ? (
          <NewChatComposer
            value={input}
            isSending={isSending}
            error={error}
            onChange={setInput}
            onSend={sendMessage}
          />
        ) : (
          <ChatComposer
            value={input}
            isSending={isSending}
            error={error}
            isCompact={isThreadScrolled}
            isHidden={isComposerHidden}
            isEmpty={messages.length === 0}
            onToggleHidden={() => setIsComposerHidden((prev) => !prev)}
            onChange={setInput}
            onSend={sendMessage}
          />
        )}
      </div>
    </div>
  );
}
