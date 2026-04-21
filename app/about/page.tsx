import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Robert Jean Pierre",
  description: "Fifteen years of writing code. Seven years running sales campaigns with data. Now building ML systems.",
};

const stacks: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Java", "Python", "TypeScript", "SQL"] },
  { label: "ML / Deep Learning", items: ["PyTorch", "scikit-learn", "Swin Transformers", "Hugging Face"] },
  { label: "Big Data", items: ["Spark", "Hadoop", "Hive", "Kafka", "Pig"] },
  { label: "Web", items: ["React", "Next.js", "Tailwind"] },
  { label: "Mobile, Cloud, Analytics", items: ["Android (Java)", "AWS", "EMR", "Power BI", "Excel"] },
  { label: "Systems", items: ["Linux", "Git", "Docker"] },
];

export default function AboutPage() {
  return (
    <article className="px-8 py-8 max-w-3xl">
      <div className="flex items-center gap-2 text-[13px] pb-3 mb-4 border-b font-mono" style={{ color: "var(--fg-muted)", borderColor: "var(--border-muted)" }}>
        <span style={{ color: "var(--accent-fg)" }}>rpmjp</span>
        <span>/</span>
        <span style={{ color: "var(--fg-default)" }}>about.md</span>
      </div>

      <h1 className="text-[22px] font-medium mb-5" style={{ color: "var(--fg-default)" }}>About</h1>

      <p className="text-[15px] font-medium leading-relaxed mb-4" style={{ color: "var(--fg-default)" }}>
        Fifteen years of writing code. Seven years running sales campaigns with data. Now building ML systems.
      </p>

      <blockquote className="mb-8 pl-4 italic text-sm leading-relaxed" style={{ color: "var(--fg-muted)", borderLeft: "2px solid var(--border-default)" }}>
        &ldquo;I spent years watching models make decisions. Now I make the models.&rdquo;
      </blockquote>

      <Section title="What I do">
        <p>
          I build ML systems that ship. Full pipelines. Training, evaluation, inference APIs, monitoring, the whole thing. I also do graduate research at NJIT on why neural networks generalize, which keeps my feet in theory while my hands are on production.
        </p>
      </Section>

      <Section title="A longer view">
        <p className="mb-4">
          I started writing code in 2010. Java first. Built Android apps, shipped a restaurant management system with a companion mobile app, spent years on object-oriented software engineering. Later picked up Python, SQL, and the web stack. TypeScript, React, Next.js, Tailwind. This site is built with it.
        </p>
        <p className="mb-4">
          I spent seven years at Verizon. Started as an Account Executive. Got promoted into Marketing Manager covering North Jersey, Central Jersey, and New York. Ran a door-to-door FiOS sales campaign across all three markets. That is where the data passion started.
        </p>
        <p className="mb-4">
          The campaign fed me real messy customer data. Thousands of leads a week. Demographics that did not match what the CRM said. Pricing pressure from competitors changing daily. I used Python to clean the data and ML to make it useful. K-means clustering to group customers by behavior and demographics. Logistic regression to score which FiOS package each segment would actually buy. Gradient boosting for sales trend forecasting by territory. Random forests to predict which leads were worth the knock and which were not.
        </p>
        <p>
          After years of running on ML as a tool, I went back for a Master&apos;s in Computer Science at NJIT to learn how these systems actually work underneath. Graduating May 2026. This is not a career pivot. It is the next step for someone who has been building data products for a long time and now wants to build the models too.
        </p>
      </Section>

      <Section title="Tools I work with">
        <div className="flex flex-col gap-4">
          {stacks.map((group) => (
            <div key={group.label}>
              <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--fg-muted)" }}>
                {group.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="text-[12px] px-2.5 py-0.5 rounded" style={{ background: "var(--bg-muted)", border: "0.5px solid var(--border-default)", color: "var(--fg-default)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What I'm thinking about">
        <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
          <li>Vision transformer architectures and what actually makes them generalize</li>
          <li>Why classical learning theory keeps failing to predict overparameterized networks</li>
          <li>Energy-efficient ML. Models that do not require a data center to run.</li>
          <li>The gap between research-grade ML and what actually ships to customers</li>
        </ul>
      </Section>

      <Section title="Get in touch">
        <p className="mb-4">
          I am actively interviewing for Data Scientist, ML Engineer, and Applied ML roles starting summer 2026. If you are hiring, or you want to talk shop about ML in production, reach out.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href="mailto:robertjp@live.com" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[13px] font-medium transition-opacity hover:opacity-90" style={{ background: "var(--accent-fg)", color: "#ffffff", textDecoration: "none" }}>
            Contact me
          </a>
          <a href="https://linkedin.com/in/rpmjp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[13px] font-medium transition-opacity hover:opacity-80" style={{ background: "transparent", color: "var(--fg-default)", border: "0.5px solid var(--border-default)", textDecoration: "none" }}>
            LinkedIn
          </a>
          <a href="https://github.com/rpmjp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[13px] font-medium transition-opacity hover:opacity-80" style={{ background: "transparent", color: "var(--fg-default)", border: "0.5px solid var(--border-default)", textDecoration: "none" }}>
            GitHub
          </a>
          <a href="https://www.kaggle.com/robertmcs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[13px] font-medium transition-opacity hover:opacity-80" style={{ background: "transparent", color: "var(--fg-default)", border: "0.5px solid var(--border-default)", textDecoration: "none" }}>
            Kaggle
          </a>
        </div>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-base font-medium mb-2.5 pb-1.5 border-b" style={{ color: "var(--fg-default)", borderColor: "var(--border-muted)" }}>
        {title}
      </h2>
      <div className="text-[14px] leading-relaxed" style={{ color: "var(--fg-default)" }}>
        {children}
      </div>
    </section>
  );
}