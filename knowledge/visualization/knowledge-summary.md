# Visualization Knowledge Summary

## Overview

This document synthesizes the complete knowledge extracted from INV-028 investigation into a single reference for KDE use in dashboard and data visualization generation.

---

## Core Finding

> **Professional dashboards are purpose-built interfaces that balance information density with cognitive load, using consistent visual systems to enable rapid decision-making.**

---

## Key Principles

### 1. Purpose-Driven Design

Every dashboard must have clear objectives:
- Define audience first
- Identify key decisions
- Curate information ruthlessly
- Support specific workflows

### 2. Information Hierarchy

Visual priority based on operational importance:
| Priority | Content | Display |
|----------|---------|---------|
| 1 | Critical alerts, KPIs | Top, prominent |
| 2 | Key metrics, trends | Primary area |
| 3 | Supporting data | Secondary area |
| 4 | Detailed data | On-demand |

### 3. Cognitive Load Management

Reduce mental effort required to understand data:
- Show only essential information
- Use familiar patterns
- Provide context
- Progressive disclosure

### 4. Visual Consistency

Apply uniform conventions throughout:
- Same colors = Same meanings
- Same positions = Similar elements
- Consistent typography
- Standardized components

---

## Visualization Selection

### Quick Reference

| Data Type | Best Chart | Alternative |
|-----------|------------|-------------|
| Trends over time | Line | Area |
| Category comparison | Bar | Bullet |
| Part-to-whole | Stacked Bar | Pie (≤5) |
| Distribution | Histogram | Box Plot |
| Relationships | Scatter | Bubble |
| Geographic | Choropleth | Heat Map |
| Single KPI | Gauge | KPI Card |

### Visual Perception Accuracy

(Cleveland & McGill)
1. Position on common scale (BEST)
2. Position on non-aligned scales
3. Length
4. Angle
5. Area
6. Color saturation
7. Color hue (WORST)

---

## Technology Selection

### Decision Matrix

| Requirement | Technology | Notes |
|-------------|------------|-------|
| Standard charts | ECharts, Chart.js | Quick to implement |
| Custom visuals | D3.js | Full control |
| Scientific | Plotly | 3D, statistical |
| React | Recharts | React idiomatic |
| Performance | ECharts (Canvas) | Large datasets |
| 3D | Three.js | Graphics |

### Recommended Stack

**For SCADA/Industrial**:
- Apache ECharts (primary)
- SVG (custom components)
- D3.js (specialized)

**For Business Dashboards**:
- ECharts or Chart.js
- React ecosystem
- CSS Grid/Flexbox

---

## Color Systems

### Semantic Colors

| Meaning | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Success | #22C55E | #22C55E |
| Warning | #F59E0B | #FBBF24 |
| Error | #EF4444 | #F87171 |
| Info | #3B82F6 | #60A5FA |

### Chart Palette

```css
.light {
  --chart-1: #3B82F6;  /* Blue */
  --chart-2: #22C55E;  /* Green */
  --chart-3: #F59E0B;  /* Amber */
  --chart-4: #EF4444;  /* Red */
  --chart-5: #8B5CF6;  /* Purple */
}
```

---

## Typography

| Element | Size | Weight |
|---------|------|--------|
| Page Title | 24-30px | Bold |
| Section | 18-20px | Semibold |
| Card Title | 16px | Semibold |
| Body | 14px | Regular |
| Labels | 12px | Medium |

**Font Selection**:
- Sans-serif for UI text
- Monospace for numbers/IDs
- Tabular nums for alignment

---

## Animation Guidelines

| Type | Duration | Easing |
|------|----------|--------|
| Micro-interaction | 100-150ms | ease-out |
| State change | 200-300ms | ease-in-out |
| Page transition | 300-500ms | ease-in-out |

**Rules**:
- Purpose before animation
- Respect reduced motion
- GPU-accelerated only
- Less is more

---

## Design Patterns

### Navigation
- Overview + Detail (drill-down)
- Hub and Spoke (multi-section)
- Breadcrumb trail

### Visualization
- Multi-View Linking (coordinated)
- Layered Visualization (toggle)
- Comparison (before/after)

### Layout
- F-Pattern (reading priority)
- Golden Zone (key metrics)
- Grid-based (consistency)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Paint | < 1.8s |
| Interactive | < 3.5s |
| Chart Render | < 100ms |
| Animation | 60fps |
| Data Update | < 50ms |

**Techniques**:
- Virtualization for large lists
- Canvas for many elements
- Lazy loading
- Memoization

---

## Accessibility

| Requirement | Standard |
|-------------|----------|
| Contrast | 4.5:1 (text), 3:1 (UI) |
| Touch targets | 44px minimum |
| Motion | Respect preference |
| Color | + shape indicator |

---

## Common Mistakes

### Chart Misuse
- Pie charts > 5 slices
- 3D effects
- Truncated axes without indication
- Rainbow color scales

### Design Issues
- Information overload
- Inconsistent colors
- No visual hierarchy
- Decorative animation

---

## Summary Table

| Category | Key Knowledge |
|----------|--------------|
| Design | Purpose, hierarchy, cognitive load |
| Charts | Type selection, visual perception |
| Technology | ECharts, D3.js, Canvas |
| Color | Semantic, dark mode, contrast |
| Typography | Hierarchy, monospace numbers |
| Animation | Timing, easing, restraint |
| Patterns | Navigation, visualization, layout |
| Performance | Virtualization, lazy load |
| Accessibility | Contrast, reduced motion |

---

## Usage

This knowledge enables KDE to generate:
- Professional dashboards
- Appropriate chart selection
- Consistent visual systems
- Performant visualizations
- Accessible interfaces

---

*Generated from INV-028 Investigation*  
*Classification: Visualization Engineering Knowledge*
