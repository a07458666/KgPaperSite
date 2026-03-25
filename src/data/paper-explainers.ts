export interface ExplainerStep {
  id: string;
  title: string;
  summary: string;
  detail: string;
  takeaway: string;
}

export interface PaperExplainer {
  pageId: string;
  shortTitle: string;
  fullTitle: string;
  researchGoal: string;
  problemGap: string;
  whyGraph: string;
  contribution: string;
  method: string[];
  whyWorks: string[];
  results: string[];
  visuals: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  steps: ExplainerStep[];
}

export const paperExplainers: PaperExplainer[] = [
  {
    pageId: "page_paper_1",
    shortTitle: "EgoGraph",
    fullTitle: "EgoGraph: Temporal Knowledge Graph for Egocentric Video Understanding",
    researchGoal:
      "這篇 paper 想解的是超長時序 egocentric video 理解。當影片跨好幾天、事件彼此相隔很遠時，系統如何仍然能追蹤人物、物件、地點與事件之間的時間關係，並回答長時間依賴的問題。",
    problemGap:
      "傳統做法常把長影片壓成 caption、summary 或 hierarchical memory。這類方法雖然能保留一些重點，但遇到跨天、跨事件的 temporal reasoning 時，容易失去精確的時間順序與事件關聯。",
    whyGraph:
      "EgoGraph 把長時序經驗轉成 temporal knowledge graph，不再只依靠一段很長的 plain-text memory。graph 的價值在於它能把事件、實體與時間關係顯性化，讓系統沿著時間與關聯路徑做推理。",
    contribution:
      "這篇 paper 的核心貢獻，是把 egocentric video 從靜態文字摘要改成 temporal graph memory，並且在檢索與問答時加入時間過濾與 temporal reasoning。",
    method: [
      "先把長影片切成事件片段，抽出人物、物件、地點與事件等節點。",
      "再建立帶時間資訊的 temporal knowledge graph，讓事件之間有 before / after / co-occurrence 等關係。",
      "最後在回答問題時用時間過濾與 graph reasoning，只取和目標時間相關的子圖。",
    ],
    whyWorks: [
      "graph 讓長時間記憶不再只是越來越長的文字，而是可檢索、可約束的結構化記憶。",
      "時間過濾能避免 temporal leakage，確保系統不會用未來資訊回答過去問題。",
      "temporal reasoning 讓模型能處理跨天事件、事件順序與長距離依賴，而不是只靠局部相似度。",
    ],
    results: [
      "在 EgoLifeQA 與 EgoR1-Bench 上，EgoGraph 都優於現有 baseline。",
      "在 temporal reasoning 任務上，EgoGraph 對 EgoGPT 有明顯優勢。",
      "在 temporal robustness 測試中，EgoGraph 比 EgoGPT 與 plain-text 更穩定，時間跨度拉長時衰退最小。",
    ],
    visuals: [
      {
        src: "/paper-assets/egograph_temporal_knowledge_graph_overview.png",
        alt: "EgoGraph overview comparison figure",
        caption:
          "這張圖在對比 hierarchical memory 與 graph memory 的差異。EgoGraph 的核心想法是把長時間經驗整理成可追蹤的 temporal knowledge graph，而不是只做文字摘要。",
      },
      {
        src: "/paper-assets/egograph_temporal_knowledge_graph_pipeline.png",
        alt: "EgoGraph method pipeline figure",
        caption:
          "這張圖是 EgoGraph 的方法流程：先抽事件與實體，再建立 temporal graph，最後用時間感知的檢索與推理來回答問題。",
      },
      {
        src: "/paper-assets/egograph_temporal_knowledge_graph_results.png",
        alt: "EgoGraph benchmark results figure",
        caption:
          "這張結果圖最重要的訊息是：EgoGraph、EgoGPT 與 Plain-text 在長時間上下文中的穩定性差很多，graph memory 的優勢會隨時間跨度增加而變得更明顯。",
      },
    ],
    steps: [
      {
        id: "event-split",
        title: "Step 1. 事件切分與實體抽取",
        summary: "先把長影片切成事件片段，抽出人物、物件、地點與事件。",
        detail:
          "EgoGraph 不把整段影片直接當成一大段文字，而是先切出可描述的事件單位，再抽出每個事件中的關鍵實體。這讓後面的記憶單位更細，也更能被追蹤。",
        takeaway: "如果沒有先把長時間內容拆成事件與實體，後面就很難建立真正可推理的 temporal graph。",
      },
      {
        id: "graph-build",
        title: "Step 2. 建立 Temporal Knowledge Graph",
        summary: "把事件和實體接成帶時間資訊的圖。",
        detail:
          "在這一步，系統會把不同時間點的事件、人物、物件與地點連成圖，保留 before / after / related 等關係。這讓跨天事件不會只留在零散 caption 裡，而是成為可追蹤的圖結構。",
        takeaway: "graph 的重點不是畫圖，而是讓時間關係與事件依賴被顯性表示出來。",
      },
      {
        id: "time-filter",
        title: "Step 3. 時間過濾與子圖檢索",
        summary: "根據問題時間點，只取因果上合理的子圖。",
        detail:
          "回答問題時，EgoGraph 不會把所有記憶都拿來用，而是先做 temporal filtering，保留和目標時間有關的節點與邊。這能避免未來資訊干擾，也減少長時序內容中的噪音。",
        takeaway: "時間過濾是這篇 paper 很關鍵的一步，它讓 graph retrieval 真正具備 temporal awareness。",
      },
      {
        id: "temporal-reasoning",
        title: "Step 4. 沿圖做 Temporal Reasoning",
        summary: "利用事件順序與關聯路徑回答長時間依賴問題。",
        detail:
          "最後模型不是直接讀文字摘要，而是沿著 temporal graph 中的事件與實體關係做推理。這使它更擅長回答跨天、跨事件、需要記住先後順序的問題。",
        takeaway: "EgoGraph 的優勢在於它把 long-term memory 變成了可推理的結構，而不是單純更長的文字上下文。",
      },
    ],
  },
  {
    pageId: "page_paper_2",
    shortTitle: "H-EPM",
    fullTitle: "Experience-Evolving Multi-Turn Tool-Use Agent with Hybrid Episodic-Procedural Memory",
    researchGoal:
      "這篇 paper 要解的是多輪 tool-use agent。當 agent 必須根據前幾輪互動的結果持續修正下一步行動時，系統如何把過往經驗整理成真正可用的 memory，而不只是把對話歷史越堆越長。",
    problemGap:
      "如果只存完整 trajectory，經驗很難在新情境中重用；如果只記工具之間的固定關係，又會忽略當前 state 對決策的影響。這會讓 agent 在多輪任務中容易走錯方向。",
    whyGraph:
      "H-EPM 用 hybrid memory graph 同時存 procedural dependency 與 episodic state summary。graph 的作用是把『過去在哪個 state 做了什麼 action』整理成可檢索、可重組的經驗結構。",
    contribution:
      "這篇 paper 的核心貢獻，是把 episodic memory 與 procedural memory 合在同一張 graph 裡，讓多輪 agent 不只會記住過去，還能根據目前 state 選對下一步。",
    method: [
      "把歷史互動中的狀態、動作與結果整理成 hybrid memory graph。",
      "在新任務中先生成 compact state summary，再去 memory graph 中找相似經驗。",
      "根據找到的經驗路徑，排序候選 action，並在新 evidence 進來後持續更新 state。",
    ],
    whyWorks: [
      "graph 讓經驗不是整包回放，而是能按 state 與 action 局部重用。",
      "episodic summary 讓 agent 能把當前情境和歷史經驗對齊，而不是只靠表面相似。",
      "procedural relation 讓系統知道在某種 state 下，哪些 action 更可能是合理的下一步。",
    ],
    results: [
      "在多個多輪 tool-use benchmark 上，H-EPM 都提升 end-to-end 準確率。",
      "在較困難的 tau²-Bench 上，提升尤其明顯，表示它特別能幫助 state-dependent decision making。",
      "這些結果支持論文主張：experience graph 對多輪 agent 的幫助，不只是記憶，而是決策。",
    ],
    visuals: [
      {
        src: "/paper-assets/experience-evolving_multi-turn_tool-use_agent_memory_graph.png",
        alt: "H-EPM memory graph figure",
        caption:
          "這張圖在說明 hybrid memory graph 的概念：把狀態、動作與經驗路徑整理成可檢索的圖，而不是只存完整對話軌跡。",
      },
      {
        src: "/paper-assets/experience-evolving_multi-turn_tool-use_agent_adaptive_retrieval.png",
        alt: "H-EPM adaptive retrieval figure",
        caption:
          "這張圖強調的是 state-aware retrieval。當前 state 改變時，agent 應該檢索到的經驗路徑也會跟著改變。",
      },
      {
        src: "/paper-assets/experience-evolving_multi-turn_tool-use_agent_benchmark_results.png",
        alt: "H-EPM benchmark results table",
        caption:
          "這張結果圖的重點是：H-EPM 在不同 benchmark 上都能提升多輪 agent 的 end-to-end 表現，表示 hybrid memory graph 對 decision quality 有穩定幫助。",
      },
    ],
    steps: [
      {
        id: "memory-graph",
        title: "Step 1. 把經驗整理成 Memory Graph",
        summary: "先把歷史任務中的 state、action、outcome 接成圖。",
        detail:
          "H-EPM 先把過往多輪任務拆成狀態、工具使用與結果，然後接成 hybrid memory graph。這讓經驗不再只能整包回放，而能被局部取用。",
        takeaway: "多輪 agent 的關鍵不是記住整段歷史，而是把可重用的決策片段結構化。",
      },
      {
        id: "state-summary",
        title: "Step 2. 產生 Compact State Summary",
        summary: "把當前對話狀態整理成可比對的摘要。",
        detail:
          "當 agent 接到新任務時，它會先把目前狀態壓成 compact summary，再拿這個 summary 去 memory graph 中找相似經驗。這一步把當前情境和歷史經驗接起來。",
        takeaway: "如果沒有 state summary，系統就只能比表面文字，很難做真正 state-aware retrieval。",
      },
      {
        id: "retrieve-experience",
        title: "Step 3. 檢索相似經驗路徑",
        summary: "從 memory graph 中找出和目前 state 最接近的 action path。",
        detail:
          "H-EPM 不只找相似文字，而是找相似的 state-to-action 經驗路徑。這使 agent 能參考過去在哪種狀態下應該做哪些工具操作。",
        takeaway: "這一步的目的，是把『以前怎麼做成功的』轉成現在可用的 decision hint。",
      },
      {
        id: "update-action",
        title: "Step 4. 根據新 Evidence 更新下一步",
        summary: "新 evidence 進來後，重新排序候選 action。",
        detail:
          "每一輪互動後，state 都會改變。H-EPM 會用新的 evidence 更新目前判斷，重新排序候選 action，而不是沿著一開始的假設硬走到底。",
        takeaway: "這篇 paper 的真正價值，在於讓 agent 的下一步決策持續受 state 影響，而不是一次規劃完就不再修正。",
      },
    ],
  },
  {
    pageId: "page_paper_3",
    shortTitle: "KG2RAG",
    fullTitle: "KG2RAG: Knowledge Graph-Guided Retrieval Augmented Generation",
    researchGoal:
      "這篇 paper 要解的是多跳問答中的資訊碎片化問題。傳統 RAG 雖然能找到語意相似的 chunks，但當答案需要跨多個片段整合時，系統常常只抓到局部相關內容，卻無法把這些事實串成完整回答。",
    problemGap:
      "Semantic RAG 容易造成資訊同質化與孤島效應。它能找到像的 chunk，卻不知道這些 chunk 之間有沒有事實級別的連結，因此在多跳問題上常出現證據分散、上下文斷裂與答案不完整。",
    whyGraph:
      "KG2RAG 用 knowledge graph 當成 retrieval 的事實骨架。graph 的價值在於它讓 chunk 和 chunk 之間不再只是『很像』，而是有明確的實體關係、事實關係與資訊傳遞路徑。",
    contribution:
      "這篇 paper 的核心，不只是說『graph 讓結果變好』，而是清楚提出三個機制：離線圖譜關聯、BFS 圖引導擴展、MST 過濾與組織。這三步合起來，才是 KG2RAG 真正有效的原因。",
    method: [
      "離線圖譜關聯：先從文本塊抽取三元組，建立 document-level knowledge graph，補上 chunk 之間的 fact-level relation。",
      "BFS 圖引導擴展：從語義檢索命中的 seed chunks 出發，沿著圖向外擴展，把邏輯相連但未必高相似度的 supporting facts 一起找出來。",
      "MST 過濾與組織：對擴展後的子圖做過濾與重組，只保留最具相關性的資訊傳遞路徑，降低噪音並節省 token。",
    ],
    whyWorks: [
      "離線圖譜關聯解決的是『chunk 彼此斷裂』。先建立圖，系統才知道文本之間有哪些真正的事實連結。",
      "BFS 圖引導擴展解決的是『只命中 seed 還不夠』。多跳答案需要的不只是最像的段落，還需要鄰近的 supporting facts。",
      "MST 過濾與組織解決的是『擴展後容易太吵』。它保留最重要的資訊路徑，讓回答更完整，同時避免 token 浪費。",
    ],
    results: [
      "在 HotpotQA 等多跳 QA benchmark 上，KG2RAG 在 response quality 與 retrieval quality 都優於常見 baseline。",
      "論文結果支持三個核心機制的組合是必要的：只有擴展沒有組織，會引入太多噪音；只有 seed retrieval，則無法補齊隱含事實。",
      "因此 KG2RAG 的提升不是單純因為『多抓到一些內容』，而是因為它把 retrieval 與 answer organization 都改寫成 graph-guided process。",
    ],
    visuals: [
      {
        src: "/paper-assets/kg2rag_paradigm_compare.png",
        alt: "KG2RAG paradigm comparison figure",
        caption:
          "這張圖在比較不同 RAG paradigm。KG2RAG 的關鍵不是只抓相似 chunk，而是利用 graph 把原本分散的事實接起來。",
      },
      {
        src: "/paper-assets/kg2rag_workflow.png",
        alt: "KG2RAG workflow figure",
        caption:
          "這張 workflow 就是 KG2RAG 的核心方法：離線圖譜關聯、BFS 圖引導擴展、MST 過濾與組織。",
      },
      {
        src: "/paper-assets/kg2rag_response_quality.png",
        alt: "KG2RAG response quality table",
        caption:
          "這張結果圖的重點是：KG2RAG 不只提升 retrieval quality，也讓最終回答的 quality 更好，表示 graph-guided organization 確實對 answer composition 有幫助。",
      },
    ],
    steps: [
      {
        id: "offline-kg",
        title: "Step 1. 離線圖譜關聯",
        summary: "先從文本塊抽取三元組，建立 knowledge graph。",
        detail:
          "KG2RAG 不是等到提問時才臨時拼湊資訊，而是在離線階段就先把文件拆成 chunks，再從 chunks 抽出實體與關係，形成 document-level knowledge graph。這一步把原本孤立的文本塊先接成可查詢的事實網路。",
        takeaway: "如果沒有這一步，後面的 retrieval 仍然只會停在 chunk similarity，而不會真正進入 fact-level relation。",
      },
      {
        id: "bfs-expand",
        title: "Step 2. BFS 圖引導擴展",
        summary: "從 seed chunks 出發，沿 graph 鄰域擴展 supporting facts。",
        detail:
          "系統先用一般語義檢索找到最相似的 seed chunks，但不會停在這裡。接著它會從 seed 節點出發，用 BFS 沿著圖向外擴展，把和問題邏輯相關、但語意相似度不一定高的 supporting facts 一起帶進來。",
        takeaway: "這一步是 KG2RAG 最重要的地方，因為多跳 QA 真正缺的，往往不是 seed，而是 seed 周圍那些隱含事實。",
      },
      {
        id: "mst-organize",
        title: "Step 3. MST 過濾與組織",
        summary: "把擴展後的子圖過濾成最重要的資訊路徑。",
        detail:
          "圖擴展之後，系統會拿到一個更大的子圖，但不是所有鄰居都值得送進 LLM。KG2RAG 會進一步用 MST 保留最具相關性的資訊傳遞路徑，把主幹與支撐資訊分清楚，並重新組織段落順序。",
        takeaway: "BFS 解決的是『找不夠』，MST 解決的是『找太多』。兩者缺一不可。",
      },
      {
        id: "answer-compose",
        title: "Step 4. 從圖回到答案",
        summary: "把組織好的子圖轉成 evidence-backed answer。",
        detail:
          "最後送進 LLM 的不是一堆彼此孤立的段落，而是一個已經被 graph 串接、被 MST 過濾、被重組過的子圖。這讓最終回答更完整，也更容易帶著清楚的 evidence path。",
        takeaway: "KG2RAG 的真正價值，不只是 retrieval 更好，而是讓最終答案本身更有結構、更像一條可追溯的知識路徑。",
      },
    ],
  },
];

export const paperExplainerMap = Object.fromEntries(
  paperExplainers.map((item) => [item.pageId, item]),
);
