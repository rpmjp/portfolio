"use client";

import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  buildActivityForRange,
  getActivityColor,
  getActivityProjects,
  intensityFor,
  type DailyActivity,
} from "../lib/buildActivity";

const CELL_SIZE = 11;
const CELL_GAP = 3;
const GRID_WIDTH = 52 * CELL_SIZE + 51 * CELL_GAP;
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const TOTAL_DAYS = 52 * 7;

type CalendarCell = {
  date: string;
  activity?: DailyActivity;
};

type MonthLabel = {
  key: string;
  label: string;
  column: number;
};

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export default function ActivityCalendar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { cells, latestActivity, totalUpdates, activeDays, monthLabels } = useMemo(() => {
    const today = new Date();
    const end = new Date(today);
    end.setHours(0, 0, 0, 0);
    end.setDate(end.getDate() + (6 - end.getDay()));

    const start = new Date(end);
    start.setDate(end.getDate() - TOTAL_DAYS + 1);
    start.setHours(0, 0, 0, 0);

    const activityByDate = buildActivityForRange(start, TOTAL_DAYS);
    const calendarCells: CalendarCell[] = Array.from({ length: TOTAL_DAYS }).map((_, offset) => {
      const date = new Date(start);
      date.setDate(start.getDate() + offset);
      const dateKey = toDateKey(date);
      return { date: dateKey, activity: activityByDate[dateKey] };
    });

    const activityDays = Object.values(activityByDate);
    const updates = activityDays.reduce((sum, day) => sum + day.totalUpdates, 0);
    const labels: MonthLabel[] = [];
    const seen = new Set<string>();

    calendarCells.forEach((cell, index) => {
      const [year, month, day] = cell.date.split("-").map(Number);
      const isFirstCell = index === 0;
      const isMonthStart = day === 1;
      if (!isFirstCell && !isMonthStart) return;

      const key = `${year}-${month}`;
      if (seen.has(key)) return;
      seen.add(key);
      labels.push({
        key,
        label: new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "short" }),
        column: Math.floor(index / 7),
      });
    });

    return {
      cells: calendarCells,
      latestActivity: activityDays.at(-1),
      totalUpdates: updates,
      activeDays: activityDays.length,
      monthLabels: labels,
    };
  }, []);

  const [selectedDate, setSelectedDate] = useState(latestActivity?.date);

  function handleHover(event: MouseEvent<HTMLDivElement>, idx: number) {
    setHoveredIdx(idx);
    setTooltipPosition({ x: event.clientX + 12, y: event.clientY - 42 });
  }

  const hoveredActivity = hoveredIdx !== null ? cells[hoveredIdx]?.activity : undefined;
  const selectedActivity = selectedDate ? cells.find((cell) => cell.date === selectedDate)?.activity : latestActivity;
  const projectLegend = getActivityProjects();

  return (
    <div className="rounded-xl p-5 sm:p-6" style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border-muted)" }}>
      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
        <div>
          <div className="text-[11px] uppercase tracking-wider font-medium mb-1" style={{ color: "var(--fg-subtle)" }}>build activity</div>
          <div className="text-base font-medium" style={{ color: "var(--fg-default)" }}>What I&apos;ve been building</div>
        </div>
        <div className="text-xs" style={{ color: "var(--fg-muted)" }}>
          <span style={{ color: "var(--fg-default)", fontWeight: 500 }}>{totalUpdates}</span> estimated updates across{" "}
          <span style={{ color: "var(--fg-default)", fontWeight: 500 }}>{activeDays}</span> active days
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
        <div style={{ minWidth: GRID_WIDTH + 24 }}>
          <div className="relative text-[10px] mb-1.5" style={{ color: "var(--fg-subtle)", marginLeft: 20, height: 13, width: GRID_WIDTH }}>
            {monthLabels.map((month) => (
              <div
                key={month.key}
                className="absolute top-0"
                style={{ left: month.column * (CELL_SIZE + CELL_GAP) }}
              >
                {month.label}
              </div>
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
              {cells.map((cell, i) => {
                const filled = !!cell.activity;
                const isSelected = selectedDate === cell.date;
                return (
                  <div
                    key={cell.date}
                    onMouseEnter={(event) => filled && handleHover(event, i)}
                    onMouseMove={(event) => filled && handleHover(event, i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => filled && setSelectedDate(cell.date)}
                    style={{
                      background: getActivityColor(cell.activity),
                      borderRadius: 2,
                      cursor: filled ? "pointer" : "default",
                      boxShadow: isSelected
                        ? "0 0 0 2px var(--fg-default)"
                        : filled
                          ? "inset 0 0 0 1px rgba(255,255,255,0.12)"
                          : undefined,
                      transition: "transform 0.15s, box-shadow 0.15s",
                      transform: hoveredIdx === i ? "scale(1.25)" : "scale(1)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 flex-wrap gap-3" style={{ borderTop: "0.5px solid var(--border-muted)" }}>
        <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--fg-muted)" }}>
          <span>Less</span>
          {[1, 3, 7, 11].map((updates) => (
            <span
              key={updates}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: ["#0d274d", "#174a8b", "#1f6feb", "#58a6ff"][intensityFor(updates)],
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
                display: "inline-block",
              }}
            />
          ))}
          <span>More</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] flex-wrap" style={{ color: "var(--fg-muted)" }}>
          {projectLegend.map((project) => (
            <span key={project.id} className="inline-flex items-center gap-1.5">
              <span style={{ width: 9, height: 9, borderRadius: 2, background: project.color, display: "inline-block" }} />
              {project.label}
            </span>
          ))}
        </div>
        <span className="text-[11px]" style={{ color: "var(--fg-subtle)" }}>click a square to inspect the day</span>
      </div>

      <ContributionActivity activity={selectedActivity} />

      {hoveredActivity && (
        <div
          className="fixed z-50 pointer-events-none rounded-md px-3 py-2 text-xs shadow-lg"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            background: "var(--bg-muted)",
            border: "0.5px solid var(--border-default)",
            color: "var(--fg-default)",
            lineHeight: 1.45,
            maxWidth: 280,
          }}
        >
          <div style={{ color: "var(--fg-default)", fontWeight: 600 }}>
            {pluralize(hoveredActivity.totalUpdates, "build update")} on {formatDate(hoveredActivity.date)}
          </div>
          <div className="mt-1" style={{ color: "var(--fg-muted)" }}>
            {hoveredActivity.projects.map((project) => project.label).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}

function ContributionActivity({ activity }: { activity?: DailyActivity }) {
  const maxUpdates = Math.max(...(activity?.projects.map((project) => project.updates) ?? [1]));

  return (
    <section className="mt-8">
      <h3 className="text-[18px] font-medium mb-5" style={{ color: "var(--fg-default)" }}>Contribution activity</h3>

      {!activity ? (
        <div className="rounded-lg px-4 py-4 text-[13px]" style={{ background: "var(--bg-muted)", border: "0.5px solid var(--border-default)", color: "var(--fg-muted)" }}>
          Click an active square to inspect that day&apos;s project activity.
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-[13px] font-semibold shrink-0" style={{ color: "var(--fg-default)" }}>{formatDate(activity.date)}</div>
            <div className="h-px flex-1" style={{ background: "var(--border-default)" }} />
          </div>

          <div className="relative pl-10">
            <div className="absolute left-[15px] top-0 bottom-0 w-px" style={{ background: "var(--border-default)" }} />
            <div className="absolute left-0 top-0 w-[31px] h-[31px] rounded-full flex items-center justify-center" style={{ background: "var(--bg-muted)", border: "0.5px solid var(--border-default)", color: "var(--fg-muted)" }}>
              <span className="text-[15px] leading-none">↗</span>
            </div>

            <div className="pb-6">
              <div className="text-[16px] font-medium mb-3" style={{ color: "var(--fg-default)" }}>
                Created {pluralize(activity.totalUpdates, "build update")} in {pluralize(activity.projects.length, "repository", "repositories")}
              </div>

              <div className="flex flex-col gap-2">
                {activity.projects.map((project) => (
                  <div key={project.id} className="grid items-center gap-3" style={{ gridTemplateColumns: "minmax(0, 1fr) 120px" }}>
                    <div className="min-w-0 text-[13px]">
                      <Link href={project.href} className="hover:underline" style={{ color: "var(--accent-fg)" }}>
                        {project.repo}
                      </Link>
                      <span className="ml-2" style={{ color: "var(--fg-muted)" }}>{pluralize(project.updates, "update")}</span>
                      <div className="truncate text-[12px]" style={{ color: "var(--fg-subtle)" }}>{project.focus}</div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(14, (project.updates / maxUpdates) * 100)}%`,
                          background: project.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
