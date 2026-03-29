# Module 06: Claude Code CLI - Core Usage

This module demonstrates the core usage of Claude Code CLI commands and power patterns for enhanced development efficiency.

## CLI Commands Overview

### 1. One-Shot Execution (`claude -p`)

Execute tasks without entering interactive mode. Perfect for quick operations.

```bash
# List files in a project
claude -p "List all JavaScript/JSX files in /home/xavier-praveen/Workspace/claude_exercise/module01_task2/src directory"
```

**Output:**
```
Here are all the JavaScript/JSX files in the `/home/xavier-praveen/Workspace/claude_exercise/module01_task2/src` directory:

**Root files:**
- `main.jsx`
- `App.jsx`

**Components:**
- `components/Hero.jsx`
- `components/Section.jsx`
- `components/InteractiveExercise.jsx`
- ...

Total: 18 JavaScript/JSX files.
```

### 2. Model Selection (`--model`)

Select different models for different tasks.

```bash
claude -p --model opus "What model are you using?"
```

**Output:**
```
I'm using the **minimax-m2.5:cloud** model.
```

### 3. Configuration Check

```bash
claude -p "What is your current configuration settings?"
```

**Output:**
```
| File | Settings |
|------|----------|
| `.claude/settings.json` | `model: sonnet[1m]` |
| `.claude/settings.local.json` | Permissions: `Bash(npm run:*)`, `Bash(git push:*)` |
```

### 4. Slash Commands (Available in Interactive Mode)

- `/clear` - Clear conversation history
- `/help` - Show available commands
- `/edit` - Edit previous responses
- `/run` - Execute shell commands

---

## Power Patterns Implementation

### Pattern 1: Pipe Logs for Debugging

Debug errors by piping log output directly to Claude.

```bash
echo "[ERROR] Failed to load blockchain data: TypeError: Cannot read property 'provider' of undefined" | claude -p "Diagnose this error and suggest a fix"
```

**Demonstration with error analysis:**

When analyzing the module01_task2 project:
```
Based on my analysis of the blockchain learning project at `/home/xavier-praveen/Workspace/claude_exercise/module01_task2`, here's what I found:

## API Calls
**The project does NOT make any actual API calls.** This is a React-based educational web application.

## Error Handling
1. **`src/data/blockchainData.js:1133`** - Contains a throw statement in an example
2. **`src/components/CodeBlock.jsx`** - Clipboard copy has no error handling
3. **`src/hooks/useProgress.js`** - No error handling around JSON.parse() for localStorage
```

### Pattern 2: Chain Tasks for Workflow Automation

Run sequential tasks where each builds on the previous.

```bash
# Task 1: Understand components
claude -p "What are the key components in /home/xavier-praveen/Workspace/claude_exercise/module01_task2/src/components directory?"

# Task 2: Explain specific component
claude -p "Explain the Navbar component"
```

**Outputs:**

**Task 1:**
```
The key components in `/home/xavier-praveen/Workspace/claude_exercise/module01_task2/src/components` are:

1. **Hero.jsx** - Hero section component
2. **Section.jsx** - Section layout component
3. **InteractiveExercise.jsx** - Interactive exercise component
4. **Quiz.jsx** - Quiz component
5. **CodeBlock.jsx** - Code display/block component
6. **ProgressTracker.jsx** - Progress tracking component
7. **Navbar.jsx** - Navigation bar component
8. **ExerciseCard.jsx** - Exercise card component
9. **VideoPlayer.jsx** - Video player component
10. **PracticeButton.jsx** - Practice button component
```

**Task 2:**
```
The **Navbar** component (`module01_task2/src/components/Navbar.jsx`) is a navigation bar for a "Blockchain Academy" learning platform.

## What it does
- **Renders logo** - Links to home with a hex icon and "Blockchain Academy" text
- **Navigation links** - Three routes using React Router
- **Progress badge** - Shows completed topic count

## Key details
- Uses `lucide-react` for icons
- Uses `react-router-dom` for client-side routing
- Styled via CSS classes
```

---

## PR Review Analysis

### Demonstrated PR Review

Using git diff piped to Claude for code review:

