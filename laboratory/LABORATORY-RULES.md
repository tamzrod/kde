# Laboratory Rules

**Document Version**: 1.0.0
**Date**: 2026-07-20
**Status**: PRODUCTION
**Authority**: SEED-001 (Five Core Principles)

---

## Overview

This document defines the **Laboratory Rules**: the authoritative Runtime initialization procedure for KDE. These rules govern how AI agents enter and operate within the KDE Knowledge Discovery Engine.

The Laboratory Rules are derived from the **Five Core Principles** defined in SEED-001 and serve as the operational rules for Runtime initialization.

---

## Core Authority

The Laboratory Rules derive authority from SEED-001:

| Source | Document | Status |
|--------|----------|--------|
| **SEED-001** | [`/seeds/seed-001/principles/5-principles.md`](/workspace/project/kde/seeds/seed-001/principles/5-principles.md) | FROZEN |

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
- AI cannot promote artifacts to /knowledge/
- Promotion to /knowledge/ makes a definition "official"

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

### Rule 6: Experiment Identifier Permanence

**Statement**: Once assigned, experiment identifiers (LAB-XXX) are permanent and cannot be renumbered, reused, or replaced.

**Implementation**:

| Prohibition | Rationale |
|-------------|-----------|
| Never renumber experiments | Identifiers are historical markers |
| Never reuse identifiers | Each experiment is unique |
| Never create variant identifiers | LAB-XXX-revised is prohibited |
| Never merge identifiers | Each experiment stands alone |

**Examples of Prohibited Actions**:
- Renaming LAB-003 to LAB-002
- Creating LAB-010-revised
- Merging LAB-012 and LAB-013 into LAB-012B
- Renumbering to fill gaps: LAB-001, LAB-002, LAB-003 (skipping LAB-004)

**Authority**: Derived from Experiment immutability principle (see Rule 7)

---

### Rule 7: Historical Experiment Protection

**Statement**: Historical experiments are immutable evidence and shall not be renamed, moved, deleted, overwritten, or merged.

**Definition**: Historical experiments are experiments with LAB-XXX where XXX < current highest experiment number.

**Prohibited Actions**:

| Action | Prohibition | Rationale |
|--------|-------------|-----------|
| Rename directory | ABSOLUTE | Identifiers are permanent |
| Move location | ABSOLUTE | Locations are part of evidence |
| Delete directory | ABSOLUTE | Records must be preserved |
| Delete files | ABSOLUTE | Evidence must be preserved |
| Overwrite content | ABSOLUTE | Original records immutable |
| Merge experiments | ABSOLUTE | Each experiment is distinct |

**Exceptions**: None. Historical experiments are immutable evidence.

**Evidence**: See [`/governance/ARTIFACT-PROTECTION.md`](/workspace/project/kde/governance/ARTIFACT-PROTECTION.md) for complete protection matrix.

**Authority**: Derived from Evidence preservation principles

---

## Runtime Initialization Procedure

### Pre-Initialization Phase

**Before invoking Runtime initialization, the AI:**

1. ☐ Has read the BOOTSTRAP.md entry point
2. ☐ Acknowledges the Laboratory Rules
3. ☐ Has NOT begun planning, exploring, or analyzing

### Initialization Phase

**Runtime initialization follows these steps:**

#### Step 1: Load Runtime Configuration

**Action**: Load Runtime default configuration

| Field | Value |
|-------|-------|
| Configuration File | `/governance/runtime/defaults.yaml` |
| Default Engine | KDE-ENGINE-002 |
| Default Seed | SEED-001 |

**Verification**: Configuration file exists and is readable

#### Step 2: Check for Session Override

**Action**: Check if current session specifies override

| Field | Source |
|-------|--------|
| Override Present | Experiment/Investigation configuration |
| Override Engine | If specified in session config |
| Override Seed | If specified in session config |

**Rules**:
- If override present: Use specified Engine and/or Seed
- If override absent: Use Runtime defaults
- Override does NOT modify Runtime configuration

#### Step 3: Load Engine (From Config or Override)

**Action**: Load the configured Engine

| Field | Value |
|-------|-------|
| Engine ID | From Runtime defaults or session override |
| Version | Per Engine specification |
| Location | `/engines/{engine-id}/` |

**Verification**: Engine files exist and are readable

#### Step 4: Load Seed (From Config or Override)

**Action**: Load the configured Seed

| Field | Value |
|-------|-------|
| Seed ID | From Runtime defaults or session override |
| Version | Per Seed specification |
| Location | `/seeds/{seed-id}/` |

**Verification**: Seed files exist

#### Step 5: Verify Engine-Seed Compatibility

**Action**: Confirm engine is compatible with seed

**Compatibility Matrix**:

