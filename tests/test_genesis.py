import pytest
from pydantic import ValidationError

from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)

def test_context_agent_creation():
    agent = ContextEngineeringAgent(input_data="Optimize this prompt")
    assert agent.name == "Context Engineering Agent"
    assert agent.input_data == "Optimize this prompt"

def test_security_agent_creation():
    agent = SecurityAuditorAgent(input_data="Check this code")
    assert agent.name == "Security Auditor Agent"
    assert agent.input_data == "Check this code"

def test_business_agent_creation():
    agent = BusinessStrategistAgent(input_data="Evaluate pricing")
    assert agent.name == "Business Strategist Agent"
    assert agent.input_data == "Evaluate pricing"

def test_legal_agent_creation_success():
    # Provide a document that passes validation
    agent = LegalAuditorAgent(input_data="Este es un contrato legal con cláusula.")
    assert agent.name == "Legal Auditor Agent"
    assert agent.input_data == "Este es un contrato legal con cláusula."

def test_legal_agent_creation_failure():
    # Provide a document that fails validation
    with pytest.raises(ValidationError, match="ERROR DE INGESTA"):
        LegalAuditorAgent(input_data="Hola mundo")

@pytest.mark.asyncio
async def test_context_agent_execution():
    agent = ContextEngineeringAgent(input_data="Optimize this prompt")
    result = await agent.execute()
    assert "TECHNICAL_FINAL_RESULT_ONLY" in result
    assert "optimizing prompt" in result

@pytest.mark.asyncio
async def test_security_agent_execution():
    agent = SecurityAuditorAgent(input_data="Check this code")
    result = await agent.execute()
    assert "TECHNICAL_FINAL_RESULT_ONLY" in result
    assert "scanning for vulnerabilities" in result

@pytest.mark.asyncio
async def test_business_agent_execution():
    agent = BusinessStrategistAgent(input_data="Evaluate pricing")
    result = await agent.execute()
    assert "TECHNICAL_FINAL_RESULT_ONLY" in result
    assert "generating pricing blueprint" in result

@pytest.mark.asyncio
async def test_legal_agent_execution():
    agent = LegalAuditorAgent(input_data="Este es un contrato legal con cláusula.")
    result = await agent.execute()
    assert "TECHNICAL_FINAL_RESULT_ONLY" in result
    assert "auditing legal document" in result
