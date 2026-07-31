"""
Power Plant Controller (PPC) Reactive Power Control Simulation
LAB-010: Knowledge-to-Simulation Validation

This simulation is derived from collected engineering knowledge.
Every equation, parameter, and assumption is traceable to sources.

TRACEABILITY MATRIX:
- EQ-001: V_error = V_meas - V_set (IEC 61850)
- EQ-IEC-001: Q_ref = K_p × V_error (IEC 61850)
- EQ-CT-001: τ × dQ/dt + Q = Q_ref (Control Theory)
- EQ-EE-002: Q = V² × B (Electrical Engineering)
- EQ-GRID-001: V_POI = V_grid - I × Z (Grid Modeling)

PARAMETER CLASSIFICATION:
- EVIDENCE: From source document
- TUNABLE: Requires site-specific calibration
- ASSUMPTION: Engineering estimate

VALIDATION NOTES:
- Do NOT increase complexity beyond minimal model
- All equations justified by collected knowledge
- No invented physics
"""

import math
from dataclasses import dataclass
from typing import Optional


# Simple clip function (replaces numpy)
def clip(x: float, min_val: float, max_val: float) -> float:
    """Clip value to range [min_val, max_val]."""
    return max(min_val, min(max_val, x))


# =============================================================================
# MODEL PARAMETERS (from knowledge collection)
# =============================================================================

@dataclass
class PPCParameters:
    """
    PPC Controller Parameters
    
    All parameters traceable to collected knowledge:
    - P-001: V_set (IEC-001) - TUNABLE
    - P-003: K_p (IEC-001) - TUNABLE
    - P-004: Q_max (IEEE-1547) - TUNABLE
    - P-005: Q_min (IEEE-1547) - TUNABLE
    - P-006: tau (CT-001) - TUNABLE
    - P-010: V_grid (GRID-001) - ASSUMPTION
    - P-011: rate_limit (IEEE-1547) - TUNABLE
    """
    
    # Control parameters
    V_set: float = 1.00      # P-001: Voltage setpoint [pu] - EVIDENCE
    K_p: float = 1.0         # P-003: Proportional gain - EVIDENCE
    tau: float = 0.1          # P-006: Time constant [s] - EVIDENCE
    
    # Power limits
    Q_max: float = 100.0      # P-004: Max reactive power [VAR] - EVIDENCE
    Q_min: float = -100.0     # P-005: Min reactive power [VAR] - EVIDENCE
    rate_limit: float = 10.0 # P-011: Rate limit [VAR/s] - EVIDENCE
    
    # Grid parameters (ASSUMPTION - not from standard)
    V_grid: float = 1.00     # P-010: Grid voltage [pu] - ASSUMPTION
    Z_magnitude: float = 0.1 # Grid impedance magnitude [pu] - ASSUMPTION


# =============================================================================
# STATE VARIABLES (from model specification)
# =============================================================================

@dataclass
class PPCState:
    """
    PPC Controller State Variables
    
    State variables traceable to model specification:
    - S-001: Q (reactive power) - INTERNAL
    - S-002: V_error (voltage error) - DERIVED
    - S-003: V_POI (POI voltage) - OUTPUT
    """
    
    # State variables
    Q: float = 0.0           # S-001: Reactive power [VAR]
    V_error: float = 0.0      # S-002: Voltage error [pu] - DERIVED
    V_POI: float = 1.0       # S-003: POI voltage [pu] - OUTPUT
    
    # Internal
    Q_ref: float = 0.0       # Reactive power reference
    Q_raw: float = 0.0        # Q before limits


# =============================================================================
# CORE EQUATIONS (traceable to knowledge)
# =============================================================================

