// SCADA Platform Shared Types

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  parent_id?: string;
  voltage_level?: string;
  rating?: string;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  install_date?: string;
  status: DeviceStatus;
  location_lat?: number;
  location_lng?: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type DeviceType = 
  | 'substation' 
  | 'feeder' 
  | 'breaker' 
  | 'recloser' 
  | 'sectionalizer' 
  | 'transformer' 
  | 'capacitor' 
  | 'der' 
  | 'battery' 
  | 'load' 
  | 'meter';

export type DeviceStatus = 'active' | 'maintenance' | 'outage' | 'decommissioned';

export interface DeviceTag {
  id: string;
  device_id: string;
  tag_name: string;
  tag_type: TagType;
  description?: string;
  unit?: string;
  scale: number;
  offset: number;
  min_value?: number;
  max_value?: number;
  deadband?: number;
  created_at: string;
}

export type TagType = 'analog' | 'digital' | 'counter' | 'setpoint';

export interface TelemetryPoint {
  device_id: string;
  tag_id: string;
  value: number;
  quality: DataQuality;
  timestamp: number;
}

export type DataQuality = 'good' | 'bad' | 'uncertain';

export interface Alarm {
  id: string;
  device_id: string;
  tag_id?: string;
  severity: AlarmSeverity;
  state: AlarmState;
  message: string;
  value?: number;
  setpoint?: number;
  alarm_rule_id?: string;
  created_at: string;
  acknowledged_at?: string;
  acknowledged_by?: string;
  acknowledged_comment?: string;
  cleared_at?: string;
  cleared_by?: string;
}

export type AlarmSeverity = 'critical' | 'major' | 'minor' | 'warning';
export type AlarmState = 'active' | 'acknowledged' | 'cleared' | 'shelved' | 'suppressed';

export interface AlarmRule {
  id: string;
  device_id: string;
  tag_id?: string;
  severity: AlarmSeverity;
  condition: AlarmCondition;
  setpoint: number;
  message: string;
  priority: number;
  is_enabled: boolean;
  created_at: string;
}

export type AlarmCondition = 'gt' | 'lt' | 'eq' | 'ne' | 'ge' | 'le';

export interface SCADAEvent {
  timestamp: string;
  type: EventType;
  severity: EventSeverity;
  source: string;
  message: string;
  metadata?: Record<string, any>;
}

export type EventType = 'alarm' | 'operator' | 'system' | 'fault' | 'command';
export type EventSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface Command {
  id: string;
  device_id: string;
  command_type: CommandType;
  parameters?: Record<string, any>;
  issued_by: string;
  issued_at: string;
  status: CommandStatus;
  result?: any;
  error?: string;
  completed_at?: string;
}

export type CommandType = 'close' | 'open' | 'set' | 'adjust' | 'trip' | 'reset' | 'start' | 'stop';
export type CommandStatus = 'pending' | 'executing' | 'executed' | 'failed' | 'cancelled' | 'timeout';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  permissions: string[];
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

export type UserRole = 'operator' | 'engineer' | 'admin';

export interface ApiResponse<T> {
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

export interface WSMessage {
  type: 'telemetry' | 'alarm' | 'event' | 'command_result' | 'heartbeat' | 'connected' | 'subscribed' | 'error';
  channel?: string;
  timestamp: string;
  data: any;
}

export interface TelemetryWSMessage extends WSMessage {
  type: 'telemetry';
  data: Array<{
    deviceId: string;
    tagId: string;
    value: number;
    quality: DataQuality;
    timestamp: string;
  }>;
}

export interface AlarmWSMessage extends WSMessage {
  type: 'alarm';
  data: Alarm;
}

export interface EventWSMessage extends WSMessage {
  type: 'event';
  data: SCADAEvent;
}

// Grid Model Types for Simulator
export interface GridModel {
  substations: Substation[];
  feeders: Feeder[];
  devices: GridDevice[];
}

export interface Substation {
  id: string;
  name: string;
  primaryVoltage: number;
  secondaryVoltage: number;
  feederIds: string[];
  state: 'energized' | 'partial' | 'outage';
  activePower: number;
  reactivePower: number;
}

export interface Feeder {
  id: string;
  name: string;
  substationId: string;
  nominalVoltage: number;
  status: 'energized' | 'de-energized' | 'fault';
  headCurrent: number;
  headVoltage: number;
  powerFlow: number;
  loadFactor: number;
}

export interface GridDevice {
  id: string;
  type: string;
  feederId: string;
  state: 'open' | 'closed' | 'tripped';
  measurements: Record<string, number>;
}
