# Pipeline Responsibilities: LAB-033

**Analysis Date**: 2026-07-22
**Experiment**: LAB-033
**Status**: COMPLETE

---

## Pipeline Architecture

This document determines where each validation capability should execute within the KDE pipeline.

---

## Current Pipeline Stages

```
┌─────────────────────────────────────────────────────────────┐
│ STAGE 1: BOOTSTRAP                                         │
│  • Read BOOTSTRAP.md                                        │
│  • Acknowledge Laboratory Rules                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 2: KNOWLEDGE LOADING                                 │
│  • Load Runtime Configuration                               │
│  • Load Engine                                              │
│  • Load Seed                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 3: REASONING                                         │
│  • Engine executes investigation                            │
│  • Generate observations                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 4: EVIDENCE COLLECTION                              │
│  • Collect evidence artifacts                               │
│  • Store evidence with experiment                           │
│  • Generate checksums                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 5: ARTIFACT GENERATION                              │
│  • Generate experiment.md                                    │
│  • Generate analysis documents                              │
│  • Generate TRACKER.md                                      │
│  • Generate conclusions                                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 6: REPOSITORY REGISTRATION                          │
│  • Update registry.md                                      │
│  • Link experiment to investigation                         │
│  • Archive artifacts                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 7: PUBLICATION                                      │
│  • Mark investigation complete                              │
│  • Await human review                                      │
│  • Generate promotion proposals                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Proposed Pipeline with Validation

```
┌─────────────────────────────────────────────────────────────┐
│ STAGE 1: BOOTSTRAP                                         │
│  • Read BOOTSTRAP.md                                        │
│  • Acknowledge Laboratory Rules                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 2: KNOWLEDGE LOADING                                 │
│  • Load Runtime Configuration                               │
│  • Load Engine                                              │
│  • Load Seed                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 3: REASONING                                         │
│  • Engine executes investigation                            │
│  • Generate observations                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 4: EVIDENCE COLLECTION                              │
│  • Collect evidence artifacts                               │
│  • Store evidence with experiment                           │
│  • Generate checksums                                      │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ VALIDATION GATE 1 (Collection)                        │  │
│  │  • Metadata Validator                                │  │
│  │  • Provenance Validator (basic)                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 5: ARTIFACT GENERATION                              │
│  • Generate experiment.md                                    │
│  • Generate analysis documents                              │
│  • Generate TRACKER.md                                      │
│  • Generate conclusions                                     │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ VALIDATION GATE 2 (Generation)                       │  │
│  │  • Classification Validator                          │  │
│  │  • Confidence Validator (baseline)                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 6: VALIDATION STAGE (NEW)                           │
│  • Consistency Validator                                    │
│  • Cross-Artifact Validator                                │
│  • Runtime Rule Validator                                   │
│  • Report Validator                                        │
│  • Confidence Validator (full)                             │
│  • Provenance Validator (full)                            │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ VALIDATION GATE 3 (Pre-Registration)                  │  │
│  │  • All validators run                                  │  │
│  │  • Generate validation report                          │  │
│  │  • Block if ERROR, warn if WARNING                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 7: REPOSITORY REGISTRATION                          │
│  • Update registry.md                                      │
│  • Link experiment to investigation                         │
│  • Archive artifacts                                       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ VALIDATION GATE 4 (Registration)                      │  │
│  │  • Registry Validator                                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 8: PUBLICATION                                      │
│  • Mark investigation complete                              │
│  • Await human review                                      │
│  • Generate promotion proposals                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Capability Placement by Stage

### Stage 4: Evidence Collection

| Capability | Rationale |
|-----------|-----------|
| **Metadata Validator** | Validates artifact structure immediately upon creation |
| **Provenance Validator (basic)** | Checks for provenance field presence during collection |

**Trigger**: After each evidence artifact is created

**Execution Mode**: Synchronous, blocking on ERROR

---

### Stage 5: Artifact Generation

| Capability | Rationale |
|-----------|-----------|
| **Classification Validator** | Validates evidence type as artifacts are generated |
| **Confidence Validator (baseline)** | Checks confidence declarations as artifacts are created |

**Trigger**: After each artifact is generated

**Execution Mode**: Synchronous, blocking on ERROR

---

### Stage 6: Validation Stage (NEW)

| Capability | Rationale |
|-----------|-----------|
| **Consistency Validator** | Requires all artifacts to be complete |
| **Cross-Artifact Validator** | Requires all artifacts to be present |
| **Runtime Rule Validator** | Requires complete content for constraint checking |
| **Report Validator** | Requires complete reports for evidence support checking |
| **Confidence Validator (full)** | Requires provenance validation to complete first |
| **Provenance Validator (full)** | Requires complete evidence collection |

