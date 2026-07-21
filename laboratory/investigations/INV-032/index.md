# Investigation INV-032: Desktop Runtime & Application Embedding

**Investigation**: INV-032
**Title**: Desktop Runtime & Application Embedding
**Updated**: 2026-07-21T06:45:00Z
**Status**: COMPLETE

---

## Experiments

No experiments created yet (investigation-only).

---

## Evidence Collection

| Category | Status | Evidence Count |
|----------|--------|----------------|
| Desktop Runtime Frameworks | ✅ Complete | 2 |
| Embedded Browser Technologies | ✅ Complete | 2 |
| Runtime Architecture | ✅ Complete | 3 |
| Backend Embedding | ✅ Complete | 2 |
| Embedded Services | ✅ Complete | 1 |
| Packaging | ✅ Complete | 1 |
| Security | ✅ Complete | 2 |
| Performance | ✅ Complete | 2 |
| Cross-Platform | ✅ Complete | 2 |
| Industrial Deployment | ✅ Complete | 1 |

**Total Evidence Items**: 6 (indexed)

---

## Links

Experiments are linked via the `links/` directory.

---

## Research Progress

- [x] Investigation created
- [x] Scope defined
- [x] Evidence collected (Desktop Runtime Frameworks)
- [x] Evidence collected (Embedded Browser Technologies)
- [x] Evidence collected (Runtime Architecture)
- [x] Evidence collected (Backend Embedding)
- [x] Evidence collected (Embedded Services)
- [x] Evidence collected (Packaging)
- [x] Evidence collected (Security)
- [x] Synthesis created
- [x] Validation performed
- [x] Conclusion documented

---

## Key Findings

1. **Multi-process browser architecture is universal** across Electron, Tauri, CEF
2. **IPC performance requires careful design** (async patterns, binary for large payloads)
3. **Binary size vs capability trade-off** exists between Tauri (smaller) and Electron (bundled)
4. **SQLite is the default embedded database** with CRDT sync options
5. **Cross-platform packaging requires platform-specific decisions**
6. **Industrial deployment requires reproducible builds with signing and rollback**

---

## Confidence

**Overall Confidence**: MEDIUM-HIGH

| Factor | Assessment |
|--------|------------|
| Evidence Quality | HIGH |
| Reproducibility | MEDIUM |
| Consistency | HIGH |
