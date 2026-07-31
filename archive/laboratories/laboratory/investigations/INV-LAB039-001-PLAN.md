# LAB-039 Implementation Plan

**Plan ID**: INV-LAB039-001-PLAN  
**Investigation**: INV-LAB039-001  
**Date**: 2026-07-27  
**Issue**: Grafana Issue #116074  
**Status**: 📋 Plan Ready for Authorization

---

## Problem Statement

When setting a custom label manually in an alert rule (e.g., `environment: production`), this label does not appear in the `$labels` namespace that is interpolated into notification messages.

**Root Cause**: In `expandAnnotationsAndLabels()` (cache.go), the template data used for expanding alert rule labels only contains `extraLabels` and `resultLabels`, not the manually set rule labels themselves.

---

## Implementation Strategy

### Approach: Include All Labels in Template Data

Modify the label expansion process to include all labels (including alertRule.Labels) in the template data before expansion. This ensures `$labels` contains the complete label set.

### Code Changes

#### File: `pkg/services/ngalert/state/cache.go`

**Location**: `expandAnnotationsAndLabels()` function (line 124)

**Current Code** (lines 153-159):
```go
// Merge both the extra labels and the labels from the evaluation into a common set
// of labels that can be expanded in custom labels and annotations.
templateData := template.NewData(mergeLabels(extraLabels, resultLabels), result)

// For now, do nothing with these errors as they are already logged in expand.
// In the future, we want to show these errors to the user somehow.
labels, _ := expand(ctx, log, alertRule.Title, alertRule.Labels, templateData, externalURL, result.EvaluatedAt)
annotations, _ := expand(ctx, log, alertRule.Title, alertRule.Annotations, templateData, externalURL, result.EvaluatedAt)
```

**Proposed Change**:
```go
// Merge extra labels, result labels, AND alert rule labels for template expansion.
// This ensures $labels contains all labels including manually set ones.
preliminaryLabels := mergeLabels(extraLabels, resultLabels, data.Labels(alertRule.Labels))
templateData := template.NewData(preliminaryLabels, result)

// For now, do nothing with these errors as they are already logged in expand.
// In the future, we want to show these errors to the user somehow.
labels, _ := expand(ctx, log, alertRule.Title, alertRule.Labels, templateData, externalURL, result.EvaluatedAt)
annotations, _ := expand(ctx, log, alertRule.Title, alertRule.Annotations, templateData, externalURL, result.EvaluatedAt)
```

**Note**: The `mergeLabels` function needs to be verified to handle 3 arguments, or a wrapper may be needed.

---

## Testing Plan

### Unit Tests

1. **Test Case**: Label Expansion with Custom Labels
   - File: `pkg/services/ngalert/state/cache_test.go` (or create new test file)
   - Scenario: Alert rule with manually set label `environment: production`
   - Verify: `$labels` template variable contains the custom label

2. **Test Case**: Label Precedence
   - Verify: Extra labels and rule labels take precedence over result labels
   - Already covered by existing tests

3. **Test Case**: Reserved Label Handling
   - Verify: Reserved labels are still handled correctly
   - Already covered by existing tests

### Integration Tests

1. **End-to-End Test**: Notification Template with Custom Labels
   - Create alert rule with custom label
   - Set notification message to `{{ $labels }}`
   - Fire alert and verify label appears in notification

---

## Rollout Plan

| Phase | Activity | Risk Level |
|-------|----------|------------|
| 1 | Implement fix in `expandAnnotationsAndLabels()` | Medium |
| 2 | Add unit tests | Low |
| 3 | Run existing test suite | Low |
| 4 | Create integration test | Low |
| 5 | Submit PR to Grafana | - |

---

## Verification Criteria

- [ ] Unit tests pass
- [ ] Existing tests pass (no regression)
- [ ] Custom labels appear in `$labels` namespace
- [ ] Label precedence maintained (extra > rule > result)
- [ ] Notification templates render correctly

---

## Authorization Required

**This plan requires human authorization before implementation.**

Per the Five Core Principles:
- ✅ No Auto-Continuation: Plan is paused awaiting authorization
- ✅ No Self-Approval: Human review required before implementation

---

**Plan Prepared**: KDE Runtime Engine (LAB-039)
**Status**: Awaiting Authorization
