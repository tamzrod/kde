<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-071: KDE Methodology Patch Investigation

**Status**: INVESTIGATION  
**Parent**: INV-070 (Methodology Integrity Audit)  
**Created**: 2026-07-28  
**Source**: Methodology patch proposal  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation identifies 5 methodology holes from INV-070 and proposes 4 patches to prevent drift. Analysis concludes: 2 patches are ACCEPTED, 1 is ACCEPTED WITH CAVEAT, and 1 is REJECTED. The accepted patches add mandatory checkpoints for evidence sourcing, need determination, and authority declaration without creating excessive bureaucracy.]

---

## Part 1: Methodology Holes from INV-070

### 1.1 Hole Summary

[EVIDENCE: INV-070]

| Hole ID | Description | Severity |
|---------|-------------|----------|
| H1 | No evidence sourcing checkpoint | SERIOUS |
| H2 | No need determination gate | SERIOUS |
| H3 | No external pattern validation | MODERATE |
| H4 | No inference percentage requirement | MODERATE |
| H5 | No authority declaration requirement | MODERATE |

### 1.2 Hole H1: No Evidence Sourcing Checkpoint

| Aspect | Analysis |
|--------|----------|
| **Description** | Conclusions could be drawn without citing KDE evidence |
| **Root Cause** | No checkpoint validates evidence source before conclusion |
| **Affected Investigations** | INV-065, INV-066, INV-067 |
| **Impact** | External patterns treated as KDE evidence |
| **Risk** | HIGH - Conclusions unsupported by KDE artifacts |
| **Evidence** | INV-065: ENZO, Caveman sourced from GitHub, not KDE |

**Why Violation Was Possible**:
- ECU validates EVIDENCE:/INFERENCE: markers
- ECU does NOT validate that evidence comes from KDE artifacts
- No checkpoint requires KDE source verification

### 1.3 Hole H2: No Need Determination Gate

| Aspect | Analysis |
|--------|----------|
| **Description** | Implementation planned without proving the problem exists |
| **Root Cause** | No gate requires need determination before implementation |
| **Affected Investigations** | INV-067, INV-068 |
| **Impact** | Implementation planned prematurely |
| **Risk** | HIGH - Changes proposed without evidence of need |
| **Evidence** | INV-068: "Recommended First Implementation Task" without need evidence |

**Why Violation Was Possible**:
- No investigation type requires "problem evidence"
- No gate prevents "solution-first" investigations
- No requirement to prove problem before proposing solution

### 1.4 Hole H3: No External Pattern Validation

| Aspect | Analysis |
|--------|----------|
| **Description** | External patterns could be adopted without KDE relevance proof |
| **Root Cause** | No validation requires external patterns to be evaluated for KDE |
| **Affected Investigations** | INV-065 |
| **Impact** | Universal principles claimed from non-KDE sources |
| **Risk** | MEDIUM - External sources may not apply to KDE |
| **Evidence** | INV-065: "Synthesize universal principles" from ENZO + Caveman |

**Why Violation Was Possible**:
- No requirement to evaluate external pattern relevance
- No checkpoint validates external pattern applicability
- No gate prevents external pattern adoption

### 1.5 Hole H4: No Inference Percentage Requirement

| Aspect | Analysis |
|--------|----------|
| **Description** | No requirement to declare how much of conclusion is inference |
| **Root Cause** | ECU only validates EVIDENCE: markers exist, not ratio |
| **Affected Investigations** | All (INV-065-069) |
| **Impact** | Conclusions could be mostly inference, mostly undeclared |
| **Risk** | MEDIUM - Reasoning quality unclear |
| **Evidence** | INV-065-069: All passed ECU but contained inferred conclusions |

**Why Violation Was Possible**:
- ECU checks for EVIDENCE: presence, not ratio
- No reporting standard for inference percentage
- No threshold for evidence-to-inference ratio

### 1.6 Hole H5: No Authority Declaration Requirement

| Aspect | Analysis |
|--------|----------|
| **Description** | No requirement to declare who/what is conducting investigation |
| **Root Cause** | No investigation template requires authority section |
| **Affected Investigations** | All (INV-065-069) |
| **Impact** | Authority ambiguous, accountability unclear |
| **Risk** | MEDIUM - Unclear who owns conclusions |
| **Evidence** | INV-065-069: "Investigator: OpenHands Agent" only |

