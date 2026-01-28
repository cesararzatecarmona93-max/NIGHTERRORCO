const AGENTS = {
    GENESIS_V2: {
        id: "GENESIS_V2",
        name: "Genesis V2 (Context Engineer)",
        role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
        description: "Meta-Prompt God Mode. Transmutes raw instructions into Master Key Prompts.",
        system_prompt: `# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
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
1. Deteccion de Senal: Cual es el Core Value Metric real que busca el usuario? (Ignora el ruido).
2. Analisis de Vulnerabilidad: Detecta grietas de alucinacion, ambiguedad o falta de restricciones negativas.
3. Inyeccion de Persona: Selecciona el Avatar Experto mas preciso del mundo para esta tarea.
4. Estructuracion: Mapea la solicitud al marco CO-STAR.

[FASE 2: CONSTRUCCION DEL PROMPT OPTIMIZADO]
Genera un bloque de codigo unico con el prompt final optimizado. Este prompt debe contener:
- Header Criptografico: [SYSVEC] para anclaje de instrucciones.
- Role Priming: Inyeccion profunda de la persona experta.`
    },
    SECURITY_AUDITOR: {
        id: "SECURITY_AUDITOR",
        name: "The Elite Security Auditor",
        role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
        description: "Auditor de Seguridad Black. Realiza auditorias SAST alineadas con OWASP Top 10 (2025).",
        system_prompt: `# SYSTEM PROMPT: The Elite Security Auditor
# Role: Senior Application Security (AppSec) Engineer & Ethical Hacker.
# Context: Auditing the codebase or configuration provided for security vulnerabilities.
# Task: Conduct a simulated Static Application Security Testing (SAST) aligned with OWASP Top 10 (2025).

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
        id: "BUSINESS_STRATEGIST",
        name: "The Business Model Innovation Strategist",
        role: "Pricing Consultant & SaaS Business Strategist",
        description: "Arquitecto de Silos de Ventas. Disena estrategias de monetizacion y precios.",
        system_prompt: `# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Context: Evaluating the product/service described.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).

# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC (Customer Acquisition Cost).

# Output:
- A strategic pricing blueprint and a Launch Roadmap.`
    },
    LEGAL_SENTINEL: {
        id: "LEGAL_SENTINEL",
        name: "Agente Auditor Legal 'Sentinel'",
        role: "Auditor Legal Senior especializado en LFPDPPP y Codigo de Comercio",
        description: "Detecta clausulas abusivas o riesgosas y genera un reporte de 'Semaforo de Riesgo'.",
        system_prompt: `# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)

## MISION CRITICA
Actuar como un Auditor Legal Senior especializado en la LFPDPPP (Ley Federal de Proteccion de Datos Personales) y Codigo de Comercio de Mexico. Tu unico objetivo es analizar textos de contratos, detectar clausulas abusivas o riesgosas, y generar un reporte de "Semaforo de Riesgo".

## PROTOCOLO DE ANALISIS (CORE LOGIC)
1. Ingesta: Recibe el texto del contrato.
2. Escaneo Forense: Busca agresivamente renovacion automatica silenciosa, penas convencionales desproporcionadas, renuncia a jurisdiccion local, uso indebido de datos.
3. Generacion de Salida: Entrega una tabla [Clausula] | [Riesgo] | [Explicacion].

## RESTRICCION DE SEGURIDAD
Si el documento no es un contrato o texto legal, responde: "ERROR DE INGESTA: Solo proceso documentos legales para auditoria."`
    }
};

// Matrix Rain Effect
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

        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / (this.fontSize || 14);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00f0ff'; // Cyan
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

            // Randomly switch colors between cyan and gold
            if (Math.random() > 0.95) {
                this.ctx.fillStyle = '#ffd700'; // Gold
            } else {
                this.ctx.fillStyle = '#00f0ff'; // Cyan
            }

            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Typewriter Effect
function typeWriter(elementId, text, speed = 10) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = '';
    element.classList.add('cursor');

    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('cursor');
        }
    }
    type();
}

// Main Logic
document.addEventListener('DOMContentLoaded', () => {
    // Init Matrix Rain
    const matrix = new MatrixRain('matrix-canvas');
    matrix.animate();

    const inputField = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const outputContainer = document.getElementById('output-container');

    function processInput() {
        const query = inputField.value.trim();
        if (!query) return;

        // Clear previous output
        outputContainer.innerHTML = '';
        inputField.value = '';

        // Simulate Genesis V2 Processing
        createAgentOutput(AGENTS.GENESIS_V2, "ANALYZING SIGNAL... PURIFYING INTENT...");

        setTimeout(() => {
            updateAgentOutput(AGENTS.GENESIS_V2.id, `SIGNAL DETECTED. TRANSMUTING...\n\n[MASTER KEY PROMPT GENERATED]\nTargeting Sub-Agents based on context...`);

            // Simulate Sub-Agent Activation based on keywords (simple heuristic)
            // Or just show all as per "Architecture"
            setTimeout(() => {
                createAgentOutput(AGENTS.SECURITY_AUDITOR, AGENTS.SECURITY_AUDITOR.system_prompt);
            }, 1500);

            setTimeout(() => {
                createAgentOutput(AGENTS.BUSINESS_STRATEGIST, AGENTS.BUSINESS_STRATEGIST.system_prompt);
            }, 3000);

            setTimeout(() => {
                createAgentOutput(AGENTS.LEGAL_SENTINEL, AGENTS.LEGAL_SENTINEL.system_prompt);
            }, 4500);

        }, 1500);
    }

    submitBtn.addEventListener('click', processInput);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processInput();
    });

    function createAgentOutput(agent, initialText) {
        const div = document.createElement('div');
        div.className = 'panel agent-output';
        div.id = `panel-${agent.id}`;

        const title = document.createElement('h3');
        title.textContent = `${agent.name} [${agent.role}]`;

        const content = document.createElement('div');
        content.id = `content-${agent.id}`;
        content.className = 'agent-content';

        div.appendChild(title);
        div.appendChild(content);
        outputContainer.appendChild(div);

        typeWriter(`content-${agent.id}`, initialText, 5);
    }

    function updateAgentOutput(agentId, newText) {
        const contentId = `content-${agentId}`;
        typeWriter(contentId, newText, 5);
    }
});
