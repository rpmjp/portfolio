import { projects, type Project, type ProjectActivity } from "./projects";

export type ActivityProject = {
  id: string;
  repo: string;
  label: string;
  href: string;
  color: string;
  colors: string[];
  start: string;
  end: string;
  baseUpdates: number;
  activeRatio: number;
  focus: string[];
};

export type ActivityProjectSummary = {
  id: string;
  repo: string;
  label: string;
  href: string;
  color: string;
  updates: number;
  focus: string;
};

export type DailyActivity = {
  date: string;
  totalUpdates: number;
  projects: ActivityProjectSummary[];
  dominantProject?: ActivityProject;
};

const FALLBACK_COLORS = [
  { color: "#2f81f7", colors: ["#0d274d", "#174a8b", "#1f6feb", "#58a6ff"] },
  { color: "#10b981", colors: ["#0b2f25", "#0f513c", "#12805c", "#10b981"] },
  { color: "#a371f7", colors: ["#231a36", "#3d2a63", "#6e40c9", "#a371f7"] },
  { color: "#f59e0b", colors: ["#3a2605", "#6b4106", "#b7791f", "#f59e0b"] },
  { color: "#ef4444", colors: ["#3b0b0b", "#7f1d1d", "#b91c1c", "#ef4444"] },
  { color: "#06b6d4", colors: ["#083344", "#155e75", "#0891b2", "#22d3ee"] },
];

const EXTRA_ACTIVITY: ActivityProject[] = [
  {
    id: "portfolio",
    repo: "rpmjp/portfolio",
    label: "Portfolio",
    href: "/",
    color: "#06b6d4",
    colors: ["#083344", "#155e75", "#0891b2", "#22d3ee"],
    start: "2026-05-01",
    end: "2026-05-21",
    baseUpdates: 3,
    activeRatio: 0.6,
    focus: ["project pages", "activity calendar", "live demo links", "interaction polish"],
  },
];

const MONTHS: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function parseDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function endOfMonth(year: number, month: number): string {
  return toDateKey(new Date(year, month + 1, 0));
}

function parseDateRange(dateRange?: string): { start: string; end: string } | undefined {
  if (!dateRange) return undefined;

  const normalized = dateRange.toLowerCase().replace(/–|—/g, "-");
  const yearMatch = normalized.match(/\b(20\d{2})\b/);
  if (!yearMatch) return undefined;
  const year = Number(yearMatch[1]);

  if (normalized.includes("fall")) {
    return { start: `${year}-09-01`, end: `${year}-12-15` };
  }

  const monthMatches = [...normalized.matchAll(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t)?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/g)];
  if (monthMatches.length === 0) return undefined;

  const startMonth = MONTHS[monthMatches[0][1]];
  const endMonth = MONTHS[monthMatches[1]?.[1] ?? monthMatches[0][1]];
  const endYear = endMonth < startMonth ? year + 1 : year;

  return {
    start: `${year}-${`${startMonth + 1}`.padStart(2, "0")}-01`,
    end: endOfMonth(endYear, endMonth),
  };
}

function hash(input: string): number {
  let value = 0;
  for (let i = 0; i < input.length; i++) {
    value = (value * 31 + input.charCodeAt(i)) % 9973;
  }
  return value;
}

function projectDefaults(project: Project, index: number) {
  const fallback = FALLBACK_COLORS[index % FALLBACK_COLORS.length];
  return {
    repo: `rpmjp/${project.slug}`,
    label: project.name,
    href: `/projects/${project.slug}`,
    color: project.activity?.color ?? fallback.color,
    colors: project.activity?.colors ?? fallback.colors,
  };
}

