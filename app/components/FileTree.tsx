"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
    <div className="flex flex-col gap-0.5 text-[14px]">
      {project.tree.map((folder) => {
        const isOpen = expandedFolders.has(folder.name);
        return (
          <div key={folder.name}>
            <button onClick={() => toggleFolder(folder.name)} className="flex items-center gap-2 px-2 py-1.5 w-full rounded-md hover:opacity-80 transition-opacity text-left" style={{ color: "var(--fg-default)", background: "transparent", border: "none", cursor: "pointer" }}>
              {isOpen ? <ChevronDown size={16} style={{ color: "var(--fg-muted)" }} /> : <ChevronRight size={16} style={{ color: "var(--fg-muted)" }} />}
              <FileIcon name={folder.name} isFolder isOpen={isOpen} size={18} />
              <span className="truncate font-medium">{folder.name}</span>
            </button>

            {isOpen && (
              <div className="flex flex-col gap-0.5 ml-5 mt-1 pl-3" style={{ borderLeft: "1px solid var(--border-muted)" }}>
                {folder.files.map((file) => (
                  <FileItem key={file.name} file={file} projectSlug={project.slug} isActive={file.name === currentFile} />
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
  const baseClasses = "flex items-center gap-2 px-2 py-1.5 rounded-md text-[14px] hover:opacity-80 transition-opacity cursor-pointer";
  const baseStyle: React.CSSProperties = {
    color: isActive ? "var(--fg-default)" : "var(--fg-muted)",
    background: isActive ? "var(--accent-bg)" : "transparent",
    borderLeft: isActive ? "2px solid var(--accent-fg)" : "2px solid transparent",
    textDecoration: "none",
    fontWeight: isActive ? 500 : 400,
  };

  if (file.type === "link" && file.external && file.href) {
    return (
      <a href={file.href} target="_blank" rel="noopener noreferrer" className={baseClasses} style={baseStyle}>
        <FileIcon name={file.name} size={16} />
        <span className="truncate">{file.name}</span>
        <span className="ml-auto text-[12px]" style={{ color: "var(--fg-subtle)" }}>↗</span>
      </a>
    );
  }

  return (
    <Link href={`/projects/${projectSlug}?file=${encodeURIComponent(file.name)}`} className={baseClasses} style={baseStyle}>
      <FileIcon name={file.name} size={16} />
      <span className="truncate">{file.name}</span>
    </Link>
  );
}