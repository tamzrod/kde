# Architecture C: Hybrid Investigation-Experiment Model

**Document Version**: 1.0.0
**Date**: 2026-07-20T12:00:00Z
**Status**: OFFICIAL KDE LABORATORY ARCHITECTURE
**Evidence Level**: Level 3 — Reproducible

---

## Purpose

Architecture C defines the organizational structure for the KDE Laboratory. It establishes how investigations, experiments, evidence, and knowledge relate to each other while maintaining clear ownership boundaries.

---

## Design Philosophy

### Core Principle

Architecture C is built on a fundamental insight: **investigations and experiments serve different purposes** and should be organized accordingly.

| Artifact Type | Purpose | Organization Principle |
|---------------|---------|----------------------|
| Investigation | Scientific purpose (WHY) | Question-driven, purpose-focused |
| Experiment | Execution (HOW) | Self-contained, reproducible |
| Evidence | Verification | Belongs to experiment |
| Knowledge | Validated truth | Never stored in Laboratory |

### Ownership Separation

**Investigations own WHY** — Research questions, hypotheses, scope, and scientific purpose.

**Experiments own HOW** — Execution, methodology, runs, and evidence.

This separation enables both:
- Question-driven discovery (Investigation strength)
- Experiment reproducibility (Experiment strength)

---

## Ownership Model

### Questions

**Own**: Research intent

**Contain**:
- Research question
- Scope definition
- Related investigations

**Link to**: Investigations

### Investigations

**Own**: Scientific purpose

**Contain**:
- Research question (`investigation.md`)
- Hypothesis (`hypothesis.md`)
- Analysis (`analysis.md`)
- Conclusion (`conclusion.md`)
- Lessons learned (`lessons-learned.md`)
- Index of experiments (`index.md`)
- Links to experiments (`links/`)

**Link to**: Experiments (via `links/`)

### Experiments

**Own**: Execution

**Contain**:
- Experiment plan (`experiment.md`)
- Tracker (`TRACKER.md`)
- Runs (`runs/`)
- Evidence (`evidence/`)
- Statistics (`statistics/`)
- Synthesis (`synthesis/`)
- Recommendations (`recommendations/`)

**Link to**: Investigation (via metadata)

### Evidence

**Own**: Verification data

**Location**: Belongs to the experiment that produced it

**Principle**: Evidence is stored with experiments to ensure reproducibility

### Knowledge

**Never stored in Laboratory**

**Principle**: Validated knowledge SHALL be promoted to `/knowledge/`

### Governance

**Own**: Policies

**Contain**:
- Promotion rules
- Architecture decisions
- Version history

---

## Directory Structure

```
laboratory/
├── README.md                    # Laboratory overview
├── ARCHITECTURE-C.md           # This document
├── ARCHITECTURE.md             # Historical architecture documentation
├── GOVERNANCE.md               # Governance protocols
├── registry.md                 # Experiment registry
│
├── questions/                  # Question tracker
│   ├── README.md
│   └── index.md               # Master question list
│
├── investigations/             # Scientific ownership
│   ├── INV-001/
│   │   ├── investigation.md   # Research question and scope
│   │   ├── hypothesis.md      # Hypothesis (if defined)
│   │   ├── analysis.md        # Analysis
│   │   ├── conclusion.md      # Conclusion
│   │   ├── lessons-learned.md # Lessons
│   │   ├── index.md           # Experiment index
│   │   └── links/             # Links to experiments
│   │       ├── LAB-001.md
│   │       └── LAB-002.md
│   └── INV-002/
│       └── ...
│
├── experiments/                # Execution ownership
│   ├── LAB-001/
│   │   ├── experiment.md      # Experiment plan
│   │   ├── TRACKER.md         # Experiment tracking
│   │   ├── runs/              # Execution runs
│   │   │   ├── RUN-001/
│   │   │   │   ├── experiment.md
│   │   │   │   ├── analysis.md
│   │   │   │   ├── scorecard.md
│   │   │   │   ├── recommendation.md
│   │   │   │   └── metadata.yaml
│   │   │   └── RUN-002/
│   │   │       └── ...
│   │   ├── evidence/          # Experiment-specific evidence
│   │   │   └── references.md
│   │   ├── statistics/        # Statistical analysis
│   │   │   └── analysis.md
│   │   ├── synthesis/         # Cross-run synthesis
│   │   │   ├── summary.md
│   │   │   ├── patterns.md
│   │   │   ├── confidence.md
│   │   │   └── recommendation.md
│   │   └── metadata/
│   │       └── investigation.md  # Links to investigation
│   └── LAB-002/
│       └── ...
│
├── evidence/                   # Evidence registry (links only)
│   ├── LAB-001/
│   │   └── index.md           # Points to experiment evidence
│   └── LAB-002/
│       └── index.md
│
├── templates/                  # Document templates
│   ├── investigation-template.md
│   ├── experiment-template.md
│   ├── run-template.md
│   └── evidence-reference-template.md
│
└── governance/                # Governance documents
    ├── promotion-rules.md
    └── version-history.md
```

