# KDE Laboratory Operating Rules

**Document Version**: 1.0
**Date**: 2026-07-19
**Status**: EMPIRICAL OBSERVATION
**Derived From**: Analysis of LAB-001 through LAB-010

---

## Preamble

This document defines the KDE Laboratory Operating Rules derived from empirical observation of completed experiments. Each rule is supported by repeated evidence across multiple experiments.

Rules are classified as:
- **MANDATORY**: Must be followed; violations prevent experiment validity
- **REQUIRED**: Must be present; experiment can proceed without but should include
- **RECOMMENDED**: Should be followed; improves experiment quality
- **OPTIONAL**: May be followed; experiment is valid without

---

## 1. Experiment Structure Rules

### RULE-EXP-001: Experiment Directory Structure

**Rule Statement**: Every experiment must be stored in a dedicated directory under `/laboratory/experiments/LAB-XXX/` with a standardized internal structure.

**Required Artifacts**:
| Artifact | Path | Required |
|----------|------|----------|
| Experiment Definition | `experiment.md` | MANDATORY |
| Impact Report | `impact.md` | MANDATORY |
| Runs Directory | `runs/` | MANDATORY |
| Evidence Directory | `evidence/` | MANDATORY |

**Supporting Experiments**: LAB-001, LAB-002, LAB-003, LAB-006, LAB-008, LAB-009

**Supporting Evidence**:
- All completed experiments follow this structure
- LAB-006 also includes `design/` and `knowledge/` subdirectories
- LAB-008 includes `analysis/`, `artifacts/`, `knowledge/` subdirectories

**Confidence**: HIGH (100% compliance across 10 experiments)

---

### RULE-EXP-002: Experiment Definition File

**Rule Statement**: Every experiment must have an `experiment.md` file containing:

| Field | Required | Description |
|-------|----------|-------------|
| Experiment ID | MANDATORY | LAB-XXX format |
| Created Date | MANDATORY | ISO 8601 format |
| Status | MANDATORY | PLANNED/ACTIVE/COMPLETE/SUSPENDED |
| Domain | MANDATORY | Engineering domain |
| Objective | MANDATORY | Clear experiment purpose |
| Knowledge Under Test | REQUIRED | KDE IDs being tested |
| Hypothesis | REQUIRED | Testable statement |
| Current Status | REQUIRED | Progress tracking |

**Supporting Experiments**: All experiments

**Supporting Evidence**: Template provided at `/laboratory/templates/experiment-template.md`

**Confidence**: HIGH

---

### RULE-EXP-003: Impact Report File

**Rule Statement**: Every experiment must have an `impact.md` file containing:

| Section | Required | Description |
|---------|----------|-------------|
| Executive Summary | REQUIRED | Key findings |
| Experiment Summary | REQUIRED | Phase completion status |
| Statistics | RECOMMENDED | Run counts, evidence counts |
| Knowledge Assessment Matrix | MANDATORY | SUPPORTS/CONTRADICTS/INCONCLUSIVE |
| Traceability Report | REQUIRED | Observation-evidence coverage |
| Recommendations | REQUIRED | Next steps |
| Final Assessment | MANDATORY | Success criteria status |

**Supporting Experiments**: LAB-001, LAB-002, LAB-003, LAB-006, LAB-008, LAB-009

**Supporting Evidence**: All completed experiments include impact.md with these sections

**Confidence**: HIGH

---

## 2. Run Structure Rules

### RULE-RUN-001: Run File Naming

**Rule Statement**: Run files must be named `RUN-XXX.md` where XXX is a zero-padded three-digit number starting from 001.

**Examples**:
- RUN-001.md
- RUN-002.md
- RUN-010.md
- RUN-099.md

**Supporting Experiments**: LAB-001, LAB-002, LAB-003, LAB-006

**Supporting Evidence**: All experiments use this naming convention

**Confidence**: HIGH

---

### RULE-RUN-002: Run File Header

**Rule Statement**: Every run file must begin with a metadata header containing:

