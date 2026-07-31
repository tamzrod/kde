# Dashboard Design Rules

## Overview

This document provides actionable design rules for creating professional dashboards.

---

## Layout Rules

### Rule 1: Grid Alignment

| Requirement | Implementation |
|-------------|----------------|
| Consistent spacing | 8px or 16px grid |
| Card alignment | Use CSS Grid |
| Responsive breakpoints | 768px, 1024px, 1440px |

### Rule 2: Visual Hierarchy

```
Position Priority:
┌──────────────────────────────┐
│    Top-Left (HIGHEST)        │
│         │                    │
│         │                    │
│         │ (decreases →)      │
│         │                    │
│         ▼                    │
│    Bottom-Right (LOWEST)     │
└──────────────────────────────┘
```

### Rule 3: White Space

| Element | Minimum Spacing |
|---------|----------------|
| Card padding | 16px |
| Card gap | 16px |
| Section gap | 24px |
| Edge margin | 16-24px |

---

## Typography Rules

### Rule 4: Font Hierarchy

| Element | Size | Weight |
|---------|------|--------|
| H1 (Page title) | 24-30px | Bold (700) |
| H2 (Section) | 18-20px | Semibold (600) |
| H3 (Card title) | 16px | Semibold (600) |
| Body | 14px | Regular (400) |
| Caption | 12px | Regular (400) |

### Rule 5: Number Alignment

```css
.table-numbers {
  font-family: monospace;
  font-variant-numeric: tabular-nums;
  text-align: right;
}
```

---

## Color Rules

### Rule 6: Semantic Color Usage

| Meaning | Color | Hex |
|---------|-------|-----|
| Success | Green | #22C55E |
| Warning | Amber | #F59E0B |
| Error | Red | #EF4444 |
| Info | Blue | #3B82F6 |
| Neutral | Gray | #6B7280 |

### Rule 7: Contrast Ratio

| Text Type | Minimum | Target |
|-----------|---------|--------|
| Body text | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |

### Rule 8: Dark Mode

```css
:root[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #F9FAFB;
  /* NOT simple inversion */
}
```

---

## Chart Rules

### Rule 9: Bar Chart

- Start Y-axis at zero
- Use horizontal for many categories
- Avoid 3D effects
- Maximum 10 bars per chart

### Rule 10: Line Chart

- Maximum 5 lines
- Use markers for sparse data
- Consider smoothing for noisy data
- Label directly or use legend

### Rule 11: Pie Chart

- Maximum 5 slices
- No 3D effects
- Direct labels for > 2 items
- Consider bar chart alternative

### Rule 12: Chart Colors

```css
/* Light background palette */
.chart-palette {
  --chart-1: #3B82F6;  /* Blue */
  --chart-2: #22C55E;  /* Green */
  --chart-3: #F59E0B;  /* Amber */
  --chart-4: #EF4444;  /* Red */
  --chart-5: #8B5CF6;  /* Purple */
}
```

---

## Interaction Rules

### Rule 13: Hover Feedback

```css
.interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

### Rule 14: Click Feedback

```css
.button:active {
  transform: scale(0.98);
}
```

### Rule 15: Loading States

| Element | State |
|---------|-------|
| Cards | Skeleton |
| Charts | Spinner or skeleton |
| Tables | Row skeleton |
| Buttons | Spinner + disabled |

---

## Animation Rules

### Rule 16: Duration

| Animation | Duration |
|-----------|----------|
| Micro-interaction | 100-150ms |
| State change | 200-300ms |
| Page transition | 300-500ms |

### Rule 17: Easing

```css
/* Enter: Fast start, slow end */
.ease-enter {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

/* Exit: Slow start, fast end */
.ease-exit {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
```

### Rule 18: Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Data Rules

### Rule 19: Number Formatting

```javascript
// Consistent formatting
formatCurrency(1234.56)  // $1,234.56
formatNumber(1234567)    // 1.23M
formatPercent(0.125)    // 12.5%
```

### Rule 20: Date Formatting

```javascript
// Human-readable
formatDate(date, 'MMM D, YYYY')  // Jan 15, 2024
formatTime(time, 'h:mm A')       // 2:30 PM

// ISO for data
formatDateISO(date)  // 2024-01-15
```

### Rule 21: Empty States

```
┌────────────────────────────────────┐
│                                    │
│          [Illustration]             │
│                                    │
│        No data to display          │
│                                    │
│     Start by adding data...        │
│                                    │
│         [+ Add Item]               │
│                                    │
└────────────────────────────────────┘
```

---

## Table Rules

### Rule 22: Alignment

| Content | Alignment |
|---------|-----------|
| Text | Left |
| Numbers | Right |
| Actions | Right |
| Status | Center |

### Rule 23: Row Density

| Density | Row Height | Use |
|---------|------------|-----|
| Comfortable | 52px | Default |
| Standard | 44px | Most cases |
| Compact | 36px | Many columns |

---

## Responsive Rules

### Rule 24: Breakpoints

```css
/* Mobile first */
.container { max-width: 100%; }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large */ }
```

### Rule 25: Touch Targets

```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

---

## Accessibility Rules

### Rule 26: Color + Shape

```css
/* Never rely on color alone */
.status-success::before {
  content: '●';
  color: green;
}
.status-error::before {
  content: '✕';
  color: red;
}
```

### Rule 27: Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

---

## Performance Rules

### Rule 28: Virtualize Large Lists

```javascript
// For > 50 rows
<VirtualList items={data} rowHeight={48} />
```

### Rule 29: Lazy Load Charts

```javascript
const Chart = React.lazy(() => import('./Chart'));
<Suspense fallback={<Skeleton />}><Chart /></Suspense>
```

---

## Summary

| Category | Rules |
|----------|-------|
| Layout | Grid, hierarchy, white space |
| Typography | Hierarchy, alignment, number format |
| Color | Semantic, contrast, dark mode |
| Charts | Type selection, palette |
| Interaction | Hover, click, loading states |
| Animation | Duration, easing, motion |
| Data | Formatting, empty states |
| Table | Alignment, density |
| Responsive | Breakpoints, touch targets |
| Accessibility | Color + shape, focus |
| Performance | Virtualization, lazy load |

---

*Source: Dashboard design best practices, accessibility guidelines*
