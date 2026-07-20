# Experiment Template: [Title]

**Template Version**: 1.1.0
**Date**: 2026-07-20
**Architecture**: Architecture C

**Experiment ID**: LAB-XXX
**Created**: YYYY-MM-DDTHH:MM:SSZ
**Status**: PLANNED
**Domain**: [Software | Electrical | Mechanical | AI | Industrial | Other]
**Methodology Version**: v2.0
**Engine**: [Engine ID]
**Seed**: [Seed ID]
**Investigation**: [INV-XXX]

---

## Objective

[What this experiment aims to validate about the knowledge under test]

## Knowledge Under Test

| Knowledge ID | Definition | Aspect Tested |
|-------------|------------|----------------|
| KDE-XXX | [Definition text] | [Specific aspect] |

## Hypothesis

[Derived from approved knowledge]
[Must be testable and falsifiable]

**Hypothesis Statement**: If [condition], then [expected outcome].

## Environment

| Component | Specification |
|-----------|---------------|
| Hardware | [Requirements] |
| Software | [Requirements] |
| Personnel | [Requirements] |
| Duration | [Estimated time per run] |

## Preconditions

1. [Required state before execution]
2. [Required state before execution]
3. [Required state before execution]

## Procedure

### Step 1: [Name]
[Description of action]

### Step 2: [Name]
[Description of action]

### Step 3: [Name]
[Description of action]

## Expected Result

[What success looks like - specific, measurable]

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk description] | H/M/L | H/M/L | [Strategy] |

## Success Criteria

1. [Measurable criterion 1]
2. [Measurable criterion 2]
3. [Measurable criterion 3]

---

## Reproducibility (MANDATORY)

### Environment
[Operating system, network configuration, services required]

### Software Versions
[All software dependencies with exact version numbers]

### Hardware
[CPU, memory, GPU, storage specifications]

### Dependencies
[All libraries, packages, tools with versions]

### Configuration
[All configuration values required for reproduction]

### Required Assets
[Files, datasets, models, or other assets needed]

### Execution Procedure
[Step-by-step instructions for independent execution]
[Another engineer should be able to reproduce following these steps]

### Expected Outcome
[What the reproducing engineer should observe]
[Observable results that confirm reproduction]

---

## Run History

| Run ID | Date | Executor | Status | Result | Reproducibility |
|--------|------|----------|--------|--------|----------------|
| RUN-001 | YYYY-MM-DD | [Name] | COMPLETE | SUPPORTS | SUCCESS |
| RUN-002 | YYYY-MM-DD | [Name] | COMPLETE | INCONCLUSIVE | PARTIAL |
| RUN-003 | YYYY-MM-DD | [Name] | PENDING | - | - |

---

## Current Knowledge Assessment

**Assessment**: [PENDING | SUPPORTS | CONTRADICTS | INCONCLUSIVE]
**Confidence**: [HIGH | MEDIUM | LOW | UNDEFINED]
**Reproducibility**: [REPRODUCED | PARTIAL | NOT_REPRODUCED | PENDING]
**Evidence Volume**: [Sufficient | Insufficient]
**Runs Completed**: [N]

## Notes

[Additional context, observations, or reminders]

---

## Metadata

| Field | Value |
|-------|-------|
| Experiment ID | LAB-XXX |
| Investigation | [INV-XXX] |
| Created | YYYY-MM-DDTHH:MM:SSZ |
| Last Updated | YYYY-MM-DDTHH:MM:SSZ |
| Total Runs | 0 |
| Current Assessment | PENDING |
| Schema Version | 2.0 |

---

## Architecture C: Investigation Link

This experiment is linked to investigation: **[INV-XXX](../investigations/INV-XXX/)**

For full Architecture C specification, see [`../ARCHITECTURE-C.md`](../ARCHITECTURE-C.md)
