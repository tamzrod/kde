# Design Patterns for Utility SLDs

## Overview

This document provides reusable design patterns for implementing utility-grade SCADA Single Line Diagrams.

---

## Pattern Categories

1. **Structural Patterns** - Overall layout and organization
2. **Component Patterns** - Reusable equipment representations
3. **State Patterns** - Status visualization
4. **Interaction Patterns** - User controls and feedback
5. **Animation Patterns** - Dynamic behaviors

---

## Structural Patterns

### Pattern 1: Standard Station Layout

**Intent**: Provide consistent station visualization

**Structure**:
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: Station name, status, navigation                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐              │
│  │ 115kV Bus │──│ 115kV Bus │──│ 115kV Bus │              │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘              │
│        │               │               │                     │
│     [BRK1]          [BRK2]          [BRK3]                  │
│        │               │               │                     │
│        ▼               ▼               ▼                     │
│  ════════════════════════════════════════════════  34.5kV  │
│                                                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐              │
│  │ 34.5kV    │──│ 34.5kV    │──│ 34.5kV    │              │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘              │
│        │               │               │                     │
│     [T1]            [T2]            [T3]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Usage**: Primary station display

### Pattern 2: Alarm Banner

**Intent**: Ensure alarms are always visible

**Structure**:
```
┌─────────────────────────────────────────────────────────────┐
│ [⚠] CRITICAL: CB101 TRIPPED | HIGH: OVLD FEEDER 2 | [ACK]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Main Content                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Rules**:
- Fixed position at top
- Always visible
- Priority-based color
- Flash until acknowledged
- Acknowledge button prominent

### Pattern 3: Context Panel

**Intent**: Show detail without leaving main view

**Structure**:
```
┌───────────────────────────────┬─────────────────────────────┐
│                               │ Equipment Details            │
│                               │ ─────────────────────        │
│      Main SLD                 │ ID: CB101                    │
│                               │ Type: Circuit Breaker         │
│                               │ Status: CLOSED               │
│                               │ ─────────────────────        │
│                               │ MW: 45.2  MVAR: 2.1         │
│                               │ ─────────────────────        │
│                               │ [Control] [Trend] [History] │
│                               │                              │
└───────────────────────────────┴─────────────────────────────┘
```

**Usage**: Equipment selection detail

---

## Component Patterns

### Pattern 4: Breaker with Status

**Intent**: Clear breaker state indication

**SVG Structure**:
```svg
<g class="breaker" data-id="CB101">
  <!-- Background -->
  <rect class="breaker-body" width="40" height="20"/>
  
  <!-- Status indicator -->
  <rect class="breaker-status" width="40" height="20"
        fill="var(--breaker-closed)"/>
  
  <!-- ID label -->
  <text class="breaker-id" y="-5" text-anchor="middle">CB101</text>
  
  <!-- Value (optional) -->
  <text class="breaker-value" y="35" text-anchor="middle">45.2 MW</text>
</g>
```

**CSS**:
```css
.breaker[data-status="closed"] .breaker-status {
  fill: var(--breaker-closed);
}

.breaker[data-status="open"] .breaker-status {
  fill: none;
  stroke: var(--breaker-open);
  stroke-width: 2;
}

.breaker[data-status="tripped"] .breaker-status {
  fill: var(--breaker-tripped);
  animation: flash 0.5s infinite;
}
```

### Pattern 5: Busbar with Sections

**Intent**: Visualize bus with sectioning

**SVG Structure**:
```svg
<g class="busbar" data-voltage="115">
  <!-- Bus sections -->
  <line class="bus-section" x1="0" y1="0" x2="200" y2="0"/>
  <line class="bus-section" x1="220" y1="0" x2="400" y2="0"/>
  
  <!-- Section break indicator -->
  <g class="section-break" transform="translate(210, 0)">
    <line x1="0" y1="-5" x2="0" y2="5"/>
    <text y="15" text-anchor="middle">S1</text>
  </g>
  
  <!-- Voltage label -->
  <text class="bus-voltage" x="-10" y="5" text-anchor="end">115kV</text>
