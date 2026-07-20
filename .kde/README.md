# KDE Root Directory

**Directory**: `.kde/`
**Purpose**: Root directory for the KDE knowledge system

---

## Overview

This directory contains the complete KDE knowledge architecture:

- **Seeds**: Immutable reasoning DNA
- **Engines**: Methodology implementations
- **Laboratory**: Experiment execution
- **Governance**: Decision and approval processes
- **Knowledge**: Validated knowledge base

---

## Directory Structure

```
.kde/
├── README.md              # This file
│
├── seeds/                 # Seed Architecture
│   ├── README.md          # Seeds overview
│   └── seed-001/          # Seed-001: Genesis
│       ├── seed.yaml      # Seed manifest
│       ├── README.md      # Seed documentation
│       ├── WHAT-IS-A-SEED.md
│       ├── WHEN-TO-CREATE.md
│       ├── NEVER-MODIFY.md
│       ├── principles/    # 5 Core Principles
│       ├── scientific-loop/ # Learning Loop
│       ├── evidence-model/
│       ├── knowledge-model/
│       ├── confidence-model/
│       └── ambiguity/
│
├── engines/               # Engine Implementations
│   ├── alpha/             # KDE-ENGINE-001
│   ├── beta/              # KDE-ENGINE-002
│   └── gamma/             # KDE-ENGINE-003
│
├── laboratory/           # [Existing - no changes]
├── governance/            # [Existing - no changes]
├── knowledge/             # [Existing - no changes]
├── research/              # [Existing - no changes]
└── meetings/              # [Existing - no changes]
```

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    K D E                                  │
└─────────────────────────────────────────────────────────┘

                          │
                          ▼
               ┌─────────────────────┐
               │        Seed          │
               │                     │
               │ Immutable reasoning │
               │     foundation      │
               │                     │
               │   SEED-001: Genesis│
               │    [FROZEN]        │
               └──────────┬──────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │       Engine        │
               │                     │
               │  Methodology        │
               │  Implementation    │
               │                     │
               │  KDE-ENGINE-XXX     │
               │    [Evolved]        │
               └──────────┬──────────┘
                          │
                          ▼
               ┌─────────────────────┐
               │     Laboratory      │
               │                     │
               │  Experiment         │
               │   Execution         │
               │                     │
               │    [Active]         │
               └─────────────────────┘
```

---

## Seed Architecture

### What is a Seed?

A **Seed** is the immutable, foundational layer containing KDE's reasoning DNA:
- Core principles
- Scientific learning loop
- Evidence model
- Knowledge model
- Confidence model
- Ambiguity handling

### Seed Status

| Seed ID | Version | Status |
|---------|---------|--------|
| SEED-001 | 1.0.0 | FROZEN |

### Future Seeds

If KDE reasoning fundamentally changes:
1. Create SEED-002
2. Never modify SEED-001
3. Future Seeds inherit from previous ones

---

## Engine Consumption

Engines consume Seeds:

```yaml
# Engine manifest
compatible_seeds:
  - SEED-001

consumes:
  - principles
  - scientific_loop
  - evidence_model
  - knowledge_model
  - confidence_model
  - ambiguity_handling
```

---

## Migration from Legacy Structure

### What Changed

The Seed Architecture introduces:
- `.kde/seeds/` directory
- `.kde/engines/` directory
- Clear separation of reasoning (Seed) from methodology (Engine)

### What Remained

- Laboratory structure unchanged
- Governance structure unchanged
- Knowledge structure unchanged
- Research structure unchanged
- All experiments unchanged

---

## Backward Compatibility

### Existing Experiments

All existing experiments remain valid:
- Experiments reference Engine version
- Engine references compatible Seed
- Seed is immutable
- Reproducibility preserved

### No Behavioral Changes

This migration:
- DOES NOT change behavior
- DOES NOT modify prompts
- DOES NOT change methodology
- DOES NOT affect experiments

---

## Related Documents

### Within KDE

- [.kde/seeds/README.md](./seeds/README.md) — Seeds overview
- [.kde/engines/](../engine/) — Engine implementations
- [laboratory/README.md](../laboratory/README.md) — Laboratory process
- [governance/README.md](../governance/README.md) — Governance

### External

- SEED-001 contains migrated foundational documents from:
  - /governance/PRINCIPLES.md
  - /laboratory/scientific-loop.md
  - /knowledge/*.md

---

## Version

| Field | Value |
|-------|-------|
| Architecture Version | 1.0 |
| Seed Architecture Introduced | 2026-07-20 |
| Status | ACTIVE |

---

**Status**: ARCHITECTURAL FOUNDATION
