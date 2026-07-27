# Guides

**Purpose**: Practical task-based instructions
**Audience**: Practitioners

---

## Overview

This guide covers common KDE operations. Each chapter provides step-by-step instructions for a specific task.

---

## Chapter 1: Running an Investigation

### Process

1. **Propose**: Define objective and scope
2. **Await Approval**: Human authorizes work
3. **Investigate**: Gather evidence, analyze
4. **Document**: Record findings clearly
5. **Submit**: Await human review
6. **Complete**: Human approves

### Commands

```bash
# Start session
start engine

# Verify readiness
pre-flight check

# Confirm ready
mission ready
```

---

## Chapter 2: Conducting an Experiment

### Process

1. **Define** hypothesis
2. **Design** experiment
3. **Execute** experiment
4. **Collect** evidence
5. **Analyze** results
6. **Document** findings

### Experiment Structure

```markdown
## Hypothesis
[What you expect to find]

## Design
[How you'll test]

## Execution
[What you did]

## Results
[What you found]

## Analysis
[What it means]
```

---

## Chapter 3: Writing Investigation Documents

### Structure

Every investigation document should include:

| Section | Content |
|---------|---------|
| **Header** | ID, date, engine, seed |
| **Objective** | What you're investigating |
| **Scope** | What you cover |
| **Evidence** | Facts with sources |
| **Analysis** | Inferences from evidence |
| **Conclusions** | What you conclude |
| **Limitations** | What you couldn't cover |

### Marking

```markdown
[Evidence] Source information
[Inference] Conclusion from evidence
[Hypothesis] Speculation beyond evidence
```

---

## Chapter 4: Using Aliases

### Common Aliases

| Alias | Command | Purpose |
|-------|---------|---------|
| `start engine` | Initialize | Start KDE session |
| `pre-flight check` | Status | Verify system ready |
| `mission ready` | Confirm | Confirm readiness |
| `check state` | State | View current state |
| `run demo` | Demo | Run demonstration |

### Full Command Reference

See [Commands](../9-reference/commands.md).

---

## Chapter 5: Promoting Knowledge

### Process

1. Complete investigation
2. Pass validation
3. Human reviews
4. Human approves
5. Human promotes

### Requirements

| Requirement | Description |
|-------------|-------------|
| Evidence | All claims supported |
| Validation | Tested and confirmed |
| Traceability | Complete reasoning |
| Clarity | Clearly stated |

### Document States

```
DRAFT → REVIEW → APPROVED → VALIDATED → PROMOTED
```

---

## Chapter 6: Handling Violations

### What is a Violation?

A violation occurs when KDE rules are broken.

### Common Violations

| Violation | Description |
|-----------|-------------|
| Auto-continuation | Proceeded without authorization |
| Self-approval | Approved own work |
| Unsupported claim | Made claim without evidence |
| Unmarked type | Failed to distinguish evidence/inference/hypothesis |

### Handling Process

1. **Document** the violation
2. **Report** to human
3. **Investigate** root cause
4. **Correct** the issue
5. **Prevent** recurrence

### Investigation Template

```markdown
## Violation Report

**Type**: [What rule was broken]
**Date**: [When it occurred]
**Evidence**: [How it was discovered]

## Root Cause
[Why it happened]

## Correction
[What was done]

## Prevention
[How to prevent recurrence]
```

---

## Chapter 7: Navigation

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `laboratory/` | Investigations |
| `knowledge/` | Validated knowledge |
| `engines/` | Engine specifications |
| `seeds/` | Seed specifications |
| `runtime/` | Runtime components |
| `governance/` | Rules and policies |

### Key Files

| File | Purpose |
|------|---------|
| `laboratory/BOOTSTRAP.md` | Session entry point |
| `seeds/seed-001/principles/5-principles.md` | Core rules |
| `runtime/ecu/` | ECU implementation |

---

## See Also

- [Getting Started](../4-getting-started/index.md) - Setup
- [Processes](../6-how-it-works/processes.md) - Workflows
- [Reference](../9-reference/commands.md) - Commands
