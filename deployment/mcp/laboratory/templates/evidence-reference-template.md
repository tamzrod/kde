# Evidence Reference Template

**Template Version**: 1.0  
**Date**: 2026-07-19  

---

## Evidence Collection

| Evidence ID | Type | Source | Description | Hash | Collected |
|-------------|------|--------|-------------|------|-----------|
| MCP-XXX/EV-YYY | [type] | [path/URL] | [description] | [SHA-256] | YYYY-MM-DD |

---

## Evidence Details

### MCP-XXX/EV-YYY

| Field | Value |
|-------|-------|
| **ID** | MCP-XXX/EV-YYY |
| **Type** | [log/measurement/screenshot/commit/document/telemetry] |
| **Source** | [File path or external reference] |
| **Hash** | [SHA-256 hash] |
| **Size** | [Size in bytes/KB/MB] |
| **Collected** | YYYY-MM-DD HH:MM:SS |
| **Collected By** | [Name] |

### Description

[Detailed description of the evidence and why it was collected]

### Relevance

[How this evidence relates to the experiment hypothesis]

### Verification

```
[Verification command and expected output]
$ sha256sum [file]
[SHA-256 hash]
```

---

## Additional Evidence

### MCP-XXX/EV-YYY (if applicable)

[Same structure as above]

---

## Evidence Integrity

| Check | Result |
|-------|--------|
| Hash Verified | ✅/❌ |
| Timestamp Valid | ✅/❌ |
| Source Accessible | ✅/❌ |
| Non-Repudiation | ✅/❌ |

---

## Notes

[Any additional notes about the evidence]

---

**Template**: Evidence Reference  
**Next**: Save as experiments/MCP-XXX/evidence/references.md
