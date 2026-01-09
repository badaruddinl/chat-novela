import "dotenv/config";
import Fastify from "fastify";
import { migrate } from "./infrastructure/db/migrate";
import { conversationRepository } from "./infrastructure/repositories/conversationRepository";
import { messageRepository } from "./infrastructure/repositories/messageRepository";
import { codexClient } from "./infrastructure/ai/codexClient";
import { promptBuilder } from "./infrastructure/prompt/promptBuilder";
import { ConversationService } from "./application/chat/conversationService";
import { ChatService } from "./application/chat/chatService";
import { RevisionService } from "./application/chat/revisionService";
import { registerRoutes } from "./interfaces/http/routes";

const app = Fastify({ logger: true });

const conversationService = new ConversationService(conversationRepository);
const chatService = new ChatService(
  conversationRepository,
  messageRepository,
  codexClient
);
const revisionService = new RevisionService(
  conversationRepository,
  messageRepository,
  codexClient,
  promptBuilder
);

const start = async () => {
  await migrate();
  await registerRoutes(app, {
    chatService,
    conversationService,
    revisionService,
  });

  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";
  await app.listen({ port, host });
};

start().catch((error) => {
  app.log.error(error);
  process.exit(1);
});
