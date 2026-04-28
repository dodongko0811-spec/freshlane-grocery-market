import { NavLink } from 'react-router-dom'

export function EmptyState({ title, text, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{text}</p>
      {actionLabel && actionTo ? (
        <NavLink to={actionTo} className="button button-primary">
          {actionLabel}
        </NavLink>
      ) : null}
    </div>
  )
}
