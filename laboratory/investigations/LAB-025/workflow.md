# Workflow: LAB-025 — KDE Knowledge Governance Workflow

**Investigation**: LAB-025
**Date**: 2026-07-21T11:20:00Z
**Status**: DRAFT

---

## Overview

The KDE Knowledge Governance Workflow consists of four phases that collectively ensure:
- Evidence-based decisions
- Independent challenge
- Neutral arbitration
- Human authorization

---

## Phase 1: ASSESS

### Purpose

Audit the current state of an artifact class and document existing problems.

### Entry Criteria

- Clear scope defined
- Artifacts to assess exist
- Human authorization received

### Activities

1. **Identify artifact scope**
   - Define which artifacts to assess
   - Document boundaries

2. **Audit existing artifacts**
   - Examine all artifacts in scope
   - Document current structure
   - Identify inconsistencies

3. **Document problems**
   - List all issues found
   - Rate severity (HIGH/MEDIUM/LOW)
   - Support each with evidence

4. **Create evidence index**
   - Catalog all evidence
   - Include source references

5. **Prepare assessment report**
   - Summarize findings
   - Do NOT propose solutions

### Exit Criteria

- Assessment report complete
- Evidence index complete
- Human approval received

### Artifacts Produced

| Artifact | Description | Location |
|----------|-------------|----------|
| Assessment report | Problem inventory | investigation/ |
| Evidence index | Evidence catalog | evidence/ |
| Observations | Key findings | observations/ |

### Roles

| Role | Responsibility |
|------|----------------|
| Investigator | Conduct audit |
| Evidence Custodian | Preserve originals |

---

## Phase 2: PROPOSE

### Purpose

Define the desired state based on ASSESS findings.

### Entry Criteria

- ASSESS phase complete
- Human authorization received

### Activities

1. **Define research questions**
   - What should the specification answer?
   - What constraints exist?

2. **Develop specification**
   - Define requirements
   - Specify structure
   - Establish metadata
   - Define lifecycle

3. **Ground in evidence**
   - Link each requirement to ASSESS findings
   - Justify decisions with evidence

4. **Anticipate challenges**
   - Pre-identify potential weaknesses
   - Document rationale

5. **Prepare implementation guidance**
   - How to implement specification
   - Migration path for existing artifacts

### Exit Criteria

- Specification complete
- Research questions answered
- Human approval received

### Artifacts Produced

| Artifact | Description | Location |
|----------|-------------|----------|
| Specification | Primary deliverable | investigation/ |
| Research answers | Question responses | synthesis/ |
| Implementation guide | How to implement | recommendations.md |

### Roles

| Role | Responsibility |
|------|----------------|
| Investigator | Create specification |
| Evidence Analyst | Link to ASSESS |

---

## Phase 3: CHALLENGE

### Purpose

Attempt to falsify the PROPOSE specification.

### Entry Criteria

- PROPOSE phase complete
- Human authorization received

### Activities

1. **Assume specification is wrong**
   - Begin with null hypothesis: specification fails

2. **Search for counterexamples**
   - Examine artifacts the specification would affect
   - Look for edge cases
   - Find contradictions

3. **Document failures**
   - Each counterexample documented
   - Severity rated
   - Evidence cited

4. **Distinguish failure types**
   - Fundamental flaws vs. addressable weaknesses
   - Required changes vs. optional improvements

5. **Prepare falsification report**
   - All counterexamples cataloged
   - Severity summary
   - Recommendations (if specification survives)

### Exit Criteria

- Falsification report complete
- Human authorization received

### Artifacts Produced

| Artifact | Description | Location |
|----------|-------------|----------|
| Falsification report | Counterexamples and findings | investigation/ |
| Counterexamples | Individual failures | counterexamples/ |
| Evidence | Supporting documents | evidence/ |

### Roles

| Role | Responsibility |
|------|----------------|
| Challenger | Attempt falsification |
| Evidence Verifier | Validate failures |

---

## Phase 4: ARBITRATE

### Purpose

Render independent verdicts on disputed claims.

### Entry Criteria

