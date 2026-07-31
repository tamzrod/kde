import { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  telemetry: Map<string, any>;
  stats: any;
  alarms: any[];
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function Dashboard({ telemetry, stats, alarms }: Props) {
  const [simulationState, setSimulationState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/simulation/state`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSimulationState(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching simulation state:', err);
        setLoading(false);
      });
  }, []);

  // Get telemetry values
  const getValue = (deviceId: string, tagId: string, defaultValue = 0) => {
    const key = `${deviceId}:${tagId}`;
    const point = telemetry.get(key);
    return point ? point.value : defaultValue;
  };

  // Calculate totals
  const totalGeneration = simulationState?.substations?.reduce((sum: number, sub: any) => sum + sub.activePower, 0) || 0;
  const totalLoad = getValue('system', 'frequency', 0) > 0 ? totalGeneration * 0.98 : 0;
  const frequency = getValue('system', 'frequency', 60);
  
  // Prepare power chart data
  const powerChartOption = {
    title: { text: 'Substation Power Generation', textStyle: { color: '#e6e6e6', fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['Active Power (MW)'], textStyle: { color: '#94a3b8' } },
    xAxis: {
      type: 'category',
      data: simulationState?.substations?.map((s: any) => s.name) || [],
      axisLine: { lineStyle: { color: '#2a3544' } },
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      name: 'MW',
      axisLine: { lineStyle: { color: '#2a3544' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#1a2332' } },
    },
    series: [{
      data: simulationState?.substations?.map((s: any) => s.activePower.toFixed(1)) || [],
      type: 'bar',
      itemStyle: { color: '#3b82f6' },
    }],
    grid: { left: 50, right: 20, top: 40, bottom: 30 },
  };

  // Feeder power chart
  const feederChartOption = {
    title: { text: 'Feeder Power Flow', textStyle: { color: '#e6e6e6', fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['Power (MW)'], textStyle: { color: '#94a3b8' } },
    xAxis: {
      type: 'category',
      data: simulationState?.feeders?.map((f: any) => f.name) || [],
      axisLine: { lineStyle: { color: '#2a3544' } },
      axisLabel: { color: '#94a3b8', rotate: 30 },
    },
    yAxis: {
      type: 'value',
      name: 'MW',
      axisLine: { lineStyle: { color: '#2a3544' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#1a2332' } },
    },
    series: [{
      data: simulationState?.feeders?.map((f: any) => f.powerFlow.toFixed(2)) || [],
      type: 'line',
      smooth: true,
      areaStyle: { color: 'rgba(34, 197, 94, 0.2)' },
      lineStyle: { color: '#22c55e' },
      itemStyle: { color: '#22c55e' },
    }],
    grid: { left: 50, right: 20, top: 40, bottom: 30 },
  };

  // System gauge chart
  const gaugeChartOption = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 59.5,
      max: 60.5,
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.33, '#ef4444'],
            [0.66, '#f59e0b'],
            [1, '#22c55e'],
          ],
        },
      },
      pointer: { icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z', length: '12%', width: 20, offsetCenter: [0, '-60%'], itemStyle: { color: '#94a3b8' } },
      axisTick: { length: 12, lineStyle: { color: '#94a3b8', width: 2 } },
      splitLine: { length: 20, lineStyle: { color: '#94a3b8', width: 5 } },
      axisLabel: { color: '#94a3b8', fontSize: 12, distance: -60 },
      title: { offsetCenter: [0, '-10%'], fontSize: 14, color: '#94a3b8' },
      detail: { fontSize: 24, offsetCenter: [0, '-35%'], valueAnimation: true, formatter: (value: number) => value.toFixed(3), color: '#e6e6e6' },
      data: [{ value: frequency.toFixed(3), name: 'Frequency (Hz)' }],
    }],
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{totalGeneration.toFixed(1)}</div>
            <div className="metric-label">Total Generation</div>
            <div className="metric-unit">MW</div>
          </div>
        </div>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{totalLoad.toFixed(1)}</div>
            <div className="metric-label">Total Load</div>
            <div className="metric-unit">MW</div>
          </div>
        </div>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{stats.totalActiveAlarms || alarms.length}</div>
            <div className="metric-label">Active Alarms</div>
            <div className="metric-unit">alarms</div>
          </div>
        </div>
        <div className="card">
          <div className="metric">
            <div className="metric-value">{stats.devices?.substation || 2}</div>
            <div className="metric-label">Substations</div>
            <div className="metric-unit">online</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-2" style={{ marginBottom: '1rem' }}>
        <div className="card">
          <div className="chart-container">
            <ReactECharts option={powerChartOption} style={{ height: '100%' }} />
          </div>
        </div>
        <div className="card">
          <div className="chart-container">
            <ReactECharts option={feederChartOption} style={{ height: '100%' }} />
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-3">
        <div className="card">
          <div className="card-header">
            <span className="card-title">System Frequency</span>
          </div>
          <div className="chart-container" style={{ height: '200px' }}>
            <ReactECharts option={gaugeChartOption} style={{ height: '100%' }} />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Equipment Status</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.devices || {}).map(([type, count]) => (
                <tr key={type}>
                  <td style={{ textTransform: 'capitalize' }}>{type}s</td>
                  <td>{count as number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Alarms</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {alarms.slice(0, 5).map((alarm) => (
                <tr key={alarm.id}>
                  <td>
                    <span className={`badge badge-${alarm.severity}`}>
                      {alarm.severity}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>{alarm.message}</td>
                </tr>
              ))}
              {alarms.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    No active alarms
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
