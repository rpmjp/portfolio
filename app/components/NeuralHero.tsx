"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Stage = 0 | 1 | 2;
type ProjectGroup = "solo" | "njit" | "rutgers";

type Project = {
  id: string;
  label: string;
  tipLabel: string;
  tipBody: string;
  href: string;
  updatedAgo: string;
};

const projectsByGroup: Record<ProjectGroup, Project[]> = {
  solo: [
    { id: "robi", label: "Robi", tipLabel: "production RAG", tipBody: "Retrieval-augmented assistant with hybrid search, guardrails, evals, monitoring, and a live About-page widget.", href: "/projects/robi", updatedAgo: "today" },
  ],
  njit: [
    { id: "sentinel", label: "Sentinel", tipLabel: "flagship project", tipBody: "Fraud detection platform with calibrated LightGBM scoring, SHAP explanations, FastAPI, Postgres, and a live React analyst workspace.", href: "/projects/sentinel", updatedAgo: "recently" },
    { id: "swin", label: "Swin", tipLabel: "research", tipBody: "Swin Transformer study. 300+ models trained on RTX 4090, with ablations.", href: "/projects/swin-transformer-study", updatedAgo: "3 weeks ago" },
    { id: "sms", label: "SMS", tipLabel: "flagship project", tipBody: "AI-powered Student Management System. Java, SQL, REST, ML predictions, Docker, AWS.", href: "/projects/student-management-system", updatedAgo: "in progress" },
  ],
  rutgers: [
    { id: "retail", label: "Retail", tipLabel: "project", tipBody: "Online Retail II big data pipeline. MapReduce on AWS EMR with Hadoop, Pig, and Hive.", href: "/projects/retail-stream-analytics", updatedAgo: "Fall 2025" },
    { id: "communityshield", label: "Shield", tipLabel: "CommunityShield", tipBody: "Chicago public-safety analytics with MapLibre heatmaps, beat detail, FastAPI, PostGIS rollups, and explainable ML predictions.", href: "/projects/communityshield", updatedAgo: "2025" },
  ],
};

const groupInfo: Record<ProjectGroup, { label: string; tipLabel: string; tipBody: string }> = {
  solo: { label: "Solo", tipLabel: "independent work", tipBody: "Self-directed production projects built outside coursework, starting with Robi." },
  njit: { label: "NJIT", tipLabel: "graduate studies", tipBody: "M.S. Computer Science. 3.9 GPA. Expected May 2026. Focus on deep learning and applied ML." },
  rutgers: { label: "Rutgers", tipLabel: "undergraduate", tipBody: "B.S. from Rutgers. Foundation in CS and software engineering." },
};

const POS = {
  rjpStage1: { x: 100, y: 220 },
  groupStage1Solo: { x: 460, y: 80 },
  groupStage1Njit: { x: 460, y: 200 },
  groupStage1Rutgers: { x: 460, y: 320 },
  groupAnchorStage2: { x: 200, y: 220 },
  projectX: 580,
  outputX: 810,
  outputY: 220,
};

const R = {
  hero: 52,
  mid: 44,
  project: 44,
};

