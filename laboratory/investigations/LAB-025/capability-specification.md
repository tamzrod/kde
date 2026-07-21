# Capability Specification: KDE Knowledge Governance Method

**Document Type**: Capability Specification
**Investigation**: LAB-025
**Date**: 2026-07-21T11:30:00Z
**Status**: DRAFT
**Version**: 1.0.0

---

## Purpose

This document specifies the KDE Knowledge Governance Method as an installable capability.

---

## Method Overview

### Name

**KDE Knowledge Governance Method** (KKGM)

### Version

1.0.0

### Classification

Governance Methodology

### Authority

Derived from Laboratory Rules (RULES.md) and SEED-001

---

## Scope

### What This Method Governs

This method applies to:
- Knowledge Document Architecture
- Artifact specifications
- Governance policies
- Any artifact class requiring standardization

### What This Method Does Not Govern

- Experiment execution
- Evidence collection
- Knowledge application
- Tool selection

---

## Method Definition

### What is KDE Knowledge Governance?

KDE Knowledge Governance is the process of establishing authoritative standards for Knowledge artifacts through evidence-based investigation, independent challenge, and neutral arbitration.

### Core Principles

1. **Evidence Over Assumption**
   - Every claim must be supported by evidence
   - Opinions must be labeled as such
   - Speculation must be marked as hypothesis

2. **Neutrality**
   - Investigators describe, not advocate
   - Challengers attempt to break, not defend
   - Arbitrators decide, not persuade

3. **No Self-Reference**
   - AI cannot approve its own work
   - AI cannot promote its own conclusions
   - AI cannot set final state

4. **Human Authorization**
   - Humans authorize phase transitions
   - Humans accept final verdicts
   - Humans make binding decisions

---

## Method Lifecycle

### Phases

```
ASSESS ──► PROPOSE ──► CHALLENGE ──► ARBITRATE ──► DECISION
```

### Phase 1: ASSESS

**Purpose**: Understand the current state of artifacts requiring governance.

**Activities**:
- Define scope of artifacts to assess
- Audit all artifacts in scope
- Document inconsistencies and problems
- Create evidence index
- Prepare assessment report

**Entry Criteria**:
- Human authorization to proceed
- Clear scope definition

**Exit Criteria**:
- Assessment report complete
- Evidence index complete
- Human authorization to proceed

**Artifacts**:
- Assessment report (Markdown)
- Evidence index (Markdown)
- Observations (Markdown)

**Roles**:
- Investigator (conducts audit)
- Evidence Custodian (preserves evidence)

---

### Phase 2: PROPOSE

**Purpose**: Define the desired state based on assessment findings.

**Activities**:
- Answer research questions
- Develop specification
- Ground requirements in evidence
- Anticipate challenges
- Prepare implementation guidance

**Entry Criteria**:
- ASSESS phase complete
- Human authorization to proceed

**Exit Criteria**:
- Specification complete
- Research questions answered
- Human authorization to proceed

**Artifacts**:
- Specification document (Markdown)
- Research answers (Markdown)
- Implementation guidance (Markdown)

**Roles**:
- Investigator (creates specification)
- Evidence Analyst (links to evidence)

---

### Phase 3: CHALLENGE

**Purpose**: Attempt to invalidate the specification through falsification.

**Activities**:
- Assume specification is wrong
- Search for counterexamples
- Document each failure
- Rate severity of failures
- Distinguish failure types

**Entry Criteria**:
- PROPOSE phase complete
- Human authorization to proceed

**Exit Criteria**:
- Falsification report complete
- Human authorization to proceed

**Artifacts**:
- Falsification report (Markdown)
- Counterexamples catalog (Markdown)
- Evidence references (Markdown)

**Roles**:
- Challenger (attempts falsification)
- Evidence Verifier (validates failures)

---

### Phase 4: ARBITRATE

**Purpose**: Render independent verdicts on disputed claims.

**Activities**:
- Review each claim from PROPOSE
- Review each counterargument from CHALLENGE
- Evaluate evidence quality
- Render verdicts
- Recommend amendments

**Entry Criteria**:
- CHALLENGE phase complete
- Human authorization to proceed

**Exit Criteria**:
- All claims evaluated
- Verdicts rendered with reasoning
- Human acceptance received

