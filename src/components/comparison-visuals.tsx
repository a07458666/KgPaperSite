import Image from "next/image";
import { paperExplainers } from "@/data/paper-explainers";
import { withBasePath } from "@/lib/with-base-path";

export function ComparisonVisuals() {
  return (
    <section className="section-card">
      <div className="eyebrow">Method Visuals</div>
      <h2 className="section-title">三篇 Paper 的方法圖</h2>
      <p className="section-body">
        如果只看表格，很容易只記住結論而忘記方法差異。這裡把三篇 paper 的代表方法圖放在一起，幫助理解它們分別在建什麼樣的 graph、以及 graph 在流程中扮演什麼角色。
      </p>
      <div className="comparison-visual-grid">
        {paperExplainers.map((paper) => {
          const visual = paper.visuals[1] ?? paper.visuals[0];
          return (
            <figure key={paper.pageId} className="paper-visual-card">
              <Image
                src={withBasePath(visual.src)}
                alt={visual.alt}
                width={1200}
                height={900}
                className="paper-visual-image"
              />
              <figcaption>
                <strong>{paper.shortTitle}</strong>
                <br />
                {visual.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
