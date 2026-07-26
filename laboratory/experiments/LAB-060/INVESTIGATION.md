# LAB-060: KDE Installation in External Repositories Investigation

**Experiment ID**: LAB-060
**Date**: 2026-07-26
**Status**: IN_PROGRESS
**Authority**: INVESTIGATE (explicit human request)

---

## Objective

Investigate how KDE was installed in tamzrod/dnp3 repository, which already has KDE runtime integrated. Understand the pattern for future KDE installation in other repositories.

**Context**: Known coding agent is OpenHands. User wants to understand the installation pattern.

---

## Bootstrap Gate Results

| Gate | Check | Result |
|------|-------|--------|
| B1 | Runtime state | ✓ PASSED |
| B1 | Experiments directory | ✓ PASSED |
| B1 | Laboratory rules | ✓ PASSED |
| B2 | Git log check | ✓ PASSED |
| B2 | Git status check | ✓ PASSED |
| B3 | Python runtime | ✓ PASSED |

---

## Case Study: tamzrod/dnp3 Installation

### Repository Overview

| Property | Value |
|----------|-------|
| **Repository** | tamzrod/dnp3 |
| **Default Branch** | main |
| **Language** | Go |
| **KDE Installed** | Yes (2026-07-25) |

### Files Installed in dnp3

```
tamzrod/dnp3/
├── .kde/                    # Complete KDE Runtime
│   ├── bootstrap/            # Bootstrap gates
│   ├── runtime/              # Core runtime
│   ├── engines/              # Engines
│   ├── experts/              # Experts
│   ├── knowledge/            # Knowledge base
│   ├── governance/           # Governance
│   ├── seeds/                # Seeds
│   ├── commands/             # Commands
│   ├── capabilities/         # Capabilities
│   ├── templates/            # Templates
│   ├── verification/         # Verification
│   └── laboratory/           # Laboratory structure
├── .openhands/
│   └── setup.sh              # OpenHands setup script
├── laboratory/               # Project laboratory
├── KDE-BOOTSTRAP-REPORT.md   # Installation report
```

### Installation Source

From `KDE-BOOTSTRAP-REPORT.md`:

| Property | Value |
|----------|-------|
| **Source Repository** | tamzrod/dnp3influxdatalogger |
| **Source Branch** | bootstrap-template |
| **Bootstrap Version** | 1.0.0 |
| **Installation Date** | 2026-07-25 |
| **Files Installed** | 46 files |

---

## OpenHands Integration Pattern

### .openhands/setup.sh

This script runs **automatically** when OpenHands conversation starts:

```bash
#!/bin/bash
# KDE Runtime Bootstrap Setup
# Runs automatically at OpenHands conversation start

# 1. Install PyYAML (required for KDE Runtime)
pip install pyyaml --quiet

# 2. Install Go toolchain (project-specific)
# Download and install Go 1.22.5

# 3. Download Go module dependencies
go mod download

# 4. Run KDE bootstrap gates
python3 .kde/bootstrap/gates.py --project-type go
```

### How It Works

| Step | Action | Purpose |
|------|--------|---------|
| 1 | Change to project directory | Ensures correct working directory |
| 2 | Install PyYAML | Required for KDE runtime |
| 3 | Install Go | Project dependency |
| 4 | Download dependencies | Prepare build environment |
| 5 | Run bootstrap gates | Verify KDE readiness |

---

## KDE Installation Pattern Discovered

### For Go Projects

```bash
# Pattern from tamzrod/dnp3
/workspace/project/dnp3   # Project directory
  ├── .kde/              # KDE Runtime (from template)
  ├── .openhands/
  │   └── setup.sh        # OpenHands auto-run script
  ├── laboratory/         # Project laboratory
  └── (project files)
```

### For Python Projects

Would need similar structure:
```bash
/workspace/project/python-project
  ├── .kde/              # KDE Runtime
  ├── .openhands/
  │   └── setup.sh       # Python version setup
  ├── laboratory/         # Project laboratory
  └── (project files)
```

---

## Key Files for KDE Installation

### Required for Any Project

| File | Purpose |
|------|---------|
| `.kde/bootstrap/gates.py` | Bootstrap gate verification |
| `.kde/bootstrap/config.yaml` | Bootstrap configuration |
| `laboratory/BOOTSTRAP.md` | Laboratory entry point |
| `laboratory/LABORATORY-RULES.md` | Laboratory rules |
| `seeds/seed-001/` | Core seed |

### Required for OpenHands

| File | Purpose |
|------|---------|
| `.openhands/setup.sh` | Auto-run at OpenHands start |

### Optional but Recommended

| File | Purpose |
|------|---------|
| `KDE-BOOTSTRAP-REPORT.md` | Installation documentation |
| `AGENTS.md` | Agent context (if needed) |

---

## Installation Workflow

### 1. Prepare KDE Template

Create a `bootstrap-template` branch in KDE source with:
- All `.kde/` files
- All `laboratory/` structure
- `seeds/` directory
- Bootstrap scripts

### 2. Install to Target Repository

```bash
# Clone target repository
git clone https://github.com/user/project.git
cd project

# Copy KDE from template
cp -r /path/to/kde-template/.kde .
cp -r /path/to/kde-template/laboratory .

# Add OpenHands setup
mkdir -p .openhands
cp /path/to/kde-template/.openhands/setup.sh .openhands/

# Update identity
# (Replace template project name with actual project name)
```

### 3. Normalize for Target

From `KDE-BOOTSTRAP-REPORT.md`:

| Step | Action |
|------|--------|
| 1 | Update runtime name |
| 2 | Update project name |
| 3 | Update repository URL |
| 4 | Update naming conventions |
| 5 | Update .gitignore |

---

## Findings Summary

### How dnp3 Has KDE

1. **KDE Runtime**: Full `.kde/` directory installed
2. **Laboratory**: Project-specific `laboratory/` directory
3. **OpenHands**: `.openhands/setup.sh` for auto-initialization
4. **Bootstrap Gates**: Working for Go project type
5. **Documentation**: `KDE-BOOTSTRAP-REPORT.md` records installation

### What Makes It Work for OpenHands

| Component | Purpose |
|-----------|---------|
| `.openhands/setup.sh` | Runs automatically at OpenHands start |
| `gates.py --project-type go` | Verifies Go environment |
| `pip install pyyaml` | Installs KDE dependencies |
| `laboratory/` | Contains project-specific investigations |

### Key Insight

**The pattern is NOT just files—it's a bootstrap chain:**

```
OpenHands start
    ↓
openhands/setup.sh runs
    ↓
Install dependencies (PyYAML, Go)
    ↓
Run KDE bootstrap gates
    ↓
Verify laboratory exists
    ↓
Ready for investigation
```

---

## Recommendations

| ID | Recommendation | Priority |
|----|---------------|----------|
| R1 | Document KDE installation pattern | HIGH |
| R2 | Create installation script/template | HIGH |
| R3 | Add AGENTS.md for agent context | MEDIUM |
| R4 | Create bootstrap-template branch | HIGH |

---

## Awaiting Approval

**Current Status**: Investigation complete, patterns identified

**Key Finding**: KDE installation in dnp3 works because:
1. `.openhands/setup.sh` runs automatically on OpenHands start
2. Dependencies (PyYAML) are installed
3. Bootstrap gates verify environment
4. Laboratory structure is in place

**Recommended next steps**:
1. Document the installation pattern
2. Create reusable installation script
3. Add agent context (AGENTS.md)

**Please approve to proceed.**

---

**Status**: COMPLETED (investigation only, awaiting approval for recommendations)
**Author**: OpenHands Agent
**Date**: 2026-07-26
