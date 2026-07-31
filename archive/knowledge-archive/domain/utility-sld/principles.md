# Utility-Grade SLD Design Principles

## Overview

This document establishes the core design principles that differentiate utility-grade SCADA Single Line Diagrams from generic electrical diagrams. These principles derive from industry standards (ISA-101, IEC 61850, EEMUA 201) and vendor implementations.

---

## Core Philosophy

### High-Performance HMI Philosophy

**Primary Goal**: Enable operators to detect abnormal conditions within seconds without actively reading every value.

> "An operator glancing at a well-designed high-performance display should be able to identify any abnormal condition within seconds, without scanning every value or interpreting a rainbow of competing colors."

**Key Tenets**:
1. **Quiet Screens**: Most of the display should be visually calm (normal state)
2. **Contrast Through Deviation**: Abnormal states should contrast sharply with normal
3. **Information at a Glance**: Critical information immediately visible
4. **Operator Cognitive Load**: Minimize mental effort for routine monitoring

---

## Fundamental Design Principles

### 1. Situational Awareness First

**Principle**: The SLD must support rapid situational awareness assessment.

**Implementation**:
- Energy flow direction immediately visible
- Equipment status (energized/de-energized) at a glance
- Alarm conditions highlighted prominently
- Power flow values continuously displayed

**Evidence**: ISA-101.01-2015, ASM Consortium, COPA-DATA zenon documentation

### 2. Visual Hierarchy

**Principle**: Information must be prioritized by operational importance.

**Hierarchy Levels**:
| Level | Information | Visual Priority |
|-------|-------------|-----------------|
| 1 | Breaker status, alarms | Highest - Large, prominent |
| 2 | Voltage, current, power | High - Clearly visible |
| 3 | Equipment health | Medium - Secondary emphasis |
| 4 | Historical data | Low - On-demand access |
| 5 | Configuration | Hidden - Menu access only |

### 3. Consistency

**Principle**: Uniform design conventions across all displays.

**Requirements**:
- Symbol shapes and sizes must be consistent
- Color meanings must be uniform throughout
- Text placement must follow predictable patterns
- Navigation must work identically across all screens

### 4. Clarity Over Density

**Principle**: Display only information the operator needs, not all available information.

**Evidence**: EEMUA 201 recommends "less is more" approach

**Guidelines**:
- Level 1 overview: Show essential status only
- Level 2 detail: Show relevant process data
- Level 3 diagnostics: Show all available data

### 5. Color as Information

**Principle**: Colors must convey meaning, not decoration.

**Color Rules**:
- Use color to indicate state/status
- Avoid decorative color
- Reserve saturated colors for alarms
- Use muted tones for normal state

---

## Operational Design Principles

### 6. Power Flow Visualization

**Principle**: Energy flow must be immediately apparent.

**Visual Indicators**:
- Line coloring indicates energized state
- Flow direction arrows or animation
- Busbar sectioning by voltage level
- Power value labels on conductors

### 7. Status at a Glance

**Principle**: Equipment state must be immediately identifiable.

**Breaker States** (North American Convention):
| State | Color | Symbol |
|-------|-------|--------|
| Closed | Red | Filled |
| Open | Green | Outline |
| Tripped | Flashing Red | Filled + Flash |
| Unknown | Yellow | Hatched |

### 8. Alarm Emphasis

**Principle**: Alarms must demand attention without overwhelming.

**Design Rules**:
- Critical alarms: Flashing, prominent position
- Warning alarms: Distinct color, secondary position
- Information: Muted, non-intrusive
- Never hide alarms in background

### 9. Navigation Support

**Principle**: Operators must move between views efficiently.

**Requirements**:
- Consistent navigation zone location
- Clear station/area identification
- Breadcrumb trail for context
- Quick access to common views

### 10. Night Mode Support

**Principle**: Displays must work in low-light control room environments.

**Implementation**:
- Dark backgrounds reduce eye strain
- High contrast text for readability
- Avoid pure white (too bright)
- Maintain color distinction in dim conditions

---

## Technical Principles

### 11. IEC 61850 Compliance

**Principle**: Visual representation should align with IEC 61850 data modeling.

**Requirements**:
- Logical Node naming conventions
- Data Object representation
- Control function visualization
- Goose indication placement

### 12. Scalability

**Principle**: Graphics must work across different screen sizes and resolutions.

**Guidelines**:
- Vector graphics (SVG) preferred
- Responsive scaling
- Decluttering at reduced zoom
- Multi-monitor support

### 13. Performance

**Principle**: Real-time updates must not degrade performance.

**Requirements**:
- Efficient rendering
- Batched updates
- Throttled animations
- Background data processing

---

## Comparison: Generic vs Utility-Grade SLD

| Aspect | Generic SLD | Utility-Grade SLD |
|--------|-------------|------------------|
| Purpose | Engineering reference | Operator interface |
| Updates | Static | Real-time dynamic |
| Colors | Decorative | Semantic |
| Density | All information | Operator-relevant |
| Status | Symbol only | Symbol + value |
| Alarms | None | Prominent |
| Navigation | None | Hierarchical |
| Night mode | No | Yes |
| IEC 61850 | Ignore | Integrate |

---

## Summary

The key differentiator between generic AI-generated SLDs and utility-grade SLDs is the **operational purpose**:

1. **Generic SLD**: Shows what exists (static representation)
2. **Utility SLD**: Shows what's happening (dynamic situational awareness)

Utility-grade SLDs are designed for **operator decision support**, not documentation. Every design choice serves the goal of enabling rapid, accurate operational decisions.

---

*Source: Synthesized from ISA-101, EEMUA 201, IEC 61850, vendor implementations, and industry best practices*
