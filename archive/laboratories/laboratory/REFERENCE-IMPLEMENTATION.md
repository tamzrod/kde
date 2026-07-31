# Architecture C Reference Implementation

**Document Version**: 1.0.0
**Date**: 2026-07-20T14:00:00Z
**Status**: OFFICIAL (Frozen)

---

## Purpose

This document provides the canonical reference implementation of Architecture C. It serves as the authoritative guide for implementing and validating Architecture C compliance.

---

## Canonical Directory Structure

```
laboratory/
├── README.md                          # Laboratory overview
├── ARCHITECTURE-C.md                  # Architecture specification
├── VERSION.md                         # Version management
├── CHANGELOG.md                       # Change history
├── REFERENCE-IMPLEMENTATION.md         # This document
│
├── questions/                         # Question tracker
│   ├── README.md
│   └── index.md                      # Master question list
│
├── investigations/                    # Scientific ownership (WHY)
│   └── INV-XXX/
│       ├── investigation.md          # REQUIRED: Research question
│       ├── hypothesis.md             # OPTIONAL: Hypothesis
│       ├── analysis.md               # OPTIONAL: Analysis
│       ├── conclusion.md             # OPTIONAL: Conclusion
│       ├── lessons-learned.md        # OPTIONAL: Lessons
│       ├── index.md                 # REQUIRED: Experiment index
│       └── links/                   # REQUIRED: Links to experiments
│           └── LAB-XXX.md
│
├── experiments/                      # Execution ownership (HOW)
│   └── LAB-XXX/
│       ├── experiment.md             # REQUIRED: Experiment plan
│       ├── TRACKER.md                # REQUIRED: Experiment tracking
│       ├── runs/                     # REQUIRED: Execution runs
│       │   └── RUN-XXX/
│       │       ├── experiment.md     # REQUIRED: Run experiment
│       │       ├── analysis.md        # REQUIRED: Run analysis
│       │       ├── scorecard.md      # REQUIRED: Run scorecard
│       │       ├── recommendation.md # REQUIRED: Run recommendation
│       │       └── metadata.yaml      # REQUIRED: Run metadata
│       ├── evidence/                 # REQUIRED: Experiment evidence
│       │   └── references.md
│       ├── statistics/               # OPTIONAL: Statistical analysis
│       │   └── analysis.md
│       ├── synthesis/                 # OPTIONAL: Cross-run synthesis
│       │   ├── summary.md
│       │   ├── patterns.md
│       │   ├── confidence.md
│       │   └── recommendation.md
│       └── metadata/                 # REQUIRED: Investigation links
│           └── investigation.md
│
├── evidence/                         # Evidence registry (links)
│   └── LAB-XXX/
│       └── index.md
│
├── templates/                        # Document templates
│   ├── investigation-template.md
│   ├── experiment-template.md
│   ├── run-template.md
│   └── evidence-reference-template.md
│
└── governance/                       # Governance documents
    ├── promotion-rules.md
    └── version-history.md
```

---

## Required Artifacts

### Every Investigation MUST Have

