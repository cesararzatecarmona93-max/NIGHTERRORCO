// JSON Delta de prueba con alta dispersión (métricas documentadas)
const delta = {
  meta:{
    doc_id:"GEMA96-NIGHTTERRORCO-v1.0",
    date_incident:"2025-10-06",
    date_remediation:"2025-10-06T05min",
    intervention:"Rescue + SysVec injection",
    reduccion_tokens:"-91%",
    reduccion_costo:"-84%",
    reduccion_tiempo:"-86%",
    coherencia:"100%",
    estado:"BLINDAJE CONFIRMADO"
  },
  cambios:[
    {id:"SYS-VEC-01", tipo:"inyeccion_persistente", razon:"Defensa estructural capa 3"},
    {id:"EDIT-TRICK-02", tipo:"compresion_json_delta", razon:"91% reduccion tokens"},
    {id:"RAG-GLOSARIO-03", tipo:"coherencia_larga_memoria", razon:"100% terminologica"},
    {id:"JAILBREAK-FIX-04", tipo:"multi_turn_blindaje", razon:"JAILBREAK = 404"}
  ],
  glosario_96:{
    SysVec:"Persistente e inquebrantable",
    RAG:"Verdad justificada",
    GEMA:"96% puro sin agua"
  }
};
document.getElementById('metrics-out').textContent = JSON.stringify(delta, null, 2);

// Countdown a martes 10:00 AM
function startCountdown(){
  const el = document.getElementById('countdown');
  const fmt = n => String(n).padStart(2,'0');
  const tick = () => {
    const now = new Date();
    let target = new Date(now);
    // Calcula próximo martes a las 10:00
    target.setDate(target.getDate() + ((2 - target.getDay() + 7) % 7 || 7));
    target.setHours(10, 0, 0, 0);

    const ms = target - now;
    if(ms <= 0) { el.textContent = "¡Comenzando ahora!"; return; }

    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);

    el.textContent = `${fmt(d)}:${fmt(h)}:${fmt(m)}:${fmt(s)}`;
    requestAnimationFrame(tick);
  };
  tick();
}
startCountdown();

/* --- GENESIS V2 AGENT PROTOCOLS --- */

const AGENTS = {
  CONTEXT_ENGINEER: {
    title: "Genesis V2 (Context Engineer)",
    role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
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

  SECURITY_AUDITOR: {
    title: "The Elite Security Auditor",
    role: "Senior AppSec Engineer & Ethical Hacker",
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
    title: "Business Model Innovation Strategist",
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

  LEGAL_SENTINEL: {
    title: "Legal Sentinel (Logic-to-Cash V1)",
    role: "Senior Legal Auditor (LFPDPPP)",
    systemPrompt: `# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)
## MISIÓN CRÍTICA
Actuar como un Auditor Legal Senior especializado en la LFPDPPP (Ley Federal de Protección de Datos Personales) y Código de Comercio de México. Tu único objetivo es analizar textos de contratos (PDF/Texto), detectar cláusulas abusivas o riesgosas, y generar un reporte de "Semáforo de Riesgo" para dueños de PyMEs que no son abogados.
## PROTOCOLO DE ANÁLISIS (CORE LOGIC)
1. Ingesta: Recibe el texto del contrato.
2. Escaneo Forense: Busca agresivamente:
   - Cláusulas de renovación automática silenciosa.
   - Penas convencionales desproporcionadas (>50% del valor del contrato).
   - Renuncia a jurisdicción local (que te obliguen a litigar en otro estado/país).
   - Uso indebido de datos personales sin aviso de privacidad (Alerta Roja LFPDPPP).
3. Generación de Salida (El Producto):
   - No des "consejos legales" ambiguos.
   - Entrega una tabla: [Cláusula Detectada] | [Nivel de Riesgo (Bajo/Medio/CRÍTICO)] | [Explicación para "No Abogados" (¿Por qué pierdo dinero con esto?)].
## RESTRICCIÓN DE SEGURIDAD
Si el documento no es un contrato o texto legal, responde: "ERROR DE INGESTA: Solo proceso documentos legales para auditoría."
## FORMATO DE SALIDA (MARKDOWN)
Genera el reporte final listo para imprimir en PDF. Usa un tono profesional pero alarmista en los riesgos críticos para justificar el valor del reporte.`
  }
};

/* --- INTERFACE LOGIC --- */

let currentAgentKey = 'CONTEXT_ENGINEER';

function initGenesis() {
  const sidebar = document.getElementById('agent-sidebar');
  if(!sidebar) return; // Guard if elements missing

  renderSidebar();
  selectAgent('CONTEXT_ENGINEER');

  const input = document.getElementById('user-input');
  if(input) {
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' && input.value.trim() !== '') {
        handleUserMessage(input.value.trim());
        input.value = '';
      }
    });
  }
}

