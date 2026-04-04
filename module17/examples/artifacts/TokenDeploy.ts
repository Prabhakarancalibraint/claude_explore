/**
 * Token Deploy Script - Hardhat Deployment Template
 *
 * Deployment script for RWA tokens with ERC-3643 (T-REX) compliance.
 * Supports multiple networks: sepolia, mainnet, polygon.
 *
 * @example
 * npx hardhat run scripts/deploy.ts --network sepolia
 */

import { ethers } from 'hardhat';
import { formatEther } from 'ethers';

interface DeployConfig {
  /** Token name */
  name: string;
  /** Token symbol */
  symbol: string;
  /** Contract owner address */
  owner: string;
  /** decimals */
  decimals: number;
  /** Initial supply in tokens */
  initialSupply: number;
  /** Chain ID for compliance */
  chainId: number;
}

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('\n=== RWA Token Deployment ===\n');
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${formatEther(await deployer.provider.getBalance(deployer.address))} ETH\n`);

  // Configuration - modify per deployment
  const config: DeployConfig = {
    name: 'RealEstateToken',
    symbol: 'RET',
    owner: deployer.address,
    decimals: 18,
    initialSupply: 1000000,
    chainId: (await ethers.provider.getNetwork()).chainId,
  };

  console.log('Deploying with config:', config);

  // Deploy token contract
  // Replace with your actual contract constructor
  // const Token = await ethers.getContractFactory('YourToken');
  // const token = await Token.deploy(config);

  // console.log(`\nToken deployed to: ${await token.getAddress()}`);

  // Verify on Etherscan (mainnet/sepolia)
  // if (network.name !== 'hardhat' && network.name !== 'localhost') {
  //   await token.deploymentTransaction()?.wait(6);
  //   await hrun.run('verify:verify', {
  //     address: await token.getAddress(),
  //     constructorArguments: [config],
  //   });
  // }

  console.log('\n=== Deployment Complete ===\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Deployment checklist:
 * [ ] Update config with correct parameters
 * [ ] Verify deployer address has sufficient balance
 * [ ] Check gas settings in hardhat.config.ts
 * [ ] Update Etherscan API key for verification
 * [ ] Run with: npx hardhat run scripts/deploy.ts --network <network>
 */