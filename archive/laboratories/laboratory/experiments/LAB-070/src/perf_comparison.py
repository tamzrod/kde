"""
Performance Comparison: MD→AI vs Synthesized→AI

Compares two AI interaction approaches:
- Raw Path: Direct markdown processing
- Synthesized Path: Pre-compiled JSON processing

Measures: result quality, speed, file size.
"""

import os
import json
import time
import hashlib
from pathlib import Path
from dataclasses import dataclass, field, asdict
from typing import Dict, List, Tuple, Any, Optional
from datetime import datetime


@dataclass
class FileMetrics:
    """File size and count metrics."""
    path: str
    file_count: int
    total_bytes: int
    avg_bytes_per_file: float
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class TimingMetrics:
    """Timing measurements."""
    operation: str
    start_time: float
    end_time: float
    duration_ms: float
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class ComparisonResult:
    """Result of comparing two approaches."""
    task: str
    raw_output: Any
    synthesized_output: Any
    match: bool
    match_percentage: float
    raw_time_ms: float
    synthesized_time_ms: float
    speedup: float  # raw_time / synthesized_time
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "task": self.task,
            "match": self.match,
            "match_percentage": self.match_percentage,
            "raw_time_ms": self.raw_time_ms,
            "synthesized_time_ms": self.synthesized_time_ms,
            "speedup": self.speedup
        }


@dataclass
class BenchmarkResult:
    """Complete benchmark result."""
    timestamp: str
    tasks: List[ComparisonResult]
    raw_file_metrics: FileMetrics
    synthesized_file_metrics: FileMetrics
    overall_match_pct: float
    avg_speedup: float
    compression_ratio: float
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "timestamp": self.timestamp,
            "tasks": [t.to_dict() for t in self.tasks],
            "raw_file_metrics": self.raw_file_metrics.to_dict(),
            "synthesized_file_metrics": self.synthesized_file_metrics.to_dict(),
            "overall_match_pct": self.overall_match_pct,
            "avg_speedup": self.avg_speedup,
            "compression_ratio": self.compression_ratio
        }


class MDFileProcessor:
    """Process raw markdown files (simulates AI parsing)."""
    
    @staticmethod
    def load_file(path: Path) -> str:
        """Load raw markdown file."""
        return path.read_text(encoding='utf-8')
    
    @staticmethod
    def parse_principles(content: str) -> List[str]:
        """Parse principles from markdown."""
        principles = []
        # Extract from headers and lists
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            if line.startswith('**') and '**:' in line:
                # Definition format: **Term**: Definition
                term = line.split('**')[1] if '**' in line else line
                principles.append(term)
            elif line.startswith('- ') or line.startswith('* '):
                # List format
                principles.append(line[2:].strip())
        return principles[:5]  # Return first 5
    
    @staticmethod
    def parse_tables(content: str) -> List[Dict[str, str]]:
        """Parse tables from markdown."""
        tables = []
        current_table = []
        in_table = False
        
        for line in content.split('\n'):
            line = line.strip()
            
            if line.startswith('|'):
                if not in_table:
                    in_table = True
                    current_table = []
                cells = [c.strip() for c in line.split('|')[1:-1]]
                current_table.append(cells)
            elif in_table:
                if current_table:
                    tables.append(current_table)
                in_table = False
                current_table = []
        
        if current_table:
            tables.append(current_table)
        
        return tables
    
    @staticmethod
    def count_models(content: str) -> Dict[str, int]:
        """Count model types in markdown."""
        counts = {
            'evidence_model': 0,
            'knowledge_model': 0,
            'confidence_model': 0,
            'scientific_loop': 0,
            'ambiguity': 0
        }
        
        content_lower = content.lower()
        
        if 'evidence' in content_lower:
            counts['evidence_model'] = content_lower.count('evidence')
        if 'knowledge' in content_lower:
            counts['knowledge_model'] = content_lower.count('knowledge')
        if 'confidence' in content_lower:
            counts['confidence_model'] = content_lower.count('confidence')
        if 'scientific' in content_lower or 'loop' in content_lower:
            counts['scientific_loop'] = content_lower.count('scientific')
        if 'ambiguity' in content_lower:
            counts['ambiguity'] = content_lower.count('ambiguity')
        
        return counts
    
    @staticmethod
    def extract_methods(content: str) -> List[str]:
        """Extract interface methods from markdown."""
        methods = []
        # Look for method definitions
        import re
        pattern = r'([A-Z][a-z]+)\s*\('
        matches = re.findall(pattern, content)
        methods.extend(matches)
        return list(set(methods))  # Unique


