# Typography Knowledge Summary

## Overview

This document synthesizes the complete typography knowledge extracted from INV-030 investigation.

---

## Core Finding

> **Professional typography in software interfaces requires a systematic approach combining font selection, consistent hierarchy, proper spacing, and accessibility compliance.**

---

## Key Principles

### 1. Readability First

Typography must prioritize readability:
- Appropriate font sizes (14px+ for body)
- Adequate line height (1.5 for body)
- Optimal line length (60-75 characters)
- High contrast (4.5:1 minimum)

### 2. Hierarchy Through Design

Visual hierarchy established through:
- Size (larger = more important)
- Weight (bold = emphasis)
- Color (contrast = attention)
- Spacing (isolated = emphasized)

### 3. System Consistency

Unified typography system:
- Consistent type scale
- Shared font stack
- Standard spacing
- Unified weights

---

## Font Selection

### Sans-Serif for UI

| Font | Type | License |
|------|------|---------|
| Inter | UI | OFL |
| Roboto | UI | Apache |
| Segoe UI | UI | System |
| SF Pro | UI | System |

### Monospace for Data

| Font | Type | License |
|------|------|---------|
| JetBrains Mono | Code/Data | OFL |
| Fira Code | Code | OFL |
| Consolas | Code | System |

### System Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

---

## Type Scale

### Standard Scale (1.25 ratio)

| Name | Size | Use |
|------|------|-----|
| xs | 12px | Captions |
| sm | 14px | Secondary |
| base | 16px | Body |
| lg | 18px | Large body |
| xl | 20px | Small headings |
| 2xl | 24px | H2 |
| 3xl | 30px | H1 |
| 4xl | 36px | Display |

---

## Spacing Guidelines

| Property | Value | Context |
|----------|-------|---------|
| Line height | 1.5 | Body text |
| Line height | 1.2 | Headlines |
| Line length | 60-75ch | Paragraphs |
| Letter spacing | -0.02em | Headlines |
| Letter spacing | 0.05em | Caps |

---

## Number Display

### Tabular Numbers

```css
table, .data {
  font-variant-numeric: tabular-nums;
}
```

### Alignment

- Numbers: Right-aligned
- Text: Left-aligned
- Data: Monospace

---

## Color Contrast

| Level | Normal Text | Large Text |
|-------|--------------|-------------|
| AAA | 7:1 | 4.5:1 |
| AA | 4.5:1 | 3:1 |
| Minimum | 4.5:1 | 3:1 |

---

## Performance

| Technique | Impact |
|-----------|--------|
| WOFF2 | 30% smaller |
| Subsetting | 50-90% smaller |
| Preload | Faster render |
| font-display: swap | Better UX |

---

## Quick Reference

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale
```css
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;  /* 24px */
```

### Contrast
```css
color: #333;       /* 12.6:1 - Excellent */
color: #666;       /* 5.7:1 - Good */
color: #767676;   /* 5.7:1 - Large text OK */
```

---

## Summary Table

| Category | Rule |
|----------|------|
| Font | Sans-serif for UI |
| Font | Monospace for data |
| Size | Consistent scale |
| Size | 14px+ minimum |
| Weight | 3-4 weights |
| Spacing | 1.5 line height |
| Contrast | 4.5:1 AA |
| Numbers | Tabular nums |
| Alignment | Numbers right |

---

## Usage

This knowledge enables KDE to generate:
- Readable typography systems
- Accessible interfaces
- Consistent hierarchies
- Professional text rendering
- Cross-platform consistency

---

*Generated from INV-030 Investigation*  
*Classification: Typography Engineering Knowledge*
