# INV-079: Evidence Manifest

**Investigation ID**: INV-079  
**Artifact**: EVIDENCE-MANIFEST  
**Timestamp**: 2026-07-28T06:16:21Z  
**Producer**: Investigation Engine

---

## Evidence Sources

| # | Source | Description | Artifact |
|---|--------|-------------|----------|
| 1 | `python3 .kde/bootstrap/gates.py` | Bootstrap gate verification | BOOTSTRAP-REPORT.md |
| 2 | .kde/runtime/state.json | Runtime state configuration | EXECUTION-PROVENANCE.md |
| 3 | runtime/retrieval.py | Retrieval engine implementation | Investigation Report |
| 4 | runtime/sop005.py | SOP-005 executor | Investigation Report |
| 5 | runtime/ecu/ | ECU implementation | ECU-REPORT.md |
| 6 | seeds/seed-001/seed.yaml | Seed manifest | EXECUTION-PROVENANCE.md |
| 7 | engines/current.md | Engine registry | EXECUTION-PROVENANCE.md |
| 8 | GitHub: chandananvithahr/caveman | Caveman toolkit | Investigation Report |
| 9 | GitHub: tamzrod/enzo | ENZO architecture | Investigation Report |
| 10 | INV-076 | Previous Caveman-ENZO analysis | Investigation Report |
| 11 | LABORATORY-RULES.md v1.3.0 | Rule 8 authenticity | Investigation Report |

---

## Evidence Summary

| Category | Count |
|----------|-------|
| Runtime artifacts | 3 |
| Governance artifacts | 2 |
| External sources | 2 |
| Prior investigations | 1 |
| **Total** | **8** |

---

## Verification Status

| Source | Verified | Location |
|--------|----------|----------|
| Bootstrap gates | YES | BOOTSTRAP-REPORT.md |
| Runtime state | YES | .kde/runtime/state.json |
| Seed | YES | seeds/seed-001/seed.yaml |
| Engine | YES | engines/current.md |
| External (Caveman) | YES | GitHub repository |
| External (ENZO) | YES | GitHub repository |

---

## Evidence Chain

```
INV-079 README.md
    ├── BOOTSTRAP-REPORT.md
    │   └── python3 .kde/bootstrap/gates.py
    ├── EXECUTION-PROVENANCE.md
    │   ├── .kde/runtime/state.json
    │   ├── seeds/seed-001/seed.yaml
    │   └── engines/current.md
    ├── ECU-REPORT.md
    │   └── runtime/ecu/
    └── EVIDENCE-MANIFEST.md
        └── (this file)
```

---

## Provenance

All evidence sources have been verified and are accessible within the KDE repository or public GitHub repositories.
