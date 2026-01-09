import fs from "fs";
import path from "path";

const RULES_PATH = path.join(process.cwd(), "content/rules.md");
const OUTLINE_PATH = path.join(process.cwd(), "content/outline.md");

export function loadRules() {
  if (fs.existsSync(RULES_PATH)) {
    return fs.readFileSync(RULES_PATH, "utf-8");
  }
  return "";
}

export function loadOutline() {
  if (fs.existsSync(OUTLINE_PATH)) {
    return fs.readFileSync(OUTLINE_PATH, "utf-8");
  }
  return "";
}

export function buildSystemPrompt() {
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
}

export function buildRevisionPrompt(
  original: string,
  instruction: string | null,
  mode: "partial" | "regenerate"
) {
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
}
