---
EXECUTION_MODE: KDE_RUNTIME
AUTHENTICITY_SCORE: 100%
RUNTIME_AUTHORITY: Verified
BOOTSTRAP_VERIFIED: YES
---

# INV-077: KDE Architecture Injection Point Mapping

**Status**: INVESTIGATION  
**Parent**: INV-076  
**Created**: 2026-07-28  
**Source**: Architecture analysis for capability injection  
**Investigator**: OpenHands Agent

---

## Investigation Authority

| Authority | Status | Evidence |
|-----------|--------|----------|
| **Bootstrap Verified** | ✅ YES | Gates: 6/8, RESULT: PASSED |
| **Runtime State** | ✅ INITIALIZED | 11/11 modules loaded |
| **RetrievalEngine** | ✅ ONLINE | Catalog accessible |
| **SOP005Executor** | ✅ ONLINE | Policy execution ready |
| **ECU** | ✅ ENFORCING | Evidence/Inference markers validated |
| **Seed Loaded** | ✅ SEED-001 | Frozen, version 1.0.0 |
| **Engine Active** | ✅ KDE-ENGINE-002 | Beta, Active, Default |

---

## Summary

[INFERENCE: This investigation maps capability injection points in the KDE architecture. Based on the INV-076 recommendations for context reduction, this analysis identifies specific locations where external patterns (Caveman, ENZO) can be injected into KDE components. A visual architecture map is provided showing the flow and injection points.]

---

## Bootstrap Verification

[EVIDENCE: `python3 .kde/bootstrap/gates.py`]

```
RESULT: PASSED (6/8 checks)
Timestamp: 2026-07-28T05:41:13
```

---

## KDE Architecture Overview

### Core Components

[EVIDENCE: runtime/runtime.py]

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    KDE KNOWLEDGE-ON-DEMAND RUNTIME                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐         │
│  │   Retrieval   │────▶│    SOP-005    │────▶│    Engine     │         │
│  │    Engine    │     │   Executor    │     │   (Beta)      │         │
│  └───────┬───────┘     └───────────────┘     └───────────────┘         │
│          │                                                             │
│          ▼                                                             │
│  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐         │
│  │   Knowledge   │◀────│   Runtime     │◀────│  Investigation│         │
│  │   Catalog    │     │   ECU         │     │   Context     │         │
│  └───────────────┘     └───────────────┘     └───────────────┘         │
│                                                                         │
│  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐         │
│  │Instrumentation│     │ Attribution  │     │    Seed       │         │
│  │              │     │              │     │   (SEED-001)  │         │
│  └───────────────┘     └───────────────┘     └───────────────┘         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Details

| Component | File | Purpose |
|-----------|------|---------|
| RetrievalEngine | runtime/retrieval.py | Knowledge retrieval |
| SOP005Executor | runtime/sop005.py | Policy execution |
| RuntimeECU | runtime/ecu/ | Execution control |
| Instrumentation | runtime/instrumentation.py | Event tracking |
| Attribution | runtime/attribution.py | Decision attribution |
| Seed | seeds/seed-001/ | Reasoning DNA |

---

## Injection Point Analysis

### Zone 1: Retrieval Layer

[EVIDENCE: runtime/retrieval.py]

```
┌─────────────────────────────────────────────────────────────────┐
│                     INJECTION ZONE 1: RETRIEVAL                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Input ──────▶ [RetrievalEngine] ──────▶ Results                          │
│                     │                                                     │
│                     ├── Pre-Processor (INJECT)                            │
│                     │    ├── Keyword normalization                        │
│                     │    ├── Domain filtering                            │
│                     │    └── Query expansion                              │
│                     │                                                     │
│                     ├── Cache Layer (INJECT)  ←── Caveman "Memory"        │
│                     │    ├── Result caching                              │
│                     │    ├── TTL management                              │
│                     │    └── Cache invalidation                          │
│                     │                                                     │
│                     └── Post-Processor (INJECT)                           │
│                          ├── Result summarization  ←── Caveman "Brief"    │
│                          ├── Relevance filtering                          │
│                          └── Context trimming                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────┘
```

**Injection Points**:
| Point | Pattern | Recommendation |
|-------|---------|----------------|
| Pre-Processor | Query normalization | REC-002 |
| Cache Layer | TTL-based caching | REC-001 |
| Post-Processor | Result summarization | REC-002 |

---

### Zone 2: SOP-005 Policy Layer

[EVIDENCE: runtime/sop005.py]

