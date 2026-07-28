---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
---

# INV-RUNTIME-GUARD-001: Implementation Plan

**Investigation**: INV-RUNTIME-GUARD-001
**Document**: Implementation Plan
**Date**: 2026-07-28
**Status**: PENDING AUTHORIZATION

---

## 1. Implementation Overview

### 1.1 Components to Create

| Component | File | Purpose |
|-----------|------|---------|
| FileBoundaryGuard | `runtime/file_boundary_guard.py` | Check file paths against boundaries |
| ViolationHandler | `runtime/violation_handler.py` | Handle violations, request approval |
| EnforcingMixin | `runtime/enforcing_runtime.py` | Mixin for enforcing runtime |
| Tool Wrappers | `runtime/tools/enforcing_*.py` | Wrap file tools with enforcement |

### 1.2 Files to Modify

| File | Change |
|------|--------|
| `runtime/__init__.py` | Export new components |
| `runtime/preflight.py` | Initialize guard in bootstrap |
| `runtime/bootstrap.py` | Initialize enforcement |

---

## 2. Implementation Steps

### Phase 1: Core Components

#### Step 1.1: Create FileBoundaryGuard

```python
# /workspace/project/kde/runtime/file_boundary_guard.py

class FileBoundaryGuard:
    """Active enforcement of file boundary rules."""
    
    ALLOWED_PREFIXES = [
        "/workspace/project/kde/laboratory/",
        "/workspace/project/kde/runtime/logs/",
    ]
    
    EXEMPT_FILES = [
        "/workspace/project/kde/runtime/state.json",
        "/workspace/project/kde/runtime/catalog.json",
    ]
    
    def check_operation(self, operation: str, path: str) -> BoundaryCheckResult:
        # Check if operation is allowed
        ...
```

#### Step 1.2: Create ViolationHandler

```python
# /workspace/project/kde/runtime/violation_handler.py

class ViolationHandler:
    """Handle violations with human approval."""
    
    def handle_violation(self, result: BoundaryCheckResult) -> bool:
        # Present to human, return approval
        ...
```

#### Step 1.3: Create EnforcingRuntimeMixin

```python
# /workspace/project/kde/runtime/enforcing_runtime.py

class EnforcingRuntimeMixin:
    """Mixin that adds file boundary enforcement."""
    
    def execute_with_enforcement(self, operation, path, execute_func):
        # Check, approve, execute
        ...
```

### Phase 2: Integration

#### Step 2.1: Modify Bootstrap

```python
# In runtime/preflight.py or runtime/bootstrap.py

def run_preflight_check():
    # Initialize enforcement
    guard = FileBoundaryGuard()
    handler = ViolationHandler()
    
    print("✅ File Boundary Guard ACTIVE")
    ...
```

#### Step 2.2: Wrap File Tools

```python
# /workspace/project/kde/runtime/tools/enforcing_file_editor.py

class EnforcingFileEditorTool:
    """File editor with boundary enforcement."""
    
    def str_replace(self, path, old_str, new_str):
        # Check boundary
        if not guard.check_operation("str_replace", path):
            if not handler.handle_violation(result):
                return "BLOCKED"
        
        # Execute
        return original_tool.str_replace(path, old_str, new_str)
```

---

## 3. Human Authorization Checklist

Before implementation, human must authorize:

```
┌─────────────────────────────────────────────────────────────────────┐
│                  IMPLEMENTATION AUTHORIZATION                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Component: File Boundary Guard                                     │
│  Purpose: Enforce file boundaries during runtime                    │
│                                                                     │
│  ────────────────────────────────────────────────────────────────   │
│                                                                     │
│  [ ] Approve FileBoundaryGuard implementation                      │
│  [ ] Approve ViolationHandler implementation                       │
│  [ ] Approve Runtime integration                                    │
│  [ ] Approve Tool wrapper integration                              │
│                                                                     │
│  ────────────────────────────────────────────────────────────────   │
│                                                                     │
│  Expected Behavior After Implementation:                            │
│                                                                     │
│  "start engine" → Runtime starts with enforcement ACTIVE          │
│                                                                     │
│  User: "create file at /workspace/project/kde/new.md"              │
│  → Runtime: "⚠️ VIOLATION - Override? [Yes/No]"                    │
│                                                                     │
│  ────────────────────────────────────────────────────────────────   │
│                                                                     │
│  Authorized by: _________________  Date: _________________         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Testing Plan

### 4.1 Unit Tests

| Test | Expected Result |
|------|----------------|
| Check path inside /laboratory/ | ALLOWED |
| Check path in /runtime/logs/ | ALLOWED |
| Check path outside /laboratory/ | VIOLATION |
| Check exempt file | ALLOWED |
| Check read operation | ALLOWED |
| Check write operation | Check boundary |

### 4.2 Integration Tests

| Test | Expected Result |
|------|----------------|
| "start engine" initializes guard | Guard initialized |
| Violation prompts for approval | Message displayed |
| Approve violation | Operation executes |
| Block violation | Operation blocked |
| Violation logged | Log file created |

---

## 5. Document Status

**Status**: PENDING HUMAN AUTHORIZATION

Implementation requires explicit human approval.

---

*Generated by INV-RUNTIME-GUARD-001*
