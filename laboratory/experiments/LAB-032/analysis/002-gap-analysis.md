# Gap Analysis: Current KDE vs. Evidence Integrity Requirements

**Analysis Date**: 2026-07-22
**Experiment**: LAB-032
**Status**: COMPLETE

---

## Overview

This gap analysis examines the difference between KDE's current evidence management capabilities and the requirements implied by evidence integrity validation.

**Reference**: LAB-031 governance issues identified during review

---

## Current KDE Capabilities

### Evidence Management (from EVIDENCE.md)

| Capability | Status | Implementation |
|------------|--------|----------------|
| Evidence Types | Defined | log, measurement, screenshot, commit, document, telemetry, photo, video, notes |
| SHA-256 Integrity | Defined | Checksum verification required |
| Bidirectional Links | Defined | Evidence ↔ Experiment |
| Collection Procedure | Defined | 5-step process |
| Quality Assessment | Defined | Sample size, integrity, relevance, completeness, reproducibility |
| Preservation | Defined | Never delete, archive instead |

### Laboratory Rules (from LABORATORY-RULES.md)

| Rule | Description | Enforcement |
|------|-------------|-------------|
| No Auto-Continuation | Await human authorization | Human-dependent |
| No Self-Approval | Humans set APPROVED state | Human-dependent |
| No Self-Promotion | Humans set PROMOTED state | Human-dependent |
| Distinguish Evidence/Inference/Hypothesis | Mark claim types | AI-dependent |
| Evidence-Based Changes | Justify claims with evidence | AI-dependent |

### Runtime (from RUNTIME.md)

| Function | Description | Validation Role |
|----------|-------------|----------------|
| initialize() | Initialize Runtime | No evidence validation |
| discover() | Find investigations | No evidence validation |
| track() | Track progress | No evidence validation |
| archive() | Archive investigations | No evidence validation |
| generate_proposal() | Create promotion proposals | No evidence validation |

---

## Identified Gaps

### Gap 1: Evidence Classification Validation

**Current State**: AI classifies evidence; no validation that classification matches content.

**Example from LAB-031**:
```
Evidence Type: "measurement" (benchmark-results.md)
Actual Content: "Simulated" (stated in document header)
```

**Gap**: No mechanism to validate that "measurement" classification is accurate when evidence is simulated.

**Impact**: MEDIUM - Misleading classification could affect downstream decisions.

**Automated Detection Feasibility**: HIGH
- Check for explicit "simulated", "estimated", "predicted" qualifiers
- Flag mismatch between classification and content

---

### Gap 2: Consistency Validation

**Current State**: No cross-reference validation between declared and reported values.

**Example from LAB-031**:
```
Declared Optimal: 19 moves
Reported Delta Solution: 18 moves
Result: Efficiency > 100%
```

**Gap**: No mechanism to detect contradictions within or across artifacts.

**Impact**: HIGH - Logical inconsistencies undermine trustworthiness.

**Automated Detection Feasibility**: HIGH
- Numeric comparison rules
- Logical constraint checking
- Tolerance for legitimate variance

---

### Gap 3: Provenance Validation

**Current State**: Provenance metadata is optional (not explicitly required).

**Evidence Principles** (EVIDENCE.md):
- Evidence with Experiment ✓
- Integrity Verification ✓
- Bidirectional Links ✓
- Reference, Not Duplicate ✓
- Permanent Preservation ✓
- **Provenance Requirement**: Not specified

**Gap**: No mandatory provenance for quantitative statements.

**Impact**: MEDIUM - Cannot assess evidence quality without knowing source.

**Automated Detection Feasibility**: MEDIUM
- Require provenance field in evidence metadata
- Validate against accepted provenance types
- Flag "Unknown" provenance

---

### Gap 4: Cross-Artifact Validation

**Current State**: Each artifact maintained independently; no cross-validation.