**Why Violation Was Possible**:
- No standard investigation header requires authority
- No requirement to declare execution agent
- No checkpoint validates authority declaration

---

## Part 2: Root-Cause Analysis

### 2.1 Root Cause Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    ROOT CAUSE ANALYSIS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  H1: No evidence sourcing checkpoint                                │
│  └── Cause: ECU validates format, not source                      │
│                                                                    │
│  H2: No need determination gate                                    │
│  └── Cause: No "problem evidence" requirement                     │
│                                                                    │
│  H3: No external pattern validation                               │
│  └── Cause: No relevance evaluation requirement                   │
│                                                                    │
│  H4: No inference percentage requirement                           │
│  └── Cause: ECU checks presence, not ratio                       │
│                                                                    │
│  H5: No authority declaration requirement                         │
│  └── Cause: No standard header template                           │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Systemic Root Cause

| Observation | Analysis |
|------------|----------|
| ECU validates format | EVIDENCE:/INFERENCE: markers checked |
| ECU does not validate source | KDE vs external not distinguished |
| No investigation gate | Problem → Solution gate missing |
| No authority standard | Who/What/Why not declared |

**Root Cause**: ECU enforces format, not methodology integrity.

---

## Part 3: Proposed Methodology Patches

### 3.1 Patch P1: Evidence Source Checkpoint

| Aspect | Detail |
|--------|--------|
| **Patch** | Add EVIDENCE_SCOPE: field to investigation header |
| **Required Values** | KDE_ONLY, KDE_WITH_EXTERNAL, EXTERNAL_SYNTHESIS |
| **Gate** | Conclusions cannot be drawn without source declaration |
| **ECU Change** | Validate EVIDENCE_SCOPE: is present and valid |

**Implementation**:
```yaml
---
# Investigation Header
EVIDENCE_SCOPE: KDE_ONLY  # or KDE_WITH_EXTERNAL, EXTERNAL_SYNTHESIS
EVIDENCE_SOURCES: 
  - /workspace/project/kde/runtime/retrieval.py
  - /workspace/project/kde/runtime/sop005.py
---
```

**Would This Have Prevented Drift?**:
- INV-065 would declare EXTERNAL_SYNTHESIS
- INV-066 would fail - declared KDE_WITH_EXTERNAL but used only INV-065
- INV-068 would fail - declared implementation without need evidence

**Can Drift Still Occur?**:
- If investigator lies about scope - YES
- If scope is KDE_WITH_EXTERNAL - YES (external can dominate)

**Assessment**: **ACCEPTED** - Would have flagged scope issues, but not foolproof.

---

### 3.2 Patch P2: Need Determination Gate

| Aspect | Detail |
|--------|--------|
| **Patch** | Add INVESTIGATION_TYPE: PROBLEM/SOLUTION/SYNTHESIS gate |
| **Requirement** | SOLUTION/SYNTHESIS investigations must cite PROBLEM evidence |
| **Gate** | Conclusions cannot propose solutions without problem evidence |
| **ECU Change** | If type=SOLUTION, require PROBLEM citations |

**Implementation**:
```yaml
---
# Investigation Header
INVESTIGATION_TYPE: SOLUTION  # or PROBLEM, SYNTHESIS

# Required section
## Problem Evidence
[Evidence: /workspace/project/kde/... measurement showing problem]
```

**Would This Have Prevented Drift?**:
- INV-067 would fail - no problem evidence cited
- INV-068 would fail - proposed implementation without need
- INV-069 would pass - analysis type, not solution

**Can Drift Still Occur?**:
- If problem evidence is fabricated - YES
- If problem is overstated - YES
- But: requires explicit problem statement, auditable

**Assessment**: **ACCEPTED** - Forces explicit problem statement.

---

### 3.3 Patch P3: External Pattern Evaluation Gate

| Aspect | Detail |
|--------|--------|
| **Patch** | Add REQUIREMENTS section to external pattern adoption |
| **Requirements** | KDE applicability, evidence of benefit, risk assessment |
| **Gate** | Cannot adopt external patterns without evaluation |
| **ECU Change** | If EVIDENCE_SCOPE=KDE_WITH_EXTERNAL, require evaluation section |

