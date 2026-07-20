# KDE-ARCH-003: Artifact Lifecycle

**Knowledge ID**: KDE-ARCH-003
**Title**: Lifecycle States and Transitions for KDE Artifacts
**Version**: 1.0.0
**Status**: ESTABLISHED
**Evidence Level**: Level 3 — Reproducible
**Created**: 2026-07-20T14:00:00Z
**Last Validated**: 2026-07-20T14:00:00Z

---

## Definition

Every KDE artifact progresses through defined lifecycle states. Transitions occur based on evidence and governance decisions.

## Investigation Lifecycle

```
QUESTION CREATED
       │
       ▼
INVESTIGATION CREATED (ACTIVE)
       │
       ▼
HYPOTHESIS DEFINED
       │
       ▼
EXPERIMENTS LINKED
       │
       ▼
INVESTIGATION ACTIVE
       │
       ├──► CONCLUSIONS REACHED ──► KNOWLEDGE PROMOTION
       │
       └──► GAPS IDENTIFIED ──► NEW EXPERIMENTS
```

### Investigation States

| State | Description | Valid Transitions |
|-------|-------------|------------------|
| ACTIVE | Investigation in progress | COMPLETE |
| COMPLETE | Investigation concluded | PROMOTED |
| PROMOTED | Knowledge promoted to /knowledge/ | (Terminal) |

## Experiment Lifecycle

```
EXPERIMENT DESIGNED (DRAFT)
       │
       ▼
EXPERIMENT APPROVED (ACTIVE)
       │
       ▼
RUNS EXECUTED
       │
       ▼
STATISTICS GENERATED
       │
       ▼
SYNTHESIS CREATED
       │
       ▼
RECOMMENDATION MADE
       │
       ├──► SUPPORTS ──► EVIDENCE ACCUMULATED (COMPLETE)
       ├──► CONTRADICTS ──► GOVERNANCE REVIEW (FAILED)
       └──► INCONCLUSIVE ──► NEW EXPERIMENTS
```

### Experiment States

| State | Description | Valid Transitions |
|-------|-------------|------------------|
| DRAFT | Experiment designed | ACTIVE |
| ACTIVE | Experiment executing | COMPLETE, FAILED |
| COMPLETE | All runs finished | (Terminal) |
| FAILED | Experiment failed | (Terminal) |

## Run Lifecycle

```
RUN DESIGNED (PENDING)
       │
       ▼
RUN APPROVED (IN_PROGRESS)
       │
       ▼
RUN EXECUTED
       │
       ▼
RUN COMPLETED
```

### Run States

| State | Description | Valid Transitions |
|-------|-------------|------------------|
| PENDING | Run awaiting execution | IN_PROGRESS |
| IN_PROGRESS | Run executing | COMPLETE, FAILED |
| COMPLETE | Run finished successfully | (Terminal) |
| FAILED | Run failed | (Terminal) |

---

## Knowledge Maturity Levels

| Level | Name | Description | Requirements |
|-------|------|-------------|--------------|
| 1 | Experimental | Single successful execution | 1 run |
| 2 | Repeatable | Multiple runs under same Seed/Engine | 10+ runs |
| 3 | Reproducible | Different methodologies converge | 60+ runs |
| 4 | Generalized | Holds across domains | Domain validation |
| 5 | Established | No contradictory evidence | Sustained validation |

---

## Supporting Experiments

| Experiment | Purpose | Result |
|------------|---------|--------|
| LAB-022 | Multi-Run Validation | Lifecycle model validated |
| LAB-023 | Cross-Engine Reproducibility | Maturity levels validated |

---

## Dependencies

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-002: Ownership Principles

---

## Related Knowledge

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-008: Knowledge Promotion Rules

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial established knowledge |

---

## Reference

- Architecture: [`laboratory/ARCHITECTURE-C.md`](../laboratory/ARCHITECTURE-C.md)
- Governance: [`laboratory/governance/promotion-rules.md`](../laboratory/governance/promotion-rules.md)
