#!/usr/bin/env python3
"""
Archive Detector for KDE Investigations and Experiments

**Script**: archive-detector.py
**Version**: 1.0.0
**Date**: 2026-07-27
**Source**: INV-AUDIT-REVIEW-001 (Archive Compliance)
**Purpose**: Detect investigations and experiments eligible for archiving

---

## What This Script Does

Per SOP-ARCHIVE, investigations and experiments MAY be archived when:
1. Status is COMPLETE
2. Age > 90 days since last update
3. Not actively referenced in current work
4. Either superseded OR no pending recommendations

This script detects candidates meeting criteria 1-2 and reports them.

---

## Usage

```bash
# Detect all archive candidates
python .kde/scripts/archive-detector.py

# Show only investigations
python .kde/scripts/archive-detector.py --type investigations

# Show only experiments
python .kde/scripts/archive-detector.py --type experiments

# Verbose output with details
python .kde/scripts/archive-detector.py --verbose

# Export to CSV
python .kde/scripts/archive-detector.py --export archive-candidates.csv
```

---

## Archive Eligibility Criteria

| Criterion | Threshold | Notes |
|-----------|-----------|-------|
| Completion | COMPLETE status | Required |
| Age | >90 days since last update | Required |
| Relevance | Not referenced | Check with --verbose |
| Replacement | Superseded OR no pending recs | Manual review |

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success, candidates found |
| 1 | No candidates found |
| 2 | Error |

"""

import os
import sys
import argparse
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Optional
import csv

# Constants
ROOT_DIR = Path("/workspace/project/kde")
INVESTIGATIONS_DIR = ROOT_DIR / "laboratory" / "investigations"
EXPERIMENTS_DIR = ROOT_DIR / "laboratory" / "experiments"
ARCHIVE_AGE_DAYS = 90
COMPLETE_STATUSES = ["COMPLETE", "COMPLETED", "DONE", "PROMOTED"]


class ArchiveCandidate:
    """Represents an investigation or experiment eligible for archiving."""
    
    def __init__(
        self,
        artifact_type: str,
        artifact_id: str,
        path: Path,
        status: str,
        last_modified: datetime,
        days_since_modified: int,
        is_complete: bool
    ):
        self.artifact_type = artifact_type
        self.artifact_id = artifact_id
        self.path = path
        self.status = status
        self.last_modified = last_modified
        self.days_since_modified = days_since_modified
        self.is_complete = is_complete
        self.archive_eligible = False
        self.archive_reason = ""
        self.archive_category = ""
    
    def assess_eligibility(self, referenced_ids: set) -> None:
        """Assess whether this candidate should be archived."""
        if not self.is_complete:
            self.archive_eligible = False
            self.archive_reason = "Status is not COMPLETE"
            return
        
        if self.days_since_modified < ARCHIVE_AGE_DAYS:
            self.archive_eligible = False
            self.archive_reason = f"Age ({self.days_since_modified} days) below threshold ({ARCHIVE_AGE_DAYS} days)"
            return
        
        if self.artifact_id in referenced_ids:
            self.archive_eligible = False
            self.archive_reason = "Actively referenced by other artifacts"
            return
        
        # Eligible
        self.archive_eligible = True
        self.archive_reason = "Meets all criteria for archiving"
        self.archive_category = self._determine_category()
    
    def _determine_category(self) -> str:
        """Determine the appropriate archive category."""
        status_lower = self.status.lower()
        if "supersed" in status_lower:
            return "SUPERSEDED"
        elif "deprecated" in status_lower:
            return "DEPRECATED"
        else:
            return "HISTORICAL"
    
    def to_dict(self) -> dict:
        """Convert to dictionary for export."""
        return {
            "artifact_type": self.artifact_type,
            "artifact_id": self.artifact_id,
            "path": str(self.path),
            "status": self.status,
            "last_modified": self.last_modified.strftime("%Y-%m-%d"),
            "days_since_modified": self.days_since_modified,
            "archive_eligible": "YES" if self.archive_eligible else "NO",
            "archive_category": self.archive_category,
            "archive_reason": self.archive_reason
        }