| Artifact | Location | Required |
|----------|----------|----------|
| investigation.md | investigations/INV-XXX/ | YES |
| index.md | investigations/INV-XXX/ | YES |
| links/ directory | investigations/INV-XXX/ | YES |
| links/*.md | investigations/INV-XXX/links/ | YES (for each experiment) |

### Every Experiment MUST Have

| Artifact | Location | Required |
|----------|----------|----------|
| experiment.md | experiments/LAB-XXX/ | YES |
| TRACKER.md | experiments/LAB-XXX/ | YES |
| runs/ directory | experiments/LAB-XXX/ | YES |
| evidence/ directory | experiments/LAB-XXX/ | YES |
| metadata/ directory | experiments/LAB-XXX/ | YES |
| metadata/investigation.md | experiments/LAB-XXX/metadata/ | YES |

### Every Run MUST Have

| Artifact | Location | Required |
|----------|----------|----------|
| experiment.md | experiments/LAB-XXX/runs/RUN-XXX/ | YES |
| analysis.md | experiments/LAB-XXX/runs/RUN-XXX/ | YES |
| scorecard.md | experiments/LAB-XXX/runs/RUN-XXX/ | YES |
| recommendation.md | experiments/LAB-XXX/runs/RUN-XXX/ | YES |
| metadata.yaml | experiments/LAB-XXX/runs/RUN-XXX/ | YES |

---

## Metadata Standards

### Investigation Metadata

```yaml
ID: INV-XXX
Title: [Title]
Version: X.Y.Z
Status: ACTIVE|COMPLETE|PROMOTED
Author: [Author]
Created: YYYY-MM-DDTHH:MM:SSZ
Modified: YYYY-MM-DDTHH:MM:SSZ
Experiments: [Count]
```

### Experiment Metadata

```yaml
ID: LAB-XXX
Investigation: INV-XXX
Version: X.Y.Z
Status: DRAFT|ACTIVE|COMPLETE|FAILED
Engine: [Engine ID]
Seed: [Seed ID]
Created: YYYY-MM-DDTHH:MM:SSZ
Modified: YYYY-MM-DDTHH:MM:SSZ
Runs: [Count]
```

### Run Metadata

```yaml
ID: RUN-XXX
Experiment: LAB-XXX
Version: X.Y.Z
Status: PENDING|IN_PROGRESS|COMPLETE|FAILED
Author: [Author]
Timestamp: YYYY-MM-DDTHH:MM:SSZ
Duration: [Seconds]
```

---

## Link Format

### Investigation → Experiment Link (links/LAB-XXX.md)

```markdown
# Link: INV-XXX → LAB-XXX

**Investigation**: INV-XXX
**Experiment**: LAB-XXX
**Linked**: YYYY-MM-DDTHH:MM:SSZ

## Relationship

[Describe how this experiment relates to the investigation]

## Key Findings

[Summary of experiment results]
```

### Experiment → Investigation Link (metadata/investigation.md)

```markdown
# Investigation Link: LAB-XXX

**Experiment**: LAB-XXX
**Investigation**: INV-XXX
**Linked**: YYYY-MM-DDTHH:MM:SSZ

## Investigation Summary

[Brief summary of the investigation]

## How This Experiment Addresses the Investigation

[How this experiment tests the investigation's question]
```

---

## Traceability Matrix

| From | To | Link Type |
|------|-----|-----------|
| Question | Investigation | Owns |
| Investigation | Experiments | links/ directory |
| Experiment | Investigation | metadata/ directory |
| Run | Experiment | Owns |
| Evidence | Run | Owns |

---

## Compliance Checklist

### Investigation Compliance

- [ ] investigation.md exists
- [ ] index.md exists
- [ ] links/ directory exists
- [ ] All experiments are linked
- [ ] Metadata is complete
- [ ] Timestamps are ISO-8601 format

### Experiment Compliance

- [ ] experiment.md exists
- [ ] TRACKER.md exists
- [ ] runs/ directory exists
- [ ] evidence/ directory exists
- [ ] metadata/investigation.md exists
- [ ] Investigation link is valid
- [ ] Metadata is complete
- [ ] Timestamps are ISO-8601 format

### Run Compliance

- [ ] experiment.md exists
- [ ] analysis.md exists
- [ ] scorecard.md exists
- [ ] recommendation.md exists
- [ ] metadata.yaml exists
- [ ] Timestamps are ISO-8601 format

---

## Implementation Examples

### Example Investigation (INV-001)

```
investigations/
└── INV-001/
    ├── investigation.md
    ├── index.md
    └── links/
        ├── LAB-001.md
        ├── LAB-002.md
        ├── LAB-003.md
        └── LAB-004.md
```

### Example Experiment (LAB-001)

```
experiments/
└── LAB-001/
    ├── experiment.md
    ├── TRACKER.md
    ├── runs/
    │   ├── RUN-001/
    │   │   ├── experiment.md
    │   │   ├── analysis.md
    │   │   ├── scorecard.md
    │   │   ├── recommendation.md
    │   │   └── metadata.yaml
    │   └── RUN-002/
    │       └── ...
    ├── evidence/
    │   └── references.md
    ├── statistics/
    │   └── analysis.md
    ├── synthesis/
    │   ├── summary.md
    │   ├── patterns.md
    │   ├── confidence.md
    │   └── recommendation.md
    └── metadata/
        └── investigation.md
```

---

## Validation

To validate Architecture C compliance:

1. Run compliance checker script
2. Verify all required artifacts exist
3. Verify all links are valid
4. Verify metadata completeness
5. Verify timestamp formats

See: [`../governance/VALIDATION.md`](../governance/VALIDATION.md)

---

## Reference

- Architecture: [`ARCHITECTURE-C.md`](ARCHITECTURE-C.md)
- Version: [`VERSION.md`](VERSION.md)
- Governance: [`governance/promotion-rules.md`](governance/promotion-rules.md)
