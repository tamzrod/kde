import { useEffect, useState, useRef } from 'react';

interface Props {
  telemetry: Map<string, any>;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  location_lat: number;
  location_lng: number;
}

export default function GisMap({ telemetry }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/devices`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDevices(data.data.filter((d: Device) => d.location_lat && d.location_lng));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching devices:', err);
        setLoading(false);
      });
  }, []);

  const getValue = (deviceId: string, tagId: string, defaultValue = 0) => {
    const key = `${deviceId}:${tagId}`;
    const point = telemetry.get(key);
    return point ? point.value : defaultValue;
  };

  // Simple map projection (for demo purposes)
  const projectCoords = (lat: number, lng: number) => {
    const minLat = 40.69;
    const maxLat = 40.72;
    const minLng = -74.03;
    const maxLng = -73.99;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 800 + 50;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 500 + 50;
    
    return { x, y };
  };

  const getDeviceColor = (device: Device) => {
    const position = getValue(device.id, 'position', -1);
    const status = getValue(device.id, 'status', 1);
    
    if (device.type === 'breaker' || device.type === 'recloser') {
      return position === 1 ? '#22c55e' : '#ef4444';
    }
    if (device.type === 'der') {
      return status === 1 ? '#22c55e' : '#94a3b8';
    }
    if (device.status === 'active') {
      return '#3b82f6';
    }
    return '#94a3b8';
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'substation':
        return { path: 'M-10,-10 L10,-10 L10,10 L-10,10 Z', size: 20 };
      case 'feeder':
        return { path: 'M-15,0 L15,0', size: 30 };
      case 'breaker':
        return { path: 'M-5,-8 L5,-8 L5,8 L-5,8 Z', size: 16 };
      case 'transformer':
        return { path: 'M-8,-6 L8,-6 L8,6 L-8,6 Z M-4,6 L4,6 L0,12 Z', size: 20 };
      case 'capacitor':
        return { path: 'M0,-8 L0,8 M-4,-4 L-4,4 M4,-4 L4,4', size: 16 };
      case 'recloser':
        return { path: 'M-6,-6 L6,-6 L6,6 L-6,6 Z M-3,-3 L3,3 M-3,3 L3,-3', size: 16 };
      case 'der':
        return { path: 'M0,-10 L7,5 L-7,5 Z', size: 18 };
      case 'load':
        return { path: 'M-8,0 L8,0 L8,8 L-8,8 Z', size: 14 };
      default:
        return { path: 'M-5,-5 L5,-5 L5,5 L-5,5 Z', size: 12 };
    }
  };

  if (loading) {
    return <div className="loading">Loading GIS Map...</div>;
  }

  return (
    <div className="gis-container">
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div className="card" style={{ flex: 1, padding: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 12, height: 12, backgroundColor: '#22c55e', borderRadius: 2 }}></span>
              Closed/Normal
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 12, height: 12, backgroundColor: '#ef4444', borderRadius: 2 }}></span>
              Open/Tripped
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 12, height: 12, backgroundColor: '#3b82f6', borderRadius: 2 }}></span>
              Active
            </span>
          </div>
        </div>
      </div>

      <svg className="gis-svg" viewBox="0 0 900 600">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1a2332" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Draw feeders as lines */}
        {devices.filter(d => d.type === 'feeder').map(feeder => {
          const substation = devices.find(d => d.id === feeder.parent_id);
          if (!substation) return null;
          
          const start = projectCoords(substation.location_lat, substation.location_lng);
          const end = projectCoords(feeder.location_lat, feeder.location_lng);
          
          return (
            <line
              key={feeder.id}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#f59e0b"
              strokeWidth="3"
            />
          );
        })}

        {/* Draw devices */}
        {devices.filter(d => d.type !== 'feeder').map(device => {
          const pos = projectCoords(device.location_lat, device.location_lng);
          const icon = getDeviceIcon(device.type);
          const color = getDeviceColor(device);
          
          return (
            <g
              key={device.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedDevice(device)}
            >
              <circle r="20" fill={color} fillOpacity="0.2" />
              <path
                d={icon.path}
                fill={color}
                transform={`scale(${icon.size / 20})`}
              />
            </g>
          );
        })}

        {/* Labels for substations */}
        {devices.filter(d => d.type === 'substation').map(device => {
          const pos = projectCoords(device.location_lat, device.location_lng);
          return (
            <text
              key={`label-${device.id}`}
              x={pos.x}
              y={pos.y - 30}
              textAnchor="middle"
              fill="#e6e6e6"
              fontSize="12"
              fontWeight="bold"
            >
              {device.name}
            </text>
          );
        })}
      </svg>

      {/* Device Details Panel */}
      {selectedDevice && (
        <div className="card" style={{ position: 'fixed', right: '2rem', top: '50%', width: 300, transform: 'translateY(-50%)' }}>
          <div className="card-header">
            <span className="card-title">{selectedDevice.name}</span>
            <button className="btn" onClick={() => setSelectedDevice(null)}>✕</button>
          </div>
          <table style={{ fontSize: '0.875rem' }}>
            <tbody>
              <tr>
                <td style={{ color: 'var(--text-muted)' }}>Type</td>
                <td style={{ textTransform: 'capitalize' }}>{selectedDevice.type}</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text-muted)' }}>Status</td>
                <td>{selectedDevice.status}</td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text-muted)' }}>Location</td>
                <td>{selectedDevice.location_lat?.toFixed(4)}, {selectedDevice.location_lng?.toFixed(4)}</td>
              </tr>
              {selectedDevice.type === 'breaker' && (
                <>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Position</td>
                    <td>{getValue(selectedDevice.id, 'position', 1) === 1 ? 'Closed' : 'Open'}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Current</td>
                    <td>{getValue(selectedDevice.id, 'current', 0).toFixed(1)} A</td>
                  </tr>
                </>
              )}
              {selectedDevice.type === 'transformer' && (
                <>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Oil Temp</td>
                    <td>{getValue(selectedDevice.id, 'oil_temp', 0).toFixed(1)} °C</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Tap Position</td>
                    <td>{getValue(selectedDevice.id, 'tap_position', 0)}</td>
                  </tr>
                </>
              )}
              {selectedDevice.type === 'der' && (
                <>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Power Output</td>
                    <td>{getValue(selectedDevice.id, 'active_power', 0).toFixed(2)} MW</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Irradiance</td>
                    <td>{getValue(selectedDevice.id, 'irradiance', 0).toFixed(0)} W/m²</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
