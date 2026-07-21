# Investigation Workflow

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: PRODUCTION
**Authority**: Architecture C

---

## Overview

This document defines the complete investigation workflow for the KDE Laboratory. It establishes the lifecycle of an investigation from idea to validated knowledge.

---

## Investigation Lifecycle

The investigation lifecycle defines how ideas become validated knowledge:

```
IDEA
    │
    ▼
INVESTIGATION
    │
    ▼
EVIDENCE COLLECTION
    │
    ▼
OBSERVATION
    │
    ▼
SYNTHESIS
    │
    ▼
VALIDATION
    │
    ▼
CANDIDATE KNOWLEDGE
    │
    ▼
KNOWLEDGE PROMOTION PROPOSAL
    │
    ▼
KNOWLEDGE REPOSITORY
```

---

## Stage Definitions

### Stage 1: IDEA

**Description**: An initial concept or question that warrants investigation.

**Entry Criteria**: A research question or hypothesis has been identified.

**Exit Criteria**: The idea is formally scoped as an investigation.

**Artifacts Created**:
- Initial question or hypothesis

**Owner**: Any contributor

---

### Stage 2: INVESTIGATION

**Description**: Formal investigation into a research question.

**Entry Criteria**: Investigation has been created with defined scope.

**Exit Criteria**: Investigation is formally ACTIVE.

**Artifacts Created**:
- `investigation.md` - Research question and scope
- `hypothesis.md` - Testable hypothesis (if applicable)
- `index.md` - Experiment index
- `links/` - Directory for experiment links

**Owner**: Investigation Lead

**Procedure**:

1. **Create Investigation Directory**
   ```
   investigations/INV-XXX/
   ```

2. **Create investigation.md**
   ```markdown
   # Investigation: INV-XXX
   
   **ID**: INV-XXX
   **Title**: [Title]
   **Version**: 1.0.0
   **Date**: YYYY-MM-DDTHH:MM:SSZ
   **Status**: ACTIVE
   **Author**: [Author]
   
   ## Research Question
   [What question does this investigation address?]
   
   ## Scope
   [What is included? What is excluded?]
   
   ## Background
   [What context is needed?]
   ```

3. **Create index.md**
   ```markdown
   # Investigation INV-XXX: Experiment Index
   
   **Investigation**: INV-XXX
   **Updated**: YYYY-MM-DDTHH:MM:SSZ
   
   ## Experiments
   
   | ID | Status | Summary |
   |----|--------|---------|
   | - | - | No experiments yet |
   ```

4. **Create links/ directory** for experiment links

5. **Link to existing Questions** (if applicable)

---

### Stage 3: EVIDENCE COLLECTION

**Description**: Gathering empirical evidence through experiments.

**Entry Criteria**: Investigation is ACTIVE and experiments are defined.

**Exit Criteria**: Sufficient evidence has been collected for analysis.

**Artifacts Created**:
- Experiment definitions (`experiment.md`)
- Run records (`runs/RUN-XXX.md`)
- Raw evidence files

**Owner**: Laboratory / Engine

**Procedure**:

1. **Design Experiments**
   - Define experiment plan
   - Establish success criteria
   - Specify required evidence types

2. **Execute Experiments**
   - Run experiments under Engine authority
   - Document run conditions
   - Capture raw observations

3. **Collect Raw Evidence**
   - Store evidence with experiment
   - Generate SHA-256 checksums
   - Create evidence references

---

### Stage 4: OBSERVATION

**Description**: Documenting factual observations from evidence.

**Entry Criteria**: Raw evidence has been collected.

**Exit Criteria**: All observations are documented and categorized.

**Artifacts Created**:
- `observation.md` - Documented observations
- Categorized evidence references

**Owner**: Laboratory

**Observation Guidelines**:

| Category | Description | Example |
|----------|-------------|---------|
| **Measurement** | Quantitative data | "Response time: 245ms" |
| **Fact** | Verifiable statement | "File created at path X" |
| **Event** | Discrete occurrence | "Error logged at 14:32:05" |
| **Behavior** | Observed action pattern | "System retries 3 times" |

**Key Principle**: Document what was seen, NOT what it means.

---

### Stage 5: SYNTHESIS

**Description**: Transforming evidence into insights.

**Entry Criteria**: Observations are complete.

**Exit Criteria**: Synthesis document captures insights from evidence.

**Artifacts Created**:
- `synthesis.md` - Cross-run synthesis
- `patterns.md` - Identified patterns
- `confidence.md` - Confidence assessment

**Owner**: Laboratory

**Synthesis Procedure**:

1. **Identify Patterns**
   - Common characteristics across runs
   - Correlations between variables
   - Anomalies and outliers

2. **Assess Evidence Quality**
   - Sample size adequacy
   - Evidence integrity verification
   - Reproducibility assessment

3. **Determine Confidence**
   - Based on evidence quality
   - Based on reproducibility
   - Based on consistency

---

### Stage 6: VALIDATION

**Description**: Verifying that findings meet quality standards.

**Entry Criteria**: Synthesis is complete.

**Exit Criteria**: Validation passes or findings are revised.

**Artifacts Created**:
- `validation.md` - Validation report
- Revised synthesis (if needed)

**Owner**: Laboratory

**Validation Criteria**:

| Criterion | Requirement | Verification |
|-----------|-------------|--------------|
| Evidence Quality | Claims trace to evidence | Review evidence files |
| Logical Consistency | Reasoning follows from evidence | Review analysis |
| Assumption Management | Assumptions documented | Review experiment |
| Completeness | All dimensions addressed | Review scope |