**Trigger**: After all artifact generation is complete

**Execution Mode**: Synchronous, blocking on ERROR

---

### Stage 7: Repository Registration

| Capability | Rationale |
|-----------|-----------|
| **Registry Validator** | Validates registry consistency before registration |

**Trigger**: Before registry update is committed

**Execution Mode**: Synchronous, blocking on ERROR

---

## Validation Gate Summary

| Gate | Stage | Validators | Blocking | Human Review |
|------|-------|-----------|----------|-------------|
| Gate 1 | Evidence Collection | Metadata, Provenance (basic) | ERROR | No |
| Gate 2 | Artifact Generation | Classification, Confidence (baseline) | ERROR | No |
| Gate 3 | Validation Stage | All remaining validators | ERROR | Optional |
| Gate 4 | Registration | Registry | ERROR | No |

---

## Validation Behavior

### On ERROR
- Pipeline execution is BLOCKED
- Error details logged to validation report
- Artifact is NOT committed to repository
- User receives error notification

### On WARNING
- Pipeline execution CONTINUES
- Warning details logged to validation report
- Artifact IS committed with warning
- Warning included in validation report for review

### On PASS
- Pipeline execution CONTINUES
- No blocking
- Pass confirmation logged

---

## Validation Report Artifacts

### Per-Gate Reports

| Gate | Report | Contents |
|------|--------|----------|
| Gate 1 | metadata-validation-{timestamp}.json | Missing/invalid metadata |
| Gate 1 | provenance-validation-{timestamp}.json | Provenance gaps |
| Gate 2 | classification-validation-{timestamp}.json | Type mismatches |
| Gate 2 | confidence-baseline-{timestamp}.json | Confidence constraint issues |
| Gate 3 | consistency-validation-{timestamp}.json | Internal contradictions |
| Gate 3 | cross-artifact-validation-{timestamp}.json | Cross-reference issues |
| Gate 3 | runtime-rules-validation-{timestamp}.json | Constraint violations |
| Gate 3 | report-validation-{timestamp}.json | Unsupported claims |
| Gate 3 | confidence-full-validation-{timestamp}.json | Full confidence assessment |
| Gate 3 | provenance-full-validation-{timestamp}.json | Complete provenance check |
| Gate 4 | registry-validation-{timestamp}.json | Registry consistency |

### Consolidated Report

| Report | Contents |
|--------|----------|
| validation-report-{experiment_id}-{timestamp}.json | All validations, summary, recommendations |

---

## Additional Pipeline Stages Considered

### Option: Pre-Bootstrap Validation
**Rejected**: Bootstrap is for initialization, not validation

### Option: Post-Publication Validation
**Rejected**: Too late; issues should be caught before publication

### Option: Continuous Validation
**Alternative**: Could add periodic validation during ACTIVE state

### Recommendation: Maintain Current 4-Gate Structure
- Matches natural pipeline boundaries
- Validates at appropriate points
- Avoids over-engineering

---

## Pipeline Stage Dependencies

```
BOOTSTRAP
    ↓
KNOWLEDGE LOADING
    ↓
REASONING
    ↓
EVIDENCE COLLECTION ───→ Gate 1 (Metadata, Provenance basic)
    ↓
ARTIFACT GENERATION ───→ Gate 2 (Classification, Confidence baseline)
    ↓
VALIDATION STAGE ──────→ Gate 3 (All remaining validators)
    ↓
REPOSITORY REGISTRATION ──→ Gate 4 (Registry)
    ↓
PUBLICATION
```

---

## Execution Order

### Gate 1 (Evidence Collection)
1. Metadata Validator
2. Provenance Validator (basic)

### Gate 2 (Artifact Generation)
1. Classification Validator
2. Confidence Validator (baseline)

### Gate 3 (Validation Stage)
1. Provenance Validator (full)
2. Consistency Validator
3. Cross-Artifact Validator
4. Runtime Rule Validator
5. Report Validator
6. Confidence Validator (full)

### Gate 4 (Registration)
1. Registry Validator

---

## Failure Handling

| Stage | On Failure | Action |
|-------|-----------|--------|
| Gate 1 | Block | Return to evidence collection, fix metadata |
| Gate 2 | Block | Return to artifact generation, fix classification |
| Gate 3 | Block | Return to artifact generation, fix issues |
| Gate 4 | Block | Return to registration, fix registry |

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