| Engine | Compatible Seeds |
|--------|----------------|
| KDE-ENGINE-001 (Alpha) | SEED-001 |
| KDE-ENGINE-002 (Beta) | SEED-001 |
| KDE-ENGINE-003 (Gamma) | SEED-001 |
| KDE-ENGINE-004 (Delta) | SEED-001 |

#### Step 6: Initialize Engine State

**Action**: Transition Engine state

```
State Transition: UNINITIALIZED → INITIALIZING → READY
```

**Requirements**:
- All engine modules load successfully
- Engine configuration verified
- Prerequisites satisfied

### Post-Initialization Phase

**After successful Runtime initialization:**

1. ☐ Engine state is READY
2. ☐ Execution authority transferred to Engine
3. ☐ AI operates as execution substrate only
4. ☐ All actions follow Engine-defined methodology

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

### Key Prohibitions

| Prohibition | Source |
|-------------|--------|
| AI cannot set APPROVED | Rule 2 |
| AI cannot set PROMOTED | Rule 3 |
| AI cannot auto-continue | Rule 1 |

---

## Human Authority Over Runtime Defaults

### Governance Directive

**"Default Engine and Default Seed are under exclusive human authority."**

This directive is derived from the principle that KDE must not change its own operational configuration.

### What Only Humans May Do

| Action | Authority |
|--------|-----------|
| Change default Engine | Human only |
| Change default Seed | Human only |
| Override Runtime defaults for session | Human-authorized configuration |
| Modify `/governance/runtime/defaults.yaml` | Human only |

### What KDE Shall Never Do

| Prohibition | Rationale |
|------------|-----------|
| KDE shall never promote itself to default | Would bypass human authority |
| KDE shall never change defaults automatically | Would create non-deterministic behavior |
| KDE shall never infer a better default | Would make assumptions beyond evidence |
| KDE shall never rewrite Runtime configuration | Would modify human-governed configuration |

### Separation of Concerns

| Concern | Governed By |
|---------|-------------|
| Scientific validation level | Engine Status |
| Operational default | Runtime Defaults |
| Default selection | Human Authority |

**Key Insight**: An Engine achieving higher scientific Status does NOT automatically change its Default status. Only human action can change Runtime defaults.

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

### Pre-Work Checklist

Before beginning any Experiment or Investigation, verify:

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

### Error Report Format

```markdown
# Runtime Initialization Error

**Date**: YYYY-MM-DDTHH:MM:SSZ
**Status**: FAILED

## Missing Artifact

| Artifact | Expected Location | Status |
|----------|-------------------|--------|
| [Name] | [Path] | MISSING |

## Error Details

[Error message]

## Recommended Action

[What should be done to resolve]
```

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-20 | Initial production release | SEED-001 |
| 1.1.0 | 2026-07-23 | Added Rule 6 (Experiment ID Permanence) and Rule 7 (Historical Experiment Protection) | Human Review, LAB-040 |

---

## Related Documents

### Runtime Configuration

| Document | Purpose |
|----------|---------|
| [`/governance/runtime/defaults.yaml`](/workspace/project/kde/governance/runtime/defaults.yaml) | Runtime default configuration |
| [`/governance/runtime/RUNTIME-STARTUP.md`](/workspace/project/kde/governance/runtime/RUNTIME-STARTUP.md) | Runtime startup sequence |
| [`/governance/runtime/SESSION-OVERRIDE.md`](/workspace/project/kde/governance/runtime/SESSION-OVERRIDE.md) | Session override behavior |

### Laboratory

| Document | Purpose |
|----------|---------|
| [`BOOTSTRAP.md`](./BOOTSTRAP.md) | KDE entry point |
| [`README.md`](./README.md) | Laboratory overview |
| [`ARCHITECTURE-C.md`](./ARCHITECTURE-C.md) | Architecture specification |

### Artifact Protection

| Document | Purpose |
|----------|---------|
| [`/governance/ARTIFACT-PROTECTION.md`](/workspace/project/kde/governance/ARTIFACT-PROTECTION.md) | Protection levels matrix |
| [`/governance/runtime/protection.yaml`](/workspace/project/kde/governance/runtime/protection.yaml) | Protection configuration |
| [`/laboratory/EVIDENCE.md`](./EVIDENCE.md) | Evidence protection rules |

### Engines

| Document | Purpose |
|----------|---------|
| [`/engines/current.md`](/workspace/project/kde/engines/current.md) | Engine registry |
| [`/engines/beta/specification.md`](/workspace/project/kde/engines/beta/specification.md) | Beta Engine specification |

### Seeds

| Document | Purpose |
|----------|---------|
| [`/seeds/seed-001/principles/5-principles.md`](/workspace/project/kde/seeds/seed-001/principles/5-principles.md) | Five Core Principles |

---

**Document Status**: PRODUCTION
**Authority**: SEED-001
**Compliance**: MANDATORY