---

### Stage 7: CANDIDATE KNOWLEDGE

**Description**: Formulating findings as candidate knowledge.

**Entry Criteria**: Validation passes.

**Exit Criteria**: Candidate knowledge document is complete.

**Artifacts Created**:
- `conclusion.md` - Final conclusion
- Candidate knowledge statement

**Owner**: Laboratory

**Conclusion Template**:

```markdown
# Conclusion: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Confidence**: HIGH|MEDIUM|LOW

## Final Conclusion

[State the conclusion clearly and precisely]

## Evidence Summary

[Summary of supporting evidence with references]

## Limitations

[Any limitations or boundary conditions]

## Recommendations

[Any recommendations based on this conclusion]
```

---

### Stage 8: KNOWLEDGE PROMOTION PROPOSAL

**Description**: Proposing validated findings for promotion to Knowledge.

**Entry Criteria**: Candidate knowledge is complete.

**Exit Criteria**: Promotion proposal is submitted.

**Artifacts Created**:
- `promotion.md` - Promotion proposal
- `lessons-learned.md` - Lessons from investigation

**Owner**: Laboratory

**Procedure**:

1. **Assess Maturity Level**
   - Level 1: Experimental (1 run)
   - Level 2: Repeatable (10+ runs, same Seed/Engine)
   - Level 3: Reproducible (60+ runs, different configurations)
   - Level 4: Generalized (cross-domain)
   - Level 5: Established (sustained validation)

2. **Prepare Promotion Proposal**
   - See [`PROMOTION.md`](./PROMOTION.md)

3. **Submit to Governance**
   - Await human approval

---

### Stage 9: KNOWLEDGE REPOSITORY

**Description**: Validated knowledge is promoted to the Knowledge subsystem.

**Entry Criteria**: Promotion proposal approved by human.

**Exit Criteria**: Knowledge is in `/knowledge/`.

**Artifacts Created**:
- `/knowledge/KDE-XXX.md` - Validated knowledge

**Owner**: Human (promotion action)

---

## Investigation Status Tracking

### Status Values

| Status | Description |
|--------|-------------|
| **DRAFT** | Investigation is being planned |
| **ACTIVE** | Investigation is in progress |
| **COMPLETE** | Investigation has concluded |
| **PROMOTED** | Knowledge has been promoted |

### Stage Progress Table

Every investigation document includes this table:

```markdown
## Status

Idea                    ✅
Investigation           ✅
Evidence Collection     🔄
Observation             ⏳
Synthesis               ⏳
Validation              ⏳
Candidate Knowledge     ⏳
Promotion Proposal      ⏳
Knowledge Repository    ⏳
```

**Symbols**: ✅ Complete | 🔄 In Progress | ⏳ Pending

---

## Transition Criteria

### From Investigation to Evidence Collection

| Criterion | Requirement |
|-----------|-------------|
| Scope defined | Investigation has clear scope |
| Hypothesis stated | Testable hypothesis exists |
| Links created | Investigation links created |

### From Evidence Collection to Observation

| Criterion | Requirement |
|-----------|-------------|
| Runs complete | Minimum 3 runs executed |
| Evidence verified | All evidence has SHA-256 checksums |
| Raw data preserved | Evidence stored with experiment |

### From Observation to Synthesis

| Criterion | Requirement |
|-----------|-------------|
| Observations documented | All observations categorized |
| Evidence categorized | Evidence grouped by type |
| Patterns identified | Preliminary patterns noted |

### From Synthesis to Validation

| Criterion | Requirement |
|-----------|-------------|
| Synthesis complete | All evidence synthesized |
| Confidence assessed | Confidence level determined |
| Alternative explanations considered | Alternative interpretations noted |

### From Validation to Candidate Knowledge

| Criterion | Requirement |
|-----------|-------------|
| Validation passed | All validation criteria met |
| Conclusion clear | Final conclusion documented |
| Limitations stated | Limitations acknowledged |

### From Candidate Knowledge to Promotion Proposal

| Criterion | Requirement |
|-----------|-------------|
| Maturity assessed | Maturity level determined |
| Proposal prepared | Promotion proposal complete |
| Lessons documented | Lessons learned captured |

---

## Responsibilities by Stage

| Stage | Primary Owner | Supporting |
|-------|---------------|------------|
| IDEA | Contributor | - |
| INVESTIGATION | Investigation Lead | Laboratory |
| EVIDENCE COLLECTION | Laboratory | Engine |
| OBSERVATION | Laboratory | - |
| SYNTHESIS | Laboratory | Engine |
| VALIDATION | Laboratory | Governance |
| CANDIDATE KNOWLEDGE | Laboratory | - |
| PROMOTION PROPOSAL | Laboratory | Governance |
| KNOWLEDGE REPOSITORY | Human | - |

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Initial version | Architecture C |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [`RULES.md`](./RULES.md) | Core Laboratory rules |
| [`DIRECTORY.md`](./DIRECTORY.md) | Directory architecture |
| [`EVIDENCE.md`](./EVIDENCE.md) | Evidence management |
| [`VALIDATION.md`](./VALIDATION.md) | Validation protocols |
| [`PROMOTION.md`](./PROMOTION.md) | Knowledge promotion |

---

**Document Status**: PRODUCTION
**Authority**: Architecture C
