# KDE-ARCH-009: SCADA Platform Architecture Patterns

**Knowledge ID**: KDE-ARCH-009  
**Title**: Architectural Patterns for Real-Time SCADA Platforms  
**Version**: 1.0.0  
**Status**: CANDIDATE  
**Evidence Level**: Level 1 — Experimental  
**Created**: 2026-07-20  
**Source Investigation**: INV-013  
**Valid Until**: 2026-10-20

---

## Definition

This knowledge artifact captures architectural patterns identified during the design of a Distribution Utility SCADA platform. These patterns are applicable to real-time monitoring and control systems in industrial automation contexts.

## Scope

**Covers**:
- Real-time data acquisition and visualization
- Alarm management workflows
- Device control architectures
- Mock data generation for simulation

**Does Not Cover**:
- Hardware-level protocols (IEC 61850, DNP3)
- Cybersecurity hardening
- Actual grid optimization algorithms

---

## Pattern 1: Polyglot Persistence for SCADA

### Statement
SCADA systems benefit from using specialized databases for different data types rather than a single monolithic database.

### Evidence
| Data Type | Access Pattern | Optimal Storage |
|-----------|---------------|-----------------|
| Telemetry | High-frequency writes, time-range queries | InfluxDB |
| Events | Sequential writes, chronological queries | Loki |
| Configuration | Low-frequency writes, complex relations | PostgreSQL |

### Implementation

```
┌─────────────────────────────────────────────┐
│              SCADA Application               │
└─────────────────────────────────────────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │ InfluxDB │  │   Loki   │  │PostgreSQL│
   │(Telemetry)│  │ (Events) │  │ (Config) │
   └──────────┘  └──────────┘  └──────────┘
```

### Tradeoffs

| Aspect | Single DB | Polyglot |
|--------|-----------|----------|
| Operational complexity | Lower | Higher |
| Query performance | Suboptimal | Optimized |
| Data isolation | None | Strong |
| Consistency | Stronger | Requires coordination |

### Conditions
- Applicable when: Multiple data types with distinct access patterns
- Not applicable when: Simple deployment, limited resources

---

## Pattern 2: Backend-as-Abstraction-Layer

### Statement
Frontend clients must never access databases directly; all database access must route through backend services.

### Evidence
SCADA platforms require:
- Centralized authentication enforcement
- Rate limiting per user/role
- Data transformation for frontend consumption
- API versioning support

### Implementation

```
Browser ──► API Gateway ──► Services ──► Databases
                │
                └──► Auth validation
                └──► Rate limiting
                └──► Data transformation
```

### Rationale
- Security: Database credentials never exposed to client
- Abstraction: Frontend decoupled from database schema
- Flexibility: Database changes don't break frontend

### Conditions
- Always applicable for production SCADA systems

---

## Pattern 3: WebSocket Subscription Model

### Statement
Real-time SCADA updates should use topic-based WebSocket subscriptions rather than broadcasting all updates to all clients.

### Evidence
Different UI components need different data:
- Dashboard: System-wide KPIs
- SLD: Specific feeder data
- Alarm viewer: Alarm updates only

### Implementation

```typescript
// Client subscription
{ "type": "subscribe", "channels": ["telemetry", "alarms"] }

// Server broadcasts to relevant subscribers only
interface WSSubscription {
  channel: string;
  clients: Set<WebSocket>;
}
```

### Message Batching

| Update Frequency | Batch Interval | Use Case |
|------------------|----------------|----------|
| Telemetry | 100-500ms | Live monitoring |
| Alarms | Immediate | Critical alerts |
| Events | 1s | Audit trail |

### Conditions
- Applicable when: Multiple concurrent users, varied data needs
- Not applicable when: Single user, simple monitoring

---

## Pattern 4: Alarm State Machine

### Statement
Alarms require a state machine with multiple states beyond simple boolean.

### Evidence
SCADA operators need:
- Active → Acknowledged workflow
- Shelving for maintenance
- Suppression based on rules
- Audit trail of state changes

### State Diagram

