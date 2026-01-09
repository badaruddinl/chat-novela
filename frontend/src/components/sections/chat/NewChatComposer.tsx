import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

type NewChatComposerProps = {
  value: string;
  isSending: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onSend: () => void;
};

export function NewChatComposer({
  value,
  isSending,
  error,
  onChange,
  onSend,
}: NewChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const minHeight = 44;
  const maxHeight = 240;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    if (!value.trim()) {
      textarea.style.height = `${minHeight}px`;
      textarea.style.overflowY = "hidden";
      return;
    }
    textarea.style.height = "0px";
    const nextHeight = Math.max(
      minHeight,
      Math.min(textarea.scrollHeight, maxHeight)
    );
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value]);

  return (
    <footer className="absolute left-1/2 top-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-4 py-6 transition-all duration-300 animate-fade-in sm:px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:gap-4">
        <h2 className="text-center text-xl font-semibold text-slate-100 sm:text-2xl">
          Where does your story begin?
        </h2>
        <Textarea
          ref={textareaRef}
          rows={1}
          placeholder="Tulis prompt atau bab..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="transition-[height] duration-200 ease-out"
        />
        <div className="flex flex-wrap items-center justify-end gap-2">
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
        {error && (
          <div className="text-xs text-rose-300">{error}</div>
        )}
      </div>
    </footer>
  );
}
