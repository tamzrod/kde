# Runtime Architecture Recommendation: LAB-033

**Analysis Date**: 2026-07-22
**Experiment**: LAB-033
**Status**: COMPLETE

---

## Executive Summary

This document recommends the runtime capabilities required to implement evidence integrity validation in KDE. Based on gap analysis and capability matrix development, we recommend a staged validation pipeline with 9 validation capabilities.

---

## Required Capabilities Summary

| # | Capability | Mandatory | Deterministic | Block on Failure |
|---|-----------|-----------|--------------|-------------------|
| 1 | Evidence Classification Validator | YES | YES | WARNING |
| 2 | Provenance Validator | YES | YES | ERROR |
| 3 | Consistency Validator | YES | YES | ERROR |
| 4 | Cross-Artifact Validator | YES | YES | WARNING |
| 5 | Metadata Validator | YES | YES | ERROR |
| 6 | Confidence Validator | YES | YES | WARNING |
| 7 | Runtime Rule Validator | YES | YES | ERROR |
| 8 | Report Validator | NO | PARTIAL | WARNING |
| 9 | Registry Validator | YES | YES | ERROR |

---

## Capability Classification

### Mandatory Capabilities (Required)

These capabilities MUST be implemented to close the evidence integrity gap:

| Capability | Rationale |
|-----------|-----------|
| **Metadata Validator** | Ensures basic artifact structure |
| **Provenance Validator** | Required for reproducibility |
| **Consistency Validator** | Detected HIGH severity gap in LAB-031 |
| **Cross-Artifact Validator** | Ensures artifact coherence |
| **Confidence Validator** | Prevents unjustified confidence claims |
| **Runtime Rule Validator** | Enforces integrity constraints |
| **Registry Validator** | Maintains repository consistency |

### Optional Capabilities (Recommended)

These capabilities enhance validation but are not strictly required:

| Capability | Rationale |
|-----------|-----------|
| **Report Validator** | Ensures conclusions are supported; LOW impact if missing |
| **Enhanced Classification** | Augments basic checks with content analysis |

---

## Deterministic vs. Reasoning Capabilities

### Deterministic Capabilities (9 of 9)

All identified capabilities can be implemented deterministically:

| Capability | Implementation Approach |
|-----------|----------------------|
| Classification | Pattern matching, content analysis |
| Provenance | Schema validation, required fields |
| Consistency | Numeric comparison, bounds checking |
| Cross-Artifact | Reference graph validation |
| Metadata | Schema validation |
| Confidence | Constraint matrix application |
| Runtime Rules | Rule evaluation, bounds checking |
| Report | Citation extraction, evidence mapping |
| Registry | State comparison, directory scanning |

### Reasoning NOT Required

No capability requires reasoning (LLM inference) for its basic implementation. However:
- Reasoning MAY enhance error messages
- Reasoning MAY help resolve ambiguous cases
- Reasoning MAY provide contextual suggestions

**Recommendation**: Implement deterministic validators first; add reasoning augmentation as future enhancement if needed.

---

## Runtime Architecture Recommendation

### Recommended Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    VALIDATION PIPELINE                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STAGE 1: Evidence Collection Gate                            │
│  • Metadata Validator                                       │
│  • Provenance Validator (basic)                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 2: Artifact Generation Gate                           │
│  • Classification Validator                                │
│  • Confidence Validator (baseline)                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 3: Validation Stage (NEW)                            │
│  • Consistency Validator                                   │
│  • Cross-Artifact Validator                                │
│  • Runtime Rule Validator                                  │
│  • Confidence Validator (full)                             │
│  • Provenance Validator (full)                            │
│  • Report Validator (optional)                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STAGE 4: Repository Registration Gate                      │
│  • Registry Validator                                     │
└─────────────────────────────────────────────────────────────┘
```

### Runtime Function Extensions

| Current Function | Extension |
|-----------------|-----------|
| `initialize()` | Add validation configuration loading |
| `track()` | Add validation status reporting |
| `archive()` | Add validation report archival |
| `generate_proposal()` | Add validation summary to proposal |

### New Runtime Functions

| New Function | Purpose |
|-------------|---------|
| `validate_evidence()` | Run evidence collection gate validators |
| `validate_artifacts()` | Run artifact generation gate validators |
| `validate_comprehensive()` | Run full validation stage |
| `validate_registry()` | Run registry validation |
| `generate_validation_report()` | Produce consolidated validation report |

---

## Module Organization

### Option A: Single Validation Module

```
runtime/
├── validation/
│   ├── __init__.py
│   ├── validator.py          # Main validation orchestration
│   ├── classification.py      # Classification validator
│   ├── provenance.py         # Provenance validator
│   ├── consistency.py       # Consistency validator
│   ├── cross_artifact.py    # Cross-artifact validator
│   ├── metadata.py          # Metadata validator
│   ├── confidence.py        # Confidence validator
│   ├── rules.py             # Runtime rule validator
│   ├── report.py            # Report validator
│   ├── registry.py          # Registry validator
│   └── schemas/
│       ├── evidence_schema.yaml
│       ├── provenance_schema.yaml
│       ├── metadata_schema.yaml
│       └── registry_schema.yaml
```

### Option B: Validation Pipeline Component

```
runtime/
├── validation_pipeline/
│   ├── __init__.py
│   ├── pipeline.py           # Pipeline orchestration
│   ├── gates/
│   │   ├── gate1_evidence.py
│   │   ├── gate2_artifacts.py
│   │   ├── gate3_validation.py
│   │   └── gate4_registry.py
│   └── validators/
│       ├── [all validators]
│       └── schemas/
│           └── [all schemas]
```

### Recommended: Option A (Single Validation Module)

**Rationale**:
- Simpler structure
- Easier to maintain
- Single import path
- Flexible gate configuration

---

## Validation Schema Requirements

### Required Schemas

| Schema | Purpose |
|--------|---------|
| Evidence Type Schema | Valid evidence types and their definitions |
| Provenance Schema | Valid provenance types and required fields |
| Metadata Schema | Required metadata fields and formats |
| Confidence Matrix | Constraint rules for confidence levels |
| Integrity Rules | Runtime constraint definitions |
| Registry Schema | Registry structure and validation rules |

### Schema Location

```
runtime/validation/schemas/
├── evidence_types.yaml
├── provenance_types.yaml
├── metadata_required.yaml
├── confidence_matrix.yaml
├── integrity_rules.yaml
└── registry_schema.yaml
```

---

## Data Flow

```
Artifacts Created
    ↓