**Artifacts Checked**:
- experiment.md
- analysis/*.md
- runs/*.md
- TRACKER.md
- registry.md
- conclusions

**Example from LAB-031**:
```
experiment.md declares: "12 runs planned"
runs/ shows: 12 runs
TRACKER.md: Matches
```

**Gap**: Manual verification required for consistency; automated checking not implemented.

**Impact**: MEDIUM - Inconsistencies may persist undetected.

**Automated Detection Feasibility**: MEDIUM
- Schema-based validation
- Reference extraction and reconciliation
- Periodic consistency scans

---

### Gap 5: Confidence Validation

**Current State**: Confidence is set by AI; not constrained by evidence quality.

**Evidence Quality Assessment** (EVIDENCE.md):
| Factor | Assessment | Constrains Confidence? |
|--------|------------|------------------------|
| Sample Size | ≥3 runs | No |
| Integrity | SHA-256 | No |
| Relevance | High/Medium/Low | No |
| Completeness | Complete/Partial | No |
| Reproducibility | Reproduced/Partial/Not | No |

**Example from LAB-031**:
```
Evidence Type: "measurement" (but simulated)
Confidence: Not explicitly set
Quality Rating: "HIGH" (implied)
```

**Gap**: No rule linking evidence quality to confidence level.

**Impact**: MEDIUM - Confidence may not reflect actual certainty.

**Automated Detection Feasibility**: MEDIUM
- Rule-based constraints
- Evidence quality scoring
- Confidence range enforcement

---

### Gap 6: Integrity Rules

**Current State**: No runtime integrity rules beyond SHA-256 verification.

**EVIDENCE.md Principles**:
- Preservation (never delete) ✓
- No duplicate (reference only) ✓
- Bidirectional links ✓

**Missing Rules**:
| Rule | Status | Concern |
|------|--------|---------|
| Impossible performance claims | Not enforced | e.g., >100% efficiency |
| Contradictory measurements | Not enforced | Conflicting quantitative data |
| Unsupported conclusions | Not enforced | Conclusions without evidence |
| Missing references | Not enforced | Claims without citations |
| Circular evidence | Not enforced | Evidence chains that loop |
| Duplicated evidence | Partially enforced | SHA-256 but no deduplication |
| Orphaned conclusions | Not enforced | Conclusions without supporting evidence |

**Gap**: No mechanism to enforce logical integrity constraints.

**Impact**: MEDIUM to HIGH - Integrity violations may undermine conclusions.

**Automated Detection Feasibility**: VARIABLE
- Numeric violations: HIGH
- Structural violations: MEDIUM
- Semantic violations: LOW

---

## Gap Summary

| Gap | Severity | Automated Detection | Current KDE Coverage |
|-----|----------|--------------------|--------------------|
| Classification Validation | MEDIUM | HIGH | NONE |
| Consistency Validation | HIGH | HIGH | NONE |
| Provenance Validation | MEDIUM | MEDIUM | PARTIAL |
| Cross-Artifact Validation | MEDIUM | MEDIUM | NONE |
| Confidence Validation | MEDIUM | MEDIUM | NONE |
| Integrity Rules | MEDIUM-HIGH | VARIABLE | PARTIAL |

---

## Root Cause Analysis

### Why These Gaps Exist

1. **Design Focus**: KDE was designed for knowledge discovery, not evidence validation
2. **Human Reliance**: Heavy reliance on human review for quality assurance
3. **Evolutionary Growth**: Gaps emerged as governance needs grew
4. **Scalability Trade-off**: Automated validation adds complexity

### Why Gaps Matter

1. **Trustworthiness**: Inconsistencies undermine repository credibility
2. **Reproducibility**: Cannot verify reproducibility without validation
3. **Automation Limit**: Human review cannot scale with repository growth
4. **Risk**: Undetected errors may propagate to knowledge base

---

## Architectural Implications

### What Would Close These Gaps?

| Gap | Solution Approach | Complexity |
|-----|------------------|------------|
| Classification | Content-aware validation | LOW |
| Consistency | Rule-based checking | LOW |
| Provenance | Required metadata schema | MEDIUM |
| Cross-Artifact | Schema validation + reference checking | MEDIUM |
| Confidence | Constraint rules | MEDIUM |
| Integrity Rules | Multiple specialized validators | HIGH |

### Where Should Validation Live?

| Option | Classification | Consistency | Provenance | Cross-Artifact | Confidence | Integrity |
|--------|---------------|-------------|------------|---------------|------------|-----------|
| **Standalone Engine** | ++ | ++ | + | ++ | ++ | + |
| **Governance Layer** | + | + | ++ | + | + | ++ |
| **Runtime Validator** | ++ | ++ | ++ | + | ++ | ++ |
| **Post-Processing** | + | ++ | + | ++ | + | ++ |
| **Evidence Pipeline** | ++ | + | ++ | + | + | + |

Legend: ++ = Strong fit, + = Partial fit

---

## Conclusions

### Gap Assessment

| Finding | Evidence |
|---------|----------|
| **Gaps exist** | LAB-031 demonstrated classification, consistency, and efficiency issues |
| **Gaps are detectable** | Automated detection is feasible for most gaps |
| **Gaps have impact** | Trustworthiness and reproducibility are affected |
| **Gaps can be closed** | Multiple architectural options exist |

### Architectural Question

The gaps suggest KDE lacks an **evidence integrity validation capability**. This could be addressed by:

1. **New engine** (Evidence Integrity Engine)
2. **Extended existing engine** (add validation to Beta)
3. **Runtime enhancement** (add validation to Runtime)
4. **Governance layer** (add human-guided validation)
5. **Pipeline component** (validate at evidence collection)

**Evidence from this analysis**: Gap closure is feasible but requires architectural decision.

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
