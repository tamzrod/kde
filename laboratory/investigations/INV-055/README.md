<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-055: Caveman - Claude Code Token Reduction Toolkit

**Status**: INVESTIGATION  
**Created**: 2026-07-28  
**Source**: External research (GitHub)  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: Based on the README, caveman is a Claude Code skill that provides token reduction utilities to prevent hitting context limits during long coding sessions.]

## What is Caveman?

**Repository**: https://github.com/chandananvithahr/caveman  
**Author**: chandananvithahr  
**Description**: Token reduction utilities for Claude Code sessions  
**License**: MIT  
**Created**: 2026-04-15

## Commands

| Command | What it does |
|---------|--------------|
| `/caveman` | Audit the current session — show where tokens are going |
| `/caveman compress <file>` | Summarize a file to ≤200-word bullets |
| `/caveman strip <file>` | Remove comments, blank lines, logs from code |
| `/caveman squash <file> <term>` | Read only lines matching `<term>` |
| `/caveman prune` | Review MEMORY.md, remove stale entries |
| `/caveman brief` | Rewrite the last long response as ≤5 terse bullets |
| `/caveman diff <file>` | Show only changed hunks — skip context lines |
| `/caveman budget <task>` | Estimate token cost before starting a task |
| `/caveman lean` | Scan session, suggest what to drop |
| `/caveman nuke` | Nuclear option — summarize state, start fresh session |

## Token Reduction Principles

1. Read ≤3 files before acting
2. Squash over read — grep one function, don't read the file
3. Diff over re-read — after edits, `git diff`, don't re-read
4. Brief tool outputs — summarize, don't dump
5. One-pass file reads — never read the same file twice
6. Compress before referencing — large files cited repeatedly: compress first run
7. Skip unchanged context — don't re-explain what the user knows
8. Memory over re-discovery — cite MEMORY.md, don't re-derive

## Relevance to KDE

[INFERENCE: KDE could potentially adopt similar token reduction strategies for its runtime and knowledge management system, though the mechanisms differ (Claude Code sessions vs. KDE investigation sessions).]

### Potential Applications:
- Session context management
- Memory file pruning
- Token budgeting before investigations
- Compression of large documents

### KDE-Specific Adaptations:
- Could integrate into KDE runtime for context management
- Memory pruning aligns with KDE's /knowledge/ lifecycle
- Audit concept could apply to investigation context sizing

## Evidence

[EVIDENCE: GitHub repository chandananvithahr/caveman, README.md content retrieved 2026-07-28]

## Next Steps

1. Clone and test caveman skill
2. Evaluate token savings potential
3. Assess applicability to KDE runtime
4. Consider adaptation for KDE investigation workflow

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes
