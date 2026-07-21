# INV-013: Distribution Utility SCADA Platform - Architectural Design

**Investigation ID**: INV-013  
**Document Version**: 1.0.0  
**Date**: 2026-07-20  
**Status**: DRAFT  
**Engine**: KDE-ENGINE-004 (Delta)

---

## Executive Summary

This document presents the architectural design for a modern Distribution Utility SCADA (Supervisory Control and Data Acquisition) platform. The architecture enables real-time monitoring and control of electrical distribution infrastructure through a Docker Compose deployment, featuring a custom web application, modular backend services, and realistic mock simulation.

### Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Deployment Model** | Docker Compose (single-server) | Simple deployment, operational simplicity |
| **Backend Architecture** | Microservices | Scalability, maintainability, service isolation |
| **Database Strategy** | Polyglot persistence | Optimal storage for different data types |
| **Frontend Strategy** | Custom SPA with Apache ECharts | No Grafana dependency, full control |
| **Real-time Communication** | WebSocket | Low-latency updates for SCADA |
| **API Pattern** | REST + WebSocket | Standard CRUD + real-time events |

---

## Table of Contents

1. [Overall Software Architecture](#1-overall-software-architecture)
2. [Docker Compose Architecture](#2-docker-compose-architecture)
3. [Service Interaction Diagram](#3-service-interaction-diagram)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [Database Schema Proposal](#6-database-schema-proposal)
7. [API Architecture](#7-api-architecture)
8. [WebSocket Architecture](#8-websocket-architecture)
9. [Mock Simulator Architecture](#9-mock-simulator-architecture)
10. [Project Directory Structure](#10-project-directory-structure)
11. [Development Roadmap](#11-development-roadmap)
12. [Risks and Design Tradeoffs](#12-risks-and-design-tradeoffs)
13. [Knowledge Artifacts](#13-knowledge-artifacts)

---

## 1. Overall Software Architecture

### 1.1 System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SCADA PLATFORM OVERVIEW                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐                                                           │
│  │   Browser    │◄──────────────────────────────────────────────────────────│
│  │  (Frontend)  │                     WebSocket / REST                       │
│  └──────────────┘                                                           │
│         │                                                                    │
│         │                                                                    │
│         ▼                                                                    │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                         BACKEND SERVICES                                 │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐ │  │
│  │  │ API Gateway │  │  Historian │  │   Event    │  │     Alarm      │ │  │
│  │  │             │  │  Service   │  │   Service  │  │    Service     │ │  │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────────┘ │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────┐ │  │
│  │  │   Device    │  │  Command   │  │ Simulation │  │    Auth        │ │  │
│  │  │  Registry   │  │  Service   │  │  Service   │  │   Service      │ │  │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│         │                                                                    │
│         ▼                                                                    │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                            DATA STORES                                  │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                     │  │
│  │  │ PostgreSQL │  │  InfluxDB  │  │    Loki    │                     │  │
│  │  │ (Config)   │  │(Telemetry)  │  │ (Events)   │                     │  │
│  │  └────────────┘  └────────────┘  └────────────┘                     │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────┐                                                           │
│  │   Simulator  │ ──► Realistic Distribution Grid Data                   │
│  │   Service    │                                                           │
│  └──────────────┘                                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Architectural Principles

1. **Backend as Single Abstraction Layer**: All frontend communication passes through backend services
2. **Polyglot Persistence**: Each database technology used for its optimal use case
3. **Event-Driven Architecture**: WebSocket for real-time updates, internal events for service communication
4. **Service Isolation**: Each microservice owns its domain and data
5. **12-Factor App Compliance**: Configuration via environment variables, stateless services

### 1.3 Non-Functional Requirements

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **Real-time Latency** | < 1 second | End-to-end WebSocket update |
| **Concurrent Users** | 50+ operators | Concurrent WebSocket connections |
| **Data Retention** | 30 days telemetry | InfluxDB retention policy |
| **Event Retention** | 90 days | Loki retention |
| **Uptime** | 99.9% | Service availability |
| **Recovery Time** | < 5 minutes | Docker Compose restart |

---

## 2. Docker Compose Architecture

### 2.1 Container Overview

```yaml
# docker-compose.yml - Core SCADA Platform
version: '3.8'

services:
  # Reverse Proxy & Load Balancer
  nginx:
    image: nginx:alpine
    container_name: scada-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - api-gateway
    networks:
      - scada-network
    restart: unless-stopped

  # Frontend Application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: scada-frontend
    environment:
      - VITE_API_URL=http://api-gateway:8080
      - VITE_WS_URL=ws://api-gateway:8080
    depends_on:
      - api-gateway
    networks:
      - scada-network
    restart: unless-stopped

  # API Gateway
  api-gateway:
    build:
      context: ./backend/services/api-gateway
      dockerfile: Dockerfile
    container_name: scada-api-gateway
    environment:
      - PORT=8080
      - HISTORIAN_SERVICE_URL=http://historian:8081
      - EVENT_SERVICE_URL=http://event:8082
      - ALARM_SERVICE_URL=http://alarm:8083
      - DEVICE_SERVICE_URL=http://device:8084
      - COMMAND_SERVICE_URL=http://command:8085
      - SIMULATION_SERVICE_URL=http://simulation:8086
      - AUTH_SERVICE_URL=http://auth:8087
    ports:
      - "8080:8080"
    depends_on:
      - historian
      - event
      - alarm
      - device
      - command
      - simulation
      - auth
    networks:
      - scada-network
    restart: unless-stopped

  # Historian Service
  historian:
    build:
      context: ./backend/services/historian
      dockerfile: Dockerfile
    container_name: scada-historian
    environment:
      - PORT=8081
      - INFLUXDB_URL=http://influxdb:8086
      - INFLUXDB_TOKEN=${INFLUXDB_TOKEN}
      - INFLUXDB_ORG=scada
      - INFLUXDB_BUCKET=telemetry
    networks:
      - scada-network
    restart: unless-stopped

  # Event Service
  event:
    build:
      context: ./backend/services/event
      dockerfile: Dockerfile
    container_name: scada-event
    environment:
      - PORT=8082
      - LOKI_URL=http://loki:3100
    networks:
      - scada-network
    restart: unless-stopped

  # Alarm Service
  alarm:
    build:
      context: ./backend/services/alarm
      dockerfile: Dockerfile
    container_name: scada-alarm
    environment:
      - PORT=8083
      - POSTGRES_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/scada
      - LOKI_URL=http://loki:3100
    depends_on:
      - postgres
    networks:
      - scada-network
    restart: unless-stopped

  # Device Registry Service
  device:
    build:
      context: ./backend/services/device
      dockerfile: Dockerfile
    container_name: scada-device
    environment:
      - PORT=8084
      - POSTGRES_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/scada
    depends_on:
      - postgres
    networks:
      - scada-network
    restart: unless-stopped

  # Command Service
  command:
    build:
      context: ./backend/services/command
      dockerfile: Dockerfile
    container_name: scada-command
    environment:
      - PORT=8085
      - POSTGRES_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/scada
      - SIMULATION_SERVICE_URL=http://simulation:8086
    depends_on:
      - postgres
      - simulation
    networks:
      - scada-network
    restart: unless-stopped

  # Simulation Service
  simulation:
    build:
      context: ./backend/services/simulation
      dockerfile: Dockerfile
    container_name: scada-simulation
    environment:
      - PORT=8086
      - INFLUXDB_URL=http://influxdb:8086
      - INFLUXDB_TOKEN=${INFLUXDB_TOKEN}
      - INFLUXDB_ORG=scada
      - LOKI_URL=http://loki:3100
    depends_on:
      - influxdb
      - loki
    networks:
      - scada-network
    restart: unless-stopped

  # Auth Service
  auth:
    build:
      context: ./backend/services/auth
      dockerfile: Dockerfile
    container_name: scada-auth
    environment:
      - PORT=8087
      - POSTGRES_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/scada
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
    networks:
      - scada-network
    restart: unless-stopped

  # PostgreSQL - Configuration Database
  postgres:
    image: postgres:15-alpine
    container_name: scada-postgres
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=scada
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - scada-network
    restart: unless-stopped

  # InfluxDB - Time-Series Database
  influxdb:
    image: influxdb:2.7
    container_name: scada-influxdb
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=admin
      - DOCKER_INFLUXDB_INIT_PASSWORD=${INFLUXDB_PASSWORD}
      - DOCKER_INFLUXDB_INIT_ORG=scada
      - DOCKER_INFLUXDB_INIT_BUCKET=telemetry
      - DOCKER_INFLUXDB_INIT_ADMIN_TOKEN=${INFLUXDB_TOKEN}
    volumes:
      - influxdb-data:/var/lib/influxdb2
      - ./influxdb/influxdb.conf:/etc/influxdb2/config.toml:ro
    ports:
      - "8086:8086"
    networks:
      - scada-network
    restart: unless-stopped

  # Loki - Log Aggregation
  loki:
    image: grafana/loki:2.9
    container_name: scada-loki
    command: -config.file=/etc/loki/local-config.yaml
    ports:
      - "3100:3100"
    volumes:
      - loki-data:/var/loki
      - ./loki/loki-config.yaml:/etc/loki/local-config.yaml:ro
    networks:
      - scada-network
    restart: unless-stopped

  # Promtail - Log Collection
  promtail:
    image: grafana/promtail:2.9
    container_name: scada-promtail
    volumes:
      - ./promtail/promtail-config.yaml:/etc/promtail/config.yaml:ro
      - /var/log:/var/log:ro
    depends_on:
      - loki
    networks:
      - scada-network
    restart: unless-stopped

networks:
  scada-network:
    driver: bridge

volumes:
  postgres-data:
  influxdb-data:
  loki-data:
```

### 2.2 Docker Configuration Files

#### 2.2.1 nginx/nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:80;
    }

    upstream api {
        server api-gateway:8080;
    }

    server {
        listen 80;
        server_name localhost;

        # Frontend routes
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # API routes
        location /api/ {
            proxy_pass http://api;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # WebSocket routes
        location /ws/ {
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_read_timeout 86400;
        }
    }
}
```

### 2.3 Resource Requirements

| Service | CPU | Memory | Storage |
|---------|-----|--------|---------|
| nginx | 0.1 | 128MB | - |
| frontend | 0.5 | 512MB | - |
| api-gateway | 1.0 | 1GB | - |
| historian | 1.0 | 1GB | - |
| event | 0.5 | 512MB | - |
| alarm | 0.5 | 512MB | - |
| device | 0.5 | 512MB | - |
| command | 0.5 | 512MB | - |
| simulation | 2.0 | 2GB | - |
| auth | 0.5 | 512MB | - |
| postgres | 1.0 | 2GB | 20GB |
| influxdb | 2.0 | 4GB | 50GB |
| loki | 1.0 | 1GB | 30GB |
| promtail | 0.25 | 128MB | - |
| **Total** | **11.55** | **13.8GB** | **100GB** |

**Minimum Server Specification**: 16 cores, 32GB RAM, 200GB SSD

---

## 3. Service Interaction Diagram

### 3.1 External Communication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL COMMUNICATION                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Browser                                                                   │
│      │                                                                      │
│      ├─── HTTP/REST ──────────────────────► API Gateway                     │
│      │    POST /api/devices                   │                             │
│      │    GET /api/alarms                     │                             │
│      │    PUT /api/commands                   │                             │
│      │                                                                      │
│      └─── WebSocket ──────────────────────► API Gateway                     │
│           WS /ws/realtime                       │                             │
│           • telemetry updates                    │                             │
│           • alarm notifications                 │                             │
│           • event streams                       │                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Internal Service Communication

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         INTERNAL SERVICE FLOW                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐                                                             │
│  │    Auth     │◄─────────────────────────────────────────────────────────── │
│  │   Service   │                    Authentication / Authorization            │
│  └─────────────┘                                                             │
│         │                                                                    │
│         ▼                                                                    │
│  ┌─────────────┐                                                             │
│  │ API Gateway │                                                             │
│  └─────────────┘                                                             │
│      │    │    │    │    │    │    │                                         │
│      ▼    ▼    ▼    ▼    ▼    ▼    ▼                                         │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                                 │
│  │Hist│ │Evnt│ │Alrm│ │Dvc │ │Cmd │ │SImu│                                 │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                                 │
│    │      │      │      │      │      │                                      │
│    ▼      ▼      ▼      ▼      ▼      ▼                                      │
│ ┌──────┐ ┌─────┐ ┌────┐ ┌───────┐ ┌────┐                                     │
│ │Influx│ │Loki │ │ PG │ │  PG   │ │ PG │                                     │
│ └──────┘ └─────┘ └────┘ └───────┘ └────┘                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

Legend:
  Hist = Historian Service
  Evnt = Event Service  
  Alrm = Alarm Service
  Dvc  = Device Registry Service
  Cmd  = Command Service
  Simu = Simulation Service
  PG   = PostgreSQL
  Influx = InfluxDB
  Loki = Loki
```

### 3.3 Data Flow Patterns

#### 3.3.1 Telemetry Ingestion Flow

```
Simulator ──► Historian ──► InfluxDB
                │
                └──► WebSocket Broadcast ──► All Connected Clients
```

#### 3.3.2 Alarm Flow

```
Simulator ──► Alarm Service ──► PostgreSQL (alarm state)
                │                    │
                └──► Loki ──► Event Record
                │
                └──► WebSocket ──► Alarm Viewer
```

#### 3.3.3 Command Flow

```
Operator ──► Frontend ──► API ──► Command ──► Simulator
                                 │              │
                                 └──► PostgreSQL (audit log)
                                 └──► Loki (command event)
```

---

## 4. Frontend Architecture

### 4.1 Application Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   │
│   ├── api/                    # API Client Layer
│   │   ├── client.ts           # HTTP client configuration
│   │   ├── websocket.ts        # WebSocket client
│   │   ├── devices.ts          # Device API calls
│   │   ├── alarms.ts           # Alarm API calls
│   │   ├── events.ts           # Event API calls
│   │   ├── telemetry.ts        # Telemetry API calls
│   │   └── auth.ts             # Authentication API
│   │
│   ├── components/              # Reusable UI Components
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Loading.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── scada/
│   │   │   ├── EquipmentIcon.tsx
│   │   │   ├── StatusIndicator.tsx
│   │   │   ├── BreakerWidget.tsx
│   │   │   ├── TransformerWidget.tsx
│   │   │   └── MeterWidget.tsx
│   │   │
│   │   └── charts/
│   │       ├── TrendChart.tsx
│   │       ├── GaugeChart.tsx
│   │       └── PowerChart.tsx
│   │
│   ├── pages/                  # Route Pages
│   │   ├── Dashboard.tsx
│   │   ├── GisMap.tsx
│   │   ├── SingleLineDiagram.tsx
│   │   ├── Trends.tsx
│   │   ├── Events.tsx
│   │   ├── Alarms.tsx
│   │   ├── DeviceManager.tsx
│   │   └── Login.tsx
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useWebSocket.ts
│   │   ├── useTelemetry.ts
│   │   ├── useAlarms.ts
│   │   ├── useDevices.ts
│   │   └── useAuth.ts
│   │
│   ├── stores/                 # State Management
│   │   ├── telemetryStore.ts
│   │   ├── alarmStore.ts
│   │   ├── deviceStore.ts
│   │   ├── eventStore.ts
│   │   └── authStore.ts
│   │
│   ├── types/                  # TypeScript Types
│   │   ├── device.ts
│   │   ├── telemetry.ts
│   │   ├── alarm.ts
│   │   ├── event.ts
│   │   └── api.ts
│   │
│   ├── utils/                  # Utility Functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   └── styles/                 # Global Styles
│       ├── variables.css
│       ├── reset.css
│       └── main.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── Dockerfile
```

### 4.2 Page Architecture

#### 4.2.1 Dashboard

```typescript
// Dashboard Page Structure
interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Layout>
      <div className="dashboard">
        {/* KPI Cards Row */}
        <div className="kpi-row">
          <KPICard title="Total Substations" value={substationCount} />
          <KPICard title="Active Feeders" value={activeFeeders} />
          <KPICard title="System Load" value={systemLoad} unit="MW" />
          <KPICard title="Active Alarms" value={activeAlarms} severity="critical" />
        </div>

        {/* System Overview Section */}
        <div className="overview-section">
          <div className="equipment-summary">
            <EquipmentSummaryCard 
              title="Substations" 
              data={substationSummary}
              icon={<SubstationIcon />}
            />
            <EquipmentSummaryCard 
              title="Feeders" 
              data={feederSummary}
              icon={<FeederIcon />}
            />
            <EquipmentSummaryCard 
              title="DER Generation" 
              data={derSummary}
              icon={<DERSystemIcon />}
            />
          </div>

          {/* Real-time Statistics */}
          <div className="realtime-stats">
            <PowerFlowChart data={powerFlowData} />
            <VoltageProfileChart data={voltageProfile} />
            <SystemFrequencyChart data={frequencyData} />
          </div>
        </div>

        {/* Recent Events */}
        <div className="recent-events">
          <EventList events={recentEvents} maxItems={10} />
        </div>
      </div>
    </Layout>
  );
};
```

#### 4.2.2 GIS Map

```typescript
// GIS Map Page with Equipment Overlays
interface GisMapProps {}

const GisMap: React.FC<GisMapProps> = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [viewBounds, setViewBounds] = useState<MapBounds>();

  return (
    <Layout>
      <div className="gis-map-container">
        {/* Map Canvas */}
        <svg 
          className="gis-map"
          viewBox="0 0 1000 800"
          onZoom={handleZoom}
          onPan={handlePan}
        >
          {/* Base Map Layer */}
          <MapBackground />
          
          {/* Equipment Layer */}
          <EquipmentLayer 
            substations={substations}
            feeders={feeders}
            onEquipmentClick={setSelectedEquipment}
          />
          
          {/* Overlay Layer */}
          <AnnotationLayer annotations={annotations} />
          
          {/* Legend */}
          <MapLegend />
        </svg>

        {/* Equipment Details Panel */}
        {selectedEquipment && (
          <EquipmentPanel 
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
          />
        )}

        {/* Map Controls */}
        <MapControls 
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onCenterView={centerView}
          onToggleLayers={toggleLayers}
        />
      </div>
    </Layout>
  );
};
```

#### 4.2.3 Single Line Diagram

```typescript
// SVG-based Single Line Diagram
interface SLDProps {
  feederId: string;
}

const SingleLineDiagram: React.FC<SLDProps> = ({ feederId }) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // WebSocket for real-time updates
  useWebSocket('/ws/sld', (data) => {
    updateDeviceStates(data.devices);
  });

  return (
    <Layout>
      <div className="sld-container">
        {/* SLD Toolbar */}
        <SLDToolbar 
          feederId={feederId}
          onZoomChange={setZoom}
          onPanChange={setPan}
          onDeviceSelect={setSelectedDevice}
        />

        {/* SVG Diagram */}
        <svg 
          className="sld-svg"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)` }}
        >
          {/* Feeder Bus */}
          <BusBar 
            id="feeder-main"
            voltage="13.8kV"
            position={{ x: 100, y: 50 }}
          />

          {/* Sectionalizing Switch */}
          <Switch
            id="sw-1"
            position={{ x: 200, y: 50 }}
            state={getDeviceState('sw-1')}
            onToggle={() => sendCommand('sw-1', 'toggle')}
          />

          {/* Breaker */}
          <Breaker
            id="brk-1"
            position={{ x: 300, y: 50 }}
            state={getDeviceState('brk-1')}
            onTrip={() => sendCommand('brk-1', 'trip')}
            onClose={() => sendCommand('brk-1', 'close')}
            animated={true}
          />

          {/* Transformer */}
          <Transformer
            id="xfmr-1"
            position={{ x: 450, y: 50 }}
            rating="10 MVA"
            voltageRatio="13.8/4.16kV"
            tapPosition={getTapPosition('xfmr-1')}
          />

          {/* Capacitor Bank */}
          <CapacitorBank
            id="cap-1"
            position={{ x: 600, y: 50 }}
            rating="2 MVAR"
            state={getDeviceState('cap-1')}
          />

          {/* Recloser */}
          <Recloser
            id="rec-1"
            position={{ x: 700, y: 50 }}
            state={getDeviceState('rec-1')}
            faultCount={getFaultCount('rec-1')}
          />

          {/* Load Points */}
          <LoadPoint id="load-1" position={{ x: 800, y: 50 }} />
          <LoadPoint id="load-2" position={{ x: 800, y: 150 }} />
          <LoadPoint id="load-3" position={{ x: 800, y: 250 }} />

          {/* Connecting Lines */}
          <PowerLine from="feeder-main" to="sw-1" />
          <PowerLine from="sw-1" to="brk-1" />
          <PowerLine from="brk-1" to="xfmr-1" />
          <PowerLine from="xfmr-1" to="cap-1" />
          <PowerLine from="cap-1" to="rec-1" />
          <PowerLine from="rec-1" to="load-1" />
          <PowerLine from="rec-1" to="load-2" branch={true} />
          <PowerLine from="rec-1" to="load-3" branch={true} />
        </svg>

        {/* Device Details Panel */}
        {selectedDevice && (
          <DevicePanel deviceId={selectedDevice} />
        )}
      </div>
    </Layout>
  );
};
```

#### 4.2.4 Trends (Apache ECharts)

```typescript
// Trends Page with ECharts
interface TrendsProps {}

const Trends: React.FC<TrendsProps> = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1h');
  const [selectedPens, setSelectedPens] = useState<Pen[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const chartRef = useRef<EChartsInstance>();

  // Load trend data
  useEffect(() => {
    loadTrendData(selectedPens, timeRange).then(setChartData);
  }, [selectedPens, timeRange]);

  return (
    <Layout>
      <div className="trends-container">
        {/* Pen Selector */}
        <div className="pen-selector">
          <h3>Select Pens</h3>
          <PenTree 
            devices={devices}
            selectedPens={selectedPens}
            onPenToggle={togglePen}
          />
        </div>

        {/* Chart Area */}
        <div className="chart-area">
          <ECharts 
            ref={chartRef}
            option={{
              tooltip: {
                trigger: 'axis',
                formatter: (params) => formatTooltip(params),
              },
              legend: {
                data: selectedPens.map(p => p.name),
              },
              xAxis: {
                type: 'time',
                axisLabel: { formatter: formatTimeAxis },
              },
              yAxis: {
                type: 'value',
                name: selectedPens[0]?.unit || '',
              },
              dataZoom: [
                { type: 'inside', start: 0, end: 100 },
                { type: 'slider', start: 0, end: 100 },
              ],
              series: chartData.map((data, idx) => ({
                name: selectedPens[idx].name,
                type: 'line',
                data: data.values,
                smooth: true,
                symbol: 'none',
              })),
            }}
          />
        </div>

        {/* Time Range Controls */}
        <div className="time-controls">
          <button onClick={() => setTimeRange('15m')}>15m</button>
          <button onClick={() => setTimeRange('1h')}>1h</button>
          <button onClick={() => setTimeRange('6h')}>6h</button>
          <button onClick={() => setTimeRange('24h')}>24h</button>
          <button onClick={() => setTimeRange('7d')}>7d</button>
          <button onClick={() => setTimeRange('custom')}>Custom</button>
        </div>

        {/* Export Controls */}
        <div className="export-controls">
          <button onClick={() => exportData('csv')}>Export CSV</button>
          <button onClick={() => exportData('png')}>Export PNG</button>
        </div>
      </div>
    </Layout>
  );
};
```

#### 4.2.5 Events Viewer

```typescript
// Custom Event Viewer - No Grafana
interface EventsProps {}

const Events: React.FC<EventsProps> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<EventFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [timelineView, setTimelineView] = useState<'list' | 'timeline'>('list');

  // Query Loki via backend
  useEffect(() => {
    const query = buildLokiQuery(filters, searchQuery);
    fetchEvents(query).then(setEvents);
  }, [filters, searchQuery]);

  return (
    <Layout>
      <div className="events-container">
        {/* Filter Bar */}
        <div className="filter-bar">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events..."
          />
          
          <Select
            options={eventTypes}
            value={filters.type}
            onChange={(type) => updateFilter('type', type)}
            placeholder="Event Type"
          />
          
          <Select
            options={severityLevels}
            value={filters.severity}
            onChange={(severity) => updateFilter('severity', severity)}
            placeholder="Severity"
          />
          
          <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={updateDateRange}
          />
        </div>

        {/* View Toggle */}
        <div className="view-toggle">
          <button 
            className={timelineView === 'list' ? 'active' : ''}
            onClick={() => setTimelineView('list')}
          >
            List View
          </button>
          <button 
            className={timelineView === 'timeline' ? 'active' : ''}
            onClick={() => setTimelineView('timeline')}
          >
            Timeline View
          </button>
        </div>

        {/* Event Display */}
        {timelineView === 'list' ? (
          <EventListView 
            events={events}
            onEventClick={showEventDetails}
          />
        ) : (
          <EventTimelineView 
            events={events}
            onEventClick={showEventDetails}
          />
        )}

        {/* Pagination */}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
};
```

#### 4.2.6 Alarm Viewer

```typescript
// Alarm Viewer with Acknowledgment
interface AlarmsProps {}

const Alarms: React.FC<AlarmsProps> = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [filters, setFilters] = useState<AlarmFilters>({});
  
  // WebSocket subscription for real-time alarms
  useWebSocket('/ws/alarms', (alarmUpdate) => {
    handleAlarmUpdate(alarmUpdate);
  });

  const acknowledgeAlarm = async (alarmId: string, comment?: string) => {
    await api.post(`/alarms/${alarmId}/acknowledge`, { comment });
    // Alarm state updated via WebSocket
  };

  return (
    <Layout>
      <div className="alarms-container">
        {/* Severity Summary */}
        <div className="severity-summary">
          <AlarmBadge severity="critical" count={criticalCount} />
          <AlarmBadge severity="major" count={majorCount} />
          <AlarmBadge severity="minor" count={minorCount} />
          <AlarmBadge severity="warning" count={warningCount} />
        </div>

        {/* Filter Controls */}
        <div className="filter-controls">
          <StatusFilter 
            statuses={['active', 'acknowledged', 'cleared']}
            selected={filters.status}
            onChange={updateStatusFilter}
          />
          <SeverityFilter
            severities={['critical', 'major', 'minor', 'warning']}
            selected={filters.severity}
            onChange={updateSeverityFilter}
          />
        </div>

        {/* Alarm Table */}
        <AlarmTable 
          alarms={filteredAlarms}
          onAcknowledge={acknowledgeAlarm}
          onShelve={(id) => shelveAlarm(id)}
          onUnshelve={(id) => unshelveAlarm(id)}
          onSuppress={(id) => suppressAlarm(id)}
        />
      </div>
    </Layout>
  );
};
```

#### 4.2.7 Device Manager

```typescript
// Device Registry Manager
interface DeviceManagerProps {}

const DeviceManager: React.FC<DeviceManagerProps> = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [tab, setTab] = useState<'registry' | 'tags' | 'health' | 'config'>('registry');

  return (
    <Layout>
      <div className="device-manager">
        {/* Device List */}
        <div className="device-list">
          <DeviceTree 
            devices={devices}
            onSelect={setSelectedDevice}
            onAdd={addDevice}
            onDelete={deleteDevice}
          />
        </div>

        {/* Device Details */}
        <div className="device-details">
          {selectedDevice ? (
            <>
              <DeviceHeader device={selectedDevice} />
              
              <Tabs active={tab} onChange={setTab}>
                <Tab id="registry" label="Registry">
                  <RegistryForm device={selectedDevice} />
                </Tab>
                <Tab id="tags" label="Tags">
                  <TagManager deviceId={selectedDevice.id} />
                </Tab>
                <Tab id="health" label="Health">
                  <HealthMonitor device={selectedDevice} />
                </Tab>
                <Tab id="config" label="Configuration">
                  <ConfigEditor device={selectedDevice} />
                </Tab>
              </Tabs>
            </>
          ) : (
            <div className="no-selection">
              Select a device to view details
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
```

### 4.3 WebSocket Client Implementation

```typescript
// hooks/useWebSocket.ts
interface WebSocketOptions {
  url: string;
  onMessage: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
}

export const useWebSocket = (options: WebSocketOptions) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectCount = useRef(0);

  const connect = useCallback(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}${options.url}`);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      reconnectCount.current = 0;
      options.onOpen?.();
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      options.onMessage(data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      options.onClose?.();
      
      if (options.reconnect && reconnectCount.current < 5) {
        setTimeout(() => {
          reconnectCount.current++;
          connect();
        }, options.reconnectInterval || 3000);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      options.onError?.(error);
    };

    setSocket(ws);
  }, [options.url]);

  useEffect(() => {
    connect();
    return () => socket?.close();
  }, []);

  return {
    send: (data: any) => socket?.send(JSON.stringify(data)),
    close: () => socket?.close(),
  };
};
```

### 4.4 State Management (Zustand)

```typescript
// stores/telemetryStore.ts
import { create } from 'zustand';

interface TelemetryPoint {
  deviceId: string;
  tagId: string;
  value: number;
  timestamp: Date;
  quality: 'good' | 'bad' | 'uncertain';
}

interface TelemetryState {
  latest: Map<string, TelemetryPoint>;
  history: TelemetryPoint[];
  
  updateTelemetry: (point: TelemetryPoint) => void;
  getLatest: (deviceId: string, tagId: string) => TelemetryPoint | undefined;
  getHistory: (deviceId: string, tagId: string, range: TimeRange) => TelemetryPoint[];
}

export const useTelemetryStore = create<TelemetryState>((set, get) => ({
  latest: new Map(),
  history: [],
  
  updateTelemetry: (point) => {
    set((state) => {
      const key = `${point.deviceId}:${point.tagId}`;
      const newLatest = new Map(state.latest);
      newLatest.set(key, point);
      
      return {
        latest: newLatest,
        history: [...state.history.slice(-999), point], // Keep last 1000
      };
    });
  },
  
  getLatest: (deviceId, tagId) => {
    const key = `${deviceId}:${tagId}`;
    return get().latest.get(key);
  },
  
  getHistory: (deviceId, tagId, range) => {
    const cutoff = Date.now() - rangeMs(range);
    return get().history.filter(
      (p) => p.deviceId === deviceId && 
             p.tagId === tagId && 
             p.timestamp.getTime() > cutoff
    );
  },
}));
```

---

## 5. Backend Architecture

### 5.1 Service Overview

| Service | Port | Responsibility | Database |
|---------|------|----------------|----------|
| **API Gateway** | 8080 | Request routing, auth | - |
| **Historian** | 8081 | Telemetry storage | InfluxDB |
| **Event** | 8082 | Event logging | Loki |
| **Alarm** | 8083 | Alarm state management | PostgreSQL |
| **Device** | 8084 | Device registry | PostgreSQL |
| **Command** | 8085 | Control commands | PostgreSQL |
| **Simulation** | 8086 | Mock data generation | - |
| **Auth** | 8087 | Authentication | PostgreSQL |

### 5.2 API Gateway Service

```typescript
// services/api-gateway/src/index.ts
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { authMiddleware } from './middleware/auth';
import { proxyMiddleware } from './middleware/proxy';
import { historianRoutes } from './routes/historian';
import { eventRoutes } from './routes/event';
import { alarmRoutes } from './routes/alarm';
import { deviceRoutes } from './routes/device';
import { commandRoutes } from './routes/command';
import { authRoutes } from './routes/auth';
import { websocketHandler } from './websocket';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use('/api/historian', historianRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/alarms', alarmRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/commands', commandRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// WebSocket handling
wss.on('connection', websocketHandler);

server.listen(8080, () => {
  console.log('API Gateway listening on port 8080');
});
```

### 5.3 Historian Service

```typescript
// services/historian/src/index.ts
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import express from 'express';

const app = express();

// InfluxDB client configuration
const influxDB = new InfluxDB({
  url: process.env.INFLUXDB_URL!,
  token: process.env.INFLUXDB_TOKEN!,
});
const writeApi = influxDB.getWriteApi(process.env.INFLUXDB_ORG!, 'telemetry');
const queryApi = influxDB.getQueryApi(process.env.INFLUXDB_ORG!);

// Write telemetry point
app.post('/api/telemetry', async (req, res) => {
  const { deviceId, tagId, value, timestamp, quality } = req.body;
  
  const point = new Point('telemetry')
    .tag('device_id', deviceId)
    .tag('tag_id', tagId)
    .tag('quality', quality)
    .floatField('value', value)
    .timestamp(timestamp);
  
  writeApi.writePoint(point);
  await writeApi.flush();
  
  res.json({ success: true });
});

// Batch write for efficiency
app.post('/api/telemetry/batch', async (req, res) => {
  const points = req.body.map((t: TelemetryPoint) => {
    return new Point('telemetry')
      .tag('device_id', t.deviceId)
      .tag('tag_id', t.tagId)
      .tag('quality', t.quality)
      .floatField('value', t.value)
      .timestamp(t.timestamp);
  });
  
  writeApi.writePoints(points);
  await writeApi.flush();
  
  res.json({ success: true, count: points.length });
});

// Query historical data
app.get('/api/telemetry/query', async (req, res) => {
  const { deviceId, tagId, start, end, limit } = req.query;
  
  const query = `
    from(bucket: "telemetry")
      |> range(start: ${start}, stop: ${end})
      |> filter(fn: (r) => r.device_id == "${deviceId}" and r.tag_id == "${tagId}")
      |> limit(n: ${limit || 1000})
      |> sort(columns: ["_time"])
  `;
  
  const result = await queryApi.collectRows(query);
  res.json(result);
});

// Get latest values
app.get('/api/telemetry/latest', async (req, res) => {
  const { deviceId } = req.query;
  
  const query = `
    from(bucket: "telemetry")
      |> range(start: -1h)
      |> filter(fn: (r) => r.device_id == "${deviceId}")
      |> last()
  `;
  
  const result = await queryApi.collectRows(query);
  res.json(result);
});

app.listen(8081, () => {
  console.log('Historian Service listening on port 8081');
});
```

### 5.4 Event Service

```typescript
// services/event/src/index.ts
import express from 'express';
import { Kafka, Producer } from 'kafkajs';

const app = express();

// Loki client for event logging
const lokiUrl = process.env.LOKI_URL || 'http://loki:3100';

// Event types
interface SCADAEvent {
  timestamp: string;
  type: 'alarm' | 'operator' | 'system' | 'fault';
  severity: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  message: string;
  metadata?: Record<string, any>;
}

// Log event to Loki
const logEvent = async (event: SCADAEvent) => {
  const logLine = JSON.stringify(event) + '\n';
  
  await fetch(`${lokiUrl}/loki/api/v1/push`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      streams: [{
        stream: { app: 'scada', type: event.type },
        values: [[Date.now() * 1000000, logLine]],
      }],
    }),
  });
};

// Create event
app.post('/api/events', async (req, res) => {
  const event: SCADAEvent = {
    timestamp: new Date().toISOString(),
    ...req.body,
  };
  
  await logEvent(event);
  res.json({ success: true, event });
});

// Query events from Loki
app.get('/api/events/query', async (req, res) => {
  const { start, end, type, severity, source, limit } = req.query;
  
  const params = new URLSearchParams({
    start: String(Date.parse(start as string) * 1000000),
    end: String(Date.parse(end as string) * 1000000),
    limit: limit || '1000',
  });
  
  if (type) params.append('match[]', `{app="scada",type="${type}"}`);
  if (severity) params.append('match[]', `{app="scada",severity="${severity}"}`);
  
  const response = await fetch(`${lokiUrl}/loki/api/v1/query_range?${params}`);
  const data = await response.json();
  
  const events = data.data.result.flatMap((stream: any) =>
    stream.values.map(([ts, value]: [string, string]) => ({
      timestamp: new Date(Number(ts) / 1000000).toISOString(),
      ...JSON.parse(value),
    }))
  );
  
  res.json(events);
});

// Get sequence of events around a timestamp
app.get('/api/events/sequence', async (req, res) => {
  const { timestamp, window } = req.query;
  
  const start = Number(timestamp) - Number(window);
  const end = Number(timestamp) + Number(window);
  
  const params = new URLSearchParams({
    start: String(start * 1000000),
    end: String(end * 1000000),
    limit: '100',
  });
  
  const response = await fetch(`${lokiUrl}/loki/api/v1/query_range?${params}`);
  const data = await response.json();
  
  res.json(data.data.result);
});

app.listen(8082, () => {
  console.log('Event Service listening on port 8082');
});
```

### 5.5 Alarm Service

```typescript
// services/alarm/src/index.ts
import express from 'express';
import { Pool } from 'pg';
import { EventEmitter } from 'events';

const app = express();
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const alarmEmitter = new EventEmitter();

// Alarm model
interface Alarm {
  id: string;
  device_id: string;
  tag_id: string;
  severity: 'critical' | 'major' | 'minor' | 'warning';
  state: 'active' | 'acknowledged' | 'cleared';
  message: string;
  value: number;
  setpoint: number;
  created_at: Date;
  acknowledged_at?: Date;
  acknowledged_by?: string;
  cleared_at?: Date;
  cleared_by?: string;
}

// Evaluate alarm condition
const evaluateAlarm = async (deviceId: string, tagId: string, value: number) => {
  // Get alarm rules for this tag
  const rules = await pool.query(
    'SELECT * FROM alarm_rules WHERE device_id = $1 AND tag_id = $2',
    [deviceId, tagId]
  );
  
  for (const rule of rules.rows) {
    const isViolation = evaluateCondition(value, rule.condition, rule.setpoint);
    
    if (isViolation && rule.alarm_state === 'active') {
      // Check if alarm already exists
      const existing = await pool.query(
        'SELECT id FROM alarms WHERE device_id = $1 AND tag_id = $2 AND state = $3',
        [deviceId, tagId, 'active']
      );
      
      if (existing.rows.length === 0) {
        // Create new alarm
        const alarm = await pool.query(
          `INSERT INTO alarms (device_id, tag_id, severity, state, message, value, setpoint)
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [deviceId, tagId, rule.severity, 'active', rule.message, value, rule.setpoint]
        );
        
        // Emit alarm event for WebSocket
        alarmEmitter.emit('alarm', alarm.rows[0]);
        
        // Log to Loki
        await logAlarmEvent(alarm.rows[0], 'ALARM_SET');
      }
    } else if (!isViolation) {
      // Clear alarm if condition resolved
      await pool.query(
        `UPDATE alarms SET state = 'cleared', cleared_at = NOW()
         WHERE device_id = $1 AND tag_id = $2 AND state IN ('active', 'acknowledged')`,
        [deviceId, tagId]
      );
    }
  }
};

// Acknowledge alarm
app.post('/api/alarms/:id/acknowledge', async (req, res) => {
  const { id } = req.params;
  const { userId, comment } = req.body;
  
  const alarm = await pool.query(
    `UPDATE alarms 
     SET state = 'acknowledged', acknowledged_at = NOW(), acknowledged_by = $1
     WHERE id = $2 RETURNING *`,
    [userId, id]
  );
  
  if (alarm.rows.length > 0) {
    alarmEmitter.emit('alarm', alarm.rows[0]);
    await logAlarmEvent(alarm.rows[0], 'ALARM_ACK');
  }
  
  res.json(alarm.rows[0]);
});

// Get active alarms
app.get('/api/alarms/active', async (req, res) => {
  const alarms = await pool.query(
    'SELECT * FROM alarms WHERE state IN ($1, $2) ORDER BY severity, created_at DESC',
    ['active', 'acknowledged']
  );
  
  res.json(alarms.rows);
});

// WebSocket event forwarding
alarmEmitter.on('alarm', (alarm) => {
  // This would be integrated with WebSocket broadcasting
  broadcastAlarmUpdate(alarm);
});

app.listen(8083, () => {
  console.log('Alarm Service listening on port 8083');
});
```

### 5.6 Device Registry Service

```typescript
// services/device/src/index.ts
import express from 'express';
import { Pool } from 'pg';

const app = express();
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

// Device types
type DeviceType = 'substation' | 'feeder' | 'breaker' | 'recloser' | 
                  'sectionalizer' | 'transformer' | 'capacitor' | 
                  'der' | 'battery' | 'load';

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  parent_id?: string;
  location?: { lat: number; lng: number };
  voltage_level?: string;
  rating?: string;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  install_date?: Date;
  status: 'active' | 'maintenance' | 'outage';
  metadata: Record<string, any>;
}

// Get all devices
app.get('/api/devices', async (req, res) => {
  const { type, parentId, status } = req.query;
  
  let query = 'SELECT * FROM devices WHERE 1=1';
  const params: any[] = [];
  
  if (type) {
    params.push(type);
    query += ` AND type = $${params.length}`;
  }
  if (parentId) {
    params.push(parentId);
    query += ` AND parent_id = $${params.length}`;
  }
  if (status) {
    params.push(status);
    query += ` AND status = $${params.length}`;
  }
  
  query += ' ORDER BY type, name';
  
  const devices = await pool.query(query, params);
  res.json(devices.rows);
});

// Get device by ID
app.get('/api/devices/:id', async (req, res) => {
  const device = await pool.query(
    'SELECT * FROM devices WHERE id = $1',
    [req.params.id]
  );
  
  if (device.rows.length === 0) {
    return res.status(404).json({ error: 'Device not found' });
  }
  
  res.json(device.rows[0]);
});

// Create device
app.post('/api/devices', async (req, res) => {
  const device = await pool.query(
    `INSERT INTO devices (name, type, parent_id, location, voltage_level, 
      rating, manufacturer, model, serial_number, install_date, status, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    [
      req.body.name,
      req.body.type,
      req.body.parentId,
      JSON.stringify(req.body.location),
      req.body.voltageLevel,
      req.body.rating,
      req.body.manufacturer,
      req.body.model,
      req.body.serialNumber,
      req.body.installDate,
      req.body.status || 'active',
      JSON.stringify(req.body.metadata || {}),
    ]
  );
  
  res.status(201).json(device.rows[0]);
});

// Update device
app.put('/api/devices/:id', async (req, res) => {
  const device = await pool.query(
    `UPDATE devices SET 
      name = COALESCE($1, name),
      type = COALESCE($2, type),
      parent_id = COALESCE($3, parent_id),
      location = COALESCE($4, location),
      voltage_level = COALESCE($5, voltage_level),
      rating = COALESCE($6, rating),
      manufacturer = COALESCE($7, manufacturer),
      model = COALESCE($8, model),
      serial_number = COALESCE($9, serial_number),
      install_date = COALESCE($10, install_date),
      status = COALESCE($11, status),
      metadata = COALESCE($12, metadata)
     WHERE id = $13 RETURNING *`,
    [
      req.body.name,
      req.body.type,
      req.body.parentId,
      req.body.location ? JSON.stringify(req.body.location) : null,
      req.body.voltageLevel,
      req.body.rating,
      req.body.manufacturer,
      req.body.model,
      req.body.serialNumber,
      req.body.installDate,
      req.body.status,
      req.body.metadata ? JSON.stringify(req.body.metadata) : null,
      req.params.id,
    ]
  );
  
  res.json(device.rows[0]);
});

// Get device tags
app.get('/api/devices/:id/tags', async (req, res) => {
  const tags = await pool.query(
    'SELECT * FROM device_tags WHERE device_id = $1',
    [req.params.id]
  );
  
  res.json(tags.rows);
});

// Add tag to device
app.post('/api/devices/:id/tags', async (req, res) => {
  const tag = await pool.query(
    `INSERT INTO device_tags (device_id, tag_name, tag_type, description, unit, scale, offset)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      req.params.id,
      req.body.tagName,
      req.body.tagType,
      req.body.description,
      req.body.unit,
      req.body.scale || 1,
      req.body.offset || 0,
    ]
  );
  
  res.status(201).json(tag.rows[0]);
});

app.listen(8084, () => {
  console.log('Device Registry Service listening on port 8084');
});
```

### 5.7 Command Service

```typescript
// services/command/src/index.ts
import express from 'express';
import { Pool } from 'pg';
import { EventEmitter } from 'events';

const app = express();
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const commandEmitter = new EventEmitter();

// Command types
type CommandType = 'close' | 'open' | 'set' | 'adjust' | 'trip' | 'reset';

interface Command {
  id: string;
  device_id: string;
  command_type: CommandType;
  parameters?: Record<string, any>;
  issued_by: string;
  issued_at: Date;
  status: 'pending' | 'executed' | 'failed' | 'cancelled';
  result?: any;
  error?: string;
}

// Issue command
app.post('/api/commands', async (req, res) => {
  const { deviceId, commandType, parameters, userId } = req.body;
  
  // Validate device exists
  const device = await pool.query('SELECT id FROM devices WHERE id = $1', [deviceId]);
  if (device.rows.length === 0) {
    return res.status(400).json({ error: 'Device not found' });
  }
  
  // Create command record
  const command = await pool.query(
    `INSERT INTO commands (device_id, command_type, parameters, issued_by, status)
     VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
    [deviceId, commandType, JSON.stringify(parameters || {}), userId]
  );
  
  // Emit command event
  commandEmitter.emit('command', command.rows[0]);
  
  // Forward to simulation service
  const simulationResponse = await fetch(
    `${process.env.SIMULATION_SERVICE_URL}/api/simulate/command`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(command.rows[0]),
    }
  );
  
  const result = await simulationResponse.json();
  
  // Update command status
  await pool.query(
    `UPDATE commands SET status = $1, result = $2 WHERE id = $3`,
    [result.success ? 'executed' : 'failed', JSON.stringify(result), command.rows[0].id]
  );
  
  res.json({ ...command.rows[0], status: result.success ? 'executed' : 'failed', result });
});

// Get command history
app.get('/api/commands/history', async (req, res) => {
  const { deviceId, startDate, endDate, limit } = req.query;
  
  let query = 'SELECT * FROM commands WHERE 1=1';
  const params: any[] = [];
  
  if (deviceId) {
    params.push(deviceId);
    query += ` AND device_id = $${params.length}`;
  }
  if (startDate) {
    params.push(startDate);
    query += ` AND issued_at >= $${params.length}`;
  }
  if (endDate) {
    params.push(endDate);
    query += ` AND issued_at <= $${params.length}`;
  }
  
  params.push(limit || 100);
  query += ` ORDER BY issued_at DESC LIMIT $${params.length}`;
  
  const commands = await pool.query(query, params);
  res.json(commands.rows);
});

// Cancel pending command
app.post('/api/commands/:id/cancel', async (req, res) => {
  const { userId } = req.body;
  
  const command = await pool.query(
    `UPDATE commands SET status = 'cancelled'
     WHERE id = $1 AND status = 'pending' RETURNING *`,
    [req.params.id]
  );
  
  if (command.rows.length === 0) {
    return res.status(400).json({ error: 'Command not found or already processed' });
  }
  
  commandEmitter.emit('command', { ...command.rows[0], cancelled_by: userId });
  
  res.json(command.rows[0]);
});

app.listen(8085, () => {
  console.log('Command Service listening on port 8085');
});
```

### 5.8 Simulation Service

```typescript
// services/simulation/src/index.ts
import express from 'express';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import WebSocket from 'ws';

const app = express();
const wss = new WebSocket.Server({ port: 8087 });

// InfluxDB client
const influxDB = new InfluxDB({
  url: process.env.INFLUXDB_URL!,
  token: process.env.INFLUXDB_TOKEN!,
});
const writeApi = influxDB.getWriteApi(process.env.INFLUXDB_ORG!, 'telemetry');

// Mock distribution grid model
interface GridModel {
  substations: Substation[];
  feeders: Feeder[];
  devices: Device[];
}

interface Substation {
  id: string;
  name: string;
  voltage: number;
  load: number;
  feeders: string[];
}

interface Feeder {
  id: string;
  name: string;
  substationId: string;
  voltage: number;
  current: number;
  power: number;
  status: 'energized' | 'de-energized' | 'fault';
}

interface Device {
  id: string;
  type: 'breaker' | 'recloser' | 'sectionalizer' | 'transformer' | 'capacitor' | 'der' | 'load';
  feederId: string;
  state: 'open' | 'closed' | 'tripped';
  measurements: Map<string, number>;
}

// Initialize grid model with realistic configuration
const initializeGridModel = (): GridModel => {
  const model: GridModel = {
    substations: [
      { id: 'sub-1', name: 'North Substation', voltage: 138000, load: 45, feeders: ['fdr-1', 'fdr-2'] },
      { id: 'sub-2', name: 'South Substation', voltage: 138000, load: 38, feeders: ['fdr-3', 'fdr-4'] },
      { id: 'sub-3', name: 'East Substation', voltage: 345000, load: 62, feeders: ['fdr-5', 'fdr-6'] },
    ],
    feeders: [],
    devices: [],
  };
  
  // Create feeders
  model.substations.forEach(sub => {
    sub.feeders.forEach((fdrId, idx) => {
      model.feeders.push({
        id: fdrId,
        name: `Feeder ${idx + 1}`,
        substationId: sub.id,
        voltage: 13800,
        current: 200 + Math.random() * 100,
        power: 4 + Math.random() * 2,
        status: 'energized',
      });
      
      // Add devices to feeder
      model.devices.push(
        { id: `${fdrId}-brk`, type: 'breaker', feederId: fdrId, state: 'closed', measurements: new Map() },
        { id: `${fdrId}-sec-1`, type: 'sectionalizer', feederId: fdrId, state: 'closed', measurements: new Map() },
        { id: `${fdrId}-xfmr-1`, type: 'transformer', feederId: fdrId, state: 'closed', measurements: new Map() },
        { id: `${fdrId}-cap-1`, type: 'capacitor', feederId: fdrId, state: 'closed', measurements: new Map() },
        { id: `${fdrId}-load-1`, type: 'load', feederId: fdrId, state: 'closed', measurements: new Map() },
        { id: `${fdrId}-der-1`, type: 'der', feederId: fdrId, state: 'closed', measurements: new Map() },
      );
    });
  });
  
  return model;
};

// Simulation state
let gridModel = initializeGridModel();
let simulationTime = 0;
let isRunning = false;

// Generate realistic telemetry with electrical consistency
const generateTelemetry = () => {
  const telemetry: Point[] = [];
  const timestamp = new Date();
  
  gridModel.substations.forEach(sub => {
    // Substation load varies realistically (daily profile + noise)
    const hourOfDay = simulationTime % 86400 / 3600;
    const dailyProfile = Math.sin((hourOfDay - 6) * Math.PI / 12);
    sub.load = 40 + dailyProfile * 15 + (Math.random() - 0.5) * 5;
    
    telemetry.push(
      new Point('telemetry')
        .tag('device_id', sub.id)
        .tag('tag_id', 'active_power')
        .floatField('value', sub.load)
        .timestamp(timestamp)
    );
  });
  
  gridModel.feeders.forEach(feeder => {
    // Feeder current based on load distribution
    const baseCurrent = 200;
    const loadVariation = Math.random() * 20 - 10;
    const faultVariation = feeder.status === 'fault' ? Math.random() * 200 : 0;
    feeder.current = baseCurrent + loadVariation + faultVariation;
    
    // Power follows current
    feeder.power = (feeder.current * feeder.voltage * Math.sqrt(3)) / 1000000;
    
    telemetry.push(
      new Point('telemetry')
        .tag('device_id', feeder.id)
        .tag('tag_id', 'current')
        .floatField('value', feeder.current)
        .timestamp(timestamp),
      new Point('telemetry')
        .tag('device_id', feeder.id)
        .tag('tag_id', 'active_power')
        .floatField('value', feeder.power)
        .timestamp(timestamp),
      new Point('telemetry')
        .tag('device_id', feeder.id)
        .tag('tag_id', 'voltage')
        .floatField('value', feeder.voltage + (Math.random() - 0.5) * 100)
        .timestamp(timestamp)
    );
  });
  
  gridModel.devices.forEach(device => {
    // Device-specific measurements
    const measurements = device.measurements;
    
    switch (device.type) {
      case 'breaker':
      case 'recloser':
        telemetry.push(
          new Point('telemetry')
            .tag('device_id', device.id)
            .tag('tag_id', 'position')
            .floatField('value', device.state === 'closed' ? 1 : 0)
            .timestamp(timestamp)
        );
        telemetry.push(
          new Point('telemetry')
            .tag('device_id', device.id)
            .tag('tag_id', 'current')
            .floatField('value', Math.random() * 500)
            .timestamp(timestamp)
        );
        break;
        
      case 'transformer':
        const temp = 60 + Math.random() * 20;
        telemetry.push(
          new Point('telemetry')
            .tag('device_id', device.id)
            .tag('tag_id', 'oil_temp')
            .floatField('value', temp)
            .timestamp(timestamp)
        );
        telemetry.push(
          new Point('telemetry')
            .tag('device_id', device.id)
            .tag('tag_id', 'tap_position')
            .floatField('value', Math.floor(Math.random() * 33) - 16)
            .timestamp(timestamp)
        );
        break;
        
      case 'capacitor':
        telemetry.push(
          new Point('telemetry')
            .tag('device_id', device.id)
            .tag('tag_id', 'reactive_power')
            .floatField('value', device.state === 'closed' ? 2 : 0)
            .timestamp(timestamp)
        );
        break;
        
      case 'der':
        const solarOutput = Math.max(0, Math.sin(hourOfDay * Math.PI / 12) * 5);
        telemetry.push(
          new Point('telemetry')
            .tag('device_id', device.id)
            .tag('tag_id', 'active_power')
            .floatField('value', solarOutput)
            .timestamp(timestamp)
        );
        break;
        
      case 'load':
        const loadKw = 0.5 + Math.random() * 0.5;
        telemetry.push(
          new Point('telemetry')
            .tag('device_id', device.id)
            .tag('tag_id', 'active_power')
            .floatField('value', loadKw)
            .timestamp(timestamp)
        );
        break;
    }
  });
  
  // System frequency (should be ~60Hz with small variations)
  telemetry.push(
    new Point('telemetry')
      .tag('device_id', 'system')
      .tag('tag_id', 'frequency')
      .floatField('value', 60 + (Math.random() - 0.5) * 0.1)
      .timestamp(timestamp)
  );
  
  return telemetry;
};

// Broadcast to all WebSocket clients
const broadcastTelemetry = (data: any) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Simulation loop
const simulationLoop = setInterval(() => {
  if (!isRunning) return;
  
  const telemetry = generateTelemetry();
  writeApi.writePoints(telemetry);
  
  // Broadcast latest values
  const latestValues = telemetry.map(p => ({
    deviceId: p.tags['device_id'],
    tagId: p.tags['tag_id'],
    value: p.fields['value'],
    timestamp: new Date().toISOString(),
  }));
  
  broadcastTelemetry({ type: 'telemetry', data: latestValues });
  
  simulationTime++;
}, 1000); // 1 second simulation step

// Simulation control endpoints
app.post('/api/simulation/start', (req, res) => {
  isRunning = true;
  res.json({ status: 'running' });
});

app.post('/api/simulation/stop', (req, res) => {
  isRunning = false;
  res.json({ status: 'stopped' });
});

app.post('/api/simulation/fault', (req, res) => {
  const { feederId } = req.body;
  const feeder = gridModel.feeders.find(f => f.id === feederId);
  if (feeder) {
    feeder.status = 'fault';
    broadcastTelemetry({ type: 'event', data: { type: 'fault', feederId } });
  }
  res.json({ status: 'fault_initiated' });
});

app.post('/api/simulation/clear-fault', (req, res) => {
  const { feederId } = req.body;
  const feeder = gridModel.feeders.find(f => f.id === feederId);
  if (feeder) {
    feeder.status = 'energized';
  }
  res.json({ status: 'cleared' });
});

app.get('/api/simulation/state', (req, res) => {
  res.json({
    isRunning,
    simulationTime,
    gridModel,
  });
});

// WebSocket endpoint for real-time simulation data
wss.on('connection', (ws) => {
  console.log('Simulation WebSocket client connected');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    // Handle subscription requests
    if (data.type === 'subscribe') {
      ws.send(JSON.stringify({ type: 'subscribed', channels: data.channels }));
    }
  });
  
  ws.on('close', () => {
    console.log('Simulation WebSocket client disconnected');
  });
});

app.listen(8086, () => {
  console.log('Simulation Service listening on port 8086');
});
```

### 5.9 Auth Service

```typescript
// services/auth/src/index.ts
import express from 'express';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

// User model
interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'operator' | 'engineer' | 'admin';
  permissions: string[];
  createdAt: Date;
  lastLogin?: Date;
}

