"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImportPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Mock implementation
    const project = { id: 1, name: "New Project" };
    router.push(`/workspace/${project.id}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-body selection:bg-primary selection:text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 noise-bg pointer-events-none opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>
      </div>
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center z-20 relative opacity-50 hover:opacity-100 transition-opacity">
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
        <button className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Dashboard
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 z-30 relative">
        <div className="max-w-2xl w-full mx-auto animate-slide-up">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-surface-dark border border-gray-800 shadow-sm backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Import Phase
              </span>
            </div>
          </div>
          <div className="bg-surface-card border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden ring-1 ring-white/5">
            <div className="p-8 pb-6 border-b border-gray-800 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-9xl">
                  upload_file
                </span>
              </div>
              <h1 className="font-serif text-3xl text-white font-bold mb-2 relative z-10">
                Import Story Data
              </h1>
              <p className="text-gray-400 font-light text-sm relative z-10 max-w-md">
                Drag and drop your existing manuscript or story bible. We will
                analyze the structure to initialize your project context.
              </p>
            </div>
            <div className="p-8 pt-6 space-y-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-surface-dark border-2 border-dashed border-gray-700 hover:border-primary/50 rounded-xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center text-center h-48">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <div className="w-full flex items-center justify-between bg-surface-card border border-gray-700 p-4 rounded-lg shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl">
                            description
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-medium text-sm">
                            {file.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {file.size} bytes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-green-500 font-medium">
                          Uploaded
                        </span>
                        <button
                          className="ml-2 p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-white transition-colors"
                          onClick={() => setFile(null)}
                        >
                          <span className="material-symbols-outlined text-lg">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 font-medium">
                      Drag &amp; drop to replace or{" "}
                      <span className="text-primary hover:underline">
                        browse files
                      </span>
                    </p>
                  )}
                </div>
              </div>
              {/* ... parsing preview ... */}
            </div>
            <div className="bg-surface-dark px-8 py-5 border-t border-gray-800 flex justify-between items-center">
              <button
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium px-4 py-2"
                onClick={() => router.back()}
              >
                Back
              </button>
              <button
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg shadow-lg shadow-blue-600/20 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
                onClick={handleSubmit}
                disabled={!file}
              >
                Initialize with this Context
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 text-center text-xs text-gray-600 dark:text-gray-700 relative z-10">
        <p>© 2024 NovelAI Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
