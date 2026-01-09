import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "app.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    active_version_id INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (message_id) REFERENCES messages(id)
  );
`);

export type MessageRecord = {
  id: number;
  role: "user" | "assistant";
  content: string;
  active_version_id: number | null;
  created_at: string;
};

export type VersionRecord = {
  id: number;
  message_id: number;
  content: string;
  created_at: string;
};

export function insertUserMessage(content: string) {
  const stmt = db.prepare(
    `INSERT INTO messages (role, content) VALUES (?, ?) RETURNING *`
  );
  return stmt.get("user", content) as MessageRecord;
}

export function insertAssistantMessage(content: string) {
  const stmt = db.prepare(
    `INSERT INTO messages (role, content, active_version_id) VALUES (?, ?, NULL) RETURNING *`
  );
  const message = stmt.get("assistant", content) as MessageRecord;
  const version = insertVersion(message.id, content);
  const update = db.prepare(
    `UPDATE messages SET active_version_id = ? WHERE id = ?`
  );
  update.run(version.id, message.id);

  return { messageId: message.id, versionId: version.id };
}

export function insertVersion(messageId: number, content: string) {
  const stmt = db.prepare(
    `INSERT INTO versions (message_id, content) VALUES (?, ?) RETURNING *`
  );
  return stmt.get(messageId, content) as VersionRecord;
}

export function updateMessageActiveVersion(
  messageId: number,
  versionId: number
) {
  const stmt = db.prepare(
    `UPDATE messages SET content = (SELECT content FROM versions WHERE id = ?), active_version_id = ? WHERE id = ?`
  );
  stmt.run(versionId, versionId, messageId);
}

export function getMessageById(messageId: number) {
  const stmt = db.prepare(`SELECT * FROM messages WHERE id = ?`);
  return stmt.get(messageId) as MessageRecord | undefined;
}

export function listMessages() {
  const messageStmt = db.prepare(`SELECT * FROM messages ORDER BY id ASC`);
  const versionStmt = db.prepare(
    `SELECT * FROM versions WHERE message_id = ? ORDER BY id ASC`
  );

  const messages = messageStmt.all() as MessageRecord[];
  return messages.map((message) => {
    const versions = versionStmt.all(message.id) as VersionRecord[];
    return {
      ...message,
      versions,
    };
  });
}

export function getConversationContext(limit = 12) {
  const stmt = db.prepare(
    `SELECT role, content FROM messages ORDER BY id DESC LIMIT ?`
  );
  const rows = stmt.all(limit) as Array<{ role: string; content: string }>;
  return rows.reverse().map((row) => ({
    role: row.role as "user" | "assistant",
    content: row.content,
  }));
}

export default db;
