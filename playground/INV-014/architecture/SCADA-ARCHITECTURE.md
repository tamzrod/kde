# Marinduque SCADA Platform - Initial Architecture

**Document Version**: 0.1.0  
**Date**: 2026-07-21  
**Investigation**: INV-014  
**Based On**: KDE-ARCH-009 (13 SCADA Platform Architecture Patterns)

---

## 1. Architecture Overview

This document defines the initial architecture for the Marinduque Electrical System SCADA Web Application. The architecture is derived from validated knowledge artifacts in the KDE repository, specifically **KDE-ARCH-009** which documents 13 architectural patterns for real-time SCADA platforms.

### 1.1 Architecture Principles

| Principle | Source | Application |
|-----------|--------|-------------|
| Polyglot Persistence | KDE-ARCH-009 P1 | Specialized databases for different data types |
| Backend-as-Abstraction | KDE-ARCH-009 P2 | All DB access through backend services |
| Real-Time via WebSocket | KDE-ARCH-009 P3 | Topic-based subscriptions |
| Alarm State Machine | KDE-ARCH-009 P4 | Multi-state alarm workflow |
| Electrical Consistency | KDE-ARCH-009 P5 | Mock data follows physical laws |
| Hierarchical Device Model | KDE-ARCH-009 P6 | Natural grid topology |
| Command Sequencing | KDE-ARCH-009 P7 | Issue → Execute → Result |
| Circuit Breaker | KDE-ARCH-009 P8 | Service resilience |
| SOE Precision | KDE-ARCH-009 P9 | Nanosecond timestamps |
| SVG Virtualization | KDE-ARCH-009 P10 | Large diagram rendering |
| Delta Compression | KDE-ARCH-009 P11 | Efficient updates |
| Tiered Retention | KDE-ARCH-009 P12 | Progressive data aggregation |
| RBAC with Permissions | KDE-ARCH-009 P13 | Granular access control |

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MARINDUQUE SCADA PLATFORM                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                        CLIENT LAYER                                     │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐           │ │
│  │  │   Web Browser  │  │   Web Browser  │  │   Web Browser  │           │ │
│  │  │   Dashboard    │  │   SLD View     │  │   GIS View     │           │ │
│  │  │   localhost    │  │   localhost    │  │   localhost    │           │ │
│  │  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘           │ │
│  └──────────┼───────────────────┼───────────────────┼────────────────────┘ │
│             │                   │                   │                       │
│             └───────────────────┼───────────────────┘                       │
│                                 │                                           │
│  ┌──────────────────────────────┼───────────────────────────────────────┐ │
│  │                              ▼                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │                      API GATEWAY                                │ │ │
│  │  │  • JWT Authentication  • Rate Limiting  • Request Validation   │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────┼───────────────────────────────────────┘ │
│                                 │                                           │
│  ┌──────────────────────────────┼───────────────────────────────────────┐ │
│  │                              ▼                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │                      SERVICE LAYER                             │ │ │
│  │  │                                                                 │ │ │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │ │ │
│  │  │  │  Telemetry  │  │    Alarm    │  │   Command   │              │ │ │
│  │  │  │   Service   │  │   Service   │  │   Service   │              │ │ │
│  │  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │ │ │
│  │  │         │                │                │                      │ │ │
│  │  │         └────────────────┼────────────────┘                       │ │ │
│  │  │                          ▼                                      │ │ │
│  │  │                   ┌─────────────┐                                │ │ │
│  │  │                   │ WebSocket   │                                │ │ │
│  │  │                   │   Broker    │                                │ │ │
│  │  │                   └─────────────┘                                │ │ │
│  │  │                                                                 │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────┼───────────────────────────────────────┘ │
│                                 │                                           │
│  ┌──────────────────────────────┼───────────────────────────────────────┐ │
│  │                              ▼                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │                       DATA LAYER                               │ │ │
│  │  │                                                                 │ │ │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │ │ │
│  │  │  │  InfluxDB   │  │    Loki     │  │ PostgreSQL  │            │ │ │
│  │  │  │ (Telemetry) │  │  (Events)   │  │  (Config)   │            │ │ │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘            │ │ │
│  │  │                                                                 │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Frontend | React | 18.x | UI Framework |
| Frontend | TypeScript | 5.x | Type safety |
| Frontend | Leaflet | 1.9.x | GIS mapping |
| Frontend | D3.js | 7.x | Charts |
| Backend | Node.js | 20.x | Runtime |
| Backend | Express | 4.x | API Framework |
| Backend | Socket.io | 4.x | WebSocket |
| Telemetry DB | InfluxDB | 2.x | Time-series data |
| Event DB | Loki | 2.x | Log storage |
| Config DB | PostgreSQL | 15.x | Relational data |
| Container | Docker | 24.x | Containerization |
| Container | Docker Compose | 2.x | Orchestration |

