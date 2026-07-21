/**
 * Mock Data Generator
 * 
 * Pattern 5: Electrical Consistency in Mock Data
 * 
 * Generates realistic SCADA data following:
 * - Power balance equations (Kirchhoff's laws)
 * - Load profile curves (daily patterns)
 * - Voltage drop calculations
 * - Equipment operating ranges
 * 
 * Pattern 12: Tiered Data Retention
 * 
 * @evidence KDE-ARCH-009 Patterns 5, 12
 */

class MockDataGenerator {
    constructor(deviceModel) {
        this.deviceModel = deviceModel;
        this.telemetryService = null;
        
        // Device states (breakers, switches)
        this.deviceStates = new Map();
        
        // Load profile multipliers (hourly)
        // Based on typical Philippine distribution load patterns
        this.loadProfile = {
            // Hour: { factor, description }
            0: { factor: 0.45, desc: 'Late night minimum' },
            1: { factor: 0.42, desc: 'Minimum demand' },
            2: { factor: 0.40, desc: 'Minimum demand' },
            3: { factor: 0.42, desc: 'Pre-dawn minimum' },
            4: { factor: 0.48, desc: 'Early morning ramp' },
            5: { factor: 0.55, desc: 'Morning ramp' },
            6: { factor: 0.65, desc: 'Business start' },
            7: { factor: 0.75, desc: 'Morning peak build' },
            8: { factor: 0.82, desc: 'Morning peak' },
            9: { factor: 0.85, desc: 'Business hours' },
            10: { factor: 0.88, desc: 'Mid-morning' },
            11: { factor: 0.90, desc: 'Late morning' },
            12: { factor: 0.85, desc: 'Midday dip' },
            13: { factor: 0.88, desc: 'Afternoon build' },
            14: { factor: 0.92, desc: 'Peak build' },
            15: { factor: 0.95, desc: 'Afternoon peak' },
            16: { factor: 0.88, desc: 'Late afternoon' },
            17: { factor: 0.82, desc: 'Early evening' },
            18: { factor: 0.88, desc: 'Evening ramp' },
            19: { factor: 0.95, desc: 'Evening peak' },
            20: { factor: 0.88, desc: 'Evening sustain' },
            21: { factor: 0.78, desc: 'Late evening' },
            22: { factor: 0.65, desc: 'Night ramp' },
            23: { factor: 0.55, desc: 'Night minimum' }
        };
        
        // Alarm conditions to check
        this.alarmConditions = [];
        this.initializeAlarmConditions();
    }
    
    /**
     * Set telemetry service reference
     */
    setTelemetryService(service) {
        this.telemetryService = service;
    }
    
    /**
     * Initialize device states
     */
    initialize() {
        // Initialize all breakers to closed
        this.deviceModel.getDevicesByType('generator').forEach(gen => {
            this.deviceStates.set(gen.id, {
                breaker_status: 'closed',
                online: true
            });
        });
        
        // Initialize all feeders
        this.deviceModel.getDevicesByType('feeder').forEach(feeder => {
            this.deviceStates.set(feeder.id, {
                breaker_status: 'closed',
                online: true
            });
        });
        
        // Initialize switches
        this.deviceModel.getDevicesByType('switch').forEach(sw => {
            this.deviceStates.set(sw.id, {
                status: Math.random() > 0.1 ? 'closed' : 'open'  // 90% closed
            });
        });
        
        console.log('[MOCK] Device states initialized');
    }
    
