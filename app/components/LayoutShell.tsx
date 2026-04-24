"use client";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "../lib/useMediaQuery";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import ProjectSidebar from "./ProjectSidebar";
import MobileProfileHeader from "./MobileProfileHeader";
import { getProject } from "../lib/projects";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const projectSlugMatch = pathname.match(/^\/projects\/([^/]+)$/);
  const currentProject = projectSlugMatch ? getProject(projectSlugMatch[1]) : null;
  const isProjectPage = !!currentProject;

  return (
    <>
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        showMenuButton={isMobile}
      />
      <div className="flex mx-auto" style={{ minHeight: "calc(100vh - 45px)", maxWidth: "1280px" }}>
        {isProjectPage && currentProject ? (
          <Suspense fallback={<SidebarFallback />}>
            <ProjectSidebar
              project={currentProject}
              isOpen={isMobile ? sidebarOpen : true}
              onClose={() => setSidebarOpen(false)}
              isMobile={isMobile}
            />
          </Suspense>
        ) : isMobile ? (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            isMobile
          />
        ) : (
          <Sidebar />
        )}
        <main className="flex-1 min-w-0">
          {isMobile && !isProjectPage && <MobileProfileHeader />}
          {children}
        </main>
      </div>
    </>
  );
}

function SidebarFallback() {
  return (
    <aside className="w-60 flex-shrink-0 border-r" style={{ background: "var(--bg-canvas)", borderColor: "var(--border-muted)" }} />
  );
}