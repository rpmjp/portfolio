import { notFound } from "next/navigation";
import { getProject, projects } from "../../lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="px-8 py-6 max-w-3xl">
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-2 text-[13px] pb-3 mb-4 border-b"
        style={{
          color: "var(--fg-muted)",
          borderColor: "var(--border-muted)",
        }}
      >
        <span style={{ color: "var(--accent-fg)" }}>{project.name}</span>
        <span>/</span>
        <span style={{ color: "var(--fg-default)" }}>README.md</span>
      </div>

      {/* Title + category badge */}
      <div className="flex items-center gap-2.5 mb-4">
        <h1
          className="text-[22px] font-medium"
          style={{ color: "var(--fg-default)" }}
        >
          {project.title}
        </h1>
        <span
          className="text-[11px] px-2 py-0.5 rounded-full"
          style={{
            background: "var(--accent-bg)",
            color: "var(--accent-fg)",
            border: "1px solid var(--accent-border)",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Meta row */}
      <div
        className="flex gap-4 text-xs mb-5"
        style={{ color: "var(--fg-muted)" }}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ background: "#3572A5" }}
          />
          Python
        </span>
        <span>Updated recently</span>
        <span>{project.year}</span>
      </div>

      {/* Tagline */}
      <p
        className="text-[14px] leading-relaxed mb-6"
        style={{ color: "var(--fg-default)" }}
      >
        {project.tagline}
      </p>

      {/* Placeholder for the real README content */}
      <div
        className="p-4 rounded-md text-[13px]"
        style={{
          background: "var(--bg-muted)",
          border: "1px solid var(--border-default)",
          color: "var(--fg-muted)",
        }}
      >
        Detailed case study coming soon. This project&apos;s full README,
        architecture diagrams, and metrics will appear here.
      </div>

      {/* Stack badges */}
      <h2
        className="text-base font-medium mt-6 mb-2.5 pb-1.5 border-b"
        style={{
          color: "var(--fg-default)",
          borderColor: "var(--border-muted)",
        }}
      >
        Stack
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5 rounded-full"
            style={{
              background: "var(--bg-muted)",
              border: "1px solid var(--border-default)",
              color: "var(--fg-default)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}