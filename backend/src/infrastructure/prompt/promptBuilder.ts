import fs from "fs";
import path from "path";
import type { PromptBuilder, RevisionMode } from "../../application/ports/promptBuilder";

const contentRoot =
  process.env.CONTENT_ROOT ??
  path.resolve(process.cwd(), "..", "frontend", "src", "contents");

const RULES_PATH = path.join(contentRoot, "rules.md");
const OUTLINE_PATH = path.join(contentRoot, "outline.md");

const loadRules = () => (fs.existsSync(RULES_PATH) ? fs.readFileSync(RULES_PATH, "utf-8") : "");
const loadOutline = () =>
  fs.existsSync(OUTLINE_PATH) ? fs.readFileSync(OUTLINE_PATH, "utf-8") : "";

export const promptBuilder: PromptBuilder = {
  buildRevisionPrompt(original: string, instruction: string | null, mode: RevisionMode) {
    const base = [
      "Kamu adalah agent penulis novel berkelanjutan.",
      "Ikuti aturan dan outline yang sudah diberikan.",
      `Mode revisi: ${mode}.`,
      "Teks sebelumnya:",
      original,
    ];

    if (instruction) {
      base.push("Instruksi revisi:");
      base.push(instruction);
      base.push("Revisi hanya bagian yang relevan.");
    } else {
      base.push("Buat versi baru yang berbeda dari sebelumnya.");
    }

    return base.join("\n\n");
  },
};

export const buildSystemPrompt = () => {
  const rules = loadRules();
  const outline = loadOutline();
  return [
    "Kamu adalah agent penulis novel berkelanjutan.",
    "Ikuti semua aturan dan outline di bawah ini secara ketat.",
    rules,
    outline,
  ]
    .filter(Boolean)
    .join("\n\n");
};
