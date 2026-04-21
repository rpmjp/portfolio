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
    date: "2025-05-15",
    title: "DC Crime Analysis paper",
    state: "completed",
    href: "/projects/swin-transformer-study",
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
    date: "2025-11-18",
    title: "Rec system CTR writeup",
    state: "completed",
    href: "/projects/rec-system-ctr",
  },
  {
    date: "2025-12-12",
    title: "Swin ablation study complete",
    description: "300 models trained, paper drafted",
    state: "completed",
    href: "/projects/swin-transformer-study",
  },
  {
    date: "2026-01-22",
    title: "RAG research assistant",
    state: "in-progress",
    href: "/projects/rag-research-assistant",
  },
  {
    date: "2026-02-15",
    title: "CS644 final project shipped",
    state: "completed",
    href: "/projects/retail-stream-analytics",
  },
  {
    date: "2026-03-08",
    title: "Telecom churn pipeline",
    state: "in-progress",
    href: "/projects/telecom-churn-ml",
  },
  {
    date: "2026-04-01",
    title: "Portfolio site build",
    state: "in-progress",
  },
  {
    date: "2026-04-28",
    title: "Kaggle competition entry",
    state: "planned",
    href: "https://www.kaggle.com/robertmcs",
    external: true,
  },
  {
    date: "2026-05-10",
    title: "Masters defense",
    state: "planned",
  },
  {
    date: "2026-05-20",
    title: "YouTube walkthrough: churn pipeline",
    state: "planned",
    external: true,
  },
];