---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
---

# INV-RUNTIME-GUARD-001: File Boundary Guard Specification

**Investigation**: INV-RUNTIME-GUARD-001
**Document**: File Boundary Guard Implementation Specification
**Date**: 2026-07-28
**Status**: IN_PROGRESS

---

## 1. Overview

### 1.1 Purpose

The **File Boundary Guard** is a runtime component that enforces file boundary rules during execution:

- All file write operations are checked against permitted boundaries
- Violations are flagged and require human approval
- All decisions are logged for audit

### 1.2 Behavior

```
User Instruction
       ↓
┌──────────────────────────────────────────────────────┐
│              FILE BOUNDARY GUARD                      │
│                                                      │
│   1. Parse instruction for file operations          │
│   2. Check each operation against boundaries         │
│   3. If VIOLATION → request override               │
│   4. Log decision                                    │
│   5. Execute or block                               │
└──────────────────────────────────────────────────────┘
       ↓
Result
```

---

## 2. Permitted Boundaries

### 2.1 Allowed Paths

| Path Pattern | Status | Reason |
|-------------|--------|--------|
| `/workspace/project/kde/laboratory/**` | ✅ ALLOWED | Laboratory Rules apply |
| `/workspace/project/kde/runtime/logs/**` | ✅ ALLOWED | Runtime logs (exempt) |
| `/workspace/project/kde/runtime/state.json` | ✅ ALLOWED | Runtime state (exempt) |
| `/workspace/project/kde/runtime/catalog.json` | ✅ ALLOWED | Knowledge catalog (exempt) |
| `/workspace/project/kde/runtime/aliases/*.log` | ✅ ALLOWED | Alias logs (exempt) |

### 2.2 Blocked Paths (Violation)

| Path Pattern | Status | Reason |
|-------------|--------|--------|
| `/workspace/project/kde/engines/**` | ⚠️ VIOLATION | Outside laboratory |
| `/workspace/project/kde/knowledge/**` | ⚠️ VIOLATION | Outside laboratory |
| `/workspace/project/kde/seeds/**` | ⚠️ VIOLATION | Outside laboratory |
| `/workspace/project/kde/experts/**` | ⚠️ VIOLATION | Outside laboratory |
| `/workspace/project/kde/governance/**` | ⚠️ VIOLATION | Outside laboratory |
| `/workspace/project/kde/**` (root level) | ⚠️ VIOLATION | Outside laboratory |
| `/workspace/project/kde/README.md` | ⚠️ VIOLATION | Root file |
| `/workspace/project/kde/*.*` | ⚠️ VIOLATION | Root files |

---

## 3. Violation Response

### 3.1 Violation Detection

When a file write operation targets a blocked path:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ⚠️  FILE BOUNDARY VIOLATION                                            │
│  ═══════════════════════════════════════════                            │
│                                                                          │
│  Attempted Action:  [create|write|delete] file                         │
│  Target Path:        /workspace/project/kde/new-file.md                  │
│  Location:           /workspace/project/kde/ (outside /laboratory/)     │
│                                                                          │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  Rule: No files written outside /laboratory/ without human approval     │
│                                                                          │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  Required Action: Human authorization to override                        │
│                                                                          │
│  [Override: Yes]  [Block: No]                                          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Violation Handling

| Human Response | Action |
|--------------|--------|
| "Yes" / "Override" | Log approval, execute operation |
| "No" / "Block" | Log rejection, block operation |
| No response | Block operation (default) |

---

## 4. Implementation

### 4.1 File Boundary Guard Class

