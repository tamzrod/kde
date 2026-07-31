# EXP-001: Evidence-to-Action Decision Policies

**Experiment ID**: EXP-001  
**Title**: Evidence-to-Action Decision Policies  
**Parent Investigation**: INV-018 (Evidence-to-Action Decision Framework)  
**Status**: COMPLETE  
**Date**: 2026-07-21  
**Engine**: KDE-ENGINE-004 (Delta)  

---

## Purpose

This experiment evaluates how KDE should determine the next action after an Investigation or Experiment produces evidence.

**Objective**: Identify the most appropriate decision policy for transitioning from evidence to the next stage of the scientific workflow.

---

## Research Question

> Which decision policy provides the best balance between scientific rigor, repeatability, governance, and engineering effectiveness?

---

## Policy Analysis

### Policy A — Immediate Implementation

#### Description
Immediately implement every validated recommendation without additional review.

#### Decision Process
```
Evidence Produced
    │
    ▼
Recommendation Validated
    │
    ▼
IMMEDIATE IMPLEMENTATION
    │
    ▼
Execute Recommendation
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Speed | No delay between evidence and action |
| Efficiency | Minimal process overhead |
| Simplicity | Binary decision (validated → implement) |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| No governance | Governance bypassed |
| No rollback | Implementation irreversible |
| Risk acceptance | Untested recommendations implemented |
| No escalation | All decisions treated equally |

#### Risks
| Risk | Severity | Mitigation |
|------|---------|------------|
| Failed implementation | HIGH | None |
| Governance bypass | HIGH | Violates SOP |
| Incomplete validation | MEDIUM | Assumes validation complete |
| Resource waste | MEDIUM | May implement wrong solution |

#### KDE Compatibility
- **Incompatible**: Violates Governance ownership
- Evidence: SOP-006 requires Governance approval for knowledge promotion
- Evidence: INV-013 showed "Production-ready" without verification

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Scientific Rigor | 2/10 | Bypasses peer review |
| Repeatability | 6/10 | Binary decision |
| Explainability | 4/10 | "It was validated" |
| Governance Alignment | 1/10 | Violates governance |
| Simplicity | 9/10 | Minimal process |
| Scalability | 5/10 | Fast but risky |
| Engineering Effectiveness | 4/10 | Speed vs risk tradeoff |
| **Total** | **31/70** | |

---

### Policy B — Investigator Decision

#### Description
Allow the investigator to determine the next action after producing evidence.

#### Decision Process
```
Evidence Produced
    │
    ▼
Investigator Decides Next Action
    │
    ├─── Implement
    ├─── New Investigation
    ├─── New Experiment
    └─── Submit to Governance
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Context-aware | Investigator knows the evidence |
| Flexible | Can adapt to situation |
| Efficient | No waiting for external approval |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Bias | Investigator may favor implementation |
| Inconsistency | Different investigators = different decisions |
| Accountability | Who is responsible? |
| No governance | Governance bypassed |

#### Risks
| Risk | Severity | Mitigation |
|------|---------|------------|
| Investigator bias | HIGH | External review |
| Inconsistent decisions | MEDIUM | Decision log |
| Accountability gap | MEDIUM | Document decisions |
| Knowledge silos | LOW | Share decisions |

#### KDE Compatibility
- **Partial**: Investigator has context but lacks authority
- Evidence: SOP-007 prohibits automatic investigation creation
- Evidence: INV-014 showed investigator conclusions need review

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Scientific Rigor | 4/10 | Subjective decisions |
| Repeatability | 3/10 | Investigator-dependent |
| Explainability | 5/10 | "Investigator decided" |
| Governance Alignment | 3/10 | Partial authority |
| Simplicity | 7/10 | Flexible |
| Scalability | 5/10 | Investigator-dependent |
| Engineering Effectiveness | 5/10 | Context-aware |
| **Total** | **32/70** | |

---

### Policy C — Evidence Threshold

#### Description
Require predefined evidence criteria before progressing. Progress only when evidence meets or exceeds threshold.

