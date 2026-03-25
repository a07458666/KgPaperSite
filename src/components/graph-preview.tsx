import type {
  ExampleGraph,
  GraphEdge,
  GraphNode,
  GraphNodeType,
} from "@/data/graph-paper-site.mock";

const nodeTypeStyle: Record<
  GraphNodeType,
  {
    fill: string;
    stroke: string;
    label: string;
  }
> = {
  evidence: {
    fill: "#d8eef0",
    stroke: "#1d5c63",
    label: "Evidence",
  },
  hypothesis: {
    fill: "#fde8d9",
    stroke: "#b55d32",
    label: "Hypothesis",
  },
  diagnostic_action: {
    fill: "#efe8ff",
    stroke: "#6d55b3",
    label: "Diagnostic Action",
  },
  root_cause: {
    fill: "#f7d8d8",
    stroke: "#a33c3c",
    label: "Root Cause",
  },
};

const positions: Record<string, { x: number; y: number }> = {
  n1: { x: 120, y: 130 },
  n2: { x: 340, y: 130 },
  n3: { x: 590, y: 70 },
  n4: { x: 820, y: 70 },
  n5: { x: 590, y: 210 },
  n6: { x: 820, y: 210 },
  n7: { x: 590, y: 340 },
};

function getNodePosition(nodeId: string, index: number) {
  return positions[nodeId] ?? { x: 150 + index * 120, y: 120 + (index % 3) * 110 };
}

function EdgeLine({
  edge,
  source,
  target,
}: {
  edge: GraphEdge;
  source: { x: number; y: number };
  target: { x: number; y: number };
}) {
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2 - 12;

  return (
    <g>
      <path
        d={`M ${source.x + 72} ${source.y} C ${midX} ${source.y}, ${midX} ${target.y}, ${target.x - 72} ${target.y}`}
        fill="none"
        stroke="rgba(27, 26, 23, 0.35)"
        strokeWidth="2.5"
      />
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        fontSize="12"
        fill="#5a574f"
      >
        {edge.label}
      </text>
    </g>
  );
}

function NodeCard({
  node,
  x,
  y,
}: {
  node: GraphNode;
  x: number;
  y: number;
}) {
  const style = nodeTypeStyle[node.type];

  return (
    <g>
      <rect
        x={x - 72}
        y={y - 34}
        rx="18"
        ry="18"
        width="144"
        height="68"
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth="2"
      />
      <text x={x} y={y - 8} textAnchor="middle" fontSize="11" fill={style.stroke}>
        {style.label}
      </text>
      <text x={x} y={y + 14} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1b1a17">
        {node.label}
      </text>
    </g>
  );
}

function Legend() {
  return (
    <div className="legend-row">
      {Object.entries(nodeTypeStyle).map(([type, style]) => (
        <div key={type} className="legend-chip">
          <span
            className="legend-swatch"
            style={{ backgroundColor: style.fill, borderColor: style.stroke }}
          />
          <span>{style.label}</span>
        </div>
      ))}
    </div>
  );
}

export function GraphPreview({
  example,
  title,
  caption,
}: {
  example: ExampleGraph;
  title?: string;
  caption?: string;
}) {
  const nodePositions = Object.fromEntries(
    example.graph.nodes.map((node, index) => [node.id, getNodePosition(node.id, index)]),
  );

  return (
    <section className="section-card">
      <div className="graph-header">
        <div>
          <h2 className="section-title">{title ?? example.title}</h2>
          <p className="section-body">
            {caption ?? "以 troubleshooting graph 展示 evidence、hypothesis、action 與 root cause 的關係。"}
          </p>
        </div>
        <Legend />
      </div>
      <div className="graph-frame">
        <svg viewBox="0 0 940 430" className="graph-svg" role="img" aria-label={example.title}>
          {example.graph.edges.map((edge) => (
            <EdgeLine
              key={`${edge.source}-${edge.target}-${edge.type}`}
              edge={edge}
              source={nodePositions[edge.source]}
              target={nodePositions[edge.target]}
            />
          ))}
          {example.graph.nodes.map((node) => {
            const pos = nodePositions[node.id];
            return <NodeCard key={node.id} node={node} x={pos.x} y={pos.y} />;
          })}
        </svg>
      </div>
      <div className="graph-node-grid">
        {example.graph.nodes.map((node) => (
          <article key={node.id} className="mini-card">
            <h3>{node.label}</h3>
            <p>
              Type: {nodeTypeStyle[node.type].label}
              {node.entityKind ? ` · Entity: ${node.entityKind}` : ""}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
