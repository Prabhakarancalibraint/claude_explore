# CLAUDE.md - Module 17: Native Support & Built-in Capabilities

This document provides comprehensive guidance on leveraging Claude Code's native features and built-in capabilities for maximum productivity.

---

## Overview: Claude's Native Capabilities

Claude Code provides a rich set of built-in tools and features designed to enhance developer productivity. These capabilities span code generation, file analysis, web research, data processing, and collaborative workflows.

### Core Native Features

| Capability | Primary Use | Access Method |
|------------|-------------|---------------|
| **Artifacts** | Generate reusable code snippets, components, docs | Slash command `/artifacts` or natural language |
| **File Upload** | Analyze code, CSVs, PDFs, images | Drag & drop or attach files |
| **Image Input** | UI debugging, design analysis, screenshots | Attach images in conversation |
| **Web Search** | Latest documentation, API references, updates | Use `WebSearch` tool directly |
| **Analysis Tool** | Data processing, insights, pattern detection | Built into conversation context |
| **Projects** | Persistent context across sessions | Project selection in UI |
| **Shared Projects** | Team collaboration, shared context | Invite team members to project |

---

## Artifacts

### What Are Artifacts?

Artifacts are persistent, reusable code snippets or documents that Claude can generate and save for future use. They persist across sessions and can be referenced by other team members.

### When to Use Artifacts

- **Component generation**: Create reusable React components, NestJS services, or Solidity contracts
- **Configuration templates**: Generate config files for Vite, TypeScript, or Hardhat
- **API documentation**: Create reusable API docs, OpenAPI specs
- **Testing templates**: Generate test suites, fixtures, or mock data
- **Documentation**: Create architectural decision records, runbooks

### How to Use Artifacts

```
# Generate an artifact using natural language
"Create a reusable Button component with variants: primary, secondary, danger.
Include loading state and icon support. Export as artifact for the UI library."

# Reference an existing artifact
"Use the Button component from our UI library artifact to build a form."
```

### Real-World Use Cases

**RWA (Real-World Asset) Stack**:
- Generate reusable token minting components for ERC-721/ERC-1155 contracts
- Create deployment scripts for multiple networks (mainnet, sepolia, arbitrum)
- Build reusable hook templates for wallet connection ( wagmi + viem)

**React + Vite Projects**:
- Generate page templates with routing boilerplate
- Create form components with validation (React Hook Form + Zod)
- Build component variants using Tailwind or CSS modules

**NestJS Backends**:
- Generate CRUD service templates with DTOs
- Create authentication guards and decorators
- Build database entity templates for TypeORM/Prisma

### Best Practices

1. **Name artifacts descriptively**: Use clear names like `WalletConnectButton` not `Button1`
2. **Include JSDoc comments**: Document props, return types, and usage
3. **Make them composable**: Design artifacts to work well with other components
4. **Version artifacts**: Track changes when updating shared artifacts
5. **Use in CLAUDE.md**: Reference project-specific artifacts in your project documentation

---

## File Upload

### What Is File Upload?

File upload allows you to attach files directly to your conversation for Claude to analyze, modify, or use as context.

### When to Use File Upload

- **Code review**: Upload files for detailed analysis
- **Data analysis**: Attach CSVs for processing, Excel files for insights
- **PDF documentation**: Upload specifications, API docs, or design docs
- **Error logs**: Attach stack traces for debugging
- **Configuration files**: Share complex configs for troubleshooting

### Supported File Types

- **Code files**: `.js`, `.ts`, `.jsx`, `.tsx`, `.py`, `.sol`, `.java`, etc.
- **Data files**: `.csv`, `.xlsx`, `.json`, `.xml`
- **Documents**: `.pdf`, `.md`, `.txt`
- **Images**: `.png`, `.jpg`, `.jpeg` (for UI analysis)
- **Config files**: `.yaml`, `.yml`, `.toml`, `.env`

### How to Use File Upload

```
# Upload and analyze
"Analyze this smart contract and identify potential security vulnerabilities."

# Upload and refactor
"Refactor this NestJS service to use dependency injection properly."

# Upload and test
"Create a test suite for this React component based on its current implementation."
```

### Real-World Use Cases

**Smart Contract Auditing**:
- Upload `.sol` files for security vulnerability analysis
- Review deployed contract ABIs for interface issues
- Analyze gas optimization opportunities

**API Development**:
- Upload Postman collections or OpenAPI specs
- Review existing services for refactoring opportunities
- Analyze database schemas for migration planning

