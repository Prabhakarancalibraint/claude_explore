# CLAUDE.md - Module 16: Levelling Up Prompting

## Project Overview

- **Project Name**: Levelling Up Prompting
- **Project Type**: Meta-learning documentation for prompt engineering mastery
- **Tech Stack**: RWA Smart Contracts (Solidity/Hardhat), React 19/Vite, NestJS, TypeScript

---

## Overview: The 5 Levels of Prompt Mastery

Prompt engineering is a skill that evolves through distinct maturity levels. Moving from Level 1 to Level 5 transforms you from someone who gets mediocre responses to someone who consistently obtains high-quality, production-ready outputs.

### The Maturity Model

| Level | Name | Description | Characteristic |
|-------|------|-------------|-----------------|
| **1** | Novice | Vague, broad requests | "Do X" without context |
| **2** | Intermediate | Basic specificity | States what but not how |
| **3** | Advanced | Context-rich prompts | Provides background and constraints |
| **4** | Expert | Structured prompts | Uses formats, examples, explicit structure |
| **5** | Master | Multi-turn refinement | Iterative improvement, self-critique |

---

## Level 1: The Novice

**Characteristics:**
- Extremely vague prompts
- No context or background
- No specific requirements
- Expects Claude to "just know"

**Example Level 1 Prompts:**
```
"Write a smart contract"
"Fix my React component"
"Create an API"
```

**Why It Fails:**
- Claude has no idea what domain you're working in
- No constraints (gas optimization, testing, security)
- No guidance on coding style or patterns
- Results are generic and often unusable

**Real-World Scenario:**
```
# Level 1: "Write a token contract"
```
This might produce an ERC-20 without knowing:
- Is it upgradeable?
- Does it need pausable functionality?
- What's the token standard required?
- Should it have snapshots?
- Any regulatory requirements (KYC, compliance)?

---

## Level 2: The Intermediate

**Characteristics:**
- States the general domain
- Mentions the desired outcome
- Basic requirements included
- Still lacks context

**Example Level 2 Prompts:**
```
"Write an ERC-20 token contract in Solidity"
"Create a React login form with validation"
"Build a NestJS auth controller"
```

**Improvement Over Level 1:**
- Specifies the token standard
- Identifies the framework
- Hints at functional requirements

**Still Missing:**
- No project context (existing patterns to follow)
- No security considerations
- No testing requirements
- No integration requirements

**Real-World Scenario:**
```
# Level 2: "Write an ERC-20 token contract"
```
Better than Level 1, but produces a basic token without:
- Upgradeability (UUPS or proxy pattern?)
- Access control details
- Minting/burning capabilities
- Snapshot functionality for governance
- Integration with existing infrastructure

---

## Level 3: The Advanced

**Characteristics:**
- Rich context about the project
- Explicit constraints and requirements
- Mentions related systems
- States the "why" behind the request

**Example Level 3 Prompts:**
```
"Write an ERC-20 token contract for an RWA (real-world asset) platform
that represents fractional ownership of real estate. The contract should:
- Support KYC verification via AccessControl
- Be pausable for regulatory compliance
- Include snapshot functionality for governance votes
- Be upgradeable using UUPS pattern

Our project uses OpenZeppelin contracts and follows their best practices."
```

**What Makes This Work:**
- Clear domain (RWA platform)
- Specific functionality requirements
- Identifies security considerations
- Specifies upgrade pattern
- Mentions existing codebase context

**Structure:**
- What to build
- Why it's needed
- Key requirements
- Existing codebase context

---

## Level 4: The Expert

**Characteristics:**
- Uses structured prompting formats
- Provides examples (few-shot)
- Explicitly states output format
- Includes constraints and success criteria

**Example Level 4 Prompts:**

```
<context>
You are working on an RWA (real-world asset) fractional ownership platform.
The codebase is in /home/xavier-praveen/Workspace/RWA/smartcontract/.
We use Hardhat for development, OpenZeppelin contracts, and follow their
security best practices. Testing uses Hardhat and Waffle.
</context>

<task>
Create an ERC-4626 vault contract for yield-bearing USDC positions.
The vault should:
- Accept USDC deposits and mint vault tokens
- Track share price per deposited asset
- Support deposit/withdraw with slippage protection
- Be upgradeable via UUPS pattern
- Include access control with MINTER_ROLE, PAUSE_ROLE, ADMIN_ROLE
</task>

<constraints>
- Use OpenZeppelin contracts only
- Follow gas optimization best practices
- Include NatSpec comments for all public functions
- Output must be production-ready with:
  - NatSpec documentation
  - NatSpec events for important state changes
  - Reentrancy guards on state-changing functions
</constraints>

<output_format>
1. Contract code with NatSpec
2. Deployment script using hardhat-deploy
3. Unit tests covering:
   - Deposit with slippage protection
   - Withdraw functionality
   - Access control enforcement
   - Upgradeability verification
</output_format>
```