- CHALLENGE phase complete
- Human authorization received

### Activities

1. **Review each claim**
   - Original claim from PROPOSE
   - Counterargument from CHALLENGE
   - Supporting evidence

2. **Evaluate evidence**
   - Quality
   - Completeness
   - Reproducibility

3. **Render verdicts**
   - ACCEPT: Claim sufficiently supported
   - AMEND: Claim correct but needs modification
   - REJECT: Claim successfully invalidated
   - INSUFFICIENT EVIDENCE: Neither side supported

4. **Document reasoning**
   - Why each verdict rendered
   - What evidence supported decision

5. **Recommend amendments**
   - Specific changes required
   - Implementation guidance

### Exit Criteria

- Claim-by-claim review complete
- Verdicts rendered
- Human acceptance received

### Artifacts Produced

| Artifact | Description | Location |
|----------|-------------|----------|
| Claim review | Evaluation of each claim | investigation/ |
| Verdicts | Official decisions | verdict.md |
| Recommendations | Implementation guidance | recommendations.md |

### Roles

| Role | Responsibility |
|------|----------------|
| Arbitrator | Render verdicts |
| Evidence Referee | Judge evidence quality |

---

## Workflow Diagram

```
Human Authorization
        │
        ▼
┌───────────────────────────────────────┐
│          PHASE 1: ASSESS              │
│  Audit current state                  │
│  Document problems                    │
│  Create evidence index               │
└───────────────┬───────────────────────┘
                │ Human Authorization
                ▼
┌───────────────────────────────────────┐
│          PHASE 2: PROPOSE             │
│  Define desired state                 │
│  Ground in evidence                   │
│  Create specification                 │
└───────────────┬───────────────────────┘
                │ Human Authorization
                ▼
┌───────────────────────────────────────┐
│          PHASE 3: CHALLENGE           │
│  Attempt falsification                 │
│  Find counterexamples                 │
│  Document failures                    │
└───────────────┬───────────────────────┘
                │ Human Authorization
                ▼
┌───────────────────────────────────────┐
│          PHASE 4: ARBITRATE           │
│  Render verdicts                      │
│  Recommend amendments                 │
│  Bind parties                         │
└───────────────┬───────────────────────┘
                │ Human Acceptance
                ▼
         GOVERNANCE DECISION
```

---

## Human Authorization Points

| Point | Authorization Required | Purpose |
|-------|----------------------|---------|
| Before ASSESS | Yes | Define scope |
| Before PROPOSE | Yes | Accept assessment |
| Before CHALLENGE | Yes | Accept specification |
| Before ARBITRATE | Yes | Accept counterexamples |
| After ARBITRATE | Yes | Accept verdicts |

---

## State Transitions

### Investigation States

| State | Phase | Transitions To |
|-------|-------|----------------|
| ACTIVE | ASSESS | COMPLETE |
| COMPLETE | PROPOSE | COMPLETE |
| COMPLETE | CHALLENGE | COMPLETE |
| COMPLETE | ARBITRATE | ACCEPTED/REJECTED |

### Document States

| State | Phase | Human Required |
|-------|-------|----------------|
| DRAFT | All | - |
| REVIEW | All | No |
| APPROVED | PROPOSE, CHALLENGE | Yes |
| AMENDED | ARBITRATE | No |
| ACCEPTED | ARBITRATE | Yes |
| REJECTED | ARBITRATE | Yes |

---

## Success Criteria

### Phase Success

| Phase | Criteria |
|-------|----------|
| ASSESS | All artifacts in scope examined; problems documented with evidence |
| PROPOSE | Specification complete; all requirements grounded in evidence |
| CHALLENGE | Systematic falsification attempted; all counterexamples documented |
| ARBITRATE | All claims evaluated; verdicts rendered with reasoning |

### Overall Success

| Criteria | Evidence |
|----------|----------|
| Evidence-based | All decisions backed by evidence |
| Independent | Neutral positions maintained |
| Transparent | All reasoning documented |
| Binding | Verdicts accepted by all parties |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-21 | Initial specification |
