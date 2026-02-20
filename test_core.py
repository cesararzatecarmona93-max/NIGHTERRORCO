import pytest
import time
from ocg_core import OCGCoreSovereign, validate_sovereign_vocabulary
from llave_master_gold_v2 import NexusEngine, InstructionalSegment

def test_ocg_core_merkle_root():
    core = OCGCoreSovereign()
    timestamp = 1700000000.0
    expected_root = "GEMA96-NIGHTERRORCO-1700000000.0"
    import hashlib
    expected_hash = hashlib.sha256(expected_root.encode()).hexdigest()
    assert core.generate_merkle_root(timestamp) == expected_hash

def test_validate_sovereign_vocabulary():
    assert validate_sovereign_vocabulary("Esto es caro") == True
    assert validate_sovereign_vocabulary("Esto es barato") == False
    assert validate_sovereign_vocabulary("Costo total") == False
    assert validate_sovereign_vocabulary("Premium quality") == True

def test_nexus_engine_initialization():
    engine = NexusEngine()
    assert engine.lazarus is not None
    assert engine.sentinel is not None
    assert engine.pot_engine is not None

def test_nexus_engine_routing():
    engine = NexusEngine()

    # Lazarus routing
    res = engine.route_and_process("Please transform this legacy code")
    assert "[LAZARUS]" in res
    assert "[AUDIT:" in res

    # PotEngine routing
    res = engine.route_and_process("Calculate finance metrics")
    assert "[POT_ENGINE]" in res

    # Sentinel routing
    res = engine.route_and_process("Review this legal contract")
    assert "[SENTINEL]" in res

def test_instructional_segment_signing():
    seg = InstructionalSegment(content="Test Segment")
    assert seg.signature is not None
    assert len(seg.signature) == 64
