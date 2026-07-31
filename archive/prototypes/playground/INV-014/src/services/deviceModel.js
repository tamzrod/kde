/**
 * Device Model
 * 
 * Pattern 6: Hierarchical Device Model
 * 
 * Reflects physical grid topology:
 * Power Plants → Substations → Feeders → Devices
 * 
 * Based on external research:
 * - Balanacan PP: ~4.5 MW (3 × 1.5 MW units)
 * - Bantad PP: ~2.0 MW (2 × 1.0 MW units)
 * - 13.8 kV primary distribution
 * - 4 main feeders
 * 
 * @evidence KDE-ARCH-009 Pattern 6
 * @external marinduque-electrical-system.md
 */

const { v4: uuidv4 } = require('uuid');

class DeviceModel {
    constructor() {
        this.devices = new Map();
        this.hierarchy = {
            type: 'grid',
            name: 'Marinduque Grid',
            id: 'marinduque',
            children: []
        };
        
        this.initialize();
    }
    
    /**
     * Initialize the device hierarchy
     * Based on external research findings
     */
    initialize() {
        // ==================== GENERATION ====================
        
        // Balanacan Power Plant (~4.5 MW total)
        // Source: External research - Public utility documentation
        const balanacanPP = this.addDevice({
            id: 'PP-BALANACAN',
            name: 'Balanacan Diesel Power Plant',
            type: 'power_plant',
            voltage_level: 6.6,
            capacity: 4500,  // kW
            location: { latitude: 13.473, longitude: 121.876 },
            tags: ['generation', 'diesel', 'primary'],
            specifications: {
                fuel_type: 'diesel',
                efficiency: 0.38,
                age_years: 10
            }
        });
        
        // Balanacan Generators
        const balanacanGens = [];
        for (let i = 1; i <= 3; i++) {
            balanacanGens.push(this.addDevice({
                id: `GEN-BAL-${i}`,
                name: `Generator ${i}`,
                type: 'generator',
                voltage_level: 6.6,
                capacity: 1500,  // kW
                parent_id: balanacanPP.id,
                tags: ['generator', 'diesel'],
                specifications: {
                    rated_power: 1500,
                    voltage: 6600,
                    frequency: 60,
                    power_factor: 0.8
                }
            }));
        }
        
        // Bantad Power Plant (~2.0 MW total)
        const bantadPP = this.addDevice({
            id: 'PP-BANTAD',
            name: 'Bantad Diesel Power Plant',
            type: 'power_plant',
            voltage_level: 4.16,
            capacity: 2000,  // kW
            location: { latitude: 13.43, longitude: 121.96 },
            tags: ['generation', 'diesel', 'secondary'],
            specifications: {
                fuel_type: 'diesel',
                efficiency: 0.35,
                age_years: 8
            }
        });
        
        // Bantad Generators
        const bantadGens = [];
        for (let i = 1; i <= 2; i++) {
            bantadGens.push(this.addDevice({
                id: `GEN-BANT-${i}`,
                name: `Generator ${i}`,
                type: 'generator',
                voltage_level: 4.16,
                capacity: 1000,  // kW
                parent_id: bantadPP.id,
                tags: ['generator', 'diesel'],
                specifications: {
                    rated_power: 1000,
                    voltage: 4160,
                    frequency: 60,
                    power_factor: 0.8
                }
            }));
        }
        
        // Solar PV (simplified)
        // Source: External research - Renewable energy addition
        const solarPV = this.addDevice({
            id: 'PV-MARELCO',
            name: 'MARELCO Solar PV',
            type: 'solar',
            voltage_level: 13.8,
            capacity: 500,  // kW
            location: { latitude: 13.434, longitude: 121.95 },
            tags: ['generation', 'solar', 'renewable'],
            specifications: {
                panel_count: 2000,
                panel_capacity: 250,  // W
                inverter_capacity: 500  // kW
            }
        });
        
        // Add generation to hierarchy
        this.hierarchy.children.push({
            type: 'generation',
            name: 'Generation',
            id: 'generation',
            children: [
                { type: 'power_plant', ...balanacanPP },
                { type: 'power_plant', ...bantadPP },
                { type: 'solar', ...solarPV }
            ]
        });
        
        // ==================== TRANSMISSION/SUBSTATION ====================
        
        const balanacanSub = this.addDevice({
            id: 'SUB-BALANACAN',
            name: 'Balanacan Substation',
            type: 'substation',
            voltage_level: 13.8,
            capacity: 10000,  // kVA
            location: { latitude: 13.475, longitude: 121.88 },
            tags: ['substation', 'transmission', 'primary'],
            specifications: {
                bus_config: 'double_bus',
                protection: 'microprocessor'
            }
        });
        
        // 13.8 kV Busbar
        const busbar = this.addDevice({
            id: 'BUS-138-BAL',
            name: '13.8 kV Busbar A',
            type: 'busbar',
            voltage_level: 13.8,
            parent_id: balanacanSub.id,
            tags: ['busbar', 'connection']
        });
        
        this.hierarchy.children.push({
            type: 'substation',
            name: 'Balanacan Substation',
            id: balanacanSub.id,
            children: [{ type: 'busbar', ...busbar }]
        });
        
        // ==================== DISTRIBUTION FEEDERS ====================
        
        const feederConfigs = [
            { id: 'FEEDER-1', name: 'Feeder 1 - Sta Cruz', municipality: 'Santa Cruz', capacity: 2500 },
            { id: 'FEEDER-2', name: 'Feeder 2 - Boac', municipality: 'Boac', capacity: 2500 },
            { id: 'FEEDER-3', name: 'Feeder 3 - Santa Cruz Proper', municipality: 'Santa Cruz', capacity: 1500 },
            { id: 'FEEDER-4', name: 'Feeder 4 - Mogpog', municipality: 'Mogpog', capacity: 1500 }
        ];
        
        // Source: External research - 4 feeder configuration from public maps
        const feeders = [];
        feederConfigs.forEach(config => {
            const feeder = this.addDevice({
                id: config.id,
                name: config.name,
                type: 'feeder',
                voltage_level: 13.8,
                capacity: config.capacity,
                parent_id: balanacanSub.id,
                tags: ['feeder', 'distribution'],
                location: this.getFeederLocation(config.id),
                specifications: {
                    municipality: config.municipality,
                    conductor_size: '336 MCM',
                    length_km: 15 + Math.random() * 10
                }
            });
            
            feeders.push(feeder);
            
            // Add switches and transformers to each feeder
            this.addFeederDevices(feeder, config);
        });
        
        // Add feeders to hierarchy under substations
        const subIndex = this.hierarchy.children.findIndex(c => c.id === balanacanSub.id);
        if (subIndex >= 0) {
            this.hierarchy.children[subIndex].children.push(...feeders);
        }
        
        console.log(`[MODEL] Device model initialized: ${this.devices.size} devices`);
    }
    
