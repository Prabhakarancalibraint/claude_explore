# Module 05: Extended Context & Context Windows

This module covers the effective utilization of large context windows (up to 200K tokens) and extended thinking for solving complex, multi-file, and system-level problems in an RWA (Real World Assets) tokenization platform context.

## Table of Contents

1. [Context Window Overview](#context-window-overview)
2. [Model Usage Strategy](#model-usage-strategy)
3. [Repository Context Analysis](#repository-context-analysis)
4. [Extended Thinking Implementation](#extended-thinking-implementation)
5. [Comparison: Normal vs Extended Thinking](#comparison-normal-vs-extended-thinking)
6. [Best Practices & Guidelines](#best-practices--guidelines)
7. [Key Learnings](#key-learnings)

---

## Context Window Overview

The context window defines how much information an LLM can process in a single conversation. Different Claude models offer varying context sizes:

| Model | Context Window | Best For |
|-------|----------------|----------|
| Claude Opus 4 | 200K tokens | Full codebase analysis, complex reasoning |
| Claude Sonnet 4 | 200K tokens | Large feature development, extended sessions |
| Claude Haiku 4-5 | 200K tokens | Batch processing, lightweight large-scale tasks |

> **Note**: All current Claude models support 200K token context windows. The difference lies in reasoning capability, speed, and cost.

### Token Budget Breakdown

- **1K tokens** ≈ ~750 words
- **200K tokens** ≈ ~150,000 words (~300 pages)
- Average source file: 200-500 tokens
- Large codebase analysis: 10-50 files = 5K-25K tokens

### RWA Platform Context

In an RWA (Real World Assets) tokenization platform, context windows are critical because:

- **Complex Financial Models**: Property valuations, yield calculations, compliance rules
- **Multi-Party Transactions**: Buyers, sellers, custodians, regulators
- **Regulatory Compliance**: KYC/AML checks, securities law adherence
- **Smart Contract Interactions**: Multiple DeFi protocols, oracle data, bridge operations

---

## Model Usage Strategy

### Claude Opus 4: Full Codebase Analysis & Complex Reasoning

**When to use:**
- Architecture decisions requiring understanding of multiple interconnected files
- Debugging complex issues spanning multiple modules (smart contracts, API, frontend)
- System design for new asset classes (real estate, commodities, art)
- Security audits of entire codebases
- Creating comprehensive documentation for RWA mechanisms

**Prompt Example:**
```
Analyze the entire RWA tokenization platform codebase. Identify:
1. All smart contract interactions and how asset tokens are minted
2. Payment processing flow from wallet to custody
3. Compliance verification mechanisms (KYC, AML, securities rules)
4. Any potential architectural issues or security vulnerabilities
```

**Token Usage:** 15,000-50,000 tokens (entire codebase loaded)

**RWA Use Case - Complex:**
```
Design a multi-tranche structure for a commercial real estate RWA
that supports junior and senior investors with different risk/return profiles
```

---

### Claude Sonnet 4: Large Feature Development & Extended Sessions

**When to use:**
- Implementing substantial features across multiple files
- Long-running development sessions with context accumulation
- Multiple related bug fixes in one session
- When you need balance of capability and cost

**Prompt Example:**
```
Add a new "Fractional Ownership" feature to the RWA platform:
- Create fractional ownership data structures
- Add fractional share trading page
- Integrate with existing payment gateway
- Add split dividend distribution logic
```

**Token Usage:** 5,000-20,000 tokens (feature scope)

**RWA Use Case - Feature Development:**
```
Implement secondary market trading for RWA shares:
- Add order book functionality
- Integrate price oracles for valuation
- Add trading fee calculations
- Implement transfer restrictions for compliance
```

---

### Claude Haiku 4-5: Batch Processing & Lightweight Tasks

**When to use:**
- Processing multiple similar files in batch
- Simple code generation or refactoring
- Quick file operations that don't need deep reasoning
- High-volume automated tasks
- When speed is critical and reasoning complexity is low

**Prompt Example:**
```
For each file in src/components/, add PropTypes validation.
Process all 15 component files in batch.
```

**Token Usage:** 1,000-5,000 tokens per task

**RWA Use Case - Batch Operations:**
```
Generate standard compliance notices for all 50 properties in the portfolio.
Process in batch using consistent templates.
```

---

## Repository Context Analysis

### Analyzing module01_task2 (RWA Platform)

The repository represents an RWA tokenization platform with blockchain integration. Here's how context windows apply:

#### Scenarios Where Full Context Loading is Beneficial

1. **Understanding Overall Architecture**
   - Loading all source files to understand the complete platform flow
   - Tracing data from frontend to smart contracts
   - Understanding the relationship between traditional finance and DeFi components

2. **Cross-Cutting Changes**
   - Adding a new asset class (e.g., commodities) that affects:
     - Frontend (new asset type UI)
     - Backend (valuation logic)
     - Smart contracts (minting/burning)
     - Compliance (new regulatory rules)

3. **Debugging Complex Issues**
   - Smart contract interaction failures
   - Payment processing issues across multiple files
   - State synchronization between frontend and blockchain

4. **Security Audits**
   - Finding vulnerabilities in smart contract interactions
   - Identifying reentrancy risks in asset transfers
   - Compliance gap analysis

#### Cases Where Partial Context is More Efficient

1. **Single Component Updates**
   - Only need the specific component file
   - Example: Updating property card styling - no need for smart contracts

2. **Simple Bug Fixes**
   - Isolated issues don't require full codebase
   - Example: Fixing a CSS bug - only needs the CSS file and component

3. **Quick Feature Additions**
   - Self-contained features like adding a new button or form field

4. **Documentation Updates**
   - README or inline comment updates

### Context Strategy for This Repository

| Task | Context Scope | Recommended Approach |
|------|---------------|---------------------|
| Add new property type | 2-3 files | Partial context |
| Fix payment gateway bug | 5-8 files | Medium context |
| Implement new asset class | 15-20 files | Full context |
| Security audit | Entire src/ + contracts | Full context + extended thinking |
| Architecture design | Entire codebase | Full context + extended thinking |

### RWA Platform Context Analysis

#### Files Structure (module01_task2)

```
src/
├── components/       # UI components (property cards, forms, dashboards)
├── pages/            # Route pages (roadmap, exercises, topics)
├── hooks/            # Custom hooks (useProgress - state management)
├── data/             # Static data (blockchainData, roadmapData)
├── styles/           # CSS styling
└── App.jsx           # Main app with routing
```

#### Key Context Areas for RWA Platform

1. **State Management** (`useProgress.js`)
   - User progress tracking
   - Property investment state
   - Portfolio management

2. **Routing** (`App.jsx`)
   - Property listings → Details → Investment flow
   - User dashboard
   - Admin panels

3. **Data Structures** (`blockchainData.js`)
   - Property metadata
   - Tokenization rules
   - Compliance requirements

---

## Extended Thinking Implementation

Extended thinking is a capability that allows Claude to show its reasoning process, breaking down complex problems into steps. This leads to more accurate outputs for complex tasks.

### How to Enable Extended Thinking

#### In API Calls

```javascript
// Using Anthropic SDK
const response = await anthropic.messages.create({
  model: "claude-opus-4-6-20251117",
  max_tokens: 4096,
  messages: [
    {
      role: "user",
      content: "Design a multi-tranche RWA investment structure for commercial real estate"
    }
  ],
  thinking: {
    type: "enabled",
    budget_tokens: 1024  // tokens allocated for thinking
  }
});

// Response includes reasoning in the thinking field
console.log(response.content[0].thinking);  // Shows reasoning process
```

#### In Claude Code CLI

Extended thinking is automatically enabled for complex reasoning tasks. The CLI uses it when:
- Multi-step problem solving is required
- Architecture or system design tasks
- Complex debugging scenarios

### When to Use Extended Thinking

#### Ideal Use Cases for RWA Platform

1. **Architecture Decisions**
   ```
   "Design a scalable architecture for tokenizing multiple asset classes
   (real estate, commodities, art) on the same platform with shared compliance rules"
   ```

2. **Complex Debugging**
   ```
   "Debug why property investment state isn't persisting after page navigation.
   Trace the data flow from investment form through useProgress hook to localStorage"
   ```

3. **System Design**
   ```
   "Design a custody system for RWA assets that integrates with multiple
   blockchains while maintaining regulatory compliance"
   ```

4. **Multi-File Refactoring**
   ```
   "Refactor the property listing system to support dynamic asset types
   with consistent data structures across all categories"
   ```

5. **Compliance Design**
   ```
   "Design a KYC/AML verification flow that adapts to different jurisdictional
   requirements for securities offerings"
   ```

#### When NOT to Use Extended Thinking

- Simple, single-file tasks
- Quick questions or lookups
- Batch operations with clear patterns
- Time-sensitive operations where speed is critical

---

## Comparison: Normal vs Extended Thinking

### Example: Adding a New RWA Feature

#### Normal Response (No Extended Thinking)

**Prompt:**
```
Add a yield distribution calculator to the property investment page
```

**Typical Response:**
```
I'll add a yield distribution calculator. Here's what I need to do:

1. Create calculator component
2. Add input fields for investment amount
3. Calculate projected returns
4. Display results

[Code implementation follows]
```

**Token Usage:** ~500 input, ~800 output

**Weakness:** Doesn't consider:
- Compound vs simple interest
- Tax implications
- Multiple investor tiers
- Historical yield data integration

---

#### Extended Thinking Response

**Prompt:**
```
Add a yield distribution calculator to the property investment page.
Use extended thinking to plan a comprehensive implementation.
```

**Thinking Process (Internal):**
```
Let me analyze this task:

1. First, I need to understand the current investment flow
   - Look at existing property pages
   - Check state management (useProgress)
   - Understand data structures

2. Yield distribution considerations for RWA:
   - Gross vs net yield calculations
   - Property management fees
   - Vacancy rate assumptions
   - Appreciation projections
   - Distribution frequency (monthly/quarterly/annually)

3. User requirements:
   - Input: investment amount
   - Input: investment duration
   - Input: property selection
   - Output: projected yield
   - Output: total return
   - Output: breakdown by period

4. Advanced features to consider:
   - Compound interest calculations
   - Tax withholding estimates
   - Multi-property portfolio projections
   - Historical performance comparison

5. Compliance implications:
   - Securities disclosures needed
   - Risk warnings for projections
   - Jurisdiction-specific disclaimers

6. UI/UX:
   - Interactive sliders for inputs
   - Chart visualization
   - Export functionality

Let me now implement with all these considerations...
```

**Final Output:**
```
I'll implement a comprehensive yield distribution calculator:

## Implementation Plan

### 1. Calculator Hook (new: src/hooks/useYieldCalculator.js)
- State: investmentAmount, duration, selectedProperty
- Calculations: grossYield, netYield, compoundGrowth
- Effects: auto-recalculate on input change
- Validation: min/max investment amounts

### 2. Yield Calculator Component
- Input fields with validation
- Interactive sliders
- Results display with breakdown
- Export to PDF functionality

### 3. Integration with Property Data
- Pull property metadata (cap rate, appreciation history)
- Calculate based on property-specific metrics
- Display comparable properties

### 4. Compliance Disclosures
- Required risk disclaimers
- "Past performance not indicative of future results"
- Jurisdiction-specific warnings

### 5. Visualization
- Yield over time chart
- Comparison with other asset types
- Portfolio diversification suggestions

[Full code implementation follows]
```

**Token Usage:** ~500 input, ~2500 output (includes reasoning), ~1024 thinking tokens

### Comparison Table

| Aspect | Normal | Extended Thinking |
|--------|--------|-------------------|
| Output Quality | Good for straightforward tasks | Excellent for complex tasks |
| Reasoning Visibility | Hidden | Visible |
| Token Cost | Lower | Higher (thinking budget) |
| Speed | Faster | Slower (processing time) |
| Consistency | Variable | More consistent |
| Complex Tasks | May miss edge cases | Thorough analysis |
| RWA-Specific | Generic implementation | Compliance-aware, feature-complete |

### Token Usage vs Output Quality Trade-offs

| Task Complexity | Recommended Approach | Token Budget |
|----------------|---------------------|--------------|
| Simple (1 file) | Normal | 500-1500 |
| Medium (3-5 files) | Normal + careful planning | 2000-5000 |
| Complex (10+ files) | Extended thinking | 5000-15000 |
| Very Complex (architecture) | Extended thinking | 15000+ |

### RWA Platform-Specific Trade-offs

| RWA Task | Complexity | Recommended | Why |
|----------|------------|-------------|-----|
| Update button styling | Simple | Normal | No reasoning needed |
| Add new form field | Medium | Normal | Clear requirements |
| Implement yield calculator | Complex | Extended | Multiple calculation types, compliance |
| Design asset class system | Very Complex | Extended | Architecture, compliance, data models |

---

## Best Practices & Guidelines

### Choosing the Right Model Based on Task Complexity

| Complexity Level | Model | Reasoning Approach | RWA Use Case |
|-----------------|-------|-------------------|--------------|
| Simple/Quick | Haiku | Minimal | UI tweaks, documentation |
| Standard Development | Sonnet | Normal | Feature development, bug fixes |
| Complex Architecture | Opus | Extended | Smart contract design, compliance |
| Mission Critical | Opus | Extended + review | Security audits, regulatory changes |

### Managing Large Context Inputs Effectively

#### 1. Strategic File Loading

```javascript
// Instead of loading everything:
// DON'T: "Analyze this entire project"
// DO: "Analyze the src/components directory for patterns"

// Better: Specific scope
"Identify reusable component patterns in src/components/
for property card displays that could be extracted into shared props"
```

#### 2. Context Chunking

For very large codebases:
- Break into logical segments (components, hooks, pages, smart contracts)
- Process sequentially with summary context
- Use previous summaries as input for next chunk

**RWA Platform Chunking Strategy:**
```
Chunk 1: Frontend Components → Summary of UI patterns
Chunk 2: State Management → Summary of data flow
Chunk 3: Smart Contracts → Summary of blockchain interactions
Chunk 4: Integration → Combined analysis for cross-cutting features
```

#### 3. Caching Strategies

- Keep related work in same session
- Reference files by name (context cache hits)
- Avoid major topic shifts mid-session
- Group RWA features together (e.g., all property-related work)

#### 4. Context Prioritization

For RWA platforms, prioritize:
1. **Compliance-related files** - Always include in full context
2. **Smart contract interfaces** - Critical for blockchain integration
3. **State management** - Data flow is complex
4. **User authentication** - Security critical
5. **Payment processing** - Financial handling

### Avoiding Unnecessary Token Consumption

| Technique | Savings | RWA Example |
|-----------|---------|-------------|
| Specific prompts | 30-50% | "Add buy button to property card" vs "improve property display" |
| Selective file reading | 40-60% | Only load relevant component, not entire src/ |
| Context clearing between tasks | 50-70% | Clear after completing compliance section |
| Efficient file structures | 20-40% | Keep data models consistent |

#### Prompt Optimization Examples

**Inefficient:**
```
Show me all files in this RWA platform and explain what each does
```
Tokens: ~15,000 | Quality: Low (too broad)

**Efficient:**
```
Explain the useProgress hook and how it manages investment state
```
Tokens: ~2,000 | Quality: High (specific)

**Efficient (Complex - RWA):**
```
I need to understand the property investment flow:
1. First, examine the property card component
2. Then trace the investment form submission
3. Check how state persists to localStorage
4. Finally, verify the confirmation flow
```
Tokens: ~6,000 | Quality: High (structured approach with clear steps)

### RWA Platform-Specific Guidelines

#### Smart Contract Context
- Always include contract ABI patterns when debugging
- Include gas estimation logic in full context
- Consider oracle integrations for price feeds

#### Compliance Context
- Keep KYC/AML related files in full context
- Include jurisdiction rules in context
- Reference securities regulations

#### Financial Context
- Include payment gateway integration
- Consider fee calculation logic
- Include currency/asset conversion logic

---

## Key Learnings

### From Module 05

1. **All Claude models support 200K tokens** - Choose based on reasoning needs, not context limit

2. **Extended thinking dramatically improves quality for complex tasks** - Worth the additional token cost for:
   - Architecture decisions (RWA asset class design)
   - Complex debugging (smart contract interactions)
   - System design (custody and compliance systems)
   - Multi-file refactoring (property type expansion)

3. **Context loading is a spectrum** - Not binary (all or nothing):
   - Single file: 200-500 tokens
   - Feature scope: 5K-20K tokens
   - Full codebase: 50K-100K tokens
   - Everything: Up to 200K tokens

4. **Token efficiency matters** - Small optimizations compound:
   - Specific prompts vs. broad questions
   - Selective file loading vs. glob patterns
   - Session management (cache hits)
   - Context prioritization (compliance first)

5. **Model selection criteria for RWA platforms**:
   - Opus: Complex reasoning, mission-critical financial tasks
   - Sonnet: Daily development, balanced needs
   - Haiku: High volume, simple tasks, speed-critical

6. **RWA Platform-Specific Considerations**:
   - Compliance requirements demand full context
   - Smart contract interactions need careful tracing
   - Financial calculations require extended thinking
   - Multi-party transactions need complete data flow

7. **The Claude Code CLI automatically optimizes** - It handles much of this internally, but understanding the principles helps you guide it effectively

---

## Additional Resources

- [Anthropic API Documentation](https://docs.anthropic.com)
- [Claude Code CLI](/help)
- [Context Management Best Practices](./CLAUDE.md)

---

*Module 05 - Extended Context & Context Windows*
*Part of Claude Explore Learning Path*
*RWA Platform Context*