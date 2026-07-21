# Numerical Typography

## Overview

This document covers typography practices for displaying numbers in software interfaces, particularly for data-heavy applications.

---

## Tabular vs. Proportional Numbers

### Tabular Figures (Tabular nums)

**Definition**: Numbers with uniform widths for vertical alignment.

**Use Case**: Tables, data displays, financial figures

```css
.tabular {
  font-variant-numeric: tabular-nums;
}
```

### Proportional Figures

**Definition**: Numbers with varying widths for natural appearance.

**Use Case**: Body text, sentences, mixed content

```css
.proportional {
  font-variant-numeric: proportional-nums;
}
```

### Visual Comparison

```
Tabular:    $1,234.56  $5,678.90  $0.12
            └──────┘  └──────┘  └──────┘
                     All equal width

Proportional:  $1,234.56  $5,678.90  $0.12
               └─┘  └─────┘  └─────┘
               Variable widths
```

---

## Number Formatting

### Currency

| Context | Format | Example |
|---------|--------|---------|
| Full | $1,234.56 | With decimals |
| Abbreviated | $1.23K | Short displays |
| Compact | $1M | Very short |
| Integer | $1,234 | No decimals |

### Percentages

| Context | Format | Example |
|---------|--------|---------|
| Full | 12.34% | With decimals |
| Rounded | 12% | Integer |
| Negative | -5.2% | With sign |
| Zero | 0.0% | Decimal |

### Large Numbers

| Value | Abbreviation | Example |
|-------|-------------|---------|
| 1,000 | K | 1.2K |
| 1,000,000 | M | 1.2M |
| 1,000,000,000 | B | 1.2B |

### Decimals

| Context | Places | Example |
|---------|--------|---------|
| Currency | 2 | 1,234.56 |
| Percentage | 1-2 | 12.3% |
| Ratio | 2-4 | 0.1234 |
| Scientific | Variable | 1.23e-4 |

---

## Alignment

### Table Alignment

```css
table {
  font-variant-numeric: tabular-nums;
}

td.number {
  text-align: right;
  font-family: 'JetBrains Mono', monospace;
}
```

### Decimal Alignment

For precise alignment, use monospace:

```css
/* Decimal-aligned numbers */
.decimal-aligned {
  font-family: monospace;
  font-variant-numeric: tabular-nums;
  font-size: 14px;
}
```

---

## Scientific & Engineering Notation

### Scientific

```
1.23 × 10⁴  →  1.23e4  →  1.23E4
```

### Engineering

```
12.3 × 10³  →  12.3k   →  12.3K
```

### Superscript/Subscript

```css
.superscript {
  font-size: 0.7em;
  vertical-align: super;
}
```

---

## Dashboard Numeric Display

### KPI Cards

```
┌─────────────────────────────┐
│ Revenue                     │
│                             │
│   $1,234,567.89            │  ← Large, tabular
│                             │
│   ↑ 12.5% vs last month     │  ← Small, colored
│                             │
│   ▁▂▃▂▁▂▄▃▂▁▂▃▄▅▃▂▁     │  ← Sparkline
└─────────────────────────────┘
```

### CSS

```css
.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.kpi-change {
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}
```

---

## Timestamp Display

### ISO Format

```
2024-01-15T14:30:45.123Z
```

### Human-Readable

| Type | Format | Example |
|------|--------|---------|
| Date | YYYY-MM-DD | 2024-01-15 |
| Time | HH:MM:SS | 14:30:45 |
| DateTime | Combined | Jan 15, 2024 2:30 PM |
| Relative | Human | 2 hours ago |

### Engineering Timestamps

```css
.timestamp {
  font-family: monospace;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}
```

---

## Device IDs & Tags

### SCADA/PLC Tags

```
TAG-001
BRK-101-STATUS
TEMP-SENSOR-05
```

### CSS

```css
.device-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}
```

---

## Tabular Numbers in CSS

### Basic Usage

```css
.data-table td {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```

### Variable Font Support

```css
@font-face {
  font-family: 'Inter';
  src: url('Inter.woff2') format('woff2');
  font-variant-numeric: lining-nums proportional-nums;
}
```

### JavaScript Detection

```javascript
// Check if font supports tabular numbers
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '72px monospace';
const width1 = ctx.measureText('1').width;
const width2 = ctx.measureText('5').width;
const supportsTabular = width1 === width2;
```

---

## Summary

| Aspect | Recommendation |
|--------|----------------|
| Tables | Always use tabular nums |
| KPIs | Tabular nums, monospace |
| Body text | Proportional nums |
| Currency | Tabular, 2 decimals |
| Percentages | Tabular, 1-2 decimals |
| Timestamps | Monospace |
| Device IDs | Monospace |
| Alignment | Numbers right-aligned |

---

*Source: Type industry practices, data visualization standards*