def parse_frontmatter_status(content: str) -> Optional[str]:
    """Parse status from markdown frontmatter or header."""
    lines = content.split('\n')
    
    # Check frontmatter
    in_frontmatter = False
    for line in lines:
        if line.strip() == '---':
            if in_frontmatter:
                break
            in_frontmatter = True
            continue
        if in_frontmatter:
            if line.startswith('status:'):
                return line.split(':', 1)[1].strip().upper()
            if line.startswith('Status:'):
                return line.split(':', 1)[1].strip().upper()
    
    # Check header with various formats
    for line in lines[:30]:
        line_clean = line.strip()
        
        # **Status**: ACTIVE or **Status** ACTIVE format
        if '**Status**' in line or '**status**' in line:
            # Remove bold markers and get status
            status_part = line.replace('**Status**', '').replace('**status**', '').strip()
            status_part = status_part.lstrip('*').strip()
            if status_part.startswith(':'):
                status_part = status_part[1:].strip()
            if status_part:
                return status_part.strip('*').upper()
        
        # **Investigation Status**: COMPLETE format
        if '**Investigation Status**' in line:
            status_part = line.replace('**Investigation Status**', '').strip()
            if status_part.startswith(':'):
                status_part = status_part[1:].strip()
            if status_part:
                return status_part.strip('*').upper()
        
        # **Experiment Status**: format
        if '**Experiment Status**' in line:
            status_part = line.replace('**Experiment Status**', '').strip()
            if status_part.startswith(':'):
                status_part = status_part[1:].strip()
            if status_part:
                return status_part.strip('*').upper()
    
    return None


def find_main_file(path: Path) -> Optional[Path]:
    """Find the main investigation/experiment file."""
    candidates = [
        path / "INVESTIGATION.md",
        path / "investigation.md",
        path / "EXPERIMENT.md",
        path / "experiment.md",
        path / "README.md",
        path / "readme.md"
    ]
    
    for candidate in candidates:
        if candidate.exists():
            return candidate
    
    return None


def get_last_modified(path: Path) -> datetime:
    """Get the last modification time of a directory or its files."""
    if path.is_file():
        return datetime.fromtimestamp(path.stat().st_mtime)
    
    # Get the most recent file modification time
    max_time = datetime.fromtimestamp(path.stat().st_mtime)
    for file_path in path.rglob("*"):
        if file_path.is_file():
            file_time = datetime.fromtimestamp(file_path.stat().st_mtime)
            if file_time > max_time:
                max_time = file_time
    
    return max_time


def scan_artifacts(
    artifact_type: str,
    scan_dir: Path,
    referenced_ids: set
) -> List[ArchiveCandidate]:
    """Scan a directory for artifacts eligible for archiving."""
    candidates = []
    
    if not scan_dir.exists():
        print(f"⚠️  Directory not found: {scan_dir}")
        return candidates
    
    for item in scan_dir.iterdir():
        if not item.is_dir():
            continue
        
        artifact_id = item.name
        
        # Skip archive directories
        if "archive" in artifact_id.lower():
            continue
        
        # Find main file
        main_file = find_main_file(item)
        if not main_file:
            continue
        
        # Parse status
        try:
            content = main_file.read_text()
            status = parse_frontmatter_status(content)
        except Exception as e:
            print(f"⚠️  Error reading {main_file}: {e}")
            status = None
        
        if not status:
            status = "UNKNOWN"
        
        # Check if complete
        is_complete = any(cs in status for cs in COMPLETE_STATUSES)
        
        # Get last modified
        last_modified = get_last_modified(item)
        days_since = (datetime.now() - last_modified).days
        
        # Create candidate
        candidate = ArchiveCandidate(
            artifact_type=artifact_type,
            artifact_id=artifact_id,
            path=item,
            status=status,
            last_modified=last_modified,
            days_since_modified=days_since,
            is_complete=is_complete
        )
        
        # Assess eligibility
        candidate.assess_eligibility(referenced_ids)
        
        candidates.append(candidate)
    
    return candidates


