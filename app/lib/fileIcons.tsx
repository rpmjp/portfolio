import type { ReactNode } from "react";

type IconProps = { size?: number };

// Official brand colors for each language/tool
const colors = {
  python: "#3776ab",
  javascript: "#f7df1e",
  typescript: "#3178c6",
  react: "#61dafb",
  java: "#ed8b00",
  cpp: "#00599c",
  c: "#555555",
  go: "#00add8",
  rust: "#dea584",
  ruby: "#cc342d",
  php: "#777bb4",
  swift: "#fa7343",
  kotlin: "#7f52ff",
  html: "#e34f26",
  css: "#1572b6",
  markdown: "#7d8590",
  json: "#cbcb41",
  yaml: "#cb171e",
  sql: "#336791",
  sh: "#4eaa25",
  docker: "#2496ed",
  git: "#f05032",
  pdf: "#ea4335",
  image: "#a074c4",
  folder: "#90a4ae",
  folderOpen: "#2f81f7",
  npm: "#cb3837",
  gear: "#8b8b8b",
  default: "#7d8590",
};

export function FileIcon({ name, isFolder, isOpen, size = 14 }: { name: string; isFolder?: boolean; isOpen?: boolean; size?: number }) {
  if (isFolder) {
    return isOpen ? <FolderOpenIcon size={size} /> : <FolderIcon size={size} />;
  }

  const lower = name.toLowerCase();

  // Special filenames first (match before extension)
  if (lower === "readme.md" || lower === "readme") return <MarkdownIcon size={size} color={colors.markdown} />;
  if (lower === "package.json" || lower === "package-lock.json") return <NpmIcon size={size} />;
  if (lower === "dockerfile" || lower === ".dockerignore") return <DockerIcon size={size} />;
  if (lower === ".gitignore" || lower === ".gitattributes") return <GitIcon size={size} />;
  if (lower === "makefile") return <GearIcon size={size} color={colors.gear} />;
  if (lower.startsWith("tsconfig") || lower.startsWith("next.config") || lower.startsWith("tailwind.config")) return <GearIcon size={size} color={colors.typescript} />;

  // Extensions
  const ext = lower.split(".").pop() || "";

  switch (ext) {
    case "py": return <PythonIcon size={size} />;
    case "ipynb": return <PythonIcon size={size} />;
    case "js": case "mjs": case "cjs": return <JavaScriptIcon size={size} />;
    case "ts": return <TypeScriptIcon size={size} />;
    case "jsx": case "tsx": return <ReactIcon size={size} />;
    case "java": return <JavaIcon size={size} />;
    case "cpp": case "cc": case "cxx": case "hpp": return <CppIcon size={size} />;
    case "c": case "h": return <CIcon size={size} />;
    case "go": return <GoIcon size={size} />;
    case "rs": return <RustIcon size={size} />;
    case "rb": return <RubyIcon size={size} />;
    case "php": return <PhpIcon size={size} />;
    case "swift": return <SwiftIcon size={size} />;
    case "kt": return <KotlinIcon size={size} />;
    case "html": case "htm": return <HtmlIcon size={size} />;
    case "css": case "scss": case "sass": return <CssIcon size={size} />;
    case "md": case "markdown": return <MarkdownIcon size={size} color={colors.markdown} />;
    case "json": return <JsonIcon size={size} />;
    case "yml": case "yaml": return <YamlIcon size={size} />;
    case "sql": return <SqlIcon size={size} />;
    case "sh": case "bash": case "zsh": return <ShellIcon size={size} />;
    case "pdf": return <PdfIcon size={size} />;
    case "png": case "jpg": case "jpeg": case "gif": case "svg": case "webp": return <ImageIcon size={size} />;
    default: return <DefaultFileIcon size={size} />;
  }
}

// Minimal reusable SVG frame for brand-style icons
function IconFrame({ color, children, size = 14 }: { color: string; children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <g fill={color}>{children}</g>
    </svg>
  );
}

function FolderIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={colors.folder} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  );
}

function FolderOpenIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={colors.folderOpen} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 13H4V8h16v11z" />
      <path d="M4 19h16l-2-7H6l-2 7z" opacity="0.3" />
    </svg>
  );
}

function PythonIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <linearGradient id="py1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5DA5DB" /><stop offset="1" stopColor="#366A96" /></linearGradient>
      <linearGradient id="py2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE053" /><stop offset="1" stopColor="#FFC33C" /></linearGradient>
      <path fill="url(#py1)" d="M11.9 2c-3 0-2.8 1.3-2.8 1.3v1.4h2.9v.4H7.6S5.7 4.9 5.7 8s1.7 3 1.7 3h1v-1.5s0-1.7 1.7-1.7h2.9s1.6 0 1.6-1.6V3.5S14.8 2 11.9 2zm-1.6.9c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z" />
      <path fill="url(#py2)" d="M12 22c3 0 2.8-1.3 2.8-1.3v-1.4h-2.9v-.4h4.4s1.9.2 1.9-2.9-1.7-3-1.7-3h-1v1.5s0 1.7-1.7 1.7H10.8s-1.6 0-1.6 1.6v2.8S9.2 22 12 22zm1.6-.9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z" />
    </svg>
  );
}

function JavaScriptIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path fill="#000" d="M7.5 18.3c.4.5.8.8 1.4.8.5 0 .9-.3.9-1.1v-5.5h1.5v5.5c0 1.6-.9 2.3-2.3 2.3-1.2 0-1.9-.6-2.3-1.4l1.2-.6zm5.3-.3c.4.5 1 1.1 2 1.1.8 0 1.3-.4 1.3-1 0-.7-.5-.9-1.4-1.3l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.8 0-1.4 1.1-2.4 2.7-2.4 1.2 0 2 .4 2.6 1.5l-1.4.9c-.3-.5-.6-.8-1.2-.8s-.9.4-.9.8c0 .6.4.8 1.3 1.2l.4.2c1.6.7 2.5 1.4 2.5 2.9 0 1.7-1.3 2.6-3.1 2.6-1.7 0-2.8-.8-3.3-1.9l1.3-.8z" />
    </svg>
  );
}

function TypeScriptIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path fill="#fff" d="M9.5 13v1.5H11v5h1.5v-5H14V13H9.5zm8.3 1.1c-.3-.4-.7-.6-1.2-.8-.5-.2-1-.3-1.6-.3-.4 0-.8.1-1.2.2-.4.1-.7.3-1 .5-.3.2-.5.5-.7.8-.2.3-.3.7-.3 1.1 0 .5.1.8.3 1.1s.4.5.7.7c.3.2.6.3 1 .4.4.1.7.2 1.1.3.3.1.5.2.7.3.2.1.3.2.4.4.1.1.1.3.1.5 0 .2 0 .3-.1.4-.1.1-.2.2-.3.3s-.3.1-.5.2-.4.1-.6.1c-.3 0-.5 0-.8-.1s-.5-.2-.7-.3c-.2-.1-.4-.3-.5-.5l-1.1 1.1c.2.3.5.5.8.7s.6.3.9.4c.3.1.6.1 1 .2.3 0 .6.1.8.1.5 0 1-.1 1.4-.2s.8-.3 1.1-.5c.3-.2.5-.5.7-.8.2-.3.2-.7.2-1.1 0-.4-.1-.8-.2-1.1s-.3-.5-.6-.7c-.3-.2-.6-.4-1-.5-.4-.1-.8-.2-1.3-.4-.3-.1-.5-.2-.7-.2-.2-.1-.3-.2-.4-.3-.1-.1-.1-.3-.1-.4 0-.2.1-.3.2-.5.1-.1.3-.2.5-.3.2-.1.5-.1.7-.1.3 0 .5 0 .7.1s.4.1.5.2c.1.1.3.2.4.3l1-1.1z" />
    </svg>
  );
}

function ReactIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.3" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(120 12 12)" />
    </svg>
  );
}

function JavaIcon({ size = 14 }: IconProps) {
  return (
    <IconFrame color={colors.java} size={size}>
      <path d="M8.5 18.5c-1.8.3-2.9.9-2.9 1.4 0 .7 2.8 1.4 6.4 1.4 3.5 0 6.3-.6 6.3-1.4 0-.5-1.1-1-2.9-1.3l-.4 1c1 .2 1.4.4 1.4.6 0 .3-2.1.7-4.5.7s-4.5-.3-4.5-.7c0-.1.4-.3 1.4-.6l-.3-1.1zM13 14.5c-1.7 1-2.2 1.6-2.2 1.9 0 .4 1.3.7 3 .7 1.6 0 3-.3 3-.7 0-.2-.4-.5-1.1-.8 0 0 .1.2.1.3 0 .3-1 .6-2.1.6-1.1 0-2-.3-2-.6 0-.3.4-.5 1.3-.9v-.5zM11 2c.8 1.5-1.3 2.7-1.3 4.3 0 1.7 2 2.3 2 3.7 0 .4-.1.7-.3 1 1.4-1 2.4-2.1 2.4-3.4 0-1.9-2.8-3.1-2.8-5.6zm-1.6 8c-1.1.3-1.8.8-1.8 1.3 0 .7 1.4 1.3 3.2 1.3 1.9 0 3.3-.6 3.3-1.3 0-.3-.4-.6-1-.9 0 .1.1.2.1.3 0 .4-1.1.8-2.5.8-1.3 0-2.4-.3-2.4-.8 0-.2.4-.5 1.2-.7v0z" />
    </IconFrame>
  );
}

function CppIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#00599C" d="M12 2 3 7v10l9 5 9-5V7z" />
      <path fill="#fff" d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c1.5 0 2.7-.8 3.4-2h-1.8c-.4.5-1 .8-1.6.8-1.4 0-2.5-1.1-2.5-2.5S10.6 9.8 12 9.8c.7 0 1.3.3 1.7.8h1.7c-.7-1.2-2-2-3.4-2z" />
      <path fill="#fff" d="M16.5 11.5v-1h-.5v-.5h-.5v.5H15v1h.5v.5h.5v-.5h.5zm2.5 0v-1h-.5v-.5H18v.5h-.5v1h.5v.5h.5v-.5h.5z" />
    </svg>
  );
}

function CIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#555" d="M12 2 3 7v10l9 5 9-5V7z" />
      <path fill="#fff" d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c1.5 0 2.7-.8 3.4-2h-1.8c-.4.5-1 .8-1.6.8-1.4 0-2.5-1.1-2.5-2.5S10.6 9.8 12 9.8c.7 0 1.3.3 1.7.8h1.7c-.7-1.2-2-2-3.4-2z" />
    </svg>
  );
}

function GoIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.go} size={size}><path d="M3 11c0-.3.2-.5.5-.5H7c.3 0 .5.2.5.5s-.2.5-.5.5H3.5c-.3 0-.5-.2-.5-.5zm2-2.5c0-.3.2-.5.5-.5H8c.3 0 .5.2.5.5S8.3 9 8 9H5.5C5.2 9 5 8.8 5 8.5zm12.5 3.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm-8 0c2.5 0 4.5 2 4.5 4.5S12 20.5 9.5 20.5 5 18.5 5 16s2-4 4.5-4zm4.5-8.5c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" /></IconFrame>; }
function RustIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.rust} size={size}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm-2 4v2H8v1h2v2H8v1h2v2h1v-2h2v2h1v-2h2v-1h-2v-2h2V9h-2V7h-1v2h-2V7h-1zm1 3h2v2h-2v-2z" /></IconFrame>; }
function RubyIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.ruby} size={size}><path d="M12 2 3 9l9 13 9-13-9-7zm0 2.5 6.5 5L12 19 5.5 9.5 12 4.5z" /></IconFrame>; }
function PhpIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.php} size={size}><ellipse cx="12" cy="12" rx="10" ry="6" /><text x="12" y="15" fontSize="6" fill="#fff" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">PHP</text></IconFrame>; }
function SwiftIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.swift} size={size}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 14.5c-2-.5-4-1.5-6-3 1 2 3 3.5 5 3.5-1.5.5-3 0-4.5-.5 1-1 2-2 3-3l-2-1c-1 1.5-2 3-3.5 3.5 1-2 2.5-4 4-5.5L7 12c1-1.5 2.5-3 4.5-4 1.5.5 3 1.5 4 3 0 .5 0 1-.5 1.5.5 1.5 1 3 1.5 4z" /></IconFrame>; }
function KotlinIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.kotlin} size={size}><path d="M3 3h9l-9 9zm0 9h9l9-9v18H3z" /></IconFrame>; }
function HtmlIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.html} size={size}><path d="M4 3h16l-1.5 16.5L12 22l-6.5-2.5L4 3zm14 3H6l.2 2h11.4l-.5 6.5L12 16l-5-1.5-.3-3.5h2l.2 2 3.1 1 3.2-1 .3-3.5H6.5" /></IconFrame>; }
function CssIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.css} size={size}><path d="M4 3h16l-1.5 16.5L12 22l-6.5-2.5L4 3zm14.5 3H6l.2 2h12l-.3 2H9l.2 2h8l-.3 3.2L12 16.8l-5-1.5-.2-2h2l.1 1 3 1 3.1-1 .4-4H6.5" /></IconFrame>; }
function MarkdownIcon({ size = 14, color = "#7d8590" }: IconProps & { color?: string }) { return <IconFrame color={color} size={size}><path d="M2 6h20v12H2V6zm3 3v6h2v-4l2 2 2-2v4h2V9h-2L9 11 7 9H5zm9 0v3h-2l3 3 3-3h-2V9h-2z" /></IconFrame>; }
function JsonIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.json} size={size}><path d="M5 3c-1 0-2 1-2 2v4c0 1-.5 2-1 2s1 1 1 2v4c0 1 1 2 2 2h1v-2H5v-4c0-1-.5-2-1-2s1-1 1-2V5h1V3H5zm14 0v2h1v4c0 1 .5 2 1 2s-1 1-1 2v4h-1v2h1c1 0 2-1 2-2v-4c0-1 .5-2 1-2s-1-1-1-2V5c0-1-1-2-2-2h-1z" /></IconFrame>; }
function YamlIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.yaml} size={size}><path d="M8 4v4l-2 3v6h2v-5l2-3V4H8zm6 0v4l2 3v6h-2v-5l-2-3V4h2z" /></IconFrame>; }
function SqlIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.sql} size={size}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5c0 1.7-3.6 3-8 3s-8-1.3-8-3zm0 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6c0 1.7-3.6 3-8 3s-8-1.3-8-3z" /></IconFrame>; }
function ShellIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.sh} size={size}><path d="M3 4h18v16H3V4zm2 2v12h14V6H5zm2 2.5L10 11l-3 2.5V12L9 11 7 9.5V7.5zm4 6.5h5v1h-5v-1z" /></IconFrame>; }
function DockerIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.docker} size={size}><path d="M22 10c-.5-.5-1.5-.8-2.5-.8-.3 0-.5 0-.7.1-.2-1.5-1-2.5-1.2-2.7l-.2-.3-.3.2c-.5.3-.9.8-1.1 1.3-.3.7-.3 1.5 0 2.2H2c0 1.2.2 2.5.8 3.5 1 1.7 2.8 2.5 4.8 2.5 4.5 0 7.5-2 9.2-5.9h.2c1.5 0 2.5-.3 3-.6.3-.2.5-.4.5-.5l.1-.2-.6-.6zM5 9h2v2H5V9zm3 0h2v2H8V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zM5 6h2v2H5V6zm3 0h2v2H8V6zm3 0h2v2h-2V6z" /></IconFrame>; }
function GitIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.git} size={size}><path d="M22.2 10.9 13.1 1.8c-.5-.5-1.4-.5-1.9 0L9.3 3.7l2.4 2.4c.6-.2 1.3-.1 1.7.4.5.5.6 1.2.4 1.8l2.3 2.3c.6-.2 1.3-.1 1.8.4.7.7.7 1.8 0 2.5-.7.7-1.8.7-2.5 0-.5-.5-.6-1.2-.4-1.9L13 9.4v5.8c.2.1.4.2.5.3.7.7.7 1.8 0 2.5-.7.7-1.8.7-2.5 0-.7-.7-.7-1.8 0-2.5.2-.2.4-.3.6-.4V9.3c-.2-.1-.4-.2-.6-.4-.5-.5-.6-1.2-.4-1.9L8.2 4.6 1.8 11c-.5.5-.5 1.4 0 1.9l9.1 9.1c.5.5 1.4.5 1.9 0l9-9c.6-.6.6-1.5.1-2.1z" /></IconFrame>; }
function PdfIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.pdf} size={size}><path d="M6 2h9l5 5v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm8 1v5h5l-5-5zM8 13h2v1H8v2H7v-5h3v2zm4-2v5h-1v-5h1zm2 3v1h2v1h-3v-5h3v1h-2v1h2v1h-2z" /></IconFrame>; }
function ImageIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.image} size={size}><path d="M5 4h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v9l4-4 3 3 3-3 4 4V6H5zm4 3c-.8 0-1.5-.7-1.5-1.5S8.2 6 9 6s1.5.7 1.5 1.5S9.8 9 9 9z" /></IconFrame>; }
function NpmIcon({ size = 14 }: IconProps) { return <IconFrame color={colors.npm} size={size}><path d="M2 10h20v6h-5v1h-6v-1H2v-6zm1 1v4h5v-3h1v3h2v-4H3zm9 0v4h3v-1h2v-3h-5zm3 1h1v2h-1v-2zm4-1v4h2v-4h-2z" /></IconFrame>; }
function GearIcon({ size = 14, color = "#8b8b8b" }: IconProps & { color?: string }) { return <IconFrame color={color} size={size}><path d="M19.4 13c.1-.3.1-.6.1-1s0-.7-.1-1l2-1.6-2-3.5-2.5 1c-.5-.4-1-.7-1.6-1L15 3h-4l-.3 2.9c-.6.2-1.1.5-1.6 1l-2.5-1-2 3.4 2 1.6c-.1.4-.1.7-.1 1.1 0 .3 0 .7.1 1l-2 1.6 2 3.5 2.5-1c.5.4 1 .7 1.6 1L11 21h4l.3-2.9c.6-.2 1.1-.5 1.6-1l2.5 1 2-3.5-2-1.6zM13 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" /></IconFrame>; }
function DefaultFileIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 2h8l6 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z" fill={colors.default} fillOpacity="0.2" stroke={colors.default} strokeWidth="1" />
      <path d="M14 2v6h6" stroke={colors.default} strokeWidth="1" fill="none" />
    </svg>
  );
}