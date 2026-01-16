"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManualSetupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [data, setData] = useState({});

  const handleSubmit = async () => {
    const response = await fetch("/api/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, data }),
    });
    const { project } = await response.json();
    router.push(`/workspace/${project.id}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 h-screen overflow-hidden flex font-body">
      <aside className="w-64 bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark flex-shrink-0 flex flex-col h-full hidden md:flex">
        <div className="p-4 border-b border-gray-200 dark:border-border-dark">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
              MEMORY
            </div>
            <div className="flex space-x-2">
              <span className="bg-gray-200 dark:bg-gray-800 text-xs px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">
                2
              </span>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
            </div>
          </div>
          <h1 className="text-lg font-bold mb-4">Daftar Chat</h1>
          <button className="w-full py-2 px-4 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-sm">add</span>
            Chat Baru
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-1">
            <a
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              href="#"
            >
              DSS
            </a>
            <a
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              href="#"
            >
              HALOO
            </a>
            <a
              className="block px-3 py-2 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 text-primary dark:text-white transition-colors"
              href="#"
            >
              Novel Project Alpha
            </a>
            <a
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              href="#"
            >
              Sci-Fi Draft v2
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-border-dark">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-primary flex items-center justify-center text-white font-bold text-xs">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                User Account
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Pro Plan
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="h-16 border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-6 bg-white dark:bg-background-dark/50 backdrop-blur-sm z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Advanced Story Initialization
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                System Ready
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Import JSON
            </button>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto pb-20">
            <div className="mb-8">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Architect Your World
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
                Establish the deep narrative parameters, world laws, and
                character roster. The AI uses this &quot;Bible&quot; to maintain
                consistency across volumes.
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      book_2
                    </span>{" "}
                    Narrative Framework
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Series Name
                      </label>
                      <input
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-gray-400 dark:placeholder-gray-600"
                        placeholder="e.g. The Void Chronicles"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Volume / Book Title
                      </label>
                      <input
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-gray-400 dark:placeholder-gray-600"
                        placeholder="Book 1: Awakening"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Primary Synopsis
                      </label>
                      <button className="text-xs text-primary hover:text-primary-hover flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">
                          auto_awesome
                        </span>{" "}
                        Generate
                      </button>
                    </div>
                    <textarea
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                      placeholder="The central conflict and hook..."
                      rows={3}
                    ></textarea>
                  </div>
                </div>
                {/* ... other form sections ... */}
              </div>
              <div className="space-y-6">
                {/* ... other form sections ... */}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-end gap-4 border-t border-gray-200 dark:border-border-dark pt-6">
              <button className="px-6 py-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium text-sm">
                Save as Draft
              </button>
              <button
                className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-2 group"
                onClick={handleSubmit}
              >
                Initialize Project
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
