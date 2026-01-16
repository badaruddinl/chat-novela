"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

type Character = {
  id: string;
  name: string;
  role: string;
  relationships: Record<string, string>;
};

type StoryBible = {
  project: string;
  characters: Character[];
  world_state?: {
    magic: string;
    factions: string[];
  };
};

export default function InterviewPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your AI editor. Let's start by discussing your story idea. What genre do you have in mind?",
      createdAt: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bible, setBible] = useState<StoryBible | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const fetchProject = async () => {
    try {
      const res = await fetch("/api/project/current");
      if (res.ok) {
        const data = await res.json();
        if (data.bible) setBible(data.bible);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: input,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/project/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: Message = {
          role: "assistant",
          content: data.message,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        fetchProject(); // Refresh bible
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
                Setup & Planning
              </div>
              <div className="relative ml-2 pl-3 border-l-2 border-gray-200 dark:border-gray-800 space-y-4">
                <div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-gray-50 dark:bg-[#0d1117]">
        <header className="h-16 border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-6 bg-white dark:bg-surface-dark z-20 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500 text-xl">
                psychology
              </span>
              World Building Interview
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/editor">
                <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-md text-xs font-bold hover:opacity-80 transition-opacity flex items-center gap-2">
                Complete Step
                <span className="material-symbols-outlined text-sm">
                    arrow_forward
                </span>
                </button>
            </Link>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col bg-white dark:bg-[#0d1117] relative">
            <div
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth pb-24"
              id="chat-container"
              ref={scrollRef}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-4 max-w-3xl ${
                    msg.role === "user" ? "ml-auto justify-end" : ""
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mt-1">
                      <span className="material-symbols-outlined text-sm">
                        smart_toy
                      </span>
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : ""}`}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {msg.role === "assistant" ? "Senior Novelist AI" : "You"}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === "assistant"
                          ? "rounded-tl-none bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                          : "rounded-tr-none bg-primary text-white shadow-md shadow-blue-500/20"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-gray-300 mt-1">
                      <span className="material-symbols-outlined text-sm">
                        person
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                 <div className="flex gap-4 max-w-3xl">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mt-1">
                   <span className="material-symbols-outlined text-sm">
                     smart_toy
                   </span>
                 </div>
                 <div className="p-4 rounded-2xl rounded-tl-none bg-gray-100 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-1 w-24">
                   <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot animate-bounce delay-200"></div>
                 </div>
               </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="max-w-4xl mx-auto relative">
                <div className="flex items-end gap-2 bg-gray-50 dark:bg-[#161b26] border border-gray-300 dark:border-gray-700 rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-shadow shadow-lg">
                  <textarea
                    className="flex-1 bg-transparent border-none p-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 resize-none max-h-32 focus:outline-none"
                    placeholder="Reply to the AI..."
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                  ></textarea>
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="material-symbols-outlined text-lg">
                      send
                    </span>
                  </button>
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
              {/* Dynamic Characters */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    Characters
                  </h4>
                </div>
                <div className="space-y-3">
                    {bible?.characters?.length ? bible.characters.map((char, i) => (
                        <div key={i} className="bg-white dark:bg-[#161b26] p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm group hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                            {char.name[0]}
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {char.name}
                            </span>
                        </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] border border-gray-200 dark:border-gray-700">
                            {char.role}
                        </span>
                        </div>
                    </div>
                    )) : (
                        <p className="text-xs text-gray-500 italic">No characters yet.</p>
                    )}
                </div>
              </div>
              {/* Dynamic World Laws / State */}
               <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    World State
                  </h4>
                </div>
                <div className="space-y-2">
                    {bible?.world_state?.factions?.map((faction, i) => (
                         <div key={i} className="bg-white dark:bg-[#161b26] p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex gap-3">
                         <div className="mt-0.5">
                           <span className="material-symbols-outlined text-purple-500 text-sm">
                             public
                           </span>
                         </div>
                         <div>
                           <h5 className="text-xs font-bold text-gray-900 dark:text-gray-200">
                             {faction}
                           </h5>
                         </div>
                       </div>
                    ))}
                    {!bible?.world_state?.factions?.length && <p className="text-xs text-gray-500 italic">No world details yet.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
