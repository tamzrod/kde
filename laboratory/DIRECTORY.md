# Laboratory Directory Architecture

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: PRODUCTION
**Authority**: Architecture C

---

## Overview

This document defines the directory architecture for the KDE Laboratory. It establishes the purpose, ownership, and lifecycle for every directory and artifact within the Laboratory.

---

## Canonical Directory Structure

```
laboratory/
├── README.md                    # Laboratory overview
├── BOOTSTRAP.md                 # Session entry point
├── RULES.md                     # Core Laboratory rules
├── WORKFLOW.md                  # Investigation lifecycle
├── DIRECTORY.md                 # This document
├── EVIDENCE.md                  # Evidence management
├── VALIDATION.md                # Validation protocols
├── PROMOTION.md                 # Knowledge promotion workflow
├── RUNTIME.md                   # Runtime interaction
├── ENGINES.md                   # Engine responsibilities
│
├── templates/                   # Standard templates
│   ├── investigation.md        # Investigation template
│   ├── evidence.md              # Evidence template
│   ├── observation.md           # Observation template
│   ├── synthesis.md             # Synthesis template
│   ├── validation.md            # Validation template
│   ├── report.md                # Final report template
│   └── promotion.md             # Promotion proposal template
│
├── questions/                   # Research questions tracker
│   ├── README.md
│   └── index.md
│
├── investigations/              # Investigation registry (OWNER: Investigation Lead)
│   ├── INV-001/
│   │   ├── investigation.md     # Research question and scope
│   │   ├── hypothesis.md        # Hypothesis (if defined)
│   │   ├── analysis.md          # Analysis
│   │   ├── conclusion.md        # Conclusion
│   │   ├── lessons-learned.md   # Lessons learned
│   │   ├── index.md            # Experiment index
│   │   └── links/              # Links to experiments
│   │       └── LAB-001.md
│   ├── INV-002/
│   └── INV-NNN/
│
├── experiments/                 # Experiment registry (OWNER: Laboratory)
│   ├── LAB-001/
│   │   ├── experiment.md       # Experiment plan
│   │   ├── TRACKER.md         # Experiment tracking
│   │   ├── runs/              # Execution runs
│   │   │   ├── RUN-001/
│   │   │   │   ├── experiment.md
│   │   │   │   ├── analysis.md
│   │   │   │   ├── scorecard.md
│   │   │   │   └── metadata.yaml
│   │   │   └── RUN-002/
│   │   ├── evidence/          # Experiment-specific evidence
│   │   │   └── references.md
│   │   ├── statistics/        # Statistical analysis
│   │   │   └── analysis.md
│   │   ├── synthesis/         # Cross-run synthesis
│   │   │   ├── summary.md
│   │   │   ├── patterns.md
│   │   │   ├── confidence.md
│   │   │   └── recommendation.md
│   │   └── metadata/
│   │       └── investigation.md  # Links to investigation
│   ├── LAB-002/
│   └── LAB-NNN/
│
├── evidence/                    # Evidence registry (links only) (OWNER: Laboratory)
│   ├── LAB-001/
│   │   └── index.md           # Points to experiment evidence
│   └── LAB-002/
│       └── index.md
│
├── validations/                 # Validation artifacts (OWNER: Governance)
│   ├── VAL-001/
│   │   └── validation.md
│   └── VAL-NNN/
│
└── governance/                  # Governance documents (OWNER: Governance)
    ├── promotion-rules.md
    └── version-history.md
```

---

## Directory Purpose

### Root Directory

| File | Purpose | Owner | Lifecycle |
|------|---------|-------|-----------|
| README.md | Laboratory overview | All | Permanent |
| BOOTSTRAP.md | Session entry point | All | Permanent |
| RULES.md | Core Laboratory rules | Governance | Permanent |
| WORKFLOW.md | Investigation lifecycle | All | Permanent |
| DIRECTORY.md | Directory architecture | All | Permanent |
| EVIDENCE.md | Evidence management | All | Permanent |
| VALIDATION.md | Validation protocols | All | Permanent |
| PROMOTION.md | Knowledge promotion | All | Permanent |
| RUNTIME.md | Runtime interaction | All | Permanent |
| ENGINES.md | Engine responsibilities | All | Permanent |

