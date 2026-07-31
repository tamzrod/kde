# Visualization Types Guide

## Overview

This document provides guidance on selecting appropriate visualization types for different data and purposes. It covers common chart types, their use cases, advantages, and limitations.

---

## Visual Perception Hierarchy

Based on Cleveland and McGill's research on graphical perception:

**Easiest to Interpret** (Most Accurate):
1. Position on common scale
2. Position on non-aligned scales
3. Length
4. Angle
5. Area
6. Color saturation
7. Color hue

**Hardest to Interpret** (Least Accurate):
8. Volume
9. Curvature
10. Shading
11. Color saturation (fine differences)

**Principle**: Use visualizations higher on the list when accuracy is critical.

---

## Comparison Charts

### Bar Charts

**Best For**:
- Comparing values across categories
- Discrete data
- When precision matters

**Variants**:
| Type | Use Case |
|------|----------|
| Vertical | Time on X-axis |
| Horizontal | Many categories, labels |
| Grouped | Comparing multiple series |
| Stacked | Part-to-whole + total |

**Limitations**:
- Poor for many categories (> 10)
- Can mislead with different starting points
- Avoid 3D effects

**Example**:
```
Sales by Region
┌────────────────────────────────────┐
│ ████████████████████ East   $450K│
│ ██████████████████ West     $380K │
│ ████████████████ North     $290K  │
│ █████████████ South        $260K  │
└────────────────────────────────────┘
```

### Bullet Charts

**Best For**:
- Progress toward goal
- Comparing actual vs. target
- Space-constrained dashboards

**Structure**:
```
Revenue: $450K
├── Target: $400K ═══════════════
├── Actual: $450K ███████████████
└── Scale:  $500K ═══════════════
```

---

## Trend Charts

### Line Charts

**Best For**:
- Trends over time
- Continuous data
- Multiple series comparison
- Patterns and anomalies

**Variants**:
| Type | Use Case |
|------|----------|
| Single line | One metric trend |
| Multi-line | Comparing trends |
| Area | Volume emphasis |
| Stacked area | Part-to-whole trends |

**Best Practices**:
- Start Y-axis at zero (unless justified)
- Use consistent intervals
- Limit lines to 4-5 series
- Consider smoothing for noise reduction

**Example**:
```
Revenue Trend
│    ╱╲    ╱
│   ╱  ╲  ╱   ╱╲
│──╱────╲╱───╱──
│         ╲
└──────────────────────→ Time
```

### Area Charts

**Best For**:
- Showing volume over time
- Part-to-whole relationships
- Cumulative trends

**Variants**:
- Stacked area: Part-to-whole
- 100% stacked: Relative proportions
- Overlapped: Direct comparison

---

## Proportion Charts

### Pie Charts

**Best For**:
- Part-to-whole (5 or fewer segments)
- When percentages sum to 100%
- Limited categories

**When to Avoid**:
- More than 5 categories
- Similar sized segments
- Need precise comparison

**Alternatives**:
- Bar chart (for comparison)
- Stacked bar (for multiple series)

**Design Tips**:
- Start at 12 o'clock
- Clockwise order (largest to smallest)
- Avoid 3D effects
- Consider exploding slices sparingly

### Donut Charts

**Best For**:
- Same as pie charts
- Center can show total/summary
- Modern dashboard aesthetic

**Advantages**:
- Center text readable
- Better for multiple series
- More modern appearance

---

## Distribution Charts

### Histograms

**Best For**:
- Showing frequency distribution
- Understanding data spread
- Identifying outliers
- Normality assessment

**Binning**:
- 5-20 bins typically
- Equal-width or equal-count
- Avoid too few or too many

### Box Plots

**Best For**:
- Comparing distributions
- Showing quartiles
- Identifying outliers

**Structure**:
```
├───●─────  Max (excluding outliers)
│       │
│   ────├── Upper quartile (Q3)
│   │   │
│   │ ● │ Median
│   │   │
│   ────├── Lower quartile (Q1)
│       │
└───●─────  Min (excluding outliers)
```

### Violin Plots

**Best For**:
- Distribution shape
- Comparing multiple groups
- Showing density

---

## Relationship Charts

### Scatter Plots

**Best For**:
- Correlation between variables
- Identifying clusters
- Outlier detection

