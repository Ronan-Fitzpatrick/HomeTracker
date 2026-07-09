# Phase 1 Browser Basics Task Tracker

The runnable companion to [Phase 1](../../docs/phases/phase-1-browser-basics.md).

## Structure

- `index.html`: semantic page structure and module entry point
- `src/main.js`: application composition and event wiring
- `src/state.js`: in-memory task and filter state
- `src/render.js`: DOM rendering functions
- `src/storage.js`: localStorage boundary
- `src/task.js`: task creation, validation, and date helpers
- `styles/tokens.css`: visual design tokens
- `styles/app.css`: page and component styles
- `tests/`: focused browser or unit tests when we introduce a test runner

This phase deliberately has no package manager, bundler, framework, or TypeScript configuration. JavaScript modules run directly in the browser.
