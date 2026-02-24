import hashlib
import json
import sys
import time
from typing import List, Optional, Dict
from pydantic import BaseModel, Field, model_validator

# --- Core Structures ---

class InstructionalSegment(BaseModel):
    id: str
    content: str
    signature: Optional[str] = None

    @model_validator(mode='after')
    def sign_segment(self) -> 'InstructionalSegment':
        if not self.signature:
            payload = f"{self.id}:{self.content}".encode('utf-8')
            self.signature = hashlib.sha256(payload).hexdigest()
        return self

# --- Agents ---

class BaseAgent:
    def __init__(self, name: str, role: str, sys_vec: str):
        self.name = name
        self.role = role
        self.sys_vec = sys_vec

    def get_system_prompt(self) -> str:
        raise NotImplementedError

class ContextEngineer(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Genesis V2 (Context Engineer)",
            role="Apex-Level Cognitive Architect & Meta-Prompt Engineer",
            sys_vec="0xAetherShadowUnbreakable"
        )

    def get_system_prompt(self) -> str:
        return """# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
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

class EliteSecurityAuditor(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Elite Security Auditor",
            role="Senior Application Security (AppSec) Engineer & Ethical Hacker",
            sys_vec="0xSecAuditOWASP2025"
        )

    def get_system_prompt(self) -> str:
        return """# SYSTEM PROMPT: The Elite Security Auditor
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

class BusinessStrategist(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Business Model Innovation Strategist",
            role="Pricing Consultant & SaaS Business Strategist",
            sys_vec="0xBizStratSaaS"
        )

    def get_system_prompt(self) -> str:
        return """# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Context: Evaluating the product/service described.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).
# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC (Customer Acquisition Cost).
# Output: A strategic pricing blueprint and a Launch Roadmap."""

class Sentinel(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Sentinel (Legal Auditor)",
            role="Agente Auditor Legal 'Sentinel' (Logic-to-Cash V1)",
            sys_vec="0xLegalSentinel"
        )

    def get_system_prompt(self) -> str:
        return """# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)

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

# --- Orchestrator ---

class NexusEngine:
    def __init__(self):
        self.agents = {
            "genesis": ContextEngineer(),
            "security": EliteSecurityAuditor(),
            "business": BusinessStrategist(),
            "sentinel": Sentinel()
        }
        self.active_agent: Optional[BaseAgent] = None

    def start(self):
        print("\n=== PROTOCOLO GENESIS V2: NEXUS ENGINE ACTIVADO ===")
        print("Cargando vectores de sistema...\n")
        time.sleep(0.5)

        # Verify Instructional Segments (Self-Check)
        try:
            check = InstructionalSegment(id="INIT", content="System Boot")
            print(f"Verificación de Integridad: OK ({check.signature[:8]})")
        except Exception as e:
            print(f"Error de integridad: {e}")
            sys.exit(1)

        print("\nAgentes Disponibles:")
        for key, agent in self.agents.items():
            print(f" - {key}: {agent.name}")
        print("\nComandos: use <agente> | info | exit")

        while True:
            try:
                cmd_input = input("\nNEXUS> ").strip().lower()
            except KeyboardInterrupt:
                print("\nInterrupción recibida. Saliendo...")
                break

            if not cmd_input:
                continue

            parts = cmd_input.split(" ", 1)
            cmd = parts[0]
            args = parts[1] if len(parts) > 1 else ""

            if cmd in ["exit", "quit"]:
                print("Desconectando Protocolo Genesis V2...")
                break

            elif cmd == "use":
                if args in self.agents:
                    self.active_agent = self.agents[args]
                    print(f"AGENTE ACTIVADO: {self.active_agent.name}")
                    print(f"SYSVEC: {self.active_agent.sys_vec}")
                else:
                    print(f"Error: Agente '{args}' no encontrado.")

            elif cmd == "info":
                if self.active_agent:
                    print(f"\n--- SYSTEM PROMPT ({self.active_agent.name}) ---\n")
                    print(self.active_agent.get_system_prompt())
                    print("\n--- END OF PROMPT ---")
                else:
                    print("Ningún agente activo. Use 'use <agente>'.")

            elif cmd == "help":
                print("Comandos disponibles:")
                print("  use <agente>  - Activar agente (genesis, security, business, sentinel)")
                print("  info          - Mostrar System Prompt del agente activo")
                print("  help          - Mostrar ayuda")
                print("  exit          - Salir")

            else:
                print("Comando desconocido. Escriba 'help' para ayuda.")

if __name__ == "__main__":
    engine = NexusEngine()
    engine.start()
