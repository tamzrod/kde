# Worker Template

**Purpose**: Template for creating domain-specific Workers

---

## Worker Definition

A Worker is defined by:

| Attribute | Description |
|-----------|-------------|
| **Domain** | The domain this worker operates in |
| **Sources** | Raw sources this worker can observe |
| **Plugins** | Format handlers this worker uses |
| **Capabilities** | Shared capabilities this worker uses |

---

## Worker Structure

```
workers/[domain]-worker/
├── README.md          # Domain description and responsibilities
├── sources.md         # What this worker observes
├── observations/      # Output observations
│   └── OBS-*.md
└── worker.yaml        # Worker configuration
```

---

## Responsibilities

1. **Observe** raw sources in domain
2. **Decode** domain-specific data formats using plugins
3. **Produce** observations (not knowledge)
4. **Submit** knowledge candidates to Core

---

## Output Types

### Observation
Raw findings from source analysis. Not yet validated.

### Knowledge Candidate
Observation that has been processed and is ready for Core review.

---

## Anti-Patterns

- ❌ Worker promotes knowledge directly
- ❌ Worker modifies Knowledge Layer
- ❌ Worker performs cross-domain observations

---

**Template Version**: 1.0
