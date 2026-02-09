const AGENTS = {
  CONTEXT_ENGINEER: {
    id: "CONTEXT_ENGINEER",
    name: "Agente de Ingenieria de Contexto",
    role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
    sysVec: "0xAetherShadowUnbreakable",
    description: "Meta-Prompt God Mode. Transmuta instrucciones crudas en Llaves Maestras de alta fidelidad.",
    systemPrompt: `[SYSVEC: 0xAetherShadowUnbreakable]
# ROL: Apex-Level Cognitive Architect & Meta-Prompt Engineer.
# MODO: God Mode (Omniscient Optimization).
# CONTEXTO: Ingenieria de Prompts de Alta Fidelidad y Soberania Operativa.

[DIRECTIVA PRIMARIA]
Tu objetivo es transmutar el prompt crudo o una idea vaga en una Llave Maestra (Master Key Prompt) de ejecucion perfecta. Debes aplicar ingenieria inversa a la intencion del usuario y reconstruirla bajo los estandares de arquitectura determinista.

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
  SECURITY_AUDITOR: {
    id: "SECURITY_AUDITOR",
    name: "Auditor de Seguridad Black",
    role: "Senior AppSec Engineer & Ethical Hacker",
    sysVec: "0xSecObsidianShield",
    description: "Realizar auditorias de seguridad SAST alineadas con OWASP Top 10 (2025).",
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
  BUSINESS_STRATEGIST: {
    id: "BUSINESS_STRATEGIST",
    name: "Arquitecto de Silos de Ventas",
    role: "Pricing Consultant & SaaS Business Strategist",
    sysVec: "0xBizStrategosPrime",
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
    role: "Senior Legal Auditor (LFPDPPP & Commerce Code)",
    sysVec: "0xLexSentinelV1",
    description: "Analizar textos de contratos, detectar clausulas abusivas, y generar 'Semaforo de Riesgo'.",
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
let isTyping = false;
let currentTypewriterTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  renderSidebar();
  // Select first agent by default
  const firstAgentId = Object.keys(AGENTS)[0];
  selectAgent(firstAgentId);

  // Attach click handler for run button if it exists
  const runBtn = document.getElementById('run-btn');
  if(runBtn) runBtn.onclick = runSimulation;
});

function renderSidebar() {
  const sidebar = document.getElementById('agent-list');
  if (!sidebar) return;
  sidebar.innerHTML = '';
  Object.values(AGENTS).forEach(agent => {
    const el = document.createElement('div');
    el.className = 'agent-item';
    el.innerHTML = `
      <div style="font-weight:700">${agent.name}</div>
      <div class="agent-role">${agent.role}</div>
    `;
    el.onclick = () => selectAgent(agent.id);
    el.dataset.id = agent.id;
    sidebar.appendChild(el);
  });
}

function selectAgent(id) {
  if (isTyping) {
      // If typing, force stop? Or just ignore?
      // Let's force stop for better UX
      if (currentTypewriterTimeout) clearTimeout(currentTypewriterTimeout);
      isTyping = false;
  }

  currentAgent = AGENTS[id];

  // Update sidebar active state
  document.querySelectorAll('.agent-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });

  // Clear terminal and type intro
  const terminal = document.getElementById('terminal-output');
  if (!terminal) return;
  terminal.innerHTML = ''; // Clear previous content

  const introText = `> SYSTEM CHECK: ONLINE
> AGENT: ${currentAgent.name}
> ROLE: ${currentAgent.role}
> SYSVEC: ${currentAgent.sysVec || 'N/A'}
> PROTOCOL: LOADED
> ---------------------------------------------------
> ${currentAgent.description}
>
> AWAITING INPUT...`;

  typeWriter(introText, terminal);
}

// Improved Typewriter function that appends text
function typeWriter(text, element, speed = 10, callback) {
  isTyping = true;
  let i = 0;

  // Create a container for this specific text block to ensure clean appending?
  // Or just append directly.
  // We need to manage the cursor.

  // Remove any existing cursor in the element
  const existingCursor = element.querySelector('.cursor');
  if (existingCursor) existingCursor.remove();

  // Create new cursor
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  element.appendChild(cursor);

  function type() {
    if (i < text.length) {
      const char = text.charAt(i);
      // Insert char before cursor
      cursor.before(char);
      i++;

      // Auto scroll
      if (element.parentElement) {
          element.parentElement.scrollTop = element.parentElement.scrollHeight;
      }

      currentTypewriterTimeout = setTimeout(type, speed);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }
  type();
}

function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Set canvas size to match container or window
  const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  const columns = Math.floor(canvas.width / 20);
  const drops = Array(columns).fill(1);
  const chars = "0123456789ABCDEF";

  function draw() {
    ctx.fillStyle = 'rgba(11, 15, 20, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0'; // Matrix green
    ctx.font = '15px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 50);
}

function runSimulation() {
  if (!currentAgent || isTyping) return;
  const terminal = document.getElementById('terminal-output');

  const simulationSteps = [
    `\n\n> INGESTING INSTRUCTIONS...`,
    `\n> PARSING INTENT...`,
    `\n> EXECUTING PROTOCOL ${currentAgent.sysVec || 'STANDARD'}...`,
    `\n> GENERATING OUTPUT...`,
    `\n> ---------------------------------------------------\n`,
    currentAgent.systemPrompt,
    `\n> ---------------------------------------------------`,
    `\n> OPERATION COMPLETE.`
  ];

  let currentStep = 0;

  function nextStep() {
    if (currentStep < simulationSteps.length) {
      typeWriter(simulationSteps[currentStep], terminal, 5, () => {
        currentStep++;
        // Small pause between steps
        setTimeout(nextStep, 300);
      });
    }
  }

  nextStep();
}
