# Laboratory Rules

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: PRODUCTION
**Authority**: SEED-001 (Five Core Principles)

---

## Overview

This document defines the **Laboratory Rules**: the fundamental rules that govern how investigations are conducted within the KDE Laboratory. These rules are derived from the Five Core Principles defined in SEED-001.

---

## Core Authority

The Laboratory Rules derive authority from SEED-001:

| Source | Document | Status |
|--------|----------|--------|
| **SEED-001** | `/seeds/seed-001/principles/5-principles.md` | FROZEN |

---

## The Five Laboratory Rules

### Rule 1: No Auto-Continuation

**Statement**: AI must never begin the next research session without explicit human authorization.

**Implementation**:
- After completing a research session (producing a Working Definition), AI must stop and wait for human approval to proceed
- After producing output, AI outputs: "Research session complete. Awaiting human review."
- AI does not begin next session until human says "proceed"

**Authority**: Principle 1 of SEED-001

---

### Rule 2: No Self-Approval

**Statement**: AI must never approve its own work. Only humans can set APPROVED state.

**Implementation**:
- AI submits documents for review but does not approve them
- Only human input can transition a document from REVIEW to APPROVED
- AI cannot set any document state to APPROVED

**Authority**: Principle 2 of SEED-001

---

### Rule 3: No Self-Promotion

**Statement**: AI must never promote knowledge. Only humans can set PROMOTED state.

**Implementation**:
- AI documents validation results
- Only human input can transition a document from VALIDATED to PROMOTED
- AI cannot promote artifacts to `/knowledge/`
- Promotion to `/knowledge/` makes a definition "official"

**Authority**: Principle 3 of SEED-001

---

### Rule 4: Distinguish Evidence, Inference, and Hypothesis

**Statement**: AI must clearly mark what is documented fact vs. conclusion vs. speculation.

**Implementation**:

| Term | Meaning | Implementation |
|------|---------|----------------|
| **Evidence** | Documented facts from sources | Sections contain only facts with citations |
| **Inference** | Conclusions drawn from evidence | Analysis sections marked as inferences |
| **Hypothesis** | Speculation beyond evidence | Clearly labeled as hypothesis |

**Authority**: Principle 4 of SEED-001

---

### Rule 5: Evidence-Based Changes

**Statement**: All claims, including methodology changes, must be justified by evidence.

**Implementation**:
- Proposals cite evidence for recommendations
- Alternative options are acknowledged
- Uncertainty is documented
- Even governance changes must be justified, not merely asserted

**Authority**: Principle 5 of SEED-001

---

## Investigation Rules

### Rule 6: Engine Authority

**Statement**: The Laboratory executes experiments under a KDE Engine. The Laboratory SHALL NOT define its own methodology.

| Rule | Description |
|------|-------------|
| Rule 6.1 | The Laboratory SHALL NOT define its own methodology |
| Rule 6.2 | Every laboratory experiment SHALL execute under a KDE Engine |
| Rule 6.3 | The Engine directory SHALL be the single authoritative source for laboratory methodology |
| Rule 6.4 | Laboratory documents may reference an Engine but SHALL NOT redefine Engine behavior |
| Rule 6.5 | Future methodology improvements SHALL be implemented by creating a NEW Engine |
| Rule 6.6 | Historical experiments SHALL permanently reference the Engine under which they were executed |
| Rule 6.7 | Experiments discover knowledge. Engines discover better methodologies. |

---

### Rule 7: Knowledge Boundaries

**Statement**: The Laboratory SHALL NOT edit knowledge artifacts or promote its own conclusions.

| Rule | Description |
|------|-------------|
| Rule 7.1 | The Laboratory SHALL NOT edit knowledge artifacts in `/knowledge/` |
| Rule 7.2 | The Laboratory SHALL NOT certify knowledge as universally valid |
| Rule 7.3 | The Laboratory SHALL NOT override approved knowledge |
| Rule 7.4 | The Laboratory SHALL NOT destroy experiment records |
| Rule 7.5 | The Laboratory SHALL NOT make unilateral research decisions |

---

### Rule 8: Evidence Integrity

**Statement**: All evidence must be verifiable and traceable.

| Rule | Description |
|------|-------------|
| Rule 8.1 | Evidence SHALL be stored with the experiment that produced it |
| Rule 8.2 | Evidence SHALL use SHA-256 checksums for integrity verification |
| Rule 8.3 | Evidence SHALL be linked bidirectionally to experiments |
| Rule 8.4 | Evidence SHALL never be duplicated; references are used instead |

---

### Rule 9: Investigation Ownership

**Statement**: Investigations own WHY; Experiments own HOW.

| Rule | Description |
|------|-------------|
| Rule 9.1 | Investigations own the scientific purpose (WHY) |
| Rule 9.2 | Experiments own the execution (HOW) |
| Rule 9.3 | Every investigation SHALL link to its experiments |
| Rule 9.4 | Every experiment SHALL link to its investigation |

