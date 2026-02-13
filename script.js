
const AGENTS = {
  CONTEXT_ENGINEER: {
    id: 'CONTEXT_ENGINEER',
    name: 'Context Engineer (Genesis V2)',
    role: 'Apex-Level Cognitive Architect & Meta-Prompt Engineer',
    sysVec: '0xAetherShadowUnbreakable',
    description: 'Transmuta instrucciones crudas en Llaves Maestras de alta fidelidad. Modo Dios.',
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
    id: 'SECURITY_AUDITOR',
    name: 'Auditor de Seguridad Black',
    role: 'Senior Application Security (AppSec) Engineer & Ethical Hacker',
    sysVec: 'N/A',
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
  BUSINESS_STRATEGIST: {
    id: 'BUSINESS_STRATEGIST',
    name: 'Arquitecto de Silos de Ventas',
    role: 'Pricing Consultant & SaaS Business Strategist',
    sysVec: 'N/A',
    description: 'Diseña estrategias de monetizacion y precios (Freemium, Pro, Enterprise).',
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
    id: 'LEGAL_SENTINEL',
    name: 'Agente Auditor Legal "Sentinel"',
    role: 'Auditor Legal Senior (LFPDPPP)',
    sysVec: 'LOGIC-TO-CASH V1',
    description: 'Analiza contratos y detecta riesgos legales (Semáforo de Riesgo).',
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

function init() {
  const sidebar = document.getElementById('agent-sidebar');

  Object.values(AGENTS).forEach(agent => {
    const card = document.createElement('div');
    card.className = 'agent-card';
    card.dataset.id = agent.id;
    card.innerHTML = `
      <div class="agent-name">${agent.name}</div>
      <div class="agent-role">${agent.role}</div>
    `;
    card.onclick = () => selectAgent(agent.id);
    sidebar.appendChild(card);
  });

  document.getElementById('send-btn').addEventListener('click', handleUserMessage);
  document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserMessage();
    }
  });
}

function selectAgent(agentId) {
  currentAgent = AGENTS[agentId];

  // Update UI
  document.querySelectorAll('.agent-card').forEach(c => {
    c.classList.remove('active');
    if (c.dataset.id === agentId) c.classList.add('active');
  });

  const output = document.getElementById('terminal-output');
  output.innerHTML = '';

  const welcomeMsg = `
    <div class="message system">
      <strong>SISTEMA:</strong> Agente <strong>${currentAgent.name}</strong> activado.<br>
      <small style="color:#567; font-family:var(--mono)">${currentAgent.sysVec !== 'N/A' ? 'SYSVEC: ' + currentAgent.sysVec : ''}</small><br><br>
      ${currentAgent.description}
    </div>
  `;
  output.innerHTML = welcomeMsg;
}

function handleUserMessage() {
  if (!currentAgent) {
    alert('Por favor selecciona un agente primero.');
    return;
  }

  const inputEl = document.getElementById('user-input');
  const text = inputEl.value.trim();
  if (!text) return;

  // Display user message
  appendMessage('user', text);
  inputEl.value = '';

  // Simulate processing
  const loadingId = 'loading-' + Date.now();
  appendMessage('system', `<span id="${loadingId}" class="typing-cursor">Procesando solicitud...</span>`);

  setTimeout(() => {
    const loadingEl = document.getElementById(loadingId);
    if(loadingEl) loadingEl.parentElement.remove();

    // Simulate Response based on Agent
    simulateAgentResponse(text);
  }, 1500);
}

function appendMessage(type, html) {
  const output = document.getElementById('terminal-output');
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.innerHTML = html;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function simulateAgentResponse(input) {
  // In a real app, this would call an API.
  // Here we just display the system prompt as if it processed the context.

  let response = '';

  if (currentAgent.id === 'CONTEXT_ENGINEER') {
    response = `**[GOD MODE ACTIVADO]**\n\nHe recibido tu solicitud: "${input}".\n\nAplicando **PURIFICACION S2A**...\n1. Señal detectada.\n2. Vulnerabilidades escaneadas.\n3. Persona inyectada.\n\nGenerando Llave Maestra bajo SysVec ${currentAgent.sysVec}... (Simulación completada)`;
  } else if (currentAgent.id === 'SECURITY_AUDITOR') {
    response = `**[SECURITY AUDIT LOG]**\n\nAnalyzing input for vulnerabilities...\nRunning SAST scan aligned with OWASP Top 10 (2025).\n\nTarget: "${input}"\n\nStatus: Analysis Complete. No critical vectors found in this simulation.`;
  } else if (currentAgent.id === 'BUSINESS_STRATEGIST') {
    response = `**[STRATEGY BLUEPRINT]**\n\nEvaluating business model for: "${input}"\n\n1. Psychology: Analyzing anchoring effects.\n2. Usage Limits: Defining value metrics.\n3. LTV/CAC: Estimating ratios.\n\nReport generated.`;
  } else if (currentAgent.id === 'LEGAL_SENTINEL') {
    response = `**[SEMÁFORO DE RIESGO]**\n\nAnalizando texto bajo LFPDPPP y Código de Comercio...\n\nEntrada: "${input}"\n\n**Resultado:**\n(Simulación) El texto ingresado ha sido escaneado. En un entorno real, aquí aparecería la tabla de riesgos.`;
  }

  // Typewriter effect simulation (simple text append for now)
  const output = document.getElementById('terminal-output');
  const div = document.createElement('div');
  div.className = 'message system';
  output.appendChild(div);

  let i = 0;
  // Convert markdown-ish text to HTML for display
  const formattedResponse = response.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Just show it directly for simplicity/speed in this demo,
  // or implementing a simple typewriter if needed.
  // Let's do a simple fade-in.
  div.innerHTML = formattedResponse;
  div.style.animation = "fadeIn 0.5s";
  output.scrollTop = output.scrollHeight;
}

// Initialize
window.addEventListener('DOMContentLoaded', init);
