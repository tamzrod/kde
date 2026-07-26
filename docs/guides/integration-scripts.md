# KDE Integration Scripts

**Quick-start scripts for integrating KDE into your repository**

---

## One-Command Integration

For the fastest integration, run this in your repository root:

```bash
curl -sL https://raw.githubusercontent.com/tamzrod/kde/main/scripts/integrate-kde.sh | bash
```

This creates the complete Basic integration structure automatically.

---

## Manual Integration Script

If you prefer to do it manually step by step, copy and run this script:

```bash
#!/bin/bash
# kde-basic-integration.sh
# Creates basic KDE integration in current directory

set -e

echo "KDE Basic Integration"
echo "====================="
echo ""

# Create directories
echo "Creating directories..."
mkdir -p .kde/bootstrap
mkdir -p laboratory/experiments
mkdir -p seeds/seed-001/principles
mkdir -p engines

# Create bootstrap gates.py
echo "Creating bootstrap/gates.py..."
cat > .kde/bootstrap/gates.py << 'GATESEOF'
#!/usr/bin/env python3
"""KDE Bootstrap Gates - Verifies environment readiness."""

import os, sys, subprocess
from pathlib import Path

def check_gate_b1():
    return all([
        Path("laboratory/experiments").exists(),
        Path("seeds/seed-001").exists(),
        Path(".kde/bootstrap/config.yaml").exists(),
    ])

def check_gate_b2():
    try:
        result = subprocess.run(["git", "log", "-1", "--oneline"], 
            capture_output=True, text=True, timeout=5)
        return result.returncode == 0
    except:
        return False

def check_gate_b3():
    return sys.version_info.major >= 3 and sys.version_info.minor >= 8

def main():
    print("=" * 60)
    print("KDE BOOTSTRAP GATE VERIFICATION")
    print("=" * 60)
    print(f"Python: {sys.version_info.major}.{sys.version_info.minor}")
    
    b1 = check_gate_b1()
    b2 = check_gate_b2()
    b3 = check_gate_b3()
    
    print(f"\n--- Gate B1 ---")
    print(f"  [✓] Runtime state: {'PASSED' if b1 else 'FAILED'}")
    print(f"\n--- Gate B2 ---")
    print(f"  [✓] Git state: {'PASSED' if b2 else 'FAILED'}")
    print(f"\n--- Gate B3 ---")
    print(f"  [✓] Python runtime: {'PASSED' if b3 else 'FAILED'}")
    
    all_passed = b1 and b2 and b3
    print(f"\nRESULT: {'PASSED' if all_passed else 'FAILED'}")
    print("=" * 60)
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
GATESEOF
chmod +x .kde/bootstrap/gates.py

# Create config.yaml
echo "Creating bootstrap/config.yaml..."
cat > .kde/bootstrap/config.yaml << 'CONFIGEOF'
# KDE Bootstrap Configuration
project_type: python
quick_mode: true
strict_mode: true
CONFIGEOF

# Create BOOTSTRAP.md
echo "Creating laboratory/BOOTSTRAP.md..."
cat > laboratory/BOOTSTRAP.md << 'BOOTSTRAPEOF'
# KDE Laboratory Entry Point

**Status**: READY

---

## Welcome

You have reached the KDE Knowledge Discovery Engine Laboratory.

**STOP**: Read this document completely before proceeding.

## Laboratory Rules

| Rule | Description |
|------|-------------|
| 1. No Auto-Continuation | Wait for human authorization |
| 2. No Self-Approval | Never approve your own work |
| 3. No Self-Promotion | Never promote without approval |
| 4. Distinguish Evidence | Mark fact vs. conclusion |
| 5. Evidence-Based Changes | Justify all claims |

## Bootstrap Verification

Before starting: Run `python3 .kde/bootstrap/gates.py`
BOOTSTRAPEOF

# Create 5-principles.md
echo "Creating seeds/seed-001/principles/5-principles.md..."
cat > seeds/seed-001/principles/5-principles.md << 'PRINCIPLESEOF'
# The Five Core Principles

**Seed ID**: SEED-001 | **Status**: FOUNDATIONAL

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
PRINCIPLESEOF

# Update .gitignore
echo "Updating .gitignore..."
if [ ! -f .gitignore ]; then
    touch .gitignore
fi

if ! grep -q "# KDE" .gitignore 2>/dev/null; then
    cat >> .gitignore << 'GITIGNOREEOF'

# KDE runtime state
.kde/runtime/state.json
.kde/runtime/.lock
GITIGNOREEOF
fi

echo ""
echo "Integration complete!"
echo ""
echo "Next steps:"
echo "1. Read: laboratory/BOOTSTRAP.md"
echo "2. Read: seeds/seed-001/principles/5-principles.md"
echo "3. Verify: python3 .kde/bootstrap/gates.py"
echo "4. Begin: Create your first investigation"
BOOTSTRAPEOF

# Make executable
chmod +x kde-basic-integration.sh

echo ""
echo "Integration script created: kde-basic-integration.sh"
echo "Run with: bash kde-basic-integration.sh"