class SynthesizedFileProcessor:
    """Process pre-compiled JSON files (direct access)."""
    
    @staticmethod
    def load_file(path: Path) -> Dict[str, Any]:
        """Load compiled JSON file."""
        with open(path, 'r') as f:
            return json.load(f)
    
    @staticmethod
    def parse_principles(compiled: Dict[str, Any]) -> List[str]:
        """Extract principles from compiled format."""
        principles = []
        
        # Try lists
        if 'content' in compiled and 'lists' in compiled['content']:
            principles.extend(compiled['content']['lists'][:5])
        
        # Try definitions
        if 'content' in compiled and 'definitions' in compiled['content']:
            for defn in compiled['content']['definitions']:
                if 'term' in defn:
                    principles.append(defn['term'])
        
        return principles[:5]
    
    @staticmethod
    def parse_tables(compiled: Dict[str, Any]) -> List[List]:
        """Extract tables from compiled format."""
        if 'content' in compiled and 'tables' in compiled['content']:
            return compiled['content']['tables']
        return []
    
    @staticmethod
    def count_models(compiled: Dict[str, Any]) -> Dict[str, int]:
        """Count model types from compiled format."""
        counts = {
            'evidence_model': 0,
            'knowledge_model': 0,
            'confidence_model': 0,
            'scientific_loop': 0,
            'ambiguity': 0
        }
        
        comp_type = compiled.get('type', '')
        if comp_type == 'evidence_model':
            counts['evidence_model'] = 1
        elif comp_type == 'knowledge_model':
            counts['knowledge_model'] = 1
        elif comp_type == 'confidence_model':
            counts['confidence_model'] = 1
        elif comp_type == 'scientific_loop':
            counts['scientific_loop'] = 1
        elif comp_type == 'ambiguity':
            counts['ambiguity'] = 1
        
        return counts
    
    @staticmethod
    def extract_methods(compiled: Dict[str, Any]) -> List[str]:
        """Extract methods from compiled format."""
        methods = []
        
        if 'content' in compiled and 'lists' in compiled['content']:
            for item in compiled['content']['lists']:
                if '(' in item:
                    method = item.split('(')[0].strip()
                    methods.append(method)
        
        return methods


