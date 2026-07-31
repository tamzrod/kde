# Human Factors in Utility SLD Design

## Overview

This document covers human factors considerations for utility-grade SCADA Single Line Diagrams, based on established standards and research.

---

## Applicable Standards

### Primary Standards

| Standard | Title | Application |
|----------|-------|-------------|
| ISA-101.01-2015 | Human Machine Interfaces for Process Automation | HMI design |
| ISA-RP60.3-1985 | Human Engineering for Control Centers | Control rooms |
| EEMUA 201 | Process Plant Control Desks | HCI design |
| IEC 62682 | Alarm Management | Alarm systems |
| ISO 11064 | Ergonomic Design of Control Centers | Control rooms |

### Supporting Standards

| Standard | Title |
|----------|-------|
| ISO 9241 | Ergonomics of Human-System Interaction |
| ANSI/IES RP-29 | Lighting for Hospital |
| IEC 61850 | Communication Networks in Substations |

---

## Situational Awareness

### Definition

> "Situational awareness is the perception of environmental elements and comprehension of their meaning, and the projection of their status in the near future."

**Source**: Endsley, M.R. (1995)

### Three Levels

```
┌─────────────────────────────────────────────────────────────┐
│                    SITUATIONAL AWARENESS                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Level 1: PERCEPTION                                        │
│   ─────────────────────                                      │
│   "What is there?"                                           │
│   • See breaker is red (closed)                              │
│   • See MW value is 45.2                                    │
│   • See alarm is flashing                                    │
│                                                              │
│   Level 2: COMPREHENSION                                     │
│   ─────────────────────                                      │
│   "What does it mean?"                                       │
│   • Breaker is closed, load is normal                        │
│   • MW is within limits                                      │
│   • Alarm requires attention                                 │
│                                                              │
│   Level 3: PROJECTION                                        │
│   ─────────────────                                          │
│   "What will happen next?"                                   │
│   • Load increasing, may approach limit                      │
│   • Alarm likely to escalate if unaddressed                  │
│   • Restoration path available                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### SLD Design for Awareness

| Level | Design Support |
|-------|----------------|
| 1 | Visual encoding (color, shape) |
| 2 | Information grouping, patterns |
| 3 | Trend displays, predictions |

---

## Cognitive Load

### Definition

> "Cognitive load refers to the total amount of mental effort being used in the working memory."

**Source**: Sweller, J. (1988)

### Types of Cognitive Load

| Type | Description | SLD Impact |
|------|-------------|------------|
| Intrinsic | Complexity of information本身 | Appropriate abstraction |
| Extraneous | How information is presented | Layout, colors, grouping |
| Germane | Mental processing building schemas | Consistent patterns |

### Design for Low Cognitive Load

**Do**:
- Use consistent layouts
- Group related information
- Show information in expected locations
- Use familiar symbols
- Provide progressive disclosure

**Don't**:
- Display all available data
- Change layouts between views
- Use non-standard symbols
- Require scrolling for critical info
- Create visual clutter

---

## Operator Performance Considerations

### 24/7 Operations

**Challenges**:
- Night shift alertness
- Fatigue accumulation
- Monotony during quiet periods
- Rapid transition from quiet to emergency

**SLD Solutions**:

| Challenge | Solution |
|-----------|----------|
| Night shift | Dark mode, reduced brightness |
| Fatigue | Clear anomaly indication |
| Quiet periods | Visual quiet, subtle updates |
| Emergency | Immediate, unmistakable alert |

### Stress and Workload

**High-Load Scenarios**:
- Multiple simultaneous alarms
- Fault conditions
- Restoration operations
- System disturbances

**Design for High-Stress**:

1. **Reduce Search Time**: Important items visible without scanning
2. **Support Memory**: Show state changes clearly
3. **Prevent Errors**: Interlocking, confirmation dialogs
4. **Enable Focus**: Minimize distractions

---

## Visual Design Factors

### Color Perception

**Human Vision Limitations**:
```
┌─────────────────────────────────────────────────────────────┐
│                  COLOR PERCEPTION FACTS                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   • 8% of men are color-blind (mostly red-green)            │
│   • Colors appear differently on various monitors           │
│   • Ambient lighting affects color perception               │
│   • Colors fatigue with prolonged viewing                   │
│   • Saturated colors dominate perception                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Colorblind-Safe Design**:
- Never rely on color alone
- Use shape + color
- Use position + color
- Add patterns or textures
- Include text labels

### Visual Fields

