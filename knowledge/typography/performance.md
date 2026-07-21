# Typography Performance

## Overview

This document covers font loading and rendering performance optimization.

---

## Font Loading Performance

### Critical Path

```
1. HTML Parse
     ↓
2. CSSOM Build (fonts blocked)
     ↓
3. FOUT/FOIT (Flash)
     ↓
4. Font Loaded
```

### Preload Fonts

```html
<!-- Preload critical fonts -->
<link rel="preload" 
      href="/fonts/inter-var.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>

<!-- Preload font subsets -->
<link rel="preload"
      href="/fonts/inter-latin.woff2"
      as="font"
      type="font/woff2"
      crossorigin>
```

### Preconnect

```html
<!-- Preconnect to font CDN -->
<link rel="preconnect" 
      href="https://fonts.gstatic.com" 
      crossorigin>

<!-- Google Fonts -->
<link rel="preconnect" 
      href="https://fonts.googleapis.com">
```

---

## Font File Size

### Optimization Techniques

| Technique | Impact | Implementation |
|-----------|--------|----------------|
| WOFF2 | 30% smaller vs WOFF | Primary format |
| Subsetting | 50-90% reduction | Remove unused glyphs |
| Compression | 70% reduction | Brotli/Gzip |
| Variable fonts | Single file | Multiple weights |

### Typical Sizes

| Font | Format | Size | Notes |
|------|--------|------|-------|
| Inter (full) | WOFF2 | ~300KB | All weights |
| Inter (subset) | WOFF2 | ~20-50KB | Per weight |
| JetBrains Mono | WOFF2 | ~50KB | Single weight |

---

## Font Subsetting

### What to Include

```text
Basic Latin:     U+0020-007F
Latin Extended: U+00A0-00FF
Numbers:         U+0030-0039
Common Symbols: U+2000-206F
```

### Tools

**pyftsubset** (fonttools):
```bash
pyftsubset Inter-Regular.woff2 \
  --unicodes='U+0020-007F,U+00A0-00FF,U+0030-0039' \
  --output-file=Inter-Subset.woff2
```

**glyphhanger**:
```bash
glyphhanger --subset=*.woff2 --whitelist=latin
```

---

## Font Display Strategy

### Options

```css
@font-face {
  font-family: 'Inter';
  src: url('Inter.woff2') format('woff2');
  font-display: swap;  /* Recommended */
}
```

| Option | Swap Time | FOUT | Best For |
|--------|-----------|------|----------|
| auto | Varies | Yes | Browser choice |
| block | 3s timeout | Brief | Headlines |
| swap | Immediate | Yes | Body text |
| fallback | 100ms | Brief | - |
| optional | Immediate | No | Performance |

### Recommended Strategy

```css
/* Body fonts - swap for stability */
body {
  font-family: 'Inter', sans-serif;
  font-display: swap;
}

/* Fallback optimization */
@font-face {
  font-family: 'Inter-Fallback';
  src: local('Arial');
  font-display: swap;
  ascent-override: 90%;
  descent-override: 25%;
}
```

---

## Variable Font Performance

### Benefits

```css
/* Single file, multiple weights */
@font-face {
  font-family: 'Inter';
  src: url('Inter-var.woff2') format('woff2-variations');
  font-weight: 100 900;
}

/* Use any weight */
.text-light { font-weight: 300; }
.text-normal { font-weight: 400; }
.text-bold { font-weight: 700; }
```

### Considerations

- Larger single file than individual weights
- Load all weights even if using one
- Best when using multiple weights

---

## HTTP/2 Performance

### Benefits

| Aspect | HTTP/1.1 | HTTP/2 |
|--------|----------|--------|
| Connections | Multiple | Single |
| Fonts | Separate requests | Multiplexed |
| Overhead | High | Low |

### Recommendations

- HTTP/2: Load all font weights
- HTTP/1.1: Limit to essential weights

---

## Caching

### Cache Headers

```
Cache-Control: public, max-age=31536000, immutable
```

### Fingerprinting

```html
<!-- Fingerprinted for cache busting -->
<link rel="stylesheet" 
      href="/fonts/inter.css?v=1.0.3">
```

---

## Performance Checklist

### Font Loading

- [ ] Preload critical fonts
- [ ] Use preconnect for CDNs
- [ ] Choose optimal font-display
- [ ] Use WOFF2 format
- [ ] Subset large fonts

### Font Selection

- [ ] Limit to 2-3 font families
- [ ] Limit to essential weights
- [ ] Consider variable fonts
- [ ] Use system fonts as fallback

### Testing

- [ ] Test with Lighthouse
- [ ] Measure FOUT duration
- [ ] Check Core Web Vitals
- [ ] Test on slow connection

---

## Summary

| Technique | Priority | Impact |
|-----------|----------|--------|
| WOFF2 | Critical | 30% smaller |
| Subsetting | High | 50-90% smaller |
| Preload | High | Faster display |
| font-display | Medium | Better UX |
| Variable fonts | Medium | Single file |
| Cache | Medium | Repeat load |

---

*Source: Web.dev font loading, Google Fonts optimization*