**Data Processing**:
- Analyze CSV exports from on-chain data ( Dune, Etherscan)
- Process Excel reports for portfolio tracking
- Parse JSON data exports for dashboard creation

### Best Practices

1. **Provide context**: Tell Claude what you want to achieve with the file
2. **Limit file size**: Keep files under 10MB for optimal performance
3. **Specify format**: If uploading CSVs, describe column structure
4. **Ask for summary first**: "Summarize this file first, then help me refactor"
5. **Use for complex files**: Best for files you can't easily copy-paste

---

## Image Input

### What Is Image Input?

Image input allows Claude to analyze screenshots, UI mockups, and visual designs to provide debugging insights or design feedback.

### When to Use Image Input

- **UI debugging**: Attach screenshots of broken layouts or bugs
- **Design review**: Share Figma exports or mockups for implementation guidance
- **Error analysis**: Upload error screen screenshots for context
- **Architecture diagrams**: Analyze system architecture diagrams
- **Contract code review**: Review code screenshots for inline feedback

### How to Use Image Input

```
# UI debugging
"This screenshot shows a broken grid layout on mobile. The third card is overflowing.
Fix the CSS to make it responsive."

# Design implementation
"Implement this button design from the Figma mockup. Use Tailwind with custom colors."

# Error analysis
"This error screen appears after connecting the wallet. What's causing the overlay z-index issue?"
```

### Real-World Use Cases

**RWA Development**:
- Analyze transaction UI issues in portfolio dashboards
- Review token transfer modals for UX improvements
- Debug wallet connection flow issues

**React Frontend**:
- Fix responsive layout issues from screenshots
- Implement designs from Figma exports
- Debug hydration errors with component screenshots

**Mobile/Tailwind Issues**:
- Analyze mobile viewport issues
- Review responsive breakpoints
- Debug dark mode implementation

### Best Practices

1. **Crop to relevant area**: Focus on the specific issue rather than full page
2. **Describe the issue**: "The red button should be blue, not the header"
3. **Include dev tools**: Screenshots with console errors are more helpful
4. **Provide expected behavior**: Tell Claude what should happen vs. what's happening
5. **Follow up with code**: After image analysis, ask for code fixes

---

## Web Search

### What Is Web Search?

Web search allows Claude to find the latest documentation, API references, and updates from the web.

### When to Use Web Search

- **API updates**: Find latest version docs for libraries
- **Troubleshooting**: Search for error messages or known issues
- **Best practices**: Find current recommended patterns
- **Security advisories**: Check for CVE or vulnerability disclosures
- **Library comparison**: Evaluate options before choosing dependencies

### How to Use Web Search

```
# Direct search
"Search for 'wagmi v2 wallet connection React' to find the latest documentation."

# Ask with search context
"What's the current best practice for implementing ERC-721 token transfers in 2026?"

# Troubleshooting
"Search for 'Hardhat deploy script gas estimation' to find examples."
```

### Real-World Use Cases

**Library Updates**:
- Find latest Vite 8 configuration options
- Search for React Router v7 routing patterns
- Check NestJS v10 new features

**Smart Contract Development**:
- Find latest OpenZeppelin contract versions
- Search for gas-optimized ERC-20 implementations
- Research Layer 2 deployment best practices (Arbitrum, Optimism)

**Error Troubleshooting**:
- Search for "TypeError Cannot read property of undefined React"
- Find known issues with wagmi + RainbowKit integration
- Research "JSON-RPC error" solutions for specific networks

### Best Practices

1. **Be specific**: Include version numbers and framework names
2. **Search first, code second**: Use search for unfamiliar areas
3. **Verify freshness**: Check dates - some docs may be outdated
4. **Combine with code knowledge**: Use search results with your codebase context
5. **Use for research**: Ideal for exploration tasks before implementation

---

## Analysis Tool

### What Is the Analysis Tool?

Analysis tool refers to Claude's built-in ability to process and derive insights from code, data, and documents. This includes pattern detection, code review, data processing, and architectural analysis.

### When to Use Analysis Tool

- **Codebase analysis**: Understand large codebases quickly
- **Pattern detection**: Find repeated patterns or anti-patterns
- **Data insights**: Process and summarize CSV/JSON data
- **Architecture review**: Analyze component relationships
- **Dependency analysis**: Understand import graphs and dependencies

### How to Use Analysis Tool

