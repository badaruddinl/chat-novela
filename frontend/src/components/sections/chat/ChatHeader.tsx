import { Icon } from "@iconify/react";

type ChatHeaderProps = {
  title: string;
  subtitle: string;
  onToggleSidebar?: () => void;
};

export function ChatHeader({
  title,
  subtitle,
  onToggleSidebar,
}: ChatHeaderProps) {
  return (
    <header className="border-b border-slate-800 px-4 py-4 animate-fade-in sm:px-6 sm:py-5">
      <div className="mx-auto flex w-full max-w-4xl items-start gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-200 transition hover:border-slate-600 lg:hidden"
          aria-label="Buka sidebar"
        >
          <Icon icon="solar:hamburger-menu-linear" className="text-xl" />
        </button>
        <div className="flex flex-1 flex-col gap-1">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Novel Chat
          </p> */}
          <h1 className="text-xl font-semibold text-white sm:text-2xl">
            {title}
          </h1>
          <p className="text-xs text-slate-400 sm:text-sm">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