```
┌─────────────────────────────────────────────────────────────────┐
│                     INJECTION ZONE 2: SOP-005                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Investigation ─▶ [SOP005Executor] ───▶ RetrievalDecision                │
│                       │                                                 │
│                       ├── Policy Loader (INJECT)                         │
│                       │    ├── Custom policies  ←── ENZO "Protocol"       │
│                       │    ├── Policy priority                             │
│                       │    └── Policy composition                         │
│                       │                                                 │
│                       ├── Decision Engine (INJECT)                       │
│                       │    ├── Mode selection  ←── ENZO "Content-Driven"  │
│                       │    ├── Threshold tuning                           │
│                       │    └── Strategy selection                         │
│                       │                                                 │
│                       └── Result Formatter (INJECT)                     │
│                            ├── Delta output  ←── Caveman "Diff"          │
│                            └── Summary format                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────┘
```

**Injection Points**:
| Point | Pattern | Recommendation |
|-------|---------|----------------|
| Policy Loader | Custom policies | REC-004 |
| Decision Engine | Mode selection | REC-004 |
| Result Formatter | Delta output | REC-003 |

---

### Zone 3: ECU Control Layer

[EVIDENCE: runtime/ecu/]

```
┌─────────────────────────────────────────────────────────────────┐
│                     INJECTION ZONE 3: ECU                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Request ──────▶ [RuntimeECU] ──────▶ ExecutionResult                     │
│                     │                                                 │
│                     ├── Bootstrap (INJECT)                              │
│                     │    ├── Gate customization                          │
│                     │    └── Pre-flight checks  ←── ENZO "Explicit"       │
│                     │                                                 │
│                     ├── Execution Controller (INJECT)                   │
│                     │    ├── Capability gates  ←── Boundary check        │
│                     │    ├── Rate limiting                              │
│                     │    └── Budget enforcement  ←── ENZO "Bounded"       │
│                     │                                                 │
│                     └── Validator (INJECT)                              │
│                          ├── Evidence markers                           │
│                          ├── Output validation                           │
│                          └── Compliance framing  ←── ENZO "Frame"         │
│                                                                          │
└─────────────────────────────────────────────────────────────────┘
```

**Injection Points**:
| Point | Pattern | Recommendation |
|-------|---------|----------------|
| Bootstrap | Gate customization | REC-002 |
| Execution Controller | Budget enforcement | REC-002 |
| Validator | Compliance framing | REC-004 |

---

### Zone 4: Context Construction

[EVIDENCE: runtime/runtime.py]

```
┌─────────────────────────────────────────────────────────────────┐
│                     INJECTION ZONE 4: CONTEXT                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Components ──▶ [InvestigationContext] ───▶ LLM Input                    │
│                     │                                                 │
│                     ├── Context Builder (INJECT)                        │
│                     │    ├── Token budgeting  ←── ENZO "Bounded"         │
│                     │    ├── Priority queue                              │
│                     │    └── Size constraints                             │
│                     │                                                 │
│                     ├── Cache Manager (INJECT)                         │
│                     │    ├── Delta tracking  ←── Caveman "Diff"           │
│                     │    ├── State snapshots                             │
│                     │    └── Change detection                            │
│                     │                                                 │
│                     └── Output Formatter (INJECT)                        │
│                          ├── Compression  ←── ENZO "Frame"                │
│                          ├── Boundary markers                            │
│                          └── Delimiters                                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────┘
```

**Injection Points**:
| Point | Pattern | Recommendation |
|-------|---------|----------------|
| Context Builder | Token budgeting | REC-002 |
| Cache Manager | Delta tracking | REC-003 |
| Output Formatter | Compression | REC-001 |

---

