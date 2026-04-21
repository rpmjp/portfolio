"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { milestones, type Milestone } from "../lib/milestones";

const CELL_SIZE = 11;
const CELL_GAP = 3;
const MONTH_LABELS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function getColor(state: Milestone["state"] | "none"): string {
  if (state === "completed") return "#10b981";
  if (state === "in-progress") return "#2f81f7";
  if (state === "planned") return "#d97706";
  return "var(--bg-muted)";
}

function dateToCellIndex(dateStr: string, startDate: Date): number {
  const d = new Date(dateStr);
  const diffMs = d.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0 || diffDays >= 52 * 7) return -1;
  const week = Math.floor(diffDays / 7);
  const dow = d.getDay();
  return week * 7 + dow;
}

export default function ActivityCalendar() {
  const router = useRouter();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { cells, counts, startDate } = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 52 * 7 + 1);
    start.setHours(0, 0, 0, 0);

    const cellMap: Record<number, Milestone> = {};
    const c = { completed: 0, "in-progress": 0, planned: 0 };

    milestones.forEach((m) => {
      const idx = dateToCellIndex(m.date, start);
      if (idx >= 0) {
        cellMap[idx] = m;
        c[m.state]++;
      }
    });

    return { cells: cellMap, counts: c, startDate: start };
  }, []);

  function handleClick(m: Milestone) {
    if (!m.href) return;
    if (m.external || m.href.endsWith(".pdf")) {
      const a = document.createElement("a");
      a.href = m.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
    } else {
      router.push(m.href);
    }
  }

  const total = 52 * 7;
  const hoveredMilestone = hoveredIdx !== null ? cells[hoveredIdx] : null;
  const hoveredCellCol = hoveredIdx !== null ? Math.floor(hoveredIdx / 7) : 0;
  const hoveredCellRow = hoveredIdx !== null ? hoveredIdx % 7 : 0;

  return (
    <div className="rounded-xl p-5 sm:p-6" style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border-muted)" }}>
      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
        <div>
          <div className="text-[11px] uppercase tracking-wider font-medium mb-1" style={{ color: "var(--fg-subtle)" }}>milestones</div>
          <div className="text-base font-medium" style={{ color: "var(--fg-default)" }}>What I&apos;ve been building</div>
        </div>
        <div className="text-xs" style={{ color: "var(--fg-muted)" }}>
          <span style={{ color: "var(--fg-default)", fontWeight: 500 }}>{milestones.length}</span> milestones in the last year
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: 720 }}>
          <div className="flex gap-1 text-[10px] mb-1.5" style={{ color: "var(--fg-subtle)", paddingLeft: 20 }}>
            {MONTH_LABELS.map((m) => (
              <div key={m} style={{ width: `calc((100% - ${11 * 4}px) / 12)` }}>{m}</div>
            ))}
          </div>

          <div className="flex gap-1.5 relative">
            <div className="flex flex-col text-[9px]" style={{ color: "var(--fg-subtle)", width: 14, gap: CELL_GAP, paddingTop: 1 }}>
              {DAY_LABELS.map((d, i) => (
                <div key={i} style={{ height: CELL_SIZE, lineHeight: `${CELL_SIZE}px` }}>{i % 2 === 1 ? d : ""}</div>
              ))}
            </div>

            <div
              className="relative flex-1"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(52, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
                gap: CELL_GAP,
                gridAutoFlow: "column",
              }}
            >
              {Array.from({ length: total }).map((_, i) => {
                const m = cells[i];
                const state = m ? m.state : "none";
                const filled = state !== "none";
                return (
                  <div
                    key={i}
                    onMouseEnter={() => filled && setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => m && handleClick(m)}
                    style={{
                      background: getColor(state),
                      borderRadius: 2,
                      cursor: filled ? "pointer" : "default",
                      boxShadow: filled ? "inset 0 0 0 1px rgba(255,255,255,0.12)" : undefined,
                      transition: "transform 0.15s",
                      transform: hoveredIdx === i ? "scale(1.25)" : "scale(1)",
                    }}
                  />
                );
              })}

              {hoveredMilestone && (
                <div
                  className="absolute z-10 pointer-events-none rounded-md px-3 py-2 text-xs"
                  style={{
                    left: `min(${hoveredCellCol * (CELL_SIZE + CELL_GAP)}px, calc(100% - 220px))`,
                    top: hoveredCellRow * (CELL_SIZE + CELL_GAP) - 60,
                    background: "var(--bg-muted)",
                    border: "0.5px solid var(--border-default)",
                    minWidth: 200,
                    maxWidth: 260,
                    color: "var(--fg-default)",
                    lineHeight: 1.5,
                  }}
                >
                  <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--fg-muted)" }}>
                    {hoveredMilestone.state === "completed" ? "completed" : hoveredMilestone.state === "in-progress" ? "in progress" : "planned"} · {new Date(hoveredMilestone.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <div style={{ color: "var(--fg-default)" }}>{hoveredMilestone.title}</div>
                  {hoveredMilestone.description && (
                    <div className="mt-1" style={{ color: "var(--fg-muted)" }}>{hoveredMilestone.description}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 flex-wrap gap-2" style={{ borderTop: "0.5px solid var(--border-muted)" }}>
        <div className="flex gap-4 text-[11px] items-center flex-wrap" style={{ color: "var(--fg-muted)" }}>
          <LegendItem color="#10b981" label="Completed" count={counts.completed} />
          <LegendItem color="#2f81f7" label="In progress" count={counts["in-progress"]} />
          <LegendItem color="#d97706" label="Planned" count={counts.planned} />
        </div>
        <span className="text-[11px]" style={{ color: "var(--fg-subtle)" }}>click a square to open</span>
      </div>
    </div>
  );
}

function LegendItem({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span style={{ width: 10, height: 10, background: color, borderRadius: 2, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)", display: "inline-block" }} />
      <span>{label}</span>
      <span style={{ color: "var(--fg-default)", fontWeight: 500 }}>{count}</span>
    </span>
  );
}