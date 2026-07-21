# Laboratory

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: OPERATIONAL
**Architecture**: Architecture C (Hybrid Investigation-Experiment Model)

---

## Overview

The Laboratory is the **scientific execution environment** for all KDE investigations. It validates approved knowledge through empirical testing, accumulates evidence, and provides feedback to the knowledge system.

### Mission Statement

> The Laboratory evaluates approved knowledge through reproducible experiments, accumulates empirical evidence, and reports findings to Governance for knowledge improvement.

---

## Entry Point

**For new sessions, start here:** [`BOOTSTRAP.md`](./BOOTSTRAP.md)

The BOOTSTRAP.md is the canonical entry point for all KDE sessions. It provides the Runtime initialization procedure and ensures consistent session startup.

---

## Architecture

The Laboratory operates under **Architecture C**: the official KDE Laboratory Architecture.

For detailed specification, see: [`ARCHITECTURE-C.md`](ARCHITECTURE-C.md)

### Architecture C Principles

| Principle | Description |
|-----------|-------------|
| **Ownership Separation** | Investigations own WHY, Experiments own HOW |
| **Bidirectional Links** | Complete traceability between artifacts |
| **Evidence with Experiment** | Evidence stored with experiments for reproducibility |
| **Knowledge Never in Laboratory** | Validated knowledge promoted to `/knowledge/` |

---

## Engine Authority

**The Laboratory executes experiments under a KDE Engine.**

The Laboratory does NOT define methodology. The Laboratory executes methodology defined by the **KDE Engine**.

### Engine Authority Rules

| Rule | Description |
|------|-------------|
| **Rule 1** | The Laboratory SHALL NOT define its own methodology |
| **Rule 2** | Every laboratory experiment SHALL execute under a KDE Engine |
| **Rule 3** | The Engine directory SHALL be the single authoritative source for laboratory methodology |
| **Rule 4** | Laboratory documents may reference an Engine but SHALL NOT redefine Engine behavior |
| **Rule 5** | Future methodology improvements SHALL be implemented by creating a NEW Engine |
| **Rule 6** | Historical experiments SHALL permanently reference the Engine under which they were executed |
| **Rule 7** | Experiments discover knowledge. Engines discover better methodologies. |

### Authority Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      ENGINE AUTHORITY                         │
└─────────────────────────────────────────────────────────────┘

   ┌──────────────────────────────────────────────────────┐
   │                   KDE ENGINE                          │
   │                                                      │
   │  Defines methodology                                 │
   │  Sets experiment standards                           │
   │  Establishes validation requirements                 │
   └──────────────────────────┬───────────────────────────┘
                              │ Authoritative Source
                              ▼
   ┌──────────────────────────────────────────────────────┐
   │                   LABORATORY                         │
   │                                                      │
   │  Executes experiments                               │
   │  Collects evidence                                  │
   │  Reports findings                                   │
   │  Does NOT define methodology                        │
   └──────────────────────────────────────────────────────┘
```

---

## Current Engine

The Laboratory operates under:

| Field | Value |
|-------|-------|
| **Engine ID** | KDE-ENGINE-002 |
| **Version** | 0.1.0 |
| **Codename** | Beta |
| **Status** | Active |

For detailed methodology, see: [`/engines/beta/methodology.md`](../engines/beta/methodology.md)

> **Note:** For Runtime initialization, see [`BOOTSTRAP.md`](./BOOTSTRAP.md)

---

## Scientific Learning Loop

The Laboratory is part of KDE's continuous improvement cycle:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         KDE SCIENTIFIC LEARNING LOOP                         │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │    RESEARCH      │
                              │                  │
                              │ Discovers        │
                              │ Investigates      │
                              │ Proposes         │
                              └────────┬────────┘
                                       │ Creates knowledge
                                       ▼
                              ┌─────────────────┐
                              │    KNOWLEDGE     │
                              │                  │
                              │ Approved         │
                              │ definitions      │
                              │ Validated        │
                              └────────┬────────┘
                                       │ Tests
                                       ▼
                              ┌─────────────────┐
                              │   LABORATORY    │
                              │                  │
                              │ Validates        │
                              │ Reproduces       │
                              │ Observes         │
                              │ Reports          │
                              │ (under Engine)   │
                              └────────┬────────┘
                                       │ Generates evidence
                                       ▼
                              ┌─────────────────┐
                              │    EVIDENCE     │
                              │                  │
                              │ Accumulated      │
                              │ verified         │
                              │ linked           │
                              └────────┬────────┘
                                       │ Informs decisions
                                       ▼
                              ┌─────────────────┐
                              │   GOVERNANCE    │
                              │                  │
                              │ Reviews          │
                              │ Approves         │
                              │ Directs          │
                              └────────┬────────┘
                                       │ Identifies gaps
                                       ▼
                              ┌─────────────────┐
                              │    RESEARCH      │
                              │                  │
                              │ Investigates     │
                              │ new questions    │
                              └─────────────────┘
```

