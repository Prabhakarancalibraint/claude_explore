# CLAUDE.md - Module 13: Subagents & Multi-Agent Workflows

This document provides comprehensive guidance on using subagents and multi-agent workflows in this project.

---

## Overview: Subagents and Multi-Agent Workflows

Multi-agent workflows leverage specialized sub-agents to handle different aspects of a feature implementation. Instead of a single agent handling everything, you coordinate multiple agents, each with a specific role and expertise area.

### When Multi-Agent Approaches Excel

- **Complex features requiring diverse expertise** (API + UI + tests + docs)
- **Parallelizable tasks** that can run concurrently
- **Large-scale refactoring** touching multiple layers
- **Independent modules** that can be developed separately
- **Team-like collaboration** mimicking real-world development teams

### When Single-Agent is Preferable

- **Small, focused tasks** (fix a bug, add one component)
- **Tightly coupled changes** requiring deep context
- **Quick exploration** or research tasks
- **Simple documentation updates**
- **When context overhead** outweighs parallelization benefits

---

## Agent Roles & Responsibilities

### Backend Agent

**Primary Focus**: API, services, database, business logic

**Responsibilities**:
- Design and implement REST/GraphQL endpoints
- Create service layer abstractions
- Define data models and schemas
- Handle authentication/authorization logic
- Write backend unit and integration tests

**File Patterns**:
- `src/api/` - API client functions
- `src/services/` - Business logic services
- `src/models/` - Data models/types
- `src/hooks/` - Custom React hooks for data fetching
- `tests/api/` - API integration tests

**Example Prompt**:
```
Create a Backend Agent to build the exercise progress API:
- POST /api/progress - Save user progress
- GET /api/progress/:userId - Fetch user progress
- Include proper error handling and validation
- Write unit tests for service layer
```

### Frontend Agent

**Primary Focus**: UI components, pages, API integration

**Responsibilities**:
- Build React components (UI primitives and composite)
- Implement pages with routing
- Integrate with backend APIs
- Handle state management
- Ensure responsive design and accessibility

**File Patterns**:
- `src/components/` - Reusable UI components
- `src/pages/` - Route pages
- `src/context/` - React context providers
- `src/styles/` - Component-specific styles

**Example Prompt**:
```
Create a Frontend Agent to build the ExercisePage:
- Display exercise card with interactive elements
- Integrate with useProgress hook
- Add Framer Motion animations
- Handle loading/error states
- Match existing Navbar and Hero patterns
```

### Test Agent

**Primary Focus**: Unit, integration, and E2E testing

**Responsibilities**:
- Write unit tests for components and functions
- Create integration tests for API flows
- Implement E2E tests for critical user paths
- Ensure test coverage thresholds
- Maintain test utilities and fixtures

**File Patterns**:
- `tests/unit/` - Component and function tests
- `tests/integration/` - API and flow tests
- `tests/e2e/` - User journey tests
- `tests/fixtures/` - Test data and utilities

**Example Prompt**:
```
Create a Test Agent to build the test suite:
- Unit tests for ExerciseCard, ProgressTracker components
- Integration tests for progress save/fetch flow
- Mock API responses appropriately
- Use @testing-library/react patterns
- Achieve 80% coverage minimum
```

### Documentation Agent

**Primary Focus**: Technical docs, usage guides, API references

**Responsibilities**:
- Write component documentation
- Create API reference documentation
- Update README with usage examples
- Document configuration and setup
- Maintain CHANGELOG entries

**File Patterns**:
- `docs/` - Documentation directory
- `README.md` - Project overview
- Inline JSDoc comments
- `CHANGELOG.md` - Version history

**Example Prompt**:
```
Create a Documentation Agent to document the progress feature:
- Document useProgress hook API
- Add JSDoc to ExerciseCard props
- Update README with feature overview
- Include usage examples with code snippets
- Document configuration options
```

---

## Orchestration Strategy

### Task Breakdown Process

1. **Analyze the feature** - Identify all affected components
2. **Group by expertise** - Assign tasks to appropriate agents
3. **Define dependencies** - Establish execution order
4. **Set interfaces** - Define how agents communicate

### Delegation Pattern