**Why This Works:**
- Structured format allows easy scanning
- Examples provide clarity
- Explicit output format reduces iteration
- Constraints guide the solution

---

## Level 5: The Master

**Characteristics:**
- Multi-turn refinement workflow
- Builds on previous responses
- Iterative improvement
- Self-critique and validation
- Knows when to ask clarifying questions

**Example Level 5 Workflow:**

**Turn 1:**
```
Create an ERC-4626 vault contract following the requirements in my previous
context. Focus on the core deposit and withdraw logic first. I'll review
before we add access control.
```

**Turn 2:**
```
Good, the deposit logic looks correct. Now add:
1. UUPS upgradeability
2. Access control with MINTER_ROLE, PAUSE_ROLE, ADMIN_ROLE
3. Pausable functionality

Keep the same patterns we established in the core logic.
```

**Turn 3:**
```
Now add comprehensive tests:
- Unit tests for deposit, withdraw, and share calculation
- Access control tests for each role
- Upgradeability verification test

Use Hardhat/Waffle testing patterns as in our existing test suite.
```

**Turn 4:**
```
The tests look good. Let's add:
1. Deployment scripts for mainnet and testnet
2. Integration test demonstrating a complete deposit-withdraw cycle
3. Gas optimization review - suggest any improvements

Make sure deployment scripts follow our existing pattern in deploy/.
```

**What Makes This Masterful:**
- Breaks large tasks into manageable chunks
- Reviews and iterates on each phase
- Builds on previous work consistently
- Maintains quality at each step

---

## Practical Transformation: Before → After

### Transforming a Simple Request

**Level 1 (Before):**
```
"Create a React login form"
```

**Level 5 (After):**
```
<context>
Building a React 19 login page for an RWA platform. Existing patterns:
- Components in src/components/ use CSS modules
- We use react-hook-form for validation
- Authentication flows through NestJS backend at /api/auth
- Design system uses specific colors: primary #2563EB, error #DC2626
</context>

<task>
Create LoginPage component at src/pages/LoginPage.jsx with:
- Email input with validation (required, email format)
- Password input with show/hide toggle
- "Remember me" checkbox
- Submit button with loading state
- Error display for failed authentication
</task>

<constraints>
- Use react-hook-form with yup validation schema
- Call POST /api/auth/login endpoint
- On success, redirect to /dashboard
- Handle 401 errors with "Invalid credentials" message
- Match existing Navbar pattern (see src/components/Navbar.jsx)
</constraints>

<style>
Be precise. Follow the exact patterns in the codebase. Use TypeScript
for props and state types. Match the existing component structure.
</style>
```

---

### Another Transformation: Smart Contract

**Level 1 (Before):**
```
"Add access control to my contract"
```

**Level 5 (After):**
```
<context>
Working on RWA token contract at contracts/RealEstateToken.sol.
Currently has basic ERC-20 functionality. Need to add access control
following OpenZeppelin's recommended patterns for RWA tokens.
</context>

<task>
Add OpenZeppelin AccessControl to RealEstateToken.sol with:
- MINTER_ROLE: can mint new tokens (automatically assigned to deployer)
- BURNER_ROLE: can burn tokens from approved addresses
- PAUSE_ROLE: can pause transfers (for regulatory compliance)
- DEFAULT_ADMIN_ROLE: can grant/revoke all roles

Implement role assignment in constructor, excluding DEFAULT_ADMIN_ROLE
from auto-assignment for security.
</task>

<constraints>
- Use AccessControlUpgradeable since contract is upgradeable
- Add onlyRole modifiers to appropriate functions
- Include pausable functionality integrated with AccessControl
- Emit events for role grants/revocations
- Write 5+ unit tests covering role management and enforcement
</constraints>

<example>
Follow this pattern from OpenZeppelin:
```
function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
    _mint(to, amount);
}
```

Also see existing contract pattern at contracts/base/BaseRWA.sol.
</example>
```

---

## Advanced Prompting Techniques

