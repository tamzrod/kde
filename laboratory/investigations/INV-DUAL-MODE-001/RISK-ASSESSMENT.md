---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
---

# INV-DUAL-MODE-001: Risk Assessment

**Investigation**: INV-DUAL-MODE-001
**Document**: LLM Confusion Risk Assessment
**Date**: 2026-07-28
**Status**: IN_PROGRESS

---

## 1. Executive Summary

**Critical Risk**: LLM confusion about mode selection (MD vs AIRR) could lead to:
- Wrong execution mode for tasks
- State corruption between modes
- Governance bypass
- Audit trail breaks

**Risk Level**: HIGH (requires mitigation before implementation)

---

## 2. Risk Categories

### 2.1 Primary Risks

| Risk ID | Risk Name | Likelihood | Impact | Severity |
|---------|-----------|------------|--------|----------|
| **R-01** | Mode Selection Error | HIGH | MEDIUM | HIGH |
| **R-02** | Boundary Violation | MEDIUM | HIGH | HIGH |
| **R-03** | Context Bleeding | MEDIUM | MEDIUM | MEDIUM |
| **R-04** | Fallback Confusion | LOW | HIGH | MEDIUM |
| **R-05** | Tool Routing Error | MEDIUM | MEDIUM | MEDIUM |

### 2.2 Secondary Risks

| Risk ID | Risk Name | Likelihood | Impact | Severity |
|---------|-----------|------------|--------|----------|
| **R-06** | Checkpoint Skip | LOW | HIGH | MEDIUM |
| **R-07** | State Desync | LOW | HIGH | MEDIUM |
| **R-08** | Audit Gap | MEDIUM | MEDIUM | MEDIUM |
| **R-09** | Permission Confusion | MEDIUM | MEDIUM | MEDIUM |
| **R-10** | Performance Degradation | LOW | LOW | LOW |

---

## 3. Detailed Risk Analysis

### R-01: Mode Selection Error ⬛⬛⬛ HIGH SEVERITY

**Description**: LLM cannot correctly determine whether to use MD or AIRR mode for a given task.

**Scenarios**:

```python
# Scenario 1: Wrong mode for simple task
Task: "List all files in /workspace/project/kde"
LLM Decision: AIRR (uses terminal tool)
Correct: MD (documentary analysis only)

# Scenario 2: Wrong mode for complex task  
Task: "Analyze why the engine crashed"
LLM Decision: MD (document analysis)
Correct: AIRR (needs tool execution to investigate)

# Scenario 3: Ambiguous task
Task: "Investigate the runtime"
LLM Decision: UNCERTAIN → random choice
Correct: ESCALATE to human
```

**Contributing Factors**:
| Factor | Effect on Risk |
|--------|---------------|
| Ambiguous task description | Increases selection error |
| No explicit mode context | Increases uncertainty |
| Similar mode capabilities | Increases confusion |
| No clear selection criteria | Increases arbitrary decisions |

**Probability Estimate**:
- Clear task + explicit context: 5%
- Ambiguous task + no context: 40%
- Overall with mitigation: <10%
- Overall without mitigation: 25%

**Impact**:
- Wrong tool usage
- Audit trail corruption
- Governance bypass potential
- Performance degradation

**Mitigation Required**: YES (MANDATORY)

---

### R-02: Boundary Violation ⬛⬛⬛ HIGH SEVERITY

**Description**: LLM crosses from one mode to another without proper checkpoint.

**Scenarios**:

```python
# Scenario 1: MD → AIRR without checkpoint
Mode: MD
Task: "Review the document and fix the error"
LLM Action: 
  1. Review document (MD)
  2. Opens terminal to run validation (AIRR) ❌ VIOLATION
  3. Continues in AIRR mode
  
# Scenario 2: AIRR → MD without checkpoint
Mode: AIRR
Task: "Create a summary report"
LLM Action:
  1. Executes commands (AIRR)
  2. Creates Markdown file directly (MD) ❌ VIOLATION
  3. Claims MD-mode completion
  
# Scenario 3: Intentional hybrid
Mode: MD
Task: "Investigate and fix"  
LLM Action:
  1. Uses AIRR tools (violation)
  2. Documents in MD (cover-up)
  3. Audit shows inconsistency
```