---

## 3. Service Architecture

### 3.1 Telemetry Service

**Responsibilities:**
- Receive and store real-time measurements
- Query historical telemetry
- Publish updates via WebSocket

**API Endpoints:**
```
GET  /api/telemetry/current          - Current values for all devices
GET  /api/telemetry/history/:device - Historical data for device
POST /api/telemetry                 - Ingest new measurement
WS   /ws/telemetry                  - Real-time subscription
```

**Data Model:**
```typescript
interface TelemetryPoint {
  device_id: string;
  tag_id: string;
  value: number;
  timestamp: number;      // nanoseconds since epoch
  quality: 'good' | 'uncertain' | 'bad';
}
```

### 3.2 Alarm Service

**Responsibilities:**
- Monitor conditions and generate alarms
- Manage alarm state transitions
- Audit alarm lifecycle

**API Endpoints:**
```
GET  /api/alarms                    - List active alarms
GET  /api/alarms/:id                - Get alarm details
POST /api/alarms/:id/acknowledge    - Acknowledge alarm
POST /api/alarms/:id/clear          - Clear alarm
POST /api/alarms/:id/shelve         - Shelf alarm (maintenance)
WS   /ws/alarms                     - Alarm subscription
```

**Alarm State Machine:**
```
┌─────────┐
│ ACTIVE  │
└────┬────┘
     │
     ├──► ACKNOWLEDGED ──► CLEARED
     │        │              │
     │        └──► SHELVED ◄─┘
     │
     └──► CLEARED
```

### 3.3 Command Service

**Responsibilities:**
- Queue and execute device commands
- Track command lifecycle
- Maintain command audit trail

**API Endpoints:**
```
POST /api/commands                  - Issue new command
GET  /api/commands/:id             - Get command status
POST /api/commands/:id/cancel      - Cancel pending command
GET  /api/commands/history          - Command history
```

**Command Lifecycle:**
```
PENDING ──► EXECUTING ──► EXECUTED
    │            │
    └────────────┴──► FAILED
         │
         └────────► CANCELLED
```

### 3.4 WebSocket Manager

**Responsibilities:**
- Maintain client subscriptions
- Route messages to appropriate subscribers
- Batch and throttle updates

**Message Format:**
```typescript
interface WSMessage {
  type: 'telemetry' | 'alarm' | 'event' | 'command';
  channel: string;
  payload: any;
  timestamp: number;
}
```

---

## 4. Device Hierarchy

### 4.1 Hierarchical Model

Based on **KDE-ARCH-009 Pattern 6**, the device hierarchy reflects the physical grid topology:

