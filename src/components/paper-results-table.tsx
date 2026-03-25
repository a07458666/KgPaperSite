"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type {
  PaperLineSeries,
  PaperResultMetric,
  PaperResultSeriesItem,
  PaperResultTable,
} from "@/data/paper-results";
import { withBasePath } from "@/lib/with-base-path";

function formatValue(value: number, unit: string) {
  if (unit === "score") {
    return value.toFixed(1);
  }

  if (unit === "F1" || unit === "reward" || unit === "accuracy") {
    return value.toFixed(3);
  }

  return `${value}`;
}

function ResultTabs({
  metrics,
  activeMetricId,
  onChange,
}: {
  metrics: PaperResultMetric[];
  activeMetricId: string;
  onChange: (id: string) => void;
}) {
  if (metrics.length <= 1) {
    return null;
  }

  return (
    <div className="results-tab-row" role="tablist" aria-label="Result metrics">
      {metrics.map((metric) => (
        <button
          key={metric.id}
          type="button"
          className={`results-tab${metric.id === activeMetricId ? " active" : ""}`}
          onClick={() => onChange(metric.id)}
        >
          {metric.label}
        </button>
      ))}
    </div>
  );
}

function LineChart({
  metrics,
  activeMetricId,
  lineSeries,
}: {
  metrics: PaperResultMetric[];
  activeMetricId: string;
  lineSeries?: PaperLineSeries[];
}) {
  const width = 760;
  const height = 320;
  const left = 54;
  const right = 24;
  const top = 24;
  const bottom = 56;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;

  const max = Math.max(...metrics.map((metric) => metric.maxValue));
  const xStep = metrics.length > 1 ? innerWidth / (metrics.length - 1) : innerWidth;

  const pointFor = (value: number, index: number) => ({
    x: left + xStep * index,
    y: top + innerHeight - (value / max) * innerHeight,
  });

  const series = lineSeries ?? [
    {
      id: "baseline",
      label: metrics[0]?.baselineLabel ?? "Baseline",
      values: metrics.map((metric) => metric.baselineValue),
      style: "baseline" as const,
    },
    {
      id: "method",
      label: metrics[0]?.methodLabel ?? "Paper Method",
      values: metrics.map((metric) => metric.methodValue),
      style: "method" as const,
    },
  ];

  return (
    <div className="results-chart-card results-chart-dark">
      <svg viewBox={`0 0 ${width} ${height}`} className="results-svg-chart" role="img" aria-label="Line chart">
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = top + innerHeight - innerHeight * ratio;
          return (
            <g key={ratio}>
              <line x1={left} y1={y} x2={width - right} y2={y} className="chart-grid-line dark" />
              <text x={left - 10} y={y + 4} textAnchor="end" className="chart-axis-text dark">
                {(max * ratio).toFixed(max > 1 ? 0 : 2)}
              </text>
            </g>
          );
        })}

        {series.map((item) => {
          const path = item.values
            .map((value, index) => {
              const point = pointFor(value, index);
              return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
            })
            .join(" ");

          return <path key={item.id} d={path} className={`chart-line ${item.style}`} />;
        })}

        {metrics.map((metric, index) => {
          const active = metric.id === activeMetricId;

          return (
            <g key={metric.id}>
              {series.map((item) => {
                const point = pointFor(item.values[index] ?? 0, index);
                return (
                  <circle
                    key={`${metric.id}-${item.id}`}
                    cx={point.x}
                    cy={point.y}
                    r={active && item.style !== "secondary" ? 6 : 4}
                    className={`chart-point ${item.style}`}
                  />
                );
              })}
              <text
                x={left + xStep * index}
                y={height - 22}
                textAnchor="middle"
                className={`chart-axis-text dark${active ? " active" : ""}`}
              >
                {metric.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend dark">
        {series.map((item) => (
          <span key={item.id}>
            <i className={`legend-line ${item.style}`} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function HorizontalBars({
  metrics,
  activeMetricId,
}: {
  metrics: PaperResultMetric[];
  activeMetricId: string;
}) {
  const max = Math.max(...metrics.map((metric) => metric.maxValue));

  return (
    <div className="results-chart-card">
      <div className="hbar-grid">
        {metrics.map((metric) => {
          const active = metric.id === activeMetricId;
          return (
            <div key={metric.id} className={`hbar-row${active ? " active" : ""}`}>
              <div className="hbar-label">{metric.label}</div>
              <div className="hbar-track-group">
                <div className="hbar-meta">{metric.baselineLabel}</div>
                <div className="hbar-track">
                  <div
                    className="hbar-fill baseline"
                    style={{ width: `${(metric.baselineValue / max) * 100}%` }}
                  />
                </div>
                <div className="hbar-value">{formatValue(metric.baselineValue, metric.unit)}</div>
              </div>
              <div className="hbar-track-group">
                <div className="hbar-meta">{metric.methodLabel}</div>
                <div className="hbar-track">
                  <div
                    className="hbar-fill method"
                    style={{ width: `${(metric.methodValue / max) * 100}%` }}
                  />
                </div>
                <div className="hbar-value">{formatValue(metric.methodValue, metric.unit)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VerticalBenchmarkChart({
  series,
  label,
}: {
  series: PaperResultSeriesItem[];
  label?: string;
}) {
  const width = 760;
  const height = 360;
  const left = 58;
  const right = 24;
  const top = 42;
  const bottom = 72;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;
  const max = Math.max(...series.map((item) => item.value), 0.8);
  const groupWidth = innerWidth / series.length;
  const barWidth = Math.min(72, groupWidth * 0.62);

  return (
    <div className="results-chart-card">
      <svg viewBox={`0 0 ${width} ${height}`} className="results-svg-chart" role="img" aria-label="Vertical benchmark chart">
        <defs>
          <linearGradient id="seriesBaseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cfd8e6" />
            <stop offset="100%" stopColor="#b9c5d8" />
          </linearGradient>
          <linearGradient id="seriesMidGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6ba4f0" />
            <stop offset="100%" stopColor="#4d85e3" />
          </linearGradient>
          <linearGradient id="seriesAccentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f6fe0" />
            <stop offset="100%" stopColor="#294fca" />
          </linearGradient>
        </defs>

        {label ? (
          <text x={width / 2} y={20} textAnchor="middle" className="chart-title-text">
            {label}
          </text>
        ) : null}

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = top + innerHeight - innerHeight * ratio;
          return (
            <g key={ratio}>
              <line x1={left} y1={y} x2={width - right} y2={y} className="chart-grid-line" />
              <text x={left - 10} y={y + 4} textAnchor="end" className="chart-axis-text">
                {(max * ratio).toFixed(1)}
              </text>
            </g>
          );
        })}

        {series.map((item, index) => {
          const centerX = left + groupWidth * index + groupWidth / 2;
          const barHeight = (item.value / max) * innerHeight;
          const barX = centerX - barWidth / 2;
          const gradientClass = item.accent
            ? "method"
            : index >= 2
              ? "secondary"
              : "baseline";

          return (
            <g key={item.id}>
              <rect
                x={barX}
                y={top + innerHeight - barHeight}
                width={barWidth}
                height={barHeight}
                rx={10}
                className={`vbar-series ${gradientClass}`}
              />
              <text
                x={centerX}
                y={top + innerHeight - barHeight - 8}
                textAnchor="middle"
                className="chart-value-text"
              >
                {item.value.toFixed(3)}
              </text>
              <text
                x={centerX}
                y={height - 28}
                textAnchor="middle"
                className={`chart-axis-text${item.accent ? " active" : ""}`}
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend">
        <span><i className="legend-box baseline" />Earlier Baselines</span>
        <span><i className="legend-box secondary" />Strong RAG Baselines</span>
        <span><i className="legend-box method" />KG2RAG</span>
      </div>
    </div>
  );
}

export function PaperResultsTableView({ table }: { table: PaperResultTable }) {
  const [activeMetricId, setActiveMetricId] = useState<string>(table.metrics[0]?.id ?? "");
  const activeMetric = useMemo(
    () => table.metrics.find((metric) => metric.id === activeMetricId) ?? table.metrics[0],
    [activeMetricId, table.metrics],
  );

  const hasComparisonSeries = Boolean(table.comparisonSeries?.length);
  const hasLineSeries = Boolean(table.lineSeries?.length);
  const hasChartImage = Boolean(table.chartImagePath);

  return (
    <section className="section-card results-card">
      <div className="eyebrow">Results</div>
      <h2 className="section-title">{table.title}</h2>
      <p className="section-body">{table.intro}</p>

      {hasComparisonSeries || hasLineSeries || hasChartImage ? null : (
        <ResultTabs
          metrics={table.metrics}
          activeMetricId={activeMetric.id}
          onChange={setActiveMetricId}
        />
      )}

      {hasChartImage ? (
        <figure className="results-chart-image-card">
          <Image
            src={withBasePath(table.chartImagePath ?? "")}
            alt={table.title}
            width={1200}
            height={1100}
            className="results-chart-image"
          />
          {table.chartImageCaption ? (
            <figcaption className="results-chart-caption">{table.chartImageCaption}</figcaption>
          ) : null}
        </figure>
      ) : null}

      {table.chartType === "line" && !hasChartImage ? (
        <LineChart
          metrics={table.metrics}
          activeMetricId={activeMetric.id}
          lineSeries={table.lineSeries}
        />
      ) : null}

      {table.chartType === "horizontal-bars" ? (
        <HorizontalBars metrics={table.metrics} activeMetricId={activeMetric.id} />
      ) : null}

      {table.chartType === "vertical-bars" && table.comparisonSeries ? (
        <VerticalBenchmarkChart
          series={table.comparisonSeries}
          label={table.comparisonLabel}
        />
      ) : null}

      {table.chartType === "vertical-bars" && !table.comparisonSeries ? (
        <HorizontalBars metrics={table.metrics} activeMetricId={activeMetric.id} />
      ) : null}

      <article className="section-card inset-card results-detail-card">
        <div className="detail-kicker">
          {hasChartImage ? "Key Observation" : "How To Read This Result"}
        </div>
        <h3>{hasChartImage ? "這張圖的關鍵觀察" : activeMetric.label}</h3>
        {hasComparisonSeries || hasChartImage ? null : (
          <p className="results-inline-meta">
            Baseline: <strong>{activeMetric.baselineLabel}</strong>{" "}
            {formatValue(activeMetric.baselineValue, activeMetric.unit)} {activeMetric.unit}
            {"  "} / {"  "}
            Paper Method: <strong>{activeMetric.methodLabel}</strong>{" "}
            {formatValue(activeMetric.methodValue, activeMetric.unit)} {activeMetric.unit}
          </p>
        )}
        <p className={`results-implication${hasChartImage ? " image-mode" : ""}`}>
          {table.comparisonNote ?? activeMetric.note}
        </p>
      </article>
    </section>
  );
}
