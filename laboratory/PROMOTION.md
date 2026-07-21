# Knowledge Promotion

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: PRODUCTION
**Authority**: Architecture C

---

## Overview

This document defines the knowledge promotion workflow for the KDE Laboratory. It establishes how candidate knowledge becomes validated knowledge in the `/knowledge/` subsystem.

---

## Promotion Principles

| Principle | Description |
|-----------|-------------|
| **Human Authority** | Only humans can promote knowledge (Rule 3: No Self-Promotion) |
| **Evidence-Based** | All promotion based on validated evidence |
| **Progressive Maturity** | Knowledge gains maturity through validation |
| **Transparent Process** | All promotion decisions documented |

---

## Knowledge Maturity Levels

All Laboratory conclusions progress through maturity levels before becoming established knowledge:

| Level | Name | Description | Requirements |
|-------|------|-------------|--------------|
| Level 1 | Experimental | Single successful execution | 1 run |
| Level 2 | Repeatable | Multiple runs under same Seed/Engine converge | 10+ runs |
| Level 3 | Reproducible | Different Seeds and/or Engines converge | 60+ runs |
| Level 4 | Generalized | Conclusion holds across different domains | Domain validation |
| Level 5 | Established | No contradictory evidence exists | Sustained validation |

---

## Promotion Criteria

### For Any Promotion

| Criterion | Description | Verification |
|-----------|-------------|---------------|
| **Evidence Quality** | Claims trace to documented evidence | Review evidence files |
| **Logical Consistency** | Reasoning follows from evidence | Review analysis |
| **Assumption Management** | Assumptions are documented | Review experiment |
| **Completeness** | All dimensions addressed | Review scope |

### Level 2 Promotion (Repeatable)

| Criterion | Threshold | Verification |
|-----------|-----------|---------------|
| **Run Count** | ≥10 runs | Count runs |
| **Agreement Rate** | ≥80% | Calculate statistics |
| **Confidence** | MEDIUM+ | Assess reasoning quality |

### Level 3 Promotion (Reproducible)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| **Configurations** | ≥2 different Seeds or Engines | Review configurations |
| **Total Runs** | ≥60 runs | Count runs |
| **Directional Agreement** | 100% | Calculate agreement |
| **Confidence** | HIGH | Assess all evidence |

### Level 4 Promotion (Generalized)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| **Domain Coverage** | ≥3 different domains | Review scope |
| **Cross-Domain Agreement** | ≥80% | Calculate agreement |
| **Confidence** | HIGH | Assess all evidence |

### Level 5 Promotion (Established)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| **Sustained Validation** | ≥6 months | Review timeline |
| **Contradictory Evidence** | None | Review all evidence |
| **Community Acceptance** | Documented | Review discussions |

---

## Promotion Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE PROMOTION WORKFLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────┐
    │ STEP 1: Evidence Collection                                      │
    │                                                                   │
    │ - Gather empirical evidence                                       │
    │ - Verify evidence integrity (SHA-256)                           │
    │ - Document all evidence                                           │
    └─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ STEP 2: Validation                                               │
    │                                                                   │
    │ - Verify evidence quality                                         │
    │ - Verify logical consistency                                      │
    │ - Assess confidence level                                         │
    └─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ STEP 3: Candidate Knowledge                                      │
    │                                                                   │
    │ - Formulate conclusion                                           │
    │ - Document limitations                                            │
    │ - Assess maturity level                                           │
    └─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ STEP 4: Promotion Proposal                                       │
    │                                                                   │
    │ - Prepare promotion proposal                                     │
    │ - Include all required evidence                                  │
    │ - Submit to Governance                                           │
    └─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ STEP 5: Human Approval (REQUIRED)                                │
    │                                                                   │
    │ - Human reviews proposal                                         │
    │ - Human approves promotion                                       │
    │ - Human executes promotion                                       │
    └─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ STEP 6: Promotion                                               │
    │                                                                   │
    │ - Move knowledge to /knowledge/                                  │
    │ - Update investigation status                                    │
    │ - Update knowledge index                                         │
    └─────────────────────────────────────────────────────────────────┘
```

---

## Promotion Proposal

### Proposal Template

```markdown
# Knowledge Promotion Proposal: [Title]

**Investigation**: INV-XXX
**Experiment**: LAB-XXX
**Proposed Date**: YYYY-MM-DD
**Proposer**: [Name]

---

## Candidate Knowledge

### Knowledge Statement

[Clear, precise statement of knowledge]

### Confidence Level

| Factor | Assessment |
|--------|------------|
| Evidence Quality | [HIGH/MEDIUM/LOW] |
| Reproducibility | [HIGH/MEDIUM/LOW] |
| Consistency | [HIGH/MEDIUM/LOW] |
| Overall Confidence | [HIGH/MEDIUM/LOW] |

### Maturity Level

