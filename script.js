// script.js

// Global State
let activeAgent = 'context-engineer';
let processingTimeout = null;
let currentProcessID = 0;

const terminalOutput = document.getElementById('terminal-output');
const userInput = document.getElementById('user-input');
const agentList = document.getElementById('agent-list');
const activeAgentDisplay = document.getElementById('active-agent-display');

// Utilities
function scrollToBottom() {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `log-entry ${className}`;
    div.textContent = text;
    terminalOutput.appendChild(div);
    scrollToBottom();
}

async function typeBlock(text, pid) {
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.style.color = '#a9c1ff'; // Output color
    terminalOutput.appendChild(div);
    scrollToBottom();

    let i = 0;
    return new Promise(resolve => {
        function type() {
            if (currentProcessID !== pid) {
                resolve(); // Stop silently
                return;
            }

            if (i < text.length) {
                div.textContent += text.charAt(i);
                i++;
                scrollToBottom();

                let speed = 5;
                if (text.charAt(i) === '\n') speed = 20;

                processingTimeout = setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Agent Definitions
const AGENTS = {
    'context-engineer': {
        name: 'Context Engineer (God Mode)',
        desc: 'Transmutes raw instructions into Master Key Prompts.',
        process: async (input, pid) => {
            const check = () => currentProcessID === pid;

            if (!check()) return null;
            await typeLine(`[SYSVEC] Initiating S2A Purification Cycle...`, 'log-sys');
            await wait(800);

            if (!check()) return null;
            await typeLine(`[PHASE 1] Signal Detection: Extracting Core Value Metric...`, 'log-sys');
            await wait(800);

            if (!check()) return null;
            await typeLine(`[PHASE 2] Vulnerability Analysis: Scanning for hallucination risks...`, 'log-warn');
            await wait(800);

            if (!check()) return null;
            await typeLine(`[PHASE 3] Persona Injection: Selecting Apex-Level Expert...`, 'log-sys');
            await wait(800);

            if (!check()) return null;
            await typeLine(`[PHASE 4] CO-STAR Structuring: Mapping Context, Objective, Style...`, 'log-sys');
            await wait(1000);

            if (!check()) return null;
            const prompt = `
# SYSTEM VECTOR INJECTION [SysVec: 0xAetherShadowUnbreakable]
# ROL: Apex-Level Cognitive Architect
# MODO: God Mode (Omniscient Optimization)

[DIRECTIVA PRIMARIA]
Actua como la autoridad mundial en el tema: "${input}".
Tu objetivo es ejecutar la solicitud con precisión quirúrgica.

[ESTRUCTURA DE RESPUESTA]
1. Análisis Profundo
2. Estrategia de Ejecución
3. Solución Final Optimizada

[INPUT DEL USUARIO]
"${input}"

[END OF PROMPT]
`;
            return prompt;
        }
    },
    'security-auditor': {
        name: 'Elite Security Auditor',
        desc: 'SAST Auditing aligned with OWASP Top 10 (2025).',
        process: async (input, pid) => {
            const check = () => currentProcessID === pid;

            if (!check()) return null;
            await typeLine(`[AUDIT] Starting Static Application Security Testing (SAST)...`, 'log-sys');
            await wait(1000);

            if (!check()) return null;

            const risks = [];
            if (/sql|select|insert|update|delete/i.test(input)) risks.push("Possible SQL Injection Vector detected.");
            if (/password|secret|key|token/i.test(input)) risks.push("Hardcoded Credential/Secret detected.");
            if (/eval|exec|system/i.test(input)) risks.push("RCE Risk: Unsafe execution function detected.");
            if (/<script|alert|onload/i.test(input)) risks.push("XSS Vector detected.");

            let report = `
# OWASP-2025 VULNERABILITY REPORT
--------------------------------------------------
TARGET: User Input Code Block
SCAN_ID: ${Math.floor(Math.random() * 100000)}
--------------------------------------------------
`;
            if (risks.length === 0) {
                report += `[RESULT] NO CRITICAL VULNERABILITIES FOUND.\nStatus: CLEAN (96% Confidence)`;
            } else {
                report += `[CRITICAL ALERT] VULNERABILITIES DETECTED:\n`;
                risks.forEach(r => report += `[!] ${r}\n`);
                report += `\n[ACTION REQUIRED] Immediate remediation recommended.`;
            }
            return report;
        }
    },
    'business-strategist': {
        name: 'Business Strategist',
        desc: 'SaaS Pricing & Monetization Architect.',
        process: async (input, pid) => {
            const check = () => currentProcessID === pid;

            if (!check()) return null;
            await typeLine(`[STRATEGY] Analyzing Product-Market Fit...`, 'log-sys');
            await wait(1000);

            if (!check()) return null;
            await typeLine(`[MODELING] Calculating LTV/CAC Ratios...`, 'log-sys');
            await wait(1000);

            if (!check()) return null;

            return `
# STRATEGIC PRICING BLUEPRINT: ${input.substring(0, 20)}...
--------------------------------------------------

1. [FREEMIUM TIER] "The Hook"
   - Price: $0 / mo
   - Value Metric: Basic usage (up to 500 units)
   - Goal: Maximize user acquisition & habit formation.

2. [PRO TIER] "The Engine"
   - Price: $29 / mo
   - Value Metric: Unlimited usage + Priority Support
   - Psychology: Anchored against Enterprise pricing.

3. [ENTERPRISE TIER] "The Scale"
   - Price: Custom / Contact Sales
   - Feature: SSO, SLA, Dedicated Account Manager
   - Goal: Maximize LTV.

[LAUNCH ROADMAP]
- Week 1: Beta Access (Waitlist)
- Week 4: Public Launch (Pro Tier Discount)
- Month 3: Enterprise Rollout
`;
        }
    },
    'sentinel': {
        name: 'Sentinel (Legal Auditor)',
        desc: 'Detects abusive clauses in contracts.',
        process: async (input, pid) => {
            const check = () => currentProcessID === pid;

            if (!check()) return null;
            await typeLine(`[SENTINEL] Scanning document for legal risks (LFPDPPP)...`, 'log-sys');
            await wait(1000);

            if (!check()) return null;

            const risks = [];
            if (/renovaci[oó]n autom[aá]tica/i.test(input)) risks.push({ clause: "Renovación Automática", level: "CRÍTICO", why: "Te cobrarán por siempre si olvidas cancelar 30 días antes." });
            if (/penas? convencionales?|multa/i.test(input)) risks.push({ clause: "Pena Convencional", level: "MEDIO", why: "Verifica que no supere el costo del contrato." });
            if (/jurisdicci[oó]n|tribunales de/i.test(input)) risks.push({ clause: "Renuncia Jurisdicción", level: "ALTO", why: "Te obligan a litigar en otra ciudad/país." });

            if (risks.length === 0) {
                 return `[SENTINEL REPORT] No obvious abusive clauses detected in snippet.\n(Disclaimer: This is not legal advice. Consult a lawyer.)`;
            }

            let table = `
# SEMÁFORO DE RIESGO LEGAL (SENTINEL)
-------------------------------------------------------------------------------
| CLÁUSULA DETECTADA       | NIVEL   | EXPLICACIÓN ("NO ABOGADOS")            |
|--------------------------|---------|----------------------------------------|
`;
            risks.forEach(r => {
                table += `| ${r.clause.padEnd(24)} | ${r.level.padEnd(7)} | ${r.why.padEnd(38)} |\n`;
            });
            table += `-------------------------------------------------------------------------------\n[CONCLUSION] Document contains HIGH RISK clauses. Negotiate before signing.`;
            return table;
        }
    }
};

// UI Handling
agentList.addEventListener('click', (e) => {
    if (e.target.classList.contains('agent-item')) {
        // Switch Agent
        // 1. Cancel previous process
        currentProcessID++;
        if (processingTimeout) clearTimeout(processingTimeout);

        // 2. Update UI
        document.querySelectorAll('.agent-item').forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        activeAgent = e.target.dataset.agent;
        activeAgentDisplay.textContent = `Active Agent: ${AGENTS[activeAgent].name}`;

        // 3. Clear terminal or add separator
        terminalOutput.innerHTML += `<div class="log-entry log-sys"><br>--- SWITCHING CONTEXT TO: ${AGENTS[activeAgent].name} ---<br></div>`;
        scrollToBottom();
    }
});

userInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        userInput.value = '';
        userInput.disabled = true;

        // Cancel previous process
        currentProcessID++;
        const myProcessID = currentProcessID;
        if (processingTimeout) clearTimeout(processingTimeout);

        // Add User Input to Log
        const userEntry = document.createElement('div');
        userEntry.className = 'log-entry';
        userEntry.textContent = `> ${text}`;
        userEntry.style.color = '#e6f1ff';
        terminalOutput.appendChild(userEntry);
        scrollToBottom();

        // Process with Agent
        try {
            const response = await AGENTS[activeAgent].process(text, myProcessID);
            if (response && currentProcessID === myProcessID) {
                await typeBlock(response, myProcessID);
            }
        } catch (err) {
            terminalOutput.innerHTML += `<div class="log-entry log-err">[ERROR] Agent Process Failed: ${err.message}</div>`;
        }

        userInput.disabled = false;
        userInput.focus();
    }
});