---

### templates/ Directory

**Purpose**: Standard templates for Laboratory artifacts.

**Owner**: All contributors

**Lifecycle**: Templates are created once and reused across investigations.

**Files**:

| File | Purpose | Usage |
|------|---------|-------|
| investigation.md | Investigation structure | Every investigation |
| evidence.md | Evidence reference structure | Every experiment |
| observation.md | Observation documentation | Evidence collection |
| synthesis.md | Synthesis documentation | After observation |
| validation.md | Validation report | Validation stage |
| report.md | Final report | Conclusion |
| promotion.md | Promotion proposal | Promotion stage |

---

### questions/ Directory

**Purpose**: Track research questions that warrant investigation.

**Owner**: All contributors

**Lifecycle**: Questions are tracked until assigned to an investigation.

**Files**:

| File | Purpose | Owner |
|------|---------|-------|
| README.md | Questions overview | All |
| index.md | Master question list | All |

**Question States**:

| State | Description |
|-------|-------------|
| PROPOSED | Question identified |
| ASSIGNED | Assigned to investigation |
| INVESTIGATING | Under active investigation |
| ANSWERED | Answered by investigation |
| DEFERRED | Deferred for later |

---

### investigations/ Directory

**Purpose**: Scientific ownership (WHY) - Research questions, hypotheses, scope, and scientific purpose.

**Owner**: Investigation Lead

**Lifecycle**: Investigation exists from creation until promotion or archival.

**Subdirectories**:

| Subdirectory | Purpose | Required |
|--------------|---------|----------|
| investigation.md | Research question and scope | Yes |
| hypothesis.md | Testable hypothesis | No |
| analysis.md | Analysis findings | No |
| conclusion.md | Final conclusion | No |
| lessons-learned.md | Lessons from investigation | No |
| index.md | Experiment index | Yes |
| links/ | Links to experiments | Yes |

**Investigation States**:

| State | Description |
|-------|-------------|
| DRAFT | Investigation being planned |
| ACTIVE | Investigation in progress |
| COMPLETE | Investigation concluded |
| PROMOTED | Knowledge promoted |

**Lifecycle**:

```
DRAFT → ACTIVE → COMPLETE → PROMOTED
                   ↓
               ARCHIVED
```

---

### experiments/ Directory

**Purpose**: Execution ownership (HOW) - Self-contained, reproducible experiment units.

**Owner**: Laboratory

**Lifecycle**: Experiment exists from design until archival.

**Subdirectories**:

| Subdirectory | Purpose | Required |
|--------------|---------|----------|
| experiment.md | Experiment plan | Yes |
| TRACKER.md | Experiment tracking | Yes |
| runs/ | Execution runs | Yes |
| evidence/ | Experiment-specific evidence | Yes |
| statistics/ | Statistical analysis | No |
| synthesis/ | Cross-run synthesis | No |
| metadata/ | Links to investigation | Yes |

**Experiment States**:

| State | Description |
|-------|-------------|
| PLANNED | Designed but not executed |
| ACTIVE | Running experiments |
| COMPLETE | All runs executed |
| SUSPENDED | Temporarily paused |

**Lifecycle**:

```
PLANNED → ACTIVE → COMPLETE → ARCHIVED
                ↓
            SUSPENDED
```

---

### evidence/ Directory

**Purpose**: Evidence registry containing links to evidence (not the evidence itself).

**Owner**: Laboratory

**Lifecycle**: Registry entries persist; evidence persists with experiments.

**Storage Principle**: Evidence is stored with the experiment that produced it. The evidence/ directory contains only index files that reference experiment evidence.

**Evidence Types**:

