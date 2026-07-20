# Knowledge Discovery Engine (KDE) Research

## Overview

This repository contains research aimed at defining **Knowledge Discovery Engine**.

Our fundamental question is:

> **"What must we understand before we can define Knowledge Discovery Engine?"**

This is a research-first initiative. We do not know what KDE will become. This roadmap helps us find out.

## Getting Started

**For new sessions, start here:** [`laboratory/BOOTSTRAP.md`](./laboratory/BOOTSTRAP.md)

The BOOTSTRAP.md is the canonical entry point for all KDE sessions. It provides the Runtime initialization procedure and ensures consistent session startup across all experiments and investigations.

## Canonical Architecture

KDE follows a five-directory canonical structure representing the scientific foundation:

```
kde/
├── seeds/           # Immutable reasoning DNA
├── engines/        # Methodology implementations
├── laboratory/     # Scientific workflow (questions, experiments, evidence)
├── knowledge/      # Validated knowledge
└── governance/      # Repository governance
```

## Repository Structure

```
/kde/
├── /seeds/           # Immutable reasoning artifacts
│   ├── seed-001/    # Genesis seed (frozen)
│   └── seed-002/    # Evolution seed (frozen)
├── /engines/         # Methodology implementations
│   ├── alpha/       # KDE-ENGINE-001 (historical)
│   ├── beta/        # KDE-ENGINE-002 (active)
│   ├── gamma/       # KDE-ENGINE-003 (experimental)
│   └── delta/       # KDE-ENGINE-004 (candidate)
├── /knowledge/       # Validated concepts
├── /governance/      # Repository rules and standards
└── /laboratory/     # Scientific workflow
    ├── BOOTSTRAP.md       # Session entry point (NEW)
    ├── LABORATORY-RULES.md # Runtime initialization (NEW)
    ├── questions/   # Research questions tracker
    ├── investigations/  # Investigation-centric organization
    ├── experiments/  # Laboratory experiments
    └── evidence/    # Collected evidence
```

## Research Questions

Research is organized into four tiers and conducted within the Laboratory:

| Tier | Questions | Status |
|------|-----------|--------|
| **Tier 1: Foundational** | What is Knowledge? What is Evidence? What is Ambiguity? | Pending |
| **Tier 2: Relational** | What is Context? What is Authority? | Pending |
| **Tier 3: Engineering** | What is Engineering? What is an Engineering Subject? What is a Methodology? | Pending |
| **Tier 4: Process** | How does knowledge become validated? How should knowledge evolve? | Pending |

## Scientific Lifecycle

KDE follows a complete scientific lifecycle:

```
Seed (Immutable Reasoning DNA)
    ↓
Engine (Methodology Implementation)
    ↓
Investigation (Question → Hypothesis → Experiment Plan)
    ↓
Experiments (LAB-XXX under Engine)
    ↓
Evidence (Empirical Data)
    ↓
Analysis (Pattern Recognition)
    ↓
Conclusion (Validated Knowledge)
    ↓
Knowledge (Promoted Definitions)
    ↓
Lessons Learned (Seed Evolution)
```

## How to Contribute

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on participating in this research.

## Simplicity Principles

- **Do not speculate** - If we don't know, say so
- **Do not over-engineer** - Simple structure, simple process
- **Do not assume** - Every concept must be researched, not assumed
- **Do not rush** - Understanding takes time
- **Document the unknown** - Future research is a valid output