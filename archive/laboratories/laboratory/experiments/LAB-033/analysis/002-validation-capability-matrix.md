# Validation Capability Matrix: LAB-033

**Analysis Date**: 2026-07-22
**Experiment**: LAB-033
**Status**: COMPLETE

---

## Capability Matrix Overview

This document defines each required validation capability with its purpose, inputs, outputs, dependencies, and behavioral requirements.

---

## Capability 1: Evidence Classification Validator

### Purpose
Verify that evidence type accurately reflects evidence content.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| Evidence content | Full text of evidence artifact | Artifact file |
| Declared type | Evidence type from artifact header | Artifact metadata |
| Type schema | Definition of valid evidence types | Schema definition |
| Content qualifiers | Patterns indicating actual content type | Pattern matching |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Issue description | Human-readable issue explanation |
| Suggested type | If mismatch detected, suggested correct type |
| Evidence references | Specific lines/content causing mismatch |

### Dependencies
- Evidence type schema
- Qualifier pattern definitions
- Type-to-content mapping rules

### Runtime Location
Evidence Collection Stage or Post-Processing Stage

### Trigger Point
After evidence is collected and before artifact generation completes

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| "measurement" + "simulated" qualifier | WARNING | MEDIUM |
| "measurement" + "estimated" qualifier | WARNING | MEDIUM |
| "observation" + "inference" content | ERROR | HIGH |
| "fact" + "hypothesis" content | ERROR | HIGH |
| "measurement" + "modeled" qualifier | WARNING | MEDIUM |

### Expected Artifacts
- Classification validation report
- Mismatch log with line references
- Suggested corrections (optional)

---

## Capability 2: Provenance Validator

### Purpose
Verify that provenance metadata accompanies quantitative statements.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| Evidence content | Full text of evidence artifact | Artifact file |
| Provenance field | Provenance metadata if present | Artifact metadata |
| Provenance types | Valid provenance type definitions | Schema |
| Citation requirements | Rules for referenced provenance | Schema |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Provenance completeness | List of all quantitative claims |
| Provenance status per claim | Present/Missing/Invalid per claim |
| Missing citations | List of missing citations (if any) |

### Dependencies
- Provenance schema definition
- Provenance type definitions
- Citation format rules

### Runtime Location
Evidence Collection Stage or Validation Stage

### Trigger Point
After evidence is collected, before repository registration

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| Quantitative claim without provenance | ERROR | MEDIUM |
| Invalid provenance type | ERROR | MEDIUM |
| "Unknown" provenance | WARNING | LOW |
| "Referenced" without citation | ERROR | MEDIUM |

### Expected Artifacts
- Provenance validation report
- Claims requiring provenance list
- Citation gaps list

---

## Capability 3: Consistency Validator

### Purpose
Detect contradictions between declared and reported values within artifacts.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| Declared values | Values from experiment.md (optimal, expected, etc.) | experiment.md |
| Reported values | Values from run results, analysis | Result artifacts |
| Numeric bounds | Min/max acceptable values | Constraint rules |
| Comparison rules | How to compare declared vs reported | Rule definitions |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Contradictions list | All detected contradictions |
| Severity per contradiction | HIGH/MEDIUM/LOW |
| Numeric details | Declared vs reported comparison |

### Dependencies
- Artifact schemas
- Numeric bound definitions
- Comparison rule definitions

### Runtime Location
Validation Stage (Post-Processing)

### Trigger Point
After all run artifacts are generated, before artifact generation completes

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| Reported solution < Declared optimal | ERROR | HIGH |
| Efficiency > 100% without explanation | WARNING | MEDIUM |
| Run count mismatch | ERROR | HIGH |
| Status contradiction | ERROR | HIGH |

### Expected Artifacts
- Consistency validation report
- Contradiction details
- Numeric reconciliation log

---

## Capability 4: Cross-Artifact Validator

