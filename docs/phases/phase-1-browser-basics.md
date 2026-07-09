# Phase 1: Browser Basics Task Tracker

**Status:** Ready to start

## Goal

Build a usable local version of the HomeTracker Today workspace with plain HTML, CSS, and JavaScript.

## Learning Focus

- Semantic HTML forms and controls
- DOM events and event delegation
- Application state versus derived UI state
- Rendering data into the DOM
- localStorage persistence
- Browser layout, focus, and accessibility fundamentals

## Scope

- Render tasks in Overdue, Today, Upcoming, and Completed groups
- Add a task with a title, category, and optional due date
- Complete, uncomplete, and delete a task
- Filter by status and category
- Search by task title
- Save tasks to localStorage and restore them after reload
- Support keyboard navigation, visible focus, and correctly labelled controls
- Implement responsive desktop and mobile layouts based on the Today mockup

## Out Of Scope

- React, TypeScript, Next.js, Tailwind, Storybook, and CVA
- API, database, accounts, or syncing
- Shopping lists, projects, and home documentation
- Recurrence calculation, reminders, and notifications
- Drag and drop, sorting controls, and task editing

## Data And State

```js
const task = {
  id: "task_001",
  title: "Replace kitchen smoke alarm battery",
  category: "maintenance",
  dueDate: "2026-07-07",
  isCompleted: false,
  createdAt: "2026-07-09T10:00:00.000Z"
};
```

The application state is the task collection plus the current search and filter values. Task groups are derived during rendering from those values and the current date.

## Acceptance Criteria

- A user can add, complete, uncomplete, delete, search, and filter tasks.
- Reloading the page preserves the task collection.
- The task list updates immediately after every action.
- The app is usable with only a keyboard.
- Inputs have labels and validation messages are understandable.
- The layout remains readable on narrow screens.
- The browser console has no errors.

## Learning Notes

At the end of the phase, record short answers to:

- What data belongs in JavaScript memory, the DOM, and localStorage?
- What event starts each user action, and what changes afterward?
- How does a state update become visible pixels in the browser?
- Which accessibility behaviors came from native HTML, and which required extra code?
