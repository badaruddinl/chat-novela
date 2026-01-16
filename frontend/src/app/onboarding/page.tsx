import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-body selection:bg-primary selection:text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 noise-bg pointer-events-none opacity-40 mix-blend-overlay"></div>
      </div>
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-[20px]">
              auto_stories
            </span>
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-gray-900 dark:text-white">
            Novel<span className="text-primary">AI</span>
          </span>
        </div>
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Dashboard
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20 z-10 relative">
        <div className="max-w-4xl w-full mx-auto text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-surface-dark border border-gray-200 dark:border-gray-800 shadow-sm mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Step 1: Kickoff
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            The Story Begins with You
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Choose how you want to shape your narrative. Let our AI guide you,
            build from scratch, or bring your existing world with you.
          </p>
        </div>
        <div
          className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <Link
            href="/onboarding/interview"
            className="group relative bg-white dark:bg-surface-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="mb-6 w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">
                psychology_alt
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif group-hover:text-primary transition-colors">
              Guided Interview
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Answer a series of targeted questions to let our AI architect help
              you flesh out your premise, characters, and tone.
            </p>
            <div className="flex items-center justify-between mt-auto border-t border-gray-100 dark:border-gray-800 pt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Best for Brainstorming
              </span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
          <Link
            href="/onboarding/manual"
            className="group relative bg-white dark:bg-surface-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-primary dark:hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="mb-6 w-14 h-14 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">
                edit_note
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif group-hover:text-purple-400 transition-colors">
              Manual Setup
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Take full control. Define your characters, settings, and plot
              points manually using our comprehensive story bible forms.
            </p>
            <div className="flex items-center justify-between mt-auto border-t border-gray-100 dark:border-gray-800 pt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                For Planners
              </span>
              <span className="material-symbols-outlined text-purple-500 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
          <Link
            href="/import"
            className="group relative bg-white dark:bg-surface-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:border-primary dark:hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="mb-6 w-14 h-14 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl">
                upload_file
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-serif group-hover:text-green-400 transition-colors">
              Import Existing
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Already have a draft? Upload your Google Docs, Word files, or JSON
              data to seamlessly continue your work here.
            </p>
            <div className="flex items-center justify-between mt-auto border-t border-gray-100 dark:border-gray-800 pt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Supported: DOCX, JSON
              </span>
              <span className="material-symbols-outlined text-green-500 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        </div>
      </main>
      <footer className="w-full py-6 text-center text-xs text-gray-500 dark:text-gray-600 relative z-10">
        <p>© 2024 NovelAI Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