class PerformanceComparator:
    """Compare raw MD vs synthesized JSON processing."""
    
    def __init__(self, 
                 raw_base: str = "/workspace/project/kde/seeds/seed-001",
                 synthesized_base: str = "/workspace/project/kde/laboratory/experiments/LAB-069/compiled/seed"):
        self.raw_base = Path(raw_base)
        self.synthesized_base = Path(synthesized_base)
        self.raw_processor = MDFileProcessor()
        self.synthesized_processor = SynthesizedFileProcessor()
        self.results = []
    
    def measure_file_sizes(self) -> Tuple[FileMetrics, FileMetrics]:
        """Measure file sizes for both paths."""
        # Raw files
        raw_files = list(self.raw_base.rglob("*.md"))
        raw_files += list(self.raw_base.rglob("*.yaml"))
        raw_total = sum(f.stat().st_size for f in raw_files if f.is_file())
        
        raw_metrics = FileMetrics(
            path=str(self.raw_base),
            file_count=len(raw_files),
            total_bytes=raw_total,
            avg_bytes_per_file=raw_total / max(len(raw_files), 1)
        )
        
        # Synthesized files
        synthesized_files = list(self.synthesized_base.rglob("*.json"))
        synthesized_total = sum(f.stat().st_size for f in synthesized_files if f.is_file())
        
        synthesized_metrics = FileMetrics(
            path=str(self.synthesized_base),
            file_count=len(synthesized_files),
            total_bytes=synthesized_total,
            avg_bytes_per_file=synthesized_total / max(len(synthesized_files), 1)
        )
        
        return raw_metrics, synthesized_metrics
    
    def run_task(self, task: str, raw_files: List[Path], 
                 synthesized_files: List[Path]) -> ComparisonResult:
        """Run a comparison task."""
        
        # Raw path timing
        raw_start = time.perf_counter()
        raw_output = self._process_raw(task, raw_files)
        raw_time = (time.perf_counter() - raw_start) * 1000
        
        # Synthesized path timing
        synthesized_start = time.perf_counter()
        synthesized_output = self._process_synthesized(task, synthesized_files)
        synthesized_time = (time.perf_counter() - synthesized_start) * 1000
        
        # Compare outputs
        match = self._compare_outputs(raw_output, synthesized_output)
        match_pct = 100.0 if match else self._calculate_similarity(raw_output, synthesized_output)
        
        speedup = raw_time / synthesized_time if synthesized_time > 0 else 0
        
        result = ComparisonResult(
            task=task,
            raw_output=raw_output,
            synthesized_output=synthesized_output,
            match=match,
            match_percentage=match_pct,
            raw_time_ms=raw_time,
            synthesized_time_ms=synthesized_time,
            speedup=speedup
        )
        
        self.results.append(result)
        return result
    
    def _process_raw(self, task: str, files: List[Path]) -> Any:
        """Process files using raw markdown approach."""
        all_content = []
        for f in files:
            content = self.raw_processor.load_file(f)
            all_content.append(content)
        
        combined = '\n'.join(all_content)
        
        if task == 'principles':
            return self.raw_processor.parse_principles(combined)
        elif task == 'models':
            return self.raw_processor.count_models(combined)
        elif task == 'methods':
            return self.raw_processor.extract_methods(combined)
        elif task == 'tables':
            return self.raw_processor.parse_tables(combined)
        
        return combined
    
    def _process_synthesized(self, task: str, files: List[Path]) -> Any:
        """Process files using synthesized approach."""
        all_compiled = []
        for f in files:
            compiled = self.synthesized_processor.load_file(f)
            all_compiled.append(compiled)
        
        if task == 'principles':
            results = []
            for c in all_compiled:
                results.extend(self.synthesized_processor.parse_principles(c))
            return list(set(results))[:5]
        elif task == 'models':
            totals = {k: 0 for k in ['evidence_model', 'knowledge_model', 
                                       'confidence_model', 'scientific_loop', 'ambiguity']}
            for c in all_compiled:
                counts = self.synthesized_processor.count_models(c)
                for k, v in counts.items():
                    totals[k] += v
            return totals
        elif task == 'methods':
            results = []
            for c in all_compiled:
                results.extend(self.synthesized_processor.extract_methods(c))
            return list(set(results))
        elif task == 'tables':
            results = []
            for c in all_compiled:
                results.extend(self.synthesized_processor.parse_tables(c))
            return results
        
        return all_compiled
    
    def _compare_outputs(self, raw: Any, synthesized: Any) -> bool:
        """Check if outputs are identical."""
        if isinstance(raw, list) and isinstance(synthesized, list):
            return set(str(x).lower() for x in raw) == set(str(x).lower() for x in synthesized)
        elif isinstance(raw, dict) and isinstance(synthesized, dict):
            return raw == synthesized
        else:
            return str(raw).lower() == str(synthesized).lower()
    
    def _calculate_similarity(self, raw: Any, synthesized: Any) -> float:
        """Calculate similarity percentage."""
        if isinstance(raw, list) and isinstance(synthesized, list):
            raw_set = set(str(x).lower() for x in raw)
            syn_set = set(str(x).lower() for x in synthesized)
            if not raw_set:
                return 100.0
            overlap = len(raw_set & syn_set)
            return (overlap / len(raw_set)) * 100
        elif isinstance(raw, dict) and isinstance(synthesized, dict):
            matching = sum(1 for k in raw if k in synthesized and raw[k] == synthesized[k])
            total = max(len(raw), len(synthesized), 1)
            return (matching / total) * 100
        else:
            return 100.0 if str(raw).lower() == str(synthesized).lower() else 0.0
    
    def run_benchmark(self) -> BenchmarkResult:
        """Run complete benchmark."""
        # File sizes
        raw_metrics, synthesized_metrics = self.measure_file_sizes()
        
        # Get file lists
        raw_files = [f for f in self.raw_base.rglob("*.md") if f.is_file()]
        synthesized_files = [f for f in self.synthesized_base.rglob("*.json") if f.is_file()]
        
        # Run tasks
        tasks_results = []
        
        # Task 1: Principles
        result1 = self.run_task('principles', raw_files, synthesized_files)
        tasks_results.append(result1)
        
        # Task 2: Models
        result2 = self.run_task('models', raw_files, synthesized_files)
        tasks_results.append(result2)
        
        # Task 3: Methods (use interface)
        interface_raw = list(Path("/workspace/project/kde/engines").rglob("interface.md"))
        interface_syn = list(self.synthesized_base.parent.rglob("*interface*.json"))
        
        if interface_raw and interface_syn:
            result3 = self.run_task('methods', interface_raw, interface_syn[:1])
            tasks_results.append(result3)
        
        # Calculate overall metrics
        overall_match = sum(r.match_percentage for r in tasks_results) / max(len(tasks_results), 1)
        avg_speedup = sum(r.speedup for r in tasks_results) / max(len(tasks_results), 1)
        compression = synthesized_metrics.total_bytes / max(raw_metrics.total_bytes, 1)
        
        return BenchmarkResult(
            timestamp=datetime.utcnow().isoformat() + "Z",
            tasks=tasks_results,
            raw_file_metrics=raw_metrics,
            synthesized_file_metrics=synthesized_metrics,
            overall_match_pct=overall_match,
            avg_speedup=avg_speedup,
            compression_ratio=compression
        )


