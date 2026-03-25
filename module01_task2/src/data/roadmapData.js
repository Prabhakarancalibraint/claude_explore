export const roadmapData = {
  intro: {
    title: 'Introduction to Blockchain',
    description: 'Start your blockchain journey with fundamentals - understand what blockchain is, how it works, and why it matters.',
    sections: [
      {
        title: 'What is Blockchain?',
        content: `A blockchain is a distributed, decentralized, public ledger that records transactions across many computers. Once recorded, data cannot be changed retroactively without altering all subsequent blocks.

Key characteristics:
• Decentralization - No single authority controls the network
• Transparency - Anyone can verify transactions on public chains
• Immutability - Once recorded, data cannot be altered
• Security - Cryptographic hashing ensures data integrity`
      },
      {
        title: 'Decentralization',
        content: `Decentralization removes the need for intermediaries by distributing control across a network of nodes. Benefits include:

• No single point of failure
• Resistance to censorship
• Increased security through consensus
• User sovereignty over data

Types of decentralization:
• Architectural - Number of nodes
• Political - Who controls the nodes
• Logical - Data structure`
      },
      {
        title: 'Blockchain Structure',
        content: `Blocks contain:
• Previous block hash (linking to the chain)
• Merkle root (hash of all transactions)
• Timestamp
• Nonce (for PoW)
• Transaction data

Each block's hash depends on its contents - changing any data changes the hash completely, making tampering virtually impossible.`
      },
      {
        title: 'Applications & Use Cases',
        content: `Blockchain enables:
• Cryptocurrency (Bitcoin, Ethereum)
• Decentralized Finance (DeFi)
• Non-Fungible Tokens (NFTs)
• Decentralized Autonomous Organizations (DAOs)
• Supply chain tracking
• Identity management
• Voting systems
• Healthcare records`
      },
      {
        title: 'Mining & Incentive Models',
        content: `Mining is the process of validating transactions and creating new blocks. Incentive models include:

• Block rewards (newly minted coins)
• Transaction fees
• Staking rewards (PoS)

Miners/validators are incentivized to act honestly through economic rewards - attacking the network costs more than benefitting from it.`
      },
      {
        title: 'Cryptowallets',
        content: `Wallets store private keys, not actual crypto. Types:

• Hot wallets - Connected to internet (convenient, less secure)
• Cold wallets - Offline (more secure)
• Hardware wallets - Physical devices
• Paper wallets - Printed keys
• Multi-sig wallets - Require multiple signatures

Always backup your seed phrase!`
      }
    ],
    exercises: [
      {
        title: 'Understand Wallet Security',
        tasks: [
          'Research different wallet types',
          'Create a paper wallet for testnet',
          'Understand seed phrase importance',
          'Practice sending testnet transactions'
        ]
      }
    ]
  },

  cryptography: {
    title: 'Cryptography & Hashing',
    description: 'Master the cryptographic foundations that make blockchain secure - hash functions, digital signatures, and encryption.',
    sections: [
      {
        title: 'Hash Functions',
        content: `Hash functions are the backbone of blockchain security. They take any input and produce a fixed-size output.

Properties:
• Deterministic - Same input = same output
• Quick computation - Fast to calculate
• Pre-image resistance - Can't reverse engineer input
• Collision resistance - Hard to find two inputs with same hash
• Avalanche effect - Small change = completely different output

Common algorithms: SHA-256 (Bitcoin), Keccak-256 (Ethereum)`
      },
      {
        title: 'Digital Signatures',
        content: `Digital signatures prove ownership and authorize transactions using public-key cryptography:

1. Private key - Kept secret, used to sign
2. Public key - Shared, used to verify
3. Signature - Mathematical proof generated with private key

ECDSA (Elliptic Curve Digital Signature Algorithm) is used by Bitcoin and Ethereum.`
      },
      {
        title: 'Merkle Trees',
        content: `Merkle trees efficiently organize and verify transaction data:

• Transactions are paired and hashed
• Pairs are paired again and hashed
• Continues until single root (Merkle root)
• Enables SPV (Simplified Payment Verification)

Light nodes only need the Merkle root to verify transaction inclusion.`
      }
    ],
    exercises: [
      {
        title: 'Implement Hash Functions',
        tasks: [
          'Write a SHA-256 implementation',
          'Create a Merkle tree from transactions',
          'Verify transaction inclusion in a block',
          'Implement a simple digital signature'
        ]
      }
    ]
  },

  networks: {
    title: 'Types of Blockchains',
    description: 'Explore Layer 1 blockchains, Layer 2 solutions, and specialized chains - from Bitcoin to Solana, Arbitrum to Polkadot.',
    sections: [
      {
        title: 'Layer 1 Blockchains',
        content: `L1 is the base blockchain layer. Major L1s:

• Bitcoin - Original cryptocurrency, PoW
• Ethereum - Smart contracts, migrating to PoS
• Solana - High throughput, PoH consensus
• Cardano - Research-driven, PoS
• Avalanche - Unique consensus, subnets
• BNB Chain - Binance ecosystem
• Polygon - Ethereum scaling (also L2)

Each has different tradeoffs: decentralization, security, scalability.`
      },
      {
        title: 'Layer 2 Solutions',
        content: `L2 builds on L1 to improve scalability:

• Arbitrum - Optimistic rollup
• Optimism - Optimistic rollup
• Base - Coinbase L2
• Starknet - ZK rollup
• zkSync - ZK rollup
• Polygon zkEVM - ZK rollup

L2s inherit L1 security while enabling faster/cheaper transactions.`
      },
      {
        title: 'Consensus Mechanisms',
        content: `How nodes agree on state:

• Proof of Work (PoW) - Energy-intensive mining
• Proof of Stake (PoS) - Validator staking
• Proof of History (PoH) - Solana's timekeeping
• Delegated PoS - Token holders vote for validators
• BFT variants - Practical Byzantine Fault Tolerance

Each affects decentralization, security, and speed differently.`
      }
    ],
    exercises: [
      {
        title: 'Compare Blockchains',
        tasks: [
          'Deploy a contract on testnet (Ethereum Goerli)',
          'Deploy on Polygon Mumbai',
          'Compare gas costs and speeds',
          'Bridge assets between networks'
        ]
      }
    ]
  },

  'smart-contracts': {
    title: 'Smart Contract Development',
    description: 'Learn to build decentralized applications with Solidity, Vyper, and Rust - the languages of smart contracts.',
    sections: [
      {
        title: 'What are Smart Contracts?',
        content: `Self-executing programs stored on blockchain that automatically enforce agreements when conditions are met.

Key characteristics:
• Autonomous - No intermediaries needed
• Transparent - Code is public
• Immutable - Cannot be changed after deployment
• Deterministic - Same input = same output
• Fast - Execute automatically

They enable trustless agreements - parties don't need to trust each other, just the code.`
      },
      {
        title: 'Solidity Programming',
        content: `Solidity is Ethereum's primary smart contract language.

Basic structure:
• Pragma - Compiler version
• Contract - Similar to class
• Functions - Public/private methods
• State variables - Stored on blockchain
• Events - Logging mechanism

Key concepts:
•msg.sender - Caller address
•msg.value - Ether sent
•block.timestamp - Current block time
•storage vs memory`
      },
      {
        title: 'Token Standards',
        content: `ERC standards define how tokens work:

• ERC-20 - Fungible tokens (like currency)
• ERC-721 - Non-fungible tokens (NFTs)
• ERC-1155 - Multi-token standard
• ERC-4626 - Vault standard
• ERC-721A - Gas-optimized NFTs

Standards ensure compatibility across the ecosystem.`
      },
      {
        title: 'Development Tools',
        content: `Essential tools for smart contract development:

• Remix - Web-based IDE
• Hardhat - Development environment with local network
• Foundry - Fast testing framework
• Truffle - Full-stack framework
• Brownie - Python-based framework

Debugging tools:
• Hardhat console
• Tenderly
• Remix debugger`
      }
    ],
    exercises: [
      {
        title: 'Build Your First Contract',
        tasks: [
          'Create a simple storage contract',
          'Deploy to testnet using Remix',
          'Interact with contract functions',
          'Add events and logging'
        ]
      },
      {
        title: 'Create an ERC-20 Token',
        tasks: [
          'Implement ERC-20 interface',
          'Add custom functionality (mint, burn)',
          'Deploy to testnet',
          'Verify on Etherscan'
        ]
      }
    ]
  },

  security: {
    title: 'Blockchain Security',
    description: 'Master security best practices - understand common vulnerabilities, auditing tools, and how to write secure contracts.',
    sections: [
      {
        title: 'Common Vulnerabilities',
        content: `Smart contract vulnerabilities:

• Reentrancy - Malicious contract calls back
• Integer overflow/underflow
• Access control issues
• Front-running
• Oracle manipulation
• Flash loan attacks
• tx.origin authentication

Always follow checks-effects-interactions pattern.`
      },
      {
        title: 'Security Tools',
        content: `Essential security tools:

• Slither - Static analysis
• Echidna - Property-based fuzzing
• Mythril - Symbolic execution
• Tenderly - Monitoring and debugging
• OpenZeppelin contracts - Audited libraries

Always use battle-tested libraries from OpenZeppelin!`
      },
      {
        title: 'Auditing Best Practices',
        content: `Before deploying:

1. Write comprehensive tests
2. Use static analysis tools
3. Get professional audit
4. Bug bounty program
5. Timelock on upgrades
6. Multi-sig for critical functions

Security is not optional - bugs can cost millions!`
      }
    ],
    exercises: [
      {
        title: 'Security Audit Practice',
        tasks: [
          'Analyze vulnerable contract code',
          'Identify reentrancy vulnerabilities',
          'Fix integer overflow issues',
          'Implement access control properly'
        ]
      }
    ]
  },

  oracles: {
    title: 'Oracles & External Data',
    description: 'Learn how to connect smart contracts to real-world data - price feeds, random numbers, and off-chain computation.',
    sections: [
      {
        title: 'What are Oracles?',
        content: `Oracles provide external data to smart contracts since blockchains can't access outside data.

Oracle problem: How do you trust the oracle?
Solution: Decentralized oracle networks

Chainlink is the leading oracle network providing:
• Price feeds
• VRF (verifiable random function)
• Keepers (automation)
• Cross-chain messaging`
      },
      {
        title: 'Chainlink Services',
        content: `Chainlink offerings:

• Data Feeds - Aggregated price data
• VRF - Verifiable randomness
• Automation - Automatic contract execution
• CCIP - Cross-chain interoperability
• Functions - External API calls

Always use decentralized oracles, not single sources!`
      },
      {
        title: 'Hybrid Smart Contracts',
        content: `Combine on-chain and off-chain:

• On-chain - Trustless, permanent
• Off-chain - Fast, cheap, external data
• Oracle bridges both worlds

Use cases:
• Dynamic NFTs (using VRF)
• Real-world asset prices
• Weather data insurance
• Sports results betting`
      }
    ],
    exercises: [
      {
        title: 'Build Oracle Integration',
        tasks: [
          'Integrate Chainlink price feed',
          'Implement VRF for random NFT',
          'Set up Chainlink Keeper automation',
          'Build external API call'
        ]
      }
    ]
  },

  dapp: {
    title: 'dApp Development',
    description: 'Build full-stack decentralized applications - frontend, backend, and blockchain integration using React, ethers.js, and more.',
    sections: [
      {
        title: 'Frontend Integration',
        content: `Connect React apps to blockchain:

• ethers.js - Lightweight, modern
• web3.js - Original Ethereum library
• wagmi - React hooks for Ethereum
• viem - Type-safe Ethereum library
• Moralis - Full-stack Web3 platform

Key concepts:
• Wallet connection (MetaMask)
• Contract read/write calls
• Event filtering
• Transaction handling`
      },
      {
        title: 'Client Libraries',
        content: `Essential libraries for dApp development:

• ethers.js - Most popular
• web3.js - Feature-rich
• viem - TypeScript focused
• rainbowkit - Wallet connection UI
• wagmi - React integration

Choose based on your needs for size, TypeScript, and features.`
      },
      {
        title: 'dApp Architecture',
        content: `Best practices for dApp structure:

• Separate blockchain and UI logic
• Handle loading and error states
• Implement proper wallet detection
• Manage chain switching
• Optimize reads vs writes
• Cache data appropriately

Use testing frameworks like Hardhat Network for local development.`
      }
    ],
    exercises: [
      {
        title: 'Build a Complete dApp',
        tasks: [
          'Set up React app with ethers.js',
          'Implement wallet connection',
          'Create contract interaction UI',
          'Handle transactions and events',
          'Deploy to production'
        ]
      }
    ]
  },

  scaling: {
    title: 'Building for Scale',
    description: 'Learn blockchain scaling solutions - Layer 2, sharding, rollups, and the future of scalability.',
    sections: [
      {
        title: 'Layer 2 Solutions',
        content: `Scaling solutions that build on L1:

• Optimistic Rollups - Fraud proofs, ~7 day withdrawal
• ZK Rollups - Zero-knowledge proofs, fast finality
• Validium - Hybrid of rollup and plasma
• Sidechains - Independent chains with bridge

L2 inherits L1 security while enabling:• Higher TPS
• Lower fees
• Faster finality`
      },
      {
        title: 'Zero Knowledge Proofs',
        content: `ZK allows proving truth without revealing data:

• zkSNARKs - Succinct non-interactive proofs
• zkSTARKs - Transparent, quantum-resistant

Use cases:
• Private transactions
• Scalability (ZK rollups)
• Identity verification
• Age verification without revealing age`
      },
      {
        title: 'Future of Scaling',
        content: `Upcoming scaling solutions:

• Sharding - Divide network into pieces
• Data availability sampling
• Proto-danksharding (EIP-4844)
• Sovereign rollups
• Parallel execution

The future is multi-chain and cross-chain!`
      }
    ],
    exercises: [
      {
        title: 'Deploy to L2',
        tasks: [
          'Deploy contract to Arbitrum testnet',
          'Compare gas costs with L1',
          'Test bridging assets',
          'Implement L2-specific features'
        ]
      }
    ]
  }
}

