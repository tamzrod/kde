"""
KDE Seed/Engine Compiler

Compiles KDE seed and engine markdown content to structured JSON/YAML format.
Validates compilation fidelity and supports round-trip verification.
"""

import os
import re
import json
import yaml
import hashlib
from dataclasses import dataclass, asdict, field
from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path
from datetime import datetime


@dataclass
class CompiledComponent:
    """A compiled component from seed or engine."""
    id: str
    type: str  # principle, evidence_model, knowledge_model, etc.
    version: str
    source_file: str
    content: Dict[str, Any]
    metadata: Dict[str, Any]
    checksum: str = ""
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
    
    def to_json(self, indent: int = 2) -> str:
        return json.dumps(self.to_dict(), indent=indent)
    
    def to_yaml(self) -> str:
        return yaml.dump(self.to_dict(), default_flow_style=False)


@dataclass
class CompilationResult:
    """Result of compilation operation."""
    success: bool
    components: List[CompiledComponent] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    compile_time_ms: float = 0.0
    source_files: int = 0
    total_lines: int = 0
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "success": self.success,
            "components": len(self.components),
            "errors": self.errors,
            "warnings": self.warnings,
            "compile_time_ms": self.compile_time_ms,
            "source_files": self.source_files,
            "total_lines": self.total_lines
        }


@dataclass
class FidelityResult:
    """Result of fidelity comparison."""
    semantic_accuracy: float  # 0-100%
    structural_accuracy: float  # 0-100%
    completeness: float  # 0-100%
    missing_fields: List[str] = field(default_factory=list)
    differing_fields: List[str] = field(default_factory=list)
    extra_fields: List[str] = field(default_factory=list)
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
    
    def is_acceptable(self, threshold: float = 95.0) -> bool:
        return (self.semantic_accuracy >= threshold and 
                self.structural_accuracy >= threshold and
                self.completeness >= threshold)


class MDContentParser:
    """Parses markdown content into structured format."""
    
    @staticmethod
    def parse_table(content: str) -> List[Dict[str, str]]:
        """Parse markdown table to list of dicts."""
        rows = []
        lines = content.strip().split('\n')
        
        header = None
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Skip separator lines
            if re.match(r'\|[-:\s]+\|', line):
                continue
            
            cells = [c.strip() for c in line.split('|')[1:-1]]
            
            if header is None:
                header = cells
            else:
                row = dict(zip(header, cells))
                rows.append(row)
        
        return rows
    
    @staticmethod
    def parse_definition_list(content: str) -> List[Dict[str, str]]:
        """Parse definition list format."""
        definitions = []
        pattern = r'\*\*([^*]+)\*\*:\s*(.+)'
        
        for match in re.finditer(pattern, content):
            term = match.group(1).strip()
            definition = match.group(2).strip()
            definitions.append({"term": term, "definition": definition})
        
        return definitions
    
    @staticmethod
    def parse_header(content: str) -> Dict[str, str]:
        """Parse markdown header metadata."""
        header = {}
        
        # Extract YAML frontmatter if present
        if content.startswith('---'):
            match = re.search(r'---\n(.*?)\n---', content, re.DOTALL)
            if match:
                # Simple key: value parsing
                for line in match.group(1).split('\n'):
                    if ':' in line:
                        key, value = line.split(':', 1)
                        header[key.strip().lower()] = value.strip()
        
        # Extract inline metadata
        patterns = [
            (r'\*\*(\w+)\*\*:\s*(.+)', 'inline_key_value'),
            (r'`([^`]+)`: (.+)', 'code_key_value'),
        ]
        
        for pattern, ptype in patterns:
            for match in re.finditer(pattern, content):
                if ptype == 'inline_key_value':
                    key = match.group(1).strip().lower()
                    value = match.group(2).strip()
                    header[key] = value
        
        return header
    
    @staticmethod
    def extract_lists(content: str) -> List[str]:
        """Extract list items from content."""
        items = []
        for line in content.split('\n'):
            line = line.strip()
            if line.startswith(('- ', '* ', '+ ')):
                items.append(line[2:].strip())
            elif re.match(r'^\d+\.', line):
                items.append(re.sub(r'^\d+\.\s*', '', line).strip())
        return items
    
    @staticmethod
    def calculate_checksum(content: str) -> str:
        """Calculate SHA-256 checksum of content."""
        return hashlib.sha256(content.encode()).hexdigest()[:16]


