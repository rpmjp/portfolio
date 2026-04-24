import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} · Robert Jean Pierre`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="px-8 py-8 max-w-3xl">
      <div className="flex items-center gap-2 text-[13px] pb-3 mb-4 border-b font-mono flex-wrap" style={{ color: "var(--fg-muted)", borderColor: "var(--border-muted)" }}>
        <span style={{ color: "var(--accent-fg)" }}>rpmjp</span>
        <span>/</span>
        <span>projects</span>
        <span>/</span>
        <span style={{ color: "var(--fg-default)" }}>{project.slug}</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-3">
        <StatusPill status={project.status} />
        {project.dateRange && (
          <span className="text-[12px]" style={{ color: "var(--fg-muted)" }}>{project.dateRange}</span>
        )}
      </div>

      <h1 className="text-[24px] font-medium mb-2" style={{ color: "var(--fg-default)" }}>
        {project.title}
      </h1>
      <p className="text-[14px] leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-8">
        {project.stack.map((tech) => (
          <span key={tech} className="text-[11px] px-2 py-0.5 rounded" style={{ background: "var(--bg-muted)", border: "0.5px solid var(--border-default)", color: "var(--fg-muted)" }}>
            {tech}
          </span>
        ))}
      </div>

      <div className="rounded-lg p-8 text-center" style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border-muted)" }}>
        <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-subtle)" }}>
          README.md
        </div>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--fg-default)" }}>
          {project.status === "in-progress"
            ? "This project is under active development. Detailed case study coming soon."
            : project.status === "planned"
            ? "This project is in the planning phase. Check back soon."
            : "Case study coming soon. In the meantime, the high-level overview above describes the project scope and technologies."}
        </p>
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