import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "./components/LayoutShell";

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
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}