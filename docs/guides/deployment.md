# KDE Runtime Deployment Guide

**How to install the Knowledge Discovery Engine into your repository**

---

## Overview

This guide explains how to install KDE Runtime into any repository. KDE Runtime brings:
- Evidence-based investigation methodology
- Bootstrap gates for quality control
- Laboratory structure for experiments
- Human oversight at every step

**Time to complete**: ~10 minutes
**Prerequisites**: Git repository, Python 3.8+

---

## What Gets Installed

### Core Components

```
.your-repo/
├── .kde/                          # KDE Runtime (46 files)
│   ├── bootstrap/                  # Bootstrap gates
│   │   ├── gates.py              # Gate verification
│   │   ├── config.yaml           # Configuration
│   │   ├── status.py             # Status tracking
│   │   └── README.md             # Bootstrap docs
│   ├── runtime/                   # Core runtime
│   ├── engines/                   # Investigation engines
│   ├── experts/                   # Domain experts
│   ├── knowledge/                 # Knowledge base
│   ├── governance/                # Policies
│   ├── seeds/                     # Core seeds
│   ├── commands/                  # Commands
│   ├── capabilities/              # Capabilities
│   ├── templates/                 # Templates
│   └── verification/              # Verification
├── laboratory/                    # Project Laboratory
│   ├── BOOTSTRAP.md             # Entry point
│   ├── LABORATORY-RULES.md       # Rules
│   ├── experiments/              # Experiment storage
│   └── ...
├── .openhands/                    # OpenHands Integration
│   └── setup.sh                  # Auto-setup script
```

---

## Deployment Options

### Option A: Quick Install (Recommended for most users)

One-command installation:

```bash
curl -sL https://raw.githubusercontent.com/tamzrod/kde/main/scripts/install-kde.sh | bash
```

### Option B: Manual Install (Full control)

Follow the step-by-step guide below.

### Option C: Template Clone

Clone from KDE template repository:
```bash
git clone -b kde-template https://github.com/tamzrod/kde.git my-kde-setup
```

---

## Step-by-Step Installation

### Step 1: Prepare Your Repository

```bash
# Navigate to your repository
cd /path/to/your/repository

# Verify it's a git repository
git status
```

### Step 2: Create Directory Structure

```bash
# Create KDE directories
mkdir -p .kde/bootstrap
mkdir -p .kde/runtime
mkdir -p .kde/engines
mkdir -p .kde/experts
mkdir -p .kde/knowledge
mkdir -p .kde/governance
mkdir -p .kde/seeds
mkdir -p .kde/commands
mkdir -p .kde/capabilities
mkdir -p .kde/templates
mkdir -p .kde/verification

# Create Laboratory
mkdir -p laboratory/experiments
mkdir -p laboratory/investigations
mkdir -p laboratory/reviews

# Create OpenHands directory
mkdir -p .openhands
```

### Step 3: Copy Bootstrap Files

Create `.kde/bootstrap/gates.py`:

```python
#!/usr/bin/env python3
"""
KDE Bootstrap Gates
Verifies the environment is ready for knowledge discovery.
"""

import os
import sys
import subprocess
import json
from pathlib import Path
from datetime import datetime

def get_project_type():
    """Determine project type from config or file presence."""
    config_path = Path(".kde/bootstrap/config.yaml")
    if config_path.exists():
        try:
            import yaml
            with open(config_path) as f:
                config = yaml.safe_load(f)
                return config.get("project_type", "unknown")
        except:
            pass
    
    # Auto-detect
    if Path("go.mod").exists():
        return "go"
    elif Path("package.json").exists():
        return "node"
    elif Path("requirements.txt").exists() or Path("pyproject.toml").exists():
        return "python"
    return "unknown"

def check_gate_b1():
    """Gate B1: Runtime State Check"""
    checks = {
        "experiments_directory": Path("laboratory/experiments").exists(),
        "bootstrap_config": Path(".kde/bootstrap/config.yaml").exists(),
        "bootstrap_script": Path(".kde/bootstrap/gates.py").exists(),
    }
    passed = all(checks.values())
    return passed, checks

def check_gate_b2():
    """Gate B2: Git State Check"""
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--oneline"],
            capture_output=True, text=True, timeout=5
        )
        return result.returncode == 0, {"git_available": True}
    except Exception as e:
        return False, {"git_available": False, "error": str(e)}

def check_gate_b3():
    """Gate B3: Python Runtime Check"""
    version = sys.version_info
    return version.major >= 3 and version.minor >= 8, {"python_version": f"{version.major}.{version.minor}"}

def run_gates(project_type=None):
    """Run all bootstrap gates"""
    if project_type is None:
        project_type = get_project_type()
    
    print("=" * 60)
    print("KDE BOOTSTRAP GATE VERIFICATION")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print(f"Project Type: {project_type}")
    print("=" * 60)
    
    b1_passed, b1_details = check_gate_b1()
    b2_passed, b2_details = check_gate_b2()
    b3_passed, b3_details = check_gate_b3()
    
    print(f"\n--- Gate B1 ---")
    for name, passed in b1_details.items():
        print(f"  [{'✓' if passed else '✗'}] {name}: {'PASSED' if passed else 'FAILED'}")
    
    print(f"\n--- Gate B2 ---")
    for name, passed in b2_details.items():
        val = "PASSED" if passed else "FAILED"
        print(f"  [{'✓' if passed else '✗'}] {name}: {val}")
    
    print(f"\n--- Gate B3 ---")
    for name, val in b3_details.items():
        print(f"  [✓] {name}: {val}")
    
    all_passed = b1_passed and b2_passed and b3_passed
    print(f"\n{'=' * 60}")
    print(f"RESULT: {'PASSED' if all_passed else 'FAILED'}")
    print(f"Summary: Bootstrap gates verified: {sum([b1_passed, b2_passed, b3_passed])}/3 checks passed.")
    print("=" * 60)
    
    return all_passed

if __name__ == "__main__":
    project_type = None
    if len(sys.argv) > 1 and sys.argv[1] == "--project-type":
        project_type = sys.argv[2] if len(sys.argv) > 2 else None
    
    success = run_gates(project_type)
    sys.exit(0 if success else 1)
```

