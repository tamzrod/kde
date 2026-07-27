# Documentation Philosophy

**Purpose**: KDE's approach to human-facing documentation
**Audience**: Documentation writers, contributors
**Source**: LAB-060 Human-Facing Documentation Synthesis

---

## The Core Philosophy

> **Documentation is cultivation. Good documentation grows understanding through progressive engagement, respecting the reader's time and intelligence while building the foundation for mastery.**

---

## Why This Philosophy Matters

KDE documentation serves readers who are:

- Learning a methodology
- Seeking specific answers
- Evaluating KDE for adoption
- Contributing to the project

These readers have limited time and patience. They will leave if documentation wastes either.

---

## The 13 Principles

### Foundation Principles

These principles govern all documentation decisions.

#### 1. Evidence Over Assertion

**Statement**: Every documentation claim should be supportable.

**Application**: Don't assert that something is important. Show why. Don't state that a principle works. Explain the evidence.

**Example**:
- ❌ "KDE requires human approval because it's essential."
- ✅ "KDE requires human approval because self-approval creates conflicts of interest."

---

#### 2. Transparency Over Persuasion

**Statement**: Engagement comes from clarity, not manipulation.

**Application**: Don't use artificial curiosity gaps or manufactured tension. Create genuine interest through relevance and honesty.

**Example**:
- ❌ "You'll never believe what happens when..."
- ✅ "This principle explains why KDE handles uncertainty the way it does."

---

#### 3. Respect for Intelligence

**Statement**: KDE readers are capable. Don't over-explain or under-precision.

**Application**: Balance clarity with accuracy. Trust readers to understand complex concepts if explained well.

---

### Engagement Principles

These principles maximize reader engagement.

#### 4. Cognitive Load Management

**Statement**: Every design decision should consider the reader's working memory.

**Application**:

| Guideline | Target |
|-----------|--------|
| Chapter length | 800-1200 words |
| Sentence length | Under 25 words |
| List length | Maximum 5-7 items |
| Concept density | One new concept per section |

**Rationale**: Overwhelmed readers leave.

---

#### 5. Progressive Disclosure

**Statement**: Information should be revealed gradually, with each layer building on the previous.

**Application**: The documentation architecture implements this:
- Introduction → Foundations → Core Concepts → Guides → Reference

**Rationale**: Beginners need foundations. Experts need detail. Good documentation serves both.

---

#### 6. Task-First Organization

**Statement**: Organize around what readers want to do, not how the system is built.

**Application**:

| Instead of... | Write... |
|--------------|----------|
| "Engine Model" | "How investigations run" |
| "ECU Components" | "How the system orchestrates work" |
| "State Machine" | "How documents transition states" |

**Rationale**: Readers approach documentation with questions. Answer them.

---

#### 7. Principle-First Structure

**Statement**: Each chapter should open with its central insight.

**Application**:

```markdown
## Evidence Before Conclusions

### The Enduring Principle

There is a simple idea at the heart of scientific inquiry: 
knowledge must be earned through evidence, not assumed through authority.
```

**Rationale**: Primacy effect—opening content is remembered best.

---

#### 8. Observation Before Explanation

**Statement**: Readers should understand something intuitively before it's formalized.

**Application**: Each chapter should include a real-world observation that creates understanding.

**Example**:
> A person takes painkillers every week for headaches. The painkillers work—until the next headache arrives. The doctor discovers the headaches are caused by poor sleep posture. Painkillers treat the symptom; the pillow treats the cause.

**Rationale**: Pattern recognition is faster than sequential processing.

---

#### 9. Examples Before Definitions

**Statement**: Show how something works before explaining what it is.

**Application**:

| Instead of... | Write... |
|--------------|----------|
| Define "investigation" | Show one running |
| Define "evidence" | Show evidence being collected |
| Define "validation" | Show validation passing |

**Rationale**: Examples create pattern matching that definitions cannot.

---

### Structure Principles

These principles ensure consistency.

#### 10. Consistent Structure

**Statement**: Similar content should have similar form.

**Application**:

| Element | Pattern |
|---------|---------|
| Chapters | Opening principle → Observation → Explanation → Application |
| Sections | Clear heading hierarchy |
| Lists | Bullet format consistency |
| Code blocks | Labeled and explained |
| Cross-references | Consistent format |

**Rationale**: Pattern recognition reduces cognitive load.

---

#### 11. Recognition Over Assumption

**Statement**: Don't assume readers remember previous content.

**Application**:

| Don't assume... | Do... |
|----------------|-------|
| "As shown above" | Reference explicitly: "(see Chapter X)" |
| "The investigation state" | Use full term with context |
| "Recall the principles" | Re-state briefly |

**Rationale**: Recognition is easier than recall.

---

#### 12. Conclusion to Next

**Statement**: Every chapter should end with a bridge to the next.

**Application**:

```markdown
Understanding the principle prepares us to examine how KDE
institutionalizes it through governance.
```

**Rationale**: Recency effect—closing content is remembered. Transitions create continuity.

---

#### 13. Diminishing Returns Awareness

**Statement**: Know when enough is enough.

**Application**:

| Decision | Guideline |
|----------|----------|
| Historical context | Only what explains the principle |
| Edge cases | Reference, don't explore |
| Depth | Go deep on core, shallow on periphery |

**Rationale**: Additional detail has diminishing returns. At some point, more information reduces clarity.

---

## Chapter Template

Every chapter should follow this structure:

```markdown
## [Principle Name]

### The Enduring Principle
One-sentence statement of the core insight

### Real-World Observation
Concrete example that creates intuitive understanding
(Reader thinks: "That makes sense.")

### Why It Matters
Explanation of why this principle is important

### Historical/Contextual Background
Only enough to explain the principle's origin
(Include selectively—only what serves understanding)

### Application
How this principle appears in KDE
(This is the CONCLUSION, not the introduction)

### Connection to Next
Bridge to following chapter
```

---

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Walls of text | Ignores scanning | Use headings, whitespace |
| Lists of definitions | No context | Show before defining |
| Reference without guide | Overwhelms beginners | Layered structure |
| Incomplete examples | Can't verify understanding | Show working code |
| Unexplained jargon | Creates barriers | Define in context |
| "KDE borrowed from X" | History as taxonomy | History as explanation |

---

## What Good Documentation Feels Like

Readers should:

- **Continue voluntarily** — No external pressure required
- **Understand without overwhelm** — Each concept builds on previous
- **Remember the main ideas** — Core principles are memorable
- **Want to read the next chapter** — Open questions create anticipation
- **Feel they're discovering KDE** — Active learning, not passive reading

---

## Measuring Success

### Qualitative Indicators

| Indicator | Question |
|----------|----------|
| Completion | Do readers finish chapters? |
| Comprehension | Do readers understand principles? |
| Continuation | Do readers proceed to next chapter? |
| Retention | Do readers remember key ideas? |

### Quantitative Metrics (Future)

| Metric | Target |
|--------|--------|
| Time on page | 3-5 minutes per chapter |
| Scroll depth | >80% |
| Return visits | >20% |
| Cross-links clicked | >30% |

---

## Living Document

This philosophy is not fixed. As we learn what works, principles should evolve.

When documentation fails readers, investigate why. Update principles based on evidence.

---

## See Also

- [Philosophy](philosophy.md) — Core principles
- [Inspirations](inspirations.md) — Conceptual foundations
- [LAB-060 Experiment](../laboratory/experiments/LAB-060/) — Full experiment documentation
