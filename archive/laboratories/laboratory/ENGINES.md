# Engine Responsibilities

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: PRODUCTION
**Authority**: Architecture C

---

## Overview

This document defines how Engines interact with the Laboratory. Engines define methodology; the Laboratory executes experiments under Engine authority.

---

## Engine Authority Principles

| Principle | Description |
|-----------|-------------|
| **Methodology Definition** | Engines define methodology; Laboratory executes |
| **Authority Separation** | Laboratory never defines its own methodology |
| **Experiment Ownership** | Laboratory owns experiment execution |
| **Historical Preservation** | Experiments reference the Engine that executed them |

---

## Authority Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      ENGINE AUTHORITY                       │
└─────────────────────────────────────────────────────────────┘

   ┌──────────────────────────────────────────────────────┐
   │                   KDE ENGINE                          │
   │                                                      │
   │  Defines methodology                                 │
   │  Sets experiment standards                           │
   │  Establishes validation requirements                 │
   │  Discovers better methodologies                     │
   └──────────────────────────┬───────────────────────────┘
                             │ Authoritative Source
                             ▼
   ┌──────────────────────────────────────────────────────┐
   │                   LABORATORY                         │
   │                                                      │
   │  Executes experiments                               │
   │  Collects evidence                                  │
   │  Reports findings                                   │
   │  Does NOT define methodology                        │
   └──────────────────────────────────────────────────────┘
```

---

## Engine Responsibilities

### What Engines Define

| Responsibility | Description | Laboratory Role |
|----------------|-------------|-----------------|
| **Methodology** | How experiments are conducted | Execute |
| **Standards** | Experiment standards | Follow |
| **Validation Requirements** | What makes evidence valid | Verify |
| **Analysis Patterns** | How evidence is analyzed | Apply |
| **Knowledge Models** | What constitutes knowledge | Model |

### What Engines Must Not Do

| Prohibition | Rationale |
|-------------|-----------|
| Execute experiments directly | Laboratory owns execution |
| Modify Laboratory artifacts | Separation of concerns |
| Access evidence directly | Laboratory manages evidence |
| Promote knowledge | Human-only action |

---

## Laboratory Responsibilities

### What the Laboratory Executes

| Responsibility | Description | Engine Role |
|----------------|-------------|-------------|
| **Experiment Execution** | Run experiments per Engine methodology | Under Engine |
| **Evidence Collection** | Gather evidence per Engine standards | Following Engine |
| **Observation Documentation** | Document observations per Engine guidelines | Following Engine |
| **Reporting** | Report findings per Engine format | Following Engine |

### What the Laboratory Must Not Do

| Prohibition | Rationale |
|-------------|-----------|
| Define methodology | Engine defines |
| Set experiment standards | Engine sets |
| Certify evidence validity | Engine certifies |
| Approve knowledge | Human approves |
| Promote knowledge | Human promotes |

---

## Engine-Laboratory Interaction

### Interaction Model

```
┌─────────────────────────────────────────────────────────────┐
│                    ENGINE-LABORATORY INTERACTION             │
└─────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────┐
    │ ENGINE                                              │
    │                                                     │
    │ 1. Defines experiment methodology                   │
    │ 2. Sets validation requirements                    │
    │ 3. Provides analysis patterns                      │
    │ 4. Validates knowledge objects                     │
    └─────────────────────────────────────────────────────┘
                       │
                       │ Provides methodology
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ LABORATORY                                          │
    │                                                     │
    │ 1. Receives methodology                            │
    │ 2. Executes experiments                            │
    │ 3. Collects evidence                              │
    │ 4. Reports findings                                │
    └─────────────────────────────────────────────────────┘
                       │
                       │ Provides evidence
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ ENGINE                                              │
    │                                                     │
    │ 5. Analyzes evidence                               │
    │ 6. Generates knowledge objects                     │
    │ 7. Validates knowledge                             │
    │ 8. Reports analysis                                │
    └─────────────────────────────────────────────────────┘
