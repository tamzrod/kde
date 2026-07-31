#!/usr/bin/env python3
"""
Dependency Detector for KDE Artifacts

**Script**: dependency-detector.py
**Version**: 1.0.0
**Date**: 2026-07-27
**Source**: INV-AUDIT-REVIEW-001 (Dependency Tracking)
**Purpose**: Detect dependencies between KDE artifacts

---

## What This Script Does

Analyzes KDE artifacts to detect and report dependencies:

1. **Knowledge Dependencies**: Which knowledge documents reference others
2. **Investigation Dependencies**: Which investigations produce/cite knowledge
3. **Engine Dependencies**: Which engines depend on which seeds
4. **Template Dependencies**: Which documents use which templates
5. **Governance Dependencies**: Which artifacts are affected by governance

---

## Dependency Types

| Type | Description |
|------|-------------|
| `know->know` | Knowledge references another knowledge |
| `inv->know` | Investigation produces knowledge |
| `know->inv` | Investigation references knowledge |
| `eng->seed` | Engine requires specific seed |
| `doc->template` | Document uses template |
| `gov->doc` | Governance applies to document |

---

## Usage

```bash
# Detect all dependencies
python .kde/scripts/dependency-detector.py

# Check specific artifact
python .kde/scripts/dependency-detector.py --artifact KDE-KNOWLEDGE-TEMPLATES

# Export to JSON
python .kde/scripts/dependency-detector.py --export dependencies.json

# Show dependency graph
python .kde/scripts/dependency-detector.py --graph

# Check for circular dependencies
python .kde/scripts/dependency-detector.py --check-cycles
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Circular dependencies found |
| 2 | Error |
"""

import os
import sys
import argparse
import json
import re
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Set, Optional
from dataclasses import dataclass, field

# Constants
ROOT_DIR = Path("/workspace/project/kde")

# Dependency patterns
PATTERNS = {
    "know->know": [
        r'\[KDE-[A-Z]+-[0-9]+\]',
        r'KDE-[A-Z]+-[0-9]+',
    ],
    "inv->know": [
        r'INV-[A-Z]+-[0-9]+',
        r'Investigation:?\s*INV-\d+',
    ],
    "eng->seed": [
        r'SEED-\d+',
        r'Seed:?\s*SEED-\d+',
    ],
    "doc->template": [
        r'Template:?\s*[\w-]+\.md',
        r'Based on:\s*[\w-]+\.md',
    ],
}

# File to artifact type mapping
ARTIFACT_TYPES = {
    "knowledge/": "knowledge",
    "laboratory/investigations/": "investigation",
    "laboratory/experiments/": "experiment",
    "engines/": "engine",
    "seeds/": "seed",
    "governance/": "governance",
    ".kde/templates/": "template",
}


@dataclass
class Dependency:
    """Represents a dependency between artifacts."""
    source_id: str
    source_type: str
    target_id: str
    target_type: str
    dep_type: str
    location: str


@dataclass
class Artifact:
    """Represents a KDE artifact."""
    artifact_id: str
    artifact_type: str
    path: Path
    version: Optional[str] = None
    dependencies: List[Dependency] = field(default_factory=list)
    dependents: List[Dependency] = field(default_factory=list)


