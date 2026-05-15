import { useState, useEffect } from "react";

const TEAM = ["Estefany", "Fran", "Gabi", "Mel", "Maca"];

const CATEGORIES = [
  { id: "soporte", label: "Soporte & Comunicación", emoji: "💬", color: "#1A3C5E" },
  { id: "grupos", label: "Grupos & Guardianas", emoji: "👥", color: "#6B3FA0" },
  { id: "discord", label: "Discord", emoji: "🟣", color: "#5865F2" },
  { id: "formularios", label: "Formularios", emoji: "📋", color: "#1A6B3C" },
  { id: "contenido", label: "Contenido & Documentos", emoji: "📄", color: "#B7560A" },
  { id: "tecnico", label: "Técnico & Hotmart", emoji: "⚙️", color: "#C0392B" },
];

const INITIAL_NOTICES = [
  {
    id: 1,
    category: "soporte",
    date: "15/05/2026",
    priority: "alta",
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
    id: 2,
    category: "grupos",
    date: "15/05/2026",
    priority: "alta",
    title: "Acceso a grabaciones — RESTRINGIDO por grupo",
    body: `Las alumnas SOLO tienen acceso a las grabaciones de su propio grupo en Hotmart.

NO tienen acceso a grabaciones de otros grupos. Si una alumna pregunta si puede ver la llamada de otro grupo: respuesta es NO, y no hace falta dar más explicación que "cada alumna accede únicamente a las grabaciones de su grupo."`,
    reads: {}
  },
  {
    id: 3,
    category: "grupos",
    date: "15/05/2026",
    priority: "media",
    title: "Estructura de grupos — \"Casas\" estilo Harry Potter",
    body: `Los grupos están organizados como casas:
• Cada guardiana tiene su "casa" (aprox. 50 alumnas)
• Dentro de cada casa hay tríos (~16–17 tríos por grupo)
• Los tríos se forman dentro del mismo grupo (no transversal)

Los grupos se asignarán en función del país/zona horaria, no de forma aleatoria. La asignación formal se comunicará aprox. el sábado 6 de junio.`,
    reads: {}
  },
  {
    id: 4,
    category: "discord",
    date: "15/05/2026",
    priority: "alta",
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
    id: 5,
    category: "discord",
    date: "15/05/2026",
    priority: "media",
    title: "Canales de encuentros presenciales por ciudad",
    body: `Se crearán canales de Discord por ciudad/país para que las alumnas organicen sus encuentros presenciales.

Las alumnas entran al canal de su ciudad y organizan allí las quedadas de forma autónoma. Nosotras NO organizamos los eventos, solo facilitamos el espacio.

Cuándo se crean: una vez cerrado el formulario de tríos (antes del 3 de junio). Los nombres de las ciudades/países se decidirán según los datos del formulario.`,
    reads: {}
  },
  {
    id: 6,
    category: "formularios",
    date: "15/05/2026",
    priority: "alta",
    title: "Formulario de tríos — pregunta de franja horaria",
    body: `El formulario de tríos incluye una pregunta de franja horaria (ej. 8h–12h / 12h–20h).

Esta pregunta está formulada de cara al emparejamiento de tríos. NO decirle a ninguna alumna que es para asignar el horario de las llamadas grupales — eso generaría expectativas que no podemos garantizar.

Si una alumna pregunta si puede elegir el horario de su grupo: "Los horarios se adaptarán en la medida de lo posible. Al ser grupos pequeños tenemos más flexibilidad, y los comunicaremos una vez cerrados."`,
    reads: {}
  },
  {
    id: 7,
    category: "contenido",
    date: "15/05/2026",
    priority: "media",
    title: "Documentos del programa — formato PDF, sin vídeos",
    body: `El Círculo NO tiene módulos grabados en vídeo. El contenido semanal son PDFs: cortos, prácticos y orientados a la acción.

Si una alumna pregunta dónde están los vídeos o módulos: "El Círculo funciona diferente: en lugar de módulos grabados, recibirás cada semana un documento PDF práctico diseñado para que tomes acción directamente."

No son PDFs largos ni teóricos. Son herramientas de acción.`,
    reads: {}
  },
  {
    id: 8,
    category: "tecnico",
    date: "15/05/2026",
    priority: "media",
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

const PRIORITY_STYLES = {
  alta: { bg: "#FEF2F2", border: "#FCA5A5", badge: "#C0392B", label: "PRIORITARIO" },
  media: { bg: "#FFFBEB", border: "#FCD34D", badge: "#B7560A", label: "IMPORTANTE" },
  info: { bg: "#F0F9FF", border: "#BAE6FD", badge: "#1A3C5E", label: "INFO" },
};

export default function Playbook() {
  const [currentUser, setCurrentUser] = useState(null);
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNotice, setNewNotice] = useState({ category: "soporte", priority: "media", title: "", body: "" });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("playbook-notices");
      if (saved) setNotices(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("playbook-notices", JSON.stringify(notices));
    } catch {}
  }, [notices, loaded]);

  const markRead = (noticeId) => {
    setNotices(prev => prev.map(n =>
      n.id === noticeId
        ? { ...n, reads: { ...n.reads, [currentUser]: new Date().toLocaleDateString("es-ES") } }
        : n
    ));
  };

  const addNotice = () => {
    if (!newNotice.title.trim() || !newNotice.body.trim()) return;
    const notice = {
      id: Date.now(),
      ...newNotice,
      date: new Date().toLocaleDateString("es-ES"),
      reads: {}
    };
    setNotices(prev => [notice, ...prev]);
    setNewNotice({ category: "soporte", priority: "media", title: "", body: "" });
    setShowAddForm(false);
  };

  const filteredNotices = filter === "all"
    ? notices
    : notices.filter(n => n.category === filter);

  const getCategoryInfo = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];

  const readCount = (notice) => Object.keys(notice.reads).length;

  if (!currentUser) {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #0F1F35 0%, #1A3C5E 60%, #0F1F35 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif"
      }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: 14, letterSpacing: 6, color: "#7EB8E8", marginBottom: 12, textTransform: "uppercase" }}>
            Equipo de Soporte
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 6, letterSpacing: -1 }}>
            Playbook
          </h1>
          <div style={{ fontSize: 18, color: "#93C5E8", marginBottom: 48, fontStyle: "italic" }}>
            El Círculo — Lanzamiento 2026
          </div>
          <div style={{ fontSize: 13, color: "#7EB8E8", marginBottom: 20, letterSpacing: 2, textTransform: "uppercase" }}>
            ¿Quién eres?
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {TEAM.map(name => (
              <button key={name} onClick={() => setCurrentUser(name)} style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
                color: "white", padding: "14px 32px", borderRadius: 8, fontSize: 16,
                cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
                transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "#7EB8E8"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              >
                {name}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 32, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            Acceso solo para el equipo de soporte
          </div>
        </div>
      </div>
    );
  }

  const unread = notices.filter(n => !n.reads[currentUser]).length;

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB", fontFamily: "'Georgia', serif" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #0F1F35 0%, #1A3C5E 100%)",
        padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 17, letterSpacing: -0.3 }}>
              Playbook · El Círculo
            </div>
            <div style={{ color: "#7EB8E8", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
              Lanzamiento 2026
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {unread > 0 && (
            <div style={{
              background: "#C0392B", color: "white", borderRadius: 20,
              padding: "4px 12px", fontSize: 12, fontFamily: "sans-serif", fontWeight: 600
            }}>
              {unread} sin leer
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#7EB8E8",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "#0F1F35"
            }}>
              {currentUser[0]}
            </div>
            <span style={{ color: "white", fontSize: 14 }}>{currentUser}</span>
            <button onClick={() => setCurrentUser(null)} style={{
              background: "rgba(255,255,255,0.1)", border: "none", color: "#93C5E8",
              fontSize: 11, cursor: "pointer", padding: "4px 8px", borderRadius: 4,
              fontFamily: "sans-serif", marginLeft: 4
            }}>
              salir
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>

        {/* BIENVENIDA */}
        <div style={{
          background: "white", borderRadius: 12, padding: "24px 28px",
          marginBottom: 24, border: "1px solid #E2E8F0",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
        }}>
          <div style={{ fontSize: 13, color: "#7EB8E8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, fontFamily: "sans-serif" }}>
            Hola, {currentUser} 👋
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0F1F35", marginBottom: 8 }}>
            {unread === 0
              ? "Estás al día con todo ✓"
              : `Tienes ${unread} aviso${unread > 1 ? "s" : ""} pendiente${unread > 1 ? "s" : ""} de leer`}
          </div>
          <div style={{ fontSize: 14, color: "#64748B", fontFamily: "sans-serif", fontStyle: "italic" }}>
            Marca cada aviso como leído una vez que lo hayas procesado.
          </div>
        </div>

        {/* FILTROS */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "7px 16px", borderRadius: 20, fontSize: 13, fontFamily: "sans-serif",
              cursor: "pointer", border: filter === "all" ? "none" : "1px solid #CBD5E1",
              background: filter === "all" ? "#0F1F35" : "white",
              color: filter === "all" ? "white" : "#475569",
              fontWeight: filter === "all" ? 600 : 400,
            }}
          >
            Todos ({notices.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = notices.filter(n => n.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button key={cat.id} onClick={() => setFilter(cat.id)} style={{
                padding: "7px 16px", borderRadius: 20, fontSize: 13, fontFamily: "sans-serif",
                cursor: "pointer", border: filter === cat.id ? "none" : "1px solid #CBD5E1",
                background: filter === cat.id ? cat.color : "white",
                color: filter === cat.id ? "white" : "#475569",
                fontWeight: filter === cat.id ? 600 : 400,
              }}>
                {cat.emoji} {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* ADD NOTICE */}
        <button onClick={() => setShowAddForm(!showAddForm)} style={{
          width: "100%", padding: "12px", borderRadius: 10, border: "2px dashed #CBD5E1",
          background: "transparent", color: "#94A3B8", fontSize: 14, cursor: "pointer",
          fontFamily: "sans-serif", marginBottom: 20, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8, transition: "all 0.2s"
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "#1A3C5E"; e.currentTarget.style.color = "#1A3C5E"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.color = "#94A3B8"; }}
        >
          <span style={{ fontSize: 18 }}>+</span> Añadir nuevo aviso
        </button>

        {showAddForm && (
          <div style={{
            background: "white", borderRadius: 12, padding: "24px", marginBottom: 20,
            border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#0F1F35", marginBottom: 16 }}>
              Nuevo aviso
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <select value={newNotice.category} onChange={e => setNewNotice(p => ({ ...p, category: e.target.value }))}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #CBD5E1", fontSize: 13, fontFamily: "sans-serif", color: "#1e293b" }}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
              </select>
              <select value={newNotice.priority} onChange={e => setNewNotice(p => ({ ...p, priority: e.target.value }))}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #CBD5E1", fontSize: 13, fontFamily: "sans-serif", color: "#1e293b" }}>
                <option value="alta">🔴 Prioritario</option>
                <option value="media">🟡 Importante</option>
                <option value="info">🔵 Info</option>
              </select>
            </div>
            <input
              placeholder="Título del aviso..."
              value={newNotice.title}
              onChange={e => setNewNotice(p => ({ ...p, title: e.target.value }))}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #CBD5E1",
                fontSize: 14, fontFamily: "sans-serif", marginBottom: 12, boxSizing: "border-box", color: "#1e293b"
              }}
            />
            <textarea
              placeholder="Contenido del aviso..."
              value={newNotice.body}
              onChange={e => setNewNotice(p => ({ ...p, body: e.target.value }))}
              rows={5}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #CBD5E1",
                fontSize: 13, fontFamily: "sans-serif", resize: "vertical", marginBottom: 16,
                lineHeight: 1.6, boxSizing: "border-box", color: "#1e293b"
              }}
            />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setShowAddForm(false)} style={{
                padding: "9px 20px", borderRadius: 8, border: "1px solid #CBD5E1",
                background: "white", color: "#64748B", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif"
              }}>
                Cancelar
              </button>
              <button onClick={addNotice} style={{
                padding: "9px 20px", borderRadius: 8, border: "none",
                background: "#1A3C5E", color: "white", cursor: "pointer", fontSize: 13,
                fontFamily: "sans-serif", fontWeight: 600
              }}>
                Publicar aviso
              </button>
            </div>
          </div>
        )}

        {/* NOTICES */}
        {filteredNotices.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94A3B8", fontFamily: "sans-serif" }}>
            No hay avisos en esta categoría.
          </div>
        )}

        {filteredNotices.map(notice => {
          const pStyle = PRIORITY_STYLES[notice.priority] || PRIORITY_STYLES.info;
          const cat = getCategoryInfo(notice.category);
          const isRead = !!notice.reads[currentUser];
          const isExpanded = expanded[notice.id];
          const readNames = Object.keys(notice.reads);

          return (
            <div key={notice.id} style={{
              background: "white", borderRadius: 12, marginBottom: 16,
              border: `1px solid ${isRead ? "#E2E8F0" : pStyle.border}`,
              boxShadow: isRead ? "none" : "0 2px 12px rgba(0,0,0,0.07)",
              opacity: isRead ? 0.75 : 1,
              transition: "all 0.3s"
            }}>

              {/* NOTICE HEADER */}
              <div
                onClick={() => setExpanded(p => ({ ...p, [notice.id]: !p[notice.id] }))}
                style={{
                  padding: "18px 22px", cursor: "pointer",
                  display: "flex", alignItems: "flex-start", gap: 14
                }}
              >
                {/* Unread dot */}
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0, marginTop: 6,
                  background: isRead ? "#CBD5E1" : pStyle.badge
                }} />

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{
                      background: pStyle.bg, color: pStyle.badge, border: `1px solid ${pStyle.border}`,
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                      letterSpacing: 1, fontFamily: "sans-serif"
                    }}>
                      {pStyle.label}
                    </span>
                    <span style={{
                      background: cat.color + "18", color: cat.color,
                      fontSize: 11, padding: "2px 8px", borderRadius: 4, fontFamily: "sans-serif"
                    }}>
                      {cat.emoji} {cat.label}
                    </span>
                    <span style={{ color: "#94A3B8", fontSize: 12, fontFamily: "sans-serif" }}>
                      {notice.date}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0F1F35", lineHeight: 1.3 }}>
                    {notice.title}
                  </div>
                </div>

                <div style={{ color: "#94A3B8", fontSize: 20, flexShrink: 0, userSelect: "none" }}>
                  {isExpanded ? "▲" : "▼"}
                </div>
              </div>

              {/* NOTICE BODY */}
              {isExpanded && (
                <div style={{ padding: "0 22px 22px" }}>
                  <div style={{
                    background: "#F8F9FB", borderRadius: 8, padding: "16px 18px",
                    fontSize: 14, lineHeight: 1.8, color: "#334155",
                    fontFamily: "sans-serif", whiteSpace: "pre-line", marginBottom: 16,
                    borderLeft: `3px solid ${cat.color}`
                  }}>
                    {notice.body}
                  </div>

                  {/* READ STATUS */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {TEAM.map(name => {
                        const readDate = notice.reads[name];
                        return (
                          <div key={name} style={{
                            display: "flex", alignItems: "center", gap: 5, padding: "5px 12px",
                            borderRadius: 20, fontSize: 12, fontFamily: "sans-serif",
                            background: readDate ? "#F0FDF4" : "#F8F9FB",
                            border: `1px solid ${readDate ? "#86EFAC" : "#E2E8F0"}`,
                            color: readDate ? "#166534" : "#94A3B8"
                          }}>
                            {readDate ? "✓" : "○"} {name}
                            {readDate && <span style={{ fontSize: 10, color: "#4ADE80" }}>· {readDate}</span>}
                          </div>
                        );
                      })}
                    </div>

                    {!isRead && (
                      <button onClick={() => markRead(notice.id)} style={{
                        padding: "9px 20px", borderRadius: 8, border: "none",
                        background: "#1A3C5E", color: "white", cursor: "pointer",
                        fontSize: 13, fontFamily: "sans-serif", fontWeight: 600,
                        display: "flex", alignItems: "center", gap: 6
                      }}>
                        ✓ Marcar como leído
                      </button>
                    )}
                    {isRead && (
                      <div style={{
                        padding: "9px 16px", borderRadius: 8, background: "#F0FDF4",
                        border: "1px solid #86EFAC", color: "#166534",
                        fontSize: 13, fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6
                      }}>
                        ✓ Leído el {notice.reads[currentUser]}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* FOOTER */}
        <div style={{
          textAlign: "center", padding: "32px 0 16px",
          fontSize: 12, color: "#CBD5E1", fontFamily: "sans-serif", fontStyle: "italic"
        }}>
          Maïté Issa Brand · Playbook El Círculo · Lanzamiento 2026
        </div>
      </div>
    </div>
  );
}
