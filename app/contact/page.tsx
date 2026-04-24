import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact · Robert Jean Pierre",
  description: "Get in touch. Open to data, full-stack, software engineering, and AI/ML roles.",
};

export default function ContactPage() {
  return (
    <article className="px-6 py-16 sm:py-24 max-w-2xl mx-auto flex flex-col items-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium mb-6" style={{ background: "var(--success-bg)", border: "0.5px solid var(--success-fg)", color: "var(--success-fg)" }}>
        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--success-fg)" }} />
        Open to opportunities
      </div>

      <h1 className="text-[28px] font-medium mb-3 text-center" style={{ color: "var(--fg-default)" }}>
        Let&apos;s talk.
      </h1>

      <p className="text-[14px] leading-relaxed text-center mb-8 max-w-md" style={{ color: "var(--fg-muted)" }}>
        I am actively interviewing for roles in data, full-stack, software engineering, and AI/ML. Whether you are hiring or just want to talk shop, reach out.
      </p>

      <a href="mailto:robertjp@live.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[15px] font-medium transition-opacity hover:opacity-90 mb-4" style={{ background: "var(--accent-fg)", color: "#ffffff", textDecoration: "none" }}>
        <Mail size={16} />
        Email me
      </a>

      <div className="flex gap-4 items-center mb-12 text-[13px]">
        <a href="https://linkedin.com/in/rpmjp" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          LinkedIn
        </a>
        <span style={{ color: "var(--border-default)" }}>·</span>
        <a href="https://github.com/rpmjp" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          GitHub
        </a>
        <span style={{ color: "var(--border-default)" }}>·</span>
        <a href="https://www.kaggle.com/robertmcs" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          Kaggle
        </a>
      </div>

      <div className="grid grid-cols-3 gap-8 pt-7 border-t w-full max-w-md text-center" style={{ borderColor: "var(--border-muted)" }}>
        <div>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--fg-muted)" }}>Based in</div>
          <div className="text-[13px]" style={{ color: "var(--fg-default)" }}>North Brunswick, NJ</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--fg-muted)" }}>Response</div>
          <div className="text-[13px]" style={{ color: "var(--fg-default)" }}>1–2 days</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--fg-muted)" }}>Available</div>
          <div className="text-[13px]" style={{ color: "var(--fg-default)" }}>Summer 2026</div>
        </div>
      </div>
    </article>
  );
}