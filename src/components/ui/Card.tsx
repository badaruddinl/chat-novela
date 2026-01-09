import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "solid" | "muted" | "outline";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantStyles: Record<CardVariant, string> = {
  solid: "border border-slate-800 bg-slate-900/60",
  muted: "border border-slate-800 bg-slate-950/70",
  outline: "border border-slate-800 bg-transparent",
};

export function Card({
  className,
  variant = "solid",
  ...props
}: CardProps) {
  return (
    <div
      className={cn("rounded-2xl", variantStyles[variant], className)}
      {...props}
    />
  );
}