    /**
     * Generate telemetry batch
     * Pattern 5: Electrical Consistency
     */
    generateTelemetryBatch() {
        const updates = [];
        const hour = new Date().getHours();
        const profile = this.loadProfile[hour];
        const loadFactor = profile.factor;
        
        // Generate power plant data
        const generators = this.deviceModel.getDevicesByType('generator');
        let totalGeneration = 0;
        
        generators.forEach(gen => {
            const state = this.deviceStates.get(gen.id) || { online: true };
            if (!state.online) {
                updates.push({
                    device_id: gen.id,
                    tag_id: 'active_power',
                    value: 0,
                    timestamp: Date.now(),
                    quality: 'good'
                });
                return;
            }
            
            // Calculate output based on load factor
            // Generators typically run at 70-90% capacity
            const baseOutput = gen.capacity * 0.8;
            const output = baseOutput * loadFactor + (Math.random() - 0.5) * gen.capacity * 0.1;
            const finalOutput = Math.max(0, Math.min(gen.capacity, output));
            
            totalGeneration += finalOutput;
            
            // Active power
            updates.push({
                device_id: gen.id,
                tag_id: 'active_power',
                value: Math.round(finalOutput * 100) / 100,
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Reactive power (assume 0.3 power factor lag)
            const reactivePower = finalOutput * Math.tan(Math.acos(0.8));
            updates.push({
                device_id: gen.id,
                tag_id: 'reactive_power',
                value: Math.round(reactivePower * 100) / 100,
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Voltage (6.6 kV nominal ± 5%)
            const voltage = 6600 * (1 + (Math.random() - 0.5) * 0.02);
            updates.push({
                device_id: gen.id,
                tag_id: 'voltage',
                value: Math.round(voltage),
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Current
            const current = (finalOutput * 1000) / (voltage * Math.sqrt(3));
            updates.push({
                device_id: gen.id,
                tag_id: 'current',
                value: Math.round(current * 10) / 10,
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Frequency (60 Hz nominal)
            const frequency = 60 + (Math.random() - 0.5) * 0.2;
            updates.push({
                device_id: gen.id,
                tag_id: 'frequency',
                value: Math.round(frequency * 100) / 100,
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Temperature (normal range 60-85°C)
            const temp = 70 + (Math.random() - 0.5) * 15;
            updates.push({
                device_id: gen.id,
                tag_id: 'temperature',
                value: Math.round(temp * 10) / 10,
                timestamp: Date.now(),
                quality: 'good'
            });
        });
        
        // Generate solar PV data
        const solar = this.deviceModel.getDevicesByType('solar')[0];
        if (solar) {
            // Solar output varies with time
            const solarHour = hour;
            let solarFactor = 0;
            if (solarHour >= 6 && solarHour <= 18) {
                solarFactor = Math.sin((solarHour - 6) / 12 * Math.PI) * 0.9;
            }
            
            const solarOutput = solar.capacity * solarFactor + (Math.random() - 0.5) * solar.capacity * 0.05;
            
            updates.push({
                device_id: solar.id,
                tag_id: 'active_power',
                value: Math.max(0, Math.round(solarOutput * 100) / 100),
                timestamp: Date.now(),
                quality: 'good'
            });
            
            totalGeneration += solarOutput;
        }
        
        // Generate feeder data
        const feeders = this.deviceModel.getDevicesByType('feeder');
        const feederShare = totalGeneration / feeders.length;
        
        feeders.forEach(feeder => {
            // Distribute load based on feeder capacity
            const feederLoad = feederShare * (0.7 + Math.random() * 0.3);
            const utilization = feederLoad / feeder.capacity;
            
            // Power flow
            updates.push({
                device_id: feeder.id,
                tag_id: 'power_flow',
                value: Math.round(feederLoad * 100) / 100,
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Current
            const voltage = 13800;  // 13.8 kV
            const current = (feederLoad * 1000) / (voltage * Math.sqrt(3));
            updates.push({
                device_id: feeder.id,
                tag_id: 'current',
                value: Math.round(current * 10) / 10,
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Utilization percentage
            updates.push({
                device_id: feeder.id,
                tag_id: 'utilization',
                value: Math.round(utilization * 1000) / 10,
                timestamp: Date.now(),
                quality: 'good'
            });
            
            // Check for high utilization alarm
            if (utilization > 0.9) {
                this.checkAlarm(feeder.id, 'high_utilization', utilization, 'utilization > 0.9', 'warning');
            }
        });
        
        // Generate system totals
        updates.push({
            device_id: 'SYSTEM',
            tag_id: 'total_generation',
            value: Math.round(totalGeneration * 100) / 100,
            timestamp: Date.now(),
            quality: 'good'
        });
        
        updates.push({
            device_id: 'SYSTEM',
            tag_id: 'total_load',
            value: Math.round(totalGeneration * 0.95 * 100) / 100,  // 95% of generation (losses)
            timestamp: Date.now(),
            quality: 'good'
        });
        
        // Store in telemetry service
        if (this.telemetryService) {
            updates.forEach(u => this.telemetryService.storePoint(u));
        }
        
        return updates;
    }
    
    /**
     * Initialize alarm conditions
     */
    initializeAlarmConditions() {
        // High temperature on generators
        this.deviceModel.getDevicesByType('generator').forEach(gen => {
            this.alarmConditions.push({
                device_id: gen.id,
                tag_id: 'temperature',
                condition: 'temperature > 85',
                severity: 'warning',
                priority: 70,
                message: `${gen.name} high temperature`
            });
        });
        
        // High utilization on feeders
        this.deviceModel.getDevicesByType('feeder').forEach(feeder => {
            this.alarmConditions.push({
                device_id: feeder.id,
                tag_id: 'utilization',
                condition: 'utilization > 90',
                severity: 'warning',
                priority: 60,
                message: `${feeder.name} high line utilization`
            });
        });
    }
    
    /**
     * Check alarm conditions
     */
    checkAlarm(deviceId, type, value, condition, severity) {
        // This would integrate with alarm service in production
        // For now, just log
        if (Math.random() < 0.01) {  // 1% chance per check
            console.log(`[ALARM] Potential alarm: ${deviceId} ${type} = ${value}`);
        }
    }
    
    /**
     * Generate random alarm (for simulation)
     */
    generateRandomAlarm() {
        if (Math.random() > 0.02) return null;  // 2% chance
        
        const conditions = [
            {
                device_id: 'FEEDER-1-SW1',
                message: 'High temperature warning',
                condition: 'temperature > 32',
                severity: 'warning',
                priority: 65,
                current_value: 35.2,
                threshold: 32
            },
            {
                device_id: 'GEN-BAL-2',
                message: 'Generator coolant level low',
                condition: 'coolant_level < 50',
                severity: 'warning',
                priority: 70,
                current_value: 45,
                threshold: 50
            },
            {
                device_id: 'FEEDER-3-RC1',
                message: 'Reclose event',
                condition: 'reclose_count > 0',
                severity: 'info',
                priority: 40,
                current_value: 1,
                threshold: 0
            }
        ];
        
        return conditions[Math.floor(Math.random() * conditions.length)];
    }
    
    /**
     * Calculate voltage drop along feeder
     * Pattern 5: Electrical consistency
     */
    calculateVoltageDrop(current, impedance, length) {
        // ΔV = I × Z × L
        const voltageDrop = current * impedance * length;
        return voltageDrop;
    }
    
    /**
     * Get power balance
     * Pattern 5: Power balance equations
     */
    getPowerBalance() {
        let generation = 0;
        let load = 0;
        
        this.deviceModel.getDevicesByType('generator').forEach(gen => {
            const state = this.deviceStates.get(gen.id);
            if (state && state.online) {
                generation += gen.capacity * 0.8;  // Simplified
            }
        });
        
        this.deviceModel.getDevicesByType('feeder').forEach(feeder => {
            load += feeder.capacity * 0.4;  // Simplified
        });
        
        return {
            generation,
            load,
            losses: generation * 0.05,
            reserve: generation - load
        };
    }
}

module.exports = MockDataGenerator;
