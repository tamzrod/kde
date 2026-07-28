---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
---

# INV-DUAL-MODE-001: Architecture Analysis

**Investigation**: INV-DUAL-MODE-001
**Document**: Architecture Analysis
**Date**: 2026-07-28
**Status**: IN_PROGRESS

---

## 1. Current Runtime Architecture

### 1.1 Component Overview

```
/workspace/project/kde/runtime/
├── __init__.py              # Main exports
├── runtime.py               # KnowledgeOnDemandRuntime
├── preflight.py             # Pre-flight checks
├── principles_enforcer.py   # Five Core Principles
├── state.json               # Runtime state
├── catalog.json             # Knowledge catalog
│
├── ecu/                     # Engine Control Unit
│   ├── __init__.py
│   ├── planner/             # Execution planning
│   ├── resolver/            # Capability resolution
│   ├── consensus/          # Multi-engine consensus
│   ├── aggregator/          # Result aggregation
│   ├── policy/             # Policy enforcement
│   └── registry/           # Engine/Seed registry
│
├── orchestrator/           # Session orchestration
│   ├── types.py
│   └── workspace.py
│
├── validators/              # Output validation
│   ├── metadata.py
│   └── validation.py
│
├── retrieval.py            # Knowledge retrieval
├── instrumentation.py      # Telemetry
├── attribution.py           # Decision attribution
└── sop005.py               # Retrieval policy
```

### 1.2 Mode Detection Points

Current runtime has NO explicit mode support. Detection would require:

| Detection Point | Current State | Enhancement Needed |
|---------------|---------------|-------------------|
| `runtime.py` | Single execution path | Mode routing layer |
| `state.json` | Generic state | Mode field in state |
| `preflight.py` | Single check | Mode-aware checks |
| Session override | Engine selection only | Mode selection |

### 1.3 State Machine

Current state machine (MD-native):

```
DRAFT → REVIEW → APPROVED → VALIDATED → PROMOTED
         ↓
      REJECTED
```

AIRR mode would require equivalent:

```
DRAFT → REVIEW → APPROVED → VALIDATED → PROMOTED
         ↓           ↓           ↓
      REJECTED   AI_BLOCKED   HUMAN_REQUIRED
```

---

## 2. Dual-Mode Integration Points

### 2.1 Shared Components (Can Be Shared)

| Component | MD Usage | AIRR Usage | Shared? |
|-----------|----------|------------|---------|
| `principles_enforcer.py` | Full | Full | ✅ YES |
| `ecu/registry/` | Full | Full | ✅ YES |
| `ecu/policy/` | Full | Full | ✅ YES |
| `state.json` | Full | Full | ✅ YES (add mode field) |
| `catalog.json` | Full | Full | ✅ YES |
| `retrieval.py` | Full | Full | ✅ YES |
| `sop005.py` | Full | Full | ✅ YES |

### 2.2 Mode-Specific Components (Must Be Separate)

| Component | MD Implementation | AIRR Implementation |
|-----------|-------------------|---------------------|
| Execution entry | `runtime.initialize()` | Agent-based (`openhands.sdk`) |
| Tool routing | Document tools only | Full tool access |
| State transitions | Markdown files | SDK-native state |
| Evidence marking | `[EVIDENCE:]` syntax | Structured outputs |
| Session control | Checkpoint files | Conversation API |
| Human approval | Document review | Tool confirmation |

### 2.3 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DUAL-MODE RUNTIME                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│  │   PREFLIGHT │    │    ECU      │    │  PRINCIPLES │            │
│  │   (Shared)  │    │  (Shared)   │    │  ENFORCER   │            │
│  └─────────────┘    └─────────────┘    └─────────────┘            │
│         │                 │                  │                     │
│         └─────────────────┼──────────────────┘                     │
│                           │                                        │
│                    ┌──────┴──────┐                                 │
│                    │  MODE ROUTER │                                 │
│                    │  (New)       │                                 │
│                    └──────┬──────┘                                 │
│                           │                                        │
│         ┌─────────────────┼─────────────────┐                     │
│         │                 │                 │                       │
│         ▼                 ▼                 ▼                       │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐             │
│  │    MD MODE  │   │   AIRR MODE │   │   HYBRID    │             │
│  │  (Document) │   │   (Agent)   │   │ (PROHIBITED)│             │
│  └─────────────┘   └─────────────┘   └─────────────┘             │
│         │                 │                                     │
│         ▼                 ▼                                     │
│  ┌─────────────┐   ┌─────────────┐                               │
│  │    MD TOOLS │   │   AIRR TOOLS│                               │
│  │  - file_editor │   │ - SDK tools  │                           │
│  │  - terminal   │   │ - Browser    │                           │
│  │  - (read-only)│   │ - Terminal   │                           │
│  └─────────────┘   └─────────────┘                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Mode Selection Mechanism

