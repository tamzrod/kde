# Contributing to KDE Research

## Research Workflow

All research is conducted within the Laboratory following this workflow:

```
QUESTION → INVESTIGATION → EVIDENCE → WORKING DEFINITION → VALIDATION → KNOWLEDGE
```

### 1. Pick a Question

Choose a question from the [Laboratory Question Tracker](./laboratory/questions/README.md) that is:
- Not blocked by dependencies
- Not already being researched

### 2. Investigate

- Open the corresponding file in `/laboratory/questions/investigations/`
- Gather existing knowledge on the topic
- Examine evidence from multiple sources
- Look for counter-examples

### 3. Document Evidence

- Add Evidence to the question file with source citations
- Place raw evidence in `/laboratory/evidence/` if needed
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

When validated, the concept is promoted to `/knowledge/`

## Quality Standards

- All claims must be backed by evidence
- Cite sources using standard format
- Acknowledge uncertainty explicitly
- Document counter-evidence
- Do not assume - document instead

## Workflow Diagram

The Laboratory owns the complete scientific workflow:

```
QUESTION → INVESTIGATION → EVIDENCE → EXPERIMENT → CONCLUSION → KNOWLEDGE
                    │                                      │
                    ▼                                      ▼
               LABORATORY                           VALIDATION
```

## What We Don't Do

- We don't deploy without experimentation
- We don't design systems without validated knowledge
- We don't speculate without evidence
- We don't rush to conclusions
