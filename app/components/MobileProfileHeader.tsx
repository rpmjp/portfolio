"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, GraduationCap, Briefcase, Mail } from "lucide-react";

export default function MobileProfileHeader() {
  return (
    <div className="border-b px-5 py-5 flex flex-col gap-4" style={{ borderColor: "var(--border-muted)", background: "var(--bg-canvas)" }}>
      <Link href="/" className="flex items-start gap-4 hover:opacity-90 transition-opacity" style={{ textDecoration: "none" }}>
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ border: "1px solid var(--border-default)" }}>
          <Image src="/avatar.png" alt="Robert Jean Pierre" width={64} height={64} className="w-full h-full object-cover" priority />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-lg font-medium leading-tight" style={{ color: "var(--fg-default)" }}>Robert Jean Pierre</div>
          <div className="text-sm" style={{ color: "var(--fg-muted)" }}>rpmjp</div>
          <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: "var(--fg-default)" }}>ML engineer building production systems. NJIT CS &apos;26.</p>
        </div>
      </Link>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px]" style={{ color: "var(--fg-muted)" }}>
        <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> North Brunswick, NJ</span>
        <span className="inline-flex items-center gap-1.5"><GraduationCap size={12} /> NJIT · Rutgers</span>
        <span className="inline-flex items-center gap-1.5"><Briefcase size={12} /> Previously Verizon</span>
        <a href="mailto:robertjp@live.com" className="inline-flex items-center gap-1.5 hover:opacity-80" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          <Mail size={12} /> robertjp@live.com
        </a>
        <a href="https://linkedin.com/in/rpmjp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:opacity-80" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          <LinkedInIcon /> in/rpmjp
        </a>
        <a href="https://github.com/rpmjp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:opacity-80" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          <GitHubIcon /> rpmjp
        </a>
        <a href="https://www.kaggle.com/robertmcs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:opacity-80" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
          <KaggleIcon /> robertmcs
        </a>
      </div>

      <div className="text-[11px] px-2 py-1 rounded-md inline-flex items-center gap-1.5 self-start" style={{ background: "var(--success-bg)", color: "var(--success-fg)", border: "1px solid var(--success-fg)" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success-fg)" }} />
        Open to work
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.21 11.17.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2.01-3.34.71-4.04-1.57-4.04-1.57-.55-1.36-1.33-1.72-1.33-1.72-1.08-.72.08-.71.08-.71 1.2.08 1.83 1.2 1.83 1.2 1.07 1.78 2.8 1.27 3.48.97.11-.75.42-1.27.76-1.56-2.67-.29-5.47-1.29-5.47-5.76 0-1.27.47-2.31 1.23-3.12-.12-.29-.53-1.48.12-3.08 0 0 1-.31 3.3 1.19a11.72 11.72 0 016 0c2.28-1.5 3.29-1.19 3.29-1.19.65 1.6.24 2.79.12 3.08.77.81 1.23 1.85 1.23 3.12 0 4.48-2.8 5.46-5.48 5.75.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.22.68.83.56C20.56 21.9 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.51v6.23zM5.34 7.43a2.06 2.06 0 01-2.06-2.06 2.06 2.06 0 114.13 0c0 1.14-.92 2.06-2.07 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    </svg>
  );
}

function KaggleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.837 23.835c-.012.092-.125.166-.339.166h-2.287c-.241 0-.449-.09-.62-.269l-5.24-6.66-1.461 1.41v5.028c0 .317-.152.491-.468.491H7.533c-.31 0-.466-.174-.466-.49V.5c0-.335.156-.5.466-.5h1.889c.316 0 .468.165.468.5v14.35l6.44-6.478c.217-.204.436-.293.649-.293h2.364c.197 0 .318.083.362.25.035.171-.011.323-.141.458l-6.477 6.266 6.734 8.436c.084.135.104.265.016.346z"/>
    </svg>
  );
}