```
Marinduque Grid (Root)
│
├── Generation
│   ├── Power Plant: Balanacan
│   │   ├── Generator: GEN-1 (1.5 MW)
│   │   ├── Generator: GEN-2 (1.5 MW)
│   │   └── Generator: GEN-3 (1.5 MW)
│   │
│   └── Power Plant: Bantad
│       ├── Generator: GEN-4 (1.0 MW)
│       └── Generator: GEN-5 (1.0 MW)
│
├── Transmission
│   └── Substation: Balanacan Sub
│       ├── Busbar: 13.8kV Bus A
│       └── Busbar: 13.8kV Bus B
│
└── Distribution
    ├── Feeder: Feeder 1 (Sta Cruz)
    │   ├── Switch: SW-1-01
    │   ├── Recloser: RC-1-01
    │   ├── Transformer: TR-1-01 (100kVA)
    │   └── Transformer: TR-1-02 (50kVA)
    │
    ├── Feeder: Feeder 2 (Boac)
    │   └── ...
    │
    ├── Feeder: Feeder 3 (Santa Cruz)
    │   └── ...
    │
    └── Feeder: Feeder 4 (Mogpog)
        └── ...
```

### 4.2 Device Data Model

```typescript
interface Device {
  id: string;
  name: string;
  type: 'power_plant' | 'generator' | 'substation' | 'busbar' | 
        'feeder' | 'switch' | 'recloser' | 'transformer';
  parent_id: string | null;
  voltage_level: number;        // kV
  capacity: number;            // kW or kVA
  location: {
    latitude: number;
    longitude: number;
  };
  tags: string[];              // Telemetry point identifiers
  status: 'normal' | 'warning' | 'alarm' | 'offline';
}
```

---

## 5. Data Architecture

### 5.1 Polyglot Persistence

Based on **KDE-ARCH-009 Pattern 1**:

| Database | Data Type | Access Pattern | Retention |
|----------|-----------|---------------|----------|
| InfluxDB | Telemetry | High-freq writes, time-range queries | Tiered |
| Loki | Events/SOE | Sequential writes, chronological queries | 7 days |
| PostgreSQL | Config | Low-freq writes, complex relations | Permanent |

### 5.2 InfluxDB Schema

**Measurement: generators**
```
Tags: plant_id, generator_id, status
Fields: active_power, reactive_power, voltage, frequency, temperature
```

**Measurement: feeders**
```
Tags: feeder_id, substation_id, status
Fields: current, power_flow, voltage, status_code
```

### 5.3 Tiered Retention Policy

Based on **KDE-ARCH-009 Pattern 12**:

| Resolution | Retention | Use Case |
|-----------|-----------|----------|
| 1 second | 7 days | Real-time monitoring |
| 1 minute | 30 days | Trend analysis |
| 1 hour | 1 year | Historical reports |
| 1 day | 5 years | Long-term analysis |

---

## 6. Security Architecture

### 6.1 Authentication

- JWT-based authentication
- Token expiration: 8 hours (shift length)
- Refresh token support

### 6.2 Authorization Model

Based on **KDE-ARCH-009 Pattern 13**:

```typescript
// Permissions
const PERMISSIONS = {
  VIEW_TELEMETRY: 'view:telemetry',
  VIEW_ALARMS: 'view:alarms',
  ACK_ALARMS: 'ack:alarms',
  VIEW_EVENTS: 'view:events',
  ISSUE_COMMANDS: 'issue:commands',
  CONFIGURE_DEVICES: 'configure:devices',
  MANAGE_USERS: 'manage:users'
};

// Roles
const ROLES = {
  OPERATOR: {
    permissions: ['view:*', 'ack:alarms']
  },
  ENGINEER: {
    permissions: ['view:*', 'issue:commands', 'configure:devices']
  },
  ADMIN: {
    permissions: ['*']
  }
};
```

### 6.3 Audit Logging

All security-relevant events logged to Loki:
- Authentication attempts (success/failure)
- Authorization failures
- Command issuance
- Configuration changes
- Alarm acknowledgments

---

## 7. Network Architecture

### 7.1 Service-to-Service Communication

