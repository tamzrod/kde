import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GisMap from './pages/GisMap';
import SingleLineDiagram from './pages/SingleLineDiagram';
import Trends from './pages/Trends';
import Events from './pages/Events';
import Alarms from './pages/Alarms';
import DeviceManager from './pages/DeviceManager';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const WS_URL = import.meta.env.VITE_WS_URL || `ws://${window.location.host}/ws`;

interface TelemetryData {
  deviceId: string;
  tagId: string;
  value: number;
  quality: string;
  timestamp: string;
}

interface AlarmData {
  id: string;
  severity: string;
  state: string;
  message: string;
  device_id: string;
  created_at: string;
}

function AppContent() {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [telemetry, setTelemetry] = useState<Map<string, TelemetryData>>(new Map());
  const [alarms, setAlarms] = useState<AlarmData[]>([]);
  const [stats, setStats] = useState<any>({});
  const [ws, setWs] = useState<WebSocket | null>(null);

  // WebSocket connection
  useEffect(() => {
    const websocket = new WebSocket(WS_URL);

    websocket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      // Subscribe to all channels
      websocket.send(JSON.stringify({
        type: 'subscribe',
        channels: ['telemetry', 'alarms', 'events', 'commands'],
      }));
    };

    websocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'telemetry' && message.data) {
          const newTelemetry = new Map(telemetry);
          message.data.forEach((point: TelemetryData) => {
            newTelemetry.set(`${point.deviceId}:${point.tagId}`, point);
          });
          setTelemetry(newTelemetry);
        }
        
        if (message.type === 'alarm' && message.data) {
          setAlarms(prev => {
            const idx = prev.findIndex(a => a.id === message.data.id);
            if (idx >= 0) {
              const updated = [...prev];
              updated[idx] = message.data;
              return updated;
            }
            return [message.data, ...prev];
          });
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  // Fetch initial data
  useEffect(() => {
    // Fetch stats
    fetch(`${API_URL}/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
      })
      .catch(console.error);

    // Fetch active alarms
    fetch(`${API_URL}/alarms/active`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setAlarms(data.data);
      })
      .catch(console.error);
  }, []);

  const activeAlarms = alarms.filter(a => a.state === 'active' || a.state === 'acknowledged');
  const criticalCount = activeAlarms.filter(a => a.severity === 'critical').length;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/gis', label: 'GIS Map', icon: '🗺️' },
    { path: '/sld', label: 'Single Line', icon: '⚡' },
    { path: '/trends', label: 'Trends', icon: '📈' },
    { path: '/events', label: 'Events', icon: '📋' },
    { path: '/alarms', label: 'Alarms', icon: '🔔' },
    { path: '/devices', label: 'Devices', icon: '📱' },
  ];

  const pageTitle = navItems.find(item => item.path === location.pathname)?.label || 'SCADA';

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>⚡ SCADA</h1>
          <p>Distribution Control</p>
        </div>
        <nav>
          <ul className="nav-menu">
            {navItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div>Active Alarms: {activeAlarms.length}</div>
            {criticalCount > 0 && (
              <div style={{ color: 'var(--critical)', marginTop: '0.25rem' }}>
                ⚠ {criticalCount} Critical
              </div>
            )}
          </div>
        </div>
      </aside>
      <main className="main-content">
        <header className="header">
          <h2>{pageTitle}</h2>
          <div className="header-status">
            <span className={`status-indicator ${isConnected ? '' : 'offline'}`}></span>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard telemetry={telemetry} stats={stats} alarms={activeAlarms} />} />
            <Route path="/gis" element={<GisMap telemetry={telemetry} />} />
            <Route path="/sld" element={<SingleLineDiagram telemetry={telemetry} />} />
            <Route path="/trends" element={<Trends telemetry={telemetry} />} />
            <Route path="/events" element={<Events />} />
            <Route path="/alarms" element={<Alarms alarms={alarms} setAlarms={setAlarms} />} />
            <Route path="/devices" element={<DeviceManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
