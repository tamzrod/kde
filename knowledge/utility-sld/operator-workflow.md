# Operator Workflow Support in Utility SLDs

## Overview

This document defines how utility-grade SCADA Single Line Diagrams support operator decision-making and workflow.

---

## Operator Decision Framework

### Operator Information Processing Model

Based on Endsley's situational awareness model:

```
┌─────────────────────────────────────────────────────────────┐
│                    OPERATOR WORKFLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. PERCEPTION          2. COMPREHENSION         3. PROJECT │
│  ┌──────────────┐      ┌──────────────┐       ┌────────────┐│
│  │ See data on  │ ──── │ Understand   │ ───── │ Predict    ││
│  │ SLD display  │      │ what's       │       │ future     ││
│  │              │      │ happening    │       │ states     ││
│  └──────────────┘      └──────────────┘       └────────────┘│
│                                                              │
│  SLD Design Supports:                                        │
│  ├── Quick perception (colors, symbols)                      │
│  ├── Pattern recognition (layouts)                           │
│  └── Anomaly detection (contrast)                            │
└─────────────────────────────────────────────────────────────┘
```

**Source**: Micah Endsley, "Design for Situational Awareness"

---

## Primary Operator Tasks

### 1. Alarm Response

**Workflow**:
```
Alarm Occurs
     │
     ▼
┌────────────────────────────────────────────────────────────┐
│ 1. DETECT: See alarm flash/banner on SLD                   │
│ 2. IDENTIFY: Locate alarm source on diagram                │
│ 3. ASSESS: Check related measurements                       │
│ 4. ACT: Acknowledge alarm, take control action              │
│ 5. DOCUMENT: Log action taken                               │
└────────────────────────────────────────────────────────────┘
```

**SLD Requirements**:
- Alarms prominently visible
- Source location immediately identifiable
- Related measurements visible
- Control actions accessible

### 2. Fault Isolation

**Workflow**:
```
Fault Detected
     │
     ▼
┌────────────────────────────────────────────────────────────┐
│ 1. LOCATE: Find fault on SLD (red/flashing)                │
│ 2. TRACE: Follow power flow path                           │
│ 3. ISOLATE: Open breakers to isolate fault                 │
│ 4. VERIFY: Confirm isolation (verify open status)           │
│ 5. DOCUMENT: Note switching sequence                        │
└────────────────────────────────────────────────────────────┘
```

**SLD Requirements**:
- Fault location highlighted
- Power flow direction clear
- Breaker states immediately visible
- Switching path traceable

### 3. Restoration

**Workflow**:
```
Fault Cleared
     │
     ▼
┌────────────────────────────────────────────────────────────┐
│ 1. PLAN: Determine restoration path                         │
│ 2. COORDINATE: Notify affected parties                     │
│ 3. CLOSE: Close breakers to restore                        │
│ 4. MONITOR: Watch for overloads                             │
│ 5. VERIFY: Confirm restoration                              │
└────────────────────────────────────────────────────────────┘
```

**SLD Requirements**:
- Restoration paths clear
- Equipment loadings visible
- Sequential close operations supported
- Loading updates immediate

### 4. Switching Operations

**Workflow**:
```
Switching Order Received
     │
     ▼
┌────────────────────────────────────────────────────────────┐
│ 1. REVIEW: Study diagram, understand system state          │
│ 2. PLAN: Sequence switching steps                          │
│ 3. EXECUTE: Perform switching (SLD updates)                 │
│ 4. VERIFY: Confirm each step completed                      │
│ 5. COMPLETE: Verify final state                            │
└────────────────────────────────────────────────────────────┘
```

**SLD Requirements**:
- Clear system state visualization
- Switching path highlighted
- State verification immediate
- No ambiguity in status

---

## Information Hierarchy by Task

### Alarm Response Priority

| Priority | Information | Location |
|----------|-------------|----------|
| 1 | Alarm active | Top banner |
| 2 | Alarm source | SLD diagram |
| 3 | Related values | Adjacent to source |
| 4 | Historical data | On-demand |
| 5 | Configuration | Menu access |

### Fault Isolation Priority

