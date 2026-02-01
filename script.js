const AGENTS = {
    context_engineer: {
        id: "context_engineer",
        title: "Agente de Ingenieria de Contexto (Genesis V2)",
        role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
        sysvec: "0xAetherShadowUnbreakable",
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
        title: "The Elite Security Auditor",
        role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
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
    business_strategist: {
        id: "business_strategist",
        title: "The Business Model Innovation Strategist",
        role: "Pricing Consultant & SaaS Business Strategist",
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
    legal_auditor: {
        id: "legal_auditor",
        title: "Agente Auditor Legal \"Sentinel\" (Logic-to-Cash V1)",
        role: "Auditor Legal Senior especializado en la LFPDPPP y Código de Comercio de México",
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

// Application State
let currentAgentId = 'context_engineer';

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initMatrixRain();
    switchAgent('context_engineer');

    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) sendBtn.addEventListener('click', handleInput);

    const userInput = document.getElementById('user-input');
    if (userInput) userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleInput();
    });
});

function initSidebar() {
    const list = document.getElementById('agent-list');
    if (!list) return;
    list.innerHTML = '';

    Object.values(AGENTS).forEach(agent => {
        const li = document.createElement('li');
        li.className = 'agent-item';
        li.dataset.id = agent.id;
        li.innerHTML = `
            <span class="agent-name">${agent.title}</span>
            <span class="agent-role">${agent.role}</span>
        `;
        li.addEventListener('click', () => switchAgent(agent.id));
        list.appendChild(li);
    });
}

function switchAgent(id) {
    currentAgentId = id;

    // Update Sidebar UI
    document.querySelectorAll('.agent-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === id);
    });

    // Update Terminal Header
    const agent = AGENTS[id];
    const header = document.getElementById('terminal-header');
    if (header) {
        header.innerHTML = `
            <span class="active-agent-title">${agent.title}</span>
            ${agent.sysvec ? `<span class="sysvec-badge">${agent.sysvec}</span>` : ''}
        `;
    }

    // Clear or announce context switch
    appendMessage('system', `SYSTEM: Switched context to [${agent.title}]`);
    appendMessage('system', `LOADING PROTOCOLS... READY.`);
}

function handleInput() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';

    // Simulate processing
    setTimeout(() => {
        const agent = AGENTS[currentAgentId];
        const response = generateSimulatedResponse(agent, text);
        appendMessage('system', response);
    }, 1000);
}

function appendMessage(type, text) {
    const container = document.getElementById('terminal-output');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    container.appendChild(msgDiv);

    if (type === 'system') {
        typeWriter(msgDiv, text, 0);
    } else {
        msgDiv.innerText = text;
        container.scrollTop = container.scrollHeight;
    }
}

function typeWriter(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        const container = document.getElementById('terminal-output');
        if (container) container.scrollTop = container.scrollHeight;

        // Random typing speed for realism (10-40ms)
        const speed = Math.random() * 30 + 10;
        setTimeout(() => typeWriter(element, text, index + 1), speed);
    }
}

function generateSimulatedResponse(agent, input) {
    // Basic simulation logic
    return `[${agent.id.toUpperCase()}] Processing input...

> Analyzing request parameters...
> Applying logic filter: ${agent.role}

RESPONSE GENERATED:
Based on your input "${input}", the system acknowledges receipt.
(Note: This is a simulation. In a real environment, this would process the text using the System Prompt provided).

SYSTEM PROMPT ACTIVE:
${agent.systemPrompt.substring(0, 200)}...`;
}

// Visual Effects
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];

            if (Math.random() > 0.95) ctx.fillStyle = '#00f0ff';
            else ctx.fillStyle = '#00ff00';

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);
}
