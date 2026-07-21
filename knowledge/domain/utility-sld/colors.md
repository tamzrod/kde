# Color Philosophy for Utility SLDs

## Overview

This document defines the color conventions used in utility-grade SCADA Single Line Diagrams. Colors must convey semantic meaning (status, state, condition) rather than serve decorative purposes.

---

## Fundamental Color Principles

### The High-Performance HMI Approach

> "High performance HMI uses subdued gray backgrounds, muted process colors, and analog-style indicators so that genuine abnormal conditions — alarms, deviations, and emergencies — stand out immediately against an otherwise quiet screen."

**Source**: ISA-101 High-Performance HMI Philosophy

### Core Rules

1. **Semantic Color**: Every color has meaning
2. **Consistency**: Same color = Same meaning throughout
3. **Restraint**: Use color sparingly for maximum impact
4. **Contrast**: Alarm states must contrast with normal states
5. **Accessibility**: Consider color-blind operators

---

## Breaker Status Colors

### North American Convention (Primary Standard)

| State | Color | Notes |
|-------|-------|-------|
| **Closed (Energized)** | Red | Industry standard |
| **Open** | Green | Industry standard |
| **Tripped** | Flashing Red | Alarm condition |
| **Unknown/Intermediate** | Yellow/Hatched | Diagnostic |
| **Maintenance** | Blue | Tagged out |
| **Selected for Control** | White Outline | Operator action |

### International Convention

| State | Color | Notes |
|-------|-------|-------|
| Closed | Blue | IEC/European standard |
| Open | White/Empty | |
| Tripped | Flashing | Alarm |

**Note**: Color conventions vary by region. Always document local standards.

### SCADA Implementation

```svg
<!-- Closed Breaker -->
<rect x="0" y="0" width="40" height="20" fill="red" stroke="black"/>

<!-- Open Breaker -->
<rect x="0" y="0" width="40" height="20" fill="none" stroke="green" stroke-width="2"/>

<!-- Tripped Breaker (with animation) -->
<rect x="0" y="0" width="40" height="20" fill="red" stroke="red">
  <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
</rect>
```

---

## Conductor/Line Colors

### Energization States

| State | Color | Notes |
|-------|-------|-------|
| **Energized** | Saturated Color | Usually based on voltage |
| **De-energized** | Gray/Dark | |
| **Grounded** | Black | |
| **Unknown** | Yellow/Hatched | |

### Voltage Level Colors (Common Convention)

| Voltage Level | Typical Color | Notes |
|---------------|---------------|-------|
| 345kV+ | Dark Blue | |
| 115kV-230kV | Blue | |
| 69kV | Light Blue | |
| 34.5kV | Green | |
| 13.8kV | Yellow | |
| 4.16kV | Orange | |
| Low Voltage | Brown/Gray | |

**Note**: These are common conventions. Each utility may have specific color codes.

---

## Background Colors

### Control Room Standard

