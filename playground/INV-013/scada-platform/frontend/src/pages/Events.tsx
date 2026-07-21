import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface Event {
  id: string;
  timestamp: string;
  type: string;
  severity: string;
  source: string;
  message: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: '', severity: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEvents();
    // Refresh every 5 seconds
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = () => {
    fetch(`${API_URL}/events/query?limit=100`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEvents(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  };

  const filteredEvents = events.filter(event => {
    if (filter.type && event.type !== filter.type) return false;
    if (filter.severity && event.severity !== filter.severity) return false;
    if (search && !event.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'var(--critical)';
      case 'error': return 'var(--error)';
      case 'warning': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alarm': return '🔔';
      case 'operator': return '👤';
      case 'system': return '⚙️';
      case 'fault': return '⚠️';
      case 'command': return '📤';
      default: return '📋';
    }
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              type="text"
              className="input"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="select"
            style={{ width: 'auto' }}
            value={filter.type}
            onChange={(e) => setFilter(f => ({ ...f, type: e.target.value }))}
          >
            <option value="">All Types</option>
            <option value="alarm">Alarm</option>
            <option value="operator">Operator</option>
            <option value="system">System</option>
            <option value="fault">Fault</option>
            <option value="command">Command</option>
          </select>
          <select
            className="select"
            style={{ width: 'auto' }}
            value={filter.severity}
            onChange={(e) => setFilter(f => ({ ...f, severity: e.target.value }))}
          >
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <button className="btn btn-primary" onClick={fetchEvents}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="card-header">
          <span className="card-title">Event Log</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {filteredEvents.length} events
          </span>
        </div>

        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 50 }}></th>
                <th style={{ width: 180 }}>Timestamp</th>
                <th style={{ width: 80 }}>Type</th>
                <th style={{ width: 80 }}>Severity</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td style={{ textAlign: 'center' }}>{getTypeIcon(event.type)}</td>
                  <td style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                    {formatTimestamp(event.timestamp)}
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{event.type}</td>
                  <td>
                    <span style={{ 
                      color: getSeverityColor(event.severity),
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}>
                      {event.severity}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>{event.message}</td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-4" style={{ marginTop: '1rem' }}>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{events.filter(e => e.type === 'alarm').length}</div>
            <div className="metric-label">Alarm Events</div>
          </div>
        </div>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{events.filter(e => e.type === 'operator').length}</div>
            <div className="metric-label">Operator Actions</div>
          </div>
        </div>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{events.filter(e => e.type === 'fault').length}</div>
            <div className="metric-label">Fault Events</div>
          </div>
        </div>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{events.filter(e => e.severity === 'critical').length}</div>
            <div className="metric-label">Critical Events</div>
          </div>
        </div>
      </div>
    </div>
  );
}
