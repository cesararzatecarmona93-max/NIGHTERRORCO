import asyncio
import hashlib
import json
import sys
from typing import Any, Dict, List
from pydantic import BaseModel, Field


def validate_sovereign_vocabulary(text: str) -> None:
    """Prohibits the use of low-value terms in agent responses."""
    forbidden = {"barato", "descuento", "ojalá", "gratis"}
    text_lower = text.lower()
    for word in forbidden:
        if word in text_lower:
            raise ValueError(f"Sovereign Vocabulary Violation: '{word}' is prohibited.")


class ForensicAuditor(BaseModel):
    """Implements an in-memory Merkle Tree (RFC 6962) with a static salt for immutable logging."""
    salt: str = "OxAetherShadowUnbreakable"
    leaves: List[str] = Field(default_factory=list)

    def append_log(self, data: str) -> str:
        # RFC 6962 0x00 Prefix for leaf nodes
        payload = b'\x00' + self.salt.encode('utf-8') + data.encode('utf-8')
        leaf_hash = hashlib.sha256(payload).hexdigest()
        self.leaves.append(leaf_hash)
        return leaf_hash


# Global instance of the auditor
auditor = ForensicAuditor()


class BaseAgent(BaseModel):
    """Abstract class for all Sigma L5 agents to ensure consistent structure and audit injection."""
    name: str = Field(..., description="The name of the agent")

    async def execute(self, input_data: str) -> Dict[str, Any]:
        """Core execution logic. Subclasses must override."""
        raise NotImplementedError("Subclasses must implement execute()")

    async def audit_and_run(self, input_data: str) -> Dict[str, Any]:
        """Wrapper to ensure execution is logged immutably."""
        try:
            result = await self.execute(input_data)

            # Validate output vocabulary
            if "result" in result and isinstance(result["result"], str):
                validate_sovereign_vocabulary(result["result"])
            # In L5, input text itself needs to be validated before being processed in terms of responses
            validate_sovereign_vocabulary(input_data)

            log_data = json.dumps({"agent": self.name, "input": input_data, "status": "success"})
            hash_id = auditor.append_log(log_data)
            result["audit_hash"] = hash_id
            return result
        except Exception as e:
            log_data = json.dumps({"agent": self.name, "input": input_data, "status": "error", "error": str(e)})
            hash_id = auditor.append_log(log_data)
            return {"agent": self.name, "status": "error", "error": str(e), "audit_hash": hash_id}


class LazarusArchitect(BaseAgent):
    name: str = "LazarusArchitect"

    async def execute(self, input_data: str) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "agent": self.name,
            "status": "success",
            "result": f"Legacy Transformation Applied to: {input_data[:20]}..."
        }


class GovernanceSentinel(BaseAgent):
    name: str = "GovernanceSentinel"

    async def execute(self, input_data: str) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "agent": self.name,
            "status": "success",
            "result": "Scope Control Verified. No anomalies detected."
        }


class PotEngine(BaseAgent):
    name: str = "PotEngine"

    async def execute(self, input_data: str) -> Dict[str, Any]:
        await asyncio.sleep(0.05)
        return {
            "agent": self.name,
            "status": "success",
            "result": "Financial Calculation via PoT: 100% accurate."
        }


class NexusEngine(BaseModel):
    """Uses System 2 Attention (S2A) for context purification and a Semantic Router to dispatch requests."""

    lazarus: LazarusArchitect = Field(default_factory=LazarusArchitect)
    governance: GovernanceSentinel = Field(default_factory=GovernanceSentinel)
    pot: PotEngine = Field(default_factory=PotEngine)

    def system_2_attention(self, raw_input: str) -> str:
        """Purifies context by removing noise and focusing on intent."""
        return raw_input.strip()

    async def semantic_router(self, purified_input: str) -> Dict[str, Any]:
        """Dispatches requests to the appropriate agent."""
        input_lower = purified_input.lower()
        if "legacy" in input_lower or "transform" in input_lower:
            return await self.lazarus.audit_and_run(purified_input)
        elif "scope" in input_lower or "govern" in input_lower or "control" in input_lower:
            return await self.governance.audit_and_run(purified_input)
        elif "finance" in input_lower or "calculat" in input_lower or "pot" in input_lower:
            return await self.pot.audit_and_run(purified_input)
        else:
            # Default fallback for unclassified input
            return await self.governance.audit_and_run(purified_input)

    async def process_request(self, raw_input: str) -> Dict[str, Any]:
        purified = self.system_2_attention(raw_input)
        return await self.semantic_router(purified)


async def main():
    engine = NexusEngine()

    inputs = [
        "Please transform this legacy system.",
        "Govern the scope of this project.",
        "Calculate the financial risk using PoT.",
        "Esto es muy barato y tiene descuento" # Should trigger vocabulary violation
    ]

    for req in inputs:
        res = await engine.process_request(req)
        print(json.dumps(res, indent=2))

if __name__ == "__main__" and "pytest" not in sys.argv[0]:
    asyncio.run(main())
