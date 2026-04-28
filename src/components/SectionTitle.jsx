export function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-title align-${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}
