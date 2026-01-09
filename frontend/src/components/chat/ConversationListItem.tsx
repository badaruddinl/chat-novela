import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/cn";

type ConversationListItemProps = {
  title: string;
  preview: string;
  updatedAt: string;
  isActive?: boolean;
  isPinned?: boolean;
  actions?: ReactNode;
  onSelect: () => void;
};

export function ConversationListItem({
  title,
  updatedAt,
  isActive = false,
  isPinned = false,
  actions,
  onSelect,
}: ConversationListItemProps) {
  return (
    <div
      className={cn(
        "group relative w-full border-b border-slate-800 text-left transition animate-fade-up",
        isActive ? "bg-amber-500/10" : "hover:bg-slate-900/60"
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="group w-full px-1 py-3 text-left"
      >
        <div className="flex items-center justify-between pr-10">
          <span className="max-w-full overflow-hidden text-clip text-xs font-semibold uppercase text-slate-400 whitespace-nowrap">
            {title}
          </span>
          {isPinned && (
            <Icon icon="solar:pin-linear" className="text-xs text-amber-300" />
          )}
        </div>
      </button>
      {actions && <div className="absolute right-2 top-2">{actions}</div>}
    </div>
  );
}
