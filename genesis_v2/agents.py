from genesis_v2.prompts import (
    CONTEXT_ENGINEERING_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT,
)

class BaseAgent:
    def __init__(self, name: str, system_prompt: str):
        self.name = name
        self.system_prompt = system_prompt

    def execute(self, input_text: str) -> str:
        # Simulate execution
        return f"[{self.name}] Executing simulation with input:\n{input_text}"

class ContextEngineeringAgent(BaseAgent):
    def __init__(self):
        super().__init__("Context Engineering Agent", CONTEXT_ENGINEERING_PROMPT)

class SecurityAuditorAgent(BaseAgent):
    def __init__(self):
        super().__init__("Security Auditor", SECURITY_AUDITOR_PROMPT)

class BusinessStrategistAgent(BaseAgent):
    def __init__(self):
        super().__init__("Business Strategist", BUSINESS_STRATEGIST_PROMPT)

class LegalAuditorAgent(BaseAgent):
    def __init__(self):
        super().__init__("Legal Auditor Sentinel", LEGAL_AUDITOR_PROMPT)
