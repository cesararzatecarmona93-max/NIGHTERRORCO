import hashlib
import json
import logging
import re
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field, model_validator
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- CONSTANTS & PROMPTS ---

GENESIS_V2_PROMPT = """# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
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

SENTINEL_PROMPT = """# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)

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

# --- MODELS ---

class InstructionalSegment(BaseModel):
    content: str
    metadata: Dict[str, Any] = Field(default_factory=dict)
    signature: Optional[str] = None

    @model_validator(mode='after')
    def sign_segment(self):
        # Create SHA-256 signature of content
        if not self.signature:
            content_bytes = self.content.encode('utf-8')
            self.signature = hashlib.sha256(content_bytes).hexdigest()
        return self

class AgentResponse(BaseModel):
    agent_id: str
    output: str
    timestamp: datetime = Field(default_factory=datetime.now)
    signature: str

# --- CORE LOGIC ---

def validate_sovereign_vocabulary(text: str) -> bool:
    """Iron Restriction: Prohibit devaluing terms."""
    forbidden = ['barato', 'costo', 'descuento excesivo']
    for word in forbidden:
        if word in text.lower():
            logger.warning(f"Forbidden vocabulary detected: {word}")
            return False
    return True

class NexusEngine:
    def __init__(self):
        self.agents = {
            'genesis_v2': GENESIS_V2_PROMPT,
            'security_auditor': SECURITY_AUDITOR_PROMPT,
            'business_strategist': BUSINESS_STRATEGIST_PROMPT,
            'sentinel': SENTINEL_PROMPT
        }
        logger.info("NexusEngine initialized with agents: " + ", ".join(self.agents.keys()))

    def purify_context(self, user_input: str) -> str:
        """S2A Purification: Remove cognitive noise (parentheses content)."""
        purified = re.sub(r'\([^)]*\)', '', user_input)
        return purified.strip()

    def route_request(self, user_input: str) -> str:
        """Semantic routing based on keywords."""
        lower_input = user_input.lower()
        if any(k in lower_input for k in ['contrato', 'legal', 'ley', 'clausula']):
            return 'sentinel'
        elif any(k in lower_input for k in ['precio', 'costo', 'monetizacion', 'venta']):
            return 'business_strategist'
        elif any(k in lower_input for k in ['seguridad', 'vulnerabilidad', 'hack', 'owasp']):
            return 'security_auditor'
        else:
            return 'genesis_v2'

    def execute_agent(self, agent_id: str, input_text: str) -> AgentResponse:
        if agent_id not in self.agents:
            raise ValueError(f"Unknown agent: {agent_id}")

        system_prompt = self.agents[agent_id]

        # Specific logic for Sentinel
        if agent_id == 'sentinel':
            legal_keywords = ['contrato', 'clausula', 'ley', 'acuerdo', 'terminos', 'legal', 'firma', 'arrendamiento', 'servicios', 'pagare']
            if not any(kw in input_text.lower() for kw in legal_keywords):
                output = "ERROR DE INGESTA: Solo proceso documentos legales para auditoría."
                return AgentResponse(
                    agent_id=agent_id,
                    output=output,
                    signature=hashlib.sha256(output.encode()).hexdigest()
                )

        # Mock LLM execution - In a real system this would call an API
        logger.info(f"Executing Agent {agent_id} with input: {input_text[:50]}...")

        # Simulate processing based on prompt
        mock_output = f"[{agent_id.upper()} OUTPUT]\n"
        mock_output += f"Based on System Prompt:\n{system_prompt[:100]}...\n\n"
        mock_output += f"Processed Input: {input_text}\n"
        mock_output += f"[END TRANSMISSION]"

        signature = hashlib.sha256(mock_output.encode()).hexdigest()

        return AgentResponse(
            agent_id=agent_id,
            output=mock_output,
            signature=signature
        )

# --- CLI INTERFACE ---

if __name__ == "__main__":
    import sys
    engine = NexusEngine()

    if len(sys.argv) > 1:
        # CLI Mode
        input_text = " ".join(sys.argv[1:])
        agent_id = engine.route_request(input_text)
        print(f"Routing to: {agent_id}")
        response = engine.execute_agent(agent_id, input_text)
        print("\n" + response.output)
    else:
        # Interactive Mode
        print("NexusEngine Online. Type 'exit' to quit.")
        while True:
            try:
                user_in = input("USER> ")
                if user_in.lower() in ['exit', 'quit']:
                    break

                # Purify
                purified = engine.purify_context(user_in)

                # Route
                agent_id = engine.route_request(purified)
                print(f"[System] Routing to Agent: {agent_id}")

                # Execute
                response = engine.execute_agent(agent_id, purified)
                print(f"\n{response.output}\n[Signature: {response.signature[:8]}]\n")
            except KeyboardInterrupt:
                break
