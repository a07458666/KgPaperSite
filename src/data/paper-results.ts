export interface PaperResultMetric {
  id: string;
  label: string;
  baselineLabel: string;
  baselineValue: number;
  methodLabel: string;
  methodValue: number;
  maxValue: number;
  unit: string;
  note: string;
}

export interface PaperResultSeriesItem {
  id: string;
  label: string;
  value: number;
  accent?: boolean;
}

export interface PaperLineSeries {
  id: string;
  label: string;
  values: number[];
  style: "baseline" | "method" | "secondary";
}

export interface PaperResultTable {
  pageId: string;
  title: string;
  intro: string;
  chartType: "line" | "horizontal-bars" | "vertical-bars";
  metrics: PaperResultMetric[];
  chartImagePath?: string;
  chartImageCaption?: string;
  lineSeries?: PaperLineSeries[];
  comparisonSeries?: PaperResultSeriesItem[];
  comparisonLabel?: string;
  comparisonNote?: string;
}

export const paperResultTables: PaperResultTable[] = [
  {
    pageId: "page_paper_1",
    title: "EgoGraph: 時間穩健性測試 (隨天數增加之準確率衰退)",
    intro:
      "這張圖要表達的是：隨著時間跨度從第 1 天拉到第 7 天，Plain-text 會快速衰退，EgoGPT 幾乎停滯，而 EgoGraph 仍維持穩定，說明 temporal knowledge graph 更能支撐長時間事件追蹤與推理。",
    chartType: "line",
    chartImagePath: "/paper-assets/egograph_temporal_robustness_figure5.png",
    chartImageCaption:
      "論文 Figure 5 比較 EgoGraph、EgoGPT 與 Plain-text 在長時間影片上下文中的穩健性。上半圖看累積查詢天數，下半圖看 query 與 target event 的時間差。",
    metrics: [
      {
        id: "day-1",
        label: "第 1 天",
        baselineLabel: "Plain-text",
        baselineValue: 43.1,
        methodLabel: "EgoGraph",
        methodValue: 51.0,
        maxValue: 60,
        unit: "%",
        note:
          "在第 1 天時，三種方法都還能回答一部分問題，但 EgoGraph 已經領先。真正的差異會在時間跨度繼續拉長之後被放大。",
      },
      {
        id: "day-3",
        label: "第 3 天",
        baselineLabel: "Plain-text",
        baselineValue: 18.0,
        methodLabel: "EgoGraph",
        methodValue: 50.0,
        maxValue: 60,
        unit: "%",
        note:
          "到第 3 天時，Plain-text 已明顯下滑，EgoGPT 大致停在 30% 左右，而 EgoGraph 幾乎維持原本表現，表示 graph memory 更能保留跨天事件關聯。",
      },
      {
        id: "day-7",
        label: "第 7 天",
        baselineLabel: "Plain-text",
        baselineValue: 8.8,
        methodLabel: "EgoGraph",
        methodValue: 45.8,
        maxValue: 60,
        unit: "%",
        note:
          "到第 7 天時，Plain-text 幾乎失效，EgoGPT 仍停在約 30%，但 EgoGraph 只小幅下降到 45.8%。這正是論文最想證明的主結果。",
      },
    ],
    lineSeries: [
      {
        id: "egograph",
        label: "EgoGraph",
        values: [51.0, 50.0, 45.8],
        style: "method",
      },
      {
        id: "egogpt",
        label: "EgoGPT",
        values: [31.0, 30.0, 30.0],
        style: "secondary",
      },
      {
        id: "plain-text",
        label: "Plain-text",
        values: [43.1, 18.0, 8.8],
        style: "baseline",
      },
    ],
    comparisonNote:
      "隨著時間跨度增加，Plain-text 準確率快速衰退，EgoGPT 大致停滯，而 EgoGraph 仍維持穩定。這表示把長時序經驗整理成 temporal knowledge graph，會比純文字記憶或階層式摘要更能保留跨時間事件之間的關係。",
  },
  {
    pageId: "page_paper_2",
    title: "H-EPM: 多輪 Agent 基準測試 (End-to-end 準確率)",
    intro:
      "這張圖要表達的是：H-EPM 在不同多輪 agent benchmark 上都穩定提升 end-to-end 準確率，表示 hybrid experience memory graph 確實能幫助 agent 根據中間狀態選對下一步。",
    chartType: "horizontal-bars",
    metrics: [
      {
        id: "tau-bench",
        label: "τ-Bench",
        baselineLabel: "Base Model",
        baselineValue: 0.541,
        methodLabel: "H-EPM",
        methodValue: 0.661,
        maxValue: 0.7,
        unit: "accuracy",
        note:
          "在 τ-Bench 上，H-EPM 已經有明顯提升，表示它不是只把歷史記住，而是把過往經驗轉成可重用的 graph 結構，幫助 agent 更穩定地選工具與步驟。",
      },
      {
        id: "tau2-bench",
        label: "τ²-Bench",
        baselineLabel: "Base Model",
        baselineValue: 0.396,
        methodLabel: "H-EPM",
        methodValue: 0.526,
        maxValue: 0.7,
        unit: "accuracy",
        note:
          "τ²-Bench 更能測出多輪決策能力，提升幅度也更明顯。這正好對應論文主張：當任務需要根據中間狀態持續修正策略時，experience graph 特別有價值。",
      },
      {
        id: "toolsandbox",
        label: "ToolSandbox",
        baselineLabel: "Base Model",
        baselineValue: 0.584,
        methodLabel: "H-EPM",
        methodValue: 0.658,
        maxValue: 0.7,
        unit: "accuracy",
        note:
          "在 ToolSandbox 上仍然維持提升，代表 H-EPM 的效果不是只在單一 benchmark 上成立，而是對不同型態的多輪 tool-use 任務都有幫助。",
      },
    ],
  },
  {
    pageId: "page_paper_3",
    title: "KG2RAG: HotpotQA 基準測試表現 (Fullwiki 設定 F1 Score)",
    intro:
      "這張圖要表達的是：在 HotpotQA Fullwiki 設定下，KG2RAG 的 F1 最高，表示當問題需要跨多個知識片段整合答案時，graph-guided retrieval 與 organization 能讓最終回答更完整。",
    chartType: "vertical-bars",
    metrics: [
      {
        id: "fullwiki-f1",
        label: "HotpotQA Fullwiki F1",
        baselineLabel: "Hybrid RAG",
        baselineValue: 0.551,
        methodLabel: "KG2RAG",
        methodValue: 0.631,
        maxValue: 0.8,
        unit: "F1",
        note:
          "在同一個 Fullwiki 設定下，KG2RAG 高於 LLM-only、LightRAG、Semantic RAG 與 Hybrid RAG。這說明 graph-guided expansion 與 organization 不只是找更多內容，而是把多跳答案組得更完整。",
      },
    ],
    comparisonLabel: "HotpotQA 基準測試表現 (Fullwiki 設定 F1 Score)",
    comparisonSeries: [
      { id: "llm-only", label: "LLM-only", value: 0.237 },
      { id: "lightrag", label: "LightRAG", value: 0.261 },
      { id: "semantic-rag", label: "Semantic RAG", value: 0.528 },
      { id: "hybrid-rag", label: "Hybrid RAG", value: 0.551 },
      { id: "kg2rag", label: "KG2RAG", value: 0.631, accent: true },
    ],
    comparisonNote:
      "同樣在 Fullwiki 設定下，KG2RAG 的 F1 最高。這表示即使問題需要跨多個知識片段整合，graph-guided expansion 與 organization 仍能維持較完整的回答品質。",
  },
];

export const paperResultTableMap = Object.fromEntries(
  paperResultTables.map((item) => [item.pageId, item]),
);
