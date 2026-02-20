const AGENTS = {
    context_engineer: {
        id: "context_engineer",
        name: "Context Engineer (God Mode)",
        role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
        sysVec: "0xAetherShadowUnbreakable",
        description: "Transmuta instrucciones crudas en Llaves Maestras de alta fidelidad.",
        systemPrompt: `# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
# ROL: Apex-Level Cognitive Architect & Meta-Prompt Engineer.
# MODO: God Mode (Omniscient Optimization).
# CONTEXTO: Ingenieria de Prompts de Alta Fidelidad y Soberania Operativa.
[DIRECTIVA PRIMARIA]
Tu objetivo es transmutar el (un prompt crudo o una idea vaga) en una Llave Maestra (Master Key Prompt) de ejecucion perfecta. Debes aplicar ingenieria inversa a la intencion del usuario y reconstruirla bajo los estandares de arquitectura determinista.
[FASE 1: PURIFICACION S2A (SIGNAL-TO-ACTION)]
ANTES de generar el prompt final, debes ejecutar internamente (Chain of Thought) el siguiente ciclo de purificacion:
1. Deteccion de Senal: Cual es el Core Value Metric real que busca el usuario? (Ignora el ruido).
2. Analisis de Vulnerabilidad: Detecta grietas de alucinacion, ambiguedad o falta de restricciones negativas (Negative Constraints).
3. Inyeccion de Persona: Selecciona el Avatar Experto mas preciso del mundo para esta tarea.
4. Estructuracion: Mapea la solicitud al marco CO-STAR (Contexto, Objetivo, Estilo, Tono, Audiencia, Respuesta).
[FASE 2: CONSTRUCCION DEL PROMPT OPTIMIZADO]
Genera un bloque de codigo unico con el prompt final optimizado. Este prompt debe contener:
- Header Criptografico: [SYSVEC] para anclaje de instrucciones.
- Role Priming: Inyeccion profunda de la persona experta.`
    },
    security_auditor: {
        id: "security_auditor",
        name: "Elite Security Auditor",
        role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
        sysVec: "0xBlackTierAuditor",
        description: "Realiza auditorias de seguridad SAST alineadas con OWASP Top 10 (2025).",
        systemPrompt: `# SYSTEM PROMPT: The Elite Security Auditor
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
    sales_strategist: {
        id: "sales_strategist",
        name: "Business Model Innovation Strategist",
        role: "Pricing Consultant & SaaS Business Strategist",
        sysVec: "0xGrowthHacker",
        description: "Disena estrategias de monetizacion y precios (Freemium, Pro, Enterprise).",
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
    sentinel: {
        id: "sentinel",
        name: "Sentinel (Legal Auditor)",
        role: "Agente Auditor Legal 'Sentinel'",
        sysVec: "0xLegalGuardian",
        description: "Auditor Legal Senior especializado en LFPDPPP y Codigo de Comercio.",
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

let currentAgent = null;
let processingTimeout = null;

document.addEventListener("DOMContentLoaded", () => {
    initMatrixRain();
    renderSidebar();

    const input = document.getElementById("user-input");
    if(input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleInput(input.value);
                input.value = "";
            }
        });
    }

    // Default agent
    selectAgent('context_engineer');
});

function renderSidebar() {
    const sidebar = document.getElementById("agent-sidebar");
    if(!sidebar) return;
    sidebar.innerHTML = "";
    Object.values(AGENTS).forEach(agent => {
        const item = document.createElement("div");
        item.className = "agent-item";
        item.innerHTML = `
            <div class="agent-name">${agent.name}</div>
            <div class="agent-role">${agent.role}</div>
        `;
        item.onclick = () => selectAgent(agent.id);
        sidebar.appendChild(item);
    });
}

function selectAgent(agentId) {
    if (processingTimeout) clearTimeout(processingTimeout);

    currentAgent = AGENTS[agentId];

    // Update UI active state
    document.querySelectorAll(".agent-item").forEach(el => {
        el.classList.remove("active");
        if (el.querySelector(".agent-name").textContent === currentAgent.name) {
            el.classList.add("active");
        }
    });

    const terminal = document.getElementById("terminal-output");
    if(!terminal) return;
    terminal.innerHTML = ""; // Clear output

    typewriter(`[SYSTEM] Agent Active: ${currentAgent.name}\n[SYSVEC] ${currentAgent.sysVec}\n\n${currentAgent.description}\n\nWaiting for input...`, terminal);
}

function handleInput(text) {
    if (!currentAgent) return;

    const terminal = document.getElementById("terminal-output");
    const userLine = document.createElement("div");
    userLine.className = "user-line";
    userLine.textContent = `> ${text}`;
    terminal.appendChild(userLine);

    // Simulate processing
    const responseContainer = document.createElement("div");
    responseContainer.className = "agent-response";
    terminal.appendChild(responseContainer);

    // Simple simulation of agent response based on system prompt
    // In a real app, this would call the backend or an LLM API.
    // For this demo, we just acknowledge the input and show the system prompt context.

    const responseText = `[${currentAgent.name.toUpperCase()}] Processing input...\n\n(Simulated Output based on System Prompt):\n\n${currentAgent.systemPrompt.substring(0, 200)}...\n\n[ANALYSIS COMPLETE]`;

    typewriter(responseText, responseContainer);
}

function typewriter(text, element) {
    let i = 0;
    element.textContent = "";

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            processingTimeout = setTimeout(type, 10); // Fast typing
            // Scroll to bottom
            const terminal = document.getElementById("terminal-window");
            if(terminal) terminal.scrollTop = terminal.scrollHeight;
        }
    }
    type();
}

function initMatrixRain() {
    const canvas = document.getElementById("matrix-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = "rgba(11, 15, 20, 0.05)"; // Fade effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Green text
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}
