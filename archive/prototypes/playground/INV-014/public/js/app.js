/**
 * Marinduque SCADA Dashboard Application
 * 
 * Based on KDE Repository Knowledge:
 * - KDE-ARCH-009 Pattern 3: WebSocket Subscription Model
 * - KDE-ARCH-009 Pattern 10: SVG Virtualization for SLD
 * - domain/utility-sld/principles.md: High-Performance HMI Design
 * - domain/gis/fundamentals.md: GIS Implementation
 * 
 * @evidence KDE-ARCH-009, utility-sld/principles.md, gis/fundamentals.md
 */

class SCADAApp {
    constructor() {
        // API Configuration
        this.apiBase = 'http://localhost:4000/api';
        this.wsBase = 'http://localhost:4000';
        
        // State
        this.telemetry = {};
        this.alarms = [];
        this.devices = [];
        this.isConnected = false;
        this.lastUpdate = null;
        
        // Theme
        this.theme = 'light';
        
        // GIS Map instance
        this.map = null;
        this.mapLayers = {
            substations: null,
            powerlines: null,
            municipalities: null
        };
        
        // SLD Zoom level
        this.sldZoom = 1;
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize application
     */
    init() {
        console.log('[SCADA] Initializing Marinduque SCADA Dashboard');
        
        // Load theme preference
        this.loadTheme();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize views
        this.initNavigation();
        this.initDateTime();
        
        // Connect to backend
        this.connect();
        
        // Initial data load
        this.loadInitialData();
    }
    
    /**
     * Load theme preference
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('scada-theme') || 'dark';
        this.setTheme(savedTheme);
    }
    
    /**
     * Set theme
     */
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('scada-theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    /**
     * Toggle theme
     */
    toggleTheme() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
        
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });
        
        // SLD Zoom controls
        document.getElementById('zoom-in')?.addEventListener('click', () => this.zoomSLD(1.2));
        document.getElementById('zoom-out')?.addEventListener('click', () => this.zoomSLD(0.8));
        document.getElementById('zoom-fit')?.addEventListener('click', () => this.zoomSLD('fit'));
        
