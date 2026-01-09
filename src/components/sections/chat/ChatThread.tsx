import type { RefObject } from "react";
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
};

type ChatThreadProps = {
  messages: Message[];
  isSending: boolean;
  revisionTargetId: string | null;
  revisionDraft: string;
  regenerateTargetId: string | null;
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
  return (
    <div
      ref={messagesContainerRef}
      onScroll={(event) => {
        const target = event.currentTarget;
        onScroll(target.scrollTop, target.scrollHeight, target.clientHeight);
      }}
      className="flex-1 overflow-y-auto px-6 py-8"
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
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-fade-up`}
            >
              <div className="w-full max-w-2xl space-y-4">
                <MessageBubble
                  role={message.role}
                  createdAt={message.createdAt}
                  content={message.content}
                />

                {message.role === "assistant" && message.versions && (
                  <Card className="space-y-3 px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {message.versions.map((version) => (
                        <Button
                          key={version.id}
                          size="xs"
                          variant="outline"
                          tone={
                            version.id === message.activeVersionId
                              ? "amber"
                              : "neutral"
                          }
                          className={
                            version.id === message.activeVersionId
                              ? "bg-amber-400/10"
                              : ""
                          }
                          onClick={() =>
                            onSwitchVersion(message.id, version.id)
                          }
                          disabled={isSending}
                        >
                          {`v${version.versionNumber}`}
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => onOpenRevision(message.id)}
                        disabled={isSending}
                        variant="solid"
                        tone="light"
                        size="md"
                      >
                        Revisi Sebagian
                      </Button>
                      <Button
                        onClick={() => onOpenRegenerate(message.id)}
                        disabled={isSending}
                        variant="outline"
                        tone="neutral"
                        size="md"
                      >
                        Regenerate Total
                      </Button>
                    </div>
                    {revisionTargetId === message.id && (
                      <Card
                        variant="muted"
                        className="space-y-2 rounded-xl p-3"
                      >
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
                      </Card>
                    )}
                    {regenerateTargetId === message.id && (
                      <Card
                        variant="outline"
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-amber-400/40 bg-amber-500/10 p-3"
                      >
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
                      </Card>
                    )}
                  </Card>
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
