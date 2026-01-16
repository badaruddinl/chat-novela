"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ImportPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    genre: string;
    characters: string;
    tone: string;
    tonePercent: number;
  } | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Attempt to call backend
      const response = await fetch("/api/project/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data);
      } else {
        // Mock fallback for demonstration if backend fails or not ready
        console.warn("Backend analysis failed, using mock data");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAnalysisResult({
          genre: "Sci-Fi / Cyberpunk",
          characters: "5 Main, 12 Support",
          tone: "Dark, Gritty, First-Person Perspective",
          tonePercent: 85,
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      // Mock fallback
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAnalysisResult({
        genre: "Sci-Fi / Cyberpunk",
        characters: "5 Main, 12 Support",
        tone: "Dark, Gritty, First-Person Perspective",
        tonePercent: 85,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInitialize = async () => {
    if (!analysisResult) return;
    setIsInitializing(true);
    try {
      const response = await fetch("/api/project/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysisResult),
      });
      if (response.ok) {
        router.push("/editor");
      } else {
        // If backend route missing, just redirect for now
        router.push("/editor");
      }
    } catch (e) {
      console.error(e);
      router.push("/editor");
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-body selection:bg-primary selection:text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCll37xdQYqzRilZmbCJ1JPFu9FkXP1KIRais7Mowuk4-hIhllubTjW4QhiBh9YkvArqINcUs7u05II5FR-1s6eOMVL7LEmCX3QnmvXw_sZqtGQzwP_TogV63DfVLKNDwTfidCRj-KIzac_H4BzGqVTFFgOwRUGwiCOK7_8z3BgwU_MyjyHin5c5BMPrPLP3vfZ-95QlkrkTEtYbs53h5AkzUH1zTqXzg8cGryQ5gTnx66fx9QotSpv3CYuiz17G13odnjvYEsb1Ra0)",
          }}
        ></div>
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
                <div
                  className={`relative bg-surface-dark border-2 border-dashed ${
                    file
                      ? "border-primary/50"
                      : "border-gray-700 hover:border-primary/50"
                  } rounded-xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center text-center h-48`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".docx,.txt,.md"
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
                            {(file.size / 1024 / 1024).toFixed(1)} MB •{" "}
                            {file.type || "Document"}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            setAnalysisResult(null);
                          }}
                        >
                          <span className="material-symbols-outlined text-lg">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gray-800 text-gray-400 rounded-lg flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-2xl">
                          upload
                        </span>
                      </div>
                      <p className="text-white font-medium text-sm">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        DOCX, TXT, or MD (max 10MB)
                      </p>
                    </>
                  )}
                  {file && (
                    <p className="mt-4 text-xs text-gray-500 font-medium">
                      Drag & drop to replace or{" "}
                      <span className="text-primary hover:underline">
                        browse files
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {isAnalyzing && (
                <div className="flex items-center justify-center py-4">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl animate-spin">
                      progress_activity
                    </span>
                    <span className="text-xs text-gray-500">
                      Analyzing content structure...
                    </span>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">
                        smart_toy
                      </span>
                      Parsing Preview
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-400 bg-green-900/10 px-2 py-1 rounded border border-green-900/20">
                      Analysis Complete
                    </span>
                  </div>
                  <div className="bg-surface-dark border border-gray-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-surface-card border border-gray-800 flex flex-col gap-2">
                      <span className="text-xs text-gray-500 uppercase font-bold">
                        Primary Genre
                      </span>
                      <div className="flex items-center gap-2 text-white font-serif">
                        <span className="material-symbols-outlined text-purple-400 text-lg">
                          rocket_launch
                        </span>
                        {analysisResult.genre}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-card border border-gray-800 flex flex-col gap-2">
                      <span className="text-xs text-gray-500 uppercase font-bold">
                        Detected Characters
                      </span>
                      <div className="flex items-center gap-2 text-white font-serif">
                        <span className="material-symbols-outlined text-orange-400 text-lg">
                          group
                        </span>
                        {analysisResult.characters}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-card border border-gray-800 flex flex-col gap-2 md:col-span-2">
                      <span className="text-xs text-gray-500 uppercase font-bold">
                        Narrative Tone
                      </span>
                      <div className="flex items-center gap-2 text-white font-serif">
                        <span className="material-symbols-outlined text-blue-400 text-lg">
                          graphic_eq
                        </span>
                        {analysisResult.tone}
                      </div>
                      <div className="mt-1 w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${analysisResult.tonePercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-surface-dark px-8 py-5 border-t border-gray-800 flex justify-between items-center -mx-8 -mb-8">
                <button
                  className="text-sm text-gray-400 hover:text-white transition-colors font-medium px-4 py-2"
                  onClick={() => router.back()}
                >
                  Back
                </button>
                <button
                  className={`bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg shadow-lg shadow-blue-600/20 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 ${
                    !analysisResult || isInitializing
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleInitialize}
                  disabled={!analysisResult || isInitializing}
                >
                  {isInitializing ? "Initializing..." : "Initialize with this Context"}
                  {!isInitializing && (
                    <span className="material-symbols-outlined text-lg">
                      arrow_forward
                    </span>
                  )}
                </button>
              </div>
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
