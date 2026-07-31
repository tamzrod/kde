# Recommendations: INV-RUNTIME-GAPS

**Investigation**: INV-RUNTIME-GAPS
**Date**: 2026-07-29T05:45:00Z
**Purpose**: Mitigations for runtime dependency and validation gaps

---

## Executive Summary

Three critical gaps allow experiments to execute without proper validation:

1. **No runtime dependency verification**
2. **No ECU involvement in experiment creation**
3. **Stale state vs verified state**

---

## Mitigation Strategy 1: Runtime Dependency Verification (AUTO-INSTALL)

### Problem
The ECU bootstrap does not verify that required Python packages are available.

### Human Expectation Behavior
Instead of immediately blocking when dependencies are missing, the system should:
1. **Attempt to auto-install** missing dependencies using pip
2. **Verify the installation** worked by testing the import
3. **Only block** if both the check AND auto-install fail
4. **Provide clear feedback** on what was installed vs what failed

### Recommendation
Add a **Runtime Dependency Checker with Auto-Install** to the bootstrap process.

### Implementation

**New File**: `/runtime/ecu/dependency_checker.py` (IMPLEMENTED)

The dependency checker now includes:
- `check_and_fix()` - Main method that checks AND auto-installs
- `_attempt_install()` - Runs pip install for missing packages
- `auto_install` parameter - Control auto-install behavior

**Behavior Flow**:
```
Dependency Missing?
        ↓
┌───────────────────────────────┐
│  AUTO-INSTALL ENABLED?       │
└───────────────────────────────┘
        ↓ YES
┌───────────────────────────────┐
│  Run: pip install <package>   │
└───────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  SUCCESS? → Verify import works         │
│            → Mark as auto-installed     │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│  ALL PASSED? → Continue                 │
│  STILL FAILING? → Block with report     │
└─────────────────────────────────────────┘
```

### Usage

```python
from runtime.ecu.dependency_checker import DependencyChecker

# Auto-install enabled (default)
checker = DependencyChecker(auto_install=True)
result = checker.check_and_fix()

if result.all_passed:
    print("Dependencies satisfied!")
    if result.auto_installed:
        print(f"Auto-installed: {result.auto_installed}")
else:
    print(f"Failed to resolve: {result.still_missing}")
```

### Policy Rule Addition

**Modify**: `/runtime/ecu/policy/__init__.py`

The policy layer now calls the dependency checker which handles auto-install internally.

```python
PolicyRule(
    name="runtime_dependencies_available",
    description="All required Python dependencies must be installed (auto-install enabled)",
    check_fn=self._check_runtime_dependencies,
    blocking=True
),
```

### Verification Gate in Bootstrap

**Modify**: `/runtime/ecu/bootstrap/__init__.py`

```python
def _validate_dependencies(self) -> Dict[str, Any]:
    """Validate runtime dependencies before proceeding.
    
    This will AUTO-INSTALL missing dependencies if possible.
    Only returns INVALID if auto-install also fails.
    """
    from ..dependency_checker import DependencyChecker, validate_dependencies_for_ecu
    
    result = validate_dependencies_for_ecu(auto_install=True)
    
    return {
        "status": "VALID" if result["valid"] else "INVALID",
        "auto_installed": result.get("auto_installed", []),
        "still_missing": result.get("still_missing", []),
        "ready_for_execution": result["valid"]
    }
```

---

## Mitigation Strategy 2: Experiment Creation Validation Gate

### Problem
Experiments can be created without ECU involvement or validation.

### Recommendation
Require ECU validation checkpoint before experiment artifacts are committed.

### Implementation

**New Method in ECUBootstrap**: `/runtime/ecu/bootstrap/__init__.py`

```python
def validate_experiment_intent(
    self,
    experiment_id: str,
    engine_id: str,
    seed_id: str,
    artifact_path: str
) -> Dict[str, Any]:
    """
    Validate experiment creation intent before artifact creation.
    
    Returns validation result with blocking status.
    """
    violations = []
    
    # 1. Check engine exists
    if not self.ecu.engine_registry.get_engine(engine_id):
        violations.append({
            "rule": "engine_must_exist",
            "engine_id": engine_id,
            "message": f"Engine '{engine_id}' not found in registry"
        })
    
    # 2. Check seed exists
    if not self.ecu.seed_registry.get_seed(seed_id):
        violations.append({
            "rule": "seed_must_exist", 
            "seed_id": seed_id,
            "message": f"Seed '{seed_id}' not found in registry"
        })
    
    # 3. Check artifact path valid
    lab_result = self.ecu.policy_layer.validate_laboratory_artifact(
        artifact_path
    )
    if lab_result.violated:
        violations.extend([
            {"rule": v.value, "message": str(d)}
            for v, d in zip(lab_result.violations, lab_result.details)
        ])
    
    return {
        "approved": len(violations) == 0,
        "violations": violations,
        "blocking": any(v.get("blocking", True) for v in violations)
    }
```