### 1. Few-Shot Prompting

Provide concrete examples of what you want. Claude learns from examples better than descriptions.

**Basic Few-Shot:**
```
Create a TypeScript interface for a User. Include:
- id: string
- email: string
- createdAt: Date
- role: 'admin' | 'user' | 'guest'
```

**Better Few-Shot (with examples):**
```
Create TypeScript interfaces for our RWA platform's user system.

Example output format:
```typescript
interface User {
  id: string;
  email: string;
  createdAt: Date;
  role: 'admin' | 'investor' | 'operator';
}

interface Investment {
  id: string;
  userId: string;
  assetId: string;
  amount: BigInt;
  timestamp: number;
}
```

Create:
1. User interface with KYC status field
2. Investment interface linking to User
3. Asset interface for real estate properties
4. Types should be production-ready with proper typing
```

**Few-Shot for Code Patterns:**
```
Write a Hardhat test following this pattern:

```typescript
describe('Token Contract', () => {
  let token: RealEstateToken;
  let owner: SignerWithAddress;
  let investor: SignerWithAddress;

  beforeEach(async () => {
    [owner, investor] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('RealEstateToken');
    token = await Token.deploy();
  });

  it('should mint tokens to investor', async () => {
    const amount = parseEther('1000');
    await token.mint(investor.address, amount);
    expect(await token.balanceOf(investor.address)).to.equal(amount);
  });
});
```

Now write tests for the AccessControl functionality:
- Test MINTER_ROLE can mint
- Test non-MINTER_ROLE cannot mint
- Test role grant and revoke
- Test pause/unpause functionality
```

### 2. Chain-of-Thought Prompting

Ask Claude to think through problems step-by-step.

**Without CoT:**
```
Why is my gas estimate too high?
```

**With Chain-of-Thought:**
```
Analyze why my Solidity function has unexpectedly high gas costs.

Function code:
```solidity
function batchTransfer(address[] calldata recipients, uint256[] calldata amounts) external {
    require(recipients.length == amounts.length, "Length mismatch");
    for (uint256 i = 0; i < recipients.length; i++) {
        _transfer(msg.sender, recipients[i], amounts[i]);
    }
}
```

Please think through:
1. What operations consume gas in this function?
2. How does the loop affect gas?
3. What storage operations happen in each iteration?
4. What optimizations could reduce costs?
5. Provide an optimized version with explanation
```

**Asking Claude to Show Work:**
```
Explain how to implement a reentrancy guard in Solidity.
For each step, explain:
1. Why it's needed (the vulnerability)
2. How the guard prevents it
3. The exact implementation
4. Common mistakes to avoid
5. How to test that it works
```

### 3. Self-Critique Workflows

Ask Claude to review and improve its own output.

**Self-Critique Prompt:**
```
You just wrote a Solidity contract. Now critique it for:
1. Security vulnerabilities (reentrancy, overflow, access control)
2. Gas inefficiencies
3. Missing best practices
4. Potential edge cases

Contract:
[PASTE CONTRACT]

For each issue found:
- Severity: High/Medium/Low
- Description: What the issue is
- Fix: How to resolve it
```

**Iterative Improvement:**
```
Review the following React component for issues:

[PASTE COMPONENT]

Then:
1. List all issues you find
2. Prioritize by severity
3. Fix the high and medium severity issues
4. Explain what you changed and why
```

### 4. Negative Examples (What to Avoid)

Understanding what NOT to do is crucial.

**Anti-Pattern 1: Overly Vague**
```
Bad: "Make my contract better"
Good: "Optimize the gas cost of the mint() function in my ERC-721 contract.
Current implementation: [code]. Target: under 100k gas per mint."
```

**Anti-Pattern 2: Missing Context**
```
Bad: "Write tests for my contract"
Good: "Write Hardhat/Waffle tests for contracts/Token.sol following
the pattern in test/Token.test.ts. Focus on:
- Token transfer and approval
- Access control enforcement
- Pausable functionality"
```

**Anti-Pattern 3: No Constraints**
```
Bad: "Create an API endpoint"
Good: "Create a NestJS POST endpoint at /api/investments that:
- Accepts { assetId: string, amount: BigInt }
- Validates user KYC status from JWT
- Returns 201 on success, 400 on validation error, 401 if not verified
- Uses the InvestmentService for business logic
- Follows existing error handling pattern in src/errors/"
```

