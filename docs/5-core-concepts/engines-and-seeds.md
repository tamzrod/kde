# Engines and Seeds

**Purpose**: KDE's reasoning components
**Audience**: All readers

---

## Overview

KDE uses two complementary components for reasoning:

- **Engines**: Methodologies for conducting investigations
- **Seeds**: Foundational principles that guide reasoning

Engines and Seeds work together. Engines provide the methodology; Seeds provide the principles.

---

## Engines

### What is an Engine?

An Engine is a reasoning methodology implementation. It defines how investigations are conducted.

### Engine Properties

| Property | Description |
|----------|-------------|
| **ID** | Unique identifier (e.g., KDE-ENGINE-001) |
| **Codename** | Human-readable name (Alpha, Beta, Gamma, Delta) |
| **Status** | Active, Historical, or Experimental |
| **Capabilities** | Reasoning, Analysis, Synthesis, etc. |

### Available Engines

| ID | Codename | Status | Purpose |
|----|----------|--------|---------|
| KDE-ENGINE-001 | Alpha | Historical | Pattern discovery |
| KDE-ENGINE-002 | Beta | Active | Contextual knowledge |
| KDE-ENGINE-003 | Gamma | Active | Causal discovery |
| KDE-ENGINE-004 | Delta | Active | Bootstrap + Context |

### Engine Selection

KDE automatically selects the appropriate Engine based on:

- Problem characteristics
- Required capabilities
- Human-specified preferences

---

## Seeds

### What is a Seed?

A Seed contains immutable foundational principles that guide all reasoning.

### Seed Properties

| Property | Description |
|----------|-------------|
| **ID** | Unique identifier (e.g., SEED-001) |
| **Codename** | Thematic name (Genesis, Evolution) |
| **Status** | Frozen or Active |
| **Principles** | Core operational rules |

### Available Seeds

| ID | Codename | Status | Purpose |
|----|----------|--------|---------|
| SEED-001 | Genesis | Frozen | Scientific loop, evidence model |
| SEED-002 | Evolution | Frozen | Reasoning, validation |

### Seed Immutability

Seeds are frozen once created. They represent foundational truths that should not change.

> **Rule**: Seeds shall never be modified after creation.

---

## How They Work Together

```
     ┌─────────┐
     │  Human  │
     │ Request │
     └────┬────┘
          │
          ▼
     ┌─────────┐
     │   ECU   │ Orchestrates
     └────┬────┘
          │
    ┌─────┴─────┐
    ▼           ▼
┌───────┐  ┌───────┐
│Engine │  │ Seed  │
│   ↕   │  │   ↕   │
│Method │  │Princi│
└───────┘  └───────┘
    │           │
    └─────┬─────┘
          │
          ▼
     ┌─────────┐
     │Investi- │ Result
     │ gation  │
     └─────────┘
```

---

## Engine Characteristics

### Pattern Discovery (Alpha)

**Focus**: Identifying recurring patterns in data

**Strengths**:
- Finds relationships
- Identifies themes
- Surfaces anomalies

**Best for**: Initial exploration

### Contextual Knowledge (Beta)

**Focus**: Understanding meaning within context

**Strengths**:
- Interprets nuance
- Considers circumstances
- Provides depth

**Best for**: Understanding significance

### Causal Discovery (Gamma)

**Focus**: Understanding cause and effect

**Strengths**:
- Identifies root causes
- Traces dependencies
- Predicts outcomes

**Best for**: Finding why things happen

### Bootstrap + Context (Delta)

**Focus**: Methodological rigor with context

**Strengths**:
- Systematic approach
- Bootstrapped validation
- Context awareness

**Best for**: Comprehensive investigation

---

## Scientific Loop

All Engines follow the scientific loop:

```
    ┌─────────────┐
    │  OBSERVE    │ ← Gather data
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │ HYPOTHESIZE │ ← Form hypothesis
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │   PREDICT    │ ← Predict outcomes
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │    TEST      │ ← Validate hypothesis
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │   ANALYZE   │ ← Interpret results
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │  ITERATE?   │ ← Continue or conclude
    └─────────────┘
```

---

## See Also

- [ECU](ecu.md) - Orchestration
- [Laboratory](laboratory.md) - Investigation workspace
- [Processes](../6-how-it-works/processes.md) - Investigation workflow
