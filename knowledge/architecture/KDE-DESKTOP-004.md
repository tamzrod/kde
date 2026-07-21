# Embedded Database Patterns

**Knowledge ID**: KDE-DESKTOP-004
**Title**: Embedded Database Patterns for Desktop Applications
**Class**: ARCHITECTURE
**Version**: 1.0.0
**Status**: CANDIDATE
**Confidence**: HIGH
**Evidence Level**: 4
**Owner**: KDE Governance
**Created**: 2026-07-21
**Updated**: 2026-07-21
**Reviewed**: TBD
**Source Investigation**: INV-032
**Evidence**:
  - EV-004: SQLite WAL documentation

---

## Definition

Embedded Database Patterns describe the use of SQLite and related technologies for local-first data persistence in desktop applications, including WAL mode configuration, CRDT synchronization, and encryption options.

---

## Summary

SQLite is the default embedded database for desktop applications due to its ACID compliance, public domain licensing, multi-platform support, and mature ecosystem. WAL mode enables concurrent reads with a single writer model. CRDT-based sync layers enable offline-first multi-device patterns.

---

## Pattern Description

### SQLite as Default

| Property | Value | Implication |
|----------|-------|-------------|
| License | Public Domain | No licensing concerns |
| ACID Compliance | Full | Data integrity guaranteed |
| Platforms | All major | Cross-platform support |
| Size | ~1MB | Minimal footprint |
| Bindings | All major languages | Universal support |

### Architecture

```
┌─────────────────────────────────────────┐
│         Desktop Application              │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │      Application Layer           │    │
│  └───────────────┬─────────────────┘    │
│                  │                      │
│  ┌───────────────▼─────────────────┐    │
│  │      SQLite (Embedded)           │    │
│  │  ┌─────────┐  ┌─────────────┐   │    │
│  │  │  .db    │  │  .db-wal    │   │    │
│  │  │  File   │  │  File      │   │    │
│  │  └─────────┘  └─────────────┘   │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

## Implementation Patterns

### Single-File SQLite (Local-First)

**Use Case**: Desktop applications requiring local persistence without sync

| Language | Library |
|----------|---------|
| Rust | rusqlite |
| C/C++ | SQLite3 |
| Python | sqlite3 |
| JavaScript | better-sqlite3 |
| Qt | QSQLITE |

### WAL Mode Configuration

**Use Case**: Applications requiring concurrent reads

```sql
PRAGMA journal_mode=WAL;
PRAGMA synchronous=NORMAL;
PRAGMA busy_timeout=5000;
```

| Benefit | Description |
|---------|-------------|
| Concurrent reads | Multiple readers while writing |
| Performance | Non-blocking reads |
| Recovery | WAL provides crash recovery |

### Sync Layer (Multi-Device)

**Use Case**: Applications requiring offline-first sync

| Technology | Approach |
|------------|----------|
| LiteSync | SQLite sync over network |
| CRDT | Conflict-free replicated data types |
| Custom | Application-specific sync logic |

### Encryption

**Use Case**: Applications handling sensitive data

| Option | Implementation |
|--------|----------------|
| SQLCipher | AES-256 encryption |
| SEE | SQLite Encryption Extension |
| Application-layer | Encrypt before storage |

---

## Evidence

### Supporting Evidence

| Evidence ID | Source | Finding |
|-------------|--------|---------|
| EV-004 | SQLite WAL | WAL mode documentation and concurrency |

### Key Findings

1. **ACID Compliance**: Full transactional support
2. **WAL Mode**: Concurrent reads with single writer
3. **CRDT Sync**: Offline-first multi-device patterns possible
4. **Encryption**: Multiple options for sensitive data

---

## Best Practices

### Data Backup

1. Preserve WAL and SHM files during backup
2. Use `PRAGMA wal_checkpoint(TRUNCATE)` before backup
3. Consider VACUUM for long-term storage

### Performance

1. Enable WAL mode for read-heavy workloads
2. Use indexes for frequent queries
3. Batch writes when possible
4. Monitor page size and cache

### Security

1. Enable encryption for sensitive data
2. Use parameterized queries
3. Validate input data
4. Keep SQLite updated for security patches

---

## Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | HIGH | Official SQLite documentation |
| Reproducibility | HIGH | Well-documented behavior |
| Consistency | HIGH | Mature, stable technology |

**Overall Confidence**: HIGH

---

## Related Knowledge

- KDE-DESKTOP-001: Desktop Runtime Multi-Process Architecture
- KDE-DESKTOP-005: Desktop Application Security Model
- KDE-DESKTOP-006: Industrial Deployment Patterns

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
| Evidence | EV-004 | 2026-07-21 |
| Extraction | Manual | 2026-07-21 |
