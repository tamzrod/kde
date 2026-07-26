# How Investigations Work

**Understanding the KDE research process**

---

## What is an Investigation?

An **Investigation** is a structured research project to answer a question or fill a knowledge gap.

Think of it like a scientific study:
- Has a clear question
- Follows a methodology
- Produces documented evidence
- Gets reviewed by humans

---

## Investigation Lifecycle

```
┌─────────┐    Create     ┌───────────┐    Conduct    ┌───────────┐
│ PLANNED │ ────────────→ │  ACTIVE   │ ───────────→ │  REVIEW   │
└─────────┘              └───────────┘              └───────────┘
                              ↑                            │
                              │                            ↓
                              │                      ┌───────────┐
                              └──────────────────────│ COMPLETED │
                                                     └───────────┘
```

| Stage | What Happens |
|-------|--------------|
| **Planned** | Question identified, scope defined |
| **Active** | Research conducted, evidence gathered |
| **Review** | Human reviewers check the work |
| **Completed** | Findings documented, knowledge promoted |

---

## The Investigation Process

### Phase 1: Define the Question

**Who**: Questioner (human)

**What**: Clearly state what needs to be known.

**Format**:
```
Question: [What do we need to know?]
Scope: [What does and doesn't count?]
Context: [Why does this matter?]
```

**Example**:
```
Question: What are the best practices for API authentication?
Scope: Focus on REST APIs, exclude GraphQL
Context: Security is critical for our product
```

### Phase 2: Plan the Approach

**Who**: Investigator (AI, with human guidance)

**What**: Define how to answer the question.

**Consider**:
- What evidence is needed?
- Where can we find it?
- What methods should we use?

### Phase 3: Gather Evidence

**Who**: Investigator (AI)

**What**: Collect sources, data, and documentation.

**Evidence Types**:
| Type | Example |
|------|---------|
| **Primary sources** | Original research, official documentation |
| **Secondary sources** | Analysis of primary sources |
| **Data** | Surveys, metrics, statistics |
| **Expert opinion** | Statements from recognized authorities |

**Requirements**:
- Every claim must have a source
- Sources must be credible
- Evidence must be relevant

### Phase 4: Analyze Findings

**Who**: Investigator (AI)

**What**: Draw conclusions from evidence.

**Process**:
1. Review all evidence
2. Identify patterns
3. Address contradictions
4. Form conclusions

**Important**:
- Distinguish evidence from inference
- Acknowledge limitations
- Be transparent about uncertainty

### Phase 5: Document Results

**Who**: Investigator (AI)

**What**: Create a clear record of findings.

**Document should include**:
- Summary of the question
- Methodology used
- Evidence gathered
- Conclusions drawn
- Limitations acknowledged

### Phase 6: Human Review

**Who**: Reviewer (human)

**What**: Check the investigation for quality.

**Review Checklist**:
| Check | Question |
|-------|----------|
| **Completeness** | Does it answer the original question? |
| **Evidence quality** | Are sources credible and relevant? |
| **Logic** | Do conclusions follow from evidence? |
| **Clarity** | Can someone else understand? |
| **Limitations** | Are constraints acknowledged? |

### Phase 7: Promote Knowledge

**Who**: Approver (human with authority)

**What**: Decide if findings become official knowledge.

**Considerations**:
- Is the investigation complete?
- Is evidence sufficient?
- Should this be promoted?

---

## Investigation Structure

Each investigation contains:

```
investigation-name/
├── README.md          # Overview and summary
├── SPEC.md           # Question and scope
├── EVIDENCE.md       # Collected evidence
├── ANALYSIS.md       # Findings and conclusions
├── REVIEW.md         # Human review comments
└── CONCLUSION.md     # Final summary and recommendations
```

---

## Evidence Requirements

### What Counts as Evidence?

✅ **Good evidence**:
- Peer-reviewed research
- Official documentation
- Expert statements with attribution
- Verified data and statistics
- Documented case studies

❌ **Weak evidence**:
- Unverified claims
- Single anecdotes
- Opinion without expertise
- Outdated information
- Unrelated sources

### Evidence Quality Scale

| Quality | Description |
|---------|-------------|
| **High** | Peer-reviewed, verified, current |
| **Medium** | Credible source, some verification |
| **Low** | Anecdotal, unverified, outdated |

---

## Common Investigation Types

### Research Investigation

**Purpose**: Answer a knowledge question

**Example**: "What are best practices for API versioning?"

**Outcome**: Documented findings with evidence

### Gap Analysis Investigation

**Purpose**: Identify what's missing

**Example**: "What security practices are we missing?"

**Outcome**: List of gaps with recommendations

### Comparison Investigation

**Purpose**: Evaluate alternatives

**Example**: "REST vs GraphQL for our use case"

**Outcome**: Analysis with decision criteria

---

## Investigation Tips

### For Questioners

1. **Be specific** - Vague questions get vague answers
2. **Define scope** - What's in and out
3. **Provide context** - Why does it matter?

### For Investigators

1. **Start with sources** - Evidence first
2. **Be systematic** - Follow the process
3. **Acknowledge gaps** - What couldn't be found?
4. **Label inference** - Clearly distinguish from evidence

### For Reviewers

1. **Check sources** - Are they credible?
2. **Verify logic** - Do conclusions follow?
3. **Test completeness** - Is the question answered?
4. **Provide feedback** - Help improve the work

---

## Investigation Examples

### Example 1: Simple Research

**Question**: "What is JWT?"

| Phase | What Happened |
|-------|---------------|
| Define | Question clearly stated |
| Plan | Use documentation and guides |
| Gather | Found RFC, tutorials, articles |
| Analyze | Summarized how JWT works |
| Document | Created explanation with sources |
| Review | Human checked accuracy |
| Promote | Knowledge became official |

### Example 2: Complex Investigation

**Question**: "Which auth method should we use?"

| Phase | What Happened |
|-------|---------------|
| Define | Compared OAuth, JWT, Session |
| Plan | Evaluated each against criteria |
| Gather | Found 10+ sources, surveys, case studies |
| Analyze | Compared pros/cons of each |
| Document | Detailed analysis with recommendations |
| Review | Multiple reviewers checked work |
| Promote | Approved with caveats |

---

## Related Documentation

- [Quick Start Guide](../getting-started/quick-start.md) - KDE overview
- [Concepts](../getting-started/concepts.md) - Core ideas explained
- [Contributing Guide](./contributing.md) - How to participate

---

**Last Updated**: 2026-07-26
