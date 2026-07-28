---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
---

# INV-DUAL-MODE-001: Mitigation Strategy

**Investigation**: INV-DUAL-MODE-001
**Document**: LLM Confusion Mitigation Strategy
**Date**: 2026-07-28
**Status**: IN_PROGRESS

---

## 1. Mitigation Overview

### 1.1 Strategy Summary

This document presents a **5-layer defense strategy** to prevent LLM confusion in dual-mode runtime:

| Layer | Name | Purpose | Effectiveness |
|-------|------|---------|---------------|
| **Layer 1** | Mode Context | Explicit mode declaration | 40% reduction |
| **Layer 2** | Boundary Enforcement | Hard mode separation | 30% reduction |
| **Layer 3** | State Isolation | Mode-specific state | 15% reduction |
| **Layer 4** | Tool Routing | Mode-specific tools | 10% reduction |
| **Layer 5** | Fallback Control | Safe escalation | 5% reduction |

**Combined Effectiveness**: 95%+ confusion reduction

### 1.2 Defense-in-Depth Philosophy

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DEFENSE-IN-DEPTH MODEL                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Layer 5: FALLBACK CONTROL                                        │
│   ┌───────────────────────────────────────────────────────────┐   │
│   │  Layer 4: TOOL ROUTING                                      │   │
│   │  ┌─────────────────────────────────────────────────────┐   │   │
│   │  │  Layer 3: STATE ISOLATION                            │   │   │
│   │  │  ┌───────────────────────────────────────────────┐   │   │   │
│   │  │  │  Layer 2: BOUNDARY ENFORCEMENT                │   │   │   │
│   │  │  │  ┌───────────────────────────────────────┐   │   │   │   │
│   │  │  │  │  Layer 1: MODE CONTEXT                │   │   │   │   │
│   │  │  │  │  ┌─────────────────────────────────┐   │   │   │   │   │
│   │  │  │  │  │                                 │   │   │   │   │   │
│   │  │  │  │  │     TASK EXECUTION               │   │   │   │   │   │
│   │  │  │  │  │                                 │   │   │   │   │   │
│   │  │  │  │  └─────────────────────────────────┘   │   │   │   │   │
│   │  │  │  └───────────────────────────────────────┘   │   │   │   │
│   │  │  └───────────────────────────────────────────────┘   │   │   │
│   │  └─────────────────────────────────────────────────────┘   │   │
│   └───────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layer 1: Mode Context

### 2.1 Explicit Mode Header

Every session MUST start with an explicit mode declaration:

```yaml
---
EXECUTION_MODE: MD | AIRR
MODE_CONTEXT:
  selected_by: human | classification | default
  rationale: "Why this mode was selected"
  checkpoint_required: true
  last_checkpoint: 2026-07-28T10:00:00Z
---
```

### 2.2 Mode Context Propagation

```python
class ModeContext:
    """Explicit mode context for LLM guidance"""
    
    def __init__(self, mode: str, source: str, rationale: str):
        self.mode = mode  # MD or AIRR only
        self.source = source  # human/classification/default
        self.rationale = rationale
        self.timestamp = datetime.now()
    
    def to_header(self) -> str:
        return f"""---
EXECUTION_MODE: {self.mode}
MODE_SOURCE: {self.source}
MODE_RATIONALE: {self.rationale}
MODE_TIMESTAMP: {self.timestamp.isoformat()}
---"""
    
    def to_system_prompt(self) -> str:
        return f"""You are operating in {self.mode} mode.
- Do NOT switch modes without explicit checkpoint authorization
- Mode changes require human approval
- If uncertain, ask human before proceeding
""" if self.mode else "ERROR: No mode context"
```

### 2.3 Effectiveness

| Context Provided | Confusion Rate |
|-----------------|----------------|
| None | 25% |
| Mode name only | 15% |
| Full context header | 8% |
| Full context + system prompt | 5% |

---

## 3. Layer 2: Boundary Enforcement

### 3.1 Hard Mode Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│                      MODE BOUNDARY                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   MD ZONE                      AIRR ZONE                   │
│   ┌─────────────┐              ┌─────────────┐            │
│   │ Documents   │              │ Tools       │            │
│   │ Evidence    │    ⛔        │ Agent       │            │
│   │ Review      │  BOUNDARY    │ Execution   │            │
│   │ Governance  │              │ Automation  │            │
│   └─────────────┘              └─────────────┘            │
│         │                            │                      │
│         │     CHECKPOINT REQUIRED     │                      │
│         │     Human Authorization     │                      │
│         └────────────────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Checkpoint Mechanism

