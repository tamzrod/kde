# Question Tracker

Each question is investigated in a single document under `/research/`. See the individual question files for details.

## Research Questions

### Tier 1: Foundational Questions
*(No dependencies - start here)*

| # | Question | File | Status |
|---|----------|------|--------|
| 1 | What is Knowledge? | [001-what-is-knowledge.md](./001-what-is-knowledge.md) | 🔴 Pending |
| 2 | What is Evidence? | [002-what-is-evidence.md](./002-what-is-evidence.md) | 🔴 Pending |
| 3 | What is Ambiguity? | [003-what-is-ambiguity.md](./003-what-is-ambiguity.md) | 🔴 Pending |

### Tier 2: Relational Questions
*(Depend on Tier 1)*

| # | Question | File | Status |
|---|----------|------|--------|
| 4 | What is Context? | [004-what-is-context.md](./004-what-is-context.md) | 🔴 Pending |
| 5 | What is Authority? | [005-what-is-authority.md](./005-what-is-authority.md) | 🔴 Pending |

### Tier 3: Engineering Questions
*(Depend on Tiers 1-2)*

| # | Question | File | Status |
|---|----------|------|--------|
| 6 | What is Engineering? | [006-what-is-engineering.md](./006-what-is-engineering.md) | 🔴 Pending |
| 7 | What is an Engineering Subject? | [007-what-is-an-engineering-subject.md](./007-what-is-an-engineering-subject.md) | 🔴 Pending |
| 8 | What is a Methodology? | [008-what-is-a-methodology.md](./008-what-is-a-methodology.md) | 🔴 Pending |

### Tier 4: Process Questions
*(Depend on Tiers 1-3)*

| # | Question | File | Status |
|---|----------|------|--------|
| 9 | How does knowledge become validated? | [009-how-does-knowledge-become-validated.md](./009-how-does-knowledge-become-validated.md) | 🔴 Pending |
| 10 | How should knowledge evolve? | [010-how-should-knowledge-evolve.md](./010-how-should-knowledge-evolve.md) | 🔴 Pending |

## Status Legend

- 🔴 **Pending**: Not yet researched
- 🟡 **In Progress**: Currently being researched
- 🟢 **Working Definition**: Definition drafted, awaiting validation
- ✅ **Validated**: Definition validated and promoted to Knowledge

## Question Dependency Map

```
Tier 1 (Foundational)
    │
    ├── 1. What is Knowledge?
    │       → Without this, we cannot define methodology
    │
    ├── 2. What is Evidence?
    │       → Without this, we cannot validate knowledge
    │
    └── 3. What is Ambiguity?
            → Without this, we cannot define what engineering reduces

Tier 2 (Relational)
    │
    ├── 4. What is Context?
    │       → Depends on: 1, 2
    │       → Without this, we cannot apply knowledge consistently
    │
    └── 5. What is Authority?
            → Depends on: 1, 2, 4
            → Without this, we cannot govern knowledge

Tier 3 (Engineering)
    │
    ├── 6. What is Engineering?
    │       → Depends on: 3, 2, 5
    │       → Without this, we cannot define what KDE does
    │
    ├── 7. What is an Engineering Subject?
    │       → Depends on: 6, 4
    │       → Without this, we cannot define what KDE acts upon
    │
    └── 8. What is a Methodology?
            → Depends on: 1, 2, 5, 4
            → Without this, we cannot define KDE itself

Tier 4 (Process)
    │
    ├── 9. How does knowledge become validated?
    │       → Depends on: 2, 5, 8
    │       → This enables KDE to grow
    │
    └── 10. How should knowledge evolve?
            → Depends on: All above
            → This enables KDE to adapt
```

## How to Update Questions

When investigating a question, edit the corresponding file in this directory:

1. Change status from 🔴 Pending to 🟡 In Progress
2. Document your Current Understanding
3. Add Evidence supporting your analysis
4. Add Counter Evidence that complicates the picture
5. Draft a Working Definition
6. Note any Open Questions that emerged

When a question is resolved:
1. Update status to 🟢 Working Definition or ✅ Validated
2. If validated, promote the concept to `/knowledge/`
