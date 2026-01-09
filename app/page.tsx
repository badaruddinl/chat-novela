"use client";

import { useEffect, useState } from "react";

type MessageVersion = {
  id: number;
  content: string;
  createdAt: string;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  versions?: MessageVersion[];
  activeVersionId?: number | null;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    void fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setIsSending(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: trimmed }),
    });

    const data = await response.json();
    setMessages(data.messages);
    setInput("");
    setIsSending(false);
  };

  const handlePartialRevision = async (messageId: number) => {
    const instruction = window.prompt("Instruksi revisi sebagian:");
    if (!instruction) return;
    setIsSending(true);

    const response = await fetch("/api/revise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, instruction, mode: "partial" }),
    });

    const data = await response.json();
    setMessages(data.messages);
    setIsSending(false);
  };

  const handleRegenerate = async (messageId: number) => {
    const shouldRegenerate = window.confirm(
      "Regenerate total? Versi baru akan dibuat."
    );
    if (!shouldRegenerate) return;
    setIsSending(true);

    const response = await fetch("/api/revise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, mode: "regenerate" }),
    });

    const data = await response.json();
    setMessages(data.messages);
    setIsSending(false);
  };

  const handleSwitchVersion = async (messageId: number, versionId: number) => {
    setIsSending(true);
    const response = await fetch("/api/revise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, mode: "switch", versionId }),
    });
    const data = await response.json();
    setMessages(data.messages);
    setIsSending(false);
  };

  return (
    <section className="chat">
      <header className="chat-header">
        <h1>Novel Chat</h1>
        <p>
          Mode chat dengan revisi parsial atau regenerate total. Aturan novel
          otomatis disuntikkan ke prompt.
        </p>
      </header>

      <div className="chat-window">
        {messages.map((message) => (
          <div key={message.id} className={`message message-${message.role}`}>
            <div className="message-meta">
              <span className="role">{message.role}</span>
              <span className="time">
                {new Date(message.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="message-content">
              {message.content.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            {message.role === "assistant" && message.versions && (
              <div className="message-actions">
                <div className="version-tabs">
                  {message.versions.map((version) => (
                    <button
                      key={version.id}
                      className={
                        version.id === message.activeVersionId ? "active" : ""
                      }
                      onClick={() =>
                        handleSwitchVersion(message.id, version.id)
                      }
                      disabled={isSending}
                    >
                      {`v${version.id}`}
                    </button>
                  ))}
                </div>
                <div className="revision-buttons">
                  <button
                    onClick={() => handlePartialRevision(message.id)}
                    disabled={isSending}
                  >
                    Revisi Sebagian
                  </button>
                  <button
                    onClick={() => handleRegenerate(message.id)}
                    disabled={isSending}
                  >
                    Regenerate Total
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="chat-input">
        <textarea
          rows={4}
          placeholder="Tulis prompt atau bab..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={sendMessage} disabled={isSending}>
          {isSending ? "Mengirim..." : "Kirim"}
        </button>
      </footer>
    </section>
  );
}