**Anti-Pattern 4: Moving the Goalposts**
```
Bad: "Actually, can you add X? Oh, and also Y. Wait, what about Z?"
Good: "Here's the full requirements for this task. Let me know if
anything is unclear before you start:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]
I'll provide feedback, then you implement."
```

**Anti-Pattern 5: Ignoring Claude's Questions**
```
Bad: "Just write the code"
Good: "Before I write the code, I have some questions:
1. Should the vault use a shared-based or asset-based calculation?
2. Do you want ERC-4626 compliance or a custom implementation?
3. What chain are you deploying to? (affects block.timestamp usage)
Let me know your preferences and I'll implement accordingly."
```

### 5. Structured Prompting with XML Tags

Use XML-style tags to organize complex prompts.

**Template:**
```
<context>
[Background about your project, codebase location, existing patterns]
</context>

<task>
[What you want Claude to do - specific and actionable]
</task>

<constraints>
[Requirements, limitations, and success criteria]
</constraints>

<examples>
[Code snippets or examples showing desired output format]
</examples>

<output_format>
[How you want the response structured]
</output_format>

<style>
[How Claude should approach the task - precise, creative, thorough, etc.]
</style>
```

**Complete Example:**
```
<context>
Building a lending protocol on Ethereum. Smart contracts in contracts/lending/.
Using Hardhat with Waffle for testing. OpenZeppelin contracts for security.
Existing vault implementation at contracts/vault/Vault.sol follows UUPS pattern.
</context>

<task>
Create a LendingPool contract that:
- Allows users to deposit assets (ERC20) as collateral
- Allows borrowing against collateral with over-collateralization
- Tracks user positions (collateral value vs borrowed amount)
- Emits events for deposits, withdrawals, borrows, liquidations
</task>

<constraints>
- Use OpenZeppelin ReentrancyGuard
- Implement circuit breaker (pause functionality)
- Liquidation threshold: 80% LTV (loan-to-value)
- Liquidation bonus: 10% for liquidators
- Follow UUPS upgradeability pattern
- Gas optimize critical paths
- Include comprehensive NatSpec
</constraints>

<examples>
Reference the Vault contract for upgradeability patterns:
```solidity
contract LendingPool is ReentrancyGuardUpgradeable, AccessControlUpgradeable, PausableUpgradeable {
    // ... implementation
}
```
</examples>

<output_format>
1. LendingPool.sol with NatSpec
2. Interfaces for ILendingPool, IERC20
3. Deployment scripts (Hardhat Deploy)
4. Unit tests covering core flows:
   - Deposit and collateral tracking
   - Borrow against collateral
   - Liquidation when undercollateralized
   - Pause/unpause
5. Hardhat gas reporter output showing optimization
</output_format>

<style>
Be precise. Production-ready code. Include security considerations.
Think through edge cases: zero addresses, zero amounts, overflow, underflow.
</style>
```

### 6. Controlling Response Style

Use natural language to shape Claude's output.

**For Precise, Technical Output:**
```
Be precise. This is production code - don't include TODO comments.
Include NatSpec for all public functions. Use explicit types.
Follow Solidity style guide: order functions visibility, then modifier, then body.
```

**For Creative Solutions:**
```
Be creative. Suggest unconventional approaches if they offer benefits.
Show trade-offs between different solutions. I'm open to refactoring
the existing codebase to accommodate better patterns.
```

**For Educational Explanations:**
```
Explain like you're mentoring a junior developer. Include the reasoning
behind each decision. Point out common mistakes and how to avoid them.
This is for learning, so show different approaches and their trade-offs.
```

**For Concise Output:**
```
Be concise. Minimal explanation, focus on working code.
Skip introductory text. Direct to code or answer.
```

**For Thorough Review:**
```
Be thorough. This is a security-critical component.
Review every line for vulnerabilities. Check against known attack vectors.
Include both issues found and positive security features.
```

**Combining Styles:**
```
Be precise but explain key decisions. This is for a security audit,
so prioritize correctness over brevity. Show the reasoning behind
critical security choices.
```

---

## Guidelines for Real Development Scenarios

### 1. Establish Context Early

**Good Pattern:**
```
I'm working on [project] at [path]. We use [tech stack].
Currently implementing [feature]. Let me know if you need more context.
```

**Why It Works:**
- Claude knows the domain immediately
- Can reference existing code patterns
- Understands constraints (chain, library versions, etc.)

### 2. Be Specific About Success Criteria

