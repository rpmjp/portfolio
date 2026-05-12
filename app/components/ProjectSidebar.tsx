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
        className={`${isMobile ? "fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 overflow-y-auto" : ""} w-[296px] shrink-0 border-r px-4 py-6 flex flex-col gap-5`}
        style={{
          background: "var(--bg-canvas)",
          borderColor: "var(--border-muted)",
          transform: isMobile ? (isOpen ? "translateX(0)" : "translateX(-100%)") : undefined,
        }}
      >
        {isMobile && (
          <button onClick={onClose} className="self-end p-1 rounded-md hover:opacity-80" aria-label="Close sidebar" style={{ color: "var(--fg-muted)" }}>
            <X size={20} />
          </button>
        )}

        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity" style={{ textDecoration: "none" }}>
          <div className="w-[80px] h-[80px] rounded-full p-[3px] shrink-0" style={{ background: "#1f9cf0" }}>
            <div className="w-full h-full rounded-full p-[3px]" style={{ background: "var(--bg-canvas)" }}>
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image src="/avatar.png" alt="Robert Jean Pierre" width={74} height={74} className="w-full h-full object-cover" priority />
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-[17px] font-semibold leading-tight" style={{ color: "var(--fg-default)" }}>Robert Jean Pierre</div>
            <div className="text-[13px]" style={{ color: "var(--fg-muted)" }}>rpmjp</div>
          </div>
        </Link>

        <div className="text-[12px] px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 self-start" style={{ background: "var(--success-bg)", color: "var(--success-fg)", border: "1px solid var(--success-fg)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success-fg)" }} />
          Open to work
        </div>

        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[14px] font-medium transition-opacity hover:opacity-90" style={{ background: "var(--accent-fg)", color: "#ffffff", textDecoration: "none" }}>
          <Mail size={15} />
          Contact me
        </Link>

        <div className="pt-4 border-t" style={{ borderColor: "var(--border-muted)" }}>
          <div className="text-[12px] uppercase tracking-wider font-semibold mb-3" style={{ color: "var(--fg-muted)" }}>
            Files
          </div>
          <FileTree project={project} />
        </div>

        <Link href="/projects" className="mt-auto text-[13px] hover:opacity-80 transition-opacity inline-flex items-center gap-1" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          ← all projects
        </Link>
      </aside>
    </>
  );
}