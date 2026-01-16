import Link from "next/link";

export default function InterviewPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 h-screen overflow-hidden flex font-body">
      <aside className="w-72 bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark flex-shrink-0 flex flex-col h-full hidden md:flex z-30 shadow-xl relative">
        <div className="p-5 border-b border-gray-200 dark:border-border-dark flex items-center justify-between bg-gray-50/50 dark:bg-surface-dark">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
              menu_book
            </span>
            <h2 className="text-xs font-bold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Structure
            </h2>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <span className="material-symbols-outlined text-lg">
              first_page
            </span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-gray-900 dark:text-white font-bold text-sm group cursor-pointer">
                <span className="material-symbols-outlined text-primary">
                  expand_more
                </span>
                Setup & Planning
              </div>
              <div className="relative ml-2 pl-3 border-l-2 border-gray-200 dark:border-gray-800 space-y-4">
                <div>
                  <a
                    className="block p-3 rounded-xl hover:bg-white dark:hover:bg-[#161b26] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all group opacity-70"
                    href="#"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-green-500 text-sm">
                        check_circle
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Step 1: Core Concept
                      </span>
                    </div>
                  </a>
                  <a
                    className="block p-3 rounded-xl bg-white dark:bg-[#161b26] border border-blue-200 dark:border-blue-900/40 shadow-sm relative overflow-hidden group"
                    href="#"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                    <div className="flex items-start justify-between mb-1 pl-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-blue-50 leading-tight">
                        Step 2: World Building
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pl-2">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <span className="material-symbols-outlined text-[10px] animate-pulse">
                          chat_bubble
                        </span>
                        Interview Mode
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 shadow-sm">
                        ACTIVE
                      </span>
                    </div>
                  </a>
                  <a
                    className="block p-3 rounded-xl hover:bg-white dark:hover:bg-[#161b26] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all opacity-50 hover:opacity-100 group mt-2"
                    href="#"
                  >
                    <div className="flex items-start justify-between mb-1 pl-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Step 3: Plot Outline
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-gray-500 dark:text-gray-400 font-bold text-sm group cursor-pointer">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                  navigate_next
                </span>
                Season 1
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
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-gray-50 dark:bg-[#0d1117]">
        <header className="h-16 border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-6 bg-white dark:bg-surface-dark z-20 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <span>The Void Chronicles</span>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
            </div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500 text-xl">
                psychology
              </span>
              World Building Interview
            </h2>
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              STEP 2
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex -space-x-2">
              <div
                className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold"
                title="Senior Novelist AI"
              >
                AI
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                You
              </div>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-md text-xs font-bold hover:opacity-80 transition-opacity flex items-center gap-2">
              Complete Step
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col bg-white dark:bg-[#0d1117] relative">
            <div
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth pb-24"
              id="chat-container"
            >
              <div className="flex justify-center">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  Today, 2:03 PM
                </span>
              </div>
              <div className="flex gap-4 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mt-1">
                  <span className="material-symbols-outlined text-sm">
                    smart_toy
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Senior Novelist AI
                    </span>
                    <span className="text-[10px] text-gray-400">2:03 PM</span>
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 text-sm leading-relaxed border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p>
                      Welcome back to the world of <em>The Void Chronicles</em>.
                      I've reviewed your core concept.
                    </p>
                    <p className="mt-2">
                      To flesh out the protagonist, <strong>Elara Vance</strong>
                      , we need to understand her motivation. You mentioned she
                      is an &quot;outcast.&quot;{" "}
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        What specific event caused her exile from the colony?
                      </span>{" "}
                      Was it a crime, a misunderstanding, or a sacrifice?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 max-w-3xl ml-auto justify-end">
                <div className="flex flex-col gap-1 items-end">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] text-gray-400">2:05 PM</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      You
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl rounded-tr-none bg-primary text-white text-sm leading-relaxed shadow-md shadow-blue-500/20">
                    <p>
                      She was blamed for the collapse of the Jump Gate in Sector
                      7. It wasn't actually her fault—she was covering for her
                      brother, Kaelen, who messed with the regulators.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-gray-300 mt-1">
                  <span className="material-symbols-outlined text-sm">
                    person
                  </span>
                </div>
              </div>
              <div className="flex gap-4 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mt-1">
                  <span className="material-symbols-outlined text-sm">
                    smart_toy
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Senior Novelist AI
                    </span>
                    <span className="text-[10px] text-gray-400">2:05 PM</span>
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 text-sm leading-relaxed border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/10 to-transparent pointer-events-none"></div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">
                        auto_awesome
                      </span>
                      Updating Story Bible
                    </div>
                    <p>
                      That's a powerful backstory. It establishes a strong bond
                      with Kaelen and a deep-seated injustice.
                    </p>
                    <p className="mt-2">
                      I've added <strong>Kaelen</strong> as a key character and
                      noted the <strong>Sector 7 Jump Gate Collapse</strong> as
                      a historical event. Now, does Kaelen know she took the
                      fall, or does he think it was an accident?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 max-w-3xl ml-auto justify-end">
                <div className="flex flex-col gap-1 items-end">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] text-gray-400">2:06 PM</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      You
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl rounded-tr-none bg-primary text-white text-sm leading-relaxed shadow-md shadow-blue-500/20">
                    <p>
                      He knows. But he's too cowardly to admit it. That's why
                      he's helping her now, out of guilt.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-gray-300 mt-1">
                  <span className="material-symbols-outlined text-sm">
                    person
                  </span>
                </div>
              </div>
              <div className="flex gap-4 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mt-1">
                  <span className="material-symbols-outlined text-sm">
                    smart_toy
                  </span>
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-gray-100 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-1 w-24">
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="max-w-4xl mx-auto relative">
                <div className="flex items-end gap-2 bg-gray-50 dark:bg-[#161b26] border border-gray-300 dark:border-gray-700 rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-shadow shadow-lg">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <span className="material-symbols-outlined">
                      add_circle
                    </span>
                  </button>
                  <textarea
                    className="flex-1 bg-transparent border-none p-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 resize-none max-h-32"
                    placeholder="Reply to the AI..."
                    rows={1}
                  ></textarea>
                  <button className="p-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors shadow-md">
                    <span className="material-symbols-outlined text-lg">
                      send
                    </span>
                  </button>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-gray-400 dark:text-gray-600">
                    AI can make mistakes. Review generated lore in the panel.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 border-l border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-surface-dark flex flex-col h-full flex-shrink-0 shadow-[rgba(0,0,0,0.1)_5px_0px_20px_inset]">
            <div className="p-4 border-b border-gray-200 dark:border-border-dark flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">
                  menu_book
                </span>
                Story Bible
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Live Sync
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    Characters
                  </h4>
                  <button className="text-primary hover:text-primary-hover text-[10px] font-bold uppercase">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-[#161b26] p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm group hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                          E
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          Elara Vance
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-gray-300 text-sm group-hover:text-primary">
                        edit
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] border border-gray-200 dark:border-gray-700">
                        Protagonist
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] border border-red-100 dark:border-red-900/50">
                        Outcast
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">
                      Wrongfully accused of Sector 7 collapse. Protecting her
                      brother.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#161b26] p-3 rounded-lg border-l-2 border-l-green-400 border-y border-r border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden animate-pulse">
                    <div className="absolute inset-0 bg-green-500/5 pointer-events-none"></div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold">
                          K
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          Kaelen Vance
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400">
                        NEW
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] border border-gray-200 dark:border-gray-700">
                        Brother
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-[10px] border border-yellow-100 dark:border-yellow-900/50">
                        Guilty
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      Responsible for Jump Gate failure. Helping Elara out of
                      guilt.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    Relationships
                  </h4>
                </div>
                <div className="bg-white dark:bg-[#161b26] rounded-lg border border-gray-200 dark:border-gray-700 p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Elara
                      </span>
                      <span className="material-symbols-outlined text-gray-400 text-xs">
                        arrow_forward
                      </span>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Kaelen
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">Sibling</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-2">
                    <div className="bg-orange-400 h-1.5 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>Tension</span>
                    <span>High</span>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 italic border-t border-gray-100 dark:border-gray-800 pt-2">
                    &quot;Protective but resentful&quot;
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    World Laws
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="bg-white dark:bg-[#161b26] p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex gap-3">
                    <div className="mt-0.5">
                      <span className="material-symbols-outlined text-purple-500 text-sm">
                        public
                      </span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900 dark:text-gray-200">
                        The Void Anomaly
                      </h5>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Strange energy field affecting tech. Makes teeth hum.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#161b26] p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex gap-3 border-l-2 border-l-blue-400">
                    <div className="mt-0.5">
                      <span className="material-symbols-outlined text-blue-500 text-sm">
                        history
                      </span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900 dark:text-gray-200">
                        Sector 7 Collapse
                      </h5>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Catastrophic event caused by regulator tampering. Elara
                        blamed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark">
              <button className="w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold shadow hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">save</span>
                Commit Changes to Bible
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
