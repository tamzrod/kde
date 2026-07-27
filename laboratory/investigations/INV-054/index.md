# INV-054: Start Engine Command Failure Analysis

**Investigation ID**: INV-054  
**Title**: Why "start engine" Failed on New Sandbox  
**Status**: IN_PROGRESS  
**Engine**: KDE-ENGINE-002 (Beta)  
**Date**: 2026-07-27

---

## Question

**What is the root cause of the "start engine" command failure on a new sandbox, and would a root-level `start-engine.md` file solve the problem?**

---

## Hypothesis

Human Hypothesis: "I may need a `start-engine.md` on the root to force AI to understand what I mean. The idea is to have an alias for initializing prerequisites of runtime and running the runtime."

---

## Evidence

### E1: Initial Command Attempt

When "start engine" was issued, the AI responded:

> "I'd be happy to help start an engine, but I need more context about what you're referring to."

**Analysis**: The AI did not recognize "start engine" as a KDE-specific command.

### E2: Exploration Phase

The AI then:
1. Explored the workspace directory structure
2. Found `/engines/` directory with multiple engines (alpha, beta, gamma, delta)
3. Found `/runtime/` directory with Python runtime code
4. Discovered `docker-compose.yml` for the website
5. Checked work hosts which returned "Bad Gateway"

**Result**: No clear "start engine" command or procedure was found.

### E3: Workaround Applied

The AI manually:
1. Started the website via Python HTTP server (`python3 -m http.server 8080`)
2. Ran the runtime demo (`python3 -c "from runtime.runtime import demo; demo()"`)
3. Installed missing dependency (`pip install pyyaml`)
4. Successfully initialized the KDE Runtime

### E4: Bootstrap Documentation

The AI discovered that the proper procedure was documented in:
- `laboratory/BOOTSTRAP.md` - Canonical entry point
- `laboratory/LABORATORY-RULES.md` - Runtime initialization procedure

The BOOTSTRAP.md clearly states:

> **For new sessions, start here:** `laboratory/BOOTSTRAP.md`

### E5: Runtime Requirements

The runtime requires:
1. PyYAML dependency (`pip install pyyaml`)
2. Correct working directory (`/workspace/project/kde`)
3. Import path setup (`sys.path.insert(0, '.')`)
4. ECU initialization with KDE root path

---

## Root Cause Analysis

### Contributing Factors

| Factor | Description |
|--------|-------------|
| **CF1** | "start engine" is not a recognized skill or command in the AI's toolset |
| **CF2** | No visible entry point at the repository root level |
| **CF3** | BOOTSTRAP.md is buried in `laboratory/` directory |
| **CF4** | No Python dependencies pre-installed in new sandbox |
| **CF5** | AI explored but did not find the entry point quickly |

### Root Cause

**RC1**: Semantic Gap - The human command "start engine" does not map to any known KDE procedure.

**RC2**: Discoverability - The entry point (BOOTSTRAP.md) is not prominent enough.

---

## Evaluation of Human Hypothesis

### Hypothesis: Create `start-engine.md` at root level

**Claim**: A root-level `start-engine.md` file would help AI understand the command.

### Analysis

| Aspect | Assessment |
|--------|------------|
| **Effectiveness** | HIGH - Would create a clear semantic link between "start engine" and the procedure |
| **Simplicity** | HIGH - Single file, minimal complexity |
| **Consistency** | MEDIUM - Adds new pattern but follows KDE conventions |
| **Risk** | LOW - Non-breaking change |

### Evidence Supporting

- E4 shows BOOTSTRAP.md exists but is not discovered
- E2 shows exploration did not reveal the entry point quickly
- Human intuition suggests explicit aliasing would help

### Alternative Solutions Considered

| Alternative | Pros | Cons |
|------------|------|------|
| Rename BOOTSTRAP.md to START.md | Cleaner name | Breaks existing links |
| Add README.md at root | Traditional location | Generic, less specific |
| Create skill file | Leverages existing infrastructure | More complex |
| Improve AGENTS.md | Repository context | May not load reliably |

---

## Inference

Based on the evidence, a root-level `start-engine.md` file would likely solve the problem because:

1. It creates an explicit semantic link between the command and the procedure
2. It follows the existing pattern of using Markdown files as entry points
3. It would be discoverable by AI during initial exploration
4. It does not break existing functionality

---

## Recommendation

**REC-001**: Create `/start-engine.md` at repository root as an alias to the initialization procedure.

---

## Next Steps

1. Submit this investigation for human review
2. Await human approval before implementing
3. Create the `start-engine.md` file per approved design

---

**Document Status**: APPROVED (Human)  
**Approved By**: Human  
**Approval Date**: 2026-07-27  
**Recommendation Implemented**: REC-001
