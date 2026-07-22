# Expert Template

**Expert ID**: KDE-EXPERT-[DOMAIN]-[N]
**Version**: 1.0.0
**Status**: SYNTHESIZED
**Domain**: [domain-name]
**Created**: YYYY-MM-DD
**Source**: [investigation(s)]

---

## Purpose

[TODO: Describe what this expert does in 2-3 sentences]

---

## Scope

### Owns
- [TODO: List capabilities this expert owns]

### Does Not Own
- [TODO: List capabilities this expert does NOT own]

---

## Capabilities

### [Group 1]: [Name]
**Question Answered**: [TODO: What question does this group answer?]

| ID | Name | Description | Inputs | Output |
|----|------|-------------|--------|--------|
| cap-001 | [Name] | [Description] | [in1, in2] | [Type] |

---

## Knowledge Dependencies

| Knowledge ID | Purpose | Status |
|-------------|---------|--------|
| KDE-XXX-001 | [Purpose] | REQUIRED |

---

## Confidence Rules

| Condition | Confidence | Rationale |
|-----------|-------------|-----------|
| [HIGH condition] | HIGH | [Reason] |
| [MEDIUM condition] | MEDIUM | [Reason] |
| [Fallback] | LOW | [Reason] |

---

## Interface Contract

### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| task | string | Yes | Task description |
| context | object | No | Execution context |

### Outputs

| Parameter | Type | Description |
|-----------|------|-------------|
| result | [Type] | Expert output |
| confidence | HIGH/MEDIUM/LOW | Output confidence |
| validation | object | Validation results |

### Errors

| Code | Condition | Response |
|------|-----------|----------|
| E001 | Insufficient context | Request more info |
| E002 | Unknown domain | Delegate |

---

## Examples

### Example 1

**Input:**
```yaml
task: "[Task]"
```

**Output:**
```yaml
result: "[Result]"
confidence: HIGH
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial version |