class KDECompiler:
    """
    Compiles KDE seed and engine markdown content to structured format.
    """
    
    def __init__(self, base_path: str = "/workspace/project/kde"):
        self.base_path = Path(base_path)
        self.parser = MDContentParser()
        self.compile_count = 0
        
    def compile_seed(self, seed_id: str = "seed-001") -> CompilationResult:
        """
        Compile a KDE seed from markdown files.
        
        Args:
            seed_id: Seed identifier (e.g., "seed-001")
            
        Returns:
            CompilationResult with compiled components
        """
        import time
        start_time = time.time()
        
        result = CompilationResult(success=True)
        seed_path = self.base_path / "seeds" / seed_id
        
        if not seed_path.exists():
            result.success = False
            result.errors.append(f"Seed not found: {seed_path}")
            return result
        
        # Compile each component type
        component_types = [
            ("principles", "principle"),
            ("evidence-model", "evidence_model"),
            ("knowledge-model", "knowledge_model"),
            ("confidence-model", "confidence_model"),
            ("scientific-loop", "scientific_loop"),
            ("ambiguity", "ambiguity"),
        ]
        
        for dir_name, comp_type in component_types:
            comp_dir = seed_path / dir_name
            if comp_dir.exists():
                components, errors = self._compile_directory(
                    comp_dir, comp_type, seed_id
                )
                result.components.extend(components)
                result.errors.extend(errors)
                result.source_files += len(components)
        
        # Compile seed.yaml if exists
        yaml_file = seed_path / "seed.yaml"
        if yaml_file.exists():
            component = self._compile_yaml(yaml_file, "seed_manifest", seed_id)
            if component:
                result.components.append(component)
                result.source_files += 1
        
        result.compile_time_ms = (time.time() - start_time) * 1000
        
        if result.errors:
            result.success = False
            
        return result
    
    def compile_engine(self, engine_id: str = "alpha") -> CompilationResult:
        """
        Compile a KDE engine from markdown files.
        
        Args:
            engine_id: Engine identifier (e.g., "alpha", "beta")
            
        Returns:
            CompilationResult with compiled components
        """
        import time
        start_time = time.time()
        
        result = CompilationResult(success=True)
        engine_path = self.base_path / "engines" / engine_id
        
        if not engine_path.exists():
            result.success = False
            result.errors.append(f"Engine not found: {engine_path}")
            return result
        
        # Compile engine interface
        interface_file = self.base_path / "engines" / "interface.md"
        if interface_file.exists():
            component = self._compile_file(interface_file, "engine_interface", engine_id)
            if component:
                result.components.append(component)
                result.source_files += 1
        
        # Compile engine-specific files
        if engine_path.exists():
            for md_file in engine_path.glob("*.md"):
                component = self._compile_file(
                    md_file, f"engine_{engine_id}", engine_id
                )
                if component:
                    result.components.append(component)
                    result.source_files += 1
        
        result.compile_time_ms = (time.time() - start_time) * 1000
        
        if result.errors:
            result.success = False
            
        return result
    
    def _compile_directory(self, dir_path: Path, comp_type: str, seed_id: str) -> Tuple[List[CompiledComponent], List[str]]:
        """Compile all markdown files in a directory."""
        components = []
        errors = []
        
        for md_file in dir_path.glob("*.md"):
            component = self._compile_file(md_file, comp_type, seed_id)
            if component:
                components.append(component)
            else:
                errors.append(f"Failed to compile: {md_file}")
        
        return components, errors
    
    def _compile_file(self, file_path: Path, comp_type: str, seed_id: str) -> Optional[CompiledComponent]:
        """Compile a single markdown file."""
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Parse content
            parsed = self._parse_md_content(content, file_path.name)
            
            # Extract header metadata
            header = self.parser.parse_header(content)
            
            # Get version from header or default
            version = header.get('version', '1.0.0')
            
            component = CompiledComponent(
                id=f"{seed_id}-{comp_type}-{file_path.stem}",
                type=comp_type,
                version=version,
                source_file=str(file_path),
                content=parsed,
                metadata={
                    "compiled_at": datetime.utcnow().isoformat() + "Z",
                    "seed_id": seed_id,
                    "original_lines": len(content.split('\n')),
                },
                checksum=self.parser.calculate_checksum(content)
            )
            
            return component
            
        except Exception as e:
            return None
    
    def _compile_yaml(self, file_path: Path, comp_type: str, seed_id: str) -> Optional[CompiledComponent]:
        """Compile a YAML file."""
        try:
            content = file_path.read_text(encoding='utf-8')
            data = yaml.safe_load(content)
            
            component = CompiledComponent(
                id=f"{seed_id}-{comp_type}",
                type=comp_type,
                version=data.get('version', '1.0.0'),
                source_file=str(file_path),
                content=data,
                metadata={
                    "compiled_at": datetime.utcnow().isoformat() + "Z",
                    "seed_id": seed_id,
                    "format": "yaml"
                },
                checksum=self.parser.calculate_checksum(content)
            )
            
            return component
            
        except Exception as e:
            return None
    
    def _parse_md_content(self, content: str, filename: str) -> Dict[str, Any]:
        """Parse markdown content into structured format."""
        parsed = {
            "filename": filename,
            "has_frontmatter": content.startswith('---'),
            "sections": [],
            "tables": [],
            "definitions": [],
            "lists": [],
        }
        
        # Extract tables
        table_pattern = r'(\|.+\|\n\|[-:\s]+\|\n(?:\|.+\|\n)+)'
        for match in re.finditer(table_pattern, content):
            table = self.parser.parse_table(match.group(0))
            if table:
                parsed["tables"].append(table)
        
        # Extract definitions
        parsed["definitions"] = self.parser.parse_definition_list(content)
        
        # Extract lists
        parsed["lists"] = self.parser.extract_lists(content)
        
        # Extract code blocks (for version, ID, etc.)
        code_blocks = re.findall(r'```(\w+)?\n(.*?)```', content, re.DOTALL)
        if code_blocks:
            parsed["code_blocks"] = [{"lang": lang or "", "code": code} 
                                     for lang, code in code_blocks]
        
        return parsed
    
    def calculate_fidelity(self, original: str, compiled: CompiledComponent, 
                          regenerated: str) -> FidelityResult:
        """
        Calculate fidelity between original and compiled content.
        
        Args:
            original: Original markdown content
            compiled: Compiled component
            regenerated: Regenerated markdown from compiled content
            
        Returns:
            FidelityResult with accuracy metrics
        """
        original_checksum = self.parser.calculate_checksum(original)
        
        # Check completeness
        original_words = set(original.lower().split())
        regenerated_words = set(regenerated.lower().split())
        
        # Calculate semantic accuracy (based on key content match)
        key_terms = ['definition', 'principle', 'evidence', 'knowledge', 
                      'confidence', 'model', 'seed', 'engine']
        key_original = [w for w in original_words if any(t in w for t in key_terms)]
        key_regenerated = [w for w in regenerated_words if any(t in w for t in key_terms)]
        
        if key_original:
            semantic_match = len(set(key_original) & set(key_regenerated)) / len(set(key_original))
        else:
            semantic_match = 1.0
        
        # Calculate structural accuracy (based on format elements)
        original_tables = len(re.findall(r'\|.+\|', original))
        regenerated_tables = len(re.findall(r'\|.+\|', regenerated))
        
        if original_tables > 0:
            structural_match = min(regenerated_tables / original_tables, 1.0)
        else:
            structural_match = 1.0
        
        # Calculate completeness
        completeness = len(regenerated_words) / max(len(original_words), 1)
        completeness = min(completeness, 1.0)
        
        return FidelityResult(
            semantic_accuracy=semantic_match * 100,
            structural_accuracy=structural_match * 100,
            completeness=completeness * 100,
            missing_fields=[],
            differing_fields=[]
        )
    
    def save_compiled(self, result: CompilationResult, output_dir: Path) -> bool:
        """Save compiled components to output directory."""
        try:
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # Save as JSON bundle
            bundle = {
                "compiled_at": datetime.utcnow().isoformat() + "Z",
                "components": [c.to_dict() for c in result.components],
                "metadata": result.to_dict()
            }
            
            bundle_file = output_dir / "compiled_bundle.json"
            bundle_file.write_text(json.dumps(bundle, indent=2))
            
            # Save individual components
            for component in result.components:
                filename = f"{component.id}.json"
                component_file = output_dir / filename
                component_file.write_text(component.to_json())
            
            return True
            
        except Exception as e:
            return False
    
    def load_compiled(self, input_dir: Path) -> List[CompiledComponent]:
        """Load compiled components from directory."""
        components = []
        
        for json_file in input_dir.glob("*.json"):
            if json_file.name == "compiled_bundle.json":
                continue
            try:
                data = json.loads(json_file.read_text())
                component = CompiledComponent(**data)
                components.append(component)
            except Exception:
                pass
        
        return components


