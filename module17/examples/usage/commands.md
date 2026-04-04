# Command Examples for Native Capabilities

This file demonstrates practical commands for each native capability.

---

## 1. Artifacts Commands

### Generate New Artifact

```
Create a reusable Modal component for React with:
- Animated entrance/exit using Framer Motion
- Close on backdrop click
- Escape key to close
- Modal title and footer props
Save as artifact for our UI library.
```

### Reference Existing Artifact

```
Use the Button component from our UI library artifact
to create a confirmation dialog for the transaction form.
```

### Save Current Work to Artifact

```
Save this ProgressCard component as an artifact
called 'ProgressCard' for the learning platform.
```

---

## 2. File Upload Commands

### Upload Contract for Analysis

```
Analyze this smart contract for:
- Reentrancy vulnerabilities
- Access control issues
- Integer overflow/underflow
- Front-running opportunities
Provide a detailed security report.
```

### Upload CSV for Processing

```
Process this transaction CSV and show:
- Total volume by token address
- Top 10 wallets by holdings
- Average transaction size
- Time distribution chart
```

### Upload PDF for Review

```
Summarize this technical specification PDF,
then extract the key requirements for the smart contract implementation.
```

---

## 3. Image Input Commands

### UI Debugging

```
This screenshot shows the wallet connection modal appearing behind
the navbar. The z-index seems wrong. Identify the fix and provide CSS.
```

### Design Implementation

```
Implement this button design from the Figma mockup.
Use Tailwind CSS with custom colors from our design system.
The button has a gradient background and subtle shadow.
```

### Error Analysis

```
This error appears in the console after connecting the wallet.
What's causing the 'undefined is not a function' error in useWaitForTransactionReceipt?
```

---

## 4. Web Search Commands

### Find Latest Documentation

```
Search for 'wagmi v2 wallet connection React 19 2026'
Find the current recommended pattern for wallet connection hooks.
```

### Troubleshooting

```
Search for 'TypeError Cannot read properties of undefined wagmi useAccount'
Find solutions for this common Wagmi v2 error.
```

### Best Practices

```
Search for 'ERC-3643 T-REX implementation best practices 2026'
Find the current recommended pattern for compliance modules.
```

---

## 5. Analysis Tool Commands

### Codebase Analysis

```
Analyze this Hardhat project and summarize:
- Contract structure
- Test coverage
- Deployment scripts
- Dependencies
```

### Pattern Detection

```
Find all React components that:
- Don't use memo
- Could benefit from useCallback
- Have missing prop types
Show as a table with file paths.
```

### Data Processing

```
Process this JSON export from the API and:
- Calculate average transaction value
- Group by status
- Show error rate
Format as markdown table.
```

---

## 6. Project Commands

### Create New Project Context

```
Create a new project context for our RWA tokenization platform.
Include:
- Stack: ERC-3643, Hardhat, wagmi
- Conventions from CLAUDE.md
- Current contract addresses
```

### Switch Context

```
Switch to the 'rwa-frontend-react' project and add a new page
for the portfolio dashboard following our existing patterns.
```

---

## 7. Shared Project Commands

### Onboard New Team Member

```
Set up shared context for a new team member joining the frontend team.
Include:
- Component library patterns
- API conventions
- Testing requirements
- Code review checklist
```

### Share Artifact with Team

```
Add the Button artifact to our shared UI library.
Document the props interface and usage examples.
```

---

## RWA-Specific Examples

### Smart Contract Development

```
# 1. Research
Search for 'OpenZeppelin ERC-721URIStorage latest version 2026'

# 2. Generate
Create an ERC-721 contract with:
- URI storage for metadata
- Pausable functionality
- Access control
Save as 'RwaNft' artifact

# 3. Test
Generate tests for the contract using /write-tests command
```

### Frontend Development

```
# 1. Debug
[Upload screenshot of broken modal]
This wallet modal doesn't close. Fix the onClose handler.

# 2. Search
Search for 'wagmi v2 useWriteContract error handling'

# 3. Implement
Use the useWallet artifact to add transaction confirmation
to the mint form with proper loading states.
```

### Data Analysis

```
# Upload transaction CSV
Process this Dune export and show:
- Volume by token over time
- Top holders
- Transaction frequency
Format as actionable insights.
```

---

## Quick Reference

| Capability | Trigger |
|------------|---------|
| Artifacts | Slash command or Ctrl+S |
| File Upload | Drag & drop file |
| Image Input | Attach image |
| Web Search | `WebSearch` tool |
| Analysis | Direct conversation |
| Projects | Project selector UI |
| Shared Projects | Invite via UI |