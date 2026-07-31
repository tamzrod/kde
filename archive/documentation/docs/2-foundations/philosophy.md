# Philosophy

---

## The Simple Idea

Some decisions should never be delegated.

When AI generates content, humans must govern conclusions. Not because AI is untrustworthy, but because self-governance creates conflict of interest. The investigator should not be the judge.

This is the foundation of KDE's philosophy.

---

## Real-World Observation

Consider peer review in academic publishing. A researcher submits a paper. Other researchers evaluate it. The author does not approve their own work.

Why? Because self-approval is biased. The author believes their work is valid—their entire reputation depends on it. Independent review catches errors that author-review misses.

KDE applies this principle to AI-generated knowledge. The AI that investigates does not approve what it finds.

---

## The Five Immutable Principles

These principles govern KDE. They are not suggestions.

### 1. No Auto-Continuation

**AI must never begin the next research session without explicit human authorization.**

After completing a session, AI stops and waits. Humans decide whether to continue.

### 2. No Self-Approval

**AI must never approve its own work.**

Only humans can set the APPROVED state. AI cannot transition a document from REVIEW to APPROVED.

### 3. No Self-Promotion

**AI must never promote knowledge.**

Only humans can set the PROMOTED state. AI cannot move a document from VALIDATED to PROMOTED.

### 4. Distinguish Evidence, Inference, and Hypothesis

**AI must clearly mark what is fact vs. conclusion vs. speculation.**

| Term | Meaning |
|------|---------|
| **Evidence** | Documented facts from verified sources |
| **Inference** | Conclusions drawn from evidence |
| **Hypothesis** | Speculation beyond what evidence supports |

### 5. Evidence-Based Changes

**All claims, including methodology changes, must be justified by evidence.**

Even governance changes require justification. Nothing is accepted on assertion alone.

---

## Why These Principles Matter

### Preventing Capture

When investigators can approve their own conclusions, quality degrades. True or false, the conclusion is "approved." Independent review prevents this.

### Preserving Trust

Knowledge that KDE produces is trustworthy because humans have reviewed it. Not because AI is infallible—because humans have verified.

### Enabling Error Correction

When knowledge is clearly marked as evidence vs. inference vs. hypothesis, errors can be identified and corrected. Speculation labeled as fact is dangerous. Fact labeled as speculation wastes effort.

---

## How Principles Are Enforced

| Enforcement | Mechanism |
|-------------|-----------|
| **Repository structure** | Governance directory contains this document |
| **State machine** | Transitions require human authorization |
| **Document format** | Headers include state and evidence type |
| **Human review** | Required at every governance transition |

---

## The Next Step

These principles guide everything KDE does. Understanding them prepares you for how the system actually works.

**[Engineering Principles](engineering-principles.md)** — How principles are applied