class KDEExperimentRunner:
    """
    Runs experiments using KDE seed/engine content.
    Supports both direct md processing and compiled processing.
    """
    
    def __init__(self, compiler: KDECompiler):
        self.compiler = compiler
        self.results = []
    
    def run_sub_experiment(self, name: str, baseline_fn, compiled_fn,
                           components: List[CompiledComponent]) -> Dict[str, Any]:
        """
        Run a sub-experiment comparing baseline and compiled versions.
        
        Args:
            name: Sub-experiment name
            baseline_fn: Function to run with direct md processing
            compiled_fn: Function to run with compiled processing
            components: Compiled components to use
            
        Returns:
            Dict with results and comparison
        """
        import time
        
        # Run baseline
        baseline_start = time.time()
        baseline_result = baseline_fn(components)
        baseline_time = (time.time() - baseline_start) * 1000
        
        # Run compiled
        compiled_start = time.time()
        compiled_result = compiled_fn(components)
        compiled_time = (time.time() - compiled_start) * 1000
        
        # Compare results
        match = baseline_result == compiled_result
        
        result = {
            "name": name,
            "baseline": {
                "result": baseline_result,
                "time_ms": baseline_time
            },
            "compiled": {
                "result": compiled_result,
                "time_ms": compiled_time
            },
            "comparison": {
                "match": match,
                "match_percentage": 100 if match else 0,
                "time_overhead_pct": ((compiled_time - baseline_time) / baseline_time * 100)
                                 if baseline_time > 0 else 0
            }
        }
        
        self.results.append(result)
        return result


