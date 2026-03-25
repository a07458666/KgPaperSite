export type DemoNodeGroup =
  | "context"
  | "memory"
  | "reasoning"
  | "output"
  | "retrieval"
  | "organization";

export interface DemoNode {
  id: string;
  label: string;
  group: DemoNodeGroup;
  level: number;
}

export interface DemoEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DemoFrame {
  id: string;
  title: string;
  summary: string;
  focusLabel: string;
  focusText: string;
  sourceTitle: string;
  sourceItems: string[];
  graphTitle: string;
  graphItems: string[];
  answerTitle: string;
  answerItems: string[];
  nodes: DemoNode[];
  edges: DemoEdge[];
  highlightedNodeIds: string[];
}

export interface PaperDemo {
  pageId: string;
  title: string;
  intro: string;
  legend: Array<{
    label: string;
    group: DemoNodeGroup;
  }>;
  frames: DemoFrame[];
}

export const paperDemos: PaperDemo[] = [
  {
    pageId: "page_paper_1",
    title: "Demo：EgoGraph 如何把長時間事件轉成可推理的 Temporal Graph",
    intro:
      "這個示例把 EgoGraph 放到半導體設備事件追蹤場景。你可以直接看到：原始班次紀錄如何被整理成事件圖，之後系統又如何沿著 temporal graph 回答跨天問題。",
    legend: [
      { label: "原始事件", group: "context" },
      { label: "記憶節點", group: "memory" },
      { label: "推理路徑", group: "reasoning" },
      { label: "回答輸出", group: "output" },
    ],
    frames: [
      {
        id: "event-extraction",
        title: "Step 1. 從班次紀錄抽出事件",
        summary: "先把長時間的設備紀錄切成可追蹤的事件片段。",
        focusLabel: "核心",
        focusText:
          "EgoGraph 的第一步不是直接把所有紀錄塞給模型，而是先把跨班次、跨天的觀察整理成離散事件，這樣後面才有辦法保留先後順序與實體關聯。",
        sourceTitle: "原始資料",
        sourceItems: [
          "08:20 腔體清潔",
          "11:40 更換 filter",
          "15:10 發生 Particle Alarm",
          "隔天 09:30 再次重啟設備",
        ],
        graphTitle: "Graph 形成",
        graphItems: [
          "每個事件先成為可追蹤節點",
          "事件會附帶時間戳與設備資訊",
          "系統先建立長時間記憶骨架",
        ],
        answerTitle: "回答意義",
        answerItems: [
          "後面才能回溯 alarm 前發生過哪些事件",
          "也才能追蹤跨天事件之間的依賴",
        ],
        nodes: [
          { id: "timeline", label: "班次紀錄", group: "context", level: 0 },
          { id: "clean", label: "腔體清潔", group: "memory", level: 1 },
          { id: "filter", label: "更換 filter", group: "memory", level: 1 },
          { id: "alarm", label: "Particle Alarm", group: "memory", level: 1 },
          { id: "restart", label: "隔天重啟", group: "memory", level: 1 },
          { id: "event-graph", label: "事件節點集合", group: "reasoning", level: 2 },
        ],
        edges: [
          { from: "timeline", to: "clean", label: "抽出" },
          { from: "timeline", to: "filter", label: "抽出" },
          { from: "timeline", to: "alarm", label: "抽出" },
          { from: "timeline", to: "restart", label: "抽出" },
          { from: "clean", to: "event-graph", label: "節點" },
          { from: "filter", to: "event-graph", label: "節點" },
          { from: "alarm", to: "event-graph", label: "節點" },
          { from: "restart", to: "event-graph", label: "節點" },
        ],
        highlightedNodeIds: ["timeline", "event-graph"],
      },
      {
        id: "temporal-linking",
        title: "Step 2. 事件節點接成 Temporal Graph",
        summary: "把事件依照先後順序與關聯接起來。",
        focusLabel: "核心",
        focusText:
          "EgoGraph 真正的關鍵，不是有事件節點而已，而是把 before / after 與跨天關聯接出來，讓系統能沿著時間路徑追蹤原因與後果。",
        sourceTitle: "原始資料",
        sourceItems: [
          "同一台 Etch Chamber A",
          "alarm 發生前曾更換 filter",
          "隔天重啟後又觀察到異常",
        ],
        graphTitle: "Graph 形成",
        graphItems: [
          "事件之間加入 before / after 關係",
          "設備與事件建立對應關聯",
          "跨天事件仍保留在同一條 temporal path",
        ],
        answerTitle: "回答意義",
        answerItems: [
          "系統能知道 alarm 之前真正發生了什麼",
          "跨天推理不再只靠文字摘要回想",
        ],
        nodes: [
          { id: "chamber", label: "Etch Chamber A", group: "context", level: 0 },
          { id: "clean2", label: "腔體清潔", group: "memory", level: 1 },
          { id: "filter2", label: "更換 filter", group: "memory", level: 2 },
          { id: "alarm2", label: "Particle Alarm", group: "memory", level: 3 },
          { id: "restart2", label: "隔天重啟", group: "memory", level: 4 },
          { id: "graph", label: "Temporal Knowledge Graph", group: "reasoning", level: 5 },
        ],
        edges: [
          { from: "chamber", to: "clean2", label: "設備事件" },
          { from: "clean2", to: "filter2", label: "before" },
          { from: "filter2", to: "alarm2", label: "before" },
          { from: "alarm2", to: "restart2", label: "next day" },
          { from: "restart2", to: "graph", label: "納入推理圖" },
        ],
        highlightedNodeIds: ["filter2", "alarm2", "graph"],
      },
      {
        id: "graph-to-answer",
        title: "Step 3. 從 Temporal Graph 回答問題",
        summary: "沿著時間路徑回溯 alarm 之前的關鍵事件。",
        focusLabel: "核心",
        focusText:
          "回答問題時，系統不是重讀整段紀錄，而是沿著 temporal graph 往前回溯，找出和 alarm 最有關的先前事件與設備操作。",
        sourceTitle: "原始問題",
        sourceItems: [
          "Particle Alarm 前，最值得回頭檢查的事件是什麼？",
          "哪些異常是跨天延續的？",
        ],
        graphTitle: "Graph 推理",
        graphItems: [
          "從 alarm 節點向前回溯",
          "找到更換 filter 與重啟設備的時間關聯",
          "組出一條具時序的解釋路徑",
        ],
        answerTitle: "回答輸出",
        answerItems: [
          "優先回查 filter 更換後的狀態變化",
          "確認隔天重啟是否延續前一天異常",
        ],
        nodes: [
          { id: "question", label: "Alarm 前發生了什麼？", group: "context", level: 0 },
          { id: "restart3", label: "隔天重啟", group: "memory", level: 1 },
          { id: "alarm3", label: "Particle Alarm", group: "reasoning", level: 2 },
          { id: "filter3", label: "更換 filter", group: "reasoning", level: 3 },
          { id: "answer", label: "具時序的回答", group: "output", level: 4 },
        ],
        edges: [
          { from: "question", to: "alarm3", label: "定位事件" },
          { from: "alarm3", to: "filter3", label: "向前回溯" },
          { from: "alarm3", to: "restart3", label: "跨天追蹤" },
          { from: "filter3", to: "answer", label: "組成回答" },
          { from: "restart3", to: "answer", label: "補充脈絡" },
        ],
        highlightedNodeIds: ["question", "alarm3", "answer"],
      },
    ],
  },
  {
    pageId: "page_paper_2",
    title: "Demo：H-EPM 如何用 Memory Graph 決定多輪 Agent 的下一步",
    intro:
      "這個示例把 H-EPM 放到 Chamber Vacuum Error 的多輪 troubleshooting。你可以看到：系統如何把歷史經驗整理成 memory graph，並在新 evidence 進來後持續修正下一步。",
    legend: [
      { label: "當前症狀", group: "context" },
      { label: "歷史經驗", group: "memory" },
      { label: "決策推理", group: "reasoning" },
      { label: "下一步動作", group: "output" },
    ],
    frames: [
      {
        id: "memory-graph",
        title: "Step 1. 把歷史排查經驗整理成 Memory Graph",
        summary: "先把 state、action、outcome 轉成可檢索的經驗圖。",
        focusLabel: "核心",
        focusText:
          "H-EPM 不是只存完整對話軌跡，而是把『哪種狀態下做了什麼排查動作』拆成可重用的 memory graph，讓多輪 decision 可以重複利用。",
        sourceTitle: "原始資料",
        sourceItems: [
          "Alarm 01 + Pump 未運轉",
          "上一個案例先確認溫度異常",
          "另一個案例最後查到 O-Ring",
        ],
        graphTitle: "Graph 形成",
        graphItems: [
          "state 節點：症狀與條件",
          "action 節點：檢查與排查動作",
          "outcome 節點：成功辨識的故障點",
        ],
        answerTitle: "回答意義",
        answerItems: [
          "後面遇到相似 state 時可以直接借用經驗",
          "agent 不需要每次都從零開始想下一步",
        ],
        nodes: [
          { id: "history", label: "歷史 troubleshooting 經驗", group: "context", level: 0 },
          { id: "state1", label: "Alarm 01 + Pump 未運轉", group: "memory", level: 1 },
          { id: "asktemp", label: "檢查溫度異常", group: "memory", level: 2 },
          { id: "checkoring", label: "檢查 O-Ring", group: "memory", level: 3 },
          { id: "memorygraph", label: "Hybrid Memory Graph", group: "reasoning", level: 4 },
        ],
        edges: [
          { from: "history", to: "state1", label: "抽取 state" },
          { from: "state1", to: "asktemp", label: "曾採取動作" },
          { from: "asktemp", to: "checkoring", label: "後續動作" },
          { from: "checkoring", to: "memorygraph", label: "納入圖" },
        ],
        highlightedNodeIds: ["state1", "asktemp", "memorygraph"],
      },
      {
        id: "state-match",
        title: "Step 2. 用當前 State 去匹配歷史經驗",
        summary: "先把目前症狀壓成 compact state summary，再去圖中找相似路徑。",
        focusLabel: "核心",
        focusText:
          "H-EPM 會先把新的對話狀態整理成 compact summary，然後再去 memory graph 中找和這個 state 最接近的經驗，而不是只靠表面文字比對。",
        sourceTitle: "原始資料",
        sourceItems: [
          "Chamber Vacuum Error",
          "Pump 狀態異常",
          "目前還沒有確認是否高溫",
        ],
        graphTitle: "Graph 推理",
        graphItems: [
          "生成 compact state summary",
          "在 graph 中找到相似 state",
          "取回過去成功的 action path",
        ],
        answerTitle: "回答意義",
        answerItems: [
          "agent 會先檢查最能縮小範圍的動作",
          "不是盲目地把所有 SOP 都跑一遍",
        ],
        nodes: [
          { id: "symptom", label: "Chamber Vacuum Error", group: "context", level: 0 },
          { id: "summary", label: "Compact State Summary", group: "reasoning", level: 1 },
          { id: "match", label: "匹配歷史 state", group: "memory", level: 2 },
          { id: "route", label: "取回 action path", group: "memory", level: 3 },
          { id: "candidate", label: "候選下一步", group: "output", level: 4 },
        ],
        edges: [
          { from: "symptom", to: "summary", label: "summary" },
          { from: "summary", to: "match", label: "match" },
          { from: "match", to: "route", label: "recall" },
          { from: "route", to: "candidate", label: "suggest" },
        ],
        highlightedNodeIds: ["summary", "match", "candidate"],
      },
      {
        id: "action-selection",
        title: "Step 3. 排序候選 Action",
        summary: "把最值得執行的下一步排查動作排在最前面。",
        focusLabel: "核心",
        focusText:
          "系統會把不同經驗路徑帶回來，但不會全部等權。H-EPM 會根據目前 state，排序哪些 action 最有鑑別力，哪個問題最值得先問。",
        sourceTitle: "原始資料",
        sourceItems: [
          "候選動作一：查 Pump 電源",
          "候選動作二：查高溫",
          "候選動作三：直接拆 O-Ring",
        ],
        graphTitle: "Graph 推理",
        graphItems: [
          "比較不同 action 的經驗效果",
          "選出最能縮小範圍的動作",
          "形成下一輪互動策略",
        ],
        answerTitle: "回答輸出",
        answerItems: [
          "先查高溫狀態",
          "若高溫成立，再往 O-Ring 與密封失效推進",
        ],
        nodes: [
          { id: "remain", label: "候選動作集合", group: "context", level: 0 },
          { id: "search", label: "查 Pump 電源", group: "memory", level: 1 },
          { id: "temp", label: "查高溫", group: "reasoning", level: 2 },
          { id: "oring", label: "拆 O-Ring", group: "memory", level: 1 },
          { id: "best", label: "最佳下一步", group: "output", level: 3 },
        ],
        edges: [
          { from: "remain", to: "search", label: "候選" },
          { from: "remain", to: "temp", label: "候選" },
          { from: "remain", to: "oring", label: "候選" },
          { from: "temp", to: "best", label: "最有鑑別力" },
        ],
        highlightedNodeIds: ["remain", "temp", "best"],
      },
      {
        id: "state-update",
        title: "Step 4. 新 Evidence 進來後更新狀態",
        summary: "每一輪都重新排序 hypothesis 與下一步。",
        focusLabel: "核心",
        focusText:
          "H-EPM 的重點不是第一次選得對，而是每次新 evidence 進來後，都能更新 state、淘汰舊假設、重新排序下一步。這才是多輪 agent 真正需要的能力。",
        sourceTitle: "原始資料",
        sourceItems: [
          "新 evidence：溫度確實偏高",
          "Pump 電源正常",
          "O-Ring 可能受熱老化",
        ],
        graphTitle: "Graph 推理",
        graphItems: [
          "更新目前 state",
          "淘汰不合理假設",
          "重新排序下一步動作",
        ],
        answerTitle: "回答輸出",
        answerItems: [
          "下一步優先檢查 O-Ring",
          "排查方向從電源轉向熱失效與密封問題",
        ],
        nodes: [
          { id: "newtemp", label: "新 evidence：高溫成立", group: "context", level: 0 },
          { id: "dropheat", label: "排除 Pump 電源問題", group: "reasoning", level: 1 },
          { id: "uporing", label: "提升 O-Ring 假設", group: "reasoning", level: 2 },
          { id: "nextoring", label: "下一步檢查 O-Ring", group: "output", level: 3 },
          { id: "loop", label: "更新後 state", group: "memory", level: 4 },
        ],
        edges: [
          { from: "newtemp", to: "dropheat", label: "更新" },
          { from: "dropheat", to: "uporing", label: "重排" },
          { from: "uporing", to: "nextoring", label: "決策" },
          { from: "nextoring", to: "loop", label: "進入下一輪" },
        ],
        highlightedNodeIds: ["newtemp", "uporing", "nextoring"],
      },
    ],
  },
  {
    pageId: "page_paper_3",
    title: "Demo：KG2RAG 如何把文件變成可回答問題的 Graph Path",
    intro:
      "這個示例直接對應 KG2RAG 的三個核心機制：離線圖譜關聯、BFS 圖引導擴展、MST 過濾與組織。你可以看到資料如何先變成 graph，最後又如何從 graph 回到可回答問題的 evidence path。",
    legend: [
      { label: "原始文件", group: "context" },
      { label: "檢索入口", group: "retrieval" },
      { label: "圖上組織", group: "organization" },
      { label: "回答輸出", group: "output" },
    ],
    frames: [
      {
        id: "offline-kg",
        title: "Step 1. 離線圖譜關聯",
        summary: "先把 SOP 與故障知識抽成三元組，建立 knowledge graph。",
        focusLabel: "核心",
        focusText:
          "KG2RAG 的第一步不是提問，而是先把文件中的實體與關係抽出來。這一步把原本互相獨立的 SOP、故障案例與元件知識接成一張可檢索的事實圖。",
        sourceTitle: "原始資料",
        sourceItems: [
          "SOP：Alarm 01 時先檢查 Dry Pump",
          "故障案例：Pump Power Module 失效會導致 Vacuum Error",
          "維修紀錄：O-Ring 破損常伴隨高溫",
        ],
        graphTitle: "Graph 形成",
        graphItems: [
          "Alarm 01 -> Dry Pump",
          "Dry Pump -> Pump Power Module",
          "High Temperature -> O-Ring Damage",
        ],
        answerTitle: "回答意義",
        answerItems: [
          "chunk 和 chunk 之間先有事實連結",
          "之後檢索時就能沿著 graph 找 supporting facts",
        ],
        nodes: [
          { id: "docs", label: "SOP / 故障案例 / 維修紀錄", group: "context", level: 0 },
          { id: "alarm", label: "Alarm 01", group: "retrieval", level: 1 },
          { id: "pump", label: "Dry Pump", group: "organization", level: 2 },
          { id: "power", label: "Pump Power Module", group: "organization", level: 3 },
          { id: "oring", label: "O-Ring Damage", group: "organization", level: 3 },
          { id: "kg", label: "Offline Knowledge Graph", group: "reasoning", level: 4 },
        ],
        edges: [
          { from: "docs", to: "alarm", label: "抽取實體" },
          { from: "alarm", to: "pump", label: "關聯" },
          { from: "pump", to: "power", label: "可能故障" },
          { from: "oring", to: "kg", label: "納入圖" },
          { from: "power", to: "kg", label: "納入圖" },
        ],
        highlightedNodeIds: ["docs", "alarm", "kg"],
      },
      {
        id: "bfs-expand",
        title: "Step 2. BFS 圖引導擴展",
        summary: "先命中 seed，再沿圖擴展到相關 supporting facts。",
        focusLabel: "核心",
        focusText:
          "KG2RAG 不會停在最相似的 seed chunks。當問題命中 Alarm 01 與 Dry Pump 後，系統會沿著 graph 做 BFS，把 Power Module、O-Ring、High Temperature 這些邏輯相連的事實一起帶進來。",
        sourceTitle: "原始問題",
        sourceItems: [
          "問題：Chamber Vacuum Error 最值得先查哪些故障點？",
          "語義檢索命中：Alarm 01、Dry Pump SOP",
        ],
        graphTitle: "Graph 推理",
        graphItems: [
          "從 seed 節點向外擴展",
          "補上可能故障模組與 supporting facts",
          "形成一個較完整的候選子圖",
        ],
        answerTitle: "回答意義",
        answerItems: [
          "不只找到最像的段落",
          "還能帶出真正回答問題需要的周邊事實",
        ],
        nodes: [
          { id: "question", label: "Vacuum Error 要先查什麼？", group: "context", level: 0 },
          { id: "seedhub", label: "Seed Chunks", group: "retrieval", level: 1 },
          { id: "pump2", label: "Dry Pump", group: "organization", level: 2 },
          { id: "power2", label: "Pump Power Module", group: "organization", level: 3 },
          { id: "temp2", label: "High Temperature", group: "organization", level: 3 },
          { id: "subgraph", label: "BFS Expanded Subgraph", group: "reasoning", level: 4 },
        ],
        edges: [
          { from: "question", to: "seedhub", label: "seed" },
          { from: "seedhub", to: "pump2", label: "expand" },
          { from: "pump2", to: "power2", label: "neighbor" },
          { from: "pump2", to: "temp2", label: "neighbor" },
          { from: "power2", to: "subgraph", label: "include" },
          { from: "temp2", to: "subgraph", label: "include" },
        ],
        highlightedNodeIds: ["seedhub", "pump2", "subgraph"],
      },
      {
        id: "mst-organize",
        title: "Step 3. MST 過濾與組織",
        summary: "從擴展後子圖中保留最重要的資訊傳遞路徑。",
        focusLabel: "核心",
        focusText:
          "圖擴展之後不代表全部都有用。KG2RAG 會用 MST 保留最重要的主幹路徑，把最值得保留的支撐資訊和噪音分開，避免把大量無關 chunk 直接丟給 LLM。",
        sourceTitle: "原始資料",
        sourceItems: [
          "擴展後同時有 Pump、Power Module、O-Ring、Temperature 等資訊",
          "有些是主幹路徑，有些只是補充脈絡",
        ],
        graphTitle: "Graph 推理",
        graphItems: [
          "保留 Alarm -> Pump -> Power Module 主幹",
          "保留 High Temperature -> O-Ring Damage 支撐路徑",
          "移除和問題關係較弱的噪音節點",
        ],
        answerTitle: "回答意義",
        answerItems: [
          "上下文更聚焦",
          "token 使用量更低，答案也更好組織",
        ],
        nodes: [
          { id: "many", label: "Expanded Candidates", group: "retrieval", level: 0 },
          { id: "main", label: "主幹路徑", group: "organization", level: 1 },
          { id: "support", label: "支撐路徑", group: "organization", level: 1 },
          { id: "prune", label: "去除噪音", group: "reasoning", level: 2 },
          { id: "ready", label: "MST Organized Subgraph", group: "output", level: 3 },
        ],
        edges: [
          { from: "many", to: "main", label: "keep main" },
          { from: "many", to: "support", label: "keep support" },
          { from: "many", to: "prune", label: "drop noise" },
          { from: "main", to: "ready", label: "compose" },
          { from: "support", to: "ready", label: "support" },
        ],
        highlightedNodeIds: ["many", "main", "ready"],
      },
      {
        id: "answer-compose",
        title: "Step 4. 從圖回到回答",
        summary: "把整理好的子圖轉成 evidence-backed answer。",
        focusLabel: "核心",
        focusText:
          "最後送進 LLM 的已經不是一堆零散 chunks，而是一個被 graph 串接、被 BFS 補齊、再被 MST 整理過的 answer-ready subgraph。這讓回答更完整，也更容易附上 evidence path。",
        sourceTitle: "原始問題",
        sourceItems: [
          "需要一個有先後順序、可排查的回答",
          "不只是列出所有可能原因",
        ],
        graphTitle: "Graph 推理",
        graphItems: [
          "主幹路徑作為回答骨架",
          "支撐路徑作為補充證據",
          "形成有順序的排查建議",
        ],
        answerTitle: "回答輸出",
        answerItems: [
          "優先檢查 Dry Pump",
          "若 Pump 正常，再檢查 Power Module",
          "若伴隨高溫，再排查 O-Ring Damage",
        ],
        nodes: [
          { id: "contextready", label: "Organized Subgraph", group: "organization", level: 0 },
          { id: "step1", label: "先查 Dry Pump", group: "output", level: 1 },
          { id: "step2", label: "再查 Power Module", group: "output", level: 2 },
          { id: "step3", label: "高溫時查 O-Ring", group: "output", level: 2 },
          { id: "evidence", label: "Evidence-backed Answer", group: "reasoning", level: 3 },
        ],
        edges: [
          { from: "contextready", to: "step1", label: "compose" },
          { from: "step1", to: "step2", label: "main path" },
          { from: "step1", to: "step3", label: "support path" },
          { from: "step2", to: "evidence", label: "support" },
          { from: "step3", to: "evidence", label: "support" },
        ],
        highlightedNodeIds: ["contextready", "step1", "evidence"],
      },
    ],
  },
];

export const paperDemoMap = Object.fromEntries(
  paperDemos.map((item) => [item.pageId, item]),
);
