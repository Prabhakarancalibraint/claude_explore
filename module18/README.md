# Module 18: Custom Skills & Slash Commands

## What We Built

This module demonstrates how to create custom skills and slash commands in Claude Code to automate workflows, encapsulate domain expertise, and extend Claude's capabilities for your specific needs.

## Skills vs Slash Commands

| Feature | Skills | Slash Commands |
|---------|--------|-----------------|
| **Activation** | Context-based (description triggers) | Explicit (starts with `/`) |
| **Structure** | YAML frontmatter + markdown body | Markdown prompt file |
| **Flexibility** | General-purpose automation | Specific task execution |
| **Use case** | Complex workflows, domain expertise | Quick actions, templates |

## Quick Start

### 1. Create Your First Skill

```bash
mkdir -p ~/.claude/skills/my-skill
```

Create `SKILL.md`:
```markdown
---
name: my-skill
description: What this skill does and when to trigger it
---

# Skill Name

Instructions for the skill...
```

### 2. Invoke the Skill

```markdown
Use the my-skill skill to [task]
```

### 3. Test and Iterate

Run test prompts, evaluate outputs, improve the skill description.

## Skill Structure

```
my-skill/
├── SKILL.md              # Required
├── scripts/              # Optional: helper scripts
├── references/          # Optional: documentation
└── assets/              # Optional: templates
```

## Example Skills

### 1. Code Generation

- `react-component-generator`: Create React components with TypeScript
- `solidity-contract-template`: Generate Solidity contract templates
- `api-client-generator`: Create API client libraries

### 2. Domain Expertise

- `smart-contract-auditor`: Security analysis for Solidity
- `rwa-compliance-checker`: ERC-3643 compliance verification
- `gas-optimization-analyzer`: Gas efficiency analysis

### 3. Workflow Automation

- `deployment-orchestrator`: Multi-network contract deployment
- `test-runner`: Execute test suites with reporting
- `pr-reviewer`: Automated PR analysis and feedback

### 4. Analysis

- `codebase-analyzer`: Architecture and pattern detection
- `dependency-explorer`: Import graph analysis
- `security-scanner`: Vulnerability detection

## How to Install Custom Skills

### Global Installation

```bash
# Copy skill to global skills directory
cp -r my-skill/ ~/.claude/skills/
```

### Project Installation

```bash
# Copy skill to project
mkdir -p .claude/skills
cp -r my-skill/ .claude/skills/
```

## Usage Examples

### Generate a Smart Contract

```
Use the solidity-contract-template skill to create an ERC-721 contract for digital art
```

### Audit Security

```
Use the smart-contract-auditor skill to check this contract for reentrancy vulnerabilities
```

### Deploy Contracts

```
Use the deployment-orchestrator skill to deploy to sepolia and mainnet
```

## Best Practices

1. **Clear descriptions**: Make skill descriptions specific and "pushy"
2. **Progressive disclosure**: Keep SKILL.md under 500 lines
3. **Bundle helpers**: Include scripts for common operations
4. **Test thoroughly**: Create test cases and iterate
5. **Document references**: Use references for detailed documentation

## File Structure

```
module18/
├── README.md                    # This file
├── CLAUDE.md                    # Full documentation
└── examples/                    # Example skills
    └── skills/                  # Sample skill implementations
        └── example-skill/
            └── SKILL.md
```

## Key Components

### SKILL.md Frontmatter

```yaml
---
name: skill-identifier
description: When to trigger + what it does (be specific!)
---
```

### Bundled Resources

- **scripts/**: Executable code for deterministic tasks
- **references/**: Documentation loaded as needed
- **assets/**: Templates and static resources

## Testing Skills

1. Write 2-3 realistic test prompts
2. Run each with the skill active
3. Evaluate outputs against expected results
4. Refine skill based on feedback
5. Repeat until satisfied

## Next Steps

1. **Identify repetitive tasks** in your workflow
2. **Design skills** to automate those tasks
3. **Create test cases** to validate skill behavior
4. **Iterate** based on real usage
5. **Share** skills with your team

---

Built for Module 18 of the Claude Code training programme — mastering custom skills for RWA development.