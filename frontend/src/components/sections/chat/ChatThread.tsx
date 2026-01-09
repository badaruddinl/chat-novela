import { useState, type RefObject } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { MessageBubble } from "@/components/chat/MessageBubble";

type MessageVersion = {
  id: string;
  content: string;
  createdAt: string;
  versionNumber: number;
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

type ChatThreadProps = {
  messages: Message[];
  isSending: boolean;
  revisionTargetId: string | null;
  revisionDraft: string;
  regenerateTargetId: string | null;
  onCopyMessage: (content: string) => void;
  onShareMessage: (content: string) => void;
  onHideMessage: (messageId: string) => void;
  onUnhideMessage: (messageId: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onLockVersion: (messageId: string, versionId: string) => void;
  onOpenRevision: (messageId: string) => void;
  onOpenRegenerate: (messageId: string) => void;
  onCancelRevision: () => void;
  onCancelRegenerate: () => void;
  onRevisionDraftChange: (value: string) => void;
  onPartialRevision: (messageId: string, instruction: string) => void;
  onRegenerate: (messageId: string) => void;
  onSwitchVersion: (messageId: string, versionId: string) => void;
  onScroll: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
  messagesContainerRef: RefObject<HTMLDivElement>;
  messagesEndRef: RefObject<HTMLDivElement>;
};

export function ChatThread({
  messages,
  isSending,
  revisionTargetId,
  revisionDraft,
  regenerateTargetId,
  onCopyMessage,
  onShareMessage,
  onHideMessage,
  onUnhideMessage,
  onDeleteMessage,
  onLockVersion,
  onOpenRevision,
  onOpenRegenerate,
  onCancelRevision,
  onCancelRegenerate,
  onRevisionDraftChange,
  onPartialRevision,
  onRegenerate,
  onSwitchVersion,
  onScroll,
  messagesContainerRef,
  messagesEndRef,
}: ChatThreadProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div
      ref={messagesContainerRef}
      onScroll={(event) => {
        const target = event.currentTarget;
        onScroll(target.scrollTop, target.scrollHeight, target.clientHeight);
      }}
      className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {messages.length === 0 ? (
          <Card
            variant="outline"
            className="border-dashed bg-slate-900/40 p-8 text-center text-slate-400"
          >
            Belum ada pesan. Mulai dengan prompt pertama Anda.
          </Card>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="flex w-full animate-fade-up"
            >
              <div className="w-full space-y-4">
                {message.hidden ? (
                  <Card
                    variant="outline"
                    className="border-dashed bg-slate-900/40 px-4 py-3 text-sm text-slate-400"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>Pesan disembunyikan.</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          variant="outline"
                          tone="neutral"
                          onClick={() => {
                            setOpenMenuId(null);
                            onUnhideMessage(message.id);
                          }}
                          disabled={isSending}
                        >
                          Tampilkan
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <MessageBubble
                    role={message.role}
                    createdAt={message.createdAt}
                    content={message.content}
                    meta={
                      message.role === "assistant" &&
                      (message.versions?.length ?? 0) > 0 ? (
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          {message.versions?.map((version) => (
                            <button
                              key={version.id}
                              type="button"
                              onClick={() =>
                                onSwitchVersion(message.id, version.id)
                              }
                              disabled={isSending}
                              className={`rounded-full border px-3 py-1 text-[10px] font-semibold transition ${
                                version.id === message.activeVersionId
                                  ? "border-amber-400/60 bg-amber-400/10 text-amber-100"
                                  : "border-slate-700 text-slate-200 hover:border-slate-500"
                              }`}
                            >
                              {`v${version.versionNumber}`}
                            </button>
                          ))}
                        </div>
                      ) : null
                    }
                    actions={
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((prev) =>
                              prev === message.id ? null : message.id
                            )
                          }
                          className="rounded-full border border-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-200 transition hover:border-slate-500"
                        >
                          ...
                        </button>
                        {openMenuId === message.id && (
                          <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-950/95 p-2 shadow-lg">
                            <button
                              type="button"
                              className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:bg-slate-800/60"
                              onClick={() => {
                                setOpenMenuId(null);
                                onCopyMessage(message.content);
                              }}
                            >
                              Copy
                            </button>
                            {message.role === "assistant" && (
                              <button
                                type="button"
                                className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:bg-slate-800/60"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  onShareMessage(message.content);
                                }}
                              >
                                Share
                              </button>
                            )}
                            {message.role === "assistant" && (
                              <>
                                <button
                                  type="button"
                                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:bg-slate-800/60"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onOpenRevision(message.id);
                                  }}
                                  disabled={isSending}
                                >
                                  Revisi Sebagian
                                </button>
                                <button
                                  type="button"
                                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:bg-slate-800/60"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onOpenRegenerate(message.id);
                                  }}
                                  disabled={isSending}
                                >
                                  Regenerate Total
                                </button>
                                <button
                                  type="button"
                                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:bg-slate-800/60"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onHideMessage(message.id);
                                  }}
                                  disabled={isSending}
                                >
                                  Sembunyikan
                                </button>
                              </>
                            )}
                            {message.role === "assistant" &&
                              (message.versions?.length ?? 0) > 1 &&
                              message.activeVersionId && (
                                <button
                                  type="button"
                                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:bg-slate-800/60"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onLockVersion(
                                      message.id,
                                      message.activeVersionId as string
                                    );
                                  }}
                                  disabled={isSending}
                                >
                                  Kunci Versi Aktif
                                </button>
                              )}
                            {message.role === "assistant" &&
                              (message.versions?.length ?? 0) > 1 && (
                                <button
                                  type="button"
                                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-200 transition hover:bg-rose-500/10"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onDeleteMessage(message.id);
                                  }}
                                  disabled={isSending}
                                >
                                  Hapus
                                </button>
                              )}
                          </div>
                        )}
                      </div>
                    }
                    footer={
                      message.role === "assistant" ? (
                        <div className="space-y-3">
                          {revisionTargetId === message.id && (
                            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Instruksi Revisi
                              </p>
                              <Textarea
                                rows={3}
                                value={revisionDraft}
                                onChange={(event) =>
                                  onRevisionDraftChange(event.target.value)
                                }
                                placeholder="Contoh: rapikan paragraf kedua, kurangi repetisi..."
                                className="rounded-xl border-slate-800 bg-slate-900/60 px-3 py-2 text-sm focus:border-amber-300 focus:ring-amber-300/30"
                              />
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  onClick={() =>
                                    onPartialRevision(message.id, revisionDraft)
                                  }
                                  disabled={isSending || !revisionDraft.trim()}
                                  size="sm"
                                  tone="amber"
                                  variant="solid"
                                >
                                  Kirim Revisi
                                </Button>
                                <Button
                                  onClick={onCancelRevision}
                                  disabled={isSending}
                                  size="sm"
                                  variant="outline"
                                  tone="neutral"
                                >
                                  Batal
                                </Button>
                              </div>
                            </div>
                          )}
                          {regenerateTargetId === message.id && (
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-400/40 bg-amber-500/10 p-3">
                              <p className="text-sm text-amber-100">
                                Regenerate total akan membuat versi baru.
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  onClick={() => onRegenerate(message.id)}
                                  disabled={isSending}
                                  size="sm"
                                  variant="solid"
                                  tone="amber"
                                >
                                  Lanjutkan
                                </Button>
                                <Button
                                  onClick={onCancelRegenerate}
                                  disabled={isSending}
                                  size="sm"
                                  variant="outline"
                                  tone="neutral"
                                >
                                  Batal
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : null
                    }
                  />
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
