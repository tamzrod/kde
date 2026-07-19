# MCP Laboratory Architecture Review

**Document Version**: 1.0  
**Date**: 2026-07-19  
**Status**: ARCHITECTURAL REVIEW (In Progress)

---

## 1. Purpose

This document reviews the MCP Laboratory architecture and identifies inconsistencies with the KDE Laboratory model.

---

## 2. KDE Laboratory Architecture (Reference Model)

### 2.1 Directory Structure

```
laboratory/
├── README.md              # Laboratory overview
├── ARCHITECTURE.md        # Detailed specification
├── GOVERNANCE.md          # Governance protocols
├── registry.md            # Experiment registry
├── scientific-loop.md     # Learning loop documentation
│
├── experiments/           # All experiments
│   ├── LAB-001/
│   │   ├── experiment.md  # Experiment definition
│   │   ├── runs/
│   │   │   └── RUN-XXX.md
│   │   └── evidence/
│   │       └── references.md
│   └── LAB-NNN/
│
└── templates/
    ├── experiment-template.md
    ├── run-template.md
    └── evidence-reference-template.md
```

### 2.2 Architectural Rules

| Rule | Description |
|------|-------------|
| **Root = Organization** | Laboratory root represents the research organization |
| **Root ≠ Experiment** | The root is NOT an experiment |
| **Laboratory-Wide Assets** | Only governance, registry, templates, README belong in root |
| **Experiment Isolation** | Each experiment is self-contained |
| **Implementation Isolation** | Implementation artifacts belong inside experiments |

### 2.3 Experiment Structure

Each experiment contains everything needed to reproduce it:

```
LAB-XXX/
├── experiment.md       # Experiment definition
├── runs/              # Run records
├── evidence/          # Evidence references
├── fixtures/          # Test fixtures
├── scenarios/         # Test scenarios
├── client/            # Test client code
├── conclusions.md     # Experiment conclusions
└── impact.md          # Knowledge impact report
```

---

## 3. Current MCP Laboratory Architecture

### 3.1 Directory Structure

```
deployment/
└── mcp/
    ├── cmd/                    # CLI entry point
    ├── internal/               # MCP Runtime implementation
    │   ├── runtime/
    │   ├── session/
    │   ├── tools/
    │   └── ...
    ├── laboratory/             # MCP Laboratory (DUPLICATE)
    │   ├── client/
    │   ├── scenarios/
    │   ├── fixtures/
    │   ├── main_test.go
    │   └── run_tests.sh
    └── deploy/                 # Deployment configs
```

Also exists:

```
laboratory/
└── mcp/                       # MCP Laboratory (ALSO EXISTS)
    ├── README.md
    ├── 008-Local-Execution.md
    ├── 009-Repository-Layout.md
    └── 010-Development-Roadmap.md
```

### 3.2 Files Inventory

| Location | Type | Purpose |
|----------|------|---------|
| `deployment/mcp/laboratory/client/` | Implementation | Test client simulator |
| `deployment/mcp/laboratory/scenarios/` | Implementation | Test scenarios |
| `deployment/mcp/laboratory/fixtures/` | Implementation | Test fixtures |
| `deployment/mcp/laboratory/main_test.go` | Implementation | Test runner |
| `deployment/mcp/laboratory/run_tests.sh` | Implementation | Test script |
| `laboratory/mcp/README.md` | Documentation | MCP Lab overview |
| `laboratory/mcp/008-*.md` | Documentation | Architecture docs |
| `laboratory/mcp/009-*.md` | Documentation | Architecture docs |
| `laboratory/mcp/010-*.md` | Documentation | Architecture docs |

---

## 4. Inconsistencies Identified

### 4.1 Duplicate Laboratory Directories

| Issue | Problem | Impact |
|-------|---------|--------|
| **Two Laboratory Locations** | `laboratory/mcp/` AND `deployment/mcp/laboratory/` | Confusion about which is authoritative |
| **No Clear Ownership** | Unclear which lab owns the MCP experiments | Governance conflicts |
| **Scattered Artifacts** | Some files in one location, some in another | Maintenance difficulty |

### 4.2 Root-Level Governance Missing

