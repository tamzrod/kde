# KDE Roadmap

**Version**: 1.0
**Last Updated**: 2026-07-31
**Purpose**: Single source of truth for project progress

---

## Current Stage

```
Stage 2: Define the Knowledge Layer
```

---

## Mission

Build a simpler KDE centered on reusable knowledge from first principles.

**Objective**: The Knowledge Layer is the primary asset. AI consumes it first and fills only remaining gaps.

---

## Repository Structure

```
kde/
├── knowledge/           # PRIMARY ASSET
│   ├── foundation/      # Constitutional definitions
│   ├── definitions/     # Engineering definitions
│   ├── principles/      # Operating principles
│   ├── patterns/        # Validated patterns
│   ├── workflows/       # Standard workflows
│   ├── decisions/       # Decision records
│   ├── lessons/         # Lessons learned
│   ├── schemas/         # Data schemas
│   └── README.md
├── operations/          # HOW WE WORK
│   ├── roadmap/        # This document
│   ├── session/         # Session procedures
│   ├── audit/          # Audit trail
│   └── README.md
└── archive/             # Historical reference
```

---

## Stage 1: Archive & Reset ✅

**Status**: COMPLETE
**Date**: 2026-07-31

### Completed
- [x] Archive all historical content (245MB)
- [x] Preserve commit history
- [x] Create new minimal structure
- [x] Establish archive-reference index

### Artifacts
- Archive: `/archive/` (114 investigations, 77 experiments, 81 knowledge docs)
- Reference: `/archive-reference/INDEX.md`

---

## Stage 2: Define the Knowledge Layer

**Status**: ✅ COMPLETE
**Started**: 2026-07-31
**Completed**: 2026-07-31

### Objective
Define the constitutional rules for the Knowledge Layer.

### Deliverables

| Document | Purpose | Status |
|---------|---------|--------|
| `knowledge/foundation/WHAT-IS-KNOWLEDGE.md` | Constitutional definition | ✅ COMPLETE |
| `knowledge/schemas/KNOWLEDGE-OBJECT.md` | Canonical data object | ✅ COMPLETE |
| `knowledge/foundation/KNOWLEDGE-LIFECYCLE.md` | Lifecycle stages | ✅ COMPLETE |
| `knowledge/foundation/KNOWLEDGE-TYPES.md` | Knowledge primitives | ✅ COMPLETE |
| `knowledge/foundation/PROMOTION-RULES.md` | Entry criteria | ✅ COMPLETE |

### Tasks

- [x] Create WHAT-IS-KNOWLEDGE.md
- [x] Create KNOWLEDGE-OBJECT.md schema
- [x] Create KNOWLEDGE-LIFECYCLE.md
- [x] Create KNOWLEDGE-TYPES.md
- [x] Create PROMOTION-RULES.md
- [x] Review for consistency
- [x] Resolve overlaps
- [x] Refine terminology

### Exit Criteria
- [x] All 5 documents exist
- [x] No inconsistencies between documents
- [x] Terminology is consistent
- [ ] Human authorization obtained

### Documents Created

```
knowledge/
├── foundation/
│   ├── WHAT-IS-KNOWLEDGE.md    # Constitutional definition (6,551 bytes)
│   ├── KNOWLEDGE-LIFECYCLE.md  # 8-stage lifecycle (9,979 bytes)
│   ├── KNOWLEDGE-TYPES.md      # 6 knowledge types (12,702 bytes)
│   └── PROMOTION-RULES.md      # Entry/exit rules (10,139 bytes)
└── schemas/
    └── KNOWLEDGE-OBJECT.md     # Data schema (9,113 bytes)
```

### Consistency Review
- ✅ Five Core Principles consistently referenced
- ✅ Lifecycle stages properly defined (Conversation → Candidate → Review → Approved → Promoted → Revision/Deprecated → Archived)
- ✅ Knowledge types properly defined (principle, pattern, workflow, definition, decision, lesson)
- ✅ Cross-references verified between all documents
- ✅ Validation tests defined (Classification, Distinction, Methodology, Consistency, Counterexample)

---

## Stage 3: Establish AI Consumption Protocol

**Status**: PENDING

### Objective
Define how AI consumes the Knowledge Layer.

### Deliverables
- `knowledge/schemas/CONSUMPTION-PROTOCOL.md`
- `operations/session/AI-INTERFACE.md`

---

## Stage 4: Populate Initial Knowledge

**Status**: PENDING

### Objective
Migrate validated knowledge from archive.

### Sources
- Archive: `archive/laboratories/laboratory/investigations/INV-001` (What is Knowledge?)
- Archive: `archive/laboratories/laboratory/investigations/INV-002` (What is Evidence?)
- Archive: `archive/laboratories/laboratory/investigations/INV-003` (What is Ambiguity?)
- Archive: `archive/architecture/seeds-historical/seed-001/principles/5-principles.md` (5 Core Principles)

---

## Stage 5: Operations Layer

**Status**: PENDING

### Objective
Define how work happens.

### Deliverables
- Session procedures
- Audit trail format
- Authorization workflow

---

## Blockers

None at this stage.

---

## Session Log

| Date | Session | Actions |
|------|---------|---------|
| 2026-07-31 | Initial | Repository restructured, archive created |
| 2026-07-31 | Stage 2 | Started Knowledge Layer definition |
| 2026-07-31 | Stage 2 | Completed all 5 Knowledge Layer documents |

---

## Next Recommended Action

**Stage 3: Establish AI Consumption Protocol**

The next stage defines how AI consumes the Knowledge Layer. Deliverables:
- `knowledge/schemas/CONSUMPTION-PROTOCOL.md` - How AI reads and uses knowledge
- `operations/session/AI-INTERFACE.md` - Session procedures for AI

**Note**: Human authorization required to proceed beyond Stage 2.

---

## Session Rule

Every new session SHALL begin by reading this document and determining:
1. Where were we?
2. What was completed?
3. What remains?
4. What is today's objective?

Never guess project status. Always derive it from this document.

---

**Remember**: "Research session complete. Awaiting human review."