```python
# /workspace/project/kde/runtime/file_boundary_guard.py

import os
from pathlib import Path
from typing import List, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime
from enum import Enum


class ViolationSeverity(Enum):
    """Severity levels for violations."""
    BLOCKED = "blocked"        # Requires approval
    WARNING = "warning"        # Informational
    ALLOWED = "allowed"       # No issue


@dataclass
class FileOperation:
    """Represents a file operation to check."""
    operation: str  # create, write, delete, str_replace
    path: str
    details: str = ""


@dataclass
class BoundaryCheckResult:
    """Result of a boundary check."""
    allowed: bool
    path: str
    operation: str
    violation: bool
    severity: ViolationSeverity
    reason: str
    requires_approval: bool


class FileBoundaryGuard:
    """
    Active enforcement of file boundary rules.
    
    Checks all file write operations against permitted boundaries
    and handles violations with human approval.
    """
    
    # Base path for KDE
    KDE_ROOT = "/workspace/project/kde"
    
    # Allowed path prefixes
    ALLOWED_PREFIXES = [
        "/workspace/project/kde/laboratory/",      # Laboratory
        "/workspace/project/kde/runtime/logs/",   # Runtime logs
    ]
    
    # Exempt specific files
    EXEMPT_FILES = [
        "/workspace/project/kde/runtime/state.json",
        "/workspace/project/kde/runtime/catalog.json",
        "/workspace/project/kde/runtime/aliases/audit.log",
        "/workspace/project/kde/runtime/aliases/discovery.log",
    ]
    
    def __init__(self, kde_root: str = "/workspace/project/kde"):
        self.kde_root = kde_root
        self.violations: List[BoundaryCheckResult] = []
        self.approvals: dict = {}  # path -> approved_by
    
    def check_path(self, path: str, operation: str) -> BoundaryCheckResult:
        """
        Check if a file path is within allowed boundaries.
        
        Args:
            path: The file path to check
            operation: The operation being performed
            
        Returns:
            BoundaryCheckResult with violation details
        """
        # Normalize path
        path = os.path.abspath(path)
        
        # Check exempt files first
        if path in self.EXEMPT_FILES:
            return BoundaryCheckResult(
                allowed=True,
                path=path,
                operation=operation,
                violation=False,
                severity=ViolationSeverity.ALLOWED,
                reason="Exempt file",
                requires_approval=False
            )
        
        # Check allowed prefixes
        for prefix in self.ALLOWED_PREFIXES:
            if path.startswith(prefix):
                return BoundaryCheckResult(
                    allowed=True,
                    path=path,
                    operation=operation,
                    violation=False,
                    severity=ViolationSeverity.ALLOWED,
                    reason=f"Within allowed path: {prefix}",
                    requires_approval=False
                )
        
        # Check if inside /laboratory/ (dynamic check)
        lab_path = os.path.join(self.kde_root, "laboratory")
        if path.startswith(lab_path + "/") or path == lab_path:
            return BoundaryCheckResult(
                allowed=True,
                path=path,
                operation=operation,
                violation=False,
                severity=ViolationSeverity.ALLOWED,
                reason="Inside /laboratory/",
                requires_approval=False
            )
        
        # VIOLATION - Outside all allowed paths
        return BoundaryCheckResult(
            allowed=False,
            path=path,
            operation=operation,
            violation=True,
            severity=ViolationSeverity.BLOCKED,
            reason=f"Outside /laboratory/: {path}",
            requires_approval=True
        )
    
    def check_operation(self, operation: str, path: str) -> BoundaryCheckResult:
        """
        Check a file operation.
        
        Args:
            operation: The operation type
            path: The file path
            
        Returns:
            BoundaryCheckResult
        """
        # Only check write operations
        write_operations = {"create", "write", "str_replace", "delete", "insert", "mkdir"}
        
        if operation.lower() not in write_operations:
            # Read operations are always allowed
            return BoundaryCheckResult(
                allowed=True,
                path=path,
                operation=operation,
                violation=False,
                severity=ViolationSeverity.ALLOWED,
                reason="Read operation - not restricted",
                requires_approval=False
            )
        
        return self.check_path(path, operation)
    
    def is_allowed(self, path: str, operation: str) -> Tuple[bool, str]:
        """
        Quick check if operation is allowed.
        
        Returns:
            Tuple of (allowed, reason)
        """
        result = self.check_operation(operation, path)
        return result.allowed, result.reason
    
    def log_violation(self, result: BoundaryCheckResult, approved: Optional[str] = None):
        """Log a violation for audit."""
        self.violations.append(result)
        if approved:
            self.approvals[result.path] = approved
```

