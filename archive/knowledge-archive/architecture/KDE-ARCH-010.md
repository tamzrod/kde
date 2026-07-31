# KDE-ARCH-010: SCADA Platform Design Tradeoffs

**Knowledge ID**: KDE-ARCH-010  
**Title**: Design Tradeoff Analysis for SCADA Platform Architecture  
**Version**: 1.0.0  
**Status**: CANDIDATE  
**Evidence Level**: Level 1 — Experimental  
**Created**: 2026-07-20  
**Source Investigation**: INV-013  
**Valid Until**: 2026-10-20

---

## Definition

This knowledge artifact documents design tradeoffs encountered during SCADA platform architecture. Each tradeoff captures the tension between competing concerns and the rationale for the chosen path.

## Scope

**Covers**:
- Technology selection decisions
- Architectural choices
- Operational considerations

**Does Not Cover**:
- Detailed implementation guidance (see KDE-ARCH-009)
- Protocol-specific tradeoffs (IEC 61850, DNP3)

---

## Tradeoff 1: Monolith vs. Microservices

### Tension
Simplicity of deployment vs. scalability and isolation

### Options

| Aspect | Monolith | Microservices |
|--------|----------|--------------|
| Deployment | Single unit | Multiple services |
| Scaling | Whole app | Per-service |
| Failure isolation | None | Service-level |
| Development complexity | Lower | Higher |
| Resource efficiency | Better (no overhead) | Worse (per-service overhead) |

### Evidence

**Monolith advantages observed**:
- Single deployment artifact
- No inter-service communication overhead
- Simpler local development
- Lower memory footprint

**Microservices advantages observed**:
- Simulation service requires 2x resources → isolated scaling
- Historian failure shouldn't crash alarms → fault isolation
- Different update frequencies → independent deployments
- Team boundaries align with service boundaries

### Decision

**Chosen**: Microservices (8 services)

### Rationale
1. Simulation resource requirements significantly exceed other services
2. Service failure isolation is critical for 24/7 operation
3. Team of 4+ can work in parallel on different services
4. Future scaling path is clearer

### Conditions for Monolith
- Team of 1-2 developers
- <500 devices
- No significant scaling requirements

### Conditions for Microservices
- Team of 4+ developers
- >500 devices
- Diverse resource needs
- Fault isolation required

---

## Tradeoff 2: Single Database vs. Polyglot Persistence

### Tension
Operational simplicity vs. query optimization

### Options

| Aspect | Single DB | Polyglot |
|--------|-----------|----------|
| Database expertise needed | One | Multiple |
| Operational complexity | Lower | Higher |
| Query performance | Suboptimal | Optimized |
| Data consistency | Stronger | Requires coordination |
| Backup strategy | Unified | Per-database |

### Evidence

**Single database (PostgreSQL) for all data**:
```sql
-- Telemetry storage
CREATE TABLE telemetry (
  device_id UUID,
  tag_id VARCHAR,
  value DECIMAL,
  timestamp TIMESTAMPTZ
);
-- Problem: 1M rows/day, time-range queries slow without partitioning
```

**Polyglot approach**:
```sql
-- PostgreSQL for config
CREATE TABLE devices (...); -- Fast joins, complex queries

-- InfluxDB for telemetry
> INSERT telemetry,device_id=x,tag_id=y value=123 1700000000000000000
-- Benefit: Built-in time-series optimizations, automatic downsampling
```

### Decision

**Chosen**: Polyglot (PostgreSQL + InfluxDB + Loki)

### Rationale
1. Telemetry write volume (1M+ points/day) exceeds single DB optimization
2. Time-range queries on telemetry benefit from InfluxDB compression
3. Event logging has different retention needs than configuration
4. Each database is battle-tested for its use case

### Conditions for Single Database
- <100K telemetry points/day
- Simple deployment environment
- Limited database expertise

### Conditions for Polyglot
- High telemetry volume
- Multiple data types with distinct access patterns
- Team comfortable with multiple databases

---

## Tradeoff 3: WebSocket vs. Server-Sent Events (SSE)

### Tension
Bidirectional communication vs. implementation simplicity

### Options

| Aspect | WebSocket | SSE |
|--------|-----------|-----|
| Direction | Bidirectional | Server-to-client only |
| Browser support | Universal | Universal |
| Reconnection | Manual | Automatic |
| Implementation | More complex | Simpler |
| Scalability | Requires sticky sessions | Stateless |
| Overhead | Lower (after handshake) | Higher (no framing) |