**Bad:** "Make it work"
**Good:** "Function should return true when user has valid KYC, false otherwise. Should handle edge cases: no KYC submitted, KYC pending, KYC rejected."

### 3. State Your Assumptions

**Good:**
```
I'm assuming:
- Users already have a connected wallet
- Backend validates KYC status before calling this contract
- This runs on Ethereum mainnet

Correct me if any of these are wrong.
```

### 4. Provide Reference Code

**Good:**
```
Follow the pattern in contracts/base/BaseVault.sol, specifically:
- The initialization pattern
- The access control structure
- The event emissions
```

### 5. Specify Output Format for Code Reviews

**Good:**
```
For each file, provide:
1. Line numbers for any issues
2. Severity (High/Medium/Low)
3. Description of the issue
4. Suggested fix
5. Reference to best practices or documentation
```

### 6. Use Progressive Disclosure

**Good:**
```
Phase 1: Core functionality only (no access control, no pausable)
Phase 2: Add access control
Phase 3: Add pausable
Phase 4: Add tests and deployment scripts

Start with Phase 1. I'll review before we proceed.
```

---

## Quick Reference Card

| Level | Prompt Style | When to Use |
|-------|---------------|-------------|
| **1** | "Do X" | Never - always provide more context |
| **2** | Basic domain + outcome | Quick exploratory questions |
| **3** | Context + requirements + why | Most development tasks |
| **4** | Structured with examples | Complex features, code generation |
| **5** | Multi-turn refinement | Production systems, security-critical code |

| Technique | Best For |
|-----------|----------|
| Few-shot | Getting specific output formats |
| Chain-of-thought | Debugging, understanding, optimization |
| Self-critique | Reviewing and improving outputs |
| XML structure | Complex multi-requirement tasks |
| Style control | Tailoring verbosity and approach |

---

## Example Prompts for Your Tech Stack

### Solidity / Hardhat

**Level 3:**
```
Create an ERC-721 contract for real estate NFT representation.
Requirements:
- Minting by authorized minter only
- Metadata URI for property details
- Enumerable extension for portfolio tracking
- Use OpenZeppelin contracts
```

**Level 4:**
```
<context>
RWA NFT contract at contracts/RealEstateNFT.sol
OpenZeppelin contracts, UUPS upgradeable
</context>

<task>
Extend RealEstateNFT with batch minting capability.
Batch mint up to 100 tokens in single transaction.
</task>

<constraints>
- Gas efficient (use EnumerableSet internally)
- Reentrancy protected
- Access controlled (MINTER_ROLE only)
- Include NatSpec
</constraints>
```

### React / Vite

**Level 3:**
```
Create an AssetCard component displaying:
- Property image
- Property name and location
- Current value
- User's ownership percentage

Follow patterns in src/components/PropertyCard.jsx
```

**Level 4:**
```
<context>
React 19, TypeScript, CSS modules
Existing AssetCard at src/components/AssetCard.tsx
</context>

<task>
Create AssetCard with:
- Image with fallback
- Property details (name, location, value)
- Ownership progress bar
- Click to navigate to detail page
</task>

<constraints>
- Use CSS modules matching design system
- TypeScript strict mode
- Loading skeleton while image loads
- Handle missing data gracefully
</constraints>
```

### NestJS / TypeScript

**Level 3:**
```
Create a controller for investment operations:
- POST /investments - Create investment
- GET /investments/:id - Get investment details
- GET /investments/user/:userId - User's investments
```

**Level 4:**
```
<context>
NestJS with TypeORM, JWT auth
Existing pattern: src/investments/investments.controller.ts
</context>

<task>
Create InvestmentsController with:
- POST /investments - Create with asset validation
- GET /investments/:id - Fetch with relations
- GET /investments/user/:userId - User's investments (auth required)
</task>

<constraints>
- Use DTOs with class-validator
- Transaction support for creation
- Proper error handling (NotFound, BadRequest)
- Include Swagger decorators
</constraints>
```

---

## Related Documentation

- Module 15: Learning How to Learn with Claude
- Module 13: Subagents & Multi-Agent Workflows
- Module 14: Data Analysis with Claude
- RWA Contracts: `/home/xavier-praveen/Workspace/RWA/smartcontract/contracts/`
- React Reference: `/home/xavier-praveen/Workspace/claude_exercise/module01_task2/`
- NestJS Reference: `/home/xavier-praveen/Workspace/RWA/backend/`

---

*Last updated: 2026-04-02*