**Day Mode**:
| Zone | Color | Notes |
|------|-------|-------|
| Background | Light Gray (#E0E0E0) | Reduces eye strain |
| Header | White (#FFFFFF) | Clear separation |
| Nav Panel | Medium Gray (#C0C0C0) | Subtle distinction |
| Main Display | Light Gray (#F0F0F0) | Primary focus area |

**Night Mode**:
| Zone | Color | Notes |
|------|-------|-------|
| Background | Dark Gray (#2D2D2D) | Reduces eye strain |
| Header | Dark Gray (#3D3D3D) | |
| Nav Panel | Darker Gray (#252525) | |
| Main Display | Charcoal (#1A1A1A) | Primary focus |

**Rationale**:
- Dark backgrounds reduce operator fatigue in 24/7 environments
- Avoid pure black (#000000) - too harsh
- Avoid pure white (#FFFFFF) - too bright for night

### High-Performance HMI Background

**Recommended Palette**:
```
Normal (Quiet):    #4A4A4A  (Muted gray)
Normal (Active):   #3A3A3A  (Slightly darker)
Alarm (Active):    #2A2A2A  (Darkest - contrast)
```

---

## Alarm Colors

### Severity Hierarchy

| Priority | Name | Color | Behavior | Notes |
|----------|------|-------|----------|-------|
| P1 | Critical | Flashing Red | Continuous | Immediate response |
| P2 | High | Red | Steady | < 1 minute response |
| P3 | Medium | Yellow/Amber | Steady | < 5 minutes response |
| P4 | Low | Blue/White | None | < next shift |

### Alarm Element Colors

**Indicator Lights**:
| State | Color | Notes |
|-------|-------|-------|
| Alarm Active | Red (flashing or steady) | |
| Warning | Yellow/Amber | |
| Acknowledged | Same color, steady | Flash stops |
| Inhibit/Suppressed | Blue | |
| Normal | Green | Not typically shown |

**Alarm Banner**:
| Priority | Background | Text |
|----------|------------|------|
| Critical | Red | White |
| High | Orange | Black |
| Medium | Yellow | Black |
| Low | Blue | White |

---

## Text Colors

### Standard Conventions

| Content | Color | Notes |
|---------|-------|-------|
| Normal Values | White/Light Gray | On dark background |
| Normal Values | Black/Dark Gray | On light background |
| Highlighted Values | Cyan | Attention without alarm |
| Selected Values | Yellow | Operator action pending |
| Disabled/Missing | Gray | Unavailable data |

### Value Color Coding

**Alarm Indication**:
| Condition | Color | Notes |
|-----------|-------|-------|
| Above High High | Red | Critical |
| Above High | Orange | Warning |
| Normal Range | Green/White | |
| Below Low | Orange | Warning |
| Below Low Low | Red | Critical |

**Example Implementation**:
```javascript
function getValueColor(value, limits) {
  if (value >= limits.highHigh) return 'red';
  if (value >= limits.high) return 'orange';
  if (value <= limits.lowLow) return 'red';
  if (value <= limits.low) return 'orange';
  return 'green'; // or white
}
```

---

## Equipment State Colors

### Transformer

| State | Color | Notes |
|-------|-------|-------|
| Energized | Filled (voltage color) | |
| De-energized | Outline only | Gray stroke |
| Overloaded | Orange/Red border | Warning/Alarm |
| Fault | Flashing | Critical |

### Busbar

| State | Color | Notes |
|-------|-------|-------|
| Energized | Voltage color, solid | |
| De-energized | Gray | |
| Grounded | Black | |
| Section Open | Gap in line | No fill |

### Protection Relay

| State | Color | Notes |
|-------|-------|-------|
| Healthy/Normal | Green indicator | Often small dot |
| Tripped | Red | Flashing if recent |
| Blocked | Yellow | |
| Failed/Offline | Gray | |

---

## Control Mode Colors

### Operating Mode Indication

| Mode | Color | Notes |
|------|-------|-------|
| Remote | Cyan | SCADA controlled |
| Local | Yellow | Station controlled |
| MANUAL | Orange | Operator override |
| LOCKED OUT | Red | Cannot control |

---

## Tagged Equipment Colors

### Electrical Safety Tagging

| Tag Type | Color | Symbol |
|----------|-------|--------|
| Do Not Operate | Red | "DANGER" |
| Caution | Yellow | "CAUTION" |
| Out of Service | Blue | "OUT OF SERVICE" |
| Information | White | "NOTICE" |

---

## Color Blind Considerations

### Safe Color Combinations

**Avoid These Combinations**:
- Red + Green (most common color blindness)
- Green + Brown
- Blue + Purple
- Yellow + Light Blue

**Recommended Alternatives**:
- Use icons/shapes + color
- Add patterns to differentiate
- Use position/location
- Add text labels

### Implementation Examples

```svg
<!-- Color + Icon for colorblind safety -->
<circle cx="10" cy="10" r="8" fill="red"/>
<text x="10" y="12" text-anchor="middle" fill="white">!</text>

<!-- Color + Pattern -->
<rect fill="red"/>
<line stroke="white" stroke-dasharray="2,2"/>
```

---

## CSS Variables for SLD Theming

### Recommended Structure

```css
:root {
  /* Background Colors */
  --bg-primary: #1A1A1A;
  --bg-secondary: #2D2D2D;
  --bg-header: #3D3D3D;
  
  /* Breaker States */
  --breaker-closed: #FF4444;
  --breaker-open: #44FF44;
  --breaker-tripped: #FF0000;
  
  /* Alarm States */
  --alarm-critical: #FF0000;
  --alarm-high: #FF8800;
  --alarm-medium: #FFCC00;
  --alarm-low: #0088FF;
  
  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #AAAAAA;
  --text-highlight: #00FFFF;
  
  /* Lines */
  --line-energized: #FF8800;
  --line-deenergized: #666666;
  --line-grounded: #000000;
}

/* Night Mode Override */
[data-theme="day"] {
  --bg-primary: #F0F0F0;
  --bg-secondary: #E0E0E0;
  --bg-header: #FFFFFF;
  --text-primary: #000000;
  --text-secondary: #444444;
  --breaker-closed: #CC0000;
  --breaker-open: #008800;
}
```

---

## Summary Table

| Element | Normal State | Alarm State | Control State |
|---------|--------------|-------------|---------------|
| Breaker | Red/Green | Flashing Red | White Outline |
| Line | Voltage Color | N/A | N/A |
| Bus | Voltage Color | Gray | N/A |
| Value | White/Green | Orange/Red | Yellow |
| Alarm | Hidden | Colored Banner | Acknowledged |
| Relay | Green Dot | Red | Yellow |

---

*Source: ISA-101, IEC 62682, IEEE Std 1005, vendor implementations (GE iPower, ABB Network Manager, Siemens Spectrum Power)*
