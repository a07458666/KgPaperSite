import Image from "next/image";
import Link from "next/link";
import { paperExplainers } from "@/data/paper-explainers";

export function HomePaperGallery() {
  return (
    <section className="section-card">
      <div className="eyebrow">Paper Snapshot</div>
      <h2 className="section-title">三篇 Paper 的共同點與差異</h2>
      <p className="section-body">
        這三篇 paper 雖然分別在談長時序記憶、多輪決策與 graph-guided QA，但共同點都很明確：
        它們都在解決「資訊很多、關係很多、步驟很多時，如何不要只靠線性文字，而改用 graph 來保留可追蹤的結構」。
      </p>
      <div className="home-paper-grid">
        {paperExplainers.map((paper) => (
          <article key={paper.pageId} className="paper-preview-card">
            <div className="paper-preview-image-wrap">
              <Image
                src={paper.visuals[1]?.src ?? paper.visuals[0].src}
                alt={paper.visuals[1]?.alt ?? paper.visuals[0].alt}
                width={1200}
                height={800}
                className="paper-preview-image"
              />
            </div>
            <div className="paper-preview-copy">
              <h3>{paper.shortTitle}</h3>
              <p>{paper.researchGoal}</p>
              <div className="cta-row">
                <Link className="button-link secondary" href={`/${paper.pageId}`}>
                  進入這篇 Paper
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="cta-row">
        <Link className="button-link primary" href="/page_comparison">
          比較三篇論文
        </Link>
        <Link className="button-link secondary" href="/page_system">
          看系統架構
        </Link>
      </div>
    </section>
  );
}
