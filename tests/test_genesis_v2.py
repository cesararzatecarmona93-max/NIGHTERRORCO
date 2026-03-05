import pytest
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
    OrquestadorAgent
)


@pytest.mark.asyncio
async def test_context_engineering_agent():
    agent = ContextEngineeringAgent()
    assert agent.name == "Context Engineering Agent"
    assert "SYSTEM VECTOR INJECTION" in agent.system_prompt
    result = await agent.execute("Make a prompt for a coding bot")
    assert result["agent"] == "Context Engineering Agent"
    assert result["status"] == "success"
    assert result["result"] == "Master Key Prompt Generated"


@pytest.mark.asyncio
async def test_security_auditor_agent():
    agent = SecurityAuditorAgent()
    assert agent.name == "Security Auditor Agent"
    assert "The Elite Security Auditor" in agent.system_prompt
    result = await agent.execute("Here is my code: eval(user_input)")
    assert result["agent"] == "Security Auditor Agent"
    assert result["status"] == "success"
    assert result["result"] == "Vulnerability Report Generated"


@pytest.mark.asyncio
async def test_business_strategist_agent():
    agent = BusinessStrategistAgent()
    assert agent.name == "Business Strategist Agent"
    assert "The Business Model Innovation Strategist" in agent.system_prompt
    result = await agent.execute("A new AI tool for image generation")
    assert result["agent"] == "Business Strategist Agent"
    assert result["status"] == "success"
    assert result["result"] == "Pricing Blueprint Generated"


@pytest.mark.asyncio
async def test_legal_auditor_agent_success():
    agent = LegalAuditorAgent()
    assert agent.name == "Legal Auditor Sentinel"
    assert "AGENTE AUDITOR LEGAL" in agent.system_prompt
    result = await agent.execute("Contrato de prestación de servicios. Renovación automática...")
    assert result["agent"] == "Legal Auditor Sentinel"
    assert result["status"] == "success"
    assert result["result"] == "Legal Audit Report Generated"


@pytest.mark.asyncio
async def test_legal_auditor_agent_error():
    agent = LegalAuditorAgent()
    result = await agent.execute("This is just a regular string, not a legal doc. ERROR DE INGESTA")
    assert result["agent"] == "Legal Auditor Sentinel"
    assert result["status"] == "error"
    assert "ERROR DE INGESTA: Solo proceso documentos legales" in result["result"]


@pytest.mark.asyncio
async def test_orquestador_agent_success():
    agent = OrquestadorAgent()
    assert agent.name == "Orquestador Agéntico"
    assert "NIVEL: Arquitecto de Sistemas Senior" in agent.system_prompt
    result = await agent.execute("Proporciona una clase de termodinámica.")
    assert result["agent"] == "Orquestador Agéntico"
    assert result["status"] == "success"
    assert "Sello MDT PHOENIX" in result["result"]


@pytest.mark.asyncio
async def test_orquestador_agent_missing_data():
    agent = OrquestadorAgent()
    result = await agent.execute("Tell me about missing_data points in 1845.")
    assert result["agent"] == "Orquestador Agéntico"
    assert result["status"] == "success"
    assert result["result"] == "Dato no localizado en el inventario lógico (MLI)"


@pytest.mark.asyncio
async def test_orquestador_agent_devaluatory_terms():
    agent = OrquestadorAgent()
    result = await agent.execute("Quiero un curso barato y gratis, ojalá con descuento.")
    assert result["agent"] == "Orquestador Agéntico"
    assert result["status"] == "error"
    assert "Términos devaluatorios detectados" in result["result"]
