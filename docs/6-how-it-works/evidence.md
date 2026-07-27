# Evidence

**Purpose**: KDE's evidence standards and practices
**Audience**: All readers

---

## Overview

Evidence is the foundation of KDE. Every claim must be supported by evidence. Every piece of evidence must be clearly identified.

---

## Evidence Types

KDE distinguishes three types of claims:

| Type | Definition | Example |
|------|------------|---------|
| **Evidence** | Directly observable or documented facts | "According to Source X..." |
| **Inference** | Conclusions logically derived from evidence | "This suggests that..." |
| **Hypothesis** | Speculation beyond current evidence | "It may be that..." |

---

## Evidence Marking

### In Text

Use clear markers:

```
[Evidence] Source X states that Y is true.
[Inference] This suggests that Z follows.
[Hypothesis] It may be that W explains Y.
```

### In Documents

Include evidence sections:

```markdown
## Evidence

### Evidence 1
[Evidence] Quote or summary from source

### Evidence 2
[Evidence] Quote or summary from source

## Analysis

[Inference] Based on evidence 1 and 2...
```

---

## Evidence Standards

### Source Quality

| Quality | Description |
|---------|-------------|
| **Primary** | Original documents, direct observations |
| **Secondary** | Analysis of primary sources |
| **Tertiary** | Compilation of sources |

Prefer primary sources when available.

### Citation Format

For every piece of evidence:

```markdown
> **Source**: [Document name](link or reference)
> **Type**: [Primary/Secondary/Tertiary]
> **Relevance**: [Why this evidence matters]
> **Evidence**: [Quote or summary]
```

### Completeness

Evidence must include:

| Element | Description |
|---------|-------------|
| **Origin** | Where evidence came from |
| **Content** | What evidence says |
| **Relevance** | Why evidence matters |
| **Verification** | How to check evidence |

---

## Bootstrap Gates as Evidence

Bootstrap gates verify system state:

| Gate | Evidence Type | What it Shows |
|------|---------------|----------------|
| **B1** | Configuration | Runtime ready |
| **B2** | History | No violations |
| **B3** | Environment | Dependencies available |

---

## Inference Standards

Inferences must:

| Requirement | Description |
|-------------|-------------|
| **Traceable** | Link to supporting evidence |
| **Logical** | Follow from evidence |
| **Acknowledged** | Clearly marked as inference |
| **Testable** | Can be validated |

### Inference Markers

```
[Inference] This suggests that...
[Inference] Therefore...
[Inference] This implies...
```

---

## Hypothesis Standards

Hypotheses must:

| Requirement | Description |
|-------------|-------------|
| **Labeled** | Clearly marked as hypothesis |
| **Testable** | Can be validated |
| **Scoped** | Limited to evidence |
| **Temporary** | Subject to revision |

### Hypothesis Markers

```
[Hypothesis] It may be that...
[Hypothesis] Perhaps...
[Hypothesis] This might explain...
```

---

## Evidence Collection

### Collection Process

```
1. Identify claim to support
2. Search for relevant sources
3. Evaluate source quality
4. Extract relevant evidence
5. Cite source properly
6. Assess sufficiency
7. Document gaps
```

### Evaluation Checklist

| Check | Question |
|-------|----------|
| Relevance | Does evidence support claim? |
| Credibility | Is source trustworthy? |
| Sufficiency | Is there enough evidence? |
| Consistency | Does evidence align with other evidence? |
| Freshness | Is source current enough? |

---

## Common Errors

### Error 1: Claim Without Evidence

❌ **Wrong**: "X is true."
✅ **Right**: "[Evidence] According to Source Y, X is true."

### Error 2: Inference Without Traceability

❌ **Wrong**: "This proves X."
✅ **Right**: "[Inference] Evidence 1 and 2 suggest X."

### Error 3: Hypothesis as Fact

❌ **Wrong**: "X is definitely Y."
✅ **Right**: "[Hypothesis] X may be Y."

### Error 4: Unmarked Speculation

❌ **Wrong**: "Probably X means Y."
✅ **Right**: "[Inference] X likely means Y based on..."

---

## Evidence Preservation

Evidence must be:

| Requirement | Description |
|-------------|-------------|
| **Accessible** | Can be retrieved later |
| **Verifiable** | Can be checked |
| **Complete** | Includes all needed context |
| **Organized** | Stored logically |

---

## See Also

- [Processes](processes.md) - Investigation workflow
- [Philosophy](../2-foundations/philosophy.md) - Core principles
- [Laboratory](../5-core-concepts/laboratory.md) - Investigation workspace