---

## Artifact Lifecycle

### Investigation Lifecycle

```
QUESTION CREATED
       │
       ▼
INVESTIGATION CREATED
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

### Experiment Lifecycle

```
EXPERIMENT DESIGNED
       │
       ▼
EXPERIMENT APPROVED
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
       ├──► SUPPORTS ──► EVIDENCE ACCUMULATED
       ├──► CONTRADICTS ──► GOVERNANCE REVIEW
       └──► INCONCLUSIVE ──► NEW EXPERIMENTS
```

---

## Traceability Model

### Bidirectional Links

Architecture C enforces bidirectional links:

| From | To | Link Type |
|------|-----|-----------|
| Question | Investigation | Owns |
| Investigation | Experiments | Links (`links/` directory) |
| Experiment | Investigation | Metadata |
| Run | Experiment | Owns |
| Evidence | Run | Owns |

### Traceability Rules

1. **Every question traces to an investigation**
2. **Every investigation links to its experiments**
3. **Every experiment links to its investigation**
4. **Every evidence traces to its experiment**
5. **Every experiment traces to its investigation's question**

### Traceability Example

```
Question: "What is Knowledge?"
    │
    └── Owns Investigation: INV-001
            │
            ├── Contains: investigation.md (question + hypothesis)
            │
            └── Links to Experiments:
                    ├── LAB-001/
                    ├── LAB-002/
                    └── LAB-003/
                            │
                            ├── Contains: experiment.md
                            ├── Contains: runs/RUN-001/
                            ├── Contains: evidence/
                            └── Metadata: investigation-id: INV-001
```

---

## Migration Notes

### From Architecture A/B to Architecture C

Architecture C supersedes:
- Architecture A (Investigation-Centric Model)
- Architecture B (Experiment-Centric Model)

### Migration Rules

1. **Do not modify historical experiment contents**
2. **Only relocate artifacts**
3. **Preserve IDs**
4. **Preserve timestamps**
5. **Preserve evidence**
6. **Preserve conclusions**
7. **Maintain complete traceability**

### Migration Phases

**Phase 1: Documentation**
- Create this Architecture C document
- Update Laboratory README.md
- Create governance documents

**Phase 2: Template Creation**
- Create investigation templates
- Update experiment templates
- Document link formats

**Phase 3: New Investigations**
- All new investigations use Architecture C
- Implement link protocols

**Phase 4: Historical Migration** (Future)
- Migrate existing investigations gradually
- Prioritize active investigations
- Preserve historical integrity

---

## Validation Evidence

Architecture C was validated through a rigorous scientific process:

### LAB-020: Architecture Synthesis

**Date**: 2026-07-20
**Method**: Theoretical evaluation of three architectures
**Result**: Architecture C synthesized as superior

### LAB-021: Predictive Validation

**Date**: 2026-07-20
**Method**: Empirical testing with 5 tasks
**Result**: 6/7 predictions validated (85.7% accuracy)

### LAB-022: Multi-Run Statistical Validation

**Date**: 2026-07-20
**Method**: 15 independent runs
**Result**: Mean 9.36/10, 100% agreement, HIGH confidence

### LAB-023: Cross-Engine Reproducibility

**Date**: 2026-07-20
**Method**: 60 runs across 2 Seeds × 3 Engines
**Result**: All configurations support Architecture C

### Evidence Summary

| Level | Criterion | Evidence |
|-------|-----------|----------|
| Level 1 | Experimental | LAB-020 synthesis |
| Level 2 | Repeatable | LAB-022 (15 runs, same Seed/Engine) |
| Level 3 | Reproducible | LAB-023 (60 runs, different configurations) |

**Current Status**: Level 3 — Reproducible Knowledge

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-20 | Initial official version | KDE Governance |

---

## Reference Experiments

- [LAB-020: Architecture Synthesis](../experiments/LAB-020/experiment.md)
- [LAB-021: Predictive Validation](../experiments/LAB-021/experiment.md)
- [LAB-022: Multi-Run Statistical Validation](../experiments/LAB-022/experiment.md)
- [LAB-023: Cross-Engine Reproducibility](../experiments/LAB-023/experiment.md)

---

## Status

**OFFICIAL KDE LABORATORY ARCHITECTURE**

Architecture C Version 1.0.0 is the **default laboratory architecture** for all future KDE investigations.

Future architectural changes SHALL occur through versioned architectural evolution, with evidence-based validation.

---

**Scientific Authority**: Evidence remains the highest authority.
