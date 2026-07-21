# Typography Accessibility

## Overview

This document covers accessibility guidelines for typography in software interfaces.

---

## WCAG Contrast Requirements

### Contrast Ratios

| Level | Normal Text | Large Text | UI Components |
|-------|-------------|------------|----------------|
| **AAA** | 7:1 | 4.5:1 | N/A |
| **AA** | 4.5:1 | 3:1 | 3:1 |
| **Fail** | < 4.5:1 | < 3:1 | < 3:1 |

### Definitions

**Normal Text**: Less than 18pt (24px) regular or less than 14pt (18.7px) bold.

**Large Text**: At least 18pt (24px) regular or at least 14pt (18.7px) bold.

### CSS Implementation

```css
/* WCAG AA compliant */
.normal-text {
  color: #333333;        /* Dark gray */
  background: #ffffff;   /* White */
  /* Contrast: 12.6:1 ✓ */
}

.large-text {
  color: #767676;        /* Lighter gray */
  background: #ffffff;
  /* Contrast: 5.7:1 ✓ */
}
```

---

## Minimum Font Sizes

### Desktop

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Body text | 14px | 16px |
| Labels | 12px | 14px |
| Small text | 11px | 12px |
| UI text | 12px | 14px |

### Mobile

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Body text | 16px | 18px |
| Labels | 14px | 16px |
| Touch targets | 18px | N/A |

### Industrial/SCADA

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Critical data | 14px | 16px |
| Normal text | 12px | 14px |
| Labels | 11px | 12px |

---

## Color-Blind Considerations

### Types of Color Blindness

| Type | Population | Affects |
|------|-------------|---------|
| Deuteranopia | 6% (male) | Red-green |
| Protanopia | 2% (male) | Red-green |
| Tritanopia | 0.01% | Blue-yellow |

### Design Strategies

**Never rely on color alone**:

```css
/* Bad: Color-only indication */
.status-success { color: green; }

/* Good: Color + icon + text */
.status-success::before {
  content: '✓ ';
  color: green;
}
```

### Pattern + Color

```css
/* Add patterns for accessibility */
.success-pattern {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    green 5px,
    green 6px
  );
}
```

---

## Dyslexia Support

### Characteristics

- Difficulty tracking lines
- Letters appear to move
- Crowded text is hard to read

### Best Practices

**OpenDyslexic Font** (optional):
```css
@font-face {
  font-family: 'OpenDyslexic';
  src: url('OpenDyslexic.woff2');
}

.dyslexia-friendly {
  font-family: 'OpenDyslexic', sans-serif;
  letter-spacing: 0.05em;
  word-spacing: 0.1em;
  line-height: 1.8;
}
```

**General Guidelines**:
- Sans-serif fonts (easier)
- Adequate spacing
- Left-aligned text
- Adequate contrast

---

## Low Vision Support

### Guidelines

1. **Avoid pure black on white**
   - Use #333 on #fff instead of #000 on #fff

2. **Increase spacing**
   ```css
   .accessible-text {
     line-height: 1.8;
     letter-spacing: 0.02em;
     word-spacing: 0.05em;
   }
   ```

3. **Use scalable units**
   ```css
   /* Use rem/em, not px */
   .text {
     font-size: 1rem;  /* Scalable */
     /* font-size: 16px; Fixed - avoid */
   }
   ```

---

## Reduced Motion

### CSS

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### JavaScript

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Apply animations
  element.classList.add('animate');
}
```

---

## Text Resizing

### Respect User Preferences

```css
/* Don't prevent text scaling */
body {
  /* NO: font-size: 16px; */
  /* YES: */
  font-size: 1rem;
}

/* Avoid fixed dimensions */
.text-block {
  /* NO: width: 500px; */
  /* YES: */
  max-width: 40ch;  /* Character width */
}
```

### User Zoom

- Ensure layout doesn't break at 200% zoom
- Test responsive behavior
- Avoid overflow issues

---

## Focus Indicators

### Visible Focus

```css
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Don't remove outline without replacement */
:focus:not(:focus-visible) {
  outline: none;  /* Only if adding another indicator */
}
```

---

## Screen Reader Considerations

### Semantic HTML

```html
<!-- Use proper elements -->
<h1>Page Title</h1>     <!-- ✓ Heading -->
<div class="h1">Title</div>  <!-- ✗ Not announced as heading -->

<!-- Link text -->
<a href="...">Click here</a>    <!-- ✗ Vague -->
<a href="...">View dashboard</a> <!-- ✓ Descriptive -->
```

### ARIA Labels

```html
<button aria-label="Close dialog">
  ×
</button>
```

---

## Accessibility Checklist

### Typography

- [ ] Font size ≥ 14px for body
- [ ] Contrast ratio ≥ 4.5:1 (AA)
- [ ] Contrast ratio ≥ 7:1 (AAA) where possible
- [ ] Line height ≥ 1.5 for body
- [ ] Line length 60-75 characters
- [ ] No text in images alone

### Interaction

- [ ] Touch targets ≥ 44px
- [ ] Focus indicators visible
- [ ] Reduced motion respected
- [ ] Text resizable to 200%

### Screen Readers

- [ ] Semantic HTML structure
- [ ] Meaningful link text
- [ ] ARIA labels where needed
- [ ] Skip links for navigation

---

## Summary

| Requirement | WCAG Level | Minimum |
|-------------|-----------|---------|
| Contrast (normal text) | A | 4.5:1 |
| Contrast (large text) | A | 3:1 |
| Contrast (AA) | AA | 4.5:1 / 3:1 |
| Contrast (AAA) | AAA | 7:1 / 4.5:1 |
| Font size (body) | Best practice | 14-16px |
| Touch targets | Best practice | 44px |

---

*Source: WCAG 2.1, WebAIM, accessibility guidelines*
