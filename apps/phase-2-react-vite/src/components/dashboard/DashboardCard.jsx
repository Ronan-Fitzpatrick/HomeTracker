import DashboardEmptyState from './DashboardEmptyState.jsx'

function DashboardCard({
  count,
  description,
  emptyMessage,
  href,
  items,
  label,
  tone,
}) {
  return (
    <article className={`dashboard-card dashboard-card--${tone}`}>
      <header className="dashboard-card__header">
        <span className="dashboard-card__count" aria-hidden="true">
          {count}
        </span>
        <div>
          <h2>{label}</h2>
          <p>{description}</p>
        </div>
      </header>

      {items.length > 0 ? (
        <ul className="dashboard-card__list">
          {items.map((item) => (
            <li key={item.id}>
              <span className="dashboard-card__item-name">{item.name}</span>
              <span className="dashboard-card__item-meta">{item.meta}</span>
            </li>
          ))}
        </ul>
      ) : (
        <DashboardEmptyState message={emptyMessage} />
      )}

      <a className="dashboard-card__link" href={href}>
        View all <span aria-hidden="true">→</span>
      </a>
    </article>
  )
}

export default DashboardCard
