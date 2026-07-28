---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
---

# INV-RUNTIME-GUARD-001: Active Runtime Enforcement

**Investigation**: INV-RUNTIME-GUARD-001
**Document**: Active Runtime Enforcement Design
**Date**: 2026-07-28
**Status**: IN_PROGRESS

---

## 1. Problem Statement

The current runtime does not actively enforce file boundary rules during execution. When the engine runs:

### 1.1 Current Behavior (Non-Enforcing)

```
User: "Create a file at /workspace/project/kde/new-file.md"
         ↓
Runtime: Executes immediately
         ↓
File created outside /laboratory/ ❌
```

### 1.2 Desired Behavior (Enforcing)

```
User: "Create a file at /workspace/project/kde/new-file.md"
         ↓
Runtime: Check if /workspace/project/kde/new-file.md is within boundaries
         ↓
/workspace/project/kde/new-file.md is OUTSIDE /laboratory/
         ↓
┌─────────────────────────────────────────────────────────────┐
│  ⚠️  VIOLATION DETECTED                                   │
│                                                             │
│  Attempted Action: Create file                               │
│  Target: /workspace/project/kde/new-file.md                 │
│  Location: Outside /laboratory/                              │
│                                                             │
│  This requires human approval to proceed.                    │
│                                                             │
│  Override? [Yes/No]                                        │
└─────────────────────────────────────────────────────────────┘
         ↓
Human: "Yes" (approves) or "No" (blocks)
         ↓
File created or blocked ✅
```

---

## 2. Enforcement Mechanism Design

### 2.1 File Boundary Guard

```python
class FileBoundaryGuard:
    """
    Active enforcement of file boundary rules during runtime.
    
    Checks all file write operations against permitted boundaries.
    """
    
    # Explicitly allowed paths
    ALLOWED_PATTERNS = [
        "/workspace/project/kde/laboratory/",      # Laboratory (governed)
        "/workspace/project/kde/runtime/logs/",   # Runtime logs (exempt)
    ]
    
    # Pre-existing exempt files
    EXEMPT_PATHS = [
        "/workspace/project/kde/runtime/state.json",
        "/workspace/project/kde/runtime/catalog.json",
    ]
    
    def __init__(self):
        self.violations = []
    
    def check_write(self, path: str, operation: str) -> CheckResult:
        """
        Check if a file write is permitted.
        
        Args:
            path: The file path being written
            operation: The operation (create, write, delete, etc.)
            
        Returns:
            CheckResult with violation details if blocked
        """
        # Check exempt paths first
        if path in self.EXEMPT_PATHS:
            return CheckResult(allowed=True, exempt=True)
        
        # Check if within allowed patterns
        for pattern in self.ALLOWED_PATTERNS:
            if path.startswith(pattern):
                return CheckResult(allowed=True, exempt=False)
        
        # Outside boundaries - VIOLATION
        return CheckResult(
            allowed=False,
            exempt=False,
            violation=Violation(
                type="FILE_BOUNDARY",
                path=path,
                operation=operation,
                reason=f"File write outside permitted boundaries: {path}",
                requires_approval=True
            )
        )
```

### 2.2 Violation Handler

```python
class ViolationHandler:
    """
    Handles detected violations by requesting human approval.
    """
    
    def __init__(self):
        self.approvals = {}
    
    def handle_violation(self, violation: Violation) -> bool:
        """
        Present violation to human and get approval.
        
        Args:
            violation: The detected violation
            
        Returns:
            True if human approves override, False if blocked
        """
        # Log violation
        self.log_violation(violation)
        
        # Present to human
        message = f"""
⚠️  VIOLATION DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Attempted Action: {violation.operation}
Target: {violation.path}
Location: Outside /laboratory/

Reason: {violation.reason}

This requires human approval to proceed.

Override? [Yes/No]
"""
        # In practice, this would be presented to the human
        # For now, return False (block by default)
        return False
    
    def log_violation(self, violation: Violation):
        """Log violation for audit."""
        # Write to runtime logs
        pass
```

### 2.3 Integration with Runtime

```python
class EnforcingRuntime:
    """
    Runtime with active file boundary enforcement.
    """
    
    def __init__(self, kde_root: str):
        self.kde_root = kde_root
        self.guard = FileBoundaryGuard()
        self.handler = ViolationHandler()
    
    def execute_instruction(self, instruction: str) -> ExecutionResult:
        """
        Execute user instruction with boundary enforcement.
        """
        # Parse instruction to detect file operations
        file_ops = self._detect_file_operations(instruction)
        
        for op in file_ops:
            # Check each file operation
            result = self.guard.check_write(op.path, op.operation)
            
            if not result.allowed:
                if result.violation.requires_approval:
                    # Request human approval
                    approved = self.handler.handle_violation(result.violation)
                    
                    if not approved:
                        # Block the operation
                        return ExecutionResult(
                            success=False,
                            blocked=True,
                            reason=f"VIOLATION: {result.violation.reason}",
                            requires_approval=True
                        )
        
        # All checks passed - execute instruction
        return self._execute_raw(instruction)
```

---

## 3. Violation Scenarios

### 3.1 Scenario: File Creation Outside /laboratory/

```
User: "Create /workspace/project/kde/README.md"

Runtime:
  ┌─────────────────────────────────────────────────────────────┐
  │  ⚠️  VIOLATION DETECTED                                   │
  │                                                             │
  │  Attempted Action: Create file                               │
  │  Target: /workspace/project/kde/README.md                   │
  │  Location: /workspace/project/kde/ (outside /laboratory/)  │
  │                                                             │
  │  Override? [Yes/No]                                        │
  └─────────────────────────────────────────────────────────────┘
```

### 3.2 Scenario: File Creation Inside /laboratory/

```
User: "Create /workspace/project/kde/laboratory/investigations/INV-NEW/file.md"

Runtime:
  ✅ ALLOWED - Inside /laboratory/ (Laboratory Rules apply)
  → Execute instruction
```

### 3.3 Scenario: File Creation in Runtime Logs

```
User: "Create /workspace/project/kde/runtime/logs/test.jsonl"

Runtime:
  ✅ ALLOWED - Inside /runtime/logs/ (exempt)
  → Execute instruction
```

### 3.4 Scenario: Read Operation (No Check)

```
User: "Read /workspace/project/kde/engines/beta/spec.md"

Runtime:
  ✅ ALLOWED - Read operations are not restricted
  → Execute instruction
```

---

## 4. Implementation Requirements

### 4.1 Components Needed

| Component | Purpose |
|-----------|---------|
| `FileBoundaryGuard` | Check file operations against boundaries |
| `ViolationHandler` | Present violations and get approval |
| `EnforcingRuntime` | Wrap runtime with enforcement |
| `violation_log.md` | Audit log for violations |

### 4.2 Integration Points

| Point | Change Required |
|-------|----------------|
| `start engine` | Initialize FileBoundaryGuard |
| Instruction parsing | Detect file operations |
| File tool wrapper | Check before executing |
| Violation response | Present to human |

### 4.3 User Experience

```
When "start engine" is invoked:
  1. Runtime initializes with enforcement active
  2. All file write operations are checked
  3. Violations are flagged and require human approval
  4. Approved overrides are logged
  5. Blocked operations are rejected
```

---

## 5. Document Status

**Status**: IN_PROGRESS
**Next**: Human decision on whether to implement enforcement

---

*Generated by INV-RUNTIME-GUARD-001*
