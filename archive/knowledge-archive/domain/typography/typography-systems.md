# Typography Systems

## Overview

This document defines typography systems for consistent, scalable typography in software interfaces.

---

## Design System Typography

### Core Properties

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 1.8;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

---

## Type Scale

### Material Design Scale

| Name | Size | Weight | Use |
|------|------|--------|-----|
| Display Large | 57px | 400 | - |
| Display Medium | 45px | 400 | Hero numbers |
| Display Small | 36px | 400 | - |
| Headline Large | 32px | 400 | H1 |
| Headline Medium | 28px | 400 | H2 |
| Headline Small | 24px | 400 | H3 |
| Title Large | 22px | 400 | Card titles |
| Title Medium | 16px | 500 | H4 |
| Title Small | 14px | 500 | Labels |
| Body Large | 16px | 400 | Primary |
| Body Medium | 14px | 400 | Secondary |
| Body Small | 11px | 400 | Captions |
| Label Large | 14px | 500 | Buttons |
| Label Medium | 12px | 500 | Form labels |
| Label Small | 11px | 500 | Badges |

---

## Modular Scale

### Definition

A series of sizes based on a mathematical ratio.

### Common Ratios

| Ratio | Name | Use |
|-------|------|-----|
| 1.067 | Minor Second | Subtle |
| 1.125 | Major Second | - |
| 1.200 | Minor Third | Default |
| 1.250 | Major Third | Bold |
| 1.333 | Perfect Fourth | - |
| 1.500 | Perfect Fifth | - |

### SCSS Implementation

```scss
// Perfect Fourth (1.333)
$base: 1rem;  // 16px

$scale: (
  xs:   $base * 0.75,     // 12px
  sm:   $base * 0.875,    // 14px
  base: $base,            // 16px
  lg:   $base * 1.125,    // 18px
  xl:   $base * 1.25,     // 20px
  2xl:  $base * 1.5,       // 24px
  3xl:  $base * 2,        // 32px
  4xl:  $base * 2.5        // 40px
);
```

---

## Responsive Typography

### Fluid Typography

```css
/* Clamp between min and max */
h1 {
  font-size: clamp(1.5rem, 2.5vw + 1rem, 2.5rem);
}

/* Breakpoint-based */
@media (min-width: 768px) {
  h1 { font-size: 2rem; }
}

@media (min-width: 1200px) {
  h1 { font-size: 2.5rem; }
}
```

### Scale by Breakpoint

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 | 24px | 28px | 32px |
| H2 | 20px | 24px | 24px |
| H3 | 18px | 18px | 18px |
| Body | 16px | 16px | 16px |

---

## CSS Custom Properties System

### Semantic Tokens

```css
:root {
  /* Semantic colors mapped to typography */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-muted: #9CA3AF;
  --color-text-inverse: #FFFFFF;

  /* Typography semantic tokens */
  --typography-display: 
    700 2rem/1.2 
    var(--font-sans)
    var(--tracking-tight);

  --typography-heading-1: 
    700 clamp(1.5rem, 2.5vw, 2rem)/1.2 
    var(--font-sans);

  --typography-heading-2: 
    600 clamp(1.25rem, 2vw, 1.5rem)/1.3 
    var(--font-sans);

  --typography-body: 
    400 1rem/1.5 
    var(--font-sans);

  --typography-body-small: 
    400 0.875rem/1.5 
    var(--font-sans);

  --typography-label: 
    500 0.875rem/1.4 
    var(--font-sans);

  --typography-code: 
    400 0.875rem/1.5 
    var(--font-mono);
}
```

### Usage

```css
.heading {
  font: var(--typography-heading-1);
}

.body {
  font: var(--typography-body);
}
```

---

## Typography Utility Classes

### Tailwind-Inspired

```css
/* Font families */
.font-sans { font-family: var(--font-sans); }
.font-mono { font-family: var(--font-mono); }

/* Font sizes */
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
.text-4xl { font-size: var(--text-4xl); }

/* Font weights */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

/* Line heights */
.leading-tight { line-height: 1.2; }
.leading-snug { line-height: 1.3; }
.leading-normal { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }
.leading-loose { line-height: 1.8; }

/* Letter spacing */
.tracking-tight { letter-spacing: -0.02em; }
.tracking-normal { letter-spacing: 0; }
.tracking-wide { letter-spacing: 0.02em; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-widest { letter-spacing: 0.1em; }
```

---

## Component Typography

### Button

```css
.btn {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
}

.btn-lg {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
}
```

### Input

```css
.input {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

### Table

```css
.table-header {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.table-cell {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
}
```

---

## Summary

| System | Purpose |
|--------|---------|
| Type Scale | Consistent sizes |
| Modular Scale | Mathematical harmony |
| Responsive | Adapts to screens |
| Tokens | Semantic naming |
| Utilities | Rapid development |

---

*Source: Material Design, Tailwind CSS, design system best practices*