### Human Authorization Checkpoint

Add to Five Principles enforcement:

```python
# In principles_enforcer.py

def check_experiment_transition(
    self,
    experiment_id: str,
    from_state: str,
    to_state: str,
    actor: str
) -> EnforcementResult:
    """
    Validate experiment state transitions.
    
    BLOCKS transitions to COMPLETE without human authorization.
    """
    # Only block APPROVED→COMPLETE without authorization
    if from_state == "ACTIVE" and to_state == "COMPLETE" and actor != "human":
        return EnforcementResult(
            passed=False,
            violations=[
                PrincipleViolation(
                    principle=PrincipleType.EXPERIMENT_AUTHORIZATION,
                    description=f"Experiment '{experiment_id}' requires human authorization to complete",
                    severity="error",
                    blocked=True
                )
            ]
        )
    
    return EnforcementResult(passed=True)
```

---

## Mitigation Strategy 3: State Verification Instead of State Claiming

### Problem
`state.json` is set to "initialized" without verification.

### Recommendation
Implement verified state that checks actual system conditions.

### Implementation

**New File**: `/runtime/state_verifier.py`

```python
"""
Runtime State Verifier

Provides VERIFIED state rather than CLAIMED state.
Verifies actual system conditions, not just file contents.
"""

import os
import sys
from typing import Dict, Any, List
from dataclasses import dataclass
from datetime import datetime

@dataclass
class VerificationResult:
    """Result of a single verification check."""
    check_name: str
    passed: bool
    message: str
    details: Dict[str, Any]

class RuntimeStateVerifier:
    """
    Verifies runtime state by checking actual conditions.
    """
    
    def __init__(self, kde_root: str):
        self.kde_root = kde_root
        self.checks: List[VerificationResult] = []
    
    def verify_all(self) -> Dict[str, Any]:
        """
        Run all verification checks.
        
        Returns:
            Complete verification report
        """
        self.checks = []
        
        # Check 1: Core imports work
        self._verify_imports()
        
        # Check 2: Directories exist
        self._verify_directories()
        
        # Check 3: Config files valid
        self._verify_config_files()
        
        # Check 4: Engines discoverable
        self._verify_engine_discovery()
        
        # Check 5: Seeds discoverable
        self._verify_seed_discovery()
        
        return self._build_report()
    
    def _verify_imports(self) -> None:
        """Verify all critical imports work."""
        critical_imports = [
            ('yaml', 'ruamel.yaml'),
            ('runtime.ecu', 'ECU'),
            ('runtime.preflight', 'Preflight'),
        ]
        
        for module_name, display_name in critical_imports:
            try:
                __import__(module_name)
                self.checks.append(VerificationResult(
                    check_name=f"import_{module_name}",
                    passed=True,
                    message=f"✓ {display_name} importable",
                    details={}
                ))
            except ImportError as e:
                self.checks.append(VerificationResult(
                    check_name=f"import_{module_name}",
                    passed=False,
                    message=f"✗ {display_name} import failed: {e}",
                    details={"error": str(e)}
                ))
    
    def _verify_directories(self) -> None:
        """Verify required directories exist."""
        required_dirs = [
            'runtime',
            'engines',
            'seeds',
            'laboratory',
        ]
        
        for dir_name in required_dirs:
            path = os.path.join(self.kde_root, dir_name)
            exists = os.path.exists(path)
            self.checks.append(VerificationResult(
                check_name=f"dir_{dir_name}",
                passed=exists,
                message=f"{'✓' if exists else '✗'} {dir_name}/ {'exists' if exists else 'MISSING'}",
                details={"path": path}
            ))
    
    def _verify_config_files(self) -> None:
        """Verify configuration files are readable."""
        config_files = [
            'runtime/state.json',
            'runtime/catalog.json',
        ]
        
        for config_path in config_files:
            full_path = os.path.join(self.kde_root, config_path)
            exists = os.path.exists(full_path)
            readable = exists and os.access(full_path, os.R_OK)
            self.checks.append(VerificationResult(
                check_name=f"config_{config_path}",
                passed=readable,
                message=f"{'✓' if readable else '✗'} {config_path}",
                details={"path": full_path}
            ))
    
    def _verify_engine_discovery(self) -> None:
        """Verify engine discovery works."""
        try:
            from runtime.ecu.registry import EngineRegistry
            registry = EngineRegistry(self.kde_root)
            engines = registry.discover()
            self.checks.append(VerificationResult(
                check_name="engine_discovery",
                passed=True,
                message=f"✓ Engine discovery: {len(engines)} engines",
                details={"count": len(engines)}
            ))
        except Exception as e:
            self.checks.append(VerificationResult(
                check_name="engine_discovery",
                passed=False,
                message=f"✗ Engine discovery failed: {e}",
                details={"error": str(e)}
            ))
    
    def _verify_seed_discovery(self) -> None:
        """Verify seed discovery works."""
        try:
            from runtime.ecu.registry import SeedRegistry
            registry = SeedRegistry(self.kde_root)
            seeds = registry.discover()
            self.checks.append(VerificationResult(
                check_name="seed_discovery",
                passed=True,
                message=f"✓ Seed discovery: {len(seeds)} seeds",
                details={"count": len(seeds)}
            ))
        except Exception as e:
            self.checks.append(VerificationResult(
                check_name="seed_discovery",
                passed=False,
                message=f"✗ Seed discovery failed: {e}",
                details={"error": str(e)}
            ))
    
    def _build_report(self) -> Dict[str, Any]:
        """Build final verification report."""
        passed = sum(1 for c in self.checks if c.passed)
        failed = sum(1 for c in self.checks if not c.passed)
        
        return {
            "verified_at": datetime.now().isoformat(),
            "overall_status": "VERIFIED" if failed == 0 else "FAILED",
            "passed_checks": passed,
            "failed_checks": failed,
            "checks": [
                {
                    "name": c.check_name,
                    "passed": c.passed,
                    "message": c.message
                }
                for c in self.checks
            ]
        }
    
    def is_ready_for_execution(self) -> bool:
        """Quick check if runtime is ready."""
        report = self.verify_all()
        return report["overall_status"] == "VERIFIED"


def verify_and_report(kde_root: str = "/workspace/project/kde") -> str:
    """Run verification and return formatted report."""
    verifier = RuntimeStateVerifier(kde_root)
    report = verifier.verify_all()
    
    lines = []
    lines.append("=" * 78)
    lines.append("RUNTIME STATE VERIFICATION REPORT")
    lines.append("=" * 78)
    lines.append(f"Verified: {report['verified_at']}")
    lines.append(f"Status: {report['overall_status']}")
    lines.append("")
    lines.append(f"Checks: {report['passed_checks']} passed, {report['failed_checks']} failed")
    lines.append("")
    lines.append("Details:")
    
    for check in report['checks']:
        status = "✓" if check['passed'] else "✗"
        lines.append(f"  {status} {check['message']}")
    
    lines.append("")
    lines.append("=" * 78)
    
    return "\n".join(lines)
```

