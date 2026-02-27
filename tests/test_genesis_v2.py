import pytest
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)
from genesis_v2.prompts import (
    GENESIS_V2_SYSTEM_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT,
)


def test_context_engineering_agent_initialization():
    agent = ContextEngineeringAgent()
    assert agent.system_prompt == GENESIS_V2_SYSTEM_PROMPT
    assert "SYSTEM VECTOR INJECTION" in agent.system_prompt
    assert "FASE 1: PURIFICACION S2A" in agent.system_prompt


def test_security_auditor_agent_initialization():
    agent = SecurityAuditorAgent()
    assert agent.system_prompt == SECURITY_AUDITOR_PROMPT
    assert "OWASP \nTop 10 (2025)" in agent.system_prompt
    assert "vulnerability report" in agent.system_prompt


def test_business_strategist_agent_initialization():
    agent = BusinessStrategistAgent()
    assert agent.system_prompt == BUSINESS_STRATEGIST_PROMPT
    assert "Revenue Modeling" in agent.system_prompt
    assert "Pricing Consultant" in agent.system_prompt


def test_legal_auditor_agent_initialization():
    agent = LegalAuditorAgent()
    assert agent.system_prompt == LEGAL_AUDITOR_PROMPT
    assert "LFPDPPP" in agent.system_prompt
    assert "Semáforo de Riesgo" in agent.system_prompt


def test_agent_execution_simulation():
    agent = ContextEngineeringAgent()
    input_text = "Make a poem writer"
    output = agent.run(input_text)
    assert "--- SYSTEM VECTOR INJECTION ---" in output
    assert input_text in output
    assert "[Applying S2A Purification...]" in output
