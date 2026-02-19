const AGENTS = {
  "context-engineer": {
    id: "context-engineer",
    name: "Context Engineer (Genesis V2)",
    role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
    sysVec: "0xAetherShadowUnbreakable",
    description: "Meta-Prompt God Mode designed to transmute raw instructions into high-fidelity Master Keys.",
    systemPrompt: `[DIRECTIVA PRIMARIA]
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
  "security-auditor": {
    id: "security-auditor",
    name: "The Elite Security Auditor",
    role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
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
  "business-strategist": {
    id: "business-strategist",
    name: "The Business Model Innovation Strategist",
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
  "sentinel": {
    id: "sentinel",
    name: "Sentinel",
    role: "Agente Auditor Legal",
    description: "Auditor Legal Senior especializado en la LFPDPPP y Codigo de Comercio de Mexico.",
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

// Global variables
window.processingTimeout = null;

// UI Logic
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    startMatrixRain();
    // Default selection
    setTimeout(() => selectAgent('context-engineer'), 100);
});

function renderSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '10px';

    // Add brand if not present in HTML
    if (!sidebar.querySelector('.brand')) {
        const brand = document.createElement('div');
        brand.className = 'brand';
        brand.innerHTML = 'GENESIS <span>V2</span>';
        sidebar.insertBefore(brand, sidebar.firstChild);
    }

    Object.values(AGENTS).forEach(agent => {
        const btn = document.createElement('div');
        btn.className = 'agent-btn';
        btn.dataset.id = agent.id;
        btn.innerHTML = `<strong>${agent.name}</strong>${agent.role.split('&')[0].trim()}`;
        btn.onclick = () => selectAgent(agent.id);
        list.appendChild(btn);
    });
    sidebar.appendChild(list);
}

function selectAgent(id) {
    // Clear previous timeout to prevent race conditions
    if (window.processingTimeout) {
        clearTimeout(window.processingTimeout);
        window.processingTimeout = null;
    }

    // Update active state
    document.querySelectorAll('.agent-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.agent-btn[data-id="${id}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const agent = AGENTS[id];
    const term = document.getElementById('terminal-text');

    // Clear terminal
    term.textContent = '';

    // Typewriter effect
    const sysVec = agent.sysVec || 'N/A';
    const text = `> INITIATING PROTOCOL: ${agent.name.toUpperCase()}\n> SYSVEC: ${sysVec}\n> ROLE: ${agent.role}\n\n${agent.systemPrompt}`;
    let i = 0;

    function type() {
        if (i < text.length) {
            term.textContent += text.charAt(i);
            i++;
            // Scroll to bottom
            const container = document.querySelector('.terminal-content');
            if (container) container.scrollTop = container.scrollHeight;
            window.processingTimeout = setTimeout(type, 2); // Fast typing
        } else {
             // Append cursor at end
             const cursor = document.createElement('span');
             cursor.className = 'cursor';
             term.appendChild(cursor);
        }
    }

    type();

    // Update header stats
    const statusEl = document.getElementById('sys-status');
    const agentEl = document.getElementById('sys-agent');
    if (statusEl) statusEl.textContent = 'ACTIVE';
    if (agentEl) agentEl.textContent = agent.id.toUpperCase();
}

function startMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    const container = document.querySelector('.terminal-window');

    // Insert as first child
    if (container.firstChild) {
        container.insertBefore(canvas, container.firstChild);
    } else {
        container.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');

    // Initial size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 10;
    const columns = Math.ceil(canvas.width / fontSize);

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        // Black with opacity for trail effect
        ctx.fillStyle = 'rgba(11, 15, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green text
        // Use a matrix-like font color, maybe slightly cyan to match theme?
        // Memory says Matrix Rain, usually green, but theme has cyan/vio.
        // Let's use cyan from theme variable #00d1ff
        ctx.fillStyle = '#004433'; // Darker green/cyan for subtlety or standard matrix green
        ctx.fillStyle = '#00d1ff'; // Using theme Cyan for "Premium BLACK Tier" consistency

        ctx.font = fontSize + 'px monospace';

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

    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        // Re-init drops if width changed significantly?
        // For simplicity, just letting it be.
    });
}
