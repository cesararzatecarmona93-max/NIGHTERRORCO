import asyncio
import hashlib
import time
from typing import List, Optional, Literal
from pydantic import BaseModel, model_validator, Field, TypeAdapter, AfterValidator
from typing_extensions import Annotated
import pytest
from ocg_core import OCGCoreSovereign, validate_sovereign_vocabulary

# --- Instructional Segment ---
class InstructionalSegment(BaseModel):
    content: str
    signature: Optional[str] = None

    @model_validator(mode='after')
    def sign_segment(self):
        if not self.signature:
            self.signature = hashlib.sha256(self.content.encode()).hexdigest()
        return self

# --- Agents ---

class LazarusArchitect(BaseModel):
    """Legacy Transformation Agent"""
    role: str = "LazarusArchitect"
    context: str = "Transforming legacy systems into modern architecture."

    def process(self, input_text: str) -> str:
        return f"[LAZARUS] Analyzing legacy input: {input_text}"

class GovernanceSentinel(BaseModel):
    """Scope Defense Agent"""
    role: str = "GovernanceSentinel"
    context: str = "Ensuring compliance and scope integrity."

    def process(self, input_text: str) -> str:
        if not validate_sovereign_vocabulary(input_text):
            return "[SENTINEL] ALERT: Restricted vocabulary detected."
        return f"[SENTINEL] Scope verified for: {input_text}"

class PotEngine(BaseModel):
    """Financial Calculation Engine"""
    role: str = "PotEngine"
    context: str = "Financial modeling and calculation."

    def process(self, input_text: str) -> str:
        return f"[POT_ENGINE] Calculating financial metrics for: {input_text}"

# --- Nexus Engine ---

class NexusEngine:
    def __init__(self):
        self.lazarus = LazarusArchitect()
        self.sentinel = GovernanceSentinel()
        self.pot_engine = PotEngine()
        self.ocg_core = OCGCoreSovereign()

    def route_and_process(self, input_text: str) -> str:
        """
        Routes user input to specific agents based on keyword detection.
        """
        input_lower = input_text.lower()

        # Semantic Routing Logic
        if "legacy" in input_lower or "transform" in input_lower:
            agent = self.lazarus
            response = agent.process(input_text)
        elif "finance" in input_lower or "cost" in input_lower or "price" in input_lower:
            # Note: "cost" might trigger restricted vocab check if passed to sentinel,
            # but here we route to finance.
            # However, validate_sovereign_vocabulary forbids "costo". "cost" is English.
            agent = self.pot_engine
            response = agent.process(input_text)
        elif "legal" in input_lower or "audit" in input_lower or "contract" in input_lower:
            agent = self.sentinel
            response = agent.process(input_text)
        else:
            # Default to Sentinel for general scope check
            agent = self.sentinel
            response = agent.process(input_text)

        # Audit Receipt
        timestamp = time.time()
        merkle_root = self.ocg_core.generate_merkle_root(timestamp)

        return f"{response}\n[AUDIT: {merkle_root}]"

# --- CLI Demo ---

def main():
    engine = NexusEngine()
    print("NexusEngine Initialized. Type 'exit' to quit.")
    while True:
        try:
            user_input = input(">> ")
            if user_input.lower() == 'exit':
                break
            result = engine.route_and_process(user_input)
            print(result)
        except EOFError:
            break

if __name__ == "__main__":
    main()

# --- TDD Quality Suite ---
# To run: pytest llave_master_gold_v2.py

@pytest.mark.asyncio
async def test_nexus_routing():
    engine = NexusEngine()

    # Test Lazarus
    res_lazarus = engine.route_and_process("transform legacy system")
    assert "[LAZARUS]" in res_lazarus

    # Test Sentinel
    res_sentinel = engine.route_and_process("audit legal contract")
    assert "[SENTINEL]" in res_sentinel

    # Test PotEngine
    res_finance = engine.route_and_process("finance model")
    assert "[POT_ENGINE]" in res_finance

def test_instructional_segment_signing():
    seg = InstructionalSegment(content="Critical Instruction")
    assert seg.signature is not None
    assert len(seg.signature) == 64 # SHA-256 length

def test_restricted_vocabulary():
    engine = NexusEngine()
    # "barato" is restricted
    res = engine.route_and_process("quiero algo barato")
    # Should route to Sentinel (default) or catch it if logic allows
    # In my logic, it goes to Sentinel default
    assert "Restricted vocabulary detected" in res
