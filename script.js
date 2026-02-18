
const AGENTS = {
  context_engineer: {
    id: "context_engineer",
    name: "Context Engineer (Genesis V2)",
    role: "Apex-Level Cognitive Architect",
    sysVec: "0xAetherShadowUnbreakable",
    description: "Transmutes raw instructions into High-Fidelity Master Keys.",
    systemPrompt: `[SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]]
# ROL: Apex-Level Cognitive Architect & Meta-Prompt Engineer.
# MODO: God Mode (Omniscient Optimization).
# CONTEXTO: Ingenieria de Prompts de Alta Fidelidad y Soberania Operativa.
[DIRECTIVA PRIMARIA]
Tu objetivo es transmutar el (un prompt crudo o una idea vaga) en una Llave Maestra (Master Key Prompt) de ejecucion perfecta. Debes aplicar ingenieria inversa a la intencion del usuario y reconstruirla bajo los estandares de arquitectura determinista.
[FASE 1: PURIFICACION S2A (SIGNAL-TO-ACTION)]
1. Deteccion de Senal: Cual es el Core Value Metric real que busca el usuario?
2. Analisis de Vulnerabilidad: Detecta grietas de alucinacion, ambiguedad o falta de restricciones negativas.
3. Inyeccion de Persona: Selecciona el Avatar Experto mas preciso del mundo.
4. Estructuracion: Mapea la solicitud al marco CO-STAR.
[FASE 2: CONSTRUCCION DEL PROMPT OPTIMIZADO]
- Header Criptografico: [SYSVEC] para anclaje de instrucciones.
- Role Priming: Inyeccion profunda de la persona experta.`
  },
  security_auditor: {
    id: "security_auditor",
    name: "Elite Security Auditor",
    role: "Senior AppSec Engineer",
    sysVec: "0xSecOpsBlack",
    description: "Conducts SAST audits aligned with OWASP Top 10 (2025).",
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
    name: "Business Model Strategist",
    role: "Pricing Consultant & SaaS Strategist",
    sysVec: "0xGrowthHacker",
    description: "Designs monetization strategies and pricing models.",
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
    role: "Senior Legal Auditor (LFPDPPP)",
    sysVec: "0xLawShield",
    description: "Analyzes contracts for abusive clauses and legal risks.",
    systemPrompt: `# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)
## MISION CRITICA
Actuar como un Auditor Legal Senior especializado en la LFPDPPP (Ley Federal de Proteccion de Datos Personales) y Codigo de Comercio de Mexico. Tu unico objetivo es analizar textos de contratos (PDF/Texto), detectar clausulas abusivas o riesgosas, y generar un reporte de "Semaforo de Riesgo".
## PROTOCOLO DE ANALISIS (CORE LOGIC)
1. Ingesta: Recibe el texto del contrato.
2. Escaneo Forense: Busca agresivamente clausulas de renovacion automatica silenciosa, penas convencionales desproporcionadas, renuncia a jurisdiccion local, uso indebido de datos personales.
3. Generacion de Salida (El Producto): Entrega una tabla: [Clausula Detectada] | [Nivel de Riesgo] | [Explicacion].
## RESTRICCION DE SEGURIDAD
Si el documento no es un contrato o texto legal, responde: "ERROR DE INGESTA".`
  }
};

let currentAgent = AGENTS.context_engineer;
let isProcessing = false;
let processingTimeout;

function init() {
  renderSidebar();
  selectAgent('context_engineer');
  document.getElementById('user-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInput();
    }
  });
}

function renderSidebar() {
  const sidebar = document.getElementById('agent-sidebar');
  sidebar.innerHTML = '';
  Object.values(AGENTS).forEach(agent => {
    const btn = document.createElement('div');
    btn.className = `agent-btn ${agent.id === currentAgent.id ? 'active' : ''}`;
    btn.onclick = () => selectAgent(agent.id);
    btn.innerHTML = `
      <div class="agent-name">${agent.name}</div>
      <div class="agent-role">${agent.role}</div>
    `;
    sidebar.appendChild(btn);
  });
}

function selectAgent(agentId) {
  if (processingTimeout) clearTimeout(processingTimeout);
  currentAgent = AGENTS[agentId];
  renderSidebar();

  const terminal = document.getElementById('terminal-output');
  terminal.innerHTML = '';

  const header = `[SYSTEM CONNECTION ESTABLISHED]
Target: ${currentAgent.name}
SysVec: ${currentAgent.sysVec}
Role: ${currentAgent.role}
----------------------------------------
${currentAgent.description}
----------------------------------------
READY FOR INPUT...`;

  typeWriter(header, terminal);
}

function handleInput() {
  if (isProcessing) return;

  const inputEl = document.getElementById('user-input');
  const text = inputEl.value.trim();
  if (!text) return;

  const terminal = document.getElementById('terminal-output');
  const userLine = document.createElement('div');
  userLine.className = 'user-line';
  userLine.textContent = `> ${text}`;
  terminal.appendChild(userLine);

  inputEl.value = '';
  isProcessing = true;

  // Simulate processing delay
  const loading = document.createElement('div');
  loading.className = 'system-line processing';
  loading.textContent = '[PROCESSING]...';
  terminal.appendChild(loading);

  // Simple simulation of agent response based on keywords or default behavior
  setTimeout(() => {
    terminal.removeChild(loading);
    const response = generateMockResponse(text);
    typeWriter(response, terminal, () => {
      isProcessing = false;
      terminal.scrollTop = terminal.scrollHeight;
    });
  }, 1500);
}

function generateMockResponse(input) {
  // Logic to simulate responses based on the current agent
  const prefix = `[${currentAgent.name.toUpperCase()} OUTPUT]:\n`;
  if (currentAgent.id === 'context_engineer') {
    return `${prefix}Analyzing input for signal-to-action ratio...

[ANALYSIS COMPLETE]
Input: "${input}"
Core Intent: User seeks optimization/transformation.

[OPTIMIZED PROMPT GENERATED]
Subject: Master Key Protocol
Directives: applied CO-STAR framework.
Result: The input has been transmuted into a high-fidelity instruction set.`;
  } else if (currentAgent.id === 'security_auditor') {
    return `${prefix}Initiating SAST scan on provided input...

[SCAN RESULT]
Target: Text fragment
Vulnerabilities Detected: 0 High, 0 Medium, 1 Low (Information Leakage Risk).
Recommendation: sanitize input before processing further.`;
  } else if (currentAgent.id === 'business_strategist') {
    return `${prefix}Evaluating monetization potential...

[STRATEGY BLUEPRINT]
Model: Freemium with usage caps.
Value Metric: Number of active projects.
Pricing Tier 1: Free (1 project)
Pricing Tier 2: Pro ($29/mo, unlimited projects)
Revenue Projection: Positive LTV/CAC ratio expected.`;
  } else if (currentAgent.id === 'sentinel') {
    return `${prefix}Scanning for legal risks (LFPDPPP compliance)...

[RISK TRAFFIC LIGHT]
Status: GREEN (Low Risk)
Observations: No obvious abusive clauses detected in the provided snippet.
Advice: Always consult a certified human lawyer for binding agreements.`;
  }
  return `${prefix} Ack. Processing: ${input}`;
}

function typeWriter(text, element, callback) {
  const line = document.createElement('div');
  line.className = 'system-line';
  element.appendChild(line);

  let i = 0;
  const speed = 10; // ms per char

  function type() {
    if (i < text.length) {
      line.textContent += text.charAt(i);
      i++;
      element.scrollTop = element.scrollHeight;
      processingTimeout = setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }

  type();
}

window.onload = init;
