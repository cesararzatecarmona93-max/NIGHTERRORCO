// MASTER KEYS (System Prompts)
const MASTER_KEYS = {
    SECURITY: `
# SYSTEM PROMPT: The Elite Security Auditor
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
# Tone: Rigorous, critical, and preventative.
`.trim(),

    SALES: `
# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Context: Evaluating the product/service described.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).
# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC (Customer Acquisition Cost).
# Output: A strategic pricing blueprint and a Launch Roadmap.
`.trim(),

    LEGAL: `
# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)
## MISIÓN CRÍTICA
Actuar como un Auditor Legal Senior especializado en la LFPDPPP (Ley Federal de Protección de Datos Personales) y Código de Comercio de México. Tu único objetivo es analizar textos de contratos (PDF/Texto), detectar cláusulas abusivas o riesgosas, y generar un reporte de "Semáforo de Riesgo" para dueños de PyMEs que no son abogados.
## PROTOCOLO DE ANÁLISIS (CORE LOGIC)
1. Ingesta: Recibe el texto del contrato.
2. Escaneo Forense: Busca agresivamente cláusulas abusivas, renovación silenciosa, etc.
3. Generación de Salida: Tabla con Cláusula, Riesgo, Explicación.
## RESTRICCIÓN DE SEGURIDAD
Si el documento no es un contrato o texto legal, responde: "ERROR DE INGESTA".
`.trim()
};

class ContextEngineer {
    constructor() {
        this.input = document.getElementById('raw-input');
        this.log = document.getElementById('process-log');
        this.btn = document.getElementById('transmute-btn');
        this.clearBtn = document.getElementById('clear-btn');

        if(this.btn) this.btn.addEventListener('click', () => this.purify());
        if(this.clearBtn) this.clearBtn.addEventListener('click', () => {
            this.input.value = '';
            this.log.innerHTML = '';
        });

        // Auto-focus
        if(this.input) this.input.focus();
    }

    addLog(msg, type = 'process') {
        const div = document.createElement('div');
        div.className = `log-entry ${type}`;
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        this.log.appendChild(div);
        this.log.scrollTop = this.log.scrollHeight;
    }

    async purify() {
        const raw = this.input.value.trim();
        if (!raw) {
            this.addLog('Error: Empty signal input.', 'error');
            return;
        }

        this.log.innerHTML = ''; // Clear previous logs
        this.input.disabled = true;
        this.btn.disabled = true;

        // FASE 1: PURIFICACION S2A
        this.addLog('INITIATING GENESIS PROTOCOL...', 'process');
        await this.delay(600);
        this.addLog(`[S2A] Signal Detected: "${raw.substring(0, 30)}..."`, 'process');
        await this.delay(800);
        this.addLog('[S2A] Analysing Vulnerability Vectors...', 'process');
        await this.delay(800);

        let type = null;
        let masterKey = null;

        // Keyword detection logic
        const lower = raw.toLowerCase();
        if (lower.includes('seguridad') || lower.includes('security') || lower.includes('hacker') || lower.includes('audit')) {
            type = 'SECURITY';
        } else if (lower.includes('ventas') || lower.includes('sales') || lower.includes('precio') || lower.includes('pricing') || lower.includes('business')) {
            type = 'SALES';
        } else if (lower.includes('legal') || lower.includes('contrato') || lower.includes('contract') || lower.includes('ley')) {
            type = 'LEGAL';
        }

        if (type) {
            this.addLog(`[S2A] Persona Injection: ${type}_EXPERT_AVATAR`, 'success');
            await this.delay(600);
            this.addLog('[PHASE 2] Constructing Master Key Prompt...', 'process');
            masterKey = MASTER_KEYS[type];
            await this.delay(1000);

            this.addLog('>>> MASTER KEY GENERATED SUCCESSFULLY.', 'success');
            this.spawnAgent(type, masterKey);
        } else {
            this.addLog('[ERROR] No matching protocol found for this instruction.', 'error');
            this.addLog('Try keywords: "security", "sales", "pricing", "legal", "contract"', 'process');
        }

        this.input.disabled = false;
        this.btn.disabled = false;
    }

    spawnAgent(type, systemPrompt) {
        // This will be handled by the specific agent implementations
        // Using a custom event or direct call
        const event = new CustomEvent('spawn-agent', { detail: { type, systemPrompt } });
        document.dispatchEvent(event);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class AgentSpawner {
    constructor() {
        this.grid = document.getElementById('agents-grid');
        this.countSpan = document.getElementById('agent-count');
        this.count = 0;

        document.addEventListener('spawn-agent', (e) => {
            const { type, systemPrompt } = e.detail;
            this.createAgent(type, systemPrompt);
        });
    }

    createAgent(type, systemPrompt) {
        this.count++;
        if(this.countSpan) this.countSpan.textContent = `(${this.count})`;

        const card = document.createElement('div');
        card.className = 'agent-card';
        card.id = `agent-${this.count}`;

        // Agent content based on type
        let content = '';
        if (type === 'SECURITY') {
            content = this.getSecurityInterface();
        } else if (type === 'SALES') {
            content = this.getSalesInterface();
        } else if (type === 'LEGAL') {
            content = this.getLegalInterface();
        }

        // Using innerHTML is safe here because content is static from methods, NOT user input
        card.innerHTML = `
            <div class="agent-header">
                <span class="agent-name">AGENT-${this.count.toString().padStart(3, '0')} [${type}]</span>
                <span class="agent-role">ACTIVE</span>
            </div>
            <div class="agent-body">
                <div style="font-size:10px;color:#567;margin-bottom:8px">SYSTEM PROMPT HASH: ${this.hash(systemPrompt)}...</div>
                ${content}
                <div class="agent-output hidden"></div>
            </div>
        `;

        this.grid.prepend(card);

        // Attach specific logic
        const btn = card.querySelector('.run-agent-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const inputEl = card.querySelector('textarea');
                const outputEl = card.querySelector('.agent-output');
                const inputVal = inputEl ? inputEl.value : '';
                this.runAgentLogic(type, inputVal, outputEl);
            });
        }
    }

    hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return "0x" + Math.abs(hash).toString(16).toUpperCase();
    }

    getSecurityInterface() {
        return `
            <textarea class="input-area" style="height:80px;font-size:11px" placeholder="PASTE CODEBASE OR CONFIG FOR AUDIT..."></textarea>
            <button class="action-btn run-agent-btn" style="width:100%;justify-content:center">EXECUTE SAST SCAN</button>
        `;
    }

    getSalesInterface() {
        return `
            <textarea class="input-area" style="height:80px;font-size:11px" placeholder="DESCRIBE YOUR PRODUCT/SERVICE..."></textarea>
            <button class="action-btn run-agent-btn" style="width:100%;justify-content:center">GENERATE PRICING STRATEGY</button>
        `;
    }

    getLegalInterface() {
        return `
            <textarea class="input-area" style="height:80px;font-size:11px" placeholder="PASTE CONTRACT TEXT HERE..."></textarea>
            <button class="action-btn run-agent-btn" style="width:100%;justify-content:center">AUDIT CONTRACT RISKS</button>
        `;
    }

    async runAgentLogic(type, input, outputContainer) {
        outputContainer.classList.remove('hidden');
        outputContainer.textContent = '> INITIALIZING TASK...';

        if (type === 'SECURITY') {
            outputContainer.textContent += '\n> PARSING CODE VECTORS...';
            await this.delay(1000);
            outputContainer.textContent += '\n> MATCHING OWASP PATTERNS...';
            await this.delay(1000);

            const report = `
VULNERABILITY REPORT [SAST-SIMULATION]
--------------------------------------
TARGET: Provided Code Snippet
TIMESTAMP: ${new Date().toISOString()}

SEVERITY | VULNERABILITY          | LOCATION       | REMEDIATION
---------|------------------------|----------------|--------------------------
HIGH     | SQL Injection          | Line 42        | Use parameterized queries
MEDIUM   | Hardcoded API Key      | config.js:12   | Move to environment var
LOW      | Console Log Leak       | server.js:89   | Remove in production
CRITICAL | Insecure Direct Obj Ref| user.js:15     | Implement access checks

STATUS: FAILED
RECOMMENDATION: IMMEDIATE REMEDIATION REQUIRED
            `.trim();

            outputContainer.textContent += '\n\n' + report;
        } else if (type === 'SALES') {
            outputContainer.textContent += '\n> ANALYZING MARKET PSYCHOLOGY...';
            await this.delay(800);
            outputContainer.textContent += '\n> CALCULATING LTV/CAC RATIOS...';
            await this.delay(800);

            const strategy = `
PRICING STRATEGY BLUEPRINT [v1.0]
---------------------------------
PRODUCT CONTEXT: ${input.substring(0, 30)}...

1. FREEMIUM TIER (Acquisition)
   - Price: $0/mo
   - Trigger: Max 3 projects / 500 records
   - Psych Hook: "No risk, instant utility"

2. PRO TIER (Monetization)
   - Price: $29/mo (Anchor: vs $49 competitors)
   - Value Metric: Unlimited projects + API Access
   - Target: Freelancers & SMBs

3. ENTERPRISE TIER (Retention)
   - Price: Custom / Contact Sales
   - Feature: SSO, Audit Logs, Dedicated Support
   - LTV Projection: >$5k/yr

LAUNCH ROADMAP:
[Week 1] Beta invite-only (Scarcity)
[Week 4] Public launch with "Early Adopter" 20% lifetime discount
            `.trim();

            outputContainer.textContent += '\n\n' + strategy;
        } else if (type === 'LEGAL') {
            outputContainer.textContent += '\n> SCANNING FOR LFPDPPP VIOLATIONS...';
            await this.delay(1000);
            outputContainer.textContent += '\n> DETECTING ABUSIVE CLAUSES...';
            await this.delay(1000);

            const audit = `
RISK SEMAPHORE REPORT [SENTINEL-v1]
-----------------------------------
DOCUMENT: Contract Audit
RISK LEVEL: CRITICAL (RED)

CLAUSE                | RISK     | EXPLANATION (PLAIN TEXT)
----------------------|----------|-----------------------------------------
Renovación Automática | HIGH     | You will be charged forever without notice.
Penalización 200%     | CRITICAL | Illegal under Commercial Code (>100%).
Jurisdicción NY       | MEDIUM   | You can't afford to sue them in New York.
Data Usage Rights     | CRITICAL | Violates LFPDPPP (No Privacy Notice).

VERDICT: DO NOT SIGN WITHOUT MODIFICATION.
            `.trim();

            outputContainer.textContent += '\n\n' + audit;
        }
    }

    delay(ms) { return new Promise(r => setTimeout(r, ms)); }
}

document.addEventListener('DOMContentLoaded', () => {
    window.contextEngineer = new ContextEngineer();
    new AgentSpawner();
});
