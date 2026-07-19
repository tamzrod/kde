# Version History

## v1.0 (2026-07-19)

**Status**: APPROVED

### Initial Release

- KDE Research Methodology v1.0 established
- 5 Core Principles for AI Behavior defined
- Document State Machine defined
- Research lifecycle stages defined
- Research session format defined

### Components

| Document | Version | Description |
|---------|---------|-------------|
| RESEARCH-METHODOLOGY.md | v1.0 | How research is conducted |
| STATE-MACHINE.md | v1.0 | Document lifecycle states |
| PRINCIPLES.md | v1.0 | Core principles for AI |
| VERSION.md | v1.0 | This document |

### Key Decisions

1. **No Auto-Continuation** — AI stops after Working Definition
2. **No Self-Approval** — Humans approve all work
3. **No Self-Promotion** — Humans promote to /knowledge/
4. **Evidence/Inference/Hypothesis** — Clear distinction required
5. **Evidence-Based Changes** — All claims justified

---

## Version Format

```
KDE Research Methodology v{major}.{minor}
```

- **Major** (v1→v2): Breaking changes to lifecycle, states, or principles
- **Minor** (v1.0→v1.1): Clarifications, non-breaking additions

## Version Proposal Process

When proposing a methodology change:

```
1. PROPOSE
   └── Create version entry in this file with "proposed" status
   
2. JUSTIFY
   └── Document evidence supporting the change
   
3. REVIEW
   └── Same review process as research documents
   
4. APPROVE
   └── Human approves the change
   
5. IMPLEMENT
   └── Update affected documents
   └── Change "proposed" to effective version
   
6. COMMUNICATE
   └── Inform contributors of change
```

## Changelog Format

```markdown
## v{major}.{minor} (proposed|effective-date)

**Status**: PROPOSED | APPROVED

### Changes
- [Added/Removed/Changed]: Description

### Justification
- Evidence for change

### Affected Documents
- List of documents changed
```
