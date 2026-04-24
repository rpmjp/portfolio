"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";
import { FileIcon } from "../lib/fileIcons";
import type { Project, ProjectFile } from "../lib/projects";

export default function FileTree({ project }: { project: Project }) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(project.tree.map((f) => f.name)));
  const searchParams = useSearchParams();
  const currentFile = searchParams.get("file") || "README.md";

  function toggleFolder(name: string) {
    const next = new Set(expandedFolders);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setExpandedFolders(next);
  }

  return (
    <div className="flex flex-col gap-px text-[13px]">
      {project.tree.map((folder) => {
        const isOpen = expandedFolders.has(folder.name);
        return (
          <div key={folder.name}>
            <button onClick={() => toggleFolder(folder.name)} className="flex items-center gap-1.5 px-1.5 py-1 w-full rounded-md hover:opacity-80 transition-opacity text-left" style={{ color: "var(--fg-default)", background: "transparent", border: "none", cursor: "pointer" }}>
              {isOpen ? <ChevronDown size={12} style={{ color: "var(--fg-muted)" }} /> : <ChevronRight size={12} style={{ color: "var(--fg-muted)" }} />}
              <FileIcon name={folder.name} isFolder isOpen={isOpen} size={14} />
              <span className="truncate">{folder.name}</span>
            </button>

            {isOpen && (
              <div className="flex flex-col gap-px ml-4 mt-0.5 pl-2" style={{ borderLeft: "0.5px solid var(--border-muted)" }}>
                {folder.files.map((file) => (
                  <FileItem key={file.name} file={file} projectSlug={project.slug} isActive={file.name === currentFile && file.type === "readme"} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FileItem({ file, projectSlug, isActive }: { file: ProjectFile; projectSlug: string; isActive: boolean }) {
  const router = useRouter();
  const baseClasses = "flex items-center gap-1.5 px-2 py-1 rounded-md text-[13px] hover:opacity-80 transition-opacity cursor-pointer";
  const baseStyle: React.CSSProperties = {
    color: isActive ? "var(--fg-default)" : "var(--fg-muted)",
    background: isActive ? "var(--accent-bg)" : "transparent",
    borderLeft: isActive ? "2px solid var(--accent-fg)" : "2px solid transparent",
    textDecoration: "none",
    fontWeight: isActive ? 500 : 400,
  };

  if (file.type === "readme") {
    return (
      <Link href={`/projects/${projectSlug}?file=${encodeURIComponent(file.name)}`} className={baseClasses} style={baseStyle}>
        <FileIcon name={file.name} size={14} />
        <span className="truncate">{file.name}</span>
      </Link>
    );
  }

  if (file.external && file.href) {
    return (
      <a href={file.href} target="_blank" rel="noopener noreferrer" className={baseClasses} style={baseStyle}>
        <FileIcon name={file.name} size={14} />
        <span className="truncate">{file.name}</span>
        <span className="ml-auto text-[10px]" style={{ color: "var(--fg-subtle)" }}>↗</span>
      </a>
    );
  }

  return (
    <div className={baseClasses} style={baseStyle} onClick={() => file.href && router.push(file.href)}>
      <FileIcon name={file.name} size={14} />
      <span className="truncate">{file.name}</span>
    </div>
  );
}