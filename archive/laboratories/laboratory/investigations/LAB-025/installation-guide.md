# Installation Guide: LAB-025 — KDE Knowledge Governance Method

**Investigation**: LAB-025
**Date**: 2026-07-21T11:35:00Z
**Status**: DRAFT

---

## Purpose

This guide describes how to install the KDE Knowledge Governance Method (KKGM) as a KDE capability.

---

## Prerequisites

Before installing KKGM, verify:

| Prerequisite | Location | Status |
|-------------|----------|--------|
| Laboratory Rules | laboratory/RULES.md | Required |
| SEED-001 | seeds/seed-001/principles/5-principles.md | Required |
| Governance directory | governance/ | Required |
| Human authority | Not automated | Required |

---

## Installation Steps

### Step 1: Review Specification

Review [`capability-specification.md`](./capability-specification.md) to understand:
- Method lifecycle
- Required roles
- Required artifacts
- Governance requirements

### Step 2: Create Method Directory

Create the method directory structure:

```bash
mkdir -p laboratory/methods/kkgm/templates
```

### Step 3: Copy Method Files

Copy the following files to the method directory:

| Source | Destination |
|--------|-------------|
| capability-specification.md | laboratory/methods/kkgm/specification.md |
| workflow.md | laboratory/methods/kkgm/workflow.md |

### Step 4: Create Templates

Create investigation templates for each phase:

#### ASSESS Template

**File**: `laboratory/methods/kkgm/templates/ASSESS-investigation.md`

```markdown
# Assessment: [TITLE]

**Investigation ID**: [ID]
**Date**: [DATE]
**Status**: ACTIVE

## Scope

[Define artifacts to assess]

## Activities

- [ ] Identify artifact scope
- [ ] Audit existing artifacts
- [ ] Document problems
- [ ] Create evidence index
- [ ] Prepare assessment report

## Evidence

| Artifact | Location | Issues Found |
|----------|----------|--------------|
| | | |

## Problems Identified

| # | Problem | Severity | Evidence |
|---|---------|----------|----------|
| | | | |

## Authorization

[Human authorization point]

**Authorized by**: [Name]
**Date**: [Date]
```

#### PROPOSE Template

**File**: `laboratory/methods/kkgm/templates/PROPOSE-investigation.md`

```markdown
# Proposal: [TITLE]

**Investigation ID**: [ID]
**Date**: [DATE]
**Status**: DRAFT

## Research Questions

| # | Question | Answer |
|---|----------|--------|
| | | |

## Specification

[Detailed specification]

## Evidence Grounding

| Requirement | ASSESS Finding | Evidence |
|-------------|---------------|----------|
| | | |

## Implementation Guidance

[How to implement]

## Authorization

[Human authorization point]

**Authorized by**: [Name]
**Date**: [Date]
```

#### CHALLENGE Template

**File**: `laboratory/methods/kkgm/templates/CHALLENGE-investigation.md`

```markdown
# Challenge: [TITLE]

**Investigation ID**: [ID]
**Date**: [DATE]
**Status**: ACTIVE

## Null Hypothesis

The [PROPOSE specification] fails.

## Counterexamples

| # | Counterexample | Severity | Evidence |
|---|---------------|----------|----------|
| | | | |

## Failure Analysis

| Type | Count | Examples |
|------|-------|----------|
| Fundamental | | |
| Addressable | | |

## Outcome

[Does specification survive?]

## Authorization

[Human authorization point]

**Authorized by**: [Name]
**Date**: [Date]
```

#### ARBITRATE Template

**File**: `laboratory/methods/kkgm/templates/ARBITRATE-investigation.md`

```markdown
# Arbitration: [TITLE]

**Investigation ID**: [ID]
**Date**: [DATE]
**Status**: ACTIVE

## Parties

- PROPOSE: [ID]
- CHALLENGE: [ID]

## Claim Verdicts

| Claim | PROPOSE Position | CHALLENGE Position | Verdict | Reasoning |
|-------|-----------------|---------------------|---------|-----------|
| | | | | |

## Summary

| Category | Count |
|----------|-------|
| ACCEPT | |
| AMEND | |
| REJECT | |
| INSUFFICIENT_EVIDENCE | |

## Required Amendments

[Specific changes required]

## Binding Statement

All parties accept these verdicts.

**Accepted by**: [Names]
**Date**: [Date]
```

### Step 5: Register Method

Add method to governance registry:

**File**: `governance/methods.yaml`

```yaml
methods:
  - id: kkgm
    name: KDE Knowledge Governance Method
    version: "1.0.0"
    location: laboratory/methods/kkgm/
    authority: RULES.md
    status: CANDIDATE
```

---

## Post-Installation

### Verification

Verify installation by checking:

1. Method directory exists: `laboratory/methods/kkgm/`
2. Specification exists: `laboratory/methods/kkgm/specification.md`
3. Workflow exists: `laboratory/methods/kkgm/workflow.md`
4. Templates exist: `laboratory/methods/kkgm/templates/`
5. Governance registered: `governance/methods.yaml`

### First Use

To use KKGM for the first time:

1. **Define scope**: What artifact class to govern?
2. **Authorize ASSESS**: Human approves scope
3. **Begin ASSESS phase**: Create investigation using template
4. **Proceed through phases**: Follow workflow.md
5. **Accept verdicts**: Human accepts final decision

---

## Troubleshooting

### Problem: Human authorization refused

**Solution**: Clarify scope or gather more evidence

### Problem: Verdict is contested

**Solution**: Escalate to Governance (higher authority)

### Problem: Method doesn't fit use case

**Solution**: Document gaps for future method evolution

---

## Uninstalling

To remove KKGM:

1. Remove method directory: `rm -rf laboratory/methods/kkgm/`
2. Remove from governance registry: Edit `governance/methods.yaml`
3. Archive any ongoing investigations using KKGM

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-21 | Initial installation guide |