</g>
```

### Pattern 6: Transformer Symbol

**Intent**: Complete transformer representation

**SVG Structure**:
```svg
<g class="transformer" data-id="T1">
  <!-- Symbol -->
  <line class="windings" x1="0" y1="0" x2="0" y2="40"/>
  <line class="windings" x1="30" y1="0" x2="30" y2="40"/>
  
  <!-- Labels -->
  <text class="transformer-id" x="15" y="-5" text-anchor="middle">T1</text>
  <text class="transformer-rating" x="15" y="55" text-anchor="middle">50 MVA</text>
  
  <!-- Voltage labels -->
  <text class="voltage-primary" x="-5" y="20">115kV</text>
  <text class="voltage-secondary" x="35" y="20">13.8kV</text>
</g>
```

### Pattern 7: Power Line with Flow

**Intent**: Show line with real-time values

**SVG Structure**:
```svg
<g class="power-line" data-id="L101">
  <!-- Line -->
  <line class="line-conductor" x1="0" y1="0" x2="200" y2="0"/>
  
  <!-- Flow arrow -->
  <polygon class="flow-arrow" points="190,-3 200,0 190,3"/>
  
  <!-- Values -->
  <text class="line-values" x="100" y="-10" text-anchor="middle">
    45.2 MW
  </text>
  <text class="line-values" x="100" y="20" text-anchor="middle">
    12.4 MVA
  </text>
  
  <!-- ID -->
  <text class="line-id" x="100" y="35" text-anchor="middle">L101</text>
</g>
```

---

## State Patterns

### Pattern 8: Alarm Flash

**Intent**: Attention-grabbing alarm indication

**CSS**:
```css
@keyframes alarm-flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.alarm-critical {
  fill: var(--alarm-critical);
  animation: alarm-flash 0.5s infinite;
}

.alarm-high {
  fill: var(--alarm-high);
  animation: alarm-flash 1s infinite;
}

.alarm-acknowledged {
  animation: none;
}
```

**Usage**: Critical and high priority alarms

### Pattern 9: Equipment Health Indicator

**Intent**: Quick equipment status assessment

**States**:
```svg
<g class="health-indicator">
  <!-- Healthy -->
  <circle cx="0" cy="0" r="4" fill="#44FF44" data-health="healthy"/>
  
  <!-- Warning -->
  <circle cx="0" cy="0" r="4" fill="#FFCC00" data-health="warning"/>
  
  <!-- Failed -->
  <circle cx="0" cy="0" r="4" fill="#FF4444" data-health="failed" class="flash"/>
  
  <!-- Unknown -->
  <circle cx="0" cy="0" r="4" fill="#888888" data-health="unknown"/>
</g>
```

### Pattern 10: Value Status Color

**Intent**: Color-code values based on limits

```javascript
function getValueStyle(value, limits) {
  if (value >= limits.highHigh || value <= limits.lowLow) {
    return { color: 'var(--alarm-critical)', flash: true };
  }
  if (value >= limits.high || value <= limits.low) {
    return { color: 'var(--alarm-medium)', flash: false };
  }
  return { color: 'var(--text-normal)', flash: false };
}
```

---

## Interaction Patterns

### Pattern 11: Equipment Selection

**Intent**: Clear selection feedback

**CSS**:
```css
.equipment {
  cursor: pointer;
  transition: stroke 0.2s, filter 0.2s;
}

.equipment:hover {
  stroke: var(--highlight-color);
  stroke-width: 2px;
  filter: drop-shadow(0 0 4px var(--highlight-color));
}

.equipment.selected {
  stroke: var(--selection-color);
  stroke-width: 3px;
  stroke-dasharray: 5, 3;
}

.equipment.control-pending {
  stroke: var(--pending-color);
  animation: pulse 1s infinite;
}
```

### Pattern 12: Command Confirmation

**Intent**: Prevent accidental operations

**UI Flow**:
```
1. Click breaker
   ↓