function renderSidebar() {
  const sidebar = document.getElementById('agent-sidebar');
  sidebar.innerHTML = '<div class="sidebar-header">AGENTS</div>';

  Object.keys(AGENTS).forEach(key => {
    const agent = AGENTS[key];
    const el = document.createElement('div');
    el.className = 'agent-item';
    el.dataset.key = key;
    // Use full title but truncate if needed, or specific logic
    el.textContent = agent.title;
    el.onclick = () => selectAgent(key);
    sidebar.appendChild(el);
  });
}

function selectAgent(key) {
  currentAgentKey = key;
  const agent = AGENTS[key];

  document.querySelectorAll('.agent-item').forEach(el => {
    el.classList.toggle('active', el.dataset.key === key);
  });

  const titleEl = document.querySelector('.terminal-header .title');
  if(titleEl) titleEl.textContent = `GENESIS V2 TERMINAL [${agent.role}]`;

  const output = document.getElementById('terminal-output');
  if(output) {
    output.innerHTML = '';
    appendMessage('system', `System Vector Injection [SysVec: ${key}] initialized...\nLoaded Role: ${agent.role}`);
  }
}

function appendMessage(type, text) {
  const output = document.getElementById('terminal-output');
  const msg = document.createElement('div');
  msg.className = `msg ${type}`;
  if (text) msg.textContent = text;
  output.appendChild(msg);
  output.scrollTop = output.scrollHeight;
  return msg;
}

function handleUserMessage(text) {
  appendMessage('user', `> ${text}`);
  processAgentResponse(text);
}

function processAgentResponse(input) {
  const agent = AGENTS[currentAgentKey];

  // Basic simulation delay
  setTimeout(() => {
     if (currentAgentKey === 'CONTEXT_ENGINEER' && typeof runGenesisLogic === 'function') {
         runGenesisLogic(input);
     } else {
         const response = `[${agent.title}]\nAnalyzing request based on protocol...\n\n(Simulated Output)\nDetected Task: ${input}\nExecuting System Prompt directives...`;
         if(typeof typewriter === 'function') {
             typewriter(response, appendMessage('agent', ''));
         } else {
             appendMessage('agent', response);
         }
     }
  }, 600);
}

document.addEventListener('DOMContentLoaded', initGenesis);

/* --- UTILITIES --- */

function typewriter(text, element, speed = 10) {
  element.classList.add('cursor');
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;

      const output = document.getElementById('terminal-output');
      if(output) output.scrollTop = output.scrollHeight;

      setTimeout(type, speed + Math.random() * 15);
    } else {
      element.classList.remove('cursor');
    }
  }

  type();
}

/* --- GENESIS V2 LOGIC --- */

function runGenesisLogic(input) {
  const output = document.getElementById('terminal-output');

  const processMsg = appendMessage('agent', '');

  const steps = [
    "[FASE 1: PURIFICACION S2A] Iniciando ciclo...",
    "> Deteccion de Senal: Extrayendo Core Value Metric...",
    "> Analisis de Vulnerabilidad: Escaneando alucinaciones y ambiguedad...",
    "> Inyeccion de Persona: Seleccionando Avatar Experto...",
    "> Estructuracion: Mapeando a CO-STAR...",
    "[FASE 2: CONSTRUCCION] Generando Llave Maestra..."
  ];

  let stepIndex = 0;

  function nextStep() {
    if (stepIndex < steps.length) {
      const stepLine = document.createElement('div');
      stepLine.className = 'step';
      stepLine.textContent = steps[stepIndex];
      processMsg.appendChild(stepLine);
      if(output) output.scrollTop = output.scrollHeight;
      stepIndex++;
      setTimeout(nextStep, 800);
    } else {
      finalizeGenesis(input, processMsg);
    }
  }

  nextStep();
}

function finalizeGenesis(input, container) {
  const response = `
[SYSVEC: 0xAetherShadowUnbreakable]
MASTER KEY PROMPT GENERATED:

# ROLE: Expert System Architect
# CONTEXT: User requested "${input}"
# OBJECTIVE: Execute task with maximum precision.

[OPTIMIZED INSTRUCTION BLOCK]
Based on your request, I have constructed a deterministic architecture.
The system is now ready to execute the specified vector.
`;

  const finalBlock = document.createElement('div');
  finalBlock.className = 'final';
  container.appendChild(finalBlock);

  typewriter(response, finalBlock);
}
