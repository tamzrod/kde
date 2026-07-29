# Evidence: Baseline (md AI Optimized) Parameters

**Evidence ID**: EV-BASELINE-001
**Experiment**: LAB-067
**Created**: 2026-07-29T22:02:00Z
**Type**: Configuration
**Source**: Experiment Design

---

## Metadata-Driven Static Optimization Parameters

These parameters are predefined based on historical metadata and do not change between runs.

| Parameter | Value | Source | Rationale |
|-----------|-------|--------|-----------|
| Learning Rate | 0.001 | Historical average from previous experiments | "Works on average" |
| Exploration Ratio | 0.20 | Fixed conservative default | Minimize risk |
| Batch Size | 32 | Standard batch size | Memory efficient |
| Timeout | 60 seconds | Safe upper bound | Prevent runaway |
| Temperature | 0.7 | Industry standard | Balanced creativity |
| Max Tokens | 2048 | Context limit | Full response |

---

## Configuration File

```yaml
# md_ai_optimized_config.yaml
optimization:
  type: metadata_driven
  version: 1.0.0
  
parameters:
  learning_rate: 0.001
  exploration_ratio: 0.20
  batch_size: 32
  timeout: 60
  temperature: 0.7
  max_tokens: 2048

adaptive_settings:
  enabled: false  # KEY DIFFERENCE: No adaptation
  
# No feedback loop integration
# No parameter adjustment between runs
```

---

## Rationale

The metadata-driven approach uses parameters that have historically performed well on average across similar tasks. This is a "safe default" strategy that:
- Minimizes risk of poor performance
- Sacrifices potential for optimization gains
- Does not adapt to specific task characteristics
- Relies on historical precedent

---

## Expected Behavior

With static parameters:
1. First run will establish baseline quality
2. Subsequent runs will produce similar quality scores
3. Improvement rate will be minimal (<5%)
4. Diminishing returns will be reached quickly

---

## Evidence Supporting This Configuration

| Source | Evidence ID | Quote |
|--------|-------------|-------|
| LAB-065 | EV-ECU-003 | "Genesis usage pattern shows conservative defaults" |
| INV-088 | Finding 2 | "Genesis is hardcoded as authority, not adaptive" |
| INV-DR-001 | Section 2.2 | "Static approaches show faster diminishing returns" |

---

## Why This Represents "md AI Optimized"

- **M**etadata-driven: Parameters from historical metadata
- **D**efined: Fixed, not dynamic
- **AI Optimized**: Uses AI-standard defaults

The term "md AI optimized" refers to this approach of using predefined, static parameters derived from historical data rather than adapting based on feedback.
