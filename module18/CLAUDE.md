# CLAUDE.md - Module 18: Custom Skills & Slash Commands

This document provides comprehensive guidance on creating custom skills and slash commands in Claude Code to automate workflows and extend capabilities.

---

## Overview: Custom Skills

Custom skills allow you to extend Claude Code with specialized capabilities tailored to your workflow. Skills can automate repetitive tasks, encapsulate domain expertise, and provide consistent outputs for specific use cases.

### What Are Skills?

Skills are structured prompts that Claude can invoke based on context. They consist of:
- **SKILL.md**: The core skill definition with frontmatter and instructions
- **Optional bundled resources**: Scripts, references, and assets

### Skills vs Slash Commands

| Feature | Skills | Slash Commands |
|---------|--------|-----------------|
| **Activation** | Context-based (description triggers) | Explicit (starts with `/`) |
| **Structure** | YAML frontmatter + markdown body | Markdown prompt file |
| **Flexibility** | General-purpose automation | Specific task execution |
| **Use case** | Complex workflows, domain expertise | Quick actions, templates |

---

## Skill Anatomy

### Directory Structure

```
skill-name/
├── SKILL.md              # Required: skill definition
├── scripts/               # Optional: executable code
│   └── helper-script.js
├── references/           # Optional: documentation
│   └── reference.md
└── assets/               # Optional: templates, icons
    └── template.json
```

### SKILL.md Structure

```markdown
---
name: skill-identifier
description: When to trigger and what this skill does. Include specific contexts where this skill applies. Make descriptions "pushy" to ensure proper triggering.
---

# Skill Title

Detailed instructions for the skill...

## Section Name

More instructions...
```

### Required Frontmatter Fields

| Field | Description |
|-------|-------------|
| `name` | Unique skill identifier (kebab-case) |
| `description` | When to trigger + what it does |

### Optional Frontmatter Fields

| Field | Description |
|-------|-------------|
| `compatibility` | Required tools, dependencies |

---

## Creating Your First Skill

### Step 1: Define the Skill Purpose

Ask yourself:
1. **What** should this skill enable Claude to do?
2. **When** should this skill trigger? (user phrases/contexts)
3. **What's** the expected output format?
4. **Should** we set up test cases?

### Step 2: Write the SKILL.md

```markdown
---
name: rwa-token-generator
description: Generate ERC-3643 compliant tokenization smart contracts for Real World Assets. Use this skill when the user wants to create token contracts for real estate, commodities, or other RWA assets. Trigger on phrases like "tokenize", "RWA contract", "ERC-3643", "asset tokenization", or when the user mentions fractional ownership, security tokens, or compliance modules.
---

# RWA Token Generator

Generate compliant smart contracts for tokenizing real-world assets.

## When to Use

- User wants to create a new token contract
- User mentions specific asset types (real estate, art, commodities)
- User needs ERC-3643 compliance features
- User wants to implement KYC/whitelist functionality

## Workflow

### Step 1: Gather Requirements

Ask about:
1. Asset type being tokenized
2. Jurisdiction (India/SEBI, UAE/SCA, etc.)
3. Required compliance features
4. Minting/burning permissions
5. Transfer restrictions

### Step 2: Generate Contract Structure

Create the following files:
- Main token contract (IERC3643 compliant)
- Compliance module
- Identity registry interface
- Deployment scripts

### Step 3: Add Required Features

Include based on requirements:
- KYC whitelist functionality
- Holder caps
- Holding periods
- Jurisdiction locks
- Transfer approval flow

## Output

The skill will produce:
- Complete Solidity contracts
- Deployment configuration
- Test suite template
- Documentation
```

### Step 3: Save the Skill

Skills are stored in:
- **Global**: `~/.claude/skills/<skill-name>/`
- **Project**: `.claude/skills/<skill-name>/`

### Step 4: Test the Skill

Use the Skill tool to invoke your custom skill:
```markdown
Use the rwa-token-generator skill to create a real estate token contract
```

---

## Skill Writing Best Practices

### Progressive Disclosure

Skills use a three-level loading system:
1. **Metadata** (~100 words): Always in context
2. **SKILL.md body**: When skill triggers (<500 lines ideal)
3. **Bundled resources**: As needed

### Trigger Description Guidelines

**Make descriptions "pushy"** to ensure proper triggering:
- ❌ "How to build a simple dashboard"
- ✅ "How to build a simple fast dashboard to display internal Anthropic data. Use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any kind of company data"

### Writing Style

- Use imperative form in instructions
- Explain **why** things are important
- Avoid heavy-handed MUSTs — explain reasoning instead
- Keep SKILL.md under 500 lines
- Use references for detailed documentation

### Defining Output Formats

```markdown
## Report Structure

ALWAYS use this exact template:

# [Title]
## Executive Summary
[2-3 sentence overview]
## Key Findings
- Finding 1
- Finding 2
## Recommendations
[Bullet points]
```