// Authentication endpoints
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  
  if (user.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Update last login
  await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.rows[0].id]);
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user.rows[0].id, role: user.rows[0].role },
    process.env.JWT_SECRET!,
    { expiresIn: '8h' }
  );
  
  res.json({
    token,
    user: {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
      role: user.rows[0].role,
      permissions: user.rows[0].permissions,
    },
  });
});

// Token verification middleware
app.get('/api/auth/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [decoded.userId]);
    
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    res.json({ user: user.rows[0] });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// User management
app.post('/api/auth/users', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = await pool.query(
    `INSERT INTO users (username, email, password_hash, role, permissions)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, role`,
    [username, email, passwordHash, role, getDefaultPermissions(role)]
  );
  
  res.status(201).json(user.rows[0]);
});

app.get('/api/auth/users', async (req, res) => {
  const users = await pool.query('SELECT id, username, email, role, last_login FROM users');
  res.json(users.rows);
});

app.listen(8087, () => {
  console.log('Auth Service listening on port 8087');
});
```

---

## 6. Database Schema Proposal

### 6.1 PostgreSQL Schema

```sql
-- PostgreSQL Schema for SCADA Configuration Database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS AND AUTHENTICATION
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('operator', 'engineer', 'admin')),
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- ============================================
-- DEVICE REGISTRY
-- ============================================

CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'substation', 'feeder', 'breaker', 'recloser', 
        'sectionalizer', 'transformer', 'capacitor', 
        'der', 'battery', 'load', 'meter'
    )),
    parent_id UUID REFERENCES devices(id),
    voltage_level VARCHAR(20),
    rating VARCHAR(50),
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    install_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'outage', 'decommissioned')),
    location GEOGRAPHY(POINT, 4326),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_devices_type ON devices(type);
CREATE INDEX idx_devices_parent ON devices(parent_id);
CREATE INDEX idx_devices_location ON devices USING GIST(location);

CREATE TABLE device_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    tag_type VARCHAR(20) NOT NULL CHECK (tag_type IN ('analog', 'digital', 'counter', 'setpoint')),
    description TEXT,
    unit VARCHAR(20),
    scale DECIMAL(10, 6) DEFAULT 1,
    offset DECIMAL(10, 4) DEFAULT 0,
    min_value DECIMAL(15, 4),
    max_value DECIMAL(15, 4),
    deadband DECIMAL(15, 4) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(device_id, tag_name)
);

CREATE INDEX idx_device_tags_device ON device_tags(device_id);

-- ============================================
-- GIS DATA
-- ============================================

CREATE TABLE gis_layers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    layer_type VARCHAR(50) NOT NULL,
    style JSONB DEFAULT '{}',
    visibility BOOLEAN DEFAULT TRUE,
    z_index INTEGER DEFAULT 0
);

