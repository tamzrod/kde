# Formulating Questions

---

## The Simple Idea

Bad questions lead to bad answers. "Why does everything fail?" cannot be answered. "What specific conditions cause system failures?" can be.

This skill teaches you to frame questions that can actually be investigated and answered.

---

## Real-World Observation

A patient says to a doctor: "I don't feel good."

This question is too vague. The doctor cannot help without more information.

Better questions:
- "What symptoms do you experience?"
- "When did they start?"
- "What makes them better or worse?"

These questions are specific. They lead to specific answers.

This is question formulation. The quality of your questions determines the quality of your answers.

---

## Question Types

### Closed Questions

Questions with specific answers:

| Question | Answer |
|----------|--------|
| "Is the temperature above 100°C?" | Yes/No |
| "What was the temperature?" | 105°C |
| "Did the system fail?" | Yes |

### Open Questions

Questions with multiple possible answers:

| Question | Answer |
|----------|--------|
| "Why did the system fail?" | Many possible causes |
| "What happened?" | Many possible descriptions |
| "What should we do?" | Many possible actions |

### Investigative Questions

Questions that guide investigation:

| Question | Purpose |
|----------|---------|
| "What evidence exists?" | Guides evidence gathering |
| "What are the alternative explanations?" | Guides analysis |
| "What would confirm or disprove?" | Guides testing |

---

## Good Question Criteria

| Criterion | Good Question | Bad Question |
|-----------|---------------|--------------|
| **Specific** | "What caused the 2026-07-15 failure?" | "Why do things fail?" |
| **Scopeable** | Answerable in finite investigation | Answerable only after infinite investigation |
| **Testable** | Evidence can be gathered | No evidence exists or can exist |
| **Actionable** | Leads to decisions | Pure curiosity |
| **Relevant** | Connects to goals | Interesting but unrelated |

---

## Question Transformation

### From Vague to Specific

❌ "Why does the system fail?"

**Problems**:
- "System" is vague
- "Fail" is vague
- Many possible answers
- No specific investigation path

✅ "What specific conditions preceded the failures on 2026-07-15 and 2026-07-20?"

**Improvements**:
- Specific dates
- Specific failure instances
- Specific investigation path (preceding conditions)

### From Unscoped to Scoped

❌ "How can we prevent all failures?"

**Problems**:
- Infinite scope
- Cannot be answered
- No actionable next steps

✅ "What are the three most common failure modes in the past 90 days?"

**Improvements**:
- Finite scope (90 days)
- Specific number (3)
- Actionable (prioritize prevention)

### From Untestable to Testable

❌ "Is the vendor's component reliable?"

**Problems**:
- "Reliable" is vague
- No specific test criteria
- Cannot be answered with evidence

✅ "What is the historical failure rate of the vendor's component?"

**Improvements**:
- Specific metric (failure rate)
- Testable (can gather historical data)
- Definable (what counts as failure?)

---

## Question Decomposition

Complex questions can be broken into simpler ones:

### Primary Question
"How can we improve system reliability?"

### Sub-questions

1. **Diagnostic**: "What causes unreliability?" → Identify problems
2. **Comparative**: "How does our reliability compare to similar systems?" → Benchmark
3. **Causal**: "What specific factors cause failures?" → Root cause
4. **Solution**: "What interventions reduce failures?" → Solution options
5. **Evaluation**: "How effective are the interventions?" → Validation

### Sub-question Answers

Each sub-question is testable. Answer them separately, then synthesize.

---

## Question Framing Checklist

Before finalizing a question, check:

- [ ] Is it specific? Can you define key terms?
- [ ] Is it scoped? Can it be answered in finite time?
- [ ] Is it testable? Can evidence be gathered?
- [ ] Is it actionable? Will the answer lead to decisions?
- [ ] Is it relevant? Does it connect to goals?
- [ ] Can it be decomposed? Is it too complex?

---

## Practice Exercise

**Vague Question**: "Why is our code bad?"

**Step 1: Identify vagueness**
- "Our code" - which part?
- "Bad" - what does bad mean?
- Too broad to investigate

**Step 2: Decompose into sub-questions**

1. "What metrics indicate code quality?"
2. "How do we compare to industry standards?"
3. "What specific problems exist?"
4. "What causes the problems?"
5. "What improvements are feasible?"

**Step 3: Choose specific question**

```
"What are the three most common code quality issues in the authentication module, 
and what are their root causes?"
```

**Write your refined question**:

```markdown
## Question Refinement

### Original Question
"Why is our code bad?"

### Problems Identified
- "Code" is vague
- "Bad" is subjective
- No scope
- No actionable path

### Refined Question
"What are the top 3 code quality issues in the authentication module, 
and what are their root causes?"

### Why This Is Better
- Specific scope (authentication module)
- Specific number (top 3)
- Specific investigation (root causes)
- Actionable (addresses specific issues)
```

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Question types** | Closed, open, investigative |
| **Good criteria** | Specific, scoped, testable, actionable, relevant |
| **Decomposition** | Break complex questions into simpler ones |
| **Refinement** | Transform vague questions into specific ones |

The question determines the answer. Spend time on question quality.

---

## Next Steps

Now that you can formulate good questions, learn when to stop investigating:

**[Knowing When to Stop](knowing-when-to-stop.md)**