### Subsystem Responsibilities

| Subsystem | Responsibility | Authority |
|-----------|---------------|-----------|
| **Investigation** | Discovers knowledge through questions | Creates definitions |
| **Knowledge** | Stores approved knowledge | Serves as source of truth |
| **Laboratory** | Validates through experiments (under Engine) | Reports findings |
| **Evidence** | Accumulates verification data | Informs decisions |
| **Governance** | Oversees the system | Approves changes |
| **Engine** | Defines methodology | Sole authority for process |

### Ownership Boundaries

| Boundary | Description |
|----------|-------------|
| Investigation ↔ Laboratory | Investigation proposes; Laboratory tests |
| Laboratory ↔ Engine | Laboratory executes; Engine defines |
| Laboratory ↔ Knowledge | Laboratory never edits knowledge |
| Laboratory ↔ Governance | Laboratory recommends; Governance approves |
| Governance ↔ Investigation | Governance directs; Investigation investigates |
| Engine ↔ Governance | Engine proposes; Governance approves |

---

## Experiment Lifecycle

The Laboratory experiment lifecycle is defined by the Engine. See [`/engines/KDE-ENGINE-001/methodology.md`](../engines/KDE-ENGINE-001/methodology.md) for detailed methodology.

### Lifecycle Summary

```
HYPOTHESIS → EXPERIMENT DESIGN → EXECUTION → OBSERVATION → EVIDENCE → CONCLUSION
```

For full lifecycle details, consult the current Engine's methodology.

---

## Knowledge Assessment

The Laboratory produces assessments as defined by the Engine:

| Assessment | Meaning |
|------------|---------|
| **SUPPORTS** | Empirical evidence confirms the knowledge |
| **CONTRADICTS** | Empirical evidence challenges the knowledge |
| **INCONCLUSIVE** | Evidence is insufficient to support or contradict |

### Confidence

Confidence is **evidence-derived** as specified by the Engine.

---

## Governance Protocol

When experiments challenge knowledge, the Laboratory follows Engine-defined protocols:

```
1. Laboratory identifies pattern of CONTRADICTS
         │
         ▼
2. Laboratory assesses evidence quality
         │
         ▼
3. If thresholds met: Laboratory recommends Research Session
         │
         ▼
4. Governance reviews recommendation
         │
         ▼
5. Research Session opened (if approved)
```

**Only Governance can approve knowledge revision.**

---

## Directory Structure (Architecture C)

```
/laboratory/
├── README.md              # This document
├── ARCHITECTURE-C.md      # Architecture C specification
├── ARCHITECTURE.md        # Historical architecture documentation
├── GOVERNANCE.md          # Governance protocols
├── registry.md            # Experiment registry
│
├── questions/             # Question tracker
│   ├── README.md
│   └── index.md           # Master question list
│
├── investigations/         # Scientific ownership (WHY)
│   ├── INV-001/
│   │   ├── investigation.md   # Research question
│   │   ├── hypothesis.md      # Hypothesis
│   │   ├── analysis.md        # Analysis
│   │   ├── conclusion.md       # Conclusion
│   │   ├── lessons-learned.md  # Lessons
│   │   ├── index.md           # Experiment index
│   │   └── links/             # Links to experiments
│   │       └── LAB-001.md
│   ├── INV-002/
│   │   └── ...
│   └── INV-NNN/
│
├── experiments/           # Execution ownership (HOW)
│   ├── LAB-001/
│   │   ├── experiment.md  # Experiment plan
│   │   ├── TRACKER.md      # Experiment tracking
│   │   ├── runs/          # Execution runs
│   │   ├── evidence/      # Experiment evidence
│   │   ├── statistics/    # Statistical analysis
│   │   ├── synthesis/     # Cross-run synthesis
│   │   └── metadata/      # Investigation links
│   ├── LAB-002/
│   └── LAB-NNN/
│
├── evidence/              # Evidence registry (links)
│   └── LAB-XXX/
│       └── index.md
│
├── templates/             # Document templates
│   ├── investigation-template.md
│   ├── experiment-template.md
│   ├── run-template.md
│   └── evidence-reference-template.md
│
└── governance/             # Governance documents
    └── promotion-rules.md
```

