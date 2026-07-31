# Promotion Proposal Template

**Template Version**: 1.0.0
**Date**: 2026-07-21
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for knowledge promotion proposals. Only humans can approve promotion; AI cannot set PROMOTED state.

---

## Promotion Proposal Template

```markdown
# Knowledge Promotion Proposal: [Title]

**Investigation**: INV-XXX
**Experiment**: LAB-XXX (if applicable)
**Proposed Date**: YYYY-MM-DD
**Proposer**: [Name/Role]

---

## Candidate Knowledge

### Knowledge Statement

[Clear, precise statement of the knowledge to be promoted]

### Definition

[Formal definition of the knowledge, if applicable]

### Scope

**What this knowledge applies to**:
- [Item 1]
- [Item 2]

**What this knowledge does not apply to**:
- [Item 1]
- [Item 2]

### Confidence Level

| Factor | Assessment |
|--------|------------|
| Evidence Quality | [HIGH/MEDIUM/LOW] |
| Reproducibility | [HIGH/MEDIUM/LOW] |
| Consistency | [HIGH/MEDIUM/LOW] |
| Overall Confidence | [HIGH/MEDIUM/LOW] |

---

## Maturity Assessment

### Knowledge Maturity Levels

| Level | Name | Requirements |
|-------|------|---------------|
| Level 1 | Experimental | 1 run |
| Level 2 | Repeatable | 10+ runs, same Seed/Engine |
| Level 3 | Reproducible | 60+ runs, different configurations |
| Level 4 | Generalized | Cross-domain validation |
| Level 5 | Established | Sustained validation, no contradictions |

### Current Maturity

| Criterion | Requirement | Status |
|-----------|-------------|--------|
| Run Count | ≥[N] runs | [N] runs completed |
| Agreement Rate | ≥80% | [X]% agreement |
| Reproducibility | Consistent across runs | [YES/NO] |

**Proposed Level**: [Level X]

**Justification**: [Why this level is appropriate]

---

## Evidence Summary

### Supporting Evidence

| Evidence ID | Type | Description | Relevance |
|-------------|------|-------------|-----------|
| EV-001 | measurement | [Description] | High |
| EV-002 | log | [Description] | High |
| EV-003 | screenshot | [Description] | Medium |

### Contradicting Evidence (if any)

| Evidence ID | Type | Description | Impact |
|-------------|------|-------------|--------|
| EV-XXX | [Type] | [Description] | [NONE/MINOR/MAJOR/CRITICAL] |

**Impact Assessment**: [No impact | Minimal impact | Significant impact | Critical impact]

---

## Validation Summary

| Criterion | Status | Notes |
|-----------|--------|-------|
| Evidence Quality | [PASS/FAIL] | |
| Logical Consistency | [PASS/FAIL] | |
| Assumption Management | [PASS/FAIL] | |
| Completeness | [PASS/FAIL] | |
| Reproducibility | [PASS/FAIL] | |
| Alternative Explanations | [PASS/FAIL] | |
| Limitations | [PASS/FAIL] | |
| Confidence | [PASS/FAIL] | |

**Validation Status**: [PASS | CONDITIONAL PASS | FAIL]

**Validator**: [Name]

**Date**: YYYY-MM-DD

---

## Rationale

### Why This Knowledge Should Be Promoted

[Detailed justification for promotion]

### How This Knowledge Extends Existing Knowledge

[Relationship to existing knowledge in /knowledge/]

### Implications for KDE

[Impact on KDE if this knowledge is promoted]

---

## Limitations

[Any limitations or boundary conditions of this knowledge]

---

## Future Work

[Recommendations for future investigation or validation]

---

## Attachments

- Investigation: [`../investigations/INV-XXX/investigation.md`](../investigations/INV-XXX/investigation.md)
- Conclusion: [`../investigations/INV-XXX/conclusion.md`](../investigations/INV-XXX/conclusion.md)
- Validation Report: [`../validations/VAL-XXX/validation.md`](../validations/VAL-XXX/validation.md)
- Evidence Index: [`../experiments/LAB-XXX/evidence/index.md`](../experiments/LAB-XXX/evidence/index.md)

---

## Approval Chain

| Stage | Role | Name | Date | Decision |
|-------|------|------|------|----------|
| 1. Proposal | Laboratory | [Name] | YYYY-MM-DD | PROPOSED |
| 2. Validation | Validator | [Name] | YYYY-MM-DD | [PASS/FAIL] |
| 3. Governance | Governance | [Name] | YYYY-MM-DD | [PENDING/APPROVED/REJECTED] |
| 4. Promotion | Human | [Name] | YYYY-MM-DD | [PROMOTED/NOT PROMOTED] |

---

## Important Notice

**AI CANNOT PROMOTE KNOWLEDGE**

Per Laboratory Rule 3 (No Self-Promotion), AI must never promote knowledge. Only humans can set PROMOTED state.

If this proposal is approved:
1. A human must execute the promotion
2. Human must verify all evidence
3. Human must confirm promotion decision

---

## Reference

For promotion protocol, see [`../PROMOTION.md`](../PROMOTION.md)
