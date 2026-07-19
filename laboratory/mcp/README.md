# MCP Laboratory (Deprecated)

**⚠️ This directory is DEPRECATED**

The MCP Laboratory has been refactored. All content has been migrated to:

```
/workspace/project/kde/deployment/mcp/laboratory/
```

### What Changed

| Old Location | New Location |
|-------------|--------------|
| `laboratory/mcp/` | `deployment/mcp/laboratory/` |
| `laboratory/mcp/README.md` | `deployment/mcp/laboratory/README.md` |
| `laboratory/mcp/008-*.md` | `deployment/mcp/laboratory/` |
| `laboratory/mcp/009-*.md` | `deployment/mcp/laboratory/` |
| `laboratory/mcp/010-*.md` | `deployment/mcp/laboratory/` |

### New Structure

The MCP Laboratory now follows the KDE Laboratory architecture:

```
deployment/mcp/laboratory/
├── README.md                  # Laboratory overview
├── ARCHITECTURE.md           # Architecture specification
├── GOVERNANCE.md             # Governance protocols
├── OPERATING-RULES.md        # Operating procedures
├── registry.md               # Experiment registry
├── templates/                # Experiment templates
└── experiments/
    └── MCP-001/              # Inventory Management Experiment
        ├── experiment.md
        ├── runs/
        ├── evidence/
        ├── fixtures/
        ├── scenarios/
        ├── client/
        ├── conclusions.md
        └── impact.md
```

### Why This Change

1. **Single Canonical Location**: One place for the MCP Laboratory
2. **Alignment with KDE Model**: Follows the same architecture as the KDE Laboratory
3. **Proper Governance**: Added governance documents, registry, and templates
4. **Experiment Structure**: Organized as reproducible experiments

---

**This directory will be removed in a future commit.**
