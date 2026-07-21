-- SCADA Platform PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS AND AUTHENTICATION
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('operator', 'engineer', 'admin')),
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role, permissions)
VALUES ('admin', 'admin@scada.local', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '["view_all", "control_all", "configure_all"]')
ON CONFLICT (username) DO NOTHING;

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- ============================================
-- DEVICE REGISTRY
-- ============================================

CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'substation', 'feeder', 'breaker', 'recloser', 
        'sectionalizer', 'transformer', 'capacitor', 
        'der', 'battery', 'load', 'meter'
    )),
    parent_id UUID REFERENCES devices(id),
    voltage_level VARCHAR(20),
    rating VARCHAR(50),
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    install_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'outage', 'decommissioned')),
    location_lat DECIMAL(10, 7),
    location_lng DECIMAL(10, 7),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_devices_type ON devices(type);
CREATE INDEX IF NOT EXISTS idx_devices_parent ON devices(parent_id);
CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);

CREATE TABLE IF NOT EXISTS device_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    tag_type VARCHAR(20) NOT NULL CHECK (tag_type IN ('analog', 'digital', 'counter', 'setpoint')),
    description TEXT,
    unit VARCHAR(20),
    scale DECIMAL(10, 6) DEFAULT 1,
    "offset" DECIMAL(10, 4) DEFAULT 0,
    min_value DECIMAL(15, 4),
    max_value DECIMAL(15, 4),
    deadband DECIMAL(15, 4) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(device_id, tag_name)
);

CREATE INDEX IF NOT EXISTS idx_device_tags_device ON device_tags(device_id);

-- ============================================
-- GIS DATA
-- ============================================

CREATE TABLE IF NOT EXISTS gis_layers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    layer_type VARCHAR(50) NOT NULL,
    style JSONB DEFAULT '{}',
    visibility BOOLEAN DEFAULT TRUE,
    z_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gis_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    layer_id UUID REFERENCES gis_layers(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
    properties JSONB DEFAULT '{}'
);

-- ============================================
-- SINGLE LINE DIAGRAM
-- ============================================

CREATE TABLE IF NOT EXISTS sld_diagrams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    feeder_id UUID REFERENCES devices(id),
    view_box VARCHAR(100) DEFAULT '0 0 1000 800',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sld_elements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagram_id UUID REFERENCES sld_diagrams(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id),
    element_type VARCHAR(50) NOT NULL,
    svg_element VARCHAR(20) NOT NULL,
    x DECIMAL(10, 2) NOT NULL,
    y DECIMAL(10, 2) NOT NULL,
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    rotation DECIMAL(5, 2) DEFAULT 0,
    properties JSONB DEFAULT '{}',
    z_index INTEGER DEFAULT 0
);

-- ============================================
-- ALARM MANAGEMENT
-- ============================================

CREATE TABLE IF NOT EXISTS alarm_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES device_tags(id) ON DELETE CASCADE,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'major', 'minor', 'warning')),
    condition VARCHAR(20) NOT NULL CHECK (condition IN ('gt', 'lt', 'eq', 'ne', 'ge', 'le')),
    setpoint DECIMAL(15, 4) NOT NULL,
    message TEXT NOT NULL,
    priority INTEGER DEFAULT 5,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_alarm_rules_device ON alarm_rules(device_id);

CREATE TABLE IF NOT EXISTS alarms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id),
    tag_id UUID REFERENCES device_tags(id),
    severity VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (state IN ('active', 'acknowledged', 'cleared', 'shelved', 'suppressed')),
    message TEXT NOT NULL,
    value DECIMAL(15, 4),
    setpoint DECIMAL(15, 4),
    alarm_rule_id UUID REFERENCES alarm_rules(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_comment TEXT,
    cleared_at TIMESTAMP WITH TIME ZONE,
    cleared_by UUID REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_alarms_state ON alarms(state);
CREATE INDEX IF NOT EXISTS idx_alarms_severity ON alarms(severity);
CREATE INDEX IF NOT EXISTS idx_alarms_created ON alarms(created_at DESC);

-- ============================================
-- COMMANDS
-- ============================================

CREATE TABLE IF NOT EXISTS commands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id),
    command_type VARCHAR(50) NOT NULL,
    parameters JSONB DEFAULT '{}',
    issued_by UUID REFERENCES users(id),
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'executing', 'executed', 'failed', 'cancelled', 'timeout')),
    result JSONB,
    error TEXT,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_commands_device ON commands(device_id);
CREATE INDEX IF NOT EXISTS idx_commands_issued ON commands(issued_at DESC);

-- ============================================
-- SYSTEM SETTINGS
-- ============================================

