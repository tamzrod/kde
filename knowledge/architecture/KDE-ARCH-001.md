# KDE-ARCH-001: Architecture C Specification

**Knowledge ID**: KDE-ARCH-001
**Title**: Architecture C: Hybrid Investigation-Experiment Model
**Version**: 1.0.0
**Status**: ESTABLISHED
**Evidence Level**: Level 3 — Reproducible
**Created**: 2026-07-20T14:00:00Z
**Last Validated**: 2026-07-20T14:00:00Z

---

## Definition

Architecture C is the official KDE Laboratory architecture that establishes a hybrid model combining investigation-centric organization (for scientific purpose) with experiment-centric organization (for reproducibility).

## Core Principles

### Ownership Separation

| Artifact Type | Owns | Organization Principle |
|---------------|------|----------------------|
| Investigation | Scientific purpose (WHY) | Question-driven |
| Experiment | Execution (HOW) | Self-contained |
| Evidence | Verification | Belongs to experiment |
| Knowledge | Validated truth | Never in Laboratory |

### Bidirectional Links

Every investigation links to its experiments.
Every experiment links to its investigation.

### Evidence Storage

Evidence is stored with experiments to ensure reproducibility.

### Knowledge Separation

Knowledge is never stored in Laboratory. Validated knowledge is promoted to the Knowledge subsystem.

---

## Directory Structure

```
laboratory/
├── investigations/         # Scientific ownership (WHY)
│   └── INV-XXX/
│       ├── investigation.md
│       └── links/           # Links to experiments
├── experiments/             # Execution ownership (HOW)
│   └── LAB-XXX/
│       ├── experiment.md
│       ├── runs/
│       ├── evidence/
│       └── metadata/        # Links to investigation
└── governance/             # Policies
```

---

## Supporting Experiments

| Experiment | Purpose | Result |
|------------|---------|--------|
| LAB-020 | Architecture Synthesis | Architecture C identified |
| LAB-021 | Predictive Validation | 85.7% accuracy |
| LAB-022 | Multi-Run Validation | 100% agreement |
| LAB-023 | Cross-Engine Reproducibility | Level 3 Reproducible |

---

## Dependencies

None

---

## Related Knowledge

- KDE-ARCH-002: Ownership Principles
- KDE-ARCH-003: Artifact Lifecycle
- KDE-ARCH-004: Scientific Workflow
- KDE-ARCH-005: Traceability Model
- KDE-ARCH-006: Metadata Standard
- KDE-ARCH-007: Timestamp Standard
- KDE-ARCH-008: Knowledge Promotion Rules

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial established knowledge |

---

## Governance Authority

Architecture is governed by evidence (KDE-GOV-005).

Production Architecture is immutable (KDE-GOV-009).

Changes require Laboratory investigation and validation.

---

## Reference

- Laboratory: [`laboratory/ARCHITECTURE-C.md`](../laboratory/ARCHITECTURE-C.md)
- Version: [`laboratory/VERSION.md`](../laboratory/VERSION.md)
