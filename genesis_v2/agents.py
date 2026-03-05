import asyncio
from abc import ABC, abstractmethod
from pydantic import BaseModel, Field
from genesis_v2.prompts import (
    CONTEXT_ENGINEERING_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT,
    EDUCADOR_PROMPT,
    RESILIENCE_PROMPT
)

class BaseAgent(BaseModel, ABC):
    """Base class for all Genesis V2 agents."""
    name: str
    system_prompt: str

    @abstractmethod
    async def execute(self, input_data: str) -> str:
        """Executes the agent logic."""
        pass

class ContextEngineeringAgent(BaseAgent):
    name: str = Field(default="ContextEngineeringAgent")
    system_prompt: str = Field(default=CONTEXT_ENGINEERING_PROMPT)

    async def execute(self, input_data: str) -> str:
        # Simulate an execution
        await asyncio.sleep(0.1)
        return f"[{self.name}] Executed with input: {input_data}\nUsing prompt:\n{self.system_prompt[:50]}..."

class ResilienceAgent(BaseAgent):
    name: str = Field(default="ResilienceAgent")
    system_prompt: str = Field(default=RESILIENCE_PROMPT)

    async def execute(self, input_data: str) -> str:
        # Simulate an execution
        await asyncio.sleep(0.1)
        return f"[{self.name}] Executed with input: {input_data}\nUsing prompt:\n{self.system_prompt[:50]}..."

class EducadorAgent(BaseAgent):
    name: str = Field(default="EducadorAgent")
    system_prompt: str = Field(default=EDUCADOR_PROMPT)

    async def execute(self, input_data: str) -> str:
        # Simulate an execution
        await asyncio.sleep(0.1)
        return f"[{self.name}] Executed with input: {input_data}\nUsing prompt:\n{self.system_prompt[:50]}..."

class SecurityAuditorAgent(BaseAgent):
    name: str = Field(default="SecurityAuditorAgent")
    system_prompt: str = Field(default=SECURITY_AUDITOR_PROMPT)

    async def execute(self, input_data: str) -> str:
        # Simulate an execution
        await asyncio.sleep(0.1)
        return f"[{self.name}] Executed with input: {input_data}\nUsing prompt:\n{self.system_prompt[:50]}..."

class BusinessStrategistAgent(BaseAgent):
    name: str = Field(default="BusinessStrategistAgent")
    system_prompt: str = Field(default=BUSINESS_STRATEGIST_PROMPT)

    async def execute(self, input_data: str) -> str:
        # Simulate an execution
        await asyncio.sleep(0.1)
        return f"[{self.name}] Executed with input: {input_data}\nUsing prompt:\n{self.system_prompt[:50]}..."

class LegalAuditorAgent(BaseAgent):
    name: str = Field(default="LegalAuditorAgent")
    system_prompt: str = Field(default=LEGAL_AUDITOR_PROMPT)

    async def execute(self, input_data: str) -> str:
        # Simulate an execution
        await asyncio.sleep(0.1)
        return f"[{self.name}] Executed with input: {input_data}\nUsing prompt:\n{self.system_prompt[:50]}..."
