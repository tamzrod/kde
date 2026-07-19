# Contributing to KDE Research

## Research Workflow

```
QUESTION → INVESTIGATION → EVIDENCE → WORKING DEFINITION → VALIDATION → KNOWLEDGE
```

### 1. Pick a Question

Choose a question from the [Question Tracker](./research/questions/README.md) that is:
- Not blocked by dependencies
- Not already being researched

### 2. Investigate

- Open the corresponding file in `/research/questions/`
- Gather existing knowledge on the topic
- Examine evidence from multiple sources
- Look for counter-examples

### 3. Document Evidence

- Add Evidence to the question file with source citations
- Place raw evidence in `/research/evidence/` if needed
- Name files descriptively: `[source]-[topic]-[date].md`

### 4. Draft Working Definition

- Based on evidence, draft a definition
- Mark as "WORKING" - not yet validated
- Document Counter Evidence that complicates the picture

### 5. Submit for Review

- Open a discussion about your findings
- Request peer review
- Be open to counter-examples

### 6. Promote to Knowledge

When validated, move the concept to `/knowledge/`

## Quality Standards

- All claims must be backed by evidence
- Cite sources using standard format
- Acknowledge uncertainty explicitly
- Document counter-evidence
- Do not assume - document instead

## Workflow Diagram

```
RESEARCH → LABORATORY → DEPLOYMENT
   │           │            │
   │      Experiment    Stable
   │           │            │
   └────► Validate ◄───────┘
              │
              ▼
         Knowledge
```

## What We Don't Do

- We don't deploy without experimentation
- We don't design systems without validated knowledge
- We don't speculate without evidence
- We don't rush to conclusions
