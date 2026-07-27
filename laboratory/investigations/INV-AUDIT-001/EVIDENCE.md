# INV-AUDIT-001 Evidence

## Evidence 1: Repository Scale

[Evidence] Repository contains 1,814 markdown files across multiple directories.

Source: `find . -type f -name "*.md" | wc -l`

## Evidence 2: Experiment Count

[Evidence] 64 experiment directories exist in laboratory/experiments/.

Source: `ls laboratory/experiments/ | wc -l`

## Evidence 3: Investigation Count

[Evidence] 65 investigation directories exist in laboratory/investigations/.

Source: `ls laboratory/investigations/ | wc -l`

## Evidence 4: Four Engines

[Evidence] Four engines exist:
- KDE-ENGINE-001 (Alpha): Historical
- KDE-ENGINE-002 (Beta): Active, Default
- KDE-ENGINE-003 (Gamma): Active
- KDE-ENGINE-004 (Delta): Active

Source: engines/current.md

## Evidence 5: Three Seeds

[Evidence] Three seeds exist:
- SEED-001 (Genesis): Frozen
- SEED-002 (Evolution): Frozen
- SEED-003: Proposed (status unclear)

Source: seeds/ directory

## Evidence 6: Five-Directory Canonical Structure

[Evidence] Canonical structure defined in README.md:
- /seeds/
- /engines/
- /laboratory/
- /knowledge/
- /governance/

Source: README.md

## Evidence 7: LABORATORY-SOP Size

[Evidence] LABORATORY-SOP.md is 39,742 bytes.

Source: `ls -la governance/LABORATORY-SOP.md`

## Evidence 8: Archive SOP Exists

[Evidence] SOP-ARCHIVE.md specifies quarterly review with 100% compliance target.

Source: governance/ARCHIVE-SOP.md

## Evidence 9: Archive Compliance 0%

[Evidence] Archive metrics show "Investigations archived: All eligible | Current: 0"

Source: governance/ARCHIVE-SOP.md

## Evidence 10: Bootstrap Protocol

[Evidence] BOOTSTRAP.md defines entry point, initialization, authority transfer.

Source: laboratory/BOOTSTRAP.md

## Evidence 11: Pre-Initialization Restrictions

[Evidence] Bootstrap includes prohibitions on planning, exploring, analyzing before initialization.

Source: laboratory/BOOTSTRAP.md

## Evidence 12: Engine Selection Keywords

[Evidence] Bootstrap defines keyword-based engine selection:
- "why/cause" → Gamma
- "bootstrap/reproduce" → Delta
- Default → Beta

Source: laboratory/BOOTSTRAP.md

## Evidence 13: Knowledge Lifecycle States

[Evidence] Knowledge lifecycle: DRAFT → CANDIDATE → VALIDATED → PROMOTED → DEPRECATED

Source: knowledge/KDE-KNOWLEDGE-LIFECYCLE.md

## Evidence 14: Investigation Lifecycle States

[Evidence] Investigation lifecycle: PROPOSED → APPROVED → IN_PROGRESS → REVIEW → COMPLETE

Source: docs/6-how-it-works/processes.md

## Evidence 15: Expert Lifecycle States

[Evidence] Expert lifecycle: SYNTHESIZED → CANDIDATE → VALIDATED → REGISTERED → ACTIVE

Source: experts/_lifecycle.md

## Evidence 16: Runtime State Machine

[Evidence] Runtime states: UNINITIALIZED → INITIALIZING → READY → ERROR

Source: docs/5-core-concepts/ecu.md

## Evidence 17: Evidence Marking Convention

[Evidence] Three evidence types marked with brackets:
- [Evidence]
- [Inference]
- [Hypothesis]

Source: seeds/seed-001/principles/5-principles.md

## Evidence 18: Scientific Loop

[Evidence] Loop: OBSERVE → HYPOTHESIZE → PREDICT → TEST → ANALYZE → ITERATE?

Source: seeds/seed-001/scientific-loop/loop.md

## Evidence 19: Runtime ECU Components

[Evidence] ECU contains: registry, resolver, planner, policy, consensus, aggregator

Source: runtime/ecu/ directory structure

## Evidence 20: Documentation Structure

[Evidence] 11-section documentation structure:
- 1-Introduction
- 2-Foundations
- 3-History
- 4-Getting-Started
- 5-Core-Concepts
- 6-How-It-Works
- 7-Guides
- 8-Architecture
- 9-Reference
- 10-Contributing
- (11-Cultivation: proposed)

Source: docs/ directory

## Evidence 21: Expert System Exists

[Evidence] Two experts registered:
- KDE-EXPERT-SLD-001
- KDE-EXPERT-GIS-001

Source: experts/ directory, experts/_registry.yaml

## Evidence 22: SEED-003 Proposal

[Evidence] Proposal exists: seeds/evolution/SEED-003-PROPOSAL.md

Source: seeds/evolution/ directory

## Evidence 23: SEED Immutability

[Evidence] Seeds are frozen after creation. NEVER-MODIFY.md documents the rule.

Source: seeds/seed-001/NEVER-MODIFY.md

## Evidence 24: Two Documentation Systems

[Evidence] /docs/ for human-facing documentation, /knowledge/ for domain knowledge.

Source: docs/ and knowledge/ directories

## Evidence 25: Root Docs Redirect

[Evidence] Root-level docs (README.md, governance.md, etc.) now redirect to canonical locations.

Source: docs/README.md, docs/governance.md, etc.

## Evidence 26: Lessons Learned SOP

[Evidence] LESSONS-LEARNED-SOP.md exists with 8,343 bytes.

Source: governance/LESSONS-LEARNED-SOP.md

## Evidence 27: Investigation Closure SOP

[Evidence] INVESTIGATION-CLOSURE-SOP.md exists with 9,035 bytes.

Source: governance/INVESTIGATION-CLOSURE-SOP.md

## Evidence 28: Naming Conventions

[Evidence] GOV-NAMING-001 specifies prefixes for all artifact types.

Source: governance/NAMING-CONVENTIONS.md

## Evidence 29: Authority Definitions

[Evidence] AUTHORITY-DEFINITIONS.md defines authority roles.

Source: governance/AUTHORITY-DEFINITIONS.md

## Evidence 30: ECU Implementation

[Evidence] Python implementation exists in runtime/ecu/ with multiple components.

Source: runtime/ecu/__init__.py
