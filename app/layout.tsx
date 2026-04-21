import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Robert Jean Pierre",
  description: "ML engineer · NJIT CS '26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ background: "var(--bg-canvas)" }}>
        <TopBar />
        <div className="flex" style={{ minHeight: "calc(100vh - 45px)" }}>
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}