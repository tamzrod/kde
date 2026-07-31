# Performance Optimization

## Overview

This document covers techniques for optimizing dashboard performance, including rendering, data handling, and animation.

---

## Performance Metrics

### Target Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| First Contentful Paint (FCP) | < 1.8s | First render |
| Largest Contentful Paint (LCP) | < 2.5s | Main content |
| Time to Interactive (TTI) | < 3.5s | Fully interactive |
| Cumulative Layout Shift (CLS) | < 0.1 | Visual stability |

### Dashboard-Specific

| Operation | Target | Acceptable |
|-----------|--------|------------|
| Chart render | < 100ms | < 500ms |
| Data update | < 50ms | < 200ms |
| Animation frame | 16ms (60fps) | 33ms (30fps) |
| Filter response | < 200ms | < 500ms |

---

## Rendering Optimization

### CSS Containment

```css
/* Isolate components */
.card {
  contain: content;
}

/* Strict containment */
.chart {
  contain: strict;
  contain-intrinsic-size: 400px 300px;
}
```

### Will-Change

```css
/* Hint browser for upcoming changes */
.animated-element {
  will-change: transform, opacity;
}

/* Remove when done */
.animated-element.done {
  will-change: auto;
}
```

### Hardware Acceleration

```css
/* GPU-accelerated properties */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

---

## Chart Optimization

### Data Sampling

```javascript
// Downsample large datasets
function sampleData(data, targetPoints) {
  if (data.length <= targetPoints) return data;
  
  const step = Math.ceil(data.length / targetPoints);
  return data.filter((_, i) => i % step === 0);
}
```

### Canvas vs SVG

| Size | Technology | Reason |
|------|------------|--------|
| < 1K elements | SVG | Accessibility, crisp |
| > 1K elements | Canvas | Performance |
| > 100K elements | WebGL | Hardware acceleration |

### ECharts Large Dataset

```javascript
option = {
  series: [{
    type: 'line',
    data: largeDataset,
    
    // Enable sampling
    sampling: 'lttb',  // Largest Triangle Three Buckets
    
    // Progressive rendering
    progressive: 400,
    progressiveThreshold: 800,
  }]
};
```

---

## Data Handling

### Virtualization

```javascript
// Virtual scrolling for tables
const virtualList = new VirtualList({
  items: largeDataset,
  itemHeight: 48,
  overscan: 5,
});
```

### Lazy Loading

```javascript
// Lazy load chart modules
const ChartComponent = React.lazy(() => import('./Chart'));

// Suspense for loading state
<Suspense fallback={<ChartSkeleton />}>
  <ChartComponent data={data} />
</Suspense>
```

### Data Caching

```javascript
// Memoize expensive calculations
const memoizedData = useMemo(() => {
  return expensiveTransform(rawData);
}, [rawData]);
```

---

## Animation Performance

### RequestAnimationFrame

```javascript
function animate(callback) {
  let frameId;
  
  function loop() {
    callback(performance.now());
    frameId = requestAnimationFrame(loop);
  }
  
  loop();
  
  return () => cancelAnimationFrame(frameId);
}
```

### Throttling Updates

```javascript
// Throttle frequent updates
const throttledUpdate = throttle((data) => {
  chart.setOption({ series: [{ data }] });
}, 100);

ws.onmessage = (event) => {
  throttledUpdate(JSON.parse(event.data));
};
```

### Batch DOM Updates

```javascript
// Batch updates for SVG
const g = d3.select('#chart');

g.transition()
  .duration(300)
  .attr('transform', newTransform);  // Single reflow
```

---

## Network Optimization

### Bundle Size

| Technique | Impact |
|-----------|--------|
| Tree shaking | Remove unused code |
| Code splitting | Load on demand |
| Compression | Reduce transfer |
| Font subsetting | Smaller fonts |

### Chart Bundle

```javascript
// ECharts tree-shaking
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, LineChart, PieChart, GridComponent, TooltipComponent, CanvasRenderer]);
```

---

## Monitoring

### Performance Observer

```javascript
// Measure rendering performance
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});

observer.observe({ entryTypes: ['measure', 'paint'] });
```

### Lighthouse CI

```yaml
# .lighthouserc.yml
ci:
  collect:
    url:
      - http://localhost:3000/dashboard
  assert:
    performance: 0.9
    first-contentful-paint: 1500
```

---

## Summary

| Area | Technique |
|------|-----------|
| Rendering | CSS containment, will-change |
| Charts | Canvas for large data, sampling |
| Data | Virtualization, memoization |
| Animation | RAF, throttling |
| Network | Code splitting, compression |

---

*Source: Google Web Vitals, web.dev, rendering performance guides*
