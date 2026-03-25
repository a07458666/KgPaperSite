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
      "這篇 paper 要解決的是超長 egocentric video 很難被理解的問題。當影片跨越多天、內容又很分散時，傳統方法通常只能處理局部片段，難以回答需要跨時間整合的問題。",
    problemGap:
      "既有方法多半把長影片切成很多短片段，再各自產生 caption 或 summary。問題是，這樣會把跨片段、跨天的事件關係切碎，讓模型知道發生了什麼，卻不知道這些事情之間如何在時間上互相連結。",
    whyGraph:
      "EgoGraph 的核心想法是，不要只把長影片壓成一堆文字摘要，而是把人物、物件、地點、事件與它們的時間關係整理成一張會隨時間演化的 knowledge graph。",
    contribution:
      "它把長期記憶從『很多獨立 caption』轉成『有結構、有時間軸的 event graph』，因此更適合回答跨天、跨事件的 temporal reasoning 問題。",
    method: [
      "先把超長影片切成帶有時間資訊的 chunks，並抽取 people、objects、locations、events 等核心實體。",
      "用 event-centric schema 建立 temporal knowledge graph，讓每個事件與其參與實體、屬性、時間位置被保留下來。",
      "透過 temporal relational modeling，把不同時間點發生但互相關聯的事件串成可追蹤的長期記憶。",
    ],
    whyWorks: [
      "它保留了跨片段的結構關係，而不是只保留局部文字摘要，所以更能表達長距離依賴。",
      "時間不只是附屬資訊，而是 graph 中的核心關係，因此特別適合 temporal reasoning。",
      "當問題需要跨多天追蹤人物、行為或事件關聯時，graph 比階層式摘要更容易維持一致性。",
    ],
    results: [
      "在 EgoLifeQA 與 EgoR1-bench 上達到 state-of-the-art。",
      "論文特別強調在 temporal reasoning 任務上的提升，平均比 EgoGPT 高約 29.3%。",
      "質化案例顯示 EgoGraph 能找回帶有時間限制的關聯，而不是只回傳語意相近但時間錯位的內容。",
    ],
    visuals: [
      {
        src: "/paper-assets/egograph_temporal_knowledge_graph_overview.png",
        alt: "EgoGraph overview comparison figure",
        caption:
          "這張圖在比較兩種表示方式。左邊是 hierarchical summarization，右邊是 graph-based memory。重點是：graph 可以保留跨時間的事件關聯，而不只是把每段影片各自摘要。",
      },
      {
        src: "/paper-assets/egograph_temporal_knowledge_graph_pipeline.png",
        alt: "EgoGraph method pipeline figure",
        caption:
          "這張圖是 EgoGraph 的方法流程。可以把它理解成：先抽取影片中的事件與實體，再把它們整理成一張帶時間關係的 graph，最後再用這張 graph 回答問題。",
      },
      {
        src: "/paper-assets/egograph_temporal_knowledge_graph_results.png",
        alt: "EgoGraph benchmark results table",
        caption:
          "這張表是主要結果。重點不是只看單一數字，而是看 EgoGraph 在多個 long-term video QA 指標上都比 baseline 更穩定，尤其在需要時間推理的題目上更有優勢。",
      },
    ],
    steps: [
      {
        id: "observe",
        title: "把長影片切成可處理的時間片段",
        summary: "先把超長影片切成帶時間資訊的 chunks。",
        detail:
          "因為原始影片太長，系統不可能一次理解整段內容，所以第一步要先把它分成具有時間錨點的片段，讓後續抽取事件與實體時仍能保留『什麼時候發生』這件事。",
        takeaway: "第一步不是為了壓縮影片，而是為了保留後續能追蹤時間關係的最小單位。",
      },
      {
        id: "build-events",
        title: "把事件與實體整理成 graph",
        summary: "將 people、objects、locations、events 與其關係轉成節點和邊。",
        detail:
          "這一步把原本零散的影片內容整理成結構化表示。重要的不只是事件本身，還包括事件涉及哪些人物、物件、地點，以及它們之間如何互動。",
        takeaway: "影片理解從這一步開始，不再只是 caption，而是變成可關聯的知識結構。",
      },
      {
        id: "add-time",
        title: "加入跨時間的關聯",
        summary: "把不同時間點但互相關聯的事件串起來。",
        detail:
          "真正讓 EgoGraph 與一般 graph 差異化的地方，在於它不是靜態圖，而是強調 temporal relation。這使模型可以回答『某件事發生之前做了什麼』或『隔天同一個人又做了什麼』這類問題。",
        takeaway: "時間關係是 EgoGraph 真正提供價值的核心，不只是附加欄位。",
      },
      {
        id: "reason",
        title: "用 temporal graph 做 QA",
        summary: "查詢時不只搜尋內容，而是沿著時間關係做推理。",
        detail:
          "最後回答問題時，模型不是從一堆 caption 中找相似句，而是從 graph 中找到與問題相關的事件與實體，再依時間關係組出答案。",
        takeaway: "這篇 paper 的關鍵不是建圖本身，而是 graph 讓 QA 真正具備 long-term temporal reasoning 能力。",
      },
    ],
  },
  {
    pageId: "page_paper_2",
    shortTitle: "H-EPM",
    fullTitle: "Experience-Evolving Multi-Turn Tool-Use Agent with Hybrid Episodic-Procedural Memory",
    researchGoal:
      "這篇 paper 要解決的是 multi-turn agent 在多輪互動中很難穩定做決策的問題。使用者的意圖會逐步展開，環境也會因為工具呼叫而改變，所以 agent 不能只靠當前 prompt，而必須根據不斷更新的狀態決定下一步。",
    problemGap:
      "現有方法如果直接重用完整 trajectory，往往太依賴舊情境；如果只看工具與工具之間的關係，又會失去上下文。換句話說，它們不是太僵硬，就是太缺乏狀態感。",
    whyGraph:
      "H-EPM 把過去成功經驗整理成 hybrid memory graph。graph 裡不只有 tool-to-tool 的 procedural dependency，也有當時狀態的 episodic summary，因此 agent 可以同時記住『以前怎麼做』和『以前在什麼情況下這樣做』。",
    contribution:
      "這篇 paper 最重要的貢獻，是把多輪決策從單純重播歷史經驗，變成根據當前 state 動態重用部分經驗。",
    method: [
      "從歷史成功軌跡建立 tool graph，把工具視為節點，工具間常見的轉移視為 procedural routines。",
      "在每條邊上加入 compact episodic summaries，保存當時狀態與上下文。",
      "推論時動態結合 episodic recall 與 procedural execution；訓練時則用記憶引導 RL exploration。",
    ],
    whyWorks: [
      "它不必整段複製舊經驗，而是可以重用部分相似的路徑，因此更適合 multi-turn 場景。",
      "它保留了『當時為什麼要這樣做』，而不是只知道『以前做過這個工具』。",
      "這讓 agent 能在新情境中更快縮小候選行動，而不是盲目探索。",
    ],
    results: [
      "論文指出 H-EPM 在多個 multi-turn tool-use benchmarks 上，相對強基線可達到 50%+ 的 inference-time 提升。",
      "在 RL policy performance 上，out-of-distribution tasks 可達到 40%+ 的提升。",
      "相較 episodic-only 或 tool-graph-only 方法，H-EPM 在多輪情境下更穩定。",
    ],
    visuals: [
      {
        src: "/paper-assets/experience-evolving_multi-turn_tool-use_agent_memory_graph.png",
        alt: "H-EPM memory graph figure",
        caption:
          "這張圖是在說 H-EPM 的記憶不是一條條完整軌跡，而是被整理成 graph。節點是工具，邊表示常見轉移，而邊上還保留當時狀態的摘要。",
      },
      {
        src: "/paper-assets/experience-evolving_multi-turn_tool-use_agent_adaptive_retrieval.png",
        alt: "H-EPM adaptive retrieval figure",
        caption:
          "這張圖展示推論時怎麼用 memory graph。agent 會根據目前狀態找到相鄰的候選步驟，再決定該直接執行 routine，還是先做狀態摘要與調整。",
      },
      {
        src: "/paper-assets/experience-evolving_multi-turn_tool-use_agent_benchmark_results.png",
        alt: "H-EPM benchmark results table",
        caption:
          "這張表是 benchmark 結果。重點是 H-EPM 同時比 episodic memory 類方法和 tool graph 類方法更好，說明兩種記憶結合起來比單獨使用更有效。",
      },
    ],
    steps: [
      {
        id: "build-memory",
        title: "從成功經驗建立 memory graph",
        summary: "先把歷史成功軌跡整理成 graph。",
        detail:
          "系統不直接存整段 history，而是把每次工具使用的轉移關係抽象成 graph，這樣之後才有機會在新任務裡重用其中一部分，而不是整段照搬。",
        takeaway: "第一步的核心是把經驗變成可重組的結構，而不是把經驗原封不動存起來。",
      },
      {
        id: "attach-state",
        title: "在邊上保留狀態摘要",
        summary: "記住當時在什麼情況下選擇這個工具轉移。",
        detail:
          "如果 graph 只記『A 工具後面常接 B 工具』，那它只是一個 routine graph。H-EPM 額外在邊上存 episodic summary，讓 agent 知道這個轉移在什麼上下文下比較合理。",
        takeaway: "真正有用的經驗不是只有步驟順序，而是步驟順序背後的狀態條件。",
      },
      {
        id: "retrieve",
        title: "根據當前狀態檢索可用經驗",
        summary: "從 memory graph 找到與現在最相近的局部路徑。",
        detail:
          "到了推論階段，agent 會先看目前的對話與工具狀態，再到 graph 裡找有哪些候選下一步與之相容，而不是盲目從頭規劃。",
        takeaway: "這一步把多輪決策從『即興猜下一步』變成『有根據地縮小候選行動』。",
      },
      {
        id: "act-update",
        title: "執行後再更新狀態與下一步",
        summary: "每輪新 evidence 進來後都重新判斷。",
        detail:
          "多輪 agent 最難的是狀態會變。H-EPM 的價值在於它不是只做一次檢索，而是每輪都根據新 evidence 更新目前合理的路徑。",
        takeaway: "這篇 paper 真正想解的是：agent 如何在動態狀態下持續做對下一步。",
      },
    ],
  },
  {
    pageId: "page_paper_3",
    shortTitle: "KG2RAG",
    fullTitle: "KG2RAG: Knowledge Graph-Guided Retrieval Augmented Generation",
    researchGoal:
      "這篇 paper 要解決的是 RAG 在多跳問題上容易拿到零碎資訊的問題。很多時候系統找得到一些相關 chunk，但這些 chunk 彼此沒有被組織起來，因此答案不完整，也缺乏清楚脈絡。",
    problemGap:
      "傳統 semantic RAG 的強項是找語意相似的內容，但多跳 QA 需要的不只是『像』，而是『這些內容之間真的有關聯，且能組成一條回答路徑』。",
    whyGraph:
      "KG2RAG 用 knowledge graph 來引導 retrieval。它先找到 seed chunks，再沿著 graph 擴展出和問題相關的鄰近知識，最後再把這些知識重新組織成更適合回答的上下文。",
    contribution:
      "這篇 paper 把 Graph 放進 RAG 的中間流程，讓 retrieval 不只是找資料，而是把資料組成可回答問題的 subgraph。",
    method: [
      "先做文件切分與 triplet extraction，建立 document-level knowledge graph。",
      "查詢時先抓 seed chunks，再沿著 KG 擴展相關 entities 與 chunks。",
      "最後對擴展後內容做 organization，生成較乾淨、較有脈絡的輸入給 LLM。",
    ],
    whyWorks: [
      "多跳 QA 需要的是可連起來的知識，而不是幾個孤立 chunk。",
      "Graph expansion 讓系統找到與 seed 有關聯的關鍵補充資訊。",
      "Organization 步驟則避免把所有擴展結果一股腦丟給 LLM，降低噪音。",
    ],
    results: [
      "在 HotpotQA 上，KG2RAG 在 response quality 與 retrieval quality 都優於 baseline。",
      "Ablation 顯示拿掉 organization 或 graph-guided expansion 都會明顯掉分。",
      "在 MuSiQue 上也維持 response F1、EM 與 retrieval F1 的優勢。",
    ],
    visuals: [
      {
        src: "/paper-assets/kg2rag_paradigm_compare.png",
        alt: "KG2RAG paradigm comparison figure",
        caption:
          "這張圖是在比較 LLM-only、Semantic RAG 與 Graph RAG。作者想強調的是：只靠語意檢索時，資料雖然相關，但不一定有足夠結構支撐多跳回答。",
      },
      {
        src: "/paper-assets/kg2rag_workflow.png",
        alt: "KG2RAG workflow figure",
        caption:
          "這張圖是 KG2RAG 的完整流程。可以把它理解成三步：先找 seed，再用 graph 擴展，最後把結果整理成適合回答問題的 context。",
      },
      {
        src: "/paper-assets/kg2rag_response_quality.png",
        alt: "KG2RAG response quality table",
        caption:
          "這張表是核心結果。重點在於 KG2RAG 不只提升 retrieval quality，也讓最後答案的 F1、precision、recall 更好，表示 graph 對 answer composition 真的有幫助。",
      },
    ],
    steps: [
      {
        id: "seed",
        title: "先找到 seed chunks",
        summary: "先抓與問題最直接相關的內容。",
        detail:
          "第一步仍然會先做類似一般 RAG 的檢索，找到最接近問題的起始 chunks。這些 seed 是後續 graph expansion 的起點，但通常還不足以回答完整問題。",
        takeaway: "KG2RAG 不是取代檢索，而是把檢索變成更有結構的起點。",
      },
      {
        id: "expand",
        title: "沿著 graph 擴展相關知識",
        summary: "從 seed 出發，找與它有關聯的 entity 與 chunk。",
        detail:
          "這一步是 KG2RAG 的核心。系統不是只停在最像的 chunk，而是順著 graph 關係去補充條件、因果、背景與關聯事實。",
        takeaway: "多跳問題需要的是『有路徑的知識』，graph expansion 正是在找這條路徑。",
      },
      {
        id: "organize",
        title: "把擴展結果整理成 subgraph",
        summary: "挑出有用內容，排除純噪音鄰居。",
        detail:
          "如果只是把所有 graph neighbors 都拿來，資訊會太雜。Organization 的作用，就是把真正能支撐答案的節點與 chunk 排出順序。",
        takeaway: "Graph expansion 解決『找得到』，organization 解決『用得好』。",
      },
      {
        id: "answer",
        title: "產生更完整的回答",
        summary: "把整理後的 subgraph 交給 LLM 回答。",
        detail:
          "最後產生答案時，LLM 接收到的不再是一堆零散片段，而是一組比較有結構、彼此可支援的知識，因此更容易回答多跳問題。",
        takeaway: "KG2RAG 的最終價值是讓 answer composition 變得更完整、更有證據脈絡。",
      },
    ],
  },
];

export const paperExplainerMap = Object.fromEntries(
  paperExplainers.map((item) => [item.pageId, item]),
);