CREATE TABLE gis_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    layer_id UUID REFERENCES gis_layers(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
    geometry GEOGRAPHY(GEOMETRY, 4326) NOT NULL,
    properties JSONB DEFAULT '{}'
);

CREATE INDEX idx_gis_features_layer ON gis_features(layer_id);
CREATE INDEX idx_gis_features_geometry ON gis_features USING GIST(geometry);

-- ============================================
-- SINGLE LINE DIAGRAM
-- ============================================

CREATE TABLE sld_diagrams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    feeder_id UUID REFERENCES devices(id),
    view_box VARCHAR(100) DEFAULT '0 0 1000 800',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sld_elements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagram_id UUID REFERENCES sld_diagrams(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id),
    element_type VARCHAR(50) NOT NULL,
    svg_element VARCHAR(20) NOT NULL,
    x DECIMAL(10, 2) NOT NULL,
    y DECIMAL(10, 2) NOT NULL,
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    rotation DECIMAL(5, 2) DEFAULT 0,
    properties JSONB DEFAULT '{}',
    z_index INTEGER DEFAULT 0
);

CREATE TABLE sld_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagram_id UUID REFERENCES sld_diagrams(id) ON DELETE CASCADE,
    from_element_id UUID REFERENCES sld_elements(id) ON DELETE CASCADE,
    to_element_id UUID REFERENCES sld_elements(id) ON DELETE CASCADE,
    connection_type VARCHAR(20) DEFAULT 'line',
    properties JSONB DEFAULT '{}'
);

