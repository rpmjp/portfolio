import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./components/TopBar";

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
        {children}
      </body>
    </html>
  );
}