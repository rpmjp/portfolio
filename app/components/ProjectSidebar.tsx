"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, X } from "lucide-react";
import FileTree from "./FileTree";
import type { Project } from "../lib/projects";

type ProjectSidebarProps = {
  project: Project;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
};

export default function ProjectSidebar({ project, isOpen = true, onClose, isMobile = false }: ProjectSidebarProps) {
  return (
    <>
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose} aria-hidden />
      )}

      <aside
        className={`${isMobile ? "fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 overflow-y-auto" : ""} w-60 shrink-0 border-r px-4 py-5 flex flex-col gap-4`}
        style={{
          background: "var(--bg-canvas)",
          borderColor: "var(--border-muted)",
          transform: isMobile ? (isOpen ? "translateX(0)" : "translateX(-100%)") : undefined,
        }}
      >
        {isMobile && (
          <button onClick={onClose} className="self-end p-1 rounded-md hover:opacity-80" aria-label="Close sidebar" style={{ color: "var(--fg-muted)" }}>
            <X size={18} />
          </button>
        )}

        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity" style={{ textDecoration: "none" }}>
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ border: "1px solid var(--border-default)" }}>
            <Image src="/avatar.png" alt="Robert Jean Pierre" width={40} height={40} className="w-full h-full object-cover" priority />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium truncate" style={{ color: "var(--fg-default)" }}>Robert Jean Pierre</div>
            <div className="text-[11px]" style={{ color: "var(--fg-muted)" }}>rpmjp</div>
          </div>
        </Link>

        <div className="text-[11px] px-2 py-1 rounded-md inline-flex items-center gap-1.5 self-start" style={{ background: "var(--success-bg)", color: "var(--success-fg)", border: "1px solid var(--success-fg)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success-fg)" }} />
          Open to work
        </div>

        <Link href="/contact" className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-opacity hover:opacity-90" style={{ background: "var(--accent-fg)", color: "#ffffff", textDecoration: "none" }}>
          <Mail size={13} />
          Contact me
        </Link>

        <div className="pt-3 border-t" style={{ borderColor: "var(--border-muted)" }}>
          <div className="text-[11px] uppercase tracking-wider font-medium mb-2" style={{ color: "var(--fg-muted)" }}>
            Files
          </div>
          <FileTree project={project} />
        </div>

        <Link href="/projects" className="mt-auto text-[11px] hover:opacity-80 transition-opacity inline-flex items-center gap-1" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          ← all projects
        </Link>
      </aside>
    </>
  );
}