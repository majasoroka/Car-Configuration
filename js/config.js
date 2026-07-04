/**
 * Master Data Structure for the HyperDrive Configurator
 * Handles brands, models, spec modifiers, and educational data.
 */
const CONFIG_DATA = {
    brands: {
        "apex-motors": {
            name: "Apex Motors",
            models: {
                "valkyrie": {
                    name: "Valkyrie GT",
                    baseSpecs: { hp: 620, torque: 550, zeroToSixty: 3.1, weight: 3250 },
                    options: {
                        exterior: {
                            paint: {
                                label: "Exterior Paint",
                                type: "swatch",
                                items: [
                                    { id: "nero-storm", name: "Nero Storm", value: "#0c0c0e", type: "metallic", rough: 0.1, metal: 0.9, price: 0 },
                                    { id: "monza-red", name: "Monza Red", value: "#cc0000", type: "metallic", rough: 0.15, metal: 0.85, price: 2500 },
                                    { id: "bianco-fuji", name: "Bianco Fuji", value: "#f3f3f3", type: "pearl", rough: 0.2, metal: 0.7, price: 3000 },
                                    { id: "stealth-matte", name: "Stealth Grey", value: "#4a4e51", type: "matte", rough: 0.6, metal: 0.3, price: 5000 }
                                ]
                            },
                            wheels: {
                                label: "Wheel Design",
                                type: "list",
                                items: [
                                    { id: "stock-5spoke", name: "19\" Aero 5-Spoke", specMods: { weight: 0 }, desc: "Standard aluminum flow-formed wheels optimizing weight distribution.", price: 0 },
                                    { id: "forged-v", name: "20\" Forged V-Spec", specMods: { weight: -24 }, desc: "Ultra-lightweight monolithic forged alloys, reducing unsprung mass by 6 lbs per corner.", price: 6800 }
                                ]
                            },
                            calipers: {
                                label: "Brake Calipers",
                                type: "swatch",
                                items: [
                                    { id: "caliper-black", name: "Gloss Black", value: "#111111", price: 0 },
                                    { id: "caliper-yellow", name: "Modena Yellow", value: "#ffcc00", price: 1200 },
                                    { id: "caliper-red", name: "Acid Red", value: "#ff0033", price: 1200 }
                                ]
                            }
                        },
                        interior: {
                            leather: {
                                label: "Upholstery Leather",
                                type: "swatch",
                                items: [
                                    { id: "nero-leather", name: "Nero Ade Alcantara", value: "#1d1d1f", rough: 0.8, metal: 0.0, price: 0 },
                                    { id: "cuoio-tan", name: "Cuoio Tuscan Leather", value: "#8b5a2b", rough: 0.7, metal: 0.0, price: 4500 }
                                ]
                            }
                        },
                        performance: {
                            engine: {
                                label: "Powertrain Optimization",
                                type: "list",
                                items: [
                                    { id: "ecu-stock", name: "Factory Tune", specMods: { hp: 0, torque: 0, zeroToSixty: 0 }, desc: "Stock calibration optimized for everyday road usability and standard fuel ratings.", price: 0 },
                                    { id: "ecu-stage1", name: "Stage 1 ECU Flash", specMods: { hp: 85, torque: 70, zeroToSixty: -0.3 }, desc: "Remaps fuel injection mapping and increases peak turbo boost pressure by 4.3 PSI.", price: 3200 }
                                ]
                            },
                            exhaust: {
                                label: "Exhaust Systems",
                                type: "list",
                                items: [
                                    { id: "ex-stock", name: "Standard Active Exhaust", specMods: { hp: 0, weight: 0 }, desc: "Dual-exit valved system adhering to variable sound regulations.", price: 0 },
                                    { id: "ex-titanium", name: "Inconel Race Pipe", specMods: { hp: 15, weight: -38, zeroToSixty: -0.1 }, desc: "Formula 1 grade Inconel alloy reducing backpressure and deleting redundant silencers.", price: 8500 }
                                ]
                            }
                        }
                    }
                },
                "kronos": {
                    name: "Kronos Hypercar",
                    baseSpecs: { hp: 980, torque: 810, zeroToSixty: 2.2, weight: 2950 },
                    options: {
                        exterior: {
                            paint: {
                                label: "Exterior Finish",
                                type: "swatch",
                                items: [
                                    { id: "carbon-exposed", name: "Exposed Gloss Carbon", value: "#1a1a1a", type: "metallic", rough: 0.05, metal: 0.9, price: 18000 },
                                    { id: "liquid-blue", name: "Liquid Cobalt", value: "#0033aa", type: "metallic", rough: 0.1, metal: 0.95, price: 6000 }
                                ]
                            },
                            wheels: {
                                label: "Wheel Execution",
                                type: "list",
                                items: [
                                    { id: "k-stock", name: "20\" Magnesium Disc", specMods: { weight: 0 }, desc: "Advanced light-alloy racing profile wheels.", price: 0 }
                                ]
                            },
                            calipers: {
                                label: "Caliper Configuration",
                                type: "swatch",
                                items: [
                                    { id: "k-caliper-blue", name: "Cobalt Matching Blue", value: "#0033aa", price: 0 }
                                ]
                            }
                        },
                        interior: {
                            leather: {
                                label: "Cockpit Materials",
                                type: "swatch",
                                items: [
                                    { id: "k-interior-black", name: "Grid Black Tech-Weave", value: "#111111", rough: 0.9, metal: 0.0, price: 0 }
                                ]
                            }
                        },
                        performance: {
                            engine: {
                                label: "E-Motor Tuning",
                                type: "list",
                                items: [
                                    { id: "k-eng-stock", name: "Standard 980hp Hybrid Unit", specMods: { hp: 0, torque: 0, zeroToSixty: 0 }, desc: "Balanced performance matrix mapping.", price: 0 },
                                    { id: "k-eng-unlocked", name: "Track Overclock Firmware", specMods: { hp: 120, torque: 95, zeroToSixty: -0.2 }, desc: "Bypasses thermal reserves on front axle induction motors to optimize overall deployment time.", price: 12500 }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};
