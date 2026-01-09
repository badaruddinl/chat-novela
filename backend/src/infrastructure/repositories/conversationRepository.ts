import { sql, eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "../db/client";
import { conversations } from "../db/schema";
import type {
  ConversationRepository,
} from "../../domain/chat/repositories";
import type { Conversation, ConversationSummary } from "../../domain/chat/entities";

export const conversationRepository: ConversationRepository = {
  async listConversations(): Promise<ConversationSummary[]> {
    const result = await db.execute(sql`
      SELECT
        c.id,
        c.title,
        c.created_at,
        c.updated_at,
        c.pinned,
        (
          SELECT role FROM messages m
          WHERE m.conversation_id = c.id
            AND m.hidden = FALSE
          ORDER BY m.created_at DESC, m.id DESC
          LIMIT 1
        ) AS last_message_role,
        (
          SELECT content FROM messages m
          WHERE m.conversation_id = c.id
            AND m.hidden = FALSE
          ORDER BY m.created_at DESC, m.id DESC
          LIMIT 1
        ) AS last_message_content,
        (
          SELECT created_at FROM messages m
          WHERE m.conversation_id = c.id
            AND m.hidden = FALSE
          ORDER BY m.created_at DESC, m.id DESC
          LIMIT 1
        ) AS last_message_created_at
      FROM conversations c
      ORDER BY c.pinned DESC, c.updated_at DESC, c.id DESC
    `);

    return result.rows.map((row) => ({
      id: row.id as string,
      title: row.title as string,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
      pinned: Boolean(row.pinned),
      lastMessageRole: row.last_message_role as
        | "user"
        | "assistant"
        | null,
      lastMessageContent: row.last_message_content as string | null,
      lastMessageCreatedAt: row.last_message_created_at
        ? new Date(row.last_message_created_at as string)
        : null,
    }));
  },

  async createConversation(title: string): Promise<string> {
    const id = randomUUID();
    await db.insert(conversations).values({ id, title }).returning();
    return id;
  },

  async touchConversation(conversationId: string): Promise<void> {
    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, conversationId));
  },

  async updateConversationTitle(
    conversationId: string,
    title: string
  ): Promise<void> {
    await db
      .update(conversations)
      .set({ title, updatedAt: new Date() })
      .where(eq(conversations.id, conversationId));
  },

  async setPinned(conversationId: string, pinned: boolean): Promise<void> {
    await db
      .update(conversations)
      .set({ pinned, updatedAt: new Date() })
      .where(eq(conversations.id, conversationId));
  },

  async deleteConversation(conversationId: string): Promise<void> {
    await db.execute(sql`BEGIN`);
    try {
      await db.execute(sql`
        DELETE FROM versions
        WHERE message_id IN (
          SELECT id FROM messages WHERE conversation_id = ${conversationId}
        )
      `);
      await db.execute(sql`
        DELETE FROM messages
        WHERE conversation_id = ${conversationId}
      `);
      await db.execute(sql`
        DELETE FROM conversations
        WHERE id = ${conversationId}
      `);
      await db.execute(sql`COMMIT`);
    } catch (error) {
      await db.execute(sql`ROLLBACK`);
      throw error;
    }
  },

  async getConversationById(conversationId: string): Promise<Conversation | null> {
    const rows = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);
    if (!rows[0]) return null;
    return {
      id: rows[0].id,
      title: rows[0].title,
      createdAt: new Date(rows[0].createdAt),
      updatedAt: new Date(rows[0].updatedAt),
      pinned: rows[0].pinned,
    };
  },

  async getDefaultConversationId(): Promise<string> {
    const rows = await db
      .select({ id: conversations.id })
      .from(conversations)
      .orderBy(conversations.createdAt, conversations.id)
      .limit(1);
    if (rows[0]?.id) return rows[0].id;
    const id = randomUUID();
    await db.insert(conversations).values({ id, title: "Percakapan Baru" }).returning();
    return id;
  },
};