```
┌─────────────────────────────────────────────────────────────┐
│                   Circuit Breaker Pattern                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Client ──► CB ──► Target Service                         │
│                  │                                          │
│                  ├── CLOSED: Normal flow                    │
│                  ├── OPEN: Fail fast, return error          │
│                  └── HALF_OPEN: Test recovery               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Resilience Configuration

| Service | Timeout | Retry | Circuit Breaker |
|---------|---------|-------|----------------|
| Telemetry | 5s | 3 | 50% failure, 30s open |
| Alarm | 2s | 2 | 50% failure, 15s open |
| Command | 10s | 1 | 30% failure, 60s open |

---

## 8. Deployment Architecture

### 8.1 Container Layout

```
docker-compose.yml
│
├── Frontend Service
│   └── React application
│
├── Backend Service  
│   └── Node.js API + WebSocket
│
├── InfluxDB
│   └── Telemetry database
│
├── Loki
│   └── Event storage
│
├── PostgreSQL
│   └── Configuration database
│
└── Grafana (optional)
    └── Dashboards
```

### 8.2 Port Mapping

| Service | Internal Port | External Port |
|---------|--------------|---------------|
| Frontend | 3000 | 80, 443 |
| Backend | 4000 | 4000 |
| PostgreSQL | 5432 | - |
| InfluxDB | 8086 | - |
| Loki | 3100 | - |

---

## 9. Performance Considerations

### 9.1 WebSocket Optimization

Based on **KDE-ARCH-009 Pattern 11**:

| Update Type | Batch Interval | Example |
|-------------|---------------|---------|
| Telemetry | 100-500ms | Live monitoring |
| Alarms | Immediate | Critical alerts |
| Events | 1s | Audit trail |

### 9.2 Delta Compression

```typescript
// Only send changed values
const lastSent = new Map<string, TelemetryValue>();

function sendUpdate(point: TelemetryPoint) {
  const key = `${point.device_id}:${point.tag_id}`;
  if (point.value !== lastSent.get(key)?.value) {
    ws.send({ type: 'telemetry', payload: point });
    lastSent.set(key, point);
  }
}
```

### 9.3 SVG Virtualization

Based on **KDE-ARCH-009 Pattern 10**:

```typescript
interface Viewport {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  zoom: number;
}

// Only render visible elements
const visibleDevices = devices.filter(d => 
  isInViewport(d.position, viewport)
);
```

---

## 10. Mock Data Generation

Based on **KDE-ARCH-009 Pattern 5** (Electrical Consistency):

### 10.1 Power Balance

```
P_gen_total = P_feeder_1 + P_feeder_2 + P_feeder_3 + P_feeder_4 + P_losses
```

### 10.2 Voltage Drop

```
ΔV = I × Z × L
V_end = V_source - ΔV
```

### 10.3 Load Profile

```typescript
const loadProfile = {
  morning: { factor: 0.6, peak: '08:00' },
  afternoon: { factor: 0.8, peak: '14:00' },
  evening: { factor: 0.95, peak: '19:00' },
  night: { factor: 0.5, peak: '03:00' }
};
```

---

## 11. Implementation Phases

### Phase 1: Foundation
- Project setup (Docker Compose)
- PostgreSQL schema
- Basic device hierarchy
- JWT authentication

### Phase 2: Core Services
- Telemetry service + InfluxDB
- Real-time WebSocket
- Basic dashboard

### Phase 3: SCADA Features
- Alarm service
- SLD rendering
- Command service

### Phase 4: Advanced Features
- GIS integration
- Historical reports
- Optimization

---

## 12. Evidence Attribution

| Architecture Decision | Repository Source | Confidence |
|---------------------|-------------------|------------|
| Polyglot persistence | KDE-ARCH-009 P1 | High |
| Backend abstraction | KDE-ARCH-009 P2 | High |
| WebSocket real-time | KDE-ARCH-009 P3 | High |
| Alarm state machine | KDE-ARCH-009 P4 | High |
| Hierarchical devices | KDE-ARCH-009 P6 | High |
| Command sequencing | KDE-ARCH-009 P7 | High |
| SVG virtualization | KDE-ARCH-009 P10 | High |
| Delta compression | KDE-ARCH-009 P11 | High |
| RBAC permissions | KDE-ARCH-009 P13 | High |

---

**Document Status**: DRAFT  
**Next Review**: After Phase 1 implementation  
**Authority**: INV-014 Investigation
