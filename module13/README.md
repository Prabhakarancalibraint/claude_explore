# Module 13: Subagents & Multi-Agent Workflows

## Overview

This module introduces **Subagents and Multi-Agent Workflows** - a powerful paradigm for coordinating multiple AI agents to handle complex, multi-faceted development tasks. Instead of relying on a single agent, you learn to orchestrate specialized agents, each with distinct roles and expertise areas.

## What Was Created

### CLAUDE.md - Multi-Agent Workflow Guide

A comprehensive guide covering:

1. **Multi-Agent Fundamentals**
   - When to use multi-agent vs. single-agent approaches
   - Benefits and trade-offs of parallel agent execution
   - Real-world use cases and scenarios

2. **Agent Roles & Responsibilities**
   - **Backend Agent**: API, services, database, business logic
   - **Frontend Agent**: UI components, pages, API integration
   - **Test Agent**: Unit, integration, and E2E testing
   - **Documentation Agent**: Technical docs, guides, API references

3. **Orchestration Strategy**
   - Task breakdown process
   - Delegation patterns and execution order
   - Result merging and conflict resolution

4. **Example Orchestrator Prompt**
   - Complete multi-agent prompt for implementing a "Quiz" feature
   - Phase-based execution: Backend → Frontend → Integration → Documentation

5. **Best Practices**
   - Project-specific guidelines
   - Limitations and when NOT to use multi-agent workflows
   - Quick reference table for task-type decisions

## File Structure

```
module13/
├── CLAUDE.md    # Comprehensive multi-agent guide
└── README.md    # This file
```

## Key Concepts

### When Multi-Agent Excels

| Scenario | Why Multi-Agent Works |
|----------|----------------------|
| Complex features requiring diverse expertise | Different agents handle API, UI, tests, docs |
| Parallelizable tasks | Backend and Frontend can run simultaneously |
| Large-scale refactoring | Can parallelize by layer |
| Independent modules | Each agent owns separate components |

### When Single-Agent is Better

| Scenario | Why Single-Agent Works |
|----------|----------------------|
| Small, focused tasks | Less context switching overhead |
| Tightly coupled changes | Deep context needed |
| Quick exploration | Single agent maintains full context |
| Simple documentation | One agent owns complete narrative |

## Agent Roles Explained

### Backend Agent
- **Focus**: API, services, database, business logic
- **Outputs**: API endpoints, service layer, data models, types
- **File Patterns**: `src/api/`, `src/services/`, `src/models/`, `src/hooks/`

### Frontend Agent
- **Focus**: UI components, pages, API integration
- **Outputs**: React components, pages, custom hooks
- **File Patterns**: `src/components/`, `src/pages/`, `src/context/`

### Test Agent
- **Focus**: Testing at all levels
- **Outputs**: Unit tests, integration tests, E2E tests
- **File Patterns**: `tests/unit/`, `tests/integration/`, `tests/e2e/`

### Documentation Agent
- **Focus**: Technical documentation
- **Outputs**: README updates, JSDoc comments, API docs
- **File Patterns**: `docs/`, inline comments, CHANGELOG

## Orchestration Example

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

## Git Commit

```
docs: Module 13 — Subagents & Multi-Agent Workflows guide

- Add CLAUDE.md with comprehensive multi-agent documentation
- Define Backend, Frontend, Test, Documentation agent roles
- Include orchestration strategy and delegation patterns
- Provide example orchestrator prompt for feature implementation
- Document best practices and limitations
- Add quick reference table for task-type decisions
```

## Key Takeaways

1. **Multi-agent enables parallel development** - Team-like collaboration for complex features
2. **Clear role definitions** - Each agent has specific responsibilities and outputs
3. **Orchestration matters** - Proper task breakdown and dependency management is essential
4. **Know when to use it** - Not every task needs multiple agents
5. **Conflict resolution** - Merging agent outputs requires careful review

## Next Steps

- Review module01_task2 for concrete examples of agent outputs
- Practice creating orchestrator prompts for new features
- Experiment with parallel agent execution
- Learn to merge and resolve conflicts between agent outputs

---

*Module 13 Complete: Subagents & Multi-Agent Workflows*