# Runtime Interaction

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: PRODUCTION
**Authority**: Architecture C

---

## Overview

This document defines how the KDE Runtime interacts with the Laboratory. The Runtime provides the execution context for all Laboratory activities.

---

## Runtime Overview

The KDE Runtime is the execution environment that:

1. **Initializes** the Laboratory context
2. **Discovers** active investigations
3. **Tracks** investigation progress
4. **Archives** completed investigations
5. **Generates** promotion proposals

---

## Runtime Initialization

### Initialization Procedure

```
┌─────────────────────────────────────────────────────────────┐
│                    RUNTIME INITIALIZATION                   │
└─────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────┐
    │ STEP 1: Bootstrap                                    │
    │ Read BOOTSTRAP.md                                    │
    └─────────────────────────────────────────────────────┘
                       │
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 2: Acknowledge Laboratory Rules                 │
    │ Read RULES.md                                        │
    └─────────────────────────────────────────────────────┘
                       │
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 3: Load Runtime Configuration                   │
    │ Read /governance/runtime/defaults.yaml               │
    └─────────────────────────────────────────────────────┘
                       │
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 4: Check Session Override                       │
    │ Check for experiment/investigation override          │
    └─────────────────────────────────────────────────────┘
                       │
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 5: Load Engine                                  │
    │ Load configured Engine                               │
    └─────────────────────────────────────────────────────┘
                       │
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 6: Load Seed                                    │
    │ Load configured Seed                                 │
    └─────────────────────────────────────────────────────┘
                       │
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 7: Initialize Runtime State                     │
    │ State: UNINITIALIZED → READY                        │
    └─────────────────────────────────────────────────────┘
                       │
                       ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 8: Transfer Authority to Engine                 │
    │ Engine now controls execution                        │
    └─────────────────────────────────────────────────────┘
```

### Configuration

**Default Configuration**:

| Component | Default | Override |
|-----------|---------|----------|
| Engine | KDE-ENGINE-002 (Beta) | Experiment/Investigation |
| Seed | SEED-001 (Genesis) | Experiment/Investigation |

### Initialization Checklist

| Step | Required | Verified |
|------|----------|----------|
| Bootstrap read | Yes | ☐ |
| Laboratory Rules acknowledged | Yes | ☐ |
| Runtime configuration loaded | Yes | ☐ |
| Session override checked | Yes | ☐ |
| Engine loaded | Yes | ☐ |
| Seed loaded | Yes | ☐ |
| State: READY | Yes | ☐ |

---

## Investigation Discovery

### Discovery Procedure

The Runtime discovers investigations by:

1. **Scanning** the `investigations/` directory
2. **Reading** investigation metadata
3. **Identifying** active investigations
4. **Cataloging** investigation state

### Discovery Output

```yaml
discover:
  timestamp: YYYY-MM-DDTHH:MM:SSZ
  investigations:
    - id: INV-001
      status: ACTIVE
      last_updated: YYYY-MM-DDTHH:MM:SSZ
      linked_experiments:
        - LAB-001
        - LAB-002
    - id: INV-002
      status: COMPLETE
      last_updated: YYYY-MM-DDTHH:MM:SSZ
      linked_experiments:
        - LAB-003
```

### Investigation Index

**Location**: `investigations/index.md`

```markdown
# Investigation Index

**Total Investigations**: 31
**Active**: 5
**Complete**: 24
**Promoted**: 2

---

## Active Investigations

| ID | Title | Status | Last Updated | Experiments |
|----|-------|--------|--------------|-------------|
| INV-029 | [Title] | ACTIVE | 2026-07-21 | LAB-011 |
| INV-030 | [Title] | ACTIVE | 2026-07-21 | - |

## Complete Investigations

| ID | Title | Status | Completed | Experiments |
|----|-------|--------|-----------|-------------|
| INV-001 | [Title] | COMPLETE | 2026-07-15 | LAB-001 |
| INV-002 | [Title] | COMPLETE | 2026-07-18 | LAB-002 |
```

---

## Investigation Tracking

### Tracking State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INVESTIGATION STATE MACHINE                              │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────┐
    │ DRAFT                                                            │
    │                                                                  │
    │ Investigation being planned                                       │
    └─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ ACTIVE                                                           │
    │                                                                  │
    │ Investigation in progress                                         │
    │ - Evidence collection                                            │
    │ - Observation                                                    │
    │ - Synthesis                                                      │
    │ - Validation                                                     │
    └─────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
    ┌─────────────────────────────────┐ ┌─────────────────────────────────┐
    │ COMPLETE                        │ │ SUSPENDED                      │
    │                                  │ │                                 │
    │ Investigation concluded          │ │ Investigation paused           │
    └─────────────────────────────────┘ └─────────────────────────────────┘
                    │
                    ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ PROMOTED                                                          │
    │                                                                  │
    │ Knowledge promoted to /knowledge/                                 │
    └─────────────────────────────────────────────────────────────────┘
