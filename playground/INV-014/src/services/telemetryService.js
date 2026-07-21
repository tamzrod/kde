/**
 * Telemetry Service
 * 
 * Pattern 1: Polyglot Persistence
 * Pattern 11: Real-time Delta Compression
 * Pattern 12: Tiered Data Retention
 * 
 * @evidence KDE-ARCH-009 Patterns 1, 11, 12
 */

class TelemetryService {
    constructor() {
        // Current values (latest)
        this.currentValues = new Map();
        
        // Historical data (time-series)
        // In production, this would be InfluxDB
        this.history = new Map();
        
        // Last sent values for delta compression (Pattern 11)
        this.lastSent = new Map();
        
        // Retention policies (Pattern 12)
        this.retentionPolicies = {
            '1s': { interval: 60000, maxAge: 7 * 24 * 60 * 60 * 1000 },      // 7 days
            '1m': { interval: 3600000, maxAge: 30 * 24 * 60 * 60 * 1000 },   // 30 days
            '1h': { interval: 86400000, maxAge: 365 * 24 * 60 * 60 * 1000 }  // 1 year
        };
    }
    
    /**
     * Store a telemetry point
     */
    storePoint(point) {
        const key = `${point.device_id}:${point.tag_id}`;
        
        // Store current value
        this.currentValues.set(key, point);
        
        // Store in history with tiered aggregation
        this.storeInHistory(key, point);
    }
    
    /**
     * Store point in historical data with tiered retention
     * Pattern 12: Tiered Data Retention
     */
    storeInHistory(key, point) {
        if (!this.history.has(key)) {
            this.history.set(key, []);
        }
        
        const history = this.history.get(key);
        history.push(point);
        
        // Prune old data based on retention policy
        const now = Date.now();
        const filtered = history.filter(p => 
            now - p.timestamp < this.retentionPolicies['1s'].maxAge
        );
        
        this.history.set(key, filtered);
    }
    
    /**
     * Get current values for all devices
     */
    getCurrentValues() {
        const result = {};
        this.currentValues.forEach((value, key) => {
            const [deviceId, tagId] = key.split(':');
            if (!result[deviceId]) {
                result[deviceId] = {};
            }
            result[deviceId][tagId] = value.value;
        });
        return result;
    }
    
    /**
     * Get value for specific device
     */
    getDeviceValue(deviceId) {
        const result = {};
        this.currentValues.forEach((value, key) => {
            const [dId, tagId] = key.split(':');
            if (dId === deviceId) {
                result[tagId] = value.value;
            }
        });
        return result;
    }
    
    /**
     * Get historical data for a device
     * Pattern 12: Tiered Data Retention
     */
    getHistory(deviceId, options = {}) {
        const { from, to, resolution = '1m' } = options;
        
        const results = [];
        this.history.forEach((history, key) => {
            const [dId] = key.split(':');
            if (dId === deviceId) {
                let filtered = history;
                
                if (from) {
                    filtered = filtered.filter(p => p.timestamp >= parseInt(from));
                }
                if (to) {
                    filtered = filtered.filter(p => p.timestamp <= parseInt(to));
                }
                
                // Apply resolution aggregation
                if (resolution !== '1s') {
                    filtered = this.aggregateByResolution(filtered, resolution);
                }
                
                results.push(...filtered);
            }
        });
        
        return results.sort((a, b) => a.timestamp - b.timestamp);
    }
    
    /**
     * Aggregate data by resolution
     */
    aggregateByResolution(data, resolution) {
        if (data.length === 0) return [];
        
        const intervalMs = this.retentionPolicies[resolution]?.interval || 60000;
        const buckets = new Map();
        
        data.forEach(point => {
            const bucketTime = Math.floor(point.timestamp / intervalMs) * intervalMs;
            if (!buckets.has(bucketTime)) {
                buckets.set(bucketTime, { sum: 0, count: 0, max: -Infinity, min: Infinity });
            }
            const bucket = buckets.get(bucketTime);
            bucket.sum += point.value;
            bucket.count++;
            bucket.max = Math.max(bucket.max, point.value);
            bucket.min = Math.min(bucket.min, point.value);
        });
        
        const result = [];
        buckets.forEach((bucket, timestamp) => {
            result.push({
                timestamp,
                value: bucket.sum / bucket.count,
                min: bucket.min,
                max: bucket.max,
                count: bucket.count
            });
        });
        
        return result;
    }
    
    /**
     * Check if value has changed (for delta compression)
     * Pattern 11: Real-time Delta Compression
     */
    hasChanged(deviceId, tagId, newValue) {
        const key = `${deviceId}:${tagId}`;
        const lastSent = this.lastSent.get(key);
        
        if (!lastSent) return true;
        if (lastSent.value !== newValue) return true;
        
        return false;
    }
    
    /**
     * Record sent value
     */
    recordSent(deviceId, tagId, value) {
        const key = `${deviceId}:${tagId}`;
        this.lastSent.set(key, { value, timestamp: Date.now() });
    }
}

module.exports = TelemetryService;
