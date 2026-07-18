# HomeTracker

HomeTracker is a learning-first frontend project built around the practical
work of running a home. The product provides realistic problems to solve while
each phase isolates a different part of the frontend stack.

The current application tracks household tasks and shopping items, persists
them in the browser, and derives a small Today dashboard from the same state.

## Current Status

- Phase 1 is complete: a task tracker built with HTML, CSS, and JavaScript.
- Phase 2 is complete: the tracker rebuilt and extended with React and Vite.
- Phase 3 is planned: migrate the React prototype to strict TypeScript and
  develop the wider domain model.

See the [phase tracker](docs/phases/README.md) for the detailed scope and status
of every phase.

## Current Features

### Tasks

- Add, complete, reopen, and delete household tasks
- Assign categories and optional due dates
- Search and filter by category and completion status
- Group tasks into Overdue, Today, Upcoming, and Completed
- Persist and validate task data through a reusable local-storage hook

### Shopping

- Add, buy, reopen, and delete shopping items
- Track quantity and an optional store
- Organize items by category and grocery department
- Keep bought items until they are deliberately cleared
- Persist and validate shopping data locally

### Today Dashboard

- Show overdue and due-today task counts
- Show remaining shopping items
- Preview up to five relevant items per summary
- Link each summary to its source workspace
- Apply accessible empty states and semantic status colors

All data currently stays in the user's browser. Accounts, APIs, databases, and
cross-device synchronization belong to later milestones.

## Learning Progression

| Phase | Stack | What It Proves |
| --- | --- | --- |
| [Phase 1](docs/phases/phase-1-browser-basics.md) | HTML, CSS, JavaScript | Browser events, DOM rendering, forms, storage, and accessibility without a framework |
| [Phase 2](docs/phases/phase-2-react-vite.md) | React, JavaScript, Vite | Components, props, state ownership, controlled forms, effects, custom hooks, and derived views |
| [Phase 3](docs/phases/phase-3-typescript-domain.md) | React, TypeScript, Vite | Strict types, narrowing, generics, discriminated unions, and runtime boundaries |
| Phase 4 | Next.js and TypeScript | Routing, server/client boundaries, SSR, data fetching, and caching |

Later milestones introduce a shared accessible UI system, real persistence,
testing, CI, and production delivery.

## Run The React Prototype

The active completed application is in `apps/phase-2-react-vite`.

```sh
cd apps/phase-2-react-vite
pnpm install
pnpm dev
```

Vite prints the local development URL after starting the server.

Useful checks:

```sh
pnpm lint
pnpm build
```

## Repository Layout

```text
HomeTracker/
|-- apps/
|   |-- phase-1-browser-basics/   # Browser-native reference app
|   `-- phase-2-react-vite/       # Completed React prototype
|-- docs/
|   |-- phases/                   # Phase scopes and learning retrospectives
|   |-- learning-plan.md          # Topic-by-topic learning roadmap
|   `-- project-plan.md           # Product vision and milestones
`-- README.md
```

Each learning phase stays separate so earlier implementations remain runnable
and comparable rather than being overwritten by the next tool or framework.

## Working Principles

- Understand each piece before adding the next abstraction.
- Keep product behavior familiar when the learning variable changes.
- Prefer derived values over duplicated state.
- Keep runtime validation at external data boundaries, even when TypeScript is
  introduced.
- Use semantic HTML and keyboard-accessible interactions from the start.
- Record the reasoning and trade-offs discovered in each phase.

## Documentation

- [Docs overview](docs/README.md)
- [Project plan](docs/project-plan.md)
- [Learning plan](docs/learning-plan.md)
- [Phase tracker](docs/phases/README.md)
- [Phase 2 learning retrospective](docs/phases/phase-2-react-vite.md#learning-notes)
- [Phase 3 plan](docs/phases/phase-3-typescript-domain.md)
