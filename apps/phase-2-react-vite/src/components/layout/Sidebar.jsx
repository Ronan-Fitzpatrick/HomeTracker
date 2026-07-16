import { WORKSPACE, WORKSPACE_OPTIONS } from '../../data/workspaceOptions.js'

function Sidebar({ activeWorkspace }) {
  return (
    <aside className="sidebar">
      <a className="brand" href={`#${WORKSPACE.TODAY}`}>
        HomeTracker
      </a>

      <nav aria-label="Primary">
        <ul>
          {WORKSPACE_OPTIONS.map((workspace) => (
            <li key={workspace.value}>
              <a
                href={`#${workspace.value}`}
                aria-current={
                  workspace.value === activeWorkspace ? 'page' : undefined
                }
              >
                {workspace.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