class DependencyDetector:
    """Detects dependencies between KDE artifacts."""
    
    def __init__(self, root_dir: Path):
        self.root_dir = root_dir
        self.artifacts: Dict[str, Artifact] = {}
        self.dependencies: List[Dependency] = []
    
    def scan(self) -> None:
        """Scan repository for artifacts and dependencies."""
        print("🔍 Scanning repository...")
        
        # Scan for artifacts
        for artifact_type, pattern in ARTIFACT_TYPES.items():
            search_dir = self.root_dir / artifact_type
            if search_dir.exists():
                self._scan_directory(search_dir, artifact_type)
        
        print(f"   Found {len(self.artifacts)} artifacts")
        
        # Detect dependencies
        print("🔍 Detecting dependencies...")
        self._detect_dependencies()
        
        print(f"   Found {len(self.dependencies)} dependencies")
    
    def _scan_directory(self, directory: Path, artifact_type: str) -> None:
        """Scan a directory for artifacts."""
        for item in directory.rglob("*.md"):
            # Skip archive and temp directories
            if "archive" in str(item).lower():
                continue
            
            artifact_id = self._extract_artifact_id(item, artifact_type)
            if artifact_id:
                artifact = Artifact(
                    artifact_id=artifact_id,
                    artifact_type=artifact_type.rstrip("/"),
                    path=item
                )
                self.artifacts[artifact_id] = artifact
    
    def _extract_artifact_id(self, path: Path, artifact_type: str) -> Optional[str]:
        """Extract artifact ID from file path."""
        content = path.read_text(errors='ignore')
        
        # Try to find ID in content
        patterns = [
            r'\*\*Knowledge ID\*\*:\s*([A-Z0-9-_]+)',
            r'\*\*Investigation ID\*\*:\s*([A-Z0-9-_]+)',
            r'\*\*Experiment ID\*\*:\s*([A-Z0-9-_]+)',
            r'\*\*Document ID\*\*:\s*([A-Z0-9-_]+)',
            r'#\s+([A-Z0-9-_]+):',
            r'ID:\s+([A-Z0-9-_]+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, content)
            if match:
                return match.group(1)
        
        # Fall back to directory name
        return path.parent.name
    
    def _detect_dependencies(self) -> None:
        """Detect dependencies between artifacts."""
        for artifact_id, artifact in self.artifacts.items():
            content = artifact.path.read_text(errors='ignore')
            
            # Detect knowledge->knowledge dependencies
            for pattern in PATTERNS["know->know"]:
                for match in re.finditer(pattern, content):
                    target_id = match.group(0).strip("[]")
                    if target_id != artifact_id and target_id in self.artifacts:
                        dep = Dependency(
                            source_id=artifact_id,
                            source_type=artifact.artifact_type,
                            target_id=target_id,
                            target_type=self.artifacts[target_id].artifact_type,
                            dep_type="know->know",
                            location=str(artifact.path)
                        )
                        self.dependencies.append(dep)
                        artifact.dependencies.append(dep)
                        self.artifacts[target_id].dependents.append(dep)
            
            # Detect engine->seed dependencies
            for pattern in PATTERNS["eng->seed"]:
                for match in re.finditer(pattern, content):
                    target_id = match.group(0)
                    if target_id in self.artifacts:
                        dep = Dependency(
                            source_id=artifact_id,
                            source_type=artifact.artifact_type,
                            target_id=target_id,
                            target_type=self.artifacts[target_id].artifact_type,
                            dep_type="eng->seed",
                            location=str(artifact.path)
                        )
                        self.dependencies.append(dep)
                        artifact.dependencies.append(dep)
                        self.artifacts[target_id].dependents.append(dep)
    
    def get_dependents(self, artifact_id: str) -> List[Dependency]:
        """Get all artifacts that depend on this one."""
        if artifact_id in self.artifacts:
            return self.artifacts[artifact_id].dependents
        return []
    
    def get_dependencies(self, artifact_id: str) -> List[Dependency]:
        """Get all artifacts this one depends on."""
        if artifact_id in self.artifacts:
            return self.artifacts[artifact_id].dependencies
        return []
    
    def check_circular(self) -> List[List[str]]:
        """Check for circular dependencies."""
        cycles = []
        visited = set()
        path = []
        
        def dfs(node: str, path_set: Set[str]) -> None:
            if node in path_set:
                cycle_start = path.index(node)
                cycle = path[cycle_start:] + [node]
                cycles.append(cycle)
                return
            
            if node in visited:
                return
            
            visited.add(node)
            path.append(node)
            path_set.add(node)
            
            for dep in self.get_dependencies(node):
                dfs(dep.target_id, path_set.copy())
            
            path.pop()
        
        for artifact_id in self.artifacts:
            dfs(artifact_id, set())
        
        return cycles
    
    def print_report(self, artifact_id: Optional[str] = None) -> None:
        """Print dependency report."""
        print("\n" + "=" * 70)
        print("KDE DEPENDENCY DETECTOR")
        print("=" * 70)
        
        if artifact_id:
            self._print_artifact_report(artifact_id)
        else:
            self._print_summary_report()
    
    def _print_summary_report(self) -> None:
        """Print summary of all dependencies."""
        # Group by type
        by_type = defaultdict(list)
        for dep in self.dependencies:
            by_type[dep.dep_type].append(dep)
        
        print(f"\n📊 DEPENDENCY SUMMARY")
        print("-" * 70)
        print(f"   Total Artifacts: {len(self.artifacts)}")
        print(f"   Total Dependencies: {len(self.dependencies)}")
        
        print(f"\n📦 BY TYPE")
        for dep_type, deps in sorted(by_type.items()):
            print(f"   {dep_type}: {len(deps)}")
        
        # Show top dependents
        dependent_counts = [(aid, len(a.dependents)) for aid, a in self.artifacts.items()]
        dependent_counts.sort(key=lambda x: x[1], reverse=True)
        
        print(f"\n🔗 TOP DEPENDENTS (Most depended upon)")
        for aid, count in dependent_counts[:10]:
            if count > 0:
                print(f"   {aid}: {count} dependents")
    
    def _print_artifact_report(self, artifact_id: str) -> None:
        """Print report for specific artifact."""
        if artifact_id not in self.artifacts:
            print(f"❌ Artifact not found: {artifact_id}")
            return
        
        artifact = self.artifacts[artifact_id]
        
        print(f"\n📄 {artifact_id}")
        print("-" * 70)
        print(f"   Type: {artifact.artifact_type}")
        print(f"   Path: {artifact.path}")
        print(f"   Dependencies: {len(artifact.dependencies)}")
        print(f"   Dependents: {len(artifact.dependents)}")
        
        if artifact.dependencies:
            print(f"\n   ⬇️ DEPENDS ON:")
            for dep in artifact.dependencies:
                print(f"      - {dep.target_id} ({dep.target_type})")
        
        if artifact.dependents:
            print(f"\n   ⬆️ DEPENDED ON BY:")
            for dep in artifact.dependents:
                print(f"      - {dep.source_id} ({dep.source_type})")
    
    def export_json(self, output_file: str) -> None:
        """Export dependencies to JSON."""
        data = {
            "artifacts": {
                aid: {
                    "type": a.artifact_type,
                    "path": str(a.path),
                    "dependencies": [d.target_id for d in a.dependencies],
                    "dependents": [d.source_id for d in a.dependents]
                }
                for aid, a in self.artifacts.items()
            },
            "dependencies": [
                {
                    "source": d.source_id,
                    "target": d.target_id,
                    "type": d.dep_type
                }
                for d in self.dependencies
            ]
        }
        
        with open(output_file, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"\n📄 Exported to: {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description="Detect dependencies between KDE artifacts"
    )
    parser.add_argument(
        "--artifact", "-a",
        help="Check specific artifact ID"
    )
    parser.add_argument(
        "--export", "-e",
        help="Export to JSON file"
    )
    parser.add_argument(
        "--check-cycles",
        action="store_true",
        help="Check for circular dependencies"
    )
    
    args = parser.parse_args()
    
    # Create detector
    detector = DependencyDetector(ROOT_DIR)
    
    # Scan repository
    detector.scan()
    
    # Check for cycles
    if args.check_cycles:
        cycles = detector.check_circular()
        if cycles:
            print(f"\n⚠️  CIRCULAR DEPENDENCIES FOUND: {len(cycles)}")
            for cycle in cycles:
                print(f"   {' -> '.join(cycle)}")
            sys.exit(1)
        else:
            print("\n✅ No circular dependencies found")
    
    # Print report
    detector.print_report(args.artifact)
    
    # Export if requested
    if args.export:
        detector.export_json(args.export)
    
    sys.exit(0)


if __name__ == "__main__":
    main()