### Including Examples

```markdown
## Commit Message Format

**Example 1:**
Input: Added user authentication with JWT tokens
Output: feat(auth): implement JWT-based authentication

**Example 2:**
Input: Fixed memory leak in data processing
Output: fix(perf): resolve memory leak in DataProcessor
```

---

## Skill Categories & Examples

### Code Generation Skills

**Purpose**: Generate code following specific patterns

```markdown
---
name: react-component-generator
description: Generate React components with TypeScript, CSS modules, and testing patterns. Use when the user wants to create new React components, needs UI building blocks, or asks for component templates.
---

# React Component Generator

Generate consistent React components following project conventions.

## Component Structure

Always create:
- Component file (.tsx)
- Types file (types.ts)
- CSS Modules (.module.css)
- Story file for Storybook
- Unit tests

## Naming Conventions

- Components: PascalCase (e.g., UserCard)
- Hooks: camelCase with use prefix (e.g., useUserData)
- Files: kebab-case (e.g., user-card.tsx)
```
```

### Domain-Specific Skills

**Purpose**: Encapsulate domain expertise

```markdown
---
name: smart-contract-auditor
description: Perform security audits on Ethereum smart contracts. Use when the user wants to audit Solidity contracts, check for vulnerabilities, or needs security analysis.
---

# Smart Contract Security Auditor

Comprehensive security analysis for Solidity contracts.

## Vulnerability Categories

Check for:
1. Reentrancy vulnerabilities
2. Access control issues
3. Integer overflow/underflow
4. Front-running opportunities
5. Logic errors
```
```

### Workflow Automation Skills

**Purpose**: Automate multi-step processes

```markdown
---
name: deployment-orchestrator
description: Orchestrate smart contract deployments across multiple networks. Use when the user wants to deploy contracts, needs multi-network deployment, or asks for deployment automation.
---

# Deployment Orchestrator

Manage contract deployment lifecycle across networks.

## Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism
- Testnets (Sepolia, Mumbai, etc.)

## Workflow

1. Verify compilation
2. Run tests
3. Deploy to testnet
4. Verify on explorer
5. Deploy to mainnet
```

### Analysis Skills

**Purpose**: Analyze and provide insights

```markdown
---
name: gas-optimization-analyzer
description: Analyze Solidity contracts for gas optimization opportunities. Use when the user wants to optimize contract gas usage, reduce deployment costs, or improve execution efficiency.
---

# Gas Optimization Analyzer

Find and fix gas inefficiencies in smart contracts.

## Analysis Areas

- Storage layout optimization
- Function ordering
- Loops and iterations
- Event emissions
- Mathematical operations
```

---

## Testing & Improving Skills

### Creating Test Cases

After writing a skill, create realistic test prompts:

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "Generate a React component for displaying user profiles",
      "expected_output": "Component with types, styles, and basic props",
      "files": []
    }
  ]
}
```

### Testing Workflow

1. **Write test prompts** — 2-3 realistic examples
2. **Run with skill** — Use the Skill tool
3. **Evaluate results** — Check against expected outputs
4. **Improve skill** — Refine based on feedback

### Iterating on Skills

Based on test results:
- **Generalize** from specific feedback
- **Remove** non-essential instructions
- **Bundle** common helper scripts
- **Explain** the why behind requirements

---

## Advanced Topics

### Skill Description Optimization

The description field determines triggering accuracy. To optimize:

1. Generate 20 eval queries (10 should-trigger, 10 should-not-trigger)
2. Use the optimization loop to improve triggering
3. Apply the best description to the skill

### Packaging Skills

Package skills for distribution:
```bash
python -m scripts.package_skill /path/to/skill-folder
```

This creates a `.skill` file for easy sharing and installation.

### Hook Integration

Skills can leverage Claude Code hooks for automated behaviors:
- Run on specific events (file changes, git operations)
- Execute custom validation
- Trigger pre/post actions

### MCP Server Integration

Skills can use MCP servers for extended capabilities:
- Database operations
- External API calls
- System operations

---

## Quick Reference

### Skill File Locations

| Location | Scope | Path |
|----------|-------|------|
| Global | All projects | `~/.claude/skills/<name>/` |
| Project | Specific project | `.claude/skills/<name>/` |

### Frontmatter Template

```yaml
---
name: skill-name
description: When to trigger and what it does. Be specific and "pushy".
---
```

### Skill Tool Usage

```markdown
Use the [skill-name] skill to [task]
```

### Directory Structure

```
skill/
├── SKILL.md
├── scripts/       # Executable helpers
├── references/   # Documentation
└── assets/       # Templates, resources
```

---

## Related Documentation

- Module 12: Model Context Protocol (MCP)
- Module 13: Subagents & Multi-Agent Workflows
- Module 17: Native Support & Built-in Capabilities
- Claude Code Skills Documentation

---

*Last updated: 2026-04-04*