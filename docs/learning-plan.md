# HomeTracker Learning Plan

## Learning Objective

Use HomeTracker to rebuild frontend fundamentals from the browser upward, then layer on React, TypeScript, Next.js, architecture, accessibility, and delivery pipelines.

The goal is not just to know which tools to use. The goal is to understand what the tools are doing, what tradeoffs they introduce, and how to lead frontend decisions with confidence.

## Track 1: Browser Fundamentals

Topics:

- HTML document structure
- Semantic elements and forms
- CSS cascade, specificity, layout, flexbox, and grid
- DOM APIs
- Event bubbling, capture, and delegation
- Browser rendering: DOM, CSSOM, layout, paint, compositing
- Fetch, promises, async/await
- localStorage and sessionStorage
- Focus management and keyboard interaction

Project exercises:

- Build a plain JavaScript shopping list
- Build a plain JavaScript task checklist
- Build accessible tabs from scratch
- Build a modal dialog from scratch
- Add localStorage persistence

Questions to answer:

- What causes a page to re-render or repaint?
- What work happens between changing the DOM and seeing pixels?
- How do events travel through the DOM?
- What makes a form accessible?

## Track 2: JavaScript And TypeScript

Topics:

- JavaScript values, objects, arrays, and functions
- Closures and modules
- Async JavaScript
- Error handling
- TypeScript primitives, unions, generics, and narrowing
- Discriminated unions
- Runtime validation
- Modeling domain state

Project exercises:

- Model tasks, projects, shopping items, and home documents
- Write recurrence calculation utilities
- Create typed seed data
- Add validation for form input

Questions to answer:

- Which bugs can TypeScript prevent?
- Which bugs still require runtime validation?
- Where should domain types live?
- How should recurring task state be represented?

## Track 3: React Fundamentals

Topics:

- Components and props
- State and derived state
- Controlled and uncontrolled inputs
- Effects and effect cleanup
- Context
- Reducers
- Custom hooks
- Composition
- Rendering behavior
- Error boundaries
- Suspense basics

Project exercises:

- Build task and shopping list views in Vite
- Add filters and search
- Add a reducer-driven task flow
- Create `useLocalStorage`
- Create reusable form fields

Questions to answer:

- What causes a React component to render?
- When is state needed, and when can data be derived?
- Why can effects become a source of bugs?
- When is context useful, and when is it too broad?

## Track 4: Next.js And SSR

Topics:

- App Router
- Layouts and nested routes
- Server Components and Client Components
- SSR, static rendering, and dynamic rendering
- Data fetching and caching
- Loading and error states
- API routes or server actions
- Metadata

Project exercises:

- Create routes for dashboard, tasks, shopping, projects, and documents
- Render dashboard data server-side
- Keep filters and forms client-side
- Compare server fetching with client fetching
- Add route-level loading and error states

Questions to answer:

- What should run on the server?
- What must run in the browser?
- How does SSR affect performance and UX?
- Where can caching help or hurt?

## Track 5: Frontend Architecture

Topics:

- Feature-based folder structure
- Shared UI components
- Domain layer vs UI layer
- State ownership
- API boundaries
- Error handling patterns
- Loading and empty states
- Design tokens
- Storybook and component documentation
- CVA (class-variance-authority) and component variants
- Testing strategy

Project exercises:

- Organize code by feature
- Create a small component system
- Develop shared components in Storybook before wiring them into features
- Model shared component variants with CVA
- Write architecture notes
- Add a decision log for meaningful tradeoffs

Questions to answer:

- Where should business logic live?
- How should features depend on shared code?
- What abstractions are worth adding?
- What conventions help a team move faster safely?

## Track 6: Accessibility And UX Quality

Topics:

- Semantic HTML
- Labels and descriptions
- Keyboard navigation
- Focus order and focus trapping
- ARIA basics
- Color contrast
- Reduced motion
- Screen reader announcements

Project exercises:

- Build accessible dialog, menu, tabs, and forms
- Test the app with keyboard only
- Add visible focus states
- Add meaningful empty, loading, and error states

Questions to answer:

- Can every workflow be completed without a mouse?
- Are form errors announced clearly?
- Is ARIA helping or compensating for weak HTML?
- Does the interface remain usable at small sizes?

## Track 7: Tooling, Build, And Pipeline

Topics:

- pnpm
- Vite
- Next.js build behavior
- ESLint
- Formatting
- Typechecking
- Unit tests
- Component tests
- Playwright
- GitHub Actions
- Preview and production deployments

Project exercises:

- Add standard package scripts
- Add lint, format, typecheck, test, and build commands
- Add GitHub Actions for CI
- Add a Playwright smoke test
- Track bundle and performance basics

Questions to answer:

- What should CI prove before code merges?
- Which checks should run locally?
- What failures should block deployment?
- How do build tools shape the developer experience?

## Suggested Learning Rhythm

For each milestone:

1. Write the goal in plain English.
2. Build the smallest useful version.
3. Note what felt confusing.
4. Refactor once with the new understanding.
5. Capture decisions in docs before moving on.

## Extra Topics To Add Later

- HTTP caching
- Browser performance profiling
- React performance profiling
- Security basics: XSS, CSRF, auth boundaries
- Offline-first behavior and IndexedDB
- PWA capabilities
- Internationalization
- Observability and frontend error reporting
- Design system governance
- Monorepo structure
