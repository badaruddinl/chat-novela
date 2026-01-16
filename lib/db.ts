import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "app.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export type ProjectRecord = {
  id: number;
  name: string;
  data: string;
  created_at: string;
};

export function createProject(name: string, data: object) {
  const stmt = db.prepare(
    `INSERT INTO projects (name, data) VALUES (?, ?) RETURNING *`
  );
  return stmt.get(name, JSON.stringify(data)) as ProjectRecord;
}

export function getProjectById(projectId: number) {
  const stmt = db.prepare(`SELECT * FROM projects WHERE id = ?`);
  return stmt.get(projectId) as ProjectRecord | undefined;
}

export function listProjects() {
  const stmt = db.prepare(`SELECT * FROM projects ORDER BY id ASC`);
  return stmt.all() as ProjectRecord[];
}

export function updateProject(projectId: number, data: object) {
  const stmt = db.prepare(
    `UPDATE projects SET data = ? WHERE id = ?`
  );
  stmt.run(JSON.stringify(data), projectId);
}

export default db;