Gate 1: Metadata + Provenance (basic)
    ↓ [PASS/WARNING]
Artifacts Validated for Structure
    ↓
Gate 2: Classification + Confidence (baseline)
    ↓ [PASS/WARNING]
Artifacts Validated for Type/Confidence
    ↓
Full Validation Stage
    ↓ [PASS/WARNING/ERROR]
Consolidated Validation Report Generated
    ↓
Gate 3: Review validation report
    ↓ [if ERROR, return to fix]
Repository Registration
    ↓
Gate 4: Registry Validation
    ↓ [PASS/ERROR]
Experiment Registered
```

---

## Integration with Existing Runtime

### Initialize Phase
```
Current:
1. Read BOOTSTRAP.md
2. Acknowledge Laboratory Rules
3. Load Runtime Configuration
4. Check Session Override
5. Load Engine
6. Load Seed
7. Initialize Runtime State
8. Transfer Authority

Proposed Addition:
9. Load Validation Schemas
```

### Track Phase
```
Current:
- Track investigation progress

Proposed Addition:
- Include validation status in tracking
- Report validation warnings/errors
```

### Generate Proposal Phase
```
Current:
- Generate promotion proposal

Proposed Addition:
- Include validation summary in proposal
- Note validation warnings resolved
- Flag unresolved validation issues
```

---

## Validation Configuration

### Runtime Configuration Extension

```yaml
# governance/runtime/validation.yaml (new file)
validation:
  enabled: true
  gates:
    gate1_evidence:
      enabled: true
      blocking: ERROR
    gate2_artifacts:
      enabled: true
      blocking: ERROR
    gate3_validation:
      enabled: true
      blocking: ERROR
    gate4_registry:
      enabled: true
      blocking: ERROR
  reporting:
    generate_reports: true
    report_format: json
    include_suggestions: true
```

---

## Implementation Phases

### Phase 1: Core Infrastructure (Weeks 1-2)
- Validation module structure
- Schema definitions
- Metadata validator
- Basic provenance validator

### Phase 2: Artifact Validation (Weeks 3-4)
- Classification validator
- Confidence validator
- Gate 2 integration

### Phase 3: Comprehensive Validation (Weeks 5-6)
- Consistency validator
- Cross-artifact validator
- Runtime rule validator
- Gate 3 integration

### Phase 4: Registry and Reporting (Weeks 7-8)
- Registry validator
- Validation reporting
- Gate 4 integration
- Human review integration

---

## Summary

### Required Capabilities: 9

| Status | Count | Capabilities |
|--------|-------|--------------|
| Mandatory | 8 | All except Report Validator |
| Optional | 1 | Report Validator |
| Deterministic | 9 | All capabilities |
| Requires Reasoning | 0 | None (reasoning is enhancement only) |

### Pipeline Stages: 4 Gates

| Gate | Stage | Blocking |
|------|-------|----------|
| Gate 1 | Evidence Collection | ERROR |
| Gate 2 | Artifact Generation | ERROR |
| Gate 3 | Validation Stage | ERROR |
| Gate 4 | Repository Registration | ERROR |

### Implementation Complexity: MEDIUM

Estimated total effort: 6-8 weeks

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
