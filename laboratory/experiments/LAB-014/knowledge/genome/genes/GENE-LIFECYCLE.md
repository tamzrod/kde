# Gene Lifecycle

**Document**: GENE-LIFECYCLE.md
**Genome Version**: 1.0
**Date**: 2026-07-19

---

## Overview

Every Gene follows a defined lifecycle from creation to retirement. This document defines the lifecycle states, transitions, and governance requirements.

---

## Lifecycle States

| State | Description | Entry Criteria |
|-------|-------------|----------------|
| **HYPOTHESIS** | Proposed but not synthesized | Derived from existing genes |
| **EXPERIMENTAL** | Synthesized, limited validation | ≥1 supporting experiment |
| **DOMAIN_ADAPTER** | Validated in multiple domains | ≥3 supporting experiments |
| **STABLE_CORE** | Validated universally | ≥4 diverse domains, no contradictions |
| **DEPRECATED** | Superseded or invalidated | Replaced by better gene |
| **REJECTED** | Cannot be synthesized | No evidence, contradictions present |

---

## State Transitions

```
HYPOTHESIS
    │
    │ Synthesis in experiment
    ▼
EXPERIMENTAL
    │
    │ Additional validation
    ▼
DOMAIN_ADAPTER ──────────► STABLE_CORE
    │                           │
    │ Insufficient validation    │ Universality lost
    ▼                           ▼
DEPRECATED ◄────────────── DEPRECATED
    │
    │ No contradictions
    ▼
REJECTED
```

---

## Transition Criteria

### HYPOTHESIS → EXPERIMENTAL

**Trigger**: Gene synthesized in experiment
**Required**:
- ≥1 supporting experiment
- ≥1 evidence reference
- Canonical statement defined

### EXPERIMENTAL → DOMAIN_ADAPTER

**Trigger**: Additional validation
**Required**:
- ≥3 supporting experiments
- Evidence of domain-specific behavior
- No contradicting experiments

### DOMAIN_ADAPTER → STABLE_CORE

**Trigger**: Universality validated
**Required**:
- ≥4 diverse domains tested
- No contradicting experiments
- HIGH confidence

### Any → DEPRECATED

**Trigger**: Superseded or invalidated
**Required**:
- Better gene available (superseded)
- Contradicting evidence > supporting (invalidated)
- Governance approval

### Any → REJECTED

**Trigger**: Cannot be validated
**Required**:
- No supporting evidence
- Contradicting evidence present
- Governance approval

---

## Governance Transitions

| Transition | Governance Required | Authority |
|------------|-------------------|-----------|
| HYPOTHESIS → EXPERIMENTAL | No | Laboratory |
| EXPERIMENTAL → DOMAIN_ADAPTER | No | Laboratory |
| DOMAIN_ADAPTER → STABLE_CORE | YES | Governance Body |
| Any → DEPRECATED | YES | Governance Body |
| Any → REJECTED | YES | Governance Body |

---

## Lifecycle Events

### Gene Creation

1. Laboratory synthesizes gene in experiment
2. Initial classification assigned
3. Evidence references documented
4. Registry updated
5. Provenance chain established

### Gene Mutation

When a gene is refined:
1. New gene created with incremented version
2. Mutation history recorded
3. Predecessor relationship established
4. Predecessor marked as SUPERSEDED
5. Registry updated

### Gene Retirement

When a gene is deprecated:
1. Governance review conducted
2. Retirement reason documented
3. Successor gene identified
4. Status changed to DEPRECATED
5. Historical record preserved
6. Registry updated

---

## Immutability Rules

1. **Canonical Statement**: NEVER changed after creation
2. **Origin**: NEVER changed after creation
3. **Evidence References**: NEVER removed, only added
4. **Mutation History**: NEVER modified, only appended

---

## Versioning

### Version Number Format

`MAJOR.MINOR.PATCH`

| Component | Increment Trigger |
|-----------|-------------------|
| MAJOR | Classification change |
| MINOR | Confidence change |
| PATCH | Evidence added, documentation |

### Current Format

For simplicity, Genome v1.0 uses single integer versioning.

---

## Validation Requirements

Every state transition requires validation:

| Transition | Validation |
|------------|------------|
| Creation | Evidence exists |
| Promotion | Criteria met |
| Demotion | Criteria not met |
| Retirement | Governance approval |

---

## Registry Updates

On any lifecycle event:
1. Update GENE-REGISTRY.md
2. Update affected gene file
3. Record in GENOME-CHANGELOG.md
4. Update relationships if needed

---

## Examples

### Example 1: Gene Promotion

```
GENE-XXXX (EXPERIMENTAL)
├── Supporting Experiments: [LAB-011, LAB-012, LAB-013]
├── Confidence: MEDIUM
└── Classification: EXPERIMENTAL

After validation:
GENE-XXXX (DOMAIN_ADAPTER)
├── Supporting Experiments: [LAB-011, LAB-012, LAB-013, LAB-014]
├── Confidence: HIGH
└── Classification: DOMAIN_ADAPTER
```

### Example 2: Gene Mutation

```
GENE-0006 (v1, original)
├── Canonical: "≥10 → HIGH"
├── Status: SUPERSEDED
└── Note: Refined by GENE-0006v2

GENE-0006 (v2, refined)
├── Canonical: "Domain-dependent thresholds"
├── Status: ACTIVE
├── Parents: [GENE-0006v1]
├── Mutation Type: REFINEMENT
└── Note: Original statement preserved
```

### Example 3: Gene Deprecation

```
GENE-SYN-METH-004 (original)
├── Canonical: "≥10 → HIGH"
├── Confidence: LOW (contradicted)
├── Status: DEPRECATED
├── Deprecated: 2026-07-19
├── Reason: Contradicted by LAB-012
└── Successor: GENE-0006
```

---

## Current Lifecycle Status

| Gene | Classification | Status | Version |
|------|----------------|--------|---------|
| GENE-0001 | STABLE_CORE | ACTIVE | 1 |
| GENE-0002 | STABLE_CORE | ACTIVE | 1 |
| GENE-0003 | STABLE_CORE | ACTIVE | 1 |
| GENE-0004 | STABLE_CORE | ACTIVE | 1 |
| GENE-0005 | STABLE_CORE | ACTIVE | 1 |
| GENE-0006 | DOMAIN_ADAPTER | ACTIVE | 1 |
| GENE-0007 | DOMAIN_ADAPTER | ACTIVE | 1 |
| GENE-0008 | EXPERIMENTAL | ACTIVE | 1 |
| GENE-0009 | STABLE_CORE | ACTIVE | 1 |

---

## Governance Integration

### Approval Authority

| Action | Authority | Process |
|--------|-----------|---------|
| Gene Creation | Laboratory | Automatic on synthesis |
| STABLE_CORE Promotion | Governance | Review + approval |
| DEPRECATION | Governance | Review + approval |
| REJECTION | Governance | Review + approval |

### Review Triggers

1. **Automatic Review**: When EXPERIMENTAL gene has ≥4 supporting experiments
2. **Contradiction Review**: When contradicting evidence exceeds supporting
3. **Scheduled Review**: Annual review of all genes

---

## Last Updated

**Date**: 2026-07-19
**Updated By**: LAB-014 (Genome Formation)
