import Database from "better-sqlite3";
import path from "path";
import { randomUUID } from "crypto";

const dbPath = path.join(process.cwd(), "data", "app.db");
const db = new Database(dbPath);

const hasColumn = (table: string, column: string) => {
  const rows = db
    .prepare(`PRAGMA table_info(${table})`)
    .all() as Array<{ name: string }>;
  return rows.some((row) => row.name === column);
};

db.exec(`
  CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    active_version_id TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
  );

  CREATE TABLE IF NOT EXISTS versions (
    id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL,
    content TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (message_id) REFERENCES messages(id)
  );
`);

if (!hasColumn("messages", "conversation_id")) {
  db.exec(`ALTER TABLE messages ADD COLUMN conversation_id TEXT`);
}

if (!hasColumn("versions", "version_number")) {
  db.exec(`ALTER TABLE versions ADD COLUMN version_number INTEGER DEFAULT 1`);
}

export const getDefaultConversationId = () => {
  const row = db
    .prepare(`SELECT id FROM conversations ORDER BY datetime(created_at) ASC, id ASC LIMIT 1`)
    .get() as { id: string } | undefined;
  if (row?.id) return row.id;
  const created = createConversation("Percakapan Baru");
  return created.id;
};

const defaultConversationId = getDefaultConversationId();
db.prepare(
  `UPDATE messages SET conversation_id = ? WHERE conversation_id IS NULL`
).run(defaultConversationId);

export type MessageRecord = {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  active_version_id: string | null;
  created_at: string;
};

export type ConversationRecord = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_message_role: "user" | "assistant" | null;
  last_message_content: string | null;
  last_message_created_at: string | null;
};

export type VersionRecord = {
  id: string;
  message_id: string;
  content: string;
  version_number: number;
  created_at: string;
};

export const touchConversation = (conversationId: string) => {
  db.prepare(
    `UPDATE conversations SET updated_at = datetime('now') WHERE id = ?`
  ).run(conversationId);
};

export const updateConversationTitle = (
  conversationId: string,
  title: string
) => {
  db.prepare(
    `UPDATE conversations SET title = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(title, conversationId);
};

export function createConversation(title: string) {
  const id = randomUUID();
  const stmt = db.prepare(
    `INSERT INTO conversations (id, title) VALUES (?, ?) RETURNING *`
  );
  return stmt.get(id, title) as { id: string };
}

export function listConversations() {
  const stmt = db.prepare(`
    SELECT
      c.id,
      c.title,
      c.created_at,
      c.updated_at,
      (
        SELECT role FROM messages m
        WHERE m.conversation_id = c.id
        ORDER BY m.id DESC
        LIMIT 1
      ) as last_message_role,
      (
        SELECT content FROM messages m
        WHERE m.conversation_id = c.id
        ORDER BY m.id DESC
        LIMIT 1
      ) as last_message_content,
      (
        SELECT created_at FROM messages m
        WHERE m.conversation_id = c.id
        ORDER BY m.id DESC
        LIMIT 1
      ) as last_message_created_at
    FROM conversations c
    ORDER BY datetime(c.updated_at) DESC, c.id DESC
  `);
  return stmt.all() as ConversationRecord[];
}

export function insertUserMessage(content: string, conversationId?: string) {
  const targetConversationId = conversationId ?? getDefaultConversationId();
  const conversation = db
    .prepare(`SELECT title FROM conversations WHERE id = ?`)
    .get(targetConversationId) as { title: string } | undefined;
  const countRow = db
    .prepare(
      `SELECT COUNT(1) as count FROM messages WHERE conversation_id = ?`
    )
    .get(targetConversationId) as { count: number };
  const id = randomUUID();
  const stmt = db.prepare(
    `INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?) RETURNING *`
  );
  const message = stmt.get(
    id,
    targetConversationId,
    "user",
    content
  ) as MessageRecord;
  if (countRow.count === 0 && conversation?.title === "Percakapan Baru") {
    const firstLine = content.split("\n")[0]?.trim() ?? "";
    const nextTitle =
      firstLine.length > 0 ? firstLine.slice(0, 60) : "Percakapan Baru";
    updateConversationTitle(targetConversationId, nextTitle);
  }
  touchConversation(targetConversationId);
  return message;
}

export function insertAssistantMessage(
  content: string,
  conversationId?: string
) {
  const targetConversationId = conversationId ?? getDefaultConversationId();
  const id = randomUUID();
  const stmt = db.prepare(
    `INSERT INTO messages (id, conversation_id, role, content, active_version_id) VALUES (?, ?, ?, ?, NULL) RETURNING *`
  );
  const message = stmt.get(
    id,
    targetConversationId,
    "assistant",
    content
  ) as MessageRecord;
  const version = insertVersion(message.id, content);
  const update = db.prepare(
    `UPDATE messages SET active_version_id = ? WHERE id = ?`
  );
  update.run(version.id, message.id);
  touchConversation(targetConversationId);

  return { messageId: message.id, versionId: version.id };
}

export function insertVersion(messageId: string, content: string) {
  const id = randomUUID();
  const countRow = db
    .prepare(`SELECT COUNT(1) as count FROM versions WHERE message_id = ?`)
    .get(messageId) as { count: number };
  const nextVersionNumber = countRow.count + 1;
  const stmt = db.prepare(
    `INSERT INTO versions (id, message_id, content, version_number) VALUES (?, ?, ?, ?) RETURNING *`
  );
  return stmt.get(id, messageId, content, nextVersionNumber) as VersionRecord;
}

export function updateMessageActiveVersion(
  messageId: string,
  versionId: string
) {
  const stmt = db.prepare(
    `UPDATE messages SET content = (SELECT content FROM versions WHERE id = ?), active_version_id = ? WHERE id = ?`
  );
  stmt.run(versionId, versionId, messageId);
}

export function getMessageById(messageId: string) {
  const stmt = db.prepare(`SELECT * FROM messages WHERE id = ?`);
  return stmt.get(messageId) as MessageRecord | undefined;
}

export function listMessages(conversationId: string) {
  const messageStmt = db.prepare(
    `SELECT * FROM messages WHERE conversation_id = ? ORDER BY datetime(created_at) ASC, id ASC`
  );
  const versionStmt = db.prepare(
    `SELECT * FROM versions WHERE message_id = ? ORDER BY version_number ASC`
  );

  const messages = messageStmt.all(conversationId) as MessageRecord[];
  return messages.map((message) => {
    const versions = versionStmt.all(message.id) as VersionRecord[];
    return {
      ...message,
      versions,
    };
  });
}

export function getConversationContext(conversationId: string, limit = 12) {
  const stmt = db.prepare(
    `SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY datetime(created_at) DESC, id DESC LIMIT ?`
  );
  const rows = stmt.all(conversationId, limit) as Array<{
    role: string;
    content: string;
  }>;
  return rows.reverse().map((row) => ({
    role: row.role as "user" | "assistant",
    content: row.content,
  }));
}

export default db;
