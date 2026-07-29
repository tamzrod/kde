# LAB-GAP-001: Skill Invocation Bypasses ECU Investigation Creation

**Investigation ID**: INV-GAP-001
**Date**: 2026-07-29T03:14:38Z
**Status**: ACTIVE
**Engine**: KDE-ENGINE-XXX (unknown - not recorded at invocation)
**Seed**: SEED-XXX (unknown - not recorded at invocation)

---

## Research Question

Why did the KDE Investigation Framework skill invocation bypass the proper laboratory process, resulting in work being done in the AI conversation layer instead of creating formal investigation artifacts in `/laboratory/`?

## Scope

- **Included**: Skill invocation mechanics, ECU investigation creation workflow, skill-to-ECU integration gap
- **Excluded**: Fixing the gap (requires separate investigation/experiment)

## Background

When a user asks for an investigation or experiment, the KDE methodology expects:
1. The skill is invoked
2. The ECU is triggered
3. Formal investigation artifacts are created in `/laboratory/investigations/`
4. Experiments are created in `/laboratory/experiments/`
5. All work is tracked with Engine/Seed version stamping

**What actually happened (Session 1):**
- User asked to "perform an experiment synthesize new chess techniques"
- Skill `kde-investigation-framework` was auto-triggered by keyword
- Skill returned markdown documentation with instructions
- Pre-flight check was run manually (but not used for investigation creation)
- All synthesis work was done in AI conversation layer
- **No artifacts created in `/laboratory/`**
- **No investigation in `/laboratory/investigations/`**
- **No experiment in `/laboratory/experiments/`**

## Evidence

### Evidence 1: Skill is Just Documentation

The skill file at `.agents/skills/kde-investigation-framework.md` contains:
```
---
name: kde-investigation-framework
type: repo
triggers:
  - investigation
  - experiment
  - start engine
  - preflight check
---
[Markdown content with instructions]
```

**Analysis**: The skill is a markdown document. When invoked, it returns the markdown content as text. It does NOT contain any code to trigger the ECU.

### Evidence 2: ECU Investigation Creation Workflow

From `runtime/ecu/__init__.py`, the ECU provides:
- `create_investigation()` method
- `create_experiment()` method
- Proper version stamping with Engine/Seed
- Artifact creation in `/laboratory/`

**Analysis**: The ECU has the capability but the skill doesn't invoke it.

### Evidence 3: Laboratory Workflow (WORKFLOW.md)

The laboratory requires 9 stages:
1. IDEA → 2. INVESTIGATION → 3. EVIDENCE COLLECTION → 4. OBSERVATION → 5. SYNTHESIS → 6. VALIDATION → 7. CANDIDATE KNOWLEDGE → 8. PROMOTION → 9. KNOWLEDGE REPOSITORY

**Analysis**: The work started at stage 5 (SYNTHESIS) without going through stages 1-4.

### Evidence 4: Investigation Template Requirements

From `laboratory/templates/investigation-template.md`:
```
**Engine**: KDE-ENGINE-XXX (vX.Y.Z)  [REQUIRED]
**Seed**: SEED-XXX (vX.Y.Z)          [REQUIRED]
```

**Analysis**: Version stamping is REQUIRED but was never performed.

## Root Cause Analysis

### The Gap

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER PROMPT                                     │
│               "perform an experiment synthesize new chess techniques"   │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       SKILL INVOCATION                                  │
│            invoke_skill(name="kde-investigation-framework")            │
│                                                                          │
│         ┌──────────────────────────────────────────────────────┐        │
│         │  .agents/skills/kde-investigation-framework.md      │        │
│         │  - Returns markdown text                            │        │
│         │  - Contains instructions                            │        │
│         │  - NO ECU integration                               │        │
│         │  - NO investigation creation                        │        │
│         │  - NO experiment creation                            │        │
│         └──────────────────────────────────────────────────────┘        │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     AI CONVERSATION LAYER                               │
│         - Pre-flight check (manual, result unused)                      │
│         - Synthesis work done in chat                                   │
│         - Output only exists in conversation history                    │
│                                                                          │
│         ❌ NO /laboratory/investigations/LAB-XXX/ created               │
│         ❌ NO /laboratory/experiments/LAB-XXX/ created                  │
│         ❌ NO Engine/Seed version stamping                               │
│         ❌ NO formal artifacts                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Why This Happens

1. **Skills are Documentation, Not Executors**: The skill system returns markdown content - it's designed to inform, not to execute.

2. **No Automatic ECU Trigger**: There's no automatic connection between skill invocation and ECU execution.

3. **Manual Process Required**: Currently, the AI must manually:
   - Create investigation directories
   - Create experiment files
   - Run ECU methods (if available)
   - Track version stamps

4. **Skill Pattern Mismatch**: The skill expects human/agent to follow instructions and create artifacts, but there's no enforcement mechanism.

## What SHOULD Happen

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER PROMPT                                     │
│               "perform an experiment synthesize new chess techniques"   │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       SKILL INVOCATION                                  │
│            invoke_skill(name="kde-investigation-framework")            │
│                                                                          │
│         ┌──────────────────────────────────────────────────────┐        │
│         │  Skill triggers ECU execution                         │        │
│         │  ECU.analyze_capabilities()                            │        │
│         │  ECU.resolve_capabilities()                            │        │
│         │  ECU.create_investigation()                            │        │
│         │  ECU.create_experiment()                               │        │
│         └──────────────────────────────────────────────────────┘        │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    ECU EXECUTION LAYER                                  │
│                                                                          │
│   ┌───────────────────────────────────────────────────────────────┐     │
│   │  /laboratory/investigations/INV-XXX/                         │     │
│   │    - investigation.md (with Engine/Seed version stamping)     │     │
│   │    - index.md                                                 │     │
│   │    - links/                                                   │     │
│   └───────────────────────────────────────────────────────────────┘     │
│                                                                          │
│   ┌───────────────────────────────────────────────────────────────┐     │
│   │  /laboratory/experiments/LAB-XXX/                            │     │
│   │    - experiment.md (with proper workflow stages)              │     │
│   │    - runs/                                                    │     │
│   │    - evidence/                                               │     │
│   └───────────────────────────────────────────────────────────────┘     │
│                                                                          │
│   ✅ Engine version recorded                                           │
│   ✅ Seed version recorded                                             │
│   ✅ Full 9-stage workflow initiated                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Recommendations

### Immediate (For Future Investigations)

Until the gap is fixed:
1. After invoking the skill, manually create investigation artifacts
2. Follow the WORKFLOW.md stages in order
3. Use the investigation template with required version stamping

### Structural Fix (Requires Separate Investigation)

A separate investigation should examine:
1. **Option A**: Add ECU trigger to skill invocation system
2. **Option B**: Create "Investigation Executor" skill that wraps the ECU
3. **Option C**: Modify skill system to automatically invoke ECU on certain triggers
4. **Option D**: Create agentic workflow that orchestrates skill + ECU

## Status

```
Idea                    ✅
Investigation           🔄 (THIS INVESTIGATION)
Evidence Collection     ⏳
Observation             ⏳
Synthesis               ⏳
Validation              ⏳
Candidate Knowledge     ⏳
Promotion Proposal      ⏳
Knowledge Repository    ⏳
```

## Related

- Previous session work (in conversation, not lab): Chess technique synthesis
- Skill: `kde-investigation-framework`
- ECU: `RuntimeECU` in `runtime/ecu/`
- Workflow: `laboratory/WORKFLOW.md`

---

**Investigation Status**: ACTIVE  
**Human Review Required**: Yes  
**Gap Severity**: HIGH - Laboratory process was completely bypassed
