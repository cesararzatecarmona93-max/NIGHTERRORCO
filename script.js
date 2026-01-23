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