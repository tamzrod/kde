# Typography for Utility SLDs

## Overview

This document defines typography conventions for utility-grade SCADA Single Line Diagrams, including font selection, sizing, hierarchy, and placement rules.

---

## Fundamental Typography Principles

### Readability First

> "Technical choices like text alignment, line width, or font size can make or break readability."

**Source**: DMC Inc. HMI Design Guidelines

### Core Rules

1. **Minimum Size**: Must be readable at operating distance
2. **Consistency**: Same information = Same style
3. **Hierarchy**: Size and weight indicate importance
4. **Contrast**: Text must stand out from background
5. **Brevity**: Short labels, maximum information

---

## Font Selection

### Recommended Fonts

**Primary (Monospace for Values)**:
| Font | Use Case | Notes |
|------|----------|-------|
| Consolas | Values, measurements | Clear digit distinction |
| Courier New | Data displays | Fixed-width |
| Source Code Pro | Technical data | Modern, readable |

**Secondary (Sans-serif for Labels)**:
| Font | Use Case | Notes |
|------|----------|-------|
| Segoe UI | Labels, headers | Windows standard |
| Arial | General text | Universal support |
| Helvetica | Labels, headers | Clean, professional |
| Roboto | Modern displays | Technical feel |

### Font Characteristics

**For SCADA Displays**:
```
Required Characteristics:
├── Distinct digit shapes (0, O, 1, l, I)
├── Clear letter differentiation
├── Monospace for data alignment
├── Sans-serif for labels
└── Readable at small sizes
```

**Avoid**:
- Decorative fonts (lacks clarity)
- Thin fonts (poor visibility)
- Serif fonts (harder to read at distance)
- Script fonts (illegible)

---

## Size Hierarchy

### Standard Size Scale

| Level | Size (px) | Size (pt) | Use Case |
|-------|-----------|-----------|----------|
| H1 | 24-32px | 18-24pt | Station name |
| H2 | 18-24px | 14-18pt | Section headers |
| H3 | 14-18px | 11-14pt | Equipment labels |
| Body | 12-14px | 9-11pt | Standard labels |
| Data | 14-20px | 11-15pt | Measurement values |
| Small | 10-12px | 8-9pt | Secondary info |

### Viewing Distance Guidelines

