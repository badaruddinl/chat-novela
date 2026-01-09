import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

type ChatComposerProps = {
  value: string;
  isSending: boolean;
  error: string | null;
  isCompact: boolean;
  isHidden: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  onToggleHidden: () => void;
};

export function ChatComposer({
  value,
  isSending,
  error,
  isCompact,
  isHidden,
  onChange,
  onSend,
  onToggleHidden,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const maxHeight = 180;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    if (!value.trim()) {
      textarea.style.height = "";
      textarea.style.overflowY = "hidden";
      return;
    }
    textarea.style.height = "0px";
    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value]);

  const wrapperClasses = [
    "border-t border-slate-800 px-6 transition-all duration-300",
    isHidden ? "py-3" : isCompact ? "py-4" : "py-6",
  ].join(" ");

  return (
    <footer className={wrapperClasses}>
      <div
        className={`mx-auto flex w-full max-w-4xl flex-col ${
          isCompact && !isHidden ? "gap-3" : "gap-4"
        }`}
      >
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{isHidden ? "Composer disembunyikan." : "Tulis prompt Anda."}</span>
          <button
            type="button"
            onClick={onToggleHidden}
            className="rounded-full border border-slate-700 px-3 py-1 text-[11px] font-semibold text-slate-200 transition hover:border-slate-500"
          >
            {isHidden ? "Tampilkan" : "Sembunyikan"}
          </button>
        </div>
        {!isHidden && (
          <>
            <Textarea
              ref={textareaRef}
              rows={2}
              placeholder="Tulis prompt atau bab..."
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className="transition-[height] duration-200 ease-out"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-slate-500">
                {error ? (
                  <span className="text-rose-300">{error}</span>
                ) : (
                  "Tekan kirim untuk menambahkan prompt ke percakapan."
                )}
              </div>
              <Button
                onClick={onSend}
                disabled={isSending}
                variant="solid"
                tone="brand"
                size="lg"
              >
                {isSending ? "Mengirim..." : "Kirim"}
              </Button>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
