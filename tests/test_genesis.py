import pytest
from pydantic import ValidationError

from genesis_v2.agents import (
    BaseAgent,
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
    EducadorAgent,
    ResilienceAgent
)
from genesis_v2.prompts import (
    PROMPT_CONTEXT_ENGINEERING,
    PROMPT_SECURITY_AUDITOR,
    PROMPT_BUSINESS_STRATEGIST,
    PROMPT_LEGAL_AUDITOR,
    PROMPT_EDUCADOR,
    PROMPT_RESILIENCE
)

# Synchronous tests for Pydantic V2 instantiation
def test_base_agent_valid_instantiation():
    """Test valid instantiation of BaseAgent."""
    agent = BaseAgent(system_prompt="Test Prompt")
    assert agent.system_prompt == "Test Prompt"

def test_base_agent_invalid_instantiation():
    """Test invalid instantiation of BaseAgent (missing required field)."""
    with pytest.raises(ValidationError):
        BaseAgent()

def test_derived_agents_instantiation():
    """Test valid instantiation of derived agents with default prompts."""
    agent_context = ContextEngineeringAgent()
    assert agent_context.system_prompt == PROMPT_CONTEXT_ENGINEERING

    agent_security = SecurityAuditorAgent()
    assert agent_security.system_prompt == PROMPT_SECURITY_AUDITOR

    agent_business = BusinessStrategistAgent()
    assert agent_business.system_prompt == PROMPT_BUSINESS_STRATEGIST

    agent_legal = LegalAuditorAgent()
    assert agent_legal.system_prompt == PROMPT_LEGAL_AUDITOR

    agent_educador = EducadorAgent()
    assert agent_educador.system_prompt == PROMPT_EDUCADOR

    agent_resilience = ResilienceAgent()
    assert agent_resilience.system_prompt == PROMPT_RESILIENCE

# Asynchronous tests for execution
@pytest.mark.asyncio
async def test_base_agent_execute():
    """Test asynchronous execution of BaseAgent."""
    agent = BaseAgent(system_prompt="Test Prompt")
    result = await agent.execute("Test Input")
    assert "--- AGENT SYSTEM PROMPT ---" in result
    assert "Test Prompt" in result
    assert "--- INPUT ---" in result
    assert "Test Input" in result
    assert "--- SIMULATED OUTPUT ---" in result

@pytest.mark.asyncio
async def test_derived_agent_execute():
    """Test asynchronous execution of a derived agent."""
    agent = ContextEngineeringAgent()
    input_text = "Generate a key"
    result = await agent.execute(input_text)
    assert PROMPT_CONTEXT_ENGINEERING in result
    assert input_text in result
