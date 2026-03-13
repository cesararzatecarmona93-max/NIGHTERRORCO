const AGENTS = {
    CONTEXT_ENGINEER: {
        id: "CONTEXT_ENGINEER",
        name: "Agente de Ingenieria de Contexto (Genesis V2)",
        role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
        sysVec: "0xAetherShadowUnbreakable",
        description: "Meta-Prompt God Mode, disenado para transmutar instrucciones crudas en Llaves Maestras de alta fidelidad.",
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
        name: "Auditor de Seguridad Black",
        role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
        sysVec: "0xAetherShadowUnbreakable",
        description: "Realizar auditorias de seguridad SAST alineadas con OWASP Top 10 (2025).",
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
        name: "Arquitecto de Silos de Ventas",
        role: "Pricing Consultant & SaaS Business Strategist",
        description: "Disenar estrategias de monetizacion y precios (Freemium, Pro, Enterprise).",
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
        name: "Agente Auditor Legal 'Sentinel'",
        role: "Auditor Legal Senior (LFPDPPP)",
        description: "Analizar textos de contratos, detectar clausulas abusivas o riesgosas.",
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

let currentAgentId = 'CONTEXT_ENGINEER';
let typeInterval;
let processingTimeout;

function init() {
    renderSidebar();
    setupTerminal();
    const output = document.getElementById('terminal-output');
    typewriter("SISTEMA INICIADO: Protocolo Genesis V2 activo.\nSeleccione un agente para comenzar.", output);
}

function renderSidebar() {
    const sidebar = document.getElementById('agent-sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';
    Object.values(AGENTS).forEach(agent => {
        const item = document.createElement('div');
        item.className = `agent-item ${agent.id === currentAgentId ? 'active' : ''}`;
        item.dataset.id = agent.id;
        item.innerHTML = `
            <div class="agent-name">${agent.name}</div>
            <div class="agent-role">${agent.role}</div>
        `;
        item.onclick = () => selectAgent(agent.id);
        sidebar.appendChild(item);
    });
}

function selectAgent(id) {
    if (currentAgentId === id) return;
    currentAgentId = id;
    renderSidebar();
    const output = document.getElementById('terminal-output');
    output.innerHTML = ''; // Clear terminal
    if (typeInterval) clearInterval(typeInterval); // Stop any ongoing typing
    if (processingTimeout) clearTimeout(processingTimeout); // Stop any pending response
    typewriter(`Agente Seleccionado: ${AGENTS[id].name}\n> ${AGENTS[id].description}\n\nEsperando instrucciones...`, output);
}

function setupTerminal() {
    const input = document.getElementById('terminal-input');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const text = input.value;
            if (!text.trim()) return;
            input.value = '';
            processInput(text);
        }
    });
}

function processInput(text) {
    const output = document.getElementById('terminal-output');
    const agent = AGENTS[currentAgentId];

    // Echo user input
    const userLine = document.createElement('div');
    userLine.className = 'user-line';
    userLine.textContent = `[USER]: ${text}`;
    userLine.style.color = '#fff';
    userLine.style.marginTop = '10px';
    output.appendChild(userLine);
    output.scrollTop = output.scrollHeight;

    // Clear previous processing if user types fast
    if (processingTimeout) clearTimeout(processingTimeout);

    // Simulate processing
    const processingLine = document.createElement('div');
    processingLine.className = 'processing-line';
    processingLine.textContent = 'Procesando...';
    processingLine.style.color = '#567';
    output.appendChild(processingLine);

    processingTimeout = setTimeout(() => {
        if (output.contains(processingLine)) output.removeChild(processingLine);
        let response = '';
        if (agent.id === 'CONTEXT_ENGINEER') {
             response = `[FASE 1: PURIFICACION S2A]\n> Analizando señal...\n> Detectando vulnerabilidades...\n> Inyectando persona experta...\n\n[FASE 2: CONSTRUCCION DEL PROMPT OPTIMIZADO]\nHere is your Master Key Prompt based on: "${text}"\n\n(Simulated Output based on System Prompt)`;
        } else if (agent.id === 'SECURITY_AUDITOR') {
             response = `[SECURITY SCAN INITIATED]\nTarget: "${text}"\n> Checking OWASP Top 10...\n> Scanning for injection vectors...\n\n[VULNERABILITY REPORT]\n(Simulated Report for demo purposes)`;
        } else if (agent.id === 'BUSINESS_STRATEGIST') {
             response = `[STRATEGY ANALYSIS]\nTarget: "${text}"\n> Analyzing consumer psychology...\n> Defining value metrics...\n\n[PRICING BLUEPRINT]\n(Simulated Blueprint for demo purposes)`;
        } else if (agent.id === 'LEGAL_SENTINEL') {
             response = `[LEGAL AUDIT STARTED]\nDocument: "${text}"\n> Scanning for abusive clauses...\n> Checking LFPDPPP compliance...\n\n[RISK TRAFFIC LIGHT]\n(Simulated Risk Report for demo purposes)`;
        }

        typewriter(response, output);
    }, 1000);
}

function typewriter(text, element) {
    const block = document.createElement('div');
    block.className = 'response-block';
    block.style.whiteSpace = 'pre-wrap';
    block.style.marginTop = '10px';
    block.style.color = '#00d1ff'; // Cyan for agent output
    element.appendChild(block);

    let i = 0;

    const interval = setInterval(() => {
        block.textContent += text.charAt(i);
        i++;
        element.scrollTop = element.scrollHeight;
        if (i >= text.length) clearInterval(interval);
    }, 10);

    // Track the latest interval globally so we can cancel it on agent switch
    typeInterval = interval;
}

document.addEventListener('DOMContentLoaded', init);
