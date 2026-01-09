import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonTone = "brand" | "neutral" | "light" | "amber";
type ButtonSize = "xs" | "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60";

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-3 py-1 text-xs",
  sm: "px-4 py-2 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2 text-sm",
};

const solidStyles: Record<ButtonTone, string> = {
  brand: "bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-blue-400/40",
  neutral:
    "bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-600/40",
  light: "bg-slate-100 text-slate-900 hover:bg-white focus-visible:ring-white/40",
  amber:
    "bg-amber-300 text-slate-900 hover:bg-amber-200 focus-visible:ring-amber-300/30",
};

const outlineStyles: Record<ButtonTone, string> = {
  brand:
    "border border-blue-500/40 text-blue-200 hover:border-blue-300 focus-visible:ring-blue-400/40",
  neutral:
    "border border-slate-700 text-slate-200 hover:border-slate-500 focus-visible:ring-slate-600/40",
  light:
    "border border-slate-200 text-slate-100 hover:border-white focus-visible:ring-white/40",
  amber:
    "border border-amber-400/60 text-amber-200 hover:border-amber-300 focus-visible:ring-amber-300/30",
};

const ghostStyles: Record<ButtonTone, string> = {
  brand: "text-blue-200 hover:bg-blue-500/10 focus-visible:ring-blue-400/40",
  neutral:
    "text-slate-200 hover:bg-slate-800/60 focus-visible:ring-slate-600/40",
  light: "text-slate-100 hover:bg-white/10 focus-visible:ring-white/40",
  amber:
    "text-amber-200 hover:bg-amber-500/10 focus-visible:ring-amber-300/30",
};

export function Button({
  className,
  variant = "solid",
  tone = "neutral",
  size = "md",
  ...props
}: ButtonProps) {
  const variantStyles =
    variant === "solid"
      ? solidStyles[tone]
      : variant === "outline"
        ? outlineStyles[tone]
        : ghostStyles[tone];

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles, className)}
      {...props}
    />
  );
}
