import { useEffect, useState, useRef } from 'react';

interface Props {
  telemetry: Map<string, any>;
}

interface Device {
  id: string;
  name: string;
  type: string;
  parent_id: string;
}

export default function SingleLineDiagram({ telemetry }: Props) {
  const [feeder, setFeeder] = useState<Device | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${API_URL}/devices?type=feeder`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setFeeder(data.data[0]);
          // Fetch devices on this feeder
          fetch(`${API_URL}/devices?parentId=${data.data[0].id}`)
            .then(res => res.json())
            .then(d => {
              if (d.success) setDevices(d.data);
            });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching feeder:', err);
        setLoading(false);
      });
  }, []);

  const getValue = (deviceId: string, tagId: string, defaultValue = 0) => {
    const key = `${deviceId}:${tagId}`;
    const point = telemetry.get(key);
    return point ? point.value : defaultValue;
  };

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.2, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.2, 0.5));
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const getBreakerState = (id: string) => {
    const pos = getValue(id, 'position', 1);
    return pos === 1 ? 'closed' : 'open';
  };

  const getBreakerColor = (id: string) => {
    return getBreakerState(id) === 'closed' ? '#22c55e' : '#ef4444';
  };

  if (loading) {
    return <div className="loading">Loading Single Line Diagram...</div>;
  }

  return (
    <div className="sld-container">
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button className="btn btn-primary" onClick={handleZoomIn}>🔍+</button>
        <button className="btn btn-primary" onClick={handleZoomOut}>🔍-</button>
        <button className="btn btn-primary" onClick={handleReset}>Reset</button>
        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {feeder?.name || 'North Feeder 1'} - 13.8kV
        </span>
      </div>

      <svg
        ref={svgRef}
        className="sld-svg"
        viewBox="0 0 1000 500"
        style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)` }}
      >
        {/* Definitions */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Main Bus */}
        <rect x="50" y="80" width="900" height="20" fill="#f59e0b" rx="4" />
        <text x="500" y="75" textAnchor="middle" fill="#e6e6e6" fontSize="14">13.8 kV BUS</text>

        {/* Substation Transformer Symbol */}
        <g transform="translate(100, 50)">
          <circle cx="0" cy="0" r="20" fill="#3b82f6" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12">T1</text>
          <text x="0" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10">138/13.8kV</text>
          <text x="0" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10">100 MVA</text>
        </g>

        {/* Feeder 1 Main Breaker */}
        <g transform="translate(200, 90)" style={{ cursor: 'pointer' }}>
          <rect
            x="-15"
            y="-25"
            width="30"
            height="50"
            fill={getBreakerColor('brk-001')}
            rx="4"
            onClick={() => console.log('Breaker clicked')}
          />
          <text x="0" y="40" textAnchor="middle" fill="#e6e6e6" fontSize="10">BRK-001</text>
          <text x="0" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {getBreakerState('brk-001') === 'closed' ? 'CLOSED' : 'OPEN'}
          </text>
          <text x="0" y="-35" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {getValue('brk-001', 'current', 0).toFixed(0)} A
          </text>
        </g>

        {/* Connection Line */}
        <line x1="215" y1="90" x2="280" y2="90" stroke="#f59e0b" strokeWidth="3" />

        {/* Sectionalizer */}
        <g transform="translate(280, 90)">
          <rect x="-10" y="-20" width="20" height="40" fill="#64748b" rx="2" />
          <text x="0" y="40" textAnchor="middle" fill="#e6e6e6" fontSize="9">SEC-1</text>
        </g>

        {/* Connection Line */}
        <line x1="290" y1="90" x2="350" y2="90" stroke="#f59e0b" strokeWidth="3" />

        {/* Transformer T1 */}
        <g transform="translate(400, 90)">
          <circle cx="0" cy="0" r="25" fill="none" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="0" cy="0" r="15" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <text x="0" y="45" textAnchor="middle" fill="#e6e6e6" fontSize="10">XFRM-1</text>
          <text x="0" y="57" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {getValue('xfmr-001', 'oil_temp', 0).toFixed(0)}°C
          </text>
          <text x="0" y="-35" textAnchor="middle" fill="#94a3b8" fontSize="8">
            Tap: {getValue('xfmr-001', 'tap_position', 0)}
          </text>
        </g>

        {/* Connection Line */}
        <line x1="425" y1="90" x2="480" y2="90" stroke="#f59e0b" strokeWidth="3" />

        {/* Capacitor Bank */}
        <g transform="translate(530, 90)">
          <line x1="-15" y1="-20" x2="-15" y2="20" stroke="#22c55e" strokeWidth="3" />
          <line x1="0" y1="-20" x2="0" y2="20" stroke="#22c55e" strokeWidth="3" />
          <line x1="15" y1="-20" x2="15" y2="20" stroke="#22c55e" strokeWidth="3" />
          <line x1="-15" y1="-20" x2="15" y2="-20" stroke="#22c55e" strokeWidth="2" />
          <text x="0" y="40" textAnchor="middle" fill="#e6e6e6" fontSize="10">CAP-1</text>
          <text x="0" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {getValue('cap-001', 'reactive_power', 0).toFixed(1)} MVAR
          </text>
        </g>

        {/* Connection Line */}
        <line x1="545" y1="90" x2="600" y2="90" stroke="#f59e0b" strokeWidth="3" />

        {/* Recloser */}
        <g transform="translate(650, 90)" style={{ cursor: 'pointer' }}>
          <rect
            x="-12"
            y="-22"
            width="24"
            height="44"
            fill={getBreakerColor('rec-001')}
            rx="4"
          />
          <circle cx="0" cy="-10" r="5" fill="white" />
          <circle cx="0" cy="10" r="5" fill="white" />
          <text x="0" y="40" textAnchor="middle" fill="#e6e6e6" fontSize="9">REC-1</text>
          <text x="0" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8">
            Trips: {getValue('rec-001', 'trip_count', 0)}
          </text>
        </g>

        {/* DER (Solar) */}
        <g transform="translate(780, 90)">
          <polygon points="0,-25 20,15 -20,15" fill="#22c55e" />
          <text x="0" y="40" textAnchor="middle" fill="#e6e6e6" fontSize="10">DER-1</text>
          <text x="0" y="52" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {getValue('der-001', 'active_power', 0).toFixed(2)} MW
          </text>
        </g>

        {/* Load symbols */}
        <g transform="translate(850, 60)">
          <rect x="-15" y="-15" width="30" height="30" fill="#94a3b8" rx="2" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10">L1</text>
          <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {getValue('load-001', 'active_power', 0).toFixed(2)} MW
          </text>
        </g>

        <g transform="translate(850, 120)">
          <rect x="-15" y="-15" width="30" height="30" fill="#94a3b8" rx="2" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10">L2</text>
          <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {getValue('load-002', 'active_power', 0).toFixed(2)} MW
          </text>
        </g>

        {/* Branch lines to loads */}
        <line x1="650" y1="90" x2="650" y2="60" stroke="#f59e0b" strokeWidth="2" />
        <line x1="650" y1="60" x2="835" y2="60" stroke="#f59e0b" strokeWidth="2" />
        <line x1="835" y1="60" x2="835" y2="60" stroke="#f59e0b" strokeWidth="2" />

        <line x1="650" y1="90" x2="650" y2="120" stroke="#f59e0b" strokeWidth="2" />
        <line x1="650" y1="120" x2="835" y2="120" stroke="#f59e0b" strokeWidth="2" />

        {/* Legend */}
        <g transform="translate(50, 450)">
          <text x="0" y="0" fill="#e6e6e6" fontSize="12" fontWeight="bold">Legend:</text>
          
          <rect x="0" y="15" width="20" height="12" fill="#22c55e" rx="2" />
          <text x="30" y="25" fill="#94a3b8" fontSize="10">Closed</text>
          
          <rect x="100" y="15" width="20" height="12" fill="#ef4444" rx="2" />
          <text x="130" y="25" fill="#94a3b8" fontSize="10">Open/Tripped</text>
          
          <line x1="200" y1="21" x2="230" y2="21" stroke="#f59e0b" strokeWidth="3" />
          <text x="240" y="25" fill="#94a3b8" fontSize="10">Power Line</text>
          
          <circle cx="310" cy="21" r="10" fill="#3b82f6" />
          <text x="330" y="25" fill="#94a3b8" fontSize="10">Transformer</text>
          
          <polygon points="400,11 410,26 390,26" fill="#22c55e" />
          <text x="420" y="25" fill="#94a3b8" fontSize="10">DER/Solar</text>
        </g>

        {/* Real-time values panel */}
        <g transform="translate(600, 350)">
          <rect x="0" y="0" width="350" height="120" fill="#141a23" stroke="#2a3544" rx="4" />
          <text x="10" y="25" fill="#e6e6e6" fontSize="12" fontWeight="bold">Real-time Measurements</text>
          
          <text x="10" y="50" fill="#94a3b8" fontSize="10">Bus Voltage:</text>
          <text x="180" y="50" fill="#e6e6e6" fontSize="10">13800 V</text>
          
          <text x="10" y="70" fill="#94a3b8" fontSize="10">Feeder Current:</text>
          <text x="180" y="70" fill="#e6e6e6" fontSize="10">{getValue('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'current', 0).toFixed(1)} A</text>
          
          <text x="10" y="90" fill="#94a3b8" fontSize="10">Power Flow:</text>
          <text x="180" y="90" fill="#e6e6e6" fontSize="10">{getValue('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'active_power', 0).toFixed(2)} MW</text>
          
          <text x="10" y="110" fill="#94a3b8" fontSize="10">System Freq:</text>
          <text x="180" y="110" fill="#e6e6e6" fontSize="10">{getValue('system', 'frequency', 60).toFixed(3)} Hz</text>
        </g>
      </svg>
    </div>
  );
}
