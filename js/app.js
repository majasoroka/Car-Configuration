/**
 * Master Application State and UI Orchestrator
 */
class ConfiguratorApp {
    constructor() {
        this.viewer = new CarViewer(); // Initialize WebGL Controller
        
        // Track the current chosen build state
        this.currentBrand = "apex-motors";
        this.currentModel = "valkyrie";
        this.selectedOptions = {
            paint: null,
            wheels: null,
            calipers: null,
            leather: null,
            engine: null,
            exhaust: null
        };

        this.initUI();
    }

    initUI() {
        const modelSelector = document.getElementById('car-model-selector');
        
        // 1. Populate Vehicle Model Options dropdown dynamically
        modelSelector.innerHTML = "";
        for (const [brandId, brandData] of Object.entries(CONFIG_DATA.brands)) {
            for (const [modelId, modelData] of Object.entries(brandData.models)) {
                const opt = document.createElement('option');
                opt.value = `${brandId}:${modelId}`;
                opt.textContent = `${brandData.name} - ${modelData.name}`;
                modelSelector.appendChild(opt);
            }
        }

        // 2. Add change listeners for switching car models
        modelSelector.addEventListener('change', (e) => {
            const [brand, model] = e.target.value.split(':');
            this.switchModel(brand, model);
        });

        // 3. Add Category Sidebar Navigation listeners
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                tabButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderCategoryOptions(e.target.dataset.tab);
            });
        });

        // Load Default Model Baseline
        this.switchModel(this.currentBrand, this.currentModel);
    }

    switchModel(brand, model) {
        this.currentBrand = brand;
        this.currentModel = model;
        
        const modelData = CONFIG_DATA.brands[brand].models[model];

        // Set baseline defaults
        this.selectedOptions.paint = modelData.options.exterior.paint.items[0];
        this.selectedOptions.wheels = modelData.options.exterior.wheels.items[0];
        this.selectedOptions.calipers = modelData.options.exterior.calipers.items[0];
        this.selectedOptions.leather = modelData.options.interior.leather.items[0];
        this.selectedOptions.engine = modelData.options.performance?.engine?.items[0] || null;
        this.selectedOptions.exhaust = modelData.options.performance?.exhaust?.items[0] || null;

        // Sync UI views
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        this.renderCategoryOptions(activeTab);
        this.recalculateSpecs();
        this.sync3DViewer();
    }

    renderCategoryOptions(category) {
        const container = document.getElementById('options-container');
        container.innerHTML = ""; // Clear existing UI list nodes
        
        const modelData = CONFIG_DATA.brands[this.currentBrand].models[this.currentModel];
        const categoryOptions = modelData.options[category];

        if (!categoryOptions) return;

        for (const [optionKey, optionGroup] of Object.entries(categoryOptions)) {
            const groupWrap = document.createElement('div');
            groupWrap.className = 'option-group';
            
            const title = document.createElement('h3');
            title.textContent = optionGroup.label;
            groupWrap.appendChild(title);

            if (optionGroup.type === 'swatch') {
                const grid = document.createElement('div');
                grid.className = 'swatch-grid';

                optionGroup.items.forEach(item => {
                    const swatch = document.createElement('div');
                    swatch.className = `swatch ${this.selectedOptions[optionKey]?.id === item.id ? 'active' : ''}`;
                    swatch.style.backgroundColor = item.value;
                    
                    // Bind events for interactions
                    swatch.addEventListener('click', () => {
                        this.selectedOptions[optionKey] = item;
                        this.renderCategoryOptions(category);
                        this.recalculateSpecs();
                        this.sync3DViewer();
                    });

                    swatch.addEventListener('mouseenter', () => this.showTooltip(item.name, `Premium configuration addon. Price: $${item.price.toLocaleString()}`));
                    swatch.addEventListener('mouseleave', () => this.hideTooltip());

                    grid.appendChild(swatch);
                });
                groupWrap.appendChild(grid);

            } else if (optionGroup.type === 'list') {
                const grid = document.createElement('div');
                grid.className = 'list-grid';

                optionGroup.items.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = `list-item ${this.selectedOptions[optionKey]?.id === item.id ? 'active' : ''}`;
                    btn.textContent = `${item.name} (+$${item.price.toLocaleString()})`;

                    btn.addEventListener('click', () => {
                        this.selectedOptions[optionKey] = item;
                        this.renderCategoryOptions(category);
                        this.recalculateSpecs();
                    });

                    btn.addEventListener('mouseenter', () => this.showTooltip(item.name, item.desc));
                    btn.addEventListener('mouseleave', () => this.hideTooltip());

                    grid.appendChild(btn);
                });
                groupWrap.appendChild(grid);
            }

            container.appendChild(groupWrap);
        }
    }

    recalculateSpecs() {
        const modelData = CONFIG_DATA.brands[this.currentBrand].models[this.currentModel];
        
        // Start from base performance profile
        let finalHp = modelData.baseSpecs.hp;
        let finalTorque = modelData.baseSpecs.torque;
        let finalDeltaSpeed = modelData.baseSpecs.zeroToSixty;
        let finalWeight = modelData.baseSpecs.weight;

        // Loop through current build options and calculate performance variance
        Object.values(this.selectedOptions).forEach(opt => {
            if (opt && opt.specMods) {
                if (opt.specMods.hp) finalHp += opt.specMods.hp;
                if (opt.specMods.torque) finalTorque += opt.specMods.torque;
                if (opt.specMods.weight) finalWeight += opt.specMods.weight;
                if (opt.specMods.zeroToSixty) finalDeltaSpeed += opt.specMods.zeroToSixty;
            }
        });

        // Push calculated variables onto HTML elements
        document.getElementById('stat-hp').innerHTML = `${finalHp} <small>HP</small>`;
        document.getElementById('stat-torque').innerHTML = `${finalTorque} <small>LB-FT</small>`;
        document.getElementById('stat-speed').innerHTML = `${finalDeltaSpeed.toFixed(2)} <small>S</small>`;
        document.getElementById('stat-weight').innerHTML = `${finalWeight.toLocaleString()} <small>LBS</small>`;
    }

    sync3DViewer() {
        // Send state updates across to the WebGL rendering context
        if (this.selectedOptions.paint) {
            const p = this.selectedOptions.paint;
            this.viewer.updatePaintMaterial(p.value, p.rough || 0.15, p.metal || 0.85);
        }
        if (this.selectedOptions.calipers) {
            this.viewer.updateCaliperMaterial(this.selectedOptions.calipers.value);
        }
        if (this.selectedOptions.leather) {
            const l = this.selectedOptions.leather;
            this.viewer.updateInteriorMaterial(l.value, l.rough || 0.7);
        }
    }

    showTooltip(title, text) {
        const tip = document.getElementById('info-tooltip');
        document.getElementById('tooltip-title').textContent = title;
        document.getElementById('tooltip-text').textContent = text;
        tip.classList.remove('hidden');
    }

    hideTooltip() {
        document.getElementById('info-tooltip').classList.add('hidden');
    }
}

// Window Execution Initialization Hook
window.addEventListener('DOMContentLoaded', () => {
    window.AppInstance = new ConfiguratorApp();
});
