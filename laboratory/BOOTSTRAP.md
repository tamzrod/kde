# KDE Bootstrap

**Document Version**: 1.0.0
**Date**: 2026-07-20
**Status**: PRODUCTION
**Purpose**: Canonical entry point for all KDE sessions

---

## Purpose

This document is the **canonical entry point** for every fresh KDE session. It is the first artifact an AI agent shall read upon initializing a new KDE workflow.

**This artifact does NOT contain the Runtime implementation.** Its sole purpose is to transfer execution authority to the KDE Runtime before any other work begins.

---

## Entry Point Declaration

```
┌─────────────────────────────────────────────────────────────┐
│                    KDE ENTRY POINT                          │
│                                                             │
│  You have reached the KDE Knowledge Discovery Engine.        │
│                                                             │
│  STOP: Do NOT begin planning, exploring, or analyzing.       │
│                                                             │
│  Read this document completely before proceeding.            │
└─────────────────────────────────────────────────────────────┘
```

---

## Initialization Protocol

### Step 1: Acknowledge Laboratory Rules

Before performing ANY work, you must acknowledge the **Laboratory Rules** defined in [`/workspace/project/kde/seeds/seed-001/principles/5-principles.md`](/workspace/project/kde/seeds/seed-001/principles/5-principles.md).

The Laboratory Rules are:

| Rule | Description |
|------|-------------|
| **1. No Auto-Continuation** | AI must never begin the next research session without explicit human authorization |
| **2. No Self-Approval** | AI must never approve its own work |
| **3. No Self-Promotion** | AI must never promote knowledge to production |
| **4. Distinguish Evidence** | AI must clearly mark fact vs. conclusion vs. speculation |
| **5. Evidence-Based Changes** | All claims must be justified by evidence |

### Step 2: Initialize KDE Runtime

Execute the KDE Runtime initialization by invoking the `shttp_initialize` tool or following the procedure defined in [`LABORATORY-RULES.md`](./LABORATORY-RULES.md).

**Runtime Initialization Requirements:**

1. Load Runtime Configuration from `/governance/runtime/defaults.yaml`
2. Load the Default Engine: **KDE-ENGINE-002 (Beta)** v0.1.0
3. Load the Default Seed: **SEED-001 (Genesis)** v1.0.0
4. Verify Runtime state transitions to: **READY**

**Note**: Runtime uses human-configured defaults. The default Engine and Seed are determined by `/governance/runtime/defaults.yaml`, not by Engine status.

### Step 3: Transfer Execution Authority

Upon successful Runtime initialization, authority transfers from the AI substrate to the KDE Runtime.

**Post-Initialization:**

- The Active Engine determines all subsequent actions
- AI becomes an execution substrate only
- AI native planning and reasoning are suspended until Runtime takes control

### Step 4: Await Engine Directive

After initialization, await the Active Engine's directive for the current session's task.

---

## Pre-Initialization Restrictions

**Before Runtime initialization, the AI SHALL NOT:**

| Prohibition | Rationale |
|-------------|-----------|
| Plan tasks | Premature planning bypasses Engine methodology |
| Explore repository | Discovery should follow Engine-defined process |
| Analyze documents | Analysis must occur under Engine authority |
| Create tasks | Task creation is Engine-defined, not AI-native |
| Reason independently | Reasoning must follow Engine methodology |
| Make assumptions | Assumptions must be evidence-based per Engine |

---

## Active Configuration

| Component | ID | Version | Status |
|-----------|-----|---------|--------|
| **Engine** | KDE-ENGINE-002 (Beta) | 0.1.0 | Active |
| **Seed** | SEED-001 (Genesis) | 1.0.0 | Active |
| **Architecture** | Architecture C | 1.0.0 | Production |
| **Runtime** | KDE Runtime | 1.0.0 | Ready |

---

## Artifact Hierarchy

