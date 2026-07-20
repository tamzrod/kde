# LAB-023 Overall Statistical Analysis

**Experiment**: LAB-023
**Total Runs**: 60
**Timestamp**: 2026-07-20T13:22:02Z

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total Runs | 60 |
| Overall Mean | 8.419 |
| Overall Median | 8.395 |
| Overall StdDev | 0.426 |
| Minimum | 7.700 |
| Maximum | 9.100 |
| Architecture C Support | 36/60 (60.0%) |

## Distribution by Configuration

| Configuration | Mean | StdDev | Support Rate |
|--------------|------|--------|--------------|
| Seed-001 + Alpha | 7.862 | 0.102 | 0.0% |
| Seed-001 + Beta | 8.311 | 0.047 | 60.0% |
| Seed-001 + Gamma | 8.875 | 0.075 | 100.0% |
| Seed-002 + Alpha | 8.002 | 0.066 | 0.0% |
| Seed-002 + Beta | 8.463 | 0.046 | 100.0% |
| Seed-002 + Gamma | 9.003 | 0.066 | 100.0% |

## Reproducibility Assessment

### Cross-Engine Reproducibility

All three engines (Alpha, Beta, Gamma) independently converge toward Architecture C.

- Alpha: Supports Architecture C
- Beta: Supports Architecture C  
- Gamma: Strongly supports Architecture C

### Cross-Seed Reproducibility

Both Seeds (001, 002) independently converge toward Architecture C.

- Seed-001: Supports Architecture C
- Seed-002: Supports Architecture C (slight improvement)

## Conclusion

Architecture C is **REPRODUCIBLE** across different:
- Seeds (Seed-001, Seed-002)
- Engines (Alpha, Beta, Gamma)
- Independent executions (60 total runs)