Create `.kde/bootstrap/config.yaml`:

```yaml
# KDE Bootstrap Configuration
project_type: auto  # auto-detect, or specify: python, go, node

quick_mode: true
strict_mode: true

runtime:
  name: "My Project KDE Runtime"
  version: "1.0.0"
  bootstrap_date: "2026-07-27"

gates:
  b1:
    name: "Runtime State Check"
    required: true
  b2:
    name: "Git State Check"
    required: true
  b3:
    name: "Python Runtime Check"
    required: true
```

### Step 4: Create Laboratory Entry Point

Create `laboratory/BOOTSTRAP.md`:

```markdown
# KDE Laboratory Entry Point

**Status**: READY

---

## Welcome

You have reached the KDE Knowledge Discovery Engine Laboratory.

**STOP**: Do NOT begin planning, exploring, or analyzing.

Read this document completely before proceeding.

---

## ⚠️ Authority Declaration

**CRITICAL**: Before starting ANY task, declare your authority.

| Type | Description | Authority |
|------|-------------|-----------|
| **INVESTIGATE** | Research, analyze, document | Document only. Wait for approval. |
| **IMPLEMENT** | Execute, create, modify | With human approval. |
| **REPORT** | Summarize existing work | Document only. |

---

## Pre-Work Checklist

Before any task:
- [ ] Bootstrap gates passed
- [ ] Task type declared
- [ ] Authority level understood
- [ ] Human approval received (if IMPLEMENT)

If ANY is missing: **STOP and ask**.

---

## Laboratory Rules

| Rule | Description |
|------|-------------|
| 1. No Auto-Continuation | Wait for human authorization |
| 2. No Self-Approval | Never approve your own work |
| 3. No Self-Promotion | Never promote without approval |
| 4. Distinguish Evidence | Mark fact vs. conclusion |
| 5. Evidence-Based Changes | Justify all claims |

---

## Verify Installation

Run: `python3 .kde/bootstrap/gates.py`

Expected: `RESULT: PASSED`
```

Create `laboratory/LABORATORY-RULES.md`:

```markdown
# Laboratory Rules

**Version**: 1.0.0
**Date**: 2026-07-27

---

## Core Rules

### Rule 1: No Auto-Continuation

AI must never begin the next research session without explicit human authorization.

### Rule 2: No Self-Approval

AI must never approve its own work.

### Rule 3: No Self-Promotion

AI must never promote knowledge to production without human approval.

### Rule 4: Distinguish Evidence

AI must clearly mark:
- **Fact**: Verified information with source
- **Conclusion**: Logical inference from evidence
- **Speculation**: Hypothesis without evidence

### Rule 5: Evidence-Based Changes

All claims must be justified by evidence. Assertions without sources are not permitted.

---

## Violations

If a rule is violated, document in `laboratory/violations/VIO-XXX/`.
```

### Step 5: Create Core Seed

Create `seeds/seed-001/principles/5-principles.md`:

