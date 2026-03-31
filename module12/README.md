# Module 12: Model Context Protocol (MCP) - GitHub Integration

## Overview

This module introduces the **Model Context Protocol (MCP)** as a core component for connecting Claude Code with external tools, focusing on GitHub integration for streamlined development workflows.

## What Was Created

### CLAUDE.md - MCP Implementation Guide

A comprehensive guide covering:

1. **MCP Fundamentals**
   - What is MCP and why it matters
   - Architecture and component overview
   - Security considerations

2. **GitHub MCP Server Setup**
   - Prerequisites (Node.js, GitHub PAT)
   - Installation steps
   - Configuration via `.claude/mcp.json`
   - Environment variable setup

3. **Supported GitHub Workflows**
   - Pull Request operations (list, create, merge)
   - Issue tracking (create, update, query)
   - Commit history viewing
   - Branch management
   - Repository information

4. **Configuration Details**
   - JSON configuration structure
   - Multiple MCP server support
   - Security best practices
   - Token management

5. **Day-to-Day Usage Guide**
   - Feature workflow with MCP
   - PR review workflow
   - Issue management
   - Commit history queries

6. **Best Practices**
   - Do's and don'ts
   - Security guidelines
   - Troubleshooting common issues

7. **Future Extensibility**
   - Adding Jira, Notion, PostgreSQL integrations
   - Scalable configuration approach

## File Structure

```
module12/
├── CLAUDE.md    # Comprehensive MCP guide
└── README.md    # This file
```

## Key Features

### MCP Capabilities

| Category | Capabilities |
|----------|-------------|
| **PR Management** | Create, list, merge, review PRs |
| **Issue Tracking** | Create, update, query, label issues |
| **Commit History** | List, search, view commit details |
| **Branch Operations** | List, create, manage branches |
| **Repository Info** | Get metadata, contributors |

### Configuration Example

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Prerequisites

1. **Node.js 18+** installed
2. **GitHub Personal Access Token** with required scopes:
   - `repo` (Full control of private repositories)
   - `read:user` (Read user profile data)
   - `workflow` (Update GitHub Actions workflows)

## Setup Instructions

### Step 1: Generate GitHub Token

1. Go to https://github.com/settings/tokens
2. Generate new token (classic or fine-grained)
3. Select required scopes
4. Copy token (won't be shown again)

### Step 2: Install MCP Server

```bash
# Global installation
npm install -g @modelcontextprotocol/server-github

# Or local to project
npm install --save-dev @modelcontextprotocol/server-github
```

### Step 3: Configure MCP

Create `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Step 4: Set Environment Variable

```bash
# Add to .env (ensure it's in .gitignore)
GITHUB_TOKEN=ghp_your_token_here
```

## Usage Examples

### Create a Pull Request

```
User: "Create a PR for branch feature/new-token with title 'Add ERC-3643 Property Token'"
→ Claude uses MCP to create PR from feature/new-token → main
```

### Review PR Changes

```
User: "Show me the latest PR and its changed files"
→ MCP retrieves PR details and file list
```

### Issue Management

```
User: "Create an issue titled 'Fix KYC validation' with label 'bug'"
→ MCP creates issue with labels
```

### Check Commit History

```
User: "Show the last 10 commits on main"
→ MCP returns commit list with messages and authors
```

## Extending MCP

The CLAUDE.md includes configurations for adding more integrations:

```json
{
  "mcpServers": {
    "github": { ... },
    "jira": { ... },
    "notion": { ... },
    "postgres": { ... }
  }
}
```

## Git Commit

```
docs: Module 12 — MCP GitHub integration guide and configuration

- Add CLAUDE.md with comprehensive MCP documentation
- Include GitHub MCP server setup and configuration
- Document PR, issue, commit, and branch workflows
- Provide troubleshooting and best practices
- Enable future extensibility for additional MCP integrations
```

## Key Takeaways

1. **MCP enables AI-tool connectivity** - Claude can now interact with GitHub natively
2. **Standardized protocol** - Single approach for multiple tool integrations
3. **Security-first** - Token-based authentication, no API keys in prompts
4. **Extensible design** - Easy to add Jira, Notion, databases, and more
5. **Practical workflows** - Real development tasks become automated

## Next Steps

- Configure MCP in your local environment
- Test GitHub operations via Claude
- Add additional MCP servers (Jira, Notion)
- Explore automated code review workflows
- Integrate with CI/CD pipelines

---

*Module 12 Complete: MCP with GitHub Integration*