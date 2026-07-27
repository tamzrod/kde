# LAB-039 Implementation Plan #2

**Plan ID**: INV-LAB039-002-PLAN  
**Investigation**: INV-LAB039-002  
**Date**: 2026-07-27  
**Issue**: Grafana Issue #13027 - "Log axis limits 'auto' doesn't work on histogram"  
**Age**: ~7 years open  
**Status**: 📋 Plan Ready for Authorization

---

## Problem Statement

When using a histogram panel with log scale on the Y-axis, the "auto" limits don't work correctly. The Y-axis maximum gets stuck at a default value (100) instead of properly auto-scaling to fit the data.

**Root Cause**: 
1. **Primary**: Histogram panel hardcodes Y-axis to `ScaleDistribution.Linear`, ignoring user configurations
2. **Secondary**: Scale builder fallback logic can trigger inappropriately for edge cases

---

## Implementation Strategy

### Approach: Support Y-Axis Scale Distribution Configuration

Modify the histogram panel to read the scale distribution from field config and apply it to the Y-axis scale.

### Code Changes

#### File: `public/app/plugins/panel/histogram/Histogram.tsx`

**Location**: `prepConfig()` function, scale builder section (around line 149)

**Current Code**:
```typescript
builder.addScale({
  scaleKey: 'y', // counts
  isTime: false,
  distribution: ScaleDistribution.Linear,  // ⚠️ HARDCODED
  orientation: ScaleOrientation.Vertical,
  direction: ScaleDirection.Up,
  softMin: 0,
});
```

**Proposed Change**:
```typescript
// Determine Y-axis scale distribution from field config
// Default to linear, allow log scale for histograms
const yScaleDistribution = customConfig.scaleDistribution?.type ?? ScaleDistribution.Linear;

builder.addScale({
  scaleKey: 'y', // counts
  isTime: false,
  distribution: yScaleDistribution,
  log: yScaleDistribution === ScaleDistribution.Log ? (customConfig.scaleDistribution?.log ?? 2) : undefined,
  orientation: ScaleOrientation.Vertical,
  direction: ScaleDirection.Up,
  softMin: yScaleDistribution === ScaleDistribution.Log ? null : 0,  // No softMin for log
});
```

**Note**: Need to aggregate `customConfig` from all fields or use a default. The current implementation creates scales before processing individual fields.

**Alternative Implementation** (simpler):
Read the scale distribution from the first data field's config:

```typescript
// Get scale distribution from first data field (fields[2] onwards)
const firstDataField = frame.fields[2];
const firstFieldConfig: FieldConfig = { ...defaultFieldConfig, ...firstDataField.config.custom };
const yScaleDistribution = firstFieldConfig.scaleDistribution?.type ?? ScaleDistribution.Linear;
const yLogBase = firstFieldConfig.scaleDistribution?.log ?? 2;

builder.addScale({
  scaleKey: 'y',
  isTime: false,
  distribution: yScaleDistribution,
  log: yScaleDistribution === ScaleDistribution.Log ? yLogBase : undefined,
  orientation: ScaleOrientation.Vertical,
  direction: ScaleDirection.Up,
  softMin: yScaleDistribution === ScaleDistribution.Log ? null : 0,
});
```

---

## Testing Plan

### Unit Tests

1. **Test Case**: Histogram with Log Y-Axis
   - File: `public/app/plugins/panel/histogram/Histogram.test.tsx`
   - Scenario: Configure histogram with Y-axis log scale
   - Verify: Y-axis uses log distribution, auto-scaling works

2. **Test Case**: Scale Distribution Propagates
   - File: `public/app/plugins/panel/histogram/Histogram.test.tsx`
   - Scenario: Set log base to 10 on Y-axis
   - Verify: Scale config contains `distr: 3, log: 10`

3. **Test Case**: Backward Compatibility
   - Verify: Linear scale still works when no distribution specified
   - Verify: Default softMin: 0 for linear, null for log

### Integration Tests

1. **Test Case**: End-to-End Log Scale
   - Create histogram with log Y-axis
   - Set various data ranges
   - Verify auto-scaling calculates correct limits

---

## Rollout Plan

| Phase | Activity | Risk Level |
|-------|----------|------------|
| 1 | Implement fix in Histogram.tsx | Medium |
| 2 | Add unit tests | Low |
| 3 | Run existing test suite | Low |
| 4 | Verify backward compatibility | Low |
| 5 | Submit PR to Grafana | - |

---

## Verification Criteria

- [ ] Unit tests pass
- [ ] Existing histogram tests pass (no regression)
- [ ] Y-axis accepts log scale distribution
- [ ] Auto-scaling works correctly with log Y-axis
- [ ] Linear scale behavior unchanged
- [ ] Manual Y-max still works

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking existing histograms | Low | Medium | Test with default config (linear) |
| Log scale edge cases | Medium | Low | Review scale builder fallback logic |
| Performance impact | Low | Low | Scale config is computed once per render |

---

## Authorization Required

**This plan requires human authorization before implementation.**

Per the Five Core Principles:
- ✅ No Auto-Continuation: Plan is paused awaiting authorization
- ✅ No Self-Approval: Human review required before implementation

---

**Plan Prepared**: KDE Runtime Engine (LAB-039)
**Status**: Awaiting Authorization
