# Dashboard Design Principles

## Overview

This document establishes the core principles for creating effective, professional dashboards. These principles apply across all industries and domains.

---

## Definition

> "A dashboard is a visual display of the most important information needed to achieve one or more objectives; consolidated and arranged on a single screen so the information can be monitored at a glance."

**Source**: Stephen Few, Dashboard Confusion

---

## Core Principles

### 1. Purpose Before Design

**Principle**: Every dashboard must have clear objectives.

**Questions to Answer**:
1. What decisions will this dashboard support?
2. Who is the audience?
3. What actions should users take?
4. What information is essential vs. nice-to-have?

### 2. Information Hierarchy

**Principle**: Display information in order of importance.

**Hierarchy Levels**:
| Level | Content | Location |
|-------|---------|----------|
| 1 | Critical alerts, KPIs | Top, prominent |
| 2 | Key metrics, trends | Primary area |
| 3 | Supporting data | Secondary area |
| 4 | Detailed data | On-demand |

### 3. Cognitive Load Management

**Principle**: Reduce mental effort required to understand data.

**Techniques**:
- Show only essential information
- Use familiar patterns
- Provide context
- Group related items
- Progressive disclosure

### 4. Visual Consistency

**Principle**: Apply consistent design throughout.

**Requirements**:
- Same colors mean same things
- Same positions for similar elements
- Consistent typography
- Uniform spacing
- Standardized components

### 5. Clarity Over Aesthetics

**Principle**: Data must be immediately understandable.

**Checklist**:
- [ ] Can users understand in 5 seconds?
- [ ] Is the most important data visible?
- [ ] Are labels clear and concise?
- [ ] Is the visual encoding appropriate?

---

## Visual Hierarchy

### Size and Position

**Primary Position**: Upper-left corner
- First place users look
- Contains most important information
- Typically largest element

**Hierarchy by Size**:
```
Large (> 40%): Primary KPI or chart
Medium (20-40%): Secondary metrics
Small (< 20%): Supporting information
```

### Emphasis Techniques

| Technique | Effect |
|-----------|--------|
| Size | Larger = More important |
| Color | Brighter = More attention |
| Position | Top/left = Higher priority |
| Space | Isolated = Emphasized |
| Contrast | Higher = More prominent |

---

## Layout Systems

### Grid-Based Layout

**Principle**: Use consistent grid for alignment.

**12-Column Grid** (Common):
```
Full width:     cols 1-12
Half width:     cols 1-6, 7-12
Third width:    cols 1-4, 5-8, 9-12
Quarter width:  cols 1-3, 4-6, 7-9, 10-12
```

### Common Layout Patterns

**F-Pattern Layout**:
```
┌─────────────────────────────────────────┐
│ Important (KPI)        │ Secondary       │
├─────────────────────────────────────────┤
│ Primary Chart          │ Supporting     │
│                        │                │
├─────────────────────────────────────────┤
│ Supporting           │ Secondary        │
└─────────────────────────────────────────┘
```

**Dashboard Zones**:
```
┌─────────────────────────────────────────┐
│ HEADER: Title, Filters, Time, User      │
├─────────────────────────────────────────┤
│ PRIMARY: Main KPI / Overview           │
├─────────────────────────────────────────┤
│ SECONDARY: Key Charts / Metrics        │
├─────────────────────────────────────────┤
│ DETAILS: Tables / Lists / Logs         │
└─────────────────────────────────────────┘
```

---

## Information Density

### The "Less is More" Principle

**Don't**:
- Show all available data
- Fill every pixel
- Display multiple competing focal points
- Use decorative elements

**Do**:
- Curate information
- Prioritize ruthlessly
- Allow white space
- Support drill-down

### Density Guidelines

| Dashboard Type | Charts | KPIs | Tables |
|---------------|--------|------|--------|
| Executive | 1-3 | 3-5 | 0-1 |
| Operational | 2-4 | 5-10 | 1-2 |
| Analytical | 2-6 | 5-15 | 0-3 |

---

## White Space

### Purpose of White Space

1. **Visual Breathing**: Reduces cognitive load
2. **Grouping**: Indicates related elements
3. **Emphasis**: Isolates important items
4. **Clarity**: Improves scanability

### White Space Ratios

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Card padding | 16px | 24px |
| Between cards | 16px | 24px |
| Section margin | 24px | 32px |
| Screen edge | 16px | 24px |

---

## Responsive Design

### Breakpoints

| Screen | Width | Layout |
|--------|-------|--------|
| Desktop | > 1200px | Full grid |
| Tablet | 768-1200px | 2 columns |
| Mobile | < 768px | 1 column |

### Adaptation Rules

1. Stack vertically on smaller screens
2. Prioritize critical information
3. Maintain touch targets (44px min)
4. Preserve data-to-ink ratio

---

## Summary

| Principle | Application |
|-----------|-------------|
| Purpose first | Define goals before design |
| Hierarchy | Most important = Most visible |
| Cognitive load | Reduce mental effort |
| Consistency | Same patterns everywhere |
| Clarity | Data over decoration |
| White space | Breathing room |
| Progressive | Detail on demand |

---

*Source: Stephen Few, Edward Tufte, Nielsen Norman Group, industry best practices*
