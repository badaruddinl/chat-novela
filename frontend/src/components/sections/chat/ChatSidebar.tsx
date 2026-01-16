import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConversationListItem } from "@/components/chat/ConversationListItem";
import { Icon } from "@iconify/react";

type ChatSidebarItem = {
  id: string;
  title: string;
  preview: string;
  updatedAtLabel: string;
  pinned: boolean;
};

type ChatSidebarProps = {
  items: ChatSidebarItem[];
  activeId: string | null;
  totalCount: number;
  isSending: boolean;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isDraft: boolean;
  onCreate: () => void;
  onSelect: (conversationId: string) => void;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
  onShareConversation: (conversationId: string) => void;
  onTogglePinConversation: (conversationId: string, pinned: boolean) => void;
  onDeleteConversation: (conversationId: string) => void;
};

export function ChatSidebar({
  items,
  activeId,
  totalCount,
  isSending,
  isCollapsed,
  isMobileOpen,
  isDraft,
  onCreate,
  onSelect,
  onToggleCollapse,
  onCloseMobile,
  onShareConversation,
  onTogglePinConversation,
  onDeleteConversation,
}: ChatSidebarProps) {
  const showCollapsed = isCollapsed && !isMobileOpen;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const menuItemClass =
    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:bg-slate-800/60";

  const activeMenuItem = useMemo(
    () => items.find((item) => item.id === openMenuId) ?? null,
    [items, openMenuId]
  );

  useEffect(() => {
    if (!openMenuId) return;
    const handleClick = () => {
      setOpenMenuId(null);
      setMenuPosition(null);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [openMenuId]);

  return (
    <>
      {isMobileOpen && (
        <div
          aria-hidden
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-slate-950/70 transition-opacity lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-950/95 transition-transform duration-300 animate-panel-in lg:sticky lg:top-0 lg:flex lg:translate-x-0 lg:bg-slate-950/80 ${
          isMobileOpen ? "flex translate-x-0" : "hidden -translate-x-[110%]"
        } ${isMobileOpen ? "pointer-events-auto" : "pointer-events-none lg:pointer-events-auto"} w-[85vw] max-w-[18rem] p-4 sm:w-72 sm:max-w-none sm:p-6 ${
          showCollapsed
            ? "lg:w-16 lg:items-center lg:py-6 lg:px-3"
            : "lg:w-72"
        }`}
      >
        <div
          className={`flex w-full items-center ${
            showCollapsed ? "lg:flex-col lg:gap-4" : "justify-between"
          }`}
        >
          {showCollapsed ? (
            <>
              <button
                type="button"
                onClick={onToggleCollapse}
                className="rounded-full border border-slate-700 px-2 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-500"
              >
                <Icon icon="solar:alt-arrow-right-linear" className="text-sm" />
              </button>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Memory
              </div>
              <Badge>{totalCount}</Badge>
              <button
                type="button"
                onClick={onCloseMobile}
                className="mt-4 rounded-full border border-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-200 transition hover:border-slate-500 lg:hidden"
                aria-label="Tutup sidebar"
              >
                <Icon icon="solar:close-circle-linear" className="text-sm" />
              </button>
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
                  <Icon icon="solar:alt-arrow-left-linear" className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="rounded-full border border-slate-700 px-2 py-1 text-[10px] font-semibold text-slate-200 transition hover:border-slate-500 lg:hidden"
                  aria-label="Tutup sidebar"
                >
                  <Icon icon="solar:close-circle-linear" className="text-sm" />
                </button>
              </div>
            </>
          )}
        </div>
        {!showCollapsed && (
          <>
            <Button
              type="button"
              onClick={onCreate}
              disabled={isSending || isDraft}
              variant="outline"
              tone="neutral"
              size="sm"
              className="mt-4 w-full justify-center"
            >
              + Chat Baru
            </Button>
            <Link
              href="/import"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Icon icon="solar:upload-minimalistic-linear" className="mr-2 text-base" />
              Import Context
            </Link>
            <div className="mt-4 flex-1 overflow-y-auto pr-1 sm:mt-6">
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
                    isPinned={item.pinned}
                    actions={
                      <div className="relative opacity-0 transition group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            const rect = (
                              event.currentTarget as HTMLButtonElement
                            ).getBoundingClientRect();
                            setOpenMenuId((prev) => {
                              const next = prev === item.id ? null : item.id;
                              if (!next) {
                                setMenuPosition(null);
                                return null;
                              }
                              const menuWidth = 176;
                              const menuHeight = 152;
                              let left = rect.right - menuWidth;
                              let top = rect.bottom + 8;
                              if (left < 12) left = 12;
                              if (top + menuHeight > window.innerHeight) {
                                top = rect.top - menuHeight - 8;
                              }
                              setMenuPosition({ top, left });
                              return next;
                            });
                          }}
                          className="rounded-full px-2 py-1 text-[10px] font-semibold text-slate-200 transition hover:text-slate-100"
                          aria-label="Menu chat"
                        >
                          <Icon
                            icon="solar:menu-dots-linear"
                            className="text-base"
                          />
                        </button>
                      </div>
                    }
                    onSelect={() => onSelect(item.id)}
                  />
                ))
            )}
          </div>
        </>
      )}
    </aside>
      {openMenuId && menuPosition && activeMenuItem && (
        <div
          className="fixed z-[60] w-44 rounded-xl border border-slate-800 bg-slate-950/95 p-2 shadow-lg animate-pop-in"
          style={{ top: menuPosition.top, left: menuPosition.left }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className={menuItemClass}
            onClick={() => {
              setOpenMenuId(null);
              setMenuPosition(null);
              onTogglePinConversation(
                activeMenuItem.id,
                activeMenuItem.pinned
              );
            }}
          >
            <Icon
              icon={
                activeMenuItem.pinned
                  ? "solar:pin-remove-linear"
                  : "solar:pin-linear"
              }
              className="text-sm"
            />
            {activeMenuItem.pinned ? "Lepas Sematan" : "Sematkan"}
          </button>
          <button
            type="button"
            className={menuItemClass}
            onClick={() => {
              setOpenMenuId(null);
              setMenuPosition(null);
              onShareConversation(activeMenuItem.id);
            }}
          >
            <Icon icon="solar:share-linear" className="text-sm" />
            Bagikan
          </button>
          <button
            type="button"
            className={`${menuItemClass} text-rose-200 hover:bg-rose-500/10`}
            onClick={() => {
              setOpenMenuId(null);
              setMenuPosition(null);
              onDeleteConversation(activeMenuItem.id);
            }}
          >
            <Icon icon="solar:trash-bin-trash-linear" className="text-sm" />
            Hapus
          </button>
        </div>
      )}
    </>
  );
}
