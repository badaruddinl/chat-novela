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
    <header className="border-b border-slate-800 px-6 py-5">
      <div className="mx-auto flex w-full max-w-4xl items-start gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-200 transition hover:border-slate-600 lg:hidden"
          aria-label="Buka sidebar"
        >
          <span className="text-lg font-semibold">≡</span>
        </button>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Novel Chat
          </p>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
