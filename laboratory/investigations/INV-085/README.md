---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
RUNTIME_AUTHORITY: Verified
BOOTSTRAP_VERIFIED: YES
---

# INV-085: Evidence Traceability in Laboratory Outputs

**Investigation ID**: INV-085
**created**: 2026-07-28T08:45:00Z
**Status**: INVESTIGATION
**Type**: Governance Analysis
**Subject**: Evidence Traceability Requirements
**Investigator**: KDE-RUNTIME
**Execution Mode**: KDE_RUNTIME

---

## Executive Summary

This investigation examines whether every statement produced by KDE Laboratory should be supported by traceable evidence before inclusion in final experiment outputs.

**Recommendation**: **MANDATORY EVIDENCE TRACEABILITY**

**Confidence**: HIGH

**Key Finding**: Not every statement requires direct evidence, but all statements must be classified by evidence type, and unsupported statements must be explicitly marked rather than implied as evidence-backed.

---

## 1. Current Laboratory Output Analysis

### 1.1 Statement Types in Laboratory Outputs

| Statement Type | Frequency | Current Practice |
|----------------|-----------|-----------------|
| **Observation** | Common | Usually supported |
| **Fact** | Common | Usually implied, not always cited |
| **Measurement** | Moderate | Usually supported |
| **Analysis** | Common | Variable support |
| **Inference** | Common | Often unsupported |
| **Synthesis** | Moderate | Often unsupported |
| **Hypothesis** | Moderate | Usually marked |
| **Recommendation** | Moderate | Often unsupported |
| **Conclusion** | Rare | Usually claimed |

### 1.2 Current Evidence Practices

| Practice | Status |
|----------|--------|
| Evidence citations | Optional |
| Statement classification | Inconsistent |
| Traceability to artifacts | Rare |
| Unsupported claims marked | Inconsistent |

### 1.3 Problem Statement

**Issue**: Laboratory outputs contain statements that appear to be evidence-backed but are actually inferences, opinions, or hypotheses without clear classification.

**Example from PARETO-CHESS (INV-063)**:
- "70% of games decided by tactics" → Claimed as fact, actually unverified estimate
- "+100 ELO guaranteed" → Claimed as conclusion, actually prediction
- "Novel synthesis" → Claimed as conclusion, actually unverified

---

## 2. Evidence Requirements by Statement Type

### 2.1 Statement Classification Framework

| Statement Type | Definition | Evidence Required | Traceability |
|----------------|-----------|------------------|--------------|
| **Observation** | Direct sensory/input report | Required | To raw data/artifact |
| **Fact** | Verifiable external truth | Required | To external source |
| **Measurement** | Quantified observation | Required | To measurement method |
| **Analysis** | Systematic examination | Required | To methodology |
| **Inference** | Logical derivation from evidence | Required | To supporting evidence |
| **Synthesis** | Combined knowledge creation | Recommended | To component sources |
| **Hypothesis** | Testable prediction | Optional | To theoretical basis |
| **Recommendation** | Suggested action | Optional | To rationale |
| **Conclusion** | Final determination | Required | To evidence base |
| **Opinion** | Personal judgment | Not required | N/A |

### 2.2 Evidence Classification Categories

| Category | Symbol | Description | Requirement |
|----------|--------|-------------|-------------|
| **Direct Evidence** | [E] | Observable, verifiable | Must cite source |
| **Derived Evidence** | [D] | Calculated from [E] | Must show derivation |
| **Inference** | [I] | Logical from evidence | Must show logic |
| **Synthesis** | [S] | Combined knowledge | Must reference components |
| **Hypothesis** | [H] | Untested prediction | Must be labeled |
| **Opinion** | [O] | Personal judgment | Must be labeled |
| **Unknown** | [?] | Unsupported | Must be flagged |

### 2.3 Evidence Strength Levels

| Level | Description | Use |
|-------|-------------|-----|
| **Strong** | Direct, verifiable, multiple sources | Conclusions |
| **Moderate** | Direct but single source, or indirect | Analysis |
| **Weak** | Indirect, circumstantial | Inference |
| **None** | Unsupported | Must be labeled [?] |

---

## 3. Recommended Evidence Traceability Model

### 3.1 Core Principles

| Principle | Application |
|-----------|-------------|
| **Transparency** | Every statement's basis is visible |
| **Classification** | Every statement has evidence type marker |
| **Traceability** | Every [E], [D], [I] links to source |
| **Honesty** | [H], [O], [?] are valid and welcome |
| **Proportionality** | Evidence effort matches claim importance |

