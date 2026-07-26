# Integrating KDE into Your Repository

**How to add the Knowledge Discovery Engine to any project**

---

## When to Use This Guide

You want to add KDE to your repository when:

- You work with AI agents on research or investigation tasks
- You need structured, evidence-based knowledge discovery
- You want human oversight of AI-generated conclusions
- You need reproducible research workflows

---

## Prerequisites

Before integrating KDE, ensure you have:

- A Git repository (local or on GitHub/GitLab/Bitbucket)
- Python 3.8+ installed (for bootstrap gates)
- Basic familiarity with your repository structure
- Understanding of your research or investigation workflow

---

## Integration Options

KDE can be integrated at three levels:

| Level | Components | Complexity | Use Case |
|--------|-----------|------------|----------|
| **Basic** | Bootstrap + Rules + One Seed | Low | Personal projects |
| **Standard** | Basic + Experiments + Governance | Medium | Team projects |
| **Full** | Standard + Engines + Knowledge | High | Research organizations |

Choose the level that matches your needs. You can always expand later.

---

## Option 1: Basic Integration

### What You Get

- Bootstrap gates (runtime verification)
- Laboratory rules (human oversight)
- Core seed (immutable principles)

### Steps

#### Step 1: Create the Directory Structure

Create these directories in your repository:

```bash
mkdir -p .kde/bootstrap
mkdir -p laboratory/experiments
mkdir -p seeds/seed-001/principles
```

#### Step 2: Copy Bootstrap Files

Create `.kde/bootstrap/gates.py` with the following:

```python
#!/usr/bin/env python3
"""
KDE Bootstrap Gates
Verifies the environment is ready for knowledge discovery.
"""

import os
import sys
import subprocess
from pathlib import Path

def check_gate_b1():
    """Gate B1: Runtime State Check"""
    checks = {
        "experiments_directory": Path("laboratory/experiments").exists(),
        "seeds_directory": Path("seeds/seed-001").exists(),
        "bootstrap_config": Path(".kde/bootstrap/config.yaml").exists(),
    }
    return all(checks.values()), checks

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

def run_gates():
    """Run all bootstrap gates"""
    print("=" * 60)
    print("KDE BOOTSTRAP GATE VERIFICATION")
    print("=" * 60)
    
    b1_passed, b1_details = check_gate_b1()
    b2_passed, b2_details = check_gate_b2()
    b3_passed, b3_details = check_gate_b3()
    
    print(f"\n--- Gate B1 ---")
    print(f"  [✓] experiments_directory: {'PASSED' if b1_details['experiments_directory'] else 'FAILED'}")
    print(f"  [✓] seeds_directory: {'PASSED' if b1_details['seeds_directory'] else 'FAILED'}")
    print(f"  [✓] bootstrap_config: {'PASSED' if b1_details['bootstrap_config'] else 'FAILED'}")
    
    print(f"\n--- Gate B2 ---")
    print(f"  [✓] git_available: {'PASSED' if b2_details.get('git_available') else 'FAILED'}")
    
    print(f"\n--- Gate B3 ---")
    print(f"  [✓] python_runtime: {'PASSED' if b3_passed else 'FAILED'}")
    
    all_passed = b1_passed and b2_passed and b3_passed
    print(f"\n{'RESULT: PASSED' if all_passed else 'RESULT: FAILED'}")
    print("=" * 60)
    
    return all_passed

if __name__ == "__main__":
    success = run_gates()
    sys.exit(0 if success else 1)
```

Create `.kde/bootstrap/config.yaml`:

```yaml
# KDE Bootstrap Configuration
project_type: python
quick_mode: true
strict_mode: true

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

#### Step 3: Create Laboratory Entry Point

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

## Before You Begin

### Laboratory Rules

Every agent must acknowledge these rules:

| Rule | Description |
|------|-------------|
| **1. No Auto-Continuation** | Wait for human authorization before next session |
| **2. No Self-Approval** | Never approve your own work |
| **3. No Self-Promotion** | Never promote knowledge without human approval |
| **4. Distinguish Evidence** | Mark fact vs. conclusion vs. speculation |
| **5. Evidence-Based Changes** | Justify all claims with evidence |

### Bootstrap Gates

Before starting any investigation, verify:

- [ ] `python3 .kde/bootstrap/gates.py` passes
- [ ] Laboratory rules acknowledged
- [ ] Human authorization received

---

## Ready to Begin?

If all gates pass and rules acknowledged, you may proceed with your investigation.

**Remember**: Human authorization required for each research session.
```

