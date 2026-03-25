import { notFound } from "next/navigation";
import { PageView } from "@/components/page-view";
import { pageMap } from "@/data/graph-paper-site.mock";

export function generateStaticParams() {
  return Object.keys(pageMap)
    .filter((key) => key !== "page_home")
    .map((pageId) => ({ pageId }));
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const page = pageMap[pageId];

  if (!page) {
    notFound();
  }

  return <PageView page={page} />;
}
