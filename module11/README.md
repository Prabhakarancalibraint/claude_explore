# Module 11: Git Worktrees for Parallel Development

## Overview

This module demonstrates parallel development using git worktrees for an RWA (Real-World Asset) tokenization platform built on ERC-3643. The implementation targets India and UAE investors with compliant property tokenization.

## What Was Built

### PropertyToken Contract Suite
- **PropertyToken.sol**: Main ERC-3643 compliant token contract for fractional real estate ownership
- **IdentityRegistry.sol**: ONCHAINID KYC integration for investor verification
- **PropertyCompliance.sol**: Compliance module with holder caps, holding periods, and jurisdiction locks

### Test Suite
- **PropertyToken.test.ts**: Comprehensive Hardhat test suite covering:
  - Unit tests (mint, burn, transfer, access control)
  - ERC-3643 compliance tests (KYC whitelist, jurisdiction lock, holder caps)
  - Integration tests (deploy → mint → transfer lifecycle)
  - Gas benchmarks

## Worktree Diagram

```
                        ┌─────────────────────────────────────┐
                        │    Main Repository (main)          │
                        │  /home/xavier-praveen/Workspace/   │
                        │        claude_exercise             │
                        └─────────────────────────────────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           │                           │                           │
           ▼                           ▼                           │
┌─────────────────────┐      ┌─────────────────────┐            │
│ Worktree 1          │      │ Worktree 2           │            │
│ Branch: feature/    │      │ Branch: feature/     │            │
│ rwa-property-token  │      │ rwa-property-token-  │            │
│                     │      │ tests                │            │
│ Path: .claude/      │      │ Path: .claude/       │            │
│ worktrees/feature-  │      │ worktrees/feature-   │            │
│ rwa-property-token  │      │ rwa-property-token-  │
│                     │      │ tests                │
│ Contains:           │      │ Contains:            │
│ • PropertyToken.sol │      │ • PropertyToken.     │
│ • IdentityRegistry  │      │   test.ts            │
│ • PropertyCompliance│      │                      │
└─────────────────────┘      └─────────────────────┘
           │                           │
           └───────────────────────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │  Merged into main   │
                 │  + Cleaned up        │
                 └─────────────────────┘
```

## Parallel Pattern Applied: Feature + Tests

This module uses the **Feature + Tests** parallel pattern where:
- **Worktree 1** (feature/rwa-property-token): Builds the contract implementation
- **Worktree 2** (feature/rwa-property-token-tests): Creates comprehensive test suite
- Both run **simultaneously** to maximize development throughput

### Why This Pattern?

1. **Parallelism**: Contract development and test creation happen at the same time
2. **Independence**: Worktrees don't interfere with each other
3. **Clean Merge**: Both branches merge into main with non-conflicting changes

## Commands Reference Table

| Command | Description |
|---------|-------------|
| `git worktree add <path> -b <branch>` | Create new worktree with branch |
| `git worktree list` | List all worktrees |
| `git worktree remove <path>` | Remove worktree |
| `./module11/setup_worktrees.sh` | Create both worktrees |
| `./module11/run_agents.sh` | Document parallel agent commands |
| `./module11/merge_and_cleanup.sh` | Merge branches and cleanup |

### Terminal Commands for Parallel Agents

**Terminal 1 (Contract Build):**
```bash
cd /home/xavier-praveen/Workspace/claude_exercise/.claude/worktrees/feature-rwa-property-token
claude
# Then execute: /rwa-tokenize property
```

**Terminal 2 (Test Generation):**
```bash
cd /home/xavier-praveen/Workspace/claude_exercise/.claude/worktrees/feature-rwa-property-token-tests
claude
# Then execute: /write-tests PropertyToken
```

## Project Stack

- **Solidity**: ^0.8.26
- **Ethers.js**: v6
- **OpenZeppelin**: v5
- **Hardhat**: v2.19+
- **TypeScript**: 5.3+

## Results

### Build Verification
```
$ npx hardhat compile
Compiled 24 Solidity files successfully (evm target: cancun).
```

### Test Suite Status
The test suite was generated but requires ESM configuration fixes to run:
- Typechain types need to be generated in main worktree
- Import paths need .js extension for ESM compatibility
- Tests cover all required categories (unit, compliance, integration, gas)

### Files Created
- `contracts/PropertyToken.sol` (347 lines)
- `contracts/IdentityRegistry.sol` (192 lines)
- `contracts/PropertyCompliance.sol` (252 lines)
- `test/contracts/PropertyToken.test.ts` (830 lines)

## Git Commit

```
feat: Module 11 — git worktrees parallel development for RWA PropertyToken
```

## Key Takeaways

1. **Worktrees enable true parallelism** - Multiple agents can work simultaneously without context switching
2. **Clean separation** - Each worktree has its own branch and working directory
3. **Easy cleanup** - Worktrees can be removed after merge without losing history
4. **ERC-3643 compliance** - Property tokenization with KYC, jurisdiction locks, and holder caps

## Next Steps

- Fix ESM configuration for test execution
- Deploy to testnet (Ethereum Sepolia / Polygon Amoy)
- Add deployment scripts for IdentityRegistry and PropertyCompliance
- Integrate with ONCHAINID for production KYC