| Distance | Minimum Size | Recommended |
|----------|--------------|-------------|
| 0.5m (arm's reach) | 10pt | 12pt |
| 1.0m (close work) | 14pt | 16pt |
| 1.5m (typical monitor) | 18pt | 20pt |
| 2.0m+ (wall displays) | 24pt | 28pt+ |

### Relative Sizing

```
┌────────────────────────────────────────┐
│ STATION ALPHA - 115kV     [14:32:05] │  ← H1: 24px, Bold
│ Feeder 1                    Area A    │  ← H2: 18px
├────────────────────────────────────────┤
│                                        │
│   115kV ────────[CB101]───────> 45.2  │  ← Values: 16px
│                     │         MW       │
│   Bus Section       │                  │
│                     ▼                  │
│   13.8kV ────────[T1]──────── 12.4   │  ← Labels: 12px
│                      │         MVA     │
└────────────────────────────────────────┘
```

---

## Text Placement Rules

### Label Positioning

**Equipment Labels**:
```
Standard Placement:
├── Above: Transformers, Buses
├── Below: Feeders, Lines
├── Right: Breakers (after)
├── Left: Incoming connections
└── Inside: Equipment ID
```

**Value Positioning**:
```
┌─────────────────────────────────────────┐
│                                         │
│  [BRK101]──────[BRK102]──────[BRK103] │
│   │                           │         │
│  ↓ 13.8kV                    ↓ 13.8kV  │
│  │                           │         │
│ MW: 12.4              MW: 8.2          │  ← Right-aligned values
│ MVAR: 2.1            MVAR: 1.4         │
│                                         │
└─────────────────────────────────────────┘
```

### Alignment Principles

1. **Horizontal Consistency**: Values aligned at decimal points
2. **Vertical Consistency**: Same-type data at same vertical level
3. **Left-to-Right**: Primary text flows left-to-right
4. **Parallel**: Label follows connection direction

---

## Value Formatting

### Numerical Display

**Power Values (MW, MVAR, MVA)**:
```
Format: XXX.X
Example: 45.2 MW
         12.4 MVA

Rules:
├── 1 decimal place for normal operation
├── 2 decimal places for small values (<10)
├── No decimal for integer values (>=1000)
└── Always include unit
```

**Voltage Values (kV)**:
```
Format: XX.X kV
Example: 115.2 kV
         13.8 kV

Rules:
├── 1 decimal place
├── Always include kV unit
└── Consider significance (115.0 vs 115)
```

**Current Values (A, kA)**:
```
Format: XXX.X A  (Amperes < 1000)
Format: X.XX kA  (kiloAmperes >= 1000)

Example: 245.3 A
         1.25 kA
```

**Frequency (Hz)**:
```
Format: XX.XX Hz
Example: 60.00 Hz (North America)
         50.00 Hz (International)

Rules:
├── 2 decimal places
├── Show up to 4 decimals for accuracy needs
└── Color code if off-nominal
```

### Unit Abbreviations

| Quantity | Symbol | Notes |
|----------|--------|-------|
| Megawatts | MW | Active power |
| Megavars | MVAR | Reactive power |
| Megavolt-amperes | MVA | Apparent power |
| Volts | V, kV | Voltage |
| Amperes | A, kA | Current |
| Hertz | Hz | Frequency |
| Volts-Hertz | V/Hz | Transformer ratio |
| Degrees | ° | Angle, temperature |
| Percent | % | Load, impedance |

---

## Text Hierarchy

### Primary Text (Highest Priority)

**Characteristics**:
- Bold weight
- Larger size
- High contrast
- Fixed position

**Content**:
- Equipment ID (CB101, T1)
- Critical values (alarm limits exceeded)
- Station/area name

### Secondary Text (Medium Priority)

**Characteristics**:
- Regular weight
- Standard size
- Normal contrast

**Content**:
- Measurement values
- Equipment labels
- Status indicators

### Tertiary Text (Low Priority)

**Characteristics**:
- Smaller size
- Lower contrast
- Positioned near relevant element

**Content**:
- Secondary measurements
- Equipment ratings
- Configuration info

---

## Label Conventions

### Equipment Identification

**Format**: [Type][Number]
```
Examples:
├── CB101      Circuit Breaker 101
├── T1         Transformer 1
├── F101       Feeder 101
├── L101       Line 101
├── CT101      Current Transformer 101
├── PT101      Potential Transformer 101
├── BRK101     Breaker 101 (alternative)
└── BUS-115A   115kV Bus A
```

### Measurement Labels

**Format**: [Quantity] or [Quantity]:[Point]
```
Examples:
├── MW         Megawatts
├── MW:12.4    MW at point 12
├── V:115A     Voltage at bus 115A
├── I:FEED1    Current at feeder 1
└── FREQ       System frequency
```

### State Labels

**Format**: [State] or [State]:[Qualifier]
```
Examples:
├── CLSD       Closed
├── OPEN       Open
├── TRIP       Tripped
├── REMOTE     Remote control
├── LOCAL      Local control
└── LOCKD      Locked out
```

---

## ALL CAPS vs Mixed Case

### Industry Standards

**Traditional Practice**:
- ALL CAPS for alarm messages
- ALL CAPS for system status
- Mixed case for descriptive text

**Modern Practice**:
- Title Case for headers
- Mixed case for descriptions
- ALL CAPS avoided (harder to read)

**Recommendation**: Project standard should be established early and documented.

**Source**: ISA-101, ISA-RP60.3-1985

---

## Text Contrast

### Contrast Ratio Guidelines

| Ratio | Visibility | Application |
|-------|------------|-------------|
| 4.5:1 | Minimum | Normal text |
| 7:1 | Recommended | Critical text |
| 3:1 | Minimum | Large text/graphics |

### Background Combinations

**Dark Background (Night Mode)**:
```
Background: #1A1A1A (Dark Gray)
Text:      #FFFFFF (White)     Ratio: 16:1 ✓
Text:      #AAAAAA (Gray)     Ratio: 5:1  ✓
Text:      #666666 (Dark Gray) Ratio: 2.5:1 ✗
```

**Light Background (Day Mode)**:
```
Background: #F0F0F0 (Light Gray)
Text:      #000000 (Black)    Ratio: 16:1 ✓
Text:      #444444 (Dark Gray) Ratio: 7:1  ✓
Text:      #888888 (Gray)     Ratio: 3:1  ✓
```

---

## Dynamic Text Behavior

### Value Updates

**Normal Updates**:
- Smooth transitions
- No flashing for normal values
- Update frequency: 1-5 seconds

**Alarm Indication**:
- Color change: Normal → Alarm color
- Blinking: Reserved for critical
- Duration: Until acknowledged

### Scrolling Text

**Avoid**:
- Continuous scrolling
- Marquee-style animations
- Moving text for critical info

**Acceptable**:
- Horizontal scroll for long labels (with pause)
- Vertical scroll for lists
- Page transitions

---

## Accessibility Considerations

### Font Guidelines

| Consideration | Recommendation |
|---------------|-----------------|
| Digit clarity | Avoid similar characters (0/O, 1/l/I) |
| Letter spacing | Adequate for small sizes |
| Stroke width | Visible at operating distance |
| Case sensitivity | Consider uppercase for critical |

### Alternative Indicators

**With Text**:
- Use text labels alongside color
- Provide tooltips for ambiguous items
- Include descriptive text for equipment

**Icons + Text**:
```
[⚠ CB101]     ← Icon + ID
[CB101: OPEN] ← ID + State
[CB101] 45.2MW ← ID + Value
```

---

## CSS Implementation

```css
/* Typography Scale */
.sld-text {
  font-family: 'Segoe UI', 'Arial', sans-serif;
}

.sld-value {
  font-family: 'Consolas', 'Courier New', monospace;
}

/* Size Classes */
.text-h1 { font-size: 24px; font-weight: bold; }
.text-h2 { font-size: 18px; font-weight: 600; }
.text-h3 { font-size: 14px; font-weight: 600; }
.text-body { font-size: 12px; }
.text-small { font-size: 10px; }
.text-value { font-size: 14px; font-family: monospace; }
.text-critical { font-size: 16px; font-weight: bold; color: var(--alarm-critical); }

/* Equipment Labels */
.equipment-label {
  font-size: 12px;
  font-weight: 600;
  text-anchor: middle;
}

.equipment-id {
  font-size: 10px;
  font-weight: bold;
}

/* Value Display */
.value-display {
  font-family: monospace;
  font-size: 14px;
  text-anchor: end;
}

.value-unit {
  font-size: 10px;
  opacity: 0.8;
}
```

---

## Summary

| Aspect | Standard | Notes |
|--------|----------|-------|
| Primary Font | Monospace | For values, data |
| Secondary Font | Sans-serif | For labels, headers |
| Min Size | 10px | Dependent on distance |
| Hierarchy | 4 levels | H1-H3, Body |
| Alignment | Decimal points | Values aligned |
| Contrast | 4.5:1 minimum | 7:1 recommended |

---

*Source: ISA-101.01-2015, ISO 9241, DMC HMI Guidelines, IEEE standards*