        // GIS layer toggles
        document.querySelectorAll('.layer-item input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.toggleLayer(e.target.dataset.layer, e.target.checked));
        });
    }
    
    /**
     * Initialize navigation
     */
    initNavigation() {
        // Navigation is handled by event listeners
    }
    
    /**
     * Switch view
     */
    switchView(viewName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });
        
        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === `view-${viewName}`);
        });
        
        // Initialize specific views
        if (viewName === 'sld') {
            this.initSLD();
        } else if (viewName === 'gis') {
            this.initGIS();
        } else if (viewName === 'alarms') {
            this.loadAlarmsTable();
        }
    }
    
    /**
     * Update datetime display
     */
    initDateTime() {
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
    }
    
    updateDateTime() {
        const now = new Date();
        const dateEl = document.querySelector('.datetime .date');
        const timeEl = document.querySelector('.datetime .time');
        
        if (dateEl) {
            dateEl.textContent = now.toISOString().split('T')[0];
        }
        if (timeEl) {
            timeEl.textContent = now.toTimeString().split(' ')[0];
        }
    }
    
    /**
     * Connect to WebSocket
     * Pattern 3: WebSocket Subscription Model
     */
    connect() {
        try {
            this.ws = new WebSocket(`ws://${this.wsBase}`);
            
            this.ws.onopen = () => {
                console.log('[WS] Connected');
                this.isConnected = true;
                this.updateConnectionStatus(true);
                
                // Subscribe to channels
                this.ws.send(JSON.stringify({
                    type: 'subscribe',
                    channels: ['telemetry', 'alarms', 'commands', 'system']
                }));
            };
            
            this.ws.onmessage = (event) => {
                this.handleMessage(JSON.parse(event.data));
            };
            
            this.ws.onclose = () => {
                console.log('[WS] Disconnected');
                this.isConnected = false;
                this.updateConnectionStatus(false);
                
                // Reconnect after 5 seconds
                setTimeout(() => this.connect(), 5000);
            };
            
            this.ws.onerror = (error) => {
                console.error('[WS] Error:', error);
            };
        } catch (error) {
            console.error('[WS] Connection failed:', error);
            this.updateConnectionStatus(false);
        }
    }
    
    /**
     * Handle WebSocket message
     * Pattern 11: Real-time Delta Compression
     */
    handleMessage(message) {
        this.lastUpdate = new Date();
        this.updateLastUpdateDisplay();
        
        switch (message.type) {
            case 'telemetry':
                this.handleTelemetry(message);
                break;
            case 'alarm_update':
            case 'alarm_new':
                this.handleAlarm(message.payload);
                break;
            case 'command_update':
                this.handleCommand(message.payload);
                break;
        }
    }
    
    /**
     * Handle telemetry update
     */
    handleTelemetry(data) {
        // Store in local state
        if (!this.telemetry[data.device_id]) {
            this.telemetry[data.device_id] = {};
        }
        this.telemetry[data.device_id][data.tag_id] = data.value;
        
        // Update UI based on view
        const currentView = document.querySelector('.view.active')?.id;
        
        if (currentView === 'view-overview') {
            this.updateDashboard();
        } else if (currentView === 'view-sld') {
            this.updateSLDValues();
        }
    }
    
    /**
     * Handle alarm update
     */
    handleAlarm(alarm) {
        // Update local alarm list
        const existingIndex = this.alarms.findIndex(a => a.id === alarm.id);
        if (existingIndex >= 0) {
            this.alarms[existingIndex] = alarm;
        } else if (alarm.state === 'active') {
            this.alarms.unshift(alarm);
        }
        
        this.updateAlarmBadge();
        this.updateAlarmSummary();
    }
    
    /**
     * Handle command update
     */
    handleCommand(command) {
        console.log('[CMD] Command update:', command);
    }
    
    /**
     * Load initial data
     */
    async loadInitialData() {
        try {
            // Load devices
            const devicesRes = await fetch(`${this.apiBase}/devices`);
            this.devices = await devicesRes.json();
            
            // Load current telemetry
            const telemetryRes = await fetch(`${this.apiBase}/telemetry/current`);
            const telemetry = await telemetryRes.json();
            
            // Convert to flat structure
            Object.entries(telemetry).forEach(([deviceId, tags]) => {
                this.telemetry[deviceId] = tags;
            });
            
            // Load alarms
            const alarmsRes = await fetch(`${this.apiBase}/alarms?state=active`);
            this.alarms = await alarmsRes.json();
            
            // Update UI
            this.updateDashboard();
            this.updateAlarmBadge();
            this.updateAlarmSummary();
            
        } catch (error) {
            console.error('[API] Initial load failed:', error);
        }
    }
    
    /**
     * Update connection status
     */
    updateConnectionStatus(connected) {
        const statusEl = document.getElementById('connection-status');
        if (statusEl) {
            statusEl.classList.toggle('connected', connected);
            statusEl.classList.toggle('disconnected', !connected);
            statusEl.querySelector('.status-text').textContent = connected ? 'Connected' : 'Disconnected';
        }
    }
    
    /**
     * Update last update display
     */
    updateLastUpdateDisplay() {
        const el = document.getElementById('last-update');
        if (el && this.lastUpdate) {
            el.textContent = this.lastUpdate.toTimeString().split(' ')[0];
        }
    }
    
    /**
     * Update dashboard
     */
    updateDashboard() {
        this.updateGenerationSummary();
        this.updatePlantList();
        this.updateFeederList();
        this.updateSystemHealth();
    }
    
    /**
     * Update generation summary KPIs
     */
    updateGenerationSummary() {
        // Calculate totals from telemetry
        let totalGen = 0;
        let totalLoad = 0;
        
        // Sum generator outputs
        Object.entries(this.telemetry).forEach(([deviceId, tags]) => {
            if (deviceId.startsWith('GEN-') || deviceId.startsWith('PP-')) {
                if (tags.active_power) {
                    totalGen += tags.active_power;
                }
            }
            if (deviceId.startsWith('FEEDER-')) {
                if (tags.power_flow) {
                    totalLoad += tags.power_flow;
                }
            }
        });
        
        // Add solar
        if (this.telemetry['PV-MARELCO']?.active_power) {
            totalGen += this.telemetry['PV-MARELCO'].active_power;
        }
        
        // Update UI
        const genEl = document.getElementById('kpi-total-gen');
        const loadEl = document.getElementById('kpi-total-load');
        const reserveEl = document.getElementById('kpi-reserve');
        
        if (genEl) {
            genEl.textContent = `${(totalGen / 1000).toFixed(1)} MW`;
            const genBar = document.getElementById('kpi-gen-bar');
            if (genBar) {
                genBar.style.width = `${Math.min(100, (totalGen / 7000) * 100)}%`;
            }
        }
        
        if (loadEl) {
            loadEl.textContent = `${(totalLoad / 1000).toFixed(1)} MW`;
            const loadBar = document.getElementById('kpi-load-bar');
            if (loadBar) {
                loadBar.style.width = `${Math.min(100, (totalLoad / 7000) * 100)}%`;
            }
        }
        
        if (reserveEl) {
            const reserve = totalGen - totalLoad;
            reserveEl.textContent = `${(reserve / 1000).toFixed(1)} MW`;
        }
    }
    
    /**
     * Update plant list
     * Based on external research: Balanacan ~4.5MW, Bantad ~2.0MW
     */
    updatePlantList() {
        const container = document.getElementById('plant-list');
        if (!container) return;
        
        const plants = [
            {
                id: 'PP-BALANACAN',
                name: 'Balanacan Diesel',
                capacity: 4500,
                icon: '🏭',
                generators: ['GEN-BAL-1', 'GEN-BAL-2', 'GEN-BAL-3']
            },
            {
                id: 'PP-BANTAD',
                name: 'Bantad Diesel',
                capacity: 2000,
                icon: '🏭',
                generators: ['GEN-BANT-1', 'GEN-BANT-2']
            },
            {
                id: 'PV-MARELCO',
                name: 'MARELCO Solar',
                capacity: 500,
                icon: '☀️',
                generators: []
            }
        ];
        
        let html = '';
        plants.forEach(plant => {
            // Sum generation from all generators
            let generation = 0;
            plant.generators.forEach(genId => {
                if (this.telemetry[genId]?.active_power) {
                    generation += this.telemetry[genId].active_power;
                }
            });
            
            // Add solar
            if (plant.id === 'PV-MARELCO' && this.telemetry[plant.id]?.active_power) {
                generation = this.telemetry[plant.id].active_power;
            }
            
            const percentage = (generation / plant.capacity) * 100;
            
            html += `
                <div class="plant-item" data-plant="${plant.id}">
                    <span class="plant-icon">${plant.icon}</span>
                    <div class="plant-info">
                        <div class="plant-name">${plant.name}</div>
                        <div class="plant-power">
                            <div class="plant-bar">
                                <div class="plant-bar-fill" style="width: ${Math.min(100, percentage)}%"></div>
                            </div>
                        </div>
                    </div>
                    <span class="plant-value">${(generation / 1000).toFixed(1)} MW</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    /**
     * Update feeder list
     * Based on external research: 4 feeders from Balanacan
     */
    updateFeederList() {
        const container = document.getElementById('feeder-list');
        if (!container) return;
        
        const feeders = [
            { id: 'FEEDER-1', name: 'F1 - Sta Cruz', capacity: 2500 },
            { id: 'FEEDER-2', name: 'F2 - Boac', capacity: 2500 },
            { id: 'FEEDER-3', name: 'F3 - Santa Cruz', capacity: 1500 },
            { id: 'FEEDER-4', name: 'F4 - Mogpog', capacity: 1500 }
        ];
        
        let html = '';
        feeders.forEach(feeder => {
            const powerFlow = this.telemetry[feeder.id]?.power_flow || 0;
            const utilization = (powerFlow / feeder.capacity) * 100;
            
            // Color based on utilization
            let color = '#4A90A4';
            if (utilization > 80) color = '#f59e0b';
            if (utilization > 90) color = '#dc2626';
            
            html += `
                <div class="feeder-item" data-feeder="${feeder.id}">
                    <span class="feeder-name">${feeder.name}</span>
                    <div class="feeder-bar">
                        <div class="feeder-bar-fill" style="width: ${Math.min(100, utilization)}%; background-color: ${color}"></div>
                    </div>
                    <span class="feeder-value">${(powerFlow / 1000).toFixed(1)} MW</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    /**
     * Update alarm badge
     */
    updateAlarmBadge() {
        const badge = document.getElementById('alarmBadge');
        if (badge) {
            const count = this.alarms.filter(a => a.state === 'active').length;
            badge.textContent = count;
        }
    }
    
    /**
     * Update alarm summary
     */
    updateAlarmSummary() {
        const critical = this.alarms.filter(a => a.severity === 'critical' && a.state === 'active').length;
        const warning = this.alarms.filter(a => a.severity === 'warning' && a.state === 'active').length;
        const info = this.alarms.filter(a => a.severity === 'info' && a.state === 'active').length;
        
        document.getElementById('alarm-critical').textContent = critical;
        document.getElementById('alarm-warning').textContent = warning;
        document.getElementById('alarm-info').textContent = info;
        document.getElementById('alarm-summary-count').textContent = `${critical + warning + info} Active`;
        
        // Update recent list
        this.updateRecentAlarms();
    }
    
    /**
     * Update recent alarms list
     */
    updateRecentAlarms() {
        const list = document.getElementById('alarm-list');
        if (!list) return;
        
        const recent = this.alarms.slice(0, 5);
        
        if (recent.length === 0) {
            list.innerHTML = '<li class="alarm-list-item"><span class="alarm-message">No active alarms</span></li>';
            return;
        }
        
        list.innerHTML = recent.map(alarm => `
            <li class="alarm-list-item">
                <span class="alarm-time">${new Date(alarm.timestamp).toTimeString().split(' ')[0]}</span>
                <span class="alarm-device">${alarm.device_id}</span>
                <span class="alarm-message">${alarm.message}</span>
            </li>
        `).join('');
    }
    
    /**
     * Load alarms table
     */
    loadAlarmsTable() {
        const tbody = document.getElementById('alarms-table-body');
        if (!tbody) return;
        
        if (this.alarms.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6">No alarms</td></tr>';
            return;
        }
        
        tbody.innerHTML = this.alarms.map(alarm => `
            <tr data-alarm-id="${alarm.id}">
                <td>
                    <span class="alarm-severity-cell">
                        ${alarm.severity === 'critical' ? '🔴' : alarm.severity === 'warning' ? '🟠' : '🟡'}
                        <span>${alarm.severity}</span>
                    </span>
                </td>
                <td>${new Date(alarm.timestamp).toTimeString().split(' ')[0]}</td>
                <td>${alarm.device_id}</td>
                <td>${alarm.message}</td>
                <td>${alarm.state}</td>
                <td>
                    ${alarm.state === 'active' ? `<button class="btn btn-secondary btn-sm" onclick="app.acknowledgeAlarm('${alarm.id}')">ACK</button>` : ''}
                </td>
            </tr>
        `).join('');
    }
    
    /**
     * Acknowledge alarm
     */
    async acknowledgeAlarm(alarmId) {
        try {
            await fetch(`${this.apiBase}/alarms/${alarmId}/acknowledge`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operatorId: 'Operator' })
            });
            this.loadAlarmsTable();
        } catch (error) {
            console.error('[API] Acknowledge failed:', error);
        }
    }
    
    /**
     * Update system health
     */
    updateSystemHealth() {
        // Simulated health metrics
        const latency = Math.floor(Math.random() * 50 + 20);
        document.getElementById('health-latency').textContent = `${latency} ms`;
        
        // Command success from API if available
        // For now, simulate
        document.getElementById('health-command-success').textContent = '99.0%';
    }
    
    /**
     * Initialize SLD View
     * Pattern 10: SVG Virtualization for Single Line Diagrams
     */
    initSLD() {
        const svg = document.getElementById('sld-svg');
        if (!svg || svg.children.length > 0) return;
        
        // Create SLD based on Balanacan substation
        svg.innerHTML = `
            <!-- Generators -->
            <g class="sld-generators" transform="translate(50, 100)">
                <!-- Generator 1 -->
                <g class="sld-gen" data-device="GEN-BAL-1">
                    <rect class="sld-generator" x="0" y="0" width="80" height="60" rx="4"/>
                    <text class="sld-label" x="40" y="25" text-anchor="middle">GEN 1</text>
                    <text class="sld-value" x="40" y="45" text-anchor="middle" id="sld-gen1-power">-- MW</text>
                </g>
                
                <!-- Generator 2 -->
                <g class="sld-gen" data-device="GEN-BAL-2" transform="translate(100, 0)">
                    <rect class="sld-generator" x="0" y="0" width="80" height="60" rx="4"/>
                    <text class="sld-label" x="40" y="25" text-anchor="middle">GEN 2</text>
                    <text class="sld-value" x="40" y="45" text-anchor="middle" id="sld-gen2-power">-- MW</text>
                </g>
                
                <!-- Generator 3 -->
                <g class="sld-gen" data-device="GEN-BAL-3" transform="translate(200, 0)">
                    <rect class="sld-generator" x="0" y="0" width="80" height="60" rx="4"/>
                    <text class="sld-label" x="40" y="25" text-anchor="middle">GEN 3</text>
                    <text class="sld-value" x="40" y="45" text-anchor="middle" id="sld-gen3-power">-- MW</text>
                </g>
            </g>
            
            <!-- Busbar -->
            <g class="sld-busbar-group" transform="translate(50, 200)">
                <line class="sld-busbar" x1="0" y1="0" x2="380" y2="0"/>
                <text class="sld-label" x="190" y="-10" text-anchor="middle">13.8 kV BUSBAR</text>
            </g>
            
            <!-- Feeders -->
            <g class="sld-feeders" transform="translate(50, 240)">
                <!-- Feeder 1 -->
                <g class="sld-feeder" data-device="FEEDER-1">
                    <circle class="sld-breaker closed" cx="60" cy="0" r="15"/>
                    <line class="sld-feeder" x1="75" y1="0" x2="180" y2="0"/>
                    <text class="sld-label" x="127" y="-20" text-anchor="middle">FEEDER 1</text>
                    <text class="sld-value" x="127" y="20" text-anchor="middle" id="sld-f1-power">-- MW</text>
                </g>
                
                <!-- Feeder 2 -->
                <g class="sld-feeder" data-device="FEEDER-2" transform="translate(0, 60)">
                    <circle class="sld-breaker closed" cx="60" cy="0" r="15"/>
                    <line class="sld-feeder" x1="75" y1="0" x2="180" y2="0"/>
                    <text class="sld-label" x="127" y="-20" text-anchor="middle">FEEDER 2</text>
                    <text class="sld-value" x="127" y="20" text-anchor="middle" id="sld-f2-power">-- MW</text>
                </g>
                
                <!-- Feeder 3 -->
                <g class="sld-feeder" data-device="FEEDER-3" transform="translate(0, 120)">
                    <circle class="sld-breaker closed" cx="60" cy="0" r="15"/>
                    <line class="sld-feeder" x1="75" y1="0" x2="180" y2="0"/>
                    <text class="sld-label" x="127" y="-20" text-anchor="middle">FEEDER 3</text>
                    <text class="sld-value" x="127" y="20" text-anchor="middle" id="sld-f3-power">-- MW</text>
                </g>
                
                <!-- Feeder 4 -->
                <g class="sld-feeder" data-device="FEEDER-4" transform="translate(0, 180)">
                    <circle class="sld-breaker closed" cx="60" cy="0" r="15"/>
                    <line class="sld-feeder" x1="75" y1="0" x2="180" y2="0"/>
                    <text class="sld-label" x="127" y="-20" text-anchor="middle">FEEDER 4</text>
                    <text class="sld-value" x="127" y="20" text-anchor="middle" id="sld-f4-power">-- MW</text>
                </g>
            </g>
            
            <!-- Connection lines to busbar -->
            <g class="sld-connections" transform="translate(90, 160)">
                <line x1="0" y1="0" x2="0" y2="40"/>
            </g>
            <g class="sld-connections" transform="translate(190, 160)">
                <line x1="0" y1="0" x2="0" y2="40"/>
            </g>
            <g class="sld-connections" transform="translate(290, 160)">
                <line x1="0" y1="0" x2="0" y2="40"/>
            </g>
        `;
        
        // Add click handlers
        document.querySelectorAll('.sld-breaker').forEach(breaker => {
            breaker.addEventListener('click', (e) => this.toggleBreaker(e.target));
        });
        
        this.updateSLDValues();
    }
    
    /**
     * Update SLD values from telemetry
     */
    updateSLDValues() {
        // Update generator values
        ['GEN-BAL-1', 'GEN-BAL-2', 'GEN-BAL-3'].forEach((genId, index) => {
            const el = document.getElementById(`sld-gen${index + 1}-power`);
            if (el && this.telemetry[genId]?.active_power) {
                el.textContent = `${(this.telemetry[genId].active_power / 1000).toFixed(1)} MW`;
            }
        });
        
        // Update feeder values
        ['FEEDER-1', 'FEEDER-2', 'FEEDER-3', 'FEEDER-4'].forEach((feederId, index) => {
            const el = document.getElementById(`sld-f${index + 1}-power`);
            if (el && this.telemetry[feederId]?.power_flow) {
                el.textContent = `${(this.telemetry[feederId].power_flow / 1000).toFixed(1)} MW`;
            }
        });
    }
    
    /**
     * Toggle breaker state
     */
    toggleBreaker(element) {
        element.classList.toggle('closed');
        // In real app, send command to backend
        console.log('[SLD] Toggle breaker:', element.closest('.sld-feeder, .sld-gen')?.dataset.device);
    }
    
    /**
     * Zoom SLD
     */
    zoomSLD(factor) {
        if (factor === 'fit') {
            this.sldZoom = 1;
        } else {
            this.sldZoom *= factor;
        }
        
        const svg = document.getElementById('sld-svg');
        if (svg) {
            svg.style.transform = `scale(${this.sldZoom})`;
            svg.style.transformOrigin = 'top left';
        }
    }
    
    /**
     * Initialize GIS Map
     * Based on domain/gis/fundamentals.md
     * Uses EPSG:4326 (WGS84) for coordinates
     */
    initGIS() {
        if (this.map) return; // Already initialized
        
        // Initialize Leaflet map
        this.map = L.map('gis-map').setView([13.45, 121.88], 11);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
        
        // Add markers based on device locations
        this.addAssetMarkers();
        
        console.log('[GIS] Map initialized');
    }
    
    /**
     * Add asset markers to map
     * Based on external research: Marinduque grid locations
     */
    addAssetMarkers() {
        // Substations
        const substationIcon = L.divIcon({
            className: 'asset-marker substation',
            html: '<div style="background: #4A90A4; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"><span style="color:white;font-size:10px;display:block;text-align:center;">⬡</span></div>',
            iconSize: [20, 20]
        });
        
        L.marker([13.475, 121.88], { icon: substationIcon })
            .addTo(this.map)
            .bindPopup('<b>Balanacan Substation</b><br>13.8 kV');
        
        // Power Plants
        const plantIcon = L.divIcon({
            className: 'asset-marker plant',
            html: '<div style="background: #dc2626; width: 24px; height: 24px; border-radius: 4px; border: 2px solid white;">🏭</div>',
            iconSize: [24, 24]
        });
        
        L.marker([13.473, 121.876], { icon: plantIcon })
            .addTo(this.map)
            .bindPopup('<b>Balanacan Diesel Power Plant</b><br>~4.5 MW');
        
        L.marker([13.43, 121.96], { icon: plantIcon })
            .addTo(this.map)
            .bindPopup('<b>Bantad Diesel Power Plant</b><br>~2.0 MW');
        
        // Solar
        const solarIcon = L.divIcon({
            className: 'asset-marker solar',
            html: '<div style="background: #f59e0b; width: 24px; height: 24px; border-radius: 4px; border: 2px solid white;">☀️</div>',
            iconSize: [24, 24]
        });
        
        L.marker([13.434, 121.95], { icon: solarIcon })
            .addTo(this.map)
            .bindPopup('<b>MARELCO Solar PV</b><br>~0.5 MW');
        
        // Municipalities
        const cities = [
            { name: 'Boac', lat: 13.447, lng: 121.837 },
            { name: 'Santa Cruz', lat: 13.434, lng: 121.95 },
            { name: 'Mogpog', lat: 13.48, lng: 121.85 }
        ];
        
        cities.forEach(city => {
            L.circleMarker([city.lat, city.lng], {
                radius: 8,
                color: '#2563eb',
                fillColor: '#2563eb',
                fillOpacity: 0.5
            })
            .addTo(this.map)
            .bindPopup(`<b>${city.name}</b><br>Municipality`);
        });
        
        // Draw power lines (simplified)
        const powerLines = [
            [[13.473, 121.876], [13.475, 121.88]],  // PP to Sub
            [[13.475, 121.88], [13.45, 121.90]],    // To F1 area
            [[13.475, 121.88], [13.447, 121.837]],  // To Boac
            [[13.475, 121.88], [13.434, 121.95]],    // To Santa Cruz
            [[13.475, 121.88], [13.48, 121.85]]     // To Mogpog
        ];
        
        powerLines.forEach(line => {
            L.polyline(line, {
                color: '#4A90A4',
                weight: 3
            }).addTo(this.map);
        });
    }
    
    /**
     * Toggle GIS layer
     */
    toggleLayer(layer, visible) {
        console.log(`[GIS] Toggle layer: ${layer} = ${visible}`);
        // In full implementation, would show/hide layer groups
    }
}

// Initialize app
const app = new SCADAApp();

// Make app globally accessible
window.app = app;
