# INV-064: ENZO Architecture - Engineering Principles Analysis

**Status**: INVESTIGATION  
**Parent**: INV-063 (Caveman Series)  
**Created**: 2026-07-28  
**Source**: External pattern review - tamzrod/enzo  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation analyzes the ENZO compression engine architecture, extracting reusable engineering principles for context reduction and data transformation. ENZO represents a disciplined approach to packet transformation with explicit state management.]

---

## ENZO Overview

### Repository Information

| Aspect | Value |
|--------|-------|
| **Name** | ENZO Compression Engine Architecture |
| **Description** | State-synchronized, agreement-based stream transformer (TCP-in / TCP-out) |
| **Language** | Go |
| **Author** | tamzrod |
| **URL** | https://github.com/tamzrod/enzo |
| **License** | Public |

### Core Definition

> **ENZO is a payload-oriented agreement engine that sits between systems and transforms packets while preserving exact byte boundaries.**

---

## Architecture Analysis

### Core Principles (LOCKED)

[EVIDENCE: https://github.com/tamzrod/enzo/blob/main/Docs/ARCHITECTURE.md]

#### 1. Packet Transformation (Primary Invariant)

| Aspect | Definition |
|--------|------------|
| **Rule** | One payload in → one ENZO frame out |
| **Constraint** | Any internal re-segmentation (line-based, delimiter-based, heuristic-based) is a **hard violation** |
| **Rationale** | Compression that breaks packet boundaries does not save bandwidth; it multiplies overhead and destroys ROI |

#### 2. Explicitness (LOCKED)

| Aspect | Definition |
|--------|------------|
| **Rule** | If ENZO touches the data, it MUST emit an ENZO frame |
| **Constraint** | Everything ENZO outputs begins with the ENZO magic byte |
| **Guarantees** | Deterministic behavior, safe chaining, bounded worst-case loss, no re-encoding ambiguity |

#### 3. Mode Detection (LOCKED)

| Aspect | Definition |
|--------|------------|
| **Rule** | ENZO determines operating mode once per connection using explicit on-wire identity |
| **Encode Mode** | First byte ≠ ENZO magic byte |
| **Decode Mode** | First byte = ENZO magic byte |
| **Constraint** | Never changes during connection lifetime |

---

## Protocol Specification

[EVIDENCE: https://github.com/tamzrod/enzo/blob/main/Docs/PROTOCOL.md]

### Frame Header (Fixed, v1)

```
+--------+--------+--------+--------+
| Magic  | Version| Type   | Flags  |
+--------+--------+--------+--------+
|        Length (uint32 BE)          |
+-----------------------------------+
```

| Field | Size | Meaning |
|-------|------|---------|
| Magic | 1 B | Fixed value `0xEC` identifying ENZO protocol |
| Version | 1 B | Protocol version (v1 = `0x01`) |
| Type | 1 B | Frame type (event kind) |
| Flags | 1 B | Reserved (must be `0x00` in v1) |
| Length | 4 B | Payload length in bytes |

**Total header size: 8 bytes**

### Frame Types (v1)

| Type | Name | Description |
|------|------|-------------|
| `0x01` | EPOCH_RESET | Reset dictionary and epoch state |
| `0x02` | TEMPLATE_DEFINE | Define a new template |
| `0x03` | TEMPLATE_REF | Reference an existing template |
| `0x04` | RAW_DATA | Literal byte payload |

---

## Engineering Principles

### Principle 1: Boundary Preservation

| Aspect | Analysis |
|--------|----------|
| **Problem** | Compression that breaks packet boundaries multiplies overhead |
| **Solution** | One payload in → one ENZO frame out |
| **Guarantee** | Packet boundaries preserved end-to-end |
| **Reversibility** | YES - Decoder reconstructs byte-for-byte identical output |

**Applicability**: Universal to any packet-transforming system

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Payload Boundary Preservation                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Transform entire payloads atomically. Never re-segment inside   │
│  the transformation engine.                                       │
│                                                                  │
│  WHEN: Packet-oriented transformation with integrity requirements │
│  HOW: One-in → One-out semantics, no internal segmentation     │
│  TRADE-OFF: Simplicity over optimization                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Principle 2: Explicit State

| Aspect | Analysis |
|--------|----------|
| **Problem** | Invisible passthrough creates ambiguity and non-deterministic behavior |
| **Solution** | If ENZO touches data, it emits an explicit ENZO frame |
| **Guarantee** | Safe chaining, bounded worst-case loss |
| **Reversibility** | YES - Every frame is explicitly typed |

**Applicability**: Universal to any stateful transformation

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Explicit State Transformation                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  All state changes must be explicitly framed. No invisible       │
│  passthrough or implicit state mutations.                         │
│                                                                  │
│  WHEN: Stateful transformation requiring chaining                │
│  HOW: Frame every state change with explicit metadata           │
│  TRADE-OFF: Verbosity over ambiguity                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Principle 3: Bounded Worst-Case

| Aspect | Analysis |
|--------|----------|
| **Problem** | Unbounded overhead in worst case makes system unpredictable |
| **Solution** | Worst-case loss is exactly the ENZO header size (8 bytes) |
| **Guarantee** | Fixed, bounded loss paid at most once per payload |
| **Reversibility** | YES - Loss is constant and bounded |

**Applicability**: Universal to bounded-resource systems

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Bounded Worst-Case Loss                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Design transformation so worst-case overhead is fixed and       │
│  bounded. No cascading, hop-dependent, or hidden expansion.       │
│                                                                  │
│  WHEN: Transformation with reliability requirements               │
│  HOW: Calculate and guarantee maximum overhead                   │
│  TRADE-OFF: Guaranteed bounds over variable optimization        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Principle 4: Content-Driven Mode

| Aspect | Analysis |
|--------|----------|
| **Problem** | Configuration-based mode selection adds complexity and failure modes |
| **Solution** | Mode determined by first byte (magic byte detection) |
| **Guarantee** | No configuration required, self-identifying streams |
| **Reversibility** | YES - Mode detected from content |

**Applicability**: Universal to self-describing protocols

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Content-Driven Mode Selection                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Determine operating mode from content, not configuration.       │
│  Self-describing streams require no external hints.               │
│                                                                  │
│  WHEN: Self-describing data streams                             │
│  HOW: Magic byte or content signature for mode detection        │
│  TRADE-OFF: Self-description over configuration flexibility    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Principle 5: Negative ROI is Explicit

| Aspect | Analysis |
|--------|----------|
| **Problem** | Skipping compression without indication creates ambiguity |
| **Solution** | RAW frames always include ENZO magic byte, even when not compressing |
| **Guarantee** | Symmetry and idempotence |
| **Reversibility** | YES - RAW frames never affect agreement state |

**Applicability**: Universal to optimization-toggle systems

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Explicit Optimization Decisions                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  When optimization is skipped, frame the decision explicitly.   │
│  No silent passthrough even when no transformation occurs.        │
│                                                                  │
│  WHEN: Optimizations that can be skipped                        │
│  HOW: Explicit frames for both optimized and unoptimized paths  │
│  TRADE-OFF: Consistency over efficiency                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Principle 6: Stateful Agreement with Reset

| Aspect | Analysis |
|--------|----------|
| **Problem** | Dictionary/state growth unbounded over long connections |
| **Solution** | EPOCH_RESET frame to discard all dictionary state |
| **Guarantee** | Recoverable from any state corruption |
| **Reversibility** | YES - Reset is explicit and synchronized |

**Applicability**: Universal to long-lived stateful sessions

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Stateful Agreement with Recovery                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Maintain stateful agreement across payloads with explicit       │
│  reset capability for recovery and state management.              │
│                                                                  │
│  WHEN: Long-lived connections with stateful transformation       │
│  HOW: Explicit epoch resets, bounded state growth               │
│  TRADE-OFF: State efficiency over initialization cost           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Principle 7: Adapter Separation

| Aspect | Analysis |
|--------|----------|
| **Problem** | Mixing boundary decisions with transformation logic couples concerns |
| **Solution** | Boundary decisions belong to adapters, not ENZO core |
| **Guarantee** | ENZO remains protocol-agnostic |
| **Reversibility** | N/A - Design principle |

**Applicability**: Universal to layered system design

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Adapter/Core Separation                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Boundary decisions (what constitutes a payload) belong to        │
│  adapters. Transformation logic remains protocol-agnostic.        │
│                                                                  │
│  WHEN: Protocol-agnostic transformation required                 │
│  HOW: Separate adapter layer for boundary decisions             │
│  TRADE-OFF: Complexity at boundaries over core coupling         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### Internal Structure

| Directory | Purpose |
|-----------|---------|
| `internal/accept` | Connection acceptance |
| `internal/connctx` | Connection context management |
| `internal/dictionary` | Dictionary/state management |
| `internal/httpio` | HTTP I/O adapter |
| `internal/io` | I/O primitives |
| `internal/memory` | Memory management |
| `internal/protocol` | Protocol parsing |
| `internal/state` | State machine |

### Key Characteristics

| Characteristic | Implementation |
|----------------|----------------|
| **Language** | Go |
| **Binary** | Single executable (`enzo.exe`) |
| **Module** | `github.com/tamzrod/enzo` |
| **Determinism** | Event-based, ordered processing |

---

## Comparison with Caveman Patterns

| Aspect | ENZO | Caveman |
|--------|------|---------|
| **Focus** | Packet transformation | Context reduction |
| **State** | Stateful with agreement | Stateless summaries |
| **Boundaries** | Preserved | Collapsed |
| **Reversibility** | Full (byte-for-byte) | Partial (irreversible compress) |
| **Domain** | Network compression | LLM context |

### Complementary Principles

| ENZO Principle | Caveman Equivalent |
|----------------|-------------------|
| Boundary Preservation | squash (targeted access) |
| Explicit State | compress (with provenance) |
| Bounded Worst-Case | budget (upfront estimation) |
| Content-Driven Mode | lean (proactive audit) |

---

## Reusability Assessment

### Universal Principles

| Principle | Applicability | Rationale |
|-----------|---------------|-----------|
| Payload Boundary Preservation | HIGH | Any packet-transforming system |
| Explicit State Transformation | HIGH | Any stateful engine |
| Bounded Worst-Case | HIGH | Any resource-bounded system |
| Content-Driven Mode | MEDIUM | Protocols with magic bytes |
| Explicit Optimization | HIGH | Any optimization system |
| Stateful Agreement with Reset | HIGH | Any long-lived session |
| Adapter/Core Separation | HIGH | Any layered architecture |

### Domain-Specific Principles

| Principle | Applicability | Rationale |
|-----------|---------------|-----------|
| TCP-in/TCP-out framing | LOW | Network-specific |
| Dictionary-based compression | MEDIUM | Compression algorithms |
| Magic byte detection | MEDIUM | Protocol negotiation |

---

## Summary

### 7 Engineering Principles Extracted

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENZO PRINCIPLES SUMMARY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Payload Boundary Preservation                                 │
│     → One-in → One-out, no internal segmentation                │
│                                                                  │
│  2. Explicit State Transformation                                │
│     → Frame every state change, no invisible passthrough        │
│                                                                  │
│  3. Bounded Worst-Case Loss                                     │
│     → Fixed overhead, no cascading amplification                │
│                                                                  │
│  4. Content-Driven Mode Selection                                │
│     → Magic byte detection, no configuration                    │
│                                                                  │
│  5. Explicit Optimization Decisions                              │
│     → RAW frames even when not optimizing                       │
│                                                                  │
│  6. Stateful Agreement with Recovery                            │
│     → EPOCH_RESET for state management                         │
│                                                                  │
│  7. Adapter/Core Separation                                     │
│     → Boundary decisions belong to adapters                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Themes

| Theme | Manifestation |
|-------|---------------|
| **Explicitness** | Every action framed, no invisible behavior |
| **Boundaries** | Payload integrity preserved |
| **Reversibility** | Full recovery capability |
| **Determinism** | Predictable worst-case behavior |

---

## Evidence

[EVIDENCE: https://github.com/tamzrod/enzo - ENZO repository]
[EVIDENCE: https://github.com/tamzrod/enzo/blob/main/Docs/ARCHITECTURE.md]
[EVIDENCE: https://github.com/tamzrod/enzo/blob/main/Docs/PROTOCOL.md]
[EVIDENCE: INV-063 - Caveman principles]

## Next Steps

1. Human review of ENZO principles
2. Integration with caveman principles (INV-063)
3. Identification of applicable domains

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)
