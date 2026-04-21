export default function Sidebar() {
  return (
    <aside
      className="w-60 flex-shrink-0 border-r px-4 py-5 flex flex-col gap-5"
      style={{
        background: "var(--bg-canvas)",
        borderColor: "var(--border-muted)",
      }}
    >
      {/* Profile block */}
      <div>
        <div
          className="w-20 h-20 rounded-full mb-3 flex items-center justify-center text-2xl font-medium"
          style={{
            background: "linear-gradient(135deg, #1f6feb, #8957e5)",
            border: "1px solid var(--border-default)",
            color: "#ffffff",
          }}
          aria-hidden
        >
          RJP
        </div>
        <div className="text-lg font-medium" style={{ color: "var(--fg-default)" }}>
          Robert Jean Pierre
        </div>
        <div className="text-sm" style={{ color: "var(--fg-muted)" }}>
          rpmjp
        </div>
        <p className="text-[13px] mt-2.5 leading-relaxed" style={{ color: "var(--fg-default)" }}>
          ML engineer building production systems. NJIT CS &apos;26.
        </p>
      </div>

      {/* Profile metadata */}
      <div className="flex flex-col gap-1.5 text-xs" style={{ color: "var(--fg-muted)" }}>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>North Brunswick, NJ</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🎓</span>
          <span>NJIT · Rutgers</span>
        </div>
        <div className="flex items-center gap-2">
          <span>💼</span>
          <span>Previously Verizon</span>
        </div>
        <div className="flex items-center gap-2">
          <span>✉</span>
          <span>robertjp@live.com</span>
        </div>
      </div>

      {/* Open to work badge */}
      <div
        className="text-[11px] px-2 py-1 rounded-md inline-flex items-center gap-1.5 self-start"
        style={{
          background: "var(--success-bg)",
          color: "var(--success-fg)",
          border: "1px solid var(--success-fg)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success-fg)" }} />
        Open to work
      </div>

      {/* Projects file tree */}
      <div className="border-t pt-4" style={{ borderColor: "var(--border-muted)" }}>
        <div
          className="text-[11px] uppercase tracking-wider font-medium mb-2"
          style={{ color: "var(--fg-muted)" }}
        >
          Projects
        </div>
        <div className="flex flex-col gap-px">
          <FolderRow name="telecom-churn-ml" active />
          <FolderRow name="rag-research-assistant" />
          <FolderRow name="swin-transformer-study" />
          <FolderRow name="retail-stream-analytics" />
          <FolderRow name="rec-system-ctr" />
          <FolderRow name="archive" muted />
        </div>
      </div>
    </aside>
  );
}

function FolderRow({
  name,
  active = false,
  muted = false,
}: {
  name: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded-md text-[13px] cursor-pointer"
      style={{
        background: active ? "var(--accent-bg)" : "transparent",
        borderLeft: active ? "2px solid var(--accent-fg)" : "2px solid transparent",
        color: muted ? "var(--fg-muted)" : "var(--fg-default)",
        fontWeight: active ? 500 : 400,
      }}
    >
      <span className="text-[10px]" style={{ color: "var(--fg-muted)" }}>
        ▸
      </span>
      <span style={{ color: "var(--fg-muted)" }}>📁</span>
      <span>{name}</span>
    </div>
  );
}