```
Orchestrator Agent
├── Backend Agent (parallel)
│   └── Creates: API endpoints, services, types
├── Frontend Agent (parallel)
│   └── Creates: Components, pages, hooks
├── Test Agent (sequential after Backend + Frontend)
│   └── Creates: Tests for above
└── Documentation Agent (sequential after all)
    └── Creates: Docs for implemented feature
```

### Result Merging

**Process**:
1. Each agent reports back with file changes
2. Orchestrator reviews for conflicts
3. Merge strategy applied:
   - Same file: Use later agent's changes with manual review
   - Dependent changes: Apply in dependency order
   - Conflicts: Flag for human resolution

**Conflict Resolution**:
- **Type conflicts**: Merge types, keep all properties
- **Import conflicts**: Consolidate imports alphabetically
- **Style conflicts**: Follow existing project patterns
- **Logic conflicts**: Escalate to human review

---

## Example Orchestrator Prompt

Below is a complete orchestrator prompt for implementing a new "Quiz" feature following the module01_task2 patterns:

```
## Orchestrator Prompt: Implement Quiz Feature

### Feature Specification
Add a quiz component to the learning platform that allows users to test their knowledge after completing exercises.

### Phase 1: Backend (Run in Parallel)
Delegate to Backend Agent:
- Create `src/api/quiz.js` with fetchQuiz(quizId), submitQuiz(quizId, answers) endpoints
- Create `src/services/quizService.js` with getQuiz, evaluateQuiz, getQuizResults functions
- Add types to `src/types/quiz.js`
- Write unit tests in `tests/unit/quizService.test.js`

### Phase 2: Frontend (Run in Parallel)
Delegate to Frontend Agent:
- Create `src/components/Quiz.jsx` following ExerciseCard patterns
- Create `src/components/QuizOption.jsx` for answer options
- Create `src/pages/QuizPage.jsx` following TopicPage patterns
- Add `src/hooks/useQuiz.js` following useProgress patterns
- Update routing in App.jsx

### Phase 3: Integration
After Backend + Frontend complete:
- Test Agent: Create integration tests for quiz flow
- Verify API integration works correctly
- Test loading states and error handling

### Phase 4: Documentation
Delegate to Documentation Agent:
- Document useQuiz hook in README
- Add JSDoc comments to Quiz components
- Update feature documentation

### Success Criteria
- QuizPage renders at /quiz/:quizId route
- Users can select answers and submit
- Progress is saved upon completion
- All tests pass with 80%+ coverage
- Documentation complete
```

---

## Multi-Agent Best Practices

### Project-Specific Guidelines

1. **Use module01_task2 as reference** - Follow its component patterns, file organization, and coding style
2. **Maintain consistent naming** - Components: PascalCase, hooks: camelCase with use prefix
3. **Follow existing patterns** - Match the structure of components/, pages/, hooks/ directories
4. **Use shared types** - Define TypeScript interfaces in `src/types/` directory
5. **Consistent styling** - Use CSS modules or the existing index.css/App.css pattern

### Limitations of Multi-Agent Approaches

- **Context fragmentation**: Agents may miss cross-cutting concerns
- **Coordination overhead**: Orchestrator must track dependencies carefully
- **Duplicate effort**: Without clear boundaries, agents may duplicate work
- **Integration challenges**: Combining agent outputs requires careful merging

### When NOT to Use Multi-Agent Workflows

- **Hotfixes** - Single agent faster for small changes
- **Prototyping** - Exploration benefits from single agent context
- **Tight deadlines** - Parallelization adds coordination time
- **Learning phase** - Understanding codebase first
- **Simple documentation** - Single agent owns the narrative

---

## Quick Reference

| Task Type | Approach | Reason |
|-----------|----------|--------|
| New feature (full-stack) | Multi-agent | Parallel development |
| Bug fix | Single-agent | Focused context needed |
| Refactor | Multi-agent if large | Can parallelize by layer |
| Documentation | Single-agent | Owns complete narrative |
| Research/exploration | Single-agent | Deep context required |

---

## Related Documentation

- Module 01 Task 2: Reference implementation for component patterns
- See `src/components/`, `src/pages/`, `src/hooks/` for patterns to follow
- Review existing API structure in `src/api/` for backend patterns

---

*Last updated: 2026-04-01*