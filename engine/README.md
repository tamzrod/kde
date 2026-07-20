# KDE Engine Framework

**Version**: 1.0
**Effective**: 2026-07-20

---

## Overview

The KDE Engine Framework establishes a formal versioning system for the Knowledge Discovery Engine methodology. This framework enables tracking which methodology version produced each experiment while preserving complete historical provenance.

---

## What is a KDE Engine?

A **KDE Engine** is a documented version of the Knowledge Discovery Engine methodology. It defines:

- The processes for knowledge discovery
- The rules for evidence collection
- The validation procedures
- The governance requirements
- The laboratory workflow

Each engine has a unique identity, version, and lifecycle status.

---

## Why Version Engines?

### Purpose

1. **Provenance Tracking**: Every experiment documents which engine produced it
2. **Methodology Evolution**: Enables understanding of how methodology changed over time
3. **Historical Preservation**: Experiments remain valid in their original methodology context
4. **Traceability**: Links experiments to their producing methodology

### Benefits

- Clear lineage from methodology to experiment to knowledge
- No ambiguity about which rules applied to which experiments
- Foundation for evaluating methodology effectiveness over time
- Enables comparison across methodology versions

---

## Engine Version vs Software Version

| Aspect | Engine Version | Software Version |
|--------|----------------|------------------|
| **Subject** | Methodology | Implementation |
| **Changes when** | Process rules change | Code changes |
| **Affects** | Experiments | Application |
| **Examples** | New validation rules | Bug fixes, features |

### Key Distinction

- **Engine Version**: Governs how experiments are conducted
- **Software Version**: Governs how tools are implemented

A software update does NOT require an engine version change. An engine version change does NOT require a software update.

---

## How Experiments Reference Engines

Every experiment includes engine metadata:

```yaml
Engine:
  ID: KDE-ENGINE-001
  Version: 0.1.0
  Codename: Alpha
```

This metadata appears in the experiment metadata section.

---

## Engine Evolution Philosophy

### Principles

1. **Immutability**: Historical experiments never change their engine reference
2. **Traceability**: Every experiment links to its producing engine
3. **Minimal Disruption**: Engine changes are infrequent and well-documented
4. **Backward Compatibility**: New engines don't invalidate old experiments

### Version Numbering

Engines use semantic versioning (MAJOR.MINOR.PATCH):

| Component | Description | When It Changes |
|-----------|-------------|-----------------|
| **MAJOR** | Breaking changes | Fundamental methodology changes |
| **MINOR** | Additive improvements | New requirements or processes |
| **PATCH** | Clarifications | Non-substantive improvements |

---

## Engine Lifecycle

| State | Description |
|-------|-------------|
| **Active** | Current methodology in use |
| **Historical** | Former methodology, experiments may reference it |
| **Deprecated** | Not recommended for new experiments |

---

## Directory Structure

```
engine/
├── README.md           # This file
├── current.md         # Points to active engine
├── KDE-ENGINE-001/    # First engine
│   ├── specification.md   # Engine identity and scope
│   ├── methodology.md    # Detailed methodology
│   ├── changes.md        # Version history
│   └── provenance.md     # Experiments produced
└── [future engines]/
```

---

## Related Documents

- [governance/ENGINE-VERSIONING.md](../governance/ENGINE-VERSIONING.md) — Engine versioning specification
- [governance/PRINCIPLES.md](../governance/PRINCIPLES.md) — Core KDE principles
- [governance/RESEARCH-METHODOLOGY.md](../governance/RESEARCH-METHODOLOGY.md) — Research methodology
- [laboratory/README.md](../laboratory/README.md) — Laboratory process

---

## Governance

This framework is governed by:

1. **Engine Versioning Specification** — Defines versioning rules
2. **Engine Specification** — Defines each engine's scope
3. **Experiment Registry** — Tracks engine assignments

Changes to this framework follow the governance process defined in `/governance`.

---

**Document Status**: APPROVED