def find_referenced_ids() -> set:
    """Find IDs referenced in current artifacts."""
    referenced = set()
    
    # Search for references in investigations and experiments
    for search_dir in [INVESTIGATIONS_DIR, EXPERIMENTS_DIR]:
        if not search_dir.exists():
            continue
        
        for item in search_dir.rglob("*.md"):
            # Skip archive directories
            if "archive" in str(item).lower():
                continue
            
            try:
                content = item.read_text()
                # Look for INV-XXX or LAB-XXX patterns
                import re
                ids = re.findall(r'(INV-\d+|LAB-\d+)', content)
                referenced.update(ids)
            except Exception:
                pass
    
    return referenced


def print_candidates(candidates: List[ArchiveCandidate], verbose: bool = False) -> None:
    """Print archive candidates."""
    
    eligible = [c for c in candidates if c.archive_eligible]
    ineligible = [c for c in candidates if not c.archive_eligible]
    
    print("\n" + "=" * 70)
    print("KDE ARCHIVE DETECTOR")
    print("=" * 70)
    print(f"Scanned: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Archive Threshold: {ARCHIVE_AGE_DAYS} days")
    print("-" * 70)
    
    print(f"\n📊 SUMMARY")
    print(f"   Total scanned: {len(candidates)}")
    print(f"   Eligible for archive: {len(eligible)}")
    print(f"   Not yet eligible: {len(ineligible)}")
    
    if eligible:
        print(f"\n✅ ELIGIBLE FOR ARCHIVING ({len(eligible)})")
        print("-" * 70)
        
        for candidate in sorted(eligible, key=lambda c: c.days_since_modified, reverse=True):
            print(f"\n   [{candidate.archive_category}] {candidate.artifact_id}")
            print(f"   Status: {candidate.status}")
            print(f"   Age: {candidate.days_since_modified} days")
            print(f"   Path: {candidate.path}")
            
            if verbose:
                print(f"   Last Modified: {candidate.last_modified.strftime('%Y-%m-%d')}")
                print(f"   Reason: {candidate.archive_reason}")
    
    if verbose and ineligible:
        print(f"\n❌ NOT YET ELIGIBLE ({len(ineligible)})")
        print("-" * 70)
        
        for candidate in sorted(ineligible, key=lambda c: c.days_since_modified, reverse=True):
            print(f"\n   {candidate.artifact_id}")
            print(f"   Status: {candidate.status} | Age: {candidate.days_since_modified} days")
            print(f"   Reason: {candidate.archive_reason}")


def export_csv(candidates: List[ArchiveCandidate], output_file: str) -> None:
    """Export candidates to CSV."""
    
    with open(output_file, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=[
            "artifact_type", "artifact_id", "path", "status",
            "last_modified", "days_since_modified", "archive_eligible",
            "archive_category", "archive_reason"
        ])
        writer.writeheader()
        
        for candidate in candidates:
            writer.writerow(candidate.to_dict())
    
    print(f"\n📄 Exported to: {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description="Detect investigations and experiments eligible for archiving"
    )
    parser.add_argument(
        "--type",
        choices=["investigations", "experiments", "all"],
        default="all",
        help="Type of artifact to scan"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Show detailed output"
    )
    parser.add_argument(
        "--export", "-e",
        help="Export results to CSV file"
    )
    
    args = parser.parse_args()
    
    # Find referenced IDs
    print("🔍 Scanning for referenced artifacts...")
    referenced_ids = find_referenced_ids()
    print(f"   Found {len(referenced_ids)} referenced IDs")
    
    # Scan artifacts
    candidates = []
    
    if args.type in ["investigations", "all"]:
        print(f"🔍 Scanning investigations...")
        candidates.extend(scan_artifacts("investigation", INVESTIGATIONS_DIR, referenced_ids))
    
    if args.type in ["experiments", "all"]:
        print(f"🔍 Scanning experiments...")
        candidates.extend(scan_artifacts("experiment", EXPERIMENTS_DIR, referenced_ids))
    
    # Print results
    print_candidates(candidates, args.verbose)
    
    # Export if requested
    if args.export:
        export_csv(candidates, args.export)
    
    # Exit code
    eligible = [c for c in candidates if c.archive_eligible]
    if not eligible:
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
