# Phase 3: TypeScript Domain Model

**Status:** Planned

**Planned code:** `apps/phase-3-typescript-domain/`

## Goal

Carry the completed React prototype into a separate strict TypeScript app, then
use the familiar task, shopping, and dashboard behavior to learn how TypeScript
models data and guides refactoring.

The phase also defines the first typed models for recurrence, projects, and
home documents. Those models prepare later phases without expanding the UI.

## Starting Point

Phase 3 starts from the completed Phase 2 React and Vite app. The new app keeps
the same user-visible behavior so TypeScript is the main variable being
studied. Phase 2 remains runnable as the JavaScript comparison point.

Carry forward:

- Task, shopping, dashboard, and navigation behavior
- Component boundaries and state ownership
- Local-storage persistence and runtime validation
- Accessibility behavior and design tokens
- Lint and production-build checks

Introduce:

- TypeScript and strict compiler settings
- A separate `typecheck` command
- Domain-owned types and typed factories
- Typed component props, events, state, and hooks
- Discriminated unions for meaningful domain variants
- Explicit runtime handling of data that begins as `unknown`

## Learning Focus

- Type inference versus explicit annotations
- Primitive, literal, object, array, and function types
- `type` aliases and `interface` declarations
- Optional properties versus nullable values
- Union types and narrowing
- Discriminated unions
- Generics through reusable hooks and components
- `unknown` versus `any`
- Type predicates and assertion functions
- `satisfies` for checking values without widening them
- Utility types such as `Pick`, `Omit`, and `Partial`
- Compile-time safety versus runtime validation
- Compiler-guided refactoring

## Decisions

### Preserve A Separate Phase 2 App

Phase 3 gets a new app rather than converting Phase 2 in place. This keeps the
JavaScript and TypeScript implementations available side by side and makes the
learning progression visible in the repository.

### Use Strict TypeScript

The app will enable strict compiler checking from the start. Weakening the
compiler to make migration easier would hide the exact questions this phase is
intended to expose.

Application code should not use unexamined `any`. A narrow, documented escape
hatch is acceptable only when a third-party boundary cannot be represented
more safely.

### Keep Types With Their Domain Owners

Task types belong with the task domain module, shopping types with the shopping
domain module, and so on. A broad shared `types` folder is deferred until a
type genuinely has multiple owners.

### Treat External Data As Unknown

JSON parsed from local storage is not trusted merely because the application
declares a TypeScript type. It begins as `unknown` and becomes a domain value
only after runtime validation.

This phase keeps hand-written validators so the relationship between checking,
narrowing, and trusted values remains visible. Schema libraries are deferred
until after that model is understood.

### Preserve Null Semantics

Persisted optional values such as an absent due date or store continue to use
`null`. Optional properties mean that a property itself may be missing, which
is a different state. Types should reflect the data contract rather than use
`?` and `null` interchangeably.

## Domain Direction

### Task

The initial task model will type the existing fields and separate factory input
from the stored entity. A later slice will replace the completion boolean with
a discriminated task-state model so the compiler can narrow completed-only
data safely.

```ts
type TaskState =
  | { status: 'active' }
  | { status: 'completed'; completedAt: string }
```

### Recurrence

Recurrence is modelled as a discriminated union because different schedules
require different data:

```ts
type Recurrence =
  | { kind: 'none' }
  | { kind: 'weekly'; interval: number; weekdays: number[] }
  | { kind: 'monthly'; interval: number; dayOfMonth: number }
  | { kind: 'yearly'; month: number; dayOfMonth: number }
```

The exact fields will be reviewed before implementation. Recurrence date
calculation remains out of scope.

### Shopping Item

Shopping types will preserve the relationship between category and department
as far as practical without making ordinary component code difficult to use.
The phase will compare a simple union with a more precise discriminated model
before choosing the final representation.

### Project And Home Document

Projects and home documents receive domain types, factories, validators, and
typed seed examples only. They are included to practise modelling different
object shapes and reusable concepts; their screens belong to a later phase.

## Scope

### TypeScript Foundation

- Create a separate React, Vite, and TypeScript app from Phase 2
- Add strict `tsconfig` settings
- Add a `typecheck` package script
- Convert JavaScript and JSX files to TypeScript and TSX incrementally
- Keep the app runnable after each migration slice

### Existing React App

- Type task and shopping domain entities and factory inputs
- Type component props and browser event handlers
- Type React state and callback contracts
- Make `useLocalStorage` generic
- Read persisted JSON as `unknown`
- Narrow validated storage data into trusted domain values
- Preserve current behavior, accessibility, and persistence

### Domain Expansion

- Model recurrence with a discriminated union
- Model task state with a discriminated union
- Model projects and home documents without UI
- Add typed seed examples using `satisfies`
- Record the runtime-validation strategy

## Out Of Scope

- Next.js, routing, SSR, or Server Components
- API, database, accounts, or cross-device synchronization
- Project and document screens
- Recurrence date calculations or notifications
- A runtime schema library
- Tailwind, Storybook, CVA, or a component library
- A large automated-test setup

Small checks that prove narrowing or domain behavior may be introduced when
they materially help the TypeScript lesson. Full testing infrastructure remains
a later milestone.

## Delivery Slices

1. Create the separate Phase 3 app and enable strict TypeScript.
2. Convert option constants and seed data; explore inference, literals, and
   `satisfies`.
3. Define task and shopping entity types plus separate factory-input types.
4. Type factories and validators; treat parsed storage data as `unknown`.
5. Convert `useLocalStorage` into a generic hook and examine its type contract.
6. Convert React components, props, callbacks, state, and form events to TSX.
7. Model recurrence as a discriminated union without calculating schedules.
8. Refactor task completion into a discriminated state and migrate persisted
   Phase 2 data safely.
9. Add project and home-document models, validators, and typed seed examples.
10. Complete typecheck, lint, build, browser-parity, and accessibility checks.
11. Record learning notes and close the phase.

## Acceptance Criteria

- Phase 2 behavior remains available in the separate Phase 3 app.
- Strict TypeScript passes without unexamined `any` in application code.
- `typecheck`, lint, and production build report no errors.
- Task and shopping state, props, callbacks, events, and factories are typed.
- The local-storage hook is generic and validates parsed `unknown` data before
  returning domain values.
- Task state and recurrence use discriminated unions with exhaustive narrowing.
- Project and home-document models have typed, runtime-validated examples.
- Existing Phase 2 local data is handled safely when a persisted shape changes.
- Keyboard, narrow-screen, and accessible-error behavior remain intact.
- Learning notes explain what TypeScript caught and what still required runtime
  validation.

## Learning Notes To Record

- Where did inference remove the need for an annotation?
- When was an explicit annotation clearer or safer?
- What is the practical difference between `type` and `interface` here?
- When should a value be optional, nullable, or represented as a union variant?
- How does a discriminant let TypeScript narrow an object?
- What contract does the generic local-storage hook expose?
- Why must parsed JSON begin as `unknown`?
- Which bugs did TypeScript prevent during the migration?
- Which invalid states could TypeScript make difficult or impossible to express?
- Which bugs still required runtime validation or browser testing?
- When did a type become too clever for the value it provided?
