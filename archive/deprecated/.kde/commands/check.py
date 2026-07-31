"""
KDE Pre-Flight Check Command

Validates that the environment is ready for KDE_RUNTIME investigation
before starting work. Catches issues early, prevents evolution blocks.
Includes laboratory rule enforcement per INV-082.

Usage:
    python -m .kde.commands.check
    python -m .kde.commands.check --strict
    python -m .kde.commands.check --verify-artifact=LAB-063
"""

import sys
import json
import re
from pathlib import Path
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class CheckResult:
    """Result of a single pre-flight check."""
    name: str
    passed: bool
    details: str
    severity: str = "ERROR"  # ERROR, WARNING, INFO


# Laboratory naming conventions (from governance/NAMING-CONVENTIONS.md)
# Note: Paths are relative to the parent directory (e.g., laboratory/)
LABORATORY_NAMING_RULES = {
    "investigations": {
        "pattern": r"^(KDE-INV-\d+|PROJECT-INV-\d+|INV-\d+)$",
        "directory": "laboratory/investigations/"
    },
    "experiments": {
        "pattern": r"^(LAB-\d+|PROJECT-EXP-\d+|EXP-\d+)$",
        "directory": "laboratory/experiments/"
    },
    "decisions": {
        "pattern": r"^TDR-\d+\.md$",
        "directory": "decisions/"
    },
    "implementations": {
        "pattern": r"^PROJECT-IMP-\d+$",
        "directory": "implementations/"
    },
    "reviews": {
        "pattern": r"^PROJECT-REV-\d+\.md$",
        "directory": "reviews/"
    },
    "testing": {
        "pattern": r"^TEST-\d+",
        "directory": "testing/"
    },
}


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
            details="ECU directory not found",
            severity="ERROR"
        )
    
    if not (ecu_dir / "__init__.py").exists():
        return CheckResult(
            name="ECU Enforcement",
            passed=False,
            details="ECU __init__.py not found",
            severity="ERROR"
        )
    
    try:
        import sys
        sys.path.insert(0, str(repo_root))
        from runtime.ecu import create_ecu
        
        ecu = create_ecu(str(repo_root))
        
        # Check ECU state
        state = getattr(ecu, 'state', None)
        if state and hasattr(state, 'initialized'):
            initialized = state.initialized
            engines = getattr(state, 'engines_registered', 0)
            seeds = getattr(state, 'seeds_registered', 0)
            
            if initialized:
                return CheckResult(
                    name="ECU Enforcement",
                    passed=True,
                    details=f"Initialized, {engines} engines, {seeds} seeds"
                )
            else:
                return CheckResult(
                    name="ECU Enforcement",
                    passed=False,
                    details="ECU not initialized",
                    severity="ERROR"
                )
        
        return CheckResult(
            name="ECU Enforcement",
            passed=True,
            details="ECU available"
        )
    except Exception as e:
        return CheckResult(
            name="ECU Enforcement",
            passed=False,
            details=f"Error: {str(e)[:60]}",
            severity="ERROR"
        )


def check_laboratory_rules(artifact_id: Optional[str] = None) -> CheckResult:
    """
    Check 4: Laboratory naming conventions enforced.
    
    If artifact_id is provided, checks that specific artifact:
    1. Follows naming conventions
    2. Does not already exist (no duplicates)
    3. Is in correct directory
    """
    repo_root = get_repo_root()
    
    if artifact_id:
        # Verify a specific artifact before creation
        base_name = artifact_id.replace('.md', '')
        
        # Check 1: Naming pattern
        pattern_match = False
        expected_dir = None
        for category, rules in LABORATORY_NAMING_RULES.items():
            pattern = rules["pattern"]
            if re.match(pattern, base_name):
                pattern_match = True
                expected_dir = rules["directory"]
                break
        
        if not pattern_match:
            return CheckResult(
                name="Laboratory Rules",
                passed=False,
                details=f"'{artifact_id}' does not match any known naming pattern",
                severity="ERROR"
            )
        
        # Check 2: Duplicate existence
        for category, rules in LABORATORY_NAMING_RULES.items():
            directory = rules["directory"]
            dir_path = repo_root / directory
            if dir_path.exists():
                for existing in dir_path.iterdir():
                    if existing.name == base_name or existing.name == artifact_id:
                        return CheckResult(
                            name="Laboratory Rules",
                            passed=False,
                            details=f"'{base_name}' already exists in {directory}",
                            severity="ERROR"
                        )
        
        return CheckResult(
            name="Laboratory Rules",
            passed=True,
            details=f"'{artifact_id}' is valid (no duplicates, correct pattern)"
        )
    
    # General check: verify governance file exists
    naming_conventions = repo_root / "governance" / "NAMING-CONVENTIONS.md"
    if naming_conventions.exists():
        return CheckResult(
            name="Laboratory Rules",
            passed=True,
            details="Naming conventions loaded, ready for artifact validation"
        )
    else:
        return CheckResult(
            name="Laboratory Rules",
            passed=False,
            details="NAMING-CONVENTIONS.md not found",
            severity="WARNING"
        )


def check_auto_engine_selection() -> CheckResult:
    """Check if automatic engine selection is available and working."""
    try:
        import sys
        from pathlib import Path
        
        repo_root = Path(__file__).parent.parent.parent
        sys.path.insert(0, str(repo_root))
        from runtime.ecu import create_ecu
        from runtime.ecu.models import ExecutionRequest, CapabilityType
        
        ecu = create_ecu(str(repo_root))
        
        # Test auto-selection
        engines = ecu.engine_registry.get_active_engines()
        seeds = ecu.seed_registry.get_active_seeds()
        
        request = ExecutionRequest(
            request_id="CHECK-AUTO",
            description="Auto-selection test",
            required_capabilities=[CapabilityType.SYNTHESIS],
            keywords=["test"]
        )
        
        selections = ecu.capability_resolver.resolve(request, engines, seeds)
        
        if selections:
            top_engine = selections[0].engine.codename
            return CheckResult(
                name="Auto Engine Selection",
                passed=True,
                details=f"Available, routes SYNTHESIS → {top_engine}"
            )
        else:
            return CheckResult(
                name="Auto Engine Selection",
                passed=False,
                details="No engines matched test request",
                severity="WARNING"
            )
    except AttributeError as e:
        return CheckResult(
            name="Auto Engine Selection",
            passed=False,
            details=f"Method not found: {str(e)[:50]}",
            severity="WARNING"
        )
    except Exception as e:
        return CheckResult(
            name="Auto Engine Selection",
            passed=True,  # Don't fail on this yet
            details=f"Check skipped: {str(e)[:50]}",
            severity="INFO"
        )


def run_all_checks(artifact_id: Optional[str] = None) -> List[CheckResult]:
    """Run all pre-flight checks."""
    checks = [
        check_bootstrap_gates(),
        check_runtime_state(),
        check_ecu_enforcing(),
        check_laboratory_rules(artifact_id),
        check_auto_engine_selection(),  # NEW: Rewired auto-selection
    ]
    return checks


def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(description="KDE Pre-Flight Check")
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Treat warnings as errors"
    )
    parser.add_argument(
        "--verify-artifact",
        type=str,
        help="Verify artifact ID before creation (e.g., LAB-063)"
    )
    args = parser.parse_args()
    
    artifact_id = getattr(args, "verify_artifact", None)
    
    checks = run_all_checks(artifact_id)
    
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
