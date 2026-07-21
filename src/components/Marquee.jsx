// Cinta infinita con los servicios — decorativa, estilo cartel de gira
export default function Marquee({ t }) {
  const names = t.services.items.map((s) => s.name)
  // Contenido duplicado para que el loop sea continuo (el track se desplaza -50%)
  const row = [...names, ...names]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((name, i) => (
          <span className="marquee-item" key={i}>
            {name}
            <em>◆</em>
          </span>
        ))}
      </div>
    </div>
  )
}