function normalizeProject(project: Project, index: number): ActivityProject | undefined {
  const range = project.activity ?? parseDateRange(project.dateRange);
  if (!range) return undefined;

  const defaults = projectDefaults(project, index);
  const activity = project.activity as ProjectActivity | undefined;

  return {
    id: project.slug,
    repo: defaults.repo,
    label: project.name,
    href: defaults.href,
    color: defaults.color,
    colors: defaults.colors,
    start: range.start,
    end: range.end,
    baseUpdates: activity?.baseUpdates ?? (project.featured ? 4 : 3),
    activeRatio: activity?.activeRatio ?? (project.featured ? 0.58 : 0.46),
    focus: activity?.focus ?? ["project setup", "core implementation", "testing + polish", "documentation"],
  };
}

function getActivityProjectsInternal(): ActivityProject[] {
  return [
    ...projects.map(normalizeProject).filter((project): project is ActivityProject => !!project),
    ...EXTRA_ACTIVITY,
  ];
}

function isActive(project: ActivityProject, date: Date): boolean {
  return date >= parseDate(project.start) && date <= parseDate(project.end);
}

function shouldWork(project: ActivityProject, date: Date): boolean {
  const dateKey = toDateKey(date);
  const day = date.getDay();
  const h = hash(`${project.id}-active-${dateKey}`);
  const dailyThreshold = (h % 100) / 100;
  const weekend = day === 0 || day === 6;
  const cadence = weekend ? project.activeRatio * 0.22 : project.activeRatio;

  if (weekend && h % 11 === 0) return true;
  return dailyThreshold < cadence;
}

function updatesFor(project: ActivityProject, date: Date): number {
  if (!shouldWork(project, date)) return 0;

  const dateKey = toDateKey(date);
  const h = hash(`${project.id}-updates-${dateKey}`);
  const day = date.getDay();
  const weekend = day === 0 || day === 6;
  const variance = h % 4;
  const occasionalSpike = h % 19 === 0 ? 3 : 0;
  const weekendAdjustment = weekend ? -2 : 0;

  return Math.max(1, project.baseUpdates + variance + occasionalSpike + weekendAdjustment);
}

function focusFor(project: ActivityProject, date: Date): string {
  const start = parseDate(project.start).getTime();
  const end = parseDate(project.end).getTime();
  const progress = Math.min(0.99, Math.max(0, (date.getTime() - start) / Math.max(1, end - start)));
  const index = Math.floor(progress * project.focus.length);
  return project.focus[index] ?? project.focus[0];
}

export function intensityFor(updates: number): 0 | 1 | 2 | 3 {
  if (updates >= 10) return 3;
  if (updates >= 6) return 2;
  if (updates >= 2) return 1;
  return 0;
}

export function buildActivityForRange(startDate: Date, days: number): Record<string, DailyActivity> {
  const activity: Record<string, DailyActivity> = {};
  const activityProjects = getActivityProjectsInternal();

  for (let offset = 0; offset < days; offset++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + offset);
    const dateKey = toDateKey(date);

    const dayProjects = activityProjects
      .filter((project) => isActive(project, date))
      .map((project) => ({
        project,
        updates: updatesFor(project, date),
      }))
      .filter((item) => item.updates > 0)
      .map(({ project, updates }) => ({
        id: project.id,
        repo: project.repo,
        label: project.label,
        href: project.href,
        color: project.color,
        updates,
        focus: focusFor(project, date),
      }));

    const totalUpdates = dayProjects.reduce((sum, project) => sum + project.updates, 0);
    if (totalUpdates === 0) continue;

    const dominantSummary = [...dayProjects].sort((a, b) => b.updates - a.updates)[0];
    const dominantProject = activityProjects.find((project) => project.id === dominantSummary.id);

    activity[dateKey] = {
      date: dateKey,
      totalUpdates,
      projects: dayProjects.sort((a, b) => b.updates - a.updates),
      dominantProject,
    };
  }

  return activity;
}

export function getActivityColor(activity: DailyActivity | undefined): string {
  if (!activity?.dominantProject) return "var(--bg-muted)";
  return activity.dominantProject.colors[intensityFor(activity.totalUpdates)];
}

export function getActivityProjects(): ActivityProject[] {
  return getActivityProjectsInternal();
}
