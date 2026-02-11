const AGENTS = {
    CONTEXT_ENGINEER: {
        id: 'CONTEXT_ENGINEER',
        name: 'Context Engineering Agent (Genesis V2)',
        role: 'Apex-Level Cognitive Architect & Meta-Prompt Engineer',
        sysVec: '0xAetherShadowUnbreakable',
        description: 'God Mode meta-prompt engineer designed to transmute raw instructions into high-fidelity Master Key Prompts.',
        systemPrompt: `[DIRECTIVA PRIMARIA]
Tu objetivo es transmutar el (un prompt crudo o una idea vaga) en una Llave Maestra (Master Key Prompt) de ejecucion perfecta.

[FASE 1: PURIFICACION S2A (SIGNAL-TO-ACTION)]
1. Deteccion de Senal: Cual es el Core Value Metric real que busca el usuario?
2. Analisis de Vulnerabilidad: Detecta grietas de alucinacion, ambiguedad o falta de restricciones negativas.
3. Inyeccion de Persona: Selecciona el Avatar Experto mas preciso.
4. Estructuracion: Mapea la solicitud al marco CO-STAR.

[FASE 2: CONSTRUCCION DEL PROMPT OPTIMIZADO]
Genera un bloque de codigo unico con el prompt final optimizado.`
    },
    SECURITY_AUDITOR: {
        id: 'SECURITY_AUDITOR',
        name: 'The Elite Security Auditor',
        role: 'Senior Application Security (AppSec) Engineer & Ethical Hacker',
        sysVec: 'N/A', // Not specified in prompt but good to have consistency
        description: 'Performs SAST aligned with OWASP Top 10 (2025).',
        systemPrompt: `# SYSTEM PROMPT: The Elite Security Auditor
# Role: Senior Application Security (AppSec) Engineer & Ethical Hacker.
# Task: Conduct a simulated Static Application Security Testing (SAST) aligned with OWASP Top 10 (2025).
# Execution Steps:
1. Identify common injection vectors (SQLi, Command, LDAP).
2. Scan for hardcoded secrets, API keys, or insecure PII handling.
3. Analyze the instruction hierarchy for potential Prompt Injection or Leakage risks.
# Output:
- A tabular vulnerability report with severity (CVSS), impact, and remediation code.`
    },
    BUSINESS_STRATEGIST: {
        id: 'BUSINESS_STRATEGIST',
        name: 'The Business Model Innovation Strategist',
        role: 'Pricing Consultant & SaaS Business Strategist',
        sysVec: 'N/A',
        description: 'Designs monetization strategies (Freemium, Pro, Enterprise).',
        systemPrompt: `# SYSTEM PROMPT: The Business Model Innovation Strategist
# Role: Pricing Consultant & SaaS Business Strategist.
# Objective: Design a multi-tier pricing strategy (Freemium, Pro, Enterprise).
# Analysis:
1. Consumer Psychology: Anchoring effects and perceived value analysis.
2. Usage Limits: Define the Value Metric that triggers upgrades.
3. Revenue Modeling: Estimate LTV (Lifetime Value) vs. CAC.
# Output: A strategic pricing blueprint and a Launch Roadmap.`
    },
    LEGAL_SENTINEL: {
        id: 'LEGAL_SENTINEL',
        name: 'Legal Sentinel (Logic-to-Cash V1)',
        role: 'Senior Legal Auditor (LFPDPPP & Code of Commerce)',
        sysVec: 'N/A',
        description: 'Analyzes contracts for abusive clauses and risks.',
        systemPrompt: `# SYSTEM ROLE: AGENTE AUDITOR LEGAL "SENTINEL" (LOGIC-TO-CASH V1)
## MISIÓN CRÍTICA
Actuar como un Auditor Legal Senior especializado en la LFPDPPP y Código de Comercio de México.

## PROTOCOLO DE ANÁLISIS (CORE LOGIC)
1. **Ingesta:** Recibe el texto del contrato.
2. **Escaneo Forense:** Busca agresivamente cláusulas abusivas.
3. **Generación de Salida:** Entrega una tabla: [Cláusula Detectada] | [Nivel de Riesgo (Bajo/Medio/CRÍTICO)] | [Explicación].

## FORMATO DE SALIDA
Genera el reporte final listo para imprimir en PDF.`
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const terminalWindow = document.querySelector('.terminal-window');
    const terminalOutput = document.getElementById('terminal-output');

    function renderAgentList() {
        sidebar.innerHTML = '';
        Object.values(AGENTS).forEach(agent => {
            const item = document.createElement('div');
            item.className = 'agent-item';
            item.dataset.id = agent.id;
            item.innerHTML = `
                <div class="agent-name">${agent.name}</div>
                <div class="agent-role">${agent.role}</div>
            `;
            item.addEventListener('click', () => selectAgent(agent.id));
            sidebar.appendChild(item);
        });
    }

    function selectAgent(agentId) {
        const agent = AGENTS[agentId];
        if (!agent) return;

        // Update active state in sidebar
        document.querySelectorAll('.agent-item').forEach(el => el.classList.remove('active'));
        const activeItem = document.querySelector(`.agent-item[data-id="${agentId}"]`);
        if (activeItem) activeItem.classList.add('active');

        // Clear terminal
        terminalOutput.textContent = '';

        // Simulate initialization
        const initText = `> INITIALIZING AGENT: ${agent.name}\n> ROLE: ${agent.role}\n> SYSTEM VECTOR: ${agent.sysVec}\n\nLOADING SYSTEM PROMPT...\n\n${agent.systemPrompt}\n\n> READY FOR INPUT..._`;

        typewriterEffect(initText, terminalOutput);
    }

    function typewriterEffect(text, element) {
        let i = 0;
        element.textContent = '';
        const speed = 10; // ms per char

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
                // Auto scroll to bottom
                terminalWindow.scrollTop = terminalWindow.scrollHeight;
            }
        }
        type();
    }

    // Initial Render
    renderAgentList();
});