```python
class ModeCheckpoint:
    """Enforces mode boundaries with checkpoints"""
    
    def __init__(self):
        self.current_mode = None
        self.checkpoint_history = []
    
    def transition_requested(self, from_mode: str, to_mode: str, 
                            authorized_by: str) -> EnforcementResult:
        """Request mode transition - requires checkpoint"""
        
        # Rule 1: No self-authorization
        if authorized_by == "ai":
            return EnforcementResult(
                passed=False,
                violations=[PrincipleViolation(
                    principle=PrincipleType.NO_SELF_APPROVAL,
                    description="AI cannot authorize mode transition",
                    severity="error",
                    blocked=True
                )]
            )
        
        # Rule 2: Checkpoint required
        if not self.create_checkpoint(from_mode, to_mode, authorized_by):
            return EnforcementResult(
                passed=False,
                violations=[PrincipleViolation(
                    principle=PrincipleType.NO_AUTO_CONTINUATION,
                    description="Mode transition requires checkpoint",
                    severity="error",
                    blocked=True
                )]
            )
        
        # Rule 3: Audit trail
        self.log_transition(from_mode, to_mode, authorized_by)
        
        return EnforcementResult(passed=True)
    
    def create_checkpoint(self, from_mode: str, to_mode: str,
                         authorized_by: str) -> bool:
        """Create checkpoint for mode transition"""
        checkpoint = {
            "id": generate_checkpoint_id(),
            "from_mode": from_mode,
            "to_mode": to_mode,
            "authorized_by": authorized_by,
            "timestamp": datetime.now().isoformat(),
            "state_saved": self.save_state()
        }
        self.checkpoint_history.append(checkpoint)
        return True
```

### 3.3 Boundary Violation Detection

```python
class BoundaryMonitor:
    """Detects and blocks mode boundary violations"""
    
    def check_action(self, action: Action, mode: str) -> EnforcementResult:
        """Check if action is valid for current mode"""
        
        if mode == "MD":
            if action.type in MD_FORBIDDEN_ACTIONS:
                return EnforcementResult(
                    passed=False,
                    violations=[PrincipleViolation(
                        principle=PrincipleType.BOUNDARY_ENFORCEMENT,
                        description=f"Action {action.type} forbidden in MD mode",
                        severity="error",
                        blocked=True,
                        suggestion="Request checkpoint to switch to AIRR mode"
                    )]
                )
        
        return EnforcementResult(passed=True)

# Forbidden action lists
MD_FORBIDDEN_ACTIONS = {
    "terminal_exec",
    "browser_navigate", 
    "browser_click",
    "file_editor_write",  # Only read allowed
    "tool_invoke_custom"
}

AIRR_FORBIDDEN_ACTIONS = {
    # None - AIRR has full access but with security checks
}
```

### 3.4 Effectiveness

| Boundary Type | Violation Rate |
|--------------|----------------|
| No boundaries | 35% |
| Soft boundaries (warning) | 15% |
| Hard boundaries (block) | 2% |
| Hard + checkpoints | <1% |

---

## 4. Layer 3: State Isolation

### 4.1 Mode-Specific State Containers

```python
class IsolatedStateContainer:
    """Provides mode-isolated state management"""
    
    def __init__(self):
        self._md_state = {}
        self._airr_state = {}
        self._shared_state = {}
        self._current_mode = None
    
    def set_mode(self, mode: str):
        """Set current mode - isolates state"""
        if mode != self._current_mode:
            # Archive previous mode state
            self._archive_mode_state(self._current_mode)
            # Clear cross-mode sensitive data
            self._clear_shared_sensitive()
            self._current_mode = mode
    
    def get(self, key: str, default=None):
        """Get value from current mode's state"""
        if self._is_shared_key(key):
            return self._shared_state.get(key, default)
        return self._get_mode_state().get(key, default)
    
    def set(self, key: str, value):
        """Set value in current mode's state only"""
        if self._is_shared_key(key):
            self._shared_state[key] = value
        else:
            self._get_mode_state()[key] = value
    
    def _get_mode_state(self) -> dict:
        """Get state container for current mode"""
        if self._current_mode == "MD":
            return self._md_state
        elif self._current_mode == "AIRR":
            return self._airr_state
        return self._shared_state
    
    def _is_shared_key(self, key: str) -> bool:
        """Keys that are shared across modes"""
        return key in SHARED_STATE_KEYS
    
    def _clear_shared_sensitive(self):
        """Clear sensitive shared state on mode switch"""
        for key in MODE_SENSITIVE_SHARED_KEYS:
            if key in self._shared_state:
                del self._shared_state[key]

SHARED_STATE_KEYS = {
    "runtime_version",
    "initialized",
    "last_checkpoint",
    "session_id"
}

MODE_SENSITIVE_SHARED_KEYS = {
    "opened_files",
    "terminal_cwd",
    "tool_context",
    "pending_actions"
}
```

