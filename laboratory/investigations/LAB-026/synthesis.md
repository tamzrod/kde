# Synthesis: LAB-026 — KDE Method Concept

**Investigation**: LAB-026
**Date**: 2026-07-21T12:20:00Z
**Status**: DRAFT

---

## Executive Summary

This synthesis answers whether the "Method" concept proposed in LAB-025 should be a first-class KDE artifact.

**Answer**: **No. A new "Method" artifact is unnecessary.**

The proposed "Method" concept is better classified as **Knowledge** (specifically, a Governance specification in the Architecture class).

---

## Research Questions Answered

### Q1: What is a Method?

**Answer**: A reusable workflow with phases, roles, artifacts, and governance.

**Source**: LAB-025 capability-specification.md

### Q2: Is Method different from Knowledge?

**Answer**: **NO** - Methods are a type of Knowledge.

**Evidence**: LAB-025's Method has:
- Version ✓
- Definition ✓
- Required artifacts ✓
- Lifecycle ✓
- Owned by Governance ✓

This matches the Knowledge Document Architecture (LAB-022, as amended by LAB-024).

### Q3: Is Method different from Capability?

**Answer**: **YES** - Different concepts.

| Aspect | Method | Capability |
|--------|--------|------------|
| Represents | Workflow | Features |
| Returned by | N/A | Engine.Capabilities() |
| Executable | No | N/A |

### Q4: Is Method different from Engine?

**Answer**: **YES** - Different scope and executability.

| Aspect | Method | Engine |
|--------|--------|--------|
| Executable | No | Yes |
| Scope | Governance workflow | Scientific discovery |
| Generates Knowledge | No | Yes |

### Q5: Is Method different from Governance?

**Answer**: **YES** - Different level of abstraction.

| Aspect | Method | Governance |
|--------|--------|------------|
| Scope | Specific workflow | General standards |
| Form | Documented workflow | Rules and defaults |

**But**: Methods are **implemented through** Governance.

### Q6: Can Methods evolve independently?

**Answer**: **YES** - Like any Knowledge artifact.

### Q7: Should Methods have lifecycle and versioning?

**Answer**: **YES** - Like Knowledge artifacts.

### Q8: Should Methods be installable?

**Answer**: **YES** - But not as a new artifact type.

**Recommendation**: Methods should be **Knowledge** artifacts that are promoted to /knowledge/ when approved.

### Q9: Does KDE require a Method layer?

**Answer**: **NO** - KDE has three process layers:

| Layer | Location | Purpose |
|-------|---------|---------|
| Scientific | /engines/ | How to discover |
| Execution | /laboratory/ | How to investigate |
| Governance | /knowledge/ | How to standardize |

A fourth layer is unnecessary.

### Q10: What problems does Method solve that existing artifacts cannot?

**Answer**: **NONE** - Existing artifacts can accommodate governance workflows.

---

## Classification Analysis

### Method as Knowledge

**Evidence**: LAB-025's "KDE Knowledge Governance Method" has all characteristics of Knowledge:

1. **Definition**: Defines what the method is
2. **Version**: Has semantic version (1.0.0)
3. **Status**: Has lifecycle (DRAFT → APPROVED)
4. **Category**: Fits ARCHITECTURE or GOVERNANCE class
5. **Provenance**: Would link to LAB-025 investigation
6. **Confidence**: Has confidence assessment

**Conclusion**: The Method is Knowledge, not a new artifact type.

### Where Should It Live?

| Option | Location | Assessment |
|--------|---------|------------|
| /laboratory/methods/ | New directory | **Not recommended** - Duplicative |
| /knowledge/ | Existing directory | **Recommended** - Follows architecture |

**Recommendation**: Store as `/knowledge/KDE-GOV-METHOD-001.md` in the Architecture or Governance class.

---

## Why the Ambiguity Exists

### Root Cause

LAB-025 used the term "Method" in two different contexts:

1. **Engine context**: Methods are interface functions (Initialize, Analyze, etc.)
2. **LAB-025 context**: Methods are reusable workflows

This terminology collision created confusion.

### Resolution

Replace "Method" with more precise terminology:

| Old Term | New Term | Classification |
|---------|---------|----------------|
| Method | Knowledge Governance Workflow | Knowledge |
| methods/ directory | /knowledge/KDE-GOV-*.md | Knowledge |
| Installable capability | Promotable Knowledge | Knowledge |

---

## Alternative Analysis

### Option A: New Method Artifact (LAB-025 Proposal)

**Pros**:
- Clear separation of concerns
- Dedicated workflow documentation

**Cons**:
- Duplicates existing artifacts
- No evidence current approach is insufficient
- Terminology collision with Engine interface
- Creates fourth process layer

**Assessment**: **Not recommended**

### Option B: Knowledge Artifact (Recommended)

**Pros**:
- Follows existing architecture
- Unifies governance under Knowledge
- Uses established patterns
- No new artifact types

**Cons**:
- Governance workflows mixed with other Knowledge

**Assessment**: **Recommended**

---

## Recommended Path Forward

### Immediate

1. **Do NOT create** `/laboratory/methods/` directory
2. **Classify** LAB-025's output as Knowledge
3. **Promote** as `/knowledge/KDE-GOV-001.md` (or similar)

### Future Governance Workflows

1. Create as Knowledge investigation
2. Follow Knowledge lifecycle
3. Promote to /knowledge/ when approved
4. Reference from /governance/ as needed

---

## What Was Resolved

| Ambiguity | Resolution |
|-----------|-----------|
| Method is new artifact type | **No** - It's Knowledge |
| Method belongs in /laboratory/ | **No** - Belongs in /knowledge/ |
| Method collides with Engine | **Yes** - Terminology collision |
| Method adds new layer | **No** - Three layers sufficient |
| Method solves problems | **No** - Existing artifacts sufficient |

---

## Summary

### Outcome

**Outcome B**: Methods are a specialization of Knowledge.

The "Method" concept proposed in LAB-025 should not be a first-class KDE artifact. Instead, it should be classified as Knowledge (specifically, a Governance or Architecture specification).

### Justification

1. Methods have all characteristics of Knowledge
2. Existing artifacts are sufficient
3. No evidence current approach is broken
4. Creating new layer adds complexity without benefit
5. Terminology collides with Engine interface

### Confidence

| Factor | Assessment |
|--------|------------|
| Evidence Quality | HIGH |
| Reproducibility | HIGH |
| Completeness | HIGH |

**Overall Confidence**: HIGH
