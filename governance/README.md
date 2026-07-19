# Governance

This directory contains KDE governance documents that rule how the project operates.

## What is Governance?

Governance is the system of rules, standards, and processes that govern the KDE project. It is NOT limited to methodology. Methodology is only one artifact that governance covers.

## What Governance Covers

| Domain | Description |
|--------|-------------|
| **Research** | How research questions are investigated |
| **Knowledge** | How knowledge is validated and promoted |
| **Methodology** | How the methodology itself evolves |
| **Standards** | Quality standards for all project artifacts |
| **Policies** | Project policies and guidelines |
| **Approval Processes** | How artifacts move through states |
| **Versioning** | How project artifacts are versioned |
| **Future Artifacts** | Any new governance artifacts as the project grows |

## Governance Documents

| Document | Purpose |
|---------|---------|
| [RESEARCH-METHODOLOGY.md](./RESEARCH-METHODOLOGY.md) | How research is conducted |
| [STATE-MACHINE.md](./STATE-MACHINE.md) | Document lifecycle states |
| [PRINCIPLES.md](./PRINCIPLES.md) | Core principles for AI behavior |
| [VERSION.md](./VERSION.md) | Version history |

## Key Principles

1. **No Auto-Continuation** — AI must never begin the next research session without explicit human authorization.
2. **No Self-Approval** — AI must never approve its own work. Only humans can set APPROVED state.
3. **No Self-Promotion** — AI must never promote knowledge. Only humans can set PROMOTED state.
4. **Distinguish Evidence, Inference, Hypothesis** — AI must clearly mark these.
5. **Evidence-Based Changes** — Governance changes must be justified by evidence, not opinion.

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
