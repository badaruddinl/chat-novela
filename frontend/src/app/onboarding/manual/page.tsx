"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManualSetupPage() {
  const router = useRouter();

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
                <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-purple-500">
                        public
                      </span>{" "}
                      Deep World Building
                    </h4>
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                      Advanced Mode
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Physics & Magic Systems
                        </span>
                        <span className="material-symbols-outlined text-gray-400 text-sm">
                          science
                        </span>
                      </div>
                      <div className="p-4 bg-white dark:bg-transparent">
                        <textarea
                          className="w-full bg-transparent border-0 p-0 text-sm text-gray-900 dark:text-gray-300 placeholder-gray-400 focus:ring-0 resize-none"
                          placeholder="Describe the magic system, technology level, or supernatural laws here. (e.g. Hard magic based on metal consumption...)"
                          rows={2}
                        ></textarea>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Factions, Politics & Religion
                        </span>
                        <span className="material-symbols-outlined text-gray-400 text-sm">
                          gavel
                        </span>
                      </div>
                      <div className="p-4 bg-white dark:bg-transparent grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary"
                          placeholder="Ruling Body (e.g. The Council)"
                          type="text"
                        />
                        <input
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary"
                          placeholder="Opposing Faction"
                          type="text"
                        />
                        <div className="md:col-span-2">
                          <input
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary"
                            placeholder="Key Religions / Beliefs"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-500">
                        tune
                      </span>{" "}
                      Narrative Parameters
                    </h4>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Emotional Tone
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-1.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 flex items-center gap-1 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors group">
                          Dark{" "}
                          <span className="material-symbols-outlined text-[14px] group-hover:text-red-500">
                            close
                          </span>
                        </div>
                        <div className="px-3 py-1.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 flex items-center gap-1 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors group">
                          Intense{" "}
                          <span className="material-symbols-outlined text-[14px] group-hover:text-red-500">
                            close
                          </span>
                        </div>
                        <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            add
                          </span>{" "}
                          Melancholic
                        </button>
                        <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            add
                          </span>{" "}
                          Heroic
                        </button>
                        <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            add
                          </span>{" "}
                          Hopeful
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Narrative Pacing
                      </label>
                      <div className="bg-gray-100 dark:bg-black/40 p-1 rounded-lg flex items-center text-center">
                        <button className="flex-1 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-md transition-colors">
                          Slow Burn
                        </button>
                        <button className="flex-1 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-md transition-colors">
                          Balanced
                        </button>
                        <button className="flex-1 py-2 text-xs font-medium text-white bg-primary shadow-sm rounded-md transition-all">
                          Fast-Paced
                        </button>
                        <button className="flex-1 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-md transition-colors">
                          Thriller
                        </button>
                      </div>
                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-[10px] text-gray-400">
                          Detailed setup
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Action oriented
                        </span>
                      </div>
                    </div>
                    <div className="pt-5 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Generation Constraints
                        </label>
                        <span className="text-[10px] text-gray-400">
                          Target output length
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-400 text-sm">
                              short_text
                            </span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              Min Word Count
                            </span>
                          </div>
                          <div className="flex items-center bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded px-2 py-0.5">
                            <span className="text-xs font-mono font-bold text-primary mr-1">
                              1000
                            </span>
                            <span className="text-[10px] text-gray-500">
                              words
                            </span>
                          </div>
                        </div>
                        <input
                          className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                          max="5000"
                          min="500"
                          step="100"
                          type="range"
                          defaultValue="1000"
                        />
                        <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                          <span>500</span>
                          <span>2500</span>
                          <span>5k+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-pink-500">
                        hub
                      </span>{" "}
                      Character Profiles & Relationships
                    </h4>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Family Tree Visualization
                        </span>
                        <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                          <input
                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-300 dark:border-gray-600 appearance-none cursor-pointer transition-all duration-300"
                            id="family-tree-toggle"
                            name="family-tree"
                            type="checkbox"
                          />
                          <label
                            className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer transition-colors duration-300"
                            htmlFor="family-tree-toggle"
                          ></label>
                        </div>
                      </div>
                      <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-black/20 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          AI-Driven Discovery
                        </span>
                        <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                          <input
                            defaultChecked
                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-300 dark:border-gray-600 appearance-none cursor-pointer transition-all duration-300"
                            id="ai-discovery"
                            name="toggle"
                            type="checkbox"
                          />
                          <label
                            className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer transition-colors duration-300"
                            htmlFor="ai-discovery"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="group flex flex-col rounded-lg border border-primary/50 bg-white dark:bg-surface-dark shadow-sm overflow-hidden">
                      <div className="flex items-start gap-4 p-3 bg-blue-50/30 dark:bg-blue-900/10 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 shrink-0">
                          EL
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                Elara Vance
                              </h5>
                              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-px rounded">
                                Protagonist
                              </span>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Age: 24
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Initial Hobby:{" "}
                            <span className="text-gray-700 dark:text-gray-300">
                              Retro Tech Repair
                            </span>
                          </p>
                        </div>
                        <button className="text-primary transition-colors">
                          <span className="material-symbols-outlined">
                            expand_less
                          </span>
                        </button>
                      </div>
                      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">
                              First Appearance
                            </label>
                            <div className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm text-gray-400">
                                menu_book
                              </span>
                              Volume 1: Awakening, Chapter 1
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">
                              Role Description
                            </label>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                              Reluctant hero pulled into the conflict by
                              accident...
                            </p>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm text-pink-500">
                                share
                              </span>{" "}
                              Relationship Map
                            </span>
                            <button className="text-[10px] text-primary hover:text-primary-hover font-medium">
                              + Add Connection
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                              <span className="font-bold">Rival of</span> Kaelen
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-xs text-green-700 dark:text-green-300">
                              <span className="font-bold">Friend of</span>{" "}
                              Unit-734
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="group flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/20 shrink-0">
                        KO
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              Kaelen 'The Void'
                            </h5>
                            <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-1.5 py-px rounded">
                              Antagonist
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Age: 32
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          Initial Hobby: High-Stakes Gambling
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/40 rounded-lg p-4 border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                      New Character Entry
                    </p>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-4">
                          <input
                            className="w-full text-xs bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary placeholder-gray-400"
                            placeholder="Character Name"
                            type="text"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            className="w-full text-xs bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary placeholder-gray-400"
                            placeholder="Age"
                            type="text"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <input
                            className="w-full text-xs bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary placeholder-gray-400"
                            placeholder="Role"
                            type="text"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <input
                            className="w-full text-xs bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary placeholder-gray-400"
                            placeholder="Initial Hobby"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-4">
                          <select className="w-full text-xs bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary text-gray-500">
                            <option>First Appearance...</option>
                            <option>Volume 1</option>
                            <option>Chapter 1</option>
                          </select>
                        </div>
                        <div className="md:col-span-6 flex gap-2">
                          <input
                            className="w-full text-xs bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary placeholder-gray-400"
                            placeholder="Relation (e.g. Parent of...)"
                            type="text"
                          />
                          <select className="w-full text-xs bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded px-2 py-1.5 focus:ring-1 focus:ring-primary text-gray-500">
                            <option>Target...</option>
                            <option>Elara</option>
                            <option>Kaelen</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <button className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300 transition-colors">
                            <span className="material-symbols-outlined text-sm">
                              add
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-surface-dark dark:to-[#0d1424] border border-gray-200 dark:border-border-dark rounded-xl p-6 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-primary text-base">
                        psychology
                      </span>
                      AI Author Persona
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                          Role
                        </label>
                        <select className="w-full text-sm bg-white dark:bg-black/30 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-primary">
                          <option>Senior Novelist</option>
                          <option>Screenwriter</option>
                          <option>Technical Writer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                          Style
                        </label>
                        <select className="w-full text-sm bg-white dark:bg-black/30 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-primary">
                          <option>Literary Fiction</option>
                          <option>Hard Sci-Fi</option>
                          <option>High Fantasy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 dark:bg-black border border-gray-800 rounded-xl p-0 overflow-hidden shadow-lg shadow-black/50 sticky top-6">
                  <div className="bg-gray-800/50 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Story_Bible.json
                    </span>
                    <span className="material-symbols-outlined text-gray-600 text-sm">
                      code
                    </span>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <pre className="font-mono text-[10px] leading-relaxed text-gray-300">
                      <span className="text-purple-400">{"{"}</span>
                      <br />
                      <span className="text-blue-400">
                        &quot;project&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;The Void Chronicles&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;world_state&quot;
                      </span>
                      : <span className="text-purple-400">{"{"}</span>
                      <br />
                      <span className="text-blue-400">
                        &quot;magic&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;Hard / Metal-based&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;factions&quot;
                      </span>: <span className="text-yellow-300">[</span>
                      <br />
                      <span className="text-green-400">
                        &quot;The Council&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-green-400">
                        &quot;Void Walkers&quot;
                      </span>
                      <br />
                      <span className="text-yellow-300">]</span>
                      <br />
                      <span className="text-purple-400">{"}"}</span>,
                      <br />
                      <span className="text-blue-400">
                        &quot;emotional_tone&quot;
                      </span>
                      : <span className="text-yellow-300">[</span>
                      <br />
                      <span className="text-green-400">&quot;Dark&quot;</span>,
                      <br />
                      <span className="text-green-400">
                        &quot;Intense&quot;
                      </span>
                      <br />
                      <span className="text-yellow-300">]</span>,
                      <br />
                      <span className="text-blue-400">
                        &quot;pacing&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;Fast-Paced&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;generation_settings&quot;
                      </span>
                      : <span className="text-purple-400">{"{"}</span>
                      <br />
                      <span className="text-blue-400">
                        &quot;min_word_count&quot;
                      </span>
                      : <span className="text-orange-400">1000</span>
                      <br />
                      <span className="text-purple-400">{"}"}</span>,
                      <br />
                      <span className="text-blue-400">
                        &quot;characters&quot;
                      </span>
                      : <span className="text-yellow-300">[</span>
                      <br />
                      <span className="text-purple-400">{"{"}</span>
                      <br />
                      <span className="text-blue-400">
                        &quot;id&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;char_01&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;name&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;Elara&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;age&quot;
                      </span>: <span className="text-orange-400">24</span>,
                      <br />
                      <span className="text-blue-400">
                        &quot;role&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;Protagonist&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;hobby&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;Retro Tech&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;first_app&quot;
                      </span>
                      :{" "}
                      <span className="text-green-400">
                        &quot;Vol 1, Ch 1&quot;
                      </span>
                      ,
                      <br />
                      <span className="text-blue-400">
                        &quot;relationships&quot;
                      </span>
                      : <span className="text-purple-400">{"{"}</span>
                      <br />
                      <span className="text-blue-400">
                        &quot;rival&quot;
                      </span>:{" "}
                      <span className="text-green-400">
                        &quot;Kaelen&quot;
                      </span>
                      <br />
                      <span className="text-purple-400">{"}"}</span>
                      <br />
                      <span className="text-purple-400">{"}"}</span>,
                      <br />
                      <span className="text-gray-500">
                        // AI will append new entries here
                      </span>
                      <br />
                      <span className="text-yellow-300">]</span>
                      <br />
                      <span className="text-purple-400">{"}"}</span>
                    </pre>
                  </div>
                  <div className="bg-gray-800/30 px-4 py-2 border-t border-gray-800 text-[10px] text-gray-500 flex justify-between">
                    <span>Memory Usage: 14%</span>
                    <span>Synced: Just now</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-end gap-4 border-t border-gray-200 dark:border-border-dark pt-6">
              <button className="px-6 py-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors font-medium text-sm">
                Save as Draft
              </button>
              <button
                className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-2 group"
                onClick={async () => {
                   try {
                     const bible = {
                        project: "The Void Chronicles",
                        world_state: {
                          magic: "Hard / Metal-based",
                          factions: ["The Council", "Void Walkers"]
                        },
                        emotional_tone: ["Dark", "Intense"],
                        pacing: "Fast-Paced",
                        generation_settings: { min_word_count: 1000 },
                        characters: [
                          {
                            id: "char_01",
                            name: "Elara",
                            age: 24,
                            role: "Protagonist",
                            hobby: "Retro Tech",
                            first_app: "Vol 1, Ch 1",
                            relationships: { rival: "Kaelen" }
                          }
                        ]
                     };
                     await fetch("/api/project/initialize", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bible)
                     });
                     router.push("/onboarding/generating");
                   } catch (e) {
                     console.error(e);
                     router.push("/onboarding/generating");
                   }
                }}
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
