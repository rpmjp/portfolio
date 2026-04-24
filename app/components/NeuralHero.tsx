"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Stage = 0 | 1 | 2;
type Education = "njit" | "rutgers";

type Project = {
  id: string;
  label: string;
  tipLabel: string;
  tipBody: string;
  href: string;
  updatedAgo: string;
};

const projectsBySchool: Record<Education, Project[]> = {
  njit: [
    { id: "sms", label: "SMS", tipLabel: "flagship project", tipBody: "AI-powered Student Management System. Java, SQL, REST, ML predictions, Docker, AWS.", href: "/projects/student-management-system", updatedAgo: "in progress" },
    { id: "swin", label: "Swin", tipLabel: "research", tipBody: "Swin Transformer study. 300+ models trained on RTX 4090, with ablations.", href: "/projects/swin-transformer-study", updatedAgo: "3 weeks ago" },
  ],
  rutgers: [
    { id: "retail", label: "Retail", tipLabel: "project", tipBody: "Online Retail II big data pipeline. MapReduce on AWS EMR with Hadoop, Pig, and Hive.", href: "/projects/retail-stream-analytics", updatedAgo: "Fall 2025" },
    { id: "crime", label: "Crime", tipLabel: "project", tipBody: "DC Crime analysis and prediction. Applied ML with Python, scikit-learn, pandas.", href: "/projects/dc-crime-analysis", updatedAgo: "2024" },
  ],
};

const schoolInfo: Record<Education, { label: string; tipLabel: string; tipBody: string }> = {
  njit: { label: "NJIT", tipLabel: "graduate studies", tipBody: "M.S. Computer Science. 3.9 GPA. Expected May 2026. Focus on deep learning and applied ML." },
  rutgers: { label: "Rutgers", tipLabel: "undergraduate", tipBody: "B.S. from Rutgers. Foundation in CS and software engineering." },
};

const POS = {
  rjpStage1: { x: 100, y: 220 },
  schoolStage1Njit: { x: 460, y: 150 },
  schoolStage1Rutgers: { x: 460, y: 290 },
  schoolAnchorStage2: { x: 200, y: 220 },
  projectX: 580,
  outputX: 810,
  outputY: 220,
};

const R = {
  hero: 52,
  mid: 44,
  project: 44,
};

const mostRecent = projectsBySchool.njit.reduce((acc, p) => (p.updatedAgo.includes("day") && (!acc || p.updatedAgo < acc.updatedAgo) ? p : acc), null as Project | null) ?? projectsBySchool.njit[0];