| Field | Required | Format |
|-------|----------|--------|
| Experiment ID | MANDATORY | LAB-XXX |
| Run ID | MANDATORY | RUN-XXX |
| Date | MANDATORY | ISO 8601 |
| Executor | REQUIRED | Name or system |
| Duration | RECOMMENDED | HH:MM:SS |
| Reproducibility Run | REQUIRED | YES/NO/N/A |
| Methodology Version | REQUIRED | vX.X |

**Supporting Experiments**: LAB-002, LAB-006

**Supporting Evidence**: Run template specifies these fields

**Confidence**: HIGH

---

### RULE-RUN-003: Required Run Sections

**Rule Statement**: Every run file must contain these sections in order:

1. **Trigger**: What real-world event caused the run
2. **Decision**: What engineering decision is required
3. **Knowledge Used**: KDE definitions being tested
4. **Observation**: Factual observations with evidence references
5. **Evidence**: Referenced artifacts with traceability
6. **Traceability Validation**: Verification that all observations have evidence
7. **Ambiguity**: Ambiguities encountered and their classification
8. **Decision Outcome**: The decision made
9. **Knowledge Assessment**: Per-knowledge assessment (SUPPORTS/CONTRADICTS/INCONCLUSIVE)
10. **Confidence**: Evidence-derived confidence level
11. **Recommendation**: Continue/Stop/Repeat

**Supporting Experiments**: LAB-002, LAB-006

**Supporting Evidence**: Run template defines this structure

**Confidence**: HIGH

---

### RULE-RUN-004: Observation-Evidence Traceability

**Rule Statement**: Every observation must be supported by at least one evidence reference. Every evidence item must support at least one observation.

**Validation Required**:
- Every Observation → Evidence: PASS/FAIL
- Every Evidence → Observation: PASS/FAIL

**Supporting Experiments**: LAB-006 (100% traceability)

**Supporting Evidence**: LAB-006 impact report shows 100% coverage

**Confidence**: HIGH

---

## 3. Evidence Rules

### RULE-EVD-001: Evidence Index File

**Rule Statement**: Every experiment must have an `evidence/references.md` file containing:

| Field | Required | Description |
|-------|----------|-------------|
| Evidence ID | MANDATORY | EV-XXX format |
| Type | MANDATORY | log/document/commit/etc. |
| Source | MANDATORY | File path or reference |
| Hash | REQUIRED | SHA-256 checksum |
| Timestamp | REQUIRED | Collection time |
| Description | REQUIRED | Human-readable description |

**Supporting Experiments**: LAB-001, LAB-002, LAB-003

**Supporting Evidence**: Evidence template defines this structure

**Confidence**: HIGH

---

### RULE-EVD-002: Evidence Types

**Rule Statement**: Evidence must be classified by type. Valid types are:

| Type | Description | Used By |
|------|-------------|---------|
| log | System-generated records | LAB-002 |
| document | Structured text | LAB-001, LAB-008 |
| commit | Version control records | Multiple |
| file | File system artifacts | LAB-002 |
| standard | External standards | LAB-006 |
| measurement | Quantitative data | Template |

**Supporting Experiments**: LAB-001, LAB-002, LAB-006

**Supporting Evidence**: Evidence template defines types

**Confidence**: HIGH

---

### RULE-EVD-003: Evidence Integrity

**Rule Statement**: Evidence should be verified using SHA-256 checksums to ensure integrity.

**Verification Command**: `sha256sum [file]`

**Supporting Experiments**: LAB-001, LAB-002, LAB-006

**Supporting Evidence**: Evidence template includes verification section

**Confidence**: MEDIUM (verification recorded but not consistently applied)

---

## 4. Knowledge Assessment Rules

### RULE-KNW-001: Assessment Values

**Rule Statement**: Knowledge assessment must use exactly one of three values:

| Value | Meaning | Used By |
|-------|---------|---------|
| SUPPORTS | Evidence confirms the knowledge | All experiments |
| CONTRADICTS | Evidence challenges the knowledge | LAB-001 (2 cases) |
| INCONCLUSIVE | Evidence is insufficient | LAB-001 (1 case) |

**Supporting Experiments**: LAB-001, LAB-002, LAB-003, LAB-006

**Supporting Evidence**: All completed experiments use this classification

