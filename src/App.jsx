import { useState, useEffect } from "react";

const TEAM = ["Estefany", "Fran", "Gabi", "Mel", "Maca"];

const CATEGORIES = [
  { id: "soporte", label: "Soporte & Comunicación" },
  { id: "grupos", label: "Grupos & Guardianas" },
  { id: "discord", label: "Discord" },
  { id: "formularios", label: "Formularios" },
  { id: "contenido", label: "Contenido & Documentos" },
  { id: "tecnico", label: "Técnico & Hotmart" },
];

const RESOURCE_CATEGORIES = [
  { id: "documentos", label: "Documentos", emoji: "◇" },
  { id: "pagos", label: "Páginas de pago", emoji: "◈" },
  { id: "herramientas", label: "Herramientas", emoji: "✦" },
  { id: "hotmart", label: "Hotmart", emoji: "⊕" },
  { id: "otros", label: "Otros", emoji: "○" },
];

const INITIAL_NOTICES = [
  {
    id: 1, category: "soporte", date: "15/05/2026", priority: "alta",
    title: "El Círculo NO es Eres Unimán ni Maniféstalo — diferencias clave",
    body: `El Círculo es una mentoría personalizada, NO un curso. Esto cambia completamente cómo respondemos las dudas de alumnas.

NUNCA usar respuestas del año pasado ni del programa anterior. Diferencias principales:
• No hay módulos grabados en vídeo
• No hay un día/hora fijo de llamada semanal
• Los grupos son pequeños e íntimos (~50 personas por guardiana)
• Los horarios varían para adaptarse a distintas franjas horarias

Si una alumna pregunta por los horarios: "Al ser grupos pequeños podemos adaptarnos a diferentes franjas horarias. Los horarios se comunicarán una vez cerrados los grupos."`,
    reads: {}
  },
  {
    id: 2, category: "grupos", date: "15/05/2026", priority: "alta",
    title: "Acceso a grabaciones — RESTRINGIDO por grupo",
    body: `Las alumnas SOLO tienen acceso a las grabaciones de su propio grupo en Hotmart.

NO tienen acceso a grabaciones de otros grupos. Si una alumna pregunta si puede ver la llamada de otro grupo: respuesta es NO, y no hace falta dar más explicación que "cada alumna accede únicamente a las grabaciones de su grupo."`,
    reads: {}
  },
  {
    id: 3, category: "grupos", date: "15/05/2026", priority: "media",
    title: "Estructura de grupos — \"Casas\" estilo Harry Potter",
    body: `Los grupos están organizados como casas:
• Cada guardiana tiene su "casa" (aprox. 50 alumnas)
• Dentro de cada casa hay tríos (~16–17 tríos por grupo)
• Los tríos se forman dentro del mismo grupo (no transversal)

Los grupos se asignarán en función del país/zona horaria, no de forma aleatoria. La asignación formal se comunicará aprox. el sábado 6 de junio.`,
    reads: {}
  },
  {
    id: 4, category: "discord", date: "15/05/2026", priority: "alta",
    title: "Estructura de canales de Discord — qué va en cada uno",
    body: `Canales activos de lunes a viernes:
• #logros-y-manifestaciones — compartir logros y manifestaciones
• #gratitud — espacio de gratitud diaria
• #preguntas-poderosas — SOLO de lunes a viernes. CERRADO el fin de semana
• #presentaciones — bienvenida de nuevas alumnas
• #comunicaciones — avisos del equipo
• #soporte-tecnico — problemas técnicos

FIN DE SEMANA: Solo se cierra #preguntas-poderosas. El resto permanece abierto.

Primera semana: monitoring activo. Si una alumna pone una pregunta en un canal que no corresponde, borrar y redirigir amablemente al canal correcto.`,
    reads: {}
  },
  {
    id: 5, category: "discord", date: "15/05/2026", priority: "media",
    title: "Canales de encuentros presenciales por ciudad",
    body: `Se crearán canales de Discord por ciudad/país para que las alumnas organicen sus encuentros presenciales.

Las alumnas entran al canal de su ciudad y organizan allí las quedadas de forma autónoma. Nosotras NO organizamos los eventos, solo facilitamos el espacio.

Cuándo se crean: una vez cerrado el formulario de tríos (antes del 3 de junio). Los nombres de las ciudades/países se decidirán según los datos del formulario.`,
    reads: {}
  },
  {
    id: 6, category: "formularios", date: "15/05/2026", priority: "alta",
    title: "Formulario de tríos — pregunta de franja horaria",
    body: `El formulario de tríos incluye una pregunta de franja horaria (ej. 8h–12h / 12h–20h).

Esta pregunta está formulada de cara al emparejamiento de tríos. NO decirle a ninguna alumna que es para asignar el horario de las llamadas grupales — eso generaría expectativas que no podemos garantizar.

Si una alumna pregunta si puede elegir el horario de su grupo: "Los horarios se adaptarán en la medida de lo posible. Al ser grupos pequeños tenemos más flexibilidad, y los comunicaremos una vez cerrados."`,
    reads: {}
  },
  {
    id: 7, category: "contenido", date: "15/05/2026", priority: "media",
    title: "Documentos del programa — formato PDF, sin vídeos",
    body: `El Círculo NO tiene módulos grabados en vídeo. El contenido semanal son PDFs: cortos, prácticos y orientados a la acción.

Si una alumna pregunta dónde están los vídeos o módulos: "El Círculo funciona diferente: en lugar de módulos grabados, recibirás cada semana un documento PDF práctico diseñado para que tomes acción directamente."

No son PDFs largos ni teóricos. Son herramientas de acción.`,
    reads: {}
  },
  {
    id: 8, category: "tecnico", date: "15/05/2026", priority: "media",
    title: "Hotmart — acceso y calendario de llamadas",
    body: `El acceso al programa está en Hotmart. Cada alumna verá únicamente:
• Su espacio de grupo
• El calendario de llamadas de su grupo (con su guardiana)
• Las grabaciones de sus propias llamadas

El calendario de llamadas con guardiana se subirá a Hotmart aprox. el 6 de junio, junto con el correo de asignación de grupo.

Si una alumna pregunta cuándo empieza su grupo: "En breve recibirás un correo con todos los detalles de tu grupo, tu guardiana asignada y el calendario de llamadas."`,
    reads: {}
  },
];

