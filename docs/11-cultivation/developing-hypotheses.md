# Developing Hypotheses

---

## The Simple Idea

Questions start investigations. Hypotheses make them testable.

A question like "Why is the system failing?" is a starting point. A hypothesis like "The system fails because temperature exceeds the threshold" is a testable claim.

This skill teaches you to make that transition.

---

## Real-World Observation

A doctor faces a patient with chronic fatigue. The question is "Why is this patient tired?"

Possible hypotheses:
- "The patient is anemic"
- "The patient has sleep apnea"
- "The patient is depressed"

Each hypothesis is testable. Each leads to different tests. The doctor doesn't know which is correct until testing.

This is hypothesis formation. You don't know if you're right. You design tests to find out.

---

## What Makes a Hypothesis Testable

A hypothesis must be:

| Requirement | What It Means | Example |
|-------------|---------------|---------|
| **Specific** | Clearly states what you claim | "Temperature > 100°C causes failure" not "Heat causes problems" |
| **Falsifiable** | Could be proven wrong | "The system fails when temperature exceeds threshold" not "The system sometimes fails" |
| **Observable** | Has observable consequences | "Error rate increases above 100°C" not "System becomes unhappy" |
| **Testable** | Can be checked with evidence | "Records show errors above 100°C" not "System feels stressed" |

---

## The Question-to-Hypothesis Process

### Step 1: Identify the Question

Start with a clear question:

```
"Why is the system failing?"
```

### Step 2: Identify Possible Explanations

Generate candidate explanations:

- Environmental factors (temperature, humidity)
- Configuration issues
- Hardware problems
- Software bugs
- User error

### Step 3: Choose One Explanation

Select the most promising explanation to test:

```
"Hypothesis: The system fails because temperature exceeds 100°C."
```

### Step 4: Make a Prediction

State what you expect to observe if the hypothesis is correct:

```
"Prediction: If temperature exceeds 100°C, error rate will increase."
```

### Step 5: Design a Test

Describe how to test the prediction:

```
"Test: Compare error logs with temperature logs for the past 30 days."
```

---

## Common Errors

### Error 1: Hypotheses That Are Too Vague

❌ "The system fails sometimes."

[Inference] This doesn't specify when, how, or why. It's not testable.

✅ "The system fails when temperature exceeds 100°C."

[Inference] This is specific. It predicts a condition and an outcome.

### Error 2: Hypotheses That Can't Be Falsified

❌ "The system might fail under certain conditions."

[Inference] "Might" and "certain conditions" make this impossible to disprove.

✅ "The system fails when temperature exceeds 100°C."

[Inference] This can be disproven by showing failures occur below 100°C.

### Error 3: Hypotheses That Are Questions

❌ "Does temperature cause system failure?"

[Inference] This is a question, not a hypothesis. It doesn't state what you believe.

✅ "Temperature causes system failure above 100°C."

[Inference] This states what you believe and is testable.

### Error 4: Assuming Causation from Correlation

❌ "High temperature causes failures."

[Evidence] Temperature and failures might both be caused by a third factor (e.g., load).

✅ "Temperature exceeding 100°C is associated with increased failure rate, potentially due to thermal stress on components."

[Inference] This acknowledges correlation and suggests a mechanism without claiming certainty.

---

## Recognizing Unfalsifiable Claims

Some claims cannot be tested because they are designed to always be "correct":

| Claim | Why It's Unfalsifiable |
|-------|----------------------|
| "The system might fail sometimes" | "Might" and "sometimes" can never be disproven |
| "There's a possibility of failure" | Everything is possible |
| "Under certain conditions, X happens" | "Certain conditions" is never specified |
| "This applies to some cases" | "Some" is never defined |

Good hypotheses predict specific outcomes under specific conditions. If the outcomes don't occur, the hypothesis is wrong.

---

## Hypothesis Quality Checklist

Before accepting a hypothesis, check:

- [ ] Is it specific? Does it state exact conditions?
- [ ] Is it falsifiable? Could evidence disprove it?
- [ ] Is it observable? Are there observable consequences?
- [ ] Is it testable? Can I actually gather evidence?
- [ ] Have I stated a prediction? What should I see if correct?
- [ ] Have I considered alternatives? What else could explain this?

---

## Practice Exercise

**Question**: "Why do investigations sometimes produce poor quality conclusions?"

Generate three hypotheses:

1. **Hypothesis 1**: Investigations produce poor quality conclusions when evidence is insufficient.

2. **Hypothesis 2**: Investigations produce poor quality conclusions when investigators skip the analysis step.

3. **Hypothesis 3**: Investigations produce poor quality conclusions when conclusions are formed before evidence is gathered.

For each hypothesis:
- What prediction does it make?
- What evidence would disprove it?
- What evidence would support it?

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Hypothesis** | A testable explanation |
| **Testable** | Specific, falsifiable, observable, testable |
| **Prediction** | What you expect to see if correct |
| **Falsifiability** | The ability to be proven wrong |

The quality of your hypotheses determines the quality of your investigation. Vague hypotheses produce vague conclusions.

---

## Next Steps

Now that you can form hypotheses, learn how to find evidence to test them:

**[Finding Evidence](finding-evidence.md)**