### 3.2 Required Statement Format

```
[Statement text here]. [E: Source reference | D: Derivation | I: Logic chain | S: Components | H: Label | O: Label | ?: Label]
```

**Examples**:

```
The cube has 43 quintillion positions. [E: Wikipedia, official count]

COLL covers 90% of corner cases. [D: Calculated from 57/expected patterns]

Endgames have highest ROI. [I: Based on [E] retention studies + [E] ELO data]

PARETO-CHESS is novel. [?: Novelty unknown - no prior art comparison]

We recommend endgames first. [O: Based on analysis preference]
```

### 3.3 Artifact Integration

| Statement Type | Required Artifact |
|----------------|-------------------|
| Observation | Source artifact, timestamp |
| Fact | External reference |
| Measurement | Methodology document |
| Analysis | Process artifact |
| Inference | Evidence chain document |
| Synthesis | Component references |
| Hypothesis | Theoretical basis |
| Recommendation | Rationale document |
| Conclusion | Full evidence summary |

---

## 4. Statement Types: Evidence Requirements

### 4.1 Observation

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | Yes |
| **Traceability** | To source artifact |
| **Example** | `[E: laboratory/observations/OBS-001.md]` |
| **Non-compliance** | Cannot claim as verified observation |

### 4.2 Fact

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | Yes |
| **Traceability** | To external verifiable source |
| **Example** | `[E: Wikipedia: Rubik's Cube, official count]` |
| **Non-compliance** | Classify as [I] inference or [O] opinion |

### 4.3 Measurement

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | Yes |
| **Traceability** | To methodology |
| **Example** | `[D: Derived from [E: LAB-061/SPEC.md methodology]]` |
| **Non-compliance** | Classify as estimate [H] |

### 4.4 Analysis

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | Yes |
| **Traceability** | To process/methodology |
| **Example** | `[D: Based on [E: comparative_analysis.md]]` |
| **Non-compliance** | Cannot claim as systematic analysis |

### 4.5 Inference

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | Yes (inferential) |
| **Traceability** | To supporting evidence chain |
| **Example** | `[I: Based on [E: study1] + [E: study2] → logical chain]` |
| **Non-compliance** | Classify as [O] opinion if no logic chain |

### 4.6 Synthesis

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | Recommended |
| **Traceability** | To component sources |
| **Example** | `[S: Combined [E: LAB-061] + [D: LAB-062] + [I: INV-082]]` |
| **Non-compliance** | Label [?: Components unverified] |

### 4.7 Hypothesis

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | No (by definition) |
| **Traceability** | To theoretical basis (if any) |
| **Example** | `[H: Proposed, requires experimental validation]` |
| **Non-compliance** | Cannot present as conclusion |

### 4.8 Recommendation

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | No, but rationale preferred |
| **Traceability** | To analysis/rationale |
| **Example** | `[O: Based on [D: efficiency_analysis] + [I: user_needs]]` |
| **Non-compliance** | Acceptable as [O] if no rationale |

### 4.9 Conclusion

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | Yes, with strength assessment |
| **Traceability** | To full evidence base |
| **Example** | `[E/D: Supported by [E: study1], [D: analysis], [I: inference]]` |
| **Non-compliance** | Classify as preliminary [H] or working theory |

### 4.10 Opinion

| Requirement | Standard |
|-------------|----------|
| **Evidence Required** | No |
| **Traceability** | N/A |
| **Example** | `[O: Author's judgment based on experience]` |
| **Non-compliance** | Must be labeled [O], not hidden as fact |

---

## 5. Handling Unsupported Statements

### 5.1 Response Options Matrix

| Response | When to Use | Impact |
|----------|-------------|--------|
| **Mark [?]** | Cannot verify, claim may be valid | Preserves statement |
| **Downgrade** | Weak evidence exists | Reduces confidence |
| **Reclassify [H]** | Untested prediction | Explicitly hypothesis |
| **Reclassify [O]** | Personal judgment | Explicitly opinion |
| **Remove** | Claim is false or irrelevant | Deletes statement |

### 5.2 Decision Tree

