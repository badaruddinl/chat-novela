"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GeneratingPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate generation time then redirect to editor
    const timer = setTimeout(() => {
      router.push("/editor");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-warm-white dark:bg-background-dark text-gray-900 dark:text-gray-100 h-screen overflow-hidden flex font-sans">
      <main className="flex-1 flex flex-col h-full relative overflow-hidden items-center justify-center p-8 bg-warm-white dark:bg-background-dark transition-colors duration-500">
        <div className="flex flex-col items-center max-w-xl w-full">
          <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full animate-slow-pulse"></div>
            <div className="absolute inset-4 border border-blue-200 dark:border-blue-800 rounded-full opacity-50"></div>
            <svg
              className="absolute inset-0 w-full h-full p-4 animate-spin text-primary"
              viewBox="0 0 100 100"
            >
              <circle
                className="text-blue-100 dark:text-blue-900/30"
                cx="50"
                cy="50"
                fill="none"
                r="40"
                stroke="currentColor"
                strokeWidth="2"
              ></circle>
              <circle
                className="text-primary"
                cx="50"
                cy="50"
                fill="none"
                r="40"
                stroke="currentColor"
                strokeDasharray="200"
                strokeDashoffset="140"
                strokeLinecap="round"
                strokeWidth="2"
              ></circle>
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center bg-white dark:bg-surface-dark w-24 h-24 rounded-full shadow-sm border border-gray-100 dark:border-border-dark">
              <span className="material-symbols-outlined text-3xl text-primary mb-1">
                auto_awesome
              </span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 dark:text-gray-100 text-center mb-12 leading-relaxed">
            Senior Novelist is weaving <br />
            the opening hook...
          </h2>
          <div className="w-full max-w-md space-y-6 relative">
            <div className="absolute left-[19px] top-3 bottom-8 w-px bg-gray-200 dark:bg-gray-800 -z-10"></div>
            <div className="flex items-start gap-4 opacity-50 transition-opacity duration-500">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 border border-green-100 dark:border-green-900">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-lg">
                  check
                </span>
              </div>
              <div className="pt-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 font-serif italic">
                  Analyzing character motivations...
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="relative w-10 h-10 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center flex-shrink-0 border border-primary z-10 shadow-md shadow-blue-100 dark:shadow-none">
                <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/30 animate-ping opacity-75"></div>
                <span className="material-symbols-outlined text-primary text-lg animate-pulse">
                  edit_note
                </span>
              </div>
              <div className="pt-2">
                <p className="text-base font-medium text-gray-900 dark:text-white font-serif">
                  Setting the melancholic atmosphere...
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-40">
              <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-700">
                <span className="material-symbols-outlined text-gray-400 text-lg">
                  hourglass_empty
                </span>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-500 dark:text-gray-500 font-serif">
                  Drafting first 500 words...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
