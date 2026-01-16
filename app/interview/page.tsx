"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    // Mock implementation
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
  };

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
                Setup &amp; Planning
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
              {/* ... chat messages ... */}
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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                  <button
                    className="p-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors shadow-md"
                    onClick={handleSend}
                  >
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
            {/* ... story bible ... */}
          </div>
        </div>
      </main>
    </div>
  );
}
