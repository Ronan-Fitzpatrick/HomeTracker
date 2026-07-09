# HomeTracker Project Plan

## Product Vision

HomeTracker is a household operations app for keeping track of the practical work of running a home: tasks, shopping, maintenance, documentation, and longer-term projects.

The first version should be useful for one household without needing a complex backend. Later versions can add persistence, accounts, file storage, sharing, reminders, and richer planning.

## Core Product Areas

### Dashboard

The dashboard should answer:

- What needs attention today?
- What is overdue?
- What is coming up soon?
- Which shopping items are still needed?
- Which long-running projects are active?

### Tasks And Maintenance

Track one-off and recurring home work.

Examples:

- Weekly cleaning tasks
- Monthly filter checks
- Yearly boiler service
- Seasonal garden work
- Repairs and admin chores

Initial capabilities:

- Create, edit, complete, and delete tasks
- Assign category, priority, due date, and recurrence
- Show overdue, today, upcoming, and completed views
- Support recurring intervals such as weekly, monthly, quarterly, and yearly

### Shopping Lists

Track household shopping needs.

Initial capabilities:

- Add, edit, check off, and remove items
- Group items by category or store section
- Preserve checked items until manually cleared
- Support quick-add behavior

### Projects

Track longer-running home initiatives.

Examples:

- Renovate spare room
- Replace flooring
- Plan garden redesign
- Organize tax documents

Initial capabilities:

- Create a project with goal, status, notes, and target date
- Add milestones or checklist items
- Track decisions and open questions

### Home Documentation

Store structured notes about the home.

Examples:

- Appliance model numbers
- Warranty dates
- Utility provider details
- Paint colors
- Contractor contacts
- Manuals and document links

Initial capabilities:

- Create documentation entries
- Add category, notes, important dates, and links
- Search or filter entries

## Suggested Tech Direction

The main application should eventually use:

- TypeScript
- React
- Next.js
- Tailwind CSS
- Base UI or another accessible primitive library
- Storybook for isolated component development and documentation
- CVA (class-variance-authority) for typed component variants
- pnpm
- GitHub Actions

The learning path should still include smaller plain browser and Vite exercises before the full Next.js app, so the framework does not hide the fundamentals.

## Milestones

### Milestone 0: Planning And Foundations

Goal: establish the repo, docs, and first technical decisions.

Deliverables:

- Project plan
- Learning plan
- Initial architecture notes
- Basic README
- Decision log once decisions start to matter

### Milestone 1: Browser Basics Lab

Goal: build small no-framework exercises to understand the browser directly.

Deliverables:

- Plain HTML, CSS, and JavaScript shopping list
- Plain JavaScript task checklist using localStorage
- Accessible modal, tabs, and menu experiments
- Notes on events, DOM updates, focus, and storage

### Milestone 2: React And Vite Prototype

Goal: rebuild the core home-tracker interactions in React without Next.js.

Deliverables:

- Vite React app
- Task list with filters
- Shopping list
- Basic dashboard
- Controlled forms
- Custom hooks for localStorage and filtering

### Milestone 3: TypeScript Domain Model

Goal: model the product properly with TypeScript.

Deliverables:

- Task, recurrence, shopping item, project, and document types
- Discriminated unions for recurrence and task state
- Runtime validation strategy
- Seed data typed against the model

### Milestone 4: Next.js Application

Goal: move from prototype to a routed app with server/client boundaries.

Deliverables:

- Next.js app structure
- Dashboard, tasks, shopping, projects, documents, and settings routes
- SSR dashboard summary
- Client-side interactive filters and forms
- Loading and error states

### Milestone 5: Accessible UI System

Goal: build a small, consistent component system.

Deliverables:

- Button, input, checkbox, select, dialog, tabs, menu, toast
- Tailwind design tokens
- Storybook stories for each shared component and its key states
- CVA variants with clear, constrained component APIs
- Keyboard and screen-reader checks
- Focus states and reduced-motion support

### Milestone 6: Persistence And API

Goal: introduce real data capabilities.

Deliverables:

- API layer
- Database choice and schema
- CRUD for tasks and shopping items
- Validation at API boundaries
- Optimistic update experiments

### Milestone 7: Pipeline And Production Readiness

Goal: make the project shippable and maintainable.

Deliverables:

- pnpm scripts
- Linting and formatting
- Typecheck
- Unit tests
- Playwright smoke tests
- GitHub Actions workflow
- Deployment target

## First Build Slice

The first usable slice should be intentionally small:

1. Create a local task list.
2. Add categories and due dates.
3. Add recurring task metadata.
4. Render dashboard counts.
5. Save locally.

This slice touches forms, rendering, state, data modeling, and UX without forcing backend decisions too early.
