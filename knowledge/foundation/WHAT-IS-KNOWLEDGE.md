# What is Knowledge?

**Document ID**: FOUND-001
**Type**: Constitutional Definition
**Status**: FOUNDATIONAL
**Authority**: Human

---

## Constitutional Definition

**Knowledge** is validated understanding that enables effective engineering action.

---

## Components

| Component | Definition |
|-----------|------------|
| **Validated** | Tested against evidence and survived challenges |
| **Understanding** | Internalized beyond raw data—it knows why |
| **Enables Action** | Provides a basis for engineering decisions |
| **Engineering Context** | Specific to engineering application |

### Clarification

- **Validated** ≠ True (truth is unknowable; validation is evidence-based)
- **Understanding** ≠ Information (information is organized; understanding is internalized)
- **Enables Action** ≠ Data (data is factual; knowledge is actionable)
- **Engineering Context** ≠ Universal (knowledge is always situated)

---

## What is Knowledge? (Inclusion)

Something qualifies as knowledge when it:

1. **Has been validated** — Evidence supports the claim
2. **Has clear scope** — Boundaries define when it applies
3. **Enables action** — It informs decisions or guides behavior
4. **Is reusable** — It applies across multiple contexts without modification

---

## What is NOT Knowledge? (Exclusion)

The following are not knowledge:

| Not Knowledge | Reason | Example |
|--------------|--------|---------|
| **Data** | Raw facts without interpretation | Sensor readings, raw measurements |
| **Information** | Organized data without action-enablement | Reports, documentation without guidance |
| **Opinion** | Personal view without evidence requirement | "I think X is better" |
| **Belief** | Acceptance without validation | Faith-based assertions |
| **Speculation** | Unfounded extension beyond evidence | "X must work because Y" |
| **Procedure** | How to do something (that's a workflow) | Step-by-step instructions |

---

## What Makes Knowledge Reusable?

Knowledge is reusable when it:

| Criterion | Description |
|-----------|-------------|
| **Clear Scope** | Boundaries define applicability |
| **Context Independence** | Does not require specific context to apply |
| **Stable Formulation** | Does not require modification to use |
| **Validated** | Has survived validation testing |
| **Non-Contradictory** | Does not conflict with other knowledge |

---

## What Makes Knowledge Obsolete?

Knowledge becomes obsolete when:

| Condition | Description |
|-----------|-------------|
| **Evidence Invalidated** | The evidence it was based on is refuted |
| **Scope Changed** | The domain it applies to has fundamentally changed |
| **Superseded** | A better formulation replaces it |
| **Deprecated** | Explicitly marked as deprecated through governance |
| **Contradicted** | New knowledge contradicts established knowledge |

---

## Knowledge vs Related Concepts

```
                    ┌─────────────────────────────────────┐
                    │                                     │
                    │            KNOWLEDGE                │
                    │   Validated understanding that       │
                    │   enables effective action           │
                    │                                     │
                    └───────────────┬─────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │    DATA     │         │ INFORMATION │         │   BELIEF    │
    │ Raw facts   │ ──────► │ Organized   │ ──────► │ Accepted    │
    │ without     │         │ without     │         │ without     │
    │ context     │         │ action      │         │ validation  │
    └─────────────┘         └─────────────┘         └─────────────┘
```

| Transition | Process |
|------------|---------|
| Data → Information | Organization and processing |
| Information → Knowledge | Validation and understanding |
| Belief → Knowledge | Validation against evidence |

---

## What Qualifies for Promotion?

Knowledge enters the Knowledge Layer when:

1. **Validation Complete** — Has passed defined validation tests
2. **Scope Defined** — Clear boundaries established
3. **Evidence Cited** — All claims supported by evidence
4. **Human Approved** — Explicit human authorization obtained
5. **Type Classified** — Assigned to correct knowledge type

See: `PROMOTION-RULES.md`

---

## How Should AI Consume Knowledge?

AI SHALL:

| Rule | Description |
|------|-------------|
| **Consult First** | Check Knowledge Layer before using general reasoning |
| **Cite Precisely** | Reference specific knowledge items when making claims |
| **Distinguish** | Clearly mark when operating outside knowledge |
| **Respect Scope** | Apply knowledge only within defined boundaries |
| **Flag Gaps** | Identify when no knowledge exists for a situation |

AI SHALL NOT:

| Rule | Description |
|------|-------------|
| **Contradict** | Override knowledge without evidence and authorization |
| **Extrapolate** | Extend knowledge beyond its scope without validation |
| **Assume Coverage** | Assume knowledge exists when it does not |

---

## Evidence

This definition is based on analysis from:
- Archive: `INV-001/question.md` (What is Knowledge?)
- Archive: `INV-002` (What is Evidence?)
- Archive: `INV-003` (What is Ambiguity?)

Validation: 5/5 tests passed (Classification, Distinction, Methodology Support, Consistency, Counterexample)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-31 | Initial constitutional definition |

---

**Status**: FOUNDATIONAL
**Immutability**: This document defines the constitutional meaning of knowledge. Changes require full governance review.
**Source**: Stage 2 Knowledge Layer Definition
