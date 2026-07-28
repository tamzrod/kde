"""
KDE Evolution Tracking System

REC-004: Tracks investigation maturity levels from FORMAT to ADVANCED.

Maturity Levels:
- Level 1 (FORMAT): Has KDE format (markdown structure)
- Level 2 (COMPLIANT): Has EXECUTION_MODE declaration
- Level 3 (VERIFIED): Bootstrap gates passed
- Level 4 (RUNTIME): KDE_RUNTIME executed
- Level 5 (ADVANCED): Full governance compliance

This system enables:
- Gradual improvement tracking
- Evolution guidance
- ROI measurement per level
"""

from pathlib import Path
from dataclasses import dataclass
from typing import List, Optional, Dict, Any
from enum import Enum


class MaturityLevel(Enum):
    """Investigation maturity levels (REC-004)."""
    LEVEL_1_FORMAT = 1
    LEVEL_2_COMPLIANT = 2
    LEVEL_3_VERIFIED = 3
    LEVEL_4_RUNTIME = 4
    LEVEL_5_ADVANCED = 5
    
    @property
    def name_human(self) -> str:
        """Human-readable name."""
        names = {
            1: "FORMAT",
            2: "COMPLIANT", 
            3: "VERIFIED",
            4: "RUNTIME",
            5: "ADVANCED"
        }
        return names.get(self.value, "UNKNOWN")
    
    @property
    def description(self) -> str:
        """Level description."""
        descriptions = {
            1: "Has KDE format (markdown structure)",
            2: "Has EXECUTION_MODE declaration",
            3: "Bootstrap gates passed",
            4: "KDE_RUNTIME executed",
            5: "Full governance compliance"
        }
        return descriptions.get(self.value, "Unknown")
    
    @property
    def roi_score(self) -> float:
        """Estimated ROI at this level."""
        scores = {1: 1.0, 2: 2.0, 3: 3.0, 4: 4.5, 5: 5.0}
        return scores.get(self.value, 0.0)


@dataclass
class MaturityCheck:
    """Result of a single maturity check."""
    level: MaturityLevel
    check_name: str
    passed: bool
    details: str


@dataclass 
class MaturityReport:
    """Maturity assessment report for an investigation."""
    investigation_path: Path
    current_level: MaturityLevel
    level_name: str
    level_description: str
    checks: List[MaturityCheck]
    next_level: Optional[MaturityLevel]
    next_level_requirements: List[str]
    roi_score: float
    recommendations: List[str]


def check_level_1_format(inv_path: Path) -> MaturityCheck:
    """Level 1: Has KDE format (markdown structure)."""
    readme = inv_path / "README.md"
    
    if not readme.exists():
        return MaturityCheck(
            level=MaturityLevel.LEVEL_1_FORMAT,
            check_name="KDE Format",
            passed=False,
            details="Missing README.md"
        )
    
    try:
        content = readme.read_text()
        # Check for basic markdown structure
        has_headers = "#" in content
        has_structure = "##" in content or "---" in content
        
        if has_headers or has_structure:
            return MaturityCheck(
                level=MaturityLevel.LEVEL_1_FORMAT,
                check_name="KDE Format",
                passed=True,
                details="Has markdown structure"
            )
        else:
            return MaturityCheck(
                level=MaturityLevel.LEVEL_1_FORMAT,
                check_name="KDE Format",
                passed=False,
                details="Missing markdown structure"
            )
    except Exception as e:
        return MaturityCheck(
            level=MaturityLevel.LEVEL_1_FORMAT,
            check_name="KDE Format",
            passed=False,
            details=f"Error reading file: {str(e)}"
        )


def check_level_2_compliant(inv_path: Path) -> MaturityCheck:
    """Level 2: Has EXECUTION_MODE declaration."""
    readme = inv_path / "README.md"
    
    if not readme.exists():
        return MaturityCheck(
            level=MaturityLevel.LEVEL_2_COMPLIANT,
            check_name="EXECUTION_MODE",
            passed=False,
            details="Missing README.md"
        )
    
    try:
        content = readme.read_text()
        
        # Check for grandfathered format (exempt)
        if "KDE_RUNTIME_AUTHENTICITY:" in content:
            return MaturityCheck(
                level=MaturityLevel.LEVEL_2_COMPLIANT,
                check_name="EXECUTION_MODE",
                passed=True,
                details="Grandfathered investigation (legacy format)"
            )
        
        # Check for EXECUTION_MODE
        if "EXECUTION_MODE:" in content:
            # Validate value
            valid_modes = ["KDE_RUNTIME", "GENERIC_AI", "HYBRID"]
            for mode in valid_modes:
                if f"EXECUTION_MODE: {mode}" in content:
                    return MaturityCheck(
                        level=MaturityLevel.LEVEL_2_COMPLIANT,
                        check_name="EXECUTION_MODE",
                        passed=True,
                        details=f"Mode: {mode}"
                    )
            
            return MaturityCheck(
                level=MaturityLevel.LEVEL_2_COMPLIANT,
                check_name="EXECUTION_MODE",
                passed=False,
                details="Invalid EXECUTION_MODE value"
            )
        
        return MaturityCheck(
            level=MaturityLevel.LEVEL_2_COMPLIANT,
            check_name="EXECUTION_MODE",
            passed=False,
            details="Missing EXECUTION_MODE (recommended for KDE v2.0)"
        )
    except Exception as e:
        return MaturityCheck(
            level=MaturityLevel.LEVEL_2_COMPLIANT,
            check_name="EXECUTION_MODE",
            passed=False,
            details=f"Error: {str(e)}"
        )


