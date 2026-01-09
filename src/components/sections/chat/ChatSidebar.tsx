import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConversationListItem } from "@/components/chat/ConversationListItem";

type ChatSidebarItem = {
  id: string;
  title: string;
  preview: string;
  updatedAtLabel: string;
};

type ChatSidebarProps = {
  items: ChatSidebarItem[];
  activeId: string | null;
  totalCount: number;
  isSending: boolean;
  isCollapsed: boolean;
  onCreate: () => void;
  onSelect: (conversationId: string) => void;
  onToggleCollapse: () => void;
};

export function ChatSidebar({
  items,
  activeId,
  totalCount,
  isSending,
  isCollapsed,
  onCreate,
  onSelect,
  onToggleCollapse,
}: ChatSidebarProps) {
  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-slate-800 bg-slate-950/80 transition-[width] duration-300 lg:flex ${
        isCollapsed ? "w-16 items-center py-6" : "w-72 p-6"
      }`}
    >
      <div
        className={`flex w-full items-center ${
          isCollapsed ? "flex-col gap-4" : "justify-between"
        }`}
      >
        {isCollapsed ? (
          <>
            <button
              type="button"
              onClick={onToggleCollapse}
              className="rounded-full border border-slate-700 px-2 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-500"
            >
              &gt;
            </button>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Memory
            </div>
            <Badge>{totalCount}</Badge>
          </>
        ) : (
          <>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Memory
              </p>
              <h2 className="text-lg font-semibold text-white">Daftar Chat</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge>{totalCount}</Badge>
              <button
                type="button"
                onClick={onToggleCollapse}
                className="rounded-full border border-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-200 transition hover:border-slate-500"
              >
                &lt;
              </button>
            </div>
          </>
        )}
      </div>
      {!isCollapsed && (
        <>
          <Button
            type="button"
            onClick={onCreate}
            disabled={isSending}
            variant="outline"
            tone="neutral"
            size="sm"
            className="mt-4"
          >
            + Chat Baru
          </Button>
          <div className="mt-6 space-y-4 pr-1">
            {items.length === 0 ? (
              <p className="text-sm text-slate-400">
                Belum ada percakapan. Mulai menulis untuk menyimpan memory.
              </p>
            ) : (
              items.map((item) => (
                <ConversationListItem
                  key={item.id}
                  title={item.title}
                  preview={item.preview}
                  updatedAt={item.updatedAtLabel}
                  isActive={item.id === activeId}
                  onSelect={() => onSelect(item.id)}
                />
              ))
            )}
          </div>
        </>
      )}
    </aside>
  );
}
