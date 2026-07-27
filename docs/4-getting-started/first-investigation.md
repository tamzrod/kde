# First Investigation

**Purpose**: Run your first KDE investigation
**Audience**: New users

---

## Overview

This guide walks through running a complete KDE investigation.

---

## Step 1: Start the Engine

Every session begins with:

```
start engine
```

This initializes:
- Engine selection
- Seed loading
- Runtime configuration
- Policy verification

---

## Step 2: Run Pre-Flight Check

Verify system readiness:

```
pre-flight check
```

Review the five checks:
1. **Initialization** - Runtime ready
2. **Engine Registry** - Engines available
3. **Seed Registry** - Seeds loaded
4. **Policy Layer** - Rules active
5. **System Health** - All checks pass

---

## Step 3: Verify Mission Ready

Confirm operational status:

```
mission ready
```

Expected: System confirms readiness for investigation.

---

## Step 4: Define Your Investigation

A KDE investigation follows this structure:

```
PROPOSED → APPROVED → IN_PROGRESS → REVIEW → COMPLETE
```

### Investigation Template

```markdown
# [Title]

**Investigation ID**: INV-XXX
**Date**: YYYY-MM-DD
**Engine**: KDE-ENGINE-XXX
**Seed**: SEED-XXX

---

## Objective

What are you investigating?

## Scope

What does this cover?

## Methodology

How will you investigate?

## Evidence

What did you find?

## Conclusions

What can you conclude?

## Next Steps

What should happen next?
```

---

## Step 5: Document Evidence

Evidence must be:

| Type | Description | Example |
|------|-------------|---------|
| **Fact** | Directly observable | "Source X states Y" |
| **Inference** | Derived from facts | "This suggests Z" |
| **Hypothesis** | Beyond current evidence | "It may be that..." |

Always mark evidence type clearly.

---

## Step 6: Submit for Review

When investigation is complete:

1. Document all evidence
2. Distinguish fact from inference
3. Acknowledge limitations
4. Submit for human review

---

## Step 7: Await Human Approval

KDE requires human approval at key points:

- Investigation proposed
- Investigation approved
- Conclusions accepted
- Knowledge promoted

---

## Understanding Output

### Investigation Status

| Status | Meaning |
|--------|---------|
| PROPOSED | Awaiting approval |
| APPROVED | Authorized to proceed |
| IN_PROGRESS | Active investigation |
| REVIEW | Awaiting human review |
| COMPLETE | Investigation finished |

### Evidence Marking

| Marking | Meaning |
|---------|---------|
| **[EVIDENCE]** | Verified fact |
| **[INFERENCE]** | Conclusion from facts |
| **[HYPOTHESIS]** | Speculation |

---

## Common Patterns

### Pattern 1: Research Investigation

```
1. Define question
2. Gather evidence
3. Analyze patterns
4. Draw conclusions
5. Document limitations
```

### Pattern 2: System Investigation

```
1. Define system boundaries
2. Map components
3. Identify relationships
4. Analyze behavior
5. Document findings
```

### Pattern 3: Process Investigation

```
1. Define process
2. Identify inputs/outputs
3. Map steps
4. Find bottlenecks
5. Recommend improvements
```

---

## Next Steps

After your first investigation:

- Review [Core Concepts](../5-core-concepts/engines-and-seeds.md)
- Study [How It Works](../6-how-it-works/processes.md)
- Explore [Guides](../7-guides/guides.md)

---

## See Also

- [Getting Started](index.md) - Setup guide
- [Next Steps](next-steps.md) - Where to go from here
- [Processes](../6-how-it-works/processes.md) - Investigation workflow
