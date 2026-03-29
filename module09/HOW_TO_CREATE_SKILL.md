# How to Create a Skill for Claude Code

This guide walks you through creating a custom skill for Claude Code. Skills are reusable automation units that can be invoked to perform specific tasks.

## What is a Skill?

A skill is a packaged set of instructions, prompts, and configurations that extends Claude Code's capabilities. Skills can:
- Generate code for specific frameworks or patterns
- Perform automated tasks (testing, deployment, etc.)
- Provide specialized domain knowledge
- Create complete project structures

## Skill File Format

Skills are distributed as `.skill` files, which are ZIP archives containing:

```
skill-name.skill/
├── SKILL.md           # Required: Main skill definition
├── agents/            # Optional: Custom agent configurations
├── scripts/           # Optional: Helper scripts
├── assets/            # Optional: Images, icons, documentation
└── references/        # Optional: Additional reference docs
```

## Creating a Skill

### Step 1: Create the Skill Directory Structure

```bash
mkdir my-skill
mkdir -p my-skill/agents my-skill/scripts my-skill/assets my-skill/references
```

### Step 2: Create SKILL.md

The `SKILL.md` file is the core of every skill. It must include YAML frontmatter with:
- `name`: Short skill identifier
- `description`: Detailed description of what the skill does and when to trigger it

```markdown
---
name: my-skill
description: Description of what this skill does. Include trigger phrases like "when user wants to X" or "triggered by phrases like..."
---

# My Skill Title

Detailed documentation about the skill...

## When to Use

List specific use cases and trigger scenarios...

## Workflow

Step-by-step instructions...

## Examples

Provide code examples...
```

### Step 3: Add Supporting Files

**agents/openai.yaml** (optional):
```yaml
name: my-agent
description: Agent purpose
tools:
  - Read
  - Write
  - Edit
  - Bash
```

**scripts/** (optional):
Add any helper scripts your skill needs.

**assets/** (optional):
Add icons (PNG/SVG) for the skill marketplace.

### Step 4: Package the Skill

Create the `.skill` ZIP file:

```bash
cd my-skill
zip -r ../my-skill.skill .
```

Or use the Claude Code skill packaging tools.

### Step 5: Install and Test

Install the skill locally:
```bash
# Copy to Claude Code skills directory
cp my-skill.skill ~/.claude/skills/
```

Test the skill by invoking it with its trigger phrases.

## Skill Best Practices

1. **Clear triggers**: Include specific phrases that should trigger the skill
2. **Comprehensive SKILL.md**: Document all use cases, workflows, and examples
3. **Modular design**: Keep scripts and references organized
4. **Test thoroughly**: Verify the skill works in different scenarios
5. **Version control**: Track changes to your skills

## Example: Creating a Regression Testing Skill

See the `regression-testing.skill` file in this module for a complete example.

### Trigger Phrases

```yaml
description: |
  Generate comprehensive regression testing suites for web applications, APIs, and source code.
  Use this skill when the user wants to create regression tests, test suites, E2E tests, API tests,
  or automated testing for their application.
  Trigger on phrases like "regression testing", "create tests", "test suite", "automated tests",
  "E2E testing", "API testing", or when the user mentions testing their application.
```

### Workflow Structure

```markdown
## Workflow

### Step 1: Gather Requirements
Ask about application type, technology stack, testing scope, authentication, preferred tools, etc.

### Step 2: Plan Testing Strategy
Design layered approach: E2E UI, API, Unit/Component tests

### Step 3: Create Directory Structure
Generate folder hierarchy for tests

### Step 4: Generate Configuration Files
Create configs for Playwright, API tests, test runner

### Step 5: Write Test Templates
Generate starter tests for smoke, auth, critical paths, features

### Step 6: Setup Reporting
Configure HTML, JUnit XML, JSON output formats
```

## Distribution

Skills can be distributed via:
- GitHub repositories
- Claude Code skill marketplace
- Direct file sharing

To share publicly, upload to a GitHub repo and users can install via the skill installer.

## Resources

- Claude Code Documentation
- Skill Creator Tool: `.codex/skills/.system/skill-creator`
- Skill Installer Tool: `.codex/skills/.system/skill-installer`