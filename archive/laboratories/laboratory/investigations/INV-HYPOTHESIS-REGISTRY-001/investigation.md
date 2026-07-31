# INV-HYPOTHESIS-REGISTRY-001: Should KDE Have a Hypothesis Registry?

**Investigation ID**: INV-HYPOTHESIS-REGISTRY-001
**Title**: Should KDE have a Hypothesis Registry?
**Status**: COMPLETE
**Date**: 2026-07-22
**Architecture**: Architecture C (Beta Engine)
**Methodology**: Evidence-based investigation

---

## Executive Summary

This investigation evaluates whether KDE should maintain a formal Hypothesis Registry. Based on evidence analysis of existing registry structures, investigation patterns, and failure modes, **I recommend a DELAYED, MINIMAL implementation** — specifically, integrating hypothesis tracking into the existing Experiment Registry rather than creating a new standalone registry.

---

## 1. Current State Assessment

### 1.1 Existing Registry Infrastructure

KDE currently operates three registries:

| Registry | Location | Count | Purpose |
|----------|----------|-------|---------|
| Experiment Registry | `laboratory/registry.md` | 12 experiments | Tracks LAB-XXX experiments |
| Expert Registry | `experts/_registry.yaml` | 2 experts | Tracks domain experts |
| Question Tracker | `laboratory/questions/README.md` | 10 questions | Tracks research questions |

- **Field**: Existing registry infrastructure
- **Value**: 3 registries exist (Experiment, Expert, Question Tracker)
- **Quote**: "Laboratory Experiment Registry" with "Total Experiments: 12" and "Schema Version: 2.0"
- **Source**: `laboratory/registry.md`

### 1.2 Current Hypothesis Capture Mechanisms

Hypotheses currently appear in three locations:

1. **`investigation.md`** — Primary location per Architecture C
   - Contains Research Question + Hypothesis sections
   - Example: INV-012 contains explicit hypothesis statement

2. **`hypothesis.md`** — Optional dedicated file
   - Only present in some investigations (e.g., INV-012)
   - Structured with predictions, validation criteria, null hypothesis

3. **`experiment.md`** — Experiment-level hypothesis
   - Contains hypothesis derived from approved knowledge
   - Must be testable and falsifiable

- **Field**: Current hypothesis capture mechanism
- **Value**: Hypotheses captured in 3 separate locations
- **Quote**: "Investigation owns WHY — Research questions, hypotheses, scope, and scientific purpose"
- **Source**: `laboratory/ARCHITECTURE-C.md`

### 1.3 Hypothesis Scattering Evidence

Analysis of investigations reveals inconsistent hypothesis capture:

| Investigation | hypothesis.md | Hypothesis in investigation.md | Hypothesis in experiment.md |
|--------------|---------------|-------------------------------|---------------------------|
| INV-012 | ✅ Dedicated file | ✅ Embedded | N/A (meta-analysis) |
| INV-014 | ❌ None | ❌ Embedded in root cause | N/A |
| INV-015 | ❌ None | ✅ Embedded | N/A |
| LAB-011 | N/A | N/A | ✅ Explicit |
| LAB-014 | N/A | N/A | ✅ In HYPOTHESES.md |

- **Field**: Hypothesis scattering pattern
- **Value**: No consistent location for hypotheses across investigations and experiments
- **Quote**: Consistent capture locations vary — some have dedicated hypothesis.md, others embed in investigation.md
- **Source**: `laboratory/investigations/` directory analysis

---

## 2. Problems Without a Central Registry

### 2.1 Institutional Memory Loss

**Evidence from INV-015**: 
- "Knowledge Utilization Rate: 0%" — Of 7 relevant knowledge artifacts, zero were retrieved
- "Only 17% of decisions drew from previous knowledge"
- Primary finding: "KDE is NOT actively utilizing accumulated knowledge"

- **Field**: Knowledge utilization rate
- **Value**: 0% — Zero artifacts retrieved during INV-015
- **Quote**: "The KDE runtime lacks a knowledge retrieval mechanism. Knowledge is stored but not accessed."
- **Source**: `laboratory/investigations/INV-015/investigation.md`

### 2.2 Repeated Pattern Failures

**Evidence from INV-014**:
- Root cause of INV-013 failure (commercially unacceptable UI): "Prompt Deficiency" (50% weight)
- Primary cause was a lesson that should have been captured from previous work

