// Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const views = document.querySelectorAll('.agent-view');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and views
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            // Add active class to clicked tab and corresponding view
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});

// Agent Logic

// 1. Context Engineering Agent (God Mode)
function transmutePrompt() {
    const input = document.getElementById('ctx-input').value;
    const outputDiv = document.getElementById('ctx-output');

    if (!input.trim()) {
        outputDiv.innerHTML = '<span style="color:var(--warn)">[ERROR] Input signal null. Provide raw prompt.</span>';
        return;
    }

    outputDiv.innerHTML = '<span style="color:var(--cyan)">[SYSVEC] Initiating Purification Sequence...</span>';

    setTimeout(() => {
        const masterKey = `[SYSVEC: 0xAetherShadowUnbreakable]
# ROL: Apex-Level Cognitive Architect
# MODE: God Mode (Omniscient Optimization)

[DIRECTIVA PRIMARIA]
Transmutación completada. Intención reconstruida bajo arquitectura determinista.

[MASTER KEY PROMPT]
${input}

[RESTRICTIONS]
- Zero-Shot Chain of Thought
- Negative Constraints Applied
`;
        outputDiv.innerHTML = '';
        const pre = document.createElement('pre');
        pre.textContent = masterKey;
        outputDiv.appendChild(pre);
    }, 1500);
}

