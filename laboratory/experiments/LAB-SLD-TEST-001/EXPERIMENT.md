# LAB-SLD-TEST-001: SLD Expert CB Rendering Test

**Experiment ID**: LAB-SLD-TEST-001  
**Date**: 2026-07-22  
**Expert**: KDE-EXPERT-SLD-001  
**Status**: COMPLETE

---

## Task

Render 3 feeders using Circuit Breaker (CB) symbols:
- Feeder A: OPEN (green fill)
- Feeder B: CLOSED (red fill)
- Feeder C: UNKNOWN (no fill)

---

## CB Symbol Specification (Per SLD Expert)

```
     │
     │  ← Conductor
     ▼
    >>  ← Double chevron (top connection)
     │
   ━━━   ← Candle wick body (thin vertical)
     │
    >>  ← Double chevron (bottom connection)
     │
     ▼
     │  ← Conductor
```

### CB Fill Rules
| State | Fill | Color |
|-------|------|-------|
| CLOSED | Solid | Red #FF4444 |
| OPEN | Solid | Green #00AA00 |
| UNKNOWN | None | Dashed outline |

---

## Expert Invocation

```yaml
task: "Render 3-feeder CB diagram"
action: render
context:
  voltage_level: "115kV"
primitives:
  - type: circuit-breaker
    id: "FEEDER-A"
    state: OPEN
  - type: circuit-breaker
    id: "FEEDER-B"
    state: CLOSED
  - type: circuit-breaker
    id: "FEEDER-C"
    state: UNKNOWN
knowledge_refs:
  - KDE-PRIM-CB-001
  - KDE-VOLTAGE-NGCP-001
```

---

## Confidence

| Factor | Status |
|--------|--------|
| Knowledge available | ✅ KDE-PRIM-CB-001 |
| Voltage profile | ✅ 115kV → #FFBF00 |
| CB fill rules | ✅ Per spec |
| **Overall** | **HIGH** |

---

**Completed**: 2026-07-22
