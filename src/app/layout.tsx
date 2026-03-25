import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { graphPaperSiteMock } from "@/data/graph-paper-site.mock";

export const metadata: Metadata = {
  title: "KG Paper Site",
  description: "Interactive site for graph papers and enterprise knowledge systems.",
};

const navLinks = [
  { label: "Why Graph", href: "/page_why_graph" },
  { label: "Your System", href: "/page_system" },
  { label: "Papers", href: "/page_paper_1" },
  { label: "Comparison", href: "/page_comparison" },
  { label: "Demos", href: "/page_demos" },
  { label: "Failures", href: "/page_failures" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="page-shell">
          <header className="site-header">
            <div className="header-inner">
              <Link href="/" className="brand">
                <span className="brand-kicker">KG Paper Site</span>
                <span className="brand-title">{graphPaperSiteMock.site.title}</span>
              </Link>
              <nav className="header-nav" aria-label="Main">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <div className="footer-inner">
              用三篇 Graph 論文理解企業知識管理、QA 與多段推理。
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