#### Decision Process
```
Evidence Produced
    │
    ▼
Evaluate Against Thresholds
    │
    ├─── p-value < 0.05?
    ├─── Sample size >= 30?
    ├─── Replication count >= 2?
    └─── Independent validation?
    │
    ▼
Threshold Met?
    │
    ├─── YES ──► Progress
    └─── NO ──► Require More Evidence
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Objective | Based on measurable criteria |
| Repeatable | Same evidence = same decision |
| Scientifically grounded | Statistical thresholds |
| Defensible | "Evidence met threshold" |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Rigidity | Thresholds may be inappropriate |
| Binary | Near-threshold issues ignored |
| Threshold setting | Who determines thresholds? |
| Domain gaps | Different domains need different thresholds |

#### Risks
| Risk | Severity | Mitigation |
|------|---------|------------|
| Wrong thresholds | HIGH | Domain-specific calibration |
| False negatives | MEDIUM | Allow threshold appeals |
| False positives | MEDIUM | Conservative thresholds |
| Gaming | LOW | Multiple thresholds |

#### KDE Compatibility
- **Good**: Aligns with scientific method
- Evidence: KDE seed includes statistical model
- Evidence: Supports reproducibility

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Scientific Rigor | 9/10 | Statistical thresholds |
| Repeatability | 9/10 | Objective criteria |
| Explainability | 8/10 | "Met threshold X" |
| Governance Alignment | 6/10 | Scientific but no governance |
| Simplicity | 5/10 | Threshold management |
| Scalability | 6/10 | Domain-specific needed |
| Engineering Effectiveness | 6/10 | Quality vs speed |
| **Total** | **49/70** | |

---

### Policy D — Governance Approval

#### Description
Submit findings to Governance. Governance determines the next action.

#### Decision Process
```
Evidence Produced
    │
    ▼
Submit to Governance
    │
    ▼
Governance Review
    │
    ├─── Implementation Approved
    ├─── Additional Experiments Required
    ├─── New Investigation Initiated
    ├─── Knowledge Promotion Approved
    └─── Rejected
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Authority | Governance has authority |
| Consistency | Centralized decisions |
| Accountability | Clear ownership |
| Alignment | Matches KDE structure |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Bottleneck | All decisions queue at Governance |
| Slow | Review takes time |
| Capacity | Governance has limited bandwidth |
| Context loss | Governance may lack evidence context |

#### Risks
| Risk | Severity | Mitigation |
|------|---------|------------|
| Governance bottleneck | HIGH | Triage process |
| Decision delay | MEDIUM | SLA targets |
| Context gaps | MEDIUM | Evidence package |
| Capacity limits | MEDIUM | Delegate minor decisions |

#### KDE Compatibility
- **Excellent**: Matches KDE architecture
- Evidence: Governance owns SOP
- Evidence: All knowledge promotion requires approval

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Scientific Rigor | 6/10 | Human review |
| Repeatability | 6/10 | Governance-dependent |
| Explainability | 8/10 | "Governance approved" |
| Governance Alignment | 10/10 | Matches architecture |
| Simplicity | 6/10 | Clear ownership |
| Scalability | 3/10 | Bottleneck risk |
| Engineering Effectiveness | 7/10 | Quality focus |
| **Total** | **46/70** | |

---

### Policy E — Decision Matrix

#### Description
Determine the next action using evidence characteristics. Map evidence properties to appropriate actions.

