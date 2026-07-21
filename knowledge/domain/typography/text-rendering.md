# Text Rendering

## Overview

This document covers text rendering technologies and practices for consistent typography across platforms.

---

## Font Rendering Technologies

### Subpixel Rendering

**Definition**: Uses RGB subpixels for smoother edges.

**Details**:
- Windows ClearType
- macOS Quartz
- Linux FreeType

**Best For**:
- Standard displays
- Windows applications
- Most LCD monitors

### Antialiasing

| Type | Method | Use Case |
|------|--------|----------|
| Grayscale | Gray pixels | Standard antialiasing |
| Subpixel | RGB pixels | LCD displays |
| None | Hard edges | Pixel art, low-res |

---

## CSS Font Rendering

### Font Smooth

```css
/* Optimal rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
}
```

### Subpixel Position

```css
/* Control subpixel rendering */
.text {
  font-synthesis-position: none;
}
```

---

## Font Hinting

### Definition

Instructions embedded in fonts for pixel alignment.

### Levels

| Level | Effect | Use Case |
|-------|--------|----------|
| None | No hints | Vector displays |
| Medium | Some alignment | General |
| Full | Maximum | LCD subpixel |

### Web Impact

Font hinting is primarily relevant for:
- Downloaded fonts
- Custom fonts
- Variable fonts

---

## High-DPI Displays

### Retina / HiDPI

**Characteristics**:
- 2x-3x pixel density
- Requires proper scaling
- Sharper text rendering

### Best Practices

```css
/* Ensure crisp rendering on HiDPI */
@media (-webkit-min-device-pixel-ratio: 2), 
       (min-resolution: 192dpi) {
  body {
    -webkit-font-smoothing: antialiased;
  }
}
```

---

## Web Font Loading

### Font Display

```css
@font-face {
  font-family: 'Inter';
  src: url('Inter.woff2') format('woff2');
  font-display: swap;  /* Critical for performance */
}
```

### Display Options

| Option | Behavior | Use Case |
|--------|----------|----------|
| swap | Fallback → Flash → Font | Body text |
| block | Invisible → Font | Headlines |
| fallback | Brief invisible → Font | Short text |
| optional | System or font | Performance-critical |

### Recommended

```css
/* Use swap for most text */
body {
  font-display: swap;
}
```

---

## Font File Formats

### Modern Formats

| Format | Support | Size | Notes |
|--------|---------|------|-------|
| WOFF2 | 96%+ | Smallest | **Recommended** |
| WOFF | 98%+ | Small | Good support |
| TTF | 98%+ | Medium | Full support |
| EOT | Old IE | Small | Legacy only |
| SVG | Deprecated | Large | Avoid |

### Recommendation

```html
<!-- Modern font loading -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('Inter.woff2') format('woff2'),
         url('Inter.woff') format('woff');
  }
</style>
```

---

## Font Subsetting

### Definition

Removing unused characters to reduce file size.

### Tools

- [Fonttools](https://github.com/fonttools/fonttools)
- [Glyphhanger](https://github.com/zachleat/glyphhanger)
- [Subsetter](https://subsetter.com/)

### Example

```bash
# Subset to Latin + numbers
pyftsubset Inter-Regular.woff2 \
  --unicodes="U+0020-007F,U+00A0-00FF,U+0030-0039" \
  --output-file=Inter-Subset.woff2
```

---

## Cross-Platform Consistency

### System Font Stacks

```css
/* Most compatible stack */
font-family: 
  'Inter',
  -apple-system,           /* macOS, iOS */
  BlinkMacSystemFont,       /* Chrome on macOS */
  'Segoe UI',              /* Windows */
  Roboto,                  /* Android */
  'Helvetica Neue',        /* Older macOS */
  Arial,                   /* Fallback */
  sans-serif;
```

### Testing

Test font rendering on:
- [ ] Windows (ClearType)
- [ ] macOS (Quartz)
- [ ] Linux (FreeType)
- [ ] Mobile (iOS, Android)
- [ ] High-DPI displays

---

## Performance

### Critical Font Loading

```html
<!-- Preload critical fonts -->
<link rel="preload" 
      href="Inter-Medium.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>
```

### Font Loading Sequence

```
1. System font renders immediately
2. FOUT (Flash of Unstyled Text) with swap
3. Web font loads and displays
```

---

## Best Practices

| Practice | Recommendation |
|----------|----------------|
| Font display | Use `swap` |
| Formats | WOFF2 + WOFF |
| Subsetting | Remove unused chars |
| Preload | For critical fonts |
| Fallback | Similar metrics |
| Testing | Cross-platform |

---

## Summary

| Aspect | Best Practice |
|--------|---------------|
| Smoothing | antialiased |
| Display | swap |
| Format | WOFF2 |
| Subsetting | Yes (when large) |
| Preload | Critical fonts |
| Testing | Multi-platform |

---

*Source: Web.dev, Google Fonts, font loading best practices*
