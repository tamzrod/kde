# Question Tracker

Questions are investigated as part of the Laboratory's scientific workflow. Each question is investigated in its own directory under `./investigations/`. See the individual investigation folders for details.

## Research Questions

### Tier 1: Foundational Questions
*(No dependencies - start here)*

| # | Question | Investigation | Status |
|---|----------|--------------|--------|
| 1 | What is Knowledge? | [INV-001/](./investigations/INV-001/) | 🔴 Pending |
| 2 | What is Evidence? | [INV-002/](./investigations/INV-002/) | 🔴 Pending |
| 3 | What is Ambiguity? | [INV-003/](./investigations/INV-003/) | 🔴 Pending |

### Tier 2: Relational Questions
*(Depend on Tier 1)*

| # | Question | Investigation | Status |
|---|----------|--------------|--------|
| 4 | What is Context? | [INV-004/](./investigations/INV-004/) | 🔴 Pending |
| 5 | What is Authority? | [INV-005/](./investigations/INV-005/) | 🔴 Pending |

### Tier 3: Engineering Questions
*(Depend on Tiers 1-2)*

| # | Question | Investigation | Status |
|---|----------|--------------|--------|
| 6 | What is Engineering? | [INV-006/](./investigations/INV-006/) | 🔴 Pending |
| 7 | What is an Engineering Subject? | [INV-007/](./investigations/INV-007/) | 🔴 Pending |
| 8 | What is a Methodology? | [INV-008/](./investigations/INV-008/) | 🔴 Pending |

### Tier 4: Process Questions
*(Depend on Tiers 1-3)*

| # | Question | Investigation | Status |
|---|----------|--------------|--------|
| 9 | How does knowledge become validated? | [INV-009/](./investigations/INV-009/) | 🔴 Pending |
| 10 | How should knowledge evolve? | [INV-010/](./investigations/INV-010/) | 🔴 Pending |

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

When investigating a question, edit the corresponding investigation folder:

1. Change status from 🔴 Pending to 🟡 In Progress
2. Document your Current Understanding in `question.md`
3. Add Evidence supporting your analysis in `evidence/`
4. Add Counter Evidence that complicates the picture
5. Draft a Working Definition
6. Note any Open Questions that emerged
7. Run experiments in `experiments/`
8. Document analysis and conclusions

When a question is resolved:
1. Update status to 🟢 Working Definition or ✅ Validated
2. If validated, promote the concept to `/knowledge/`
