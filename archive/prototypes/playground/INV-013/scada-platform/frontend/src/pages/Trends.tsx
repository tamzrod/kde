import { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  telemetry: Map<string, any>;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function Trends({ telemetry }: Props) {
  const [timeRange, setTimeRange] = useState('1h');
  const [selectedPens, setSelectedPens] = useState<string[]>(['North Substation Power']);
  const [chartData, setChartData] = useState<any[]>([]);
  const chartRef = useRef<any>(null);

  const getValue = (deviceId: string, tagId: string, defaultValue = 0) => {
    const key = `${deviceId}:${tagId}`;
    const point = telemetry.get(key);
    return point ? point.value : defaultValue;
  };

  // Generate trend data
  useEffect(() => {
    const now = Date.now();
    const data: any[] = [];
    
    // Generate 100 data points
    for (let i = 0; i < 100; i++) {
      const timestamp = now - (100 - i) * 60000; // 1 minute intervals
      data.push({
        timestamp,
        substationPower: 40 + Math.sin(i / 10) * 10 + Math.random() * 3,
        feederCurrent: 200 + Math.sin(i / 8) * 50 + Math.random() * 10,
        frequency: 60 + Math.sin(i / 15) * 0.1 + Math.random() * 0.02,
        solarOutput: Math.max(0, Math.sin((i % 24) * Math.PI / 12) * 3 + Math.random()),
      });
    }
    
    setChartData(data);
  }, [timeRange]);

  const chartOption = {
    title: {
      text: 'Telemetry Trends',
      textStyle: { color: '#e6e6e6', fontSize: 14 },
      left: 20,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#141a23',
      borderColor: '#2a3544',
      textStyle: { color: '#e6e6e6' },
    },
    legend: {
      data: selectedPens,
      textStyle: { color: '#94a3b8' },
      top: 10,
    },
    grid: {
      left: 60,
      right: 40,
      top: 50,
      bottom: 60,
    },
    xAxis: {
      type: 'time',
      axisLine: { lineStyle: { color: '#2a3544' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Power (MW) / Current (A)',
        axisLine: { lineStyle: { color: '#2a3544' } },
        axisLabel: { color: '#94a3b8' },
        splitLine: { lineStyle: { color: '#1a2332' } },
      },
      {
        type: 'value',
        name: 'Frequency (Hz)',
        min: 59.8,
        max: 60.2,
        axisLine: { lineStyle: { color: '#2a3544' } },
        axisLabel: { color: '#94a3b8' },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      { type: 'inside', start: 0, end: 100 },
      { type: 'slider', start: 0, end: 100, height: 20, bottom: 10 },
    ],
    series: [
      {
        name: 'Substation Power',
        type: 'line',
        yAxisIndex: 0,
        data: chartData.map(d => [d.timestamp, d.substationPower]),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#3b82f6', width: 2 },
        areaStyle: { color: 'rgba(59, 130, 246, 0.1)' },
      },
      {
        name: 'Feeder Current',
        type: 'line',
        yAxisIndex: 0,
        data: chartData.map(d => [d.timestamp, d.feederCurrent]),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#22c55e', width: 2 },
      },
      {
        name: 'Frequency',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.map(d => [d.timestamp, d.frequency]),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#f59e0b', width: 2 },
      },
      {
        name: 'Solar Output',
        type: 'line',
        yAxisIndex: 0,
        data: chartData.map(d => [d.timestamp, d.solarOutput]),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#10b981', width: 2 },
      },
    ],
  };

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Substation Power (MW)', 'Feeder Current (A)', 'Frequency (Hz)', 'Solar Output (MW)'];
    const rows = chartData.map(d => [
      new Date(d.timestamp).toISOString(),
      d.substationPower.toFixed(2),
      d.feederCurrent.toFixed(1),
      d.frequency.toFixed(3),
      d.solarOutput.toFixed(2),
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trends_${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['15m', '1h', '6h', '24h', '7d'].map(range => (
              <button
                key={range}
                className={`btn ${timeRange === range ? 'btn-primary' : ''}`}
                onClick={() => setTimeRange(range)}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>

        <div style={{ height: '400px' }}>
          <ReactECharts ref={chartRef} option={chartOption} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Pen Configuration */}
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Available Pens</span>
          </div>
          <div style={{ fontSize: '0.875rem' }}>
            <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                 onClick={() => setSelectedPens(p => [...p, 'Substation Power'])}>
              📊 Substation Power (MW)
            </div>
            <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                 onClick={() => setSelectedPens(p => [...p, 'Feeder Current'])}>
              ⚡ Feeder Current (A)
            </div>
            <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                 onClick={() => setSelectedPens(p => [...p, 'Frequency'])}>
              🔄 System Frequency (Hz)
            </div>
            <div style={{ padding: '0.5rem', cursor: 'pointer' }}
                 onClick={() => setSelectedPens(p => [...p, 'Solar Output'])}>
              ☀️ Solar DER Output (MW)
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Selected Pens</span>
          </div>
          {selectedPens.map((pen, idx) => (
            <div key={idx} style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{pen}</span>
              <button
                className="btn"
                style={{ padding: '0.125rem 0.5rem', fontSize: '0.75rem' }}
                onClick={() => setSelectedPens(p => p.filter((_, i) => i !== idx))}
              >
                ✕
              </button>
            </div>
          ))}
          {selectedPens.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: '0.5rem' }}>
              No pens selected
            </div>
          )}
        </div>
      </div>

      {/* Live Values */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="card-header">
          <span className="card-title">Current Values</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="grid grid-4">
          <div className="metric">
            <div className="metric-value">{getValue('11111111-1111-1111-1111-111111111111', 'active_power', 0).toFixed(1)}</div>
            <div className="metric-label">Sub Power (MW)</div>
          </div>
          <div className="metric">
            <div className="metric-value">{getValue('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'current', 0).toFixed(0)}</div>
            <div className="metric-label">Feeder Current (A)</div>
          </div>
          <div className="metric">
            <div className="metric-value">{getValue('system', 'frequency', 60).toFixed(3)}</div>
            <div className="metric-label">Frequency (Hz)</div>
          </div>
          <div className="metric">
            <div className="metric-value">{getValue('der-001', 'active_power', 0).toFixed(2)}</div>
            <div className="metric-label">Solar (MW)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