**Optimal Viewing**:
```
┌─────────────────────────────────────────────────────────────┐
│                    VISUAL FIELD                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│         ┌─────────────────────────────────┐                   │
│         │                                 │                   │
│         │      OPTIMAL ZONE               │  ← 10-20°        │
│         │    (Best perception)            │     from center  │
│         │                                 │                   │
│         └─────────────────────────────────┘                   │
│                                                              │
│   ┌───────────────────────────────────────────────────────┐   │
│   │                                                       │   │
│   │            ACCEPTABLE ZONE                            │   │
│   │          (Peripheral vision)                         │   │
│   │                                                       │   │
│   └───────────────────────────────────────────────────────┘   │
│                                                              │
│   Design implication: Important info in center of screen     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Reading Distance

| Distance | Use Case | Min Font Size |
|----------|----------|---------------|
| 0.5m | Handheld | 8pt |
| 1.0m | Desktop | 12pt |
| 1.5m | Console | 16pt |
| 2.0m | Large monitor | 20pt |
| 3.0m | Wall display | 28pt |

---

## Alarm Design (IEC 62682)

### Alarm Philosophy

**Golden Rules**:
1. Every alarm requires operator action
2. Alarms should be infrequent
3. Alarm information should be clear
4. Alarms should be acknowledged

### Alarm Hierarchy

| Priority | Name | Response | Color | Flash |
|----------|------|----------|-------|-------|
| P1 | Critical | Immediate | Red | Yes |
| P2 | High | < 1 min | Red | No |
| P3 | Medium | < 5 min | Yellow | No |
| P4 | Low | < 15 min | Blue | No |

### Alarm Display Guidelines

| Guideline | Requirement |
|-----------|-------------|
| Position | Top of screen, always visible |
| Font | Bold, high contrast |
| Sound | Appropriate for priority |
| Count | Show unacknowledged count |
| Acknowledgment | Clear action indicator |

---

## Ergonomic Standards

### Display Position (ISO 11064-5)

| Parameter | Recommendation |
|-----------|----------------|
| Vertical angle | -20° to +20° from horizontal |
| Horizontal angle | -30° to +30° from center |
| Distance | As needed for content |

### Workstation Layout (ISO 11064-4)

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITOR ARRANGEMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Primary    Secondary   Secondary                          │
│   Monitor    Monitor     Monitor                            │
│   ┌──────┐   ┌──────┐    ┌──────┐                          │
│   │      │   │      │    │      │    ← Viewing angle       │
│   │      │   │      │    │      │       within 30°         │
│   └──────┘   └──────┘    └──────┘                          │
│                                                              │
│   ──────────────────────────────────────  ← Eye level       │
│                                                              │
│        ┌─────────┐                                          │
│        │ Keyboard│  ← Normal elbow height                   │
│        └─────────┘                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Performance Metrics

### Display Assessment

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to detect alarm | < 1 second | Eye tracking |
| Time to locate source | < 5 seconds | Task timing |
| Operator error rate | < 1% | Observation |
| Operator preference | > 80% | Survey |

### Key Performance Indicators (KPIs)

Based on Center for Operator Performance research:

| KPI | Target |
|-----|--------|
| Situation awareness | > 80% accuracy |
| Response time | < 30 seconds to alarm |
| Error rate | < 1 per 100 operations |
| Operator confidence | > 4/5 rating |

---

## Best Practices Summary

### High-Performance HMI Principles

1. **Quiet Screens**: Normal state is visually calm
2. **Prominent Alarms**: Abnormal state demands attention
3. **Progressive Disclosure**: Show detail on demand
4. **Consistent Layout**: Learn once, apply everywhere
5. **Clear Hierarchy**: Important information first

### Implementation Checklist

```
☐ Background color reduces eye strain
☐ Alarm colors visible from distance
☐ Font size readable at operating distance
☐ Information grouped logically
☐ Critical information centered
☐ Navigation consistent across screens
☐ Dark mode available
☐ Color-blind safe (no red/green only)
☐ Status visible without reading text
☐ Controls require confirmation
```

---

## Summary

| Human Factor | Design Consideration |
|--------------|---------------------|
| Situational awareness | Color, hierarchy, patterns |
| Cognitive load | Appropriate density, consistency |
| Night operations | Dark mode, reduced brightness |
| Color blindness | Shape + color, not color alone |
| Reading distance | Minimum font sizes |
| Stress | Clear priorities, immediate feedback |
| Fatigue | Visual quiet, subtle updates |

---

*Source: ISA-101, ISA-RP60.3, EEMUA 201, IEC 62682, ISO 11064, Endsley situational awareness model*
