"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

type Source = { title: string; url: string; slug: string };
type Msg = { role: "user" | "robi"; text: string; sources?: Source[] };

const API = "https://chat.robertjeanpierre.com/ask";

const SUGGESTIONS = [
  "Who is Robert?",
  "Tell me about SkillBridge",
  "What did his Swin Transformer research find?",
  "Why did he leave Verizon for grad school?",
];

export default function RobiWidget() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, loading]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "robi", text: data.answer, sources: data.sources }]);
    } catch {
      setMsgs((m) => [...m, { role: "robi", text: "Robi is unavailable right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-lg border font-mono text-[13px] flex flex-col"
      style={{ borderColor: "var(--border-default)", background: "var(--bg-subtle, transparent)", height: "440px" }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "var(--border-muted)" }}>
        <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-fg)" }} />
        <span style={{ color: "var(--fg-default)" }}>Robi</span>
        <span style={{ color: "var(--fg-muted)" }}>· ask about Robert</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {msgs.length === 0 && (
          <div className="space-y-2">
            <p style={{ color: "var(--fg-muted)" }}>
              Ask me anything about Robert, his projects, or his background.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="px-2.5 py-1 rounded border text-left transition-colors"
                  style={{ borderColor: "var(--border-default)", color: "var(--fg-default)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {msgs.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <div style={{ color: "var(--accent-fg)" }}>
                <span style={{ color: "var(--fg-muted)" }}>&gt; </span>
                {m.text}
              </div>
            ) : (
              <div style={{ color: "var(--fg-default)" }} className="leading-relaxed">
                {m.text}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {m.sources.map((s) => (
                      <a key={s.slug} href={s.url} className="underline" style={{ color: "var(--fg-muted)" }}>
                        {s.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && <div style={{ color: "var(--fg-muted)" }}>Robi is thinking...</div>}
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5 border-t" style={{ borderColor: "var(--border-muted)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(input)}
          placeholder="Ask about Robert..."
          className="flex-1 bg-transparent outline-none"
          style={{ color: "var(--fg-default)" }}
        />
        <button onClick={() => ask(input)} disabled={loading} style={{ color: "var(--accent-fg)" }}>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
