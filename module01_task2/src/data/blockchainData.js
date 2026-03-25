// Comprehensive Blockchain Learning Data
// Contains ALL topics from roadmap.sh with detailed explanations, code examples, quizzes, and exercises

export const topics = [
  {
    id: 'what-is-blockchain',
    title: 'What is Blockchain?',
    subtitle: 'Understanding the fundamental technology',
    icon: '🔗',
    color: '#6366f1',
    sections: [
      {
        title: 'Introduction to Blockchain',
        content: `A blockchain is a distributed, decentralized, public ledger that records transactions across many computers in a way that makes the records extremely difficult to hack or alter.

In simple terms, imagine a digital notebook that everyone can read but no one can erase or alter what's written in it. Once something is written, it's there forever. That's blockchain.

The word "blockchain" comes from how it works: transactions are grouped together in "blocks," and these blocks are linked together in a chronological "chain." Each block contains:
- A group of transactions
- A hash (unique fingerprint) of the previous block
- A timestamp
- A mathematical puzzle (in Proof of Work systems)`,
        code: null
      },
      {
        title: 'Key Characteristics of Blockchain',
        content: `Blockchain technology has several fundamental characteristics that make it unique:

**1. DECENTRALIZATION**
Unlike traditional databases controlled by one company or server, blockchain is distributed across thousands of computers (called nodes) around the world. No single entity controls the network.

**2. TRANSPARENCY**
On public blockchains like Bitcoin and Ethereum, anyone can view all transactions. This creates accountability without needing a trusted third party.

**3. IMMUTABILITY**
Once a transaction is confirmed and added to the blockchain, it cannot be changed or deleted. This is guaranteed by cryptography - changing any past transaction would require changing all subsequent blocks, which is computationally impossible.

**4. SECURITY**
Blockchain uses advanced cryptography to secure transactions. Each block contains a cryptographic hash of the previous block, creating a chain that's extremely difficult to break.

**5. CONSENSUS**
Before any new block is added to the chain, most nodes in the network must agree that the transactions in it are valid. This prevents fraud and ensures everyone has the same version of the truth.`,
        code: null
      },
      {
        title: 'How Blocks Work',
        content: `Every block in a blockchain contains three main elements:

**1. DATA**
The actual transaction information - who sent what to whom, how much, and when.

**2. PREVIOUS BLOCK HASH**
This is the most important part - each block contains the hash (fingerprint) of the previous block. This is what links blocks together. If you try to change any past block, its hash changes, breaking the link to all subsequent blocks.

**3. HASH OF CURRENT BLOCK**
A unique fingerprint generated from the block's data. This changes completely if even one character of the data changes (this is called the "avalanche effect").`,
        code: `// Block Structure Example
{
  "index": 12345,
  "timestamp": 1700000000,
  "transactions": [
    {
      "from": "0xABC...123",
      "to": "0xDEF...456",
      "amount": 1.5,
      "token": "ETH"
    }
  ],
  "previousBlockHash": "0000abcd...xyz",
  "merkleRoot": "hash123...abc",
  "nonce": 4532,
  "hash": "0000efgh...789"
}`
      },
      {
        title: 'The Genesis Block',
        content: `The first block in any blockchain is called the "Genesis Block." For Bitcoin, this was created by Satoshi Nakamoto on January 3, 2009.

The Genesis Block contains a special message - "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks" - showing the political motivation behind Bitcoin's creation.`,
        code: null
      },
      {
        title: 'Why Blockchain Matters',
        content: `Blockchain matters because it solves fundamental problems in digital transactions:

**TRUST PROBLEM**: In traditional systems, you need to trust banks, governments, or companies to handle your money and data honestly. With blockchain, you don't need to trust any single entity - the code and mathematics ensure fairness.

**SINGLE POINT OF FAILURE**: Traditional databases can fail, be hacked, or be shut down. Blockchain has no single point of failure because it's distributed across thousands of computers.

**INTERMEDIARIES**: Every time you transfer money internationally or sign a contract, middlemen take a cut. Blockchain removes the need for most intermediaries, saving time and money.

**CENSORSHIP**: Governments can shut down websites or freeze accounts. A truly decentralized blockchain can't be shut down by any single authority.

**PROVENANCE**: Blockchain can track the origin and journey of products, combating counterfeiting and improving supply chain transparency.`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is the primary purpose of a blockchain?',
        options: [
          'To store photos and videos',
          'To create a distributed, immutable ledger',
          'To replace the internet',
          'To mine cryptocurrency'
        ],
        correct: 1
      },
      {
        question: 'What makes blockchain "immutable"?',
        options: [
          'The government protects it',
          'Changing past blocks requires changing all subsequent blocks',
          'It uses strong passwords',
          'It is stored on many computers'
        ],
        correct: 1
      },
      {
        question: 'What is a "block" in blockchain?',
        options: [
          'A type of cryptocurrency',
          'A container that holds verified transactions',
          'A type of wallet',
          'A mining equipment'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Explore Block Explorer',
        tasks: [
          'Visit etherscan.io (Ethereum block explorer)',
          'Look at the latest blocks and transactions',
          'Identify the block number, hash, and transactions',
          'Note the block size and gas used'
        ],
        hint: 'Block explorers are the best way to see blockchain in action. Try searching for your own address after making a transaction!',
        completed: false
      },
      {
        title: 'Understand Block Data',
        tasks: [
          'Find a block with transactions',
          'Identify the block hash, parent hash, and timestamp',
          'Calculate how old the block is',
          'List all transactions in the block'
        ],
        hint: 'Look for the "Parent Hash" field - this links blocks together!',
        completed: false
      }
    ]
  },
  {
    id: 'decentralization',
    title: 'Decentralization',
    subtitle: 'The core philosophy of blockchain',
    icon: '🌐',
    color: '#8b5cf6',
    sections: [
      {
        title: 'What is Decentralization?',
        content: `Decentralization means distributing power and control away from a central authority to many participants.

In traditional systems:
- Banks control your money
- Governments control IDs and records
- Tech companies control your data
- Companies control the apps you use

In decentralized systems:
- No single entity has control
- Everyone follows the same rules (protocol)
- Decisions are made by majority consensus
- No single point of failure`,

        code: null
      },
      {
        title: 'Types of Decentralization',
        content: `There are three dimensions to decentralization:

**1. ARCHITECTURAL DECENTRALIZATION**
How many computers run the system?
- More computers = more decentralized
- Bitcoin has 10,000+ nodes
- Ethereum has 5,000+ nodes

**2. POLITICAL DECENTRALIZATION**
Who controls those computers?
- Ideally, no single person or group controls most nodes
- Anyone can run a node
- Power is distributed among many independent operators

**3. LOGICAL DECENTRALIZATION**
Is the data structure itself centralized or decentralized?
- Blockchain is logically decentralized (one shared "world computer")
- Traditional databases are logically centralized`,
        code: null
      },
      {
        title: 'Benefits of Decentralization',
        content: `**NO SINGLE POINT OF FAILURE**
If one computer (or even thousands) fails, the network keeps running. This is why blockchain can operate 24/7 without downtime.

**CENSORSHIP RESISTANCE**
No government or company can block transactions. Once your transaction is valid, it will be included in a block.

**FAIRNESS**
Everyone follows the same rules. No special treatment for big players. The protocol applies equally to everyone.

**TRANSPARENCY**
Anyone can verify what's happening. This reduces corruption and increases trust.

**USER SOVEREIGNTY**
You own your assets and data. You don't need permission to use the network.

**SECURITY**
Attacking a decentralized network requires controlling most of the network - extremely expensive and practically impossible for major blockchains.`,
        code: null
      },
      {
        title: 'Decentralization Spectrum',
        content: `Not all blockchains are equally decentralized. It's a spectrum:

**HIGH DECENTRALIZATION**
- Bitcoin (most decentralized)
- Ethereum
- Many proof-of-stake chains with large validator sets

**MEDIUM DECENTRALIZATION**
- Some L2 solutions
- Chains with fewer validators

**LOW DECENTRALIZATION**
- Private/permissioned blockchains
- Consortium chains
- Some proof-of-stake chains with small validator sets

Factors affecting decentralization:
- Number of nodes
- Geographic distribution
- Barriers to entry (hardware, stake required)
- Governance structure`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What does decentralization mean in blockchain?',
        options: [
          'One company controls everything',
          'Power and control are distributed among many participants',
          'The blockchain is not connected to the internet',
          'Only rich people can participate'
        ],
        correct: 1
      },
      {
        question: 'Why is decentralization important for security?',
        options: [
          'It makes transactions faster',
          'It requires attacking many computers simultaneously to compromise the network',
          'It allows the government to help',
          'It makes the blockchain free to use'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Analyze Node Distribution',
        tasks: [
          'Visit node monitoring sites (like staking rewards)',
          'Find the number of validators on Ethereum',
          'Check geographic distribution of nodes',
          'Compare with Bitcoin'
        ],
        hint: 'Look for "client distribution" - if most nodes run the same software, there could be security risks!',
        completed: false
      }
    ]
  },
  {
    id: 'cryptography',
    title: 'Cryptography & Hashing',
    subtitle: 'The security foundations of blockchain',
    icon: '🔐',
    color: '#06b6d4',
    sections: [
      {
        title: 'Introduction to Cryptography in Blockchain',
        content: `Cryptography is the practice of secure communication, and it's the backbone of blockchain security. Blockchain uses two main types of cryptography:

**1. HASH FUNCTIONS**
Take any input and produce a fixed-size output (hash). Used to create unique fingerprints of data.

**2. PUBLIC-KEY CRYPTOGRAPHY**
Uses key pairs (private and public) to verify ownership and authorize transactions.

Together, these ensure that:
- Your transactions are really from you
- Data can't be tampered with
- The blockchain is immutable`,
        code: null
      },
      {
        title: 'Hash Functions Deep Dive',
        content: `A hash function is like a digital fingerprint for any data. You put in any amount of data, and you get a fixed-size string of characters.

**Properties of Good Hash Functions:**

1. **DETERMINISTIC**: Same input always produces same output
   - "Hello" → always → "2cf24dba5fb0..."

2. **QUICK TO COMPUTE**: Fast to calculate
   - Important for processing thousands of transactions

3. **PRE-IMAGE RESISTANT**: Can't work backwards
   - You have hash, can't find original input

4. **COLLISION RESISTANT**: Two different inputs very unlikely to produce same hash

5. **AVALANCHE EFFECT**: Small change in input → COMPLETELY different output
   - "Hello" → "2cf24dba..."
   - "hello" → "a590fafb..."

**Common Hash Algorithms:**
- SHA-256 (Bitcoin) - 256 bits output
- Keccak-256 (Ethereum) - 256 bits output
- SHA-3 (newer standard)`,
        code: `// SHA-256 Example
Input: "Hello, Blockchain!"
Output: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

// Avalanche Effect - change one letter
Input: "Hello, blockchain!"
Output: a590fafb4d8e3b3e8e1e4d7b5c9a2f1e3d5c7e9f1a3b5d7e9f1c3d5e7f9a1b3

// Notice COMPLETELY different output!`
      },
      {
        title: 'Digital Signatures',
        content: `Digital signatures prove that a transaction was authorized by the owner of the funds.

**How it works:**

1. **GENERATE KEYS**
   - You have a private key (secret, never share!)
   - You have a public key (share with everyone)

2. **SIGN TRANSACTION**
   - When you send crypto, you use your private key to create a mathematical signature
   - This signature proves you own the private key without revealing it

3. **VERIFY SIGNATURE**
   - Anyone can use your public key to verify the signature is valid
   - This proves the transaction is really from you

**ECDSA (Elliptic Curve Digital Signature Algorithm)**
- Used by Bitcoin and Ethereum
- Based on elliptic curve cryptography
- Provides strong security with relatively short keys

**SECURITY REMINDER**: Never share your private key or seed phrase! Anyone with it can steal your crypto.`,
        code: `// Transaction Signing Process
{
  "transaction": {
    "from": "0x1234...abcd",
    "to": "0x5678...efgh",
    "amount": 1.0,
    "nonce": 5,
    "gasPrice": 20000000000
  },
  "signature": "0xabcdef...123456789", // Created using private key
  "publicKey": "0xpubkey...abc" // Anyone can verify
}

// Verification
isValid = verifySignature(transaction, signature, publicKey)
// Returns true if signature is valid`
      },
      {
        title: 'Merkle Trees',
        content: `A Merkle tree (or hash tree) is a data structure that efficiently organizes all transactions in a block.

**How it works:**

1. Each transaction is hashed
2. Pairs of transaction hashes are combined and hashed again
3. This continues until there's one single hash - the "Merkle Root"

**Why Merkle Trees matter:**

1. **EFFICIENCY**: You can verify a specific transaction exists without downloading all transactions
2. **SPV (Simplified Payment Verification)**: Light wallets use Merkle proofs to verify payments
3. **DATA INTEGRITY**: Any change to any transaction changes the Merkle root

**Structure Example:** Merkle Root -> Hash01 + Hash23 -> Txn1-4`,
        code: `// Merkle Tree Structure
// Level 1: Individual transaction hashes
Hash(Tx1) = "a1b2c3..."
Hash(Tx2) = "d4e5f6..."
Hash(Tx3) = "g7h8i9..."
Hash(Tx4) = "j1k2l3..."

// Level 2: Pair hashes
Hash(1-2) = Hash(Hash(Tx1) + Hash(Tx2)) = "m4n5o6..."
Hash(3-4) = Hash(Hash(Tx3) + Hash(Tx4)) = "p7q8r9..."

// Level 3: Merkle Root
MerkleRoot = Hash(Hash(1-2) + Hash(3-4)) = "s1t2u3..."
        `
      },
      {
        title: 'Public Key Cryptography',
        content: `Public-key cryptography (also called asymmetric cryptography) uses two mathematically related keys:

**PRIVATE KEY**
- Kept secret - NEVER share with anyone
- Used to sign transactions
- Essentially your "password" to your crypto
- Usually 256 bits (32 bytes)
- Example: 0x1234...abcd

**PUBLIC KEY**
- Derived from private key (can calculate, but not reverse)
- Can be shared with anyone
- Used to verify your signatures
- Usually 512 bits (64 bytes)

**HOW WALLETS WORK**
When you create a wallet:
1. Generate random private key
2. Calculate public key from private key
3. Calculate address from public key

Your address is like your bank account number - share it to receive funds. Your private key is like your PIN - never share it!`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is a hash function?',
        options: [
          'A way to encrypt messages so only the recipient can read them',
          'A function that takes any input and produces a fixed-size unique output',
          'A type of cryptocurrency',
          'A database'
        ],
        correct: 1
      },
      {
        question: 'What would happen to the block hash if you change one transaction?',
        options: [
          'Nothing changes',
          'The hash changes slightly',
          'The hash changes completely (avalanche effect)',
          'The blockchain crashes'
        ],
        correct: 2
      },
      {
        question: 'What is your private key used for?',
        options: [
          'To receive cryptocurrency',
          'To sign transactions and prove ownership',
          'To view the blockchain',
          'To create a wallet address'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Explore Hash Functions',
        tasks: [
          'Find an online SHA-256 calculator',
          'Type different inputs and observe the outputs',
          'Try the avalanche effect - change one character',
          'Note how completely different the outputs are'
        ],
        hint: 'Try typing "Blockchain" vs "blockchain" - see how different the hashes are!',
        completed: false
      },
      {
        title: 'Understand Merkle Proofs',
        tasks: [
          'Find a transaction in a block explorer',
          'Look for Merkle proof data',
          'Understand how SPV wallets verify transactions',
          'Explain to yourself how this provides security'
        ],
        hint: 'Block explorers show the Merkle path for transactions!',
        completed: false
      }
    ]
  },
  {
    id: 'consensus',
    title: 'Consensus Mechanisms',
    subtitle: 'How blockchains agree on truth',
    icon: '⚖️',
    color: '#10b981',
    sections: [
      {
        title: 'What is Consensus?',
        content: `Consensus is how all nodes in a blockchain network agree on which transactions are valid and what the current state of the blockchain is.

The problem: How do you get thousands of strangers around the world to agree on something without trusting each other?

The solution: Consensus mechanisms - mathematical and economic rules that make it:
- Expensive to attack the network
- Profitable to be honest
- Clear what constitutes "truth"

Different blockchains use different consensus mechanisms, each with tradeoffs between:
- Security
- Decentralization
- Speed/Scalability`,
        code: null
      },
      {
        title: 'Proof of Work (PoW)',
        content: `Proof of Work is the original consensus mechanism, used by Bitcoin.

**How it works:**
1. Miners collect transactions into a block
2. Miners compete to solve a complex mathematical puzzle
3. First miner to solve it gets to add the block
4. They receive block rewards (new coins) + transaction fees
5. Other nodes verify and accept the block

**The Puzzle:**
Find a number (nonce) that when combined with block data and hashed, produces a hash starting with a certain number of zeros. This is essentially guessing!

**Why it works:**
- The puzzle is hard to solve but easy to verify
- Attacking requires 51% of network's computing power
- Honest mining is more profitable than attacking

**Pros:**
- Most battle-tested and secure
- High resistance to attack

**Cons:**
- Energy intensive
- Slower transactions (~7 TPS for Bitcoin)
- Centralization risk (mining pools)`,
        code: `// Mining Process Pseudocode
while (true) {
  block.header.nonce = random_number
  hash = sha256(block.header)

  if (hash < target) {
    // Block found!
    broadcast_block()
    receive_reward()
    break
  }
}

// Target example:
// "0000" + 60 more characters
// Only 1 in 2^60+ chances to find it!`
      },
      {
        title: 'Proof of Stake (PoS)',
        content: `Proof of Stake is the most popular alternative to PoW, used by Ethereum (after The Merge).

**How it works:**
1. Validators lock up (stake) their cryptocurrency as collateral
2. A validator is randomly selected to propose the next block
3. Other validators attest to the block
4. If block is valid, validators receive rewards
5. If validator acts maliciously, their stake is slashed (burned)

**Key differences from PoW:**
- No expensive mining equipment needed
- Much lower energy consumption
- More accessible (anyone can stake)
- Faster block times

**Ethereum's PoS:**
- Minimum stake: 32 ETH
- Validator duties: Proposing blocks + attesting to others
- Rewards: ~4-5% annual return on staked ETH
- Slashing: Malicious behavior loses up to 100% of stake`,
        code: `// PoS Validator Selection (Simplified)
// Pseudorandom selection based on:
function selectValidator(stakers, randomSeed) {
  // Each validator's chance proportional to their stake
  totalStake = sum(stakers.map(s => s.amount))

  for (validator of stakers) {
    chance = validator.amount / totalStake
    if (random() < chance) {
      return validator
    }
  }
}

// Rewards calculation
reward = base_reward * validator_score
// Higher uptime = higher rewards`
      },
      {
        title: 'Other Consensus Mechanisms',
        content: `**DELEGATED PROOF OF STAKE (DPoS)**
Used by: EOS, Tron, Polygon
- Token holders vote for a small number of validators
- Faster, but less decentralized
- Like representative democracy

**PROOF OF HISTORY (PoH)**
Used by: Solana
- Creates a historical record proving that an event occurred at a specific time
- Acts as a cryptographic clock
- Enables very high throughput

**BYZANTINE FAULT TOLERANCE (BFT)**
Used by: Hyperledger, some cosmos chains
- Can tolerate up to 1/3 of nodes being malicious
- Fast finality
- Requires known validators (permissioned)

**PROOF OF AUTHORITY (PoA)**
Used by: some private chains
- Validators are known, trusted entities
- Very fast, but centralized
- Like a corporate internal system`,
        code: null
      },
      {
        title: '51% Attack',
        content: `A 51% attack (also called majority attack) is when someone controls more than half of the network's computing/staking power.

**What an attacker can do:**
- Reverse transactions they made (double-spend)
- Prevent new transactions from confirming
- Not: Steal others' funds directly (they don't have the private keys)

**What an attacker CANNOT do:**
- Create new coins out of thin air
- Access other people's wallets
- Change historical rules of the protocol

**Why it's impractical on major chains:**
- Bitcoin: Would cost billions in equipment/energy
- Ethereum: Would require buying half of all ETH (worth billions)
- Even if successful, attack would destroy trust, crashing the currency's value

For this reason, 51% attacks are mostly a concern on smaller chains.`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is the main purpose of consensus mechanisms?',
        options: [
          'To make transactions free',
          'To get all nodes to agree on the state of the blockchain',
          'To make blockchain faster',
          'To store more data'
        ],
        correct: 1
      },
      {
        question: 'In Proof of Work, what do miners compete to find?',
        options: [
          'A lost cryptocurrency wallet',
          'A nonce that produces a valid hash',
          'New blocks to add',
          'The private key to an address'
        ],
        correct: 1
      },
      {
        question: 'What happens if a validator acts maliciously in Proof of Stake?',
        options: [
          'They get a warning',
          'They are ignored',
          'Their staked cryptocurrency is slashed (burned)',
          'They become the leader'
        ],
        correct: 2
      }
    ],
    exercises: [
      {
        title: 'Compare Consensus Mechanisms',
        tasks: [
          'Research Bitcoin (PoW) vs Ethereum (PoS)',
          'Compare energy consumption',
          'Compare transaction speed',
          'Analyze security models'
        ],
        hint: 'Look up "Bitcoin energy consumption" vs "Ethereum energy consumption" - the difference is huge!',
        completed: false
      }
    ]
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contracts',
    subtitle: 'Self-executing code on blockchain',
    icon: '📝',
    color: '#f59e0b',
    sections: [
      {
        title: 'What are Smart Contracts?',
        content: `A smart contract is a self-executing program stored on the blockchain that automatically enforces and executes agreements when predetermined conditions are met.

**Key Concept: "If This, Then That"**
- If condition X is met
- Then action Y happens automatically
- No middleman needed!

**Real-world analogy:**
A vending machine:
- You put in money (condition)
- Machine automatically gives you the snack (action)
- No human cashier needed

**In blockchain:**
- Condition: "If address A sends 1 ETH to this contract"
- Action: "Then send them 100 tokens"

**Key Characteristics:**
- **AUTONOMOUS**: No human intervention needed
- **TRANSPARENT**: Code is public and visible
- **IMMUTABLE**: Can't be changed after deployment
- **DETERMINISTIC**: Same input = same output
- **TRUSTLESS**: Parties don't need to trust each other`,
        code: `// Simple Smart Contract Example
// If someone sends 1 ETH, they get 100 tokens

contract TokenSale {
    address public owner;
    uint256 public price = 1 ether;
    mapping(address => uint256) public balances;

    function buyTokens() public payable {
        require(msg.value >= price, "Not enough ETH");
        balances[msg.sender] += 100;
    }

    function withdraw() public {
        require(msg.sender == owner);
        payable(owner).transfer(address(this).balance);
    }
}`
      },
      {
        title: 'Solidity - The Language of Ethereum',
        content: `Solidity is the primary programming language for writing smart contracts on Ethereum and EVM-compatible blockchains.

**Getting Started with Solidity:**

**1. Pragma**
Specifies the compiler version
\`\`\`solidity
pragma solidity ^0.8.19;
\`\`\`

**2. Contract**
The basic building block - like a class in other languages
\`\`\`solidity
contract MyContract {
    // contract code here
}
\`\`\`

**3. Variables**
- State variables: Stored on blockchain permanently
- Local variables: Only exist during function execution

\`\`\`solidity
contract Storage {
    uint256 public myNumber;  // State variable
    string public myString;   // State variable

    function setNumber(uint256 _num) public {
        myNumber = _num;  // Save to blockchain
    }
}
\`\`\`

**4. Functions**
\`\`\`solidity
function getNumber() public view returns (uint256) {
    return myNumber;  // view = read-only
}
\`\`\`

**Key Solidity Concepts:**
- \`msg.sender\`: Address that called the function
- \`msg.value\`: Amount of ETH sent
- \`block.timestamp\`: Current block time
- \`storage\`: Permanent blockchain storage
- \`memory\`: Temporary storage (like RAM)`,
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    // State variables - stored on blockchain
    uint256 private storedData;
    address public owner;
    mapping(address => uint256) public values;

    // Events - logs that can be searched
    event ValueChanged(uint256 newValue);

    // Constructor - runs once on deployment
    constructor() {
        owner = msg.sender;
    }

    // Write function - modifies blockchain
    function set(uint256 x) public {
        storedData = x;
        values[msg.sender] = x;
        emit ValueChanged(x);
    }

    // Read function - doesn't modify blockchain
    function get() public view returns (uint256) {
        return storedData;
    }

    // Function with access control
    function reset() public {
        require(msg.sender == owner, "Not owner");
        storedData = 0;
    }
}`
      },
      {
        title: 'ERC Token Standards',
        content: `ERC (Ethereum Request for Comments) standards define how tokens work on Ethereum.

**ERC-20: Fungible Tokens**
Used for: Cryptocurrencies, governance tokens, utility tokens
- Every token is identical (like dollar bills)
- Total supply is fixed or dynamic
- Transferable between addresses

**Key ERC-20 Functions:**
\`\`\`solidity
function transfer(address to, uint256 amount) external returns (bool);
function balanceOf(address account) external view returns (uint256);
function totalSupply() external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
\`\`\`

**ERC-721: Non-Fungible Tokens (NFTs)**
Used for: Digital art, collectibles, game items, tickets
- Each token is UNIQUE
- Cannot be divided
- Owner is tracked per token ID

**ERC-1155: Multi-Token Standard**
Used for: Games,批量tokens
- Supports both fungible and non-fungible
- More efficient than multiple ERC-721
- Batch transfers supported

**ERC-4626: Vault Standard**
Used for: Tokenized vaults (like Yearn)
- Standard interface for yield-bearing vaults
- Deposit tokens, receive vault shares`,
        code: `// ERC-20 Token Contract

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18;

    constructor() ERC20("My Token", "MTK") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Mint new tokens (only owner)
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    // Burn tokens
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`
      },
      {
        title: 'Development Tools',
        content: `**REMIX IDE**
- Web-based IDE, no installation needed
- Great for beginners
- Built-in compiler, debugger, deployment
- remix.ethereum.org

**HARDHAT**
- Local Ethereum development environment
- Fast compilation
- Built-in Solidity testing
- Great for serious development

**FOUNDRY**
- Lightning fast Solidity testing framework
- Written in Rust
- Forge (testing) + Cast (interacting)
- Best for TDD

**TRUFFLE**
- Full-stack development framework
- Built-in smart contract compilation, migration, testing
- Web3.js integration
- Legacy but still used

**ETHERSCAN**
- Block explorer (etherscan.io)
- Also: Verify and publish contract source code
- Read/Write contract interface

**TENDERLY**
- Smart contract monitoring and debugging
- Gas profiler
- Transaction simulation
- Alerting`,
        code: null
      },
      {
        title: 'Smart Contract Security',
        content: `Smart contract vulnerabilities have led to billions in losses. Here are the critical ones:

**1. REENTRANCY**
The infamous DAO hack ($3.6M lost in 2016)
- Attacker calls back the contract before state updates
- Use: checks-effects-interactions pattern
- Use: ReentrancyGuard from OpenZeppelin

**2. INTEGER OVERFLOW/UNDERFLOW**
- Before Solidity 0.8: uint can wrap around
- max uint + 1 = 0
- Use: SafeMath or Solidity 0.8+

**3. ACCESS CONTROL**
- Forgetting to restrict sensitive functions
- Use: require(msg.sender == owner)

**4. FRONT-RUNNING**
- Attackers see pending transactions and pay higher gas
- Solution: Commit-reveal schemes

**5. ORACLE MANIPULATION**
- Fake price data manipulating DeFi
- Use: Decentralized oracles (Chainlink)

**BEST PRACTICES:**
- Use OpenZeppelin contracts (audited)
- Comprehensive testing
- Professional audits
- Bug bounty programs`,
        code: `// VULNERABLE CONTRACT (DO NOT USE!)
contract Vulnerable {
    mapping(address => uint256) public balances;

    function withdraw() public {
        // BUG: External call before state change
        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success);
        balances[msg.sender] = 0;  // Too late!
    }
}

// SECURE CONTRACT
contract Secure {
    mapping(address => uint256) public balances;

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");

        // Effect first (state change)
        balances[msg.sender] = 0;

        // Then interaction
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}`
      }
    ],
    quiz: [
      {
        question: 'What is a smart contract?',
        options: [
          'A legal document signed by lawyers',
          'Self-executing code on blockchain that automatically enforces agreements',
          'A type of cryptocurrency',
          'A web application'
        ],
        correct: 1
      },
      {
        question: 'What does "immutable" mean for smart contracts?',
        options: [
          'They can be changed anytime',
          'They cannot be modified after deployment',
          'They are free to use',
          'They are automatically executed'
        ],
        correct: 1
      },
      {
        question: 'Which vulnerability was exploited in the famous DAO hack?',
        options: [
          'Integer overflow',
          'Reentrancy',
          'Front-running',
          'Access control'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Deploy Your First Smart Contract',
        tasks: [
          'Go to remix.ethereum.org',
          'Create a new file called Storage.sol',
          'Copy the SimpleStorage code',
          'Deploy to Injected Web3 (MetaMask testnet)',
          'Interact with the contract'
        ],
        hint: 'Use the "Deploy & Run Transactions" tab in Remix. Make sure you have a testnet wallet with some test ETH!',
        completed: false
      },
      {
        title: 'Create an ERC-20 Token',
        tasks: [
          'Import OpenZeppelin ERC20 contract',
          'Create MyToken with name, symbol, supply',
          'Deploy to testnet',
          'Check your balance in MetaMask'
        ],
        hint: 'Import from npm: @openzeppelin/contracts/token/ERC20/ERC20.sol',
        completed: false
      }
    ]
  },
  {
    id: 'web3-libraries',
    title: 'Web3 Libraries & Frontend',
    subtitle: 'Building dApp frontends',
    icon: '💻',
    color: '#ec4899',
    sections: [
      {
        title: 'What is a dApp?',
        content: `A dApp (decentralized application) is like a regular web app, but:
- Backend code runs on a decentralized network (blockchain)
- Frontend can be hosted anywhere (IPFS, traditional servers)
- Users connect with crypto wallets instead of usernames/passwords

**Traditional App vs dApp:**
\`\`\`
Traditional:  User → Server (central) → Database

dApp:        User → Wallet → Blockchain (decentralized) → Smart Contract
\`\`\`

**How it works:**
1. User visits dApp website
2. User clicks "Connect Wallet"
3. Wallet popup appears, user approves
4. dApp can now read blockchain data and request transactions
5. User signs transactions with wallet
6. Transaction goes to blockchain
7. dApp updates to show result`,
        code: null
      },
      {
        title: 'ethers.js',
        content: `ethers.js is the most popular JavaScript library for interacting with Ethereum.

**Installation:**
\`\`\`bash
npm install ethers
\`\`\`

**Basic Usage:**
\`\`\`javascript
import { ethers } from 'ethers';

// Connect to blockchain (Infura/Alchemy or public RPC)
const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR-KEY');

// Or use window.ethereum (MetaMask)
const provider = new ethers.BrowserProvider(window.ethereum)

// Get wallet connection
const signer = await provider.getSigner()

// Read contract
const contract = new ethers.Contract(
  contractAddress,
  abi,
  provider
)
const result = await contract.methodName()

// Write to contract
const tx = await contract.connect(signer).methodName(params)
await tx.wait()
\`\`\`

**Key Concepts:**
- Provider: Connection to blockchain
- Signer: Wallet that can sign transactions
- Contract: Interface to smart contract
- ABI: Application Binary Interface (how to call contract)`,
        code: `// Complete dApp Example - Read & Write

import { ethers } from 'ethers';

async function connectWallet() {
  if (!window.ethereum) throw new Error("No wallet!");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}

async function readContract() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const daiAddress = '0x6B175474E89094C44Da98b954EesADe2DD9C2fBD';
  const abi = [
    'function name() view returns (string)',
    'function balanceOf(address) view returns (uint256)'
  ];

  const dai = new ethers.Contract(daiAddress, abi, provider);
  const name = await dai.name();
  const balance = await dai.balanceOf(userAddress);

  return { name, balance };
}

async function writeContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(addr, abi, signer);
  const tx = await contract.transfer(toAddress, amount);
  await tx.wait();
}`
      },
      {
        title: 'wagmi & React Hooks',
        content: `wagmi is a React library that provides hooks for Ethereum. It makes building dApps much easier!

**Installation:**
\`\`\`bash
npm install wagmi viem @tanstack/react-query
\`\`\`

**Core Hooks:**
\`\`\`javascript
import { useConnectWallet, useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi'
import { wagmiConfig } from './config'

// Connect wallet
const { connectors } = useConnectWallet()

// Get current account
const { address, isConnected } = useAccount()

// Read blockchain data
const { data: balance } = useBalance({
  address: userAddress
})

// Read contract
const { data: tokenName } = useReadContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: 'name'
})

// Write contract (send transaction)
const { writeContract } = useWriteContract()
writeContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: 'transfer',
  args: [toAddress, amount]
})
\`\`\`

**RainbowKit**
Popular wallet connection UI that works great with wagmi.
\`\`\`javascript
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
\`\`\``,
        code: null
      },
      {
        title: 'viem - Modern Ethereum Library',
        content: `viem is a new, type-safe Ethereum library. It's lighter and faster than ethers.js.

**Why viem?**
- TypeScript-first
- Smaller bundle size
- Modern API design
- Used by Wagmi v2

**Basic Usage:**
\`\`\`javascript
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

// Public client (read-only)
const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

// Read data
const blockNumber = await client.getBlockNumber()

// Wallet client (sign transactions)
const walletClient = createWalletClient({
  chain: sepolia,
  transport: window.ethereum ? window.ethereum : http()
})

// Send transaction
const hash = await walletClient.sendTransaction({
  account: address,
  to: '0x...',
  value: parseEther('0.01')
})
\`\`\``,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What does a dApp use instead of a database?',
        options: [
          'No data storage',
          'Blockchain and smart contracts',
          'Cloud storage like AWS',
          'Local storage'
        ],
        correct: 1
      },
      {
        question: 'What do users need to connect to a dApp?',
        options: [
          'Username and password',
          'Crypto wallet (like MetaMask)',
          'Email verification',
          'Phone number'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Build a Simple dApp',
        tasks: [
          'Create a React app with Vite',
          'Install ethers.js or wagmi',
          'Add wallet connection button',
          'Display user address when connected'
        ],
        hint: 'Start with just "Connect Wallet" functionality. Make sure to handle "no wallet installed" case!',
        completed: false
      }
    ]
  },
  {
    id: 'defi',
    title: 'DeFi - Decentralized Finance',
    subtitle: 'Financial services without banks',
    icon: '🏦',
    color: '#14b8a6',
    sections: [
      {
        title: 'What is DeFi?',
        content: `DeFi (Decentralized Finance) recreates traditional financial services using smart contracts - no banks, no intermediaries.

**Traditional Finance:**
- Bank holds your money
- You trust the bank to not lose it
- You pay fees for every transaction
- Limited by bank hours and location

**DeFi:**
- Your money is in your wallet (you control it)
- Code (smart contracts) handles everything
- Lower fees, open to anyone
- 24/7, available worldwide

**Core DeFi Building Blocks:**
- Lending/Borrowing
- Decentralized Exchanges (DEX)
- Stablecoins
- Derivatives
- Insurance
- Fund management

**TVL (Total Value Locked):**
The total value of crypto locked in DeFi protocols. At peak (2021), over $150 billion!`,
        code: null
      },
      {
        title: 'Lending & Borrowing',
        content: `DeFi lending allows anyone to lend their crypto and earn interest, or borrow crypto using collateral.

**How Lending Works:**
1. You deposit crypto (like ETH or USDC) into a lending protocol
2. Other users can borrow that crypto
3. You earn interest (APY)
4. Interest comes from borrowers paying fees

**How Borrowing Works:**
1. You deposit collateral (must be worth MORE than what you borrow)
2. This is called over-collateralization
3. You can borrow up to a certain percentage (e.g., 75%)
4. If your collateral drops too low, it gets liquidated

**Popular Lending Protocols:**
- **Aave**: Largest, most popular
- **Compound**: Pioneer of DeFi lending
- **MakerDAO**: Creates DAI stablecoin

**Example:**
- Deposit 1 ETH (worth $2000)
- Borrow up to 1500 DAI (~$1500)
- Keep your ETH, use DAI for other things
- Pay interest on DAI, earn interest on ETH`,
        code: `// Lending Protocol Core Logic (Simplified)

contract LendingPool {
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public borrows;
    uint256 public totalDeposits;
    uint256 public totalBorrows;

    // Deposit tokens
    function deposit(address token, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
        totalDeposits += amount;
    }

    // Borrow against collateral
    function borrow(address token, uint256 amount) external {
        require(deposits[msg.sender] >= amount * 150 / 100, "Insufficient collateral");
        // 150% collateral ratio
        borrows[msg.sender] += amount;
        IERC20(token).transfer(msg.sender, amount);
    }

    // Calculate interest (simplified)
    function calculateInterest() internal view returns (uint256) {
        return (totalBorrows * 5 / 1000); // ~0.5% interest
    }
}`
      },
      {
        title: 'Decentralized Exchanges (DEX)',
        content: `DEXs allow users to trade crypto directly from their wallets - no order book, no centralized exchange.

**How AMMs Work:**
Unlike traditional exchanges with order books, AMMs (Automated Market Makers) use liquidity pools.

**Key Concepts:**
- **Liquidity Pool**: Pairs of tokens (e.g., ETH/USDC)
- **Liquidity Providers (LPs)**: People who deposit tokens into pools
- **Traders**: People who swap one token for another

**Pricing:**
Uses mathematical formula (usually x * y = k)
- As you buy more ETH, the price increases
- As you sell ETH, the price decreases
- This is automatic - no market makers needed!

**Popular DEXs:**
- **Uniswap**: Largest, most popular
- **Sushiswap**: Fork of Uniswap with extra features
- **Curve**: Specialized in stablecoin swaps

**LP Tokens:**
When you provide liquidity, you receive LP tokens representing your share. These can earn:
- Trading fees (0.3% typically)
- Protocol rewards (extra tokens)`,
        code: `// AMM Constant Product Formula (Simplified)

contract AMM {
    address public token0;
    address public token1;
    uint256 public reserve0;
    uint256 public reserve1;

    // Add liquidity
    function addLiquidity(uint256 amount0, uint256 amount1) external {
        IERC20(token0).transferFrom(msg.sender, address(this), amount0);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);
        reserve0 += amount0;
        reserve1 += amount1;
    }

    // Swap tokens (x * y = k)
    function swap(address fromToken, uint256 amountIn) external {
        require(amountIn > 0);

        (address tokenIn, address tokenOut, uint256 resIn, uint256 resOut) =
            fromToken == token0
                ? (token0, token1, reserve0, reserve1)
                : (token1, token0, reserve1, reserve0);

        // Calculate output using constant product formula
        uint256 amountInWithFee = amountIn * 997; // 0.3% fee
        uint256 numerator = amountInWithFee * resOut;
        uint256 denominator = resIn * 1000 + amountInWithFee;
        uint256 amountOut = numerator / denominator;

        IERC20(tokenOut).transfer(msg.sender, amountOut);

        // Update reserves
        if (fromToken == token0) {
            reserve0 += amountIn;
            reserve1 -= amountOut;
        } else {
            reserve1 += amountIn;
            reserve0 -= amountOut;
        }
    }
}`
      },
      {
        title: 'Stablecoins',
        content: `Stablecoins are cryptocurrencies designed to maintain a stable value, usually pegged to a fiat currency like the US Dollar.

**Types of Stablecoins:**

**1. Fiat-Collateralized**
- Backed 1:1 by USD in bank accounts
- Examples: USDC, USDT, BUSD
- Centralized, requires trust in issuer

**2. Crypto-Collateralized**
- Backed by other crypto (over-collateralized)
- Example: DAI (backed by ETH, other tokens)
- Decentralized, trustless

**3. Algorithmic**
- Uses algorithms to maintain peg
- Examples: UST (now collapsed), FRAX
- Controversial - can fail if demand drops

**Why Stablecoins Matter:**
- Escape crypto volatility
- Transfer money globally, quickly, cheaply
- Earn yield (stablecoins in DeFi)
- On/off ramp between fiat and crypto`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is over-collateralization in DeFi?',
        options: [
          'Borrowing more than you can afford',
          'Providing collateral worth MORE than what you borrow',
          'Using two different wallets',
          'Having more than one loan'
        ],
        correct: 1
      },
      {
        question: 'What is an AMM?',
        options: [
          'A type of cryptocurrency',
          'Automated Market Maker - uses liquidity pools instead of order books',
          'A decentralized exchange',
          'A wallet'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Explore DeFi Protocols',
        tasks: [
          'Visit Aave.com and see current interest rates',
          'Check Uniswap to see token swap prices',
          'Understand how price impact works',
          'Calculate potential earnings from lending'
        ],
        hint: 'Always check the "APY" (Annual Percentage Yield) - it can change daily!',
        completed: false
      }
    ]
  },
  {
    id: 'nfts',
    title: 'NFTs - Non-Fungible Tokens',
    subtitle: 'Digital ownership and uniqueness',
    icon: '🎨',
    color: '#ef4444',
    sections: [
      {
        title: 'What are NFTs?',
        content: `NFT stands for Non-Fungible Token. "Non-fungible" means unique - each token is different and cannot be replaced with another.

**Fungible vs Non-Fungible:**
- Fungible: One dollar bill = another dollar bill (interchangeable)
- Non-fungible: The Mona Lisa = not equal to any other painting (unique)

**What can NFTs represent?**
- Digital art
- Music
- Videos
- Virtual land
- Game items
- Domain names
- Tickets
- Certificates
- Real estate (tokenized)

**Key Points:**
- NFTs are stored on blockchain (usually Ethereum)
- Ownership is verifiable - anyone can prove they own the NFT
- Royalties can be built into smart contracts (artists earn on secondary sales)
- NFTs can contain metadata (images, descriptions)`,
        code: null
      },
      {
        title: 'ERC-721 Standard',
        content: `ERC-721 is the standard for NFTs on Ethereum. Each NFT has a unique ID.

**Core Interface:**
\`\`\`solidity
interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}
\`\`\`

**Metadata (JSON):**
\`\`\`json
{
  "name": "My NFT",
  "description": "A beautiful digital artwork",
  "image": "ipfs://QmXxx...",
  "attributes": [
    {"trait_type": "Background", "value": "Blue"},
    {"trait_type": "Rarity", "value": "Legendary"}
  ]
}
\`\`\`

**Token URI:**
The metadata is accessed via a "tokenURI" function that returns the JSON URL.`,
        code: `// Simple ERC-721 NFT Contract

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public tokenCounter;
    string public baseURI;

    constructor() ERC721("My NFT", "MNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintNFT(address recipient, string memory _tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        tokenCounter++;
        return newTokenId;
    }

    // Set base URI for metadata
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}`
      },
      {
        title: 'NFT Use Cases Beyond Art',
        content: `**GAMING**
- In-game items as NFTs
- Trade across games
- True ownership of items
- Play-to-earn games

**DOMAIN NAMES**
- Ethereum Name Service (ENS)
- Human-readable addresses
- e.g., "john.eth" instead of "0x123..."

**TICKETING**
- Event tickets as NFTs
- Prevent counterfeiting
- Resale with automatic royalties
- Track attendance

**REAL WORLD ASSETS**
- Tokenized real estate
- Fractional ownership
- Stock-like tokens for art, wine, etc.

**IDENTITY & CREDENTIALS**
- Digital diplomas
- Professional certifications
- Membership cards
- Voting rights

**FRACTIONAL NFTs**
- Split expensive NFTs into many tokens
- Multiple people can own a fraction
- Trading on secondary markets`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What does "non-fungible" mean?',
        options: [
          'The token cannot be sold',
          'Each token is unique and cannot be replaced',
          'The token is backed by something',
          'The token is divisible'
        ],
        correct: 1
      },
      {
        question: 'What standard defines NFTs on Ethereum?',
        options: [
          'ERC-20',
          'ERC-721',
          'ERC-1155',
          'ERC-4626'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Explore NFT Marketplaces',
        tasks: [
          'Visit OpenSea or Blur',
          'Look at different NFT collections',
          'Check floor prices and trading volume',
          'Understand metadata and attributes'
        ],
        hint: 'Look at "floor price" - the lowest price for any item in the collection!',
        completed: false
      }
    ]
  },
  {
    id: 'layer2',
    title: 'Layer 2 & Scaling',
    subtitle: 'Making blockchain faster and cheaper',
    icon: '📈',
    color: '#84cc16',
    sections: [
      {
        title: 'The Scaling Problem',
        content: `Blockchains face a fundamental challenge: the "trilemma"
- Decentralization
- Security
- Scalability

You can only optimize for 2 out of 3!

Bitcoin processes ~7 TPS (transactions per second)
Ethereum processes ~15-30 TPS
Visa processes ~24,000 TPS

**Why so slow?**
- Blocks have limited size
- Block times aren't instant
- Every node must process every transaction

**Solutions:**
- Larger blocks (but more centralization)
- Shorter block times (but more forks)
- Layer 2 solutions (the most promising!)

Layer 2 (L2) processes transactions off the main chain (Layer 1), then submits them in batches to L1.`,
        code: null
      },
      {
        title: 'Rollups',
        content: `Rollups are L2 solutions that execute transactions off-chain, then post transaction data to L1.

**How Rollups Work:**
1. Transactions happen on L2 (fast, cheap)
2. L2 bundles many transactions together
3. A compressed "rollup" is submitted to L1
4. L1 verifies the rollup is valid

**Two Types:**

**1. Optimistic Rollups**
- Assume transactions are valid by default
- Anyone can challenge (submit fraud proof)
- 7-day challenge period for withdrawals
- Examples: Arbitrum, Optimism, Base

**2. ZK (Zero-Knowledge) Rollups**
- Use math (ZK proofs) to prove validity
- No challenge period - instant withdrawals
- More complex to implement
- Examples: zkSync, Starknet, Polygon zkEVM

**Comparison:**
\`\`\`
Optimistic:   Cheaper to implement, 7-day withdrawal, less scalable
ZK:           More scalable, instant withdrawal, more complex
\`\`\``,
        code: null
      },
      {
        title: 'Other Scaling Solutions',
        content: `**VALIDIUM**
- ZK rollup + data stored off-chain
- Even faster than regular ZK rollups
- Trade-off: Data availability committee instead of full L1 security

**SIDECHAINS**
- Independent blockchains connected to L1 via bridge
- Full sovereignty, own consensus
- Examples: Polygon PoS, Gnosis Chain
- Trade-off: Not protected by L1 security

**PLASMA**
- Child chains that periodically commit to L1
- Less flexible than rollups
- Not as popular anymore

**SHARDING**
- Split blockchain into "shards" (pieces)
- Each shard processes its own transactions
- Ethereum is implementing this
- Still in development

**STATE CHANNELS**
- Users open a channel, transact many times off-chain, close channel
- Used for payments, not general computation
- Examples: Lightning Network (Bitcoin)

**DATA AVAILABILITY SAMPLING**
- Allow nodes to verify data availability without downloading everything
- Coming to Ethereum (EIP-4844)`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is the main benefit of Layer 2 solutions?',
        options: [
          'More decentralized',
          'Higher security',
          'Faster and cheaper transactions while keeping L1 security',
          'Better for storing data'
        ],
        correct: 2
      },
      {
        question: 'What is the main difference between Optimistic and ZK rollups?',
        options: [
          'ZK is more expensive',
          'Optimistic uses fraud proofs, ZK uses mathematical proofs',
          'ZK is not a real solution',
          'They are the same thing'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Compare L2 Costs',
        tasks: [
          'Check current gas costs on Ethereum mainnet',
          'Check gas costs on Arbitrum or Optimism',
          'Calculate the cost difference',
          'Note the time to finality'
        ],
        hint: 'Use L2 scan to see current gas prices!',
        completed: false
      }
    ]
  },
  {
    id: 'oracles',
    title: 'Oracles & External Data',
    subtitle: 'Connecting blockchain to the real world',
    icon: '🔮',
    color: '#a855f7',
    sections: [
      {
        title: 'The Oracle Problem',
        content: `Smart contracts cannot access data from the outside world directly - this is by design for security.

**The Problem:**
- Blockchain is isolated from the internet
- Smart contracts can't make API calls
- But many use cases need external data!

**Examples:**
- What's the current ETH/USD price?
- Who won the football game?
- What's the weather in New York?
- Did a payment go through in the banking system?

**The Oracle:**
An oracle is a service that provides external data to smart contracts.

**Oracle Problem (2nd order):**
- If oracle provides wrong data, smart contract executes incorrectly
- Need decentralized oracles to prevent single point of failure`,
        code: null
      },
      {
        title: 'Chainlink',
        content: `Chainlink is the leading decentralized oracle network.

**Core Services:**

**1. DATA FEEDS (Price Feeds)**
- Aggregated price data from many sources
- Used by most DeFi protocols
- Example: ETH/USD price

\`\`\`solidity
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        // ETH/USD on mainnet
        priceFeed = AggregatorV3Interface(0x...);
    }

    function getLatestPrice() public view returns (int) {
        (, int price,,,) = priceFeed.latestRoundData();
        return price;
    }
}
\`\`\`

**2. VRF (Verifiable Random Function)**
- Generates provably random numbers on-chain
- Used for NFT minting, gaming, lotteries

**3. KEEPER NETWORK**
- Automation - triggers smart contracts at intervals

**4. CCIP (Cross-Chain Interoperability Protocol)**
- Transfer data and tokens across chains`,
        code: null
      },
      {
        title: 'Other Oracle Solutions',
        content: `**BAND PROTOCOL**
- Decentralized oracle
- More customizable data sources
- Different aggregation method than Chainlink

**UNISWAP TWAP**
- Uses Uniswap's time-weighted average prices
- Built into the protocol
- Good for preventing manipulation

**API3**
- First-party oracles
- Data providers directly operate nodes
- Different security model than Chainlink

**NEST**
- Decentralized price oracle
- Uses a unique verification mechanism`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'Why do blockchains need oracles?',
        options: [
          'To store more data',
          'Smart contracts cannot access external data directly, oracles provide this data',
          'To make transactions faster',
          'Oracles are required for mining'
        ],
        correct: 1
      },
      {
        question: 'What does Chainlink VRF provide?',
        options: [
          'Price feeds',
          'Provably random numbers',
          'Automation',
          'Cross-chain bridges'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Integrate Chainlink Price Feed',
        tasks: [
          'Get a price feed address from docs.chain.link',
          'Write a contract that reads the price',
          'Deploy to testnet',
          'Test reading different price pairs'
        ],
        hint: 'Start with ETH/USD price feed on Sepolia testnet!',
        completed: false
      }
    ]
  },
  {
    id: 'daos',
    title: 'DAOs - Decentralized Organizations',
    subtitle: 'Decentralized governance',
    icon: '🏛️',
    color: '#f97316',
    sections: [
      {
        title: 'What is a DAO?',
        content: `DAO = Decentralized Autonomous Organization

A DAO is an organization governed by smart contracts and token holders, rather than traditional hierarchical management.

**How DAOs Work:**
1. Members hold governance tokens
2. Proposals are submitted
3. Token holders vote
4. If passed, proposals execute automatically via smart contracts
5. All on-chain, transparent, auditable

**Benefits:**
- No central authority
- Transparent decision-making
- Anyone can participate (if they hold tokens)
- Votes are recorded on-chain
- Funds controlled by governance (not individuals)

**Examples:**
- MakerDAO: Governs the DAI stablecoin
- Uniswap: Governs the DEX
- ENS DAO: Governs Ethereum Name Service
- BitDAO: One of largest DAOs ($1.5B+ treasury)`,
        code: null
      },
      {
        title: 'DAO Governance Mechanisms',
        content: `**TOKEN-BASED VOTING**
- One token = one vote (or quadratic voting)
- Common in DeFi protocols

**QUADRATIC VOTING**
- Voting power = sqrt(token balance)
- Reduces power of whales
- More democratic

**DELEGATION**
- Don't have time to vote? Delegate to someone else
- Common in Compound, Uniswap

**TIME-LOCKED EXECUTION**
- After vote passes, there's a delay before execution
- Allows users to exit if they disagree

**GUILD KICK**
- Remove malicious members
- Governance decides who stays

**EXECUTION:**
Once a proposal passes and time-lock expires, the action executes automatically via smart contract.`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is a DAO?',
        options: [
          'A cryptocurrency',
          'A decentralized organization governed by token holders and smart contracts',
          'A type of smart contract',
          'A blockchain'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Explore DAO Governance',
        tasks: [
          'Visit a DAO like Uniswap or MakerDAO',
          'Look at active proposals',
          'See how voting works',
          'Check treasury holdings'
        ],
        hint: 'Try "governance" page on major DeFi protocols!',
        completed: false
      }
    ]
  },
  {
    id: 'security',
    title: 'Blockchain Security',
    subtitle: 'Protecting against attacks',
    icon: '🛡️',
    color: '#eab308',
    sections: [
      {
        title: 'Common Smart Contract Vulnerabilities',
        content: `**1. REENTRANCY**
Calling external contracts before updating state
\`\`\`solidity
// VULNERABLE
function withdraw() {
    msg.sender.call{value: balances[msg.sender]}("");
    balances[msg.sender] = 0;
}
\`\`\`

**2. INTEGER OVERFLOW/UNDERFLOW**
\`\`\`solidity
// Before Solidity 0.8
uint8 public count = 255;
count++; // becomes 0!
\`\`\`

**3. ACCESS CONTROL**
Forgetting to restrict important functions
\`\`\`solidity
// Everyone can call!
function setOwner(address newOwner) public {
    owner = newOwner;
}
\`\`\`

**4. FRONT-RUNNING**
\`\`\`
Your tx: Buy 1000 tokens
Attacker: Sees your tx, pays higher gas, buys first
Result: You pay more!
\`\`\`

**5. ORACLE MANIPULATION**
Fake price data causes wrong execution

**6. FLASH LOAN ATTACKS**
Borrow massive funds, manipulate market, repay in one tx`,
        code: null
      },
      {
        title: 'Security Best Practices',
        content: `**1. USE AUDITED LIBRARIES**
- OpenZeppelin contracts are battle-tested
- Don't write your own crypto!

**2. FOLLOW CHECKS-EFFECTS-INTERACTIONS**
\`\`\`solidity
function withdraw() public {
    // Check
    require(balances[msg.sender] > 0);

    // Effects (update state FIRST)
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0;

    // Interactions (external calls LAST)
    payable(msg.sender).transfer(amount);
}
\`\`\`

**3. USE SAFE MATH**
\`\`\`solidity
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
using SafeMath for uint256;
\`\`\`

**4. ADD ACCESS CONTROL**
\`\`\`solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
\`\`\`

**5. COMPREHENSIVE TESTING**
- Unit tests
- Integration tests
- Fuzzing

**6. PROFESSIONAL AUDIT**
- Multiple audit firms
- Bug bounty program`,
        code: null
      },
      {
        title: 'Security Tools',
        content: `**SLITHER**
- Static analysis tool for Solidity
- Detects common vulnerabilities
- Free, from Trail of Bits

\`\`\`bash
slither . --exclude-dependencies
\`\`\`

**ECHIDNA**
- Property-based fuzzing
- Write properties, Echidna tests them

\`\`\`solidity
function echidna_alice_balance() public view returns (bool) {
    return balances[alice] >= 0; // Always true!
}
\`\`\`

**MYTHRIL**
- Symbolic execution security analysis

**TENDERLY**
- Debugging, monitoring, simulation
- Gas optimization

**REMIX DEBUGGER**
- Step through code
- Inspect variables

**OPENZEPPELIN CONTRACTS**
- Battle-tested, security-reviewed
- Use these instead of writing your own!`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is the Checks-Effects-Interactions pattern?',
        options: [
          'A way to speed up transactions',
          'A security pattern: validate, update state, then call external contracts',
          'A testing methodology',
          'A type of wallet'
        ],
        correct: 1
      },
      {
        question: 'Why should you use OpenZeppelin contracts?',
        options: [
          'They are free',
          'They are audited and battle-tested',
          'They are faster',
          'They are required by law'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Analyze Vulnerable Code',
        tasks: [
          'Find example vulnerable contracts',
          'Use Slither to analyze them',
          'Identify the vulnerabilities',
          'Fix the issues'
        ],
        hint: 'Search GitHub for "vulnerable solidity contract" examples!',
        completed: false
      }
    ]
  },
  {
    id: 'blockchains',
    title: 'Major Blockchains',
    subtitle: 'Overview of different chains',
    icon: '🌐',
    color: '#0ea5e9',
    sections: [
      {
        title: 'Layer 1 Blockchains',
        content: `**BITCOIN**
- First cryptocurrency, created 2009
- PoW consensus
- Primarily store of value
- ~7 TPS, limited smart contracts
- Symbol: BTC

**ETHEREUM**
- Launched 2015
- First smart contract platform
- Now PoS (merged in 2022)
- ~15-30 TPS (more with L2)
- Symbol: ETH

**SOLANA**
- High-performance blockchain
- PoH (Proof of History) + PoS
- ~65,000 TPS theoretical
- Very fast, sometimes less stable
- Symbol: SOL

**CARDANO**
- Research-driven blockchain
- PoS consensus
- Focus on academic rigor
- Slower development
- Symbol: ADA

**AVALANCHE**
- Unique consensus (Avalanche)
- Subnets (custom chains)
- Very fast finality (~1 sec)
- Symbol: AVAX

**BNB CHAIN**
- Binance's blockchain
- PoSA (Proof of Staked Authority)
- Fast, lower fees
- Symbol: BNB`,
        code: null
      },
      {
        title: 'Layer 2 Blockchains',
        content: `**ARBITRUM**
- Optimistic rollup
- Most popular L2
- Many DeFi protocols
- Good developer experience

**OPTIMISM**
- Optimistic rollup
- Similar to Arbitrum
- Has "bedrock" upgrade

**BASE**
- Built by Coinbase
- Optimistic rollup
- Growing ecosystem

**STARKNET**
- ZK rollup
- Very scalable
- Growing ecosystem
- Written in Cairo

**ZK SYNC**
- ZK rollup by Matter Labs
- Era (zkSync Era) is live
- Very fast withdrawals`,
        code: null
      },
      {
        title: 'How to Choose a Blockchain',
        content: `**Factors to Consider:**

1. **ECOSYSTEM**
- What DeFi/NFT apps exist?
- Are they well-audited?
- Is the community active?

2. **TRANSACTION COSTS**
- Gas fees matter!
- L2s are much cheaper

3. **SPEED**
- TPS (transactions per second)
- Finality time (how long until confirmed)

4. **DECENTRALIZATION**
- Number of validators
- Node distribution

5. **SECURITY**
- How battle-tested?
- Audit history

6. **DEVELOPER TOOLS**
- Documentation quality
- SDK support

**My Recommendation for Learning:**
Start with Ethereum (Sepolia testnet), then try an L2 like Arbitrum (Sepolia).`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'Which blockchain is known for "Proof of History"?',
        options: [
          'Bitcoin',
          'Ethereum',
          'Solana',
          'Cardano'
        ],
        correct: 2
      },
      {
        question: 'What is an Optimistic rollup?',
        options: [
          'A Layer 1 blockchain',
          'A Layer 2 that assumes validity by default and has fraud proofs',
          'A type of wallet',
          'A consensus mechanism'
        ],
        correct: 1
      }
    ],
    exercises: [
      {
        title: 'Deploy Across Chains',
        tasks: [
          'Deploy a contract to Ethereum testnet (Sepolia)',
          'Deploy to Arbitrum Sepolia',
          'Compare gas costs and speeds',
          'Try bridging with official bridge'
        ],
        hint: 'Make sure your wallet is connected to both networks!',
        completed: false
      }
    ]
  },
  {
    id: 'tools',
    title: 'Development Tools & Infrastructure',
    subtitle: 'What developers use to build',
    icon: '🔧',
    color: '#6366f1',
    sections: [
      {
        title: 'Node Providers',
        content: `You need to connect to a node to interact with blockchain. Running your own node is expensive - node providers offer API access.

**ALCHEMY**
- Most popular
- Great developer experience
- Free tier available
- alchemy.com

**INFURA**
- By ConsenSys
- Very reliable
- Free tier
- infura.io

**POCKET NETWORK**
- Decentralized
- Different model
- pokt.network

**QUICKNODE**
- Fast nodes
- Multiple chains support
- quicknode.com

**ANKR**
- Free public RPCs
- Ankr.com`,
        code: `// Using Alchemy/Infura
const { Alchemy } = require("alchemy-sdk");

const config = {
  apiKey: "YOUR_API_KEY",
  network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(config);

// Get latest block
const latestBlock = await alchemy.core.getBlockNumber();

// Get transactions for block
const block = await alchemy.core.getBlockWithTransactions(latestBlock);
console.log(block.transactions.length, "txs");`
      },
      {
        title: 'Decentralized Storage',
        content: `**IPFS (InterPlanetary File System)**
- Content-addressed storage
- Files identified by content hash
- Data stored on many nodes
- Pinata (pinata.cloud) for easy pinning
- Use for NFT metadata!

**ARWEAVE**
- Permanent storage
- One-time payment
- For data you want to keep forever
- arweave.net

**FILECOIN**
- Storage marketplace
- Earn FIL by providing storage
- filecoin.io

**SUI, SKYNET**
- Simple decentralized storage
- Various use cases`,
        code: null
      },
      {
        title: 'Testing & Development',
        content: `**TESTNETS (FAUCETS)**
- Sepolia (Ethereum - recommended)
- Goerli (deprecated, moving to Sepolia)
- Holesky (Ethereum)
- Faucets: sepoliafaucet.com, quicknode faucet

**GAS TRACKERS**
- EIP-1559 introduced base fee
- Track gas: ethereumgas.info

**BLOCK EXPLORERS**
- Etherscan (Ethereum mainnet)
- Arbiscan (Arbitrum)
- Optimism Explorer
- Polygonscan

**DEPLOYMENT CHECKLIST**
1. Write contract in Remix/Hardhat
2. Test extensively on testnet
3. Verify source code on explorer
4. Set up monitoring (Tenderly)
5. Start bug bounty
6. Consider multi-sig for treasury`,
        code: null
      }
    ],
    quiz: [
      {
        question: 'What is a node provider?',
        options: [
          'A type of cryptocurrency',
          'A service that provides API access to blockchain nodes',
          'A wallet',
          'A smart contract'
        ],
        correct: 1
      },
      {
        question: 'Which is commonly used for storing NFT metadata?',
        options: [
          'IPFS',
          'AWS',
          'Google Drive',
          'Email'
        ],
        correct: 0
      }
    ],
    exercises: [
      {
        title: 'Set Up Development Environment',
        tasks: [
          'Get Alchemy or Infura API key',
          'Install Hardhat',
          'Create a project',
          'Deploy to testnet'
        ],
        hint: 'Start with Hardhat - excellent docs and templates!',
        completed: false
      }
    ]
  }
];

// Interactive Exercises List
export const exercises = [
  {
    id: 1,
    title: 'Blockchain Fundamentals',
    difficulty: 'Beginner',
    duration: '2 hours',
    description: 'Understand the basics of how blockchain works',
    tasks: [
      { id: 1, text: 'Visit a block explorer (Etherscan)', hint: 'Go to etherscan.io' },
      { id: 2, text: 'Find the latest block and note its number', hint: 'Look at the "Block" field' },
      { id: 3, text: 'Examine a transaction and identify: from, to, value, gas used', hint: 'Click on any transaction hash' },
      { id: 4, text: 'Calculate how old a block is using the timestamp', hint: 'Current time - block timestamp' },
      { id: 5, text: 'Verify that the block hash starts with zeros (difficulty)', hint: 'Check the "hash" field' }
    ],
    completed: false
  },
  {
    id: 2,
    title: 'Create Your First Wallet',
    difficulty: 'Beginner',
    duration: '1 hour',
    description: 'Set up a crypto wallet and understand seed phrases',
    tasks: [
      { id: 1, text: 'Install MetaMask browser extension', hint: 'metamask.io' },
      { id: 2, text: 'Create a new wallet and save your seed phrase', hint: 'Write it down on paper!' },
      { id: 3, text: 'Note your wallet address', hint: 'Click to copy address' },
      { id: 4, text: 'Get testnet ETH from a faucet', hint: 'sepoliafaucet.com' },
      { id: 5, text: 'Send a test transaction to yourself', hint: 'Use "Internal Transactions" to see' }
    ],
    completed: false
  },
  {
    id: 3,
    title: 'Deploy a Smart Contract',
    difficulty: 'Beginner',
    duration: '3 hours',
    description: 'Write and deploy your first smart contract',
    tasks: [
      { id: 1, text: 'Go to Remix IDE (remix.ethereum.org)', hint: 'Web-based Solidity IDE' },
      { id: 2, text: 'Create a new file called Storage.sol', hint: 'Right click in file explorer' },
      { id: 3, text: 'Write a simple storage contract', hint: 'Use the example from the Smart Contracts section' },
      { id: 4, text: 'Deploy to Injected Web3 (MetaMask)', hint: 'Connect your wallet first' },
      { id: 5, text: 'Set a value and retrieve it', hint: 'Use the deployed functions' },
      { id: 6, text: 'Verify the contract on Etherscan', hint: 'Click "Verify" in Etherscan' }
    ],
    completed: false
  },
  {
    id: 4,
    title: 'Create an ERC-20 Token',
    difficulty: 'Intermediate',
    duration: '3 hours',
    description: 'Deploy your own cryptocurrency token',
    tasks: [
      { id: 1, text: 'Import OpenZeppelin ERC20 contract', hint: '@openzeppelin/contracts' },
      { id: 2, text: 'Create token with name, symbol, supply', hint: 'Mint total supply to deployer' },
      { id: 3, text: 'Add mint and burn functions', hint: 'Only owner should be able to mint' },
      { id: 4, text: 'Deploy to testnet', hint: 'Sepolia recommended' },
      { id: 5, text: 'Add token to MetaMask', hint: 'Click "Add Token"' },
      { id: 6, text: 'Transfer tokens to another address', hint: 'Verify in block explorer' }
    ],
    completed: false
  },
  {
    id: 5,
    title: 'Build a Simple dApp',
    difficulty: 'Intermediate',
    duration: '4 hours',
    description: 'Create a frontend that interacts with blockchain',
    tasks: [
      { id: 1, text: 'Create React app with Vite', hint: 'npm create vite@latest' },
      { id: 2, text: 'Install ethers.js or wagmi', hint: 'npm install ethers' },
      { id: 3, text: 'Add "Connect Wallet" button', hint: 'Use window.ethereum' },
      { id: 4, text: 'Display connected wallet address', hint: 'Use provider.getSigner()' },
      { id: 5, text: 'Read data from a contract', hint: 'Use contract object' },
      { id: 6, text: 'Add transaction functionality', hint: 'Use signer.sendTransaction()' }
    ],
    completed: false
  },
  {
    id: 6,
    title: 'Explore DeFi Protocols',
    difficulty: 'Intermediate',
    duration: '3 hours',
    description: 'Learn how DeFi works by using lending protocols',
    tasks: [
      { id: 1, text: 'Visit Aave (aave.com)', hint: 'Major DeFi lending protocol' },
      { id: 2, text: 'Connect wallet (use testnet)', hint: 'Switch to testnet in wallet' },
      { id: 3, text: 'Deposit testnet ETH', hint: 'Check deposit APY' },
      { id: 4, text: 'Borrow a stablecoin against ETH', hint: 'Keep health factor > 1.5' },
      { id: 5, text: 'Repay the borrowed amount', hint: 'Monitor health factor' },
      { id: 6, text: 'Withdraw your collateral', hint: 'Check your balance' }
    ],
    completed: false
  },
  {
    id: 7,
    title: 'Mint an NFT',
    difficulty: 'Intermediate',
    duration: '2 hours',
    description: 'Create and mint your own NFT',
    tasks: [
      { id: 1, text: 'Upload an image to IPFS (use Pinata)', hint: 'pinata.cloud for free upload' },
      { id: 2, text: 'Create metadata JSON with image URL', hint: 'Follow ERC-721 metadata standard' },
      { id: 3, text: 'Write ERC-721 contract with metadata', hint: 'Use OpenZeppelin wizard' },
      { id: 4, text: 'Deploy to testnet', hint: 'Sepolia or Arbitrum Sepolia' },
      { id: 5, text: 'Mint an NFT with your metadata', hint: 'Use tokenURI function' },
      { id: 6, text: 'View NFT in OpenSea testnet', hint: 'testnets.opensea.io' }
    ],
    completed: false
  },
  {
    id: 8,
    title: 'Security Analysis',
    difficulty: 'Advanced',
    duration: '5 hours',
    description: 'Find vulnerabilities in smart contracts',
    tasks: [
      { id: 1, text: 'Install Slither', hint: 'pip install slither-analyzer' },
      { id: 2, text: 'Find example vulnerable contracts', hint: 'Search GitHub' },
      { id: 3, text: 'Run Slither analysis', hint: 'slither . --exclude-dependencies' },
      { id: 4, text: 'Identify all vulnerabilities found', hint: 'Read each finding carefully' },
      { id: 5, text: 'Fix each vulnerability', hint: 'Use OpenZeppelin, add access control' },
      { id: 6, text: 'Re-run analysis to verify fixes', hint: 'No vulnerabilities should remain' }
    ],
    completed: false
  },
  {
    id: 9,
    title: 'Deploy to Layer 2',
    difficulty: 'Advanced',
    duration: '4 hours',
    description: 'Deploy to Arbitrum or Optimism',
    tasks: [
      { id: 1, text: 'Configure wallet for Arbitrum', hint: 'Add Arbitrum Sepolia to MetaMask' },
      { id: 2, text: 'Get testnet ETH for Arbitrum', hint: 'Use Arbitrum faucet' },
      { id: 3, text: 'Deploy contract to Arbitrum', hint: 'Same process as L1!' },
      { id: 4, text: 'Compare gas costs with L1', hint: 'Note the huge difference!' },
      { id: 5, text: 'Test cross-chain bridge', hint: 'Use official bridge' },
      { id: 6, text: 'Verify on Arbiscan', hint: 'Similar to Etherscan' }
    ],
    completed: false
  },
  {
    id: 10,
    title: 'Integrate Chainlink Oracles',
    difficulty: 'Advanced',
    duration: '5 hours',
    description: 'Connect smart contracts to real-world data',
    tasks: [
      { id: 1, text: 'Find Chainlink price feed for testnet', hint: 'docs.chain.link' },
      { id: 2, text: 'Import Chainlink contracts', hint: '@chainlink/contracts' },
      { id: 3, text: 'Write contract that reads price', hint: 'Use AggregatorV3Interface' },
      { id: 4, text: 'Deploy to testnet', hint: 'Sepolia' },
      { id: 5, text: 'Integrate VRF for randomness', hint: 'For NFT metadata' },
      { id: 6, text: 'Test automation with Keepers', hint: 'Set up a simple task' }
    ],
    completed: false
  }
];

export default topics;