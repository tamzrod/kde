# MCP Laboratory Migration Plan

**Document Version**: 1.0  
**Date**: 2026-07-19  
**Status**: MIGRATION PLAN (Draft)

---

## 1. Purpose

This document details the migration of the MCP Laboratory from its current inconsistent structure to one that aligns with the KDE Laboratory architecture.

---

## 2. Current State

```
CURRENT STRUCTURE:

/workspace/project/kde/
├── laboratory/                         # KDE Laboratory (Reference)
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── GOVERNANCE.md
│   ├── registry.md
│   ├── experiments/                   # KDE Experiments
│   │   ├── LAB-001/...
│   │   └── LAB-010/
│   └── templates/
│       └── *.md templates
│
└── deployment/
    └── mcp/
        ├── cmd/                       # CLI (Implementation - Correct Location)
        ├── internal/                  # Runtime (Implementation - Correct Location)
        ├── deploy/                    # Deploy (Implementation - Correct Location)
        └── laboratory/                # MCP Laboratory (Needs Refactoring)
            ├── client/                # Test client
            ├── scenarios/             # Test scenarios
            ├── fixtures/             # Test fixtures
            ├── main_test.go
            └── run_tests.sh

/workspace/project/kde/laboratory/
└── mcp/                               # MCP Documentation (Obsolete)
    ├── README.md
    ├── 008-Local-Execution.md
    ├── 009-Repository-Layout.md
    └── 010-Development-Roadmap.md
```

---

## 3. Target State

```
TARGET STRUCTURE:

/workspace/project/kde/
├── laboratory/                         # KDE Laboratory (Unchanged)
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── GOVERNANCE.md
│   ├── registry.md
│   ├── experiments/
│   └── templates/
│
└── deployment/
    └── mcp/
        ├── cmd/                        # CLI (Unchanged)
        ├── internal/                   # Runtime (Unchanged)
        ├── deploy/                     # Deploy (Unchanged)
        │
        └── laboratory/                 # MCP Laboratory (Refactored)
            ├── README.md               # Laboratory overview
            ├── ARCHITECTURE.md         # Architecture specification
            ├── GOVERNANCE.md           # Governance protocols
            ├── OPERATING-RULES.md      # Operating procedures
            ├── registry.md             # Experiment registry
            │
            ├── templates/              # Experiment templates
            │   ├── experiment-template.md
            │   ├── run-template.md
            │   └── evidence-reference-template.md
            │
            ├── experiments/            # MCP Experiments
            │   └── MCP-001/            # Inventory Management Experiment
            │       ├── experiment.md
            │       ├── runs/
            │       ├── evidence/
            │       ├── fixtures/
            │       ├── scenarios/
            │       ├── client/
            │       ├── conclusions.md
            │       └── impact.md
            │
            └── knowledge/              # MCP-specific knowledge (if any)
```

---

## 4. Migration Items

### 4.1 Item 1: Migrate Documentation

| Attribute | Value |
|-----------|-------|
| **Current Location** | `/workspace/project/kde/laboratory/mcp/` |
| **Target Location** | `/workspace/project/kde/deployment/mcp/laboratory/` |
| **Reason** | Consolidate MCP Laboratory into single canonical location |
| **Risk** | Low - Pure documentation files |
| **Rollback Strategy** | Copy files back to original location |

**Files to Migrate**:
- `laboratory/mcp/README.md` → `deployment/mcp/laboratory/README.md`
- `laboratory/mcp/008-Local-Execution.md` → `deployment/mcp/laboratory/experiments/MCP-001/`
- `laboratory/mcp/009-Repository-Layout.md` → `deployment/mcp/laboratory/`
- `laboratory/mcp/010-Development-Roadmap.md` → `deployment/mcp/laboratory/`

---

### 4.2 Item 2: Restructure Experiments

| Attribute | Value |
|-----------|-------|
| **Current Location** | `/workspace/project/kde/deployment/mcp/laboratory/` (flat) |
| **Target Location** | `/workspace/project/kde/deployment/mcp/laboratory/experiments/MCP-001/` |
| **Reason** | Align with KDE Laboratory experiment structure |
| **Risk** | Medium - Directory restructuring |
| **Rollback Strategy** | Move files back to original location |

**Files to Migrate**:
- `deployment/mcp/laboratory/client/` → `deployment/mcp/laboratory/experiments/MCP-001/client/`
- `deployment/mcp/laboratory/scenarios/` → `deployment/mcp/laboratory/experiments/MCP-001/scenarios/`
- `deployment/mcp/laboratory/fixtures/` → `deployment/mcp/laboratory/experiments/MCP-001/fixtures/`
- `deployment/mcp/laboratory/main_test.go` → `deployment/mcp/laboratory/experiments/MCP-001/`
- `deployment/mcp/laboratory/run_tests.sh` → `deployment/mcp/laboratory/experiments/MCP-001/`