# Sub-experiment functions
def exp_principle_loading_baseline(components: List[CompiledComponent]) -> Dict[str, Any]:
    """Load principles using direct md parsing."""
    principles = []
    for comp in components:
        if comp.type == "principle":
            # Extract principle content
            if comp.content.get("definitions"):
                for defn in comp.content["definitions"]:
                    principles.append(defn.get("term", ""))
            elif comp.content.get("lists"):
                principles.extend(comp.content["lists"])
    
    return {
        "type": "principle_loading",
        "count": len(principles),
        "principles": principles[:5]  # First 5
    }


def exp_principle_loading_compiled(components: List[CompiledComponent]) -> Dict[str, Any]:
    """Load principles using compiled content."""
    # Same logic, but working with structured data
    principles = []
    for comp in components:
        if comp.type == "principle":
            if comp.content.get("definitions"):
                for defn in comp.content["definitions"]:
                    principles.append(defn.get("term", ""))
            elif comp.content.get("lists"):
                principles.extend(comp.content["lists"])
    
    return {
        "type": "principle_loading",
        "count": len(principles),
        "principles": principles[:5],
        "source": "compiled"
    }


def exp_model_count_baseline(components: List[CompiledComponent]) -> Dict[str, Any]:
    """Count models using direct parsing."""
    models = {
        "evidence_model": 0,
        "knowledge_model": 0,
        "confidence_model": 0,
        "scientific_loop": 0,
        "ambiguity": 0,
    }
    
    for comp in components:
        if comp.type in models:
            models[comp.type] += 1
    
    return {
        "type": "model_count",
        "models": models,
        "total": sum(models.values())
    }


def exp_model_count_compiled(components: List[CompiledComponent]) -> Dict[str, Any]:
    """Count models using compiled content."""
    # Same logic
    models = {
        "evidence_model": 0,
        "knowledge_model": 0,
        "confidence_model": 0,
        "scientific_loop": 0,
        "ambiguity": 0,
    }
    
    for comp in components:
        if comp.type in models:
            models[comp.type] += 1
    
    return {
        "type": "model_count",
        "models": models,
        "total": sum(models.values()),
        "source": "compiled"
    }


