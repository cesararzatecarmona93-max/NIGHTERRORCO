import pytest
from llave_master_gold_v2 import ContextEngineer, SecurityAuditor, BusinessStrategist, Sentinel

def test_context_engineer():
    agent = ContextEngineer()
    response = agent.process("Make this prompt better")
    assert "SYSVEC: 0xAetherShadowUnbreakable" in response.output
    assert response.metadata["phase"] == "purification_s2a"

def test_security_auditor():
    agent = SecurityAuditor()
    response = agent.process("This is a password secret")
    assert "Hardcoded Secret Potential" in response.output
    assert response.metadata["scan_type"] == "SAST"

def test_business_strategist():
    agent = BusinessStrategist()
    response = agent.process("Launch a SaaS")
    assert "Freemium" in response.output
    assert response.metadata["model"] == "freemium_tiered"

def test_sentinel():
    agent = Sentinel()
    response = agent.process("Contract with pena convencional")
    assert "HIGH" in response.output
    assert "LFPDPPP" in response.output