```bash
cat << 'EOF' | claude -p "Review this diff for bugs, security issues, and style violations"
diff --git a/src/components/Navbar.jsx b/src/components/Navbar.jsx
--- a/src/components/Navbar.jsx
+++ b/src/components/Navbar.jsx
@@ -1,3 +1,4 @@
+import { useState, useEffect } from 'react';
+// TODO: Remove unused state
+const [unusedState, setUnusedState] = useState(null);
EOF
```

### Review Findings

**Bugs:**
1. **Performance issue**: Setting `unusedState` on every scroll event triggers unnecessary re-renders

**Style Violations:**
1. **Dead code**: `unusedState` is set but never read
2. **Misleading comment**: TODO comment about removal but code is still present

**Security:** None detected

**Summary:**
The diff introduced problems - added unused state causing performance degradation and left dead code.

---

## Code Explanation Summary

### Quiz Component

The **Quiz** component is an interactive quiz widget:

1. **Displays questions one at a time** - Shows current question with answer options
2. **Handles answer selection** - Shows correct/wrong feedback
3. **Tracks score** - Counts correct answers
4. **Shows final results** - Displays percentage with pass/fail indicator
5. **Completion callback** - Reports score to parent component

### VideoPlayer Component

The **VideoPlayer** component displays YouTube videos:

1. Takes video objects (url, title, description)
2. Extracts YouTube video ID from various URL formats
3. Displays video cards with thumbnails
4. Opens modal with embedded YouTube player on click
5. Handles modal close on outside click

### useProgress Hook

The `useProgress` hook tracks user learning progress:

1. **Tracks completed topics** - List of finished topics
2. **Tracks exercises** - Specific tasks within exercises
3. **Tracks quizzes** - Quiz scores and completion dates
4. **Persists to localStorage** - Saves progress between sessions
5. **Provides helper functions** - Check progress, mark complete

---

## Workflow Improvements

### Benefits Demonstrated

1. **Rapid Understanding**: Quickly understand unfamiliar codebases
2. **Efficient Debugging**: Pipe errors for instant analysis
3. **Consistent Reviews**: Automated PR review patterns
4. **Component Discovery**: Fast exploration of project structure
5. **Documentation Generation**: Auto-generate component docs

### Commands That Improved Workflow

| Task | Before | After |
|------|--------|-------|
| List files | Manual glob | `claude -p "List files..."` |
| Understand component | Read code manually | `claude -p "Explain component"` |
| Debug error | Read logs manually | Pipe to Claude for analysis |
| PR review | Manual diff review | `git diff | claude -p "Review..."` |

---

## Best Practices & Pitfalls

### Best Practices

1. **Use `-p` for automation**: One-shot execution is ideal for scripts and CI/CD
2. **Use `--add-dir` for context**: Specify project directories explicitly
3. **Chain related tasks**: Build on previous Claude outputs
4. **Use model selection**: Choose Opus for complex reasoning, Sonnet for quick tasks
5. **Pipe errors for debugging**: Pass error logs directly to Claude

### Common Mistakes to Avoid

1. **Not specifying directories**: Claude may not find files in non-current directories
2. **Using interactive mode for automation**: Always use `-p` for scripted workflows
3. **Skipping error handling in code**: Always add try/catch for critical operations
4. **Leaving dead code**: Remove unused variables and TODO comments before committing

### Patterns That Work Well

```bash
# Quick file listing
claude -p "List all TypeScript files"

# Code explanation
claude -p "Explain how the auth.service.ts works"

# Debug errors
cat error.log | claude -p "Analyze these errors"

# PR review
git diff main | claude -p "Review for bugs and style"

# Chain tasks
claude -p "Find auth-related files" && claude -p "Explain auth flow"
```

---

## Key Learnings

1. **One-shot mode (`-p`)** is essential for CLI automation and scripting
2. **Model selection** allows optimization between cost, speed, and capability
3. **Pipe patterns** enable rapid debugging without context switching
4. **Chaining commands** creates powerful workflow automations
5. **PR review via diff** provides consistent, automated code quality checks
6. **Code explanation** accelerates onboarding and understanding of unfamiliar code

---

## References

- Claude Code CLI Help: `claude --help`
- Project: `/home/xavier-praveen/Workspace/claude_exercise/module01_task2`
- Repository: `https://github.com/Prabhakarancalibraint/claude_explore`