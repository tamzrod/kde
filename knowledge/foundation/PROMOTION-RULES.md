# Promotion Rules

**Document ID**: FOUND-004
**Type**: Process Definition
**Status**: FOUNDATIONAL
**Authority**: Human

---

## Overview

This document defines how knowledge enters, moves through, and exits the Knowledge Layer. It specifies evidence requirements, approval authorities, and deprecation processes.

---

## The Five Core Principles

These principles govern all knowledge operations:

| Principle | Statement |
|-----------|-----------|
| **No Auto-Continuation** | AI must wait for explicit human authorization |
| **No Self-Approval** | AI must not approve its own work |
| **No Self-Promotion** | AI must not promote knowledge without human authorization |
| **Distinguish Evidence** | AI must mark evidence vs. inference vs. hypothesis |
| **Evidence-Based Changes** | All claims must be justified by evidence |

**Note**: These principles are immutable. They cannot be changed, only extended through new Seeds.

---

## Promotion Definition

**Promotion** is the process of moving knowledge from Candidate to Promoted status in the Knowledge Layer.

```
CONVERSATION → CANDIDATE → REVIEW → APPROVED → PROMOTED
                                  ▲
                                  │
                          Human Authorization
                          Required Here
```

---

## Evidence Requirements

### What is Evidence?

Evidence is verifiable information that supports or refutes a knowledge claim.

| Evidence Type | Description | Example |
|--------------|-------------|---------|
| **Direct** | Directly observed | "The pump failed at 10,000 hours" |
| **Documented** | From authoritative source | IEEE standard specification |
| **Experimental** | From controlled tests | LAB-023 experiment results |
| **Field** | From practice | Industry case study |

### Evidence Requirements by Stage

| Stage | Evidence Required |
|-------|------------------|
| Candidate | At least 1 evidence item |
| Review | All evidence verified |
| Approved | Evidence approved by human |
| Promoted | Complete evidence record |

### Evidence Quality

Evidence MUST be:

| Requirement | Description |
|-------------|-------------|
| **Verifiable** | Can be confirmed or refuted |
| **Attributed** | Source clearly cited |
| **Relevant** | Directly supports claim |
| **Distinguished** | Clearly separated from inference |

Evidence MUST NOT be:

| Prohibition | Example |
|-------------|---------|
| Unverifiable | "Everyone knows X" |
| Unattributed | Claims without source |
| Inferential | Conclusions presented as facts |
| Contradictory | Evidence that refutes the claim |

---

## Approval Authority

### Who Can Approve?

| Action | AI Can Do | Human Must Do |
|--------|-----------|---------------|
| Submit candidate | ✅ Yes | No |
| Conduct review | ✅ Yes | No |
| Conduct validation | ✅ Yes | No |
| Approve | ❌ No | ✅ Yes |
| Promote | ❌ No | ✅ Yes |
| Deprecate | ❌ No | ✅ Yes |

### Authority Hierarchy

| Level | Authority | Scope |
|-------|-----------|-------|
| **Foundation** | Human | Immutable definitions |
| **Knowledge** | Human | Validated knowledge |
| **Pattern** | Human | Validated patterns |
| **Workflow** | Human | Standard processes |
| **Decision** | Human | Decision rationale |
| **Lesson** | Human | Lessons learned |

### Self-Approval Prohibition

AI SHALL NOT approve:
- Its own knowledge submissions
- Its own validation results
- Its own work products

**Rationale**: Self-approval creates conflict of interest. Quality requires independent review.

---

## Validation Tests

### Required Tests

All knowledge MUST pass these validation tests:

| Test | Purpose | Method |
|------|---------|--------|
| **Classification** | Can it classify examples? | Apply to test cases |
| **Distinction** | Can it distinguish from related? | Compare boundaries |
| **Methodology** | Does it support methodology? | Integration check |
| **Consistency** | Is it internally consistent? | Cross-reference |
| **Counterexample** | Can it survive challenges? | Attempt refutation |

### Test Descriptions

#### Classification Test

**Question**: Can the definition classify knowledge candidates?

**Method**: 
1. Provide known examples
2. Apply the definition
3. Verify correct classification

**Pass Criteria**: ≥90% correct classification

#### Distinction Test

**Question**: Can it distinguish from related concepts?

**Method**:
1. List related concepts
2. Verify clear boundaries
3. Test edge cases

**Pass Criteria**: No overlapping definitions

#### Methodology Test

**Question**: Does it support downstream methodology?

**Method**:
1. Identify methodology that uses this
2. Verify integration works
3. Check no conflicts

**Pass Criteria**: Compatible with existing methodology

#### Consistency Test

**Question**: Is it consistent with other knowledge?

**Method**:
1. List related knowledge
2. Verify no contradictions
3. Check dependencies

**Pass Criteria**: No internal contradictions

#### Counterexample Test

**Question**: Can it survive attempted refutation?

**Method**:
1. Attempt to find counterexamples
2. Test edge cases
3. Document limitations

