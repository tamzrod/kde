# Typography Best Practices

## Overview

This document consolidates typography best practices for software interfaces.

---

## General Guidelines

### Font Selection

**Do**:
- ✅ Use sans-serif for UI text
- ✅ Choose highly legible fonts
- ✅ Use system fonts when appropriate
- ✅ Test at intended sizes
- ✅ Consider cross-platform consistency

**Don't**:
- ❌ Use more than 2-3 typefaces
- ❌ Use decorative fonts for UI
- ❌ Choose fonts for aesthetics alone
- ❌ Mix incompatible styles

---

## Font Stacks

### Recommended Sans-Serif Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Recommended Monospace Stack

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'SF Mono', monospace;
```

---

## Hierarchy Best Practices

### Size Hierarchy

```css
/* Clear hierarchy */
h1 { font-size: 2rem; font-weight: 700; }     /* 32px */
h2 { font-size: 1.5rem; font-weight: 600; }   /* 24px */
h3 { font-size: 1.25rem; font-weight: 600; } /* 20px */
body { font-size: 1rem; font-weight: 400; }   /* 16px */
small { font-size: 0.875rem; }                  /* 14px */
```

### Weight Hierarchy

```css
/* Contrast through weight */
h1 { font-weight: 700; }
h2 { font-weight: 600; }
h3 { font-weight: 500; }
body { font-weight: 400; }
.caption { font-weight: 400; }
```

---

## Spacing Best Practices

### Line Height

| Context | Line Height | Notes |
|---------|-------------|-------|
| Headlines | 1.2-1.3 | Tight |
| Body text | 1.4-1.6 | Comfortable |
| Compact UI | 1.2-1.4 | Tighter |
| Long reading | 1.6-1.8 | Generous |

```css
h1, h2, h3 { line-height: 1.2; }
p, li { line-height: 1.5; }
code { line-height: 1.6; }
```

### Line Length

- Optimal: 60-75 characters
- Minimum: 45 characters
- Maximum: 90 characters

```css
p {
  max-width: 65ch;  /* Character-based width */
}
```

### Letter Spacing

```css
/* Tighten large headings */
h1 { letter-spacing: -0.02em; }
h2 { letter-spacing: -0.01em; }

/* Loosen small caps */
.label { 
  text-transform: uppercase; 
  letter-spacing: 0.05em; 
}
```

---

## Number Best Practices

### Tabular Numbers

```css
/* Always for data tables */
td.number {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  text-align: right;
}
```

### Alignment

```css
/* Numbers right-aligned */
table td:nth-child(n) {
  text-align: right;
}

/* Text left-aligned */
table td:first-child {
  text-align: left;
}
```

---

## Color Best Practices

### Contrast

```css
/* WCAG AA compliant */
.text-primary { color: #333; }      /* 12.6:1 on white */
.text-secondary { color: #666; }   /* 5.7:1 on white */
.text-disabled { color: #999; }   /* 4.5:1 on white - minimum */
```

### Text on Background

```css
/* Light on dark */
.dark-bg .text { color: #fff; }

/* Ensure contrast */
.dark-bg .text-muted { color: #ccc; }  /* 8.6:1 */
```

---

## Responsive Best Practices

### Mobile Typography

```css
/* Base mobile-first */
body { font-size: 16px; }
h1 { font-size: 1.5rem; }
h2 { font-size: 1.25rem; }

/* Scale up on larger screens */
@media (min-width: 768px) {
  body { font-size: 16px; }
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
}
```

### Fluid Typography

```css
/* Scale between breakpoints */
h1 {
  font-size: clamp(1.5rem, 2.5vw + 1rem, 2.5rem);
}
```

---

## Dashboard Best Practices

### KPI Typography

```css
.kpi-value {
  font-size: 2rem;           /* Large, readable */
  font-weight: 700;         /* Bold emphasis */
  font-variant-numeric: tabular-nums;  /* Aligned numbers */
}

.kpi-label {
  font-size: 0.875rem;     /* Smaller */
  font-weight: 500;         /* Medium emphasis */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Chart Typography

```css
.chart-title {
  font-size: 1rem;
  font-weight: 600;
}

.chart-axis {
  font-size: 0.75rem;
  font-weight: 400;
}

.chart-legend {
  font-size: 0.75rem;
}
```

---

## Industrial/SCADA Best Practices

### Technical Data

```css
/* High readability */
.technical-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}

.device-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
}
```

### Alarm Text

```css
.alarm-critical {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Accessibility Checklist

- [ ] Font size ≥ 14px for body text
- [ ] Contrast ratio ≥ 4.5:1 (AA)
- [ ] Contrast ratio ≥ 7:1 (AAA) when possible
- [ ] Line height ≥ 1.5 for body
- [ ] Line length 60-75 characters
- [ ] Touch targets ≥ 44px
- [ ] Focus indicators visible
- [ ] Reduced motion respected

---

## Performance Checklist

- [ ] Use WOFF2 format
- [ ] Subset large fonts
- [ ] Preload critical fonts
- [ ] Use font-display: swap
- [ ] Limit font families
- [ ] Limit font weights

---

## Summary

| Category | Best Practice |
|----------|---------------|
| Font | Sans-serif for UI |
| Hierarchy | Size + weight contrast |
| Spacing | 1.5 line height, 60-75 chars |
| Numbers | Tabular, right-aligned |
| Colors | 4.5:1 contrast minimum |
| Responsive | Mobile-first, fluid |
| Performance | WOFF2, subsetting |

---

*Source: Design system best practices, accessibility guidelines*
