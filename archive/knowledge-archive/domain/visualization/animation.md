# Animation & Motion Design

## Overview

This document covers animation principles for data visualization, guiding when animation enhances understanding and when it becomes distracting.

---

## Why Animate?

### Benefits of Animation

1. **Transitions**: Helps users track changes between states
2. **Context**: Maintains spatial relationships during updates
3. **Engagement**: Draws attention to important changes
4. **Understanding**: Shows causality and relationships
5. **Feedback**: Provides immediate response to actions

### When Animation Helps

- **State changes**: Before → After
- **Data updates**: Smooth value transitions
- **Filtering**: Show/hide elements
- **Sorting**: Reordering elements
- **Drill-down**: Navigation between levels
- **Selection**: Highlighting relationships

---

## Animation Principles

### 1. Purpose Before Animation

**Principle**: Every animation must serve a purpose.

**Questions to Ask**:
- Does this animation help understanding?
- Does it draw attention appropriately?
- Does it provide feedback?
- Does it maintain context?

**When to Skip Animation**:
- Purely decorative
- Adds no information
- Slows down interaction
- Causes distraction

### 2. Motion Hierarchy

**Principle**: Animation should reinforce information hierarchy.

**Priority-Based Animation**:
| Priority | Animation | Duration |
|----------|-----------|----------|
| Critical | Fast, prominent | 100-200ms |
| Important | Medium | 200-400ms |
| Normal | Subtle | 200-300ms |
| Background | Minimal | 100-200ms |

### 3. Timing

**Principle**: Animation duration should match purpose.

**Duration Guidelines**:
| Animation Type | Duration | Example |
|---------------|----------|---------|
| Micro-interaction | 100-150ms | Button hover |
| State change | 200-300ms | Toggle on/off |
| Data transition | 300-500ms | Chart update |
| Page transition | 300-500ms | View change |
| Loading | Continuous | Progress indicator |

**Too Fast** (< 100ms):
- Feels instantaneous
- No perception of change
- Appears buggy

**Too Slow** (> 1s):
- Impatient users
- Breaks flow
- Wastes time

### 4. Easing

**Principle**: Use easing functions for natural motion.

**Easing Functions**:
```css
/* Linear - rarely used alone */
linear

/* Ease out - fast start, slow end (common) */
ease-out
cubic-bezier(0, 0, 0.2, 1)

/* Ease in - slow start, fast end */
ease-in
cubic-bezier(0.4, 0, 1, 1)

/* Ease in-out - smooth start and end */
ease-in-out
cubic-bezier(0.4, 0, 0.2, 1)
```

**When to Use Each**:
| Easing | Use Case |
|--------|----------|
| Ease-out | Elements entering (feels natural) |
| Ease-in | Elements leaving |
| Ease-in-out | State transitions |
| Linear | Continuous motion (loading) |

### 5. Motion Restraint

**Principle**: Subtle is often better.

**Guidelines**:
- Avoid animation for animation's sake
- One prominent animation at a time
- Reduce motion in busy dashboards
- Respect user preferences

---

## Animation Patterns

### Data Updates

**Smooth Transitions**:
```javascript
// Animate value change
function animateValue(element, oldValue, newValue) {
  const duration = 300;
  const start = performance.now();
  
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    
    const value = oldValue + (newValue - oldValue) * eased;
    element.textContent = value.toFixed(1);
    
    if (progress < 1) requestAnimationFrame(update);
  }
  
  requestAnimationFrame(update);
}
```

**Enter/Exit Patterns**:
```css
/* Fade in */
.fade-enter {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

/* Fade out */
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 200ms ease-in;
}
```

### Chart Transitions

**Bar Chart Update**:
```javascript
// D3-style transition
bars.transition()
  .duration(500)
  .ease(d3.easeQuadOut)
  .attr("height", d => height - yScale(d.value))
  .attr("y", d => yScale(d.value));
```

**ECharts Transition**:
```javascript
chart.setOption({
  series: [{
    data: newData
  }]
}, {
  replaceMerge: ['series']
});
```

### Micro-interactions

**Hover Effects**:
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.button:active {
  transform: scale(0.98);
  transition: transform 50ms;
}
```

**Loading States**:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}
```

---

## Alarm Animation

### Flash Patterns

**Priority-Based**:
| Priority | Pattern | Rate | Use |
|----------|---------|------|-----|
| Critical | Flash | 0.5s | Immediate attention |
| High | Flash | 1s | Urgent |
| Medium | Pulse | 2s | Warning |
| Low | None | - | Info only |

### Implementation

```css
@keyframes alarm-flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.alarm-critical {
  background-color: var(--alarm-critical);
  animation: alarm-flash 0.5s infinite;
}

.alarm-high {
  background-color: var(--alarm-high);
  animation: alarm-flash 1s infinite;
}
```

---

## Accessibility

### Respect Reduced Motion

**Principle**: Not all users want animation.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### JavaScript Implementation

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Apply animations
  element.classList.add('animate');
}
```

### Guidelines

1. **Essential animation**: Keep (loading, alerts)
2. **Enhancement animation**: Remove for reduced motion
3. **Decorative animation**: Skip entirely

---

## Performance

### Animation Performance

**GPU-Accelerated Properties**:
```css
/* Good - compositor properties */
transform
opacity
filter

/* Avoid - triggers layout/reflow */
width
height
margin
padding
top, left, right, bottom
font-size
```

### Throttling

```javascript
// Throttle animation updates
function throttledUpdate(callback, delay = 16) {
  let lastCall = 0;
  return function(...args) {
    const now = performance.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
}
```

### Large Data Animations

**Strategies**:
1. Animate subsets, not all
2. Use Canvas/WebGL for many elements
3. Batch updates
4. Skip frames intentionally

---

## Anti-Patterns

### What to Avoid

1. **Constant movement**: Never-ending animations distract
2. **Competing animations**: Multiple focal points confuse
3. **Slow transitions**: Users hate waiting
4. **Unexpected motion**: Respect user expectations
5. **Motion without meaning**: Decoration adds noise

### Wrong Examples

```css
/* Bad: Decorative infinite animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.loading {
  animation: spin 2s linear infinite; /* Too slow */
}

/* Bad: Too many simultaneous animations */
.chart * {
  animation: pulse 1s infinite; /* Everything flashes */
}

/* Bad: Animation on scroll (distracting) */
.element {
  animation: bounce 1s infinite; /* While scrolling */
}
```

---

## Summary

| Aspect | Recommendation |
|--------|----------------|
| Purpose | Animation must serve understanding |
| Duration | 100-500ms typically |
| Easing | ease-out for enter, ease-in for exit |
| Priority | Important = faster/different |
| Accessibility | Respect prefers-reduced-motion |
| Performance | Use GPU-accelerated properties |
| Restraint | Less is more |

---

*Source: Google Material Design, Apple Human Interface Guidelines, Nielsen Norman Group*
