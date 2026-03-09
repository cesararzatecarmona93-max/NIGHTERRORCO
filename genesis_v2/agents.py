from pydantic import BaseModel, model_validator
import asyncio
from typing import Any
from .prompts import (
    CONTEXT_ENGINEERING_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT
)

class BaseAgent(BaseModel):
    system_prompt: str = ""

    async def execute(self, input_data: str) -> str:
        await asyncio.sleep(0.1)
        return f"Ejecutando con prompt:\n{self.system_prompt}\n\nDatos de entrada: {input_data}"

class ContextEngineeringAgent(BaseAgent):
    system_prompt: str = CONTEXT_ENGINEERING_PROMPT

class SecurityAuditorAgent(BaseAgent):
    system_prompt: str = SECURITY_AUDITOR_PROMPT

class BusinessStrategistAgent(BaseAgent):
    system_prompt: str = BUSINESS_STRATEGIST_PROMPT

class LegalAuditorAgent(BaseAgent):
    system_prompt: str = LEGAL_AUDITOR_PROMPT
    input_document: str = ""

    @model_validator(mode='before')
    @classmethod
    def check_legal_contract(cls, values: Any) -> Any:
        input_document = values.get('input_document', "")
        if input_document:
            legal_keywords = ['contrato', 'cláusula', 'legal', 'ley', 'acuerdo', 'artículo', 'jurisdicción']
            if not any(k in input_document.lower() for k in legal_keywords):
                raise ValueError("ERROR DE INGESTA")
        return values

    async def execute(self, input_data: str) -> str:
        return await super().execute(input_data)