```
Statement lacks traceable evidence?
      │
      ├─ YES
      │    ├─ Can derive from existing evidence?
      │    │    ├─ YES → Mark [D] with derivation
      │    │    └─ NO
      │    │         ├─ Is it testable prediction?
      │    │         │    ├─ YES → Mark [H], requires validation
      │    │         │    └─ NO
      │    │         │         ├─ Is it personal judgment?
      │    │         │         │    ├─ YES → Mark [O]
      │    │         │         │    └─ NO → Mark [?], review
      │    │         │         └─ Can add evidence?
      │    │         │              ├─ YES → Add evidence, reclassify
      │    │         │              └─ NO → Mark [?], note gap
      │    │         └─ Does it affect conclusion?
      │    │              ├─ YES → Flag in conclusion
      │    │              └─ NO → Acceptable
      │    └─ Is it a conclusion claim?
      │         ├─ YES → Cannot publish as conclusion
      │         └─ NO → Acceptable with label
      │
      └─ NO → Evidence traceable, proceed
```

### 5.3 Impact on Laboratory Conclusion

| Unsupported Element | Impact on Conclusion |
|--------------------|--------------------|
| Key evidence gap | Conclusion weakened, must note |
| Minor gap | Conclusion acceptable, note limitations |
| Major claim unsupported | Cannot draw conclusion |
| Synthesis unsupported | Mark as working synthesis |

---

## 6. Evidence Traceability Model

### 6.1 Proposed Model: TRACE

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRACE MODEL                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  T - TYPE: Classify every statement                             │
│  R - REFERENCE: Link to source artifacts                       │
│  A - ASSESS: Evaluate evidence strength                         │
│  C - CALIBRATE: Match language to evidence                      │
│  E - EXPLICIT: Mark limitations and gaps                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 TRACE Implementation

| Element | Action | Example |
|---------|--------|---------|
| **T - Type** | Classify statement type | `[Observation]` |
| **R - Reference** | Link to evidence | `[E: source.md]` |
| **A - Assess** | Rate strength | `[Strong/Moderate/Weak]` |
| **C - Calibrate** | Adjust language | Use "suggests" not "proves" |
| **E - Explicit** | Note gaps | `[Gap: source not verified]` |

### 6.3 TRACE in Practice

**Before TRACE**:
```
Endgames have the highest ROI of any study method.
```

**After TRACE**:
```
Endgames have the highest ROI of any study method. 
[T: Inference, R: [E: Chess.com retention study], [E: ELO analysis], 
 A: Moderate, C: Evidence suggests but doesn't prove, 
 E: Alternative explanations not ruled out]
```

---

## 7. Risks of Unsupported Statements

### 7.1 Risk Matrix

| Risk | Severity | Likelihood | Impact |
|------|----------|------------|--------|
| False conclusions | HIGH | MEDIUM | Damaged credibility |
| Misleading recommendations | HIGH | MEDIUM | Poor decisions |
| Unverifiable claims | MEDIUM | HIGH | Reduced trust |
| Inconsistent standards | MEDIUM | HIGH | Confusion |
| Overconfidence | HIGH | MEDIUM | Premature adoption |

### 7.2 Risk: False Conclusions

**Scenario**: Unsupported inference presented as fact leads to incorrect conclusion.

**Example**: PARETO-CHESS claiming "+100 ELO guaranteed" without evidence.

**Mitigation**: Conclusions require [E] or [D] classification, not [I] alone.

### 7.3 Risk: Misleading Recommendations

**Scenario**: Opinion presented as evidence-based recommendation.

**Example**: "Study endgames first" without noting it's preference, not proven.

**Mitigation**: Recommendations must be [O] or include [D] evidence chain.

### 7.4 Risk: Unverifiable Claims

**Scenario**: Quantitative claims without methodology.

**Example**: "70% of games decided by tactics" with no source.

**Mitigation**: Measurements require [D] with derivation method.

### 7.5 Risk: Inconsistent Standards

**Scenario**: Some statements traced, others not.

**Impact**: Users cannot trust any classification.

**Mitigation**: Mandatory TRACE model, governance enforcement.

### 7.6 Risk: Overconfidence

**Scenario**: [I] inference presented as [E] fact.

**Example**: "Diminishing returns proven" when actually hypothesized.

**Mitigation**: Explicit calibration between statement type and language.

---

## 8. Governance Implications

### 8.1 Required Governance Rules

| Rule | Description | Priority |
|------|-------------|----------|
| **TRACE_REQUIRED** | All statements classified | HIGH |
| **CONCLUSION_EVIDENCE** | Conclusions require [E] or [D] | HIGH |
| **GAP_DISCLOSURE** | Evidence gaps explicitly noted | HIGH |
| **CONFIDENCE_LANGUAGE** | Language matches evidence strength | MEDIUM |
| **TRACEABILITY_LINK** | [E], [D], [I] statements link to sources | HIGH |

### 8.2 ECU Integration Points