CREATE TABLE IF NOT EXISTS system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_devices_updated_at
    BEFORE UPDATE ON devices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_sld_diagrams_updated_at
    BEFORE UPDATE ON sld_diagrams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA: Sample Distribution Grid
-- ============================================

-- Substations
INSERT INTO devices (id, name, type, voltage_level, rating, status, location_lat, location_lng, metadata)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'North Substation', 'substation', '138kV', '100 MVA', 'active', 40.7128, -74.0060, '{" feeders": 2, "voltage_primary": 138000, "voltage_secondary": 13800}'),
    ('22222222-2222-2222-2222-222222222222', 'South Substation', 'substation', '138kV', '75 MVA', 'active', 40.7028, -74.0160, '{" feeders": 2, "voltage_primary": 138000, "voltage_secondary": 13800}')
ON CONFLICT (id) DO NOTHING;

-- Feeders
INSERT INTO devices (id, name, type, parent_id, voltage_level, rating, status, location_lat, location_lng, metadata)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'North Feeder 1', 'feeder', '11111111-1111-1111-1111-111111111111', '13.8kV', '12 MVA', 'active', 40.7150, -74.0080, '{" impedance": [0.2, 0.4], "length_km": 5.5}'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'North Feeder 2', 'feeder', '11111111-1111-1111-1111-111111111111', '13.8kV', '10 MVA', 'active', 40.7180, -74.0040, '{" impedance": [0.25, 0.45], "length_km": 4.2}'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'South Feeder 1', 'feeder', '22222222-2222-2222-2222-222222222222', '13.8kV', '8 MVA', 'active', 40.7000, -74.0180, '{" impedance": [0.22, 0.42], "length_km": 3.8}')
ON CONFLICT (id) DO NOTHING;

-- Breakers
INSERT INTO devices (id, name, type, parent_id, voltage_level, status, metadata)
VALUES 
    ('dddd0001-dddd-dddd-dddd-dddddddddd01', 'Feeder 1 Main Breaker', 'breaker', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '13.8kV', 'active', '{" rated_current": 1000, "trip_time_ms": 50}'),
    ('dddd0002-dddd-dddd-dddd-dddddddddd02', 'Feeder 2 Main Breaker', 'breaker', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '13.8kV', 'active', '{" rated_current": 800, "trip_time_ms": 50}'),
    ('dddd0003-dddd-dddd-dddd-dddddddddd03', 'South Feeder Breaker', 'breaker', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '13.8kV', 'active', '{" rated_current": 600, "trip_time_ms": 50}')
ON CONFLICT (id) DO NOTHING;

-- Transformers
INSERT INTO devices (id, name, type, parent_id, voltage_level, rating, status, metadata)
VALUES 
    ('dddd0004-dddd-dddd-dddd-dddddddddd04', 'Transformer T1', 'transformer', '11111111-1111-1111-1111-111111111111', '13.8/4.16kV', '10 MVA', 'active', '{" tap_position": 0, "oil_temp": 45}'),
    ('dddd0005-dddd-dddd-dddd-dddddddddd05', 'Transformer T2', 'transformer', '22222222-2222-2222-2222-222222222222', '13.8/4.16kV', '7.5 MVA', 'active', '{" tap_position": -1, "oil_temp": 42}')
ON CONFLICT (id) DO NOTHING;

-- Capacitor Banks
INSERT INTO devices (id, name, type, parent_id, voltage_level, rating, status, metadata)
VALUES 
    ('dddd0006-dddd-dddd-dddd-dddddddddd06', 'Capacitor Bank C1', 'capacitor', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '13.8kV', '2 MVAR', 'active', '{" steps": 4, "current_step": 2}'),
    ('dddd0007-dddd-dddd-dddd-dddddddddd07', 'Capacitor Bank C2', 'capacitor', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '13.8kV', '1.5 MVAR', 'active', '{" steps": 3, "current_step": 1}')
ON CONFLICT (id) DO NOTHING;

-- Reclosers
INSERT INTO devices (id, name, type, parent_id, voltage_level, status, metadata)
VALUES 
    ('dddd0008-dddd-dddd-dddd-dddddddddd08', 'Recloser R1', 'recloser', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '13.8kV', 'active', '{" fault_count": 0, "trip_count": 2}'),
    ('dddd0009-dddd-dddd-dddd-dddddddddd09', 'Recloser R2', 'recloser', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '13.8kV', 'active', '{" fault_count": 1, "trip_count": 1}')
ON CONFLICT (id) DO NOTHING;

