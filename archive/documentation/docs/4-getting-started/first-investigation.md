# First Investigation

---

## The Simple Idea

Running an investigation is like flying a plane. You don't just take off—you check systems, verify readiness, and follow a checklist.

KDE's commands are this checklist. Each one verifies something before you proceed.

---

## Real-World Observation

A pilot doesn't guess whether the engines are ready. They check. They don't assume the fuel is full. They verify. The pre-flight check isn't optional—it's how you know you're ready.

KDE's investigation workflow is the same. Before each step, you verify.

---

## The Investigation Flow

Every KDE investigation follows this structure:

```
PROPOSED → APPROVED → IN_PROGRESS → REVIEW → COMPLETE
```

Think of it as: "Can we do this?" → "Yes, proceed." → "Do it." → "Did you do it right?" → "Done."

---

## Step 1: Start the Engine

```
start engine
```

This initializes everything: engine, seeds, runtime, policies.

---

## Step 2: Pre-Flight Check

```
pre-flight check
```

Verifies five things:

1. **Initialization** — Runtime ready
2. **Engine Registry** — Engines available
3. **Seed Registry** — Seeds loaded
4. **Policy Layer** — Rules active
5. **System Health** — All systems go

---

## Step 3: Confirm Mission Ready

```
mission ready
```

System confirms you're ready to investigate.

---

## Step 4: Define Your Investigation

A complete investigation looks like this:

```markdown
# [Title]

**Investigation ID**: INV-XXX
**Date**: YYYY-MM-DD
**Engine**: KDE-ENGINE-XXX
**Seed**: SEED-XXX

## Objective
What are you investigating?

## Scope
What does this cover?

## Evidence
What did you find?

## Conclusions
What can you conclude?

## Next Steps
What should happen next?
```

---

## Step 5: Document Evidence

Mark everything clearly:

| Type | Meaning | Example |
|------|---------|---------|
| **Evidence** | Verified fact | "Source X states Y" |
| **Inference** | Derived from facts | "This suggests Z" |
| **Hypothesis** | Beyond evidence | "It may be that..." |

Always mark evidence type.

---

## Step 6: Human Approval

KDE requires human approval at key points:

- Proposed → Approved
- In Progress → Review
- Reviewed → Complete

This isn't bureaucracy. It's independence. The investigator doesn't approve their own work.

---

## Investigation States

| State | Meaning |
|-------|---------|
| PROPOSED | Awaiting approval |
| APPROVED | Authorized to proceed |
| IN_PROGRESS | Active work |
| REVIEW | Awaiting human review |
| COMPLETE | Investigation finished |

---

## Common Patterns

### Research Investigation
1. Define question
2. Gather evidence
3. Analyze patterns
4. Draw conclusions
5. Document limitations

### System Investigation
1. Define boundaries
2. Map components
3. Identify relationships
4. Analyze behavior
5. Document findings

### Process Investigation
1. Define process
2. Identify inputs/outputs
3. Map steps
4. Find bottlenecks
5. Recommend improvements

---

## What Comes Next

You've seen how KDE runs an investigation. Next, learn what makes it work.

**[Core Concepts](../5-core-concepts/engines-and-seeds.md)** — The components that enable investigations
