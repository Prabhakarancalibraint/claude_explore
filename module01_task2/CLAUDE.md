# CLAUDE.md - Context Management Strategy

This document defines how to maintain persistent context and optimize token usage when working with this project.

## Project Overview

- **Project**: module01_task2 (Vite + React application)
- **Tech Stack**: React 19, Vite 8, React Router DOM 7, Framer Motion, Lucide React
- **Purpose**: Interactive UI with animations and routing

## Token Tracking & Monitoring

### Enabling Token Usage Display

Token usage is available in Claude Code responses. Each response includes:
- `input_tokens`: Tokens in the prompt (your messages + context)
- `output_tokens`: Tokens in Claude's response
- `cache_read_tokens`: Tokens reused from context cache

### Monitoring via Console

Claude Code automatically displays token usage in the terminal after each response. Look for:
```
[Token usage: input=X, output=Y, cache=Z]
```

### API Monitoring

When using the Claude API directly, token usage is returned in the response:
```json
{
  "usage": {
    "input_tokens": 1500,
    "output_tokens": 500,
    "cache_read_tokens": 800
  }
}
```

## Context Management Best Practices

### 1. File Exclusion Strategy

This project uses `.claudeignore` to exclude:
- `node_modules/` - 1000s of files, no business logic
- `dist/` - Generated build output
- `package-lock.json` - Large generated file
- `logs/`, `coverage/` - Non-essential artifacts
- Test files when not actively testing

### 2. Selective File Reading

- Only read files relevant to the current task
- Use specific paths rather than glob patterns that match many files
- When exploring, use the Explore agent with specific scope

### 3. Session Management

- Use `/clear` at the start of significant context shifts
- Break large tasks into smaller conversations
- Create new sessions for unrelated tasks

### 4. Prompt Optimization

**Bad Prompt** (high token usage):
```
Show me all the files in the project and explain what each one does and how they relate to each other
```

**Optimized Prompt** (efficient):
```
Explain the main.jsx entry point and its relationship to App.jsx
```

### 5. Context Caching

Claude Code automatically caches context. To maximize cache hits:
- Keep related work in the same session
- Reference previously discussed files by name
- Avoid major topic changes mid-session

## Persistent Context Maintenance

### What to Include in CLAUDE.md

- Project structure overview
- Key file locations
- Technology stack
- Common development workflows
- Token optimization strategies specific to this project

### What NOT to Include

- Detailed code documentation (already in source)
- Installation instructions (in README.md)
- Repeated context from previous sessions

## Quick Reference

| Command | Purpose |
|---------|---------|
| `/clear` | Clear conversation context to start fresh |
| `/help` | Get Claude Code help |

## Token Budget Tips

1. **Before asking**: Can you find the answer in 1-2 files instead of 10?
2. **During work**: Use specific file paths, not wildcards
3. **After task**: Use `/clear` if context is no longer relevant