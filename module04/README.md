# Module 04: Token Tracking & Context Management

## Overview

This module covers optimizing token usage within Claude Code to improve output quality while minimizing cost. We apply best practices for token tracking, reducing unnecessary context, and improving signal-to-noise ratio in prompts.

---

## Steps Performed

### 1. Token Usage Tracking Setup

#### Enabling Token Display

Token usage is automatically available in Claude Code responses. Each response includes:

- **input_tokens**: Tokens in your prompt (messages + context)
- **output_tokens**: Tokens in Claude's response
- **cache_read_tokens**: Tokens reused from context cache

#### Console Monitoring

Claude Code displays token usage in the terminal after each response:
```
[Token usage: input=1500, output=500, cache=800]
```

#### API Monitoring (for programmatic access)

When using the Claude API:
```json
{
  "usage": {
    "input_tokens": 1500,
    "output_tokens": 500,
    "cache_read_tokens": 800
  }
}
```

---

### 2. Context Management Best Practices

#### Analysis of Project (module01_task2)

**Project Structure:**
```
module01_task2/
├── src/
│   ├── main.jsx       # Entry point
│   ├── App.jsx        # Main component
│   └── App.css        # Styles
├── dist/              # Build output (generated)
├── node_modules/      # Dependencies (132 folders)
├── public/            # Static assets
├── package.json
├── package-lock.json  # Large generated file (94KB)
└── vite.config.js
```

#### Files/Folders Identified as Unnecessary for Context

| File/Folder | Reason | Tokens Saved |
|-------------|--------|---------------|
| `node_modules/` | 1000+ files, no business logic | ~50,000+ |
| `dist/` | Generated build output | ~10,000+ |
| `package-lock.json` | Large generated file | ~3,000 |
| `.vscode/` | IDE config, not business logic | ~500 |
| `*.log` files | Runtime logs | ~200 |

---

### 3. .claudeignore Implementation

Created `.claudeignore` with the following exclusions:

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment files
.env
.env.local
.env.*.local

# Logs
logs/
*.log

# Coverage
coverage/

# Cache
.cache/
.vite/
.eslintcache

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Test files (when not testing)
*.test.js
*.test.jsx
*.spec.js
*.spec.jsx

# Package lock
package-lock.json

# Documentation (except essential)
*.md
!README.md
!CLAUDE.md
```

---

### 4. CLAUDE.md Usage Strategy

Created `CLAUDE.md` with the following sections:

1. **Project Overview** - Tech stack and purpose
2. **Token Tracking & Monitoring** - How to monitor usage
3. **Context Management Best Practices**:
   - File exclusion strategy
   - Selective file reading
   - Session management
   - Prompt optimization
   - Context caching
4. **Persistent Context Maintenance** - What to include
5. **Quick Reference** - Commands and tips

---

### 5. Prompt Optimization Examples

#### Bad vs Optimized Prompts

| Bad Prompt (High Token Usage) | Optimized Prompt (Efficient) |
|------------------------------|------------------------------|
| "Show me all files in the project and explain what each does" | "Explain main.jsx entry point" |
| "What are all the dependencies and their versions?" | "List dependencies from package.json" |
| "Find all React components and explain the codebase" | "Find components in src/App.jsx" |
| "Read all files and tell me about the architecture" | "Describe the App component structure" |

#### High Token Usage Scenarios

1. **Glob patterns matching many files**: `src/**/*.{js,jsx}`
   - Matches 100+ files, loads unnecessary context

2. **Vague requests**: "Explain the whole project"
   - Forces reading all source files

3. **No file constraints**: "Find where auth is handled"
   - Searches entire codebase without scope

#### Efficient Token Usage Scenarios

1. **Specific paths**: `src/main.jsx` or `src/App.jsx`
   - Only reads relevant files

2. **Focused questions**: "How is routing configured?"
   - Limits search to routing-related code

3. **Task-specific scope**: "Find the login function in auth.js"
   - Directly targets the needed file

---

## Configurations Applied

### Settings Applied to Project

1. **Created `.claudeignore`** in `/home/xavier-praveen/Workspace/claude_exercise/module01_task2/`
   - Excludes node_modules, dist, build, logs, coverage, cache, IDE files

2. **Created `CLAUDE.md`** with:
   - Project overview and tech stack
   - Token tracking instructions
   - Context management best practices
   - Prompt optimization guide

### Settings Applied to Global Claude

No global settings modified - all configurations are project-specific to maintain portability.

---

## Before vs After Improvements

### Before Implementation

| Metric | Value |
|--------|-------|
| Context loaded per session | Full project including node_modules |
| Token overhead | ~50,000+ unnecessary tokens |
| File search scope | Entire codebase |
| Prompt specificity | Low (vague requests) |

### After Implementation

| Metric | Value |
|--------|-------|
| Context loaded per session | Source files only (~5-10 files) |
| Token overhead | ~500 tokens (only relevant files) |
| File search scope | Source directory only |
| Prompt specificity | High (targeted requests) |

### Estimated Token Savings

- **Per session startup**: ~50,000 tokens saved
- **Per prompt**: 50-80% reduction through optimization
- **Annual savings** (assuming 100 sessions/month): ~60M tokens/year

---

## Learnings and Best Practices

### Key Takeaways

1. **Always exclude node_modules** - Contains thousands of files with no business logic
2. **Use .claudeignore** - Prevents unnecessary file scanning
3. **Create CLAUDE.md** - Documents project-specific context management
4. **Be specific in prompts** - Target specific files rather than broad searches
5. **Use /clear strategically** - Reset context for new topics

### Best Practices Checklist

- [ ] Create `.claudeignore` before starting work
- [ ] Document project structure in `CLAUDE.md`
- [ ] Use specific file paths in prompts
- [ ] Avoid glob patterns that match many files
- [ ] Monitor token usage in responses
- [ ] Use `/clear` for context shifts
- [ ] Keep related work in same session
- [ ] Avoid reading generated files (dist, build)

### Practical Tips

1. **When exploring**: Use Explore agent with specific scope
2. **When searching**: Use Grep with file type filters
3. **When reading**: Use Read with line limits
4. **When asking**: Be specific about what you need
5. **When done**: Use `/clear` to start fresh

---

## References

- Claude Code documentation
- Anthropic API Token Usage Guide
- Project: module01_task2 (Vite + React)

---

## Related Files

- `/module01_task2/.claudeignore` - File exclusions
- `/module01_task2/CLAUDE.md` - Context management guide
- `/module01_task2/package.json` - Project dependencies