#### Decision Process
```
Evidence Produced
    │
    ▼
Assess Evidence Characteristics
    │
    ├─── Evidence Strength (1-10)
    ├─── Confidence Level (1-10)
    ├─── Risk Assessment (1-10)
    ├─── Engineering Impact (1-10)
    └─── Reproducibility (1-10)
    │
    ▼
Apply Decision Matrix
    │
    ├─── High strength + High confidence + Low risk ──► Implement
    ├─── Medium strength ──► Additional Experiment
    ├─── Low strength ──► New Investigation
    ├─── High confidence + Reproducible ──► Knowledge Promotion
    └─── High risk ──► Governance Escalation
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Comprehensive | Multiple factors considered |
| Flexible | Matrix can be tuned |
| Repeatable | Same evidence → same decision |
| Transparent | Decision criteria visible |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Complexity | Requires matrix management |
| Matrix calibration | Optimal weights unknown |
| Subjectivity | Weight assignment is subjective |
| Maintenance | Matrix evolves with KDE |

#### Risks
| Risk | Severity | Mitigation |
|------|---------|------------|
| Matrix gaming | MEDIUM | Multiple factors |
| Wrong weights | MEDIUM | Calibration experiments |
| Complexity | LOW | Clear documentation |
| Staleness | LOW | Regular review |

#### KDE Compatibility
- **Good**: Supports governance while adding structure
- Evidence: Can integrate with SOP-005
- Evidence: Provides framework for INV-015 recommendations

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Scientific Rigor | 7/10 | Multiple factors |
| Repeatability | 8/10 | Matrix-based |
| Explainability | 9/10 | "Evidence score X triggered Y" |
| Governance Alignment | 8/10 | Supports governance |
| Simplicity | 5/10 | Matrix complexity |
| Scalability | 7/10 | General framework |
| Engineering Effectiveness | 8/10 | Structured decisions |
| **Total** | **52/70** | **HIGHEST RANKED** |

---

## Comparative Analysis

### Policy Comparison Matrix

| Policy | Scientific | Repeatability | Explainability | Governance | Simplicity | Scalability | Engineering | **Total** |
|--------|------------|---------------|----------------|------------|------------|-------------|-------------|-----------|
| A: Immediate | 2 | 6 | 4 | 1 | 9 | 5 | 4 | **31** |
| B: Investigator | 4 | 3 | 5 | 3 | 7 | 5 | 5 | **32** |
| C: Threshold | 9 | 9 | 8 | 6 | 5 | 6 | 6 | **49** |
| D: Governance | 6 | 6 | 8 | 10 | 6 | 3 | 7 | **46** |
| **E: Matrix** | 7 | 8 | 9 | 8 | 5 | 7 | 8 | **52** |

### Ranking

| Rank | Policy | Total | Recommendation |
|------|--------|-------|---------------|
| 1 | **E: Decision Matrix** | **52** | ✅ **RECOMMENDED** |
| 2 | C: Evidence Threshold | 49 | Alternative |
| 3 | D: Governance | 46 | Complementary |
| 4 | B: Investigator | 32 | Not recommended |
| 5 | A: Immediate | 31 | ❌ **REJECTED** |

---

## Recommendation

### Adopt Policy E — Decision Matrix (with Governance Integration)

### Rationale

1. **Comprehensive**: Evaluates multiple evidence characteristics
2. **Repeatable**: Matrix-based decisions are consistent
3. **Explainable**: "Evidence score X triggered action Y"
4. **Governance-aligned**: Can escalate to Governance when needed
5. **Evidence-based**: Addresses INV-015 and INV-016 findings

### Integration with Governance

The Decision Matrix should integrate with Policy D (Governance Approval):

```
Evidence Characteristics Assessed
    │
    ▼
Matrix Decision Made
    │
    ├─── Standard Action ──► Execute
    └─── High Risk / High Impact ──► Governance Approval
```

### Implementation Requirements

For INV-018 (Evidence-to-Action Framework):

1. **Define Evidence Characteristics**: Strength, confidence, risk, impact, reproducibility
2. **Define Decision Matrix**: Map characteristics to actions
3. **Define Escalation Criteria**: When to involve Governance
4. **Document Matrix**: Transparent decision criteria

---

## Lessons Learned

### What This Experiment Taught

1. **Immediate implementation is dangerous**: Policy A scored 31, violates governance
2. **Investigator decision is inconsistent**: Policy B scored 32, depends on person
3. **Evidence thresholds are scientific**: Policy C scored 49, good for rigor
4. **Governance is authoritative but slow**: Policy D scored 46, bottleneck risk
5. **Decision matrix is comprehensive**: Policy E scored 52, best overall

### Key Insight

The best evidence-to-action policy combines the Decision Matrix with Governance escalation. The Matrix provides structure and repeatability; Governance provides authority for high-stakes decisions.

---

## Follow-up Experiments

### Recommended

| Experiment | Purpose |
|------------|---------|
| EXP-002 | Validate decision matrix weights |
| EXP-003 | Compare matrix vs threshold approaches |
| EXP-004 | Define escalation criteria for Governance |

---

## Experiment Completeness

| Requirement | Status |
|-------------|--------|
| All 5 policies analyzed | ✅ |
| Comparison matrix produced | ✅ |
| Recommendation made | ✅ |
| Rationale documented | ✅ |
| Lessons learned captured | ✅ |
| Follow-up experiments proposed | ✅ |

---

**Experiment Status**: COMPLETE  
**Confidence**: HIGH (based on comparative analysis)  
**Recommendation**: Adopt Policy E - Decision Matrix (with Governance integration)

---

*Generated by KDE under EXP-001*
*Evidence-based policy evaluation*
