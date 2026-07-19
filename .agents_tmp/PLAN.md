# KDE Research Roadmap

## 1. OBJECTIVE

Create a research roadmap that answers:

**"What must we understand before we can define Knowledge-Driven Engineering?"**

This roadmap is for discovery, not design. We do not know what KDE will become. This roadmap helps us find out.

---

## 2. RESEARCH QUESTIONS

### Tier 1: Foundational Questions
*(No dependencies - start here)*

1. **What is Knowledge?**
2. **What is Evidence?**
3. **What is Ambiguity?**

### Tier 2: Relational Questions
*(Depend on Tier 1)*

4. **What is Context?**
5. **What is Authority?**

### Tier 3: Engineering Questions
*(Depend on Tiers 1-2)*

6. **What is Engineering?**
7. **What is an Engineering Subject?**
8. **What is a Methodology?**

### Tier 4: Process Questions
*(Depend on Tiers 1-3)*

9. **How does knowledge become validated?**
10. **How should knowledge evolve?**

---

## 3. QUESTION DEPENDENCIES

```
Tier 1 (Foundational)
    │
    ├── What is Knowledge?
    │       ↓
    │   Without this, we cannot define methodology
    │
    ├── What is Evidence?
    │       ↓
    │   Without this, we cannot validate knowledge
    │
    └── What is Ambiguity?
            ↓
        Without this, we cannot define what engineering reduces

Tier 2 (Relational)
    │
    ├── What is Context?
    │       ↓
    │   Depends on: Knowledge, Evidence
    │   Without this, we cannot apply knowledge consistently
    │
    └── What is Authority?
            ↓
        Depends on: Knowledge, Evidence, Context
        Without this, we cannot govern knowledge

Tier 3 (Engineering)
    │
    ├── What is Engineering?
    │       ↓
    │   Depends on: Ambiguity, Evidence, Authority
    │   Without this, we cannot define what KDE does
    │
    ├── What is an Engineering Subject?
    │       ↓
    │   Depends on: Engineering, Context
    │   Without this, we cannot define what KDE acts upon
    │
    └── What is a Methodology?
            ↓
        Depends on: Knowledge, Evidence, Authority, Context
        Without this, we cannot define KDE itself

Tier 4 (Process)
    │
    ├── How does knowledge become validated?
    │       ↓
    │   Depends on: Evidence, Authority, Methodology
    │   This enables KDE to grow
    │
    └── How should knowledge evolve?
            ↓
        Depends on: All above
        This enables KDE to adapt
```

---

## 4. INITIAL DOCUMENTATION

Only documents needed to support research:

| Document | Purpose |
|----------|---------|
| **Research Log** | Record findings from each research question |
| **Question Tracker** | Track which questions are answered, pending, or blocked |
| **Evidence Repository** | Store evidence collected during research |
| **Glossary** | Capture definitions as we discover them |

---

## 5. MINIMAL REPOSITORY STRUCTURE

```
/kde/
├── /research/           # Research artifacts
│   ├── /logs/          # Research logs by question
│   ├── /evidence/      # Collected evidence
│   └── /questions/     # Question tracking
├── /glossary/          # Emerging definitions
├── /meetings/          # Meeting notes (if needed)
├── README.md           # Project overview
└── CONTRIBUTING.md      # How to contribute to research
```

**Rationale:**
- No `/src/`, `/docs/`, `/implementation/` - these come later
- Structure mirrors the research workflow
- Everything lives under `/research/` until concepts are validated

---

## 6. RESEARCH WORKFLOW

```
QUESTION
    │
    ├── What question are we investigating?
    │
    ▼
RESEARCH
    │
    ├── Gather existing knowledge
    ├── Examine evidence
    └── Look for counter-examples
    │
    ▼
EVIDENCE
    │
    ├── What evidence supports or contradicts?
    ├── Is evidence sufficient?
    └── Are there conflicting sources?
    │
    ▼
WORKING DEFINITION
    │
    ├── Draft a definition based on evidence
    ├── Note uncertainties
    └── Mark as "working" - not yet validated
    │
    ▼
VALIDATION
    │
    ├── Peer review
    ├── Counter-example testing
    └── Consensus check
    │
    ▼
PROMOTION
    │
    ├── If validated: Move to Glossary as "defined"
    └── If not: Return to Research with new questions
```

### Why Each Stage Exists

**Question**
- Focuses research on specific unknowns
- Prevents unfocused investigation

**Research**
- Gathers existing knowledge before creating new definitions
- Prevents reinvention
- Identifies what others have already discovered

**Evidence**
- Distinguishes opinion from fact
- Requires claims to be backed by sources
- Enables verification

**Working Definition**
- Captures current understanding
- Makes assumptions explicit
- Allows progress while acknowledging uncertainty

**Validation**
- Tests definitions against real cases
- Finds weaknesses before promotion
- Ensures quality before commitment

**Promotion**
- Advances validated concepts
- Maintains clarity about what is "official"
- Prevents premature methodology formation

---

## 7. PROJECT MILESTONES

These represent increasing understanding, not software releases.

```
MILESTONE 1: Research Foundation
│
├── Research Tier 1 questions (Knowledge, Evidence, Ambiguity)
├── Complete research logs for each
└── Produce working definitions

        ▼

MILESTONE 2: Relational Framework
│
├── Research Tier 2 questions (Context, Authority)
├── Integrate with Tier 1 findings
└── Identify gaps in foundation

        ▼

MILESTONE 3: Engineering Definition
│
├── Research Tier 3 questions (Engineering, Subject, Methodology)
├── Attempt to define KDE's scope
└── Validate against real engineering examples

        ▼

MILESTONE 4: Process Model
│
├── Research Tier 4 questions (Validation, Evolution)
├── Define how KDE should develop
└── Identify remaining unknowns

        ▼

MILESTONE 5: KDE Discovery
│
├── Synthesize all research
├── Define what KDE actually is
├── If possible: Draft methodology outline
└── If not ready: Document what is still unknown
```

---

## 8. SIMPLICITY PRINCIPLES

- **Do not speculate** - If we don't know, say so
- **Do not over-engineer** - Simple structure, simple process
- **Do not assume** - Every concept must be researched, not assumed
- **Do not rush** - Understanding takes time
- **Document the unknown** - Future research is a valid output

---

## 9. SUMMARY

This roadmap helps us discover KDE by:

1. Asking the right questions in the right order
2. Basing definitions on evidence, not assumption
3. Keeping structure minimal until structure is needed
4. Moving from questions to validated definitions
5. Acknowledging what we don't know

The goal is not to design KDE. The goal is to find out what KDE should be.
