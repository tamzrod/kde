# Typography Fundamentals

## Overview

This document establishes fundamental typography principles for professional software interfaces.

---

## Core Concepts

### Typography vs. Type

| Term | Definition |
|------|------------|
| **Type** | Individual letters, numbers, characters |
| **Typography** | The art and technique of arranging type |
| **Typeface** | A family of fonts (e.g., Arial) |
| **Font** | Specific weight/style (e.g., Arial Bold) |

### Key Terminology

```
Baseline ───────────────────────────
    │
    │  x-height
    │  ┌───┐
    │  │ x │  ← x-height: height of lowercase x
    │  └───┘
Ascender ─────┐
              │    ┌───┐
     Cap      │    │ H │  ← Cap height: height of capital H
    Height    │    └───┘
              │
              └───────── Descender line
```

---

## Readability vs. Legibility

### Readability

**Definition**: How easily users can read and understand textual content.

**Factors**:
- Word and sentence length
- Line spacing
- Line length
- Contrast
- Text formatting

### Legibility

**Definition**: How easily users can distinguish individual characters.

**Factors**:
- Font design
- Character spacing
- Font size
- Weight variation
- Stroke contrast

---

## Visual Hierarchy

### Purpose

> "Typography creates visual hierarchy, guiding the user's eye to what matters most."

**Hierarchy Elements**:
1. Size (larger = more important)
2. Weight (bold = emphasis)
3. Color (contrast = attention)
4. Position (top-left = priority)
5. Spacing (isolated = emphasized)

### Creating Hierarchy

```css
/* Size hierarchy */
h1 { font-size: 32px; font-weight: 700; }  /* Most important */
h2 { font-size: 24px; font-weight: 600; }  /* Section title */
h3 { font-size: 18px; font-weight: 600; }  /* Subsection */
body { font-size: 16px; font-weight: 400; } /* Body text */
.caption { font-size: 12px; }               /* Supporting */
```

---

## Type Scale

### Purpose

A type scale creates harmonious relationships between text sizes.

### Common Ratios

| Ratio | Name | Use Case |
|-------|------|----------|
| 1.067 | Minor Second | Subtle hierarchy |
| 1.125 | Major Second | Tight hierarchy |
| 1.200 | Minor Third | Default (common) |
| 1.250 | Major Third | Strong hierarchy |
| 1.333 | Perfect Fourth | Bold hierarchy |
| 1.500 | Perfect Fifth | Dramatic |
| 1.618 | Golden Ratio | Elegant |

### Example Scale (Base 16px, Minor Third)

```
12px   = 12px     (xs)
14px   = 14px     (sm)
16px   = 16px     (base)
19px   = 19px     (lg)
23px   = 23px     (xl)
28px   = 28px     (2xl)
34px   = 34px     (3xl)
41px   = 41px     (4xl)
```

---

## Line Height (Leading)

### Definition

The vertical space between lines of text.

### Guidelines

| Context | Line Height | Notes |
|---------|-------------|-------|
| Headlines | 1.2 - 1.3 | Tight for short lines |
| Body text | 1.4 - 1.6 | Comfortable reading |
| Long text | 1.6 - 1.8 | Generous for extended reading |
| Compact UI | 1.2 - 1.4 | Tighter spacing |
| Code | 1.4 - 1.6 | Monospace typically needs more |

### Formula

```css
/* General guideline: 120-145% of font size */
line-height: 1.5;  /* Unitless = multiplier */
```

---

## Line Length (Measure)

### Definition

The horizontal width of a text block.

### Optimal Range

| Type | Characters | Pixels (16px) |
|------|------------|---------------|
| Minimum | 45 | ~250px |
| Optimal | 60-75 | ~400-500px |
| Maximum | 90 | ~600px |

### Why It Matters

- Too short: Frequent line breaks, disrupted reading
- Too long: Difficulty finding next line
- Optimal: Comfortable reading rhythm

---

## Letter Spacing (Tracking)

### Definition

The uniform adjustment of space between characters.

### Guidelines

```css
/* Tight for large headings */
h1 {
  letter-spacing: -0.02em;
}

/* Normal for body */
body {
  letter-spacing: 0;
}

/* Loose for small caps */
.small-caps {
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.85em;
}
```

### When to Adjust

| Context | Adjustment | Purpose |
|---------|------------|---------|
| Large headlines | Tighten (-0.02em) | Optical balance |
| All caps labels | Loosen (0.05em) | Readability |
| Small text | Slightly loosen | Clarity |

---

## Word Spacing

### Guidelines

| Context | Spacing | Notes |
|---------|---------|-------|
| Normal | 0.25em | Default |
| Justified | Variable | May create gaps |
| Tight | 0.1em | For large text |

---

## Text Alignment

### Types

| Alignment | Use Case |
|-----------|----------|
| **Left** | Body text (default for LTR) |
| **Right** | Numbers in tables, RTL text |
| **Center** | Headlines, short text |
| **Justified** | Print, careful with web |

### Guidelines

```css
/* Left-align body text for readability */
p, li {
  text-align: left;
}

/* Right-align numbers for comparison */
td.numeric {
  text-align: right;
}
```

---

## Summary

| Principle | Guideline |
|-----------|----------|
| Readability | Easy reading of content |
| Legibility | Clear character distinction |
| Hierarchy | Size, weight, color create priority |
| Line height | 1.4-1.6 for body text |
| Line length | 60-75 characters optimal |
| Letter spacing | Tighten headings, loosen caps |
| Alignment | Left-align body, right-align numbers |

---

*Source: Material Design, Nielsen Norman Group, typographic principles*
