
const AGENTS = {
    'context_engineer': {
        id: 'context_engineer',
        name: 'Context Engineer (Genesis V2)',
        role: 'Apex-Level Cognitive Architect & Meta-Prompt Engineer',
        sysVec: '0xAetherShadowUnbreakable',
        description: 'Transmuta instrucciones crudas en Llaves Maestras de alta fidelidad.',
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
    'security_auditor': {
        id: 'security_auditor',
        name: 'The Elite Security Auditor',
        role: 'Senior AppSec Engineer & Ethical Hacker',
        sysVec: '0xShieldBreakerV1',
        description: 'Realiza auditorias de seguridad SAST alineadas con OWASP Top 10 (2025).',
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
    'business_strategist': {
        id: 'business_strategist',
        name: 'Business Innovation Strategist',
        role: 'Pricing Consultant & SaaS Business Strategist',
        sysVec: '0xGrowthHackerV3',
        description: 'Diseña estrategias de monetizacion y precios (Freemium, Pro, Enterprise).',
        systemPrompt: `# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Context: Evaluating the product/service described.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).

# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC (Customer Acquisition Cost).

# Output:
A strategic pricing blueprint and a Launch Roadmap.`
    },
    'sentinel': {
        id: 'sentinel',
        name: 'Sentinel (Legal Auditor)',
        role: 'Agente Auditor Legal (LFPDPPP)',
        sysVec: '0xSentinelPrimeV1',
        description: 'Analiza contratos para detectar cláusulas abusivas y riesgos legales.',
        systemPrompt: `## SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)

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

let activeAgent = null;
let processingTimeout = null;

function init() {
    const list = document.getElementById('agent-list');

    // Populate Sidebar
    Object.values(AGENTS).forEach(agent => {
        const li = document.createElement('li');
        li.className = 'agent-item';
        li.dataset.id = agent.id;
        li.innerHTML = `
            <div>${agent.name}</div>
            <span class="agent-role">${agent.role}</span>
        `;
        li.onclick = () => selectAgent(agent.id);
        list.appendChild(li);
    });

    // Select first agent by default
    selectAgent('context_engineer');

    // Setup input listeners
    document.getElementById('send-btn').onclick = handleInput;
    document.getElementById('user-input').onkeydown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            handleInput();
        }
    };
}

function selectAgent(agentId) {
    // Clear any ongoing typing
    if (processingTimeout) {
        clearTimeout(processingTimeout);
        processingTimeout = null;
    }

    activeAgent = AGENTS[agentId];

    // Update Sidebar UI
    document.querySelectorAll('.agent-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === agentId);
    });

    // Update Header
    const header = document.getElementById('agent-header');
    header.querySelector('h2').textContent = activeAgent.name;
    header.querySelector('.sys-vec').textContent = `SysVec: ${activeAgent.sysVec}`;

    // Reset Terminal with Activation Message
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '';

    const activationMsg = `> SISTEMA CONECTADO: ${activeAgent.name}\n` +
                          `> ROL: ${activeAgent.role}\n` +
                          `> ESTADO: ACTIVO Y ESPERANDO INSTRUCCIONES...\n` +
                          `> --------------------------------------------------\n`;

    typewriterEffect(activationMsg, terminal, true);
}

function typewriterEffect(text, container, isSystem = true) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isSystem ? 'system' : 'user'} cursor`;
    container.appendChild(msgDiv);

    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;

    let i = 0;
    const speed = 10; // ms per char

    function type() {
        if (i < text.length) {
            msgDiv.textContent += text.charAt(i);
            i++;
            container.scrollTop = container.scrollHeight;
            processingTimeout = setTimeout(type, speed);
        } else {
            msgDiv.classList.remove('cursor');
            processingTimeout = null;
        }
    }

    type();
}

function handleInput() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    if (!activeAgent) return;

    // Display User Message
    const terminal = document.getElementById('terminal');
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user';
    userMsgDiv.textContent = `> ${text}`;
    terminal.appendChild(userMsgDiv);

    input.value = '';
    terminal.scrollTop = terminal.scrollHeight;

    // Simulate Agent Thinking/Response
    setTimeout(() => {
        const responseHeader = `> AGENTE ${activeAgent.name} PROCESANDO...\n` +
                               `> APLICANDO PROTOCOLO: ${activeAgent.sysVec}\n` +
                               `> ANALIZANDO ENTRADA...\n\n`;

        let mockResponse = "";

        // Mock responses based on agent type (Simulating the output)
        if (activeAgent.id === 'context_engineer') {
            mockResponse = `[FASE 1: PURIFICACION S2A COMPLETADA]\n` +
                           `1. Detección de Señal: Identificada intención de optimización.\n` +
                           `2. Análisis de Vulnerabilidad: Sin riesgos críticos detectados.\n` +
                           `3. Inyección de Persona: Arquitecto Cognitivo activado.\n\n` +
                           `[GENERANDO LLAVE MAESTRA...]\n\n` +
                           `Aquí está tu prompt optimizado:\n` +
                           `\`\`\`\n` +
                           `# SYSVEC: ${activeAgent.sysVec}\n` +
                           `# ROLE: ${activeAgent.role}\n` +
                           `[INSTRUCCIÓN OPTIMIZADA]\n` +
                           `> ${text}\n` +
                           `\`\`\``;
        } else if (activeAgent.id === 'security_auditor') {
             mockResponse = `[SAST SCAN INITIATED]\n` +
                            `Target: User Input Analysis\n` +
                            `Vectors: SQLi, XSS, Command Injection\n\n` +
                            `RESULT:\n` +
                            `No critical vulnerabilities found in the raw text input.\n` +
                            `Recommendation: Ensure proper sanitization before processing in backend systems.\n` +
                            `Status: SECURE`;
        } else if (activeAgent.id === 'business_strategist') {
             mockResponse = `[STRATEGY BLUEPRINT]\n` +
                            `Analyzing Value Metric for: "${text.substring(0, 20)}..."\n\n` +
                            `1. Freemium Tier: Basic access, limited to 3 executions/day.\n` +
                            `2. Pro Tier ($29/mo): Full access, priority support.\n` +
                            `3. Enterprise: Custom integrations, SLA.\n\n` +
                            `LTV Prediction: High potential if retention > 4 months.`;
        } else if (activeAgent.id === 'sentinel') {
             mockResponse = `[INFORME LEGAL SENTINEL]\n` +
                            `Analizando texto ingresado bajo LFPDPPP...\n\n` +
                            `| Cláusula Detectada | Nivel de Riesgo | Explicación |\n` +
                            `|--------------------|-----------------|-------------|\n` +
                            `| Análisis de Texto  | Bajo            | Texto genérico, no parece un contrato formal. |\n\n` +
                            `Nota: Para un análisis completo, por favor ingrese el texto completo de un contrato.`;
        }

        typewriterEffect(responseHeader + mockResponse, terminal, true);
    }, 500);
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);
