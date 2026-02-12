const AGENTS = {
    CONTEXT_ENGINEER: {
        id: "CONTEXT_ENGINEER",
        name: "Context Engineer (Genesis V2)",
        role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
        sysVec: "0xAetherShadowUnbreakable",
        description: "Transmutes raw instructions into Master Key Prompts using Purification S2A.",
        systemPrompt: `# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
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
        id: "SECURITY_AUDITOR",
        name: "Security Auditor (Black)",
        role: "Senior Application Security (AppSec) Engineer",
        sysVec: "N/A",
        description: "Executes SAST aligned with OWASP Top 10 (2025).",
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
        id: "BUSINESS_STRATEGIST",
        name: "Business Strategist",
        role: "Pricing Consultant & SaaS Business Strategist",
        sysVec: "N/A",
        description: "Designs monetization strategies (Freemium, Pro, Enterprise).",
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
    LEGAL_SENTINEL: {
        id: "LEGAL_SENTINEL",
        name: "Legal Sentinel (Logic-to-Cash V1)",
        role: "Auditor Legal Senior",
        sysVec: "N/A",
        description: "Legal auditing for Mexican Law (LFPDPPP and Code of Commerce).",
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

// --- Matrix Rain Effect ---
const canvas = document.getElementById('matrix-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let fontSize = 16;
    let drops = [];

    function initMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = Math.ceil(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    }

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function drawMatrix() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(11, 15, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            // Random color: mostly dark cyan/blue, occasionally bright cyan
            ctx.fillStyle = Math.random() > 0.95 ? '#00d1ff' : '#0e3c4a';

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    initMatrix();
    setInterval(drawMatrix, 33);

    window.addEventListener('resize', initMatrix);
}

// --- Typewriter Effect ---
let typewriterTimeout = null;

function typeWriter(text, elementId, speed = 5) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Clear previous timeout if exists
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
        typewriterTimeout = null;
    }

    element.textContent = ''; // Clear existing text

    let i = 0;
    function type() {
        if (i < text.length) {
            // Handle newlines explicitly if needed, but textContent preserves \n style with white-space: pre-wrap
            element.textContent += text.charAt(i);
            i++;
            typewriterTimeout = setTimeout(type, speed);
        } else {
             typewriterTimeout = null;
        }
    }
    type();
}

// --- Agent Rendering and Selection ---
function renderAgents() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = ''; // Clear existing

    Object.keys(AGENTS).forEach(key => {
        const agent = AGENTS[key];
        const item = document.createElement('div');
        item.className = 'agent-item';
        item.dataset.agentId = agent.id;
        item.innerHTML = `
            <div class="agent-name">${agent.name}</div>
            <div class="agent-role">${agent.role}</div>
        `;
        // Use closure to capture agent.id
        item.onclick = () => selectAgent(agent.id);
        sidebar.appendChild(item);
    });
}

function selectAgent(agentId) {
    const agent = AGENTS[agentId];
    if (!agent) return;

    // Highlight selected
    document.querySelectorAll('.agent-item').forEach(el => el.classList.remove('active'));
    const activeItem = document.querySelector(`.agent-item[data-agent-id="${agentId}"]`);
    if (activeItem) activeItem.classList.add('active');

    // Update Terminal
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalOutput) {
        // Create a structured output
        const outputText = `> ACCESSING SYSTEM VECTOR [${agent.sysVec}]...\n> LOADING AGENT: ${agent.name}\n> ROLE: ${agent.role}\n> DESCRIPTION: ${agent.description}\n\n> INITIALIZING SYSTEM PROMPT...\n\n${agent.systemPrompt}`;
        typeWriter(outputText, 'terminal-output', 5);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderAgents();
    // Auto-select first agent
    selectAgent('CONTEXT_ENGINEER');
});
