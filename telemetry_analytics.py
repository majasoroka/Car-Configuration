import math

class VehicleTelemetryAnalytics:
    def __init__(self):
        # Database containing structural and physical engineering properties for entire fleet
        self.garage_database = {
            "mclaren_f1_1993": {
                "name": "1993 McLaren F1",
                "base_hp": 627,
                "weight_kg": 1138,
                "drag_coefficient": 0.32,
                "frontal_area_m2": 2.0,
                "redline_rpm": 7500,
                "gear_ratios": [3.23, 2.19, 1.71, 1.39, 1.16, 0.93],
                "final_drive": 2.37
            },
            "lamborghini_murcielago_2024": {
                "name": "2024 LB Silhouette Murciélago GT Evo",
                "base_hp": 640,
                "weight_kg": 1650,
                "drag_coefficient": 0.36,
                "frontal_area_m2": 2.2,
                "redline_rpm": 8000,
                "gear_ratios": [2.93, 1.94, 1.53, 1.21, 1.02, 0.86],
                "final_drive": 2.53
            },
            "porsche_911_4s": {
                "name": "Porsche 911 Carrera 4S",
                "base_hp": 443,
                "weight_kg": 1565,
                "drag_coefficient": 0.29,
                "frontal_area_m2": 2.1,
                "redline_rpm": 7400,
                "gear_ratios": [3.91, 2.29, 1.65, 1.30, 1.08, 0.88, 0.71, 0.55],
                "final_drive": 3.39
            },
            "plymouth_hemi_cuda_1971": {
                "name": "1971 Plymouth Hemi Cuda",
                "base_hp": 425,
                "weight_kg": 1680,
                "drag_coefficient": 0.45,
                "frontal_area_m2": 2.3,
                "redline_rpm": 6000,
                "gear_ratios": [2.44, 1.77, 1.34, 1.00],
                "final_drive": 3.54
            },
            "porsche_930_turbo_1975": {
                "name": "1975 Porsche 911 930 Turbo",
                "base_hp": 256,
                "weight_kg": 1140,
                "drag_coefficient": 0.39,
                "frontal_area_m2": 1.9,
                "redline_rpm": 6800,
                "gear_ratios": [2.57, 1.69, 1.21, 0.89],
                "final_drive": 3.44
            },
            "bmw_330i": {
                "name": "BMW 330i Luxury Sedan",
                "base_hp": 255,
                "weight_kg": 1655,
                "drag_coefficient": 0.24,
                "frontal_area_m2": 2.22,
                "redline_rpm": 6500,
                "gear_ratios": [4.71, 3.14, 2.11, 1.67, 1.28, 1.00, 0.85, 0.67],
                "final_drive": 2.81
            },
            "porsche_cayman_gt4": {
                "name": "Porsche Cayman GT4 Track Edition",
                "base_hp": 414,
                "weight_kg": 1420,
                "drag_coefficient": 0.34,
                "frontal_area_m2": 2.0,
                "redline_rpm": 8000,
                "gear_ratios": [3.31, 1.95, 1.41, 1.13, 0.95, 0.81],
                "final_drive": 3.89
            },
            "mazda_rx8_2017": {
                "name": "2017 Pandem Mazda RX-8 Widebody",
                "base_hp": 232,
                "weight_kg": 1310,
                "drag_coefficient": 0.38,
                "frontal_area_m2": 2.15,
                "redline_rpm": 9000,
                "gear_ratios": [3.76, 2.27, 1.65, 1.19, 1.00, 0.84],
                "final_drive": 4.44
            },
            "nissan_silvia_s15_2018": {
                "name": "2018 Garage Mak Nissan S15 Silvia",
                "base_hp": 250,
                "weight_kg": 1240,
                "drag_coefficient": 0.33,
                "frontal_area_m2": 2.0,
                "redline_rpm": 7200,
                "gear_ratios": [3.63, 2.20, 1.54, 1.21, 1.00, 0.77],
                "final_drive": 4.08
            },
            "buick_riviera_1963": {
                "name": "1963 Buick Riviera Classic",
                "base_hp": 325,
                "weight_kg": 1800,
                "drag_coefficient": 0.48,
                "frontal_area_m2": 2.4,
                "redline_rpm": 5000,
                "gear_ratios": [2.48, 1.48, 1.00],
                "final_drive": 3.23
            }
        }
        self.air_density = 1.225  # kg/m^3
        self.gravity = 9.81  # m/s^2

    def dynamic_mod_engine(self, car_id, spoiler_active=False, exhaust_active=False, tint_active=False):
        """Processes dynamic structural gains across all mechanical baselines."""
        if car_id not in self.garage_database:
            return None
            
        specs = self.garage_database[car_id].copy()
        
        # Power configuration matrix modifiers
        if exhaust_active:
            specs["base_hp"] += 35
        if spoiler_active:
            specs["base_hp"] += 15
            specs["drag_coefficient"] += 0.04  # Downforce drag penalty
            
        return specs

    def simulate_quarter_mile(self, car_id, spoiler=False, exhaust=False):
        """Runs an algorithmic numeric simulation estimating time and trap speed."""
        specs = self.dynamic_mod_engine(car_id, spoiler, exhaust)
        if not specs:
            return "Unknown Slot Profile"
            
        hp = specs["base_hp"]
        weight = specs["weight_kg"]
        
        # Power-to-weight calculation logic constants
        hp_per_kg = hp / weight
        estimated_et = 5.825 / (hp_per_kg ** 0.33)
        trap_speed = 234 * (hp_per_kg ** 0.33)
        
        return {
            "car_name": specs["name"],
            "horsepower_calibrated": hp,
            "simulated_et_seconds": round(max(7.9, estimated_et), 3),
            "trap_speed_mph": round(trap_speed, 2)
        }

    def generate_full_garage_report(self):
        """Prints diagnostic performance grids across all systems."""
        print("=" * 65)
        print("          MATRIX SYSTEMS HYPERMOD SIMULATION ANALYTICS          ")
        print("=" * 65)
        for car_key in self.garage_database.keys():
            base_run = self.simulate_quarter_mile(car_key, spoiler=False, exhaust=False)
            mod_run = self.simulate_quarter_mile(car_key, spoiler=True, exhaust=True)
            
            print(f"\n[VEHICLE]: {base_run['car_name']}")
            print(f"  -> Stock Core Stack: {base_run['horsepower_calibrated']} HP | 1/4 Mile: {base_run['simulated_et_seconds']}s @ {base_run['trap_speed_mph']} MPH")
            print(f"  -> Stage 3 HyperMod: {mod_run['horsepower_calibrated']} HP | 1/4 Mile: {mod_run['simulated_et_seconds']}s @ {mod_run['trap_speed_mph']} MPH")
        print("=" * 65)

if __name__ == "__main__":
    analyzer = VehicleTelemetryAnalytics()
    analyzer.generate_full_garage_report()
