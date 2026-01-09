import { cn } from "@/lib/cn";

type ConversationListItemProps = {
  title: string;
  preview: string;
  updatedAt: string;
  isActive?: boolean;
  onSelect: () => void;
};

export function ConversationListItem({
  title,
  preview,
  updatedAt,
  isActive = false,
  onSelect,
}: ConversationListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border p-3 text-left transition animate-fade-up",
        isActive
          ? "border-amber-400/60 bg-amber-500/10"
          : "border-slate-800 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900/80"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase text-slate-500">
          {title}
        </span>
        <span className="text-[10px] text-slate-500">{updatedAt}</span>
      </div>
      <p className="mt-2 text-sm text-slate-200">{preview}</p>
    </button>
  );
}
