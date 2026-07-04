import math

class CarPhysicsEngine:
    def __init__(self, base_hp, weight_kg, drag_coef=0.32):
        self.base_hp = base_hp
        self.weight_kg = weight_kg
        self.drag_coef = drag_coef
        self.air_density = 1.225  # kg/m^3
        self.frontal_area = 2.0   # m^2

    def calculate_modifications(self, has_spoiler, has_stage3_exhaust):
        """
        Calculates dynamic physics changes based on chosen mods.
        Spoilers increase downforce (higher drag) but add stability.
        Exhaust adds pure raw horsepower.
        """
        current_hp = self.base_hp
        current_drag = self.drag_coef

        if has_stage3_exhaust:
            current_hp += 35  # Stage 3 gains
            
        if has_spoiler:
            current_hp += 15   # High-speed air routing efficiency
            current_drag += 0.05  # Aero drag penalty from high-downforce wing

        return current_hp, current_drag

    def estimate_0_60_mph(self, active_hp):
        """
        Calculates 0-60 mph (0-100 km/h) performance using power-to-weight algorithms.
        """
        power_watts = active_hp * 745.7  # Convert HP to Watts
        # Theoretical time ignoring launch traction limitations
        time_seconds = (0.5 * self.weight_kg * (26.8224 ** 2)) / (power_watts * 0.85)
        return round(max(2.1, time_seconds), 2)

    def calculate_terminal_velocity(self, active_hp, active_drag):
        """
        Solves aerodynamic drag equations to find true top speed terminal velocity.
        """
        power_watts = active_hp * 745.7
        # Top speed formula derived from Power = 0.5 * rho * v^3 * Cd * A
        max_velocity_ms = (power_watts / (0.5 * self.air_density * active_drag * self.frontal_area)) ** (1/3)
        mph_top_speed = max_velocity_ms * 2.23694
        return int(mph_top_speed)

# Example profile analyzer execution loop
if __name__ == "__main__":
    # Test suite profiling a 1993 McLaren F1 base profile
    mclaren = CarPhysicsEngine(base_hp=627, weight_kg=1138)
    
    print("--- PYTHON PHYSICS CONFIGURATOR SIMULATION ---")
    hp, drag = mclaren.calculate_modifications(has_spoiler=True, has_stage3_exhaust=True)
    print(f"Modded Output: {hp} HP | Drag Coefficient: {drag} Cd")
    print(f"Estimated 0-60 MPH: {mclaren.estimate_0_60_mph(hp)} seconds")
    print(f"Terminal Top Speed: {mclaren.calculate_terminal_velocity(hp, drag)} mph")
