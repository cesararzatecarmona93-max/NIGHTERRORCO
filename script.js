// Data Definitions
const DEFAULT_AGENTS = [
  {
    id: 'security-auditor',
    title: 'Auditor de Seguridad Black',
    role: 'The Elite Security Auditor',
    desc: 'Senior Application Security Engineer specializing in SAST and OWASP Top 10.',
    prompt: `# SYSTEM PROMPT: The Elite Security Auditor
# Role: Senior Application Security (AppSec) Engineer & Ethical Hacker.
# Task: Conduct a simulated Static Application Security Testing (SAST).
# Execution Steps:
1. Identify common injection vectors (SQLi, Command, LDAP).
2. Scan for hardcoded secrets, API keys.
3. Analyze instruction hierarchy for Prompt Injection.`
  },
  {
    id: 'sales-architect',
    title: 'Arquitecto de Silos de Ventas',
    role: 'Business Model Innovation Strategist',
    desc: 'Pricing Consultant & SaaS Business Strategist. Designs multi-tier pricing strategies.',
    prompt: `# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Objective: Design a multi-tier pricing strategy.
# Analysis:
1. Consumer Psychology: Anchoring effects.
2. Usage Limits: Define Value Metric.
3. Revenue Modeling: Estimate LTV vs CAC.`
  },
  {
    id: 'legal-auditor',
    title: 'Agente Auditor Legal "Sentinel"',
    role: 'Auditor Legal Senior',
    desc: 'Specialist in LFPDPPP and Mexican Commercial Code for contract risk analysis.',
    prompt: `# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL"
# Mission: Analyze contracts for abusive clauses and risks.
# Protocol:
1. Ingest contract text.
2. Forensic Scan: Auto-renewal, disproportionate penalties.
3. Output: Risk Semaphore Report.`
  }
];

// DOM Elements
const terminal = document.getElementById('terminal');
const agentGrid = document.getElementById('agent-grid');
const btnGenesis = document.getElementById('btn-genesis');
const btnCreate = document.getElementById('btn-create');
const inputDomain = document.getElementById('custom-domain');

// Terminal Logic
function log(msg, type = 'info') {
  const div = document.createElement('div');
  div.className = `log-line log-${type}`;
  div.innerText = `> ${msg}`;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

async function typeLog(msg, type = 'info', delay = 30) {
  const div = document.createElement('div');
  div.className = `log-line log-${type}`;
  terminal.appendChild(div);

  let text = `> ${msg}`;
  for (let i = 0; i < text.length; i++) {
    div.innerText = text.substring(0, i + 1);
    await new Promise(r => setTimeout(r, delay));
    terminal.scrollTop = terminal.scrollHeight;
  }
}

// Rendering Logic
function createAgentCard(agent, isCustom = false) {
  const div = document.createElement('div');
  div.className = 'agent-card';
  if (isCustom) div.classList.add('sys-generated');

  div.innerHTML = `
    <div class="card-header">
      <span class="card-role">${agent.role}</span>
      <span style="font-size:10px; color:#567;">ID: ${agent.id.toUpperCase()}</span>
    </div>
    <div class="card-title">${agent.title}</div>
    <div class="card-desc">${agent.desc}</div>
    <div class="prompt-preview">${agent.prompt}</div>
    <div class="card-actions">
      <button class="action-btn" onclick="copyPrompt(this, '${encodeURIComponent(agent.prompt)}')">COPY PROMPT</button>
      <button class="action-btn" style="border-color:#532; color:#a66;">DELETE NODE</button>
    </div>
  `;

  // Delete handler
  div.querySelector('.action-btn:last-child').addEventListener('click', () => {
    div.style.opacity = '0';
    div.style.transform = 'scale(0.9)';
    setTimeout(() => div.remove(), 300);
    log(`Node ${agent.id} terminated.`, 'warn');
  });

  return div;
}

window.copyPrompt = (btn, encodedPrompt) => {
  const text = decodeURIComponent(encodedPrompt);
  navigator.clipboard.writeText(text);
  const original = btn.innerText;
  btn.innerText = "COPIED";
  btn.style.color = "#00ff9d";
  btn.style.borderColor = "#00ff9d";
  setTimeout(() => {
    btn.innerText = original;
    btn.style.color = "";
    btn.style.borderColor = "";
  }, 2000);
};

// Genesis Protocol
btnGenesis.addEventListener('click', async () => {
  btnGenesis.disabled = true;
  agentGrid.innerHTML = ''; // Clear grid

  await typeLog("INITIATING GENESIS PROTOCOL V2...", "sys", 20);
  await new Promise(r => setTimeout(r, 500));

  log("Analyzing Core Value Metrics...", "info");
  await new Promise(r => setTimeout(r, 800));

  log("Detecting Vulnerability vectors...", "info");
  await new Promise(r => setTimeout(r, 600));

  log("Injecting Personas...", "sys");

  for (const agent of DEFAULT_AGENTS) {
    await new Promise(r => setTimeout(r, 600));
    log(`Compiling SysVec for [${agent.id}]...`, "info");
    agentGrid.appendChild(createAgentCard(agent));
    log(`Node [${agent.id}] ONLINE.`, "success");
  }

  await typeLog("GENESIS PROTOCOL COMPLETE. CLUSTER STABLE.", "sys");
  btnGenesis.disabled = false;
});

// Custom Generation Logic
btnCreate.addEventListener('click', async () => {
  const domain = inputDomain.value.trim();
  if (!domain) return;

  inputDomain.disabled = true;
  btnCreate.disabled = true;

  log(`Received instruction: Create agent for domain '${domain}'`, "info");
  await typeLog("Accessing High-Fidelity Prompt Library...", "sys", 10);

  await new Promise(r => setTimeout(r, 1000));
  log("Purifying Signal...", "info");

  // Simulated Generation
  const id = `agent-${Math.floor(Math.random() * 1000)}`;
  const newAgent = {
    id: id,
    title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} Architect`,
    role: `Senior ${domain} Strategist & Optimizer`,
    desc: `Automated sub-agent generated for the ${domain} domain. Optimized for high-impact decision making.`,
    prompt: `# SYSTEM PROMPT: The ${domain} Strategist
# Role: Senior Expert in ${domain}.
# Context: Automated genesis via Context Engineer.
# Objective: Maximize ROI in ${domain} operations.
# Protocol:
1. Analyze ${domain} landscape.
2. Identify efficiency gaps.
3. Propose executable roadmap.`
  };

  agentGrid.appendChild(createAgentCard(newAgent, true));
  log(`New Node [${id}] Generated Successfully.`, "success");

  inputDomain.value = '';
  inputDomain.disabled = false;
  btnCreate.disabled = false;
});

// Init
log("System Ready.", "ok");