**Contributing Factors**:
| Factor | Effect on Risk |
|--------|---------------|
| Tool availability overlap | Increases temptation |
| No hard boundary enforcement | Increases violations |
| No mode indicator in tools | Increases accidental cross |
| Complex tasks requiring both | Increases justification |

**Probability Estimate**:
- Hard boundaries + checkpoint required: 2%
- Soft boundaries + checkpoint optional: 15%
- No boundaries: 35%

**Impact**:
- Audit trail corruption
- State machine violation
- Principles bypass (especially Rule 1)
- Governance failure

**Mitigation Required**: YES (CRITICAL)

---

### R-03: Context Bleeding ⬛⬛ MEDIUM SEVERITY

**Description**: State or context from one mode leaks into another mode.

**Scenarios**:

```python
# Scenario 1: Variable bleed
MD Session: opened_file = "/workspace/project/kde/doc.md"
AIRR Session: Same process, reads opened_file → WRONG VALUE

# Scenario 2: State object bleed
MD Session: state.current_document = "INV-001"
AIRR Session: state.current_document → "INV-001" (should be None)

# Scenario 3: Tool state bleed
AIRR Session: terminal.set_cwd("/workspace/project/kde")
MD Session: terminal.cwd → "/workspace/project/kde" (should be /workspace/project/kde/documents)
```

**Contributing Factors**:
| Factor | Effect on Risk |
|--------|---------------|
| Shared state objects | Increases bleed risk |
| No mode-specific state containers | Increases bleed severity |
| Long-running sessions | Increases accumulation |
| Tool state persistence | Increases cross-contamination |

**Probability Estimate**:
- Isolated state containers: 1%
- Shared state with field separation: 8%
- Fully shared state: 25%

**Impact**:
- Incorrect task results
- Wrong evidence attribution
- Audit trail inconsistency
- Debugging difficulty

**Mitigation Required**: YES (IMPORTANT)

---

### R-04: Fallback Confusion ⬛ MEDIUM SEVERITY

**Description**: LLM doesn't know what to do when mode detection fails.

**Scenarios**:

```python
# Scenario 1: Detection failure
Mode detection returns: UNKNOWN
LLM Response: "I'm not sure which mode to use"
Expected: ESCALATE to human
Actual: Picks random mode or refuses task

# Scenario 2: Detection conflict
Task analysis says: MD
Tool usage says: AIRR
LLM Response: UNCERTAIN
Expected: Checkpoint + human decision
Actual: Proceeds with conflict unresolved

# Scenario 3: Fallback loop
Detection fails → LLM asks human → Human says "use default"
LLM uses default → Fails → Asks human again → LOOP
```

**Contributing Factors**:
| Factor | Effect on Risk |
|--------|---------------|
| Unclear fallback rules | Increases confusion |
| No escalation path | Increases arbitrary action |
| Human unavailable | Increases timeout/abandon |
| Multiple detection methods | Increases conflict |

**Probability Estimate**:
- Clear fallback + escalation: 3%
- Unclear fallback: 18%
- No fallback defined: 30%

**Impact**:
- Task abandonment
- Inconsistent behavior
- User frustration
- Audit gaps

**Mitigation Required**: YES (IMPORTANT)

---

### R-05: Tool Routing Error ⬛⬛ MEDIUM SEVERITY

**Description**: LLM uses wrong tools for current mode.

**Scenarios**:

