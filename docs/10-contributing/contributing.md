# Contributing

**Purpose**: How to contribute to KDE
**Audience**: Contributors, developers

---

## Overview

KDE welcomes contributions that improve the methodology, documentation, or tooling. All contributions require human approval.

---

## Chapter 1: How to Contribute

### Contribution Types

| Type | Description | Process |
|------|-------------|---------|
| **Investigation** | New knowledge discovery | Submit investigation |
| **Documentation** | Improve or add docs | Create PR |
| **Experiment** | Test methodology | Run experiment |
| **Governance** | Change rules | Raise proposal |

### Process

1. **Propose** your contribution
2. **Develop** under guidance
3. **Document** thoroughly
4. **Submit** for review
5. **Await** human approval
6. **Implement** when approved

---

## Chapter 2: Governance Rules

### What You Cannot Change

| Item | Rule | Rationale |
|------|------|-----------|
| Seeds | Never modify | Immutable foundation |
| Core Principles | Never modify | Governance foundation |
| Human Authority | Never remove | Non-negotiable oversight |

### What Requires Approval

| Action | Required |
|--------|----------|
| New investigation | Approval to begin |
| New document | Approval to promote |
| Rule change | Governance approval |
| New Engine | Architecture approval |
| New Seed | Governance approval |

### What You Can Do Freely

| Action | Required |
|--------|----------|
| Write investigation | Report findings |
| Document existing | Create PR |
| Suggest improvements | Raise proposal |
| Report violations | Immediate |

---

## Chapter 3: Investigation Standards

### Quality Requirements

Every investigation must have:

- [ ] Clear objective
- [ ] Defined scope
- [ ] Systematic methodology
- [ ] Documented evidence
- [ ] Traceable reasoning
- [ ] Acknowledged limitations

### Evidence Standards

| Type | Marking | Requirement |
|------|---------|-------------|
| Fact | `[Evidence]` | Source required |
| Inference | `[Inference]` | Evidence link required |
| Hypothesis | `[Hypothesis]` | Labeled as speculation |

### Document Structure

```markdown
# Investigation Title

**ID**: INV-XXX
**Date**: YYYY-MM-DD
**Status**: [STATUS]

## Objective
[What you're investigating]

## Scope
[What you cover]

## Evidence
[Documented facts]

## Analysis
[Inferences from evidence]

## Conclusions
[What you conclude]

## Limitations
[What you couldn't cover]
```

---

## Chapter 4: Creating New Engines

### Requirements

| Requirement | Description |
|-------------|-------------|
| Specification | Complete SPEC.md |
| Methodology | Documented approach |
| Capabilities | Defined capabilities |
| Testing | Validation tests |

### Process

1. Create engine directory
2. Write specification
3. Implement methodology
4. Add to registry
5. Validate functionality
6. Submit for review

### Engine Template

```markdown
# Engine Specification

**Engine ID**: KDE-ENGINE-XXX
**Codename**: [Name]
**Status**: [Active/Experimental]

## Purpose
[What this engine does]

## Capabilities
- [List capabilities]

## Methodology
[How it works]

## Validation
[How to test]
```

---

## Chapter 5: Creating New Seeds

### Requirements

| Requirement | Description |
|-------------|-------------|
| Principles | Core principles defined |
| Documentation | Complete explanation |
| Rationale | Why these principles |
| Immutability | Marked frozen |

### Process

1. Define principles
2. Document rationale
3. Propose to governance
4. Human reviews
5. Human approves
6. Seed is frozen

### Seed Template

```markdown
# Seed Specification

**Seed ID**: SEED-XXX
**Codename**: [Name]
**Status**: [Frozen/Active]

## Principles

### Principle 1
[Description]
**Rationale**: [Why]

### Principle 2
[Description]
**Rationale**: [Why]

## Immutability
[Statement of immutability]
```

---

## Chapter 6: Raising Proposals

### Proposal Types

| Type | For |
|------|-----|
| Governance | Rule changes |
| Architecture | Structural changes |
| Methodology | Process changes |
| Technical | Implementation changes |

### Proposal Template

```markdown
# Proposal: [Title]

**Proposal ID**: PROP-XXX
**Type**: [Governance/Architecture/Methodology/Technical]
**Date**: YYYY-MM-DD

## Problem
[What problem this solves]

## Proposed Solution
[What you're proposing]

## Rationale
[Why this is the right solution]

## Evidence
[Supporting evidence]

## Alternatives Considered
[Other options and why rejected]

## Impact
[What changes if approved]

## Approval Required
[Who must approve]
```

### Submission Process

1. Draft proposal
2. Gather supporting evidence
3. Submit for review
4. Address feedback
5. Await approval
6. Implement when approved

---

## See Also

- [Governance](../5-core-concepts/knowledge.md) - Knowledge governance
- [Processes](../6-how-it-works/processes.md) - Workflow details
- [Architecture](../8-architecture/architecture.md) - Repository structure