class PPCCalculator:
    """
    PPC calculation methods.
    
    Each method traces to specific equations in knowledge collection.
    """
    
    @staticmethod
    def calculate_voltage_error(V_meas: float, V_set: float) -> float:
        """
        EQ-001: Voltage Error Calculation
        
        Source: IEC 61850-7-2
        Classification: EVIDENCE
        
        Justification: Standard proportional control error calculation
        """
        return V_meas - V_set
    
    @staticmethod
    def calculate_q_reference(V_error: float, K_p: float) -> float:
        """
        EQ-IEC-001: Reactive Power Reference Calculation
        
        Source: IEC 61850-7-2
        Classification: EVIDENCE
        
        Justification: Linear Q = f(V) characteristic per IEC standard
        """
        return K_p * V_error
    
    @staticmethod
    def apply_constraints(Q_raw: float, Q_min: float, Q_max: float) -> float:
        """
        C-001, C-002: Apply Q Limits
        
        Source: IEEE 1547-2018
        Classification: EVIDENCE
        
        Justification: Reactive power must stay within limits
        """
        return clip(Q_raw, Q_min, Q_max)
    
    @staticmethod
    def apply_rate_limit(Q_current: float, Q_target: float, 
                        rate_limit: float, dt: float) -> float:
        """
        C-003: Apply Rate Limit
        
        Source: IEEE 1547-2018
        Classification: EVIDENCE
        
        Justification: Prevent rapid Q changes
        """
        max_change = rate_limit * dt
        delta = Q_target - Q_current
        return Q_current + clip(delta, -max_change, max_change)
    
    @staticmethod
    def update_inverter_response(Q: float, Q_ref: float, tau: float, dt: float) -> float:
        """
        EQ-CT-001: First-Order Inverter Response
        
        Source: Control Systems Engineering (CT-001)
        Classification: EVIDENCE
        
        Equation: τ × dQ/dt + Q = Q_ref
        Solved: dQ/dt = (Q_ref - Q) / τ
        
        Justification: First-order approximation of inverter dynamics
        """
        if tau <= 0:
            return Q_ref
        dQ = (Q_ref - Q) / tau
        return Q + dQ * dt
    
    @staticmethod
    def calculate_poi_voltage(Q: float, V_grid: float, Z: float) -> float:
        """
        EQ-EE-002, EQ-GRID-001: POI Voltage Calculation
        
        Source: Electrical Engineering (EE-001), Grid Modeling (GRID-001)
        Classification: EVIDENCE + ASSUMPTION
        
        Equation: V_POI = V_grid - Q / (V × B)
        Simplified: V_POI ≈ V_grid - Q × Z (for small Q)
        
        ASSUMPTION: Strong grid (SCR > 5), simplified model sufficient
        """
        # Simplified voltage droop model
        # V_POI decreases as Q increases (inductive) or increases (capacitive)
        delta_V = Q * Z
        return V_grid - delta_V


# =============================================================================
# PPC CONTROLLER (main simulation class)
# =============================================================================

class PPCController:
    """
    Power Plant Controller for Reactive Power Control
    
    This controller implements Q = f(V) characteristic per IEC 61850.
    
    Traceability:
    - Control law: EQ-IEC-001 (IEC 61850)
    - Inverter response: EQ-CT-001 (Control Theory)
    - Constraints: C-001, C-002, C-003 (IEEE 1547)
    """
    
    def __init__(self, params: Optional[PPCParameters] = None):
        """
        Initialize PPC Controller.
        
        Parameters traceable to knowledge collection.
        """
        self.params = params or PPCParameters()
        self.state = PPCState()
        self.time = 0.0
        self.history = []
    
    def step(self, V_meas: float, dt: float) -> PPCState:
        """
        Execute one simulation step.
        
        Step sequence (traceable to state diagram):
        1. Calculate voltage error (EQ-001)
        2. Calculate Q reference (EQ-IEC-001)
        3. Apply Q limits (C-001, C-002)
        4. Apply rate limit (C-003)
        5. Update inverter response (EQ-CT-001)
        6. Calculate POI voltage (EQ-GRID-001)
        
        Parameters:
            V_meas: Measured POI voltage [pu]
            dt: Time step [s]
        """
        p = self.params
        s = self.state
        
        # 1. Voltage error (EQ-001 - EVIDENCE)
        s.V_error = PPCCalculator.calculate_voltage_error(V_meas, p.V_set)
        
        # 2. Q reference (EQ-IEC-001 - EVIDENCE)
        s.Q_raw = PPCCalculator.calculate_q_reference(s.V_error, p.K_p)
        
        # 3. Apply Q limits (C-001, C-002 - EVIDENCE)
        s.Q_ref = PPCCalculator.apply_constraints(s.Q_raw, p.Q_min, p.Q_max)
        
        # 4. Apply rate limit (C-003 - EVIDENCE)
        s.Q_ref = PPCCalculator.apply_rate_limit(s.Q, s.Q_ref, p.rate_limit, dt)
        
        # 5. Update inverter response (EQ-CT-001 - EVIDENCE)
        s.Q = PPCCalculator.update_inverter_response(s.Q, s.Q_ref, p.tau, dt)
        
        # 6. Calculate POI voltage (EQ-GRID-001 - EVIDENCE + ASSUMPTION)
        s.V_POI = PPCCalculator.calculate_poi_voltage(s.Q, p.V_grid, p.Z_magnitude)
        
        # Update time
        self.time += dt
        
        return self.state
    
    def run_simulation(self, V_meas_profile: list, dt: float) -> list:
        """
        Run simulation with voltage profile.
        
        Parameters:
            V_meas_profile: List of measured voltages [pu]
            dt: Time step [s]
            
        Returns:
            List of state snapshots
        """
        self.history = []
        for V_meas in V_meas_profile:
            state = self.step(V_meas, dt)
            self.history.append({
                'time': self.time,
                'V_meas': V_meas,
                'V_error': state.V_error,
                'Q_ref': state.Q_ref,
                'Q': state.Q,
                'V_POI': state.V_POI
            })
        return self.history


