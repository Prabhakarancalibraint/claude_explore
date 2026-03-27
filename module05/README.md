# Module 05: Extended Context & Context Windows

This module covers the effective utilization of large context windows (up to 200K tokens) and extended thinking for solving complex, multi-file, and system-level problems.

## Table of Contents

1. [Context Window Overview](#context-window-overview)
2. [Model Usage Strategy](#model-usage-strategy)
3. [Repository Context Analysis](#repository-context-analysis)
4. [Extended Thinking Implementation](#extended-thinking-implementation)
5. [Comparison: Normal vs Extended Thinking](#comparison-normal-vs-extended-thinking)
6. [Best Practices & Guidelines](#best-practices--guidelines)
7. [Key Learnings](#key-learnings)

---

## Context Window Overview

The context window defines how much information an LLM can process in a single conversation. Different Claude models offer varying context sizes:

| Model | Context Window | Best For |
|-------|----------------|----------|
| Claude Opus 4 | 200K tokens | Full codebase analysis, complex reasoning |
| Claude Sonnet 4 | 200K tokens | Large feature development, extended sessions |
| Claude Haiku 4-5 | 200K tokens | Batch processing, lightweight large-scale tasks |

> **Note**: All current Claude models support 200K token context windows. The difference lies in reasoning capability, speed, and cost.

### Token Budget Breakdown

- **1K tokens** ≈ ~750 words
- **200K tokens** ≈ ~150,000 words (~300 pages)
- Average source file: 200-500 tokens
- Large codebase analysis: 10-50 files = 5K-25K tokens

---

## Model Usage Strategy

### Claude Opus 4: Full Codebase Analysis & Complex Reasoning

**When to use:**
- Architecture decisions requiring understanding of multiple interconnected files
- Debugging complex issues spanning multiple modules
- System design and refactoring tasks
- Security audits of entire codebases
- Creating comprehensive documentation

**Prompt Example:**
```
Analyze the entire blockchain learning platform codebase. Identify:
1. All routing patterns and how pages connect
2. State management approach and data flow
3. Component hierarchy and reusability
4. Any potential architectural issues or improvements
```

**Token Usage:** 15,000-50,000 tokens (entire codebase loaded)

---

### Claude Sonnet 4: Large Feature Development & Extended Sessions

**When to use:**
- Implementing substantial features across multiple files
- Long-running development sessions with context accumulation
- Multiple related bug fixes in one session
- When you need balance of capability and cost

**Prompt Example:**
```
Add a new "Achievements" feature to the app:
- Create achievements data structure
- Add achievements page with badge display
- Integrate progress tracking with achievements
- Add achievement unlock animations
```

**Token Usage:** 5,000-20,000 tokens (feature scope)

---

### Claude Haiku 4-5: Batch Processing & Lightweight Tasks

**When to use:**
- Processing multiple similar files in batch
- Simple code generation or refactoring
- Quick file operations that don't need deep reasoning
- High-volume automated tasks
- When speed is critical and reasoning complexity is low

**Prompt Example:**
```
For each file in src/components/, add PropTypes validation.
Process all 15 component files in batch.
```

**Token Usage:** 1,000-5,000 tokens per task

---

## Repository Context Analysis

### Analyzing module01_task2

The repository is a React-based blockchain learning platform. Here's how context windows apply:

#### Scenarios Where Full Context Loading is Beneficial

1. **Understanding Overall Architecture**
   - Loading all source files to understand component relationships
   - Tracing data flow from API to UI
   - Identifying patterns across components

2. **Cross-Cutting Changes**
   - Adding authentication that touches routing, state, and UI
   - Performance optimization requiring changes across multiple files

3. **Debugging Complex Issues**
   - State management bugs involving multiple components
   - Routing issues with BrowserRouter configuration

#### Cases Where Partial Context is More Efficient

1. **Single Component Updates**
   - Only need the specific component file
   - Example: Updating Hero.jsx styling - no need for other components

2. **Simple Bug Fixes**
   - Isolated issues don't require full codebase
   - Example: Fixing a CSS bug - only needs the CSS file and component

3. **Quick Feature additions**
   - Self-contained features like adding a single new page

### Context Strategy for This Repository

| Task | Context Scope | Recommended Approach |
|------|---------------|---------------------|
| Add new topic page | 2-3 files | Partial context |
| Fix routing bug | 5-8 files | Medium context |
| Refactor state management | 15-20 files | Full context |
| Performance audit | Entire src/ | Full context |

---

## Extended Thinking Implementation

Extended thinking is a capability that allows Claude to show its reasoning process, breaking down complex problems into steps. This leads to more accurate outputs for complex tasks.

### How to Enable Extended Thinking

#### In API Calls

```javascript
// Using Anthropic SDK
const response = await anthropic.messages.create({
  model: "claude-opus-4-6-20251117",
  max_tokens: 4096,
  messages: [
    {
      role: "user",
      content: "Design a microservices architecture for the blockchain platform"
    }
  ],
  thinking: {
    type: "enabled",
    budget_tokens: 1024  // tokens allocated for thinking
  }
});

// Response includes reasoning in the thinking field
console.log(response.content[0].thinking);  // Shows reasoning process
```

#### In Claude Code CLI

Extended thinking is automatically enabled for complex reasoning tasks. The CLI uses it when:
- Multi-step problem solving is required
- Architecture or system design tasks
- Complex debugging scenarios

### When to Use Extended Thinking

#### Ideal Use Cases

1. **Architecture Decisions**
   ```
   "Design a scalable state management approach for the learning platform
   that supports progress tracking, quiz results, and user preferences"
   ```

2. **Complex Debugging**
   ```
   "Debug why progress isn't persisting between page navigations.
   Trace the data flow from useProgress hook through localStorage"
   ```

3. **System Design**
   ```
   "Design a plugin system that allows third-party content providers
   to add their own topics and exercises"
   ```

4. **Multi-File Refactoring**
   ```
   "Refactor the routing system to support dynamic route loading
   and code splitting for better performance"
   ```

#### When NOT to Use Extended Thinking

- Simple, single-file tasks
- Quick questions or lookups
- Batch operations with clear patterns
- Time-sensitive operations

---

## Comparison: Normal vs Extended Thinking

### Example: Adding a New Feature

#### Normal Response (No Extended Thinking)

**Prompt:**
```
Add a dark mode toggle to the navbar that persists user preference
```

**Typical Response:**
```
I'll add a dark mode toggle. Here's what I need to do:

1. Add theme state to the App component
2. Create toggle button in Navbar
3. Save preference to localStorage

[Code implementation follows]
```

**Token Usage:** ~500 input, ~800 output

---

#### Extended Thinking Response

**Prompt:**
```
Add a dark mode toggle to the navbar that persists user preference.
Use extended thinking to plan the implementation thoroughly.
```

**Thinking Process (Internal):**
```
Let me analyze this task:
1. First, I need to understand the current state management approach
2. Look at how progress is persisted (localStorage pattern)
3. Plan where to store theme preference
4. Consider CSS variables vs theme providers
5. Design the toggle component

Looking at useProgress hook - uses localStorage for persistence.
I should follow the same pattern for consistency.

State approach:
- Add themeSlice to useProgress or create separate useTheme hook
- Use CSS custom properties for theming
- Wrap app in theme provider

Component structure:
- Add toggle button to Navbar
- Pass theme state through props or context
- Apply theme class to root element

Persistence:
- Use 'theme' key in localStorage
- Default to 'light' if not set

Let me also consider accessibility:
- Toggle needs aria-label
- Keyboard accessible
- High contrast colors in both themes
```

**Final Output:**
```
I'll implement dark mode with a comprehensive approach:

## Implementation Plan

### 1. Theme Hook (new file: src/hooks/useTheme.js)
- State: theme ('light' | 'dark')
- Toggle function
- localStorage persistence
- Effects for applying theme to document

### 2. Navbar Update
- Add toggle button with sun/moon icons
- Position in header right section

### 3. CSS Updates
- Define CSS custom properties for both themes
- Use --bg-primary, --text-primary, etc.
- Apply .dark class to override variables

### 4. Integration
- Import useTheme in App.jsx
- Apply theme to root element
- Handle system preference detection

[Full code implementation]
```

**Token Usage:** ~500 input, ~2000 output (includes reasoning), ~1024 thinking tokens

### Comparison Table

| Aspect | Normal | Extended Thinking |
|--------|--------|-------------------|
| Output Quality | Good for straightforward tasks | Excellent for complex tasks |
| Reasoning Visibility | Hidden | Visible |
| Token Cost | Lower | Higher (thinking budget) |
| Speed | Faster | Slower (processing time) |
| Consistency | Variable | More consistent |
| Complex Tasks | May miss edge cases | Thorough analysis |

### Token Usage vs Output Quality Trade-offs

| Task Complexity | Recommended Approach | Token Budget |
|----------------|---------------------|--------------|
| Simple (1 file) | Normal | 500-1500 |
| Medium (3-5 files) | Normal + careful planning | 2000-5000 |
| Complex (10+ files) | Extended thinking | 5000-15000 |
| Very Complex (architecture) | Extended thinking | 15000+ |

---

## Best Practices & Guidelines

### Choosing the Right Model Based on Task Complexity

| Complexity Level | Model | Reasoning Approach |
|-----------------|-------|-------------------|
| Simple/Quick | Haiku | Minimal |
| Standard Development | Sonnet | Normal |
| Complex Architecture | Opus | Extended |
| Mission Critical | Opus | Extended + review |

### Managing Large Context Inputs Effectively

#### 1. Strategic File Loading

```javascript
// Instead of loading everything:
// DON'T: "Analyze this entire project"
// DO: "Analyze the src/components directory for patterns"

// Better: Specific scope
"Identify reusable component patterns in src/components/
that could be extracted into shared hooks"
```

#### 2. Context Chunking

For very large codebases:
- Break into logical segments (components, hooks, pages)
- Process sequentially with summary context
- Use previous summaries as input for next chunk

#### 3. Caching Strategies

- Keep related work in same session
- Reference files by name (context cache)
- Avoid major topic shifts mid-session

### Avoiding Unnecessary Token Consumption

| Technique | Savings |
|-----------|---------|
| Specific prompts | 30-50% |
| Selective file reading | 40-60% |
| Context clearing between tasks | 50-70% |
| Efficient file structures | 20-40% |

#### Prompt Optimization Examples

**Inefficient:**
```
Show me all files in this project and explain what each does
```
Tokens: ~15,000 | Quality: Low (too broad)

**Efficient:**
```
Explain the main.jsx entry point and its relationship to App.jsx
```
Tokens: ~2,000 | Quality: High (specific)

**Efficient (Complex):**
```
I need to understand the state management for this React app:
1. First, look at src/hooks/useProgress.js
2. Then examine how it's used in components
3. Finally, check localStorage integration
```
Tokens: ~5,000 | Quality: High (structured approach)

### Practical Guidelines Summary

1. **Start Small**: Use minimal context, expand only when needed
2. **Be Specific**: Precise prompts = better results = fewer tokens
3. **Use the Right Tool**: Opus for complex, Haiku for simple
4. **Leverage Thinking**: Enable for architecture, debugging, design
5. **Monitor Token Usage**: Track to optimize over time
6. **Clear When Needed**: Use `/clear` for context shifts

---

## Key Learnings

### From Module 05

1. **All Claude models support 200K tokens** - Choose based on reasoning needs, not context limit

2. **Extended thinking dramatically improves quality for complex tasks** - Worth the additional token cost for:
   - Architecture decisions
   - Complex debugging
   - System design
   - Multi-file refactoring

3. **Context loading is a spectrum** - Not binary (all or nothing):
   - Single file: 200-500 tokens
   - Feature scope: 5K-20K tokens
   - Full codebase: 50K-100K tokens
   - Everything: Up to 200K tokens

4. **Token efficiency matters** - Small optimizations compound:
   - Specific prompts vs. broad questions
   - Selective file loading vs. glob patterns
   - Session management (cache hits)

5. **Model selection criteria**:
   - Opus: Complex reasoning, mission-critical tasks
   - Sonnet: Daily development, balanced needs
   - Haiku: High volume, simple tasks, speed-critical

6. **The Claude Code CLI automatically optimizes** - It handles much of this internally, but understanding the principles helps you guide it effectively

---

## Additional Resources

- [Anthropic API Documentation](https://docs.anthropic.com)
- [Claude Code CLI](/help)
- [Context Management Best Practices](./CLAUDE.md)

---

*Module 05 - Extended Context & Context Windows*
*Part of Claude Explore Learning Path*