class MethodNamer:
    """Evaluate and suggest names for the synthesized method."""
    
    CANDIDATE_NAMES = {
        "Indexed Path": {
            "concept": "Book index for fast lookup",
            "pros": ["Implies O(1) access", "Familiar metaphor"],
            "cons": ["Suggests search functionality", "May confuse with search indexing"]
        },
        "Hydrated Format": {
            "concept": "Dry content + structure water",
            "pros": ["Adds machine-readable structure", "Intuitive"],
            "cons": ["Unusual term", "Vague"]
        },
        "Pre-digested": {
            "concept": "Food processed before eating",
            "pros": ["Clear that AI gets ready-to-use data", "Descriptive"],
            "cons": ["Unusual for software", "Slightly gross"]
        },
        "Structured Encoding": {
            "concept": "Normalized data representation",
            "pros": ["Technical accuracy", "Clear meaning"],
            "cons": ["Generic", "Boring"]
        },
        "Dense Pack": {
            "concept": "Compressed, efficient format",
            "pros": ["Implies efficiency", "Short name"],
            "cons": ["May suggest lossy compression", "Ambiguous"]
        },
        "Compiled Artifact": {
            "concept": "Like compiled vs interpreted code",
            "pros": ["Familiar concept", "Builds on LAB-069 terminology"],
            "cons": ["May confuse with compilation process"]
        },
        "Optimized Serialization": {
            "concept": "Optimized for transfer",
            "pros": ["Technical accuracy", "Describes process"],
            "cons": ["Verbose", "Too technical"]
        },
        "Normalized Pipeline": {
            "concept": "Standardized processing",
            "pros": ["Implies consistency", "Professional"],
            "cons": ["Generic", "Doesn't convey speed"]
        },
        "Pre-processed": {
            "concept": "Processed before use",
            "pros": ["Simple, clear", "Common term"],
            "cons": ["Doesn't specify what processing", "Generic"]
        },
        "Structured Retrieval": {
            "concept": "Structured vs raw retrieval",
            "pros": ["Clear contrast", "Technical accuracy"],
            "cons": ["Long", "Academic"]
        }
    }
    
    @classmethod
    def evaluate_names(cls, benchmark: BenchmarkResult) -> Dict[str, Dict[str, Any]]:
        """Evaluate names based on benchmark characteristics."""
        evaluations = {}
        
        # Characteristics from benchmark
        compression = benchmark.compression_ratio
        speedup = benchmark.avg_speedup
        
        for name, info in cls.CANDIDATE_NAMES.items():
            score = 0
            reasons = []
            
            # Check compression benefit
            if compression < 0.8:
                if name in ["Dense Pack", "Compiled Artifact", "Optimized Serialization"]:
                    score += 2
                    reasons.append("Implies compression")
            
            # Check speed benefit
            if speedup > 2.0:
                if name in ["Indexed Path", "Pre-processed", "Structured Retrieval"]:
                    score += 2
                    reasons.append("Implies fast access")
            
            # Check technical accuracy
            if name in ["Structured Encoding", "Compiled Artifact", "Normalized Pipeline"]:
                score += 1
                reasons.append("Technically accurate")
            
            # Check simplicity
            if name in ["Pre-processed", "Dense Pack"]:
                score += 1
                reasons.append("Simple, memorable")
            
            # Check familiarity
            if name in ["Compiled Artifact", "Indexed Path"]:
                score += 1
                reasons.append("Familiar concept")
            
            evaluations[name] = {
                "score": score,
                "concept": info["concept"],
                "pros": info["pros"],
                "cons": info["cons"],
                "reasons": reasons
            }
        
        return evaluations
    
    @classmethod
    def recommend_name(cls, evaluations: Dict[str, Dict[str, Any]]) -> Tuple[str, float]:
        """Recommend best name based on scores."""
        best = max(evaluations.items(), key=lambda x: x[1]["score"])
        return best[0], best[1]["score"]


