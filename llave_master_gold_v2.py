import pytest
import sys
from pydantic import BaseModel, Field, model_validator, ValidationError
from enum import Enum
from ocg_core import OCGCoreSovereign

class SecurityLevel(str, Enum):
    SYSTEM = "SYSTEM"
    USER = "USER"
    DATA = "DATA"

class InstructionalSegment(BaseModel):
    content: str
    security_level: SecurityLevel
    signature: str = Field(default="")

    @model_validator(mode='after')
    def sign_content(self):
        if not self.signature:
            self.signature = OCGCoreSovereign.sign_segment(self.content, self.security_level.value)
        return self

def validate_sovereign_vocabulary(text: str):
    forbidden = ["barato", "costo"]
    for word in forbidden:
        if word in text.lower():
            raise ValueError(f"Iron Restriction Violation: Term '{word}' is devaluing and prohibited.")
    return True

class NexusEngine:
    """
    Orchestrator engine that dispatches tasks to specific agents based on semantic intent.
    """
    def dispatch(self, task_content: str) -> str:
        content_lower = task_content.lower()

        # Semantic routing logic (simulated)
        if "auditoria" in content_lower or "seguridad" in content_lower or "owasp" in content_lower:
            return "Security Auditor (Black)"
        elif "precio" in content_lower or "ventas" in content_lower or "estrategia" in content_lower:
            return "Business Strategist"
        elif "legal" in content_lower or "contrato" in content_lower or "lfpdppp" in content_lower:
            return "Legal Sentinel"
        else:
            return "Context Engineer (Genesis V2)"

# --- TDD Suite ---

@pytest.mark.parametrize("content, expected_agent", [
    ("Realizar auditoria de seguridad", "Security Auditor (Black)"),
    ("Estrategia de precios SaaS", "Business Strategist"),
    ("Revisar contrato legal", "Legal Sentinel"),
    ("Optimizar prompt", "Context Engineer (Genesis V2)"),
])
def test_nexus_dispatch(content, expected_agent):
    nexus = NexusEngine()
    assert nexus.dispatch(content) == expected_agent

def test_instructional_segment_signature():
    segment = InstructionalSegment(content="Test content", security_level=SecurityLevel.USER)
    assert segment.signature != ""
    assert ":" in segment.signature

def test_vocabulary_violation():
    with pytest.raises(ValueError, match="Iron Restriction Violation"):
        validate_sovereign_vocabulary("Esto es muy barato")

def test_merkle_root_format():
    timestamp = "2025-01-01T00:00:00"
    root = OCGCoreSovereign.generate_merkle_root(timestamp)
    # Validate it's a sha256 hex digest (64 chars)
    assert len(root) == 64
    import string
    assert all(c in string.hexdigits for c in root)

# --- CLI Demo ---
def main():
    print("NexusEngine: Protocolo Genesis V2 CLI")
    nexus = NexusEngine()
    while True:
        try:
            # Check for EOF (e.g. in non-interactive environments)
            try:
                user_input = input("Enter task (or 'exit'): ")
            except EOFError:
                break

            if user_input.lower() == 'exit':
                break

            # Validate Vocabulary
            validate_sovereign_vocabulary(user_input)

            # Create Instructional Segment (simulated security level)
            segment = InstructionalSegment(content=user_input, security_level=SecurityLevel.USER)
            print(f"Segment Signed: {segment.signature[:20]}...")

            # Dispatch
            agent = nexus.dispatch(segment.content)
            print(f"-> Dispatched to: {agent}")

        except ValueError as e:
            print(f"Error: {e}")
        except ValidationError as e:
            print(f"Validation Error: {e}")
        except Exception as e:
            print(f"Unexpected Error: {e}")

if __name__ == "__main__":
    # If arguments are passed, assume pytest might be invoked or just ignore.
    # The user might run `python llave_master_gold_v2.py`.
    main()
