# Dynamic Behavior in Utility SLDs

## Overview

This document defines how utility-grade SCADA Single Line Diagrams represent dynamic states, real-time updates, and animated behaviors.

---

## Real-Time Updates

### Data Refresh Rates

| Data Type | Update Frequency | Priority |
|-----------|------------------|----------|
| Breaker Status | 1-2 seconds | Critical |
| Voltage | 2-5 seconds | High |
| Current/Power | 2-5 seconds | High |
| Frequency | 1 second | High |
| Equipment Health | 30-60 seconds | Medium |
| Historical Data | On-demand | Low |

### Update Mechanisms

**Polling Model**:
```
Client → Request → Server → Response → Client
   │                              │
   └─────── Repeat every N seconds ───┘
```

**WebSocket Model** (Preferred):
```
Server → Push → Client (on data change)
   │
   └── WebSocket connection maintained
```

---

## Power Flow Animation

### Visual Flow Indicators

**Direction Arrows**:
```
Normal Flow:
──────→──────  (Right arrow = Left to Right)
──────←──────  (Left arrow = Right to Left)

Bi-directional:
──────↔──────  (Double arrow = Either direction)
```

**Animation Style**:
| Type | Speed | Use Case |
|------|-------|----------|
| None | Static | Normal conditions |
| Slow pulse | 2-3 seconds | Low power flow |
| Medium pulse | 1-2 seconds | Normal flow |
| Fast pulse | 0.5 seconds | High flow |
| Flow lines | Continuous | Animation emphasis |

**Implementation**:
```svg
<!-- Animated flow dots -->
<line stroke="cyan" stroke-width="2">
  <animateMotion dur="2s" repeatCount="indefinite">
    <mpath href="#power-path"/>
  </animateMotion>
</line>
```

### Flow Color Coding

| Flow Condition | Visual Indicator |
|----------------|-----------------|
| Forward flow | Arrow + saturated color |
| Reverse flow | Arrow + different color (often yellow) |
| No flow | No arrow + muted color |
| Fault flow | Flashing + high saturation |

---

## Alarm Animation

### Flashing Patterns

| Priority | Pattern | Rate | Color |
|----------|---------|------|-------|
| Critical | Flash | 0.5s on/off | Red |
| High | Flash | 1s on/off | Red/Orange |
| Medium | Flash | 2s on/off | Yellow |
| Acknowledged | Steady | N/A | Same color |

### Flash Behavior Rules

1. **Acknowledge to Stop**: Flashing stops on acknowledgment
2. **Flash Priority**: Highest alarm drives flash rate
3. **Combine Carefully**: Multiple alarms may appear as one flash
4. **Accessibility**: Add icon/shape, don't rely on color alone

**Implementation**:
```javascript
// Pseudo-code for alarm flash
function renderAlarm(alarm) {
  if (alarm.priority === 'critical' && !alarm.acknowledged) {
    return `<rect class="flash-critical" .../>`;
  }
  return `<rect fill="${alarm.color}" .../>`;
}

// CSS Animation
@keyframes flash-critical {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.flash-critical {
  animation: flash-critical 0.5s infinite;
}
```

---

## State Transitions

### Breaker State Changes

**Visual Transition**:
```
CLOSED → OPEN
  │        │
  │        ▼
  │    ┌─────────┐
  │    │ GREEN   │ (Open = Green)
  │    │ OUTLINE │
  │    └─────────┘
  │
  ▼
┌─────────┐
│   RED   │ (Closed = Red)
│  FILLED │
└─────────┘
```

**Transition Animation**:
- Quick fill change (200ms)
- No elaborate animation
- State must be unambiguous during transition

### Equipment Health Animation

| State | Visual | Animation |
|-------|--------|-----------|
| Healthy | Green indicator | None |
| Degraded | Yellow indicator | Slow blink |
| Failed | Red indicator | Fast blink |
| Unknown | Gray indicator | None |

---

## Interactive Behaviors

### Hover States

**Equipment Hover**:
- Highlight equipment outline
- Show tooltip with quick summary
- Highlight associated connections

**Implementation**:
```css
.equipment:hover {
  stroke: var(--highlight-color);
  stroke-width: 2px;
  filter: drop-shadow(0 0 4px var(--highlight-color));
}
```

### Selection States

| State | Visual |
|-------|--------|
| Selected | White outline, thicker |
| Control Pending | Yellow pulse |
| Selected for Command | Cyan highlight |

### Command Confirmation

**Sequence**:
1. Operator selects equipment
2. Highlight turns yellow (pending)
3. Confirmation dialog appears
4. Operator confirms
5. Command sent
6. Status updates

---

## Live Measurement Updates

### Value Change Visualization

**Number Animation**:
```javascript
// Smooth number transition
function animateValue(element, oldValue, newValue, duration) {
  const start = performance.now();
  const animate = (currentTime) => {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = oldValue + (newValue - oldValue) * progress;
    element.textContent = current.toFixed(1);
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}
```

### Out-of-Range Indication

| Condition | Visual |
|-----------|--------|
| Above High High | Red background, flash |
| Above High | Orange background |
| Normal | Default color |
| Below Low | Orange background |
| Below Low Low | Red background, flash |

---

## Status Indicators

### Communication Status

| State | Visual |
|-------|--------|
| Online | Normal display |
| Stale | Yellow overlay |
| Offline | Gray + "?" indicator |
| Error | Red + "!" indicator |

**Stale Data Rules**:
- Data older than timeout threshold
- Typically 30-60 seconds
- Visual indication required
- Often shown as faded or striped

### Protection Status

**Relay Indicators**:
```
● = Healthy (Green, small dot)
● = Tripped (Red, flashing)
● = Blocked (Yellow)
● = Failed (Gray)
```

---

## Time-Based Displays

### Timestamp Display

**Position**: Top-right or header
**Format**: ISO 8601 or local
```
Example: 2026-07-21 14:32:05
         14:32:05 (HH:MM:SS)
```

**Importance**: Operators need accurate time for sequence-of-events analysis

### Historical Trend Integration

**On-Click Behavior**:
- Click value → Open trend display
- Show historical data for that point
- Overlay on same time scale

---

## Animation Performance

### Optimization Guidelines

| Technique | Benefit |
|-----------|---------|
| CSS animations | GPU accelerated |
| SVG SMIL | Native, efficient |
| RequestAnimationFrame | Smooth, throttled |
| Batch updates | Reduce redraws |
| Layer compositing | Optimize z-order |

### Performance Targets

| Metric | Target |
|--------|--------|
| Update latency | < 100ms |
| Animation frame rate | 30-60 FPS |
| Memory usage | < 200MB |
| CPU usage | < 10% |

---

## Summary

| Dynamic Element | Implementation | Priority |
|-----------------|----------------|----------|
| Real-time values | WebSocket/polling | Critical |
| State changes | Immediate update | Critical |
| Alarm flashing | CSS animation | Critical |
| Power flow | SVG animation | High |
| Hover states | CSS :hover | Medium |
| Selection | State class | Medium |
| Trend updates | Throttled | Medium |

---

*Source: ISA-101, GE iPower, ABB Network Manager, COPA-DATA zenon*