const PRIORITY_CONFIG = {
  alta:  { label: "URGENTE",    dot: "#C0392B", borderColor: "rgba(192,57,43,0.25)",   bg: "#FDF5F5" },
  media: { label: "IMPORTANTE", dot: "#B8960C", borderColor: "rgba(184,150,12,0.3)",  bg: "#FDFAF0" },
  info:  { label: "INFO",       dot: "#888",    borderColor: "rgba(0,0,0,0.1)",         bg: "#F9F9F9" },
};

// ── Gold dot ornament for dark screen ──
const GoldDots = () => (
  <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"visible" }}>
    {[[60,80,3],[90,150,2],[35,230,4],[115,55,2],[28,310,3],[75,390,2],
      [1320,55,3],[1365,145,4],[1385,225,2],[1340,305,3],[1310,385,2],[1370,430,3]
    ].map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r} fill="#B8960C" opacity="0.55"/>)}
    {[[50,110,1.5],[105,175,1],[42,250,2],[108,28,1.5],[22,340,1],
      [1330,95,1.5],[1375,185,1],[1395,265,2],[1352,345,1.5],[1322,415,1]
    ].map(([x,y,r],i)=><circle key={"b"+i} cx={x} cy={y} r={r} fill="#B8960C" opacity="0.3"/>)}
  </svg>
);

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#F5F0E8;}
  ::-webkit-scrollbar-thumb{background:#B8960C;border-radius:2px;}

  /* ── LOGIN (dark) ── */
  .login-btn{
    background:transparent;
    border:1px solid rgba(184,150,12,0.5);
    color:#B8960C;
    padding:12px 32px;
    font-family:'Montserrat',sans-serif;
    font-size:11px;letter-spacing:2.5px;text-transform:uppercase;
    cursor:pointer;transition:all 0.3s;min-width:130px;
  }
  .login-btn:hover{background:#B8960C;color:#0A0A0A;}

  /* ── INTERIOR (light) ── */
  .app-bg{background:#FAF7F2;min-height:100vh;}

  .header-light{
    background:#FAF7F2;
    border-bottom:1px solid rgba(184,150,12,0.25);
    position:sticky;top:0;z-index:100;
    padding:0 40px;height:66px;
    display:flex;align-items:center;justify-content:space-between;
  }

  .tab-light{
    background:transparent;border:none;cursor:pointer;
    font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;
    padding-bottom:4px;transition:all 0.2s;display:flex;align-items:center;gap:8px;
  }
  .tab-light.active{color:#B8960C;border-bottom:1px solid #B8960C;}
  .tab-light:not(.active){color:rgba(30,20,10,0.35);border-bottom:1px solid transparent;}

  .filter-btn{
    padding:6px 16px;
    font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;
    cursor:pointer;border:1px solid rgba(184,150,12,0.35);
    background:transparent;color:rgba(30,20,10,0.45);transition:all 0.2s;
  }
  .filter-btn.active{background:#B8960C;color:#fff;border-color:#B8960C;font-weight:600;}
  .filter-btn:hover:not(.active){border-color:#B8960C;color:#B8960C;}

  .add-btn{
    width:100%;padding:13px;
    border:1px dashed rgba(184,150,12,0.35);background:transparent;
    color:rgba(184,150,12,0.55);font-size:11px;cursor:pointer;
    font-family:'Montserrat',sans-serif;letter-spacing:2px;text-transform:uppercase;
    transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:10px;
  }
  .add-btn:hover{border-color:#B8960C;color:#B8960C;}

  .gold-solid-btn{
    background:#B8960C;border:none;color:#fff;
    padding:10px 24px;font-family:'Montserrat',sans-serif;
    font-size:10px;letter-spacing:2px;text-transform:uppercase;
    cursor:pointer;transition:all 0.2s;
  }
  .gold-solid-btn:hover{background:#9A7A08;}

  .cancel-btn{
    background:transparent;border:1px solid rgba(30,20,10,0.2);color:rgba(30,20,10,0.45);
    padding:10px 24px;font-family:'Montserrat',sans-serif;
    font-size:10px;letter-spacing:2px;cursor:pointer;transition:all 0.2s;
  }
  .cancel-btn:hover{border-color:rgba(30,20,10,0.4);color:rgba(30,20,10,0.7);}

  .ci-input{
    width:100%;padding:10px 14px;
    background:#fff;border:1px solid rgba(184,150,12,0.3);
    color:#1E1408;font-family:'Montserrat',sans-serif;font-size:13px;
    outline:none;transition:border 0.2s;
  }
  .ci-input:focus{border-color:#B8960C;}
  .ci-input::placeholder{color:rgba(30,20,8,0.3);}
  select.ci-input option{background:#fff;color:#1E1408;}

  .notice-card{
    background:#fff;
    border:1px solid rgba(184,150,12,0.2);
    transition:all 0.3s;margin-bottom:10px;
  }
  .notice-card:hover{border-color:rgba(184,150,12,0.45);box-shadow:0 2px 16px rgba(184,150,12,0.08);}
  .notice-card.read{opacity:0.55;border-color:rgba(0,0,0,0.08);}

  .resource-card{
    background:#fff;border:1px solid rgba(184,150,12,0.18);
    transition:all 0.25s;
  }
  .resource-card:hover{border-color:rgba(184,150,12,0.45);box-shadow:0 2px 14px rgba(184,150,12,0.08);}

  .read-chip{
    display:flex;align-items:center;gap:5px;padding:4px 12px;
    font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:1px;
    border:1px solid;transition:all 0.2s;
  }
  .delete-res-btn{
    background:transparent;border:1px solid rgba(0,0,0,0.12);
    color:rgba(0,0,0,0.3);padding:10px 12px;cursor:pointer;font-size:12px;transition:all 0.2s;
  }
  .delete-res-btn:hover{border-color:#C0392B;color:#C0392B;}
`;

export default function Playbook() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab]                 = useState("avisos");
  const [notices, setNotices]         = useState(INITIAL_NOTICES);
  const [resources, setResources]     = useState([]);
  const [filter, setFilter]           = useState("all");
  const [resFilter, setResFilter]     = useState("all");
  const [expanded, setExpanded]       = useState({});
  const [loaded, setLoaded]           = useState(false);
  const [showAddNotice, setShowAddNotice]     = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);
  const [newNotice, setNewNotice]     = useState({ category:"soporte", priority:"media", title:"", body:"" });
  const [newRes, setNewRes]           = useState({ category:"documentos", title:"", url:"", description:"" });

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    try {
      const sn = localStorage.getItem("playbook-notices");
      if (sn) setNotices(JSON.parse(sn));
      const sr = localStorage.getItem("playbook-resources");
      if (sr) setResources(JSON.parse(sr));
    } catch {}
    setLoaded(true);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("playbook-notices", JSON.stringify(notices));
      localStorage.setItem("playbook-resources", JSON.stringify(resources));
    } catch {}
  }, [notices, resources, loaded]);

  const markRead = id => setNotices(prev => prev.map(n =>
    n.id === id ? { ...n, reads: { ...n.reads, [currentUser]: new Date().toLocaleDateString("es-ES") } } : n
  ));

  const addNotice = () => {
    if (!newNotice.title.trim() || !newNotice.body.trim()) return;
    setNotices(prev => [{ id: Date.now(), ...newNotice, date: new Date().toLocaleDateString("es-ES"), reads:{} }, ...prev]);
    setNewNotice({ category:"soporte", priority:"media", title:"", body:"" });
    setShowAddNotice(false);
  };

  const addResource = () => {
    if (!newRes.title.trim() || !newRes.url.trim()) return;
    let url = newRes.url.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    setResources(prev => [{ id: Date.now(), ...newRes, url, date: new Date().toLocaleDateString("es-ES"), addedBy: currentUser }, ...prev]);
    setNewRes({ category:"documentos", title:"", url:"", description:"" });
    setShowAddResource(false);
  };

  const delResource = id => setResources(prev => prev.filter(r => r.id !== id));

  const getCat    = id => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
  const getResCat = id => RESOURCE_CATEGORIES.find(c => c.id === id) || RESOURCE_CATEGORIES[4];
  const filteredNotices   = filter    === "all" ? notices   : notices.filter(n => n.category === filter);
  const filteredResources = resFilter === "all" ? resources : resources.filter(r => r.category === resFilter);
  const unread = notices.filter(n => !n.reads[currentUser]).length;

  // ════════════════════════════════
  // LOGIN — DARK
  // ════════════════════════════════
  if (!currentUser) {
    return (
      <div style={{ minHeight:"100vh", background:"#0A0A0A", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <GoldDots />
        {/* Concentric circles */}
        {[700, 500, 320].map(s => (
          <div key={s} style={{ position:"absolute", width:s, height:s, borderRadius:"50%", border:`1px solid rgba(184,150,12,${s===320?0.1:0.05})`, top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
        ))}

        <div style={{ textAlign:"center", color:"#fff", position:"relative", zIndex:2, padding:"0 24px" }}>

          {/* Brand mark */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:11, letterSpacing:7, color:"rgba(184,150,12,0.7)", fontWeight:300, textTransform:"uppercase" }}>
              Maïté Issa
            </div>
          </div>

          {/* Gold line */}
          <div style={{ width:48, height:1, background:"linear-gradient(90deg,transparent,#B8960C,transparent)", margin:"0 auto 18px" }} />

          {/* Main title */}
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:13, letterSpacing:5, color:"rgba(255,255,255,0.4)", fontWeight:300, textTransform:"uppercase", marginBottom:8 }}>
            Mentoría Personalizada
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:52, fontWeight:300, letterSpacing:3, color:"#fff", lineHeight:1.05, marginBottom:6 }}>
            El Círculo
          </div>

          {/* Gold line */}
          <div style={{ width:48, height:1, background:"linear-gradient(90deg,transparent,#B8960C,transparent)", margin:"0 auto 14px" }} />

          <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, letterSpacing:4, color:"rgba(184,150,12,0.55)", textTransform:"uppercase", marginBottom:52 }}>
            Playbook · Lanzamiento 2026
          </div>

          {/* Vertical line */}
          <div style={{ width:1, height:36, background:"linear-gradient(180deg,#B8960C,transparent)", margin:"0 auto 28px" }} />

          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:15, color:"rgba(255,255,255,0.4)", fontStyle:"italic", marginBottom:24, letterSpacing:0.5 }}>
            ¿Quién eres?
          </div>

          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            {TEAM.map(name => (
              <button key={name} onClick={() => setCurrentUser(name)} className="login-btn">
                {name}
              </button>
            ))}
          </div>

          <div style={{ marginTop:48, fontFamily:"'Montserrat', sans-serif", fontSize:9, color:"rgba(255,255,255,0.15)", letterSpacing:3, textTransform:"uppercase" }}>
            Acceso restringido · Equipo de soporte
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════
  // INTERIOR — LIGHT (beige/cream)
  // ════════════════════════════════
  return (
    <div className="app-bg">

      {/* HEADER */}
      <div className="header-light">
        {/* Logo left */}
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:1, height:32, background:"#B8960C" }} />
          <div>
            <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, letterSpacing:4, color:"#B8960C", textTransform:"uppercase" }}>
              Mentoría Personalizada
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, color:"#1E1408", fontWeight:400, letterSpacing:1, lineHeight:1.1 }}>
              El Círculo
            </div>
          </div>
        </div>

        {/* Right: tabs + user */}
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          {[
            { id:"avisos",   label:"Avisos",   badge: unread > 0 ? unread : null, badgeColor:"#C0392B" },
            { id:"recursos", label:"Recursos", badge: resources.length > 0 ? resources.length : null, badgeColor:"#B8960C" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`tab-light${tab===t.id?" active":""}`}>
              {t.label}
              {t.badge && (
                <span style={{ background:t.badgeColor, color:"#fff", borderRadius:10, padding:"1px 7px", fontSize:9, fontWeight:700 }}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}

          <div style={{ width:1, height:22, background:"rgba(184,150,12,0.3)" }} />

          {/* User chip */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:26, height:26, border:"1px solid #B8960C", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond', serif", fontSize:13, color:"#B8960C" }}>
              {currentUser[0]}
            </div>
            <span style={{ fontFamily:"'Montserrat', sans-serif", fontSize:10, color:"rgba(30,20,8,0.55)", letterSpacing:1 }}>{currentUser}</span>
            <button onClick={() => setCurrentUser(null)} style={{ background:"transparent", border:"none", color:"rgba(30,20,8,0.3)", fontSize:10, cursor:"pointer", fontFamily:"'Montserrat', sans-serif", letterSpacing:1 }}>
              salir
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth:880, margin:"0 auto", padding:"40px 24px" }}>

        {/* ══ AVISOS ══ */}
        {tab === "avisos" && (
          <>
            {/* Page header */}
            <div style={{ borderLeft:"2px solid #B8960C", paddingLeft:22, marginBottom:36 }}>
              <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, letterSpacing:4, color:"#B8960C", textTransform:"uppercase", marginBottom:6 }}>
                Bienvenida, {currentUser}
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:30, color:"#1E1408", fontWeight:400, lineHeight:1.2 }}>
                {unread === 0
                  ? "Estás al día con todo ✓"
                  : `${unread} aviso${unread>1?"s":""} pendiente${unread>1?"s":""} de leer`}
              </div>
              <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:11, color:"rgba(30,20,8,0.4)", marginTop:6 }}>
                Marca cada aviso como leído una vez que lo hayas procesado
              </div>
            </div>

            {/* Filters */}
            <div style={{ display:"flex", gap:8, marginBottom:22, flexWrap:"wrap" }}>
              <button className={`filter-btn${filter==="all"?" active":""}`} onClick={() => setFilter("all")}>
                Todos · {notices.length}
              </button>
              {CATEGORIES.map(cat => {
                const count = notices.filter(n => n.category === cat.id).length;
                if (!count) return null;
                return (
                  <button key={cat.id} className={`filter-btn${filter===cat.id?" active":""}`} onClick={() => setFilter(cat.id)}>
                    {cat.label} · {count}
                  </button>
                );
              })}
            </div>

            {/* Add notice */}
            <button className="add-btn" onClick={() => setShowAddNotice(!showAddNotice)} style={{ marginBottom:22 }}>
              ✦ Nuevo aviso
            </button>

            {showAddNotice && (
              <div style={{ background:"#fff", border:"1px solid rgba(184,150,12,0.25)", padding:28, marginBottom:22, boxShadow:"0 4px 24px rgba(184,150,12,0.07)" }}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, color:"#B8960C", marginBottom:20, letterSpacing:0.5 }}>Nuevo aviso</div>
                <div style={{ display:"flex", gap:12, marginBottom:14 }}>
                  <select value={newNotice.category} onChange={e => setNewNotice(p=>({...p,category:e.target.value}))} className="ci-input" style={{ flex:1 }}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                  <select value={newNotice.priority} onChange={e => setNewNotice(p=>({...p,priority:e.target.value}))} className="ci-input" style={{ flex:1 }}>
                    <option value="alta">● Urgente</option>
                    <option value="media">● Importante</option>
                    <option value="info">● Info</option>
                  </select>
                </div>
                <input placeholder="Título del aviso" value={newNotice.title} onChange={e => setNewNotice(p=>({...p,title:e.target.value}))} className="ci-input" style={{ marginBottom:14 }} />
                <textarea placeholder="Contenido del aviso..." value={newNotice.body} onChange={e => setNewNotice(p=>({...p,body:e.target.value}))} rows={5} className="ci-input" style={{ resize:"vertical", marginBottom:20, lineHeight:1.7 }} />
                <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                  <button onClick={() => setShowAddNotice(false)} className="cancel-btn">Cancelar</button>
                  <button onClick={addNotice} className="gold-solid-btn">Publicar</button>
                </div>
              </div>
            )}

            {filteredNotices.length === 0 && (
              <div style={{ textAlign:"center", padding:"60px 0", color:"rgba(30,20,8,0.25)", fontFamily:"'Cormorant Garamond', serif", fontSize:18, fontStyle:"italic" }}>
                No hay avisos en esta categoría
              </div>
            )}

            {filteredNotices.map(notice => {
              const pCfg    = PRIORITY_CONFIG[notice.priority] || PRIORITY_CONFIG.info;
              const cat     = getCat(notice.category);
              const isRead  = !!notice.reads[currentUser];
              const isOpen  = expanded[notice.id];

              return (
                <div key={notice.id} className={`notice-card${isRead?" read":""}`} style={{ borderLeftWidth:3, borderLeftColor: isRead ? "rgba(0,0,0,0.08)" : pCfg.dot, borderLeftStyle:"solid", background: isRead ? "#fff" : pCfg.bg }}>

                  {/* Row */}
                  <div onClick={() => setExpanded(p=>({...p,[notice.id]:!p[notice.id]}))}
                    style={{ padding:"16px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:7, height:7, borderRadius:"50%", flexShrink:0, background: isRead ? "rgba(0,0,0,0.15)" : pCfg.dot }} />
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, letterSpacing:2, color: isRead ? "rgba(30,20,8,0.3)" : pCfg.dot, textTransform:"uppercase", fontWeight:600 }}>
                          {pCfg.label}
                        </span>
                        <span style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, letterSpacing:1.5, color:"rgba(184,150,12,0.6)", textTransform:"uppercase" }}>
                          {cat.label}
                        </span>
                        <span style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, color:"rgba(30,20,8,0.3)", letterSpacing:0.5 }}>
                          {notice.date}
                        </span>
                      </div>
                      <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:19, color: isRead ? "rgba(30,20,8,0.4)" : "#1E1408", fontWeight:400, lineHeight:1.25 }}>
                        {notice.title}
                      </div>
                    </div>
                    <div style={{ color:"#B8960C", fontSize:11, opacity:0.7, flexShrink:0 }}>
                      {isOpen ? "▲" : "▼"}
                    </div>
                  </div>

                  {/* Body */}
                  {isOpen && (
                    <div style={{ padding:"0 20px 20px" }}>
                      <div style={{ borderTop:"1px solid rgba(184,150,12,0.15)", paddingTop:16, marginBottom:16 }}>
                        <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:12.5, lineHeight:1.9, color:"rgba(30,20,8,0.7)", whiteSpace:"pre-line" }}>
                          {notice.body}
                        </div>
                      </div>
                      {/* Read chips + action */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                        <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                          {TEAM.map(name => {
                            const readDate = notice.reads[name];
                            return (
                              <div key={name} className="read-chip" style={{ borderColor: readDate ? "rgba(184,150,12,0.5)" : "rgba(0,0,0,0.1)", color: readDate ? "#B8960C" : "rgba(30,20,8,0.3)", background: readDate ? "rgba(184,150,12,0.06)" : "transparent" }}>
                                <span>{readDate ? "✓" : "○"}</span>
                                <span>{name}</span>
                                {readDate && <span style={{ fontSize:9, opacity:0.7 }}>· {readDate}</span>}
                              </div>
                            );
                          })}
                        </div>
                        {!isRead
                          ? <button onClick={() => markRead(notice.id)} className="gold-solid-btn" style={{ fontSize:10 }}>✓ Marcar como leído</button>
                          : <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:10, color:"#B8960C", letterSpacing:1 }}>✓ Leído el {notice.reads[currentUser]}</div>
                        }
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ══ RECURSOS ══ */}
        {tab === "recursos" && (
          <>
            <div style={{ borderLeft:"2px solid #B8960C", paddingLeft:22, marginBottom:36 }}>
              <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, letterSpacing:4, color:"#B8960C", textTransform:"uppercase", marginBottom:6 }}>
                Biblioteca
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:30, color:"#1E1408", fontWeight:400 }}>
                Recursos y enlaces
              </div>
              <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:11, color:"rgba(30,20,8,0.4)", marginTop:6 }}>
                Cualquier miembro del equipo puede añadir y gestionar recursos
              </div>
            </div>

            {/* Filters */}
            <div style={{ display:"flex", gap:8, marginBottom:22, flexWrap:"wrap" }}>
              <button className={`filter-btn${resFilter==="all"?" active":""}`} onClick={() => setResFilter("all")}>
                Todos · {resources.length}
              </button>
              {RESOURCE_CATEGORIES.map(cat => {
                const count = resources.filter(r => r.category === cat.id).length;
                if (!count) return null;
                return (
                  <button key={cat.id} className={`filter-btn${resFilter===cat.id?" active":""}`} onClick={() => setResFilter(cat.id)}>
                    {cat.label} · {count}
                  </button>
                );
              })}
            </div>

            <button className="add-btn" onClick={() => setShowAddResource(!showAddResource)} style={{ marginBottom:22 }}>
              ✦ Añadir recurso
            </button>

            {showAddResource && (
              <div style={{ background:"#fff", border:"1px solid rgba(184,150,12,0.25)", padding:28, marginBottom:22, boxShadow:"0 4px 24px rgba(184,150,12,0.07)" }}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, color:"#B8960C", marginBottom:20 }}>Nuevo recurso</div>
                <select value={newRes.category} onChange={e => setNewRes(p=>({...p,category:e.target.value}))} className="ci-input" style={{ marginBottom:14 }}>
                  {RESOURCE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                </select>
                <input placeholder="Nombre del recurso" value={newRes.title} onChange={e => setNewRes(p=>({...p,title:e.target.value}))} className="ci-input" style={{ marginBottom:14 }} />
                <input placeholder="URL (https://...)" value={newRes.url} onChange={e => setNewRes(p=>({...p,url:e.target.value}))} className="ci-input" style={{ marginBottom:14 }} />
                <input placeholder="Descripción breve (opcional)" value={newRes.description} onChange={e => setNewRes(p=>({...p,description:e.target.value}))} className="ci-input" style={{ marginBottom:20 }} />
                <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                  <button onClick={() => setShowAddResource(false)} className="cancel-btn">Cancelar</button>
                  <button onClick={addResource} className="gold-solid-btn">Guardar</button>
                </div>
              </div>
            )}

            {filteredResources.length === 0 && (
              <div style={{ textAlign:"center", padding:"70px 0", border:"1px dashed rgba(184,150,12,0.2)" }}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:28, color:"rgba(184,150,12,0.3)", marginBottom:10 }}>✦</div>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17, color:"rgba(30,20,8,0.3)", fontStyle:"italic" }}>La biblioteca está vacía</div>
                <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, color:"rgba(30,20,8,0.2)", marginTop:8, letterSpacing:2 }}>AÑADE EL PRIMER RECURSO</div>
              </div>
            )}

            <div style={{ display:"grid", gap:10 }}>
              {filteredResources.map(resource => {
                const cat = getResCat(resource.category);
                return (
                  <div key={resource.id} className="resource-card" style={{ padding:"18px 22px", display:"flex", alignItems:"center", gap:18 }}>
                    <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, color:"#B8960C", flexShrink:0, width:28, textAlign:"center" }}>
                      {cat.emoji}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:3, flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17, color:"#1E1408" }}>{resource.title}</span>
                        <span style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, color:"rgba(184,150,12,0.7)", letterSpacing:1.5, textTransform:"uppercase" }}>{cat.label}</span>
                      </div>
                      {resource.description && (
                        <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:11, color:"rgba(30,20,8,0.45)", marginBottom:3 }}>{resource.description}</div>
                      )}
                      <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:9, color:"rgba(30,20,8,0.25)", letterSpacing:0.5 }}>
                        {resource.addedBy} · {resource.date}
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="gold-solid-btn" style={{ fontSize:10, textDecoration:"none", display:"inline-block" }}>
                        Abrir ↗
                      </a>
                      {resource.addedBy === currentUser && (
                        <button onClick={() => delResource(resource.id)} className="delete-res-btn">✕</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{ textAlign:"center", padding:"48px 0 16px" }}>
          <div style={{ width:40, height:1, background:"linear-gradient(90deg,transparent,#B8960C,transparent)", margin:"0 auto 14px" }} />
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:13, color:"rgba(184,150,12,0.45)", letterSpacing:3, fontStyle:"italic" }}>
            maïté issa.
          </div>
        </div>
      </div>
    </div>
  );
}