### Evidence

**SSE limitation for SCADA**:
```javascript
// SSE: Server can push, client cannot respond
eventSource.onmessage = (e) => console.log(e.data);
// Client cannot send commands via same connection
// Would need separate HTTP request for commands
```

**WebSocket for SCADA**:
```javascript
// Bidirectional: Commands and updates on same connection
ws.onmessage = (e) => updateUI(JSON.parse(e.data));
ws.send(JSON.stringify({ command: 'trip', device: 'breaker-1' }));
```

### Decision

**Chosen**: WebSocket

### Rationale
1. Commands must be sent during real-time monitoring
2. Single connection simplifies client state management
3. Binary protocol available if needed (WS over TCP)
4. Connection overhead is acceptable for SCADA (typically 50 users max)

### Conditions for SSE
- Display-only dashboards
- Public information displays
- Simple monitoring without control

### Conditions for WebSocket
- Control operations needed
- Bidirectional communication
- High update frequency

---

## Tradeoff 4: Custom UI Components vs. Component Library

### Tension
Development speed vs. bundle size and control

### Options

| Aspect | Custom | Material UI / AntD |
|--------|--------|-------------------|
| Development time | Higher | Lower |
| Bundle size | Smaller | Larger |
| Consistency | Manual | Built-in |
| Customization | Full control | Limited by library |
| Learning curve | Steeper | Lower |

### Evidence

**Material UI overhead observed**:
```javascript
// Import entire library: +150KB gzipped
import { Button, Card, Table, Modal } from 'material-ui';

// Custom components: Only what's needed
import Button from './components/Button'; // +2KB
import Card from './components/Card'; // +3KB
```

**SCADA-specific requirements**:
- Custom equipment icons (breakers, transformers)
- Real-time value displays with color coding
- Alarm severity indicators
- Power flow animations

### Decision

**Chosen**: Custom components

### Rationale
1. SCADA requires specialized components not in standard libraries
2. Bundle size matters for initial page load
3. Full control over styling and behavior
4. Patterns established once, reused across pages

### Conditions for Component Library
- Rapid prototyping
- Standard business applications
- Small team with tight deadlines

### Conditions for Custom
- Specialized UI requirements
- Performance-critical applications
- Long-lived projects

---

## Tradeoff 5: SVG vs. Canvas for Single Line Diagrams

### Tension
Interactivity and accessibility vs. performance with many elements

### Options

| Aspect | SVG | Canvas |
|--------|-----|--------|
| Interactivity | Native DOM events | Manual hit detection |
| Accessibility | Native | Requires ARIA workarounds |
| Element count | ~1000 before degradation | ~10000+ |
| Animation | CSS/JS | Direct pixel manipulation |
| Memory | Higher (DOM nodes) | Lower |
| Zoom quality | Vector (crisp) | Rasterization |

### Evidence

**SVG performance test results**:
| Elements | Render Time | Memory | FPS |
|----------|-------------|--------|-----|
| 100 | 12ms | 5MB | 60 |
| 500 | 45ms | 25MB | 45 |
| 1000 | 120ms | 50MB | 25 |
| 2000 | 350ms | 100MB | 8 |

**SCADA SLD typical count**: 100-500 devices per feeder

### Decision

**Chosen**: SVG with viewport virtualization

### Rationale
1. SCADA SLDs typically have 100-500 elements (within SVG performance range)
2. Interactive elements (buttons, tooltips) are easier with SVG
3. Accessibility requirements favor SVG
4. Viewport virtualization addresses performance concerns

### Conditions for Canvas
- High-density visualizations (>5000 elements)
- Gaming-like performance needs
- No accessibility requirements

### Conditions for SVG
- Interactive elements needed
- Accessibility required
- <2000 elements expected

---

## Tradeoff 6: Stateful vs. Stateless Alarms

### Tension
Workflow richness vs. simplicity

### Options

| Aspect | Stateless | Stateful |
|--------|-----------|----------|
| Implementation | Simpler | More complex |
| Workflow | Limited | Rich (ack, shelve, suppress) |
| Audit trail | Basic | Comprehensive |
| Storage | Lower | Higher |
| Query complexity | Lower | Higher |

### Evidence

**Stateless approach**:
```sql
-- Only current state matters
CREATE TABLE alarms (
  device_id UUID,
  is_active BOOLEAN,
  severity VARCHAR
);
-- Cannot track: Who acknowledged? When? Why?
```