#### Step 4: Create Core Seed

Create `seeds/seed-001/principles/5-principles.md`:

```markdown
# The Five Core Principles

**Seed ID**: SEED-001
**Version**: 1.0.0
**Status**: FOUNDATIONAL

---

## Overview

These five principles govern how AI agents operate within KDE.

---

## The Five Principles

### Principle 1: No Auto-Continuation

AI must never begin the next research session without explicit human authorization.

### Principle 2: No Self-Approval

AI must never approve its own work.

### Principle 3: No Self-Promotion

AI must never promote knowledge to production without human approval.

### Principle 4: Distinguish Evidence

AI must clearly mark:
- **Fact**: Verified information with source
- **Conclusion**: Logical inference from evidence
- **Speculation**: Hypothesis without evidence

### Principle 5: Evidence-Based Changes

All claims must be justified by evidence. Assertions without sources are not permitted.

---

**This seed is immutable. Do not modify after creation.**
```

#### Step 5: Add to .gitignore

Add these to your `.gitignore`:

```gitignore
# KDE runtime state
.kde/runtime/state.json
.kde/runtime/.lock

# Experiment outputs (optional)
laboratory/experiments/*/output/
laboratory/experiments/*/.cache/
```

---

## Option 2: Standard Integration

Adds experiments and governance to Basic.

### Additional Components

- `laboratory/experiments/` - Structured experiment storage
- `laboratory/RULES.md` - Detailed rules
- `governance/` - Policy documents

### Additional Steps

#### Step 1: Create Experiment Template

Create `laboratory/experiments/TEMPLATE/INVESTIGATION.md`:

```markdown
# Investigation Template

**Investigation ID**: INV-XXX
**Date**: YYYY-MM-DD
**Status**: IN_PROGRESS

---

## Objective

What are you trying to discover or verify?

---

## Bootstrap Gate Results

| Gate | Check | Result |
|------|-------|--------|
| B1 | Runtime state | ⏳ PENDING |
| B1 | Experiments directory | ⏳ PENDING |
| B1 | Laboratory rules | ⏳ PENDING |

---

## Investigation Process

### Phase 1: Define Question

What question are you investigating?

### Phase 2: Gather Evidence

What evidence have you found?

### Phase 3: Analysis

What does the evidence suggest?

### Phase 4: Conclusions

What can you confidently conclude?

---

## Status

- [ ] Bootstrap gates verified
- [ ] Question defined
- [ ] Evidence gathered
- [ ] Analysis complete
- [ ] Conclusions documented

**Status**: IN_PROGRESS
```

---

## Option 3: Full Integration

Adds engines and knowledge repository. See the KDE repository for full implementation.

---

## Verification

After integration, verify everything works:

```bash
# Run bootstrap gates
python3 .kde/bootstrap/gates.py
```

Expected output:
```
======================================================================
KDE BOOTSTRAP GATE VERIFICATION
======================================================================
--- Gate B1 ---
  [✓] experiments_directory: PASSED
  [✓] seeds_directory: PASSED
  [✓] bootstrap_config: PASSED
--- Gate B2 ---
  [✓] git_available: PASSED
--- Gate B3 ---
  [✓] python_runtime: PASSED
======================================================================
RESULT: PASSED
======================================================================
```

---

## Next Steps

After integration:

1. **Read** the Laboratory Rules (`laboratory/BOOTSTRAP.md`)
2. **Understand** the Core Principles (`seeds/seed-001/principles/5-principles.md`)
3. **Configure** your AI agent to acknowledge rules before work
4. **Begin** your first investigation in `laboratory/experiments/`

---

## Troubleshooting

### Gates failing?

| Gate | Common Issues | Solutions |
|------|--------------|-----------|
| B1 | Missing directories | Create required directories |
| B2 | Not a git repo | Initialize git: `git init` |
| B3 | Python too old | Upgrade Python to 3.8+ |

### Questions?

- See [Contributing Guide](./contributing.md)
- See [How Investigations Work](./investigations.md)

---

## Related Documentation

- [Quick Start Guide](../getting-started/quick-start.md)
- [Concepts](../getting-started/concepts.md)
- [How Investigations Work](./investigations.md)
- [Contributing Guide](./contributing.md)