---

### 4.3 Item 3: Add Governance Documents

| Attribute | Value |
|-----------|-------|
| **Current Location** | N/A (does not exist) |
| **Target Location** | `/workspace/project/kde/deployment/mcp/laboratory/` |
| **Reason** | Complete governance infrastructure |
| **Risk** | Low - New files |
| **Rollback Strategy** | Delete files |

**Files to Create**:
- `deployment/mcp/laboratory/GOVERNANCE.md`
- `deployment/mcp/laboratory/OPERATING-RULES.md`
- `deployment/mcp/laboratory/registry.md`
- `deployment/mcp/laboratory/ARCHITECTURE.md` (updated)
- `deployment/mcp/laboratory/templates/experiment-template.md`
- `deployment/mcp/laboratory/templates/run-template.md`
- `deployment/mcp/laboratory/templates/evidence-reference-template.md`
- `deployment/mcp/laboratory/experiments/MCP-001/experiment.md`
- `deployment/mcp/laboratory/experiments/MCP-001/conclusions.md`
- `deployment/mcp/laboratory/experiments/MCP-001/impact.md`

---

### 4.4 Item 4: Delete Obsolete Directory

| Attribute | Value |
|-----------|-------|
| **Current Location** | `/workspace/project/kde/laboratory/mcp/` |
| **Target Location** | N/A (delete) |
| **Reason** | Consolidate to single MCP Laboratory location |
| **Risk** | Medium - Deletion of files |
| **Rollback Strategy** | Restore from git |

**Action**: Delete `/workspace/project/kde/laboratory/mcp/` after migration

---

## 5. Migration Order

```
PHASE 1: Preparation
├── Step 1.1: Create MIGRATION-PLAN.md (this document)
├── Step 1.2: Review and approve plan
└── Step 1.3: Backup repository

PHASE 2: Create New Structure
├── Step 2.1: Create /experiments/ directory
├── Step 2.2: Create /templates/ directory
├── Step 2.3: Create /knowledge/ directory

PHASE 3: Migrate Documentation
├── Step 3.1: Migrate README.md
├── Step 3.2: Migrate 008-Local-Execution.md
├── Step 3.3: Migrate 009-Repository-Layout.md
├── Step 3.4: Migrate 010-Development-Roadmap.md
└── Step 3.5: Update documentation references

PHASE 4: Restructure Experiments
├── Step 4.1: Create MCP-001 experiment directory
├── Step 4.2: Move client/ to MCP-001/client/
├── Step 4.3: Move scenarios/ to MCP-001/scenarios/
├── Step 4.4: Move fixtures/ to MCP-001/fixtures/
├── Step 4.5: Move main_test.go to MCP-001/
├── Step 4.6: Move run_tests.sh to MCP-001/
└── Step 4.7: Create experiment.md, conclusions.md, impact.md

PHASE 5: Add Governance
├── Step 5.1: Create GOVERNANCE.md
├── Step 5.2: Create OPERATING-RULES.md
├── Step 5.3: Create registry.md
├── Step 5.4: Create ARCHITECTURE.md (updated)
├── Step 5.5: Create templates/
└── Step 5.6: Create experiment.md for MCP-001

PHASE 6: Cleanup
├── Step 6.1: Delete laboratory/mcp/ directory
└── Step 6.2: Update all references

PHASE 7: Validation
├── Step 7.1: Verify build
├── Step 7.2: Verify tests
├── Step 7.3: Verify documentation links
└── Step 7.4: Create MIGRATION-REPORT.md
```

---

## 6. Rollback Strategy

### 6.1 Git Rollback

```bash
# Full rollback to pre-migration state
git checkout HEAD -- .
git clean -fd
```

### 6.2 Selective Rollback

For individual items:
```bash
# Rollback specific file
git checkout HEAD -- <file>

# Rollback specific directory
git checkout HEAD -- <directory>/
```

### 6.3 Recovery from Backup

Before migration, create a backup tag:
```bash
git tag pre-migration-backup
```

---

## 7. Verification Checklist

- [ ] All files migrated to correct locations
- [ ] No files remain in obsolete locations
- [ ] Governance documents created
- [ ] Templates created
- [ ] Experiment structure implemented
- [ ] Documentation links updated
- [ ] Build verified (Go code still compiles)
- [ ] Tests still run
- [ ] No broken links

---

**Document Status**: MIGRATION PLAN COMPLETE  
**Next Step**: Execute migration
