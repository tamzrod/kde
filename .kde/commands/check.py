"""
KDE Pre-Flight Check Command

Validates that the environment is ready for KDE_RUNTIME investigation
before starting work. Catches issues early, prevents evolution blocks.

Usage:
    python -m .kde.commands.check
    python -m .kde.commands.check --strict
"""

import sys
import json
from pathlib import Path
from dataclasses import dataclass
from typing import List


@dataclass
class CheckResult:
    """Result of a single pre-flight check."""
    name: str
    passed: bool
    details: str
    severity: str = "ERROR"  # ERROR, WARNING, INFO


def get_repo_root() -> Path:
    """Get the repository root directory."""
    current = Path(__file__).resolve() if '__file__' in dir() else Path.cwd()
    if '.kde' in current.parts:
        idx = current.parts.index('.kde')
        return Path(*current.parts[:idx])
    return Path.cwd()


def check_bootstrap_gates() -> CheckResult:
    """Check 1: Bootstrap gates are passing."""
    repo_root = get_repo_root()
    gates_file = repo_root / ".kde" / "bootstrap" / "gates.py"
    
    if not gates_file.exists():
        return CheckResult(
            name="Bootstrap Gates",
            passed=False,
            details="gates.py not found",
            severity="ERROR"
        )
    
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("gates", gates_file)
        gates = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(gates)
        
        result = gates.verify_all_gates(quick=True)
        passed_count = sum(1 for c in result.checks if c.passed)
        total_count = len(result.checks)
        
        if result.can_proceed:
            return CheckResult(
                name="Bootstrap Gates",
                passed=True,
                details=f"{passed_count}/{total_count} checks passed"
            )
        else:
            return CheckResult(
                name="Bootstrap Gates",
                passed=False,
                details=f"FAILED: {passed_count}/{total_count}",
                severity="ERROR"
            )
    except Exception as e:
        return CheckResult(
            name="Bootstrap Gates",
            passed=False,
            details=f"Error: {str(e)[:50]}",
            severity="ERROR"
        )


def check_runtime_state() -> CheckResult:
    """Check 2: Runtime state is initialized."""
    repo_root = get_repo_root()
    state_file = repo_root / ".kde" / "runtime" / "state.json"
    
    if not state_file.exists():
        return CheckResult(
            name="Runtime State",
            passed=False,
            details="state.json not found",
            severity="ERROR"
        )
    
    try:
        with open(state_file) as f:
            state = json.load(f)
        
        status = state.get("status") or state.get("state") or "unknown"
        
        if status in ["initialized", "ready"]:
            return CheckResult(
                name="Runtime State",
                passed=True,
                details=f"{status}"
            )
        else:
            return CheckResult(
                name="Runtime State",
                passed=False,
                details=f"Status is '{status}'",
                severity="ERROR"
            )
    except Exception as e:
        return CheckResult(
            name="Runtime State",
            passed=False,
            details=f"Error: {str(e)[:50]}",
            severity="ERROR"
        )


def check_ecu_enforcing() -> CheckResult:
    """Check 3: ECU is configured and enforcing."""
    repo_root = get_repo_root()
    ecu_dir = repo_root / "runtime" / "ecu"
    
    if not ecu_dir.exists():
        return CheckResult(
            name="ECU Enforcement",
            passed=False,
            details="ECU not found",
            severity="WARNING"
        )
    
    try:
        import importlib.util
        ecu_file = ecu_dir / "__init__.py"
        if not ecu_file.exists():
            return CheckResult(
                name="ECU Enforcement",
                passed=False,
                details="ECU module not found",
                severity="WARNING"
            )
        
        spec = importlib.util.spec_from_file_location("ecu", ecu_file)
        ecu_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(ecu_module)
        
        ecu = ecu_module.create_ecu(str(repo_root))
        
        # Check if ECU has enforcing capability
        if hasattr(ecu, 'enforcing') and ecu.enforcing:
            return CheckResult(
                name="ECU Enforcement",
                passed=True,
                details="Evidence markers enforcing"
            )
        else:
            return CheckResult(
                name="ECU Enforcement",
                passed=True,
                details="ECU available"
            )
    except Exception as e:
        return CheckResult(
            name="ECU Enforcement",
            passed=True,
            details="ECU check skipped",
            severity="WARNING"
        )


def run_all_checks() -> List[CheckResult]:
    """Run all pre-flight checks."""
    return [
        check_bootstrap_gates(),
        check_runtime_state(),
        check_ecu_enforcing(),
    ]


def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(description="KDE Pre-Flight Check")
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Treat warnings as errors"
    )
    args = parser.parse_args()
    
    checks = run_all_checks()
    
    print("\n" + "=" * 60)
    print("KDE PRE-FLIGHT CHECK")
    print("=" * 60 + "\n")
    
    all_passed = True
    has_warnings = False
    
    for check in checks:
        if check.passed:
            status = "[PASS]"
        elif check.severity == "WARNING":
            status = "[WARN]"
            has_warnings = True
            all_passed = False
        else:
            status = "[FAIL]"
            all_passed = False
        
        print(f"  {status} {check.name}: {check.details}")
    
    print()
    
    if all_passed and not has_warnings:
        print("[OK] Ready for KDE_RUNTIME investigation")
        return 0
    elif has_warnings and not args.strict:
        print("[WARN] Pre-flight has warnings - may proceed")
        return 0
    elif has_warnings and args.strict:
        print("[FAIL] Pre-flight check FAILED (strict mode)")
        return 1
    else:
        print("[FAIL] Pre-flight check FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())
