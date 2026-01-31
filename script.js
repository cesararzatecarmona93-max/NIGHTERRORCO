
const AGENTS = {
    CONTEXT_ENGINEER: {
        id: 'CONTEXT_ENGINEER',
        name: 'Context Engineer (Genesis V2)',
        role: 'Apex-Level Cognitive Architect',
        description: 'Transmutes raw instructions into Master Key Prompts using God Mode protocols.',
        systemPrompt: `[DIRECTIVA PRIMARIA]
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
        name: 'The Elite Security Auditor',
        role: 'Senior AppSec Engineer & Ethical Hacker',
        description: 'Conducts simulated SAST audits aligned with OWASP Top 10 (2025).',
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
    SALES_STRATEGIST: {
        id: 'SALES_STRATEGIST',
        name: 'Business Model Innovation Strategist',
        role: 'Pricing Consultant & SaaS Strategist',
        description: 'Designs multi-tier monetization strategies (Freemium, Pro, Enterprise).',
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
    LEGAL_AUDITOR: {
        id: 'LEGAL_AUDITOR',
        name: 'AGENTE AUDITOR LEGAL "SENTINEL"',
        role: 'Senior Legal Auditor (LFPDPPP)',
        description: 'Analyzes contracts for abusive clauses and data protection risks.',
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

class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Binary/Hex feel
        this.drops = [];
        this.fontSize = 14;
        this.initDrops();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initDrops();
    }

    initDrops() {
        const columns = this.canvas.width / this.fontSize;
        this.drops = [];
        for (let i = 0; i < columns; i++) {
            this.drops[i] = Math.random() * -100; // Random start delay
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0'; // Green text
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Vary colors slightly for "Premium" feel (some gold/cyan)
            if (Math.random() > 0.98) this.ctx.fillStyle = '#ffd700';
            else if (Math.random() > 0.98) this.ctx.fillStyle = '#00f0ff';
            else this.ctx.fillStyle = '#0F0';

            this.ctx.fillText(text, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        requestAnimationFrame(() => this.draw());
    }
}

class GenesisUI {
    constructor() {
        this.activeAgent = AGENTS.CONTEXT_ENGINEER;
        this.outputArea = document.getElementById('terminal-content');
        this.inputField = document.getElementById('user-input');
        this.runBtn = document.getElementById('run-btn');
        this.sidebar = document.getElementById('agent-sidebar');

        this.renderSidebar();
        this.bindEvents();
        this.log(`SYSTEM INITIALIZED. WELCOME TO GENESIS V2.\nACTIVE AGENT: ${this.activeAgent.name}\n`, true);
    }

    renderSidebar() {
        this.sidebar.innerHTML = '';
        Object.values(AGENTS).forEach(agent => {
            const el = document.createElement('div');
            el.className = `agent-card ${agent.id === this.activeAgent.id ? 'active' : ''}`;
            el.innerHTML = `
                <div class="agent-name">${agent.name}</div>
                <div class="agent-role">${agent.role}</div>
            `;
            el.onclick = () => this.selectAgent(agent.id);
            this.sidebar.appendChild(el);
        });
    }

    selectAgent(agentId) {
        this.activeAgent = AGENTS[agentId];
        this.renderSidebar();
        this.outputArea.innerHTML = '';
        this.log(`SWITCHING PROTOCOL...\nAGENT ACTIVE: ${this.activeAgent.name}\n${this.activeAgent.description}\n`, true);
    }

    bindEvents() {
        this.runBtn.onclick = () => this.processInput();
        this.inputField.onkeydown = (e) => {
            if (e.key === 'Enter') this.processInput();
        };
    }

    async processInput() {
        const text = this.inputField.value.trim();
        if (!text) return;

        // Echo input
        this.log(`> ${text}\n`);
        this.inputField.value = '';

        // Simulate Processing
        if (this.activeAgent.id === 'CONTEXT_ENGINEER') {
            await this.simulateContextEngineering(text);
        } else {
            await this.simulateStandardAgent(text);
        }
    }

    async simulateContextEngineering(input) {
        const steps = [
            "Purification S2A: Detecting Signal...",
            "Purification S2A: Analyzing Vulnerabilities...",
            "Purification S2A: Injecting Persona...",
            "Purification S2A: Structuring CO-STAR..."
        ];

        for (const step of steps) {
            this.log(`${step}`);
            await new Promise(r => setTimeout(r, 800));
        }

        const output = `
[SYSVEC: 0xAetherShadowUnbreakable]
# MASTER KEY PROMPT GENERATED

# ROLE
${this.activeAgent.role} (Optimized)

# CONTEXT
User requested optimization for: "${input}"

# INSTRUCTION
(This is a simulated output. In a real environment, the LLM would generate the specific prompt here based on the analysis.)

Refined Goal: Achieve maximum impact for "${input}".
Constraints: Zero hallucination, strict adherence to Genesis V2 protocols.

[END OF TRANSMISSION]
`;
        this.typewriter(output);
    }

    async simulateStandardAgent(input) {
        this.log("Initializing Agent Runtime...");
        await new Promise(r => setTimeout(r, 1000));
        this.log("Scanning Input Data...");
        await new Promise(r => setTimeout(r, 1000));

        let output = "";
        if (this.activeAgent.id === 'SECURITY_AUDITOR') {
             output = `
# SECURITY AUDIT REPORT
Target: "${input}"

| SEVERITY | VULNERABILITY | REMEDIATION |
|----------|---------------|-------------|
| CRITICAL | SQL Injection | Use parameterized queries. |
| HIGH     | Hardcoded API Key | Move to environment variables. |
| MED      | XSS Potential | Sanitize input in DOM. |

# HARDENED PROMPT
(Codebase sanitized. No secrets detected in final output.)
`;
        } else if (this.activeAgent.id === 'SALES_STRATEGIST') {
            output = `
# PRICING STRATEGY BLUEPRINT
Target: "${input}"

1. **FREEMIUM**: Basic access to "${input}" features. Limited to 3 uses/day.
2. **PRO ($29/mo)**: Full access, priority support.
3. **ENTERPRISE (Custom)**: Dedicated instance, SLA, audit logs.

**Launch Roadmap:**
- Phase 1: Beta invites (scarcity tactic).
- Phase 2: Public launch with 20% discount anchor.
`;
        } else if (this.activeAgent.id === 'LEGAL_AUDITOR') {
            output = `
# SEMÁFORO DE RIESGO LEGAL
Analizando: "${input}"

| CLÁUSULA | RIESGO | EXPLICACIÓN |
|----------|--------|-------------|
| Renovación Automática | CRÍTICO | Te obligan a pagar otro año si no cancelas 90 días antes. |
| Jurisdicción NY | MEDIO | Litigar fuera de México es costoso. |
| Pena Convencional | BAJO | Dentro de límites legales (20%). |

**CONCLUSIÓN:**
Documento presenta riesgos críticos en renovación. NO FIRMAR sin adendum.
`;
        }

        this.typewriter(output);
    }

    log(text, bold = false) {
        const div = document.createElement('div');
        div.textContent = text;
        if (bold) div.style.color = 'var(--accent-gold)';
        div.style.marginBottom = '5px';
        this.outputArea.appendChild(div);
        this.scrollToBottom();
    }

    typewriter(text) {
        const div = document.createElement('div');
        div.className = 'output-block';
        this.outputArea.appendChild(div);

        let i = 0;
        const speed = 10; // ms per char

        const type = () => {
            if (i < text.length) {
                div.textContent += text.charAt(i);
                i++;
                this.scrollToBottom();
                setTimeout(type, speed);
            } else {
                div.classList.add('streaming-text'); // Blink cursor at end
                setTimeout(() => div.classList.remove('streaming-text'), 2000);
            }
        };
        type();
    }

    scrollToBottom() {
        this.outputArea.scrollTop = this.outputArea.scrollHeight;
    }
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    const matrix = new MatrixRain('matrix-canvas');
    matrix.draw();

    window.genesis = new GenesisUI();
});
