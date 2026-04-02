# LEARNINGS.md - Module 15: Learning How to Learn with Claude

A structured learning log to capture key insights, mental models, and reusable code examples from working with Claude.

---

## Learning Log Format

Each entry follows this structure:
- **What I Learned**: Key insight or concept
- **Why It Works**: Underlying mental model or principle
- **When to Apply**: Trigger use case or context
- **Code Example**: Concrete example for recall and reuse

---

## Entry 001: Understanding Function Selectors in Solidity

### What I Learned
Solidity function selectors are the first 4 bytes of the keccak256 hash of the function signature. They're how EVM identifies which function to call. This is analogous to a ZIP code - it's a short code that routes to the right destination.

### Why It Works
The EVM uses a dispatch table where each function selector maps to executable bytecode. When you call a contract, you send data starting with the selector. The EVM looks up the selector and jumps to the corresponding code. This is deterministic - `transfer(address,uint256)` will always produce `0xa9059cbb`.

### When to Apply
- Building contract interfaces manually
- Understanding delegatecall and proxy patterns
- Analyzing transaction data
- Cross-contract calls where you need to encode function calls

### Code Example
```solidity
// Finding function selector
bytes4 selector = bytes4(keccak256("transfer(address,uint256)"));
// selector = 0xa9059cbb

// Making a low-level call with selector
 bytes memory data = abi.encodeWithSelector(
     bytes4(keccak256("transfer(address,uint256)")),
     recipient,
     amount
 );
 (bool success, ) = token.call(data);
```

---

## Entry 002: OpenZeppelin AccessControl vs Ownable

### What I Learned
`Ownable` is simple - one owner, two states (owned or transferred). `AccessControl` is granular - multiple roles, each with multiple members, with role hierarchy support via `AccessControlDefaultAdminRules`.

### Why It Works
Ownable uses binary logic: you're the owner or you're not. AccessControl uses bitmasks where each role is a bytes32 identifier. This enables the principle of least privilege - grant only the specific capability needed, not full ownership.

### When to Apply
| Scenario | Pattern |
|----------|---------|
| Simple CRUD contract | Ownable |
| Multi-party system (RWA) | AccessControl |
| Upgradeable admin | AccessControlDefaultAdminRules |
| Time-locked role changes | AccessControl + TimelockController |

### Code Example
```solidity
// AccessControl for RWA Token
contract RWAToken is ERC1155, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    function mint(address to, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(to, id, amount, data);
    }

    function verifyAsset(uint256 assetId)
        public
        onlyRole(VERIFIER_ROLE)
    {
        // Verification logic
    }
}
```

---

## Entry 003: React useEffect Dependency Array Rules

### What I Learned
The dependency array controls when the effect runs:
- `[]` = runs once on mount (like componentDidMount)
- `[a, b]` = runs when a or b changes (shallow compare)
- No array = runs every render (dangerous!)
- Function in array = include if you reference it, but consider useCallback

### Why It Works
React uses referential equality to determine if dependencies changed. Primitive values (strings, numbers) compare by value. Objects, arrays, and functions compare by reference - this is why adding an object to deps often causes infinite loops.

### When to Apply
- Data fetching: dependencies should include all values used in effect
- Subscriptions: cleanup function must handle unmount
- Performance: use useMemo/useCallback to stabilize references

### Code Example
```tsx
// ❌ Bad - object recreated every render
useEffect(() => {
  fetchUser(user.id);
}, [user]); // user is object, different reference each render

// ✅ Good - extract primitive values
useEffect(() => {
  fetchUser(userId);
}, [userId]); // userId is string/number

// ✅ Good - use useCallback for functions
const fetchUser = useCallback((id: string) => {
  // fetch logic
}, []);
useEffect(() => {
  fetchUser(userId);
}, [userId, fetchUser]); // stable reference
```

---

## Entry 004: NestJS Dependency Injection Scopes

### What I Learned
NestJS providers have three scopes:
- `DEFAULT` (singleton): one instance shared across all requests
- `REQUEST`: new instance created for each request
- `TRANSIENT`: new instance each time it's injected

### Why It Works
Singleton providers are efficient but share state across requests. Request-scoped providers ensure each HTTP request gets fresh state - critical for request-specific data like authenticated user. Scopes affect memory usage and must be considered with database connections.

### When to Apply
| Need | Scope |
|------|-------|
| Database connection pool | DEFAULT |
| Authenticated user per request | REQUEST |
| Logging with request ID | REQUEST |
| Temporary calculation utility | TRANSIENT |

### Code Example
```typescript
// Singleton - shared connection pool
@Injectable({ scope: Scope.DEFAULT })
export class DatabaseService {
  constructor(private connection: Connection) {}
}

// Request-scoped - user context
@Injectable({ scope: Scope.REQUEST })
export class UserContextService {
  constructor(@Inject(REQUEST) private request: Request) {
    this.user = request.user;
  }
}

// Request-scoped guard usage
@Injectable({ scope: Scope.REQUEST })
export class JwtAuthGuard extends CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Each request gets fresh guard instance
    return validateToken(request.headers.authorization);
  }
}
```

