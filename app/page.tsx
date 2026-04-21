import NeuralHero from "./components/NeuralHero";
import ActivityCalendar from "./components/ActivityCalendar";

export default function Home() {
  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
        <div className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--accent-fg)" }}>
          / portfolio
        </div>
        <div className="text-[11px] inline-flex items-center gap-1.5" style={{ color: "var(--fg-muted)" }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--success-fg)" }} />
          <span style={{ color: "var(--fg-subtle)" }}>Recently updated:</span>
          <span style={{ color: "var(--fg-default)" }}>rag-research-assistant</span>
          <span style={{ color: "var(--fg-subtle)" }}>· 2 days ago</span>
        </div>
      </div>

      <div className="text-[15px] mb-6" style={{ color: "var(--fg-muted)" }}>
        a feed-forward network, but the signal is me
      </div>

      <NeuralHero />

      <div className="mt-14">
        <ActivityCalendar />
      </div>
    </div>
  );
}