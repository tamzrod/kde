# KDE Concepts Explained

**Understanding the core ideas behind the Knowledge Discovery Engine**

---

## What is KDE? (Detailed)

KDE is a system that helps humans discover and validate knowledge using AI assistants.

The key insight: **AI can help research, but humans must stay in control.**

---

## Core Concepts

### 1. The Laboratory

The **Laboratory** is where research happens.

Think of it like a scientific lab:
- Scientists (humans) ask questions
- Lab assistants (AI) do the investigation
- Results are recorded and reviewed
- Valid knowledge is published

The Laboratory contains:
- **Questions** to investigate
- **Investigations** (research projects)
- **Experiments** (specific tests)
- **Evidence** (findings)

### 2. Engines

An **Engine** is a methodology for how the AI should work.

Think of it like different research methods:
- Some methods focus on patterns
- Some focus on causes
- Some focus on context

Each Engine defines:
- How the AI investigates
- What counts as evidence
- How conclusions are drawn

**Current Engines:**
- **Beta**: Context-aware investigation
- **Gamma**: Causal analysis
- **Delta**: Reproducible research

### 3. Seeds

A **Seed** is a starting point for reasoning.

Think of it like principles or axioms:
- Seeds provide the foundation
- All investigation builds from seeds
- Seeds are immutable (don't change)

**Current Seeds:**
- **Genesis**: The five human oversight rules
- **Evolution**: How knowledge grows
- **Bootstrap**: How to start a research session

### 4. Knowledge

**Knowledge** in KDE is validated, evidence-backed understanding.

Knowledge has a lifecycle:

```
┌─────────┐    Investigate    ┌───────────┐    Validate    ┌──────────┐
│  DRAFT  │ ───────────────→ │ VALIDATED │ ─────────────→ │ PROMOTED │
└─────────┘                  └───────────┘                └──────────┘
     ↑                              ↑                           ↑
  Written by AI               Reviewed by human          Approved by human
```

| Stage | Who Decides | Meaning |
|-------|-------------|---------|
| Draft | AI | Initial findings |
| Validated | Human | Evidence reviewed |
| Promoted | Human | Now "official" knowledge |

### 5. Governance

**Governance** is the system of rules that keeps KDE working correctly.

Governance ensures:
- Humans stay in control
- AI follows the rules
- Knowledge is valid
- Process is transparent

Key governance documents:
- **Who can approve what**
- **What counts as evidence**
- **How to resolve conflicts**

---

## The Research Workflow

Here's how KDE research works:

### Step 1: A Question is Asked

A human asks a question or identifies a knowledge gap.

**Example**: "What are the best practices for API authentication?"

### Step 2: An Investigation Begins

An investigation is created and assigned to an AI.

The AI:
1. Defines the scope
2. Gathers evidence
3. Analyzes findings
4. Documents results

### Step 3: Evidence is Collected

The AI documents sources for every claim:

| Claim | Evidence | Source |
|-------|----------|--------|
| "OAuth 2.0 is industry standard" | Survey of 500 companies | API Report 2024 |
| "JWT tokens need rotation" | Security guidelines | OWASP Blog |

### Step 4: Human Reviews

A human reviews the investigation:
- Is the evidence valid?
- Are conclusions reasonable?
- Is anything missing?

### Step 5: Knowledge is Promoted

If approved, the knowledge moves from "Validated" to "Promoted" (official).

---

## Roles in KDE

### Human Roles

| Role | Responsibility |
|------|----------------|
| **Questioner** | Asks questions, identifies gaps |
| **Reviewer** | Reviews AI work, validates evidence |
| **Approver** | Approves knowledge promotion |
| **Governance** | Sets rules and policies |

### AI Role

| Role | Responsibility |
|------|----------------|
| **Investigator** | Gathers evidence, analyzes data, documents findings |

AI does NOT:
- Approve its own work
- Promote knowledge
- Make unilateral decisions
- Ignore human instructions

---

## Key Principles

### Principle 1: Humans Decide

Every significant decision requires human input:
- ❌ AI cannot approve its own work
- ❌ AI cannot make knowledge "official"
- ❌ AI cannot change the rules

### Principle 2: Evidence Matters

Every claim needs evidence:
- ❌ "X is true because I think so"
- ✅ "X is true because Y study shows..."

### Principle 3: Process is Transparent

The methodology is open:
- Anyone can see how conclusions were reached
- Evidence is documented
- Rationale is clear

---

## Common Questions

### "Why not just let AI do the research?"

AI is powerful but can make mistakes or "hallucinate." KDE adds human oversight to ensure:
- Accuracy
- Accountability
- Trust

### "What's the difference from normal research?"

Normal research has these steps too. KDE adds:
- Explicit AI/human role separation
- Formal evidence requirements
- Structured approval process

### "Can AI work without KDE?"

Yes, but KDE provides:
- Consistency
- Accountability
- Quality assurance

---

## Next Steps

- [Quick Start Guide](./quick-start.md) - Get started in 5 minutes
- [Terminology Glossary](./terminology.md) - Look up terms
- [Contributing Guide](../guides/contributing.md) - How to participate

---

**Last Updated**: 2026-07-26