---

## Entry 005: UUPS vs Transparent vs Beacon Proxies

### What I Learned
- **UUPS**: Upgrade logic in implementation contract, one proxy per implementation
- **Transparent**: Upgrade logic in proxy, handles admin separately
- **Beacon**: One beacon, many proxies - upgrade beacon to upgrade all proxies

### Why It Works
UUPS is gas-efficient (no proxy admin overhead) but requires implementation to include upgrade logic. Transparent simplifies admin but adds proxy size. Beacon is best when you have many proxy instances pointing to same logic - upgrade one place, update all.

### When to Apply
| Scenario | Pattern |
|----------|---------|
| Single deployment, simple upgrade | UUPS |
| Multiple upgradable contracts | Transparent |
| Many proxy instances (NFT collection) | Beacon |
| Want to change implementation without touching proxies | Beacon |

### Code Example
```solidity
// UUPS Proxy
contract UUPSProxy is ERC1967Proxy {
    constructor(address _implementation, bytes memory _data)
        ERC1967Proxy(_implementation, _data)
    {}
}

// Upgrade function in implementation (UUPS)
function _authorizeUpgrade(address newImplementation)
    internal
    onlyRole(UPGRADER_ROLE)
override
{}

// Beacon Proxy
contract AssetProxy is ERC1967Proxy {
    constructor(address _beacon, bytes memory _data)
        ERC1967Proxy(_beacon, _data)
    {}
}

// Single beacon controls multiple proxies
contract AssetBeacon is UpgradeableBeacon {
    constructor(address _implementation) UpgradeableBeacon(_implementation) {}
}
```

---

## Entry 006: ethers.js Signer vs Provider vs Wallet

### What I Learned
- **Provider**: Read-only connection to blockchain (like internet connection)
- **Signer**: Can sign transactions (like authenticated user with private key)
- **Wallet**: Signer with direct private key access (like having the password)

### Why It Works
Provider is safe - it only reads data, never modifies state. Signer wraps Provider and adds signing capability. Wallet extends Signer by constructing it directly from private key. In practice: Provider for reading, Signer (from wallet connection) for writing.

### When to Apply
| Task | Tool |
|------|------|
| Reading contract data | Provider |
| Sending transactions (metamask) | Signer (injected) |
| Server-side automation | Wallet |
| Estimating gas | Provider |

### Code Example
```typescript
// Read-only provider
const provider = new ethers.JsonRpcProvider(RPC_URL);
const balance = await provider.getBalance(address);

// Signer from injected wallet (metamask)
const signer = await provider.getSigner();
// Now can sign transactions
const tx = await contract.connect(signer).transfer(to, amount);

// Server-side wallet
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
// Same API as signer
const tx = await contract.connect(wallet).mint(tokenId);
```

---

## Entry 007: Gas Optimization in Solidity Storage

### What I Learned
Storage slots cost ~20,000 gas to write. Memory is ~3 gas per 32 bytes. The key insight: minimize storage writes, use local variables (memory) when possible, batch storage operations.

### Why It Works
Ethereum stores state in a persistent database (trie). Each storage write requires disk I/O on all nodes. Memory is temporary - used within function execution, then discarded. This is why "caching" values in local variables before storage writes saves gas.

### When to Apply
- Loop operations that modify storage
- Multiple updates to same state variable
- Batch operations in marketplace contracts

### Code Example
```solidity
// ❌ Expensive - writes to storage each iteration
for (uint i = 0; i < length; i++) {
    balances[users[i]] += amount; // SLOAD + SSTORE each time
}

// ✅ Optimized - cache in memory, single storage write
uint256 totalAmount = amount * length; // memory operations
for (uint i = 0; i < length; i++) {
    totalAmount += amounts[i];
}
// Single SSTORE
balances[recipient] += totalAmount;

// ✅ Best - use events for large data, storage for aggregates
emit BatchTransfers(senders, recipients, amounts);
// Read events instead of storing full history
```

---

## Entry 008: React 19 Server Components vs Client Components

### What I Learned
Server Components render on the server (Node.js), never ship JS to client. Client Components (`"use client"`) render on client, include JS bundle. Server can do direct I/O (database, file system), client cannot.

### Why It Works
Server Components reduce bundle size - heavy dependencies stay on server. They enable direct database access without API routes. Client Components are needed for interactivity, hooks, browser APIs. The boundary is explicit with "use client" directive.

### When to Apply
| Component Type | Use For |
|---------------|---------|
| Server Component | Data fetching, direct DB access, heavy compute |
| Client Component | Interactive UI, useState, useEffect, onClick |
| Shared (both) | Pure presentation components without hooks |

### Code Example
```tsx
// Server Component - fetches directly, no API needed
async function UserList() {
  const users = await db.users.findMany(); // direct DB access
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// Client Component - interactive
"use client";
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Composition - Server renders structure, Client adds interactivity
function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId); // server fetch
  return (
    <div>
      <UserCard user={user} /> {/* server render */}
      <FollowButton userId={userId} /> {/* "use client" */}
    </div>
  );
}
```

---

## Entry 009: Hardhat Network vs Mainnet Fork

