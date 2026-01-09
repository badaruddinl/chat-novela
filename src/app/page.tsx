"use client";

import { useState, useEffect, useMemo, useRef } from "react";

type MessageVersion = {
  id: number;
  content: string;
  createdAt: string;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  versions?: MessageVersion[];
  activeVersionId?: number | null;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revisionTargetId, setRevisionTargetId] = useState<number | null>(null);
  const [revisionDraft, setRevisionDraft] = useState("");
  const [regenerateTargetId, setRegenerateTargetId] = useState<number | null>(
    null
  );
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef(new Map<number, HTMLDivElement>());

  useEffect(() => {
    void fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, autoScroll]);

  const memoryItems = useMemo(
    () =>
      messages.slice(-12).map((message) => ({
        id: message.id,
        role: message.role,
        activeVersionId: message.activeVersionId,
        preview:
          message.content.length > 80
            ? `${message.content.slice(0, 80)}…`
            : message.content,
        createdAt: message.createdAt,
      })),
    [messages]
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
        body: JSON.stringify({ content: trimmed }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal mengirim pesan.");
        return;
      }
      setMessages(data.messages);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim pesan.");
    } finally {
      setIsSending(false);
    }
  };

  const handlePartialRevision = async (
    messageId: number,
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
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal melakukan revisi.");
        return;
      }
      setMessages(data.messages);
      setRevisionTargetId(null);
      setRevisionDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal melakukan revisi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleRegenerate = async (messageId: number) => {
    setIsSending(true);
    setError(null);
    setAutoScroll(true);

    try {
      const response = await fetch("/api/revise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, mode: "regenerate" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Gagal melakukan regenerate.");
        return;
      }
      setMessages(data.messages);
      setRegenerateTargetId(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal melakukan regenerate."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSwitchVersion = async (messageId: number, versionId: number) => {
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
      setMessages(data.messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengganti versi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const bottomOffset =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setAutoScroll(bottomOffset < 120);
  };

  const handleJumpToMessage = (messageId: number) => {
    const node = messageRefs.current.get(messageId);
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-950/80 p-6 lg:flex">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Memory
            </p>
            <h2 className="text-lg font-semibold text-white">Riwayat Chat</h2>
          </div>
          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">
            {messages.length}
          </span>
        </div>
        <div className="mt-6 space-y-4 overflow-y-auto pr-1">
          {memoryItems.length === 0 ? (
            <p className="text-sm text-slate-400">
              Belum ada percakapan. Mulai menulis untuk menyimpan memory.
            </p>
          ) : (
            memoryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleJumpToMessage(item.id)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-left transition hover:border-slate-600 hover:bg-slate-900/80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-slate-500">
                    {item.role}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] text-slate-500">
                    {item.activeVersionId ? `v${item.activeVersionId}` : ""}
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-200">{item.preview}</p>
              </button>
            ))
          )}
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-slate-800 px-6 py-5">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Novel Chat
            </p>
            <h1 className="text-2xl font-semibold text-white">
              Asisten penulisan novel dengan revisi instan.
            </h1>
            <p className="text-sm text-slate-400">
              Tulis prompt atau bab, dan gunakan revisi sebagian atau regenerate
              total langsung dari respons.
            </p>
          </div>
        </header>

        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-8"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400">
                Belum ada pesan. Mulai dengan prompt pertama Anda.
              </div>
            ) : (
              messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      ref={(node) => {
                        if (!node) {
                          messageRefs.current.delete(message.id);
                          return;
                        }
                        messageRefs.current.set(message.id, node);
                      }}
                      className="w-full max-w-2xl space-y-4"
                    >
                      <div
                        className={`rounded-2xl border px-5 py-4 shadow-sm ${
                          isUser
                            ? "ml-auto border-blue-500/40 bg-blue-500/10"
                            : "border-slate-800 bg-slate-900/60"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
                          <span>{message.role}</span>
                          <span>
                            {new Date(message.createdAt).toLocaleString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                        <div className="mt-3 space-y-3 text-sm leading-6 text-slate-100">
                          {message.content.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      </div>

                      {message.role === "assistant" && message.versions && (
                        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            {message.versions.map((version) => (
                              <button
                                key={version.id}
                                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                  version.id === message.activeVersionId
                                    ? "border-amber-400 bg-amber-400/10 text-amber-200"
                                    : "border-slate-700 text-slate-300 hover:border-slate-500"
                                }`}
                                onClick={() =>
                                  handleSwitchVersion(message.id, version.id)
                                }
                                disabled={isSending}
                              >
                                {`v${version.id}`}
                              </button>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => {
                                setRevisionTargetId(message.id);
                                setRevisionDraft("");
                                setRegenerateTargetId(null);
                              }}
                              disabled={isSending}
                              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Revisi Sebagian
                            </button>
                            <button
                              onClick={() => {
                                setRegenerateTargetId(message.id);
                                setRevisionTargetId(null);
                                setRevisionDraft("");
                              }}
                              disabled={isSending}
                              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Regenerate Total
                            </button>
                          </div>
                          {revisionTargetId === message.id && (
                            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Instruksi Revisi
                              </p>
                              <textarea
                                rows={3}
                                value={revisionDraft}
                                onChange={(event) =>
                                  setRevisionDraft(event.target.value)
                                }
                                placeholder="Contoh: rapikan paragraf kedua, kurangi repetisi..."
                                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                              />
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() =>
                                    handlePartialRevision(
                                      message.id,
                                      revisionDraft
                                    )
                                  }
                                  disabled={isSending || !revisionDraft.trim()}
                                  className="rounded-full bg-amber-300 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  Kirim Revisi
                                </button>
                                <button
                                  onClick={() => {
                                    setRevisionTargetId(null);
                                    setRevisionDraft("");
                                  }}
                                  disabled={isSending}
                                  className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  Batal
                                </button>
                              </div>
                            </div>
                          )}
                          {regenerateTargetId === message.id && (
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-400/40 bg-amber-500/10 p-3">
                              <p className="text-sm text-amber-100">
                                Regenerate total akan membuat versi baru.
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleRegenerate(message.id)}
                                  disabled={isSending}
                                  className="rounded-full bg-amber-300 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  Lanjutkan
                                </button>
                                <button
                                  onClick={() => setRegenerateTargetId(null)}
                                  disabled={isSending}
                                  className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  Batal
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="border-t border-slate-800 px-6 py-6">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
            <textarea
              rows={3}
              placeholder="Tulis prompt atau bab..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full resize-none rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-slate-500">
                {error ? (
                  <span className="text-rose-300">{error}</span>
                ) : (
                  "Tekan kirim untuk menambahkan prompt ke percakapan."
                )}
              </div>
              <button
                onClick={sendMessage}
                disabled={isSending}
                className="rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