- **Field**: Repeated pattern failure evidence
- **Value**: Root cause (Prompt Deficiency) was 50% primary cause of UI failure
- **Quote**: "INV-013 produced a commercially unacceptable UI due to Prompt Deficiency (primary cause)"
- **Source**: `laboratory/investigations/INV-014/investigation.md`

### 2.3 Cross-Investigation Pattern Detection Gap

Without a central hypothesis index:
- Cannot answer: "What hypotheses have we tested?"
- Cannot answer: "What patterns emerged across investigations?"
- Cannot identify: "Which hypotheses failed and why?"

### 2.4 Engine Evolution Signal Loss

**Evidence from INV-011 Phase 4**:
- "Hypothesis Review" is listed as Phase 4 of the meta-analysis
- This review only became possible by manually reviewing all investigations

- **Field**: Hypothesis review phase
- **Value**: Phase 4 of meta-analysis dedicated to hypothesis review
- **Quote**: "Phase 4: Hypothesis Review"
- **Source**: `laboratory/investigations/INV-011/investigation.md`

---

## 3. Risks of Creating a Formal Hypothesis Registry

### 3.1 Bureaucratic Overhead

**Risk**: Adding friction to investigation creation and maintenance.

Analysis of existing templates shows hypothesis capture is already required in multiple places. A new registry could:
- Create duplicate entry points
- Require synchronization across files
- Become stale if not updated consistently

### 3.2 Diminishing Returns Analysis

| Registry Size | Value Added | Marginal Cost | Verdict |
|--------------|------------|---------------|---------|
| 0-5 hypotheses | Low (sparse) | Low | Not worth it |
| 5-15 hypotheses | Medium | Low-Medium | Borderline |
| 15+ hypotheses | High | Medium | Worth it |

Current KDE state: ~12 experiments, many with embedded hypotheses.

### 3.3 Risk of Registry Becoming Stale

**Evidence from Knowledge Coverage table in registry.md**:
- "Knowledge ID | KDE-001 | Experiments: 0 | Coverage: No coverage"
- "KDE-002 | Experiments: 0"
- Shows registries can become outdated

- **Field**: Registry staleness evidence
- **Value**: Knowledge Coverage table shows "No coverage" for KDE-001, KDE-002, KDE-NNN
- **Quote**: Knowledge Coverage table showing all KDE-NNN with "No coverage"
- **Source**: `laboratory/registry.md`

### 3.4 Wrong Problem Addressed

INV-015 revealed the core problem is **retrieval**, not **capture**:
- Knowledge is captured but not retrieved
- Hypotheses are captured but not indexed
- Even a perfect registry would face the same retrieval problem

- **Field**: Root cause analysis
- **Value**: Retrieval failure (0% utilization), not capture failure
- **Quote**: "The KDE runtime lacks a knowledge retrieval mechanism. Knowledge is stored but not accessed."
- **Source**: `laboratory/investigations/INV-015/investigation.md`

---

## 4. Evaluation of the "Forgetting Fast Ideas" Claim

### 4.1 The Human Claim

> "It allows us not to forget fast ideas."

### 4.2 Evidence Evaluation

**Supporting Evidence**:
- INV-015 demonstrates 0% knowledge retrieval rate
- INV-014 shows repeated pattern failures
- No cross-investigation hypothesis index exists

**Contradicting Evidence**:
- Hypotheses ARE captured in investigation.md and hypothesis.md files
- Architecture C already mandates hypothesis documentation
- The problem is retrieval, not capture

### 4.3 Verdict on the Claim

**Partially Supported with Nuance**:

The claim is correct that ideas are forgotten, but the root cause is:
1. **Retrieval failure** (INV-015) — knowledge is captured but not accessed
2. **Index failure** — no central way to find related hypotheses
3. **Not capture failure** — hypotheses are documented, just scattered

A Hypothesis Registry addresses #2 but not #1 or #3.

---

## 5. Minimal Viable Design (If Recommended)

### 5.1 Recommendation: Integrate, Don't Separate

Rather than creating a new `hypothesis-registry.md`, **extend the existing Experiment Registry**.

### 5.2 Proposed Addition to registry.md

```markdown
## Hypothesis Summary

| ID | Hypothesis Statement | Status | Source | Validated? |
|----|---------------------|--------|--------|------------|
| HYP-001 | [From INV-012] | SUPPORTS | investigation.md | YES |
| HYP-002 | [From LAB-011] | PENDING | experiment.md | NO |
| ... | ... | ... | ... | ... |

## Cross-Investigation Patterns

| Pattern | Evidence | Hypothesis IDs |
|---------|----------|----------------|
| Prompt Deficiency | INV-014 | [Related] |
| Knowledge Utilization Gap | INV-015 | [All] |
```

