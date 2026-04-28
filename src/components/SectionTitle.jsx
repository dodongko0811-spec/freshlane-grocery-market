export function SectionTitle({ eyebrow, title, text, align = 'left', tone = 'neutral' }) {
  return (
    <div className={`section-title align-${align} section-title--${tone}`}>
      <span className="section-cue" aria-hidden="true" />
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}
