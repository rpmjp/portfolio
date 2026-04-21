export type Project = {
  slug: string;
  name: string;
  title: string;
  category: string;
  year: number;
  tagline: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "telecom-churn-ml",
    name: "telecom-churn-ml",
    title: "Telecom churn prediction pipeline",
    category: "Flagship",
    year: 2026,
    tagline:
      "End-to-end MLOps pipeline predicting customer churn on telecom subscriber data.",
    stack: ["Python", "FastAPI", "scikit-learn", "Docker", "AWS", "MLflow"],
  },
  {
    slug: "rag-research-assistant",
    name: "rag-research-assistant",
    title: "RAG research assistant",
    category: "Applied AI",
    year: 2026,
    tagline:
      "Retrieval-augmented Q&A system over ML papers with a real evaluation harness.",
    stack: ["Python", "LangChain", "Pinecone", "PyTorch"],
  },
  {
    slug: "swin-transformer-study",
    name: "swin-transformer-study",
    title: "Swin Transformer study",
    category: "Research",
    year: 2025,
    tagline:
      "Fine-tuned vision transformer with ablations and baseline comparisons.",
    stack: ["PyTorch", "CUDA", "Weights & Biases"],
  },
  {
    slug: "retail-stream-analytics",
    name: "retail-stream-analytics",
    title: "Retail stream analytics",
    category: "Data engineering",
    year: 2025,
    tagline:
      "Real-time transaction processing with Kafka and Spark Streaming.",
    stack: ["Kafka", "Spark", "Grafana"],
  },
  {
    slug: "rec-system-ctr",
    name: "rec-system-ctr",
    title: "Recommendation system",
    category: "Applied ML",
    year: 2025,
    tagline:
      "Two-tower recommender and CTR prediction on a public ad-tech dataset.",
    stack: ["PyTorch", "Pandas", "MLflow"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}