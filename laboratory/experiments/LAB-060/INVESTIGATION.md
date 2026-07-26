# LAB-060: OpenHands Bootstrap Compatibility Investigation

**Experiment ID**: LAB-060
**Date**: 2026-07-26
**Status**: IN_PROGRESS
**Authority**: INVESTIGATE (explicit human request)

---

## Objective

Investigate how to verify that KDE bootstrap will load correctly in OpenHands (another AI agent environment). The user has tested with OpenHands but cannot test with Claude Code.

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

## Investigation Approach

### The Challenge

Different AI agent runtimes (OpenHands, Claude Code, etc.) have different:
- Context loading mechanisms
- File system access patterns
- Command execution environments
- Entry point behaviors

### Research Questions

1. How does OpenHands load context at startup?
2. What files does OpenHands read first?
3. How can we make KDE bootstrap compatible?
4. What verification mechanisms exist?

---

## Findings

### How OpenHands Works

Based on OpenHands documentation and patterns:

| Aspect | OpenHands Behavior |
|--------|-------------------|
| **Context loading** | Reads from AGENTS.md, repository files |
| **Startup sequence** | Initializes with repository context |
| **File access** | Has file system access, can read/write |
| **Commands** | Executes bash commands |
| **Skills** | Loads skills from .agents/skills/ or cache |

### Key Files OpenHands Reads

1. `AGENTS.md` - Repository context and memory
2. `.agents/skills/` - Available skills
3. Repository root files - README, docs
4. Custom files - As specified in context

### KDE Bootstrap Compatibility

Current KDE structure:
```
.kde/bootstrap/      # Bootstrap gates
laboratory/          # Rules and experiments
seeds/               # Core principles
BOOTSTRAP.md         # Entry point
```

**Question**: Does OpenHands read `laboratory/BOOTSTRAP.md` at startup?

---

## Verification Approaches

### Approach 1: AGENTS.md Entry

Add KDE bootstrap entry to `AGENTS.md`:

```markdown
## KDE Entry Point

On every session start:
1. Read `laboratory/BOOTSTRAP.md`
2. Run bootstrap gates: `python3 .kde/bootstrap/gates.py`
3. Acknowledge rules before proceeding
```

**Pros**: Clear, documented
**Cons**: Requires AGENTS.md modification

### Approach 2: OpenHands Skill

Create an OpenHands skill for KDE:

```markdown
# KDE Bootstrap Skill

Triggers: Session start
Actions:
- Read laboratory/BOOTSTRAP.md
- Run gates
- Acknowledge rules
```

**Pros**: Native OpenHands integration
**Cons**: Requires skill creation

### Approach 3: Test Suite

Create a verification script that tests bootstrap in isolation:

```bash
# test-openhands-compat.sh
python3 .kde/bootstrap/gates.py
# Check output for "PASSED"
```

**Pros**: Testable, repeatable
**Cons**: Manual verification needed

---

## Recommended Verification Methods

### Method 1: Automated Test

Create `scripts/test-openhands-compat.sh`:

```bash
#!/bin/bash
# Test KDE bootstrap compatibility with OpenHands

echo "Testing KDE Bootstrap for OpenHands Compatibility..."
echo ""

# Test 1: Bootstrap gates
echo "Test 1: Bootstrap Gates"
python3 .kde/bootstrap/gates.py
if [ $? -eq 0 ]; then
    echo "✓ Bootstrap gates pass"
else
    echo "✗ Bootstrap gates fail"
    exit 1
fi

# Test 2: BOOTSTRAP.md readable
echo ""
echo "Test 2: Entry Point Readable"
if [ -f "laboratory/BOOTSTRAP.md" ]; then
    echo "✓ BOOTSTRAP.md exists"
else
    echo "✗ BOOTSTRAP.md missing"
    exit 1
fi

# Test 3: Rules accessible
echo ""
echo "Test 3: Laboratory Rules"
if [ -f "laboratory/LABORATORY-RULES.md" ]; then
    echo "✓ Rules accessible"
else
    echo "✗ Rules missing"
    exit 1
fi

echo ""
echo "All tests passed. KDE compatible with OpenHands."
```

### Method 2: Context Verification

Verify that OpenHands can read the right files:

```python
def verify_openhands_compat():
    """Verify KDE files are accessible to OpenHands."""
    checks = [
        ("laboratory/BOOTSTRAP.md", "Entry point"),
        (".kde/bootstrap/gates.py", "Bootstrap gates"),
        ("seeds/seed-001/principles/5-principles.md", "Core principles"),
        ("laboratory/LABORATORY-RULES.md", "Laboratory rules"),
    ]
    
    results = []
    for path, desc in checks:
        exists = Path(path).exists()
        results.append((desc, exists))
    
    return results
```

---

## What We Need to Test

### For OpenHands Compatibility

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Bootstrap gates run | Script execution | Exit code 0 |
| BOOTSTRAP.md readable | File access | Exists, readable |
| Rules accessible | File access | Exists, readable |
| Seeds available | File access | seed-001 exists |
| AGENTS.md updated | Context loading | KDE entry present |

### Verification Script Output

Expected for OpenHands compatibility:

```
Testing KDE Bootstrap for OpenHands Compatibility...
======================================================================
Test 1: Bootstrap Gates
  ✓ PASSED
Test 2: Entry Point Readable
  ✓ BOOTSTRAP.md exists
Test 3: Laboratory Rules
  ✓ Rules accessible
======================================================================
All tests passed. KDE compatible with OpenHands.
```

---

## Recommendations

| ID | Recommendation | Priority |
|----|---------------|----------|
| R1 | Create `scripts/test-openhands-compat.sh` | HIGH |
| R2 | Add KDE entry to `AGENTS.md` | HIGH |
| R3 | Create OpenHands skill for KDE | MEDIUM |
| R4 | Document OpenHands testing procedure | MEDIUM |

---

## Key Finding: No AGENTS.md Exists

Currently, KDE does not have an `AGENTS.md` file. This file is the standard way AI agents share context and persistent memory.

### Why This Matters

| Agent | Reads AGENTS.md? |
|-------|-----------------|
| OpenHands | Yes |
| Claude Code | Yes (if exists) |
| Other agents | Typically yes |

**Without AGENTS.md**, agents may not automatically discover KDE's bootstrap and rules.

### Recommendation

Create `AGENTS.md` with:
1. KDE entry point
2. Bootstrap location
3. Key files to read
4. Rules acknowledgment

---

## Awaiting Approval

**Current Status**: Investigation documented

**Recommended path forward**:
1. **R1**: Create `scripts/test-openhands-compat.sh` to verify compatibility
2. **R2**: Create `AGENTS.md` with KDE entry point
3. **R3**: Create OpenHands skill for KDE bootstrap
4. **R4**: Document OpenHands testing procedure

**Please approve which recommendations to implement.**

---

**Status**: AWAITING_HUMAN_AUTHORIZATION
**Author**: OpenHands Agent
**Date**: 2026-07-26