-- DER (Solar)
INSERT INTO devices (id, name, type, parent_id, voltage_level, rating, status, metadata)
VALUES 
    ('dddd000a-dddd-dddd-dddd-dddddddddd0a', 'Solar Farm A', 'der', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '13.8kV', '5 MW', 'active', '{" type": "solar", "capacity": 5}'),
    ('dddd000b-dddd-dddd-dddd-dddddddddd0b', 'Solar Farm B', 'der', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '13.8kV', '3 MW', 'active', '{" type": "solar", "capacity": 3}')
ON CONFLICT (id) DO NOTHING;

-- Loads
INSERT INTO devices (id, name, type, parent_id, voltage_level, rating, status, metadata)
VALUES 
    ('dddd000c-dddd-dddd-dddd-dddddddddd0c', 'Industrial Load 1', 'load', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '4.16kV', '2 MW', 'active', '{" load_factor": 0.8}'),
    ('dddd000d-dddd-dddd-dddd-dddddddddd0d', 'Commercial Load 1', 'load', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '4.16kV', '1 MW', 'active', '{" load_factor": 0.7}'),
    ('dddd000e-dddd-dddd-dddd-dddddddddd0e', 'Residential Area A', 'load', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '4.16kV', '1.5 MW', 'active', '{" customers": 500}')
ON CONFLICT (id) DO NOTHING;

-- Device Tags
INSERT INTO device_tags (device_id, tag_name, tag_type, description, unit, min_value, max_value)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'active_power', 'analog', 'Substation active power output', 'MW', 0, 100),
    ('11111111-1111-1111-1111-111111111111', 'reactive_power', 'analog', 'Substation reactive power output', 'MVAR', -30, 30),
    ('11111111-1111-1111-1111-111111111111', 'voltage_primary', 'analog', 'Primary side voltage', 'V', 130000, 145000),
    ('11111111-1111-1111-1111-111111111111', 'voltage_secondary', 'analog', 'Secondary side voltage', 'V', 13000, 14500),
    ('11111111-1111-1111-1111-111111111111', 'frequency', 'analog', 'System frequency', 'Hz', 59.5, 60.5),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'current', 'analog', 'Feeder head current', 'A', 0, 1500),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'voltage', 'analog', 'Feeder voltage', 'V', 13000, 14500),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'active_power', 'analog', 'Feeder active power', 'MW', 0, 15),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'reactive_power', 'analog', 'Feeder reactive power', 'MVAR', -5, 5),
    ('dddd0001-dddd-dddd-dddd-dddddddddd01', 'position', 'digital', 'Breaker position (1=closed, 0=open)', '', 0, 1),
    ('dddd0001-dddd-dddd-dddd-dddddddddd01', 'current', 'analog', 'Breaker current', 'A', 0, 1200),
    ('dddd0001-dddd-dddd-dddd-dddddddddd01', 'trip_coil_status', 'digital', 'Trip coil healthy', '', 0, 1),
    ('dddd0004-dddd-dddd-dddd-dddddddddd04', 'oil_temp', 'analog', 'Oil temperature', 'C', 0, 120),
    ('dddd0004-dddd-dddd-dddd-dddddddddd04', 'winding_temp', 'analog', 'Winding temperature', 'C', 0, 150),
    ('dddd0004-dddd-dddd-dddd-dddddddddd04', 'tap_position', 'analog', 'Tap changer position', '', -16, 16),
    ('dddd0006-dddd-dddd-dddd-dddddddddd06', 'reactive_power', 'analog', 'Capacitor bank reactive power', 'MVAR', 0, 2),
    ('dddd0006-dddd-dddd-dddd-dddddddddd06', 'current_step', 'analog', 'Current step', '', 0, 4),
    ('dddd0008-dddd-dddd-dddd-dddddddddd08', 'position', 'digital', 'Recloser position', '', 0, 1),
    ('dddd0008-dddd-dddd-dddd-dddddddddd08', 'trip_count', 'counter', 'Trip count', '', 0, 100),
    ('dddd0008-dddd-dddd-dddd-dddddddddd08', 'lockout', 'digital', 'Lockout status', '', 0, 1),
    ('dddd000a-dddd-dddd-dddd-dddddddddd0a', 'active_power', 'analog', 'DER active power output', 'MW', 0, 5),
    ('dddd000a-dddd-dddd-dddd-dddddddddd0a', 'irradiance', 'analog', 'Solar irradiance', 'W/m2', 0, 1200),
    ('dddd000a-dddd-dddd-dddd-dddddddddd0a', 'status', 'digital', 'DER operating status', '', 0, 1),
    ('dddd000c-dddd-dddd-dddd-dddddddddd0c', 'active_power', 'analog', 'Load active power', 'MW', 0, 5),
    ('dddd000c-dddd-dddd-dddd-dddddddddd0c', 'power_factor', 'analog', 'Load power factor', '', 0, 1)
ON CONFLICT (device_id, tag_name) DO NOTHING;