| Check | Current | Proposed |
|-------|---------|----------|
| Statement classification | None | Required |
| Evidence links | Optional | Required for [E], [D], [I] |
| Language calibration | None | Enforced |
| Gap disclosure | Inconsistent | Required |

### 8.3 Compliance Requirements

| Output Type | TRACE Required | Conclusion Evidence |
|-------------|----------------|---------------------|
| Investigation | Yes | Yes (if conclusion) |
| Experiment | Yes | Yes |
| Synthesis | Yes | Yes |
| Review | Yes | Yes (if verdict) |
| Memo | Recommended | N/A |

---

## 9. Process Modifications

### 9.1 Modified Output Process

```
Investigation
    ↓
Evidence Collection
    ↓
Statement Drafting (with TRACE)
    ↓
Evidence Classification (per statement)
    ↓
Traceability Check
    ↓
Language Calibration
    ↓
Gap Identification
    ↓
Conclusion (if evidence supports)
    ↓
Challenge (verify TRACE compliance)
    ↓
Publication
```

### 9.2 Required Templates

| Template | Purpose |
|----------|---------|
| **evidence-statement.md** | Statement with evidence annotation |
| **conclusion-evidence.md** | Conclusion with full evidence summary |
| **gap-report.md** | Documented evidence gaps |

### 9.3 Training Requirements

| Training | Audience | Priority |
|----------|----------|----------|
| TRACE methodology | All investigators | HIGH |
| Evidence classification | All investigators | HIGH |
| Language calibration | All investigators | MEDIUM |
| ECU compliance | Governance | MEDIUM |

---

## 10. Final Recommendation

### 10.1 Core Recommendation

**Implement MANDATORY EVIDENCE TRACEABILITY for all laboratory outputs.**

### 10.2 Specific Mandates

| Mandate | Requirement |
|---------|-------------|
| **Statement Classification** | Every statement tagged with evidence type |
| **Traceability** | [E], [D], [I] statements link to sources |
| **Gap Disclosure** | Evidence gaps explicitly noted |
| **Language Calibration** | Language matches evidence strength |
| **Conclusion Evidence** | Conclusions require [E] or [D], not [I] alone |

### 10.3 Exceptions

| Exception | Justification |
|-----------|---------------|
| Opinion [O] | Valid, just requires labeling |
| Hypothesis [H] | Valid as hypothesis, not conclusion |
| Unknown [?] | Acceptable with acknowledgment |

### 10.4 Implementation Phases

| Phase | Changes | Timeline |
|-------|---------|----------|
| **Phase 1** | Templates + training | 1 week |
| **Phase 2** | Voluntary TRACE adoption | 2 weeks |
| **Phase 3** | Governance rules + ECU check | 1 week |
| **Phase 4** | Mandatory compliance | Ongoing |

### 10.5 Success Metrics

| Metric | Target |
|--------|--------|
| Statement classification rate | 100% |
| Evidence link completeness | ≥90% |
| Gap disclosure rate | 100% |
| Language calibration accuracy | ≥95% |

---

## 11. Summary

### 11.1 Key Decisions

| Question | Recommendation |
|----------|----------------|
| Should every statement be traced? | **YES** - but classification not all require evidence |
| Which types require evidence? | [E], [D], [I], Conclusions |
| Which types may be unsupported? | [H], [O], [?] with labeling |
| Should evidence be mandatory? | **YES** for conclusions, [E]/[D]/[I] |
| What happens to unsupported? | Classify appropriately, note gaps |
| Should TRACE be governance rule? | **YES** - mandatory with exceptions |

### 11.2 Confidence Summary

| Finding | Confidence | Rationale |
|---------|------------|-----------|
| TRACE model is sound | HIGH | Based on academic standards |
| Implementation is feasible | HIGH | Templates reduce overhead |
| Governance integration | MODERATE | ECU changes required |
| Cultural adoption | MODERATE | Training required |

### 11.3 Final Verdict

**RECOMMENDATION**: Implement mandatory evidence traceability (TRACE) model with the following requirements:

1. Every statement classified by evidence type
2. [E], [D], [I] statements trace to sources
3. Conclusions require [E] or [D], not [I] alone
4. Evidence gaps explicitly disclosed
5. Language calibrated to evidence strength
6. [H], [O], [?] accepted with proper labeling

**This transforms KDE Laboratory outputs from "claims" to "classified statements with known confidence levels."**

---

## Document Status

**Status**: INVESTIGATION
**Type**: Governance Analysis
**Confidence**: HIGH
**Ready for Implementation**: Yes
**Human Review Required**: Yes
