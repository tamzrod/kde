---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
RUNTIME_AUTHORITY: Verified
BOOTSTRAP_VERIFIED: YES
---

# INV-DUAL-MODE-001: Dual-Mode Runtime Analysis (MD + AIRR)

**Investigation ID**: INV-DUAL-MODE-001
**Title**: Safe Parallel Investigation: Converting Runtime to Support Dual-Mode (Markdown + AIRR)
**Date**: 2026-07-28
**Status**: IN_PROGRESS
**Engine**: KDE-ENGINE-002 (Beta)
**Seed**: SEED-001 (Genesis)
**Safety Classification**: PARALLEL (does not modify production runtime)

---

## Objective

Conduct a safe parallel investigation to analyze:
1. How to convert the KDE runtime to support dual execution modes: **MD (Markdown)** and **AIRR (AI Research Runner)**
2. **Risk Analysis**: How to prevent LLM confusion when selecting between MD and AIRR modes
3. Develop a mitigation strategy for mode confusion

---

## Scope

### What This Investigation Is
- **Parallel**: Runs alongside production, does NOT modify runtime
- **Analysis**: Studies architecture alternatives without deployment
- **Risk-focused**: Identifies LLM confusion risks and mitigation strategies

### What This Investigation Is NOT
- Does NOT modify production runtime code
- Does NOT deploy new execution modes
- Does NOT change default engine selection

---

## Background

### Current Runtime Mode: Markdown (MD)

The current KDE runtime uses a **Markdown-based execution model**:

| Aspect | Current MD Mode |
|--------|-----------------|
| **Execution Unit** | Markdown documents |
| **State Machine** | DRAFT → REVIEW → APPROVED → VALIDATED → PROMOTED |
| **Human Authority** | APPROVED and PROMOTED require human action |
| **Evidence Markers** | [EVIDENCE:], [INFERENCE:], [HYPOTHESIS:] |
| **Session Control** | Checkpoints with human authorization |

### Proposed New Mode: AIRR (AI Research Runner)

Based on OpenHands SDK, AIRR mode would use:

| Aspect | AIRR Mode (Proposed) |
|--------|---------------------|
| **Execution Unit** | Agent conversations with tools |
| **State Machine** | Agent → Review → Approved (via tools) |
| **Human Authority** | Security confirmations, approval tools |
| **Evidence Markers** | SDK-native structured outputs |
| **Session Control** | Conversation persistence, pause/resume |

### Dual-Mode Rationale

| Mode | Best For | Strengths |
|------|----------|-----------|
| **MD** | Document-heavy investigations, governance workflows | Traceable, auditable, human-readable |
| **AIRR** | Complex tool-based tasks, automation | Speed, flexibility, API-native |

---

## Investigation Tasks

### ⚠️ SCOPE REMINDER: Analysis Only - No Implementation

This is a **safe parallel investigation**. The tasks below describe *analysis* to be performed, not implementation. Actual code implementation requires a separate LAB experiment with human authorization.

### Task 1: Architecture Analysis

Analyze the current runtime structure to identify dual-mode integration points:

1. **Runtime Core** (`/workspace/project/kde/runtime/`)
   - ECU (Engine Control Unit)
   - Pre-flight checks
   - Principles enforcement
   - State machine

2. **Mode Detection Points**
   - How to detect MD vs AIRR execution
   - Configuration vs dynamic detection

3. **Shared Components**
   - What can be shared between modes
   - What must be mode-specific

### Task 2: LLM Confusion Risk Analysis

**[CRITICAL]** Analyze the risk of LLM getting confused about which mode to use:

#### Risk Factors

| Risk | Likelihood | Impact | Severity |
|------|------------|--------|----------|
| LLM picks wrong mode for task | HIGH | MEDIUM | HIGH |
| LLM ignores mode selection | MEDIUM | HIGH | HIGH |
| LLM uses hybrid (broken) approach | MEDIUM | MEDIUM | MEDIUM |
| Mode context lost in continuation | LOW | HIGH | MEDIUM |

#### Confusion Scenarios

**Scenario A: Wrong Mode Selection**
```
User Task: "Analyze the repository structure"
LLM Decision: Should use MD (document analysis) OR AIRR (tool execution)?
Risk: LLM picks AIRR when MD is appropriate (or vice versa)
```

**Scenario B: Mode Bleeding**
```
MD session starts → AIRR tool call embedded → State corruption
Risk: Hybrid execution breaks audit trail
```

**Scenario C: Context Loss**
```
Session continues → Mode context lost → LLM reverts to default
Risk: Inconsistent execution behavior
```

### Task 3: Mitigation Strategy Development

Develop strategies to prevent LLM confusion:

#### Strategy A: Hard Mode Boundaries

