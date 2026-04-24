import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../lib/projects";

export const metadata: Metadata = {
  title: "Projects · Robert Jean Pierre",
  description: "Featured projects — ML research, data pipelines, and full-stack systems.",
};

export default function ProjectsPage() {
  return (
    <article className="px-8 py-8 max-w-4xl">
      <div className="flex items-center gap-2 text-[13px] pb-3 mb-4 border-b font-mono" style={{ color: "var(--fg-muted)", borderColor: "var(--border-muted)" }}>
        <span style={{ color: "var(--accent-fg)" }}>rpmjp</span>
        <span>/</span>
        <span style={{ color: "var(--fg-default)" }}>projects</span>
      </div>

      <h1 className="text-[22px] font-medium mb-2" style={{ color: "var(--fg-default)" }}>Projects</h1>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
        A mix of research, production systems, and applied ML work. Click any project to explore its files, documentation, and source.
      </p>

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-lg p-5 transition-colors hover:bg-opacity-50"
            style={{
              border: "0.5px solid var(--border-muted)",
              background: "var(--bg-surface)",
              textDecoration: "none",
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-[15px] font-medium group-hover:underline" style={{ color: "var(--accent-fg)" }}>
                  {project.title}
                </h2>
                <StatusPill status={project.status} />
                {project.featured && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md" style={{ background: "var(--bg-muted)", color: "var(--fg-muted)", border: "0.5px solid var(--border-muted)" }}>
                    Featured
                  </span>
                )}
              </div>
              {project.dateRange && (
                <span className="text-[11px]" style={{ color: "var(--fg-muted)" }}>{project.dateRange}</span>
              )}
            </div>

            <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--fg-default)" }}>
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="text-[11px] px-2 py-0.5 rounded" style={{ background: "var(--bg-muted)", border: "0.5px solid var(--border-default)", color: "var(--fg-muted)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: "completed" | "in-progress" | "planned" }) {
  const config = {
    completed: { bg: "var(--success-bg)", fg: "var(--success-fg)", label: "Completed" },
    "in-progress": { bg: "rgba(47,129,247,0.1)", fg: "var(--accent-fg)", label: "In progress" },
    planned: { bg: "rgba(217,119,6,0.1)", fg: "#d97706", label: "Planned" },
  };
  const c = config[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md" style={{ background: c.bg, color: c.fg, border: `0.5px solid ${c.fg}` }}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.fg }} />
      {c.label}
    </span>
  );
}