| Priority | Information | Location |
|----------|-------------|----------|
| 1 | Fault indicator | On equipment |
| 2 | Breaker positions | On breakers |
| 3 | Power flow direction | On lines |
| 4 | System topology | Overall diagram |
| 5 | Protection status | On relays |

### Restoration Priority

| Priority | Information | Location |
|----------|-------------|----------|
| 1 | Isolated sections | Highlighted |
| 2 | Available paths | Indicated |
| 3 | Equipment loading | On equipment |
| 4 | Unaffected loads | Clear |
| 5 | Switching sequence | Procedure display |

---

## SLD Design for Workflows

### Quick Information Access

**Required at a Glance** (< 5 seconds):
```
┌─────────────────────────────────────────────────────────┐
│                         │                                 │
│   [STATION ALPHA]       │   [ALARMS: 2] [UNACK: 1]       │
│   ─────────────────     │   ─────────────────────────    │
│                         │                                 │
│   ┌─────────────────────────────────────────────────┐    │
│   │  Visual check:                                  │    │
│   │  • Red = Problem (look here first)             │    │
│   │  • Green = Normal (don't worry)                │    │
│   │  • Yellow = Warning (monitor)                 │    │
│   │  • Gray = Unknown/Offline                      │    │
│   └─────────────────────────────────────────────────┘    │
│                         │                                 │
└─────────────────────────────────────────────────────────┘
```

### Decision Support Elements

**Color Coding for Rapid Assessment**:
| Condition | Color | Action Required |
|-----------|-------|-----------------|
| All normal | Quiet (muted) | None |
| Any alarm | Alert (bright) | Investigate |
| Critical | Flash (bright) | Immediate |
| Restoration | Highlight | Follow path |

### Cognitive Load Reduction

**Design Principles**:
1. **Chunking**: Group related equipment visually
2. **Progressive Disclosure**: Show details on demand
3. **Consistency**: Same layout everywhere
4. **Defaults**: Normal state requires no attention

---

## Workflow Integration

### Navigation Between Views

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION STRUCTURE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   System Overview ───────────────────────────────────┐       │
│        │                                             │       │
│        ├── Station Alpha ─────────────────────────┐  │       │
│        │      │                                   │  │       │
│        │      ├── 115kV SLD ──────────────────┐   │  │       │
│        │      │     │                          │   │  │       │
│        │      │     ├── Feeder 1 Detail ─────┐ │   │  │       │
│        │      │     │     │                  │ │   │  │       │
│        │      │     │     └── Relay Detail   │ │   │  │       │
│        │      │     │                        │ │   │  │       │
│        │      │     └── Feeder 2 Detail     │ │   │  │       │
│        │      │                              │ │   │  │       │
│        │      └── 13.8kV SLD                 │ │   │  │       │
│        │                                    ▼ ▼   │  │       │
│        │                                 [Bay View] │  │       │
│        │                                         │  │       │
│        └── Station Beta                            │  │       │
│                                                       ▼       │
│                                                 [Alarm View] │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Context Preservation

**When Navigating**:
- Maintain alarm awareness
- Show breadcrumb path
- Quick return to previous view
- Multiple views open simultaneously (multi-monitor)

---

## Error Prevention

### Design for Safe Operation

**Interlocking Visualization**:
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CB101 ←── Interlock ──→ CB102                           │
│                                                             │
│   "CB102 cannot close while CB101 is open"                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Command Verification**:
- Require confirmation for control actions
- Show pre/post state
- Highlight affected equipment
- Provide abort option

---

## Performance Metrics

### Operator Effectiveness

| Metric | Target | SLD Support |
|--------|--------|--------------|
| Alarm response time | < 30 seconds | Flash + banner |
| Fault isolation time | < 5 minutes | Clear topology |
| Restoration time | < 15 minutes | Path indication |
| Operator fatigue | Minimize | Quiet screens |

---

## Summary

| Workflow | SLD Support | Key Features |
|----------|-------------|--------------|
| Alarm Response | Alert highlighting | Flash, banner, locate |
| Fault Isolation | Status visibility | Color, topology |
| Restoration | Path indication | Animation, loading |
| Switching | State verification | Real-time updates |
| Monitoring | Normal state | Quiet, consistent |

---

*Source: ASM Consortium, Center for Operator Performance, ISA-101*
