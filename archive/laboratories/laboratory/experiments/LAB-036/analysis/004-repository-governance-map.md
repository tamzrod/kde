# Repository Governance Map

**Document ID**: LAB-036-004
**Source**: LAB-036 Phase 4
**Date**: 2026-07-23
**Status**: DRAFT

---

## Overview

This document maps the KDE repository structure against governance protection levels, identifying which artifacts have documented protection and which gaps exist.

---

## Repository Directory Structure

```
kde/
├── seeds/                    # Immutable reasoning DNA
│   └── seed-001/            # FROZEN - ABSOLUTE protection
│       ├── NEVER-MODIFY.md
│       ├── principles/
│       └── ...
│
├── engines/                 # Methodology implementations
│   ├── current.md           # Registry
│   ├── alpha/              # Historical
│   ├── beta/               # Active (current default)
│   ├── gamma/              # Experimental
│   └── delta/              # Candidate (Validated)
│
├── laboratory/              # Scientific workflow
│   ├── experiments/         # Historical experiments
│   │   ├── LAB-001/        # Historical
│   │   ├── LAB-002/        # Historical
│   │   ├── ...             # Through LAB-035
│   │   └── LAB-036/        # Current (this experiment)
│   ├── investigations/      # Research investigations
│   ├── validations/         # Engine validations
│   ├── evidence/            # Central evidence registry
│   ├── templates/           # Document templates
│   ├── governance/          # Laboratory governance
│   ├── BOOTSTRAP.md         # Entry point
│   ├── LABORATORY-RULES.md  # Operational rules
│   ├── EVIDENCE.md          # Evidence management
│   └── ...
│
├── governance/              # Repository governance
│   ├── runtime/             # Runtime configuration
│   │   ├── defaults.yaml    # Human authority
│   │   └── ...
│   ├── STATE-MACHINE.md     # Document states
│   ├── ENGINE-VERSIONING.md  # Version policy
│   └── ...
│
├── knowledge/                # Validated knowledge
│   └── ...                  # PROMOTED knowledge
│
├── experts/                 # Expert knowledge
├── runtime/                 # Runtime implementation
├── playground/              # Working area (mutable)
├── artifact-discovery/      # Working area (mutable)
└── README.md
```

---

## Artifact Protection Matrix

