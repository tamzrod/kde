# Desktop Runtime IPC Design Patterns

**Knowledge ID**: KDE-DESKTOP-002
**Title**: Desktop Runtime IPC Design Patterns
**Class**: ARCHITECTURE
**Version**: 1.0.0
**Status**: CANDIDATE
**Confidence**: MEDIUM-HIGH
**Evidence Level**: 3
**Owner**: KDE Governance
**Created**: 2026-07-21
**Updated**: 2026-07-21
**Reviewed**: TBD
**Source Investigation**: INV-032
**Evidence**:
  - EV-001: Electron Process Model documentation
  - EV-002: Tauri IPC architecture
  - EV-003: Chromium Multi-process Architecture

---

## Definition

Desktop Runtime IPC Design Patterns describe the mechanisms and best practices for inter-process communication between browser/renderer processes and native backend services in desktop application runtimes.

---

## Summary

IPC is essential for browser-to-backend communication but introduces overhead. IPC round-trip latency ranges from 0.1-0.6ms for Electron; however, JSON serialization overhead significantly impacts large payloads. Best practices include async patterns, binary transfers for large data, and minimal API exposure through secure bridges.

---

## Pattern Description

### IPC Performance Characteristics

| Aspect | Measurement | Impact |
|--------|-------------|--------|
| Round-trip latency | 0.1-0.6ms | Electron baseline |
| JSON serialization | Significant overhead | Large payloads |
| Binary transfer | Reduced overhead | ArrayBuffer, Channels |
| Synchronous IPC | Blocking | Should be avoided |

### IPC Patterns

| Pattern | Use Case | Recommendation |
|---------|----------|----------------|
| Async invoke/handle | Most operations | Preferred |
| Synchronous sendSync | Rare cases | Avoid when possible |
| Binary ArrayBuffer | Large data transfer | Use for 1MB+ payloads |
| Channel API | Streaming | Tauri v2+ for continuous data |

---

## Best Practices

### 1. Prefer Async Patterns

**Do**: Use `ipcRenderer.invoke` + `ipcMain.handle` (Electron)
**Do**: Use `invoke()` command pattern (Tauri)

**Don't**: Use synchronous `sendSync` except for rare, critical operations

### 2. Minimize Round-trips

- Batch related operations
- Use bulk transfer APIs
- Avoid chatty interfaces

### 3. Use Binary for Large Payloads

```javascript
// Prefer for large data (>1MB)
const buffer = await ipcRenderer.invoke('get-large-data');
// Over JSON serialization of same data
```

### 4. Profile Hot Paths

Identify frequently called IPC operations and optimize:
- Cache results where appropriate
- Consider local processing vs IPC trade-off
- Monitor serialization costs

---

## Evidence

### Supporting Evidence

| Evidence ID | Source | Finding |
|-------------|--------|---------|
| EV-001 | Electron IPC | Async patterns, serialization overhead |
| EV-002 | Tauri IPC | Raw payload support, Channel API in v2 |
| EV-003 | Chromium Mojo | Structured Clone Algorithm limitations |

### Key Findings

1. **Latency**: IPC round-trip is measurable (0.1-0.6ms)
2. **Serialization**: JSON overhead significant for large payloads
3. **Binary Advantage**: ArrayBuffer reduces overhead substantially
4. **Tauri v2**: New Channel API addresses streaming scenarios

---

## Technology-Specific Notes

### Electron

- `ipcRenderer.invoke()` returns Promise
- `ipcRenderer.sendSync()` blocks renderer
- Structured Clone Algorithm limits serializable types
- Context Bridge for secure API exposure

### Tauri

- `invoke()` for commands
- `Channel` API for streaming (v2)
- Raw payload support reduces serialization
- Rust backend can use async/await patterns

---

## Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | HIGH | Official documentation |
| Reproducibility | MEDIUM | Platform and framework variations |
| Consistency | HIGH | Best practices consistent across frameworks |

**Overall Confidence**: MEDIUM-HIGH

---

## Dependencies

- KDE-DESKTOP-001: Desktop Runtime Multi-Process Architecture

---

## Related Knowledge

- KDE-DESKTOP-003: Desktop Runtime Selection Criteria
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
| Evidence | EV-001, EV-002, EV-003 | 2026-07-21 |
| Extraction | Manual | 2026-07-21 |
