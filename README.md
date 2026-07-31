# Knowledge Discovery Engine (KDE)

**Version**: 2.0 (Architected from First Principles)
**Philosophy**: Knowledge as the primary asset, simplicity as the method

---

## What is KDE?

KDE is a research framework for discovering, validating, and maintaining engineering knowledge through systematic investigation.

**Core Question**: What must we understand before we can define an AI-assisted knowledge discovery system?

---

## Architecture

```
kde/
├── knowledge/          # PRIMARY ASSET - Validated knowledge
│   ├── foundation/    # Foundational definitions (immutable)
│   ├── domain/        # Domain-specific knowledge
│   └── patterns/      # Reusable patterns (validated)
├── operations/         # HOW WE WORK
│   ├── session/       # Session procedures
│   ├── rules/         # Operational rules
│   └── audit/         # Audit trail
└── archive-reference/ # Historical reference (read-only)
```

**Principle**: Every directory must justify its existence. If something doesn't fit, it belongs in archive-reference.

---

## Five Core Principles (PRESERVED)

These principles govern all AI behavior within KDE:

1. **No Auto-Continuation** - AI must wait for explicit human authorization
2. **No Self-Approval** - Only humans can set APPROVED state
3. **No Self-Promotion** - Only humans can promote knowledge
4. **Distinguish Evidence, Inference, Hypothesis** - Clear epistemic markers
5. **Evidence-Based Changes** - All claims require evidence

---

## Knowledge Lifecycle

```
Question → Investigation → Evidence → Validation → Promotion
                ↓                              ↓
           Lessons Learned              Knowledge (permanent)
```

**Key Rule**: Knowledge promotion requires human authorization.

---

## Getting Started

For session initialization, see `operations/session/BOOTSTRAP.md`

---

## Historical Archive

Previous architecture and all accumulated knowledge is preserved in:
- `/archive/` - Complete historical repository snapshot (245MB)
- Contains: 114 investigations, 77 experiments, 4 seeds, 81 knowledge documents

---

**Design Philosophy**: Knowledge over implementation. Simplicity over complexity. Evidence over assumption.