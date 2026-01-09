type ChatHeaderProps = {
  title: string;
  subtitle: string;
};

export function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <header className="border-b border-slate-800 px-6 py-5">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Novel Chat
        </p>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </header>
  );
}
