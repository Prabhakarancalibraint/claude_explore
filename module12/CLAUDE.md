# CLAUDE.md - Module 12: Model Context Protocol (MCP)

This document provides comprehensive guidance on using the Model Context Protocol (MCP) in this project, with a primary focus on GitHub integration for streamlined development workflows.

---

## Overview: What is MCP?

The **Model Context Protocol (MCP)** is an open protocol that enables AI assistants like Claude to connect with external tools and services. MCP acts as a standardized bridge, allowing AI to interact with APIs, databases, and development tools in a secure, controlled manner.

### Why MCP Matters

| Benefit | Description |
|---------|-------------|
| **Tool Integration** | Connect Claude to GitHub, Jira, Notion, databases, and more |
| **Standardized Interface** | Single protocol for multiple tool integrations |
| **Security** | Authentication managed per server, no API keys in prompts |
| **Extensibility** | Easy to add new integrations as needed |
| **Context Awareness** | AI gains real-time access to external data sources |

---

## MCP in This Project

This project uses MCP to enhance development productivity by integrating Claude with GitHub for:

- **Pull Request Management**: Create, review, and merge PRs
- **Issue Tracking**: Create, update, and query issues
- **Commit Operations**: View history, create commits
- **Branch Management**: List, create, and manage branches
- **Code Reviews**: Retrieve and analyze PR reviews

### Architecture

```
┌─────────────────────┐      ┌─────────────────────┐
│   Claude Code CLI   │◄────►│   MCP Clients       │
│                     │      │   (Claude Code)     │
└─────────────────────┘      └──────────┬──────────┘
                                        │
                       ┌────────────────┼────────────────┐
                       │                │                │
                       ▼                ▼                ▼
              ┌────────────────┐ ┌───────────┐  ┌──────────────┐
              │  GitHub MCP    │ │  Jira     │  │   Notion     │
              │  Server        │ │  Server   │  │   Server     │
              └────────────────┘ └───────────┘  └──────────────┘
```

---

## GitHub MCP Server Setup

### Prerequisites

1. **GitHub Personal Access Token (PAT)**
   - Go to: https://github.com/settings/tokens
   - Generate new token with scopes:
     - `repo` (Full control of private repositories)
     - `read:user` (Read user profile data)
     - `workflow` (Update GitHub Actions workflows)

2. **Node.js 18+** installed

### Installation

```bash
# Install the GitHub MCP server
npm install -g @modelcontextprotocol/server-github

# Or install locally in the project
npm install --save-dev @modelcontextprotocol/server-github
```

### Configuration

Create the MCP configuration file at `.claude/mcp.json`:

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

### Environment Variable Setup

Add to your `.env` file (add to `.gitignore`):

```bash
# .env
GITHUB_TOKEN=ghp_your_personal_access_token_here
```

Or export temporarily:

```bash
export GITHUB_TOKEN=ghp_your_personal_access_token_here
```

### Verification

Test the MCP connection:

```bash
# List configured MCP servers
claude --list-mcp

# Test GitHub connection (via MCP tools)
# In Claude, try: "List the recent PRs in this repository"
```

---

## Supported GitHub Workflows

### 1. Pull Request Operations

| Operation | MCP Tool | Description |
|-----------|----------|-------------|
| List PRs | `github_list_pull_requests` | Get open/closed PRs |
| Create PR | `github_create_pull_request` | Create new PR from branch |
| Get PR Details | `github_get_pull_request` | Retrieve PR metadata |
| Merge PR | `github_merge_pull_request` | Merge via CLI |
| Get PR Files | `github_get_pull_request_files` | List changed files |

**Example Usage:**

```
User: "Create a PR for branch feature/new-token with title 'Add ERC-3643 Property Token'"
→ MCP creates PR from branch feature/new-token → main
```

### 2. Issue Tracking

| Operation | MCP Tool | Description |
|-----------|----------|-------------|
| List Issues | `github_list_issues` | Get repository issues |
| Create Issue | `github_create_issue` | Create new issue |
| Get Issue | `github_get_issue` | Retrieve issue details |
| Update Issue | `github_update_issue` | Modify issue state/labels |

**Example Usage:**

```
User: "Create an issue titled 'Fix KYC validation edge case' with label 'bug'"
→ MCP creates issue with appropriate labels
```

### 3. Commit History

| Operation | MCP Tool | Description |
|-----------|----------|-------------|
| List Commits | `github_list_commits` | View commit history |
| Get Commit | `github_get_commit` | Get commit details |
| Search Commits | Search via list_commits | Find commits by message |

**Example Usage:**

```
User: "Show me the last 5 commits on main branch"
→ MCP returns commit list with hashes, messages, authors
```

### 4. Branch Management

