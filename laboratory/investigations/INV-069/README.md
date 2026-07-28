# INV-069: KDE Capability Injection Point Investigation

**Status**: INVESTIGATION  
**Parent**: INV-067, INV-068  
**Created**: 2026-07-28  
**Source**: Architectural analysis for capability injection  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation identifies the correct architectural injection points for three accepted capabilities (BOUNDED DISCLOSURE, EXPLICIT MARKING, REVERSIBILITY) through analysis of KDE's execution flow and component responsibilities. Analysis concludes: BOUNDED DISCLOSURE belongs at SOP-005Executor (policy layer), EXPLICIT MARKING belongs at Instrumentation (observation layer), and REVERSIBILITY belongs at RetrievalEngine (storage layer). No new components are required.]

---

## Part 1: KDE Execution Flow Analysis

### 1.1 Current Execution Flow

[EVIDENCE: /workspace/project/kde/runtime/runtime.py]

```
┌─────────────────────────────────────────────────────────────────┐
│                    KDE EXECUTION FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Runtime.initialize()                                              │
│       │                                                            │
│       ▼                                                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Step 1: SOP-005 Evaluation                                 │  │
│  │  sop_executor.evaluate() → RetrievalDecision               │  │
│  │  - Determines retrieval level (FULL/PARTIAL/MINIMAL/NONE)   │  │
│  │  - Determines domains and keywords                           │  │
│  └─────────────────────────────────────────────────────────────┘  │
│       │                                                            │
│       ▼                                                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Step 2: Knowledge Retrieval                               │  │
│  │  retrieval_engine.retrieve_*() → List[RetrievalResult]     │  │
│  │  - Fetches artifacts from catalog                          │  │
│  │  - Deduplicates results                                    │  │
│  │  - Sorts by relevance                                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│       │                                                            │
│       ▼                                                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Step 3: Context Construction                              │  │
│  │  _construct_context() → List[Dict]                         │  │
│  │  - Builds context documents from artifacts                  │  │
│  │  - Calculates context_size                                 │  │
│  └─────────────────────────────────────────────────────────────┘  │
│       │                                                            │
│       ▼                                                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Step 4: Logging                                            │  │
│  │  instrumentation.log_retrieval()                            │  │
│  │  - Records trigger, knowledge_ids, context_size             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Component Responsibilities

[EVIDENCE: runtime.py, retrieval.py, sop005.py, instrumentation.py]

| Component | Responsibility | Owns |
|-----------|---------------|------|
| **SOP005Executor** | Retrieval policy | When and how much to retrieve |
| **RetrievalEngine** | Artifact fetching | Where artifacts come from |
| **Context construction** | Document building | What context looks like |
| **Instrumentation** | Logging and metrics | What gets recorded |
| **ECU/PrinciplesEnforcer** | Validation | Whether output is valid |

### 1.3 Capability Encounters

| Capability | First Natural Encounter | Question |
|-----------|------------------------|----------|
| **BOUNDED DISCLOSURE** | SOP-005 evaluation | How much to retrieve? |
| **EXPLICIT MARKING** | Context construction | What markers needed? |
| **REVERSIBILITY** | RetrievalEngine | Can artifact be restored? |

---

## Part 2: Challenge Existing Assumptions

### 2.1 Challenge: Why RetrievalEngine?

INV-068 assumed BOUNDED DISCLOSURE belongs in RetrievalEngine.

**Challenge**: Is RetrievalEngine the right owner?

| Question | Analysis |
|----------|----------|
| Does RetrievalEngine know retrieval policy? | NO - SOP-005 decides policy |
| Does RetrievalEngine know budget limits? | NO - Policy defines limits |
| Does RetrievalEngine decide what to return? | NO - Just fetches what asked |

**Counter-argument**: RetrievalEngine is where data flows, but policy decisions happen upstream at SOP-005.

**Conclusion**: BOUNDED DISCLOSURE is a POLICY decision, not a FETCH decision.

### 2.2 Challenge: Why Runtime?

INV-068 assumed capabilities would be implemented in Runtime.

**Challenge**: Is Runtime the right owner?

| Question | Analysis |
|----------|----------|
| Does Runtime make policy decisions? | NO - SOP-005 does |
| Does Runtime fetch artifacts? | NO - RetrievalEngine does |
| Does Runtime log events? | NO - Instrumentation does |
| Does Runtime validate output? | NO - ECU does |

**Counter-argument**: Runtime orchestrates but doesn't own any specific capability.

**Conclusion**: Runtime is an INTEGRATOR, not an OWNER.

### 2.3 Challenge: Why not Context Compiler?

| Question | Analysis |
|----------|----------|
| Is there a Context Compiler? | NO - _construct_context() is in Runtime |
| Does it decide what to include? | NO - Just formats what RetrievalEngine returns |
| Should it bound disclosure? | NO - Policy should bound before formatting |

**Conclusion**: No Context Compiler exists. _construct_context() just formats.

### 2.4 Challenge: Why not Session Manager?

| Question | Analysis |
|----------|----------|
| Is there a Session Manager? | NO |
| Does WorkspaceResolver manage sessions? | NO - It maps task types to paths |
| Should session state control disclosure? | NO - Policy should control |

**Conclusion**: No Session Manager exists. WorkspaceResolver is for paths only.

### 2.5 Challenge: Why not Pipeline Stage?

| Question | Analysis |
|----------|----------|
| Is there a pipeline? | NO - Sequential function calls |
| Should capabilities be pipeline stages? | NO - Adds unnecessary abstraction |

**Conclusion**: KDE doesn't use a pipeline architecture.

### 2.6 Challenge: Why not Cross-Cutting Concern?

| Question | Analysis |
|----------|----------|
| Is context a cross-cutting concern? | YES - Affects all operations |
| Should capabilities be cross-cutting? | NO - Each has clear owner |
| Is AOP appropriate here? | NO - Overkill for this system |

**Conclusion**: Cross-cutting is possible but adds complexity without benefit.

---

## Part 3: Capability Ownership Map

### 3.1 BOUNDED DISCLOSURE Analysis

| Question | Answer | Evidence |
|----------|--------|----------|
| **First encounters?** | SOP-005 evaluation | Policy decides how much |
| **Who decides bounds?** | SOP-005Executor | `retrieval_level` decision |
| **Who enforces bounds?** | RetrievalEngine | Actually fetches data |
| **Who measures bounds?** | Instrumentation | Logs context_size |

**Ownership**: **SOP005Executor** owns the policy decision.

**Reasoning**:
- SOP-005 decides retrieval level (FULL/PARTIAL/MINIMAL/NONE)
- Bounds are policy constraints
- RetrievalEngine should respect bounds set by policy

### 3.2 EXPLICIT MARKING Analysis

| Question | Answer | Evidence |
|----------|--------|----------|
| **First encounters?** | Context construction | Documents are built |
| **Who marks content?** | _construct_context() | Formats output |
| **Who validates markers?** | ECU | Validates evidence |
| **Who logs markers?** | Instrumentation | Records events |

**Ownership**: **Instrumentation** owns the observation layer.

**Reasoning**:
- Instrumentation logs all events
- Provenance tracking is observation, not production
- ECU validates but doesn't produce
- Context construction formats but doesn't observe

### 3.3 REVERSIBILITY Analysis

| Question | Answer | Evidence |
|----------|--------|----------|
| **First encounters?** | Artifact retrieval | Artifacts are fetched |
| **Who stores artifacts?** | RetrievalEngine | get_artifact() |
| **Who knows artifact format?** | RetrievalEngine | Catalog access |
| **Who compresses?** | RetrievalEngine | Can be added here |

**Ownership**: **RetrievalEngine** owns artifact lifecycle.

**Reasoning**:
- RetrievalEngine fetches and stores artifacts
- get_artifact() knows artifact structure
- Compression affects artifact storage
- Restore requires artifact access

---

## Part 4: Candidate Injection Points

### 4.1 Candidates for BOUNDED DISCLOSURE

| Candidate | Fit | Evidence |
|-----------|-----|----------|
| **SOP005Executor** | **HIGH** | Policy decisions happen here |
| RetrievalEngine | MEDIUM | Fetches data, but doesn't decide bounds |
| Runtime | LOW | Orchestrator, not policy |
| Instrumentation | LOW | Observation, not decision |

**Conclusion**: SOP005Executor is the correct injection point.

### 4.2 Candidates for EXPLICIT MARKING

| Candidate | Fit | Evidence |
|-----------|-----|----------|
| **Instrumentation** | **HIGH** | Logs all events and provenance |
| ECU | MEDIUM | Validates but doesn't produce |
| Runtime | LOW | Orchestrator |
| RetrievalEngine | LOW | Fetches, doesn't observe |

**Conclusion**: Instrumentation is the correct injection point.

### 4.3 Candidates for REVERSIBILITY

| Candidate | Fit | Evidence |
|-----------|-----|----------|
| **RetrievalEngine** | **HIGH** | Owns artifact lifecycle |
| Storage layer | MEDIUM | Artifacts stored here |
| Runtime | LOW | Orchestrator |
| Context construction | LOW | Formats, doesn't store |

**Conclusion**: RetrievalEngine is the correct injection point.

---

## Part 5: Rejected Injection Points

### 5.1 Rejected: Runtime as Owner

| Reason | Explanation |
|--------|-------------|
| Runtime is integrator | Orchestrates but doesn't own |
| No policy decisions | Delegated to SOP-005 |
| No storage | Delegated to RetrievalEngine |
| No logging | Delegated to Instrumentation |

**Verdict**: **REJECTED** - Runtime is too high-level.

### 5.2 Rejected: New "ContextManager" Component

| Reason | Explanation |
|--------|-------------|
| Adds unnecessary abstraction | Existing components suffice |
| Violates simplicity principle | Each capability has clear owner |
| Increases coupling | New dependency everywhere |
| No evidence requires it | Architecture supports without |

**Verdict**: **REJECTED** - No new component needed.

### 5.3 Rejected: Pipeline Architecture

| Reason | Explanation |
|--------|-------------|
| Not current architecture | Sequential function calls |
| Adds complexity | Unnecessary abstraction |
| No evidence requires it | Existing flow works |
| Overkill for 3 capabilities | Over-engineering |

**Verdict**: **REJECTED** - Not appropriate for KDE.

---

## Part 6: Recommended Injection Points

### 6.1 Final Ownership Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPABILITY OWNERSHIP MAP                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  BOUNDED DISCLOSURE                                       │   │
│  │                                                           │   │
│  │  Owner: SOP005Executor                                     │   │
│  │  Entry: retrieval_level parameter                          │   │
│  │  Enforcement: max_tokens bound in evaluate()               │   │
│  │  Evidence: sop005.py - evaluate()                         │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  EXPLICIT MARKING                                          │   │
│  │                                                           │   │
│  │  Owner: Instrumentation                                    │   │
│  │  Entry: log_retrieval() metadata                          │   │
│  │  Enforcement: provenance tracking in logs                   │   │
│  │  Evidence: instrumentation.py - log_retrieval()          │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  REVERSIBILITY                                            │   │
│  │                                                           │   │
│  │  Owner: RetrievalEngine                                   │   │
│  │  Entry: compress_artifact(), restore_artifact()          │   │
│  │  Enforcement: checksum validation                          │   │
│  │  Evidence: retrieval.py - get_artifact()                 │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Required Changes

| Capability | File | Change | Complexity |
|-----------|------|--------|------------|
| BOUNDED DISCLOSURE | sop005.py | Add max_tokens bound | LOW |
| EXPLICIT MARKING | instrumentation.py | Add provenance metadata | LOW |
| REVERSIBILITY | retrieval.py | Add compress/restore methods | MEDIUM |

### 6.3 No New Components Required

| Claim | Evidence |
|-------|----------|
| No new layer | Existing layers sufficient |
| No new engine | Not an engine capability |
| No new module | Compression can be inline |
| No pipeline | Not current architecture |

---

## Part 7: Architectural Impact Assessment

### 7.1 Changes by Component

| Component | Changes | Impact |
|-----------|---------|--------|
| SOP005Executor | Add max_tokens parameter | LOW |
| Instrumentation | Add provenance tracking | LOW |
| RetrievalEngine | Add compression methods | MEDIUM |

### 7.2 Coupling Analysis

| Change | Coupling | Justification |
|--------|----------|---------------|
| BOUNDED DISCLOSURE | LOW | SOP-005 already decides policy |
| EXPLICIT MARKING | LOW | Instrumentation already logs |
| REVERSIBILITY | MEDIUM | New methods in RetrievalEngine |

### 7.3 Simplicity Assessment

| Criterion | Met? | Evidence |
|-----------|------|----------|
| Fewest changes | YES | 3 component changes only |
| Preserve architecture | YES | No new layers |
| Minimize coupling | YES | Each capability in one place |
| No new abstractions | YES | No new components |

---

## Part 8: Confidence Assessment

### 8.1 Injection Point Confidence

| Capability | Injection Point | Confidence | Evidence |
|-----------|----------------|------------|----------|
| BOUNDED DISCLOSURE | SOP005Executor | HIGH | Policy decisions happen here |
| EXPLICIT MARKING | Instrumentation | HIGH | Logs all events |
| REVERSIBILITY | RetrievalEngine | HIGH | Owns artifact lifecycle |

### 8.2 Falsification Attempts

| Question | Falsification | Result |
|----------|--------------|--------|
| Can BOUNDED DISCLOSURE be elsewhere? | RetrievalEngine possible | MEDIUM - but policy should lead |
| Can EXPLICIT MARKING be elsewhere? | ECU possible | MEDIUM - but observation is right layer |
| Can REVERSIBILITY be elsewhere? | Storage layer possible | MEDIUM - but RetrievalEngine has access |

### 8.3 Remaining Uncertainty

| Uncertainty | Mitigation |
|-------------|------------|
| Compression complexity | Implement inline, not new module |
| Provenance format | Follow existing evidence markers |
| Budget calculation | Extend SOP-005 existing logic |

---

## Part 9: Summary

### 9.1 Final Deliverables

#### 1. KDE Execution Flow

```
Runtime.initialize()
  → SOP005Executor.evaluate()     [POLICY]
  → RetrievalEngine.retrieve_*()  [FETCH]
  → _construct_context()          [FORMAT]
  → Instrumentation.log_*()       [OBSERVE]