    /**
     * Add a device to the model
     */
    addDevice(deviceData) {
        const device = {
            id: deviceData.id,
            name: deviceData.name,
            type: deviceData.type,
            voltage_level: deviceData.voltage_level,
            capacity: deviceData.capacity,
            parent_id: deviceData.parent_id || null,
            location: deviceData.location || null,
            tags: deviceData.tags || [],
            specifications: deviceData.specifications || {},
            status: 'normal',
            children: []
        };
        
        this.devices.set(device.id, device);
        
        // Add to parent's children list
        if (device.parent_id) {
            const parent = this.devices.get(device.parent_id);
            if (parent) {
                parent.children.push(device.id);
            }
        }
        
        return device;
    }
    
    /**
     * Add feeder devices (switches, transformers)
     */
    addFeederDevices(feeder, config) {
        // Add section switches
        const switchCount = 2 + Math.floor(Math.random() * 2);
        for (let i = 1; i <= switchCount; i++) {
            this.addDevice({
                id: `${feeder.id}-SW${i}`,
                name: `Switch ${i}`,
                type: 'switch',
                voltage_level: 13.8,
                capacity: 600,
                parent_id: feeder.id,
                tags: ['switch', 'protection'],
                specifications: {
                    type: 'sectionalizing',
                    operation: 'manual'
                }
            });
        }
        
        // Add distribution transformers
        const transformerCount = 2 + Math.floor(Math.random() * 3);
        const sizes = [50, 100, 167, 250];
        for (let i = 1; i <= transformerCount; i++) {
            const kva = sizes[Math.floor(Math.random() * sizes.length)];
            this.addDevice({
                id: `${feeder.id}-TR${i}`,
                name: `Transformer ${i}`,
                type: 'transformer',
                voltage_level: 13.8,
                secondary_voltage: 0.24,
                capacity: kva,
                parent_id: feeder.id,
                tags: ['transformer', 'distribution'],
                specifications: {
                    kva: kva,
                    impedance: 5.75,
                    vector_group: 'Dyn11'
                }
            });
        }
        
        // Add recloser (for longer feeders)
        if (config.id === 'FEEDER-1' || config.id === 'FEEDER-4') {
            this.addDevice({
                id: `${feeder.id}-RC1`,
                name: 'Recloser 1',
                type: 'recloser',
                voltage_level: 13.8,
                capacity: 600,
                parent_id: feeder.id,
                tags: ['recloser', 'protection', 'automatic'],
                specifications: {
                    trips: 3,
                    reclose_sequence: [1, 5, 10],  // seconds
                    protection: 'overcurrent'
                }
            });
        }
    }
    
    /**
     * Get estimated feeder location
     * Source: External research - approximate geographic spread
     */
    getFeederLocation(feederId) {
        const locations = {
            'FEEDER-1': { latitude: 13.45, longitude: 121.90 },  // Sta Cruz
            'FEEDER-2': { latitude: 13.447, longitude: 121.84 },  // Boac
            'FEEDER-3': { latitude: 13.43, longitude: 121.92 },   // Santa Cruz proper
            'FEEDER-4': { latitude: 13.48, longitude: 121.85 }    // Mogpog
        };
        return locations[feederId] || { latitude: 13.45, longitude: 121.88 };
    }
    
    /**
     * Get all devices
     */
    getAllDevices() {
        return Array.from(this.devices.values());
    }
    
    /**
     * Get device by ID
     */
    getDevice(deviceId) {
        return this.devices.get(deviceId);
    }
    
    /**
     * Get devices by type
     */
    getDevicesByType(type) {
        return Array.from(this.devices.values()).filter(d => d.type === type);
    }
    
    /**
     * Get devices by parent
     */
    getChildren(parentId) {
        const parent = this.devices.get(parentId);
        if (!parent) return [];
        return parent.children.map(id => this.devices.get(id)).filter(Boolean);
    }
    
    /**
     * Get full hierarchy
     */
    getHierarchy() {
        return this.hierarchy;
    }
    
    /**
     * Get path from device to root
     */
    getPath(deviceId) {
        const path = [];
        let current = this.devices.get(deviceId);
        
        while (current) {
            path.unshift(current);
            current = current.parent_id ? this.devices.get(current.parent_id) : null;
        }
        
        return path;
    }
    
    /**
     * Get ancestor of specific type
     */
    getAncestorOfType(deviceId, type) {
        const path = this.getPath(deviceId);
        return path.find(d => d.type === type);
    }
}

module.exports = DeviceModel;