```
# Codebase analysis
"Analyze this NestJS project and summarize the module structure and dependencies."

# Pattern detection
"Find all React components that aren't using memo and could benefit from optimization."

# Data analysis
"Process this transaction CSV and show me the top 10 addresses by volume."

# Architecture review
"Create a diagram of the component hierarchy in this React app."
```

### Real-World Use Cases

**RWA Portfolio Analysis**:
- Analyze on-chain transaction data for patterns
- Process wallet history for tax reporting
- Summarize DeFi position changes

**Codebase Understanding**:
- Quick overview of unfamiliar projects
- Identify unused code or dead paths
- Find security anti-patterns (hardcoded keys, missing validation)

**Data Processing**:
- Parse smart contract event logs
- Aggregate CSV data from multiple sources
- Generate insights from JSON API responses

### Best Practices

1. **Be specific about output**: "Show me as a table" or "Summarize in bullet points"
2. **Iterate on analysis**: Start broad, then refine
3. **Combine with file upload**: Upload files for deeper analysis
4. **Use for exploration**: Great for understanding unfamiliar code
5. **Ask for actionable insights**: Don't just analyze - ask "what should I do next?"

---

## Projects

### What Are Projects?

Projects provide persistent context across Claude sessions. Each project has its own CLAUDE.md and maintains conversation history, allowing Claude to understand your project's context over time.

### When to Use Projects

- **Ongoing development**: Maintain context across multiple sessions
- **Multiple projects**: Keep separate contexts for different projects
- **Knowledge retention**: Preserve architectural decisions and patterns
- **Personalization**: Tailor Claude's behavior to project needs

### How to Use Projects

```
# Create or switch projects
# Use the project selector in Claude Code UI

# Within a project, reference context
"Based on our earlier discussion about the auth flow, add password reset functionality."

# Reference project-specific conventions
"Use the patterns we established in CLAUDE.md for the new service."
```

### Project Structure

```
my-project/
├── CLAUDE.md              # Project context and conventions
├── src/
│   ├── api/              # API integrations
│   ├── components/       # React components
│   ├── services/         # Business logic
│   └── types/            # TypeScript definitions
├── tests/
├── docs/
└── README.md
```

### Real-World Use Cases

**RWA Development**:
- Project for each token standard (ERC-721, ERC-1155, ERC-4626)
- Separate projects for mainnet vs. testnet configurations
- Projects for different protocols (Uniswap, Aave, Compound)

**Full-Stack Applications**:
- React frontend project with component library context
- NestJS backend project with service patterns
- Shared project for common types and utilities

**Team Projects**:
- Individual projects for different features
- Shared project for common infrastructure

### Best Practices

1. **Create comprehensive CLAUDE.md**: Document patterns, conventions, and expectations
2. **Keep projects focused**: One project per logical application or module
3. **Update CLAUDE.md regularly**: Add new patterns as they emerge
4. **Use consistent naming**: `project-name-stack` format helps (e.g., `rwa-frontend-react`)
5. **Leverage memory system**: Store team conventions in project memory

---

## Shared Projects

### What Are Shared Projects?

Shared projects allow multiple team members to collaborate using a shared context. All team members see the same CLAUDE.md, project files, and can continue each other's conversations.

### When to Use Shared Projects

- **Team collaboration**: Multiple developers working on the same codebase
- **Knowledge transfer**: Onboard new team members with shared context
- **Pair programming**: Work together on complex features
- **Code review**: Shared context for consistent feedback
- **Architectural decisions**: Maintain team-wide conventions

### Setting Up Shared Projects

1. **Create project**: Initialize a new project in Claude Code
2. **Upload key files**: Add CLAUDE.md, architecture docs, API specs
3. **Invite team members**: Share project access with team
4. **Maintain together**: Update shared context as project evolves

### Key Files to Share

```
# Essential files for shared projects
├── CLAUDE.md                     # Project conventions and patterns
├── docs/
│   ├── architecture.md          # System architecture decisions
│   ├── api-spec.md              # API specifications
│   └── deployment.md            # Deployment guides
├── src/
│   ├── types/                    # Shared type definitions
│   └── constants/                # Shared constants
└── configs/
    ├── tsconfig.json            # TypeScript config
    └── .eslintrc.json           # Linting rules
```

### Real-World Use Cases

**RWA Team Development**:
- Shared project for smart contract development team
- Common types for token standards across projects
- Shared deployment configurations for multiple networks