**Variants**:
| Type | Use Case |
|------|----------|
| Basic | Two variables |
| Bubble | Three variables (size) |
| Matrix | Multiple pairs |

**Best Practices**:
- Add trend line when useful
- Label axes clearly
- Use transparency for overlapping points

### Bubble Charts

**Best For**:
- Three variables
- Fourth variable via color
- Scale comparison

**Variables**:
- X position
- Y position
- Bubble size
- Color (optional)

---

## Geographic Visualizations

### Choropleth Maps

**Best For**:
- Geographic patterns
- Regional comparisons
- Density visualization

**Requirements**:
- Regional boundaries
- Normalized data (per capita)
- Appropriate color scale

### Heat Maps

**Best For**:
- Two categorical variables
- Intensity visualization
- Patterns across dimensions

**Example**:
```
        Mon  Tue  Wed  Thu  Fri
North   ██   ██   ██   ██   ██
South   ██   ██   ██   ██   ██
East    ██   ██   ██   ██   ██
West    ██   ██   ██   ██   ██
```

---

## Flow Charts

### Sankey Diagrams

**Best For**:
- Flow visualization
- Energy/material balances
- Migration patterns
- Process flows

**Best Practices**:
- Flow left-to-right
- Consistent widths
- Clear labels

### Gantt Charts

**Best For**:
- Project schedules
- Resource allocation
- Timeline visualization

**Elements**:
- Tasks (bars)
- Duration
- Dependencies
- Milestones

---

## Specialized Charts

### Gauge / Dial Charts

**Best For**:
- Single KPI vs. target
- Visual impact
- Speed vs. accuracy trade-off

**Limitations**:
- Poor precision
- Limited comparison
- Dashboard decoration risk

**When Appropriate**:
- High-level summary
- Traffic light indicators
- Single metric dashboards

### KPI Cards

**Best For**:
- Single number display
- Quick status
- Sparkline trends

**Elements**:
```
┌─────────────────────┐
│ Total Revenue       │
│                     │
│    $1,234,567       │
│    ↑ 12% vs LY     │
│                     │
│ ─────────────────── │
│ Jan  Feb  Mar  Apr  │
└─────────────────────┘
```

### Radar / Spider Charts

**Best For**:
- Multi-variable comparison
- Profile visualization
- Skills assessment

**Best Practices**:
- 3-8 axes
- Consistent scales
- Limited series

---

## Tables

### When Tables Work

**Better Than Charts**:
- Precise values needed
- Many categories
- Sorting/filtering
- Multiple data types

### Table Design

| Element | Recommendation |
|---------|---------------|
| Alignment | Numbers right, text left |
| Headers | Bold, sticky |
| Rows | Zebra striping optional |
| Sorting | Clear indicators |
| Pagination | For > 20 rows |

---

## Chart Selection Matrix

| Data Type | Best Choice | Alternatives |
|-----------|-------------|--------------|
| Over time | Line | Area, Bar |
| By category | Bar | Pie, Bullet |
| Part to whole | Stacked Bar | Pie (≤5) |
| Distribution | Histogram | Box Plot |
| Relationship | Scatter | Bubble |
| Geographic | Choropleth | Heat Map |
| Flow | Sankey | Alluvial |
| Single KPI | Gauge | KPI Card |

---

## Common Mistakes

### 1. Pie Chart Misuse
- Too many slices
- Comparing similar values
- 3D distortion

### 2. Axis Manipulation
- Truncated Y-axis without indication
- Logarithmic without explanation
- Dual Y-axes confusing

### 3. Chartjunk
- Unnecessary 3D
- Heavy gridlines
- Decorative elements
- Rainbow color scales

### 4. Inappropriate Type
- Line chart for categories
- Pie for comparison
- Map for non-geographic data

---

## Summary

| Chart Type | Primary Use | Precision | Data Type |
|------------|-------------|----------|-----------|
| Bar | Comparison | High | Categorical |
| Line | Trends | High | Temporal |
| Pie | Proportion | Medium | Part-to-whole |
| Scatter | Relationship | High | Two variables |
| Box Plot | Distribution | Medium | Continuous |
| Heat Map | Patterns | Medium | Two categories |
| KPI Card | Status | Medium | Single value |
| Table | Details | Highest | Mixed |

---

*Source: Cleveland & McGill, Edward Tufte, Stephen Few, Dataviz best practices*
