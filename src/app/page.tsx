import { PageView } from "@/components/page-view";
import { graphPaperSiteMock } from "@/data/graph-paper-site.mock";

const homePage = graphPaperSiteMock.pages.find((page) => page.id === "page_home");

export default function HomePage() {
  if (!homePage) {
    return null;
  }

  return <PageView page={homePage} />;
}