-- ============================================
-- ALARM MANAGEMENT
-- ============================================

CREATE TABLE alarm_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES device_tags(id) ON DELETE CASCADE,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'major', 'minor', 'warning')),
    condition VARCHAR(20) NOT NULL CHECK (condition IN ('gt', 'lt', 'eq', 'ne', 'ge', 'le')),
    setpoint DECIMAL(15, 4) NOT NULL,
    message TEXT NOT NULL,
    priority INTEGER DEFAULT 5,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_alarm_rules_device ON alarm_rules(device_id);
CREATE INDEX idx_alarm_rules_tag ON alarm_rules(tag_id);

CREATE TABLE alarms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id),
    tag_id UUID REFERENCES device_tags(id),
    severity VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (state IN ('active', 'acknowledged', 'cleared', 'shelved', 'suppressed')),
    message TEXT NOT NULL,
    value DECIMAL(15, 4),
    setpoint DECIMAL(15, 4),
    alarm_rule_id UUID REFERENCES alarm_rules(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_comment TEXT,
    cleared_at TIMESTAMP WITH TIME ZONE,
    cleared_by UUID REFERENCES users(id)
);

CREATE INDEX idx_alarms_state ON alarms(state);
CREATE INDEX idx_alarms_severity ON alarms(severity);
CREATE INDEX idx_alarms_created ON alarms(created_at DESC);

