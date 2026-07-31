# Evidence Log: Design Decisions

**Investigation**: INV-014  
**Date Created**: 2026-07-21  
**Status**: IN_PROGRESS

---

## Evidence Classification

| Symbol | Meaning |
|--------|---------|
| 🟢 | Repository Knowledge (Validated) |
| 🟡 | Repository Knowledge (Candidate) |
| 🔵 | External Knowledge (Public) |
| ⚪ | Engine Reasoning (No specific source) |

---

## Decision D001: Real-Time Communication Protocol

| Field | Value |
|-------|-------|
| **Decision** | Use WebSocket for real-time SCADA updates |
| **Repository Artifact** | KDE-ARCH-009 Pattern 3 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 3 establishes WebSocket subscription model for varied data needs (telemetry, alarms, events) |
| **Implementation** | Topic-based subscriptions with message batching |
| **Alternatives Considered** | Server-Sent Events (lower scalability), Long Polling (higher latency), MQTT (added complexity) |

---

## Decision D002: Telemetry Storage

| Field | Value |
|-------|-------|
| **Decision** | Use InfluxDB for time-series telemetry data |
| **Repository Artifact** | KDE-ARCH-009 Pattern 1 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 1 recommends specialized databases for different data types; InfluxDB optimal for high-frequency writes and time-range queries |
| **Implementation** | Retention: 1s (7d), 1m (30d), 1h (1yr) |
| **Alternatives Considered** | PostgreSQL (suboptimal for time-series), MongoDB (less efficient for aggregation) |

---

## Decision D003: Event Storage

| Field | Value |
|-------|-------|
| **Decision** | Use Loki for event and log storage |
| **Repository Artifact** | KDE-ARCH-009 Pattern 1 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 1 identifies Loki as optimal for sequential writes and chronological queries |
| **Implementation** | SOE (Sequence of Events) with nanosecond precision |
| **Alternatives Considered** | Elasticsearch (higher resource usage), PostgreSQL (less efficient for logs) |

---

## Decision D004: Configuration Storage

| Field | Value |
|-------|-------|
| **Decision** | Use PostgreSQL for configuration and relational data |
| **Repository Artifact** | KDE-ARCH-009 Pattern 1 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 1 recommends PostgreSQL for complex relations and low-frequency writes |
| **Implementation** | Devices, users, commands, permissions |
| **Alternatives Considered** | MongoDB (less relational integrity), SQLite (limited concurrency) |

---

## Decision D005: Backend-Frontend Architecture

| Field | Value |
|-------|-------|
| **Decision** | All frontend database access through backend services (no direct DB access) |
| **Repository Artifact** | KDE-ARCH-009 Pattern 2 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.95) |
| **Rationale** | Pattern 2 mandates API Gateway for security, rate limiting, and abstraction |
| **Implementation** | Express.js API Gateway with authentication middleware |
| **Alternatives Considered** | Direct DB access (security risk), GraphQL Federation (added complexity) |

---

## Decision D006: SLD Rendering Technology

| Field | Value |
|-------|-------|
| **Decision** | Use SVG with viewport-based virtualization |
| **Repository Artifact** | KDE-ARCH-009 Pattern 10 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 10 specifies SVG for large diagrams (>200 devices); viewport virtualization for performance |
| **Implementation** | React-SVG with visible-region rendering |
| **Alternatives Considered** | Canvas (harder interaction), WebGL (overkill for this scale), PNG images (not dynamic) |

---

## Decision D007: Device Hierarchy Model

| Field | Value |
|-------|-------|
| **Decision** | Hierarchical device model: Power Plants → Substations → Feeders → Devices |
| **Repository Artifact** | KDE-ARCH-009 Pattern 6 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 6 establishes hierarchical model reflecting grid topology |
| **Implementation** | Parent-child relationships in device database |
| **Alternatives Considered** | Flat model (less intuitive), Graph model (overcomplicated) |

---

## Decision D008: Alarm State Machine

| Field | Value |
|-------|-------|
| **Decision** | Implement multi-state alarm model (Active → Acknowledged → Cleared, plus Shelved/Suppressed) |
| **Repository Artifact** | KDE-ARCH-009 Pattern 4 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.95) |
| **Rationale** | Pattern 4 defines state machine with audit trail and operator workflow |
| **Implementation** | State transitions with timestamps and operator ID |
| **Alternatives Considered** | Binary alarms (insufficient for maintenance scenarios) |

---

## Decision D009: Command Sequencing

| Field | Value |
|-------|-------|
| **Decision** | Implement command sequencing with state tracking and full audit logging |
| **Repository Artifact** | KDE-ARCH-009 Pattern 7 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 7 requires Issue → Execute → Result workflow with timeout and retry |
| **Implementation** | Command queue with status tracking and event logging |
| **Alternatives Considered** | Fire-and-forget (no accountability), Two-stage (added latency) |

---

## Decision D010: Role-Based Access Control

| Field | Value |
|-------|-------|
| **Decision** | Permission-based RBAC (not role-only) |
| **Repository Artifact** | KDE-ARCH-009 Pattern 13 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 13 establishes granular permissions (view:telemetry, issue:commands, etc.) |
| **Implementation** | Role → Permissions → Users model |
| **Alternatives Considered** | Simple Admin/User roles (too coarse) |

---

## Decision D011: Dashboard Layout Pattern

| Field | Value |
|-------|-------|
| **Decision** | Use F-pattern layout with KPI prominence |
| **Repository Artifact** | `domain/visualization/dashboard-principles.md` |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | Medium (0.8) |
| **Rationale** | Dashboard principles recommend F-pattern and 5-level hierarchy |
| **Implementation** | Primary KPIs top-left, secondary metrics, detail on demand |
| **Alternatives Considered** | Magazine layout (less utility-focused), Dashboard grid (higher cognitive load) |

