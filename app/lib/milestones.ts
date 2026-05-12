export type MilestoneState = "completed" | "in-progress" | "planned";

export type Milestone = {
  date: string;
  title: string;
  description?: string;
  state: MilestoneState;
  href?: string;
  external?: boolean;
};

export const milestones: Milestone[] = [
  {
    date: "2024-05-15",
    title: "DC Crime Analysis project",
    state: "completed",
    href: "/projects/dc-crime-analysis",
  },
  {
    date: "2025-06-20",
    title: "Swin Transformer v1 training runs",
    state: "completed",
    href: "/projects/swin-transformer-study",
  },
  {
    date: "2025-08-10",
    title: "CS732 midterm project",
    state: "completed",
    href: "/projects/swin-transformer-study",
  },
  {
    date: "2025-10-05",
    title: "Retail stream analytics demo",
    state: "completed",
    href: "/projects/retail-stream-analytics",
  },
  {
    date: "2025-12-12",
    title: "Swin ablation study complete",
    description: "300 models trained, paper drafted",
    state: "completed",
    href: "/projects/swin-transformer-study",
  },
  {
    date: "2026-02-15",
    title: "CS644 final project shipped",
    state: "completed",
    href: "/projects/retail-stream-analytics",
  },
  {
    date: "2026-04-05",
    title: "SMS backend scaffolding",
    description: "Java + Jakarta EE + MySQL schema",
    state: "completed",
    href: "/projects/student-management-system",
  },
  {
    date: "2026-04-18",
    title: "SMS auth + role-based portals",
    description: "AuthFilter, sessions, student vs staff routing",
    state: "completed",
    href: "/projects/student-management-system",
  },
  {
    date: "2026-04-25",
    title: "SMS ML microservice integrated",
    description: "Random Forest, 96% accuracy, Flask + HTTP bridge",
    state: "completed",
    href: "/projects/student-management-system",
  },
  {
    date: "2026-05-01",
    title: "Portfolio site build",
    state: "in-progress",
  },
  {
    date: "2026-05-08",
    title: "SMS dark mode + responsive",
    description: "CSS custom properties, 3 breakpoints, theme toggle",
    state: "completed",
    href: "/projects/student-management-system",
  },
  {
    date: "2026-05-10",
    title: "Masters defense",
    state: "planned",
  },
  {
    date: "2026-05-15",
    title: "Kaggle competition entry",
    state: "planned",
    href: "https://www.kaggle.com/robertmcs",
    external: true,
  },
];