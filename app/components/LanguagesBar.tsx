import type { Language } from "../lib/projects";

export default function LanguagesBar({ languages }: { languages: Language[] }) {
  return (
    <div className="mb-6">
      <div className="text-[13px] font-semibold mb-2" style={{ color: "var(--fg-default)" }}>
        Languages
      </div>
      <div className="flex h-2 rounded-full overflow-hidden mb-3" style={{ background: "var(--bg-muted)" }}>
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percent}%`,
              background: lang.color,
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px]">
        {languages.map((lang) => (
          <div key={lang.name} className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: lang.color }} />
            <span style={{ color: "var(--fg-default)", fontWeight: 500 }}>{lang.name}</span>
            <span style={{ color: "var(--fg-muted)" }}>{lang.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}