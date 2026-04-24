export type ProjectFile = {
  name: string;
  type: "readme" | "link" | "pdf" | "code";
  href?: string;
  external?: boolean;
  content?: string;
};

export type ProjectFolder = {
  name: string;
  files: ProjectFile[];
};

export type ProjectStatus = "completed" | "in-progress" | "planned";

export type Project = {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  featured?: boolean;
  stack: string[];
  dateRange?: string;
  tree: ProjectFolder[];
};

export const projects: Project[] = [
  {
    slug: "swin-transformer-study",
    name: "swin-transformer-study",
    title: "Swin Transformer study",
    tagline: "Empirical investigation of Swin Transformer architectures for fine-grained image classification.",
    status: "completed",
    featured: true,
    stack: ["PyTorch", "Swin-T/S/B", "Oxford-IIIT Pet", "RTX 4090"],
    dateRange: "May – Dec 2025",
    tree: [
      {
        name: "swin-transformer-study",
        files: [
          { name: "README.md", type: "readme", content: "# Swin Transformer study\n\n*Case study coming soon.*" },
          { name: "source", type: "link", href: "https://github.com/rpmjp", external: true },
        ],
      },
    ],
  },
  {
    slug: "student-management-system",
    name: "student-management-system",
    title: "AI-powered Student Management System",
    tagline: "End-to-end system spanning Java backend, SQL, REST APIs, ML predictions, and cloud deployment.",
    status: "in-progress",
    featured: true,
    stack: ["Java", "SQL", "Python", "REST", "Docker", "AWS"],
    dateRange: "Starting April 2026",
    tree: [
      {
        name: "student-management-system",
        files: [
          { name: "README.md", type: "readme", content: "# AI-powered Student Management System\n\n*In development. Roadmap coming soon.*" },
        ],
      },
    ],
  },
  {
    slug: "retail-stream-analytics",
    name: "retail-stream-analytics",
    title: "Online Retail II big data pipeline",
    tagline: "MapReduce analytics on the UCI Online Retail II dataset using AWS EMR, Hadoop, Pig, and Hive.",
    status: "completed",
    stack: ["AWS EMR", "Hadoop", "Pig", "Hive"],
    dateRange: "Fall 2025",
    tree: [
      {
        name: "retail-stream-analytics",
        files: [
          { name: "README.md", type: "readme", content: "# Online Retail II big data pipeline\n\n*Case study coming soon.*" },
        ],
      },
    ],
  },
  {
    slug: "dc-crime-analysis",
    name: "dc-crime-analysis",
    title: "DC Crime Analysis and Prediction",
    tagline: "Applied ML on open DC crime data to predict incident type from location and time features.",
    status: "completed",
    stack: ["Python", "scikit-learn", "pandas"],
    dateRange: "2024",
    tree: [
      {
        name: "dc-crime-analysis",
        files: [
          { name: "README.md", type: "readme", content: "# DC Crime Analysis\n\n*Case study coming soon.*" },
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}