export default function NeuralHero() {
  const [stage, setStage] = useState<Stage>(0);
  const [selectedGroup, setSelectedGroup] = useState<ProjectGroup | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();

  function handleRjpHover() {
    if (stage === 0) setStage(1);
  }

  function handleGroupClick(group: ProjectGroup) {
    setSelectedGroup(group);
    setStage(2);
    setHoveredId(null);
  }

  function handleProjectClick(project: Project) {
    router.push(project.href);
  }

  function handleBack() {
    if (stage === 2) {
      setStage(1);
      setSelectedGroup(null);
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

  const currentProjects = selectedGroup ? projectsByGroup[selectedGroup] : [];

  const caption = (() => {
    if (stage === 0) return "click a node to explore";
    if (stage === 1) return "click a node to continue";
    if (stage === 2) return `projects from ${groupInfo[selectedGroup!].label}`;
    return "";
  })();

  const preview = (() => {
    if (stage === 2 && hoveredId) {
      const p = currentProjects.find((x) => x.id === hoveredId);
      if (p) return { tipLabel: p.tipLabel, tipBody: p.tipBody };
    }
    if ((stage === 0 || stage === 1) && hoveredId && (hoveredId === "solo" || hoveredId === "njit" || hoveredId === "rutgers")) {
      return { tipLabel: groupInfo[hoveredId].tipLabel, tipBody: groupInfo[hoveredId].tipBody };
    }
    if (stage === 2 && selectedGroup) {
      return { tipLabel: `from ${groupInfo[selectedGroup].label.toLowerCase()}`, tipBody: "Hover a project for details. Click to open the case study." };
    }
    if (stage === 0 || stage === 1) {
      return { tipLabel: "project paths", tipBody: "Click Solo, NJIT, or Rutgers to see what I built there." };
    }
    return { tipLabel: "start", tipBody: "Click a node to drill in." };
  })();

  const soloPos = stage === 2 && selectedGroup === "solo" ? POS.groupAnchorStage2 : POS.groupStage1Solo;
  const njitPos = stage === 2 && selectedGroup === "njit" ? POS.groupAnchorStage2 : POS.groupStage1Njit;
  const rutgersPos = stage === 2 && selectedGroup === "rutgers" ? POS.groupAnchorStage2 : POS.groupStage1Rutgers;

  const soloOpacity = stage === 2 && selectedGroup !== "solo" ? 0 : 1;
  const njitOpacity = stage === 2 && selectedGroup !== "njit" ? 0 : 1;
  const rutgersOpacity = stage === 2 && selectedGroup !== "rutgers" ? 0 : 1;

  const rjpOpacity = stage === 2 ? 0 : 1;
  const rjpPointerEvents = stage === 2 ? "none" : "auto";

  const groupLinesVisible = stage === 0 || stage === 1;

  const groupAnchorPos = selectedGroup ? POS.groupAnchorStage2 : POS.groupStage1Njit;

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

          {groupLinesVisible && (
            <g>
              <line
                x1={POS.rjpStage1.x}
                y1={POS.rjpStage1.y}
                x2={POS.groupStage1Solo.x}
                y2={POS.groupStage1Solo.y}
                stroke={hoveredId === "solo" ? "var(--accent-fg)" : "var(--border-default)"}
                strokeWidth={hoveredId === "solo" ? 2 : 1.25}
                opacity={hoveredId === "solo" ? 0.9 : 0.5}
                style={{ transition: "opacity 0.3s, stroke 0.3s, stroke-width 0.3s" }}
              />
              <circle
                r={hoveredId === "solo" ? 4 : 2.5}
                fill={hoveredId === "solo" ? "var(--accent-fg)" : "var(--fg-muted)"}
                opacity={hoveredId === "solo" ? 1 : 0.55}
                style={{ transition: "r 0.3s, opacity 0.3s, fill 0.3s" }}
              >
                <animateMotion
                  dur={hoveredId === "solo" ? "1.2s" : "2.8s"}
                  repeatCount="indefinite"
                  path={`M${POS.rjpStage1.x},${POS.rjpStage1.y} L${POS.groupStage1Solo.x},${POS.groupStage1Solo.y}`}
                />
              </circle>

              <line
                x1={POS.rjpStage1.x}
                y1={POS.rjpStage1.y}
                x2={POS.groupStage1Njit.x}
                y2={POS.groupStage1Njit.y}
                stroke={hoveredId === "njit" ? "var(--accent-fg)" : "var(--border-default)"}
                strokeWidth={hoveredId === "njit" ? 2 : 1.25}
                opacity={hoveredId === "njit" ? 0.9 : 0.5}
                style={{ transition: "opacity 0.3s, stroke 0.3s, stroke-width 0.3s" }}
              />
              <circle
                r={hoveredId === "njit" ? 4 : 2.5}
                fill={hoveredId === "njit" ? "var(--accent-fg)" : "var(--fg-muted)"}
                opacity={hoveredId === "njit" ? 1 : 0.55}
                style={{ transition: "r 0.3s, opacity 0.3s, fill 0.3s" }}
              >
                <animateMotion
                  dur={hoveredId === "njit" ? "1.2s" : "3.2s"}
                  repeatCount="indefinite"
                  path={`M${POS.rjpStage1.x},${POS.rjpStage1.y} L${POS.groupStage1Njit.x},${POS.groupStage1Njit.y}`}
                />
              </circle>

              <line
                x1={POS.rjpStage1.x}
                y1={POS.rjpStage1.y}
                x2={POS.groupStage1Rutgers.x}
                y2={POS.groupStage1Rutgers.y}
                stroke={hoveredId === "rutgers" ? "var(--accent-fg)" : "var(--border-default)"}
                strokeWidth={hoveredId === "rutgers" ? 2 : 1.25}
                opacity={hoveredId === "rutgers" ? 0.9 : 0.5}
                style={{ transition: "opacity 0.3s, stroke 0.3s, stroke-width 0.3s" }}
              />
              <circle
                r={hoveredId === "rutgers" ? 4 : 2.5}
                fill={hoveredId === "rutgers" ? "var(--accent-fg)" : "var(--fg-muted)"}
                opacity={hoveredId === "rutgers" ? 1 : 0.55}
                style={{ transition: "r 0.3s, opacity 0.3s, fill 0.3s" }}
              >
                <animateMotion
                  dur={hoveredId === "rutgers" ? "1.2s" : "3.6s"}
                  repeatCount="indefinite"
                  path={`M${POS.rjpStage1.x},${POS.rjpStage1.y} L${POS.groupStage1Rutgers.x},${POS.groupStage1Rutgers.y}`}
                />
              </circle>
            </g>
          )}

          {stage === 2 && selectedGroup && (
            <g>
              {currentProjects.map((p, i) => {
                const spacing = 460 / (currentProjects.length + 1);
                const py = spacing * (i + 1);
                const isHovered = hoveredId === p.id;
                return (
                  <g key={`edge-${p.id}`}>
                    <line
                      x1={groupAnchorPos.x}
                      y1={groupAnchorPos.y}
                      x2={POS.projectX}
                      y2={py}
                      stroke={isHovered ? "var(--accent-fg)" : "var(--border-default)"}
                      strokeWidth={isHovered ? 2 : 1.25}
                      opacity={isHovered ? 0.95 : 0.5}
                      style={{ transition: "opacity 0.3s, stroke 0.3s, stroke-width 0.3s" }}
                    />
                    <circle
                      r={isHovered ? 4 : 2.5}
                      fill={isHovered ? "var(--accent-fg)" : "var(--fg-muted)"}
                      opacity={isHovered ? 1 : 0.55}
                      style={{ transition: "r 0.3s, opacity 0.3s, fill 0.3s" }}
                    >
                      <animateMotion
                        dur={isHovered ? "1.2s" : `${3 + i * 0.4}s`}
                        repeatCount="indefinite"
                        path={`M${groupAnchorPos.x},${groupAnchorPos.y} L${POS.projectX},${py}`}
                      />
                    </circle>
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
            style={{ cursor: soloOpacity > 0 ? "pointer" : "default", opacity: soloOpacity, transition: "opacity 0.5s" }}
            pointerEvents={soloOpacity > 0 ? "auto" : "none"}
            onMouseEnter={() => setHoveredId("solo")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => (stage === 0 || stage === 1) && handleGroupClick("solo")}
          >
            <circle
              cx={soloPos.x}
              cy={soloPos.y}
              r={R.mid}
              fill="var(--bg-canvas)"
              stroke={hoveredId === "solo" || (stage === 2 && selectedGroup === "solo") ? "var(--accent-fg)" : "var(--border-default)"}
              strokeWidth={hoveredId === "solo" || (stage === 2 && selectedGroup === "solo") ? 2.5 : 1.5}
              style={{ transition: "cx 0.6s cubic-bezier(0.4,0,0.2,1), cy 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.2s, stroke-width 0.2s" }}
            />
            <text
              x={soloPos.x}
              y={soloPos.y + 7}
              textAnchor="middle"
              fill="var(--fg-default)"
              fontSize={18}
              fontWeight={stage === 2 && selectedGroup === "solo" ? 500 : 400}
              style={{ transition: "x 0.6s cubic-bezier(0.4,0,0.2,1), y 0.6s cubic-bezier(0.4,0,0.2,1)" }}
            >
              Solo
            </text>
          </g>

          <g
            style={{ cursor: njitOpacity > 0 ? "pointer" : "default", opacity: njitOpacity, transition: "opacity 0.5s" }}
            pointerEvents={njitOpacity > 0 ? "auto" : "none"}
            onMouseEnter={() => setHoveredId("njit")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => (stage === 0 || stage === 1) && handleGroupClick("njit")}
          >
            <circle
              cx={njitPos.x}
              cy={njitPos.y}
              r={R.mid}
              fill="var(--bg-canvas)"
              stroke={hoveredId === "njit" || (stage === 2 && selectedGroup === "njit") ? "var(--accent-fg)" : "var(--border-default)"}
              strokeWidth={hoveredId === "njit" || (stage === 2 && selectedGroup === "njit") ? 2.5 : 1.5}
              style={{ transition: "cx 0.6s cubic-bezier(0.4,0,0.2,1), cy 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.2s, stroke-width 0.2s" }}
            />
            <text
              x={njitPos.x}
              y={njitPos.y + 7}
              textAnchor="middle"
              fill="var(--fg-default)"
              fontSize={19}
              fontWeight={stage === 2 && selectedGroup === "njit" ? 500 : 400}
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
            onClick={() => (stage === 0 || stage === 1) && handleGroupClick("rutgers")}
          >
            <circle
              cx={rutgersPos.x}
              cy={rutgersPos.y}
              r={R.mid}
              fill="var(--bg-canvas)"
              stroke={hoveredId === "rutgers" || (stage === 2 && selectedGroup === "rutgers") ? "var(--accent-fg)" : "var(--border-default)"}
              strokeWidth={hoveredId === "rutgers" || (stage === 2 && selectedGroup === "rutgers") ? 2.5 : 1.5}
              style={{ transition: "cx 0.6s cubic-bezier(0.4,0,0.2,1), cy 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.2s, stroke-width 0.2s" }}
            />
            <text
              x={rutgersPos.x}
              y={rutgersPos.y + 7}
              textAnchor="middle"
              fill="var(--fg-default)"
              fontSize={16}
              fontWeight={stage === 2 && selectedGroup === "rutgers" ? 500 : 400}
              style={{ transition: "x 0.6s cubic-bezier(0.4,0,0.2,1), y 0.6s cubic-bezier(0.4,0,0.2,1)" }}
            >
              Rutgers
            </text>
          </g>

          {stage === 2 && selectedGroup && (
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
            <text x={stage === 2 ? POS.groupAnchorStage2.x : POS.groupStage1Njit.x} y={430} textAnchor="middle" style={{ transition: "x 0.6s cubic-bezier(0.4,0,0.2,1)" }}>{stage === 2 ? groupInfo[selectedGroup!].label.toLowerCase() : "path"}</text>
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
          minHeight: 66,
        }}
      >
        <div
          className="text-[10px] uppercase tracking-wider mb-1"
          style={{ color: "var(--fg-muted)" }}
        >
          {preview.tipLabel}
        </div>
        <div className="truncate" style={{ color: "var(--fg-default)" }} title={preview.tipBody}>
          {preview.tipBody}
        </div>
      </div>
    </div>
  );
}
