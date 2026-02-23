const AGENTS = {
    genesis_v2: {
        id: 'genesis_v2',
        name: 'Genesis V2',
        role: 'Context Engineer (God Mode)',
        sysVec: '0xAetherShadowUnbreakable',
        description: 'Transmutes raw instructions into High-Fidelity Master Keys.',
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
    security_auditor: {
        id: 'security_auditor',
        name: 'Elite Security Auditor',
        role: 'Senior AppSec Engineer',
        sysVec: '0xBlackHatDefense',
        description: 'SAST Audits aligned with OWASP Top 10 (2025).',
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
    business_strategist: {
        id: 'business_strategist',
        name: 'Business Strategist',
        role: 'SaaS Pricing Consultant',
        sysVec: '0xRevenueGrowth',
        description: 'Design monetization strategies (Freemium, Pro, Enterprise).',
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
        id: 'sentinel',
        name: 'Sentinel',
        role: 'Agente Auditor Legal',
        sysVec: '0xLegalShield',
        description: 'LFPDPPP & Commercial Code Auditor (Mexico).',
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

// DOM Elements
const agentList = document.getElementById('agentList');
const terminalContent = document.getElementById('terminalContent');
const userInput = document.getElementById('userInput');
const runBtn = document.getElementById('runBtn');
const outputDisplay = document.getElementById('outputDisplay');

// Initialize
function init() {
    renderAgentList();
    selectAgent('genesis_v2'); // Default agent

    runBtn.addEventListener('click', handleRun);
}

function renderAgentList() {
    agentList.innerHTML = '';
    Object.values(AGENTS).forEach(agent => {
        const li = document.createElement('li');
        li.className = 'agent-item';
        li.dataset.id = agent.id;
        li.innerHTML = `
            <span class="agent-name">${agent.name}</span>
            <span class="agent-role">${agent.role}</span>
        `;
        li.addEventListener('click', () => selectAgent(agent.id));
        agentList.appendChild(li);
    });
}

function selectAgent(agentId) {
    // Update UI
    document.querySelectorAll('.agent-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === agentId);
    });

    currentAgent = AGENTS[agentId];

    // Clear terminal and show system prompt info
    terminalContent.textContent = `// AGENT CONNECTED: ${currentAgent.name.toUpperCase()}\n// ROLE: ${currentAgent.role}\n// SYSVEC: ${currentAgent.sysVec}\n\n[SYSTEM PROMPT LOADED]\n${currentAgent.systemPrompt}\n\n// WAITING FOR INPUT...`;

    userInput.value = '';
    userInput.focus();
}

async function handleRun() {
    if (!currentAgent) return;

    const input = userInput.value.trim();
    if (!input) return;

    // Clear previous timeout if any
    if (processingTimeout) clearTimeout(processingTimeout);

    // Display user input
    terminalContent.textContent += `\n\n> USER: ${input}\n`;

    // Scroll to bottom
    outputDisplay.scrollTop = outputDisplay.scrollHeight;

    runBtn.disabled = true;
    runBtn.textContent = 'PROCESANDO...';

    // Simulate processing delay
    await new Promise(r => setTimeout(r, 800));

    let response = '';

    // Logic for Sentinel
    if (currentAgent.id === 'sentinel') {
        const lowerInput = input.toLowerCase();
        const legalKeywords = ['contrato', 'clausula', 'ley', 'acuerdo', 'terminos', 'legal', 'firma', 'arrendamiento', 'servicios', 'pagare'];
        const isLegal = legalKeywords.some(kw => lowerInput.includes(kw));

        if (!isLegal) {
            response = "ERROR DE INGESTA: Solo proceso documentos legales para auditoría.";
        } else {
            response = generateMockResponse(currentAgent, input);
        }
    } else {
        response = generateMockResponse(currentAgent, input);
    }

    typeWriter(response);
}

function generateMockResponse(agent, input) {
    // This is a mock response generator since there is no real backend LLM connected.
    // It generates a structured response based on the agent's prompt instructions.

    const timestamp = new Date().toISOString();
    let output = `\n// GENERATED OUTPUT [${timestamp}]\n// AGENT: ${agent.name}\n\n`;

    if (agent.id === 'genesis_v2') {
        output += `[SYSVEC: ${agent.sysVec}]\n\n`;
        output += `### ANALISIS S2A\n1. Señal Detectada: Optimización de instrucción.\n2. Vulnerabilidad: Ambigüedad en restricciones.\n3. Persona: Experto en el dominio solicitado.\n4. CO-STAR: Estructura aplicada.\n\n`;
        output += `### PROMPT OPTIMIZADO\n\`\`\`\n# ROLE\nActúa como un experto mundial en...\n\n# TASK\n${input}...\n\`\`\``;
    } else if (agent.id === 'security_auditor') {
        output += `### VULNERABILITY REPORT (OWASP 2025)\n\n`;
        output += `| Severity | Type | Location | Remediation |\n`;
        output += `|----------|------|----------|-------------|\n`;
        output += `| HIGH | Injection Risk | Input Handling | Sanitize inputs... |\n`;
        output += `| MEDIUM | Config | API Keys | Use env vars... |\n\n`;
        output += `### HARDENED CODE\n(Simulated secure code block based on input)`;
    } else if (agent.id === 'business_strategist') {
        output += `### PRICING STRATEGY BLUEPRINT\n\n`;
        output += `**1. Freemium Tier:**\n- Core Value: Basic access.\n- Trigger: Usage > 100 calls.\n\n`;
        output += `**2. Pro Tier ($29/mo):**\n- Value: Advanced analytics + Priority support.\n\n`;
        output += `**3. Enterprise (Custom):**\n- SLA, SSO, Dedicated account manager.\n\n`;
        output += `### LAUNCH ROADMAP\n- Phase 1: Beta (Free)\n- Phase 2: Early Bird (50% off)\n- Phase 3: Public Launch`;
    } else if (agent.id === 'sentinel') {
        output += `### REPORTE DE SEMÁFORO DE RIESGO\n\n`;
        output += `| Cláusula Detectada | Nivel de Riesgo | Explicación para "No Abogados" |\n`;
        output += `|--------------------|-----------------|--------------------------------|\n`;
        output += `| Renovación Automática | CRÍTICO | Te cobrarán por siempre si no cancelas 30 días antes. |\n`;
        output += `| Pena Convencional (100%) | ALTO | Si fallas, pagas el doble. Ilegal según Cód. Comercio. |\n`;
        output += `| Jurisdicción (NY) | MEDIO | Si hay pleito, tienes que pagar abogados en Nueva York. |\n\n`;
        output += `**CONCLUSIÓN:** No firmar sin renegociar la cláusula de renovación.`;
    }

    return output;
}

function typeWriter(text, i = 0) {
    if (i < text.length) {
        terminalContent.textContent += text.charAt(i);
        outputDisplay.scrollTop = outputDisplay.scrollHeight;
        processingTimeout = setTimeout(() => typeWriter(text, i + 1), 5); // Fast typing
    } else {
        runBtn.disabled = false;
        runBtn.textContent = 'EJECUTAR';
        terminalContent.textContent += '\n\n// PROCESS COMPLETED.';
        outputDisplay.scrollTop = outputDisplay.scrollHeight;
    }
}

// Start
init();
