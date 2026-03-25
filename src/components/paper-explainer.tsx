"use client";

import Image from "next/image";
import { useState } from "react";
import type { PaperExplainer } from "@/data/paper-explainers";
import { withBasePath } from "@/lib/with-base-path";

const sectionIcons = {
  goal: "01",
  method: "02",
  why: "03",
  results: "04",
  visuals: "05",
} as const;

export function PaperExplainerView({ explainer }: { explainer: PaperExplainer }) {
  const [activeStep, setActiveStep] = useState(explainer.steps[0]?.id);
  const currentStep =
    explainer.steps.find((step) => step.id === activeStep) ?? explainer.steps[0];

  return (
    <section className="section-card explainer-card">
      <div className="eyebrow">Paper Overview</div>
      <h2 className="section-title">{explainer.fullTitle}</h2>

      <div className="paper-hero-grid">
        <article className="mini-card paper-summary-card">
          <div className="section-label">
            <span className="icon-badge">{sectionIcons.goal}</span>
            <h3>研究目的 / 要解決的問題</h3>
          </div>
          <p>{explainer.researchGoal}</p>
          <p className="muted">{explainer.problemGap}</p>
        </article>

        <article className="mini-card paper-summary-card">
          <div className="section-label">
            <span className="icon-badge">{sectionIcons.why}</span>
            <h3>為什麼用 Graph</h3>
          </div>
          <p>{explainer.whyGraph}</p>
          <p className="muted">{explainer.contribution}</p>
        </article>
      </div>

      <section className="paper-section-block">
        <div className="section-label">
          <span className="icon-badge">{sectionIcons.method}</span>
          <h3>方法</h3>
        </div>
        <div className="explainer-flow">
          <div className="explainer-step-list" role="tablist" aria-label="Method steps">
            {explainer.steps.map((step, index) => {
              const isActive = step.id === currentStep.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  className={`step-tab${isActive ? " active" : ""}`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <span className="step-tab-index">{index + 1}</span>
                  <span className="step-tab-copy">
                    <strong>{step.title}</strong>
                    <span>{step.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="explainer-detail mini-card">
            <div className="detail-kicker">Current Step</div>
            <h3>{currentStep.title}</h3>
            <p>{currentStep.detail}</p>
            <div className="detail-divider" />
            <div className="detail-kicker">Why This Step Matters</div>
            <p>{currentStep.takeaway}</p>
          </div>
        </div>

        <div className="grid-3">
          {explainer.method.map((item) => (
            <article key={item} className="mini-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="paper-section-block">
        <div className="section-label">
          <span className="icon-badge">{sectionIcons.why}</span>
          <h3>為什麼這個方法可以解決問題</h3>
        </div>
        <div className="grid-3">
          {explainer.whyWorks.map((item) => (
            <article key={item} className="mini-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="paper-section-block">
        <div className="section-label">
          <span className="icon-badge">{sectionIcons.results}</span>
          <h3>實驗結果</h3>
        </div>
        <div className="grid-3">
          {explainer.results.map((item) => (
            <article key={item} className="mini-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="paper-section-block">
        <div className="section-label">
          <span className="icon-badge">{sectionIcons.visuals}</span>
          <h3>Paper Figures and Tables</h3>
        </div>
        <div className="paper-visual-grid">
          {explainer.visuals.map((visual) => (
            <figure key={visual.src} className="paper-visual-card">
              <Image
                src={withBasePath(visual.src)}
                alt={visual.alt}
                width={1400}
                height={1000}
                className="paper-visual-image"
              />
              <figcaption>{visual.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </section>
  );
}