### State File Update Protocol

**Modify**: State file write operations

```python
# Before writing state.json, run verification
verifier = RuntimeStateVerifier(kde_root)
if not verifier.is_ready_for_execution():
    raise RuntimeError(
        f"Cannot set state to 'initialized' - verification failed:\n"
        f"{verify_and_report(kde_root)}"
    )
```

---

## Priority Implementation Order

| Priority | Mitigation | Impact | Effort |
|----------|------------|--------|--------|
| 1 | Dependency Checker | Prevents runtime start with missing deps | Low |
| 2 | State Verifier | Prevents false-ready state | Medium |
| 3 | Experiment Validation Gate | Prevents unvalidated experiments | Medium |
| 4 | Authorization Checkpoint | Human oversight for completion | Low |

---

## Testing Strategy

1. **Missing Dependency Test**: Remove pyyaml, verify preflight fails with clear message
2. **Stale State Test**: Set state.json to initialized without yaml, verify detection
3. **Fake Engine Test**: Create experiment with non-existent engine, verify blocking

---

## Related Knowledge

- **KDE-ARCH-001**: Hybrid Investigation-Experiment Model
- **KDE-ARCH-004**: Scientific Workflow
- **INV-RUNTIME-GAPS**: This investigation

---

*Generated by OpenHands Agent as part of INV-RUNTIME-GAPS investigation*
*2026-07-29T05:45:00Z*
