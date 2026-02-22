const AGENTS = {
  GENESIS_V2: {
    id: "GENESIS_V2",
    name: "Context Engineer (Genesis V2)",
    role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
    sysVec: "0xAetherShadowUnbreakable",
    description: "God Mode: Transmutes raw instructions into Master Key Prompts.",
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
    name: "The Elite Security Auditor",
    role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
    sysVec: "0xSecOpsBlack",
    description: "Conducts simulated SAST aligned with OWASP Top 10 (2025).",
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
    name: "The Business Model Innovation Strategist",
    role: "Pricing Consultant & SaaS Business Strategist",
    sysVec: "0xBizOpsGrowth",
    description: "Designs multi-tier pricing strategies (Freemium, Pro, Enterprise).",
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
  SENTINEL: {
    id: "SENTINEL",
    name: "Agente Auditor Legal 'Sentinel'",
    role: "Agente Auditor Legal 'Sentinel' (LOGIC-TO-CASH V1)",
    sysVec: "0xLawShield",
    description: "Analyzes contracts for abusive clauses under LFPDPPP.",
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

let currentAgent = AGENTS.GENESIS_V2;
let processingTimeout = null;
const terminalOutput = document.getElementById('output');
const userInput = document.getElementById('user-input');

function init() {
  const list = document.getElementById('agent-list');
  if (!list) return; // Guard for testing or partial load

  Object.values(AGENTS).forEach(agent => {
    const item = document.createElement('div');
    item.className = 'agent-item';
    if (agent.id === currentAgent.id) item.classList.add('active');
    item.innerHTML = `<div class="agent-name">${agent.name}</div><div class="agent-role">${agent.role}</div>`;
    item.onclick = () => selectAgent(agent.id);
    list.appendChild(item);
  });

  // Set initial status
  updateStatus();
  typeText(`System initialized. Active Agent: ${currentAgent.name}\nReady for input...`);

  const execBtn = document.getElementById('exec-btn');
  if (execBtn) execBtn.onclick = processInput;
}

function selectAgent(id) {
  currentAgent = AGENTS[id];
  // Update UI
  document.querySelectorAll('.agent-item').forEach(el => {
    el.classList.remove('active');
    if (el.querySelector('.agent-name').textContent === currentAgent.name) {
      el.classList.add('active');
    }
  });
  updateStatus();
  if (processingTimeout) clearTimeout(processingTimeout);
  terminalOutput.textContent = '';
  typeText(`Agent Switched: ${currentAgent.name}\n${currentAgent.description}\n\nWaiting for input...`);
}

function updateStatus() {
  const bar = document.querySelector('.status-bar');
  if (bar) bar.textContent = `SYSVEC: ${currentAgent.sysVec} | MODE: ACTIVE`;
}

function processInput() {
  const text = userInput.value.trim();
  if (!text) return;

  userInput.value = '';
  const timestamp = new Date().toLocaleTimeString();

  // Append user input
  const userDiv = document.createElement('div');
  userDiv.style.color = '#fff';
  userDiv.style.marginTop = '10px';
  userDiv.textContent = `[${timestamp}] USER: ${text}`;
  terminalOutput.appendChild(userDiv);

  // Simulate processing
  const processingDiv = document.createElement('div');
  processingDiv.style.color = 'var(--warn)';
  processingDiv.textContent = `[${currentAgent.id}] Processing...`;
  terminalOutput.appendChild(processingDiv);

  // Simulate delay
  if (processingTimeout) clearTimeout(processingTimeout);

  processingTimeout = setTimeout(() => {
    // Only remove if it's still there
    if (processingDiv.parentNode === terminalOutput) {
        terminalOutput.removeChild(processingDiv);
    }
    const response = `[${currentAgent.id}] EXECUTION COMPLETE.\n\nHere is the optimized output based on protocol ${currentAgent.sysVec}:\n\n(Simulated Output for: "${text}")\n\n[END OF TRANSMISSION]`;
    typeText(response, true);
  }, 1500);
}

function typeText(text, append = false) {
  if (!append) terminalOutput.textContent = '';

  const element = append ? document.createElement('div') : terminalOutput;
  if (append) {
      element.style.color = 'var(--ok)';
      element.style.marginTop = '10px';
      terminalOutput.appendChild(element);
  }

  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      processingTimeout = setTimeout(type, 5); // Fast typing
    } else {
        // Auto scroll
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }
  type();
}

window.onload = init;