export default function NeuralHero() {
  const [stage, setStage] = useState<Stage>(0);
  const [selectedSchool, setSelectedSchool] = useState<Education | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();

  function handleRjpHover() {
    if (stage === 0) setStage(1);
  }

  function handleSchoolClick(school: Education) {
    setSelectedSchool(school);
    setStage(2);
    setHoveredId(null);
  }

  function handleProjectClick(project: Project) {
    router.push(project.href);
  }

  function handleBack() {
    if (stage === 2) {
      setStage(1);
      setSelectedSchool(null);
      setHoveredId(null);
    } else if (stage === 1) {
      setStage(0);
      setHoveredId(null);
    }
  }

  function handleOutputClick() {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }

  const currentProjects = selectedSchool ? projectsBySchool[selectedSchool] : [];

  const caption = (() => {
    if (stage === 0) return "hover RJP to begin";
    if (stage === 1) return "click an education node to continue";
    if (stage === 2) return `projects at ${schoolInfo[selectedSchool!].label}`;
    return "";
  })();

  const preview = (() => {
    if (stage === 2 && hoveredId) {
      const p = currentProjects.find((x) => x.id === hoveredId);
      if (p) return { tipLabel: p.tipLabel, tipBody: p.tipBody };
    }
    if (stage === 1 && hoveredId && (hoveredId === "njit" || hoveredId === "rutgers")) {
      return { tipLabel: schoolInfo[hoveredId].tipLabel, tipBody: schoolInfo[hoveredId].tipBody };
    }
    if (stage === 2 && selectedSchool) {
      return { tipLabel: `at ${schoolInfo[selectedSchool].label.toLowerCase()}`, tipBody: "Hover a project for details. Click to open the case study." };
    }
    if (stage === 1) {
      return { tipLabel: "education", tipBody: "Click NJIT or Rutgers to see what I built there." };
    }
    return { tipLabel: "start", tipBody: "Hover RJP to reveal education. Click a school to see its projects." };
  })();

  const njitPos = stage === 2 && selectedSchool === "njit" ? POS.schoolAnchorStage2 : POS.schoolStage1Njit;
  const rutgersPos = stage === 2 && selectedSchool === "rutgers" ? POS.schoolAnchorStage2 : POS.schoolStage1Rutgers;

  const njitOpacity = stage === 0 ? 0 : stage === 1 ? 1 : selectedSchool === "njit" ? 1 : 0;
  const rutgersOpacity = stage === 0 ? 0 : stage === 1 ? 1 : selectedSchool === "rutgers" ? 1 : 0;

  const rjpOpacity = stage === 2 ? 0 : 1;
  const rjpPointerEvents = stage === 2 ? "none" : "auto";

  const schoolAnchorPos = selectedSchool ? POS.schoolAnchorStage2 : POS.schoolStage1Njit;

  return (
    <div className="w-full mx-auto" style={{ maxWidth: "min(100%, 1020px)" }}>
      <div className="relative min-h-[32px] mb-3 flex items-center">
        {stage > 0 && (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] transition-opacity hover:opacity-80"
            style={{
              background: "var(--bg-muted)",
              border: "0.5px solid var(--border-default)",
              color: "var(--fg-default)",
            }}
          >
            ← back
          </button>
        )}
        <div
          className="text-[11px] uppercase tracking-wider ml-auto"
          style={{ color: "var(--fg-subtle)" }}
        >
          {caption}
        </div>
      </div>

      <div
        className="relative w-full"
        style={{
          aspectRatio: "900 / 460",
          minHeight: 360,
        }}
      >
        <svg viewBox="0 0 900 460" className="w-full h-full block" preserveAspectRatio="xMidYMid meet">

          <defs>
            <radialGradient id="pulseBlue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2f81f7" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#2f81f7" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#2f81f7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pulseGreen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {stage === 1 && (
            <g>
              <line x1={POS.rjpStage1.x} y1={POS.rjpStage1.y} x2={POS.schoolStage1Njit.x} y2={POS.schoolStage1Njit.y} stroke={hoveredId === "njit" ? "var(--accent-fg)" : "var(--border-default)"} strokeWidth={hoveredId === "njit" ? 2 : 1.25} opacity={hoveredId === "njit" ? 0.9 : 0.55} style={{ transition: "opacity 0.3s, stroke 0.3s, stroke-width 0.3s" }} />
              {hoveredId === "njit" && (
                <circle r={4} fill="var(--accent-fg)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${POS.rjpStage1.x},${POS.rjpStage1.y} L${POS.schoolStage1Njit.x},${POS.schoolStage1Njit.y}`} />
                </circle>
              )}
              <line x1={POS.rjpStage1.x} y1={POS.rjpStage1.y} x2={POS.schoolStage1Rutgers.x} y2={POS.schoolStage1Rutgers.y} stroke={hoveredId === "rutgers" ? "var(--accent-fg)" : "var(--border-default)"} strokeWidth={hoveredId === "rutgers" ? 2 : 1.25} opacity={hoveredId === "rutgers" ? 0.9 : 0.55} style={{ transition: "opacity 0.3s, stroke 0.3s, stroke-width 0.3s" }} />
              {hoveredId === "rutgers" && (
                <circle r={4} fill="var(--accent-fg)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${POS.rjpStage1.x},${POS.rjpStage1.y} L${POS.schoolStage1Rutgers.x},${POS.schoolStage1Rutgers.y}`} />
                </circle>
              )}
            </g>
          )}

          {stage === 2 && selectedSchool && (
            <g>
              {currentProjects.map((p, i) => {
                const spacing = 460 / (currentProjects.length + 1);
                const py = spacing * (i + 1);
                const isHovered = hoveredId === p.id;
                return (
                  <g key={`edge-${p.id}`}>
                    <line x1={schoolAnchorPos.x} y1={schoolAnchorPos.y} x2={POS.projectX} y2={py} stroke={isHovered ? "var(--accent-fg)" : "var(--border-default)"} strokeWidth={isHovered ? 2 : 1.25} opacity={isHovered ? 0.95 : 0.5} style={{ transition: "opacity 0.3s, stroke 0.3s, stroke-width 0.3s" }} />
                    {isHovered && (
                      <circle r={4} fill="var(--accent-fg)">
                        <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${schoolAnchorPos.x},${schoolAnchorPos.y} L${POS.projectX},${py}`} />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          <g
            style={{ cursor: stage === 0 ? "pointer" : "default", opacity: rjpOpacity, transition: "opacity 0.5s" }}
            pointerEvents={rjpPointerEvents as "auto" | "none"}
            onMouseEnter={handleRjpHover}
          >
            {stage === 0 && (
              <circle cx={POS.rjpStage1.x} cy={POS.rjpStage1.y} r={R.hero + 26} fill="url(#pulseBlue)">
                <animate attributeName="r" values={`${R.hero + 10};${R.hero + 32};${R.hero + 10}`} dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.55;0.15;0.55" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={POS.rjpStage1.x} cy={POS.rjpStage1.y} r={R.hero} fill="var(--accent-bg)" stroke="var(--accent-fg)" strokeWidth={2.5} />
            <text x={POS.rjpStage1.x} y={POS.rjpStage1.y + 8} textAnchor="middle" fill="var(--fg-default)" fontSize={22} fontWeight={500}>RJP</text>
          </g>

          <g
            style={{ cursor: njitOpacity > 0 ? "pointer" : "default", opacity: njitOpacity, transition: "opacity 0.5s" }}
            pointerEvents={njitOpacity > 0 ? "auto" : "none"}
            onMouseEnter={() => setHoveredId("njit")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => stage === 1 && handleSchoolClick("njit")}
          >
            <circle
              cx={njitPos.x}
              cy={njitPos.y}
              r={R.mid}
              fill="var(--bg-canvas)"
              stroke={hoveredId === "njit" || (stage === 2 && selectedSchool === "njit") ? "var(--accent-fg)" : "var(--border-default)"}
              strokeWidth={hoveredId === "njit" || (stage === 2 && selectedSchool === "njit") ? 2.5 : 1.5}
              style={{ transition: "cx 0.6s cubic-bezier(0.4,0,0.2,1), cy 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.2s, stroke-width 0.2s" }}
            />
            <text
              x={njitPos.x}
              y={njitPos.y + 7}
              textAnchor="middle"
              fill="var(--fg-default)"
              fontSize={19}
              fontWeight={stage === 2 && selectedSchool === "njit" ? 500 : 400}
              style={{ transition: "x 0.6s cubic-bezier(0.4,0,0.2,1), y 0.6s cubic-bezier(0.4,0,0.2,1)" }}
            >
              NJIT
            </text>
          </g>

          <g
            style={{ cursor: rutgersOpacity > 0 ? "pointer" : "default", opacity: rutgersOpacity, transition: "opacity 0.5s" }}
            pointerEvents={rutgersOpacity > 0 ? "auto" : "none"}
            onMouseEnter={() => setHoveredId("rutgers")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => stage === 1 && handleSchoolClick("rutgers")}
          >
            <circle
              cx={rutgersPos.x}
              cy={rutgersPos.y}
              r={R.mid}
              fill="var(--bg-canvas)"
              stroke={hoveredId === "rutgers" || (stage === 2 && selectedSchool === "rutgers") ? "var(--accent-fg)" : "var(--border-default)"}
              strokeWidth={hoveredId === "rutgers" || (stage === 2 && selectedSchool === "rutgers") ? 2.5 : 1.5}
              style={{ transition: "cx 0.6s cubic-bezier(0.4,0,0.2,1), cy 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.2s, stroke-width 0.2s" }}
            />
            <text
              x={rutgersPos.x}
              y={rutgersPos.y + 7}
              textAnchor="middle"
              fill="var(--fg-default)"
              fontSize={16}
              fontWeight={stage === 2 && selectedSchool === "rutgers" ? 500 : 400}
              style={{ transition: "x 0.6s cubic-bezier(0.4,0,0.2,1), y 0.6s cubic-bezier(0.4,0,0.2,1)" }}
            >
              Rutgers
            </text>
          </g>

          {stage === 2 && selectedSchool && (
            <g>
              {currentProjects.map((p, i) => {
                const spacing = 460 / (currentProjects.length + 1);
                const py = spacing * (i + 1);
                const isHovered = hoveredId === p.id;
                return (
                  <g
                    key={p.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleProjectClick(p)}
                  >
                    <circle cx={POS.projectX} cy={py} r={R.project} fill="var(--bg-canvas)" stroke={isHovered ? "var(--accent-fg)" : "var(--border-default)"} strokeWidth={isHovered ? 2.5 : 1.5} style={{ transition: "stroke 0.2s, stroke-width 0.2s" }} />
                    <text x={POS.projectX} y={py + 7} textAnchor="middle" fill="var(--fg-default)" fontSize={18}>{p.label}</text>
                  </g>
                );
              })}
            </g>
          )}

          <g style={{ cursor: "pointer" }} onClick={handleOutputClick}>
            <circle cx={POS.outputX} cy={POS.outputY} r={R.hero + 16} fill="url(#pulseGreen)" opacity={0.7}>
              <animate attributeName="r" values={`${R.hero + 6};${R.hero + 24};${R.hero + 6}`} dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0.1;0.45" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx={POS.outputX} cy={POS.outputY} r={R.hero} fill="var(--success-bg)" stroke="var(--success-fg)" strokeWidth={2.5} />
            <text x={POS.outputX} y={POS.outputY - 4} textAnchor="middle" fill="var(--fg-default)" fontSize={15} fontWeight={500}>Open</text>
            <text x={POS.outputX} y={POS.outputY + 14} textAnchor="middle" fill="var(--fg-default)" fontSize={15} fontWeight={500}>to work</text>
          </g>

          <g fontSize="13" fill="var(--fg-subtle)" fontWeight={500}>
            <text x={100} y={430} textAnchor="middle" opacity={stage === 2 ? 0.3 : 1} style={{ transition: "opacity 0.5s" }}>input</text>
            <text x={stage === 2 ? POS.schoolAnchorStage2.x : POS.schoolStage1Njit.x} y={430} textAnchor="middle" opacity={stage === 0 ? 0 : 1} style={{ transition: "opacity 0.5s, x 0.6s cubic-bezier(0.4,0,0.2,1)" }}>{stage === 2 ? schoolInfo[selectedSchool!].label.toLowerCase() : "education"}</text>
            <text x={POS.projectX} y={430} textAnchor="middle" opacity={stage === 2 ? 1 : 0} style={{ transition: "opacity 0.5s" }}>projects</text>
            <text x={POS.outputX} y={430} textAnchor="middle">output</text>
          </g>
        </svg>
      </div>

      <div
        className="mt-4 mx-auto px-4 py-3 rounded-lg text-[13px] leading-relaxed max-w-xl"
        style={{
          background: "var(--bg-muted)",
          border: "0.5px solid var(--border-default)",
        }}
      >
        <div
          className="text-[10px] uppercase tracking-wider mb-1"
          style={{ color: "var(--fg-muted)" }}
        >
          {preview.tipLabel}
        </div>
        <div style={{ color: "var(--fg-default)" }}>{preview.tipBody}</div>
      </div>
    </div>
  );
}