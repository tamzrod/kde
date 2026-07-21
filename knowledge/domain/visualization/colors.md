# Color Systems for Dashboards

## Overview

This document establishes principles for effective color use in dashboards, including semantic colors, dark/light modes, and accessibility.

---

## Color Fundamentals

### Color Purposes

| Purpose | Description | Examples |
|---------|-------------|----------|
| Semantic | Indicates meaning | Status, alerts |
| Categorical | Distinguishes groups | Chart series |
| Sequential | Shows magnitude | Heat maps |
| Diverging | Shows deviation | +/-

### Color Properties

**Hue**: The color itself (red, blue, green)
**Saturation**: Color intensity (vivid vs. muted)
**Lightness/Value**: Light vs. dark

---

## Semantic Colors

### Status Colors

| Status | Light Mode | Dark Mode | Usage |
|--------|-----------|-----------|-------|
| Success | #22C55E | #22C55E | Positive, normal |
| Warning | #F59E0B | #FBBF24 | Attention needed |
| Error | #EF4444 | #F87171 | Critical, failure |
| Info | #3B82F6 | #60A5FA | Neutral information |

### State Colors

| State | Color | Notes |
|-------|-------|-------|
| Normal | Neutral | Default state |
| Selected | Highlighted | Active selection |
| Disabled | Muted | Unavailable |
| Hover | Slightly brighter | Interactive feedback |

---

## Dashboard Color Schemes

### Light Mode

```css
:root {
  /* Background */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F3F4F6;
  --bg-tertiary: #E5E7EB;
  
  /* Text */
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  
  /* Borders */
  --border-default: #D1D5DB;
  --border-strong: #9CA3AF;
  
  /* Chart Colors */
  --chart-1: #3B82F6;  /* Blue */
  --chart-2: #22C55E;  /* Green */
  --chart-3: #F59E0B;  /* Amber */
  --chart-4: #EF4444;  /* Red */
  --chart-5: #8B5CF6;  /* Purple */
  --chart-6: #06B6D4;  /* Cyan */
}
```

### Dark Mode

```css
:root[data-theme="dark"] {
  /* Background */
  --bg-primary: #111827;
  --bg-secondary: #1F2937;
  --bg-tertiary: #374151;
  
  /* Text */
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  
  /* Borders */
  --border-default: #4B5563;
  --border-strong: #6B7280;
  
  /* Chart Colors - Brighter for dark bg */
  --chart-1: #60A5FA;  /* Blue */
  --chart-2: #4ADE80;  /* Green */
  --chart-3: #FBBF24;  /* Amber */
  --chart-4: #F87171;  /* Red */
  --chart-5: #A78BFA;  /* Purple */
  --chart-6: #22D3EE;  /* Cyan */
}
```

---

## Chart Color Palettes

### Categorical (Qualitative)

For distinguishing categories (max 8-10):

```css
/* Light background */
.chart-palette-light {
  --cat-1: #3B82F6;  /* Blue */
  --cat-2: #22C55E;  /* Green */
  --cat-3: #F59E0B;  /* Amber */
  --cat-4: #EF4444;  /* Red */
  --cat-5: #8B5CF6;  /* Purple */
  --cat-6: #06B6D4;  /* Cyan */
  --cat-7: #EC4899;  /* Pink */
  --cat-8: #84CC16;  /* Lime */
}

/* Dark background - lighter colors */
.chart-palette-dark {
  --cat-1: #60A5FA;
  --cat-2: #4ADE80;
  --cat-3: #FBBF24;
  --cat-4: #F87171;
  --cat-5: #A78BFA;
  --cat-6: #22D3EE;
  --cat-7: #F472B6;
  --cat-8: #BEF264;
}
```

### Sequential (Single Hue)

For ordered data (low → high):

```css
/* Blue sequential */
.sequential-blue {
  --seq-1: #EFF6FF;  /* Lightest */
  --seq-2: #BFDBFE;
  --seq-3: #93C5FD;
  --seq-4: #60A5FA;
  --seq-5: #3B82F6;
  --seq-6: #2563EB;  /* Darkest */
}
```

### Diverging (Two Hues)

For data with meaningful center:

```css
/* Red-Green diverging */
.diverging-rg {
  --div-low: #EF4444;   /* Negative */
  --div-mid: #F3F4F6;   /* Neutral */
  --div-high: #22C55E;  /* Positive */
}
```

---

## Accessibility

### Contrast Requirements

| Element | Minimum Ratio | Recommended |
|---------|--------------|--------------|
| Normal text | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |

### Contrast Checker Tool

Use tools like:
- WebAIM Contrast Checker
- Color Oracle
- Figma Contrast plugin

### Color-Blind Friendly

**Safe Palettes**:
```css
/* Colorblind-safe categorical palette */
.colorblind-safe {
  --cb-1: #0072B2;  /* Blue */
  --cb-2: #E69F00;  /* Orange */
  --cb-3: #009E73;  /* Green */
  --cb-4: #CC79A7;  /* Pink */
  --cb-5: #D55E00;  /* Vermillion */
  --cb-6: #56B4E9;  /* Sky blue */
}
```

### Patterns + Color

For accessibility, add secondary indicators:

```css
/* Pattern fills for colorblind users */
.pattern-solid { /* Default */ }
.pattern-stripe {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    currentColor 2px,
    currentColor 4px
  );
}
.pattern-dot {
  background-image: radial-gradient(
    currentColor 1px,
    transparent 1px
  );
}
```

---

## Dark Mode Principles

### Don't Just Invert

**Wrong Approach**:
```css
/* Don't just invert */
[data-theme="dark"] {
  filter: invert(1);
}
```

**Correct Approach**:
```css
/* Define explicit dark colors */
:root[data-theme="dark"] {
  --bg-primary: #1A1A2E;
  --text-primary: #EAEAEA;
  /* ... all explicit */
}
```

### Saturation Adjustments

| Light Mode | Dark Mode | Reason |
|-----------|-----------|--------|
| 100% sat | 80-90% sat | Vivid on dark is harsh |
| Dark colors | Lighter | Show on dark bg |
| Light colors | Slightly muted | Less glow effect |

### Elevation in Dark Mode

**Background Elevation**:
```css
/* Dark mode uses lighter backgrounds for elevation */
:root[data-theme="dark"] {
  --bg-base: #121212;
  --bg-raised: #1E1E1E;    /* +5% lightness */
  --bg-elevated: #2D2D2D; /* +10% lightness */
  --bg-floating: #3D3D3D; /* +15% lightness */
}
```

---

## Color System Implementation

### CSS Variables

```css
:root {
  /* Semantic tokens */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* Aliases */
  --color-on: var(--color-success);
  --color-off: var(--text-muted);
  --color-active: var(--color-info);
}

/* Usage */
.button-success {
  background-color: var(--color-success);
}
```

### Tailwind Config Example

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          500: '#3B82F6',
          900: '#1E3A8A',
        },
        semantic: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      }
    }
  }
}
```

---

## Summary

| Category | Principle |
|----------|-----------|
| Semantic | Colors convey meaning |
| Contrast | Meet WCAG requirements |
| Dark Mode | Explicit colors, not inversion |
| Palette | Match background brightness |
| Accessibility | Patterns + color |

---

*Source: WCAG 2.1, Material Design, Carbon Design System, Tableau Color Palette*
