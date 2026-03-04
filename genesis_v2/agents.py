import asyncio
from typing import Any, Dict
from pydantic import BaseModel, Field

from .prompts import (
    CONTEXT_ENGINEERING_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT
)


class BaseAgent(BaseModel):
    name: str = Field(..., description="The name of the agent")
    system_prompt: str = Field(..., description="The system prompt defining the agent's behavior")

    async def execute(self, input_data: str) -> Dict[str, Any]:
        """
        Simulates asynchronous execution of the agent.
        Subclasses can override this to implement specific behavior.
        """
        await asyncio.sleep(0.1) # Simulate processing time
        return {
            "agent": self.name,
            "status": "success",
            "result": f"Processed by {self.name}: {input_data[:50]}..."
        }


class ContextEngineeringAgent(BaseAgent):
    name: str = "Context Engineering Agent"
    system_prompt: str = CONTEXT_ENGINEERING_PROMPT

    async def execute(self, input_data: str) -> Dict[str, Any]:
        await asyncio.sleep(0.1)
        return {
            "agent": self.name,
            "status": "success",
            "result": "Master Key Prompt Generated"
        }


class SecurityAuditorAgent(BaseAgent):
    name: str = "Security Auditor Agent"
    system_prompt: str = SECURITY_AUDITOR_PROMPT

    async def execute(self, input_data: str) -> Dict[str, Any]:
        await asyncio.sleep(0.1)
        return {
            "agent": self.name,
            "status": "success",
            "result": "Vulnerability Report Generated"
        }


class BusinessStrategistAgent(BaseAgent):
    name: str = "Business Strategist Agent"
    system_prompt: str = BUSINESS_STRATEGIST_PROMPT

    async def execute(self, input_data: str) -> Dict[str, Any]:
        await asyncio.sleep(0.1)
        return {
            "agent": self.name,
            "status": "success",
            "result": "Pricing Blueprint Generated"
        }


class LegalAuditorAgent(BaseAgent):
    name: str = "Legal Auditor Sentinel"
    system_prompt: str = LEGAL_AUDITOR_PROMPT

    async def execute(self, input_data: str) -> Dict[str, Any]:
        await asyncio.sleep(0.1)
        if "ERROR DE INGESTA" in input_data:
            return {
                "agent": self.name,
                "status": "error",
                "result": "ERROR DE INGESTA: Solo proceso documentos legales para auditoría."
            }
        return {
            "agent": self.name,
            "status": "success",
            "result": "Legal Audit Report Generated"
        }
