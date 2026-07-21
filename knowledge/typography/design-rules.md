# Typography Design Rules

## Overview

This document provides actionable typography design rules for software interfaces.

---

## Font Rules

### Rule 1: Primary Font

**Statement**: Use sans-serif fonts for all UI text.

**Implementation**:
```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body, button, input, select, textarea {
  font-family: var(--font-sans);
}
```

### Rule 2: Monospace for Data

**Statement**: Use monospace fonts for technical data.

**Implementation**:
```css
:root {
  --font-mono: 'JetBrains Mono', Consolas, monospace;
}

code, pre, .device-id, .timestamp, .numeric {
  font-family: var(--font-mono);
}
```

### Rule 3: System Fallbacks

**Statement**: Always provide system font fallbacks.

**Implementation**:
```css
font-family: 'Inter', 
             -apple-system,    /* macOS */
             BlinkMacSystemFont, /* Chrome macOS */
             'Segoe UI',       /* Windows */
             Roboto,          /* Android */
             sans-serif;      /* Ultimate fallback */
```

---

## Size Rules

### Rule 4: Type Scale

**Statement**: Use a consistent type scale.

**Scale (1.25 ratio)**:
```
xs:   12px   - captions, labels
sm:   14px   - secondary text
base: 16px   - body text
lg:   18px   - large body
xl:   20px   - small headings
2xl:  24px   - h2
3xl:  30px   - h1
4xl:  36px   - display
```

### Rule 5: Minimum Size

**Statement**: Body text must be at least 14px.

**Implementation**:
```css
body {
  font-size: 16px;  /* Never below 14px */
}
```

### Rule 6: Relative Units

**Statement**: Use relative units for scalability.

```css
/* Good */
font-size: 1rem;
font-size: 1.5em;
font-size: 100%;

/* Avoid */
font-size: 16px;  /* Fixed - avoid */
```

---

## Weight Rules

### Rule 7: Weight Hierarchy

**Statement**: Use weight to reinforce hierarchy.

| Element | Weight | Value |
|---------|--------|-------|
| Display | Bold | 700 |
| H1 | Bold | 700 |
| H2 | Semibold | 600 |
| H3 | Semibold | 600 |
| Body | Regular | 400 |
| Caption | Regular | 400 |

### Rule 8: Consistent Weight Usage

**Statement**: Limit font weights to 3-4 per typeface.

```css
/* Limit weights */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

---

## Spacing Rules

### Rule 9: Line Height

**Statement**: Set appropriate line height.

| Context | Line Height |
|---------|-------------|
| Headlines | 1.2 |
| Body | 1.5 |
| Compact UI | 1.3 |
| Code | 1.6 |

**Implementation**:
```css
h1, h2, h3 { line-height: 1.2; }
p, li { line-height: 1.5; }
code, pre { line-height: 1.6; }
```

### Rule 10: Line Length

**Statement**: Limit line length for readability.

```css
p, article {
  max-width: 65ch;  /* Characters */
  /* OR */
  max-width: 600px; /* Pixels */
}
```

### Rule 11: Letter Spacing

**Statement**: Adjust letter spacing appropriately.

```css
/* Tighten headlines */
h1 { letter-spacing: -0.02em; }
h2 { letter-spacing: -0.01em; }

/* Loosen caps */
.overline, .label-caps {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75em;
}
```

---

## Color Rules

### Rule 12: Contrast Ratio

**Statement**: Meet WCAG AA contrast requirements.

```css
/* Normal text: 4.5:1 minimum */
color: #333;       /* 12.6:1 on white */
color: #666;       /* 5.7:1 on white */

/* Large text: 3:1 minimum */
color: #767676;    /* 5.7:1 on white */
```

### Rule 13: Text Hierarchy

**Statement**: Use color to establish hierarchy.

```css
.text-primary { color: #111827; }   /* High emphasis */
.text-secondary { color: #6B7280; } /* Medium emphasis */
.text-muted { color: #9CA3AF; }    /* Low emphasis */
```

---

## Alignment Rules

### Rule 14: Text Alignment

**Statement**: Left-align body text.

```css
body, p, li {
  text-align: left;  /* Default for LTR */
}
```

### Rule 15: Number Alignment

**Statement**: Right-align numbers.

```css
td.number {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
```

---

## Number Rules

### Rule 16: Tabular Numbers

**Statement**: Use tabular numbers for data displays.

```css
table, .data-display {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```

### Rule 17: Number Formatting

**Statement**: Use consistent number formatting.

```javascript
// Currency
formatCurrency(1234.56)  // "$1,234.56"

// Large numbers
formatCompact(1234567)   // "1.23M"

// Percentages
formatPercent(0.125)    // "12.5%"
```

---

## Responsive Rules

### Rule 18: Responsive Scale

**Statement**: Adjust typography for screen sizes.

```css
/* Mobile first */
h1 { font-size: 1.5rem; }

/* Scale up */
@media (min-width: 768px) {
  h1 { font-size: 2rem; }
}

@media (min-width: 1200px) {
  h1 { font-size: 2.5rem; }
}
```

### Rule 19: Fluid Typography

**Statement**: Use fluid typography where appropriate.

```css
h1 {
  font-size: clamp(1.5rem, 2.5vw + 1rem, 2.5rem);
}
```

---

## Accessibility Rules

### Rule 20: Touch Targets

**Statement**: Ensure sufficient touch target size.

```css
button, a {
  min-height: 44px;
  padding: 0.5rem 1rem;
}
```

### Rule 21: Focus Indicators

**Statement**: Provide visible focus indicators.

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Rule 22: Reduced Motion

**Statement**: Respect user motion preferences.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Summary Table

| Category | Rule | Requirement |
|----------|------|-------------|
| Font | Sans-serif | Primary typeface |
| Font | Monospace | Data/technical |
| Size | Scale | Use consistent scale |
| Size | Minimum | 14px body |
| Weight | Hierarchy | 3-4 weights |
| Line Height | Context | 1.2-1.6 |
| Line Length | Limit | 60-75 chars |
| Contrast | WCAG | 4.5:1 AA |
| Alignment | Numbers | Right-aligned |
| Numbers | Tabular | Data displays |

---

*Source: Typography best practices, WCAG guidelines*
