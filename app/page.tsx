import NeuralHero from "./components/NeuralHero";

export default function Home() {
  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">
      <div className="text-[11px] uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--accent-fg)" }}>
        / portfolio
      </div>
      <div className="text-[15px] mb-10" style={{ color: "var(--fg-muted)" }}>
        a feed-forward network, but the signal is me
      </div>

      <NeuralHero />
    </div>
  );
}