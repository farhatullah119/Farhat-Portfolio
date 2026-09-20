"use client";

import { useRef, useState, useEffect } from "react";
import { Sparkles, X, Send, Trash2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm Farhat's AI portfolio assistant. Ask me about his projects, skills, education, certifications, interests, or how to contact him.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "I don't have that information in Farhat's portfolio yet." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Something went wrong reaching the assistant. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-paper shadow-lg transition-transform hover:scale-105"
        >
          <Sparkles size={16} /> Ask Farhat AI
        </button>
      )}

      {open && (
        <div className="fixed inset-x-4 bottom-4 z-40 flex h-[70vh] max-h-[560px] flex-col rounded-lg border border-line bg-paper shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2 text-ink">
              <Sparkles size={16} className="text-signal" />
              <span className="text-sm font-medium">Farhat AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Clear conversation"
                onClick={() => setMessages([WELCOME])}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-ink"
              >
                <Trash2 size={15} />
              </button>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user" ? "ml-auto bg-signal text-signal-ink" : "bg-surface text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex w-fit items-center gap-1 rounded-lg bg-surface px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about projects, skills, contact…"
              className="field"
              aria-label="Message"
            />
            <button
              onClick={send}
              disabled={loading}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ink text-paper disabled:opacity-60"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