def main():
    """Run the performance comparison."""
    print("=" * 70)
    print("MD→AI vs SYNTHESIZED→AI PERFORMANCE COMPARISON")
    print("=" * 70)
    
    comparator = PerformanceComparator()
    
    print("\n1. FILE SIZE ANALYSIS")
    print("-" * 40)
    
    raw_metrics, syn_metrics = comparator.measure_file_sizes()
    
    print(f"\nRaw (MD) Files:")
    print(f"  Count: {raw_metrics.file_count}")
    print(f"  Total Size: {raw_metrics.total_bytes:,} bytes ({raw_metrics.total_bytes/1024:.1f} KB)")
    print(f"  Avg per file: {raw_metrics.avg_bytes_per_file:.0f} bytes")
    
    print(f"\nSynthesized (JSON) Files:")
    print(f"  Count: {syn_metrics.file_count}")
    print(f"  Total Size: {syn_metrics.total_bytes:,} bytes ({syn_metrics.total_bytes/1024:.1f} KB)")
    print(f"  Avg per file: {syn_metrics.avg_bytes_per_file:.0f} bytes")
    
    compression = syn_metrics.total_bytes / max(raw_metrics.total_bytes, 1)
    print(f"\nCompression Ratio: {compression:.2f}x")
    print(f"  {'✅ Smaller' if compression < 1.0 else '❌ Larger'}")
    
    print("\n2. TASK BENCHMARKS")
    print("-" * 40)
    
    benchmark = comparator.run_benchmark()
    
    print(f"\n{'Task':<15} {'Raw Time':<12} {'Syn Time':<12} {'Speedup':<10} {'Match':<10}")
    print("-" * 60)
    
    for result in benchmark.tasks:
        print(f"{result.task:<15} {result.raw_time_ms:<12.2f} {result.synthesized_time_ms:<12.2f} "
              f"{result.speedup:<10.2f}x {result.match_percentage:<10.1f}%")
    
    print("\n3. SUMMARY")
    print("-" * 40)
    
    print(f"\nOverall Output Match: {benchmark.overall_match_pct:.1f}%")
    print(f"Average Speedup: {benchmark.avg_speedup:.2f}x faster")
    print(f"Compression Ratio: {benchmark.compression_ratio:.2f}x")
    
    # Name evaluation
    print("\n4. METHOD NAME EVALUATION")
    print("-" * 40)
    
    evaluations = MethodNamer.evaluate_names(benchmark)
    
    print(f"\n{'Name':<25} {'Score':<8} {'Top Reason'}")
    print("-" * 60)
    
    for name, eval_data in sorted(evaluations.items(), key=lambda x: -x[1]["score"]):
        top_reason = eval_data["reasons"][0] if eval_data["reasons"] else "-"
        print(f"{name:<25} {eval_data['score']:<8} {top_reason}")
    
    recommended, score = MethodNamer.recommend_name(evaluations)
    print(f"\n🏆 RECOMMENDED NAME: {recommended} (score: {score})")
    
    # Save results
    output_dir = Path("/workspace/project/kde/laboratory/experiments/LAB-070/evidence")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    with open(output_dir / "benchmark_results.json", 'w') as f:
        json.dump(benchmark.to_dict(), f, indent=2)
    
    with open(output_dir / "name_evaluations.json", 'w') as f:
        json.dump(evaluations, f, indent=2)
    
    print(f"\nResults saved to: {output_dir}")
    
    return benchmark, evaluations


if __name__ == "__main__":
    main()