For full Architecture C specification, see [`ARCHITECTURE-C.md`](ARCHITECTURE-C.md).

---

## Engine Selection

The Laboratory is **engine-agnostic**. It can execute experiments under any KDE Engine that implements the standard interface.

### Available Engines

| Engine ID | Version | Codename | Status | Purpose |
|-----------|---------|----------|--------|---------|
| **KDE-ENGINE-002** | 0.1.0 | Beta | Active | Contextual knowledge discovery |
| KDE-ENGINE-001 | 0.1.0 | Alpha | Historical | Pattern discovery (legacy) |

### Engine Selection for Experiments

When creating a new experiment, select the appropriate engine:

**Use Beta (KDE-ENGINE-002)** when:
- Context detection is required
- Boundary definition is important
- Statistical validation is mandatory
- Complete knowledge objects needed

**Use Alpha (KDE-ENGINE-001)** when:
- Legacy compatibility required
- Simple pattern discovery sufficient
- Historical comparison needed

### Engine Configuration

Experiments specify their engine in the metadata:

```yaml
Engine:
  ID: KDE-ENGINE-002
  Version: 0.1.0
  Codename: Beta
```

---

## Laboratory Engine Interface

The Laboratory loads engines through a standard interface:

```yaml
interface:
  Initialize():
    - Load engine configuration
    - Initialize modules
    - Verify prerequisites
  
  Analyze(evidence):
    - Execute engine pipeline
    - Return knowledge objects
  
  Validate(knowledge):
    - Verify completeness
    - Check statistics
    - Confirm context and boundaries
  
  GenerateKnowledge():
    - Create knowledge from pipeline
  
  GenerateReport():
    - Format for consumption
  
  Capabilities():
    - Return supported features
  
  Version():
    - Return engine version
  
  Metadata():
    - Return engine identity
```

See: [`/engines/interface.md`](../engines/interface.md)

---

## Status

**OPERATIONAL (Architecture C v1.0.0)** - Laboratory operates under Architecture C v1.0.0, the official KDE Laboratory Architecture.

### Architecture C Version

| Version | Date | Status | Evidence Level |
|---------|------|--------|----------------|
| 1.0.0 | 2026-07-20 | FROZEN (Production) | Level 3 |

### Architecture C Documents

| Document | Purpose |
|----------|---------|
| [`ARCHITECTURE-C.md`](ARCHITECTURE-C.md) | Architecture specification |
| [`VERSION.md`](VERSION.md) | Version management |
| [`CHANGELOG.md`](CHANGELOG.md) | Change history |
| [`REFERENCE-IMPLEMENTATION.md`](REFERENCE-IMPLEMENTATION.md) | Canonical implementation |
| [`governance/promotion-rules.md`](governance/promotion-rules.md) | Promotion criteria |

### Architecture C Validation

Architecture C was validated through rigorous scientific process:

| Experiment | Purpose | Result |
|------------|---------|--------|
| LAB-020 | Architecture Synthesis | Architecture C synthesized |
| LAB-021 | Predictive Validation | 85.7% prediction accuracy |
| LAB-022 | Multi-Run Validation | Mean 9.36/10, 100% agreement |
| LAB-023 | Cross-Engine Reproducibility | Level 3 Reproducible |

**Evidence Level**: Level 3 — Reproducible Knowledge

See [`ARCHITECTURE-C.md`](ARCHITECTURE-C.md) for full validation evidence.