```
┌─────────────────────────────────────────────────────────┐
│                    EXECUTION CONTEXT                     │
├─────────────────────────────────────────────────────────┤
│  MODE: [MD | AIRR | HYBRID (PROHIBITED)]               │
│  BOUNDARY: Checkpoint required to change modes           │
│  HUMAN: Mode selection authorized by human only          │
└─────────────────────────────────────────────────────────┘
```

#### Strategy B: Mode-Aware Tool Routing

```python
# Mode-aware tool selection
def select_tool(task, mode):
    if mode == "MD":
        return md_tools_only  # No file_editor, only document tools
    elif mode == "AIRR":
        return airr_tools + md_tools  # Full tool access
    else:
        raise ModeError("HYBRID not permitted")
```

#### Strategy C: Explicit Mode Context

```
---
EXECUTION_MODE: MD | AIRR
MODE_CONTEXT: { /* mode-specific configuration */ }
LAST_CHECKPOINT: <timestamp>
---
```

### Task 4: Implementation Safety Assessment

Assess the safety of implementing dual-mode support:

| Implementation Phase | Risk Level | Mitigation |
|---------------------|------------|------------|
| Architecture Design | LOW | Parallel investigation |
| Proof of Concept | MEDIUM | Separate branch |
| Validation | MEDIUM | LAB-style validation |
| Production Deploy | HIGH | Gradual rollout |

---

## Risk Analysis Matrix

### LLM Confusion Confusion Risk Assessment

| Confusion Type | Definition | Mitigation Required |
|---------------|------------|-------------------|
| **Mode Selection** | LLM cannot determine correct mode | Clear mode selection criteria |
| **Boundary Violation** | LLM crosses mode boundary | Hard enforcement, checkpoints |
| **Context Bleeding** | State leaks between modes | Isolated state containers |
| **Fallback Confusion** | LLM doesn't know fallback behavior | Explicit fallback rules |

### Confusion Probability Analysis

```
Confusion Probability = f(task_clarity, mode_boundaries, explicit_context)

task_clarity:
  - Clear task → LOW confusion
  - Ambiguous task → HIGH confusion

mode_boundaries:
  - Hard boundaries → LOW confusion
  - Soft/fuzzy → HIGH confusion

explicit_context:
  - Mode in header → LOW confusion
  - Mode buried in context → HIGH confusion
```

### Recommended Confusion Prevention

| Prevention Layer | Mechanism | Effectiveness |
|-----------------|-----------|---------------|
| **1. Mode Selection** | Human-authorized session override | HIGH |
| **2. Mode Context** | Explicit EXECUTION_MODE header | HIGH |
| **3. Tool Routing** | Mode-specific tool availability | MEDIUM |
| **4. State Isolation** | Separate state containers | HIGH |
| **5. Checkpoint Enforcement** | Checkpoint required for mode change | HIGH |

---

## Evidence Requirements

This investigation must produce evidence for:

1. **Architecture Analysis**
   - Current runtime component map
   - Dual-mode integration points
   - Shared vs. mode-specific components

2. **Risk Assessment**
   - LLM confusion scenarios documented
   - Probability estimates for each scenario
   - Impact assessment

3. **Mitigation Strategy**
   - Multi-layer prevention design
   - Mode boundary enforcement mechanism
   - Human authority integration

---

## Safe Parallel Execution Protocol

### What This Investigation Does

1. ✅ Analyzes runtime architecture
2. ✅ Documents risk scenarios
3. ✅ Designs mitigation strategies
4. ✅ Produces recommendations

### What This Investigation Does NOT Do

1. ❌ Modify runtime code
2. ❌ Deploy new execution modes
3. ❌ Change default engine
4. ❌ Create production artifacts

### Validation Before Production

Any implementation from this investigation requires:

| Validation | Required Evidence |
|------------|-------------------|
| Architecture Review | LAB-STYLE review by human |
| Risk Acceptance | Explicit human sign-off |
| Testing | Parallel validation experiment |
| Rollout Plan | Gradual deployment strategy |

---

## Expected Outcomes

### Primary Outcome
A comprehensive **Dual-Mode Runtime Conversion Plan** with:
- Architecture design for MD + AIRR support
- LLM confusion risk assessment
- Multi-layer mitigation strategy

### Secondary Outcomes
- Mode selection criteria document
- Tool routing specification
- State isolation requirements

### Deliverables
1. `INV-DUAL-MODE-001/INVESTIGATION.md` - This document
2. `INV-DUAL-MODE-001/ARCHITECTURE.md` - Architecture analysis
3. `INV-DUAL-MODE-001/RISK-ASSESSMENT.md` - Risk analysis
4. `INV-DUAL-MODE-001/MITIGATION.md` - Mitigation strategy
5. `INV-DUAL-MODE-001/CONCLUSIONS.md` - Recommendations

---

## Document Status

**Status**: IN_PROGRESS
**Human Authorization Required**: Yes (for any implementation)
**Execution Mode**: KDE_RUNTIME
**Safety**: PARALLEL (no production changes)

---

*Generated by INV-DUAL-MODE-001*