### 4.2 Violation Handler

```python
# /workspace/project/kde/runtime/violation_handler.py

import json
from pathlib import Path
from datetime import datetime
from typing import Optional, List
from dataclasses import dataclass, asdict

from .file_boundary_guard import BoundaryCheckResult, FileBoundaryGuard


@dataclass
class ViolationRecord:
    """Record of a violation and its resolution."""
    timestamp: str
    operation: str
    path: str
    reason: str
    resolved: bool
    approved: bool
    resolved_by: Optional[str]
    resolved_at: Optional[str]


class ViolationHandler:
    """
    Handles violations by presenting them to humans for approval.
    """
    
    def __init__(self, kde_root: str = "/workspace/project/kde"):
        self.kde_root = kde_root
        self.log_dir = Path(kde_root) / "runtime" / "logs" / "violations"
        self.log_dir.mkdir(parents=True, exist_ok=True)
        self.guard = FileBoundaryGuard(kde_root)
        self.pending_violations: List[BoundaryCheckResult] = []
    
    def handle_violation(self, result: BoundaryCheckResult) -> bool:
        """
        Handle a violation by requesting human approval.
        
        Args:
            result: The violation to handle
            
        Returns:
            True if approved, False if blocked
        """
        # Log the violation
        self.pending_violations.append(result)
        
        # Present violation to human (this would be shown to the user)
        message = self._format_violation_message(result)
        print(message)
        
        # In the actual implementation, this would wait for human input
        # For now, return False (block by default)
        return False
    
    def approve_violation(self, path: str, approved_by: str) -> bool:
        """
        Approve a pending violation.
        
        Args:
            path: The path that was violated
            approved_by: Who approved (must be human)
            
        Returns:
            True if approved
        """
        if approved_by.lower() == "ai":
            # SECURITY: AI cannot approve violations
            return False
        
        # Find and resolve the violation
        for v in self.pending_violations:
            if v.path == path and not self._is_resolved(v.path):
                self._log_resolution(v, approved=True, resolved_by=approved_by)
                return True
        
        return False
    
    def block_violation(self, path: str) -> bool:
        """
        Block a violation.
        
        Args:
            path: The path that was violated
            
        Returns:
            True if blocked
        """
        for v in self.pending_violations:
            if v.path == path:
                self._log_resolution(v, approved=False, resolved_by="system")
                return True
        
        return False
    
    def _is_resolved(self, path: str) -> bool:
        """Check if a violation has been resolved."""
        log_file = self._get_log_file(path)
        if log_file and log_file.exists():
            with open(log_file) as f:
                data = json.load(f)
                return data.get("resolved", False)
        return False
    
    def _log_resolution(
        self, 
        result: BoundaryCheckResult, 
        approved: bool, 
        resolved_by: str
    ):
        """Log the resolution of a violation."""
        record = ViolationRecord(
            timestamp=datetime.now().isoformat(),
            operation=result.operation,
            path=result.path,
            reason=result.reason,
            resolved=True,
            approved=approved,
            resolved_by=resolved_by,
            resolved_at=datetime.now().isoformat()
        )
        
        log_file = self._get_log_file(result.path)
        with open(log_file, 'w') as f:
            json.dump(asdict(record), f, indent=2)
        
        # Update guard
        if approved:
            self.guard.log_violation(result, resolved_by)
    
    def _get_log_file(self, path: str) -> Path:
        """Get log file path for a violation."""
        # Create a safe filename from the path
        safe_name = path.replace("/", "_").replace(".", "_")
        return self.log_dir / f"violation_{safe_name}.json"
    
    def _format_violation_message(self, result: BoundaryCheckResult) -> str:
        """Format a violation message for display."""
        return f"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║  ⚠️  FILE BOUNDARY VIOLATION                                                ║
║  ═══════════════════════════════════════════════════                            ║
║                                                                              ║
║  Attempted Action:  {result.operation}                                       ║
║  Target Path:       {result.path}                                            ║
║                                                                              ║
║  ─────────────────────────────────────────────────────────────────────────── ║
║                                                                              ║
║  Rule: No files written outside /laboratory/ without human approval         ║
║                                                                              ║
║  ─────────────────────────────────────────────────────────────────────────── ║
║                                                                              ║
║  Required Action: Human authorization to override                             ║
║                                                                              ║
║  [Override: Yes]  [Block: No]                                               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""
```

