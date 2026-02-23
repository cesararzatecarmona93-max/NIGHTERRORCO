import pytest
from llave_master_gold_v2 import NexusEngine, AgentResponse, InstructionalSegment

def test_nexus_engine_initialization():
    engine = NexusEngine()
    assert 'genesis_v2' in engine.agents
    assert 'sentinel' in engine.agents

def test_routing_genesis():
    engine = NexusEngine()
    route = engine.route_request("optimiza este prompt para ser mas experto")
    assert route == 'genesis_v2'

def test_routing_sentinel():
    engine = NexusEngine()
    route = engine.route_request("analiza este contrato de arrendamiento")
    assert route == 'sentinel'

def test_routing_business():
    engine = NexusEngine()
    route = engine.route_request("dame una estrategia de precios")
    assert route == 'business_strategist'

def test_routing_security():
    engine = NexusEngine()
    route = engine.route_request("audita este codigo por vulnerabilidades owasp")
    assert route == 'security_auditor'

def test_sentinel_logic_valid():
    engine = NexusEngine()
    response = engine.execute_agent('sentinel', 'revisar contrato de arrendamiento')
    assert "ERROR DE INGESTA" not in response.output
    assert "Based on System Prompt" in response.output

def test_sentinel_logic_invalid():
    engine = NexusEngine()
    response = engine.execute_agent('sentinel', 'hola como estas')
    assert "ERROR DE INGESTA" in response.output

def test_instructional_segment_signing():
    segment = InstructionalSegment(content="test content")
    assert segment.signature is not None
    # SHA256 of "test content"
    import hashlib
    expected = hashlib.sha256(b"test content").hexdigest()
    assert segment.signature == expected
