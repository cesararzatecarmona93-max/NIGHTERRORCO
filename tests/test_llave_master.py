import pytest
import asyncio
from llave_master_gold_v2 import (
    NexusEngine,
    validate_sovereign_vocabulary,
    auditor
)

@pytest.fixture
def engine():
    return NexusEngine()

@pytest.mark.asyncio
async def test_nexus_engine_lazarus(engine):
    result = await engine.process_request("Please transform this legacy system.")
    assert result["agent"] == "LazarusArchitect"
    assert result["status"] == "success"
    assert "Legacy Transformation Applied" in result["result"]
    assert "audit_hash" in result

@pytest.mark.asyncio
async def test_nexus_engine_governance(engine):
    result = await engine.process_request("Govern the scope of this project.")
    assert result["agent"] == "GovernanceSentinel"
    assert result["status"] == "success"
    assert "Scope Control Verified" in result["result"]
    assert "audit_hash" in result

@pytest.mark.asyncio
async def test_nexus_engine_pot(engine):
    result = await engine.process_request("Calculate the financial risk using PoT.")
    assert result["agent"] == "PotEngine"
    assert result["status"] == "success"
    assert "Financial Calculation via PoT" in result["result"]
    assert "audit_hash" in result

@pytest.mark.asyncio
async def test_vocabulary_violation(engine):
    result = await engine.process_request("Can I get a gratis test?")
    assert result["status"] == "error"
    assert "Sovereign Vocabulary Violation" in result["error"]
    assert "gratis" in result["error"]
    assert "audit_hash" in result

def test_validate_sovereign_vocabulary_raises():
    with pytest.raises(ValueError) as excinfo:
        validate_sovereign_vocabulary("This is barato")
    assert "Sovereign Vocabulary Violation" in str(excinfo.value)
    assert "barato" in str(excinfo.value)

def test_validate_sovereign_vocabulary_passes():
    try:
        validate_sovereign_vocabulary("This is a high quality test.")
    except ValueError:
        pytest.fail("validate_sovereign_vocabulary raised ValueError unexpectedly!")

def test_merkle_tree_audit():
    initial_leaves = len(auditor.leaves)
    auditor.append_log("test log")
    assert len(auditor.leaves) == initial_leaves + 1