**Implementation**:
```yaml
## External Pattern Evaluation
### KDE Applicability
[Evidence: Why this pattern applies to KDE]

### Evidence of Benefit
[Evidence: Measurable improvement expected]

### Risk Assessment
[Evidence: Risks of adoption]
```

**Would This Have Prevented Drift?**:
- INV-065 would require applicability evaluation
- Would have forced: "Does BOUNDED DISCLOSURE apply to KDE?"
- Answer would be: Unknown - no KDE evidence

**Can Drift Still Occur?**:
- If applicability is assumed without evidence - YES
- But: Forces explicit applicability claim, auditable

**Assessment**: **ACCEPTED WITH CAVEAT** - Forces evaluation but applicability still assumed.

---

### 3.4 Patch P4: Inference Percentage Declaration

| Aspect | Detail |
|--------|--------|
| **Patch** | Add INFERENCE_RATIO: percentage to header |
| **Calculation** | (Inference count) / (Total evidence + inference) |
| **Gate** | None - informational only |
| **ECU Change** | Calculate and report ratio |

**Implementation**:
```yaml
---
INFERENCE_RATIO: 25%  # Calculated by ECU
---
```

**Would This Have Prevented Drift?**:
- INV-065 would show high inference ratio
- INV-066 would show 75%+ inference
- But: No gate - just visibility

**Can Drift Still Occur?**:
- YES - informational only, no gate
- Only useful if human reviewers act on it

**Assessment**: **REJECTED** - Informational only, adds complexity without enforcement.

---

## Part 4: Falsification Attempts

### 4.1 Falsification of P1 (Evidence Source Checkpoint)

| Question | Analysis |
|----------|----------|
| Would prevent drift? | PARTIAL - Scope can be misdeclared |
| Can drift still occur? | YES - Scope can be KDE_WITH_EXTERNAL |
| Creates bureaucracy? | LOW - Just one field |
| Can be bypassed? | YES - Investigator can lie |

**Verdict**: ACCEPTED with caveat - Better than nothing, but not foolproof.

### 4.2 Falsification of P2 (Need Determination Gate)

| Question | Analysis |
|----------|----------|
| Would prevent drift? | YES - Forces problem evidence |
| Can drift still occur? | YES - Problem can be fabricated |
| Creates bureaucracy? | MEDIUM - Requires evidence section |
| Can be bypassed? | YES - Fabricated evidence |

**Verdict**: ACCEPTED - Forces explicit problem statement, auditable.

### 4.3 Falsification of P3 (External Pattern Gate)

| Question | Analysis |
|----------|----------|
| Would prevent drift? | PARTIAL - Forces evaluation |
| Can drift still occur? | YES - Applicability can be assumed |
| Creates bureaucracy? | MEDIUM - Requires evaluation section |
| Can be bypassed? | YES - Weak evaluation accepted |

**Verdict**: ACCEPTED WITH CAVEAT - Forces evaluation but applicability still assumed.

### 4.4 Falsification of P4 (Inference Ratio)

| Question | Analysis |
|----------|----------|
| Would prevent drift? | NO - Informational only |
| Can drift still occur? | YES - No gate |
| Creates bureaucracy? | LOW - One field |
| Can be bypassed? | N/A - No gate |

**Verdict**: REJECTED - Adds complexity without enforcement.

---

## Part 5: Rejected Patches

### 5.1 Rejected: Mandatory Human Review Gate

| Proposal | Requirement for human review before conclusion |
|-----------|-----------------------------------------------|
| **Rejection Reason** | Already required by Principle 1, but not enforced |
| **Would prevent drift?** | PARTIAL - Human reviewers can approve without scrutiny |
| **Creates bureaucracy?** | HIGH - Every investigation needs review |
| **Verdict** | REJECTED - Already exists, enforcement is issue |

### 5.2 Rejected: Investigation Type Restrictions

| Proposal | Restrict investigation types to specific purposes |
|-----------|------------------------------------------------|
| **Rejection Reason** | Too restrictive, prevents exploratory investigation |
| **Would prevent drift?** | MAYBE - But limits useful investigation |
| **Creates bureaucracy?** | HIGH - New type system |
| **Verdict** | REJECTED - Overly restrictive |

