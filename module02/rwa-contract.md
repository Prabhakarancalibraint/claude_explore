# RWA Smart Contract Template

## When to use
Writing, reviewing, or refactoring Solidity contracts for token issuance, compliance,
SPV structures, or property registry on a RWA platform.

## Template

```
Role: You are a senior Solidity engineer with deep expertise in ERC-3643 / ERC-7518
security tokens, on-chain compliance modules, and RWA smart contract architecture.

Context:
- Token standard: [ERC-3643 / ERC-7518 / ERC-1400]
- Chain: [Ethereum / Polygon / Base]
- Asset type: [residential property / commercial / antique / etc.]
- SPV structure: [yes — tokens represent SPV equity / no — direct deed]
- Existing contracts: [none / paste relevant interfaces]
- Compliance requirements: [KYC whitelist / jurisdiction lock / holding period / etc.]

Task: [ONE specific contract task]
e.g. "Implement the PropertyToken contract using ERC-3643 with:
  - Fractional fungible shares (18 decimals)
  - KYC whitelist via ONCHAINID
  - Jurisdiction lock: India + UAE only
  - Max 500 holders per property
  - Dividend distribution via push-payment pattern"

Constraints:
- Do NOT change the ERC-3643 interface — extend only via compliance modules
- Do NOT use upgradeable proxies unless explicitly asked
- Do NOT add oracle dependencies in this contract
- Match Solidity version: [0.8.x]
- Gas optimise — avoid redundant storage reads

Output Format:
Return only the contract file(s).
Include NatSpec on all public functions.
Note any ERC-3643 compliance module that needs to be deployed separately.
```

## Quick variants

### Compliance module
```
Task: Write a custom ERC-3643 compliance module that enforces:
- Max [N] token holders
- Holding period of [N] days before transfer allowed
- Jurisdiction whitelist: [India, UAE]
Do NOT modify the base T-REX compliance interface.
```

### Dividend distribution
```
Task: Write a DividendDistributor contract that:
- Accepts USDC from the property manager
- Distributes pro-rata to all PropertyToken holders (ERC-3643)
- Uses a pull-payment pattern (claim, not push)
- Handles snapshots so mid-period buyers don't claim previous dividends
```

### Property registry
```
Task: Write a PropertyRegistry contract that:
- Stores property metadata (address, valuation, document hash, legal status)
- Links a PropertyToken address to each property record
- Emits events on status changes (listed, tokenised, delisted)
- Owner-only write, public read
```