### Purpose
Ensure consistency across multiple artifacts in an experiment.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| experiment.md | Experiment specification | File |
| TRACKER.md | Progress tracker | File |
| runs/*.md | Individual run results | Directory |
| analysis/*.md | Analysis documents | Directory |
| conclusions | Conclusion documents | Directory |
| Artifact schemas | Structure definitions | Schema |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Cross-reference validation report | Full consistency check results |
| Missing references | References to non-existent artifacts |
| Orphaned artifacts | Artifacts not referenced anywhere |

### Dependencies
- Artifact schemas for each type
- Reference definition rules
- Naming conventions

### Runtime Location
Validation Stage (Post-Processing)

### Trigger Point
After all artifacts generated, before repository registration

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| experiment.md run count ≠ runs/ count | ERROR | HIGH |
| TRACKER.md status ≠ experiment.md status | ERROR | HIGH |
| Analysis references missing runs | ERROR | MEDIUM |
| Conclusion cites non-existent evidence | ERROR | MEDIUM |
| Orphaned artifacts detected | WARNING | LOW |

### Expected Artifacts
- Cross-artifact validation report
- Reference graph
- Orphan detection log

---

## Capability 5: Metadata Validator

### Purpose
Verify required metadata fields are present and valid.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| Artifact | Any artifact file | File |
| Metadata schema | Required fields definition | Schema |
| Format rules | Valid format for each field | Schema |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Missing fields | List of required but absent fields |
| Invalid fields | Fields with invalid values |
| Format errors | Fields not matching required format |

### Dependencies
- Metadata schema definition
- Format validation rules

### Runtime Location
Evidence Collection Stage or Artifact Generation Stage

### Trigger Point
After artifact is created, before it is finalized

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| Missing timestamp | ERROR | MEDIUM |
| Missing SHA-256 hash | ERROR | HIGH |
| Missing experiment reference | ERROR | HIGH |
| Invalid date format | WARNING | LOW |
| Missing author attribution | WARNING | LOW |

### Expected Artifacts
- Metadata validation report
- Missing field list
- Format correction suggestions

---

## Capability 6: Confidence Validator

### Purpose
Constrain confidence levels based on evidence quality.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| Evidence type | Classification from validation | From Capability 1 |
| Evidence source | Measured/Derived/Simulated/Estimated/Unknown | Provenance validation |
| Declared confidence | Confidence level in artifact | Artifact metadata |
| Confidence matrix | Constraint rules per evidence type | Constraint rules |

### Confidence Constraint Matrix

| Evidence Source | LOW | MEDIUM | HIGH | VERY HIGH |
|----------------|-----|--------|------|-----------|
| Measured | ✓ | ✓ | ✓ | - |
| Derived | ✓ | ✓ | - | - |
| Referenced | ✓ | ✓ | - | - |
| Simulated | ✓ | - | - | - |
| Estimated | ✓ | - | - | - |
| Unknown | ✓ | - | - | - |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Constraint violations | List of confidence-constraint mismatches |
| Maximum allowed confidence | Per evidence type |
| Suggested confidence | If violation detected |

### Dependencies
- Confidence constraint matrix
- Evidence type classification
- Provenance validation

### Runtime Location
Validation Stage (Post-Processing)

### Trigger Point
After evidence classification and provenance validation complete

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| Simulated + HIGH confidence | ERROR | MEDIUM |
| Simulated + VERY HIGH confidence | ERROR | HIGH |
| Unknown + MEDIUM+ confidence | WARNING | LOW |
| Single measurement + VERY HIGH | ERROR | MEDIUM |

### Expected Artifacts
- Confidence validation report
- Constraint violation list
- Confidence suggestions

---

## Capability 7: Runtime Rule Validator

### Purpose
Enforce defined integrity constraints on evidence and claims.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| Evidence content | Full text of artifacts | Files |
| Integrity rules | Defined constraint rules | Rule definitions |
| Numeric bounds | Min/max for numeric claims | Constraint definitions |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Rule violations | List of violated constraints |
| Severity per violation | HIGH/MEDIUM/LOW |

### Dependencies
- Integrity rule definitions
- Numeric bound definitions

### Runtime Location
Validation Stage (Post-Processing)

### Trigger Point
After evidence collected, before repository registration

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| Efficiency > 100% without explanation | ERROR | HIGH |
| Solution length > 100 moves | WARNING | MEDIUM |
| Runtime < 0 seconds | ERROR | HIGH |
| Consistency > 100% | WARNING | MEDIUM |
| Impossible performance claims | ERROR | HIGH |

### Expected Artifacts
- Integrity rule validation report
- Violation details
- Constraint reference

---

## Capability 8: Report Validator

### Purpose
Verify report completeness and evidence support.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| Report content | Conclusions, recommendations | Report files |
| Supporting evidence | Evidence artifacts | Evidence files |
| Claim mappings | Claims-to-evidence references | Report structure |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Unsupported claims | Claims without evidence |
| Evidence gaps | Evidence lacking for claims |
| Citation completeness | Reference coverage |

### Dependencies
- Report structure schema
- Evidence availability
- Claim extraction rules

### Runtime Location
Validation Stage (Post-Processing)

### Trigger Point
After report is generated, before repository registration

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| Conclusion without evidence | WARNING | MEDIUM |
| Claim without citation | WARNING | LOW |
| Recommendation without data | WARNING | MEDIUM |
| Key finding unsupported | ERROR | HIGH |

### Expected Artifacts
- Report validation report
- Unsupported claims list
- Evidence gap analysis

---

## Capability 9: Registry Validator

### Purpose
Verify registry consistency with actual experiment state.

### Inputs
| Input | Description | Source |
|-------|-------------|--------|
| registry.md | Central registry file | File |
| Experiment directories | Actual experiment folders | Directory structure |
| State definitions | Valid status values | Schema |

### Outputs
| Output | Description |
|--------|-------------|
| Result | PASS, WARNING, or ERROR |
| Registry-state mismatches | Discrepancies between registry and reality |
| Orphaned entries | Registry entries without directories |
| Missing entries | Directories without registry entries |

### Dependencies
- Registry schema
- Directory structure conventions

### Runtime Location
Repository Registration Stage

### Trigger Point
After experiment completion, before publication

### Failure Conditions
| Condition | Result | Severity |
|-----------|--------|----------|
| Registry shows experiment but directory missing | ERROR | HIGH |
| Registry status ≠ actual status | ERROR | HIGH |
| Duplicate experiment IDs | ERROR | HIGH |
| Missing required fields | WARNING | LOW |

### Expected Artifacts
- Registry validation report
- Consistency audit log
- Discrepancy resolution guide

---

## Capability Summary Table

| Capability | Inputs | Outputs | Deterministic | Dependencies |
|------------|--------|---------|--------------|--------------|
| Classification | Content, Type, Schema | Result, Issue | YES | Type schema |
| Provenance | Content, Provenance, Schema | Result, Completeness | YES | Provenance schema |
| Consistency | Declared, Reported, Bounds | Result, Contradictions | YES | Bounds, Rules |
| Cross-Artifact | All artifacts | Result, References | YES | All schemas |
| Metadata | Artifact, Schema | Result, Fields | YES | Metadata schema |
| Confidence | Type, Source, Confidence, Matrix | Result, Violations | YES | Constraint matrix |
| Runtime Rules | Content, Rules, Bounds | Result, Violations | YES | Rule definitions |
| Report | Report, Evidence | Result, Gaps | PARTIAL | Report schema |
| Registry | Registry, Directories | Result, Discrepancies | YES | Registry schema |

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
