# Question Tracker

## Research Questions

### Tier 1: Foundational Questions
*(No dependencies - start here)*

| # | Question | Status | Notes |
|---|----------|--------|-------|
| 1 | What is Knowledge? | 🔴 Pending | |
| 2 | What is Evidence? | 🔴 Pending | |
| 3 | What is Ambiguity? | 🔴 Pending | |

### Tier 2: Relational Questions
*(Depend on Tier 1)*

| # | Question | Status | Dependencies | Notes |
|---|----------|--------|--------------|-------|
| 4 | What is Context? | 🔴 Pending | Questions 1, 2 | |
| 5 | What is Authority? | 🔴 Pending | Questions 1, 2, 4 | |

### Tier 3: Engineering Questions
*(Depend on Tiers 1-2)*

| # | Question | Status | Dependencies | Notes |
|---|----------|--------|--------------|-------|
| 6 | What is Engineering? | 🔴 Pending | Questions 1, 2, 3, 5 | |
| 7 | What is an Engineering Subject? | 🔴 Pending | Questions 6, 4 | |
| 8 | What is a Methodology? | 🔴 Pending | Questions 1, 2, 5, 4 | |

### Tier 4: Process Questions
*(Depend on Tiers 1-3)*

| # | Question | Status | Dependencies | Notes |
|---|----------|--------|--------------|-------|
| 9 | How does knowledge become validated? | 🔴 Pending | Questions 2, 5, 8 | |
| 10 | How should knowledge evolve? | 🔴 Pending | All above | |

## Status Legend

- 🔴 **Pending**: Not yet researched
- 🟡 **In Progress**: Currently being researched
- 🟢 **Working Definition**: Definition drafted, awaiting validation
- ✅ **Validated**: Definition validated and promoted to Glossary

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

## How to Update This File

When you start researching a question:
1. Change status from 🔴 Pending to 🟡 In Progress
2. Add your name and start date in Notes
3. Create a research log in `/research/logs/`

When a question is resolved:
1. Update status appropriately
2. Link to the working definition in Notes
3. If validated, link to the Glossary entry
