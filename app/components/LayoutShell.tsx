"use client";

import { useState } from "react";
import { useMediaQuery } from "../lib/useMediaQuery";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import MobileProfileHeader from "./MobileProfileHeader";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        showMenuButton={isMobile}
      />
      <div className="flex" style={{ minHeight: "calc(100vh - 45px)" }}>
        {isMobile ? (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            isMobile
          />
        ) : (
          <Sidebar />
        )}
        <main className="flex-1 min-w-0">
          {isMobile && <MobileProfileHeader />}
          {children}
        </main>
      </div>
    </>
  );
}