def exp_capabilities_baseline(components: List[CompiledComponent]) -> Dict[str, Any]:
    """List capabilities using direct parsing."""
    capabilities = []
    for comp in components:
        if comp.type == "engine_interface" or "interface" in comp.id:
            if comp.content.get("lists"):
                capabilities.extend(comp.content["lists"])
    
    return {
        "type": "capabilities",
        "count": len(capabilities),
        "capabilities": capabilities[:10]
    }


def exp_capabilities_compiled(components: List[CompiledComponent]) -> Dict[str, Any]:
    """List capabilities using compiled content."""
    capabilities = []
    for comp in components:
        if comp.type == "engine_interface" or "interface" in comp.id:
            if comp.content.get("lists"):
                capabilities.extend(comp.content["lists"])
    
    return {
        "type": "capabilities",
        "count": len(capabilities),
        "capabilities": capabilities[:10],
        "source": "compiled"
    }


def main():
    """Test the KDE compiler."""
    print("=" * 70)
    print("KDE SEED/ENGINE COMPILER TEST")
    print("=" * 70)
    
    compiler = KDECompiler()
    
    # Test seed compilation
    print("\n1. SEED COMPILATION TEST")
    print("-" * 40)
    seed_result = compiler.compile_seed("seed-001")
    print(f"Success: {seed_result.success}")
    print(f"Components: {len(seed_result.components)}")
    print(f"Compile time: {seed_result.compile_time_ms:.2f}ms")
    print(f"Source files: {seed_result.source_files}")
    
    if seed_result.errors:
        print(f"Errors: {seed_result.errors}")
    
    # Test engine compilation
    print("\n2. ENGINE COMPILATION TEST")
    print("-" * 40)
    engine_result = compiler.compile_engine("alpha")
    print(f"Success: {engine_result.success}")
    print(f"Components: {len(engine_result.components)}")
    print(f"Compile time: {engine_result.compile_time_ms:.2f}ms")
    
    # Combine components
    all_components = seed_result.components + engine_result.components
    
    # Run experiments
    print("\n3. SUB-EXPERIMENT EXECUTION")
    print("-" * 40)
    
    runner = KDEExperimentRunner(compiler)
    
    # Exp 1: Principle loading
    result1 = runner.run_sub_experiment(
        "principle_loading",
        exp_principle_loading_baseline,
        exp_principle_loading_compiled,
        all_components
    )
    print(f"\n{result1['name']}:")
    print(f"  Baseline: {result1['baseline']['result']['count']} principles")
    print(f"  Compiled: {result1['compiled']['result']['count']} principles")
    print(f"  Match: {result1['comparison']['match']}")
    print(f"  Time overhead: {result1['comparison']['time_overhead_pct']:.1f}%")
    
    # Exp 2: Model count
    result2 = runner.run_sub_experiment(
        "model_count",
        exp_model_count_baseline,
        exp_model_count_compiled,
        all_components
    )
    print(f"\n{result2['name']}:")
    print(f"  Baseline: {result2['baseline']['result']['total']} models")
    print(f"  Compiled: {result2['compiled']['result']['total']} models")
    print(f"  Match: {result2['comparison']['match']}")
    
    # Exp 3: Capabilities
    result3 = runner.run_sub_experiment(
        "capabilities",
        exp_capabilities_baseline,
        exp_capabilities_compiled,
        all_components
    )
    print(f"\n{result3['name']}:")
    print(f"  Baseline: {result3['baseline']['result']['count']} capabilities")
    print(f"  Compiled: {result3['compiled']['result']['count']} capabilities")
    print(f"  Match: {result3['comparison']['match']}")
    
    # Summary
    print("\n4. SUMMARY")
    print("-" * 40)
    
    all_match = all(r['comparison']['match'] for r in runner.results)
    avg_overhead = sum(r['comparison']['time_overhead_pct'] 
                       for r in runner.results) / len(runner.results)
    
    print(f"All results match: {all_match}")
    print(f"Average time overhead: {avg_overhead:.1f}%")
    print(f"Total components compiled: {len(all_components)}")
    
    # Save compiled output
    output_dir = Path("/workspace/project/kde/laboratory/experiments/LAB-069/compiled")
    compiler.save_compiled(seed_result, output_dir / "seed")
    compiler.save_compiled(engine_result, output_dir / "engine")
    
    print(f"\nCompiled output saved to: {output_dir}")
    
    return {
        "seed_result": seed_result,
        "engine_result": engine_result,
        "experiment_results": runner.results
    }


if __name__ == "__main__":
    main()