-- ============================================
-- COMMANDS
-- ============================================

CREATE TABLE commands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id),
    command_type VARCHAR(50) NOT NULL,
    parameters JSONB DEFAULT '{}',
    issued_by UUID REFERENCES users(id),
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'executing', 'executed', 'failed', 'cancelled', 'timeout')),
    result JSONB,
    error TEXT,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_commands_device ON commands(device_id);
CREATE INDEX idx_commands_issued ON commands(issued_at DESC);

-- ============================================
-- SYSTEM SETTINGS
-- ============================================

CREATE TABLE system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- REFRESH MATERIALIZED VIEWS
-- ============================================

CREATE MATERIALIZED VIEW active_alarms_summary AS
SELECT 
    severity,
    COUNT(*) as count
FROM alarms
WHERE state IN ('active', 'acknowledged')
GROUP BY severity;

CREATE UNIQUE INDEX ON active_alarms_summary(severity);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_devices_updated_at
    BEFORE UPDATE ON devices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_sld_diagrams_updated_at
    BEFORE UPDATE ON sld_diagrams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
```

### 6.2 InfluxDB Schema

```
Measurement: telemetry
---------------
Tags:
  - device_id (string): Device identifier
  - tag_id (string): Tag/measurement name
  - quality (string): Data quality (good, bad, uncertain)
  - device_type (string): Type of device

Fields:
  - value (float): Measurement value

Time:
  - timestamp: Time of measurement

Retention Policies:
  - 30d: Default, 1 second resolution
  - 90d: Aggregated to 1 minute
  - 1y: Aggregated to 5 minutes

Example Data Points:
  telemetry,device_id=sub-1,tag_id=active_power,quality=good,device_type=substation value=45.2 1700000000000000000
  telemetry,device_id=fdr-1,tag_id=current,quality=good,device_type=feeder value=215.3 1700000000000000000
  telemetry,device_id=brk-1,tag_id=position,quality=good,device_type=breaker value=1 1700000000000000000

Measurement: energy
---------------
Tags:
  - device_id (string)
  - meter_type (string): import, export, net

Fields:
  - kwh (float): Energy in kilowatt-hours

Time:
  - timestamp: Hourly interval

Measurement: counters
---------------
Tags:
  - device_id (string)
  - counter_type (string): trip, operation, event

Fields:
  - count (integer): Cumulative count

Time:
  - timestamp
```

### 6.3 Loki Schema

```
Log Streams:
------------

1. Alarm Events
   Labels: {app="scada", type="alarm", severity="critical|major|minor|warning"}
   Content:
   {
     "timestamp": "2024-01-15T10:30:00Z",
     "alarm_id": "uuid",
     "device_id": "device-id",
     "severity": "critical",
     "event_type": "ALARM_SET|ALARM_ACK|ALARM_CLEAR",
     "message": "High voltage alarm on transformer T1"
   }

2. Operator Actions
   Labels: {app="scada", type="operator"}
   Content:
   {
     "timestamp": "2024-01-15T10:30:00Z",
     "user_id": "user-id",
     "username": "operator1",
     "action": "COMMAND_ISSUED|COMMAND_EXECUTED|ALARM_ACK|SLD_VIEW",
     "target_device": "device-id",
     "parameters": {},
     "ip_address": "192.168.1.100"
   }

3. System Events
   Labels: {app="scada", type="system"}
   Content:
   {
     "timestamp": "2024-01-15T10:30:00Z",
     "level": "INFO|WARN|ERROR",
     "service": "service-name",
     "event": "event-name",
     "details": {}
   }

4. Fault Events
   Labels: {app="scada", type="fault"}
   Content:
   {
     "timestamp": "2024-01-15T10:30:00Z",
     "fault_id": "uuid",
     "feeder_id": "feeder-id",
     "location": {"x": 100, "y": 200},
     "fault_type": "SLG|SLL|DLG|DLL|3LG",
     "current": 5000,
     "cleared_by": "device-id",
     "cleared_at": "2024-01-15T10:30:05Z",
     "duration_ms": 5000
   }

5. Sequence of Events (SOE)
   Labels: {app="scada", type="soe"}
   Content:
   {
     "timestamp": "2024-01-15T10:30:00.001Z",
     "sequence_number": 12345,
     "device_id": "device-id",
     "event": "CONTACT_OPEN|CONTACT_CLOSE|TRIP|CLOSE",
     "quality": "good"
   }

Retention:
- 90 days for all event types
- Total estimated storage: 30GB for 90 days
```

---

## 7. API Architecture

### 7.1 REST API Overview

```
Base URL: http://api-gateway:8080/api

Authentication:
  POST   /auth/login          - Login
  POST   /auth/logout         - Logout
  GET    /auth/verify         - Verify token
  GET    /auth/users          - List users (admin)
  POST   /auth/users           - Create user (admin)

Devices:
  GET    /devices             - List all devices
  GET    /devices/:id         - Get device by ID
  POST   /devices             - Create device
  PUT    /devices/:id         - Update device
  DELETE /devices/:id         - Delete device
  GET    /devices/:id/tags    - Get device tags
  POST   /devices/:id/tags    - Add device tag
  GET    /devices/:id/health  - Get device health

Alarms:
  GET    /alarms              - List all alarms
  GET    /alarms/active       - Get active alarms
  GET    /alarms/:id          - Get alarm details
  POST   /alarms/:id/ack      - Acknowledge alarm
  POST   /alarms/:id/shelve   - Shelve alarm
  POST   /alarms/:id/suppress - Suppress alarm
  GET    /alarms/rules        - Get alarm rules
  POST   /alarms/rules        - Create alarm rule
  PUT    /alarms/rules/:id    - Update alarm rule
  DELETE /alarms/rules/:id   - Delete alarm rule

Telemetry:
  GET    /telemetry/query     - Query historical data
  GET    /telemetry/latest    - Get latest values
  GET    /telemetry/export    - Export telemetry data

Events:
  GET    /events/query        - Query events from Loki
  GET    /events/soe          - Get sequence of events

Commands:
  POST   /commands            - Issue command
  GET    /commands/history    - Get command history
  POST   /commands/:id/cancel - Cancel command

Simulation:
  GET    /simulation/state   - Get simulation state
  POST   /simulation/start    - Start simulation
  POST   /simulation/stop     - Stop simulation
  POST   /simulation/fault    - Inject fault
```

### 7.2 API Response Formats

```typescript
// Standard API Response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Example: GET /api/devices
interface DevicesResponse extends ApiResponse<Device[]> {
  pagination: {
    page: 1;
    pageSize: 50;
    total: 150;
    totalPages: 3;
  };
}

// Example: GET /api/telemetry/query
interface TelemetryQueryResponse {
  success: true;
  data: {
    deviceId: string;
    tagId: string;
    points: Array<{
      timestamp: string;
      value: number;
      quality: string;
    }>;
  };
}

// Error Response
interface ErrorResponse {
  success: false;
  error: {
    code: 'DEVICE_NOT_FOUND' | 'UNAUTHORIZED' | 'VALIDATION_ERROR' | ...;
    message: 'Human readable message';
    details?: {
      field: 'name',
      error: 'Required field'
    };
  };
}
```

### 7.3 API Request/Response Examples

```typescript
// POST /api/auth/login
// Request
{
  "username": "operator1",
  "password": "securepassword"
}

// Response
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "username": "operator1",
      "email": "operator1@utility.com",
      "role": "operator",
      "permissions": ["view_alarms", "ack_alarms", "view_telemetry"]
    }
  }
}

// GET /api/devices?type=breaker&status=active
// Response
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Feeder 1 Breaker",
      "type": "breaker",
      "parent_id": "feeder-uuid",
      "voltage_level": "13.8kV",
      "status": "active",
      "location": { "lat": 40.7128, "lng": -74.0060 }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 25,
    "totalPages": 1
  }
}

// POST /api/commands
// Request
{
  "deviceId": "breaker-uuid",
  "commandType": "close",
  "parameters": {},
  "userId": "user-uuid"
}

// Response
{
  "success": true,
  "data": {
    "id": "command-uuid",
    "device_id": "breaker-uuid",
    "command_type": "close",
    "issued_by": "user-uuid",
    "issued_at": "2024-01-15T10:30:00Z",
    "status": "executed",
    "result": {
      "success": true,
      "deviceState": "closed"
    }
  }
}
```

---

## 8. WebSocket Architecture

### 8.1 WebSocket Endpoints

```
WebSocket URL: ws://api-gateway:8080/ws

Endpoints:
  /ws/realtime        - General real-time updates
  /ws/telemetry        - Telemetry stream
  /ws/alarms          - Alarm notifications
  /ws/events          - Event stream
  /ws/sld/:feederId   - Single Line Diagram updates
```

### 8.2 Message Format

```typescript
// Base WebSocket Message
interface WSMessage {
  type: 'telemetry' | 'alarm' | 'event' | 'command_result' | 'heartbeat';
  channel: string;
  timestamp: string;
  data: any;
}

// Telemetry Update
interface TelemetryWSMessage extends WSMessage {
  type: 'telemetry';
  data: Array<{
    deviceId: string;
    tagId: string;
    value: number;
    quality: 'good' | 'bad' | 'uncertain';
    timestamp: string;
  }>;
}

// Alarm Update
interface AlarmWSMessage extends WSMessage {
  type: 'alarm';
  data: {
    id: string;
    deviceId: string;
    severity: 'critical' | 'major' | 'minor' | 'warning';
    state: 'active' | 'acknowledged' | 'cleared';
    message: string;
    value: number;
    setpoint: number;
    timestamp: string;
  };
}

// Event Update
interface EventWSMessage extends WSMessage {
  type: 'event';
  data: {
    id: string;
    eventType: string;
    severity: string;
    source: string;
    message: string;
    timestamp: string;
  };
}

// Command Result
interface CommandResultWSMessage extends WSMessage {
  type: 'command_result';
  data: {
    commandId: string;
    status: 'executed' | 'failed';
    result?: any;
    error?: string;
  };
}
```

### 8.3 Client Subscription Model

```typescript
// Client sends subscription message
interface SubscribeMessage {
  type: 'subscribe';
  channels: string[];
}

// Example subscription
{
  "type": "subscribe",
  "channels": ["telemetry", "alarms", "events"]
}

// Server confirms subscription
interface SubscribeAck {
  type: 'subscribed';
  channels: string[];
  heartbeat_interval: 30000;
}

// Heartbeat
interface Heartbeat {
  type: 'heartbeat';
  timestamp: string;
}

// Client should send heartbeat every 25 seconds
// Server disconnects clients that miss 3 heartbeats
```

### 8.4 WebSocket Server Implementation

```typescript
// websocket handler in API Gateway
const activeConnections = new Map<string, Set<WebSocket>>();

