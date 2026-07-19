# Laboratory Inventory

**Document Version**: 1.0  
**Date**: 2026-07-19  
**Status**: INVENTORY COMPLETE

---

## 1. Purpose

This document inventories all laboratory-related directories in the repository, determining purpose, ownership, status, and disposition.

---

## 2. Laboratory Inventory Table

| Path | Purpose | Owner | Status | Disposition | Notes |
|------|---------|-------|--------|-------------|-------|
| `/workspace/project/kde/laboratory/` | KDE Laboratory - Scientific experimentation for knowledge validation | KDE Organization | **Active** | Keep | Reference model |
| `/workspace/project/kde/laboratory/mcp/` | MCP Laboratory documentation | MCP Project | **Obsolete** | Merge | Duplicate; contents should move |
| `/workspace/project/kde/deployment/mcp/laboratory/` | MCP Laboratory experiments and tests | MCP Project | **Active** | Consolidate | Needs refactoring to match KDE model |
| `/workspace/project/kde/laboratory/experiments/` | KDE Laboratory experiments | KDE Organization | **Active** | Keep | Part of KDE Laboratory |

---

## 3. Detailed Analysis

### 3.1 `/workspace/project/kde/laboratory/` (KDE Laboratory)

| Attribute | Value |
|-----------|-------|
| **Purpose** | Primary scientific experimentation environment for KDE |
| **Owner** | KDE Organization |
| **Status** | Active - Production |
| **Type** | Research Organization Root |

**Structure**:
```
laboratory/
├── README.md              ✅
├── ARCHITECTURE.md        ✅
├── GOVERNANCE.md          ✅
├── registry.md            ✅
├── scientific-loop.md      ✅
├── experiments/           ✅
│   └── LAB-001...LAB-010/
└── templates/             ✅
    └── *.md templates
```

**Observations**:
- ✅ Complete governance infrastructure
- ✅ Registry for experiment tracking
- ✅ Templates for reproducibility
- ✅ Experiment directory structure
- ✅ All artifacts follow KDE Laboratory model

---

### 3.2 `/workspace/project/kde/laboratory/mcp/` (MCP Documentation Lab)

| Attribute | Value |
|-----------|-------|
| **Purpose** | MCP Laboratory documentation and design documents |
| **Owner** | MCP Project |
| **Status** | Obsolete - Should be merged |
| **Type** | Staging/Documentation |

**Structure**:
```
laboratory/mcp/
├── README.md
├── 008-Local-Execution.md
├── 009-Repository-Layout.md
└── 010-Development-Roadmap.md
```

**Observations**:
- ⚠️ Contains documentation that should be in proper laboratory structure
- ⚠️ No governance, registry, or templates
- ⚠️ Not following experiment structure
- ⚠️ Should be consolidated into `/workspace/project/kde/deployment/mcp/laboratory/`

**Disposition**: Merge into canonical MCP Laboratory location

---

### 3.3 `/workspace/project/kde/deployment/mcp/laboratory/` (MCP Experiments Lab)

| Attribute | Value |
|-----------|-------|
| **Purpose** | MCP Runtime testing and experimentation |
| **Owner** | MCP Project |
| **Status** | Active - Needs Refactoring |
| **Type** | Implementation + Experiments |

**Structure**:
```
deployment/mcp/laboratory/
├── client/
│   └── client.go
├── scenarios/
│   └── inventory_management.go
├── fixtures/
│   └── inventory-project/
│       ├── .kde
│       └── config.yaml
├── main_test.go
└── run_tests.sh
```

**Observations**:
- ⚠️ Contains implementation code (Go) mixed with experiments
- ⚠️ Missing governance documents
- ⚠️ Missing registry
- ⚠️ Missing templates
- ⚠️ Not organized as experiments (no runs/, evidence/)
- ⚠️ Contains actual MCP Runtime implementation that should NOT be here

**Disposition**: Refactor to match KDE Laboratory model

---

### 3.4 `/workspace/project/kde/laboratory/experiments/` (KDE Experiments)

| Attribute | Value |
|-----------|-------|
| **Purpose** | Individual KDE Laboratory experiments |
| **Owner** | KDE Organization |
| **Status** | Active - Production |
| **Type** | Experiment Container |

**Structure**:
```
experiments/
├── LAB-001/
│   ├── experiment.md
│   ├── runs/
│   ├── evidence/
│   └── impact.md
├── LAB-002/
│   └── ...
```

**Observations**:
- ✅ Correct experiment structure
- ✅ Follows KDE Laboratory model
- ✅ Complete with runs, evidence, conclusions

**Disposition**: Keep as-is; reference model for MCP Laboratory

---

## 4. Non-Laboratory Directories (Informational)

| Path | Purpose | Not a Lab Because |
|------|---------|-------------------|
| `/workspace/project/kde/deployment/mcp/internal/` | MCP Runtime implementation | Implementation code, not experiments |
| `/workspace/project/kde/deployment/mcp/cmd/` | CLI entry points | Deployment code |
| `/workspace/project/kde/deployment/mcp/deploy/` | Deployment configs | Deployment code |

---

## 5. Discrepancy Summary

### 5.1 Active Laboratories

| Location | Status |
|----------|--------|
| `/workspace/project/kde/laboratory/` | ✅ Active - Reference Model |
| `/workspace/project/kde/deployment/mcp/laboratory/` | ⚠️ Active - Needs Refactoring |

### 5.2 Obsolete/To Be Merged

| Location | Disposition |
|----------|-------------|
| `/workspace/project/kde/laboratory/mcp/` | Merge into `/workspace/project/kde/deployment/mcp/laboratory/` |

### 5.3 Not Laboratories

| Location | Classification |
|----------|-----------------|
| `/workspace/project/kde/deployment/mcp/internal/` | Implementation Code |
| `/workspace/project/kde/deployment/mcp/cmd/` | CLI Entry Point |
| `/workspace/project/kde/deployment/mcp/deploy/` | Deployment Config |

---

## 6. Recommended Actions

| Path | Action |
|------|--------|
| `/workspace/project/kde/laboratory/` | Keep as-is |
| `/workspace/project/kde/laboratory/mcp/` | **Delete** after merging contents |
| `/workspace/project/kde/deployment/mcp/laboratory/` | Refactor to match KDE model |
| `/workspace/project/kde/deployment/mcp/internal/` | Keep (correct location) |

---

**Document Status**: INVENTORY COMPLETE  
**Next Step**: Create MIGRATION-PLAN.md
