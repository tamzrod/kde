# Investigation Index: INV-088

**Investigation**: ECU Runtime Execution Control Architecture
**created**: 2026-07-29T03:58:00Z
**Status**: ACTIVE

---

## Experiments

| Experiment ID | Title | Status | Result |
|--------------|-------|--------|--------|
| LAB-065 | ECU Runtime Execution Analysis | COMPLETE | SUPPORTS |

---

## Research Questions Addressed

| # | Question | Finding |
|---|----------|---------|
| 1 | ECU current responsibilities | Initialization + passive policy checks |
| 2 | Engine selection status | Infrastructure exists, not integrated |
| 3 | Seed selection status | Genesis is GOVERNANCE only |
| 4 | Genesis lifecycle | Should be GOVERNANCE seed, not execution |
| 5 | Engine specialization | 8 engines with different capabilities |
| 6 | ECU scheduling | Not implemented, needs RequestClassifier |
| 7 | Adaptive execution | Not supported, needs stage-based routing |
| 8 | Genesis justification | Only for policy enforcement |

---

## Key Findings

1. **ECU Infrastructure Complete**: All components (resolver, planner, aggregator) exist
2. **Integration Gap**: execute() does not call CapabilityResolver automatically
3. **Genesis Misconception**: Not execution seed; GOVERNANCE only
4. **Seed Types Needed**: GOVERNANCE, EXECUTION, CONTEXT, BOOTSTRAP
5. **Engine Specialization**: 8 engines ready for intelligent routing

---

## Recommendations

| Priority | Recommendation | Impact |
|----------|---------------|--------|
| HIGH | Integrate CapabilityResolver into ECU.execute() | Enables auto-selection |
| HIGH | Redesign Genesis as GOVERNANCE-only | Clear separation |
| MEDIUM | Create EXECUTION-type seeds | Task-specific strategies |
| MEDIUM | Add RequestClassifier component | Intelligent routing |
| MEDIUM | Add ModeSelector based on task | Optimal execution mode |
| LOW | Implement stage-based adaptive execution | Investigation quality |

---

## Status

- [x] Investigation Created
- [x] Research Questions Defined
- [x] Evidence Collection Complete
- [x] Observation Complete
- [x] Synthesis Complete (in experiment)
- [ ] Validation
- [ ] Candidate Knowledge Review
- [ ] Promotion
- [ ] Knowledge Repository

---

## Links

| Type | Location |
|------|----------|
| Investigation | [investigation.md](investigation.md) |
| Experiment | [../experiments/LAB-065](../experiments/LAB-065/) |

---