**Verdicts Available**:
| Verdict | Meaning |
|---------|---------|
| ACCEPT | Claim sufficiently supported |
| AMEND | Claim correct but requires modification |
| REJECT | Claim successfully invalidated |
| INSUFFICIENT_EVIDENCE | Neither side adequately supported |

**Artifacts**:
- Claim-by-claim review (Markdown)
- Official verdicts (Markdown)
- Recommendations (Markdown)

**Roles**:
- Arbitrator (renders verdicts)
- Evidence Referee (judges evidence)

---

## Required Roles

### Human Roles

| Role | Responsibility | Authority |
|------|----------------|-----------|
| Human Authorizer | Authorize phase transitions | All phases |
| Human Approver | Accept final verdicts | After ARBITRATE |

### AI Roles

| Role | Responsibility | Constraints |
|------|----------------|--------------|
| Investigator | Conduct ASSESS and PROPOSE | Cannot approve own work |
| Challenger | Attempt CHALLENGE | Must attempt falsification |
| Arbitrator | Render ARBITRATE verdicts | Must be neutral |

---

## Required Artifacts

### Per-Phase Artifacts

| Phase | Primary Artifact | Supporting Artifacts |
|-------|------------------|---------------------|
| ASSESS | assessment.md | evidence/index.md, observations/*.md |
| PROPOSE | specification.md | synthesis/*.md, recommendations.md |
| CHALLENGE | falsification-report.md | counterexamples/*.md, evidence/index.md |
| ARBITRATE | verdicts.md | claim-review.md, recommendations.md |

### Artifact Structure

All artifacts SHALL include:
- Header with metadata (ID, version, date, status)
- Clear section headings
- Evidence citations
- Author attribution

---

## Governance

### Human Authorization Points

| Point | Authorization | Consequence of Refusal |
|-------|--------------|------------------------|
| Before ASSESS | Define scope | Investigation does not start |
| After ASSESS | Accept report | PROPOSE does not begin |
| After PROPOSE | Accept specification | CHALLENGE does not begin |
| After CHALLENGE | Accept report | ARBITRATE does not begin |
| After ARBITRATE | Accept verdicts | Decision not binding |

### Binding Nature

- Verdicts are binding unless overturned by Governance
- Parties must accept verdicts
- Amendments must be implemented

---

## Success Criteria

### Phase Success

| Phase | Success Criteria |
|-------|------------------|
| ASSESS | All artifacts examined; all problems documented with evidence |
| PROPOSE | All research questions answered; all requirements grounded in evidence |
| CHALLENGE | Systematic falsification attempted; all failures documented |
| ARBITRATE | All claims evaluated; all verdicts reasoned |

### Method Success

| Criteria | Measure |
|----------|---------|
| Evidence-based | 100% of claims cite evidence |
| Independent | Neutral positions in all phases |
| Transparent | All reasoning documented |
| Binding | All parties accept verdicts |
| Reusable | Successfully applied to multiple artifact classes |

---

## Installation Requirements

### Prerequisites

| Requirement | Description |
|------------|-------------|
| Laboratory Rules | RULES.md in place |
| SEED-001 | Five Core Principles defined |
| Active Engine | Engine directory with methodology |

### Installation Location

```
laboratory/
├── methods/
│   └── kkgm/           # KDE Knowledge Governance Method
│       ├── specification.md
│       ├── workflow.md
│       └── templates/
└── investigations/     # Investigations using this method
```

### Configuration

| Parameter | Default | Override |
|-----------|---------|----------|
| Phase timeout | None | Human can set |
| Verdict threshold | Unanimous | Human can set |
| Evidence standard | Verified | Human can set |

---

## Maintenance

### Version Upgrades

- New method version requires new investigation cycle
- Existing investigations complete under original version
- Migration path documented per version

### Deprecation

- Method deprecated when replaced by better method
- Deprecated methods remain available for historical reference
- New investigations use current method

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| RULES.md | Authority source |
| SEED-001 | Principle source |
| LAB-021 | Example ASSESS |
| LAB-022 | Example PROPOSE |
| LAB-023 | Example CHALLENGE |
| LAB-024 | Example ARBITRATE |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-21 | Initial specification |
