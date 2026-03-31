# CLAUDE.md - Project Context Guide

This document provides essential context for working with the module01_task2 project (Blockchain Academy). It serves as a quick reference for developers and AI assistants to understand the project's structure, conventions, and workflows.

---

## Project Overview

- **Project Name**: Blockchain Academy
- **Project Type**: Interactive Web Application (Single Page App)
- **Purpose**: A comprehensive blockchain learning platform with interactive tutorials, progress tracking, quizzes, and hands-on exercises
- **Target Users**: Beginner to advanced developers learning blockchain technology

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.4 |
| Build Tool | Vite | 8.0.1 |
| Routing | React Router DOM | 7.13.2 |
| Animations | Framer Motion | 12.38.0 |
| Icons | Lucide React | 1.6.0 |
| State | React hooks (useState, useEffect) |
| Persistence | localStorage |
| Linting | ESLint 9.39.4 |

---

## Architecture Details

### Directory Structure

```
module01_task2/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Section.jsx
│   │   ├── ExerciseCard.jsx
│   │   ├── ProgressTracker.jsx
│   │   ├── Quiz.jsx
│   │   ├── CodeBlock.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── InteractiveExercise.jsx
│   │   └── PracticeButton.jsx
│   ├── pages/          # Page-level components
│   │   ├── TopicPage.jsx
│   │   ├── ExercisePage.jsx
│   │   └── RoadmapPage.jsx
│   ├── hooks/          # Custom React hooks
│   │   └── useProgress.js
│   ├── data/           # Static data files
│   │   ├── blockchainData.js
│   │   ├── videoPracticeData.js
│   │   └── roadmapData.js
│   ├── styles/         # CSS files
│   │   └── App.css
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML entry
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
└── package.json        # Dependencies
```

### Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with roadmap overview |
| `/roadmap` | RoadmapPage | Full learning roadmap view |
| `/topic/:topicId` | TopicPage | Individual topic content |
| `/exercises` | ExercisePage | Practice exercises list |

### Data Flow

1. **Entry**: `main.jsx` mounts the React app with StrictMode
2. **Routing**: `App.jsx` uses React Router for navigation
3. **State**: `useProgress` hook manages localStorage persistence for:
   - `completedTopics`: Array of completed topic IDs
   - `completedExercises`: Object mapping exercise IDs to completed task IDs
   - `completedQuizzes`: Object storing quiz scores and completion status
4. **Rendering**: Components receive progress data via props

---

## Coding Conventions

### React Patterns

- **Component Export**: Default export for page components, named exports for hooks
- **Props**: Destructured props in function parameters
- **State**: useState for local state, useEffect for side effects
- **Styling**: CSS modules or global CSS with BEM-like class names

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Navbar.jsx`, `ExerciseCard.jsx` |
| Hooks | camelCase with `use` prefix | `useProgress.js` |
| CSS Classes | kebab-case | `.navbar`, `.roadmap-card` |
| Functions | camelCase | `completeTopic()`, `getExerciseProgress()` |
| Constants | PascalCase | `topics`, `exercises` |

### ESLint Rules

- No unused variables (except those starting with `_` or `A-Z`)
- React Hooks rules enabled
- React Refresh enabled for Vite HMR

### File Organization

- One component per file
- Co-locate related files (component + its styles if inline)
- Data files in `/src/data/`
- Custom hooks in `/src/hooks/`

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server with HMR
npm run build        # Production build
npm run preview       # Preview production build

# Linting
npm run lint         # Run ESLint

# Project setup
npm install          # Install dependencies
```

---

## Do's and Don'ts

### Do

- Use React Router's `<Link>` component for internal navigation
- Use Framer Motion for smooth page transitions and animations
- Follow the existing component patterns in `/src/components/`
- Use Lucide React icons for UI elements
- Persist user progress via the `useProgress` hook
- Use the Section component wrapper for consistent page sections

### Don't

- Don't use `<a>` tags for internal routes - use `<Link>` from react-router-dom
- Don't modify localStorage directly - use the `useProgress` hook methods
- Don't add new dependencies without checking existing alternatives (framer-motion, lucide-react)
- Don't skip ESLint validation before committing
- Don't use inline styles - use the App.css or index.css files

---

## Known Gotchas

### Extensible Section - Add future learnings here

> **Note**: This section is designed to be extended with project-specific learnings over time.

### Current Gotchas

1. **React 19 StrictMode**: The app runs in StrictMode which renders components twice in development. This is normal and helps catch bugs. Production builds work correctly.

2. **localStorage Persistence**: Progress data is stored under the key `blockchain-progress`. Clearing browser data resets progress. No server-side backup exists.

3. **Framer Motion with Router**: Use `<AnimatePresence mode="wait">` with Routes for proper exit animations on route changes.

4. **Vite HMR and React Refresh**: Some changes may require a full page reload if Hot Module Replacement doesn't catch them.

5. **Component Re-renders**: The `useProgress` hook uses localStorage which syncs on every progress change. Minimize unnecessary state updates to avoid performance issues.

6. **Scroll Behavior**: The `ScrollToTop` component handles scroll position on route changes - don't remove it.

---

## Quick Reference

| Resource | Location |
|----------|-----------|
| Main App | `src/App.jsx` |
| Entry Point | `src/main.jsx` |
| Progress Logic | `src/hooks/useProgress.js` |
| Content Data | `src/data/blockchainData.js` |
| Styles | `src/styles/App.css`, `src/index.css` |
| Config | `vite.config.js`, `eslint.config.js` |

---

## Future Extensibility

To add new features to this project:

1. **New Topics**: Add entries to `src/data/blockchainData.js`
2. **New Pages**: Create in `src/pages/` and add route in `App.jsx`
3. **New Components**: Create in `src/components/`
4. **New Data**: Add to `src/data/` directory

---

*Last updated: 2026-03-30*