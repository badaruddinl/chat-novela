"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManualSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [projectTitle, setProjectTitle] = useState("The Void Chronicles");
  const [genre, setGenre] = useState("Sci-Fi");
  const [synopsis, setSynopsis] = useState("");
  const [magicSystem, setMagicSystem] = useState("Hard / Metal-based");
  const [factions, setFactions] = useState(["The Council", "Void Walkers"]);
  const [emotionalTone, setEmotionalTone] = useState(["Dark", "Intense"]);
  const [pacing, setPacing] = useState("Fast-Paced");
  const [minWordCount, setMinWordCount] = useState(1000);

  // Character State (Simplified for MVP)
  const [protagonistName, setProtagonistName] = useState("Elara Vance");
  const [protagonistRole, setProtagonistRole] = useState("Protagonist");
  const [protagonistAge, setProtagonistAge] = useState("24");
  const [protagonistHobby, setProtagonistHobby] = useState("Retro Tech Repair");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const bible = {
        project: projectTitle,
        world_state: {
          magic: magicSystem,
          factions: factions,
        },
        emotional_tone: emotionalTone,
        pacing: pacing,
        generation_settings: {
          min_word_count: minWordCount,
        },
        characters: [
          {
            id: "char_01",
            name: protagonistName,
            age: parseInt(protagonistAge) || 24,
            role: protagonistRole,
            hobby: protagonistHobby,
            first_app: "Vol 1, Ch 1",
            relationships: {}, // Simplified
          },
        ],
      };

      await fetch("/api/project/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bible),
      });

      router.push("/onboarding/generating");
    } catch (error) {
      console.error("Failed to initialize project", error);
      alert("Failed to initialize project. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 h-screen overflow-hidden flex font-body">
       <aside className="w-64 bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark flex-shrink-0 flex flex-col h-full hidden md:flex">
        <div className="p-4 border-b border-gray-200 dark:border-border-dark">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
              MEMORY
            </div>
          </div>
          <h1 className="text-lg font-bold mb-4">Manual Setup</h1>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-border-dark mt-auto">
            <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Home
            </Link>
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
                        Series/Project Name
                      </label>
                      <input
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-gray-400 dark:placeholder-gray-600"
                        placeholder="e.g. The Void Chronicles"
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                      />
                    </div>
                     <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Genre
                      </label>
                      <input
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-gray-400 dark:placeholder-gray-600"
                        placeholder="e.g. Sci-Fi"
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Primary Synopsis
                      </label>
                    </div>
                    <textarea
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                      placeholder="The central conflict and hook..."
                      rows={3}
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
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
                  </div>
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Physics & Magic Systems
                        </span>
                      </div>
                      <div className="p-4 bg-white dark:bg-transparent">
                        <textarea
                          className="w-full bg-transparent border-0 p-0 text-sm text-gray-900 dark:text-gray-300 placeholder-gray-400 focus:ring-0 resize-none"
                          placeholder="Describe the magic system..."
                          rows={2}
                          value={magicSystem}
                          onChange={(e) => setMagicSystem(e.target.value)}
                        ></textarea>
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
                      Character Profiles
                    </h4>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="group flex flex-col rounded-lg border border-primary/50 bg-white dark:bg-surface-dark shadow-sm overflow-hidden">
                      <div className="flex items-start gap-4 p-3 bg-blue-50/30 dark:bg-blue-900/10 cursor-pointer">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 shrink-0">
                          {protagonistName.substring(0, 2).toUpperCase()}
                        </div>
                         <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                             <input
                                className="text-sm font-semibold text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0"
                                value={protagonistName}
                                onChange={(e) => setProtagonistName(e.target.value)}
                                placeholder="Character Name"
                             />
                          </div>
                           <input
                                className="text-xs text-gray-500 dark:text-gray-400 bg-transparent border-none p-0 focus:ring-0 w-full"
                                value={protagonistHobby}
                                onChange={(e) => setProtagonistHobby(e.target.value)}
                                placeholder="Hobby"
                             />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="space-y-6">
                <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Settings</h4>
                     <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Pacing
                      </label>
                      <select
                        value={pacing}
                        onChange={(e) => setPacing(e.target.value)}
                        className="w-full text-sm bg-white dark:bg-black/30 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-primary"
                      >
                         <option>Slow Burn</option>
                         <option>Balanced</option>
                         <option>Fast-Paced</option>
                         <option>Thriller</option>
                      </select>
                    </div>
                     <div className="mt-4">
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Word Count Goal
                      </label>
                      <input
                         type="number"
                         value={minWordCount}
                         onChange={(e) => setMinWordCount(parseInt(e.target.value))}
                         className="w-full text-sm bg-white dark:bg-black/30 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-primary"
                      />
                    </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-end gap-4 border-t border-gray-200 dark:border-border-dark pt-6">
              <button
                className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-2 group disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Initializing..." : "Initialize Project"}
                {!loading && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