const websocketHandler = (ws: WebSocket, req: IncomingMessage) => {
  // Extract token from query string
  const url = new URL(req.url!, 'http://localhost');
  const token = url.searchParams.get('token');
  
  if (!validateToken(token)) {
    ws.close(4001, 'Unauthorized');
    return;
  }
  
  // Register connection
  const clientId = generateClientId();
  ws.clientId = clientId;
  
  // Default subscriptions
  const subscriptions = new Set<string>(['telemetry', 'alarms', 'events']);
  ws.subscriptions = subscriptions;
  
  // Add to active connections
  subscriptions.forEach(channel => {
    if (!activeConnections.has(channel)) {
      activeConnections.set(channel, new Set());
    }
    activeConnections.get(channel)!.add(ws);
  });
  
  // Send connection acknowledgment
  ws.send(JSON.stringify({
    type: 'connected',
    clientId,
    subscriptions: Array.from(subscriptions),
  }));
  
  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    handleClientMessage(ws, message);
  });
  
  ws.on('close', () => {
    // Cleanup subscriptions
    ws.subscriptions.forEach(channel => {
      activeConnections.get(channel)?.delete(ws);
    });
  });
};

// Broadcast message to channel subscribers
const broadcast = (channel: string, message: object) => {
  const subscribers = activeConnections.get(channel);
  if (!subscribers) return;
  
  const payload = JSON.stringify(message);
  subscribers.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
};
```

---

## 9. Mock Simulator Architecture

### 9.1 Simulator Design Principles

1. **Electrical Consistency**: All values follow physical laws (Kirchhoff's laws, power equations)
2. **Realistic Scenarios**: Daily load curves, seasonal variations, fault conditions
3. **State Propagation**: Changes cascade through the network logically
4. **Temporal Coherence**: Values change smoothly, no random jumps

### 9.2 Grid Model

```typescript
// Grid model structure
interface GridModel {
  // Transmission/Sub-transmission level
  substations: Substation[];
  
  // Distribution level
  feeders: Feeder[];
  
  // Protection and switching devices
  breakers: Breaker[];
  reclosers: Recloser[];
  sectionalizers: Sectionalizer[];
  
  // Voltage regulation
  transformers: Transformer[];
  capacitorBanks: CapacitorBank[];
  
  // Generation and storage
  derUnits: DERUnit[];
  batteryStorage: BatteryStorage[];
  
  // Loads
  loads: Load[];
}

// Substation model
interface Substation {
  id: string;
  name: string;
  
  // Primary voltage (e.g., 138kV, 345kV)
  primaryVoltage: number;
  
  // Secondary voltage (e.g., 13.8kV)
  secondaryVoltage: number;
  
  // Connected feeders
  feederIds: string[];
  
  // Current operating state
  state: 'energized' | 'partial' | 'outage';
  
  // Load in MW
  activePower: number;
  reactivePower: number;
  
  // Measurements
  measurements: {
    primaryVoltage: number;
    secondaryVoltage: number;
    primaryCurrent: number;
    secondaryCurrent: number;
    frequency: number;
    oilTemperature: number;
  };
}

// Feeder model
interface Feeder {
  id: string;
  name: string;
  substationId: string;
  
  // Operating voltage
  nominalVoltage: number;
  
  // Conductor configuration
  conductorType: string;
  impedancePerKm: ComplexNumber;
  lengthKm: number;
  
  // Current state
  status: 'energized' | 'de-energized' | 'fault';
  
  // Flow measurements
  headCurrent: number;
  headVoltage: number;
  powerFlow: number;
  
  // Load distribution
  loads: LoadDistribution;
}
```

### 9.3 Power Flow Calculations

```typescript
// Simplified power flow for distribution feeder
class PowerFlowCalculator {
  // Calculate voltage drop along feeder
  calculateVoltageDrop(
    current: number,
    impedance: ComplexNumber,
    length: number
  ): number {
    const totalImpedance = {
      real: impedance.real * length,
      imag: impedance.imag * length
    };
    
    const voltageDrop = Math.sqrt(
      Math.pow(current * totalImpedance.real, 2) +
      Math.pow(current * totalImpedance.imag, 2)
    );
    
    return voltageDrop;
  }
  
  // Calculate power loss in conductor
  calculateLineLoss(
    current: number,
    resistance: number,
    length: number
  ): number {
    return 3 * Math.pow(current, 2) * resistance * length / 1000; // kW
  }
  
  // Distribute load along feeder
  distributeLoad(
    totalLoad: number,
    loadFactor: number,
    length: number
  ): LoadPoint[] {
    const points: LoadPoint[] = [];
    const numPoints = Math.ceil(length / 0.5); // Point every 0.5 km
    
    for (let i = 1; i <= numPoints; i++) {
      const position = (i / numPoints) * length;
      const loadAtPoint = totalLoad * loadFactor * (i / numPoints);
      
      points.push({
        position,
        load: loadAtPoint,
        cumulativeLoad: totalLoad * (i / numPoints)
      });
    }
    
    return points;
  }
}
```

### 9.4 Daily Load Profile

```typescript
// Realistic daily load curve
const generateDailyLoadProfile = (date: Date): number[] => {
  const hour = date.getHours();
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Base load factor (0-1)
  let baseLoad: number;
  
  if (isWeekend) {
    // Weekend profile
    baseLoad = 0.5 + 0.2 * Math.sin((hour - 8) * Math.PI / 14);
  } else {
    // Weekday profile
    if (hour >= 0 && hour < 6) {
      // Night minimum
      baseLoad = 0.4;
    } else if (hour >= 6 && hour < 10) {
      // Morning ramp
      baseLoad = 0.4 + 0.4 * ((hour - 6) / 4);
    } else if (hour >= 10 && hour < 18) {
      // Daytime peak
      baseLoad = 0.8 + 0.1 * Math.sin((hour - 10) * Math.PI / 8);
    } else if (hour >= 18 && hour < 22) {
      // Evening peak
      baseLoad = 0.9 - 0.3 * ((hour - 18) / 4);
    } else {
      // Night decline
      baseLoad = 0.6 - 0.2 * ((hour - 22) / 2);
    }
  }
  
  // Add small random variation
  return baseLoad + (Math.random() - 0.5) * 0.05;
};
```

### 9.5 Fault Simulation

```typescript
// Fault injection and propagation
class FaultSimulator {
  private gridModel: GridModel;
  
  // Inject a fault on a feeder
  injectFault(feederId: string, faultType: FaultType): FaultResult {
    const feeder = this.gridModel.feeders.find(f => f.id === feederId);
    
    // Update feeder status
    feeder.status = 'fault';
    
    // Calculate fault current (simplified)
    const faultCurrent = this.calculateFaultCurrent(feeder, faultType);
    
    // Propagate to upstream devices
    this.updateUpstreamDevices(feeder, faultCurrent);
    
    // Trip protection devices
    const protectionEvents = this.tripProtectionDevices(feeder);
    
    // Generate SOE records
    const soeRecords = this.generateSOERecords(protectionEvents);
    
    return {
      faultId: generateUUID(),
      feederId,
      faultType,
      faultCurrent,
      protectionTrips: protectionEvents,
      affectedDevices: this.getAffectedDevices(feeder),
      estimatedRestorationTime: this.estimateRestorationTime(faultType),
      soeRecords
    };
  }
  
  // Auto-restoration sequence
  simulateRestoration(faultId: string): RestorationResult {
    const fault = this.getFault(faultId);
    const steps: RestorationStep[] = [];
    
    // Step 1: Isolate fault section
    steps.push({
      action: 'ISOLATE',
      deviceId: fault.isolationDevice,
      timestamp: Date.now() + steps.length * 1000
    });
    
    // Step 2: Restore upstream customers
    steps.push({
      action: 'RESTORE_UPSTREAM',
      affectedCustomers: fault.upstreamCustomerCount,
      timestamp: Date.now() + steps.length * 1000
    });
    
    // Step 3: Manual patrol (simulated wait)
    steps.push({
      action: 'PATROL',
      duration: 1800000, // 30 minutes
      timestamp: Date.now() + steps.length * 1000
    });
    
    // Step 4: Clear fault
    steps.push({
      action: 'CLEAR_FAULT',
      deviceId: fault.location,
      timestamp: Date.now() + steps.length * 1000
    });
    
    // Step 5: Restore all customers
    steps.push({
      action: 'RESTORE_ALL',
      timestamp: Date.now() + steps.length * 1000
    });
    
    return { steps, totalDuration: steps[steps.length - 1].timestamp - Date.now() };
  }
}
```

### 9.6 DER and Renewable Integration

```typescript
// Solar generation model with weather effects
class SolarGenerationModel {
  private capacity: number; // kW
  
  calculateOutput(irradiance: number, temperature: number): number {
    // Temperature derating factor
    const tempFactor = 1 - 0.004 * (temperature - 25);
    
    // Basic efficiency
    const efficiency = 0.18;
    
    // Calculate output
    const output = this.capacity * (irradiance / 1000) * efficiency * tempFactor;
    
    return Math.max(0, output);
  }
  
