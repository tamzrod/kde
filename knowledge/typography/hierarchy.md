# Typography Hierarchy

## Overview

This document defines typography hierarchy for software interfaces, establishing levels for different text types.

---

## Hierarchy Levels

### Overview

| Level | Name | Size | Weight | Use Case |
|-------|------|------|--------|----------|
| 1 | Display | 32-48px | Bold | Hero, major headings |
| 2 | H1 | 24-32px | Bold | Page titles |
| 3 | H2 | 20-24px | Semibold | Section titles |
| 4 | H3 | 18px | Semibold | Subsection |
| 5 | H4 | 16px | Medium | Component titles |
| 6 | Body | 14-16px | Regular | Primary content |
| 7 | Small | 12-14px | Regular | Secondary content |
| 8 | Caption | 11-12px | Regular | Labels, footnotes |

---

## Display Text (Level 1)

### Definition

Largest text, used sparingly for maximum impact.

### Specifications

```css
.display {
  font-size: clamp(2rem, 5vw, 3rem);  /* 32-48px */
  font-weight: 700;                    /* Bold */
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

### Use Cases
- Hero sections
- Landing page headlines
- Major numerical displays
- Error pages

---

## Headlines (H1)

### Definition

Page-level titles that introduce content sections.

### Specifications

```css
h1 {
  font-size: clamp(1.5rem, 3vw, 2rem);  /* 24-32px */
  font-weight: 700;                       /* Bold */
  line-height: 1.2;
  letter-spacing: -0.01em;
}
```

### Use Cases
- Page titles
- Major section headings
- Modal titles

---

## Section Titles (H2)

### Definition

Major content divisions within a page.

### Specifications

```css
h2 {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);  /* 20-24px */
  font-weight: 600;                              /* Semibold */
  line-height: 1.3;
}
```

### Use Cases
- Card titles
- Panel headings
- Navigation section titles

---

## Subsection (H3)

### Definition

Subdivisions within sections.

### Specifications

```css
h3 {
  font-size: 1.125rem;  /* 18px */
  font-weight: 600;      /* Semibold */
  line-height: 1.4;
}
```

### Use Cases
- List item headings
- Table section headers
- Accordion titles

---

## Body Text

### Definition

Primary content text for reading.

### Specifications

```css
body {
  font-size: 1rem;      /* 16px */
  font-weight: 400;       /* Regular */
  line-height: 1.5;
}
```

### Use Cases
- Paragraph content
- Descriptions
- Instructions

---

## Small Text

### Definition

Secondary information that supplements primary content.

### Specifications

```css
.text-sm {
  font-size: 0.875rem;  /* 14px */
  font-weight: 400;
  line-height: 1.5;
}
```

### Use Cases
- Metadata
- Timestamps
- Secondary descriptions
- Helper text

---

## Labels

### Definition

Identifying text for form controls and data.

### Specifications

```css
label {
  font-size: 0.875rem;  /* 14px */
  font-weight: 500;       /* Medium */
  line-height: 1.4;
}
```

### Variations

```css
/* Form labels */
.form-label {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Table headers */
.table-header {
  font-size: 0.75rem;    /* 12px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Captions & Overlines

### Definition

Short, descriptive text over content.

### Specifications

```css
.caption {
  font-size: 0.75rem;    /* 12px */
  font-weight: 400;
  line-height: 1.4;
}

.overline {
  font-size: 0.625rem;    /* 10px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### Use Cases
- Chart labels
- Image captions
- Section overlines
- Category labels

---

## Button Text

### Definition

Text within interactive controls.

### Specifications

```css
/* Default button */
.btn {
  font-size: 0.875rem;  /* 14px */
  font-weight: 500;
}

/* Large button */
.btn-lg {
  font-size: 1rem;       /* 16px */
  font-weight: 600;
}

/* Small button */
.btn-sm {
  font-size: 0.75rem;    /* 12px */
  font-weight: 500;
}
```

---

## Code Text

### Definition

Technical identifiers and code.

### Specifications

```css
code {
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  font-size: 0.875em;    /* 0.875 × parent */
  font-variant-numeric: tabular-nums;
}
```

---

## Dashboard Hierarchy Example

### Layout

```
┌─────────────────────────────────────────────────────┐
│ DISPLAY: System Status           [Date/Time]      │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌─────────────────┐ ┌─────────────────────────────┐ │
│ │ H3: KPIs       │ │ H3: Performance Metrics     │ │
│ │                 │ │                             │ │
│ │ Body: 4 active │ │ Body: Response time chart  │ │
│ │ Body: 12 idle │ │                             │ │
│ │                │ │                             │ │
│ └─────────────────┘ └─────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### CSS Classes

```css
.display { font-size: 2rem; font-weight: 700; }
.h3 { font-size: 1.125rem; font-weight: 600; }
.body { font-size: 1rem; font-weight: 400; }
.caption { font-size: 0.75rem; font-weight: 400; }
```

---

## Summary

| Level | Element | Size | Weight | Purpose |
|-------|---------|------|--------|---------|
| 1 | Display | 32-48px | Bold | Hero impact |
| 2 | H1 | 24-32px | Bold | Page titles |
| 3 | H2 | 20-24px | Semibold | Sections |
| 4 | H3 | 18px | Semibold | Subsections |
| 5 | Body | 14-16px | Regular | Content |
| 6 | Small | 12-14px | Regular | Secondary |
| 7 | Caption | 11-12px | Regular | Labels |

---

*Source: Material Design, IBM Carbon, design system best practices*
