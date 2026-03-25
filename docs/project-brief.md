# KG Paper Site Project Brief

## Project Goal

Build an interactive website that helps engineers understand three graph-related papers through the lens of our product:

- dynamic graph evolution
- graph-guided QA
- multi-turn reasoning

This site is not a generic paper summary site. Its purpose is to explain how these research patterns map to our enterprise knowledge management system.

## Product Context

Our team is developing a knowledge management system where users can write many small knowledge snippets.

The system can:

- transform those snippets into a Knowledge Graph
- visualize and manage the graph
- update the graph as knowledge changes
- support conversational QA on top of the graph
- support multi-step reasoning using the graph

Primary knowledge domains:

- internal company SOP documents
- semiconductor troubleshooting knowledge

The graph generation capability already exists. The website should focus on how the graph is used, how it evolves, and how it supports QA and reasoning.

## Core Narrative

The website should communicate one main idea:

> These three papers represent three core capabilities of a graph-centric knowledge system: graph evolution, graph-guided retrieval and QA, and graph-based multi-turn reasoning.

## Website Objectives

The website should help engineers answer these questions:

1. What does each paper do?
2. What problem is each paper trying to solve?
3. How are the three papers similar and different?
4. What practical effect do their methods have?
5. Which ideas are most relevant to our product?
6. What can go wrong in a graph-based system?

## Website Structure

Planned sitemap:

1. Home
2. Why Graph
3. Your System
4. Paper 1: Dynamic Graph Evolution
5. Paper 2: Multi-turn Graph-guided Decisions
6. Paper 3: Graph-guided Retrieval and QA
7. Unified Comparison
8. Interactive Demos
9. Failure Cases and Limitations
10. Product Implications

## Content Strategy

This site should not present the three papers as isolated summaries. It should use a unified comparison framework and map every paper back to our system.

The most important content areas are:

- product-oriented interpretation of each paper
- unified comparison framework
- interactive process simulation
- failure cases and limitations
- implications for SOP QA and semiconductor troubleshooting

## Unified Comparison Framework

Each paper should be compared using the same fields:

- core problem
- why traditional methods are insufficient
- role of the graph
- node and edge meaning
- how the graph is built
- how the graph is updated
- how the graph is queried or used for reasoning
- practical effect
- suitable use cases
- implications for our system
- failure modes
- implementation complexity

## Interactive Demo Plan

### Demo 1: Knowledge Update -> KG Evolution

Goal:

Show that when a knowledge snippet changes, the graph structure changes too.

Key interactions:

- edit a knowledge snippet
- compare before vs after
- highlight changed nodes and edges
- show which QA paths are affected

### Demo 2: Question -> Subgraph -> Answer

Goal:

Show how a question becomes a subgraph and then an answer.

Key interactions:

- input a question
- view seed retrieval
- view graph expansion
- view answer composition
- inspect evidence paths

### Demo 3: Symptom -> Reasoning Path -> Root Cause

Goal:

Show how multi-turn troubleshooting works as a state-updating graph process.

Key interactions:

- input an initial symptom
- answer follow-up questions
- observe hypothesis updates
- inspect reasoning path
- view final root cause and recommended actions

## Failure Cases and Limitations

This section is required. It should be treated as a core part of the product story, not as an appendix.

Key failure categories:

- extraction errors
- entity mismatch
- version conflict
- noisy graph expansion
- reasoning drift
- domain ambiguity

Each failure mode should include mitigation ideas such as:

- confidence scoring
- provenance tracing
- ontology and normalization
- versioned graph design
- subgraph pruning
- rollback and verification checkpoints

## Graph Schema Direction

We decided to use node types that reflect reasoning roles rather than object classes.

### Node Types

- `evidence`
- `hypothesis`
- `diagnostic_action`
- `root_cause`

Interpretation:

- `evidence`: observed symptom, alarm, measurement result, condition, document snippet
- `hypothesis`: candidate cause, intermediate inference, suspected failure point
- `diagnostic_action`: check step, verification step, action, corrective action
- `root_cause`: converged or high-confidence cause

This is important because the UI should show how the system reasons, not only what objects exist.

### Edge Types

Current working set:

- `NEXT_STEP`
- `CAUSES`
- `SUPPORTED_BY`
- `RESOLVED_BY`
- `LEADS_TO`

We should keep the first UI version limited to a small set of edge types so the graph remains readable.

## Example Troubleshooting Graph

Representative use case:

- Chamber Vacuum Error

Representative path:

- evidence: Alarm 01
- hypothesis: Dry Pump Failure
- hypothesis: Pump Power Module Failure
- diagnostic_action: Reset Power
- diagnostic_action: Check O-Ring
- root_cause: O-Ring Damage
- hypothesis: High Temperature

This example is already represented in the mock data file.

## Existing Project Assets

Current mock data file:

- `src/data/graph-paper-site.mock.ts`

This file contains:

- site metadata
- page content
- graph schema
- comparison content
- demo metadata
- example troubleshooting graph

## Development Direction

The next implementation phase should build the site inside this project folder, not in the workspace root.

Recommended next steps:

1. scaffold the frontend app structure
2. create page-level routes from the mock data
3. build reusable section components
4. render the example graph and demo views
5. implement comparison and failure-case views

## Design Principles

The site should feel like a product explanation tool, not a static documentation dump.

It should emphasize:

- structure over long prose
- visible reasoning paths
- graph state transitions
- evidence and provenance
- product relevance over academic completeness

## Success Criteria

The site is successful if an engineer can quickly understand:

- why graph matters for this product
- how the three papers map to product capabilities
- how graph update, QA, and reasoning differ
- what the likely risks and failure points are
- what design patterns are worth adopting