**Pass Criteria**: Limitations documented, not fatal

---

## Promotion Process

### Step 1: Submission (AI or Human)

1. Create knowledge object per schema
2. Assign type
3. Define scope
4. Collect evidence
5. Submit for review

### Step 2: Validation (AI)

1. Run classification tests
2. Run distinction tests
3. Run methodology tests
4. Run consistency tests
5. Run counterexample tests
6. Document results

### Step 3: Review (Human)

1. Verify evidence quality
2. Review test results
3. Check scope clarity
4. Verify no conflicts
5. Approve or return

### Step 4: Authorization (Human)

1. Confirm promotion decision
2. Assign version number
3. Assign unique ID
4. Record authority

### Step 5: Promotion (System)

1. Add to Knowledge Layer
2. Update indices
3. Notify consumers
4. Log audit trail

---

## Revision Process

### Minor Revision

For scope expansion or evidence addition:

1. Propose revision
2. Review changes (may be abbreviated)
3. Human authorization
4. Update version (MINOR)
5. Return to Promoted

### Major Revision

For definition changes:

1. Propose revision
2. Full review required
3. Human authorization
4. Update version (MAJOR)
5. Return to Review stage

---

## Deprecation Process

### When to Deprecate

Knowledge SHOULD be deprecated when:

| Reason | Description |
|--------|-------------|
| **Superseded** | Better formulation exists |
| **Invalidated** | Evidence is refuted |
| **Obsolete** | Domain has changed |
| **Incorrect** | Contains errors |
| **Redundant** | Duplicates other knowledge |

### Deprecation Steps

1. **Identify** - Recognize deprecation need
2. **Propose** - Submit deprecation request
3. **Review** - Human reviews rationale
4. **Authorize** - Human approves deprecation
5. **Mark** - Update status to deprecated
6. **Document** - Record deprecation reason
7. **Reference** - Link to replacement (if any)
8. **Archive** - Move to archived status

### Deprecation Record

```yaml
deprecation:
  knowledge_id: string
  deprecated_at: datetime
  reason: string
  superseded_by: string    # ID of replacement (if any)
  authority: string        # Human approver
  warnings:
    - "Do not use for new work"
    - "Migrate to {replacement_id}"
```

---

## AI Consumption Rules

### What AI Must Do

| Rule | Description |
|------|-------------|
| **Consult First** | Check Knowledge Layer before reasoning |
| **Cite Knowledge** | Reference specific knowledge items |
| **Respect Scope** | Apply knowledge within defined boundaries |
| **Mark Gaps** | Identify when no knowledge exists |
| **Distinguish** | Mark inference vs. knowledge vs. hypothesis |

### What AI Must Not Do

| Rule | Description |
|------|-------------|
| **Contradict** | Override knowledge without evidence |
| **Extrapolate** | Extend beyond scope without validation |
| **Assume** | Assume knowledge exists when it doesn't |
| **Self-Approve** | Approve own submissions |
| **Self-Promote** | Promote without human authorization |

---

## Anti-Patterns

### Invalid Promotion

| Anti-Pattern | Why Invalid |
|--------------|-------------|
| AI self-approval | Violates No Self-Approval principle |
| No evidence | Violates evidence requirement |
| Unverified claims | Evidence not verified |
| Scope creep | Definition exceeds knowledge |
| Contradictory | Conflicts with existing knowledge |

### Invalid Consumption

| Anti-Pattern | Why Invalid |
|--------------|-------------|
| Ignoring knowledge | Fails to consult layer first |
| Overriding without evidence | Violates evidence requirement |
| Extending scope | Violates scope boundaries |
| Claiming confidence without knowledge | Assumes coverage |

---

## Exceptions

### Emergency Promotion

In exceptional circumstances, expedited promotion MAY occur:

| Condition | Requirement |
|-----------|-------------|
| Critical safety | Immediate human authorization |
| Time-sensitive | Documented justification |
| Temporary | Marked as provisional |

**Process**:
1. Document emergency justification
2. Obtain immediate human authorization
3. Mark as provisional
4. Complete full process within 30 days

### Provisional Knowledge

Knowledge MAY be promoted provisionally:

| Condition | Requirement |
|-----------|-------------|
| Partial evidence | Full evidence within 30 days |
| Pending verification | Complete verification within 60 days |
| Experimental | Mark as experimental |

---

## Audit Trail

All promotions MUST be logged:

| Field | Description |
|-------|-------------|
| `knowledge_id` | Unique identifier |
| `action` | Submitted/Reviewed/Approved/Promoted |
| `actor` | Who performed action |
| `authority` | Who authorized (if required) |
| `timestamp` | When action occurred |
| `evidence` | Evidence references |
| `notes` | Additional context |

---

**Document Status**: FOUNDATIONAL
**Authority**: Human
**Immutability**: This document defines immutable promotion rules. Principles cannot be changed.
**Related**: WHAT-IS-KNOWLEDGE.md, KNOWLEDGE-LIFECYCLE.md, KNOWLEDGE-TYPES.md