```

### State Transitions

| Current State | Next State | Trigger |
|---------------|------------|---------|
| DRAFT | ACTIVE | Investigation begins |
| ACTIVE | COMPLETE | All stages finished |
| ACTIVE | SUSPENDED | Investigation paused |
| SUSPENDED | ACTIVE | Investigation resumed |
| COMPLETE | PROMOTED | Knowledge promoted |
| COMPLETE | ARCHIVED | Investigation archived |

---

## Investigation Archival

### Archive Criteria

An investigation is archived when:

| Criterion | Description |
|-----------|-------------|
| Status | COMPLETE or PROMOTED |
| Age | >6 months since last update |
| Active Links | No active experiments |

### Archive Procedure

1. **Verify Archive Criteria**
   - Investigation is COMPLETE or PROMOTED
   - No active experiments
   - Sufficient age

2. **Prepare Archive Package**
   - Copy investigation directory
   - Update all indices
   - Verify all links

3. **Update Status**
   - Set status to ARCHIVED
   - Update archive index
   - Notify Governance

### Archive Index

**Location**: `investigations/archive/index.md`

```markdown
# Investigation Archive

**Total Archived**: 15
**Date Range**: 2026-01-01 to 2026-07-21

---

## Archived Investigations

| ID | Title | Archived | Original Status | Knowledge ID |
|----|-------|----------|-----------------|--------------|
| INV-001 | [Title] | 2026-07-15 | COMPLETE | KDE-001 |
| INV-002 | [Title] | 2026-07-18 | PROMOTED | KDE-002 |
```

---

## Promotion Proposal Generation

### Generation Procedure

When an investigation is COMPLETE:

1. **Assess Maturity**
   - Count runs and configurations
   - Calculate agreement rates
   - Determine maturity level

2. **Generate Proposal**
   - Use promotion template
   - Include all evidence
   - Document confidence

3. **Submit to Governance**
   - Create proposal file
   - Update investigation status
   - Await human approval

### Proposal Location

```
investigations/INV-XXX/promotion.md
```

---

## Runtime Functions

### Function Summary

| Function | Description | Owner |
|----------|-------------|-------|
| `initialize()` | Initialize Runtime and Laboratory context | Runtime |
| `discover()` | Discover active investigations | Runtime |
| `track()` | Track investigation progress | Runtime |
| `archive()` | Archive completed investigations | Runtime |
| `generate_proposal()` | Generate promotion proposal | Runtime |

### Function Specifications

#### initialize()

**Purpose**: Initialize the Runtime and Laboratory context.

**Parameters**: None

**Returns**: Runtime state

```yaml
initialize:
  description: Initialize Runtime and Laboratory context
  parameters: []
  returns:
    state: READY
    engine: Engine ID
    seed: Seed ID
    timestamp: ISO8601
```

#### discover()

**Purpose**: Discover active investigations.

**Parameters**: None

**Returns**: List of investigations

```yaml
discover:
  description: Discover active investigations
  parameters: []
  returns:
    investigations:
      - id: string
        status: string
        last_updated: timestamp
        linked_experiments: [string]
```

#### track()

**Purpose**: Track investigation progress.

**Parameters**:
- investigation_id: Investigation to track

**Returns**: Investigation state

```yaml
track:
  description: Track investigation progress
  parameters:
    - name: investigation_id
      type: string
      required: true
  returns:
    id: string
    status: string
    stage: string
    progress: percentage
    linked_experiments: [string]
```

#### archive()

**Purpose**: Archive completed investigations.

**Parameters**:
- investigation_id: Investigation to archive

**Returns**: Archive confirmation

```yaml
archive:
  description: Archive completed investigation
  parameters:
    - name: investigation_id
      type: string
      required: true
  returns:
    id: string
    archived: boolean
    archive_location: string
```

#### generate_proposal()

**Purpose**: Generate promotion proposal.

**Parameters**:
- investigation_id: Investigation to generate proposal for

**Returns**: Proposal document

```yaml
generate_proposal:
  description: Generate knowledge promotion proposal
  parameters:
    - name: investigation_id
      type: string
      required: true
  returns:
    proposal_id: string
    location: string
    maturity_level: integer
    confidence: string
```

---

## Runtime-Laboratory Interface

### Interface Definition

```
┌─────────────────────────────────────────────────────────────┐
│                    RUNTIME-LABORATORY INTERFACE             │
└─────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────┐
    │ RUNTIME                                             │
    │                                                     │
    │ Provides:                                           │
    │ - Initialization                                    │
    │ - Investigation discovery                          │
    │ - Progress tracking                                 │
    │ - Promotion proposal generation                     │
    │                                                     │
    │ Consumes:                                          │
    │ - Investigation status updates                     │
    │ - Evidence references                               │
    │ - Validation reports                                │
    └─────────────────────────────────────────────────────┘
                       │                    ▲
                       │                    │
                       ▼                    │
    ┌─────────────────────────────────────────────────────┐
    │ LABORATORY                                          │
    │                                                     │
    │ Provides:                                           │
    │ - Investigation execution                          │
    │ - Evidence collection                              │
    │ - Validation reports                               │
    │ - Promotion proposals                              │
    │                                                     │
    │ Consumes:                                           │
    │ - Runtime initialization                           │
    │ - Configuration                                    │
    └─────────────────────────────────────────────────────┘
```

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Initial version | Architecture C |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [`BOOTSTRAP.md`](./BOOTSTRAP.md) | Session entry point |
| [`RULES.md`](./RULES.md) | Core Laboratory rules |
| [`WORKFLOW.md`](./WORKFLOW.md) | Investigation lifecycle |
| [`PROMOTION.md`](./PROMOTION.md) | Knowledge promotion |
| [`ENGINES.md`](./ENGINES.md) | Engine responsibilities |

---

**Document Status**: PRODUCTION
**Authority**: Architecture C