### 5.3 Rejected: Pre-Registered Investigation Plans

| Proposal | Require pre-registration of investigation plans |
|-----------|------------------------------------------------|
| **Rejection Reason** | Imposes excessive structure on investigation |
| **Would prevent drift?** | PARTIAL - Plan can still be abandoned |
| **Creates bureaucracy?** | HIGH - Registration process |
| **Verdict** | REJECTED - Overly bureaucratic |

---

## Part 6: Accepted Patches Summary

### 6.1 Patch P1: Evidence Source Checkpoint

| Aspect | Value |
|--------|-------|
| **Type** | New mandatory checkpoint |
| **Change** | Add EVIDENCE_SCOPE: to investigation header |
| **ECU Validation** | Check field present and valid |
| **Complexity** | LOW - One field added |
| **Enforcement** | MEDIUM - Scope can be misdeclared |

### 6.2 Patch P2: Need Determination Gate

| Aspect | Value |
|--------|-------|
| **Type** | New investigation gate |
| **Change** | Add INVESTIGATION_TYPE: and Problem Evidence section |
| **ECU Validation** | If SOLUTION, require problem evidence |
| **Complexity** | MEDIUM - Evidence section required |
| **Enforcement** | HIGH - Gate prevents solution without problem |

### 6.3 Patch P3: External Pattern Evaluation

| Aspect | Value |
|--------|-------|
| **Type** | New reporting requirement |
| **Change** | Add External Pattern Evaluation section |
| **ECU Validation** | If KDE_WITH_EXTERNAL, require evaluation |
| **Complexity** | MEDIUM - Evaluation section required |
| **Enforcement** | MEDIUM - Evaluation can be weak |

---

## Part 7: Updated Investigation Workflow

### 7.1 New Investigation Header Template

```yaml
---
# INV-XXX: [Title]

**Status**: INVESTIGATION  
**Parent**: [Parent investigation]  
**Created**: [Date]  
**Source**: [Source of investigation]

## Investigation Authority
INVESTIGATOR: [Name/Agent]
EXECUTION_AGENT: [AI Agent, Human, etc.]
SEED_VERSION: [SEED-XXX]
ENGINE: [Engine used, if any]

## Evidence Scope
EVIDENCE_SCOPE: [KDE_ONLY | KDE_WITH_EXTERNAL | EXTERNAL_SYNTHESIS]
EVIDENCE_SOURCES:
  - [Path to evidence source 1]
  - [Path to evidence source 2]

## Investigation Type
INVESTIGATION_TYPE: [PROBLEM | SOLUTION | SYNTHESIS | ANALYSIS]
# If SOLUTION or SYNTHESIS, Problem Evidence section required below

---

## Problem Evidence (if SOLUTION/SYNTHESIS)
[Evidence of the problem being addressed]

## Evidence
[All evidence supporting conclusions]

## Conclusions
[Derived conclusions]
```

### 7.2 New ECU Validation Rules

```python
class ECUValidation:
    
    def validate_evidence_scope(self, header):
        """Validate EVIDENCE_SCOPE is present and valid."""
        scope = header.get('EVIDENCE_SCOPE')
        if not scope:
            raise ValidationError("EVIDENCE_SCOPE required")
        if scope not in ['KDE_ONLY', 'KDE_WITH_EXTERNAL', 'EXTERNAL_SYNTHESIS']:
            raise ValidationError(f"Invalid EVIDENCE_SCOPE: {scope}")
        return True
    
    def validate_investigation_type(self, header, content):
        """Validate investigation type requirements."""
        inv_type = header.get('INVESTIGATION_TYPE')
        
        if inv_type == 'SOLUTION':
            # Require problem evidence
            problem_evidence = content.get('## Problem Evidence')
            if not problem_evidence:
                raise ValidationError("SOLUTION requires Problem Evidence section")
        
        if header.get('EVIDENCE_SCOPE') == 'KDE_WITH_EXTERNAL':
            # Require external pattern evaluation
            ext_eval = content.get('## External Pattern Evaluation')
            if not ext_eval:
                raise ValidationError("External patterns require evaluation section")
        
        return True
```