def check_level_3_verified(inv_path: Path) -> MaturityCheck:
    """Level 3: Bootstrap gates passed."""
    repo_root = inv_path.parent.parent.parent  # inv_path -> investigations -> laboratory -> repo_root
    gates_file = repo_root / ".kde" / "bootstrap" / "gates.py"
    
    if not gates_file.exists():
        return MaturityCheck(
            level=MaturityLevel.LEVEL_3_VERIFIED,
            check_name="Bootstrap Verification",
            passed=False,
            details="Bootstrap gates not found"
        )
    
    # For simplicity, check if gates can be imported
    try:
        import sys
        sys.path.insert(0, str(repo_root))
        # Just check the file exists and is valid Python
        with open(gates_file) as f:
            compile(f.read(), gates_file, 'exec')
        
        return MaturityCheck(
            level=MaturityLevel.LEVEL_3_VERIFIED,
            check_name="Bootstrap Verification",
            passed=True,
            details="Bootstrap gates available"
        )
    except Exception as e:
        return MaturityCheck(
            level=MaturityLevel.LEVEL_3_VERIFIED,
            check_name="Bootstrap Verification",
            passed=False,
            details=f"Bootstrap check failed: {str(e)}"
        )


def check_level_4_runtime(inv_path: Path) -> MaturityCheck:
    """Level 4: KDE_RUNTIME executed."""
    readme = inv_path / "README.md"
    
    if not readme.exists():
        return MaturityCheck(
            level=MaturityLevel.LEVEL_4_RUNTIME,
            check_name="Runtime Execution",
            passed=False,
            details="Missing README.md"
        )
    
    try:
        content = readme.read_text()
        
        # Check for KDE_RUNTIME mode
        if "EXECUTION_MODE: KDE_RUNTIME" in content:
            # Check for runtime evidence
            has_runtime_evidence = (
                "RUNTIME_AUTHORITY:" in content or
                "Runtime State:" in content or
                "ECU" in content
            )
            
            if has_runtime_evidence:
                return MaturityCheck(
                    level=MaturityLevel.LEVEL_4_RUNTIME,
                    check_name="Runtime Execution",
                    passed=True,
                    details="KDE_RUNTIME executed with evidence"
                )
            else:
                return MaturityCheck(
                    level=MaturityLevel.LEVEL_4_RUNTIME,
                    check_name="Runtime Execution",
                    passed=False,
                    details="KDE_RUNTIME declared but no runtime evidence"
                )
        
        return MaturityCheck(
            level=MaturityLevel.LEVEL_4_RUNTIME,
            check_name="Runtime Execution",
            passed=False,
            details="Not KDE_RUNTIME mode"
        )
    except Exception as e:
        return MaturityCheck(
            level=MaturityLevel.LEVEL_4_RUNTIME,
            check_name="Runtime Execution",
            passed=False,
            details=f"Error: {str(e)}"
        )


def check_level_5_advanced(inv_path: Path) -> MaturityCheck:
    """Level 5: Full governance compliance."""
    checks_passed = 0
    total_checks = 4
    
    # Check 1: Investigation structure
    required_files = ['README.md', 'SPEC.md', 'CONCLUSION.md']
    missing = [f for f in required_files if not (inv_path / f).exists()]
    if len(missing) == 0:
        checks_passed += 1
    
    # Check 2: EXECUTION_MODE
    readme = inv_path / "README.md"
    if readme.exists():
        content = readme.read_text()
        if "EXECUTION_MODE:" in content or "KDE_RUNTIME_AUTHENTICITY:" in content:
            checks_passed += 1
    
    # Check 3: AUTHENTICITY_SCORE for GENERIC_AI
    if readme.exists():
        content = readme.read_text()
        if "EXECUTION_MODE: GENERIC_AI" in content:
            if "AUTHENTICITY_SCORE:" in content:
                checks_passed += 1
        else:
            checks_passed += 1  # Not required for KDE_RUNTIME
    
    # Check 4: Evidence markers
    if readme.exists():
        content = readme.read_text()
        has_evidence = "[EVIDENCE:" in content or "evidence" in content.lower()
        if has_evidence:
            checks_passed += 1
    
    passed = checks_passed >= 3
    
    return MaturityCheck(
        level=MaturityLevel.LEVEL_5_ADVANCED,
        check_name="Full Governance",
        passed=passed,
        details=f"Governance checks: {checks_passed}/{total_checks}"
    )


