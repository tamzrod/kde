# Typography for Dashboards

## Overview

This document covers typography principles for dashboards, including font selection, hierarchy, and readability.

---

## Font Selection

### Sans-Serif for Dashboards

**Recommended**:
| Font | Use Case | Notes |
|------|----------|-------|
| Inter | UI text, labels | Excellent legibility |
| System UI | Native feel | Works everywhere |
| Roboto | Material apps | Clean |
| SF Pro | Apple platforms | Premium feel |

**When to Use Serif**:
- Editorial content
- Long-form reading
- Print-inspired designs

### Monospace for Data

**Recommended**:
| Font | Use Case |
|------|----------|
| JetBrains Mono | Code, IDs |
| Fira Code | Technical data |
| Source Code Pro | Numeric displays |
| Consolas | Windows native |

---

## Typography Scale

### Base System

```css
:root {
  /* Scale (1.25 ratio) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
}
```

### Dashboard Hierarchy

| Element | Size | Weight | Line Height |
|---------|------|--------|--------------|
| Page Title | 24-30px | Bold | 1.2 |
| Section | 18-20px | Semibold | 1.3 |
| Card Title | 16-18px | Semibold | 1.4 |
| Body Text | 14-16px | Regular | 1.5 |
| Labels | 12-14px | Medium | 1.4 |
| Captions | 11-12px | Regular | 1.4 |

---

## Numeric Display

### Tables and Data

**Alignment**:
| Type | Alignment | Example |
|------|-----------|---------|
| Numbers | Right | 1,234.56 |
| Currency | Right | $1,234.56 |
| Text | Left | Product Name |
| Dates | Left or Center | Jan 15, 2024 |
| IDs | Left | ORD-12345 |

**Monospace for Alignment**:
```css
.numeric {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}
```

### Number Formatting

**Best Practices**:
```javascript
// Use consistent decimal places
formatNumber(1234.56789, 2)  // "1,234.57"
formatNumber(1234, 0)        // "1,234"

// Abbreviate large numbers
formatNumber(1234567)  // "1.23M"
formatNumber(12345)    // "12.35K"

// Show trend direction
"+12.5%"   // Positive
"-8.3%"    // Negative
"0.0%"     // Neutral
```

---

## Readability

### Line Length

| Context | Characters | Words |
|---------|------------|-------|
| Optimal | 45-75 | 8-12 |
| Maximum | 90 | 15 |
| Minimum | 30 | 5 |

### Line Height

| Text Size | Line Height |
|-----------|-------------|
| Small (< 14px) | 1.5 |
| Medium (14-18px) | 1.4 - 1.5 |
| Large (> 18px) | 1.2 - 1.4 |

### Letter Spacing

```css
/* Tight for large headings */
.text-4xl {
  letter-spacing: -0.025em;
}

/* Normal for body */
.text-base {
  letter-spacing: 0;
}

/* Loose for small caps */
.uppercase {
  letter-spacing: 0.05em;
}
```

---

## Color Contrast

### Text Contrast

| Element | Minimum Ratio | Example |
|---------|--------------|---------|
| Primary text | 4.5:1 | #333 on #fff |
| Secondary text | 3:1 | #666 on #fff |
| Disabled | - | 30% opacity |

### Dark Mode Typography

```css
:root[data-theme="dark"] {
  --text-primary: #F9FAFB;    /* 97% white */
  --text-secondary: #D1D5DB;  /* 82% white */
  --text-muted: #9CA3AF;     /* 61% white */
}
```

---

## Dashboard-Specific Guidelines

### KPI Cards

```
┌─────────────────────┐
│ Revenue             │  ← Label (14px, secondary)
│ $1,234,567          │  ← Value (32px, bold, primary)
│ ↑ 12.5% vs last mo │  ← Change (14px, semantic color)
└─────────────────────┘
```

### Charts

| Element | Size | Weight |
|---------|------|--------|
| Chart title | 16px | Semibold |
| Axis labels | 12px | Regular |
| Legend | 12px | Regular |
| Tooltips | 12px | Regular |
| Data labels | 11px | Regular |

### Tables

| Element | Size | Weight |
|---------|------|--------|
| Header | 12-14px | Semibold |
| Body | 14px | Regular |
| Footer | 12px | Regular |

---

## Font Loading

### Performance

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use system fallbacks -->
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Display

```css
@font-face {
  font-family: 'Inter';
  font-display: swap;  /* Show text immediately */
}
```

---

## Summary

| Aspect | Guideline |
|--------|-----------|
| Font family | Sans-serif for UI, monospace for data |
| Scale | Use consistent modular scale |
| Alignment | Numbers right, text left |
| Line height | 1.2-1.5 depending on size |
| Contrast | 4.5:1 minimum for text |
| Length | 45-75 characters per line |

---

*Source: Material Design, Nielsen Norman Group, accessibility guidelines*
