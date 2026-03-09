import pytest
from pydantic import ValidationError
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent
)

@pytest.mark.asyncio
async def test_context_engineering_agent():
    agent = ContextEngineeringAgent()
    result = await agent.execute("test input")
    assert "God Mode" in result

@pytest.mark.asyncio
async def test_security_auditor_agent():
    agent = SecurityAuditorAgent()
    result = await agent.execute("test code")
    assert "The Elite Security Auditor" in result

@pytest.mark.asyncio
async def test_business_strategist_agent():
    agent = BusinessStrategistAgent()
    result = await agent.execute("product description")
    assert "The Business Model Innovation Strategist" in result

@pytest.mark.asyncio
async def test_legal_auditor_agent_valid():
    agent = LegalAuditorAgent(input_document="Este es un contrato de confidencialidad.")
    result = await agent.execute("Este es un contrato de confidencialidad.")
    assert "AGENTE AUDITOR LEGAL" in result
    assert "contrato" in result.lower()

def test_legal_auditor_agent_invalid_sync():
    # Sync test as per memory note
    with pytest.raises(ValueError, match="ERROR DE INGESTA"):
        LegalAuditorAgent(input_document="Hola mundo, esto es una prueba que no es documento válido.")