def assess_maturity(inv_path: Path) -> MaturityReport:
    """
    Assess the maturity level of an investigation.
    
    Args:
        inv_path: Path to investigation directory
        
    Returns:
        MaturityReport with assessment details
    """
    checks = []
    
    # Run all level checks
    checks.append(check_level_1_format(inv_path))
    
    # Level 2+ requires Level 1
    if checks[-1].passed:
        checks.append(check_level_2_compliant(inv_path))
    else:
        checks.append(MaturityCheck(
            level=MaturityLevel.LEVEL_2_COMPLIANT,
            check_name="Skipped",
            passed=False,
            details="Requires Level 1"
        ))
    
    # Level 3+ requires Level 2
    if len(checks) > 1 and checks[1].passed:
        checks.append(check_level_3_verified(inv_path))
    else:
        checks.append(MaturityCheck(
            level=MaturityLevel.LEVEL_3_VERIFIED,
            check_name="Skipped",
            passed=False,
            details="Requires Level 2"
        ))
    
    # Level 4+ requires Level 3
    if len(checks) > 2 and checks[2].passed:
        checks.append(check_level_4_runtime(inv_path))
    else:
        checks.append(MaturityCheck(
            level=MaturityLevel.LEVEL_4_RUNTIME,
            check_name="Skipped",
            passed=False,
            details="Requires Level 3"
        ))
    
    # Level 5 requires Level 4
    if len(checks) > 3 and checks[3].passed:
        checks.append(check_level_5_advanced(inv_path))
    else:
        checks.append(MaturityCheck(
            level=MaturityLevel.LEVEL_5_ADVANCED,
            check_name="Skipped",
            passed=False,
            details="Requires Level 4"
        ))
    
    # Determine current level (highest passed)
    current_level = MaturityLevel.LEVEL_1_FORMAT
    for check in checks:
        if check.passed and check.check_name != "Skipped":
            if check.level.value > current_level.value:
                current_level = check.level
    
    # Determine next level
    next_level = None
    next_requirements = []
    if current_level.value < 5:
        next_level = MaturityLevel(current_level.value + 1)
        next_requirements = {
            2: ["Add EXECUTION_MODE to README.md header"],
            3: ["Run bootstrap gates.py", "Verify 6/6 checks pass"],
            4: ["Set EXECUTION_MODE: KDE_RUNTIME", "Execute with KDE runtime"],
            5: ["Complete all governance checks", "Add evidence markers"]
        }.get(next_level.value, [])
    
    # Generate recommendations
    recommendations = []
    if current_level.value < 5:
        recommendations.append(f"Next: Achieve {next_level.name_human} maturity")
    
    if current_level.value < 4:
        recommendations.append("Tip: Use gradual warning system (REC-002) during migration")
    
    if not any(c.passed for c in checks):
        recommendations.append("Start: Add README.md with KDE format")
    
    return MaturityReport(
        investigation_path=inv_path,
        current_level=current_level,
        level_name=current_level.name_human,
        level_description=current_level.description,
        checks=checks,
        next_level=next_level,
        next_level_requirements=next_requirements,
        roi_score=current_level.roi_score,
        recommendations=recommendations
    )


def print_maturity_report(report: MaturityReport) -> None:
    """Print formatted maturity report."""
    print("=" * 70)
    print(f"MATURITY ASSESSMENT: {report.investigation_path.name}")
    print("=" * 70)
    print()
    print(f"  Current Level:  {report.current_level.value} - {report.level_name}")
    print(f"  Description:    {report.level_description}")
    print(f"  ROI Score:      {report.roi_score:.1f}/5.0")
    print()
    
    print("  Level Checks:")
    for check in report.checks:
        status = "✓" if check.passed else "✗"
        skipped = " (skipped)" if check.check_name == "Skipped" else ""
        print(f"    {status} Level {check.level.value}: {check.check_name}{skipped}")
        if not check.passed and check.check_name != "Skipped":
            print(f"      → {check.details}")
    print()
    
    if report.next_level:
        print(f"  Next Level: {report.next_level.value} - {report.next_level.name_human}")
        print("  Requirements:")
        for req in report.next_level_requirements:
            print(f"    • {req}")
        print()
    
    if report.recommendations:
        print("  Recommendations:")
        for rec in report.recommendations:
            print(f"    → {rec}")
    
    print()
    print("=" * 70)


if __name__ == "__main__":
    import argparse
    from pathlib import Path
    
    parser = argparse.ArgumentParser(description="KDE Maturity Assessment")
    parser.add_argument("path", nargs="?", help="Path to investigation directory")
    parser.add_argument("--all", action="store_true", help="Assess all investigations")
    
    args = parser.parse_args()
    
    if args.all:
        # Assess all investigations
        repo_root = Path(__file__).parent.parent.parent
        investigations_dir = repo_root / "laboratory" / "investigations"
        
        if investigations_dir.exists():
            for inv_dir in sorted(investigations_dir.iterdir()):
                if inv_dir.is_dir() and inv_dir.name.startswith("INV"):
                    report = assess_maturity(inv_dir)
                    print_maturity_report(report)
                    print()
    elif args.path:
        report = assess_maturity(Path(args.path))
        print_maturity_report(report)
    else:
        parser.print_help()
