"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { getPaperNeighbors, paperOrder } from "@/data/paper-order";

export function PaperPager({ pageId }: { pageId: string }) {
  const router = useRouter();
  const touchStartX = useRef<number | null>(null);
  const { currentIndex, previous, next } = getPaperNeighbors(pageId);

  if (currentIndex === -1) {
    return null;
  }

  function goTo(target: string | null) {
    if (!target) return;
    router.push(`/${target}`);
  }

  return (
    <section
      className="section-card paper-pager-card"
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX ?? null;
        touchStartX.current = null;

        if (startX === null || endX === null) {
          return;
        }

        const deltaX = endX - startX;
        if (deltaX > 72 && previous) {
          goTo(previous.pageId);
        }
        if (deltaX < -72 && next) {
          goTo(next.pageId);
        }
      }}
    >
      <div className="paper-pager-top">
        <div>
          <div className="eyebrow">Paper Navigation</div>
          <h2 className="section-title">切換上一篇 / 下一篇</h2>
          <p className="section-body">
            可以直接點左右按鈕，也可以在手機上左右滑動切換 paper。
          </p>
        </div>
        <div className="paper-pager-actions">
          <button
            type="button"
            className="paper-nav-button"
            onClick={() => goTo(previous?.pageId ?? null)}
            disabled={!previous}
            aria-label="Previous paper"
          >
            <span className="paper-nav-arrow">←</span>
            <span>{previous ? previous.shortTitle : "第一篇"}</span>
          </button>
          <button
            type="button"
            className="paper-nav-button"
            onClick={() => goTo(next?.pageId ?? null)}
            disabled={!next}
            aria-label="Next paper"
          >
            <span>{next ? next.shortTitle : "最後一篇"}</span>
            <span className="paper-nav-arrow">→</span>
          </button>
        </div>
      </div>

      <div className="paper-progress-row">
        {paperOrder.map((item, index) => {
          const active = item.pageId === pageId;
          return (
            <Link
              key={item.pageId}
              href={`/${item.pageId}`}
              className={`paper-progress-chip${active ? " active" : ""}`}
            >
              <span className="paper-progress-index">{index + 1}</span>
              <span>{item.shortTitle}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
