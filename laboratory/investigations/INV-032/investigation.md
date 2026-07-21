# Investigation: INV-032

**ID**: INV-032
**Title**: Desktop Runtime & Application Embedding
**Version**: 1.0.0
**Date**: 2026-07-21T05:57:00Z
**Status**: ACTIVE
**Author**: KDE Laboratory

---

## Research Question

> What knowledge enables modern desktop applications to encapsulate user interfaces, backend services, browsers, databases, supporting runtimes, and operating system integration into professional desktop software regardless of technology stack, programming language, operating system, or deployment model?

---

## Scope

### Included
- Desktop runtime frameworks (Electron, Tauri, Wails, etc.)
- Embedded browser technologies (Chromium, WebView2, WebKit)
- Runtime architecture (process, IPC, lifecycle)
- Backend embedding (Go, Rust, Node.js, Python, etc.)
- Embedded services (databases, caches, HTTP services)
- Packaging models (installers, portable, self-contained)
- Security (sandboxing, code signing, secure IPC)
- Performance optimization
- Cross-platform deployment
- Industrial deployment patterns

### Excluded
- Mobile application development (iOS, Android)
- Web application development (SPA, PWA)
- Embedded systems with minimal resources (< 512MB RAM)
- Pure command-line applications without GUI

---

## Background

Modern desktop applications increasingly require sophisticated runtime environments that combine:
- Rich user interfaces built with web technologies
- Native backend services for performance-critical operations
- Embedded databases for local data persistence
- Browser engines for rendering complex UIs
- Secure IPC mechanisms for communication between components
- Comprehensive packaging for various deployment scenarios

Understanding these runtime architectures is essential for:
- Engineering software targeting professional domains
- Industrial applications (SCADA, HMI, GIS)
- Air-gapped deployment scenarios
- Cross-platform requirements
- Long-term maintainability

---

## Investigation Areas

### 1. Desktop Runtime Frameworks
- Electron ecosystem (Forge, Builder, Fiddle)
- Tauri (Rust-based, lightweight)
- Wails (Go-based)
- Neutralino.js (lightweight)
- NW.js
- CEF (Chromium Embedded Framework)
- Qt WebEngine / Qt Desktop
- WebView2 (Windows)
- Flutter Desktop
- Avalonia (XAML, cross-platform)
- GTK
- wxWidgets
- JavaFX
- Native desktop runtimes

### 2. Embedded Browser Technologies
- Chromium architecture
- CEF implementation
- WebView2 (Microsoft Edge WebView2)
- WebKit / WKWebView
- Browser lifecycle management
- Browser security models
- Browser update mechanisms
- Performance characteristics

### 3. Runtime Architecture
- Process models (single, multi-process)
- IPC mechanisms (sockets, pipes, shared memory)
- Runtime lifecycle management
- Service orchestration patterns
- Startup and shutdown sequences
- Crash recovery and supervision
- Local inter-process communication

### 4. Backend Embedding
- Go runtime embedding
- Rust integration
- Node.js embedding
- Python embedding
- Java / JVM embedding
- .NET embedding
- Native executable embedding
- Embedded web servers

### 5. Embedded Services
- SQLite and embedded databases
- Message brokers
- Logging infrastructure
- Background services
- Cache implementations
- Search engines (full-text)
- HTTP services

### 6. Packaging Models
- Portable applications
- Installers (MSI, NSIS, InnoSetup)
- Self-contained deployment
- Dependency bundling
- Runtime bundling
- AppImage, Flatpak, Snap
- DMG, PKG for macOS

### 7. Security
- Sandboxing models
- Secure IPC patterns
- Code signing requirements
- Update security
- Runtime isolation
- Secret management
- Vulnerability management

### 8. Performance
- Startup time optimization
- Memory consumption patterns
- Binary size management
- Optimization techniques
- Cold start vs warm start

### 9. Cross-Platform Considerations
- Windows deployment
- Linux deployment
- macOS deployment
- Platform-specific requirements

### 10. Industrial Deployment
- SCADA systems
- Industrial HMI
- Engineering software
- GIS applications
- Kiosk systems
- Air-gapped systems
- Portable demonstration systems

---

## Related

- Questions: INV-031 (GIS), related to deployment
- Architecture: KDE-ARCH-006 (Architecture Patterns)
- Knowledge: 001-what-is-knowledge.md (meta)

---

## Status

| Stage | Status |
|-------|--------|
| Idea | ✅ Complete |
| Investigation | ✅ Complete |
| Evidence Collection | ✅ Complete |
| Observation | ✅ Complete |
| Synthesis | ✅ Complete |
| Validation | ✅ Complete |
| Candidate Knowledge | ✅ Complete |
| Promotion Proposal | ⏳ Pending |
| Knowledge Repository | ⏳ Pending |

**Symbols**: ✅ Complete | 🔄 In Progress | ⏳ Pending