```

#### 2. Capability Ownership Map

| Capability | Owner | Entry Point |
|-----------|-------|-------------|
| BOUNDED DISCLOSURE | SOP005Executor | evaluate() |
| EXPLICIT MARKING | Instrumentation | log_retrieval() |
| REVERSIBILITY | RetrievalEngine | get_artifact() |

#### 3. Candidate Injection Points (3)

| Candidate | Capability | Fit |
|-----------|------------|-----|
| SOP005Executor | BOUNDED DISCLOSURE | HIGH |
| Instrumentation | EXPLICIT MARKING | HIGH |
| RetrievalEngine | REVERSIBILITY | HIGH |

#### 4. Evidence Supporting Each Candidate

| Candidate | Evidence |
|-----------|----------|
| SOP005Executor | Policy decisions happen here; `retrieval_level` defined |
| Instrumentation | Logs all events; `metadata` field available |
| RetrievalEngine | Fetches and stores artifacts; `get_artifact()` exists |

#### 5. Rejected Injection Points

| Rejected | Reason |
|----------|--------|
| Runtime | Too high-level, integrator not owner |
| New ContextManager | Unnecessary abstraction |
| Pipeline | Not current architecture |

#### 6. Recommended Injection Points

| Capability | Owner | Implementation |
|-----------|-------|---------------|
| BOUNDED DISCLOSURE | SOP005Executor | max_tokens bound in evaluate() |
| EXPLICIT MARKING | Instrumentation | provenance in log_retrieval() |
| REVERSIBILITY | RetrievalEngine | compress/restore methods |

#### 7. Required Architectural Changes

| Change | File | Complexity |
|--------|------|-----------|
| Add max_tokens bound | sop005.py | LOW |
| Add provenance metadata | instrumentation.py | LOW |
| Add compression methods | retrieval.py | MEDIUM |

#### 8. Confidence Assessment

| Injection Point | Confidence | Rationale |
|----------------|------------|-----------|
| SOP005Executor | HIGH | Policy decisions happen here |
| Instrumentation | HIGH | Observation layer owns logging |
| RetrievalEngine | HIGH | Artifact lifecycle owner |

---

## Evidence

[EVIDENCE: /workspace/project/kde/runtime/runtime.py - Execution flow]
[EVIDENCE: /workspace/project/kde/runtime/sop005.py - SOP-005 Executor]
[EVIDENCE: /workspace/project/kde/runtime/retrieval.py - Retrieval Engine]
[EVIDENCE: /workspace/project/kde/runtime/instrumentation.py - Instrumentation]
[EVIDENCE: INV-067 - Accepted capabilities]
[EVIDENCE: INV-068 - Previous implementation assumptions]

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)  
**Type**: Architectural Injection Point Investigation
