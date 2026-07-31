# SCADA Platform - Distribution Utility Control System

A modern, Docker-based SCADA (Supervisory Control and Data Acquisition) platform for distribution utilities.

## Features

- **Real-time Monitoring**: Live telemetry from substations, feeders, and distribution equipment
- **GIS Map**: Interactive geographic visualization of the distribution network
- **Single Line Diagrams**: SVG-based SLD with real-time status updates
- **Trends**: Historical data visualization with Apache ECharts
- **Alarm Management**: Real-time alarm monitoring with acknowledgment workflow
- **Event Logging**: Complete audit trail stored in Loki
- **Device Registry**: Equipment management and configuration
- **Mock Simulation**: Electrically consistent data generation for testing

## Quick Start

```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Architecture

```
┌─────────────────────────────────────────────┐
│              Browser (Frontend)               │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│            API Gateway (Node.js)              │
├─────────────────────────────────────────────┤
│  Historian │ Event │ Alarm │ Device │ Auth  │
└─────────────────────────────────────────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
   ┌──────────┐  ┌────────┐  ┌──────────┐
   │ InfluxDB │  │  Loki  │  │PostgreSQL│
   │(Telemetry)│  │(Events)│  │ (Config) │
   └──────────┘  └────────┘  └──────────┘
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| nginx | 80 | Reverse proxy |
| frontend | 5173 | React application |
| api-gateway | 8080 | REST API + WebSocket |
| historian | 8081 | Telemetry storage |
| event | 8082 | Event logging |
| alarm | 8083 | Alarm management |
| device | 8084 | Device registry |
| command | 8085 | Control commands |
| simulation | 8086 | Mock data generation |
| auth | 8087 | Authentication |
| postgres | 5432 | Configuration DB |
| influxdb | 8086 | Time-series DB |
| loki | 3100 | Log aggregation |

## Default Credentials

- **Admin User**: admin / admin123
- **PostgreSQL**: postgres / scada_dev_password
- **InfluxDB**: admin / influxdb_password

## API Documentation

### REST Endpoints

```
GET  /api/devices              - List all devices
GET  /api/devices/:id          - Get device details
GET  /api/alarms               - List alarms
GET  /api/alarms/active        - Get active alarms
POST /api/alarms/:id/acknowledge - Acknowledge alarm
GET  /api/telemetry/query      - Query historical data
GET  /api/telemetry/latest     - Get latest values
GET  /api/events/query         - Query events
POST /api/commands             - Issue control command
POST /api/auth/login            - User login
```

### WebSocket

Connect to `/ws` for real-time updates:

```javascript
const ws = new WebSocket('ws://localhost/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channels: ['telemetry', 'alarms', 'events']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data.type, data.data);
};
```

## Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend Services

```bash
cd backend/services/api-gateway
npm install
npm start
```

### Running Specific Services

```bash
# Run only specific services
docker-compose up -d postgres influxdb loki api-gateway simulation

# View simulation logs
docker-compose logs -f simulation
```

## Mock Distribution Grid

The simulator generates realistic electrical distribution data:

- **Substations**: 2 substations with load following daily profiles
- **Feeders**: 3 feeders with realistic power flow
- **Devices**: Breakers, transformers, capacitors, reclosers, DER, loads
- **Telemetry**: Voltage, current, power, frequency, temperature
- **Events**: Alarms, operator actions, faults

### Injecting a Fault

```bash
curl -X POST http://localhost:8080/api/simulation/fault \
  -H "Content-Type: application/json" \
  -d '{"feederId": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}'
```

## License

MIT
