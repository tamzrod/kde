# Comparison Matrix: LAB-026 — KDE Artifact Comparison

**Investigation**: LAB-026
**Date**: 2026-07-21T12:10:00Z
**Status**: DRAFT

---

## Overview

Compare the "Method" concept proposed in LAB-025 with existing KDE artifacts to determine whether a new artifact type is justified.

---

## Artifact Definitions

### Method (Proposed by LAB-025)

> A reusable workflow that defines phases, roles, artifacts, and governance for establishing standards.

**Characteristics**:
- Defines workflow phases
- Specifies roles
- Produces artifacts
- Includes governance points
- Versioned and installable
- Reusable across artifact classes

### Knowledge

> Validated, provenance-tracked artifacts that record actionable understanding.

**Characteristics**:
- Definition, summary, evidence, provenance
- Document classes (Foundational, Architecture, Domain, Governance, Argumentation)
- Maturity levels (1-5)
- Owned by Governance

### Engine

> Methodology implementation that executes the scientific pipeline.

**Characteristics**:
- Implements specific methodology
- Has interface (Initialize, Analyze, Validate, etc.)
- Versioned independently
- Located in /engines/
- Executed by Laboratory

### Capability

> What an Engine can do (returned by Capabilities() method).

**Characteristics**:
- List of supported modules
- Supported dimensions
- Supported statistics
- Features enabled/disabled

### Governance

> Repository rules and standards.

**Characteristics**:
- Located in /governance/
- Defines standards
- Sets defaults
- Contains runtime configuration
- Documents state machines

### Runtime

> The execution environment for investigations.

**Characteristics**:
- Orchestrates sessions
- Loads Engines
- Applies defaults
- Manages state transitions

---

## Comparison Matrix

| Dimension | Method | Knowledge | Engine | Capability | Governance | Runtime |
|----------|--------|-----------|--------|------------|------------|---------|
| **Location** | Proposed: /laboratory/methods/ | /knowledge/ | /engines/ | Within Engine | /governance/ | /laboratory/ |
| **Versioned** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Installable** | Yes | N/A | Yes | Yes | Yes | Yes |
| **Executable** | No | No | Yes | N/A | No | Yes |
| **Reusable** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Defines workflow** | Yes | No | Partially | No | Partially | Yes |
| **Specifies roles** | Yes | No | No | No | Partially | Partially |
| **Produces artifacts** | Yes | No | No | No | No | No |
| **Governs artifacts** | Yes | No | No | No | Yes | Yes |
| **Can evolve** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Requires human approval** | Yes | Yes | No | N/A | Yes | No |
| **Authority source** | Laboratory Rules | Governance | Engine spec | Engine spec | SEED-001 | SEED-001 |

---

## Similarity Analysis

### Method vs Engine

| Aspect | Method | Engine | Similar? |
|--------|--------|--------|----------|
| Purpose | Define reusable process | Implement methodology | **Yes** |
| Versioned | Yes | Yes | Yes |
| Has lifecycle | Yes | Yes | Yes |
| Defines phases | Yes | Partially | **Partial** |
| Executable | No | Yes | **No** |
| Located in | /laboratory/methods/ | /engines/ | Different |

**Key Difference**: Methods are NOT executable; Engines ARE executable.

**Similarity**: Both define methodology/process.

---

### Method vs Knowledge

| Aspect | Method | Knowledge | Similar? |
|--------|--------|-----------|----------|
| Versioned | Yes | Yes | Yes |
| Owned | Governance | Governance | Yes |
| Has lifecycle | Yes | Yes | Yes |
| Definition | Workflow | Statement | **Different** |
| Evidence required | Yes | Yes | Yes |
| Confidence | Yes | Yes | Yes |
| Document class | N/A | Yes | **No** |

**Key Difference**: Methods define processes; Knowledge defines truths.

**Similarity**: Both are versioned, owned by Governance, and have lifecycle.

---

### Method vs Governance

