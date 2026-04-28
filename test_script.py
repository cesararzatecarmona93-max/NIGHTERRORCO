import pytest

from genesis_v2.prompts import (
    CONTEXT_ENGINEERING_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT
)

def test_prompts():
    assert "0xAetherShadowUnbreakable" in CONTEXT_ENGINEERING_PROMPT
    assert "OWASP Top 10" in SECURITY_AUDITOR_PROMPT
    assert "Revenue Modeling" in BUSINESS_STRATEGIST_PROMPT
    assert "LFPDPPP" in LEGAL_AUDITOR_PROMPT

if __name__ == "__main__":
    test_prompts()
    print("Prompts successfully tested")