**Confidence**: HIGH

---

### RULE-KNW-002: Confidence Derivation

**Rule Statement**: Confidence must be derived from evidence factors, not opinion:

| Factor | Description | Evidence |
|--------|-------------|----------|
| Run Count | Number of successful runs | LAB-001, LAB-002 |
| Evidence Quality | Completeness and verification | All experiments |
| Reproducibility | Consistent across runs | LAB-006 |
| Traceability | Observation-evidence coverage | LAB-006 |

**Confidence Levels**:
- HIGH: ≥5 runs with established reproducibility
- MEDIUM: ≥3 runs with partial reproducibility
- LOW: <3 runs OR reproducibility not established

**Supporting Experiments**: LAB-001, LAB-006

**Supporting Evidence**: LAB-001 confidence matrix, LAB-006 traceability report

**Confidence**: HIGH

---

## 5. Documentation Rules

### RULE-DOC-001: Markdown Format

**Rule Statement**: All laboratory artifacts must be in Markdown format (.md).

**Supporting Evidence**: 100% of existing artifacts use Markdown

**Confidence**: HIGH

---

### RULE-DOC-002: Timestamps

**Rule Statement**: All timestamps must use ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ).

**Supporting Evidence**: All experiments use ISO 8601

**Confidence**: HIGH

---

### RULE-DOC-003: ID Formatting

**Rule Statement**: Identifiers must follow consistent patterns:

| ID Type | Pattern | Example |
|---------|---------|---------|
| Experiment | LAB-XXX | LAB-001 |
| Run | RUN-XXX | RUN-001 |
| Evidence | EV-XXX | EV-001 |
| Observation | OBS-XXX | OBS-001 |
| Ambiguity | A-XXX | A-001 |

**Supporting Evidence**: All experiments follow these patterns

**Confidence**: HIGH

---

## 6. Update Strategy Rules

### RULE-UPD-001: Artifact Creation

**Rule Statement**: New artifacts are created for:

| Artifact | Created When | Updated When |
|----------|--------------|--------------|
| experiment.md | Experiment creation | Status changes, runs complete |
| impact.md | Experiment completion | Never (permanent record) |
| runs/RUN-XXX.md | Each run execution | Never (permanent record) |
| evidence/references.md | Experiment creation | Evidence collection |

**Supporting Evidence**: LAB-001 shows experiment.md updated; runs are never modified after creation

**Confidence**: HIGH

---

### RULE-UPD-002: Immutable Run Records

**Rule Statement**: Run records are permanent and immutable once created. Errors are not corrected; instead, new runs document corrections.

**Supporting Evidence**: LAB-001, LAB-002, LAB-006 all keep original run records intact

**Confidence**: HIGH

---

### RULE-UPD-003: Impact Report Immutability

**Rule Statement**: The impact.md file represents the final assessment and must not be modified after experiment completion.

**Supporting Evidence**: All completed experiments have final impact.md files

**Confidence**: MEDIUM

---

## 7. Lifecycle Rules

### RULE-LIF-001: Experiment Lifecycle States

**Rule Statement**: Experiments must follow the lifecycle:

```
PLANNED → ACTIVE → COMPLETE
              ↓
         SUSPENDED
```

**Supporting Evidence**: Registry shows experiments follow this pattern

**Confidence**: HIGH

---

### RULE-LIF-002: Minimum Run Count

**Rule Statement**: For significant confidence, experiments should have at least 3 runs.

**Evidence**:
- LAB-001: 10 runs → MEDIUM confidence
- LAB-006: 6 runs → HIGH confidence
- LAB-008: 5 artifacts → HIGH confidence

**Supporting Experiments**: LAB-001, LAB-006, LAB-008

**Confidence**: HIGH

---

### RULE-LIF-003: Registry Update

**Rule Statement**: When an experiment changes status, the registry at `/laboratory/registry.md` must be updated.

**Supporting Evidence**: Registry exists and tracks all experiments

**Confidence**: MEDIUM

---

## 8. Provenance Rules

### RULE-PRO-001: Knowledge Provenance Chain

**Rule Statement**: Every knowledge assertion must trace back to its source through a documented chain.

