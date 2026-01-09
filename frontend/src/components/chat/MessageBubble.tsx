import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MessageBubbleProps = {
  role: "user" | "assistant";
  createdAt: string;
  content: string;
  actions?: ReactNode;
  meta?: ReactNode;
  footer?: ReactNode;
};

export function MessageBubble({
  role,
  createdAt,
  content,
  actions,
  meta,
  footer,
}: MessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "w-full border px-6 py-5",
        isUser
          ? "border-blue-500/30 bg-blue-500/5"
          : "border-slate-800 bg-slate-900/70"
      )}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
        <span>{role}</span>
        <div className="flex items-center gap-2">
          <span>{new Date(createdAt).toLocaleString("id-ID")}</span>
          {actions}
        </div>
      </div>
      {meta && <div className="mt-3">{meta}</div>}
      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-100">
        {content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
