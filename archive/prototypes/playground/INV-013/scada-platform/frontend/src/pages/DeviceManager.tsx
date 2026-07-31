import { useEffect, useState } from 'react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  voltage_level?: string;
  rating?: string;
  manufacturer?: string;
  model?: string;
  parent_id?: string;
}

interface DeviceTag {
  id: string;
  tag_name: string;
  tag_type: string;
  unit?: string;
  description?: string;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function DeviceManager() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [tags, setTags] = useState<DeviceTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'info' | 'tags' | 'health'>('info');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      fetchTags(selectedDevice.id);
    }
  }, [selectedDevice]);

  const fetchDevices = () => {
    const url = typeFilter ? `${API_URL}/devices?type=${typeFilter}` : `${API_URL}/devices`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDevices(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching devices:', err);
        setLoading(false);
      });
  };

  const fetchTags = (deviceId: string) => {
    fetch(`${API_URL}/devices/${deviceId}/tags`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTags(data.data);
        }
      })
      .catch(err => console.error('Error fetching tags:', err));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'substation': return '🏭';
      case 'feeder': return '⚡';
      case 'breaker': return '🔌';
      case 'transformer': return '⚙️';
      case 'capacitor': return '🔋';
      case 'recloser': return '🔁';
      case 'der': return '☀️';
      case 'load': return '🏠';
      default: return '📱';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--success)';
      case 'maintenance': return 'var(--warning)';
      case 'outage': return 'var(--error)';
      default: return 'var(--text-muted)';
    }
  };

  const filteredDevices = devices.filter(d => !typeFilter || d.type === typeFilter);

  if (loading) {
    return <div className="loading">Loading devices...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 150px)' }}>
      {/* Device List */}
      <div className="card" style={{ width: 350, overflowY: 'auto', flexShrink: 0 }}>
        <div className="card-header">
          <span className="card-title">Device Registry</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {filteredDevices.length} devices
          </span>
        </div>

        {/* Type Filter */}
        <div style={{ marginBottom: '1rem' }}>
          <select
            className="select"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              fetchDevices();
            }}
          >
            <option value="">All Types</option>
            <option value="substation">Substations</option>
            <option value="feeder">Feeders</option>
            <option value="breaker">Breakers</option>
            <option value="transformer">Transformers</option>
            <option value="capacitor">Capacitor Banks</option>
            <option value="recloser">Reclosers</option>
            <option value="der">DER</option>
            <option value="load">Loads</option>
          </select>
        </div>

        {/* Device List */}
        <div>
          {filteredDevices.map(device => (
            <div
              key={device.id}
              style={{
                padding: '0.75rem',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                backgroundColor: selectedDevice?.id === device.id ? 'var(--bg-hover)' : undefined,
              }}
              onClick={() => setSelectedDevice(device)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{getTypeIcon(device.type)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{device.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    {device.type}
                  </div>
                </div>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(device.status),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Details */}
      <div className="card" style={{ flex: 1, overflowY: 'auto' }}>
        {selectedDevice ? (
          <>
            <div className="card-header">
              <div>
                <h3 style={{ margin: 0 }}>{selectedDevice.name}</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  {selectedDevice.type}
                </span>
              </div>
              <span
                className="badge"
                style={{
                  backgroundColor: `${getStatusColor(selectedDevice.status)}20`,
                  color: getStatusColor(selectedDevice.status),
                }}
              >
                {selectedDevice.status}
              </span>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <button
                className={`btn ${tab === 'info' ? 'btn-primary' : ''}`}
                onClick={() => setTab('info')}
              >
                Info
              </button>
              <button
                className={`btn ${tab === 'tags' ? 'btn-primary' : ''}`}
                onClick={() => setTab('tags')}
              >
                Tags ({tags.length})
              </button>
              <button
                className={`btn ${tab === 'health' ? 'btn-primary' : ''}`}
                onClick={() => setTab('health')}
              >
                Health
              </button>
            </div>

            {/* Info Tab */}
            {tab === 'info' && (
              <table style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td style={{ color: 'var(--text-muted)', width: 150 }}>Device ID</td>
                    <td style={{ fontFamily: 'monospace' }}>{selectedDevice.id}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Type</td>
                    <td style={{ textTransform: 'capitalize' }}>{selectedDevice.type}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-muted)' }}>Status</td>
                    <td style={{ textTransform: 'capitalize' }}>{selectedDevice.status}</td>
                  </tr>
                  {selectedDevice.voltage_level && (
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>Voltage Level</td>
                      <td>{selectedDevice.voltage_level}</td>
                    </tr>
                  )}
                  {selectedDevice.rating && (
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>Rating</td>
                      <td>{selectedDevice.rating}</td>
                    </tr>
                  )}
                  {selectedDevice.manufacturer && (
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>Manufacturer</td>
                      <td>{selectedDevice.manufacturer}</td>
                    </tr>
                  )}
                  {selectedDevice.model && (
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>Model</td>
                      <td>{selectedDevice.model}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* Tags Tab */}
            {tab === 'tags' && (
              <div>
                {tags.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Tag Name</th>
                        <th>Type</th>
                        <th>Unit</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tags.map(tag => (
                        <tr key={tag.id}>
                          <td style={{ fontFamily: 'monospace' }}>{tag.tag_name}</td>
                          <td style={{ textTransform: 'capitalize' }}>{tag.tag_type}</td>
                          <td>{tag.unit || '-'}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{tag.description || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    No tags configured for this device
                  </div>
                )}
              </div>
            )}

            {/* Health Tab */}
            {tab === 'health' && (
              <div>
                <div className="grid grid-2">
                  <div className="card" style={{ backgroundColor: 'var(--bg-hover)' }}>
                    <div className="metric">
                      <div className="metric-value" style={{ color: 'var(--success)' }}>99.9%</div>
                      <div className="metric-label">Uptime</div>
                    </div>
                  </div>
                  <div className="card" style={{ backgroundColor: 'var(--bg-hover)' }}>
                    <div className="metric">
                      <div className="metric-value">0.1%</div>
                      <div className="metric-label">Packet Loss</div>
                    </div>
                  </div>
                </div>
                <table style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
                  <tbody>
                    <tr>
                      <td style={{ color: 'var(--text-muted)', width: 150 }}>Last Communication</td>
                      <td>{new Date().toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>Health Status</td>
                      <td style={{ color: 'var(--success)' }}>Healthy</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>Communication Errors</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            Select a device to view details
          </div>
        )}
      </div>
    </div>
  );
}