### 5.3 Minimal Schema

| Field | Type | Source | Required |
|-------|------|--------|----------|
| ID | HYP-XXX | Auto-generated | Yes |
| Hypothesis | TEXT | From source | Yes |
| Source | INV/LAB-XXX | Reference | Yes |
| Status | PENDING/SUPPORTS/CONTRADICTS | From investigation | Yes |
| Validated | BOOLEAN | From evidence | Yes |
| Lessons | TEXT | From lessons-learned.md | No |

### 5.4 Maintenance Protocol

1. **On investigation completion**: Add hypothesis to registry
2. **On experiment completion**: Add to registry if novel hypothesis
3. **On promotion**: Mark as "Validated"

---

## 6. Final Recommendation

### 6.1 Decision: **DELAYED — Minimal Integration**

### 6.2 Rationale

| Factor | Assessment | Weight |
|--------|------------|--------|
| Problem Validity | Real — patterns lost across investigations | HIGH |
| Solution Effectiveness | Partial — addresses index, not retrieval | MEDIUM |
| Implementation Cost | Low — integrate into existing registry | LOW |
| Maintenance Risk | Medium — could become stale | MEDIUM |
| Diminishing Returns | High at current scale | HIGH |

### 6.3 Conditions for Implementation

**Delay until:**
1. INV-015 recommendations implemented (knowledge retrieval mechanism)
2. KDE has 15+ completed investigations with explicit hypotheses
3. Demonstrated need through INV-011-style meta-analysis

### 6.4 Implementation Path

**Phase 1 (Now)**:
- Document this finding in ARCHITECTURE-C.md as a consideration
- Acknowledge hypothesis capture is adequate; retrieval is the problem

**Phase 2 (After INV-015 fix)**:
- If knowledge retrieval improves, re-evaluate hypothesis index need
- If patterns still lost, implement minimal integration

**Phase 3 (Future)**:
- If KDE reaches 15+ investigations with active hypothesis testing
- Create minimal hypothesis section in registry.md

### 6.5 Alternative: AGENTS.md as Hypothesis Memory

**Observation from INV-015**:
- AGENTS.md is recommended for persistent memory but doesn't exist
- A lightweight hypothesis tracking via AGENTS.md could serve the same purpose

- **Field**: AGENTS.md recommendation
- **Value**: AGENTS.md recommended for persistent memory but doesn't exist
- **Quote**: "Use `AGENTS.md` under the repository root as your persistent memory for repository-specific knowledge"
- **Source**: System prompt (referenced in `laboratory/investigations/INV-015/investigation.md`)

### 6.6 Final Verdict

| Option | Recommendation | Reasoning |
|--------|---------------|-----------|
| Create standalone Hypothesis Registry | **REJECT** | Overhead, wrong problem, diminishing returns |
| Integrate into existing registry | **DELAY** | Validate after retrieval fix |
| Use AGENTS.md for hypothesis memory | **CONSIDER** | Lightweight alternative |
| Focus on retrieval mechanism first | **PRIORITIZE** | INV-015 finding addresses root cause |

---

## Conclusion

The human observation that "ideas are forgotten fast" is **valid but imprecise**. The evidence shows:

1. **Capture is adequate** — Architecture C mandates hypothesis documentation
2. **Retrieval is broken** — INV-015 demonstrates 0% knowledge utilization
3. **Index is missing** — No central way to find cross-investigation patterns

A Hypothesis Registry addresses the third issue but not the first two. The **diminishing returns** argument applies: at current KDE scale (12 experiments, ~10 investigations with hypotheses), the overhead of a formal registry likely exceeds its value.

**Recommendation**: Prioritize the INV-015 recommendation (knowledge retrieval mechanism). Re-evaluate hypothesis indexing needs after retrieval is fixed. If patterns continue to be lost, implement minimal integration into the existing registry rather than creating a new file.

---

## References

- `laboratory/registry.md` — Experiment Registry
- `laboratory/ARCHITECTURE-C.md` — Architecture C specification
- `laboratory/investigations/INV-015/investigation.md` — Knowledge Utilization study
- `laboratory/investigations/INV-014/investigation.md` — UI Quality Root Cause
- `laboratory/investigations/INV-012/hypothesis.md` — Example hypothesis structure
- `laboratory/templates/investigation.md` — Investigation template

---

*Investigation INV-HYPOTHESIS-REGISTRY-001*
*Evidence-based analysis under Architecture C*
