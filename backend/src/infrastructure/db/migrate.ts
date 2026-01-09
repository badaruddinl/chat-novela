import { sql } from "drizzle-orm";
import { db } from "./client";

export async function migrate() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  const appliedResult = await db.execute(sql`SELECT id FROM schema_migrations`);
  const applied = new Set(appliedResult.rows.map((row) => row.id as string));

  const migrations: Array<{ id: string; sql: string[] }> = [
    {
      id: "001_init",
      sql: [
        `
        CREATE TABLE IF NOT EXISTS conversations (
          id UUID PRIMARY KEY,
          title TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS messages (
          id UUID PRIMARY KEY,
          conversation_id UUID NOT NULL REFERENCES conversations(id),
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          active_version_id UUID,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS versions (
          id UUID PRIMARY KEY,
          message_id UUID NOT NULL REFERENCES messages(id),
          content TEXT NOT NULL,
          version_number INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        `,
        `CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);`,
        `CREATE INDEX IF NOT EXISTS idx_versions_message_id ON versions(message_id);`,
        `CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);`,
      ],
    },
    {
      id: "002_add_message_hidden",
      sql: [
        `
        ALTER TABLE messages
        ADD COLUMN IF NOT EXISTS hidden BOOLEAN NOT NULL DEFAULT FALSE;
        `,
      ],
    },
    {
      id: "003_add_conversation_pinned",
      sql: [
        `
        ALTER TABLE conversations
        ADD COLUMN IF NOT EXISTS pinned BOOLEAN NOT NULL DEFAULT FALSE;
        `,
      ],
    },
  ];

  for (const migration of migrations) {
    if (applied.has(migration.id)) continue;
    await db.execute(sql`BEGIN`);
    try {
      for (const statement of migration.sql) {
        await db.execute(sql.raw(statement));
      }
      await db.execute(
        sql`INSERT INTO schema_migrations (id) VALUES (${migration.id})`
      );
      await db.execute(sql`COMMIT`);
    } catch (error) {
      await db.execute(sql`ROLLBACK`);
      throw error;
    }
  }
}
