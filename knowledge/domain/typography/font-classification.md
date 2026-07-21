# Font Classification

## Overview

This document classifies font types and their appropriate uses in software interfaces.

---

## Sans-Serif Fonts

### Characteristics

- No decorative strokes (serifs) at letter ends
- Clean, modern appearance
- Excellent screen readability
- **Preferred for UI text**

### Common Sans-Serif Categories

| Category | Characteristics | Examples |
|----------|----------------|----------|
| Geometric | Perfect circles, triangles | Futura, Circular |
| Humanist | Organic, varied strokes | Gill Sans, Segoe UI |
| Grotesque | Industrial, uniform | Helvetica, Roboto |

### Use Cases

**Best For**:
- User interface text
- Body copy
- Headlines
- Labels
- Navigation

**Recommended**:
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

---

## Serif Fonts

### Characteristics

- Decorative strokes (serifs) at letter ends
- Traditional, authoritative appearance
- Better for extended reading in print
- Can work for long-form digital content

### Common Serif Categories

| Category | Characteristics | Examples |
|----------|----------------|----------|
| Old Style | Angled stress, fine serifs | Garamond, Palatino |
| Transitional | Vertical stress | Times New Roman, Georgia |
| Modern | Horizontal stress, thin serifs | Bodoni, Didot |
| Slab Serif | Thick, block serifs | Rockwell, Courier |

### Use Cases

**Appropriate For**:
- Editorial content
- Long-form articles
- Academic papers
- Print materials

**Less Appropriate For**:
- UI labels
- Small text
- Technical interfaces

---

## Monospace Fonts

### Characteristics

- Equal width for all characters
- Fixed pitch
- Code-like appearance
- **Required for technical data**

### Use Cases

**Best For**:
- Code snippets
- Device IDs
- PLC tags
- Timestamps
- Tabular numeric data
- Technical identifiers

### Common Monospace Fonts

| Font | Strengths | Notes |
|------|-----------|-------|
| JetBrains Mono | Excellent legibility | Modern, free |
| Fira Code | Ligatures, code features | Popular |
| Cascadia Code | Windows native | Microsoft |
| Source Code Pro | Adobe quality | Versatile |
| Consolas | Windows default | System font |

### CSS Usage

```css
/* Code and technical data */
font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

/* Tabular numbers */
font-family: 'JetBrains Mono', monospace;
font-variant-numeric: tabular-nums;
```

---

## Display Fonts

### Characteristics

- Highly decorative
- Designed for large sizes
- Limited readability at small sizes
- Brand-focused

### Use Cases

**Appropriate For**:
- Marketing materials
- Hero sections
- Brand elements
- Logo text

**Not Appropriate For**:
- UI text
- Body copy
- Small sizes
- Accessibility-critical content

---

## Variable Fonts

### Definition

A single font file containing multiple variations (weight, width, slant).

### Advantages

- Single file, multiple styles
- Fine-grained control
- Reduced HTTP requests
- Responsive typography

### Usage

```css
/* Weight axis */
font-variation-settings: 'wght' 400;

/* Width axis */
font-variation-settings: 'wdth' 100;

/* Custom axis (if defined) */
font-variation-settings: 'opsz' 12;
```

### Example

```css
h1 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;  /* Works if Inter is variable */
}
```

---

## Font Categories Summary

| Type | UI Text | Body | Code | Headlines | Notes |
|------|---------|------|------|-----------|-------|
| Sans-Serif | ✅ | ✅ | ❌ | ✅ | **Primary choice** |
| Serif | ❌ | ✅ | ❌ | ✅ | Long-form content |
| Monospace | ❌ | ❌ | ✅ | ❌ | Technical data only |
| Display | ❌ | ❌ | ❌ | ✅ | Marketing/branding |

---

## Platform Recommendations

### Web

**Primary**: Sans-serif system fonts
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Mobile

| Platform | Primary Font |
|----------|-------------|
| iOS | SF Pro |
| Android | Roboto |
| Windows | Segoe UI |

### Industrial/SCADA

**Recommendation**: High-readability sans-serif
- Roboto
- Inter
- Segoe UI
- IBM Plex Sans

---

## Font Selection Guidelines

### Do

- ✅ Use sans-serif for UI
- ✅ Use monospace for technical data
- ✅ Choose highly legible fonts
- ✅ Consider cross-platform consistency
- ✅ Test at intended sizes

### Don't

- ❌ Mix more than 2-3 typefaces
- ❌ Use decorative fonts for UI
- ❌ Use serif for small labels
- ❌ Choose fonts for looks alone

---

## Summary

| Font Type | Primary Use | Avoid For |
|-----------|-------------|-----------|
| Sans-Serif | UI, body, labels | - |
| Serif | Long-form content | Small UI text |
| Monospace | Code, IDs, data | General UI |
| Display | Branding, marketing | Body text |

---

*Source: Font industry standards, UI design practices*
