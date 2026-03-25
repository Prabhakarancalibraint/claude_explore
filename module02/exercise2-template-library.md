# Exercise 2: Create Your Personal Prompt Template Library

## Instructions
Create a personal prompt template library in `.claude/prompts/` directory.
Use these templates as starting points and customize them for your workflow.

---

## Directory Structure

```
.claude/
└── prompts/
    ├── README.md                    # This file
    ├── debug.md                     # Debug templates
    ├── create-component.md          # React component templates
    ├── create-api.md                # API endpoint templates
    ├── refactor.md                  # Refactoring templates
    ├── review.md                    # Code review templates
    └── custom/
        └── [Add your own templates]
```

---

## Template: Debug Template

```markdown
## Debug Template

**Role**: You are a senior [technology] engineer with expertise in debugging.
**Context**: Working on [project name] using [technology stack].
**Task**: Debug the following issue:
[Describe the bug/error]
**Constraints**:
- Do not change test files
- Maintain existing API contracts
- Fix root cause, not symptoms
**Output Format**:
- Explain the root cause
- Provide the fix with file paths and line numbers
- Include test verification steps
```

---

## Template: Create React Component

```markdown
## React Component Template

**Role**: You are a senior React developer following [company] conventions.
**Context**: Working in [project path], using [UI library, e.g., AntD/MUI].
**Task**: Create a [ComponentName] component with:
- [Feature 1]
- [Feature 2]
- [Feature 3]
**Constraints**:
- Use TypeScript
- Follow existing component patterns in src/components/
- Do not add new dependencies
**Output Format**: Return only the component file(s)
```

---

## Template: NestJS Endpoint

```markdown
## NestJS Endpoint Template

**Role**: You are a NestJS architect.
**Context**: Project uses [ORM], [Database], [Auth method].
**Task**: Add [HTTP method] /[endpoint] endpoint to [ControllerName]
**Constraints**:
- Use existing DTOs if available
- Apply JwtAuthGuard
- Follow RESTful conventions
**Output Format**: Return the modified controller and any new files
```

---

## Template: Refactor

```markdown
## Refactor Template

**Role**: You are a senior [language] developer.
**Context**: [Project context and codebase background]
**Task**: Refactor [file/function] to [goal]
**Constraints**:
- Do not change public API
- Maintain backward compatibility
- Keep existing tests passing
**Output Format**: Show diff with explanations
```

---

## Your Custom Templates

Add your own templates below:

### [Template Name]

```markdown
**Role**:
**Context**:
**Task**:
**Constraints**:
**Output Format**:
```

---

### [Template Name]

```markdown
**Role**:
**Context**:
**Task**:
**Constraints**:
**Output Format**:
```