const NAV_ITEMS = [
  { href: '#today', label: 'Today' },
  { href: '#tasks', label: 'Tasks', isCurrent: true },
  { href: '#shopping', label: 'Shopping' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#tasks">
        HomeTracker
      </a>

      <nav aria-label="Primary">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={item.isCurrent ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
