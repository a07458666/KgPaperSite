export type GraphNodeType =
  | "evidence"
  | "hypothesis"
  | "diagnostic_action"
  | "root_cause";

export type GraphEdgeType =
  | "NEXT_STEP"
  | "CAUSES"
  | "SUPPORTED_BY"
  | "RESOLVED_BY"
  | "LEADS_TO";

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  entityKind?: string;
  description?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: GraphEdgeType;
  label: string;
}

export interface KnowledgeGraph {
  graphId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface CtaLink {
  label: string;
  target: string;
}

export interface HeroSection {
  id: string;
  type: "hero";
  headline: string;
  subheadline: string;
  description: string;
  eyebrow?: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

export interface TextBlockSection {
  id: string;
  type: "text_block";
  headline: string;
  body: string;
}

export interface CardItem {
  title: string;
  description: string;
  mitigation?: string;
  target?: string;
}

export interface CardGridSection {
  id: string;
  type: "card_grid";
  items: CardItem[];
}

export interface QuickLinksSection {
  id: string;
  type: "quick_links";
  items: CtaLink[];
}

export interface CompareColumn {
  title: string;
  items: string[];
}

export interface TwoColumnCompareSection {
  id: string;
  type: "two_column_compare";
  left: CompareColumn;
  right: CompareColumn;
}

export interface FeatureGridSection {
  id: string;
  type: "feature_grid";
  items: CardItem[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessFlowSection {
  id: string;
  type: "process_flow";
  steps: ProcessStep[];
}

export interface SchemaRow {
  nodeType: GraphNodeType;
  examples: string[];
}

export interface SchemaTableSection {
  id: string;
  type: "schema_table";
  title: string;
  rows: SchemaRow[];
}

export interface BulletListSection {
  id: string;
  type: "bullet_list";
  title: string;
  items: string[];
}

export interface MatrixRow {
  dimension: string;
  paper1: string;
  paper2: string;
  paper3: string;
  implication: string;
}

export interface MatrixSection {
  id: string;
  type: "matrix";
  columns: [string, string, string, string, string];
  rows: MatrixRow[];
}

export interface DemoCardSection {
  id: string;
  type: "demo_card";
  title: string;
  description: string;
  target: string;
}

export interface InteractiveDemoSection {
  id: string;
  type: "interactive_demo";
  title: string;
  layout: Record<string, string>;
  content: {
    intro: string;
    actions: string[];
  };
}

export type PageSection =
  | HeroSection
  | TextBlockSection
  | CardGridSection
  | QuickLinksSection
  | TwoColumnCompareSection
  | FeatureGridSection
  | ProcessFlowSection
  | SchemaTableSection
  | BulletListSection
  | MatrixSection
  | DemoCardSection
  | InteractiveDemoSection;

export interface SitePage {
  id: string;
  type:
    | "landing"
    | "content"
    | "paper_detail"
    | "comparison"
    | "interactive_hub"
    | "interactive_demo";
  title: string;
  sections: PageSection[];
}

export interface ExampleGraph {
  id: string;
  title: string;
  useCase: string;
  graph: KnowledgeGraph;
}

export interface SiteMockData {
  site: {
    id: string;
    title: string;
    subtitle: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
  graphSchema: {
    nodeTypes: Array<{
      id: GraphNodeType;
      label: string;
      description: string;
    }>;
    edgeTypes: Array<{
      id: GraphEdgeType;
      label: string;
      description: string;
    }>;
  };
  pages: SitePage[];
  exampleGraphs: ExampleGraph[];
}

export const graphPaperSiteMock: SiteMockData = {
  site: {
    id: "graph-paper-interactive-site",
    title: "Knowledge Graph for Enterprise Knowledge and Troubleshooting",
    subtitle: "用三篇 Graph 論文理解動態知識圖譜、圖驅動問答與多輪推理",
    primaryCta: {
      label: "Start with the Papers",
      target: "page_paper_1",
    },
    secondaryCta: {
      label: "Compare the 3 Papers",
      target: "page_comparison",
    },
  },
  graphSchema: {
    nodeTypes: [
      {
        id: "evidence",
        label: "Evidence",
        description: "觀察現象、alarm、量測結果、條件、文件片段",
      },
      {
        id: "hypothesis",
        label: "Hypothesis",
        description: "候選原因、中間推論、懷疑的故障點或狀態",
      },
      {
        id: "diagnostic_action",
        label: "Diagnostic Action",
        description: "檢查步驟、排查動作、確認流程、處置操作",
      },
      {
        id: "root_cause",
        label: "Root Cause",
        description: "已收斂或高信心的根因",
      },
    ],
    edgeTypes: [
      {
        id: "NEXT_STEP",
        label: "Next Step",
        description: "下一個建議排查或推理步驟",
      },
      {
        id: "CAUSES",
        label: "Causes",
        description: "原因或因果關係",
      },
      {
        id: "SUPPORTED_BY",
        label: "Supported By",
        description: "某個假設由哪些證據支持",
      },
      {
        id: "RESOLVED_BY",
        label: "Resolved By",
        description: "某個問題或假設對應的處置動作",
      },
      {
        id: "LEADS_TO",
        label: "Leads To",
        description: "某一步驟導向下一個狀態或判斷",
      },
    ],
  },
  pages: [
    {
      id: "page_home",
      type: "landing",
      title: "Knowledge Graph 如何讓企業知識從文件，變成可推理的系統",
      sections: [
        {
          id: "hero",
          type: "hero",
          eyebrow: "",
          headline: "Knowledge Graph 如何讓企業知識從文件，變成可推理的系統",
          subheadline:
            "這個網站用三篇與 Graph 相關的論文，拆解動態知識圖譜、圖驅動問答，以及多輪推理各自在解什麼問題、怎麼做、效果如何。",
          description:
            "這三篇 paper 雖然切入點不同，但都在處理同一類問題：如何把原本零散、難以追蹤的資訊，轉成可關聯、可更新、可推理的 graph 結構。",
          primaryCta: {
            label: "比較三篇論文",
            target: "page_comparison",
          },
          secondaryCta: {
            label: "看系統架構",
            target: "page_system",
          },
        },
        {
          id: "capability_cards",
          type: "card_grid",
          items: [],
        },
        {
          id: "entry_points",
          type: "quick_links",
          items: [
            { label: "Why Graph", target: "page_why_graph" },
            { label: "Your System", target: "page_system" },
            { label: "Interactive Demos", target: "page_demos" },
            { label: "Failure Cases", target: "page_failures" },
          ],
        },
      ],
    },
    {
      id: "page_why_graph",
      type: "content",
      title: "Why Graph, Not Just Search",
      sections: [
        {
          id: "intro",
          type: "text_block",
          headline: "企業知識不是孤立文件，而是可推理的關聯網路",
          body: "SOP、設備狀態、故障現象、排查步驟與歷史案例之間存在依賴、因果、條件與時序關係。若只用文件搜尋或向量檢索，系統通常只能找到局部相關內容；若把這些關係轉成 Graph，系統才有機會支撐 QA、解釋與多段推理。",
        },
        {
          id: "comparison",
          type: "two_column_compare",
          left: {
            title: "Search / RAG 擅長",
            items: ["找到語意相似內容", "快速回傳相關段落", "適合單點事實查詢"],
          },
          right: {
            title: "Graph 更適合",
            items: ["處理多跳關聯", "追蹤條件與流程依賴", "支撐多輪推理與可解釋回答"],
          },
        },
        {
          id: "value_props",
          type: "feature_grid",
          items: [
            {
              title: "Relationships",
              description: "找出知識之間的依賴與上下游關係。",
            },
            {
              title: "Evolution",
              description: "知識更新後，圖與答案同步變動。",
            },
            {
              title: "Reasoning",
              description: "沿著圖上路徑做排查、收斂與推理。",
            },
            {
              title: "Explainability",
              description: "顯示答案來自哪些節點、邊與來源文件。",
            },
          ],
        },
      ],
    },
    {
      id: "page_system",
      type: "content",
      title: "Our System Workflow",
      sections: [
        {
          id: "system_intro",
          type: "text_block",
          headline: "這一頁想說明的是：你們的產品裡，Graph 到底在哪裡發生作用",
          body: "這不是論文方法頁，而是把你們的系統流程講清楚。從使用者寫下知識片段開始，到系統自動生成 graph、更新 graph，再到最後如何用 graph 做 QA 與 troubleshooting，這一頁要回答的是整個產品流程，而不是單一演算法細節。",
        },
        {
          id: "system_clarify",
          type: "text_block",
          headline: "先用一句話理解這個系統",
          body: "使用者先輸入 SOP、內部文件與故障經驗，系統把這些內容轉成可視化的 knowledge graph；當知識被修改，graph 也同步更新；之後使用者可以基於這張 graph 問問題、追蹤關聯，或一步步做多段推理。",
        },
        {
          id: "system_flow",
          type: "process_flow",
          steps: [
            {
              title: "Author",
              description: "使用者撰寫知識片段、故障案例、SOP 或維修經驗。這些內容原本只是文字，還沒有結構。",
            },
            {
              title: "Transform",
              description: "系統從文字中抽取 evidence、hypothesis、diagnostic_action、root_cause 及其關係，轉成 graph 結構。",
            },
            {
              title: "Evolve",
              description: "當知識變更時，graph 不是新增一筆而已，而是同步更新節點、邊與推理路徑，反映最新狀態。",
            },
            {
              title: "Retrieve",
              description: "使用者提問時，系統從圖中定位關鍵節點與相關子圖，而不是只做文字搜尋。",
            },
            {
              title: "Reason",
              description: "在多輪互動中，系統根據新的 evidence 調整 hypothesis，並決定下一步 diagnostic action，逐步收斂到答案或 root cause。",
            },
          ],
        },
        {
          id: "system_why_this_page",
          type: "bullet_list",
          title: "為什麼這一頁存在",
          items: [
            "幫讀者把三篇 paper 與你們的產品流程對上",
            "說清楚 Graph 在產品中不是展示層，而是運作層",
            "讓工程師知道 graph generation、graph update、graph retrieval、graph reasoning 分別發生在哪一段",
          ],
        },
        {
          id: "schema_mapping",
          type: "schema_table",
          title: "Graph Schema Mapping",
          rows: [
            {
              nodeType: "evidence",
              examples: ["Alarm 01", "Vacuum 壓力異常", "Pump 未運轉", "高溫量測結果"],
            },
            {
              nodeType: "hypothesis",
              examples: ["Dry Pump 異常", "Pump Power Module 失效", "O-Ring 老化", "冷卻異常"],
            },
            {
              nodeType: "diagnostic_action",
              examples: ["Reset Power", "檢查 Pump 電源", "更換 O-Ring", "量測溫度"],
            },
            {
              nodeType: "root_cause",
              examples: ["O-Ring 破損", "Pump Power Module 故障", "高溫導致密封失效"],
            },
          ],
        },
      ],
    },
    {
      id: "page_paper_1",
      type: "paper_detail",
      title: "Paper 1: Dynamic Graph Evolution",
      sections: [
        {
          id: "problem",
          type: "text_block",
          headline: "當知識持續演化，圖如何保持可用",
          body: "這篇研究對應的核心問題，是知識不是靜態集合，而是會逐步新增、修訂與失效。若圖無法同步反映這種演化，系統最後會同時保留新舊規則，導致回答與推理不一致。",
        },
        {
          id: "method",
          type: "text_block",
          headline: "把圖視為持續更新的記憶結構",
          body: "新資訊進來之後，系統不只是附加資料，而是可能重新定義節點角色、改寫邊的語意，並調整原本的推理路徑。這種設計特別適合知識管理與版本治理。",
        },
        {
          id: "product_mapping",
          type: "bullet_list",
          title: "對你們系統的啟發",
          items: [
            "知識更新後，Graph 需要可視化差異",
            "舊答案需要知道是否受影響",
            "節點與邊應具備版本與來源資訊",
            "推理路徑應能根據最新知識重算",
          ],
        },
      ],
    },
    {
      id: "page_paper_2",
      type: "paper_detail",
      title: "Paper 2: Multi-turn Graph-guided Decisions",
      sections: [
        {
          id: "problem",
          type: "text_block",
          headline: "多輪互動不是記住歷史而已，而是根據狀態決定下一步",
          body: "當新的觀察與條件逐輪加入時，系統需要更新目前有效的 hypothesis，排除不再合理的候選路徑，並提出最能縮小範圍的下一步 diagnostic_action。",
        },
        {
          id: "method",
          type: "text_block",
          headline: "把經驗拆成可重組的狀態與路徑",
          body: "這類方法不是死記完整軌跡，而是保留狀態與下一步選擇之間的結構化依賴，讓系統在相似但不完全相同的新情境中也能靈活使用。",
        },
        {
          id: "product_mapping",
          type: "bullet_list",
          title: "對你們系統的啟發",
          items: [
            "每輪新 evidence 進來後要重新排序 hypothesis",
            "系統應能解釋為何提出下一個 diagnostic_action",
            "推理過程需要保留被排除的候選原因",
            "故障排除比單次問答更需要 graph state",
          ],
        },
      ],
    },
    {
      id: "page_paper_3",
      type: "paper_detail",
      title: "Paper 3: Graph-guided Retrieval and QA",
      sections: [
        {
          id: "problem",
          type: "text_block",
          headline: "答案不只需要相關內容，還需要可組織的知識脈絡",
          body: "單純的相似度檢索常找到彼此孤立的段落，卻無法保證它們能組成完整回答。這篇研究的重點，是利用 Graph 把相關知識擴展與組織成更適合回答問題的結構。",
        },
        {
          id: "method",
          type: "text_block",
          headline: "從 seed retrieval 到 subgraph organization",
          body: "系統先找到與問題最直接相關的 seed nodes，再沿著圖擴展到關聯知識，最後從子圖中整理出有上下文、有證據鏈的回答。",
        },
        {
          id: "product_mapping",
          type: "bullet_list",
          title: "對你們系統的啟發",
          items: [
            "QA 應顯示命中的 subgraph，而不只是回文字",
            "答案應附上 evidence path",
            "應支援 vector-only 與 graph-guided 的對照",
            "適合企業知識問答與 SOP 條件查詢",
          ],
        },
      ],
    },
    {
      id: "page_comparison",
      type: "comparison",
      title: "Unified Comparison",
      sections: [
        {
          id: "comparison_intro",
          type: "text_block",
          headline: "這一頁不是只列差異，而是要看三篇 paper 各自擅長解哪一類 graph 問題",
          body: "EgoGraph 擅長處理長時間演化的記憶與事件關聯，H-EPM 擅長處理多輪狀態下的下一步決策，KG2RAG 擅長處理 graph-guided retrieval 與 answer organization。三篇 paper 並不是互斥選項，而是分別對應 graph 系統的不同能力面向。",
        },
        {
          id: "comparison_table",
          type: "matrix",
          columns: ["Dimension", "Paper 1", "Paper 2", "Paper 3", "Implication"],
          rows: [
            {
              dimension: "核心問題",
              paper1: "知識如何隨時間演化",
              paper2: "多輪互動中如何決定下一步",
              paper3: "如何改善檢索與回答組織",
              implication: "你們的產品三者都需要",
            },
            {
              dimension: "Graph 角色",
              paper1: "動態記憶",
              paper2: "狀態感知決策結構",
              paper3: "檢索與答案骨架",
              implication: "KG 是運作核心，不只是視覺化資料",
            },
            {
              dimension: "最適合場景",
              paper1: "知識更新與版本治理",
              paper2: "troubleshooting 與多輪 agent",
              paper3: "QA 與多跳檢索",
              implication: "可拆成產品能力路線圖",
            },
            {
              dimension: "主要風險",
              paper1: "新舊知識混用",
              paper2: "推理偏移",
              paper3: "擴展噪音過多",
              implication: "需要版本治理、回退與剪枝",
            },
            {
              dimension: "最強優點",
              paper1: "強化 long-term temporal reasoning",
              paper2: "強化多輪決策穩定性",
              paper3: "強化多跳 QA 的完整度",
              implication: "三篇分別補強記憶、決策與檢索",
            },
            {
              dimension: "主要限制",
              paper1: "建圖與更新成本較高",
              paper2: "需要足夠高品質成功軌跡",
              paper3: "graph expansion 與 organization 需要精細控制",
              implication: "落地時要考慮資料品質與維運成本",
            },
            {
              dimension: "適合導入階段",
              paper1: "知識版本治理成熟後",
              paper2: "要做 multi-turn assistant 時",
              paper3: "做 enterprise QA 時最先可落地",
              implication: "可作為產品能力路線圖",
            },
          ],
        },
        {
          id: "comparison_strengths",
          type: "card_grid",
          items: [
            {
              title: "EgoGraph 的優點與限制",
              description: "優點是能把長時序事件整理成可追蹤記憶，特別適合 temporal reasoning。限制是 graph 結構維護成本較高，更新邏輯也比較複雜。",
            },
            {
              title: "H-EPM 的優點與限制",
              description: "優點是多輪任務中能根據狀態決定下一步，而不是只重播整段軌跡。限制是它很依賴高品質的歷史成功經驗與狀態摘要。",
            },
            {
              title: "KG2RAG 的優點與限制",
              description: "優點是最容易落地到 QA，能直接改善多跳 retrieval 與 answer organization。限制是 graph 擴展過多時很容易引入噪音與 token 浪費。",
            },
          ],
        },
      ],
    },
    {
      id: "page_demos",
      type: "interactive_hub",
      title: "Interactive Demos",
      sections: [
        {
          id: "demo_1",
          type: "demo_card",
          title: "Knowledge Update -> KG Evolution",
          description: "修改一段 SOP 或故障知識，觀察 evidence、hypothesis、diagnostic_action、root_cause 之間的連結如何改變。",
          target: "demo_kg_evolution",
        },
        {
          id: "demo_2",
          type: "demo_card",
          title: "Question -> Subgraph -> Answer",
          description: "輸入問題後，觀察系統如何從 seed nodes 擴展成可回答問題的子圖。",
          target: "demo_graph_qa",
        },
        {
          id: "demo_3",
          type: "demo_card",
          title: "Symptom -> Reasoning Path -> Root Cause",
          description: "透過多輪互動，看系統如何根據新 evidence 更新 hypothesis 與下一步排查動作。",
          target: "demo_reasoning_path",
        },
      ],
    },
    {
      id: "demo_kg_evolution",
      type: "interactive_demo",
      title: "Knowledge Update -> KG Evolution",
      sections: [
        {
          id: "kg_evolution_demo",
          type: "interactive_demo",
          title: "Knowledge Update -> KG Evolution",
          layout: {
            leftPanel: "Snippet Editor",
            centerPanel: "Change Summary",
            rightPanel: "Graph Diff View",
            bottomPanel: "Impact on QA",
          },
          content: {
            intro: "這個 demo 展示知識更新如何影響 Graph 結構與後續回答。",
            actions: ["編輯知識片段", "切換 Before / After", "查看 Diff Mode", "查看受影響的 QA path"],
          },
        },
      ],
    },
    {
      id: "demo_graph_qa",
      type: "interactive_demo",
      title: "Question -> Subgraph -> Answer",
      sections: [
        {
          id: "graph_qa_demo",
          type: "interactive_demo",
          title: "Question -> Subgraph -> Answer",
          layout: {
            topPanel: "Question Box",
            leftPanel: "Retrieval Timeline",
            centerPanel: "Subgraph Viewer",
            rightPanel: "Answer Composer",
            bottomPanel: "Evidence Panel",
          },
          content: {
            intro: "這個 demo 展示圖驅動 QA 如何從 seed retrieval 走到 evidence-backed answer。",
            actions: ["輸入問題", "查看 seed nodes", "查看 graph expansion", "查看 answer composition"],
          },
        },
      ],
    },
    {
      id: "demo_reasoning_path",
      type: "interactive_demo",
      title: "Symptom -> Reasoning Path -> Root Cause",
      sections: [
        {
          id: "reasoning_path_demo",
          type: "interactive_demo",
          title: "Symptom -> Reasoning Path -> Root Cause",
          layout: {
            leftPanel: "Conversation Panel",
            centerPanel: "Reasoning Path",
            rightPanel: "Graph State + Hypothesis Stack",
            bottomPanel: "Outcome Panel",
          },
          content: {
            intro: "這個 demo 展示多輪 troubleshooting 如何根據新 evidence 持續更新假設與下一步。",
            actions: ["輸入初始 symptom", "回答追問", "觀察 hypothesis 排序變化", "查看 root cause 收斂結果"],
          },
        },
      ],
    },
    {
      id: "page_failures",
      type: "content",
      title: "Failure Cases and Limitations",
      sections: [
        {
          id: "failure_intro",
          type: "text_block",
          headline: "Graph 不會自動讓系統更可靠",
          body: "若抽取、對齊、更新或推理設計不完整，Graph 只會讓錯誤更有結構地擴散。",
        },
        {
          id: "failure_cards",
          type: "card_grid",
          items: [
            {
              title: "Extraction Errors",
              description: "原文抽取錯誤導致錯誤 evidence 或 hypothesis。",
              mitigation: "confidence score, provenance, human review",
            },
            {
              title: "Entity Mismatch",
              description: "同一設備被拆成多個節點，或不同設備被錯誤合併。",
              mitigation: "ontology, alias mapping, normalization",
            },
            {
              title: "Version Conflict",
              description: "新舊 SOP 同時存在導致答案衝突。",
              mitigation: "versioned graph, effective time, invalidation",
            },
            {
              title: "Noisy Expansion",
              description: "graph expansion 過度擴張造成噪音。",
              mitigation: "subgraph pruning, relation filtering, reranking",
            },
            {
              title: "Reasoning Drift",
              description: "早期錯誤假設讓後續多輪推理偏掉。",
              mitigation: "hypothesis set, rollback, verification checkpoints",
            },
            {
              title: "Domain Ambiguity",
              description: "半導體術語與情境依賴太強，導致推理失真。",
              mitigation: "context-aware retrieval, domain ontology",
            },
          ],
        },
      ],
    },
    {
      id: "page_product_implications",
      type: "content",
      title: "Product Implications",
      sections: [
        {
          id: "roadmap",
          type: "bullet_list",
          title: "建議優先順序",
          items: [
            "先強化 graph-based QA 與 evidence path",
            "再加入知識更新後的 graph diff 與 answer impact",
            "最後擴展到多輪 troubleshooting 與狀態推理",
          ],
        },
        {
          id: "core_capabilities",
          type: "bullet_list",
          title: "底層必備能力",
          items: [
            "entity normalization",
            "version governance",
            "subgraph pruning",
            "source tracing",
            "confidence scoring",
          ],
        },
      ],
    },
  ],
  exampleGraphs: [
    {
      id: "kg_chamber_vacuum_001",
      title: "Chamber Vacuum Error Troubleshooting",
      useCase: "semiconductor_troubleshooting",
      graph: {
        graphId: "kg_chamber_vacuum_001",
        nodes: [
          {
            id: "n1",
            label: "Alarm 01 (Chamber Vacuum Error)",
            type: "evidence",
            entityKind: "alarm",
          },
          {
            id: "n2",
            label: "Dry Pump Failure",
            type: "hypothesis",
            entityKind: "component",
          },
          {
            id: "n3",
            label: "Pump Power Module Failure",
            type: "hypothesis",
            entityKind: "component",
          },
          {
            id: "n4",
            label: "Reset Power",
            type: "diagnostic_action",
            entityKind: "action",
          },
          {
            id: "n5",
            label: "Check O-Ring",
            type: "diagnostic_action",
            entityKind: "component_check",
          },
          {
            id: "n6",
            label: "O-Ring Damage",
            type: "root_cause",
            entityKind: "component",
          },
          {
            id: "n7",
            label: "High Temperature",
            type: "hypothesis",
            entityKind: "condition",
          },
        ],
        edges: [
          {
            source: "n1",
            target: "n2",
            type: "NEXT_STEP",
            label: "首要檢查",
          },
          {
            source: "n2",
            target: "n3",
            type: "CAUSES",
            label: "若未運轉，懷疑失效",
          },
          {
            source: "n3",
            target: "n4",
            type: "RESOLVED_BY",
            label: "處置動作",
          },
          {
            source: "n2",
            target: "n5",
            type: "NEXT_STEP",
            label: "若運轉正常，檢查下一個部件",
          },
          {
            source: "n5",
            target: "n6",
            type: "LEADS_TO",
            label: "若確認異常，可能根因",
          },
          {
            source: "n7",
            target: "n6",
            type: "CAUSES",
            label: "導致",
          },
        ],
      },
    },
  ],
};

export const pageMap = Object.fromEntries(
  graphPaperSiteMock.pages.map((page) => [page.id, page]),
);

export const exampleGraphMap = Object.fromEntries(
  graphPaperSiteMock.exampleGraphs.map((item) => [item.id, item]),
);
