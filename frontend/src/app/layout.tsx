import "./styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Novel Chat",
  description: "Chat-based novel generator with revision controls",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