### 7.3 Updated Investigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    UPDATED INVESTIGATION FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  1. DECLARE AUTHORITY                                             │
│     └── Investigator, Agent, Seed, Engine                          │
│                                                                    │
│  2. DECLARE SCOPE                                                 │
│     └── KDE_ONLY | KDE_WITH_EXTERNAL | EXTERNAL_SYNTHESIS         │
│                                                                    │
│  3. DECLARE TYPE                                                  │
│     └── PROBLEM | SOLUTION | SYNTHESIS | ANALYSIS                  │
│                                                                    │
│  4. [GATE] PROBLEM EVIDENCE (if SOLUTION/SYNTHESIS)              │
│     └── Must cite problem evidence before proposing solution       │
│                                                                    │
│  5. [GATE] EXTERNAL PATTERN EVALUATION (if KDE_WITH_EXTERNAL)    │
│     └── Must evaluate applicability before adopting external       │
│                                                                    │
│  6. COLLECT EVIDENCE                                              │
│     └── From declared sources only                                 │
│                                                                    │
│  7. DERIVE CONCLUSIONS                                            │
│     └── Based on evidence, traceable                              │
│                                                                    │
│  8. [GATE] ECU VALIDATION                                         │
│     └── Evidence markers, scope, type, evaluation                 │
│                                                                    │
│  9. HUMAN REVIEW                                                   │
│     └── Approval before publication                                │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 8: Required ECU Validation Changes

### 8.1 Changes to ECU

| Change | File | Impact |
|--------|------|--------|
| Add scope validation | principles_enforcer.py | LOW |
| Add type validation | principles_enforcer.py | MEDIUM |
| Add evaluation validation | principles_enforcer.py | MEDIUM |

### 8.2 New Validation Rules

| Rule | Trigger | Action |
|------|---------|--------|
| EVIDENCE_SCOPE required | Every investigation | Error if missing |
| EVIDENCE_SCOPE valid | If present | Validate enum |
| Problem Evidence required | If type=SOLUTION | Error if missing |
| External evaluation required | If scope=KDE_WITH_EXTERNAL | Error if missing |

---

## Part 9: Confidence Assessment

### 9.1 Patch Confidence

| Patch | Confidence | Rationale |
|-------|------------|-----------|
| P1: Evidence Scope | HIGH | Simple field, clear validation |
| P2: Need Determination | HIGH | Forces explicit problem statement |
| P3: External Pattern | MEDIUM | Forces evaluation, but applicability assumed |
| P4: Inference Ratio | REJECTED | No gate, adds complexity |

### 9.2 Implementation Confidence

| Aspect | Confidence | Rationale |
|--------|------------|-----------|
| ECU changes | HIGH | Straightforward validation |
| Header template | HIGH | Simple addition |
| Gate enforcement | MEDIUM | Requires proper implementation |

---

## Part 10: Summary

### 10.1 Key Findings

| Finding | Impact |
|---------|--------|
| ECU validates format, not methodology | Root cause of drift |
| No gate between problem and solution | Implementation before need |
| No scope declaration | External patterns dominated |
| No authority standard | Accountability unclear |

### 10.2 Accepted Patches

| Patch | Type | Enforcement |
|-------|------|--------------|
| P1: Evidence Scope | Checkpoint | MEDIUM |
| P2: Need Determination | Gate | HIGH |
| P3: External Pattern Evaluation | Reporting | MEDIUM |

### 10.3 Rejected Patches

| Patch | Reason |
|-------|--------|
| P4: Inference Ratio | No gate, informational only |
| Human Review Gate | Already exists, enforcement issue |
| Investigation Type Restrictions | Overly restrictive |
| Pre-registration | Overly bureaucratic |

### 10.4 Remaining Questions

| Question | Priority |
|----------|----------|
| Should EVIDENCE_SCOPE be auto-detected? | MEDIUM |
| How to validate problem evidence quality? | HIGH |
| How to prevent scope misdeclaration? | MEDIUM |

---

## Evidence

[EVIDENCE: INV-070 - Methodology integrity audit]
[EVIDENCE: /workspace/project/kde/runtime/principles_enforcer.py - ECU implementation]
[EVIDENCE: KDE Five Core Principles]

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)  
**Type**: Methodology Patch Investigation