export const exercisesList = [
  {
    id: 1,
    title: 'Build Your First Smart Contract',
    difficulty: 'Beginner',
    duration: '2 hours',
    description: 'Create a simple storage contract on Ethereum',
    topics: ['smart-contracts', 'intro'],
    tasks: [
      'Set up development environment (Remix/Hardhat)',
      'Write a simple storage contract',
      'Deploy to Ethereum testnet (Goerli/Sepolia)',
      'Interact with contract using Etherscan'
    ]
  },
  {
    id: 2,
    title: 'Implement a Token',
    difficulty: 'Intermediate',
    duration: '3 hours',
    description: 'Deploy an ERC-20 token with custom functionality',
    topics: ['smart-contracts'],
    tasks: [
      'Understand ERC-20 standard',
      'Create token contract with OpenZeppelin',
      'Add minting and burning functions',
      'Deploy and verify on Etherscan'
    ]
  },
  {
    id: 3,
    title: 'Create an NFT Collection',
    difficulty: 'Intermediate',
    duration: '4 hours',
    description: 'Build and deploy an NFT collection',
    topics: ['smart-contracts', 'dapp'],
    tasks: [
      'Implement ERC-721 contract',
      'Add metadata (IPFS)',
      'Implement minting logic',
      'Create frontend to view NFTs'
    ]
  },
  {
    id: 4,
    title: 'Build a DeFi Pool',
    difficulty: 'Advanced',
    duration: '5 hours',
    description: 'Create an automated market maker like Uniswap',
    topics: ['smart-contracts', 'scaling'],
    tasks: [
      'Design AMM logic',
      'Implement liquidity provision',
      'Add swap functionality',
      'Deploy and test thoroughly'
    ]
  },
  {
    id: 5,
    title: 'Integrate Chainlink Oracles',
    difficulty: 'Intermediate',
    duration: '3 hours',
    description: 'Connect smart contracts to real-world data',
    topics: ['oracles', 'dapp'],
    tasks: [
      'Get price data from Chainlink',
      'Implement price-based logic',
      'Use VRF for randomness',
      'Set up automation'
    ]
  },
  {
    id: 6,
    title: 'Security Audit',
    difficulty: 'Advanced',
    duration: '4 hours',
    description: 'Find and fix vulnerabilities in smart contracts',
    topics: ['security', 'smart-contracts'],
    tasks: [
      'Use Slither for static analysis',
      'Write fuzzing tests with Echidna',
      'Identify reentrancy bugs',
      'Fix common vulnerabilities'
    ]
  }
]