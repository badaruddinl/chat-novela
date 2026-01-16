import Link from "next/link";

export default function EditorPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 h-screen overflow-hidden flex flex-col md:flex-row font-body">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/50 z-40 hidden peer-checked:block md:hidden"
      ></div>
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark flex-col h-full flex shadow-2xl md:shadow-xl transform -translate-x-full md:translate-x-0 md:static transition-transform duration-300">
        <div className="p-5 border-b border-gray-200 dark:border-border-dark flex items-center justify-between bg-gray-50/50 dark:bg-surface-dark">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
              menu_book
            </span>
            <h2 className="text-xs font-bold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Table of Contents
            </h2>
          </div>
          <button className="md:hidden text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined">close</span>
          </button>
          <button className="hidden md:block text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <span className="material-symbols-outlined text-lg">
              first_page
            </span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-gray-900 dark:text-white font-bold text-sm group cursor-pointer">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                  expand_more
                </span>
                Season 1
              </div>
              <div className="relative ml-2 pl-3 border-l-2 border-gray-200 dark:border-gray-800 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      folder_open
                    </span>
                    Arc: The Discovery
                  </div>
                  <div className="space-y-2 ml-1">
                    <a
                      className="block p-3 rounded-xl bg-white dark:bg-[#161b26] border border-blue-200 dark:border-blue-900/40 shadow-sm relative overflow-hidden group"
                      href="#"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                      <div className="flex items-start justify-between mb-1 pl-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-blue-50 leading-tight">
                          Chapter 1: The Void Beckons
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pl-2">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          <span className="material-symbols-outlined text-[10px]">
                            edit
                          </span>
                          Current
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-900/50 shadow-sm">
                          DRAFTED
                        </span>
                      </div>
                    </a>
                    <a
                      className="block p-3 rounded-xl hover:bg-white dark:hover:bg-[#161b26] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all opacity-80 hover:opacity-100 group"
                      href="#"
                    >
                      <div className="flex items-start justify-between mb-1 pl-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
                          Chapter 2
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pl-2">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          <span className="material-symbols-outlined text-[10px]">
                            schedule
                          </span>
                          Planned
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                          DRAFTING
                        </span>
                      </div>
                    </a>
                    <button className="w-full mt-2 py-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-400 hover:text-primary hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        add
                      </span>
                      New Chapter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#0d1117]">
          <button className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group">
            <span className="material-symbols-outlined text-blue-500 text-[18px]">
              description
            </span>
            Export All to Google Docs
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300">
        <header className="h-14 border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-4 md:px-6 bg-white dark:bg-surface-dark z-20 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <span>The Void Chronicles</span>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
            </div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate">
              <span className="hidden md:inline material-symbols-outlined text-primary text-lg">
                edit_document
              </span>
              <span className="truncate">Chapter 1: The Void Beckons</span>
            </h2>
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex-shrink-0">
              DRAFTING
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-sm flex-shrink-0">
            <span className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider font-semibold">
              <span className="md:hidden font-bold text-gray-600 dark:text-gray-300">
                452
              </span>
              <span className="hidden md:inline">Word Count: 452</span>
            </span>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <button className="hidden md:block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">history</span>
            </button>
            <button className="bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 md:px-4 md:py-1.5 rounded-md text-xs font-bold hover:opacity-80 transition-opacity flex items-center gap-1">
              <span className="md:hidden material-symbols-outlined text-base">
                ios_share
              </span>
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-white dark:bg-[#0d1117] relative scroll-smooth group pb-28 md:pb-0">
            <div className="max-w-[800px] mx-auto py-8 px-4 md:py-16 md:px-8 min-h-full">
              <div className="mb-8 md:mb-12 text-center">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2 block">
                  Chapter One
                </span>
                <h1 className="font-serif text-2xl md:text-4xl text-gray-900 dark:text-gray-100 font-bold mb-4 md:mb-8 leading-tight">
                  The Void Beckons
                </h1>
              </div>
              <div className="prose prose-base md:prose-lg dark:prose-invert font-serif leading-loose text-gray-800 dark:text-gray-300 max-w-none">
                <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-white first-letter:mr-2 md:first-letter:mr-3 first-letter:float-left">
                  The hum of the Void Drive was a sensation felt in the teeth
                  rather than heard. Elara Vance stared into the abyss of the
                  viewscreen, where the swirling purples and blacks of the
                  anomaly danced like ink in water. It had been three days since
                  the signal—a ghost in the machine, a whisper from a brother
                  long thought dead.
                </p>
                <p>
                  &quot;Stabilize context field,&quot; she ordered, her voice
                  cutting through the static of the bridge. The crew, a ragtag
                  assembly of outcasts and void-touched mercenaries, moved with
                  practiced efficiency, but she could taste their fear. It
                  tasted like ozone and stale recycled air. Kaelen watched her
                  from the shadows of the navigation console, his cybernetic eye
                  whirring softly as it adjusted focus. He didn't trust the
                  signal, and honestly, neither did she.
                </p>
                <p>
                  But trust was a luxury they had spent long ago in the sector
                  wars. Now, there was only the mission, and the growing cold in
                  her chest that warned her they were being watched from the
                  other side.
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  The anomaly pulsed, a heartbeat of pure energy that rippled
                  through the hull plating...
                  <span className="typing-cursor"></span>
                  <span className="ml-2 text-gray-400 dark:text-gray-600 italic select-none text-sm md:text-base">
                    Type here to write manually or use the panel to generate
                    next...
                  </span>
                </p>
              </div>
            </div>
            <div className="sticky bottom-24 md:bottom-8 left-0 right-0 flex justify-center pointer-events-none z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 opacity-100">
              <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full px-2 py-2 flex items-center gap-2 pointer-events-auto transform translate-y-0 hover:-translate-y-1 transition-transform scale-90 md:scale-100 origin-bottom">
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Regenerate Last"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    refresh
                  </span>
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-medium shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap">
                  <span className="material-symbols-outlined text-[18px]">
                    psychology
                  </span>
                  Summarize
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Expand Selection"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    open_in_full
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex flex-col shadow-[0_-5px_25px_rgba(0,0,0,0.2)]">
            <div className="bg-gray-900 dark:bg-black text-[10px] text-gray-400 font-mono py-2 px-4 border-t border-gray-800 flex justify-between items-center cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-2 truncate">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-blue-400 font-bold">SYNC</span>
                <span className="text-gray-300 truncate">
                  Entity &quot;The Void Drive&quot; added to Lore.
                </span>
              </div>
              <span className="material-symbols-outlined text-xs text-gray-500">
                expand_less
              </span>
            </div>
            <div className="h-16 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 flex items-center justify-around pb-2">
              <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary border-t-2 border-primary bg-blue-50/20 dark:bg-blue-900/10">
                <span className="material-symbols-outlined text-2xl">
                  edit_document
                </span>
                <span className="text-[10px] font-bold">Write</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border-t-2 border-transparent">
                <span className="material-symbols-outlined text-2xl">
                  next_plan
                </span>
                <span className="text-[10px] font-medium">Plan</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border-t-2 border-transparent">
                <span className="material-symbols-outlined text-2xl">
                  history_edu
                </span>
                <span className="text-[10px] font-medium">Bible</span>
              </button>
            </div>
          </div>
          <div className="hidden md:flex w-96 border-l border-gray-200 dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark flex-col h-full flex-shrink-0">
            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    next_plan
                  </span>
                  Next Sequence
                </h3>
                <div className="bg-white dark:bg-black/20 border border-gray-200 dark:border-border-dark rounded-xl p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-50">
                    <span className="material-symbols-outlined text-6xl text-gray-100 dark:text-gray-800 -rotate-12">
                      map
                    </span>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-baseline justify-between mb-3">
                      <label className="block text-xs font-semibold text-gray-500">
                        Target Chapter
                      </label>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">
                        Chapter 2
                      </div>
                    </div>
                    <div className="space-y-4 mb-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          Direct the AI
                        </label>
                        <textarea
                          className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-xs leading-relaxed text-gray-900 dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary resize-none shadow-sm"
                          placeholder='e.g., "Make Elara more suspicious of Kaelen"'
                          rows={3}
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          Focus
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button className="flex-1 px-3 py-2 text-[10px] font-bold uppercase tracking-wide rounded-md border border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300 ring-1 ring-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors text-center">
                            Emotional Intensity
                          </button>
                          <button className="flex-1 px-3 py-2 text-[10px] font-bold uppercase tracking-wide rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors text-center">
                            Action-Driven
                          </button>
                          <button className="flex-1 px-3 py-2 text-[10px] font-bold uppercase tracking-wide rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors text-center">
                            Dialogue-Heavy
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group transform active:scale-95">
                      <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">
                        auto_awesome
                      </span>
                      Generate Chapter 2
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    lightbulb
                  </span>
                  Suggestions
                </h3>
                <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 text-xs text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors">
                  <span className="font-bold text-yellow-700 dark:text-yellow-500 block mb-1">
                    Plot Twist Opportunity
                  </span>
                  The anomaly could be a communication device, not a weapon.
                  Kaelen might recognize the frequency.
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-xs text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                  <span className="font-bold text-blue-700 dark:text-blue-500 block mb-1">
                    Character Moment
                  </span>
                  Elara's hesitation is noted. Consider a flashback to the
                  Sector Wars to explain her fear.
                </div>
              </div>
            </div>
            <div className="h-64 bg-gray-900 dark:bg-black border-t border-gray-700 dark:border-border-dark flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
              <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between shrink-0">
                <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Story_Bible_Sync
                </span>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-gray-500 text-xs cursor-pointer hover:text-white">
                    minimize
                  </span>
                  <span className="material-symbols-outlined text-gray-500 text-xs cursor-pointer hover:text-white">
                    close
                  </span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-hidden relative font-mono text-[10px] leading-relaxed">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="h-full overflow-y-auto custom-scrollbar space-y-2">
                  <div className="flex gap-2">
                    <span className="text-gray-500">14:02:22</span>
                    <span className="text-blue-400">INFO</span>
                    <span className="text-gray-300">
                      Analysis complete. Processing text chunk...
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500">14:02:23</span>
                    <span className="text-purple-400">UPDATE</span>
                    <span className="text-gray-300">
                      Character <span className="text-yellow-400">Elara</span>{" "}
                      state updated:
                    </span>
                  </div>
                  <div className="pl-12 text-gray-400">
                    {"{ \"emotion\": \"Apprehensive\", \"location\": \"Bridge\" }"}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500">14:02:24</span>
                    <span className="text-green-400">MEMORY</span>
                    <span className="text-gray-300">
                      New Entity Detected:{" "}
                      <span className="text-white font-bold">
                        &quot;The Void Drive&quot;
                      </span>{" "}
                      added to Lore.
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500">14:02:25</span>
                    <span className="text-purple-400">UPDATE</span>
                    <span className="text-gray-300">
                      Pacing adjusted for upcoming scene.
                    </span>
                  </div>
                  <div className="flex gap-2 animate-pulse">
                    <span className="text-gray-500">14:02:26</span>
                    <span className="text-blue-400">SYSTEM</span>
                    <span className="text-gray-300">
                      Awaiting user input for Chapter 2 outline...
                    </span>
                    <span className="w-1.5 h-3 bg-green-500 inline-block align-middle"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