```

---

## Engine Interface

Every KDE Engine MUST implement the standard interface:

### Required Methods

| Method | Description | Laboratory Use |
|--------|-------------|----------------|
| `Initialize()` | Initialize the engine | Runtime calls during startup |
| `Analyze(evidence)` | Process evidence into knowledge | Laboratory calls with evidence |
| `Validate(knowledge)` | Validate knowledge object | Laboratory calls before proposal |
| `GenerateKnowledge()` | Create knowledge from pipeline | Laboratory calls after analysis |
| `GenerateReport()` | Format findings for consumption | Laboratory calls for reporting |
| `Capabilities()` | Return engine capabilities | Runtime calls for discovery |
| `Version()` | Return engine version | Runtime calls for verification |
| `Metadata()` | Return engine metadata | Runtime calls for status |

### Interface Definition

See: [`/engines/interface.md`](/workspace/project/kde/engines/interface.md)

---

## What Engines May Create

### Engine-Created Artifacts

| Artifact | Location | Description |
|----------|----------|-------------|
| Analysis results | experiments/LAB-XXX/synthesis/ | Engine analysis output |
| Knowledge objects | experiments/LAB-XXX/knowledge/ | Candidate knowledge |
| Validation reports | validations/VAL-XXX/ | Validation output |
| Reports | Various | Formatted findings |

### Engine Creation Rules

| Rule | Description |
|------|-------------|
| Artifacts follow templates | Engine output follows Laboratory templates |
| Metadata required | Engine output includes metadata |
| No direct knowledge promotion | Engine cannot promote to /knowledge/ |
| Evidence links required | Engine output links to evidence |

---

## What Engines May Modify

### Engine-Modifiable Artifacts

| Artifact | Conditions | Limitations |
|----------|------------|--------------|
| Experiment runs | During execution | Cannot modify after completion |
| Synthesis documents | Engine-generated content | Laboratory reviews final |
| Analysis files | Engine analysis output | Laboratory can add annotations |

### Engine Modification Rules

| Rule | Description |
|------|-------------|
| Original preserved | Original evidence never modified |
| Metadata updated | Engine updates experiment metadata |
| Links maintained | Engine maintains bidirectional links |
| Audit trail | All modifications logged |

---

## What Engines Must Never Modify

### Prohibited Modifications

| Artifact | Prohibition | Rationale |
|----------|-------------|-----------|
| **Raw Evidence** | Never | Evidence must be preserved |
| **Investigation files** | Never | Investigation owns its files |
| **Knowledge repository** | Never | Human-only modifications |
| **Laboratory rules** | Never | Rules are fixed |
| **Historical experiments** | Never | Historical integrity |

### Evidence Integrity

| Rule | Description |
|------|-------------|
| **No deletion** | Evidence is never deleted |
| **No modification** | Raw evidence is never modified |
| **Reference only** | Engine references evidence, not copies |
| **Checksum verification** | Evidence integrity verified |

---

## Experiment Metadata

Every experiment MUST include Engine metadata:

```yaml
Engine:
  ID: KDE-ENGINE-002
  Version: 0.1.0
  Codename: Beta
  Status: Active

Execution:
  Start: YYYY-MM-DDTHH:MM:SSZ
  End: YYYY-MM-DDTHH:MM:SSZ
  Duration: PT1H30M
  
Output:
  Analysis: Path
  Knowledge: Path
  Validation: Path
  Report: Path
```

---

## Engine Selection

### Selection Criteria

| Criterion | Description |
|-----------|-------------|
| **Engine Status** | Must be Active |
| **Methodology Match** | Engine methodology matches investigation needs |
| **Capability Match** | Engine capabilities match experiment requirements |
| **Compatibility** | Engine compatible with configured Seed |

### Available Engines

| Engine ID | Version | Codename | Status | Purpose |
|-----------|---------|----------|--------|---------|
| **KDE-ENGINE-002** | 0.1.0 | Beta | Active | Contextual knowledge discovery |
| KDE-ENGINE-001 | 0.1.0 | Alpha | Historical | Pattern discovery (legacy) |

### Engine Selection Matrix

| Investigation Type | Recommended Engine | Alternative |
|--------------------|-------------------|-------------|
| Knowledge validation | Beta | Alpha |
| Methodology testing | Beta | Gamma |
| Cross-engine comparison | Any | - |
| Historical reference | Alpha | - |

---

## Engine Versioning

### Version Management

| Rule | Description |
|------|-------------|
| **Semantic versioning** | Engines use semantic versioning |
| **Historical preservation** | Experiments reference specific version |
| **No automatic upgrade** | Experiments not upgraded with Engine |
| **Version tracking** | All Engine versions tracked |

### Version References

Every experiment records the Engine version:

```yaml
Engine:
  ID: KDE-ENGINE-002
  Version: 0.1.0  # Specific version used
  Loaded: YYYY-MM-DDTHH:MM:SSZ
```

---

## Engine Status

### Status Values

| Status | Description | Laboratory Action |
|--------|-------------|-------------------|
| **Active** | Currently usable | Use for new experiments |
| **Historical** | Past version, reference only | Use for comparison |
| **Deprecated** | Not recommended | Avoid for new work |
| **Experimental** | Under development | Use with caution |

### Status Transitions

| Current | Next | Authority |
|---------|------|-----------|
| Experimental | Active | Governance |
| Active | Historical | Governance |
| Active | Deprecated | Governance |

---

## Error Handling

### Engine Errors

| Error | Description | Laboratory Response |
|-------|-------------|---------------------|
| InitializationError | Engine failed to initialize | Abort experiment |
| ProcessingError | Engine pipeline failed | Log and retry |
| ValidationError | Evidence invalid | Skip invalid evidence |
| ResourceError | Insufficient resources | Reduce scope |

### Laboratory Response Protocol

1. **Detect Error**
   - Engine returns error code
   - Error logged

2. **Assess Error**
   - Determine if recoverable
   - Determine impact

3. **Respond**
   - Retry if recoverable
   - Report if not

4. **Document**
   - Log error details
   - Update experiment metadata

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Initial version | Architecture C |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [`/engines/interface.md`](/workspace/project/kde/engines/interface.md) | Engine interface specification |
| [`/engines/current.md`](/workspace/project/kde/engines/current.md) | Current Engine registry |
| [`RULES.md`](./RULES.md) | Core Laboratory rules |
| [`WORKFLOW.md`](./WORKFLOW.md) | Investigation lifecycle |

---

**Document Status**: PRODUCTION
**Authority**: Architecture C
**Key Principle**: Engines define methodology; Laboratory executes. This separation is fundamental.
