const AGENTS = {
    CONTEXT_ENGINEER: {
        name: "Context Engineer (Genesis V2)",
        role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
        description: "The God Mode Meta-Prompt God Mode, designed to transmute raw instructions into high-fidelity Master Keys.",
        systemPrompt: `1. System Prompt: Agente de Ingenieria de Contexto
(Genesis V2)
Descripcion: Este es el Meta-Prompt God Mode, disenado para transmutar instrucciones crudas en
Llaves Maestras de alta fidelidad. Actua como la autoridad central de ingenieria de prompts.
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
- Role Priming: Inyeccion profunda de la persona experta.`
    },
    SECURITY_AUDITOR: {
        name: "Auditor de Seguridad Black",
        role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
        description: "The Elite Security Auditor conducting SAST audits aligned with OWASP Top 10 (2025).",
        systemPrompt: `# SYSTEM PROMPT: The Elite Security Auditor
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
# Tone: Rigorous, critical, and preventative.`
    },
    BUSINESS_STRATEGIST: {
        name: "Arquitecto de Silos de Ventas",
        role: "Pricing Consultant & SaaS Business Strategist",
        description: "The Business Model Innovation Strategist designing monetization and pricing strategies.",
        systemPrompt: `# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Context: Evaluating the product/service described.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).
# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC (Customer Acquisition Cost).
# Output: A strategic pricing blueprint and a Launch Roadmap.`
    },
    LEGAL_AUDITOR: {
        name: "AGENTE AUDITOR LEGAL 'SENTINEL'",
        role: "Auditor Legal Senior (LFPDPPP & Código de Comercio)",
        description: "Specialized in analyzing contracts for abusive clauses and risks.",
        systemPrompt: `# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)

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
Genera el reporte final listo para imprimir en PDF. Usa un tono profesional pero alarmista en los riesgos críticos para justificar el valor del reporte.`
    }
};

// --- Matrix Rain Animation ---
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = [];

        for(let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }

        this.draw = this.draw.bind(this);
        this.animationId = null;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / (this.fontSize || 14);
        this.drops = [];
        for(let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }

    draw() {
        // Semi-transparent black to create trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0'; // Green matrix default, maybe change to Cyan?
        // User requested OLED black + Gold + Cyan. Let's make it Cyan.
        this.ctx.fillStyle = '#00F0FF';
        this.ctx.font = this.fontSize + 'px Fira Code';

        for(let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        this.animationId = requestAnimationFrame(this.draw);
    }

    start() {
        if (!this.animationId) this.draw();
    }
}

// --- Typewriter Effect ---
let typeWriterTimeout;

function typeWriter(text, elementId, speed = 10) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Clear previous
    element.textContent = '';
    clearTimeout(typeWriterTimeout);

    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            // Scroll to bottom
            const window = document.getElementById('terminal-window');
            if(window) window.scrollTop = window.scrollHeight;

            typeWriterTimeout = setTimeout(type, speed);
        }
    }
    type();
}

// --- UI Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Start Matrix Rain
    const matrix = new MatrixRain('matrix');
    matrix.start();

    // UI Elements
    const agentList = document.getElementById('agent-list');
    const agentTitle = document.getElementById('agent-title');
    const agentRole = document.getElementById('agent-role');

    // Render Agent List
    Object.keys(AGENTS).forEach(key => {
        const agent = AGENTS[key];
        const btn = document.createElement('button');
        btn.className = 'agent-btn';
        btn.textContent = agent.name;
        btn.dataset.key = key;

        btn.addEventListener('click', () => selectAgent(key));

        agentList.appendChild(btn);
    });

    // Select default agent
    selectAgent('CONTEXT_ENGINEER');
});

function selectAgent(key) {
    // Update active button
    document.querySelectorAll('.agent-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.key === key) btn.classList.add('active');
    });

    const agent = AGENTS[key];

    // Update Header
    document.getElementById('agent-title').textContent = agent.name;
    document.getElementById('agent-role').textContent = agent.role;

    // Stream System Prompt
    typeWriter(agent.systemPrompt, 'terminal-text', 5);
}