```python
# Scenario 1: MD mode uses AIRR tool
Mode: MD
Available: file_editor (read-only), terminal (read-only)
LLM Action: Uses terminal.exec() → VIOLATION

# Scenario 2: AIRR mode avoids MD tool
Mode: AIRR
Available: full tool suite
LLM Action: Refuses to use file_editor (over-caution)

# Scenario 3: Tool state confusion
Mode: MD
Expected: Read document
Actual: Writes to document (tool routing bug)
```

**Contributing Factors**:
| Factor | Effect on Risk |
|--------|---------------|
| Tool availability overlap | Increases routing confusion |
| No mode-specific tool manifests | Increases wrong selection |
| LLM doesn't see tool context | Increases assumption |
| Complex tool dependencies | Increases chain errors |

**Probability Estimate**:
- Explicit tool manifests: 5%
- Implicit tool routing: 18%
- No routing enforcement: 30%

**Impact**:
- Wrong task execution
- Governance bypass
- State corruption
- Security implications

**Mitigation Required**: YES (IMPORTANT)

---

## 4. Confusion Probability Model

### 4.1 Formula

```
Confusion_Probability = Base_Rate × Task_Factor × Context_Factor × Mitigation_Factor

Where:
  Base_Rate = 0.15 (inherent LLM uncertainty)
  Task_Factor = [0.5 (clear) ... 2.0 (ambiguous)]
  Context_Factor = [0.3 (explicit) ... 1.5 (missing)]
  Mitigation_Factor = [0.1 (full) ... 1.0 (none)]
```

### 4.2 Example Calculations

| Scenario | Calculation | Probability |
|----------|-------------|-------------|
| Clear task + explicit context + full mitigation | 0.15 × 0.5 × 0.3 × 0.1 | 0.2% |
| Ambiguous task + missing context + no mitigation | 0.15 × 2.0 × 1.5 × 1.0 | 45% |
| Medium task + partial context + partial mitigation | 0.15 × 1.0 × 0.8 × 0.4 | 4.8% |

### 4.3 Risk Thresholds

| Confusion Probability | Risk Level | Action Required |
|---------------------|------------|-----------------|
| < 1% | ACCEPTABLE | Monitor |
| 1-5% | LOW | Document + mitigate |
| 5-15% | MEDIUM | Human review + mitigate |
| > 15% | HIGH | Block implementation |

---

## 5. Risk Mitigation Matrix

| Risk | Primary Mitigation | Secondary Mitigation | Effectiveness |
|------|--------------------|--------------------|---------------|
| R-01 | Explicit mode in header | Human-approved selection | HIGH |
| R-02 | Hard boundaries + checkpoints | State isolation | CRITICAL |
| R-03 | Mode-specific state containers | Tool state reset | HIGH |
| R-04 | Clear fallback + escalation | Default mode + timeout | MEDIUM |
| R-05 | Mode-specific tool manifests | Tool sandboxing | HIGH |

---

## 6. Overall Risk Assessment

### 6.1 Without Mitigation

```
Overall Risk Level: HIGH
Expected Confusion Rate: 25-35%
Business Impact: SIGNIFICANT
Implementation Recommendation: DO NOT PROCEED
```

### 6.2 With Recommended Mitigation

```
Overall Risk Level: LOW (acceptable)
Expected Confusion Rate: < 5%
Business Impact: MINIMAL
Implementation Recommendation: PROCEED with mitigation
```

### 6.3 Required Mitigations

| Priority | Mitigation | Risk Addressed |
|----------|------------|----------------|
| 1 (CRITICAL) | Mode boundary enforcement | R-02 |
| 2 (HIGH) | Explicit mode context header | R-01 |
| 3 (HIGH) | Mode-specific state isolation | R-03 |
| 4 (MEDIUM) | Clear fallback escalation | R-04 |
| 5 (MEDIUM) | Mode-specific tool manifests | R-05 |

---

## 7. Document Status

**Status**: IN_PROGRESS
**Next**: Complete mitigation strategy document

---

*Generated by INV-DUAL-MODE-001 Risk Assessment*
