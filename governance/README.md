# Governance

This directory contains KDE governance documents that rule how the project operates.

## What is Governance?

Governance is the system of rules, standards, and processes that govern the KDE project. It is NOT limited to methodology. Methodology is only one artifact that governance covers.

## Canonical Architecture

KDE follows a five-directory canonical structure:

```
kde/
├── seeds/           # Immutable reasoning DNA
├── engines/        # Methodology implementations
├── laboratory/     # Scientific workflow
├── knowledge/      # Validated knowledge
└── governance/      # Repository governance
```

## What Governance Covers

| Domain | Description |
|--------|-------------|
| **Evolution Rules** | How the architecture evolves |
| **Architectural Standards** | Quality standards for project structure |
| **Promotion Rules** | How artifacts move between states |
| **Versioning Policies** | How project artifacts are versioned |
| **Policies** | Project policies and guidelines |

## Governance Documents

| Document | Purpose |
|---------|---------|
| [ENGINE-VERSIONING.md](./ENGINE-VERSIONING.md) | Engine versioning policies |
| [STATE-MACHINE.md](./STATE-MACHINE.md) | Document lifecycle states |
| [VERSION.md](./VERSION.md) | Version history |

## Key Principles

The core principles are defined in `/seeds/seed-001/principles/5-principles.md`. These immutable principles govern AI behavior within KDE. Governance documents reference these principles but do not redefine them.

## Governance Workflow

When a governance change is needed:

```
1. PROPOSE
   └── Document the proposed change with evidence
2. REVIEW
   └── Same review process as other artifacts
3. APPROVE
   └── Human approves the change
4. IMPLEMENT
   └── Update governance documents
5. COMMUNICATE
   └── Inform all contributors
```

## Governance Governs Itself

KDE's governance is subject to KDE's own principles:

- Governance changes must be justified by evidence
- Changes to governance require the same review process as research
- AI cannot modify governance documents without human approval
- Changes to governance are tracked and documented
