import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: false })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: false })
    .defaultNow()
    .notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id),
  role: text("role").notNull(),
  content: text("content").notNull(),
  activeVersionId: uuid("active_version_id"),
  createdAt: timestamp("created_at", { withTimezone: false })
    .defaultNow()
    .notNull(),
});

export const versions = pgTable("versions", {
  id: uuid("id").primaryKey(),
  messageId: uuid("message_id")
    .notNull()
    .references(() => messages.id),
  content: text("content").notNull(),
  versionNumber: integer("version_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: false })
    .defaultNow()
    .notNull(),
});
