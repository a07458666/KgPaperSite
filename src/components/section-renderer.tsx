import Link from "next/link";
import type {
  BulletListSection,
  CardGridSection,
  DemoCardSection,
  FeatureGridSection,
  HeroSection,
  MatrixSection,
  PageSection,
  ProcessFlowSection,
  QuickLinksSection,
  SchemaTableSection,
  TextBlockSection,
  TwoColumnCompareSection,
} from "@/data/graph-paper-site.mock";

function renderTitle(title?: string) {
  if (!title) return null;
  return <h2 className="section-title">{title}</h2>;
}

function Hero({ section }: { section: HeroSection }) {
  return (
    <section className="section-card hero-card">
      {section.eyebrow ? <div className="eyebrow">{section.eyebrow}</div> : null}
      <h1 className="hero-title">{section.headline}</h1>
      <p className="hero-subtitle">{section.subheadline}</p>
      <p className="section-body">{section.description}</p>
      <div className="cta-row">
        <Link className="button-link primary" href={`/${section.primaryCta.target}`}>
          {section.primaryCta.label}
        </Link>
        {section.secondaryCta ? (
          <Link className="button-link secondary" href={`/${section.secondaryCta.target}`}>
            {section.secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function TextBlock({ section }: { section: TextBlockSection }) {
  return (
    <section className="section-card">
      <h2 className="section-title">{section.headline}</h2>
      <p className="section-body">{section.body}</p>
    </section>
  );
}

function CardGrid({ section }: { section: CardGridSection | FeatureGridSection }) {
  const isPaperEntryList =
    section.items.length >= 3 &&
    section.items.every(
      (item) =>
        item.target?.startsWith("page_paper_") ||
        item.target === "page_comparison",
    );
  const className = isPaperEntryList
    ? "grid-1"
    : section.items.length >= 3
      ? "grid-3"
      : "grid-2";
  const sectionTitle = "title" in section && typeof section.title === "string" ? section.title : undefined;

  return (
    <section className="section-card">
      {renderTitle(sectionTitle)}
      <div className={className}>
        {section.items.map((item) => (
          <article key={item.title} className="mini-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.mitigation ? <p className="muted">Mitigation: {item.mitigation}</p> : null}
            {item.target ? (
              <div className="cta-row">
                <Link className="button-link secondary" href={`/${item.target}`}>
                  Open
                </Link>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickLinks({ section }: { section: QuickLinksSection }) {
  return (
    <section className="section-card">
      <div className="quick-links">
        {section.items.map((item) => (
          <Link key={item.target} href={`/${item.target}`}>
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function TwoColumnCompare({ section }: { section: TwoColumnCompareSection }) {
  return (
    <section className="section-card">
      <div className="grid-2">
        {[section.left, section.right].map((column) => (
          <div key={column.title} className="compare-column">
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessFlow({ section }: { section: ProcessFlowSection }) {
  return (
    <section className="section-card">
      <div className="process-flow">
        {section.steps.map((step, index) => (
          <article key={step.title} className="process-step">
            <div className="process-index">{index + 1}</div>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SchemaTable({ section }: { section: SchemaTableSection }) {
  return (
    <section className="section-card">
      {renderTitle(section.title)}
      <table className="schema-table">
        <thead>
          <tr>
            <th>Node Type</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row) => (
            <tr key={row.nodeType}>
              <td>{row.nodeType}</td>
              <td>{row.examples.join(" / ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function BulletList({ section }: { section: BulletListSection }) {
  return (
    <section className="section-card">
      {renderTitle(section.title)}
      <ul className="bullet-list">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Matrix({ section }: { section: MatrixSection }) {
  return (
    <section className="section-card">
      <table className="matrix-table">
        <thead>
          <tr>
            {section.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row) => (
            <tr key={row.dimension}>
              <td>{row.dimension}</td>
              <td>{row.paper1}</td>
              <td>{row.paper2}</td>
              <td>{row.paper3}</td>
              <td>{row.implication}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function DemoCard({ section }: { section: DemoCardSection }) {
  return (
    <section className="section-card">
      <article className="mini-card">
        <h3>{section.title}</h3>
        <p>{section.description}</p>
        <div className="cta-row">
          <Link className="button-link primary" href={`/${section.target}`}>
            Open Demo
          </Link>
        </div>
      </article>
    </section>
  );
}

function InteractiveDemo({ section }: { section: Extract<PageSection, { type: "interactive_demo" }> }) {
  return (
    <section className="section-card">
      <h2 className="section-title">{section.title}</h2>
      <p className="section-body">{section.content.intro}</p>
      <div className="demo-layout">
        {Object.entries(section.layout).map(([key, value]) => (
          <div key={key} className="demo-panel">
            <strong>{value}</strong>
            <span className="muted">{key}</span>
          </div>
        ))}
      </div>
      <div className="demo-actions">
        {section.content.actions.map((action) => (
          <span key={action}>{action}</span>
        ))}
      </div>
    </section>
  );
}

export function SectionRenderer({ section }: { section: PageSection }) {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "text_block":
      return <TextBlock section={section} />;
    case "card_grid":
      return <CardGrid section={section} />;
    case "quick_links":
      return <QuickLinks section={section} />;
    case "two_column_compare":
      return <TwoColumnCompare section={section} />;
    case "feature_grid":
      return <CardGrid section={section} />;
    case "process_flow":
      return <ProcessFlow section={section} />;
    case "schema_table":
      return <SchemaTable section={section} />;
    case "bullet_list":
      return <BulletList section={section} />;
    case "matrix":
      return <Matrix section={section} />;
    case "demo_card":
      return <DemoCard section={section} />;
    case "interactive_demo":
      return <InteractiveDemo section={section} />;
    default:
      return null;
  }
}