```
kde/
├── seeds/                    # Immutable reasoning DNA (SEED-001)
│   └── seed-001/
│       └── principles/
│           └── 5-principles.md    # Laboratory Rules (AUTHORITY)
│
├── engines/                  # Methodology implementations
│   ├── current.md            # Engine registry
│   └── beta/                 # KDE-ENGINE-002 (Beta)
│       └── specification.md
│
├── governance/               # Runtime configuration
│   └── runtime/
│       ├── defaults.yaml     # Runtime default configuration
│       ├── RUNTIME-STARTUP.md
│       └── SESSION-OVERRIDE.md
│
├── laboratory/               # Scientific workflow
│   ├── BOOTSTRAP.md         # THIS FILE - Entry point
│   ├── LABORATORY-RULES.md  # Runtime initialization procedure
│   ├── README.md            # Laboratory overview
│   └── ARCHITECTURE-C.md    # Architecture specification
│
└── knowledge/                # Validated knowledge
```

---

## Verification Checklist

Before proceeding beyond this entry point, verify:

| Check | Status |
|-------|--------|
| Laboratory Rules acknowledged | ☐ |
| Runtime initialized | ☐ |
| Engine state: READY | ☐ |
| Execution authority transferred | ☐ |
| Pre-initialization restrictions honored | ☐ |

---

## Error Handling

### If Runtime Initialization Fails

**STOP immediately and report the missing artifact.**

Required artifacts for initialization:

| Artifact | Location | Required |
|----------|----------|----------|
| Laboratory Rules | `/seeds/seed-001/principles/5-principles.md` | Yes |
| Runtime Defaults | `/governance/runtime/defaults.yaml` | Yes |
| Engine Registry | `/engines/current.md` | Yes |
| Engine Specification | `/engines/beta/specification.md` | Yes |
| Runtime Procedure | `/laboratory/LABORATORY-RULES.md` | Yes |

### If Artifacts Are Missing

Report to Governance with:
1. Which artifact is missing
2. Its expected location
3. The error encountered

**Do NOT proceed with work until Runtime initialization succeeds.**

---

## Related Documents

### Runtime Configuration

| Document | Purpose |
|----------|---------|
| [`/governance/runtime/defaults.yaml`](/workspace/project/kde/governance/runtime/defaults.yaml) | Runtime default configuration |
| [`/governance/runtime/RUNTIME-STARTUP.md`](/workspace/project/kde/governance/runtime/RUNTIME-STARTUP.md) | Runtime startup sequence |
| [`/governance/runtime/SESSION-OVERRIDE.md`](/workspace/project/kde/governance/runtime/SESSION-OVERRIDE.md) | Session override behavior |

### Laboratory

| Document | Purpose |
|----------|---------|
| [LABORATORY-RULES.md](./LABORATORY-RULES.md) | Runtime initialization procedure |
| [README.md](./README.md) | Laboratory overview |
| [ARCHITECTURE-C.md](./ARCHITECTURE-C.md) | Architecture specification |

### Engines

| Document | Purpose |
|----------|---------|
| [`/engines/current.md`](/workspace/project/kde/engines/current.md) | Engine registry |
| [`/seeds/seed-001/principles/5-principles.md`](/workspace/project/kde/seeds/seed-001/principles/5-principles.md) | Laboratory Rules |

---

## Boot Sequence Summary

```
┌─────────────────────────────────────────────────────────────┐
│                      BOOT SEQUENCE                           │
└─────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────┐
    │ STEP 1: Read BOOTSTRAP.md                          │
    │         (You are here)                              │
    └─────────────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 2: Acknowledge Laboratory Rules               │
    │         Source: /seeds/seed-001/principles/         │
    └─────────────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 3: Initialize KDE Runtime                     │
    │         Source: /laboratory/LABORATORY-RULES.md    │
    └─────────────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 4: Transfer Authority to Engine               │
    │         Engine: KDE-ENGINE-002 (Beta)             │
    └─────────────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────────────┐
    │ STEP 5: Await Engine Directive                     │
    │         Begin session work under Engine authority   │
    └─────────────────────────────────────────────────────┘
```

---

**Document Status**: PRODUCTION
**Entry Point**: Canonical KDE session entry
**Authority**: Laboratory Rules (Seed-001)
