import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-none rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