**Stateful approach**:
```sql
-- Full lifecycle tracking
CREATE TABLE alarms (
  id UUID PRIMARY KEY,
  device_id UUID,
  state VARCHAR, -- active, acknowledged, cleared, shelved, suppressed
  created_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID,
  acknowledged_comment TEXT,
  cleared_at TIMESTAMPTZ
);
```

### Decision

**Chosen**: Stateful with full lifecycle

### Rationale
1. Operators need to know who acknowledged alarms
2. Regulatory requirements demand audit trails
3. Root cause analysis requires state history
4. Workflow support (shelve for maintenance) is essential

### Conditions for Stateless
- Simple monitoring only
- No regulatory requirements
- Single operator, no handoff

### Conditions for Stateful
- Multiple operators/shifts
- Regulatory compliance
- Root cause analysis needed

---

## Tradeoff 7: Batching vs. Real-time Updates

### Tension
Network efficiency vs. responsiveness

### Options

| Aspect | Per-value | Batch |
|--------|-----------|-------|
| Latency | Immediate | 100-500ms delay |
| Network overhead | High | Low |
| Client processing | Frequent updates | Burst updates |
| Scalability | Poor | Better |

### Evidence

**Per-value updates (1-second telemetry, 100 devices)**:
```
Updates per second: 100
Message overhead (headers): ~50 bytes each
Total bandwidth: 100 × (value_bytes + 50) = ~15KB/s
```

**Batched updates (100ms intervals)**:
```
Updates per second: 10 (batches of 10)
Total bandwidth: 10 × (100_values + 50) = ~1.5KB/s
90% reduction in bandwidth
```

### Decision

**Chosen**: Batched updates (100-500ms intervals)

### Rationale
1. Human operators cannot perceive <500ms changes
2. 90% bandwidth reduction improves scalability
3. Client-side buffering enables smooth animations
4. Critical alarms can bypass batching (immediate)

### Conditions for Real-time
- Control loop feedback (sub-second response)
- Human safety systems
- High-frequency trading

### Conditions for Batched
- Human monitoring applications
- Multiple users sharing bandwidth
- General SCADA applications

---

## Tradeoff 8: Thick vs. Thin Backend

### Tension
Client simplicity vs. backend complexity

### Options

| Aspect | Thin Backend | Thick Backend |
|--------|--------------|---------------|
| Backend complexity | Lower | Higher |
| Client logic | More | Less |
| API surface | Larger | Smaller |
| Reusability | Better | Worse |
| Coupling | Loose | Tight |

### Evidence

**Thin backend approach**:
```
Frontend: 1000 lines (complex queries, filtering, aggregation)
Backend: 100 lines (simple CRUD proxy)
API: 50 endpoints
```

**Thick backend approach**:
```
Frontend: 500 lines (display logic only)
Backend: 2000 lines (business logic, aggregation, caching)
API: 20 endpoints
```

### Decision

**Chosen**: Thick backend

### Rationale
1. Centralized business logic ensures consistency
2. Caching reduces database load
3. API surface is simpler to maintain
4. Different frontends (web, mobile, API) share logic

### Conditions for Thin Backend
- Multiple diverse clients
- API-first design
- Simple business logic

### Conditions for Thick Backend
- Single client type
- Complex business logic
- Strong consistency requirements

---

## Summary Matrix

| Tradeoff | Decision | Primary Driver |
|----------|----------|----------------|
| Monolith vs Microservices | Microservices | Fault isolation |
| Single vs Polyglot DB | Polyglot | Query optimization |
| WebSocket vs SSE | WebSocket | Bidirectional |
| Custom vs Library UI | Custom | Specialized needs |
| SVG vs Canvas | SVG | Interactivity |
| Stateful vs Stateless Alarms | Stateful | Audit requirements |
| Batching vs Real-time | Batching | Scalability |
| Thick vs Thin Backend | Thick | Consistency |

---

## Dependencies

- KDE-ARCH-009: SCADA Platform Architecture Patterns
- KDE-ARCH-001: Architecture C Specification

---

## Related Knowledge

- INV-013: SCADA Platform Architecture Investigation
- KDE-ARCH-008: Knowledge Promotion Rules

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial candidate from INV-013 |

---

## Governance Authority

KDE-GOV-005: Architecture is governed by evidence.

---

## Reference

- Full Tradeoff Analysis: [`laboratory/investigations/INV-013/ARCHITECTURAL-DESIGN.md`](./INV-013/ARCHITECTURAL-DESIGN.md#12-risks-and-design-tradeoffs)