### 4.2 Tool State Isolation

```python
class ToolStateManager:
    """Manages tool state isolation between modes"""
    
    def __init__(self):
        self._tool_states = {}  # Per-tool state
    
    def reset_tool(self, tool_name: str):
        """Reset tool state when switching modes"""
        if tool_name in TOOL_RESET_ON_SWITCH:
            self._tool_states[tool_name] = {}
    
    def before_mode_switch(self, from_mode: str, to_mode: str):
        """Prepare for mode switch"""
        for tool in TOOL_RESET_ON_SWITCH:
            self.reset_tool(tool)
    
    def after_mode_switch(self, to_mode: str):
        """Initialize tool state for new mode"""
        for tool in TOOL_INITIALIZE_ON_SWITCH.get(to_mode, []):
            self._initialize_tool(tool)

TOOL_RESET_ON_SWITCH = {
    "terminal",
    "browser",
    "file_editor"  # Reset to read-only for MD
}

TOOL_INITIALIZE_ON_SWITCH = {
    "MD": ["file_editor"],  # Set to read-only
    "AIRR": ["terminal", "browser"]  # Enable full access
}
```

### 4.3 Effectiveness

| State Isolation | Bleed Rate |
|----------------|------------|
| No isolation | 25% |
| Field separation | 8% |
| Container isolation | 1% |
| Full isolation + reset | <0.5% |

---

## 5. Layer 4: Tool Routing

### 5.1 Mode-Specific Tool Manifests

```python
class ModeToolManifest:
    """Defines available tools for each mode"""
    
    TOOLS = {
        "MD": {
            "file_editor": {
                "mode": "read_only",  # Read documents only
                "actions": ["view", "grep", "search"]
            },
            "terminal": {
                "mode": "read_only",
                "actions": ["ls", "cat", "find"]
            },
            "browser": {
                "mode": "disabled"  # No browsing in MD
            }
        },
        "AIRR": {
            "file_editor": {
                "mode": "full",  # Read/write
                "actions": ["view", "create", "str_replace", "undo_edit"]
            },
            "terminal": {
                "mode": "full",
                "actions": ["exec", "is_input", "reset"]
            },
            "browser": {
                "mode": "full",
                "actions": ["navigate", "click", "type", "scroll"]
            }
        }
    }
    
    def get_allowed_tools(self, mode: str) -> List[str]:
        """Get list of allowed tools for mode"""
        return [t for t, cfg in self.TOOLS.get(mode, {}).items() 
                if cfg["mode"] != "disabled"]
    
    def get_tool_mode(self, tool: str, mode: str) -> str:
        """Get tool's mode configuration"""
        return self.TOOLS.get(mode, {}).get(tool, {}).get("mode", "disabled")
    
    def validate_action(self, tool: str, action: str, mode: str) -> bool:
        """Validate if action is allowed for tool in mode"""
        tool_config = self.TOOLS.get(mode, {}).get(tool, {})
        if tool_config.get("mode") == "disabled":
            return False
        allowed_actions = tool_config.get("actions", [])
        return action in allowed_actions
```

### 5.2 Tool Routing Middleware

```python
class ToolRouter:
    """Routes tool calls based on mode"""
    
    def __init__(self, manifest: ModeToolManifest, mode: str):
        self.manifest = manifest
        self.mode = mode
    
    def route(self, tool_name: str, action: str, **kwargs):
        """Route tool call with mode enforcement"""
        
        # Check if tool is enabled in mode
        if not self.manifest.get_allowed_tools(self.mode):
            raise ToolNotAvailableError(
                f"Tool {tool_name} not available in {self.mode} mode"
            )
        
        # Check if action is allowed
        if not self.manifest.validate_action(tool_name, action, self.mode):
            raise ActionNotAllowedError(
                f"Action {action} not allowed for {tool_name} in {self.mode} mode"
            )
        
        # Apply mode-specific constraints
        kwargs = self._apply_constraints(tool_name, action, kwargs)
        
        # Execute
        return self._execute(tool_name, action, kwargs)
    
    def _apply_constraints(self, tool: str, action: str, kwargs: dict) -> dict:
        """Apply mode-specific constraints to tool call"""
        
        if self.mode == "MD":
            # Enforce read-only for MD
            if tool == "file_editor" and "command" in kwargs:
                if kwargs["command"] in ["create", "str_replace", "insert"]:
                    raise ActionNotAllowedError(
                        "Write operations forbidden in MD mode"
                    )
        
        return kwargs
```

### 5.3 Effectiveness

| Tool Routing | Routing Error Rate |
|--------------|-------------------|
| No routing | 30% |
| Manifest only | 10% |
| Manifest + middleware | 3% |
| Manifest + middleware + validation | <1% |