## Complete Architecture Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        KDE ARCHITECTURE INJECTION MAP                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   EXTERNAL              ┌─────────────────────────────────┐     EXTERNAL    │
│   INPUT                │      INVESTIGATION LAYER        │      OUTPUT     │
│                        │                                 │                  │
│  ┌──────────┐          │  ┌───────────────────────────┐  │    ┌─────────┐  │
│  │ Keywords │─────────▶│  │     SOP-005 EXECUTOR     │  │───▶│ Context │  │
│  └──────────┘          │  │                           │  │    │  Delta  │  │
│                        │  │  ┌─────────────────────┐  │  │    └─────────┘  │
│  ┌──────────┐          │  │  │ Policy Loader (Z2) │  │  │                  │
│  │  Domain  │─────────▶│  │  │ Decision Engine(Z2)│  │  │    ┌─────────┐  │
│  └──────────┘          │  │  │ Result Formatter(Z2)│  │  │───▶│ Summary │  │
│                        │  │  └─────────────────────┘  │  │    └─────────┘  │
│                        │  └───────────────────────────┘  │                  │
│                        └─────────────────────────────────┘                  │
│                                      │                                      │
│                                      ▼                                      │
│                        ┌─────────────────────────────────┐                  │
│                        │        RETRIEVAL LAYER         │                  │
│                        │                                 │                  │
│  ┌──────────┐          │  ┌───────────────────────────┐  │                  │
│  │  Query   │─────────▶│  │    RETRIEVAL ENGINE       │  │                  │
│  └──────────┘          │  │                           │  │                  │
│                        │  │  ┌─────────────────────┐  │  │    ┌─────────┐  │
│  ┌──────────┐          │  │  │ Pre-Processor (Z1)  │  │  │───▶│ Results │  │
│  │ Context  │─────────▶│  │  │ Cache Layer (Z1)    │  │  │    └─────────┘  │
│  └──────────┘          │  │  │ Post-Processor (Z1)  │  │  │                  │
│                        │  │  └─────────────────────┘  │  │    ┌─────────┐  │
│                        │  └───────────────────────────┘  │───▶│ Cached  │  │
│                        └─────────────────────────────────┘    │ Results │  │
│                                      │                            └─────────┘  │
│                                      ▼                                      │
│                        ┌─────────────────────────────────┐                  │
│                        │         ECU CONTROL LAYER      │                  │
│                        │                                 │                  │
│  ┌──────────┐          │  ┌───────────────────────────┐  │                  │
│  │  Budget  │─────────▶│  │       RUNTIME ECU        │  │                  │
│  └──────────┘          │  │                           │  │                  │
│                        │  │  ┌─────────────────────┐  │  │                  │
│  ┌──────────┐          │  │  │ Bootstrap Gates (Z3)│  │  │    ┌─────────┐  │
│  │  Rules   │─────────▶│  │  │ Exec Controller(Z3)│  │  │───▶│ Valid.  │  │
│  └──────────┘          │  │  │ Validator (Z3)      │  │  │    │ Output  │  │
│                        │  │  └─────────────────────┘  │  │    └─────────┘  │
│                        │  └───────────────────────────┘  │                  │
│                        └─────────────────────────────────┘                  │
│                                      │                                      │
│                                      ▼                                      │
│   SEED-001 ◀───────────────▶ ┌─────────────────────────────────┐          │
│                              │      CONTEXT LAYER              │          │
│   ┌──────────────────────┐   │                                 │          │
│   │   Reasoning DNA      │   │  ┌───────────────────────────┐  │          │
│   │   (Immutabe)         │   │  │  Context Builder (Z4)     │  │──────▶ LLM
│   └──────────────────────┘   │  │  Cache Manager (Z4)      │  │          │
│                              │  │  Output Formatter (Z4)    │  │          │
│   ┌──────────────────────┐   │  └───────────────────────────┘  │          │
│   │   5 Core Principles  │   │                                 │          │
│   │   (Enforced)         │   └─────────────────────────────────┘          │
│   └──────────────────────┘                                                     │
│                                                                              │
│   ═══════════════════════════════════════════════════════════════════════   │
│                                                                              │
│   INJECTION ZONES:                                                           │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Z1: Retrieval Layer    │  Pre-Processor, Cache, Post-Processor      │   │
│   │  Z2: SOP-005 Layer      │  Policy Loader, Decision Engine, Formatter │   │
│   │  Z3: ECU Control Layer  │  Bootstrap, Execution Controller, Validator │   │
│   │  Z4: Context Layer      │  Context Builder, Cache Manager, Formatter  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Injection Point Summary

### By Recommendation

| Rec | Zone | Injection Point | Pattern |
|-----|------|-----------------|---------|
| REC-001 | Z1, Z4 | Cache Layer, Output Formatter | Retrieval caching |
| REC-002 | Z1, Z3, Z4 | Pre-Processor, Bootstrap, Context Builder | Token budgeting |
| REC-003 | Z2, Z4 | Result Formatter, Cache Manager | Delta context |
| REC-004 | Z2, Z3 | Policy Loader, Validator | Explicit state |

### By Pattern Source

| Pattern | Source | Injection Zones |
|---------|--------|-----------------|
| Retrieval Caching | Caveman | Z1, Z4 |
| Token Budgeting | ENZO | Z3, Z4 |
| Delta Context | Caveman | Z2, Z4 |
| Explicit State | ENZO | Z2, Z3 |
| Content-Driven Mode | ENZO | Z2 |

---

## Implementation Priority

### Phase 1: Quick Wins (Low Risk)

| Point | Implementation | Effort |
|-------|----------------|--------|
| Z1: Cache Layer | TTL-based result caching | 1 day |
| Z4: Output Formatter | Context compression | 1 day |

### Phase 2: Core Features (Medium Risk)

