# Desktop Runtime Selection Criteria

**Knowledge ID**: KDE-DESKTOP-003
**Title**: Desktop Runtime Selection Criteria
**Class**: ARCHITECTURE
**Version**: 1.0.0
**Status**: CANDIDATE
**Confidence**: MEDIUM
**Evidence Level**: 3
**Owner**: KDE Governance
**Created**: 2026-07-21
**Updated**: 2026-07-21
**Reviewed**: TBD
**Source Investigation**: INV-032
**Evidence**:
  - EV-001: Electron Process Model documentation
  - EV-002: Tauri IPC architecture
  - EV-005: electron-builder documentation

---

## Definition

Desktop Runtime Selection Criteria provide decision guidance for choosing between desktop runtime frameworks based on project requirements for bundle size, startup time, cross-platform consistency, native access, and performance.

---

## Summary

Two primary architectural choices exist for desktop application runtimes: bundled browser (Electron) providing consistent cross-platform behavior at the cost of larger binaries, and system webview (Tauri) providing smaller bundles with faster startup at the cost of OS-dependent behavior. Native development offers maximum performance with platform-specific complexity.

---

## Selection Matrix

| Criterion | Electron | Tauri | Native |
|-----------|----------|-------|--------|
| **Binary Size** | Large (100-200MB) | Small (5-20MB) | Variable |
| **Startup Time** | Slower | Faster | Fastest |
| **Cross-Platform** | Excellent | Good | Requires ports |
| **Native Access** | Via IPC | Via Rust | Direct |
| **Performance** | Good | Excellent (Rust) | Excellent |
| **Bundle Control** | Complete | Limited | N/A |
| **Web Compatibility** | Full | System-dependent | Limited |

---

## Decision Framework

### Choose Electron When

| Requirement | Rationale |
|-------------|-----------|
| Maximum cross-platform consistency | Bundled Chromium ensures same behavior |
| Full web API support | Complete browser engine |
| Largest ecosystem | Mature tooling and libraries |
| Complex UI requirements | Full CSS/HTML support |

### Choose Tauri When

| Requirement | Rationale |
|-------------|-----------|
| Smallest bundle size | 96% smaller than Electron |
| Fastest startup | No bundled browser to initialize |
| Native performance needed | Rust backend speed |
| System webview acceptable | WebKitGTK/WKWebView/WebView2 |

### Choose Native When

| Requirement | Rationale |
|-------------|-----------|
| Maximum performance | No abstraction overhead |
| Direct OS integration | Full platform capabilities |
| Minimal dependencies | Smallest possible footprint |
| Platform-specific features | Deep OS integration required |

---

## Evidence

### Supporting Evidence

| Evidence ID | Source | Finding |
|-------------|--------|---------|
| EV-001 | Electron | Bundled Chromium enables consistency |
| EV-002 | Tauri | System WebView enables small bundles |
| EV-005 | electron-builder | Framework comparison data |

### Bundle Size Comparison

| Framework | Typical Bundle Size | Relative |
|-----------|--------------------| --------|
| Electron | 100-200MB | Baseline |
| Tauri | 5-20MB | 90-95% smaller |

---

## Trade-off Analysis

### Bundle Size vs Compatibility

```
Electron ──────────────────────────────────────────►
Size: Large                              Bundle Control: Complete
Compatibility: Universal                  Updates: Bundled browser updates

Tauri ─────────────────────────────────────────────►
Size: Small                              OS Dependency: WebView version
Compatibility: System-dependent            Updates: OS-provided
```

### Performance vs Portability

```
Native ─────────────────────────────────────────────►
Performance: Maximum                     Portability: Platform-specific

Electron ──────────────────────────────────────────►
Performance: Good                         Portability: Excellent
                                              
Tauri ─────────────────────────────────────────────►
Performance: Excellent (Rust)             Portability: Good
```

---

## Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | MEDIUM | Documentation sources, limited benchmarks |
| Reproducibility | MEDIUM | Performance varies by workload |
| Consistency | HIGH | Frameworks have clear trade-offs |

**Overall Confidence**: MEDIUM

---

## Limitations

1. Performance metrics vary by workload and OS configuration
2. Bundle sizes change with framework versions
3. Emerging frameworks (Wails, Neutralino.js) not deeply covered
4. Specific use case requirements may override general guidance

---

## Related Knowledge

- KDE-DESKTOP-001: Desktop Runtime Multi-Process Architecture
- KDE-DESKTOP-002: Desktop Runtime IPC Design Patterns
- KDE-DESKTOP-005: Desktop Application Security Model

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-21 | Initial extraction from INV-032 | KDE Laboratory |

---

## Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | INV-032 | 2026-07-21 |
| Evidence | EV-001, EV-002, EV-005 | 2026-07-21 |
| Extraction | Manual | 2026-07-21 |
