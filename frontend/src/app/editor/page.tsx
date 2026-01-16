"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StoryBible = {
  project: string;
  world_state: {
    magic: string;
    factions: string[];
  };
  emotional_tone: string[];
  pacing: string;
  generation_settings: {
    min_word_count: number;
  };
  characters: Array<{
    id: string;
    name: string;
    age: number;
    role: string;
    hobby: string;
    first_app: string;
    status?: "Active" | "Deceased" | "Unknown";
    relationships: Record<string, string>;
  }>;
};

type ProjectState = {
  bible: StoryBible | null;
  outline: string | null;
  summary: string | null;
};

export default function EditorPage() {
  const [project, setProject] = useState<ProjectState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch("/api/project/current");
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        }
      } catch (e) {
        console.error("Failed to fetch project", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100">
        Loading project...
      </div>
    );
  }

  const bible = project?.bible;
  const outline = project?.outline;
  const summary = project?.summary;

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
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 px-2 text-gray-900 dark:text-white font-bold text-sm group cursor-pointer">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                  expand_more
                </span>
                Project Outline
              </div>
              <div className="relative ml-2 pl-3 border-l-2 border-gray-200 dark:border-gray-800 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      folder_open
                    </span>
                    Docs
                  </div>
                  <div className="space-y-2 ml-1">
                    <a
                      className="block p-3 rounded-xl bg-white dark:bg-[#161b26] border border-blue-200 dark:border-blue-900/40 shadow-sm relative overflow-hidden group"
                      href="#"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                      <div className="flex items-start justify-between mb-1 pl-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-blue-50 leading-tight">
                          Main Outline
                        </span>
                      </div>
                       <div className="flex items-center justify-between mt-2 pl-2">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          <span className="material-symbols-outlined text-[10px]">
                            edit
                          </span>
                          Current
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#0d1117]">
            <Link href="/" className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group">
                 <span className="material-symbols-outlined text-blue-500 text-[18px]">
                    home
                 </span>
                 Back to Home
            </Link>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300">
        <header className="h-14 border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-4 md:px-6 bg-white dark:bg-surface-dark z-20 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate">
              <span className="hidden md:inline material-symbols-outlined text-primary text-lg">
                edit_document
              </span>
              <span className="truncate">{bible?.project || "Untitled Project"}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-sm flex-shrink-0">
             <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex-shrink-0">
              DRAFTING
            </div>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-white dark:bg-[#0d1117] relative scroll-smooth group pb-28 md:pb-0">
            <div className="max-w-[800px] mx-auto py-8 px-4 md:py-16 md:px-8 min-h-full">
              <div className="mb-8 md:mb-12 text-center">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2 block">
                  Current Draft
                </span>
                <h1 className="font-serif text-2xl md:text-4xl text-gray-900 dark:text-gray-100 font-bold mb-4 md:mb-8 leading-tight">
                   {bible?.project || "Untitled"}
                </h1>
              </div>
              <div className="prose prose-base md:prose-lg dark:prose-invert font-serif leading-loose text-gray-800 dark:text-gray-300 max-w-none whitespace-pre-wrap">
                {outline || "No content generated yet. Start chatting to build your story!"}
              </div>
            </div>
          </div>

          <div className="hidden md:flex w-96 border-l border-gray-200 dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark flex-col h-full flex-shrink-0">
            <div className="h-full bg-gray-900 dark:bg-black border-t border-gray-700 dark:border-border-dark flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
              <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between shrink-0">
                <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Story_Context_Engine
                </span>
              </div>
              <div className="flex-1 p-4 overflow-hidden relative font-mono text-[10px] leading-relaxed">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="h-full overflow-y-auto custom-scrollbar space-y-6">

                   {/* Summary Section */}
                   <div className="border-b border-gray-800 pb-4">
                      <div className="flex gap-2 mb-2">
                          <span className="text-blue-400">CONTEXT</span>
                          <span className="text-white font-bold">Running Summary</span>
                      </div>
                      <div className="pl-4 text-gray-400 leading-normal">
                           {summary || "Waiting for generation..."}
                      </div>
                   </div>

                   {/* Characters Section */}
                   <div>
                       <div className="flex gap-2 mb-2">
                          <span className="text-purple-400">DATABASE</span>
                          <span className="text-white font-bold">Characters</span>
                      </div>
                       <div className="space-y-3">
                           {bible?.characters?.map((char, i) => (
                              <div key={i} className="pl-2 border-l border-gray-800 ml-1">
                                <div className="flex justify-between items-center">
                                    <span className={`font-bold ${char.status === "Deceased" ? "text-red-500 line-through" : "text-gray-300"}`}>
                                        {char.name}
                                    </span>
                                    {char.status === "Deceased" && <span className="text-red-500 text-[9px] border border-red-900 px-1 rounded">DECEASED</span>}
                                </div>
                                <div className="pl-2 text-gray-500">
                                     {char.role} • {char.age}y
                                </div>
                              </div>
                           ))}
                       </div>
                   </div>

                   {bible?.world_state && (
                       <div className="border-t border-gray-800 pt-4">
                            <div className="flex gap-2 mb-2">
                                <span className="text-green-400">WORLD</span>
                                <span className="text-white font-bold">State</span>
                            </div>
                            <div className="pl-4 text-gray-400">
                                Magic: {bible.world_state.magic} <br/>
                                Factions: {bible.world_state.factions?.join(", ")}
                            </div>
                        </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