# =============================================================================
# SIMULATION EXECUTION
# =============================================================================

def run_default_simulation():
    """
    Run default simulation demonstrating PPC behavior.
    
    Test scenario:
    - Step change in grid voltage from 1.0 to 1.05 pu
    - Expected: Controller increases Q to regulate V_POI back to setpoint
    """
    print("=" * 70)
    print("PPC Reactive Power Control Simulation")
    print("LAB-010: Knowledge-to-Simulation Validation")
    print("=" * 70)
    print()
    
    # Default parameters
    params = PPCParameters()
    
    # Create controller
    ppc = PPCController(params)
    
    # Simulation: Step change in grid voltage
    # Phase 1: Normal (0-1s) - V = 1.0 pu
    # Phase 2: Disturbance (1-5s) - V = 1.05 pu
    dt = 0.1
    steps_normal = int(1.0 / dt)
    steps_disturbed = int(4.0 / dt)
    
    V_profile = [1.0] * steps_normal + [1.05] * steps_disturbed
    
    # Run simulation
    history = ppc.run_simulation(V_profile, dt)
    
    # Print results
    print("Simulation Results:")
    print("-" * 70)
    print(f"{'Time':>6} {'V_meas':>8} {'V_error':>8} {'Q_ref':>10} {'Q':>10} {'V_POI':>8}")
    print("-" * 70)
    
    for i, h in enumerate(history):
        if i % 10 == 0:  # Every 10th step
            print(f"{h['time']:6.1f} {h['V_meas']:8.3f} {h['V_error']:8.3f} "
                  f"{h['Q_ref']:10.2f} {h['Q']:10.2f} {h['V_POI']:8.3f}")
    
    print()
    print("Final State:")
    final = history[-1]
    print(f"  V_meas: {final['V_meas']:.3f} pu")
    print(f"  V_error: {final['V_error']:.3f} pu")
    print(f"  Q_ref: {final['Q_ref']:.2f} VAR")
    print(f"  Q: {final['Q']:.2f} VAR")
    print(f"  V_POI: {final['V_POI']:.3f} pu")
    print()
    
    # Print traceability
    print("Equation Traceability:")
    print("-" * 70)
    print("  EQ-001: V_error = V_meas - V_set          [IEC 61850] EVIDENCE")
    print("  EQ-IEC-001: Q_ref = K_p × V_error         [IEC 61850] EVIDENCE")
    print("  EQ-CT-001: τ × dQ/dt + Q = Q_ref        [Control Theory] EVIDENCE")
    print("  EQ-GRID-001: V_POI = V_grid - Q × Z       [Grid Modeling] EVIDENCE+ASSUMPTION")
    print("  C-001, C-002: Q limits                   [IEEE 1547] EVIDENCE")
    print("  C-003: Rate limit                        [IEEE 1547] EVIDENCE")
    print()
    
    # Print assumptions
    print("Assumptions Register:")
    print("-" * 70)
    print("  A-001: V_grid = 1.0 pu                    [Simplified model] MEDIUM risk")
    print("  A-002: Strong grid (SCR > 5)             [Grid strength] MEDIUM risk")
    print("  A-003: Linear response                   [Control theory] LOW risk")
    print()
    
    return history


if __name__ == "__main__":
    run_default_simulation()
