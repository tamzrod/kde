# KDE Research Methodology

**Version**: v1.0
**Effective**: 2026-07-19

## Overview

This methodology defines how KDE research questions are investigated. It establishes a clear lifecycle, mandatory review gates, and explicit state transitions.

## Document Header

Every research document should include:

```markdown
**Session**: RS-XXX
**Question**: [Question text]
**Stage**: [Current stage]
**State**: [Document state]
**Methodology Version**: v1.0
```

## Research Lifecycle

Each research session follows this lifecycle:

```
QUESTION
    │
    ├── What question are we investigating?
    │
    ▼
LITERATURE REVIEW
    │
    ├── Gather existing knowledge
    ├── Examine evidence from multiple disciplines
    └── Look for counter-examples
    │
    ▼
EVIDENCE COLLECTION
    │
    ├── What evidence supports or contradicts?
    ├── Is evidence sufficient?
    └── Are there conflicting sources?
    │
    ▼
ANALYSIS
    │
    ├── Transform evidence into insight
    ├── What is common across disciplines?
    ├── What conflicts?
    └── What is fundamental?
    │
    ▼
SYNTHESIS
    │
    ├── What should KDE adopt?
    ├── What should KDE reject?
    ├── What should remain open?
    └── What is essential for engineering?
    │
    ▼
WORKING DEFINITION
    │
    ├── Draft ONE definition based on synthesis
    ├── It must be engineering-oriented
    ├── It must be practical, not universal
    └── Mark as "WORKING DEFINITION"
    │
    ▼
SUBMIT FOR REVIEW
    │
    └── Human review required before continuation
```

## Stage Progress Table

Every research document includes this table:

```markdown
## Status

Question                  ✅
Literature Review         ✅
Evidence Collection       ✅
Analysis                 ✅
Synthesis                ✅
Working Definition        ✅
Validation               ⏳
Knowledge Promotion      ⏳
```

**Symbols**: ✅ Complete | 🔄 In Progress | ⏳ Pending

## Research Session Format

Each research session produces a document with these sections:

1. **Header** — Question, status tracker, dependencies
2. **Literature Review** — Disciplines analyzed with definitions, key concepts, assumptions, strengths, limitations, relevance
3. **Evidence Collection** — Evidence items with source citations
4. **Analysis** — Common characteristics, unique characteristics, conflicting assumptions, fundamental concepts
5. **Synthesis** — What KDE should adopt, reject, leave unresolved, essential concepts, concepts outside scope
6. **Working Definition** — ONE candidate definition with rationale
7. **Validation Plan** — How the definition will be tested
8. **Knowledge Promotion** — Status and reason if not promoted

## Validation

After working definition, validation tests the definition against criteria:

1. **Classification Test** — Can it classify engineering cases?
2. **Distinction Test** — Can it distinguish from related concepts?
3. **Methodology Support Test** — Does it support later methodology?
4. **Consistency Test** — Does it remain consistent across sessions?
5. **Counterexample Test** — Can it survive counterexamples?

## Knowledge Promotion

Upon successful validation:

```
VALIDATION PASSED → HUMAN APPROVAL → PROMOTED TO /knowledge/
```

If promotion is not ready:
- Document the reason
- State what is needed before promotion

## Session Numbering

Sessions are numbered sequentially: RS-001, RS-002, RS-003, etc.

This number should appear in the document header.