| Operation | MCP Tool | Description |
|-----------|----------|-------------|
| List Branches | `github_list_branches` | Get all branches |
| Get Branch | `github_get_branch` | Get branch info |
| Create Branch | `github_create_branch` | Create new branch |

### 5. Repository Operations

| Operation | MCP Tool | Description |
|-----------|----------|-------------|
| Get Repo Info | `github_get_repository` | Repository metadata |
| List Contributors | `github_list_contributors` | Contributor statistics |

---

## Configuration Details

### MCP Configuration File Structure

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "jira": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-jira"
      ],
      "env": {
        "JIRA_API_TOKEN": "${JIRA_TOKEN}",
        "JIRA_EMAIL": "${JIRA_EMAIL}",
        "JIRA_DOMAIN": "${JIRA_DOMAIN}"
      }
    }
  }
}
```

### Configuration Precedence

1. **Environment Variables**: `${VAR_NAME}` syntax in mcp.json
2. **Claude Settings**: User-level MCP configuration
3. **Project-Level**: `.claude/mcp.json` (gitignored)

### Security Best Practices

- **Never commit tokens**: Add `.env` and MCP config to `.gitignore`
- **Use scoped tokens**: Grant minimum required permissions
- **Rotate tokens**: Regenerate PATs periodically
- **Use .env files**: Keep secrets out of configuration files

---

## Day-to-Day Usage Guide

### Starting a New Feature with MCP

```bash
# 1. Create branch via gh CLI or git
git checkout -b feature/new-feature

# 2. Make commits
git add .
git commit -m "feat: add new feature"

# 3. Push branch
git push -u origin feature/new-feature

# 4. In Claude, ask: "Create a PR for feature/new-feature"
# MCP will create PR automatically
```

### Reviewing PRs with MCP

```
User: "Show me the latest PR and its changes"
→ MCP retrieves PR details + changed files

User: "What files were changed in PR #42?"
→ MCP returns list of modified files

User: "Get the review comments on PR #42"
→ MCP retrieves review conversation
```

### Issue Workflow

```
User: "What's the status of issue 'Deploy to Sepolia'?"
→ MCP queries issue, returns state/labels/comments

User: "Add label 'priority' to issue #23"
→ MCP updates issue with label
```

### Checking Commit History

```
User: "Show commits from user 'octocat' in the last week"
→ MCP filters and returns relevant commits

User: "Find commits containing 'PropertyToken'"
→ MCP searches commit messages
```

---

## Best Practices

### Do

- **Use descriptive PR titles**: Makes MCP operations clearer
- **Keep labels consistent**: Standardized labels improve issue management
- **Link PRs to issues**: Use "Closes #123" in PR descriptions
- **Review before merging**: Always verify MCP actions in GitHub UI
- **Test configuration**: Verify MCP works before starting work

### Don't

- **Don't skip token rotation**: Regularly update PATs
- **Don't over-permission tokens**: Grant only needed scopes
- **Don't ignore MCP errors**: Check output for authentication issues
- **Don't mix environments**: Use different tokens for work vs. personal repos
- **Don't skip .gitignore**: Ensure tokens aren't committed

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| MCP not connecting | Verify token is set: `echo $GITHUB_TOKEN` |
| Permission denied | Check token has required scopes |
| Server not found | Reinstall: `npm install -g @modelcontextprotocol/server-github` |
| Rate limited | Wait or use authenticated requests |

### Debug Commands

```bash
# Check MCP status
claude mcp list

# Test token validity
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Reconfigure MCP
# Edit .claude/mcp.json and restart Claude
```

---

## Future Extensibility

### Adding More MCP Integrations

This configuration supports easy addition of new MCP servers:

```json
{
  "mcpServers": {
    "github": { ... },
    "jira": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-jira"],
      "env": {
        "JIRA_API_TOKEN": "${JIRA_TOKEN}",
        "JIRA_EMAIL": "${JIRA_EMAIL}",
        "JIRA_DOMAIN": "${JIRA_DOMAIN}"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_KEY}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

### Planned Integrations

| Service | Use Case | Status |
|---------|----------|--------|
| Jira | Issue tracking | Configurable |
| Notion | Documentation | Configurable |
| PostgreSQL | Database queries | Configurable |
| Slack | Notifications | Configurable |
| Linear | Project management | Configurable |

---

## Quick Reference

| Task | MCP Command |
|------|-------------|
| List open PRs | `github_list_pull_requests` |
| Create PR | `github_create_pull_request` |
| List issues | `github_list_issues` |
| Create issue | `github_create_issue` |
| List branches | `github_list_branches` |
| View commits | `github_list_commits` |
| Get repo info | `github_get_repository` |

---

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [GitHub MCP Server](https://github.com/modelcontextprotocol/server-github)
- [GitHub API Reference](https://docs.github.com/en/rest)
- [Creating Personal Access Tokens](https://github.com/settings/tokens)

---

*Last updated: 2026-03-31*