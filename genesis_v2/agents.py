from abc import ABC, abstractmethod
from typing import Any
import textwrap

from .prompts import (
    CONTEXT_ENGINEERING_AGENT_PROMPT,
    SECURITY_AUDITOR_AGENT_PROMPT,
    BUSINESS_STRATEGIST_AGENT_PROMPT,
    LEGAL_AUDITOR_AGENT_PROMPT
)

class BaseAgent(ABC):
    @property
    @abstractmethod
    def system_prompt(self) -> str:
        pass

    def simulate_execution(self, input_text: str) -> str:
        return textwrap.dedent(f"""\
            [SIMULATED EXECUTION]
            --- SYSTEM PROMPT ---
            {self.system_prompt}

            --- INPUT ---
            {input_text}

            --- OUTPUT ---
            [SIMULATED AGENT OUTPUT BASED ON PROMPT AND INPUT]
            """).strip()

class ContextEngineeringAgent(BaseAgent):
    @property
    def system_prompt(self) -> str:
        return CONTEXT_ENGINEERING_AGENT_PROMPT

class SecurityAuditorAgent(BaseAgent):
    @property
    def system_prompt(self) -> str:
        return SECURITY_AUDITOR_AGENT_PROMPT

class BusinessStrategistAgent(BaseAgent):
    @property
    def system_prompt(self) -> str:
        return BUSINESS_STRATEGIST_AGENT_PROMPT

class LegalAuditorAgent(BaseAgent):
    @property
    def system_prompt(self) -> str:
        return LEGAL_AUDITOR_AGENT_PROMPT
