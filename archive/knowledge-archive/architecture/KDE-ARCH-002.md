# KDE-ARCH-002: Ownership Principles

**Knowledge ID**: KDE-ARCH-002
**Title**: Single Ownership Rule and Artifact Ownership
**Version**: 1.0.0
**Status**: ESTABLISHED
**Evidence Level**: Level 3 — Reproducible
**Created**: 2026-07-20T14:00:00Z
**Last Validated**: 2026-07-20T14:00:00Z

---

## Definition

Every KDE artifact SHALL have exactly one owner. Ownership SHALL NEVER be duplicated. Relationships SHALL be represented through references rather than copied documents.

## Core Principles

### Single Ownership Rule (KDE-GOV-008)

| Principle | Description |
|-----------|-------------|
| One Owner | Every artifact has exactly one owner |
| No Duplication | Ownership is not shared |
| Reference Over Copy | Relationships use links, not copies |
| Clear Boundaries | Ownership boundaries are enforced |

### Artifact Ownership Matrix

| Artifact | Owner | Owned By |
|----------|-------|----------|
| Research Question | Investigation | Question subsystem |
| Investigation | Investigation | Investigation subsystem |
| Experiment | Experiment | Laboratory |
| Run | Experiment | Experiment |
| Evidence | Experiment | Experiment |
| Knowledge | Knowledge subsystem | Governance |

### Ownership Boundaries

| Boundary | Rule |
|----------|------|
| Investigation → Experiment | Investigation links to experiment |
| Experiment → Investigation | Experiment references investigation |
| Evidence → Run | Evidence belongs to experiment |
| Knowledge → Investigation | Knowledge references investigation |

---

## Supporting Experiments

| Experiment | Purpose | Result |
|------------|---------|--------|
| LAB-020 | Architecture Synthesis | Ownership model identified |
| LAB-021 | Predictive Validation | Clear ownership confirmed |
| LAB-022 | Multi-Run Validation | 100% ownership clarity |
| LAB-023 | Cross-Engine Reproducibility | Ownership rules validated |

---

## Dependencies

- KDE-ARCH-001: Architecture C Specification

---

## Related Knowledge

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-003: Artifact Lifecycle
- KDE-ARCH-005: Traceability Model
- KDE-ARCH-008: Knowledge Promotion Rules

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial established knowledge |

---

## Governance Authority

KDE-GOV-008: Single ownership rule is mandatory.

---

## Reference

- Architecture: [`laboratory/ARCHITECTURE-C.md`](../laboratory/ARCHITECTURE-C.md)
- Reference Implementation: [`laboratory/REFERENCE-IMPLEMENTATION.md`](../laboratory/REFERENCE-IMPLEMENTATION.md)
