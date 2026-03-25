"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Edge, Node, Options } from "vis-network";
import type { DemoNodeGroup, PaperDemo } from "@/data/paper-demos";

function groupColor(group: DemoNodeGroup) {
  switch (group) {
    case "context":
      return {
        background: "#f6e8cf",
        border: "#9b6b1f",
        highlight: {
          background: "#f2dec0",
          border: "#815916",
        },
      };
    case "memory":
      return {
        background: "#d8eef0",
        border: "#1d5c63",
        highlight: {
          background: "#c8e5e8",
          border: "#164b50",
        },
      };
    case "retrieval":
      return {
        background: "#d8eef0",
        border: "#1d5c63",
        highlight: {
          background: "#c8e5e8",
          border: "#164b50",
        },
      };
    case "reasoning":
      return {
        background: "#fde8d9",
        border: "#b55d32",
        highlight: {
          background: "#f9dbc6",
          border: "#964b25",
        },
      };
    case "organization":
      return {
        background: "#efe4f8",
        border: "#705090",
        highlight: {
          background: "#e6d7f2",
          border: "#593f73",
        },
      };
    case "output":
      return {
        background: "#e4f2de",
        border: "#567a31",
        highlight: {
          background: "#d4e9c9",
          border: "#446223",
        },
      };
  }
}

function buildGraph(frame: PaperDemo["frames"][number]) {
  const nodes: Node[] = frame.nodes.map((node) => ({
    id: node.id,
    label: node.label,
    level: node.level,
    shape: "box",
    margin: { top: 14, right: 14, bottom: 14, left: 14 },
    widthConstraint: { minimum: 160, maximum: 220 },
    font: { size: 15, face: "Georgia" },
    color: groupColor(node.group),
    borderWidth: frame.highlightedNodeIds.includes(node.id) ? 3 : 1.5,
  }));

  const edges: Edge[] = frame.edges.map((edge) => ({
    from: edge.from,
    to: edge.to,
    label: edge.label,
    arrows: "to",
    width: 2,
    color: { color: "rgba(27, 26, 23, 0.25)", highlight: "#1d5c63" },
    smooth: {
      enabled: true,
      type: "cubicBezier",
      roundness: 0.16,
    },
    font: {
      size: 12,
      face: "Georgia",
      color: "#5a574f",
      background: "rgba(255,250,240,0.72)",
    },
  }));

  return { nodes, edges };
}

const networkOptions: Options = {
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: true,
      direction: "LR",
      sortMethod: "directed",
      nodeSpacing: 155,
      levelSeparation: 220,
      treeSpacing: 180,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
    },
  },
  nodes: {
    shadow: {
      enabled: true,
      color: "rgba(44, 38, 24, 0.08)",
      x: 0,
      y: 12,
      size: 18,
    },
    borderWidthSelected: 3,
  },
  edges: {
    selectionWidth: 3,
  },
  physics: {
    enabled: false,
  },
  interaction: {
    hover: true,
    dragNodes: false,
    dragView: true,
    zoomView: true,
  },
};

export function PaperDemoView({ demo }: { demo: PaperDemo }) {
  const [activeFrameId, setActiveFrameId] = useState(demo.frames[0]?.id);
  const networkRef = useRef<HTMLDivElement | null>(null);

  const currentFrame =
    demo.frames.find((frame) => frame.id === activeFrameId) ?? demo.frames[0];

  const graph = useMemo(
    () => (currentFrame ? buildGraph(currentFrame) : { nodes: [], edges: [] }),
    [currentFrame],
  );

  useEffect(() => {
    let disposed = false;
    let destroy: (() => void) | undefined;

    async function renderNetwork() {
      if (!networkRef.current || !currentFrame) {
        return;
      }

      const [{ Network }, { DataSet }] = await Promise.all([
        import("vis-network/standalone"),
        import("vis-network/standalone"),
      ]);

      if (disposed || !networkRef.current) {
        return;
      }

      const network = new Network(
        networkRef.current,
        {
          nodes: new DataSet(graph.nodes),
          edges: new DataSet(graph.edges),
        },
        networkOptions,
      );

      network.once("afterDrawing", () => {
        if (currentFrame.highlightedNodeIds.length > 0) {
          network.selectNodes(currentFrame.highlightedNodeIds);
        }

        network.fit({
          animation: {
            duration: 280,
            easingFunction: "easeInOutQuad",
          },
        });
      });

      destroy = () => network.destroy();
    }

    void renderNetwork();

    return () => {
      disposed = true;
      destroy?.();
    };
  }, [currentFrame, graph.edges, graph.nodes]);

  if (!currentFrame) {
    return null;
  }

  return (
    <section className="section-card paper-demo-card">
      <div className="eyebrow">Interactive Demo</div>
      <h2 className="section-title">{demo.title}</h2>
      <p className="section-body">{demo.intro}</p>

      <div className="demo-legend-row">
        {demo.legend.map((item) => (
          <span key={`${item.group}-${item.label}`} className="legend-chip">
            <span
              className={`legend-swatch demo-group-${item.group}`}
              aria-hidden="true"
            />
            {item.label}
          </span>
        ))}
      </div>

      <div className="demo-step-tabs" role="tablist" aria-label="Demo frames">
        {demo.frames.map((frame, index) => {
          const isActive = frame.id === currentFrame.id;
          return (
            <button
              key={frame.id}
              type="button"
              className={`demo-step-tab${isActive ? " active" : ""}`}
              onClick={() => setActiveFrameId(frame.id)}
            >
              <span className="demo-step-index">{index + 1}</span>
              <span>{frame.title}</span>
            </button>
          );
        })}
      </div>

      <div className="demo-visual-frame">
        <div
          ref={networkRef}
          className="demo-network-canvas"
          role="img"
          aria-label={currentFrame.title}
        />
        <div className="demo-network-hint">
          Drag to pan. Scroll to zoom. The highlighted nodes show the main idea of this step.
        </div>
      </div>

      <div className="paper-demo-reading-grid">
        <article className="section-card inset-card demo-focus-card">
          <div className="detail-kicker">{currentFrame.focusLabel}</div>
          <h3>{currentFrame.summary}</h3>
          <p>{currentFrame.focusText}</p>
        </article>

        <div className="demo-side-stack">
          <article className="mini-card">
            <h3>{currentFrame.sourceTitle}</h3>
            <ul className="bullet-list compact-list">
              {currentFrame.sourceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="mini-card">
            <h3>{currentFrame.graphTitle}</h3>
            <ul className="bullet-list compact-list">
              {currentFrame.graphItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="mini-card">
            <h3>{currentFrame.answerTitle}</h3>
            <ul className="bullet-list compact-list">
              {currentFrame.answerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
