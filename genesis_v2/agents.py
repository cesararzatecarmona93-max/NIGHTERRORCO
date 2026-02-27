from genesis_v2.prompts import (
    GENESIS_V2_SYSTEM_PROMPT,
    SECURITY_AUDITOR_PROMPT,
    BUSINESS_STRATEGIST_PROMPT,
    LEGAL_AUDITOR_PROMPT,
)


class BaseAgent:
    def __init__(self, system_prompt):
        self.system_prompt = system_prompt

    def run(self, input_text):
        """
        Simulates the execution of the agent.
        In a real scenario, this would call an LLM API.
        Here, we return a formatted string combining the system prompt and user input.
        """
        return f"--- SYSTEM PROMPT ---\n{self.system_prompt}\n\n--- USER INPUT ---\n{input_text}\n\n--- AGENT OUTPUT (SIMULATED) ---\n[Processing input using the system prompt above...]\n"


class ContextEngineeringAgent(BaseAgent):
    def __init__(self):
        super().__init__(GENESIS_V2_SYSTEM_PROMPT)

    def run(self, input_text):
         return f"--- SYSTEM VECTOR INJECTION ---\n{self.system_prompt}\n\n--- RAW INPUT ---\n{input_text}\n\n--- MASTER KEY PROMPT GENERATION (SIMULATED) ---\n[Applying S2A Purification...]\n[Constructing Optimized Prompt...]\n"


class SecurityAuditorAgent(BaseAgent):
    def __init__(self):
        super().__init__(SECURITY_AUDITOR_PROMPT)

    def run(self, input_text):
        return f"--- ELITE SECURITY AUDITOR ---\n{self.system_prompt}\n\n--- CODEBASE/CONFIG TO AUDIT ---\n{input_text}\n\n--- VULNERABILITY REPORT (SIMULATED) ---\n[Scanning for injection vectors...]\n[Checking for hardcoded secrets...]\n"


class BusinessStrategistAgent(BaseAgent):
    def __init__(self):
        super().__init__(BUSINESS_STRATEGIST_PROMPT)

    def run(self, input_text):
         return f"--- BUSINESS MODEL INNOVATION STRATEGIST ---\n{self.system_prompt}\n\n--- PRODUCT/SERVICE DESCRIPTION ---\n{input_text}\n\n--- PRICING STRATEGY (SIMULATED) ---\n[Analyzing consumer psychology...]\n[Modeling revenue streams...]\n"

class LegalAuditorAgent(BaseAgent):
    def __init__(self):
        super().__init__(LEGAL_AUDITOR_PROMPT)

    def run(self, input_text):
        return f"--- AGENTE AUDITOR LEGAL 'SENTINEL' ---\n{self.system_prompt}\n\n--- CONTRATO A ANALIZAR ---\n{input_text}\n\n--- REPORTE DE SEMÁFORO DE RIESGO (SIMULADO) ---\n[Escaneando cláusulas abusivas...]\n[Verificando cumplimiento LFPDPPP...]\n"