**Frontend Team**:
- Component library with documented patterns
- Shared API client with consistent error handling
- Common hooks and utilities

**Full-Stack Team**:
- Shared types between frontend and backend
- Consistent authentication patterns
- Unified error handling conventions

### Best Practices

1. **Document everything**: Comprehensive CLAUDE.md is critical
2. **Version control CLAUDE.md**: Track changes in git
3. **Assign ownership**: Someone responsible for maintaining context
4. **Regular reviews**: Clean up outdated information quarterly
5. **Onboard new members**: Use shared project for setup

---

## Claude Projects for Team Workflows

### Setting Up Projects Per Product/Module

Structure your projects to match your product architecture:

```
# RWA Protocol Structure
rwa-protocol/
├── rwa-protocol-core/         # Smart contracts project
├── rwa-protocol-frontend/    # React frontend project
├── rwa-protocol-backend/     # NestJS backend project
└── rwa-protocol-shared/      # Shared types and utilities
```

### Uploading Key Files

**CLAUDE.md** (required):
```markdown
---
name: rwa-frontend
description: React frontend for RWA protocol dashboard
type: project
---

# Project Context

## Technology Stack
- React 19, Vite 8, TypeScript
- Tailwind CSS, Framer Motion
- wagmi v2 for wallet connection
- TanStack Query for data fetching

## Conventions
- Components: PascalCase, co-located tests
- Hooks: use prefix, camelCase
- API: REST with /api prefix
- State: TanStack Query for server state

## Code Style
- Use Tailwind for styling
- Functional components with hooks
- TypeScript strict mode
```

**Architecture Docs**:
- System architecture diagrams
- Data flow documents
- API specifications
- Database schemas

**API Specs**:
- OpenAPI/Swagger documentation
- Postman collections
- Endpoint documentation

### Maintaining Shared Context

1. **Weekly updates**: Review and update CLAUDE.md weekly
2. **Document decisions**: Add ADRs (Architectural Decision Records)
3. **Track patterns**: Note new patterns as they emerge
4. **Clean up**: Remove outdated context regularly
5. **Share learnings**: Update team on new discoveries

---

## Productivity Best Practices

### Maximizing Claude's Capabilities

1. **Provide context**: More context = better results
2. **Be specific**: Clear requirements = accurate outputs
3. **Iterate gradually**: Build up solutions piece by piece
4. **Use the right tool**: Match capability to task
5. **Leverage memory**: Store reusable knowledge

### Capability Selection Guide

| Task | Primary Capability | Secondary |
|------|-------------------|------------|
| Generate component | Artifacts | File Upload |
| Debug issue | Image Input | Web Search |
| Research library | Web Search | Analysis |
| Process data | File Upload | Analysis |
| Team collaboration | Shared Projects | Projects |
| Code review | File Upload | Analysis |

### Common Patterns

**Quick Start**:
```
"Create a new React component for X using our existing patterns.
Use the Button artifact from our UI library."
```

**Debug Flow**:
```
1. Upload screenshot of bug
2. "What's causing this layout issue?"
3. Ask for code fix
4. Apply and verify
```

**Research Flow**:
```
1. "Search for latest docs on X library"
2. Review results
3. "Now implement using these patterns"
```

**Team Workflow**:
```
1. Switch to shared project
2. "Add authentication flow following our patterns"
3. Document new pattern in CLAUDE.md
4. Team member continues from where you left off
```

---

## Quick Reference

### Slash Commands

- `/artifacts` - Open artifacts panel
- `/help` - Get help with Claude Code
- `/clear` - Clear conversation

### Tool Reference

| Tool | Purpose | Syntax |
|------|---------|--------|
| `Read` | Read files | `Read path/to/file` |
| `Edit` | Edit files | `Edit file_path old_string new_string` |
| `Write` | Create files | `Write path content` |
| `Bash` | Run commands | `Bash command` |
| `Grep` | Search content | `Grep pattern` |
| `Glob` | Find files | `Glob pattern` |
| `WebSearch` | Search web | `WebSearch query` |
| `WebFetch` | Fetch URL | `WebFetch url prompt` |

### Keyboard Shortcuts

- `Ctrl+S` - Save to artifact
- `Ctrl+Enter` - Submit message
- `Ctrl+K` - Command palette

---

## Related Documentation

- Module 13: Subagents & Multi-Agent Workflows
- Module 01 Task 2: Reference implementation for component patterns
- Claude Code documentation: https://docs.claude.ai

---

*Last updated: 2026-04-04*