2. Highlight (yellow), show confirmation dialog
   ┌─────────────────────────────────────────┐
   │ Confirm Operation                        │
   │ ─────────────────────────────────────── │
   │ CB101: CLOSE                              │
   │ MW: 12.4  │  Target: 45.2 MW            │
   │                                          │
   │ [Cancel]              [Confirm]            │
   └─────────────────────────────────────────┘
   ↓
3. Command sent on confirm
   ↓
4. Status updates
```

### Pattern 13: Zoom with Declutter

**Intent**: Appropriate detail at each zoom level

```javascript
const declutterLevels = {
  0.25: ['values', 'labels', 'protection'],
  0.5: ['values'],
  1.0: ['all'],
  1.5: ['all', 'protection'],
  2.0: ['all', 'protection', 'diagnostics']
};

function updateZoom(scale) {
  // Hide elements based on zoom level
  Object.entries(declutterLevels).forEach(([level, elements]) => {
    if (scale <= parseFloat(level)) {
      elements.forEach(el => hide(el));
    }
  });
}
```

---

## Animation Patterns

### Pattern 14: Power Flow Animation

**Intent**: Visual indication of energy flow

**SVG Animation**:
```svg
<line class="power-line" x1="0" y1="0" x2="200" y2="0">
  <!-- Flow particles -->
  <circle r="3" fill="var(--flow-color)">
    <animateMotion dur="2s" repeatCount="indefinite">
      <mpath href="#flow-path"/>
    </animateMotion>
  </circle>
</line>
```

**CSS Alternative**:
```css
@keyframes power-flow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}

.power-line[data-flowing="true"] {
  stroke-dasharray: 10, 10;
  animation: power-flow 1s linear infinite;
}
```

### Pattern 15: Value Transition

**Intent**: Smooth value updates

```javascript
function animateValue(element, oldValue, newValue) {
  const duration = 100;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = oldValue + (newValue - oldValue) * progress;
    element.textContent = current.toFixed(1);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
```

---

## Responsive Patterns

### Pattern 16: Multi-Monitor Support

**Intent**: Appropriate layout for screen size

```javascript
const layouts = {
  wall: { width: 1920, height: 1080, content: 'overview' },
  primary: { width: 1920, height: 1080, content: 'station' },
  secondary: { width: 1280, height: 720, content: 'detail' },
  mobile: { width: 375, height: 667, content: 'summary' }
};

function selectLayout(screenWidth) {
  if (screenWidth >= 1920) return layouts.primary;
  if (screenWidth >= 1280) return layouts.secondary;
  return layouts.mobile;
}
```

### Pattern 17: Day/Night Mode

**Intent**: Reduce eye strain in different lighting

```javascript
const themes = {
  day: {
    '--bg-primary': '#F0F0F0',
    '--bg-secondary': '#E0E0E0',
    '--text-primary': '#000000',
    '--text-secondary': '#444444'
  },
  night: {
    '--bg-primary': '#1A1A1A',
    '--bg-secondary': '#2D2D2D',
    '--text-primary': '#FFFFFF',
    '--text-secondary': '#AAAAAA'
  }
};

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  Object.entries(themes[theme]).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
```

---

## Pattern Usage Guide

| Pattern | When to Use |
|---------|-------------|
| Standard Station Layout | Primary station display |
| Alarm Banner | Always visible alarms |
| Context Panel | Equipment detail |
| Breaker with Status | Circuit breaker display |
| Busbar with Sections | Bus visualization |
| Transformer Symbol | Transformer display |
| Power Line with Flow | Line display with values |
| Alarm Flash | Attention for critical alarms |
| Equipment Health | Health status indication |
| Value Status Color | Value limit indication |
| Equipment Selection | Interactive selection |
| Command Confirmation | Control operations |
| Zoom with Declutter | Multi-scale displays |
| Power Flow Animation | Visual flow indication |
| Value Transition | Smooth updates |
| Multi-Monitor Support | Responsive layout |
| Day/Night Mode | Lighting adaptation |

---

*Source: Derived from ISA-101, GE iPower, ABB Network Manager, Siemens Spectrum Power, COPA-DATA zenon*