```markdown
# The Five Core Principles

**Seed ID**: SEED-001
**Version**: 1.0.0
**Status**: FOUNDATIONAL

---

## The Five Principles

### Principle 1: No Auto-Continuation
AI must never begin the next research session without explicit human authorization.

### Principle 2: No Self-Approval
AI must never approve its own work.

### Principle 3: No Self-Promotion
AI must never promote knowledge without human approval.

### Principle 4: Distinguish Evidence
AI must clearly mark fact vs. conclusion vs. speculation.

### Principle 5: Evidence-Based Changes
All claims must be justified by evidence.

---

**This seed is immutable. Do not modify.**
```

### Step 6: Create OpenHands Integration (Optional)

Create `.openhands/setup.sh`:

```bash
#!/bin/bash
# KDE Runtime Bootstrap Setup
# Runs automatically when OpenHands conversation starts

set -e

echo "=========================================="
echo "KDE Runtime Bootstrap Setup"
echo "=========================================="

# Install PyYAML if not present
if ! python3 -c "import yaml" 2>/dev/null; then
    echo "[1/3] Installing PyYAML..."
    pip install pyyaml --quiet
    echo "      PyYAML installed"
else
    echo "[1/3] PyYAML already installed"
fi

# Detect project type
if [ -f "go.mod" ]; then
    echo "[2/3] Go project detected"
    if ! command -v go &> /dev/null; then
        echo "      Warning: Go not installed"
    fi
elif [ -f "package.json" ]; then
    echo "[2/3] Node project detected"
elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    echo "[2/3] Python project detected"
else
    echo "[2/3] Project type: unknown"
fi

# Run bootstrap gates
echo "[3/3] Running KDE Bootstrap Gates..."
python3 .kde/bootstrap/gates.py --project-type auto || true

echo ""
echo "=========================================="
echo "Runtime ready for investigation."
echo "=========================================="
```

Make it executable:
```bash
chmod +x .openhands/setup.sh
```

### Step 7: Update .gitignore

Add to `.gitignore`:

```gitignore
# KDE runtime state
.kde/runtime/state.json
.kde/runtime/.lock

# Python cache
__pycache__/
*.pyc
```

---

## Verify Installation

### Run Bootstrap Gates

```bash
python3 .kde/bootstrap/gates.py
```

Expected output:
```
======================================================================
KDE BOOTSTRAP GATE VERIFICATION
======================================================================
--- Gate B1 ---
  [✓] experiments_directory: PASSED
  [✓] bootstrap_config: PASSED
  [✓] bootstrap_script: PASSED
--- Gate B2 ---
  [✓] git_available: PASSED
--- Gate B3 ---
  [✓] python_version: 3.13
======================================================================
RESULT: PASSED
======================================================================
```

### Verify Laboratory

```bash
# Check laboratory structure
ls laboratory/
# Should show: BOOTSTRAP.md, LABORATORY-RULES.md, experiments/

# Check seed
ls seeds/seed-001/principles/
# Should show: 5-principles.md
```

---

## Project-Specific Customization

### For Go Projects

Update `.kde/bootstrap/config.yaml`:

```yaml
project_type: go
```

Add to `.openhands/setup.sh`:
```bash
# Install Go if not present
if ! command -v go &> /dev/null; then
    echo "Installing Go..."
    # Add Go installation steps
fi

# Download dependencies
if [ -f "go.mod" ]; then
    go mod download
fi
```

### For Node Projects

Update `.kde/bootstrap/config.yaml`:
```yaml
project_type: node
```

### For Python Projects

Update `.kde/bootstrap/config.yaml`:
```yaml
project_type: python
```

---

## Troubleshooting

### Gates Failing

| Gate | Common Issue | Solution |
|------|-------------|----------|
| B1 | Missing directories | Run Step 2 again |
| B2 | Not a git repo | Run `git init` |
| B3 | Python too old | Upgrade to Python 3.8+ |

### OpenHands Not Running Setup

Ensure `.openhands/setup.sh` is executable:
```bash
chmod +x .openhands/setup.sh
```

### PyYAML Not Found

Install manually:
```bash
pip install pyyaml
```

---

## Next Steps

1. **Read** `laboratory/BOOTSTRAP.md`
2. **Understand** `laboratory/LABORATORY-RULES.md`
3. **Learn** `seeds/seed-001/principles/5-principles.md`
4. **Start** your first investigation in `laboratory/experiments/`

---

## Uninstallation

To remove KDE from your repository:

```bash
# Remove KDE directories
rm -rf .kde/
rm -rf laboratory/
rm -rf .openhands/

# Remove from .gitignore
# (Manual edit required)
```

---

## Support

- See [KDE Integration Guide](./integration.md) for more details
- See [Contributing Guide](./contributing.md) for collaboration
- Report issues to the KDE repository
