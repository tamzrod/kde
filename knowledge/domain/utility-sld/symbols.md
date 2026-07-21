# Electrical Symbol Conventions for Utility SLDs

## Overview

This document defines the electrical symbols and conventions used in utility-grade SCADA Single Line Diagrams. It covers both IEEE/ANSI (North American) and IEC (International) standards.

---

## Primary Standards

| Standard | Region | Application |
|----------|--------|-------------|
| IEEE C37.2 | North America | Device function numbers |
| ANSI/IEEE 315 | North America | Graphic symbols |
| IEC 60617 | International | Graphic symbols |
| IEC 61850 | International | Substation communication |

---

## Breaker Symbols

### Circuit Breaker

**IEC 60617 Symbol**: Rectangle with diagonal line
```
┤ ├  or  └┬┘
```

**IEEE/ANSI Symbol**: Square with X
```
[  X  ]
```

**SCADA Implementation**:
- Filled square = Closed
- Open square = Open
- Red = Closed (energized)
- Green = Open
- Flashing = Tripped/Alarm

### Disconnect Switch (Isolator)

**IEC 60617 Symbol**: Straight line with perpendicular
```
─┴─
```

**IEEE/ANSI Symbol**: Straight line
```
────
```

**SCADA Notes**:
- Often shown smaller than breakers
- May use different colors when open/closed
- Interlocking indication often shown

### Earthing Switch

**IEC 60617 Symbol**: Three horizontal lines (ground)
```
────
════
```

**SCADA Implementation**:
- Ground symbol adjacent to switch
- Often shown in de-energized state

---

## Transformers

### Two-Winding Transformer

**IEC 60617 Symbol**: Two parallel lines (can be filled/hollow)
```
────═══────
```

**IEEE/ANSI Symbol**: Similar with additional markings for voltage
```
────|   |────
```

**SCADA Implementation**:
- Filled lines = Energized
- Shows MVA/MW rating label
- Shows voltage level
- Winding configuration often noted

### Three-Winding Transformer

**IEC 60617 Symbol**: Three parallel lines
```
────═══────
  ║   ║
  ║   ║
```

### Auto-Transformer

**IEC 60617 Symbol**: Single winding with tap
```
────╲╱────
```

### Transformer Symbol Enhancements

**SCADA-Specific Elements**:
```
     115kV
────|   |────  [T1]  34.5kV
────| 2W |────   50 MVA
────|   |────   DYn11
```

Elements:
- Voltage labels (primary/secondary)
- Rating label
- Vector group
- Equipment ID

---

## Busbars

### Busbar Representation

**Visual Approach**:
```
═══════════════════════════  115kV Bus A
```

**SCADA Implementation**:
- Thick horizontal line
- Sectioning shown as gaps with switching
- Color indicates energization state
- Voltage label at one end
- Section labels if multiple buses

### Bus Sectionalizing

```
═══════╤═══════╤═══════
       │       │
    [CB1]   [CB2]
```

---

## Conductors/Lines

### Transmission/Distribution Lines

**Symbol**: Single line with annotation
```
────────────────────
```

**SCADA Annotations**:
```
────────────────────  [L1]  115kV  12.5 mi
                        ↓ MW: 45.2
```

**Flow Indicators**:
- Arrow direction = power flow direction
- MW/MVAR values displayed
- Line status color coding

### Cable/Underground

**Symbol**: Multiple small lines or different style
```
═════╪═════  (underground section)
```

---

## Instrument Transformers

### Current Transformer (CT)

**Symbol**: Circle with CT designation
```
    (CT)
─────○─────
```

**SCADA Implementation**:
- Often embedded in breaker symbol
- Label indicates ratio (1200:5)

### Potential Transformer (PT)

**Symbol**: Circle with PT designation
```
    (PT)
─────○─────
```

**SCADA Implementation**:
- Voltage measurement point
- Often at bus entrance

---

## Protection Devices

### Protection Relay

**Symbol**: Rectangle with function code
```
┌──────┐
│  67N │
└──────┘
```

**Common Function Codes** (IEEE C37.2):
| Code | Function |
|------|----------|
| 50 | Instantaneous overcurrent |
| 51 | Time overcurrent |
| 67 | Directional overcurrent |
| 87 | Differential |
| 67N | Directional ground fault |

### Relay Indication

**SCADA Implementation**:
- Small rectangle at breaker
- Status indication (tripped, healthy)
- Often color-coded

---

## Reactive Compensation

### Capacitor Bank

**Symbol**: Two parallel lines with C
```
────||────  [C1]
```

**SCADA Implementation**:
- Shows MVAR rating
- Status indication (connected/disconnected)
- May show voltage

### Reactor

**Symbol**: Coiled line with L
```
────@@────  [L1]
```

---

## Generation

### Synchronous Generator

**Symbol**: Circle with G
```
   ┌───┐
───│ G │───
   └───┘
```

**SCADA Enhancements**:
- MW/MVAR output
- Frequency
- Status (running, offline)

### Solar PV / Wind

**Symbol**: Varies by vendor
```
───[PV]───  Solar
───[W ]───  Wind
```

**SCADA Implementation**:
- Output power
- Availability
- Control status

---

## Energy Storage

### Battery Energy Storage (BESS)

**Symbol**: Battery symbol with converter
```
───[BESS]───
```

**SCADA Elements**:
- Charge/discharge status
- MW/MVAR
- State of charge (SOC)
- Available capacity

---

## Switching Devices

### Recloser

**Symbol**: Breaker with auto-transformer symbol
```
───[RC]───
```

**SCADA Implementation**:
- Open/closed status
- Reclose sequence indication
- Lockout state

### Sectionalizer

**Symbol**: Switch with counter
```
───[S]───
```

---

## Substation Equipment

### Station Service

**Symbol**: Transformer with auxiliary indication
```
───|SA|───
```

**SCADA Elements**:
- Voltage available
- Status (normal/emergency)

### Metering

**Symbol**: Circle with M
```
───(M)───
```

**SCADA Implementation**:
- Energy (MWh) measurement
- Demand measurement
- Revenue metering

---

## Size and Proportions

### Relative Sizing Guide

| Device | Relative Size | Priority |
|--------|--------------|----------|
| Busbar | Largest (thick) | Visual anchor |
| Breaker | Medium | Control focus |
| Switch | Smaller | Operational |
| Transformer | Medium-Large | Equipment focus |
| Metering | Small | Auxiliary |

### Visual Balance

**Guidelines**:
- Maintain consistent horizontal alignment for bay equipment
- Use consistent vertical spacing between bays
- Keep power flow path unobstructed
- Balance left-right for visual symmetry

---

## Symbol Consistency Rules

1. **One Symbol, One Meaning**: Each symbol type has one consistent meaning
2. **State Indication Through Fill**: Closed = filled, Open = outline
3. **Color Supplements Symbol**: Color reinforces status
4. **Labels are Essential**: Never rely on symbol alone for identification
5. **Orientation is Consistent**: Horizontal layout standard

---

## Common Symbol Errors in AI-Generated SLDs

### Issues to Avoid

| Error | Problem | Correction |
|-------|---------|------------|
| Decorative color | Colors don't convey state | Use semantic colors |
| Missing values | No real-time data shown | Add MW/MVAR/V/Hz |
| Inconsistent sizing | Random proportions | Follow sizing guide |
| No flow indication | Unclear direction | Add arrows or animation |
| Missing labels | Unidentified equipment | Add equipment IDs |
| Wrong symbol types | Mixed standards | Pick one standard |

---

*Source: IEEE C37.2, IEC 60617, IEC 61850, vendor implementations*
