import { ComparisonVisuals } from "@/components/comparison-visuals";
import { GraphPreview } from "@/components/graph-preview";
import { HomePaperGallery } from "@/components/home-paper-gallery";
import { PaperDemoView } from "@/components/paper-demo";
import { PaperExplainerView } from "@/components/paper-explainer";
import { PaperPager } from "@/components/paper-pager";
import { PaperResultsTableView } from "@/components/paper-results-table";
import { SectionRenderer } from "@/components/section-renderer";
import { exampleGraphMap, type SitePage } from "@/data/graph-paper-site.mock";
import { paperDemoMap } from "@/data/paper-demos";
import { paperExplainerMap } from "@/data/paper-explainers";
import { paperResultTableMap } from "@/data/paper-results";

const chamberGraph = exampleGraphMap.kg_chamber_vacuum_001;

function getGraphBlock(pageId: string) {
  if (
    pageId === "page_system" ||
    pageId === "page_demos" ||
    pageId === "demo_kg_evolution" ||
    pageId === "demo_graph_qa" ||
    pageId === "demo_reasoning_path"
  ) {
    return (
      <GraphPreview
        example={chamberGraph}
        title="Example Troubleshooting Graph"
        caption="這張示意圖使用你們定義的 schema，將 chamber vacuum error 轉成可推理的故障排查結構。"
      />
    );
  }

  return null;
}

export function PageView({ page }: { page: SitePage }) {
  const explainer = paperExplainerMap[page.id];
  const demo = paperDemoMap[page.id];
  const resultTable = paperResultTableMap[page.id];
  const visibleSections = page.sections.filter((section) => {
    if (section.type === "card_grid" && section.items.length === 0) {
      return false;
    }

    return true;
  });
  const heroSection =
    page.id === "page_home" ? visibleSections.find((section) => section.type === "hero") : null;
  const nonHeroSections =
    page.id === "page_home"
      ? visibleSections.filter((section) => section !== heroSection)
      : visibleSections;

  return (
    <main className="page-content">
      {page.id !== "page_home" ? (
        <div className="page-intro">
          <div className="page-kicker">{page.type.replaceAll("_", " ")}</div>
          <h1 className="page-title">{page.title}</h1>
        </div>
      ) : null}
      <div className="section-list">
        {page.id === "page_home" && heroSection ? (
          <SectionRenderer key={heroSection.id} section={heroSection} />
        ) : null}
        {page.id === "page_home" ? <HomePaperGallery /> : null}
        {page.type === "paper_detail" ? <PaperPager pageId={page.id} /> : null}
        {page.id === "page_comparison" ? <ComparisonVisuals /> : null}
        {explainer ? <PaperExplainerView explainer={explainer} /> : null}
        {resultTable ? <PaperResultsTableView table={resultTable} /> : null}
        {demo ? <PaperDemoView demo={demo} /> : null}
        {nonHeroSections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
        {getGraphBlock(page.id)}
      </div>
    </main>
  );
}
