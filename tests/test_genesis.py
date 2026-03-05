import pytest
import asyncio
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
    EducadorAgent,
    ResilienceAgent
)
from genesis_cli import get_agent

@pytest.mark.asyncio
async def test_context_engineering_agent():
    agent = ContextEngineeringAgent()
    assert agent.name == "ContextEngineeringAgent"
    output = await agent.execute("test input")
    assert "[ContextEngineeringAgent]" in output
    assert "test input" in output
    assert agent.system_prompt.startswith("# SYSTEM VECTOR INJECTION")

@pytest.mark.asyncio
async def test_security_auditor_agent():
    agent = SecurityAuditorAgent()
    assert agent.name == "SecurityAuditorAgent"
    output = await agent.execute("test security")
    assert "[SecurityAuditorAgent]" in output
    assert "test security" in output
    assert agent.system_prompt.startswith("# SYSTEM PROMPT: The Elite Security Auditor")

@pytest.mark.asyncio
async def test_business_strategist_agent():
    agent = BusinessStrategistAgent()
    assert agent.name == "BusinessStrategistAgent"
    output = await agent.execute("test business")
    assert "[BusinessStrategistAgent]" in output
    assert "test business" in output
    assert agent.system_prompt.startswith("# SYSTEM PROMPT: The Business Model Innovation Strategist")

@pytest.mark.asyncio
async def test_legal_auditor_agent():
    agent = LegalAuditorAgent()
    assert agent.name == "LegalAuditorAgent"
    output = await agent.execute("test legal")
    assert "[LegalAuditorAgent]" in output
    assert "test legal" in output
    assert agent.system_prompt.startswith("# SYSTEM ROLE: AGENTE AUDITOR LEGAL")

@pytest.mark.asyncio
async def test_educador_agent():
    agent = EducadorAgent()
    assert agent.name == "EducadorAgent"
    output = await agent.execute("test educador")
    assert "[EducadorAgent]" in output
    assert "test educador" in output
    assert agent.system_prompt.startswith("NIVEL: Arquitecto de Sistemas Senior / Educador de Alta Fidelidad.")

@pytest.mark.asyncio
async def test_resilience_agent():
    agent = ResilienceAgent()
    assert agent.name == "ResilienceAgent"
    output = await agent.execute("test resilience")
    assert "[ResilienceAgent]" in output
    assert "test resilience" in output
    assert agent.system_prompt.startswith("{")

def test_get_agent_factory():
    assert isinstance(get_agent("context"), ContextEngineeringAgent)
    assert isinstance(get_agent("security"), SecurityAuditorAgent)
    assert isinstance(get_agent("business"), BusinessStrategistAgent)
    assert isinstance(get_agent("legal"), LegalAuditorAgent)
    assert isinstance(get_agent("educador"), EducadorAgent)
    assert isinstance(get_agent("resilience"), ResilienceAgent)

    with pytest.raises(ValueError):
        get_agent("invalid_agent")