| Aspect | Method | Governance | Similar? |
|--------|--------|------------|----------|
| Defines rules | Yes | Yes | Yes |
| Requires human approval | Yes | Yes | Yes |
| Authority source | Laboratory Rules | SEED-001 | **Partial** |
| Versioned | Yes | Yes | Yes |
| Located in | /laboratory/methods/ | /governance/ | Different |
| Artifact type | Workflow | Standards | **Different** |

**Key Difference**: Methods define workflows; Governance defines standards.

**Similarity**: Both require human approval and are versioned.

---

### Method vs Capability

| Aspect | Method | Capability | Similar? |
|--------|--------|------------|----------|
| Returned by | N/A | Engine.Capabilities() | Different |
| Versioned | Yes | Yes | Yes |
| Listable | Yes | Yes | Yes |
| Represents | Process | Features | **Different** |

**Key Difference**: Capabilities are features; Methods are processes.

**Similarity**: Both are versioned and can be listed.

---

## Overlap Analysis

### Where Method Overlaps with Existing Artifacts

| Artifact | Overlap | Evidence |
|----------|---------|----------|
| Engine | Process definition | engines/*/methodology.md |
| Knowledge | Governance specifications | knowledge/KDE-ARCH-*.md |
| Governance | Rule definitions | governance/*.md |
| Runtime | Workflow phases | laboratory/WORKFLOW.md |

### Method as Knowledge

**Evidence**: LAB-025's capability-specification.md could be stored in /knowledge/ as Architecture class:

- Has version
- Has definition
- Has required artifacts
- Has lifecycle
- Is owned by Governance

### Method as Engine Component

**Evidence**: engines/gamma/methodology.md defines:

- Workflow phases
- Roles
- Principles
- Lifecycle

### Method as Governance

**Evidence**: governance/LABORATORY-SOP.md defines:

- Standard operating procedures
- Required artifacts
- Governance points

---

## Ambiguity Identified

### Ambiguity 1: What does "Method" add?

The repository already has:
- Engine methodology (engines/*/methodology.md)
- Governance standards (governance/*.md)
- Knowledge specifications (knowledge/KDE-ARCH-*.md)
- Runtime workflow (laboratory/WORKFLOW.md)

**Question**: What does adding /laboratory/methods/ provide that these don't?

### Ambiguity 2: Method vs Engine methodology

Both define:
- Phases
- Roles
- Principles
- Workflow

**Difference**: Methods are not executable.

**Question**: Is a non-executable methodology a different artifact type?

### Ambiguity 3: Method vs Governance specification

Both:
- Define standards
- Require human approval
- Are versioned

**Difference**: Methods are workflows; Governance are rules.

**Question**: Is workflow a different concept from rules?

---

## Conclusion from Comparison

### What Method Most Resembles

| Artifact | Similarity Score | Rationale |
|----------|-----------------|-----------|
| **Engine methodology** | HIGH | Both define process, phases, roles |
| **Governance** | MEDIUM | Both require approval, versioned |
| **Knowledge** | LOW | Different purpose (truth vs process) |
| **Capability** | LOW | Different concept (features vs process) |
| **Runtime** | MEDIUM | Both orchestrate workflow |

### Key Distinction

**Method is most similar to Engine methodology** but with key differences:

| Aspect | Engine Methodology | Method |
|--------|-------------------|--------|
| Executable | Yes | No |
| Can generate Knowledge | Yes | No |
| Defined in | engines/*/methodology.md | methods/ |
| Scope | Scientific discovery | Governance workflow |

---

## Evidence Summary

| Evidence | Source | Finding |
|----------|--------|---------|
| engines/interface.md | Engine interface | Methods are interface functions |
| engines/gamma/methodology.md | Gamma methodology | Defines phases, roles, principles |
| governance/*.md | Governance docs | Defines standards, not workflows |
| knowledge/KDE-ARCH-*.md | Knowledge docs | Specifications exist in Knowledge |
| laboratory/WORKFLOW.md | Runtime | Defines investigation workflow |
| LAB-025 capability-specification.md | LAB-025 | Proposes new artifact type |