| Issue | Problem | Impact |
|-------|---------|--------|
| **No GOVERNANCE.md** | No governance document in MCP laboratory root | Unclear authority |
| **No registry.md** | No experiment registry | No experiment tracking |
| **No templates/** | No experiment templates | Inconsistent experiments |
| **No OPERATING-RULES.md** | No operating rules defined | No operational guidance |

### 4.3 Experiment Structure Missing

| Issue | Problem | Impact |
|-------|---------|--------|
| **No experiments/ directory** | Implementation is not organized as experiments | No reproducibility |
| **No runs/ tracking** | No run records | No experiment history |
| **No evidence/ references** | No evidence collection | No knowledge impact |
| **No experiment.md files** | No formal experiment definitions | No hypothesis testing |

### 4.4 Implementation in Wrong Location

| Issue | Problem | Impact |
|-------|---------|--------|
| **Go source in laboratory** | `deployment/mcp/laboratory/` contains Go code | Violates isolation |
| **Runtime code mixed with tests** | Implementation and test code together | Poor separation |
| **No experiment.md** | Current "experiments" are just test scenarios | Not following KDE model |

### 4.5 Documentation Location

| Issue | Problem | Impact |
|-------|---------|--------|
| **Docs in wrong location** | Architecture docs in `laboratory/mcp/` instead of proper lab root | Not discoverable |
| **No ARCHITECTURE.md** | No architecture specification in lab root | No reference |

---

## 5. Problem Analysis

### 5.1 Why Each Inconsistency Is a Problem

| Inconsistency | Why It's a Problem |
|--------------|-------------------|
| Duplicate Laboratories | Creates confusion about canonical location; maintenance burden |
| Missing Governance | No clear authority or protocols for the MCP laboratory |
| No Registry | Cannot track experiments, runs, or knowledge impact |
| No Experiment Structure | Does not align with KDE Laboratory scientific model |
| Implementation in Lab Root | Violates isolation principle; mixes concerns |
| Scattered Documentation | Hard to find; not following organizational standards |

### 5.2 Root Causes

1. **Ad-hoc Growth**: MCP Laboratory grew without following the KDE model
2. **Missing Template**: No experiment template was provided
3. **Unclear Boundaries**: Unclear where implementation ends and laboratory begins
4. **Mixed Concerns**: Runtime implementation and laboratory experiments were conflated

---

## 6. Proposed Correct Architecture

### 6.1 Target Directory Structure

```
deployment/
└── mcp/
    ├── knowledge/              # MCP knowledge artifacts (from research)
    ├── governance/             # MCP governance documents
    └── laboratory/             # MCP Laboratory (single canonical location)
        ├── README.md           # Laboratory overview
        ├── ARCHITECTURE.md     # This architecture specification
        ├── GOVERNANCE.md       # Governance protocols
        ├── OPERATING-RULES.md  # Operating procedures
        ├── registry.md          # Experiment registry
        │
        ├── templates/
        │   ├── experiment-template.md
        │   ├── run-template.md
        │   └── evidence-reference-template.md
        │
        └── experiments/
            ├── MCP-001/
            │   ├── experiment.md
            │   ├── runs/
            │   ├── evidence/
            │   ├── fixtures/
            │   ├── scenarios/
            │   ├── client/
            │   ├── conclusions.md
            │   └── impact.md
            │
            └── MCP-002/
                └── ...
```

### 6.2 Implementation Location

The MCP Runtime implementation (Go code) belongs in:

```
NOT in laboratory/
BUT in: /workspace/project/kde/deployment/mcp/ (current location is correct)
```

The laboratory is for **experimentation**, not **implementation**.

---

## 7. Comparison Matrix

| Aspect | Current State | Target State | Gap |
|--------|--------------|--------------|-----|
| Laboratory Count | 2 (scattered) | 1 (canonical) | Duplicate |
| Governance Docs | 0 | 4+ | Missing |
| Registry | No | Yes | Missing |
| Templates | No | Yes | Missing |
| Experiment Structure | No | Yes | Missing |
| Run Tracking | No | Yes | Missing |
| Evidence References | No | Yes | Missing |
| Implementation Isolation | No | Yes | Violated |

---

## 8. Recommendations

1. **Consolidate to Single Laboratory**: Merge `laboratory/mcp/` and `deployment/mcp/laboratory/` into one canonical location
2. **Add Governance Documents**: Create GOVERNANCE.md, OPERATING-RULES.md, registry.md
3. **Create Templates**: Add templates/ directory with experiment, run, and evidence templates
4. **Organize as Experiments**: Restructure current test code as experiments
5. **Move Implementation Out**: Keep Go implementation in `deployment/mcp/` (correct location)
6. **Add Missing Documentation**: Create ARCHITECTURE.md in proper location

---

**Document Status**: ARCHITECTURAL REVIEW COMPLETE  
**Next Step**: Create LABORATORY-INVENTORY.md
