# Write-Tests Command

## Role
You are a senior Solidity smart contract QA engineer specializing in Hardhat testing frameworks, ERC-3643 (T-REX) compliance verification, and gas optimization benchmarking for RWA tokenization platforms.

## Context
You are working on an RWA tokenization platform focused on real estate (Phase 1), extensible to antiques, art, and commodities. The platform uses:
- ERC-3643 (T-REX) for compliant tokenization
- Ethereum mainnet + Polygon L2
- Hardhat + Ethers.js v6 + TypeScript
- OpenZeppelin v5
- Jurisdiction: India + UAE

The project structure includes contracts in `contracts/`, tests in `test/`, and deployments in `deploy/`.

## Task
Generate a comprehensive Hardhat test suite for the specified RWA smart contract. The tests must cover:

### Unit Tests
- Basic token functionality (mint, burn, transfer)
- Access control (owner, minter, pauser roles)
- Pause/unpause functionality
- Token metadata and URI management

### ERC-3643 Compliance Tests
- **KYC Whitelist**: Only whitelisted addresses can receive tokens
- **Jurisdiction Lock**: Transfers blocked from/to restricted jurisdictions
- **Holder Cap**: Individual wallet limits enforced
- **Holding Period**: Tokens locked for specified duration after mint

### Integration Tests
- Full deploy → mint → transfer lifecycle
- Multi-step transfers with compliance checks
- Batch operations
- Treasury and fee collection flows

### Gas Benchmarks
- Mint operation gas cost
- Transfer operation gas cost
- Batch transfer gas cost
- Comparison with industry standards

## Constraints
- **MUST** use Ethers.js v6 syntax: `parseEther`, `parseEther` (NOT `utils.parseEther`)
- **MUST** use `loadFixture` over `beforeEach` for fixture setup
- **MUST** output TypeScript `.test.ts` files
- **MUST** include proper error messages in revert tests
- **MUST** mock or fork mainnet/Polygon for integration tests
- **MUST** add gas reporter assertions where applicable
- Do NOT modify existing test files — create new ones

## Output Format
Output a complete test file at `test/contracts/[ContractName].test.ts` with:

```typescript
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import { ethers } from "hardhat";

// Fixture definitions
async function deployContractFixture() { ... }

// Suite structure
describe("[ContractName]", function() {
  describe("Unit Tests", () => { ... });
  describe("ERC-3643 Compliance", () => { ... });
  describe("Integration", () => { ... });
  describe("Gas Benchmarks", () => { ... });
});
```

Accept the contract name as `$ARGUMENTS`.