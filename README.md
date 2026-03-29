# Module 08: RWA Tokenization Slash Commands

## What We Built

This module provides a comprehensive suite of Claude Code slash commands specifically designed for building, testing, and maintaining an RWA (Real World Asset) tokenization platform using ERC-3643 (T-REX).

## Commands Table

| Command | Purpose | Input |
|---------|---------|-------|
| `/write-tests` | Generate complete Hardhat test suites for RWA contracts | `$ARGUMENTS` = contract name |
| `/review-pr` | Comprehensive PR code review with security analysis | `$ARGUMENTS` = PR number |
| `/rwa-tokenize` | Design tokenization architecture for RWA assets | `$ARGUMENTS` = asset type |
| `/security-audit` | Full security audit of smart contracts | `$ARGUMENTS` = contract path |
| `/debug` | Debug test failures and runtime errors | `$ARGUMENTS` = error description |
| `/explain-code` | Educational explanation of contract code | `$ARGUMENTS` = function/section |

## Key Command Deep-dive

### `/write-tests`

The flagship command of this module. It generates comprehensive Hardhat test suites following strict requirements:

- **Ethers.js v6 syntax enforcement**: Uses `parseEther` instead of `utils.parseEther`
- **loadFixture pattern**: Replaces `beforeEach` with more efficient fixture loading
- **TypeScript output**: Generates `.test.ts` files with full type safety

Test coverage includes:
- Unit tests (basic functionality, access control, pausable)
- ERC-3643 compliance (KYC whitelist, jurisdiction lock, holder cap, holding period)
- Integration tests (deploy → mint → transfer lifecycle)
- Gas benchmarks (mint, transfer, batch operations)

### `/review-pr`

Performs multi-layer PR review:
1. Security analysis (reentrancy, access control, front-running)
2. ERC-3643 compliance verification
3. Gas optimization opportunities
4. Code quality assessment

Uses diff analysis between current branch and target branch.

### `/rwa-tokenize`

Architectural design command for:
- Asset fractionalization strategies
- ERC-3643 implementation patterns
- India (SEBI) and UAE (SCA) compliance frameworks
- Multi-chain deployment (Ethereum + Polygon L2)

### `/security-audit`

Comprehensive vulnerability assessment covering:
- OWASP smart contract vulnerabilities
- ERC-3643-specific attack vectors
- Deployment security (proxy, initialization)
- Provides PoC exploit code for critical issues

### `/debug`

Debugging workflow:
- Error message parsing
- Transaction trace analysis
- Contract state inspection
- Fix recommendations with code examples

### `/explain-code`

Educational command for:
- Line-by-line code breakdown
- ERC-3643 integration explanation
- Security considerations
- Ethers.js v6 usage examples

## File Structure

```
module08/
├── README.md
└── .claude/
    └── commands/
        ├── write-tests.md
        ├── review-pr.md
        ├── rwa-tokenize.md
        ├── security-audit.md
        ├── debug.md
        └── explain-code.md
```

## How to Install

1. **Copy commands to your project's `.claude/commands/` directory:**

```bash
mkdir -p .claude/commands
cp module08/.claude/commands/*.md .claude/commands/
```

2. **Verify installation:**

```bash
ls -la .claude/commands/
```

3. **Restart Claude Code** to load new commands.

## Usage Examples

### Generate tests for a RealEstateToken contract:
```
/write-tests RealEstateToken
```

### Review PR #42:
```
/review-pr 42
```

### Design real estate tokenization:
```
/rwa-tokenize real-estate
```

### Audit a compliance contract:
```
/security-audit contracts/compliance/ComplianceModule.sol
```

### Debug a test failure:
```
/debug KYC whitelist transfer rejected
```

### Explain the mint function:
```
/explain-code function mint
```

## Project Context

These commands are built for:
- **Stack**: ERC-3643 (T-REX) · Hardhat · Ethers.js v6 · TypeScript · OpenZeppelin v5
- **Chains**: Ethereum mainnet + Polygon L2
- **Jurisdictions**: India (SEBI) + UAE (SCA)
- **Phase 1**: Real estate tokenization
- **Extensible to**: Antiques, art, commodities

## Next Steps

1. **Integrate with existing prompts**: Copy these commands alongside your `.claude/prompts/` templates from earlier modules
2. **Customize constraints**: Adjust the ERC-3643 parameters (holder caps, holding periods) based on your specific requirements
3. **Add chain-specific commands**: Consider adding Polygon L2 deployment commands for gas optimization
4. **Expand compliance**: Add jurisdiction-specific commands for India and UAE regulatory requirements

---

Built for Module 08 of the Claude Code training programme — slash command design for RWA tokenization platforms.