### What I Learned
- **Hardhat Network**: Local in-memory network, reset on restart, fast
- **Mainnet Fork**: Simulates mainnet state locally, tests against real DEFI, AMMs

### Why It Works
Hardhat Network is for unit tests - fast, deterministic, resets cleanly. Mainnet Fork is for integration tests against real protocols - you can interact with real Uniswap, Aave, etc. locally without spending real money.

### When to Apply
| Network | Use Case |
|---------|----------|
| Hardhat Network | Unit tests, isolated logic testing |
| Mainnet Fork | Integration with DEFI, testing liquidations, arbitrage |
| Testnet | Full end-to-end, multisig, deployment |

### Code Example
```javascript
// hardhat.config.ts
module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mainnetFork: {
      url: process.env.MAINNET_RPC,
      fork: process.env.MAINNET_RPC, // fork from mainnet
      chainId: 1,
    },
  },
};

// Test with fork - interact with real Uniswap
it("should swap USDC for WETH", async function() {
  const [user] = await ethers.getSigners();
  const usdc = await ethers.getContractAt("IERC20", USDC_ADDRESS);
  const uniswap = await ethers.getContractAt("ISwapRouter", UNISWAP_ROUTER);

  // Approve real Uniswap
  await usdc.approve(uniswap, LARGE_AMOUNT);

  // Execute real swap
  const tx = await uniswap.exactInputSingle({
    tokenIn: USDC_ADDRESS,
    tokenOut: WETH_ADDRESS,
    fee: 3000,
    recipient: user.address,
    deadline: Infinity,
    amountIn: USDC_AMOUNT,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  });

  expect(tx).to.emit(weth, "Transfer");
});
```

---

## Entry 010: Understanding ERC-1155 Multi-Token Standard

### What I Learned
ERC-1155 combines ERC-20 (fungible) and ERC-721 (non-fungible) in a single standard. One contract handles both token types via `id` parameter. Batch operations save gas - transfer multiple token types in one transaction.

### Why It Works
Traditional approach: separate contract per token type (expensive). ERC-1155: single contract, different IDs for different assets. `id` differentiates fungible (supply > 1) from NFTs (supply = 1). URI extension points enable metadata.

### When To Apply
| Use Case | Why ERC-1155 |
|----------|--------------|
| Gaming items (weapons, consumables) | Batch transfers, mixed types |
| RWA fractionalization | Fungible + NFTs in one contract |
| Marketplace with multiple assets | Single contract to manage |

### Code Example
```solidity
// ERC-1155 for RWA
contract RWAToken is ERC1155, AccessControl {
    // Token ID mappings
    uint256 public constant LAND_TYPE = 0;      // NFT (supply 1)
    uint256 public constant PROPERTY_TYPE = 1;   // NFT
    uint256 public constant FRACTION_TYPE = 2;  // Fungible

    function mintLand(address to, string memory uri)
        public onlyRole(MINTER_ROLE)
    {
        _mint(to, LAND_TYPE, 1, ""); // NFT - single copy
        _setURI(uri);
    }

    function mintFractional(address to, uint256 amount)
        public onlyRole(MINTER_ROLE)
    {
        _mint(to, FRACTION_TYPE, amount, ""); // Fungible
    }

    // Batch transfer - one transaction, multiple types
    function batchTransfer(address to, uint256[] memory ids, uint256[] memory amounts)
        public
    {
        _batchTransfer(_msgSender(), to, ids, amounts, "");
    }

    // Get balance of multiple types
    function getBalances(address owner) public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](3);
        balances[0] = balanceOf(owner, LAND_TYPE);
        balances[1] = balanceOf(owner, PROPERTY_TYPE);
        balances[2] = balanceOf(owner, FRACTION_TYPE);
        return balances;
    }
}
```

---

## Adding New Entries

To add a new learning entry:

1. Copy the format below
2. Replace placeholders with your insight
3. Add to this file in chronological order (next available: 011)

```
## Entry 0XX: [Title]

### What I Learned
[Key insight in 2-3 sentences]

### Why It Works
[Underlying principle or mental model]

### When to Apply
| Scenario | Solution |
|----------|----------|
| [Case 1] | [Approach] |
| [Case 2] | [Approach] |

### Code Example
```[language]
// Your code example here
```
```

---

## Quick Reference

| Concept | Entry | Key Takeaway |
|---------|-------|--------------|
| Function Selectors | 001 | First 4 bytes of keccak256 hash |
| Access Control | 002 | Ownable = binary, AccessControl = granular |
| React useEffect | 003 | Dependency array = referential equality check |
| NestJS DI | 004 | DEFAULT/REQUEST/TRANSIENT scopes |
| Proxy Patterns | 005 | UUPS = implementation, Beacon = multiple proxies |
| ethers.js | 006 | Provider = read, Signer = write |
| Gas Optimization | 007 | Cache in memory, write once to storage |
| React 19 | 008 | Server = no JS, Client = interactivity |
| Hardhat | 009 | Network = unit, Fork = integration |
| ERC-1155 | 010 | Single contract, multiple token types |

---

*Last updated: 2026-04-02*