```
        ┌─────────┐
        │  ACTIVE  │
        └────┬────┘
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
┌───────┐ ┌────────┐ ┌─────────┐
│ ACKN  │ │CLEARED │ │ SHELVED │
└───────┘ └────────┘ └─────────┘
    │        │        │
    │        ▼        │
    └──────►┼◄────────┘
            │
            ▼
      ┌───────────┐
      │ SUPPRESSED│
      └───────────┘
```

### Implementation

```typescript
interface Alarm {
  state: 'active' | 'acknowledged' | 'cleared' | 'shelved' | 'suppressed';
  transitions: {
    active: ['acknowledged', 'cleared', 'shelved', 'suppressed'],
    acknowledged: ['cleared', 'shelved', 'suppressed'],
    // ...
  };
}
```

### Conditions
- Always applicable for operational alarm management

---

## Pattern 5: Electrical Consistency in Mock Data

### Statement
Mock SCADA data must follow physical electrical laws to provide realistic simulation.

### Evidence
Random telemetry values fail to:
- Reflect load profiles (daily curves)
- Follow power balance equations
- Show voltage drop along feeders
- Propagate fault conditions correctly

### Implementation

```typescript
// Hierarchical power flow
interface GridModel {
  substations: Substation[];     // Primary sources
  feeders: Feeder[];            // Distribution paths
  devices: Device[];            // Loads, switches, transformers
}

// Power balance at each node
substation.activePower === Σ(feeder.powerFlow for feeder in substation.feeders)

// Voltage drop calculation
voltageDrop = current × impedance × length
```

### Key Calculations

| Quantity | Formula | Unit |
|----------|---------|------|
| Power | P = V × I × cos(φ) | MW |
| Reactive Power | Q = V × I × sin(φ) | MVAR |
| Voltage Drop | ΔV = I × Z × L | V |
| Line Loss | P_loss = 3 × I² × R × L | kW |

### Conditions
- Applicable when: Operator training, system testing, demo environments

---

## Pattern 6: Hierarchical Device Model

### Statement
SCADA devices should be modeled hierarchically from substations to individual equipment.

### Evidence
Utility systems naturally organize as:
- Substation (high voltage)
- Feeders (medium voltage)
- Line devices (switches, reclosers)
- Transformers
- Loads

### Implementation

```typescript
interface Device {
  id: string;
  type: 'substation' | 'feeder' | 'breaker' | ...;
  parent_id?: string;  // Points to containing device
  children?: string[]; // Contained devices
}
```

### Benefits
- Natural representation of grid topology
- Enables hierarchical queries
- Simplifies alarm correlation
- Supports aggregated views

---

## Pattern 7: Command Sequencing

### Statement
Device control commands require sequencing with state tracking and audit logging.

### Evidence
Control operations need:
- Issue → Execute → Result workflow
- Timeout handling
- Retry logic
- Full audit trail

### Implementation

```typescript
interface Command {
  id: string;
  device_id: string;
  command_type: 'open' | 'close' | 'set' | ...;
  status: 'pending' | 'executing' | 'executed' | 'failed' | 'cancelled';
  issued_by: string;
  issued_at: Date;
  result?: any;
}
```

### Events to Log
1. Command issued (who, what, when)
2. Command executing (device receiving)
3. Command result (success/failure)
4. All state changes in device

---

## Pattern 8: Circuit Breaker for Services

### Statement
Service-to-service communication should implement circuit breaker pattern.

### Evidence
Backend services can fail:
- InfluxDB overloaded → historian unavailable
- Loki compaction → event queries timeout
- Device misconfiguration → command failures

### Implementation

```typescript
// Circuit breaker states
type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

// Open after N consecutive failures
// Try half-open after timeout
// Close after successful call
```

### Conditions
- Applicable when: Multiple backend services, resilience required

---

## Pattern 9: SOE Recording with Nanosecond Precision

### Statement
Sequence of Events recording requires nanosecond timestamps for correct ordering.

### Evidence
Protection events can occur within milliseconds:
- 10:30:00.001 - Breaker A trips
- 10:30:00.002 - Breaker B trips
- 10:30:00.003 - Recloser locks out

### Implementation

```
Loki timestamp: nanoseconds since epoch
PostgreSQL: timestamp with time zone (microsecond precision)
InfluxDB: nanosecond precision
```

### Challenges
- Clock synchronization across devices
- Network latency compensation
- Timestamp drift correction

---

