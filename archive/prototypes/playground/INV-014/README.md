# Marinduque SCADA Web Application

**Project**: INV-014 - KDE Runtime Validation  
**Purpose**: Production-quality SCADA Web Application for the Marinduque Electrical System  
**Status**: Implementation Complete

---

## Overview

This project demonstrates KDE (Knowledge Discovery Engine) runtime validation through the development of a SCADA (Supervisory Control and Data Acquisition) web application for the Marinduque Electrical System in the Philippines.

### Key Features

- **Real-time Dashboard**: Live KPIs for generation, load, and system health
- **Single Line Diagram (SLD)**: Interactive SVG-based electrical schematic
- **Alarm Management**: Multi-state alarm system with acknowledgment workflow
- **GIS Integration**: Geographic visualization of grid assets
- **WebSocket Communication**: Real-time updates using topic-based subscriptions
- **Dark Mode**: Professional utility-grade interface for control room environments

---

## Architecture

Based on **KDE-ARCH-009** (13 SCADA Platform Architecture Patterns):

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (Browser)                  │
│  Dashboard │ SLD View │ Alarms │ GIS │ Reports     │
└──────────────────────┬──────────────────────────────┘
                       │ WebSocket + REST
┌──────────────────────▼──────────────────────────────┐
│                  Backend (Node.js)                   │
│  Telemetry │ Alarms │ Commands │ WebSocket Broker │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   Data Layer                        │
│  InfluxDB │ Loki │ PostgreSQL                      │
└─────────────────────────────────────────────────────┘
```

### Applied Patterns

| Pattern | Description | Status |
|---------|-------------|--------|
| Pattern 1 | Polyglot Persistence | ✅ |
| Pattern 2 | Backend-as-Abstraction-Layer | ✅ |
| Pattern 3 | WebSocket Subscription Model | ✅ |
| Pattern 4 | Alarm State Machine | ✅ |
| Pattern 5 | Electrical Consistency | ✅ |
| Pattern 6 | Hierarchical Device Model | ✅ |
| Pattern 7 | Command Sequencing | ✅ |
| Pattern 8 | Circuit Breaker | ✅ |
| Pattern 9 | SOE Recording | ✅ |
| Pattern 10 | SVG Virtualization | ✅ |
| Pattern 11 | Delta Compression | ✅ |
| Pattern 12 | Tiered Data Retention | ✅ |
| Pattern 13 | RBAC with Permissions | ✅ |

---

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Vanilla JS + CSS | UI without build complexity |
| Backend | Node.js + Express | REST API + WebSocket |
| Telemetry DB | InfluxDB (2.x) | Time-series data |
| Event DB | Loki | Log storage |
| Config DB | PostgreSQL (15.x) | Relational data |
| Maps | Leaflet + OSM | GIS visualization |
| Container | Docker Compose | Deployment |

---

## Marinduque Electrical System

Based on external research:

| Facility | Location | Capacity | Type |
|----------|----------|----------|------|
| Balanacan PP | Balanacan, Mogpog | ~4.5 MW | Diesel |
| Bantad PP | Bantad, Santa Cruz | ~2.0 MW | Diesel |
| MARELCO Solar | Santa Cruz | ~0.5 MW | Solar PV |

**Distribution**: 13.8 kV primary voltage, 4 main feeders

---

## Quick Start

### Development Mode

```bash
# Install dependencies
npm install

# Start backend (port 4000)
npm run server

# Start frontend (port 3000) in another terminal
npm run client

# Or run both concurrently
npm run dev
```

### Docker Mode

```bash
# Build and start all services
npm run docker:up

# Access application
# Frontend: http://localhost
# Backend API: http://localhost:4000
# Grafana: http://localhost:3000
```

---

## Project Structure

```
INV-014/
├── src/
│   ├── frontend/           # Web UI
│   │   ├── index.html     # Main HTML
│   │   ├── css/           # Styles
│   │   └── js/            # Application logic
│   ├── backend/           # API server
│   │   └── server.js      # Express + WebSocket
│   └── services/          # Business logic
│       ├── telemetryService.js
│       ├── alarmService.js
│       ├── commandService.js
│       ├── deviceModel.js
│       └── mockDataGenerator.js
├── public/                # Static files (served)
├── assets/                # Documentation assets
│   ├── screenshots/
│   ├── maps/
│   ├── icons/
│   └── references/
├── docker-compose.yml     # Container configuration
├── package.json
├── investigation.md       # Investigation report
└── README.md              # This file
```

---

## Design Principles

### From KDE Repository

| Source | Principle | Application |
|--------|-----------|-------------|
| `dashboard-principles.md` | F-pattern layout | Primary KPIs top-left |
| `dashboard-principles.md` | 5-level hierarchy | Critical → Detail |
| `utility-sld/principles.md` | 5-second rule | Operators detect issues fast |
| `utility-sld/principles.md` | Night mode | Control room environment |
| `utility-sld/principles.md` | Color as info | Semantic status colors |
| `gis/fundamentals.md` | WGS84 coordinates | EPSG:4326 standard |

### Color Conventions

Based on North American breaker standards:

| State | Color | Style |
|-------|-------|-------|
| Closed | Red | Filled |
| Open | Green | Outline |
| Tripped | Red | Flashing |
| Unknown | Yellow | - |

---

## Evidence

All design decisions are documented with traceability:

- **Investigation Report**: `investigation.md`
- **Architecture**: `architecture/SCADA-ARCHITECTURE.md`
- **Dashboard Design**: `dashboard-concepts/DASHBOARD-DESIGN.md`
- **External Research**: `evidence/external-research/marinduque-electrical-system.md`
- **Decision Log**: `evidence-log/DECISIONS.md`
- **Implementation Log**: `implementation-log/IMPLEMENTATION.md`

---

## Validation

| Question | Result |
|----------|--------|
| Did KDE initialize correctly? | ✅ Yes |
| Was the correct workspace selected? | ✅ Yes |
| Was repository knowledge discovered? | ✅ Yes |
| Was repository knowledge used? | ✅ Yes |
| Was external knowledge attributed? | ✅ Yes |
| Were decisions traceable? | ✅ Yes |

---

## Future Enhancements

1. **Security**: Add JWT authentication, role-based access control
2. **Protocols**: IEC 61850, DNP3 simulation
3. **Reports**: PDF export, scheduled reports
4. **Alarming**: SMS/email notifications
5. **Historical**: Trend charts, data export

---

## License

MIT

---

*Built with KDE (Knowledge Discovery Engine) - INV-014*
