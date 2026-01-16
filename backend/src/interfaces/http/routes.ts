import type { FastifyInstance } from "fastify";
import type { ChatService } from "../../application/chat/chatService";
import type { ConversationService } from "../../application/chat/conversationService";
import type { RevisionService } from "../../application/chat/revisionService";
import type { ProjectService } from "../../application/project/projectService";

type Services = {
  chatService: ChatService;
  conversationService: ConversationService;
  revisionService: RevisionService;
  projectService: ProjectService;
};

export async function registerRoutes(app: FastifyInstance, services: Services) {
  app.get("/health", async () => ({ ok: true }));

  app.post("/project/analyze", async (request, reply) => {
    const data = await request.file();
    if (!data) {
      reply.code(400);
      return { error: "File is required" };
    }
    const buffer = await data.toBuffer();
    const result = await services.projectService.analyzeDocument({
      filename: data.filename,
      content: buffer,
    });
    return result;
  });

  app.post("/project/initialize", async (request, reply) => {
    const body = request.body as any;
    await services.projectService.initializeProject(body);
    return { ok: true };
  });

  app.get("/conversations", async () => {
    const conversations = await services.conversationService.listConversations();
    return { conversations };
  });

  app.post("/conversations", async (request) => {
    const body = request.body as { title?: string };
    const title = body.title?.trim() || "Percakapan Baru";
    const conversationId = await services.conversationService.createConversation(
      title
    );
    return { conversationId };
  });

  app.get("/messages", async (request) => {
    const query = request.query as { conversationId?: string };
    const conversationId =
      query.conversationId && query.conversationId.trim().length > 0
        ? query.conversationId
        : await services.conversationService.getDefaultConversationId();
    const messages = await services.chatService.listMessages(conversationId);
    return { messages };
  });

  app.post("/chat", async (request, reply) => {
    const body = request.body as { content?: string; conversationId?: string };
    const content = body.content?.trim();
    if (!content) {
      reply.code(400);
      return { error: "Content is required." };
    }
    const result = await services.chatService.sendMessage({
      content,
      conversationId: body.conversationId,
    });
    return { messages: result.messages, conversationId: result.conversationId };
  });

  app.post("/revise", async (request, reply) => {
    const body = request.body as {
      messageId?: string;
      instruction?: string;
      mode?: "partial" | "regenerate" | "switch";
      versionId?: string;
      conversationId?: string;
    };
    if (!body.messageId) {
      reply.code(400);
      return { error: "messageId is required" };
    }
    try {
      const messages = await services.revisionService.revise({
        messageId: body.messageId,
        instruction: body.instruction,
        mode: body.mode,
        versionId: body.versionId,
        conversationId: body.conversationId,
      });
      return { messages };
    } catch (error) {
      reply.code(400);
      return {
        error:
          error instanceof Error
            ? error.message
            : "Gagal memproses revisi.",
      };
    }
  });

  app.post("/messages/:messageId/hide", async (request, reply) => {
    const params = request.params as { messageId?: string };
    if (!params.messageId) {
      reply.code(400);
      return { error: "messageId is required" };
    }
    const messages = await services.chatService.setMessageHidden({
      messageId: params.messageId,
      hidden: true,
    });
    return { messages };
  });

  app.post("/messages/:messageId/unhide", async (request, reply) => {
    const params = request.params as { messageId?: string };
    if (!params.messageId) {
      reply.code(400);
      return { error: "messageId is required" };
    }
    const messages = await services.chatService.setMessageHidden({
      messageId: params.messageId,
      hidden: false,
    });
    return { messages };
  });

  app.post("/messages/:messageId/lock-version", async (request, reply) => {
    const params = request.params as { messageId?: string };
    const body = request.body as { versionId?: string };
    if (!params.messageId || !body.versionId) {
      reply.code(400);
      return { error: "messageId and versionId are required" };
    }
    try {
      const messages = await services.chatService.lockMessageVersion({
        messageId: params.messageId,
        versionId: body.versionId,
      });
      return { messages };
    } catch (error) {
      reply.code(400);
      return {
        error:
          error instanceof Error
            ? error.message
            : "Gagal mengunci versi.",
      };
    }
  });

  app.delete("/messages/:messageId", async (request, reply) => {
    const params = request.params as { messageId?: string };
    if (!params.messageId) {
      reply.code(400);
      return { error: "messageId is required" };
    }
    try {
      const messages = await services.chatService.deleteMessage(params.messageId);
      return { messages };
    } catch (error) {
      reply.code(400);
      return {
        error:
          error instanceof Error
            ? error.message
            : "Gagal menghapus pesan.",
      };
    }
  });

  app.delete(
    "/messages/:messageId/versions/:versionId",
    async (request, reply) => {
      const params = request.params as {
        messageId?: string;
        versionId?: string;
      };
      if (!params.messageId || !params.versionId) {
        reply.code(400);
        return { error: "messageId and versionId are required" };
      }
      try {
        const messages = await services.chatService.deleteMessageVersion({
          messageId: params.messageId,
          versionId: params.versionId,
        });
        return { messages };
      } catch (error) {
        reply.code(400);
        return {
          error:
            error instanceof Error
              ? error.message
              : "Gagal menghapus versi.",
        };
      }
    }
  );

  app.post("/conversations/:conversationId/pin", async (request, reply) => {
    const params = request.params as { conversationId?: string };
    if (!params.conversationId) {
      reply.code(400);
      return { error: "conversationId is required" };
    }
    await services.conversationService.setPinned({
      conversationId: params.conversationId,
      pinned: true,
    });
    return { ok: true };
  });

  app.post("/conversations/:conversationId/unpin", async (request, reply) => {
    const params = request.params as { conversationId?: string };
    if (!params.conversationId) {
      reply.code(400);
      return { error: "conversationId is required" };
    }
    await services.conversationService.setPinned({
      conversationId: params.conversationId,
      pinned: false,
    });
    return { ok: true };
  });

  app.delete("/conversations/:conversationId", async (request, reply) => {
    const params = request.params as { conversationId?: string };
    if (!params.conversationId) {
      reply.code(400);
      return { error: "conversationId is required" };
    }
    await services.conversationService.deleteConversation(params.conversationId);
    return { ok: true };
  });
}