### 3.1 Selection Criteria

| Criterion | MD Preferred | AIRR Preferred |
|-----------|--------------|----------------|
| Task type | Document analysis, governance | Tool execution, automation |
| Traceability | High priority | Lower priority |
| Human review | Required at checkpoints | Optional via SDK |
| Speed | Moderate | Fast |
| Complexity | Simple workflows | Complex multi-step |

### 3.2 Selection Methods

#### Method A: Session Override (Human-Authorized)

```yaml
session_override:
  engine: KDE-ENGINE-002
  mode: AIRR  # Human specifies mode
```

#### Method B: Task Classification (LLM-Assisted)

```python
def classify_task(task_description):
    """LLM classifies task, human approves"""
    if "analyze document" in task_description.lower():
        return "MD"
    elif "run command" in task_description.lower():
        return "AIRR"
    else:
        return "ESCALATE"  # Human decides
```

#### Method C: Auto-Detection (With Fallback)

```python
def auto_detect_mode(context):
    """Detect mode from context, require human confirmation for ambiguous"""
    if context.get("tools_used"):
        return "AIRR"
    elif context.get("documents_analyzed"):
        return "MD"
    else:
        return "ESCALATE"
```

---

## 4. Shared Component Specifications

### 4.1 Extended State Schema

```json
{
  "version": "1.0.0",
  "mode": "MD | AIRR",
  "initialized": true,
  "last_checkpoint": "2026-07-28T10:00:00Z",
  "engine_registry": { ... },
  "seed_registry": { ... },
  "mode_state": {
    "MD": { "active_documents": [] },
    "AIRR": { "conversation_id": null }
  }
}
```

### 4.2 Mode-Aware ECU

```python
class ModeAwareECU:
    def __init__(self):
        self.ecu = create_ecu()
        self.current_mode = None
    
    def check_transition(self, from_state, to_state, mode):
        # Apply mode-specific rules
        if mode == "MD":
            return self.check_md_transition(from_state, to_state)
        elif mode == "AIRR":
            return self.check_airr_transition(from_state, to_state)
        else:
            raise ModeError("Invalid mode")
```

---

## 5. AIRR Integration Points

### 5.1 OpenHands SDK Components

Based on OpenHands SDK (`openhands.sdk`):

| SDK Component | AIRR Usage | KDE Integration |
|--------------|-----------|----------------|
| `Agent` | Core execution | Wrap in ECU |
| `Conversation` | Session management | Map to checkpoints |
| `Tool` | Action execution | Route via principles |
| `LLM` | Reasoning | Configure via registry |
| `Skill` | Specialized behavior | Load via KDE skills |

### 5.2 AIRR-Specific Additions

```python
# /workspace/project/kde/runtime/airr/
├── __init__.py
├── agent.py           # KDE-aware OpenHands agent
├── converter.py        # MD ↔ AIRR translation
├── checkpoint.py       # AIRR checkpoint handling
└── security.py         # AIRR-specific security
```

---

## 6. Implementation Phases

### Phase 1: Architecture (This Investigation)
- ✅ Identify integration points
- ✅ Define shared components
- ✅ Design mode routing
- 🔄 Document risk scenarios (in progress)

### Phase 2: Core Support
- Add `mode` field to state
- Create `ModeRouter` class
- Implement mode-aware ECU

### Phase 3: AIRR Module
- Create AIRR agent wrapper
- Implement checkpoint translation
- Add AIRR-specific tools

### Phase 4: Validation
- LAB-style validation experiment
- Confusion scenario testing
- Human acceptance testing

---

## 7. Document Status

**Status**: IN_PROGRESS
**Next**: Complete risk assessment and mitigation strategy

---

*Generated by INV-DUAL-MODE-001 Architecture Analysis*
