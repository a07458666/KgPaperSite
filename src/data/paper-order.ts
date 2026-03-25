export interface PaperOrderItem {
  pageId: string;
  shortTitle: string;
  label: string;
}

export const paperOrder: PaperOrderItem[] = [
  {
    pageId: "page_paper_1",
    shortTitle: "EgoGraph",
    label: "Paper 1",
  },
  {
    pageId: "page_paper_2",
    shortTitle: "H-EPM",
    label: "Paper 2",
  },
  {
    pageId: "page_paper_3",
    shortTitle: "KG2RAG",
    label: "Paper 3",
  },
];

export function getPaperNeighbors(pageId: string) {
  const index = paperOrder.findIndex((item) => item.pageId === pageId);
  if (index === -1) {
    return {
      currentIndex: -1,
      previous: null,
      next: null,
    };
  }

  return {
    currentIndex: index,
    previous: index > 0 ? paperOrder[index - 1] : null,
    next: index < paperOrder.length - 1 ? paperOrder[index + 1] : null,
  };
}