| Artifact Type | Location | Protection Documented | Protection Level | Enforcement |
|---------------|----------|---------------------|------------------|-------------|
| Seeds (FROZEN) | seeds/ | NEVER-MODIFY.md | ABSOLUTE | Social/Process |
| Engine Specifications | engines/ | ENGINE-VERSIONING.md | HIGH | State machine |
| Governance Documents | governance/ | GOVERNANCE/README.md | HIGH | Human approval |
| Runtime Configuration | governance/runtime/ | defaults.yaml | HIGH | Human authority |
| Evidence | experiments/*/evidence/ | EVIDENCE.md | ABSOLUTE intent | "Never delete" |
| Historical Experiments | experiments/LAB-001-035/ | ENGINE-VERSIONING.md | HIGH intent | Immutability stated |
| Knowledge (PROMOTED) | knowledge/ | State Machine | ABSOLUTE | PROMOTED = immutable |
| Current Experiment | experiments/LAB-036/ | None | LOW | Active work |
| Investigations | investigations/ | LABORATORY-SOP.md | MEDIUM | SOP procedures |
| Templates | laboratory/templates/ | None | LOW | Reference only |
| Playground | playground/ | None | LOW | Mutable by design |
| Artifact Discovery | artifact-discovery/ | None | LOW | Mutable by design |

---

## Evidence for Protection Levels

### 1. Seeds (SEED-001)

**Protection**: ABSOLUTE
**Evidence**:
- NEVER-MODIFY.md: "Once a Seed is frozen, it shall NEVER be modified"
- 5-principles.md: "FROZEN as part of Seed-001"
- "Exception: NONE" explicitly stated

**Enforcement**: Social/Process (no technical enforcement)

---

### 2. Historical Experiments

**Protection**: HIGH (intent)
**Evidence**:
- ENGINE-VERSIONING.md: "Experiments Are Immutable Historical Records"
- ENGINE-VERSIONING.md: "Historical experiments are evidence of past methodology"
- ENGINE-VERSIONING.md: "No retroactive changes"

**Enforcement**: Documented intent but no technical enforcement

---

### 3. Evidence

**Protection**: ABSOLUTE (intent)
**Evidence**:
- EVIDENCE.md: "Evidence is never deleted"
- EVIDENCE.md: "Archive Instead"
- SHA-256 verification required

**Enforcement**: Policy (no technical enforcement for modification)

---

### 4. PROMOTED Knowledge

**Protection**: ABSOLUTE
**Evidence**:
- STATE-MACHINE.md: "No Self-Promotion"
- State: PROMOTED requires human approval
- Once PROMOTED, only governance can change

**Enforcement**: State machine (strong but not technical)

---

### 5. Playground / Artifact Discovery

**Protection**: LOW/NONE
**Evidence**: None - these directories are for active work

**Enforcement**: None by design

---

## Protection Patterns Observed

### Pattern 1: Documented Intent

**Examples**:
- ENGINE-VERSIONING.md states experiments are immutable
- EVIDENCE.md states evidence is never deleted

**Effectiveness**: MEDIUM
- Documents the intention
- No technical enforcement
- Relies on AI following rules

---

### Pattern 2: State Machine

**Examples**:
- Knowledge promotion (DRAFT → REVIEW → APPROVED → VALIDATED → PROMOTED)
- Self-approval prohibited
- Self-promotion prohibited

**Effectiveness**: HIGH
- State transitions are tracked
- Human approval required at key points
- But files can still be modified after promotion

---

### Pattern 3: Human Authority

**Examples**:
- Runtime defaults set by humans
- Governance changes require human approval
- Bootstrap authority is human-defined

**Effectiveness**: HIGH
- Separation of concerns
- AI cannot self-configure
- But humans must actively govern

---

### Pattern 4: No Technical Enforcement

**Observation**: No git hooks, file permissions, or runtime checks prevent modifications

**Evidence**:
- `.gitignore` does not protect historical artifacts
- No branch protection configured
- No pre-commit hooks
- File permissions are standard

**Effectiveness**: LOW
- AI could technically modify any file
- Depends entirely on AI following rules

---

## Git Protection Analysis

### Current Git Configuration

| Setting | Status | Protection Provided |
|---------|--------|---------------------|
| Branch protection | Not configured | None |
| Pre-commit hooks | Not configured | None |
| Push restrictions | Not configured | None |
| Commit signing | Optional | None |
| `.gitignore` | Standard | None for experiments |

### Observation

**There is no git-level protection for historical artifacts.**

AI can:
- Create new commits modifying historical experiments
- Delete experiment directories
- Rewrite experiment content
- Force push changes (if permission allows)

---

## Gap Analysis: Repository Structure

### Gap Matrix

| Artifact Type | Documented Protection | Technical Enforcement | Gap |
|---------------|---------------------|---------------------|-----|
| Seeds | YES | NONE | Technical enforcement missing |
| Engines | YES | NONE | Versioning is policy only |
| Governance | YES | NONE | Human approval but no blocks |
| Runtime Config | YES | NONE | Human authority but no blocks |
| Evidence | YES | NONE | "Never delete" is policy only |
| Historical Experiments | YES | NONE | Immutability is policy only |
| PROMOTED Knowledge | YES | PARTIAL | State machine but file-level mod possible |
| Current Experiments | NO | NONE | No protection by design |
| Playground | NO | NONE | Mutable by design |

---

## Summary: Protection by Artifact Type

| Category | Protection Level | Based On |
|----------|-----------------|----------|
| Seeds (FROZEN) | ABSOLUTE | Policy + Process + Social |
| PROMOTED Knowledge | HIGH | State machine |
| Evidence | HIGH (intent) | Policy |
| Historical Experiments | MEDIUM | Policy (intent) |
| Governance | MEDIUM | Policy + Human authority |
| Engines | MEDIUM | Policy |
| Current Work | LOW | Design intent |
| Playground | LOW | Design intent |

---

## Findings

### Finding 1: Policy-Based Protection

Most artifact protection is based on documented policies rather than technical enforcement. This relies on:
- AI reading and following rules
- Human review of changes
- Social expectations

### Finding 2: No Technical Barriers

There are no technical barriers preventing AI from modifying any file:
- Git allows all operations
- No file permission restrictions
- No pre-commit hooks
- No branch protection

### Finding 3: Inconsistent Protection

Protection levels are inconsistent:
- Seeds have explicit NEVER-MODIFY rules
- Historical experiments have implicit immutability
- Evidence has "never delete" but not "never modify"

### Finding 4: Human-Dependent

Protection relies heavily on human oversight rather than automated enforcement.

---

## Evidence Sources

| Document | Path |
|----------|------|
| BOOTSTRAP.md | `/workspace/project/kde/laboratory/BOOTSTRAP.md` |
| LABORATORY-RULES.md | `/workspace/project/kde/laboratory/LABORATORY-RULES.md` |
| ENGINE-VERSIONING.md | `/workspace/project/kde/governance/ENGINE-VERSIONING.md` |
| EVIDENCE.md | `/workspace/project/kde/laboratory/EVIDENCE.md` |
| REPOSITORY-VALIDATION.md | `/workspace/project/kde/laboratory/REPOSITORY-VALIDATION.md` |
| NEVER-MODIFY.md | `/workspace/project/kde/seeds/seed-001/NEVER-MODIFY.md` |
| STATE-MACHINE.md | `/workspace/project/kde/governance/STATE-MACHINE.md` |

---

*Document Status*: DRAFT
*Investigation*: LAB-036
*Phase*: 4 - Repository Governance Review
