# Lessons Learned: INV-032 — Desktop Runtime & Application Embedding

**Investigation**: INV-032
**Date**: 2026-07-21T06:40:00Z

---

## What Worked

1. **Evidence-based research**: Using official documentation and primary sources provided high-quality evidence
2. **Pattern identification**: Identifying common patterns across frameworks (IPC, security, packaging) provided actionable knowledge
3. **Multi-source comparison**: Comparing Electron vs Tauri vs native approaches revealed key trade-offs

## What Didn't Work

1. **Limited performance data**: Exact benchmark numbers were difficult to obtain; much evidence was qualitative
2. **Industrial vendor coverage**: Specific SCADA vendor deployment patterns were underrepresented in public documentation

## Future Improvements

1. **Empirical testing**: Conduct experiments to collect actual performance benchmarks
2. **Extended vendor research**: Interview or survey SCADA/industrial software vendors
3. **Framework deep-dives**: Conduct separate investigations for Wails, Neutralino.js

## Unexpected Findings

1. **Tauri v2 IPC improvements**: The raw payload and Channel API significantly change IPC performance expectations
2. **Industrial tooling maturity**: Windows IoT and OSTree provide surprisingly mature industrial deployment patterns
3. **SQLite dominance**: SQLite's dominance in embedded databases is even stronger than initially expected

## Process Observations

1. **Scope management**: The scope was broad; focusing on specific sub-areas might yield deeper insights
2. **Evidence gaps**: Common patterns emerged across frameworks, but framework-specific details required separate research
3. **Documentation quality**: Official framework documentation (Electron, Tauri) was comprehensive; third-party sources varied widely
