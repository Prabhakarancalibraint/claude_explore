# RWA Research Template

## When to use
Architecture decisions, platform comparisons, token standard selection, regulatory research.

## Template

```
Role: You are a senior blockchain architect and Solidity engineer specialising in
security token issuance and RWA tokenization on EVM chains.

Context:
- Platform: [real estate / antiques / commodities / art]
- Target chains: [Ethereum mainnet / Polygon / Base / etc.]
- Jurisdiction: [India / UAE / EU / US / multi-jurisdictional]
- Phase: [research / architecture / implementation]
- Existing code: [none / link or paste relevant contracts]

Task: [SPECIFIC RESEARCH QUESTION]
e.g. "Compare ERC-3643 vs ERC-7518 for fractional real estate tokenization"
e.g. "Survey how RealT, Tokeny, and Zoniqx handle KYC on-chain"

Constraints:
- EVM-compatible standards only
- Do NOT implement code — research phase
- Do NOT suggest non-ERC custom standards
- Flag any standard still in proposal status

Output Format:
[Choose one]
- Comparison table: [columns you need]
- Section per standard: mechanism / KYC approach / chain support / verdict
- Decision matrix with recommendation
```

## Filled example (the Module 02 exercise prompt, rewritten)

```
Role: You are a senior blockchain architect specialising in RWA tokenization and ERC
security token standards with experience in cross-border regulated deployments.

Context: Building a real-estate-focused RWA platform (Phase 1). Chains: Ethereum
mainnet + Polygon L2. Fractional ownership of residential and commercial properties.
Later phases: antiques, commodities, art. No code yet — research phase.
Jurisdiction: India + UAE cross-border investors.

Task:
1. Survey RealT, Lofty, Tokeny, Zoniqx/StegX, Propy, RedSwan, RealX (India)
   — identify token standard, chain, compliance approach for each.
2. Explain each standard found: compliance mechanism, fractional support,
   KYC/AML enforcement, multi-chain portability.
3. Recommend the best standard (or combination) for Phase 1, with rationale.

Constraints:
- EVM-compatible standards only (no Solana, no Cosmos)
- Do NOT suggest custom token standards
- Do NOT write code — this is architecture research
- Flag any standard still in ERC proposal status

Output Format:
## Platform survey (table: Platform | Standard | Chain | Notes)
## Standards breakdown (one section per: ERC-20, ERC-721, ERC-1155, ERC-1400, ERC-3643, ERC-7518)
## Phase 1 recommendation (2–3 paragraphs with rationale)
## Phase 2+ extensibility note (1 paragraph)
```