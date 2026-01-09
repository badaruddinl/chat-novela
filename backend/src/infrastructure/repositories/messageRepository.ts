import { randomUUID } from "crypto";
import { eq, inArray, sql } from "drizzle-orm";
import { db } from "../db/client";
import { messages, versions } from "../db/schema";
import type { MessageRepository } from "../../domain/chat/repositories";
import type { Message, Version } from "../../domain/chat/entities";

export const messageRepository: MessageRepository = {
  async insertMessage(params: {
    conversationId: string;
    role: "user" | "assistant";
    content: string;
  }): Promise<string> {
    const id = randomUUID();
    await db
      .insert(messages)
      .values({
        id,
        conversationId: params.conversationId,
        role: params.role,
        content: params.content,
        activeVersionId: null,
        hidden: false,
      })
      .returning();
    return id;
  },

  async insertVersion(messageId: string, content: string): Promise<Version> {
    const id = randomUUID();
    const [countRow] = await db
      .select({ count: sql<number>`COUNT(1)` })
      .from(versions)
      .where(eq(versions.messageId, messageId));
    const versionNumber = Number(countRow?.count ?? 0) + 1;
    await db
      .insert(versions)
      .values({ id, messageId, content, versionNumber })
      .returning();
    return {
      id,
      messageId,
      content,
      versionNumber,
      createdAt: new Date(),
    };
  },

  async updateMessageActiveVersion(
    messageId: string,
    versionId: string
  ): Promise<void> {
    await db.execute(sql`
      UPDATE messages
      SET content = (SELECT content FROM versions WHERE id = ${versionId}),
          active_version_id = ${versionId}
      WHERE id = ${messageId}
    `);
  },

  async lockMessageVersion(messageId: string, versionId: string): Promise<void> {
    await db.execute(sql`BEGIN`);
    try {
      await db.execute(sql`
        UPDATE messages
        SET content = (SELECT content FROM versions WHERE id = ${versionId}),
            active_version_id = ${versionId}
        WHERE id = ${messageId}
      `);
      await db.execute(sql`
        DELETE FROM versions
        WHERE message_id = ${messageId}
          AND id <> ${versionId}
      `);
      await db.execute(sql`COMMIT`);
    } catch (error) {
      await db.execute(sql`ROLLBACK`);
      throw error;
    }
  },

  async setMessageHidden(messageId: string, hidden: boolean): Promise<void> {
    await db
      .update(messages)
      .set({ hidden })
      .where(eq(messages.id, messageId));
  },

  async deleteMessage(messageId: string): Promise<void> {
    await db.execute(sql`BEGIN`);
    try {
      await db.execute(sql`
        DELETE FROM versions
        WHERE message_id = ${messageId}
      `);
      await db.execute(sql`
        DELETE FROM messages
        WHERE id = ${messageId}
      `);
      await db.execute(sql`COMMIT`);
    } catch (error) {
      await db.execute(sql`ROLLBACK`);
      throw error;
    }
  },

  async countVersions(messageId: string): Promise<number> {
    const [countRow] = await db
      .select({ count: sql<number>`COUNT(1)` })
      .from(versions)
      .where(eq(versions.messageId, messageId));
    return Number(countRow?.count ?? 0);
  },

  async getMessageById(messageId: string): Promise<Message | null> {
    const rows = await db
      .select()
      .from(messages)
      .where(eq(messages.id, messageId))
      .limit(1);
    if (!rows[0]) return null;
    return {
      id: rows[0].id,
      conversationId: rows[0].conversationId,
      role: rows[0].role as "user" | "assistant",
      content: rows[0].content,
      activeVersionId: rows[0].activeVersionId ?? null,
      hidden: rows[0].hidden,
      createdAt: new Date(rows[0].createdAt),
    };
  },

  async listMessages(conversationId: string): Promise<{
    messages: Message[];
    versions: Version[];
  }> {
    const messageRows = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt, messages.id);

    const messageIds = messageRows.map((row) => row.id);
    const versionRows = messageIds.length
      ? await db
          .select()
          .from(versions)
          .where(inArray(versions.messageId, messageIds))
          .orderBy(versions.versionNumber)
      : [];

    return {
      messages: messageRows.map((row) => ({
        id: row.id,
        conversationId: row.conversationId,
        role: row.role as "user" | "assistant",
        content: row.content,
        activeVersionId: row.activeVersionId ?? null,
        hidden: row.hidden,
        createdAt: new Date(row.createdAt),
      })),
      versions: versionRows.map((row) => ({
        id: row.id,
        messageId: row.messageId,
        content: row.content,
        versionNumber: row.versionNumber,
        createdAt: new Date(row.createdAt),
      })),
    };
  },

  async getConversationContext(
    conversationId: string,
    limit: number
  ): Promise<Array<{ role: "user" | "assistant"; content: string }>> {
    const rows = await db.execute(sql`
      SELECT role, content
      FROM messages
      WHERE conversation_id = ${conversationId}
        AND hidden = FALSE
      ORDER BY created_at DESC, id DESC
      LIMIT ${limit}
    `);

    return rows.rows
      .slice()
      .reverse()
      .map((row) => ({
        role: row.role as "user" | "assistant",
        content: row.content as string,
      }));
  },

  async countMessages(conversationId: string): Promise<number> {
    const [countRow] = await db
      .select({ count: sql<number>`COUNT(1)` })
      .from(messages)
      .where(eq(messages.conversationId, conversationId));
    return Number(countRow?.count ?? 0);
  },
};
