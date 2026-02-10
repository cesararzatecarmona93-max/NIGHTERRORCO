const AGENTS = {
  CONTEXT_ENGINEER: {
    id: "context_engineer",
    name: "Ingeniero de Contexto (Genesis V2)",
    role: "Apex-Level Cognitive Architect & Meta-Prompt Engineer",
    sysVec: "0xAetherShadowUnbreakable",
    description: "Transmuta instrucciones crudas en Llaves Maestras de alta fidelidad.",
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
    id: "security_auditor",
    name: "Auditor de Seguridad Black",
    role: "Senior Application Security (AppSec) Engineer & Ethical Hacker",
    sysVec: "0xSecurityAudit",
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
    id: "business_strategist",
    name: "Arquitecto de Silos de Ventas",
    role: "Pricing Consultant & SaaS Business Strategist",
    sysVec: "0xBusinessStrat",
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
    id: "legal_sentinel",
    name: "Legal Sentinel (Logic-to-Cash V1)",
    role: "Auditor Legal Senior (LFPDPPP & Codigo de Comercio)",
    sysVec: "0xLegalSentinel",
    description: "Detecta clausulas abusivas y genera Semaforo de Riesgo.",
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

// UI Logic
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const terminal = document.querySelector('.terminal-content');
  const terminalHeader = document.querySelector('.terminal-header span');

  // Populate Sidebar
  Object.values(AGENTS).forEach(agent => {
    const item = document.createElement('div');
    item.className = 'agent-item';
    item.dataset.id = agent.id;
    item.innerHTML = `
      <div class="agent-name">${agent.name}</div>
      <div class="agent-role">${agent.role}</div>
    `;
    item.addEventListener('click', () => selectAgent(agent));
    sidebar.appendChild(item);
  });

  let currentTypingInterval = null;

  function selectAgent(agent) {
    // Update active state
    document.querySelectorAll('.agent-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.agent-item[data-id="${agent.id}"]`).classList.add('active');

    // Update terminal header
    terminalHeader.textContent = `CORE // ${agent.name.toUpperCase()}`;

    // Clear terminal and type content
    terminal.textContent = '';
    if (currentTypingInterval) clearInterval(currentTypingInterval);

    const content = `> INITIATING PROTOCOL: ${agent.sysVec}\n> LOADING SYSTEM PROMPT...\n\n${agent.systemPrompt}`;
    typeWriter(content, terminal);
  }

  function typeWriter(text, element, speed = 10) {
    let i = 0;
    currentTypingInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        element.scrollTop = element.scrollHeight; // Auto-scroll
        i++;
      } else {
        clearInterval(currentTypingInterval);
      }
    }, speed);
  }

  // Matrix Rain Effect
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const alphabet = katakana + latin + nums;

  const fontSize = 16;
  const columns = canvas.width / fontSize;

  const rainDrops = [];
  for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(11, 15, 20, 0.05)'; // Fade out effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green text
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  }

  setInterval(draw, 30);

  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Select first agent by default
  selectAgent(AGENTS.CONTEXT_ENGINEER);
});