  // Simulate daily generation profile
  generateDayProfile(date: Date): { hour: number; output: number }[] {
    const profile: { hour: number; output: number }[] = [];
    const sunriseHour = 6.5;
    const sunsetHour = 18.5;
    
    for (let hour = 0; hour < 24; hour++) {
      let output = 0;
      
      if (hour >= sunriseHour && hour <= sunsetHour) {
        // Bell curve approximation
        const solarNoon = (sunriseHour + sunsetHour) / 2;
        const peakHour = solarNoon;
        const spread = (sunsetHour - sunriseHour) / 2;
        
        const irradiance = Math.exp(
          -Math.pow(hour - peakHour, 2) / (2 * Math.pow(spread / 2, 2))
        ) * 1000;
        
        output = this.calculateOutput(irradiance, 25);
      }
      
      profile.push({ hour, output });
    }
    
    return profile;
  }
}
```

---

## 10. Project Directory Structure

```
scada-platform/
├── docker/
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   │
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── ssl/
│   │       ├── cert.pem
│   │       └── key.pem
│   │
│   ├── postgres/
│   │   ├── init.sql
│   │   └── backup/
│   │
│   ├── influxdb/
│   │   ├── influxdb.conf
│   │   └── init.sh
│   │
│   ├── loki/
│   │   └── loki-config.yaml
│   │
│   └── promtail/
│       └── promtail-config.yaml
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   │
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── websocket.ts
│   │   │   ├── devices.ts
│   │   │   ├── alarms.ts
│   │   │   ├── events.ts
│   │   │   ├── telemetry.ts
│   │   │   └── auth.ts
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── scada/
│   │   │   └── charts/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── GisMap.tsx
│   │   │   ├── SingleLineDiagram.tsx
│   │   │   ├── Trends.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── Alarms.tsx
│   │   │   ├── DeviceManager.tsx
│   │   │   └── Login.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useTelemetry.ts
│   │   │   ├── useAlarms.ts
│   │   │   ├── useDevices.ts
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── telemetryStore.ts
│   │   │   ├── alarmStore.ts
│   │   │   ├── deviceStore.ts
│   │   │   ├── eventStore.ts
│   │   │   └── authStore.ts
│   │   │
│   │   ├── types/
│   │   │   ├── device.ts
│   │   │   ├── telemetry.ts
│   │   │   ├── alarm.ts
│   │   │   ├── event.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── styles/
│   │       ├── variables.css
│   │       ├── reset.css
│   │       └── main.css
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── .env.example
│
├── backend/
│   ├── services/
│   │   ├── api-gateway/
│   │   │   ├── src/
│   │   │   │   ├── index.ts
│   │   │   │   ├── routes/
│   │   │   │   ├── middleware/
│   │   │   │   └── websocket/
│   │   │   ├── package.json
│   │   │   └── Dockerfile
│   │   │
│   │   ├── historian/
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   └── Dockerfile
│   │   │
│   │   ├── event/
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   └── Dockerfile
│   │   │
│   │   ├── alarm/
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   └── Dockerfile
│   │   │
│   │   ├── device/
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   └── Dockerfile
│   │   │
│   │   ├── command/
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   └── Dockerfile
│   │   │
│   │   ├── simulation/
│   │   │   ├── src/
│   │   │   │   ├── index.ts
│   │   │   │   ├── gridModel.ts
│   │   │   │   ├── powerFlow.ts
│   │   │   │   ├── faultSimulator.ts
│   │   │   │   └── telemetryGenerator.ts
│   │   │   ├── package.json
│   │   │   └── Dockerfile
│   │   │
│   │   └── auth/
│   │       ├── src/
│   │       │   └── index.ts
│   │       ├── package.json
│   │       └── Dockerfile
│   │
│   └── shared/
│       ├── types/
│       │   └── index.ts
│       ├── utils/
│       │   └── index.ts
│       └── constants/
│           └── index.ts
│
├── docs/
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── services.md
│   │   ├── database.md
│   │   └── deployment.md
│   │
│   ├── api/
│   │   ├── openapi.yaml
│   │   └── websocket.md
│   │
│   └── development/
│       ├── getting-started.md
│       ├── testing.md
│       └── contributing.md
│
├── scripts/
│   ├── start.sh
│   ├── stop.sh
│   ├── backup.sh
│   ├── restore.sh
│   └── init-db.sh
│
├── tests/
│   ├── unit/
│   │   ├── frontend/
│   │   └── backend/
│   │
│   ├── integration/
│   │   ├── services/
│   │   └── api/
│   │
│   └── e2e/
│       └── cypress/
│
├── .env.example
├── .gitignore
├── README.md
├── LICENSE
└── docker-compose.yml (root - references docker/docker-compose.yml)
```

---

## 11. Development Roadmap

### 11.1 Phase 1: Foundation (Weeks 1-4)

**Objective**: Establish infrastructure and core services

| Task | Duration | Dependencies |
|------|----------|--------------|
| Set up project structure | 1 day | - |
| Configure Docker Compose | 2 days | - |
| Initialize PostgreSQL schema | 2 days | Docker Compose |
| Configure InfluxDB | 1 day | Docker Compose |
| Configure Loki | 1 day | Docker Compose |
| Create shared types package | 2 days | - |
| Implement API Gateway | 1 week | Shared types |
| Implement Auth Service | 1 week | PostgreSQL |
| Basic CI/CD pipeline | 3 days | All services |

**Milestone**: All infrastructure running, auth functional

### 11.2 Phase 2: Core Backend (Weeks 5-8)

**Objective**: Implement all backend services

| Task | Duration | Dependencies |
|------|----------|--------------|
| Device Registry Service | 1 week | Auth Service |
| Historian Service | 1 week | InfluxDB |
| Event Service | 1 week | Loki |
| Alarm Service | 1 week | Device, PostgreSQL |
| Command Service | 1 week | Device, Simulation |
| Simulation Service | 2 weeks | - |
| Integration tests | 1 week | All services |

**Milestone**: All backend services functional, integration tests passing

### 11.3 Phase 3: Frontend Core (Weeks 9-12)

**Objective**: Build frontend application structure

| Task | Duration | Dependencies |
|------|----------|--------------|
| Project setup (Vite + React + TS) | 2 days | - |
| Component library | 1 week | - |
| Layout and navigation | 3 days | Component library |
| State management setup | 2 days | - |
| API client implementation | 1 week | Backend services |
| WebSocket client | 1 week | API client |
| Dashboard page | 1 week | API client |
| Login/Auth flow | 1 week | Auth Service |

**Milestone**: Dashboard and auth functional, WebSocket connected

### 11.4 Phase 4: Visualization (Weeks 13-16)

**Objective**: Implement all visualization components

| Task | Duration | Dependencies |
|------|----------|--------------|
| GIS Map component | 2 weeks | Dashboard |
| SVG SLD component | 2 weeks | Dashboard |
| ECharts integration | 1 week | - |
| Trends page | 1 week | ECharts |
| Events viewer | 1 week | Event Service |
| Alarm viewer | 1 week | Alarm Service |
| Device Manager | 1 week | Device Service |

**Milestone**: All pages functional, data flowing correctly

### 11.5 Phase 5: Polish & Testing (Weeks 17-20)

**Objective**: Refinement and comprehensive testing

| Task | Duration | Dependencies |
|------|----------|--------------|
| Real-time animations | 1 week | SLD |
| Performance optimization | 1 week | - |
| E2E tests | 1 week | All pages |
| Load testing | 1 week | - |
| Documentation | 1 week | - |
| Security hardening | 1 week | - |

**Milestone**: Production-ready release candidate

### 11.6 Timeline Summary

```
Week:  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20
       ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
Phase1: [====Foundation====]
Phase2:             [========Core Backend========]
Phase3:                         [======Frontend Core======]
Phase4:                                         [====Visualization====]
Phase5:                                                         [===Polish===]
```

---

## 12. Risks and Design Tradeoffs

### 12.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **WebSocket scalability** | Medium | High | Implement message throttling, connection pooling |
| **InfluxDB performance** | Medium | Medium | Proper indexing, data compaction policies |
| **Loki query performance** | Low | Medium | Index optimization, query caching |
| **Frontend state management** | Low | Medium | Clear patterns, Redux DevTools |
| **Real-time animation jank** | Medium | Low | Canvas fallback, requestAnimationFrame optimization |

### 12.2 Operational Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Data loss on crash** | Low | High | WAL for PostgreSQL, InfluxDB write-ahead logging |
| **Memory pressure** | Medium | Medium | Container resource limits, monitoring |
| **Network partition** | Low | High | Graceful degradation, local caching |
| **Configuration drift** | Medium | Medium | Infrastructure as Code, config management |

### 12.3 Design Tradeoffs

#### Tradeoff 1: Monolith vs. Microservices

| Aspect | Monolith | Microservices (Chosen) |
|--------|----------|------------------------|
| Deployment | Simple | Complex |
| Scaling | Whole app | Per-service |
| Development | Faster to start | Better isolation |
| Failure isolation | None | Service-level |
| Technology lock-in | High | Low |

**Decision**: Microservices for better scalability and isolation of concerns.

#### Tradeoff 2: PostgreSQL vs. TimescaleDB

| Aspect | PostgreSQL | TimescaleDB |
|--------|------------|-------------|
| Telemetry storage | Works | Optimized |
| Compression | Basic | Advanced |
| Continuous aggregates | Manual | Built-in |
| Complexity | Lower | Higher |
| Licensing | Open source | Apache 2 (extended) |

**Decision**: PostgreSQL with InfluxDB for telemetry - separation of concerns.

#### Tradeoff 3: WebSocket vs. Server-Sent Events

| Aspect | WebSocket | SSE |
|--------|-----------|-----|
| Bidirectional | Yes | Server-to-client only |
| Browser support | Universal | Universal |
| Reconnection | Manual | Automatic |
| Complexity | Higher | Lower |
| Scalability | Requires sticky sessions | Easier |

**Decision**: WebSocket for bidirectional communication (commands, acknowledgments).

#### Tradeoff 4: Custom UI vs. Component Library

| Aspect | Custom | Material UI |
|--------|--------|------------|
| Control | Full | Limited |
| Development time | High | Lower |
| Consistency | Manual | Built-in |
| Bundle size | Smaller | Larger |
| Learning curve | Steeper | Lower |

**Decision**: Custom components with clean patterns - avoids bloat, full control.

#### Tradeoff 5: SVG vs. Canvas for SLD

| Aspect | SVG | Canvas |
|--------|-----|--------|
| Interactivity | Native | Manual |
| Performance (many elements) | Slower | Faster |
| Animation | CSS/JS | Direct |
| Accessibility | Better | Worse |
| Memory | Higher | Lower |

**Decision**: SVG with virtualization - better for SCADA use case (hundreds of elements).

### 12.4 Performance Considerations

1. **WebSocket Message Batching**: Batch telemetry updates every 100ms to reduce overhead
2. **InfluxDB Write Buffering**: Buffer writes for 1 second before flushing
3. **Frontend Virtualization**: Virtualize long lists (events, alarms)
4. **Service Discovery**: Use environment variables for service URLs (Docker Compose DNS)
5. **Connection Pooling**: Pool PostgreSQL and InfluxDB connections

### 12.5 Security Considerations

1. **JWT Token Expiration**: 8-hour tokens with refresh
2. **HTTPS**: Required in production (nginx SSL termination)
3. **Input Validation**: All API inputs validated
4. **Rate Limiting**: Per-user rate limits on API
5. **WebSocket Authentication**: Token in query string, validated on connect

---

## 13. Knowledge Artifacts

### 13.1 Architectural Patterns Identified

| Pattern | Application | Evidence |
|---------|-------------|----------|
| **API Gateway** | All frontend requests | Simplifies client, enables auth |
| **Backend for Frontend** | API Gateway | Single entry point |
| **Event Sourcing** | Events logged to Loki | Full audit trail |
| **CQRS** | Telemetry vs Events | Different query patterns |
| **Circuit Breaker** | Service communication | Resilience |
| **Bulkhead** | Service isolation | Resource isolation |

### 13.2 SCADA-Specific Patterns

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Point Management** | Device → Tag → Value hierarchy | device_tags table |
| **Alarm State Machine** | Active → Ack → Clear workflow | Alarm Service |
| **Command Sequencing** | Issue → Execute → Result | Command Service |
| **SOE Recording** | Precise event ordering | Loki with nanosecond timestamps |
| **Real-time Update Throttling** | Batch updates for efficiency | WebSocket batching |

### 13.3 Data Architecture Insights

| Insight | Evidence | Confidence |
|---------|----------|------------|
| Polyglot persistence optimal for SCADA | Telemetry vs Events vs Config have different access patterns | HIGH |
| InfluxDB better than TimescaleDB for high-frequency telemetry | Write-heavy workload | HIGH |
| Loki suitable for SOE despite being log-focused | Nanosecond timestamps, structured queries | MEDIUM |
| PostgreSQL JSONB sufficient for flexible device metadata | No complex queries on metadata | HIGH |

### 13.4 Reusable Knowledge

#### Knowledge 1: SCADA Frontend Architecture

```
Insight: SCADA frontends require real-time updates but should avoid direct database access.
Pattern: WebSocket-based state synchronization with optimistic UI updates.
Application: All SCADA views subscribe to relevant WebSocket channels.
```

#### Knowledge 2: Mock Data Generation

```
Insight: Mock SCADA data must follow electrical laws for realism.
Pattern: Hierarchical power flow from substation to loads.
Implementation: Voltage drops, current summation, power balance calculations.
```

#### Knowledge 3: Alarm Processing Pipeline

```
Insight: Alarms should be stateful and auditable.
Pattern: Alarm state machine with event logging.
Implementation: PostgreSQL for state, Loki for audit trail.
```

### 13.5 Recommendations for Future Investigations

1. **INV-FUTURE-1**: Evaluate TimescaleDB vs PostgreSQL + InfluxDB for telemetry
2. **INV-FUTURE-2**: Assess GraphQL vs REST for SCADA API
3. **INV-FUTURE-3**: Investigate real-time collaboration features
4. **INV-FUTURE-4**: Evaluate WebAssembly for client-side calculations

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| SCADA | Supervisory Control and Data Acquisition |
| DER | Distributed Energy Resources |
| SLD | Single Line Diagram |
| GIS | Geographic Information System |
| SOE | Sequence of Events |
| MQTT | Message Queuing Telemetry Transport |
| IEC 61850 | International standard for communication in substations |
| DNP3 | Distributed Network Protocol 3 |
| RTU | Remote Terminal Unit |
| PLC | Programmable Logic Controller |

## Appendix B: Reference Standards

- IEC 61850: Communication networks and systems for power utility automation
- IEEE 1159.1: Standard for Monitoring Electric Power Quality
- IEEE C37.232: Standard for Common Format for Event Data Exchange
- NERC CIP: Critical Infrastructure Protection standards

## Appendix C: Technology Stack Summary

| Layer | Technology | Version |
|-------|------------|---------|
| Container | Docker | 24.0+ |
| Orchestration | Docker Compose | 2.20+ |
| Reverse Proxy | nginx | 1.25+ |
| Frontend Framework | React | 18+ |
| Frontend Build | Vite | 5+ |
| State Management | Zustand | 4+ |
| Charts | Apache ECharts | 5+ |
| Backend Language | Node.js | 20 LTS |
| API Framework | Express | 4+ |
| WebSocket | ws | 8+ |
| Time-Series DB | InfluxDB | 2.7 |
| Log Aggregation | Loki | 2.9 |
| Relational DB | PostgreSQL | 15 |
| ORM | pg | 8+ |

---

**Document Status**: DRAFT  
**Next Step**: Human review and authorization to proceed  
**Reviewers**: Required - KDE Governance

---

*Generated by KDE under INV-013*  
*Engine: KDE-ENGINE-004 (Delta) v0.1.0*  
*Date: 2026-07-20*
