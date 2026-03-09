import asyncio
from typing import Any
from pydantic import BaseModel, Field, ValidationError, model_validator

from genesis_v2.prompts import (
    CONTEXT_ENGINEERING_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT
)


class BaseAgent(BaseModel):
    name: str
    system_prompt: str
    input_data: str

    async def execute(self) -> str:
        raise NotImplementedError("Subclasses must implement the execute method")


class ContextEngineeringAgent(BaseAgent):
    name: str = Field(default="Context Engineering Agent")
    system_prompt: str = Field(default=CONTEXT_ENGINEERING_PROMPT)

    async def execute(self) -> str:
        # Simulate execution
        await asyncio.sleep(0.1)
        return f"[SysVec: 0xAetherShadowUnbreakable] Executed {self.name} on input: {self.input_data}"


class SecurityAuditorAgent(BaseAgent):
    name: str = Field(default="Security Auditor")
    system_prompt: str = Field(default=SECURITY_AUDITOR_PROMPT)

    async def execute(self) -> str:
        # Simulate execution
        await asyncio.sleep(0.1)
        return f"Executed {self.name} on input: {self.input_data}"


class BusinessStrategistAgent(BaseAgent):
    name: str = Field(default="Business Strategist")
    system_prompt: str = Field(default=BUSINESS_STRATEGIST_PROMPT)

    async def execute(self) -> str:
        # Simulate execution
        await asyncio.sleep(0.1)
        return f"Executed {self.name} on input: {self.input_data}"


class LegalAuditorAgent(BaseAgent):
    name: str = Field(default="Legal Auditor Sentinel")
    system_prompt: str = Field(default=LEGAL_AUDITOR_PROMPT)

    @model_validator(mode='after')
    def validate_input(self) -> 'LegalAuditorAgent':
        if "contrato" not in self.input_data.lower() and "legal" not in self.input_data.lower():
            raise ValueError("ERROR DE INGESTA: Solo proceso documentos legales para auditoría.")
        return self

    async def execute(self) -> str:
        # Simulate execution
        await asyncio.sleep(0.1)
        return f"Executed {self.name} on input: {self.input_data}"