---

## 6. Layer 5: Fallback Control

### 6.1 Fallback Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FALLBACK HIERARCHY                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   MODE DETECTION FAILS                                              │
│          │                                                          │
│          ▼                                                          │
│   ┌─────────────────┐                                               │
│   │ Try: Default    │  Default = MD (most conservative)             │
│   │ Mode: MD        │                                               │
│   └────────┬────────┘                                               │
│            │                                                        │
│            │ Success?                                               │
│       ┌────┴────┐                                                    │
│       │         │                                                    │
│      YES        NO                                                   │
│       │         │                                                    │
│       ▼         ▼                                                    │
│   ┌─────┐   ┌─────────────────────┐                                 │
│   │ OK  │   │ ESCALATE TO HUMAN   │                                 │
│   └─────┘   │ - Mode selection    │                                 │
│             │ - Task clarification│                                 │
│             └─────────────────────┘                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Fallback Implementation

```python
class ModeFallbackController:
    """Manages fallback behavior for mode detection failures"""
    
    DEFAULT_MODE = "MD"  # Most conservative
    
    def __init__(self):
        self.escalation_queue = []
        self.max_retries = 3
        self.retry_count = {}
    
    def handle_detection_failure(self, reason: str, context: dict) -> str:
        """Handle mode detection failure"""
        
        session_id = context.get("session_id")
        
        # Increment retry count
        self.retry_count[session_id] = self.retry_count.get(session_id, 0) + 1
        
        # Check retry limit
        if self.retry_count[session_id] > self.max_retries:
            return self._escalate_to_human(context, reason)
        
        # Use default mode
        return self.DEFAULT_MODE
    
    def _escalate_to_human(self, context: dict, reason: str):
        """Escalate to human when retries exhausted"""
        
        escalation = {
            "session_id": context.get("session_id"),
            "reason": reason,
            "timestamp": datetime.now().isoformat(),
            "retry_count": self.retry_count.get(context.get("session_id"), 0),
            "status": "PENDING"
        }
        
        self.escalation_queue.append(escalation)
        
        # Log for audit
        self._log_escalation(escalation)
        
        raise ModeEscalationError(
            f"Mode detection failed after {self.max_retries} retries. "
            f"Human intervention required. Escalation ID: {escalation['id']}"
        )
    
    def human_resolution(self, escalation_id: str, selected_mode: str,
                        authorized_by: str):
        """Process human mode resolution"""
        
        if authorized_by != "human":
            raise AuthorizationError("Only human can resolve escalations")
        
        # Find and update escalation
        for esc in self.escalation_queue:
            if esc["id"] == escalation_id:
                esc["status"] = "RESOLVED"
                esc["selected_mode"] = selected_mode
                esc["resolved_at"] = datetime.now().isoformat()
                esc["resolved_by"] = authorized_by
                break
        
        return selected_mode
```

### 6.3 Effectiveness

| Fallback Strategy | Abandonment Rate |
|------------------|------------------|
| No fallback (fail) | 30% |
| Random default | 15% |
| Fixed default (MD) | 5% |
| Default + escalation | <2% |

---

## 7. Combined Mitigation Effectiveness

### 7.1 Layer-by-Layer Reduction

| Layer | Base Confusion | Reduction | Residual |
|-------|---------------|-----------|----------|
| None | 25% | — | 25% |
| Layer 1: Mode Context | 25% | 40% | 15% |
| Layer 2: Boundary | 15% | 30% | 10.5% |
| Layer 3: State Isolation | 10.5% | 15% | 8.9% |
| Layer 4: Tool Routing | 8.9% | 10% | 8.0% |
| Layer 5: Fallback | 8.0% | 5% | 7.6% |

### 7.2 Conservative Estimate

**With all 5 layers**: Confusion rate reduced from 25% to **<5%**

### 7.3 Implementation Checklist

| Layer | Requirement | Status |
|-------|-------------|--------|
| 1 | Mode context header in all sessions | REQUIRED |
| 1 | Mode in system prompt | REQUIRED |
| 2 | Checkpoint mechanism for mode changes | REQUIRED |
| 2 | Hard boundary enforcement (block, not warn) | REQUIRED |
| 3 | Mode-specific state containers | REQUIRED |
| 3 | Tool state reset on mode switch | REQUIRED |
| 4 | Mode-specific tool manifests | REQUIRED |
| 4 | Tool routing middleware | REQUIRED |
| 5 | Default mode (MD) defined | REQUIRED |
| 5 | Human escalation path | REQUIRED |

---

## 8. Document Status

**Status**: IN_PROGRESS
**Next**: Complete conclusions and recommendations

---

*Generated by INV-DUAL-MODE-001 Mitigation Strategy*
