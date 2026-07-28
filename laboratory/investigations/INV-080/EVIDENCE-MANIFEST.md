# INV-080: Evidence Manifest

**Investigation ID**: INV-080  
**Artifact**: EVIDENCE-MANIFEST  
**Timestamp**: 2026-07-28T06:20:00Z  
**Producer**: Investigation Engine

---

## Evidence Sources

| # | Source | Description |
|---|--------|-------------|
| 1 | python3 .kde/bootstrap/gates.py | Bootstrap gate verification |
| 2 | .kde/bootstrap/gates.py:593-658 | Project type handling |
| 3 | .kde/bootstrap/gates.py:27 | Default project_type="go" |
| 4 | .kde/bootstrap/gates.py:613-632 | Go availability check |
| 5 | .kde/bootstrap/gates.py:424-445 | go.mod existence check |

---

## Evidence Summary

| Category | Count |
|----------|-------|
| Runtime artifacts | 1 |
| Source code references | 4 |
| **Total** | **5** |

---

## Verification Status

| Source | Verified |
|--------|----------|
| gates.py source | YES |
| Default project_type | YES |
| Go check logic | YES |
| go.mod check logic | YES |

---

**Provenance**: All evidence from local repository source code.