| Level | Name | Criteria Met |
|-------|------|--------------|
| Level 1 | Experimental | Yes |
| Level 2 | Repeatable | [Yes/No] |
| Level 3 | Reproducible | [Yes/No] |
| Level 4 | Generalized | [Yes/No] |
| Level 5 | Established | [Yes/No] |

**Proposed Level**: [Level X]

---

## Evidence Summary

### Supporting Evidence

| Evidence ID | Type | Description | Relevance |
|-------------|------|-------------|-----------|
| EV-001 | measurement | [Description] | High |
| EV-002 | log | [Description] | High |

### Contradicting Evidence (if any)

| Evidence ID | Type | Description | Impact |
|-------------|------|-------------|--------|
| EV-XXX | [Type] | [Description] | [Minor/Major/Critical] |

---

## Validation Summary

| Criterion | Status |
|-----------|--------|
| Evidence Quality | [PASS/FAIL] |
| Logical Consistency | [PASS/FAIL] |
| Assumption Management | [PASS/FAIL] |
| Completeness | [PASS/FAIL] |

---

## Limitations

[Any limitations or boundary conditions of this knowledge]

---

## Justification

[Why this knowledge should be promoted at the proposed level]

---

## Attachments

- Investigation: [Link]
- Experiment: [Link]
- Evidence: [Link]
- Validation Report: [Link]

---

## Approval

| Role | Name | Date | Decision |
|------|------|------|----------|
| Laboratory | [Name] | YYYY-MM-DD | PROPOSED |
| Governance | [Name] | YYYY-MM-DD | [APPROVED/REJECTED] |
| Human | [Name] | YYYY-MM-DD | [PROMOTED/NOT PROMOTED] |

---

## Promotion Log

| Date | Action | By |
|------|--------|-----|
| YYYY-MM-DD | Proposal created | Laboratory |
| YYYY-MM-DD | Approved by Governance | Governance |
| YYYY-MM-DD | Promoted to /knowledge/ | Human |
```

---

## Anti-Patterns

The following are NOT valid promotion criteria:

| Anti-Pattern | Why Invalid |
|--------------|-------------|
| "One run succeeded" | Insufficient evidence |
| "Majority agreed" | No threshold, no confidence |
| "Previous experiments agreed" | No independence |
| "Engine recommends" | No evidence-based validation |
| "Seemed obvious" | Subjective, not empirical |

---

## Promotion Checklist

### For Laboratory

- [ ] All runs completed
- [ ] Statistics generated
- [ ] Synthesis created
- [ ] Self-assessment documented
- [ ] Maturity level determined
- [ ] Evidence linked
- [ ] Conclusion clear
- [ ] Promotion proposal prepared
- [ ] Proposal submitted to Governance

### For Governance

- [ ] Evidence reviewed
- [ ] Conclusions validated
- [ ] Promotion approved
- [ ] Knowledge entry created (after human promotion)
- [ ] Historical reference preserved

### For Human

- [ ] Proposal reviewed
- [ ] Decision made
- [ ] Knowledge promoted (if approved)

---

## Escalation

### Low Confidence

If confidence is LOW:
1. Conduct more runs
2. Strengthen evidence
3. Re-assess

### Contradictory Evidence

If evidence contradicts conclusion:
1. Document contradiction
2. Investigate cause
3. Revise or reject conclusion

### Ambiguous Results

If results are ambiguous:
1. Clarify question
2. Narrow scope
3. Conduct targeted experiments

---

## Appeals

If a promotion is denied:

1. Review rejection reasons
2. Address identified issues
3. Submit revised evidence
4. Request re-evaluation

---

## Promotion Outcomes

| Outcome | Description | Next Action |
|---------|-------------|-------------|
| **PROMOTED** | Knowledge moved to /knowledge/ | Update indices |
| **REJECTED** | Promotion denied | Address issues |
| **DEFERRED** | More evidence needed | Conduct more runs |
| **CONDITIONAL** | Approved with conditions | Address conditions |

---

## Governance Checkpoints

| Checkpoint | Purpose | Authority |
|------------|---------|-----------|
| Evidence Quality | Verify evidence meets standards | Laboratory |
| Validation | Verify findings are valid | Laboratory |
| Maturity Assessment | Verify maturity level | Laboratory |
| Promotion Approval | Approve promotion | Human |
| Promotion Execution | Execute promotion | Human |

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Initial version | Architecture C |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [`WORKFLOW.md`](./WORKFLOW.md) | Investigation lifecycle |
| [`VALIDATION.md`](./VALIDATION.md) | Validation protocols |
| [`EVIDENCE.md`](./EVIDENCE.md) | Evidence management |
| [`RULES.md`](./RULES.md) | Core Laboratory rules |
| [`governance/promotion-rules.md`](./governance/promotion-rules.md) | Promotion rules |

---

**Document Status**: PRODUCTION
**Authority**: Architecture C
**Key Principle**: AI cannot promote knowledge. Only humans can set PROMOTED state.
