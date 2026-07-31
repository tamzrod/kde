# Conclusion: INV-032 — Desktop Runtime & Application Embedding

**Investigation**: INV-032
**Date**: 2026-07-21T06:35:00Z
**Confidence**: MEDIUM-HIGH
**Status**: COMPLETE

---

## Final Conclusion

This investigation collected evidence-based knowledge about desktop runtime architectures, browser embedding, backend embedding, embedded services, packaging, security, and industrial deployment patterns. The research reveals several key architectural patterns that enable modern desktop applications to encapsulate user interfaces, backend services, browsers, databases, supporting runtimes, and operating system integration.

### Key Findings

#### Finding 1: Multi-Process Browser Architecture is Universal

Modern desktop runtimes (Electron, Tauri, CEF) universally adopt browser-based multi-process models where the main process handles native APIs and window management, renderer processes host web content with varying privilege levels, and IPC mechanisms enable secure communication between processes [Electron Process Model].

#### Finding 2: IPC Performance Requires Careful Design

IPC round-trip latency ranges from 0.1-0.6ms for Electron; however, JSON serialization overhead significantly impacts large payloads. Tauri v2 addresses this with raw payload support and Channel API [Electron IPC, Tauri IPC].

#### Finding 3: Binary Size vs Capability Trade-off

Tauri using system WebView2/WebKitGTK/WKWebView demonstrates order-of-magnitude smaller bundles (5-20MB vs 100-200MB) and faster cold starts compared to Electron bundling Chromium [Tauri vs Electron].

#### Finding 4: SQLite is the Default Embedded Database

SQLite is ACID-compliant, public-domain, with language bindings for all major platforms. It supports WAL mode for concurrent reads with a single writer model, and CRDT-based sync layers enable offline-first multi-device patterns [SQLite documentation].

#### Finding 5: Cross-Platform Packaging Requires Platform-Specific Decisions

Consumer desktop apps use NSIS/DMG/AppImage with auto-update; enterprise deployments use MSI/PKG with MDM tools. Auto-update is supported for NSIS and AppImage but not MSI [electron-builder documentation].

#### Finding 6: Industrial Deployment Requires Reproducible Builds

Air-gapped industrial deployments require reproducible builds with signing, offline activation mechanisms (ePKEA for Windows), transactional updates with rollback (OSTree for Linux), and provisioning packages for factory deployment [Windows IoT documentation, Yocto documentation].

---

## Evidence Summary

| Category | Evidence Items | Sources |
|----------|---------------|---------|
| Desktop Runtime Frameworks | 4 | Electron docs, Tauri docs |
| Embedded Browser Technologies | 4 | Chromium, WebView2, WebKit |
| Runtime Architecture | 6 | Electron IPC, Tauri IPC, Mojo |
| Embedded Databases | 3 | SQLite, LiteSync |
| Packaging | 2 | electron-builder |
| Industrial Deployment | 3 | Windows IoT, Yocto |

---

## Confidence Assessment

| Factor | Assessment | Justification |
|--------|------------|--------------|
| Evidence Quality | HIGH | Official documentation and primary sources |
| Reproducibility | MEDIUM | Platform-specific variations exist |
| Consistency | HIGH | Multiple frameworks confirm patterns |
| Alternative Explanations | ADDRESSED | Both Electron and Tauri patterns considered |

**Overall Confidence**: MEDIUM-HIGH

---

## Limitations

1. **Platform variations**: Detailed cross-platform benchmarks not available for all frameworks
2. **Performance metrics**: Exact numbers vary by workload and OS configuration
3. **Emerging technologies**: Wails, Neutralino.js patterns not deeply covered
4. **Specific industrial vendors**: SCADA licensing nuances limited in evidence

---

## Recommendations

Based on evidence collected, the following architectural patterns are recommended:

### For Technology Selection

| Requirement | Recommended | Evidence |
|-------------|-------------|----------|
| Smallest bundle | Tauri | 96% smaller vs Electron |
| Maximum compatibility | Electron | Bundled Chromium |
| Native performance | Tauri + Rust | Rust backend speed |
| Cross-platform consistency | Electron | Same behavior everywhere |

### For Security

1. Enable `contextIsolation: true` and `sandbox: true`
2. Disable `nodeIntegration` for untrusted content
3. Expose minimal APIs via `contextBridge`
4. Configure Content Security Policy
5. Use code signing for all platforms

### For IPC Design

1. Prefer async `invoke/handle` over synchronous `sendSync`
2. Use binary transfers (ArrayBuffer) for large payloads
3. Batch operations to minimize round-trips
4. Profile hot paths for optimization opportunities

### For Data Persistence

1. Use SQLite with WAL mode for local-first
2. Consider CRDT sync for multi-device scenarios
3. Enable encryption for sensitive data
4. Preserve WAL and SHM files during backup

### For Industrial Deployment

1. Use reproducible builds with version control
2. Implement offline activation (ePKEA, OEM license)
3. Enable secure boot with signed images
4. Use transactional updates with rollback capability

---

## Next Steps

1. **Validate**: Conduct experiments with specific framework implementations
2. **Extend**: Research Wails, Neutralino.js patterns
3. **Industrial**: Investigate specific SCADA vendor deployment patterns
4. **Performance**: Collect benchmark data for specific use cases
