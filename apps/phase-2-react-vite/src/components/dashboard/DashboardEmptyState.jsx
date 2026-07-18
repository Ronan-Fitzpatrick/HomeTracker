function DashboardEmptyState({ message }) {
  return (
    <div className="dashboard-empty-state">
      <svg
        className="dashboard-empty-state__illustration"
        viewBox="0 0 96 96"
        aria-hidden="true"
      >
        <circle cx="48" cy="48" r="34" />
        <path d="m32 49 10 10 22-24" />
      </svg>
      <div>
        <strong>All clear</strong>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default DashboardEmptyState