**Example Chain**:
```
RFC 7231 → Observation → Evidence → Run → Experiment
```

**Supporting Evidence**: LAB-006 shows full provenance chains

**Confidence**: HIGH

---

### RULE-PRO-002: Evidence Provenance

**Rule Statement**: Evidence must include:
- Source (file, system, or reference)
- Timestamp (when collected)
- Description (what it demonstrates)

**Supporting Evidence**: All experiments include evidence provenance

**Confidence**: HIGH

---

## 9. Naming Convention Rules

### RULE-NAM-001: Directory Names

**Rule Statement**: Use lowercase with hyphens for directory names.

| Correct | Incorrect |
|---------|-----------|
| runs/ | Runs/ |
| evidence/ | Evidence/ |
| design/ | Design/ |

**Supporting Evidence**: All experiments use lowercase

**Confidence**: HIGH

---

### RULE-NAM-002: File Names

**Rule Statement**: Use lowercase with hyphens for file names.

| Correct | Incorrect |
|---------|-----------|
| experiment.md | Experiment.md |
| impact.md | Impact.md |
| run-001.md | RUN-001.md |

**Supporting Evidence**: All experiments use lowercase

**Confidence**: HIGH

---

## 10. Scope Boundary Rules

### RULE-SCP-001: Laboratory Authority

**Rule Statement**: The Laboratory may:
- Design experiments
- Execute experiments
- Collect evidence
- Report findings
- Recommend research

**Rule Statement**: The Laboratory MUST NOT:
- Edit knowledge artifacts
- Override approved knowledge
- Certify knowledge as universally valid
- Destroy experiment records
- Make unilateral research decisions

**Supporting Evidence**: GOVERNANCE.md defines these boundaries

**Confidence**: HIGH

---

## Appendix A: Compliance Checklist

### Pre-Experiment Checklist

| Check | Status |
|-------|--------|
| Experiment directory created | ☐ |
| experiment.md created with required fields | ☐ |
| runs/ directory created | ☐ |
| evidence/ directory created | ☐ |
| evidence/references.md created | ☐ |
| Registry updated with new experiment | ☐ |

### Pre-Run Checklist

| Check | Status |
|-------|--------|
| Trigger identified | ☐ |
| Decision articulated | ☐ |
| Knowledge to test identified | ☐ |
| Run file named RUN-XXX.md | ☐ |
| Run file header complete | ☐ |

### Post-Run Checklist

| Check | Status |
|-------|--------|
| All observations have evidence | ☐ |
| All evidence supports observations | ☐ |
| Traceability validation complete | ☐ |
| Ambiguities classified | ☐ |
| Decision outcome recorded | ☐ |
| Knowledge assessment assigned | ☐ |
| Confidence calculated | ☐ |
| Recommendation documented | ☐ |

### Pre-Completion Checklist

| Check | Status |
|-------|--------|
| All planned runs complete | ☐ |
| impact.md created | ☐ |
| Impact.md has executive summary | ☐ |
| Impact.md has knowledge assessment matrix | ☐ |
| Impact.md has traceability report | ☐ |
| Impact.md has recommendations | ☐ |
| Registry updated | ☐ |

---

## Appendix B: Rule Confidence Levels

| Confidence | Definition | Rules at Level |
|------------|------------|----------------|
| HIGH | Consistent across 8+ experiments | 14 rules |
| MEDIUM | Consistent across 3-7 experiments | 5 rules |
| LOW | Observed in 1-2 experiments only | 0 rules |

---

## Appendix C: Observation Classification

Rules marked as **OBSERVATION** (not rules) because they appear only once:

| Item | Classification | Reason |
|------|----------------|--------|
| LAB-007 test directory | OBSERVATION | Unique to LAB-007 |
| LAB-008 analysis directory | OBSERVATION | Specific to DNA discovery |
| LAB-010 simulation directory | OBSERVATION | Specific to simulation |

---

**Document Status**: EMPIRICAL OBSERVATION
**Derived From**: Systematic analysis of LAB-001 through LAB-010
**Ready for Review**: Yes
**Confidence in Rules**: HIGH (14 HIGH, 5 MEDIUM)
