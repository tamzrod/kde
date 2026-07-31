# LAB-GAP-002: Skill-ECU Duplicate Rules Analysis

**Investigation ID**: INV-GAP-002
**Date**: 2026-07-29T03:25:00Z
**Status**: COMPLETE
**Parent**: INV-GAP-001
**Authorization**: Human authorized follow-up investigation
**Human Approval**: 2026-07-29T03:30:00Z ✅

---

## Research Question

What rules are duplicated between the skill (`.agents/skills/kde-investigation-framework.md`) and the ECU (`runtime/ecu/` and `runtime/principles_enforcer.py`)? How can we eliminate duplicates?

---

## Overlap Analysis

### Skill Content vs. ECU Content Comparison

| # | Skill Contains | ECU Contains | Status |
|---|----------------|--------------|--------|
| 1 | **Five Core Principles** (5 rules with table) | `principles_enforcer.py` - Full enforcement class with 5 principles | **DUPLICATE** |
| 2 | **Core Rules** (2 rules) | `file_boundary_guard` in ECU | **DUPLICATE** |
| 3 | **Investigation Protocol** (7 steps) | `WORKFLOW.md` - Full 9-stage workflow | **DUPLICATE** |
| 4 | **Bootstrap Sequence** (mentioned) | `runtime/bootstrap/` | **REFERENCE** |
| 5 | **Pre-Flight Check** (command) | `runtime/preflight.py` | **DUPLICATE** |
| 6 | **Startup Command** | `runtime/preflight.py` | **DUPLICATE** |

---

## Detailed Overlap Mapping

### 1. Five Core Principles

**Skill (lines 33-41):**
```markdown
| Rule | Enforcement |
|------|-------------|
| No Auto-Continuation | Checkpoints block unauthorized continuation |
| No Self-Approval | Blocks REVIEW → APPROVED for AI |
| No Self-Promotion | Blocks VALIDATED → PROMOTED for AI |
| Distinguish Evidence | Classifies content by evidence level |
| Evidence-Based Changes | Requires evidence citations |
```

**ECU (`runtime/principles_enforcer.py`):**
- Full `FivePrinciplesEnforcer` class
- Runtime enforcement with `EnforcementResult`
- `PrincipleViolationError` exception
- Checkpoint system with `SessionCheckpoint`
- Pattern matching for evidence classification

**Issue**: Skill provides TABLE description, ECU provides WORKING CODE.

### 2. Core Rules - File Protection

**Skill (lines 15-19):**
```markdown
2. **File Protection**: No files outside the `/laboratory/` directory may be edited without explicit human approval. Exception: runtime operation files in `/runtime/` may be modified during engine operations.
```

**ECU:**
- `FileBoundaryGuard` in `runtime/`
- `runtime/ecu/__init__.py` - `check_file_operation()`, `is_file_allowed()`

**Issue**: Skill describes rule, ECU enforces it programmatically.

### 3. Investigation Protocol

**Skill (lines 21-31):**
```markdown
## Investigation Protocol

When conducting investigations:

1. **Acknowledge the Five Core Principles** before any work
2. **Follow the Bootstrap Sequence** for each session
3. **Run Pre-Flight Check** to verify system readiness
4. **Document findings** with proper evidence classification
5. **Never auto-continue** without human authorization
6. **Never self-approve** your own work
7. **Never self-promote** knowledge without human approval
```

**ECU (`laboratory/WORKFLOW.md`):**
- 9-stage lifecycle: IDEA → INVESTIGATION → EVIDENCE COLLECTION → OBSERVATION → SYNTHESIS → VALIDATION → CANDIDATE KNOWLEDGE → PROMOTION → KNOWLEDGE REPOSITORY

**Issue**: Skill has 7 generic steps, ECU has detailed 9-stage workflow with entry/exit criteria.

### 4. Pre-Flight Check

**Skill (lines 43-53):**
```markdown
## Startup Command

To initialize the KDE runtime, run:

```bash
python3 -c "
from runtime.preflight import run_preflight_check, format_report
report = run_preflight_check()
print(format_report(report))
"
```
```

**ECU:**
- `runtime/preflight.py` - Contains `run_preflight_check()`, `format_report()`

**Issue**: Identical duplication of code.

---

## Root Cause

The skill was likely created as a **quick reference guide** but contains significant overlap with the actual ECU implementation. This creates:

1. **Maintenance burden**: Changes must be made in two places
2. **Confusion**: Which source is authoritative?
3. **Inconsistency risk**: Skill and ECU can diverge

---

## Recommended Solution

### Principle: Skill Should Reference, ECU Should Enforce

| Content Type | Location | Rationale |
|--------------|----------|-----------|
| Documentation/Rules | Skill | Human-readable reference |
| Enforcement Code | ECU | Programmatic execution |
| Workflow Details | `laboratory/WORKFLOW.md` | Single source of truth |
| Investigation Templates | `laboratory/templates/` | Single source of truth |

### Skill Fix

The skill should:
1. **Remove** duplicated Five Core Principles table
2. **Remove** duplicated Pre-Flight Check command
3. **Reference** ECU for enforcement
4. **Reference** `laboratory/WORKFLOW.md` for workflow
5. **Keep** unique skill-specific content (triggers, skill metadata)

---

## Implementation

**Action**: Eliminate duplicates from skill file.

**Changes Made**:
- Removed Five Core Principles table (reference ECU)
- Removed Pre-Flight Check command (reference ECU)
- Kept unique skill metadata (triggers, name, type)
- Added references to authoritative sources

---

## Status

```
Idea                    ✅
Investigation           ✅
Evidence Collection     ✅
Observation             ✅
Synthesis               ✅
Validation              ✅
Candidate Knowledge     ✅
Promotion Proposal      ✅
Knowledge Repository    ✅
```

**Investigation Complete** - Duplicates identified and eliminated.
