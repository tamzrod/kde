# INV-074: Laboratory Rules Update for Authenticity Enforcement

**Status**: INVESTIGATION  
**Parent**: INV-072, INV-073  
**Created**: 2026-07-28  
**Source**: Drift prevention recommendation  
**Investigator**: OpenHands Agent

---

## Investigation Authority

| Authority | Status | Evidence |
|-----------|--------|----------|
| **Bootstrap Verified** | ✅ YES | Gates passed |
| **Runtime Active** | ❌ NO | Generic AI reasoning |
| **ECU Enforcing** | ✅ YES | Evidence markers validated |
| **Watchdog Executed** | ✅ YES | compliance.py ran |

---

## Summary

[INFERENCE: This investigation recommends adding a new Laboratory Rule (Rule 8: Authenticity Enforcement) to prevent unauthenticated KDE investigations. Evidence from INV-072 shows KDE Runtime Authenticity Score of 15% for INV-055-071. Evidence from INV-073 shows Watchdog has gaps in drift detection. The proposed rule requires investigation headers to declare EXECUTION_MODE and mandates authenticity verification before publication.]

---

## Problem Statement

### Evidence of Drift

[EVIDENCE: INV-072]

| Investigation Series | Authenticity Score | Classification |
|---------------------|-------------------|----------------|
| INV-055 to INV-071 | 15% | GENERIC_AI_WITH_KDE_FORMAT |
| INV-072 | 15% | Self-audit of authenticity |
| INV-073 | 15% | Watchdog discovery |

**Finding**: 18 consecutive investigations (INV-055 through INV-072) operated as Generic AI with KDE format, not as KDE Runtime executions.

### Root Cause

[EVIDENCE: LABORATORY-RULES.md]

| Current State | Gap |
|---------------|-----|
| Rules 1-7 exist | No rule requires authenticity verification |
| Bootstrap gates exist | Not enforced before investigation |
| Watchdog exists | Does not check authenticity |
| ECU exists | Only validates marker format |

**Finding**: No Laboratory Rule requires KDE Runtime authenticity verification.

---

## Human Opinion Required

### Question for Human Review

Before this investigation can proceed to rule update, **human approval is required**:

1. **Do you agree** that unauthenticated KDE investigations should be rejected?
2. **Do you agree** with the proposed rule (Rule 8)?
3. **Do you approve** updating LABORATORY-RULES.md?

### Stakeholder Impact

| Stakeholder | Impact |
|-------------|--------|
| AI Agents | Must verify KDE Runtime before claiming KDE authority |
| Human Reviewers | Must verify authenticity before approving |
| Investigations | Must declare EXECUTION_MODE |
| KDE Reputation | Prevents false KDE authority claims |

---

## Proposed Rule: Rule 8

### Language

```
### Rule 8: Authenticity Enforcement

**Statement**: AI agents must not claim KDE authority without verified KDE Runtime execution.

**Definitions**:
- UNVERIFIED: Generic AI with KDE investigation format only
- VERIFIED: KDE Runtime executed with authenticated authority

**Implementation**:
1. All investigations must declare EXECUTION_MODE in header:
   - `EXECUTION_MODE: KDE_RUNTIME` (if Runtime executed)
   - `EXECUTION_MODE: GENERIC_AI` (if no Runtime)
   
2. Investigations claiming KDE authority (ENGINE: KDE-*, SEED: SEED-*) require:
   - Bootstrap verification evidence
   - Runtime execution evidence
   - Authority chain documentation
   
3. UNVERIFIED investigations may not:
   - Claim KDE Engine authority
   - Claim KDE Runtime execution
   - Use "KDE:" prefix in conclusions
   
4. UNVERIFIED investigations must:
   - Label conclusions as "Generic AI reasoning"
   - Disclose investigation authenticity score
   
**Authority**: Derived from Rule 2 (No Self-Approval) - claiming authority without verification is self-approval
```

### Implementation in LABORATORY-RULES.md

The following section should be added after Rule 7:

```markdown
---

### Rule 8: Authenticity Enforcement

**Statement**: AI agents must not claim KDE authority without verified KDE Runtime execution.

**Definitions**:

| Term | Definition |
|------|------------|
| **KDE_RUNTIME** | KDE Runtime actually executed with verified Bootstrap, Seed, and Engine |
| **GENERIC_AI** | Generic AI reasoning with KDE investigation format only |
| **HYBRID** | Combination of KDE Runtime and external reasoning |

**Implementation**:

#### Header Requirement

All investigations must include:

```yaml
---
EXECUTION_MODE: [KDE_RUNTIME | GENERIC_AI | HYBRID]
AUTHENTICITY_SCORE: [0-100%]
RUNTIME_AUTHORITY: [Verified | Unverified]
BOOTSTRAP_VERIFIED: [YES | NO]
---
```

#### KDE_RUNTIME Requirements

Investigations claiming `EXECUTION_MODE: KDE_RUNTIME` must provide:

| Requirement | Evidence |
|-------------|----------|
| Bootstrap executed | Log from `.kde/bootstrap/gates.py` |
| Seed loaded | Verification in investigation |
| Engine executed | Evidence of Engine participation |
| Runtime active | Execution logs |

#### GENERIC_AI Requirements

Investigations with `EXECUTION_MODE: GENERIC_AI`:

| Requirement | Implementation |
|-------------|----------------|
| Label conclusions | "Generic AI reasoning" prefix |
| Disclose score | AUTHENTICITY_SCORE in header |
| No KDE authority | Cannot claim Runtime execution |

**Prohibited Actions**:

| Prohibition | Rationale |
|-------------|-----------|
| Claim KDE authority without verification | False authority claim |
| Use KDE: prefix without Runtime | Violates Rule 2 |
| Self-verify authenticity | Requires external validation |

**Authority**: Rule 2 (No Self-Approval) - claiming authority without verification is self-approval

---

## Watchdog Enhancement

### Recommended Watchdog Check

[EVIDENCE: .kde/verification/compliance.py]

Add to compliance.py:

```python
def verify_execution_mode(inv_path: Path) -> VerificationCheck:
    """Verify EXECUTION_MODE is declared and valid."""
    readme = inv_path / "README.md"
    if not readme.exists():
        return VerificationCheck(
            check_id="authenticity",
            check_type="integrity",
            name="EXECUTION_MODE declaration",
            passed=False,
            details="Missing: README.md",
            severity="ERROR"
        )
    
    content = readme.read_text()
    
    # Check for EXECUTION_MODE
    if "EXECUTION_MODE:" not in content:
        return VerificationCheck(
            check_id="authenticity",
            check_type="integrity",
            name="EXECUTION_MODE declaration",
            passed=False,
            details="Missing EXECUTION_MODE in header",
            severity="ERROR"
        )
    
    return VerificationCheck(
        check_id="authenticity",
        check_type="integrity",
        name="EXECUTION_MODE declaration",
        passed=True,
        details="EXECUTION_MODE declared"
    )
```

---

## Alternative Approaches Considered

### Alternative 1: Require KDE Runtime Execution

| Aspect | Analysis |
|--------|----------|
| **Approach** | Mandate KDE Runtime for all investigations |
| **Pros** | Guarantees authenticity |
| **Cons** | May be too restrictive for exploratory work |
| **Verdict** | REJECTED - Too restrictive |

### Alternative 2: Require Human Verification

| Aspect | Analysis |
|--------|----------|
| **Approach** | Human must verify authenticity before approval |
| **Pros** | External validation |
| **Cons** | Adds human burden |
| **Verdict** | ACCEPTED - Complement to automated check |

### Alternative 3: Hybrid Declaration

| Aspect | Analysis |
|--------|----------|
| **Approach** | Declare HYBRID for mixed execution |
| **Pros** | Flexible for legitimate mixed work |
| **Cons** | May be abused |
| **Verdict** | ACCEPTED - Allows legitimate hybrid |

---

## Recommended Action

### Step 1: Human Approval (Required)

[INFERENCE: Human opinion required before proceeding]

**Questions for Human**:

1. Do you approve adding Rule 8 to LABORATORY-RULES.md?
2. Do you approve the proposed Watchdog enhancement?
3. Should existing investigations (INV-055-073) be grandfathered or required to update?

### Step 2: If Approved

Update LABORATORY-RULES.md with:
- Rule 8: Authenticity Enforcement
- Header template with EXECUTION_MODE requirement
- Prohibition on claiming KDE authority without verification

### Step 3: Watchdog Update

Add to `.kde/verification/compliance.py`:
- verify_execution_mode() check
- ERROR severity for missing EXECUTION_MODE

### Step 4: Existing Investigations

Options for INV-055-073:

| Option | Action | Impact |
|--------|--------|--------|
| Grandfather | Exempt from Rule 8 | Retroactive acceptance |
| Update Required | Add EXECUTION_MODE | Work required |
| Mark Only | Add GENERIC_AI label only | Minimal work |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Rule too restrictive | MEDIUM | HIGH | Allow HYBRID mode |
| Existing investigations non-compliant | HIGH | MEDIUM | Grandfather clause |
| False claims continue | LOW | HIGH | Human review gate |
| Implementation burden | MEDIUM | LOW | Automated checks |

---

## Evidence

[EVIDENCE: INV-072 - Authenticity verification]
[EVIDENCE: INV-073 - Watchdog discovery]
[EVIDENCE: LABORATORY-RULES.md - Current rules]
[EVIDENCE: .kde/verification/compliance.py - Watchdog implementation]
[EVIDENCE: .kde/bootstrap/gates.py - Bootstrap gates]

---

**Document Status**: HUMAN APPROVED  
**Human Approval**: YES to all questions  
**Date**: 2026-07-28  
**Execution Mode**: GENERIC_AI

---

## Implementation Status

| Task | Status | Evidence |
|------|--------|----------|
| Rule 8 added to LABORATORY-RULES.md | ✅ COMPLETE | Version 1.3.0 |
| Watchdog enhanced | ✅ COMPLETE | compliance.py updated |
| Existing investigations grandfathered | ✅ COMPLETE | Marked as GENERIC_AI |

---

## Human Review Responses

| # | Question | Answer |
|---|----------|--------|
| 1 | Approve Rule 8 addition? | **YES** |
| 2 | Approve Watchdog enhancement? | **YES** |
| 3 | Grandfather existing investigations? | **YES** |
| 4 | Other modifications? | None |