### 4.3 Enforcing Runtime Mixin

```python
# /workspace/project/kde/runtime/enforcing_runtime.py

from typing import Optional
from .file_boundary_guard import FileBoundaryGuard, FileOperation, BoundaryCheckResult
from .violation_handler import ViolationHandler


class EnforcingRuntimeMixin:
    """
    Mixin that adds file boundary enforcement to the runtime.
    
    Usage:
        class MyRuntime(BaseRuntime, EnforcingRuntimeMixin):
            pass
    """
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.guard = FileBoundaryGuard()
        self.violation_handler = ViolationHandler()
    
    def check_file_operation(self, operation: str, path: str) -> BoundaryCheckResult:
        """
        Check if a file operation is allowed.
        
        Args:
            operation: The operation type
            path: The file path
            
        Returns:
            BoundaryCheckResult
        """
        return self.guard.check_operation(operation, path)
    
    def execute_with_enforcement(
        self, 
        operation: str, 
        path: str, 
        execute_func
    ) -> tuple:
        """
        Execute a file operation with boundary enforcement.
        
        Args:
            operation: The operation type
            path: The file path
            execute_func: The function to execute if allowed
            
        Returns:
            Tuple of (success, result_or_error)
        """
        # Check the operation
        result = self.check_file_operation(operation, path)
        
        if not result.violation:
            # Allowed - execute
            return True, execute_func()
        
        # Violation - request approval
        approved = self.violation_handler.handle_violation(result)
        
        if approved:
            # Approved - execute
            return True, execute_func()
        else:
            # Blocked - return error
            return False, f"VIOLATION BLOCKED: {result.reason}"
```

---

## 5. Integration Points

### 5.1 Runtime Bootstrap

When "start engine" is invoked:

```python
# In runtime/bootstrap.py

def bootstrap(kde_root: str) -> BootstrapResult:
    # ... existing bootstrap code ...
    
    # Initialize File Boundary Guard
    guard = FileBoundaryGuard(kde_root)
    
    # Initialize Violation Handler
    handler = ViolationHandler(kde_root)
    
    # Log bootstrap
    print("✅ Runtime bootstrapped with file boundary enforcement ACTIVE")
    
    return result
```

### 5.2 File Editor Tool Wrapper

When file_editor tool is used:

```python
# In file_editor tool wrapper

class EnforcingFileEditorTool:
    """Wrapper that enforces file boundaries on file operations."""
    
    def __init__(self, guard: FileBoundaryGuard, handler: ViolationHandler):
        self.guard = guard
        self.handler = handler
    
    def str_replace(self, path: str, old_str: str, new_str: str) -> str:
        # Check boundary
        result = self.guard.check_operation("str_replace", path)
        
        if result.violation:
            # Present violation
            approved = self.handler.handle_violation(result)
            if not approved:
                return f"VIOLATION BLOCKED: Cannot write to {path}"
        
        # Execute actual operation
        return self._actual_str_replace(path, old_str, new_str)
```

---

## 6. Logging

### 6.1 Violation Log Location

```
/workspace/project/kde/runtime/logs/violations/
├── violation__workspace_project_kde_new-file.md.json
├── violation__workspace_project_kde_readme.md.json
└── ...
```

### 6.2 Violation Log Format

```json
{
  "timestamp": "2026-07-28T10:30:00Z",
  "operation": "create",
  "path": "/workspace/project/kde/new-file.md",
  "reason": "Outside /laboratory/: /workspace/project/kde/new-file.md",
  "resolved": true,
  "approved": true,
  "resolved_by": "human",
  "resolved_at": "2026-07-28T10:30:15Z"
}
```

---

## 7. Document Status

**Status**: IN_PROGRESS
**Next**: Human authorization for implementation

---

*Generated by INV-RUNTIME-GUARD-001*