---

### Rule 10: Artifact Lifecycle

**Statement**: Temporary artifacts are archived; permanent artifacts are promoted.

| Artifact Type | Disposition |
|--------------|-------------|
| Raw evidence | Preserved with experiment |
| Notes | Archived or discarded when investigation completes |
| Experiments | Archived when complete |
| Comparisons | Archived or promoted as findings |
| Drafts | Revised or discarded |
| Validated knowledge | Promoted to `/knowledge/` |

---

## State Machine Compliance

### Document States

| State | Description | AI Can Set | Human Must Set |
|-------|-------------|------------|----------------|
| DRAFT | Work in progress | Yes | - |
| REVIEW | Submitted for review | Yes | - |
| APPROVED | Human approved | No | Yes |
| VALIDATED | Definition passed tests | Yes | - |
| PROMOTED | Moved to /knowledge/ | No | Yes |
| REJECTED | Work rejected | No | Yes |

### Investigation States

| State | Description | Transitions To |
|-------|-------------|----------------|
| ACTIVE | Investigation in progress | COMPLETE |
| COMPLETE | Investigation concluded | PROMOTED |
| PROMOTED | Knowledge promoted | - |

### Key Prohibitions

| Prohibition | Source |
|-------------|--------|
| AI cannot set APPROVED | Rule 2 |
| AI cannot set PROMOTED | Rule 3 |
| AI cannot auto-continue | Rule 1 |
| Laboratory cannot edit knowledge | Rule 7.1 |
| Laboratory cannot define methodology | Rule 6.1 |

---

## Human Authority Over Defaults

### What Only Humans May Do

| Action | Authority |
|--------|-----------|
| Change default Engine | Human only |
| Change default Seed | Human only |
| Override Runtime defaults for session | Human-authorized configuration |
| Modify `/governance/runtime/defaults.yaml` | Human only |
| Promote knowledge to `/knowledge/` | Human only |
| Approve work | Human only |

### What KDE Shall Never Do

| Prohibition | Rationale |
|-------------|-----------|
| KDE shall never promote itself to default | Would bypass human authority |
| KDE shall never change defaults automatically | Would create non-deterministic behavior |
| KDE shall never infer a better default | Would make assumptions beyond evidence |
| KDE shall never rewrite Runtime configuration | Would modify human-governed configuration |
| KDE shall never approve its own work | Would create conflict of interest |

---

## Derived Practices

These practices follow from the Laboratory Rules:

| Practice | Follows From |
|----------|--------------|
| Document uncertainty when evidence is incomplete | Rule 4 |
| Note alternative interpretations when evidence is ambiguous | Rule 4 |
| State "evidence insufficient" when conclusions cannot be supported | Rule 4 |
| Preserve original work when revisions are made | Rule 2 |
| Never skip modification requests from reviewers | Rule 1 |
| Wait for human authorization before proceeding | Rule 1 |
| Do not approve own work | Rule 2 |
| Do not promote own conclusions | Rule 3 |

---

## Compliance Verification

### Pre-Investigation Checklist

Before beginning any Investigation, verify:

| Check | Required |
|-------|----------|
| Runtime initialized | Yes |
| Engine state: READY | Yes |
| Laboratory Rules acknowledged | Yes |
| Pre-initialization restrictions honored | Yes |

### Runtime Status Check

| State | Meaning | Can Proceed |
|-------|---------|-------------|
| UNINITIALIZED | Runtime not started | No |
| INITIALIZING | Runtime starting | No |
| READY | Runtime active | Yes |
| ERROR | Initialization failed | No - Report |

---

## Error Recovery

### If Initialization Fails

1. **STOP** - Do not proceed
2. **REPORT** - Identify missing artifact
3. **AWAIT** - Wait for Governance to resolve

### Missing Artifact Protocol

**Required artifacts:**

| Artifact | Location | Critical |
|----------|----------|----------|
| Laboratory Rules | `/seeds/seed-001/principles/5-principles.md` | Yes |
| Active Engine | `/engines/current.md` | Yes |
| Engine Spec | `/engines/beta/specification.md` | Yes |
| Active Seed | `/seeds/seed-001/seed.yaml` | Yes |
| Bootstrap | `/laboratory/BOOTSTRAP.md` | Yes |

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Consolidated from LABORATORY-RULES.md and BOOTSTRAP.md | SEED-001 |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [`BOOTSTRAP.md`](./BOOTSTRAP.md) | Session entry point |
| [`WORKFLOW.md`](./WORKFLOW.md) | Investigation lifecycle |
| [`/seeds/seed-001/principles/5-principles.md`](/workspace/project/kde/seeds/seed-001/principles/5-principles.md) | Five Core Principles |
| [`/governance/runtime/defaults.yaml`](/workspace/project/kde/governance/runtime/defaults.yaml) | Runtime default configuration |

---

**Document Status**: PRODUCTION
**Authority**: SEED-001
**Compliance**: MANDATORY
