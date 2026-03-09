import asyncio
from pydantic import BaseModel, Field, model_validator
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
        # Simulate execution
        await asyncio.sleep(0.1)
        return f"TECHNICAL_FINAL_RESULT_ONLY\n{self.name} processing complete."


class ContextEngineeringAgent(BaseAgent):
    name: str = "Context Engineering Agent"
    system_prompt: str = CONTEXT_ENGINEERING_PROMPT

    async def execute(self) -> str:
        await asyncio.sleep(0.1)
        return f"TECHNICAL_FINAL_RESULT_ONLY\n{self.name} optimizing prompt..."


class SecurityAuditorAgent(BaseAgent):
    name: str = "Security Auditor Agent"
    system_prompt: str = SECURITY_AUDITOR_PROMPT

    async def execute(self) -> str:
        await asyncio.sleep(0.1)
        return f"TECHNICAL_FINAL_RESULT_ONLY\n{self.name} scanning for vulnerabilities..."


class BusinessStrategistAgent(BaseAgent):
    name: str = "Business Strategist Agent"
    system_prompt: str = BUSINESS_STRATEGIST_PROMPT

    async def execute(self) -> str:
        await asyncio.sleep(0.1)
        return f"TECHNICAL_FINAL_RESULT_ONLY\n{self.name} generating pricing blueprint..."


class LegalAuditorAgent(BaseAgent):
    name: str = "Legal Auditor Agent"
    system_prompt: str = LEGAL_AUDITOR_PROMPT

    @model_validator(mode='after')
    def validate_legal_document(self):
        legal_keywords = ['contrato', 'cláusula', 'ley', 'acuerdo', 'jurisdicción', 'pena', 'derecho', 'legal']
        if not any(keyword in self.input_data.lower() for keyword in legal_keywords):
            raise ValueError("ERROR DE INGESTA")
        return self

    async def execute(self) -> str:
        await asyncio.sleep(0.1)
        return f"TECHNICAL_FINAL_RESULT_ONLY\n{self.name} auditing legal document..."