---

## Decision D012: SLD Color Conventions

| Field | Value |
|-------|-------|
| **Decision** | Follow North American breaker conventions (Red=Closed, Green=Open) |
| **Repository Artifact** | `domain/utility-sld/principles.md` |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.95) |
| **Rationale** | Utility-SLD principles establish standardized color meanings |
| **Implementation** | Red=Filled=Closed, Green=Outline=Open, Yellow=Unknown, Flashing=Tripped |
| **Alternatives Considered** | IEC conventions (different region), Custom colors (operator confusion) |

---

## Decision D013: Night Mode Support

| Field | Value |
|-------|-------|
| **Decision** | Include night mode with dark background and high contrast |
| **Repository Artifact** | `domain/utility-sld/principles.md` Principle 10 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | Medium (0.8) |
| **Rationale** | Control room environments require reduced brightness |
| **Implementation** | Dark theme toggle, muted colors, no pure white |
| **Alternatives Considered** | Bright-only (eye strain), Auto-adaptive (complexity) |

---

## Decision D014: GIS Coordinate System

| Field | Value |
|-------|-------|
| **Decision** | Use WGS84 (EPSG:4326) for storage, Web Mercator (EPSG:3857) for display |
| **Repository Artifact** | `domain/gis/fundamentals.md` |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.95) |
| **Rationale** | GIS fundamentals specify WGS84 as standard GPS coordinate system |
| **Implementation** | GeoJSON storage in EPSG:4326, Leaflet default projection |
| **Alternatives Considered** | Local coordinate system (no standard), UTM (zone-specific) |

---

## Decision D015: Balanacan Power Plant Capacity

| Field | Value |
|-------|-------|
| **Decision** | Model Balanacan PP at ~4.5 MW (3 × 1.5 MW units) |
| **Classification** | 🔵 External Knowledge |
| **Confidence** | Medium (0.7) |
| **Source** | Public utility documentation, news reports |
| **Rationale** | Multiple sources indicate ~4.5 MW installed capacity |
| **Note** | Actual operational capacity may vary |

---

## Decision D016: Bantad Power Plant Capacity

| Field | Value |
|-------|-------|
| **Decision** | Model Bantad PP at ~2.0 MW (2 × 1.0 MW units) |
| **Classification** | 🔵 External Knowledge |
| **Confidence** | Medium (0.7) |
| **Source** | Public utility documentation |
| **Rationale** | Secondary generation source with smaller units |
| **Note** | May serve as peaking units |

---

## Decision D017: Grid Voltage Level

| Field | Value |
|-------|-------|
| **Decision** | Use 13.8 kV as primary distribution voltage |
| **Classification** | 🔵 External Knowledge + ⚪ Engine Reasoning |
| **Confidence** | High (0.9) |
| **Source** | Standard Philippine distribution voltage |
| **Rationale** | 13.8 kV is standard for Philippine distribution utilities |
| **Implementation** | Consistent with MARELCO system design |

---

## Decision D018: Number of Distribution Feeders

| Field | Value |
|-------|-------|
| **Decision** | Model 4 main distribution feeders |
| **Classification** | 🔵 External Knowledge |
| **Confidence** | Low-Medium (0.6) |
| **Source** | Public maps, OpenStreetMap data |
| **Rationale** | Maps indicate multiple radial feeders from Balanacan substation |
| **Note** | Exact count and routes may differ from actual |

---

## Decision D019: Technology Stack Selection

| Field | Value |
|-------|-------|
| **Decision** | React + TypeScript frontend, Node.js backend |
| **Classification** | ⚪ Engine Reasoning |
| **Confidence** | Medium (0.8) |
| **Rationale** | Industry standard for web-based SCADA; strong ecosystem |
| **Repository Influence** | KDE-ARCH-009 patterns implemented in TypeScript |
| **Alternatives Considered** | Angular (larger bundle), Vue (smaller ecosystem), Python backend (less real-time performance) |

---

## Decision D020: Delta Compression for Updates

| Field | Value |
|-------|-------|
| **Decision** | Only send changed values (delta compression) |
| **Repository Artifact** | KDE-ARCH-009 Pattern 11 |
| **Classification** | 🟢 Repository Knowledge |
| **Confidence** | High (0.9) |
| **Rationale** | Pattern 11 reduces bandwidth; most values change slowly |
| **Implementation** | Track last sent values, only broadcast changes |

---

## Summary Statistics

| Source | Count | Avg Confidence |
|--------|-------|---------------|
| 🟢 Repository Knowledge | 14 | 0.91 |
| 🔵 External Knowledge | 4 | 0.70 |
| ⚪ Engine Reasoning | 2 | 0.80 |
| **Total** | **20** | **0.86** |

---

## Knowledge Attribution Summary

| Repository Artifact | Decisions Influenced |
|---------------------|---------------------|
| KDE-ARCH-009 Pattern 1 | D002, D003, D004 |
| KDE-ARCH-009 Pattern 2 | D005 |
| KDE-ARCH-009 Pattern 3 | D001 |
| KDE-ARCH-009 Pattern 4 | D008 |
| KDE-ARCH-009 Pattern 6 | D007 |
| KDE-ARCH-009 Pattern 7 | D009 |
| KDE-ARCH-009 Pattern 10 | D006 |
| KDE-ARCH-009 Pattern 11 | D020 |
| KDE-ARCH-009 Pattern 13 | D010 |
| Dashboard Principles | D011 |
| Utility-SLD Principles | D012, D013 |
| GIS Fundamentals | D014 |

---

*Evidence log complete. All decisions traceable to source.*
