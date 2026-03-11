import pytest
from pydantic import ValidationError

from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent
)

def test_context_engineering_agent_init():
    agent = ContextEngineeringAgent(input_data="test input")
    assert agent.name == "Agente de Ingenieria de Contexto"
    assert "System Vector" in agent.system_prompt or "SYSVEC" in agent.system_prompt or "SysVec" in agent.system_prompt

@pytest.mark.asyncio
async def test_context_engineering_agent_execute():
    agent = ContextEngineeringAgent(input_data="test input")
    result = await agent.execute()
    assert "Executed" in result
    assert "test input" in result

def test_security_auditor_agent_init():
    agent = SecurityAuditorAgent(input_data="test input")
    assert agent.name == "Auditor de Seguridad Black"
    assert "OWASP" in agent.system_prompt

@pytest.mark.asyncio
async def test_security_auditor_agent_execute():
    agent = SecurityAuditorAgent(input_data="test input")
    result = await agent.execute()
    assert "Executed" in result

def test_business_strategist_agent_init():
    agent = BusinessStrategistAgent(input_data="test input")
    assert agent.name == "Arquitecto de Silos de Ventas"
    assert "Pricing" in agent.system_prompt

@pytest.mark.asyncio
async def test_business_strategist_agent_execute():
    agent = BusinessStrategistAgent(input_data="test input")
    result = await agent.execute()
    assert "Executed" in result

def test_legal_auditor_agent_init_valid():
    agent = LegalAuditorAgent(input_data="Este es un contrato valido")
    assert agent.name == "Agente Auditor Legal \"Sentinel\""

def test_legal_auditor_agent_init_invalid():
    with pytest.raises(ValidationError) as exc_info:
        LegalAuditorAgent(input_data="Un documento cualquiera")

    assert "ERROR DE INGESTA" in str(exc_info.value)

@pytest.mark.asyncio
async def test_legal_auditor_agent_execute():
    agent = LegalAuditorAgent(input_data="Este es un contrato valido")
    result = await agent.execute()
    assert "Executed" in result
