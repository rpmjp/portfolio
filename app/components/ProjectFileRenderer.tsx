"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ProjectFile } from "../lib/projects";

type Props = {
  file: ProjectFile | undefined;
  fileName: string;
};

export default function ProjectFileRenderer(props: Props) {
  const file = props.file;
  const fileName = props.fileName;

  if (!file) {
    return (
      <div className="rounded-lg p-8 text-center" style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border-muted)" }}>
        <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-subtle)" }}>{fileName}</div>
        <p className="text-[14px]" style={{ color: "var(--fg-muted)" }}>File not found.</p>
      </div>
    );
  }

  if (file.type === "link" && file.href) {
    const linkProps = {
      href: file.href,
      target: file.external ? "_blank" : undefined,
      rel: file.external ? "noopener noreferrer" : undefined,
      className: "text-[14px] hover:underline",
      style: { color: "var(--accent-fg)" },
    };
    return (
      <div className="rounded-lg p-6" style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border-muted)" }}>
        <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-subtle)" }}>{file.name}</div>
        <a {...linkProps}>{file.href}</a>
      </div>
    );
  }

  if (file.type === "code") {
    return (
      <div className="rounded-lg overflow-hidden" style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border-muted)" }}>
        <div className="px-4 py-2 text-[11px] uppercase tracking-wider border-b font-mono" style={{ color: "var(--fg-subtle)", borderColor: "var(--border-muted)", background: "var(--bg-muted)" }}>{file.name}</div>
        <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed font-mono" style={{ color: "var(--fg-default)" }}><code>{file.content || "// no content"}</code></pre>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-6" style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border-muted)" }}>
      <div className="text-[11px] uppercase tracking-wider mb-4 font-mono" style={{ color: "var(--fg-subtle)" }}>{file.name}</div>
      <div className="markdown-body text-[14px] leading-relaxed" style={{ color: "var(--fg-default)" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{file.content || "*No content yet.*"}</ReactMarkdown>
      </div>
    </div>
  );
}