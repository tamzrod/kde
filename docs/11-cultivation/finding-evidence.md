# Finding Evidence

---

## The Simple Idea

You have a hypothesis. Now you need evidence. But where do you look?

Most people can recognize good evidence. Few know how to find it systematically.

This skill teaches you where to look, how to search, and what to do when evidence doesn't exist.

---

## Real-World Observation

A journalist receives a tip: "Company X is hiding safety violations."

Possible sources of evidence:
- Government inspection records
- Employee testimonies
- Internal documents
- Safety incident reports
- Industry databases
- Competitor information

The journalist doesn't know which sources will pan out. They search systematically, following leads, documenting what they find and don't find.

This is evidence discovery. It's methodical, not magical.

---

## The Evidence Discovery Process

### Step 1: Identify What You Need

Start with your hypothesis and predictions:

```
Hypothesis: Temperature exceeds 100°C causes system failures.
Prediction: Error logs will show failures at high temperatures.
```

What evidence would test this?

- Temperature logs
- Error logs
- Correlation between the two

### Step 2: Identify Possible Sources

List where evidence might exist:

| Evidence Needed | Possible Sources |
|-----------------|------------------|
| Temperature data | Sensor logs, monitoring systems, weather data |
| Error logs | System logs, incident reports, support tickets |
| Correlation | Time-series analysis, statistical databases |

### Step 3: Search Systematically

Search each source:

1. **Primary sources first** - Original data (sensor logs)
2. **Secondary sources second** - Analysis of data (reports)
3. **Tertiary sources last** - Compilations (databases)

### Step 4: Document Your Search

Record what you found and didn't find:

```markdown
## Evidence Search Log

### Temperature Logs
- Source: sensor_db/temperature
- Found: 30 days of data
- Gap: Missing data for 2026-07-15
- Assessment: Sufficient for analysis

### Error Logs
- Source: logs/errors
- Found: 1,247 error records
- Gap: None
- Assessment: Sufficient for analysis

### Correlation Analysis
- Source: Derived from above
- Found: 89% correlation between high temperature and errors
- Gap: None
- Assessment: Strong evidence
```

### Step 5: Assess What You Have

Evaluate sufficiency:

| Question | Answer |
|----------|--------|
| Did you find evidence? | Yes/No |
| Is the evidence relevant? | Strong/Weak/None |
| Is the evidence sufficient? | Yes/No |
| Are there gaps? | Document them |

---

## When Evidence Doesn't Exist

Sometimes you search everywhere and find nothing. This is important information.

### Documenting Absence

```markdown
## Evidence of Prior Art

Searched for:
- Previous investigations of this topic
- Existing documentation
- Prior experiments

Sources searched:
- Internal knowledge base
- External databases
- Published literature

Findings:
- No prior art found
- This appears to be novel

Conclusion:
[Evidence] Absence of prior art suggests this investigation addresses an unmet need.
```

### What Absence Tells You

| Absence Type | What It Means |
|--------------|---------------|
| No prior research | Novel investigation |
| No internal documentation | Unknown area |
| No conflicting evidence | Supports hypothesis |
| No supporting evidence | Challenges hypothesis |

---

## Source Quality Guide

### Primary Sources (Best)

| Source | Why It's Primary |
|--------|-----------------|
| Original data | Created at time of event |
| First-hand accounts | Witness testimony |
| Raw logs | System-generated, unprocessed |
| Original documents | Not summarized or interpreted |

### Secondary Sources (Good)

| Source | Why It's Secondary |
|--------|-------------------|
| Analysis reports | Interpretation of primary data |
| Expert summaries | Second-hand understanding |
| News articles | Reporter's interpretation |
| Academic papers | Analysis of primary research |

### Tertiary Sources (Limited)

| Source | Why It's Tertiary |
|--------|-------------------|
| Encyclopedias | Compilations of secondary sources |
| Textbooks | Simplified summaries |
| Databases | Often outdated or incomplete |

---

## Systematic Search Checklist

Before concluding you couldn't find evidence:

- [ ] Searched primary sources?
- [ ] Searched internal databases?
- [ ] Searched external databases?
- [ ] Searched published literature?
- [ ] Searched expert opinions?
- [ ] Documented what you searched?
- [ ] Documented what you found?
- [ ] Documented what you didn't find?

---

## Common Errors

### Error 1: Stopping Too Early

❌ "I couldn't find anything on the first search."

[Inference] One search isn't enough. Try multiple sources.

✅ "Searched 5 sources. Found partial evidence in 2 sources. Gaps documented."

### Error 2: Using Weak Sources

❌ "I found a blog post that says X."

[Inference] Blog posts are tertiary at best. Look for primary sources.

✅ "Found supporting data in sensor logs. Blog post corroborates but isn't primary evidence."

### Error 3: Not Documenting the Search

❌ "I looked around and found some evidence."

[Inference] "Looked around" isn't systematic. Document what you searched.

✅ "Searched 5 sources. Found evidence in 2 sources."

### Error 4: Ignoring Absence

❌ "I couldn't find anything, so I'll proceed without evidence."

[Inference] Absence of evidence is evidence of absence. Document it.

✅ "Searched 5 sources. Found no evidence. This suggests either rarity or obscurity."

---

## Practice Exercise

**Hypothesis**: "The system fails more frequently during peak load."

**What evidence would test this?**

1. Load metrics (what you need)
2. Failure records (what you need)
3. Time correlation (what you need)

**Where would you search?**

1. Primary: System monitoring logs, error logs
2. Secondary: Incident reports, performance analysis
3. Tertiary: Support tickets, forum posts

**Document your search:**

```markdown
## Evidence Search: Load-Failure Correlation

### System Monitoring Logs
- Found: 90 days of load data
- Gap: None

### Error Logs
- Found: 892 failure records
- Gap: None

### Correlation Analysis
- Found: 73% correlation between load > 80% and failures
- Gap: None

Conclusion: Strong evidence supports hypothesis.
```

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Evidence discovery** | Systematic search for supporting information |
| **Primary sources** | Best evidence—original data and first-hand accounts |
| **Documenting search** | Record what you found AND what you didn't |
| **Absence as evidence** | "Not found" is different from "doesn't exist" |

Finding evidence isn't about luck. It's about systematic search and thorough documentation.

---

## Next Steps

Now that you can find evidence, learn how to evaluate its quality:

**[Evaluating Sources](evaluating-sources.md)**