// 2. Security Auditor Black
function auditSecurity() {
    const input = document.getElementById('sec-input').value;
    const outputDiv = document.getElementById('sec-output');

    if (!input.trim()) {
        outputDiv.innerHTML = '<span style="color:var(--warn)">[ERROR] No code provided for SAST scan.</span>';
        return;
    }

    // Mock patterns
    const risks = [];
    if (input.match(/eval\(/)) risks.push({ type: 'Code Injection', severity: 'CRITICAL', desc: 'Use of eval() detected.' });
    if (input.match(/exec\(/)) risks.push({ type: 'Command Injection', severity: 'CRITICAL', desc: 'Use of exec() detected.' });
    if (input.match(/api_key|secret|password/i)) risks.push({ type: 'Hardcoded Secret', severity: 'HIGH', desc: 'Potential hardcoded credential found.' });
    if (input.match(/<script>/)) risks.push({ type: 'XSS', severity: 'HIGH', desc: 'Raw script tag detected.' });

    // Default safe
    if (risks.length === 0) {
        outputDiv.innerHTML = '<div style="color:var(--ok); padding:10px; border:1px solid var(--ok); border-radius:8px;">✅ SAST Scan Clean. No vulnerabilities detected in provided snippet.</div>';
        return;
    }

    let tableHtml = `<table class="risk-table"><thead><tr><th>Vulnerability</th><th>Severity</th><th>Remediation</th></tr></thead><tbody>`;

    risks.forEach(r => {
        let badgeClass = r.severity === 'CRITICAL' ? 'risk-crit' : 'risk-med';
        tableHtml += `
            <tr>
                <td>${r.type}</td>
                <td><span class="risk-badge ${badgeClass}">${r.severity}</span></td>
                <td>${r.desc}</td>
            </tr>
        `;
    });
    tableHtml += '</tbody></table>';

    outputDiv.innerHTML = tableHtml;
}

// 3. Sales Silo Architect
function generateStrategy() {
    const input = document.getElementById('sales-input').value;
    const outputDiv = document.getElementById('sales-output');

    if (!input.trim()) {
        outputDiv.innerHTML = '<span style="color:var(--warn)">[ERROR] Product description missing.</span>';
        return;
    }

    const strategy = `
# STRATEGIC PRICING BLUEPRINT
**Target:** ${input.substring(0, 50)}...

## 1. Freemium Tier (The Hook)
- **Objective:** Maximum user acquisition.
- **Limits:** Core features capped at 3 projects/month.
- **Psychology:** Loss aversion trigger on usage limits.

## 2. Pro Tier (The Value Metric)
- **Pricing:** $29/mo (Anchored against Enterprise).
- **Features:** Unlimited projects, priority support.
- **Revenue Model:** LTV targeted at 12 months.

## 3. Enterprise (The Cash Cow)
- **Pricing:** Custom/Contact Sales.
- **Features:** SSO, SLA, Dedicated Account Manager.

[LAUNCH ROADMAP GENERATED]
`;
    outputDiv.innerHTML = '';
    const pre = document.createElement('pre');
    pre.textContent = strategy;
    outputDiv.appendChild(pre);
}

// 4. Legal Auditor Sentinel
function analyzeLegal() {
    const input = document.getElementById('legal-input').value;
    const outputDiv = document.getElementById('legal-output');

    if (!input.trim()) {
        outputDiv.innerHTML = '<span style="color:var(--warn)">[ERROR DE INGESTA] Documento vacío.</span>';
        return;
    }

    // specific check: "Si el documento no es un contrato o texto legal"
    // We simulate this by checking length or generic keywords, but for now we just process.

    const risks = [];
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('renovación automática') || lowerInput.includes('renovacion automatica') || lowerInput.includes('renovará automáticamente')) {
        risks.push({
            clause: 'Renovación Automática',
            level: 'MEDIO',
            explanation: 'Te cobrarán de nuevo sin avisar si no cancelas con mucha anticipación.'
        });
    }

    if (lowerInput.includes('pena convencional') || lowerInput.includes('penalización')) {
        risks.push({
            clause: 'Pena Convencional / Penalización',
            level: 'CRÍTICO',
            explanation: 'Multas posiblemente desproporcionadas. Verifica que no excedan el costo del servicio.'
        });
    }

    if (lowerInput.includes('jurisdicción') || lowerInput.includes('tribunales de')) {
        risks.push({
            clause: 'Renuncia de Jurisdicción',
            level: 'ALTO',
            explanation: 'Si hay pleito, te obligan a ir a tribunales lejos de tu ciudad (gastos de viaje/viáticos).'
        });
    }

    if (lowerInput.includes('datos personales') && !lowerInput.includes('aviso de privacidad')) {
        risks.push({
            clause: 'Datos Personales sin Aviso',
            level: 'ALERTA ROJA',
            explanation: 'Recopilan datos sin cumplir la LFPDPPP. Riesgo de multas severas.'
        });
    }

    if (risks.length === 0) {
        outputDiv.innerHTML = '<div style="color:var(--ok); padding:10px; border:1px solid var(--ok); border-radius:8px;">🟢 SEMÁFORO VERDE. No se detectaron cláusulas abusivas obvias en el escaneo forense. (Esto no es consejo legal).</div>';
        return;
    }

    // Generate Markdown-like table for display
    let tableHtml = `
    <h3>Reporte de Riesgos (Semáforo)</h3>
    <table class="risk-table">
        <thead>
            <tr>
                <th>Cláusula Detectada</th>
                <th>Nivel de Riesgo</th>
                <th>Explicación (Lenguaje Claro)</th>
            </tr>
        </thead>
        <tbody>
    `;

    risks.forEach(r => {
        let badgeClass = 'risk-low';
        if (r.level === 'CRÍTICO' || r.level === 'ALERTA ROJA') badgeClass = 'risk-crit';
        else if (r.level === 'MEDIO' || r.level === 'ALTO') badgeClass = 'risk-med';

        tableHtml += `
            <tr>
                <td>${r.clause}</td>
                <td><span class="risk-badge ${badgeClass}">${r.level}</span></td>
                <td>${r.explanation}</td>
            </tr>
        `;
    });

    tableHtml += '</tbody></table>';

    // Add "Download PDF" simulation button
    tableHtml += '<div style="margin-top:16px"><button class="action-btn" onclick="alert(\'Generando PDF...\')">⬇ Descargar Reporte PDF</button></div>';

    outputDiv.innerHTML = tableHtml;
}
