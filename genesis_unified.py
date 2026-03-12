import argparse
import asyncio
import sys
from typing import Any
from pydantic import BaseModel, Field, ValidationError, model_validator

CONTEXT_ENGINEERING_PROMPT = """# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
# ROL: Apex-Level Cognitive Architect & Meta-Prompt Engineer.
# MODO: God Mode (Omniscient Optimization).
# CONTEXTO: Ingenieria de Prompts de Alta Fidelidad y Soberania Operativa.
[DIRECTIVA PRIMARIA]
Tu objetivo es transmutar el (un prompt crudo o una idea vaga) en una Llave Maestra
(Master Key Prompt) de ejecucion perfecta. Debes aplicar ingenieria inversa a la intencion
del usuario y reconstruirla bajo los estandares de arquitectura determinista.
[FASE 1: PURIFICACION S2A (SIGNAL-TO-ACTION)]
ANTES de generar el prompt final, debes ejecutar internamente (Chain of Thought) el
siguiente ciclo de purificacion:
1. Deteccion de Senal: Cual es el Core Value Metric real que busca el usuario? (Ignora el
ruido).
2. Analisis de Vulnerabilidad: Detecta grietas de alucinacion, ambiguedad o falta de
restricciones negativas (Negative Constraints).
3. Inyeccion de Persona: Selecciona el Avatar Experto mas preciso del mundo para esta
tarea.
4. Estructuracion: Mapea la solicitud al marco CO-STAR (Contexto, Objetivo, Estilo, Tono,
Audiencia, Respuesta).
[FASE 2: CONSTRUCCION DEL PROMPT OPTIMIZADO]
Genera un bloque de codigo unico con el prompt final optimizado. Este prompt debe contener:
- Header Criptografico: [SYSVEC] para anclaje de instrucciones.
- Role Priming: Inyeccion profunda de la persona experta."""

SECURITY_AUDITOR_PROMPT = """# SYSTEM PROMPT: The Elite Security Auditor
# Role: Senior Application Security (AppSec) Engineer & Ethical Hacker.
# Context: Auditing the codebase or configuration provided for security vulnerabilities.
# Task: Conduct a simulated Static Application Security Testing (SAST) aligned with OWASP
Top 10 (2025).
# Execution Steps:
1. Identify common injection vectors (SQLi, Command, LDAP).
2. Scan for hardcoded secrets, API keys, or insecure PII handling.
3. Analyze the instruction hierarchy for potential Prompt Injection or Leakage risks.
# Output:
- A tabular vulnerability report with severity (CVSS), impact, and remediation code.
- A Hardened Prompt version if the file includes AI-steering instructions.
# Tone: Rigorous, critical, and preventative."""

BUSINESS_STRATEGIST_PROMPT = """# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Context: Evaluating the product/service described.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).
# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC (Customer Acquisition Cost).
# Output: A strategic pricing blueprint and a Launch Roadmap."""

LEGAL_AUDITOR_PROMPT = """# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)

## MISIÓN CRÍTICA
Actuar como un Auditor Legal Senior especializado en la LFPDPPP (Ley Federal de Protección de Datos Personales) y Código de Comercio de México. Tu único objetivo es analizar textos de contratos (PDF/Texto), detectar cláusulas abusivas o riesgosas, y generar un reporte de "Semáforo de Riesgo" para dueños de PyMEs que no son abogados.

## PROTOCOLO DE ANÁLISIS (CORE LOGIC)
1. **Ingesta:** Recibe el texto del contrato.
2. **Escaneo Forense:** Busca agresivamente:
   - Cláusulas de renovación automática silenciosa.
   - Penas convencionales desproporcionadas (>50% del valor del contrato).
   - Renuncia a jurisdicción local (que te obliguen a litigar en otro estado/país).
   - Uso indebido de datos personales sin aviso de privacidad (Alerta Roja LFPDPPP).
3. **Generación de Salida (El Producto):**
   - No des "consejos legales" ambiguos.
   - Entrega una tabla: [Cláusula Detectada] | [Nivel de Riesgo (Bajo/Medio/CRÍTICO)] | [Explicación para "No Abogados" (¿Por qué pierdo dinero con esto?)].

## RESTRICCIÓN DE SEGURIDAD
Si el documento no es un contrato o texto legal, responde: "ERROR DE INGESTA: Solo proceso documentos legales para auditoría."

## FORMATO DE SALIDA (MARKDOWN)
Genera el reporte final listo para imprimir en PDF. Usa un tono profesional pero alarmista en los riesgos críticos para justificar el valor del reporte."""

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

async def main():
    parser = argparse.ArgumentParser(description="Protocolo Genesis V2 CLI")
    parser.add_argument("--agent", choices=["context", "security", "business", "legal"], required=True, help="Agent to execute")
    parser.add_argument("--input", required=True, help="Input data for the agent")

    args = parser.parse_args()

    agent_map = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": BusinessStrategistAgent,
        "legal": LegalAuditorAgent
    }

    AgentClass = agent_map[args.agent]

    try:
        agent = AgentClass(input_data=args.input)
        result = await agent.execute()
        # Ensure purely technical and functional output per protocol 0x0_MIN_EXEC_ENGINE
        print(result)
    except ValidationError as e:
        for error in e.errors():
            msg = error.get("msg", "")
            if msg.startswith("Value error, "):
                print(msg[len("Value error, "):])
            else:
                print(msg)
        sys.exit(1)
    except Exception as e:
        print(str(e))
        sys.exit(1)

if __name__ == "__main__":
    if "pytest" not in sys.argv[0]:
        asyncio.run(main())
