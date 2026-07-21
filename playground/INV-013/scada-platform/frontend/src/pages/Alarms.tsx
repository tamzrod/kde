import { useEffect, useState } from 'react';

interface Alarm {
  id: string;
  device_id: string;
  severity: string;
  state: string;
  message: string;
  value?: number;
  setpoint?: number;
  created_at: string;
  acknowledged_at?: string;
  acknowledged_by?: string;
}

interface Props {
  alarms: Alarm[];
  setAlarms: (alarms: Alarm[]) => void;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function Alarms({ alarms, setAlarms }: Props) {
  const [filter, setFilter] = useState({ state: '', severity: '' });
  const [loading, setLoading] = useState(false);

  const filteredAlarms = alarms.filter(alarm => {
    if (filter.state && alarm.state !== filter.state) return false;
    if (filter.severity && alarm.severity !== filter.severity) return false;
    return true;
  });

  const activeAlarms = alarms.filter(a => a.state === 'active' || a.state === 'acknowledged');
  const criticalCount = activeAlarms.filter(a => a.severity === 'critical').length;
  const majorCount = activeAlarms.filter(a => a.severity === 'major').length;
  const minorCount = activeAlarms.filter(a => a.severity === 'minor').length;
  const warningCount = activeAlarms.filter(a => a.severity === 'warning').length;

  const acknowledgeAlarm = async (alarmId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/alarms/${alarmId}/acknowledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'operator1', comment: 'Acknowledged via UI' }),
      });
      const data = await res.json();
      if (data.success) {
        setAlarms(alarms.map(a => a.id === alarmId ? data.data : a));
      }
    } catch (err) {
      console.error('Error acknowledging alarm:', err);
    }
    setLoading(false);
  };

  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleString();
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical': return 'badge-critical';
      case 'major': return 'badge-major';
      case 'minor': return 'badge-minor';
      case 'warning': return 'badge-warning';
      default: return '';
    }
  };

  return (
    <div>
      {/* Severity Summary */}
      <div className="grid grid-4" style={{ marginBottom: '1rem' }}>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setFilter(f => ({ ...f, severity: 'critical' }))}>
          <div className="metric">
            <div className="metric-value" style={{ color: 'var(--critical)' }}>{criticalCount}</div>
            <div className="metric-label">Critical</div>
          </div>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setFilter(f => ({ ...f, severity: 'major' }))}>
          <div className="metric">
            <div className="metric-value" style={{ color: 'var(--major)' }}>{majorCount}</div>
            <div className="metric-label">Major</div>
          </div>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setFilter(f => ({ ...f, severity: 'minor' }))}>
          <div className="metric">
            <div className="metric-value" style={{ color: 'var(--minor)' }}>{minorCount}</div>
            <div className="metric-label">Minor</div>
          </div>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setFilter(f => ({ ...f, severity: 'warning' }))}>
          <div className="metric">
            <div className="metric-value" style={{ color: 'var(--warning)' }}>{warningCount}</div>
            <div className="metric-label">Warning</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>Filters:</span>
          <select
            className="select"
            style={{ width: 'auto' }}
            value={filter.state}
            onChange={(e) => setFilter(f => ({ ...f, state: e.target.value }))}
          >
            <option value="">All States</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="cleared">Cleared</option>
            <option value="shelved">Shelved</option>
          </select>
          <select
            className="select"
            style={{ width: 'auto' }}
            value={filter.severity}
            onChange={(e) => setFilter(f => ({ ...f, severity: e.target.value }))}
          >
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="warning">Warning</option>
          </select>
          {(filter.state || filter.severity) && (
            <button
              className="btn"
              onClick={() => setFilter({ state: '', severity: '' })}
            >
              Clear Filters
            </button>
          )}
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {filteredAlarms.length} alarms
          </span>
        </div>
      </div>

      {/* Alarms Table */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <table>
          <thead>
            <tr>
              <th style={{ width: 100 }}>Severity</th>
              <th style={{ width: 100 }}>State</th>
              <th style={{ width: 180 }}>Timestamp</th>
              <th>Message</th>
              <th style={{ width: 120 }}>Value</th>
              <th style={{ width: 150 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlarms.map((alarm) => (
              <tr key={alarm.id} style={{ 
                backgroundColor: alarm.state === 'active' ? 'rgba(239, 68, 68, 0.05)' : undefined
              }}>
                <td>
                  <span className={`badge ${getSeverityClass(alarm.severity)}`}>
                    {alarm.severity.toUpperCase()}
                  </span>
                </td>
                <td style={{ textTransform: 'capitalize' }}>{alarm.state}</td>
                <td style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                  {formatTimestamp(alarm.created_at)}
                </td>
                <td style={{ fontSize: '0.875rem' }}>{alarm.message}</td>
                <td style={{ fontFamily: 'monospace' }}>
                  {alarm.value !== null && alarm.value !== undefined
                    ? `${alarm.value.toFixed(2)} / ${alarm.setpoint?.toFixed(2) || '?'}`
                    : '-'}
                </td>
                <td>
                  {alarm.state === 'active' && (
                    <button
                      className="btn btn-primary"
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={() => acknowledgeAlarm(alarm.id)}
                      disabled={loading}
                    >
                      ACK
                    </button>
                  )}
                  {alarm.state === 'acknowledged' && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ACK by {alarm.acknowledged_by || 'system'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filteredAlarms.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  No alarms matching current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Alarm Legend */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="card-header">
          <span className="card-title">Alarm States</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
          <div>🔴 <strong>Active</strong> - Alarm condition exists</div>
          <div>🟡 <strong>Acknowledged</strong> - Operator has seen the alarm</div>
          <div>🟢 <strong>Cleared</strong> - Alarm condition resolved</div>
          <div>⚪ <strong>Shelved</strong> - Temporarily suppressed</div>
        </div>
      </div>
    </div>
  );
}
