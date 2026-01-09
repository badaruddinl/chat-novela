import { cn } from "@/lib/cn";

type MessageBubbleProps = {
  role: "user" | "assistant";
  createdAt: string;
  content: string;
};

export function MessageBubble({ role, createdAt, content }: MessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "rounded-2xl border px-5 py-4 shadow-sm",
        isUser
          ? "ml-auto border-blue-500/40 bg-blue-500/10"
          : "border-slate-800 bg-slate-900/60"
      )}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
        <span>{role}</span>
        <span>{new Date(createdAt).toLocaleString("id-ID")}</span>
      </div>
      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-100">
        {content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}
