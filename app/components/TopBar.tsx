"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

type TopBarProps = {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
};

export default function TopBar({ onMenuClick, showMenuButton = false }: TopBarProps) {
  return (
    <header className="flex items-center gap-3 px-4 py-2.5 border-b" style={{ background: "var(--bg-surface)", borderColor: "var(--border-muted)" }}>
      {showMenuButton && (
        <button onClick={onMenuClick} className="p-1 rounded-md hover:opacity-80 md:hidden" aria-label="Open menu" style={{ color: "var(--fg-default)" }}>
          <Menu size={20} />
        </button>
      )}

      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" style={{ textDecoration: "none" }}>
        <div className="w-5 h-5 rounded-full" style={{ background: "var(--fg-default)" }} aria-hidden />
        <div className="flex items-center gap-1.5 text-[13px]">
          <span style={{ color: "var(--fg-default)", fontWeight: 500 }}>rpmjp</span>
          <span style={{ color: "var(--fg-muted)" }}>/</span>
          <span style={{ color: "var(--accent-fg)", fontWeight: 500 }}>portfolio</span>
        </div>
      </Link>

      <div className="flex-1 max-w-xs ml-4 hidden sm:block">
        <div className="rounded-md px-2.5 py-1 text-xs flex items-center justify-between" style={{ background: "var(--bg-canvas)", border: "1px solid var(--border-default)", color: "var(--fg-muted)" }}>
          <span>Type to search</span>
          <kbd className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)", color: "var(--fg-muted)" }}>/</kbd>
        </div>
      </div>

      <nav className="flex gap-3 sm:gap-5 ml-auto text-[13px]">
        <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: "var(--fg-default)" }}>Projects</Link>
        <Link href="/about" className="hover:opacity-80 transition-opacity hidden sm:inline" style={{ color: "var(--fg-default)" }}>About</Link>
        <a href="/resume.pdf" className="hover:opacity-80 transition-opacity flex items-center gap-1.5" style={{ color: "var(--fg-default)" }}>
          Resume
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success-fg)" }} aria-label="Recently updated" />
        </a>
      </nav>
    </header>
  );
}