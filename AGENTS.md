# Agent Context Guide

Use this repo to build and maintain a ChatGPT-style novel writing assistant. The UI should feel like ChatGPT: a scrolling chat thread with user/assistant bubbles, revision controls attached to assistant responses, and a memory/summary sidebar. Styling should be done with Tailwind CSS and organized for maintainability (small, reusable components, clear layout structure, and predictable class usage). Keep the UX focused on writing: smooth scrolling, readable typography, and clear revision actions.

When making changes:
- Prefer Tailwind utility classes over custom CSS.
- Keep the chat UI responsive and mobile-friendly.
- Place revision controls only under assistant messages.
- Ensure the sidebar summarizes recent memory or context succinctly.
- Avoid major rewrites of data flow unless requested.

Key areas:
- Main UI: `src/app/page.tsx`
- Layout and global styles: `src/app/layout.tsx`, `src/app/styles/globals.css`
- API routes: `src/app/api/*`

