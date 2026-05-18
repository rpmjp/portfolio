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
    title: "CommunityShield ETL + database",
    description: "8.5M Chicago rows, PostGIS, 7.8M-row pre-aggregated rollups",
    state: "completed",
    href: "/projects/communityshield",
  },
  {
    date: "2025-06-20",
    title: "CommunityShield ML pipeline",
    description: "4 XGBoost models, Optuna tuning, SHAP TreeExplainer",
    state: "completed",
    href: "/projects/communityshield",
  },
  {
    date: "2025-07-25",
    title: "CommunityShield React frontend",
    description: "MapLibre heatmap, beat detail, 3-tier rendering fallback",
    state: "completed",
    href: "/projects/communityshield",
  },
  {
    date: "2025-08-22",
    title: "CommunityShield methodology + ethics",
    description: "ROC curves, feature importance, 'not predictive policing' framing",
    state: "completed",
    href: "/projects/communityshield",
  },
  {
    date: "2025-09-10",
    title: "Swin Transformer v1 training runs",
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
    date: "2025-10-12",
    title: "Sentinel ML pipeline complete",
    description: "Calibrated LightGBM on 6.36M PaySim transactions, PR-AUC 0.992",
    state: "completed",
    href: "/projects/sentinel",
  },
  {
    date: "2025-11-08",
    title: "Sentinel FastAPI backend shipped",
    description: "50+ endpoints, JWT auth, multi-tenant Postgres",
    state: "completed",
    href: "/projects/sentinel",
  },
  {
    date: "2025-12-12",
    title: "Swin ablation study complete",
    description: "300 models trained, paper drafted",
    state: "completed",
    href: "/projects/swin-transformer-study",
  },
  {
    date: "2025-12-15",
    title: "Sentinel analyst workspace live",
    description: "14 React pages, SHAP waterfall, real-time replay",
    state: "completed",
    href: "/projects/sentinel",
  },
  {
    date: "2026-01-20",
    title: "Sentinel MLOps surface complete",
    description: "Drift monitoring, threshold tuner, hardened CSV upload",
    state: "completed",
    href: "/projects/sentinel",
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