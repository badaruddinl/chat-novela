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
  isMobileOpen: boolean;
  onCreate: () => void;
  onSelect: (conversationId: string) => void;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
};

export function ChatSidebar({
  items,
  activeId,
  totalCount,
  isSending,
  isCollapsed,
  isMobileOpen,
  onCreate,
  onSelect,
  onToggleCollapse,
  onCloseMobile,
}: ChatSidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-hidden={!isMobileOpen}
        onClick={onCloseMobile}
        className={`fixed inset-0 z-30 bg-slate-950/70 transition-opacity lg:hidden ${
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-950/95 transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 lg:bg-slate-950/80 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobileOpen ? "pointer-events-auto" : "pointer-events-none lg:pointer-events-auto"} ${
          isCollapsed ? "lg:w-16 lg:items-center lg:py-6" : "w-72 p-6 lg:w-72"
        }`}
      >
        <div
          className={`flex w-full items-center ${
            isCollapsed ? "lg:flex-col lg:gap-4" : "justify-between"
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
                <h2 className="text-lg font-semibold text-white">
                  Daftar Chat
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{totalCount}</Badge>
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  className="hidden rounded-full border border-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-200 transition hover:border-slate-500 lg:inline-flex"
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
            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
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
    </>
  );
}