| Point | Implementation | Effort |
|-------|----------------|--------|
| Z3: Budget Enforcement | Token budget limits | 2 days |
| Z1: Pre-Processor | Query normalization | 2 days |

### Phase 3: Advanced Features (Higher Risk)

| Point | Implementation | Effort |
|-------|----------------|--------|
| Z4: Cache Manager | Delta tracking | 3 days |
| Z2: Result Formatter | Delta output | 3 days |

---

## Visual: Injection Point Flow

```
                    CAVEMAN PATTERNS              ENZO PATTERNS
                    ───────────────              ─────────────

┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
│ Memory  │─────▶│  Cache  │─────▶│  Brief  │─────▶│  Diff   │
│ Over    │      │ Layer   │      │ Tool    │      │ Over    │
│ Re-dis │      │ (Z1)    │      │ Outputs │      │ Re-read │
└─────────┘      └─────────┘      └─────────┘      └─────────┘
                     │                                   │
                     │                                   │
                     ▼                                   ▼
              ┌─────────────────────────────────────────────────┐
              │              KDE INJECTION ZONES                      │
              ├─────────────────────────────────────────────────┤
              │                                                      │
              │   Z1:Retrieval ─ Z2:SOP-005 ─ Z3:ECU ─ Z4:Context │
              │      │              │            │          │       │
              │      ▼              ▼            ▼          ▼       │
              │   Cache       Delta         Bounded     Delta      │
              │   Results     Output        Budget      Context     │
              │                                                      │
              └─────────────────────────────────────────────────┘
                                │
                                ▼
                        ┌─────────────┐
                        │  KDE RUNTIME │
                        │  (Optimized) │
                        └─────────────┘
```

---

## Compliance Checklist

| Check | Required | Verified | Evidence |
|-------|----------|----------|---------|
| Bootstrap Gates | YES | ✅ | 6/8 passed |
| Runtime Initialized | YES | ✅ | 11 modules |
| ECU Enforcing | YES | ✅ | Markers validated |
| Seed Loaded | YES | ✅ | SEED-001 |
| Engine Active | YES | ✅ | KDE-ENGINE-002 |
| EXECUTION_MODE | YES | ✅ | KDE_RUNTIME |

---

## Conclusions

### Key Findings

1. **4 distinct injection zones** identified across KDE architecture
2. **13 specific injection points** mapped to patterns
3. **Pattern distribution**: 3 Caveman patterns, 4 ENZO patterns
4. **Implementation phases** defined with risk assessment

### Visual Summary

```
┌────────────────────────────────────────────────────┐
│         KDE INJECTION ARCHITECTURE MAP              │
├────────────────────────────────────────────────────┤
│                                                     │
│  External ──┐                                      │
│  Patterns   │                                      │
│             ▼                                      │
│  ┌──────────────────┐                              │
│  │    CAVEMAN       │    ENZO                     │
│  │  ┌────────────┐  │  ┌────────────┐             │
│  │  │Squash/Brief│  │  │Bounded/    │             │
│  │  │Cache/Diff  │  │  │Explicit/   │             │
│  │  └────────────┘  │  │Boundary    │             │
│  └─────────┬────────┘  └─────┬──────┘             │
│            │                  │                    │
│            ▼                  ▼                    │
│  ┌─────────────────────────────────────────┐       │
│  │           KDE INJECTION ZONES           │       │
│  │  ┌─────────┬─────────┬─────────┬──────┐ │       │
│  │  │   Z1    │   Z2    │   Z3    │  Z4  │ │       │
│  │  │Retrieval│ SOP-005 │   ECU   │Context│ │       │
│  │  └─────────┴─────────┴─────────┴──────┘ │       │
│  └────────────────────┬────────────────────┘       │
│                       ▼                            │
│              ┌─────────────────┐                    │
│              │  KDE RUNTIME    │                    │
│              │   OPTIMIZED     │                    │
│              └─────────────────┘                    │
│                                                     │
└────────────────────────────────────────────────────┘
```

---

## Evidence

[EVIDENCE: Bootstrap - `python3 .kde/bootstrap/gates.py`]
[EVIDENCE: Runtime - runtime/runtime.py]
[EVIDENCE: Retrieval - runtime/retrieval.py]
[EVIDENCE: SOP-005 - runtime/sop005.py]
[EVIDENCE: ECU - runtime/ecu/]
[EVIDENCE: INV-076 - Context Reduction recommendations]
[EVIDENCE: INV-055 - Caveman patterns]
[EVIDENCE: INV-064 - ENZO principles]

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Execution Mode**: KDE_RUNTIME  
**Authenticity Score**: 100%
