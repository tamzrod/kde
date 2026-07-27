# Evaluating Sources

---

## The Simple Idea

Not all evidence is equal. A sensor reading is stronger than a rumor. A peer-reviewed study is stronger than a blog post.

This skill teaches you to assess evidence quality so you can weight conclusions appropriately.

---

## Real-World Observation

Two people claim opposite things about a medication:

1. Person A: "I took it and felt better."
2. Person B: "A study showed it works."

Person B's evidence is stronger because:
- It's systematic (study design)
- It's reproducible (other studies confirm)
- It's quantified (measured outcomes)

Feelings are subjective and can be placebo effect. Studies control for these factors.

This is source evaluation. The quality of evidence determines how strong your conclusion can be.

---

## Evidence Quality Spectrum

| Quality | Source | Weight |
|---------|--------|--------|
| **Highest** | Peer-reviewed research, replicated studies | Strong |
| **High** | Primary data, official records, expert testimony | Strong |
| **Medium** | Secondary analysis, news reports, documentation | Moderate |
| **Low** | Anecdotes, opinions, unverified claims | Weak |
| **Lowest** | Rumors, anonymous sources, unsupported claims | Very weak |

---

## Evaluating Source Credibility

### Questions to Ask

| Question | What It Reveals |
|----------|-----------------|
| Who created this? | Expertise, potential bias |
| When was it created? | Relevance, freshness |
| Why was it created? | Purpose, potential bias |
| How was it created? | Method, reliability |
| Can it be verified? | Corroboration, trust |

### Credibility Indicators

| Indicator | Strong | Weak |
|-----------|--------|------|
| **Expertise** | Domain expert, peer-reviewed | Anonymous, no credentials |
| **Independence** | No stake in outcome | Benefits from conclusion |
| **Method** | Systematic, documented | Arbitrary, undocumented |
| **Corroboration** | Multiple sources agree | Single source only |
| **Freshness** | Recent data | Outdated data |

---

## Handling Conflicting Evidence

When sources disagree, don't just pick one. Investigate why.

### Step 1: Identify the Conflict

```
Source A: "Temperature above 100°C causes failures."
Source B: "Temperature is not the cause of failures."
```

### Step 2: Assess Source Quality

```
Source A: Primary sensor data, 90 days
Source B: Blog post, no data cited
```

[Inference] Source A is higher quality than Source B.

### Step 3: Investigate the Disagreement

Possible explanations:
- Different time periods studied
- Different definitions of "failure"
- Different measurement methods
- Error in one source

### Step 4: Document the Resolution

```markdown
## Conflicting Evidence Analysis

### Evidence
- Source A (sensor data): 89% correlation between >100°C and failures
- Source B (blog post): Claims temperature is not the cause

### Source Quality
- Source A: Primary data, high credibility
- Source B: Blog post, low credibility

### Resolution
Source A is primary, systematic data. Source B provides no counter-evidence.
Conclusion: Temperature above 100°C is associated with failures.

### Confidence
HIGH - High quality primary data supports conclusion.
```

---

## Recognizing Misleading Statistics

Statistics can mislead through:

| Technique | What It Does | Example |
|-----------|-------------|---------|
| **Cherry-picking** | Select favorable data | "Our product has 95% satisfaction!" (from 2 users) |
| **Misleading averages** | Hide distribution | Average salary hides the CEO's extreme salary |
| **Correlation as causation** | Assume cause | Ice cream sales correlate with drowning (both summer) |
| **Small samples** | Extrapolate from few | "3 out of 4 dentists recommend X" |

### Questions to Ask About Statistics

- [ ] What's the sample size?
- [ ] What's being measured?
- [ ] What's being averaged?
- [ ] What time period?
- [ ] What's missing?
- [ ] What caused what?

---

## Source Quality Checklist

Before accepting evidence, check:

- [ ] Is this a primary or secondary source?
- [ ] Who created this and what are their credentials?
- [ ] What is their potential bias?
- [ ] When was this created and is it current?
- [ ] Can this be corroborated?
- [ ] Are the statistics reliable?
- [ ] Is causation assumed when only correlation is shown?

---

## Practice Exercise

**Evidence**: "A study found that our system fails more often in summer."

**Evaluate the evidence:**

1. **Who conducted the study?** (Expert? Biased?)
2. **What data was used?** (Primary? Secondary?)
3. **When was it conducted?** (Recent? Historical?)
4. **Does causation follow from the data?** (Correlation or causation?)
5. **Can it be corroborated?** (Other sources agree?)

**Write your assessment:**

```markdown
## Source Evaluation: Summer Failure Study

### Source Quality
- Researcher: Internal team (potential bias)
- Data: System logs (primary)
- Date: 2026 (current)
- Method: Statistical analysis (documented)

### Concerns
- Internal team may have incentive to find/dismiss the issue
- Only one year of data (may be anomalous)

### Corroboration
- Cross-referenced with vendor documentation
- Confirmed in 2 of 3 subsystems

### Conclusion
MEDIUM-HIGH confidence. Primary data, corroborated, but internal bias concern.
```

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Source quality** | Primary data is stronger than secondary |
| **Credibility** | Assess expertise, independence, method |
| **Conflicting evidence** | Investigate why, don't just pick |
| **Misleading statistics** | Question sample, measurement, causation |

Not all evidence is created equal. Your conclusions can only be as strong as your weakest evidence.

---

## Next Steps

Now that you can evaluate evidence quality, learn how to handle uncertainty:

**[Handling Uncertainty](handling-uncertainty.md)**