## Pattern 10: SVG Virtualization for Single Line Diagrams

### Statement
SLD rendering should use SVG with viewport-based virtualization for large diagrams.

### Evidence
Distribution systems can have 1000+ devices on a single feeder:
- Rendering all devices causes jank
- Zoom/pan becomes unresponsive
- Memory usage spikes

### Implementation

```typescript
// Viewport-based rendering
interface Viewport {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  zoom: number;
}

// Only render elements within viewport
const visibleDevices = allDevices.filter(
  d => isInViewport(d.position, viewport)
);
```

### Conditions
- Applicable when: >200 devices on single SLD
- Use Canvas fallback for >5000 elements

---

## Pattern 11: Real-time Delta Compression

### Statement
Real-time updates should only send changed values (delta compression).

### Evidence
Most telemetry values change slowly:
- Voltage: ±5% variation
- Position: Binary (open/closed)
- Temperature: Slow drift

### Implementation

```typescript
// Track last sent values
const lastSent = new Map<string, TelemetryValue>();

// Only send if value changed
if (currentValue !== lastSent.get(key)) {
  sendToClient({ deviceId, tagId, value: currentValue });
  lastSent.set(key, currentValue);
}
```

### Benefits
- Reduces network bandwidth
- Decreases client processing
- Improves scalability

---

## Pattern 12: Tiered Data Retention

### Statement
SCADA data should have tiered retention with progressive aggregation.

### Evidence
Different data has different value over time:
- 1-second telemetry: Useful for 24 hours
- 1-minute aggregates: Useful for 30 days
- 1-hour aggregates: Useful for 1 year

### Implementation

```
Retention Policies:
├── 1-second resolution: 7 days
├── 1-minute resolution: 30 days
├── 1-hour resolution: 1 year
└── 1-day resolution: 5 years
```

### Conditions
- Always applicable for production historian

---

## Pattern 13: Role-Based Access with Permissions

### Statement
SCADA access control should use roles with specific permissions rather than generic admin/user roles.

### Evidence
Different operators have different responsibilities:
- Operators: View + acknowledge alarms
- Engineers: Control devices + configure
- Admins: User management + system config

### Implementation

```typescript
interface Role {
  name: string;
  permissions: string[];
}

const OPERATOR = {
  name: 'operator',
  permissions: [
    'view:telemetry',
    'view:alarms',
    'ack:alarms',
    'view:events'
  ]
};

const ENGINEER = {
  name: 'engineer',
  permissions: [
    'view:telemetry',
    'view:alarms',
    'ack:alarms',
    'issue:commands',
    'configure:devices'
  ]
};
```

---

## Evidence Summary

| Pattern | Source | Evidence Type |
|---------|--------|---------------|
| Polyglot Persistence | INV-013 | Design reasoning |
| Backend-as-Abstraction | INV-013 | Security requirements |
| WebSocket Subscriptions | INV-013 | Scalability needs |
| Alarm State Machine | INV-013 | Operator workflows |
| Electrical Consistency | INV-013 | Simulation realism |
| Hierarchical Device Model | INV-013 | Grid topology |
| Command Sequencing | INV-013 | Control requirements |
| Circuit Breaker | INV-013 | Resilience patterns |
| SOE Recording | INV-013 | Protection analysis |
| SVG Virtualization | INV-013 | Performance needs |
| Delta Compression | INV-013 | Network efficiency |
| Tiered Retention | INV-013 | Storage optimization |
| RBAC with Permissions | INV-013 | Security model |

---

## Dependencies

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-003: Artifact Lifecycle
- KDE-ARCH-006: Metadata Standard

---

## Related Knowledge

- KDE-ARCH-008: Knowledge Promotion Rules
- INV-013: SCADA Platform Architecture Investigation

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial candidate from INV-013 |

---

## Governance Authority

KDE-GOV-001: Knowledge artifacts require promotion review.

KDE-GOV-005: Architecture is governed by evidence.

---

## Reference

- Full Architecture: [`laboratory/investigations/INV-013/ARCHITECTURAL-DESIGN.md`](./INV-013/ARCHITECTURAL-DESIGN.md)
- Investigation: [`laboratory/investigations/INV-013/investigation.md`](./INV-013/investigation.md)
