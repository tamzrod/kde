// SCADA Platform Shared Constants

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

export const ALARM_SEVERITIES = ['critical', 'major', 'minor', 'warning'] as const;

export const DEVICE_TYPES = [
  'substation',
  'feeder',
  'breaker',
  'recloser',
  'sectionalizer',
  'transformer',
  'capacitor',
  'der',
  'battery',
  'load',
  'meter',
] as const;

export const TAG_TYPES = ['analog', 'digital', 'counter', 'setpoint'] as const;

export const USER_ROLES = ['operator', 'engineer', 'admin'] as const;

export const COMMAND_TYPES = ['close', 'open', 'set', 'adjust', 'trip', 'reset', 'start', 'stop'] as const;

export const COMMAND_STATUSES = ['pending', 'executing', 'executed', 'failed', 'cancelled', 'timeout'] as const;

export const ALARM_CONDITIONS = ['gt', 'lt', 'eq', 'ne', 'ge', 'le'] as const;

export const ALARM_STATES = ['active', 'acknowledged', 'cleared', 'shelved', 'suppressed'] as const;

export const EVENT_TYPES = ['alarm', 'operator', 'system', 'fault', 'command'] as const;

export const EVENT_SEVERITIES = ['info', 'warning', 'error', 'critical'] as const;

export const DATA_QUALITY = ['good', 'bad', 'uncertain'] as const;

// WebSocket Channels
export const WS_CHANNELS = {
  TELEMETRY: 'telemetry',
  ALARMS: 'alarms',
  EVENTS: 'events',
  COMMANDS: 'commands',
} as const;

// Default pagination
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 50;
export const MAX_PAGE_SIZE = 1000;

// Simulation defaults
export const DEFAULT_TICK_INTERVAL = 1000; // ms
export const TELEMETRY_BATCH_SIZE = 100;
export const WS_BROADCAST_INTERVAL = 500; // ms

// Grid model defaults
export const NOMINAL_FREQUENCY = 60; // Hz
export const SUBSTATION_VOLTAGE_PRIMARY = 138000; // V
export const SUBSTATION_VOLTAGE_SECONDARY = 13800; // V
export const FEEDER_VOLTAGE = 13800; // V
