import pytest
from unittest.mock import patch
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)
from genesis_v2.prompts import (
    CONTEXT_ENGINEERING_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT,
)
import genesis_cli
import sys

def test_context_engineering_agent():
    agent = ContextEngineeringAgent()
    assert agent.system_prompt == CONTEXT_ENGINEERING_PROMPT
    result = agent.execute("test input")
    assert "Executing with prompt:" in result
    assert "test input" in result

def test_security_auditor_agent():
    agent = SecurityAuditorAgent()
    assert agent.system_prompt == SECURITY_AUDITOR_PROMPT
    result = agent.execute("test input")
    assert "Executing with prompt:" in result
    assert "test input" in result

def test_business_strategist_agent():
    agent = BusinessStrategistAgent()
    assert agent.system_prompt == BUSINESS_STRATEGIST_PROMPT
    result = agent.execute("test input")
    assert "Executing with prompt:" in result
    assert "test input" in result

def test_legal_auditor_agent():
    agent = LegalAuditorAgent()
    assert agent.system_prompt == LEGAL_AUDITOR_PROMPT
    result = agent.execute("test input")
    assert "Executing with prompt:" in result
    assert "test input" in result

def test_cli_parsing():
    test_args = ["genesis_cli.py", "--agent", "context", "--input", "hello"]
    with patch.object(sys, 'argv', test_args):
        # We want to test that it parses correctly and outputs the result
        with patch('builtins.print') as mock_print:
            genesis_cli.main()
            mock_print.assert_called()
            output = mock_print.call_args[0][0]
            assert "hello" in output
            assert CONTEXT_ENGINEERING_PROMPT in output

def test_cli_missing_args():
    test_args = ["genesis_cli.py"]
    with patch.object(sys, 'argv', test_args):
        with pytest.raises(SystemExit):
            genesis_cli.main()

def test_cli_invalid_agent():
    test_args = ["genesis_cli.py", "--agent", "invalid", "--input", "hello"]
    with patch.object(sys, 'argv', test_args):
        with pytest.raises(SystemExit):
            genesis_cli.main()
