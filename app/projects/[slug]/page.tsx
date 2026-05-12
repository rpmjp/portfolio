import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, type ProjectFile } from "../../lib/projects";
import ProjectFileRenderer from "../../components/ProjectFileRenderer";
import LanguagesBar from "../../components/LanguagesBar";

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

function findFile(project: ReturnType<typeof getProject>, fileName: string): ProjectFile | undefined {
  if (!project) return undefined;
  for (const folder of project.tree) {
    const found = folder.files.find((f) => f.name === fileName);
    if (found) return found;
  }
  return undefined;
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ file?: string }>;
}) {
  const { slug } = await params;
  const { file: fileParam } = await searchParams;
  const project = getProject(slug);
  if (!project) notFound();

  const selectedFileName = fileParam || "README.md";
  const selectedFile = findFile(project, selectedFileName);

  return (
    <article className="px-8 py-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-[13px] pb-3 mb-4 border-b font-mono flex-wrap" style={{ color: "var(--fg-muted)", borderColor: "var(--border-muted)" }}>
        <span style={{ color: "var(--accent-fg)" }}>rpmjp</span>
        <span>/</span>
        <span>projects</span>
        <span>/</span>
        <span style={{ color: "var(--fg-default)" }}>{project.slug}</span>
        {selectedFileName && (
          <>
            <span>/</span>
            <span style={{ color: "var(--fg-default)" }}>{selectedFileName}</span>
          </>
        )}
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

{project.languages && <LanguagesBar languages={project.languages} />}

      <ProjectFileRenderer file={selectedFile} fileName={selectedFileName} />
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