| Type | Description | Storage Location |
|------|-------------|------------------|
| log | System-generated records | /experiments/LAB-XXX/evidence/logs/ |
| measurement | Quantitative data | /experiments/LAB-XXX/evidence/measurements/ |
| screenshot | Visual captures | /experiments/LAB-XXX/evidence/media/ |
| commit | Version control records | /experiments/LAB-XXX/evidence/repositories/ |
| document | Structured text | /experiments/LAB-XXX/evidence/documents/ |
| telemetry | Automated data collection | /experiments/LAB-XXX/evidence/telemetry/ |
| photo | Physical records | /experiments/LAB-XXX/evidence/media/ |
| video | Temporal records | /experiments/LAB-XXX/evidence/media/ |
| notes | Human observations | /experiments/LAB-XXX/evidence/notes/ |

---

### validations/ Directory

**Purpose**: Formal validation artifacts for cross-experiment validation.

**Owner**: Governance

**Lifecycle**: Validation exists from creation until archived.

---

### governance/ Directory

**Purpose**: Governance documents for the Laboratory.

**Owner**: Governance

**Files**:

| File | Purpose |
|------|---------|
| promotion-rules.md | Knowledge promotion criteria |
| version-history.md | Laboratory version history |

---

## Artifact Classification

### Temporary Artifacts

| Artifact | Directory | Lifecycle | Disposition |
|----------|-----------|-----------|-------------|
| Raw evidence | experiments/LAB-XXX/evidence/ | Experiment duration | Preserved with experiment |
| Notes | experiments/LAB-XXX/runs/RUN-XXX/ | Investigation | Archived or discarded |
| Drafts | investigations/INV-XXX/ | Pre-validation | Revised or discarded |
| Comparisons | experiments/LAB-XXX/synthesis/ | Active period | Archived |
| Run records | experiments/LAB-XXX/runs/ | Permanent | Preserved indefinitely |

### Permanent Artifacts

| Artifact | Directory | Lifecycle | Disposition |
|----------|-----------|-----------|-------------|
| Validated knowledge | /knowledge/ | Indefinite | Never deleted |
| Design rules | /knowledge/ | Indefinite | Never deleted |
| Reference architecture | /knowledge/ | Indefinite | Never deleted |
| Methodology | /knowledge/ | Indefinite | Never deleted |
| Investigation conclusions | investigations/INV-XXX/conclusion.md | Indefinite | Preserved |
| Experiment synthesis | experiments/LAB-XXX/synthesis/ | Indefinite | Preserved |

---

## Ownership Matrix

| Directory | Primary Owner | Can Modify | Cannot Modify |
|-----------|---------------|------------|---------------|
| templates/ | All | All contributors | - |
| questions/ | All | All contributors | - |
| investigations/ | Investigation Lead | Investigation Lead, Laboratory | - |
| experiments/ | Laboratory | Laboratory, Investigation Lead | - |
| evidence/ | Laboratory | Laboratory | - |
| validations/ | Governance | Governance | Laboratory |
| governance/ | Governance | Governance | - |

---

## Traceability

Architecture C enforces bidirectional links:

| From | To | Link Type |
|------|-----|-----------|
| Question | Investigation | Owns |
| Investigation | Experiments | Links (`links/` directory) |
| Experiment | Investigation | Metadata |
| Run | Experiment | Owns |
| Evidence | Run | Owns |

---

## Naming Conventions

### Investigation Names

```
INV-XXX
```
Where XXX is a sequential number (001, 002, 003, ...)

### Experiment Names

```
LAB-XXX
```
Where XXX is a sequential number (001, 002, 003, ...)

### Run Names

```
RUN-XXX
```
Where XXX is a sequential number within the experiment (001, 002, 003, ...)

### Evidence Names

```
EV-XXX
```
Where XXX is a sequential number within the experiment (001, 002, 003, ...)

### Validation Names

```
VAL-XXX
```
Where XXX is a sequential number (001, 002, 003, ...)

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Initial version | Architecture C |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [`ARCHITECTURE-C.md`](./ARCHITECTURE-C.md) | Architecture C specification |
| [`WORKFLOW.md`](./WORKFLOW.md) | Investigation lifecycle |
| [`EVIDENCE.md`](./EVIDENCE.md) | Evidence management |

---

**Document Status**: PRODUCTION
**Authority**: Architecture C
