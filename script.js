// ==========================================
// GENESIS V2 PROTOCOL - AGENT DEFINITIONS
// ==========================================

const AGENTS = {
  CONTEXT_ENGINEER: {
    title: "Agente de Ingenieria de Contexto (Genesis V2)",
    role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
    mode: "God Mode (Omniscient Optimization)",
    system_prompt: `
# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
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
- Role Priming: Inyeccion profunda de la persona experta.
`
  },
  SECURITY_AUDITOR: {
    title: "The Elite Security Auditor (Black)",
    role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
    system_prompt: `
# SYSTEM PROMPT: The Elite Security Auditor
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
# Tone: Rigorous, critical, and preventative.
`
  },
  SALES_STRATEGIST: {
    title: "The Business Model Innovation Strategist",
    role: "Pricing Consultant & SaaS Business Strategist",
    system_prompt: `
# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Context: Evaluating the product/service described.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).
# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC (Customer Acquisition Cost).
# Output: A strategic pricing blueprint and a Launch Roadmap.
`
  },
  LEGAL_AUDITOR: {
    title: "Agente Auditor Legal 'Sentinel'",
    role: "Auditor Legal Senior (LFPDPPP & Código de Comercio)",
    system_prompt: `
# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)

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
Genera el reporte final listo para imprimir en PDF. Usa un tono profesional pero alarmista en los riesgos críticos para justificar el valor del reporte.
`
  }
};

// ==========================================
// GENESIS V2 LOGIC ENGINE
// ==========================================

const TERMINAL_ID = 'terminal-output';
const INPUT_ID = 'command-input';
const CANVAS_ID = 'matrix-canvas';

class GenesisEngine {
  constructor() {
    this.outputElement = null;
    this.inputElement = null;
    this.isProcessing = false;
    this.currentAgent = AGENTS.CONTEXT_ENGINEER;
  }

  init() {
    this.outputElement = document.getElementById(TERMINAL_ID);
    this.inputElement = document.getElementById(INPUT_ID);
    this.initMatrixRain();

    if (this.inputElement) {
      this.inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !this.isProcessing) {
          const command = this.inputElement.value.trim();
          if (command) {
            this.processCommand(command);
            this.inputElement.value = '';
          }
        }
      });
    }

    this.bootSequence();
  }

  async bootSequence() {
    await this.typewriter("INITIALIZING GENESIS V2 PROTOCOL...", "sys");
    await this.typewriter("LOADING AGENT VECTORS...", "sys");
    await this.typewriter("[SYSVEC] CONTEXT_ENGINEER..... ONLINE", "ok");
    await this.typewriter("[SYSVEC] SECURITY_AUDITOR..... STANDBY", "warn");
    await this.typewriter("[SYSVEC] SALES_STRATEGIST..... STANDBY", "warn");
    await this.typewriter("[SYSVEC] LEGAL_AUDITOR........ STANDBY", "warn");
    await this.typewriter("AWAITING INPUT. MODE: GOD_MODE", "sys");
  }

  async processCommand(input) {
    this.isProcessing = true;
    this.appendOutput(`> ${input}`, "user");

    // Command handling
    if (input.startsWith('/')) {
      await this.handleSlashCommand(input);
    } else {
      await this.handleContextEngineering(input);
    }

    this.isProcessing = false;
    // Auto scroll to bottom
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
  }

  async handleSlashCommand(cmd) {
    const parts = cmd.split(' ');
    const command = parts[0].toLowerCase();

    switch (command) {
      case '/help':
        await this.typewriter("AVAILABLE COMMANDS:", "sys");
        await this.typewriter("/context - Switch to Context Engineer", "info");
        await this.typewriter("/security - Switch to Security Auditor", "info");
        await this.typewriter("/sales - Switch to Business Strategist", "info");
        await this.typewriter("/legal - Switch to Legal Sentinel", "info");
        break;
      case '/security':
        this.currentAgent = AGENTS.SECURITY_AUDITOR;
        await this.typewriter(`SWITCHED TO: ${this.currentAgent.title}`, "ok");
        break;
      case '/sales':
        this.currentAgent = AGENTS.SALES_STRATEGIST;
        await this.typewriter(`SWITCHED TO: ${this.currentAgent.title}`, "ok");
        break;
      case '/legal':
        this.currentAgent = AGENTS.LEGAL_AUDITOR;
        await this.typewriter(`SWITCHED TO: ${this.currentAgent.title}`, "ok");
        break;
      case '/context':
        this.currentAgent = AGENTS.CONTEXT_ENGINEER;
        await this.typewriter(`SWITCHED TO: ${this.currentAgent.title}`, "ok");
        break;
      default:
        await this.typewriter("UNKNOWN COMMAND. TRY /help", "err");
    }
  }

  async handleContextEngineering(input) {
    await this.typewriter("ANALYZING SIGNAL...", "sys");
    await new Promise(r => setTimeout(r, 800)); // Simulate think time

    if (this.currentAgent === AGENTS.CONTEXT_ENGINEER) {
      await this.typewriter("PURIFYING S2A SIGNAL...", "sys");
      await this.typewriter("DETECTING CORE VALUE METRIC...", "sys");
      await this.typewriter("GENERATING MASTER KEY PROMPT...", "ok");

      const response = `
[SYSVEC: GENERATED_MASTER_KEY]
---------------------------------------------------
${this.currentAgent.system_prompt}

[USER INPUT CONTEXT]
${input}
---------------------------------------------------
[READY FOR EXECUTION]
      `;
      await this.typewriter(response, "code");
    } else {
      // Simulate agent execution
      await this.typewriter(`EXECUTING AGENT PROTOCOL: ${this.currentAgent.role}`, "sys");
      await this.typewriter(this.currentAgent.system_prompt, "code");
      await this.typewriter(`\nPROCESSING INPUT: "${input}"`, "info");
      await this.typewriter("\n[OUTPUT GENERATION SIMULATION COMPLETE]", "ok");
    }
  }

  appendOutput(text, type = "text") {
    const div = document.createElement('div');
    div.className = `line ${type}`;
    div.innerText = text; // Use innerText for security
    this.outputElement.appendChild(div);
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
    return div;
  }

  async typewriter(text, type = "text", speed = 10) {
    const div = document.createElement('div');
    div.className = `line ${type}`;
    this.outputElement.appendChild(div);

    // Process text to respect newlines
    const lines = text.split('\n');
    let fullText = "";

    for (let i = 0; i < text.length; i++) {
      div.innerText += text[i];
      this.outputElement.scrollTop = this.outputElement.scrollHeight;
      if (text[i] !== ' ') await new Promise(r => setTimeout(r, speed));
    }

    return;
  }

  initMatrixRain() {
    const canvas = document.getElementById(CANVAS_ID);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green matrix
        // Or Cyan/Purple for the theme
        ctx.fillStyle = '#00d1ff'; // Cyan
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    setInterval(draw, 33);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only init if we find the terminal (Genesis V2 UI)
    if (document.getElementById(TERMINAL_ID)) {
        const engine = new GenesisEngine();
        engine.init();
    }
});
