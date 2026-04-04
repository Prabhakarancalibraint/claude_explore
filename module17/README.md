# Module 17: Native Support & Built-in Capabilities

## What We Built

This module demonstrates Claude Code's native features and built-in capabilities for maximum productivity when building RWA tokenization platforms and full-stack applications.

## Capabilities Covered

| Capability | Purpose | Example Use Case |
|------------|---------|------------------|
| **Artifacts** | Reusable code snippets that persist across sessions | Generate once, use everywhere |
| **File Upload** | Analyze code, CSVs, PDFs, images | Upload contract for review |
| **Image Input** | UI debugging, design analysis | Debug layout from screenshot |
| **Web Search** | Find latest docs, APIs, solutions | Research wagmi v2 patterns |
| **Analysis Tool** | Process data, detect patterns | Analyze transaction CSV |
| **Projects** | Persistent context across sessions | Maintain project memory |
| **Shared Projects** | Team collaboration | Share context with team |

## Quick Start

### 1. Using Artifacts

Generate reusable code and save it for future use:

```
"Create a reusable Button component with variants: primary, secondary, danger.
Include loading state and icon support. Save as artifact."
```

Reference existing artifacts:
```
"Use the Button component from our UI library for the form"
```

### 2. File Upload

Drag & drop files directly into conversation:

```
"Analyze this smart contract for security vulnerabilities"
"Process this transaction CSV and show top addresses by volume"
```

### 3. Image Input

Attach screenshots for debugging:

```
"This screenshot shows broken mobile layout. The third card overflows.
Fix the CSS to make it responsive."
```

### 4. Web Search

Find latest documentation:

```
"Search for wagmi v2 wallet connection React best practices"
"What's the latest OpenZeppelin ERC-721 implementation?"
```

### 5. Projects

Maintain context across sessions - Claude remembers:

- Project conventions in CLAUDE.md
- Previous conversations and decisions
- Architectural patterns established

### 6. Shared Projects

Collaborate with team members:

- Same CLAUDE.md for all developers
- Shared context for onboarding
- Consistent patterns across team

## Practical Examples

### Example 1: Artifacts for RWA Development

Generate once, use across all contracts:

```
# Generate artifact
"Create a Solidity contract for ERC-721 minting with:
- pausable functionality
- access control (owner only)
- batch mint capability
Save as artifact 'RwaMinter' for our tokenization platform"
```

### Example 2: File Upload for Audit

Upload contracts for security review:

```
# Upload and analyze
"Analyze this ComplianceModule.sol for:
- reentrancy vulnerabilities
- access control gaps
- integer overflow risks"
```

### Example 3: Image Input for UI Debug

Debug wallet connection issues:

```
# Upload screenshot
"This error overlay appears after clicking 'Connect Wallet'.
The modal never appears. What's causing this z-index issue?"
```

### Example 4: Web Search for Integration

Research before implementing:

```
"Search for 'wagmi v2 RainbowKit React 19 integration 2026'
Find the current recommended pattern for wallet connection"
```

### Example 5: Analysis Tool for Data

Process on-chain data:

```
"Process this Dune export CSV and:
- Show total volume by token
- Identify top 10 wallets by holdings
- Calculate average transaction size"
```

## File Structure

```
module17/
├── README.md                    # This file
├── CLAUDE.md                    # Full documentation
└── examples/                    # Practical examples
    ├── artifacts/               # Saved artifacts
    │   └── Button.tsx          # Example artifact
    └── usage/                   # Usage demonstrations
        └── commands.md          # Command examples
```

## How to Use This Module

1. **Read CLAUDE.md** - Comprehensive documentation on each capability
2. **Try examples** - Practice with the practical demonstrations
3. **Apply to your project** - Use these capabilities in your RWA development workflow

## Real-World RWA Workflows

### Contract Development
```
1. Web Search: "ERC-3643 T-REX implementation guide"
2. Artifacts: Generate compliance module template
3. File Upload: Upload existing contracts for review
4. Analysis: Check for security patterns
```

### Frontend Development
```
1. Web Search: "wagmi v2 latest React patterns"
2. Image Input: Debug UI issues from screenshots
3. Artifacts: Generate reusable components
4. Projects: Maintain component library context
```

### Team Collaboration
```
1. Shared Project: Set up team context
2. Projects: Individual feature work
3. Artifacts: Share common utilities
4. File Upload: Review PRs together
```

## Key Commands

| Action | Command/Method |
|--------|----------------|
| Open artifacts | `/artifacts` or Ctrl+S |
| Search web | `WebSearch` tool |
| Fetch URL | `WebFetch` tool |
| Project selector | UI dropdown |
| Command palette | Ctrl+K |

## Next Steps

1. **Practice each capability** - Try them in your development workflow
2. **Build artifact library** - Create reusable components for your stack
3. **Set up projects** - Organize by product/module
4. **Enable team collaboration** - Create shared projects for your team

---

Built for Module 17 of the Claude Code training programme — mastering native capabilities for RWA development.