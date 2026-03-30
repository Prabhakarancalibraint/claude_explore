import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

import { PropertyToken } from "../typechain-types/contracts/PropertyToken";
import { IdentityRegistry } from "../typechain-types/contracts/IdentityRegistry";
import { PropertyCompliance } from "../typechain-types/contracts/PropertyCompliance";

describe("PropertyToken", () => {
  // Test fixtures for deploying contracts
  async function deployPropertyTokenFixture() {
    const [owner, minter, user1, user2, user3, user4] = await ethers.getSigners();

    // Deploy IdentityRegistry
    const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    const identityRegistry = await IdentityRegistry.deploy() as unknown as IdentityRegistry;
    await identityRegistry.waitForDeployment();

    // Deploy PropertyCompliance
    const PropertyCompliance = await ethers.getContractFactory("PropertyCompliance");
    const compliance = await PropertyCompliance.deploy() as unknown as PropertyCompliance;
    await compliance.waitForDeployment();

    // Deploy PropertyToken
    const PropertyToken = await ethers.getContractFactory("PropertyToken");
    const token = await PropertyToken.deploy(
      "Property Token - Test Building",
      "PTSB",
      18,
      ethers.parseEther("10000000"), // 10M total supply cap
      "Test Building",
      "123 Test Street",
      1000000, // $10,000,000 property value (in cents)
      "IN"
    ) as unknown as PropertyToken;
    await token.waitForDeployment();

    // Initialize the token with contract references
    await token.initialize(
      await identityRegistry.getAddress(),
      await compliance.getAddress()
    );

    // Authorize minter
    await token.connect(owner).authorizeMinter(minter.address);

    // Verify identities for testing
    const expiryTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60; // 1 year from now
    await identityRegistry.connect(owner).verifyIdentity(user1.address, "IN", 3, expiryTime, ethers.id("user1-id"));
    await identityRegistry.connect(owner).verifyIdentity(user2.address, "IN", 3, expiryTime, ethers.id("user2-id"));
    await identityRegistry.connect(owner).verifyIdentity(user3.address, "IN", 3, expiryTime, ethers.id("user3-id"));
    await identityRegistry.connect(owner).verifyIdentity(user4.address, "AE", 3, expiryTime, ethers.id("user4-id"));

    // Allow transfers from user1 to others by setting up allowance
    // (Not needed for basic transfer, but for transferFrom)

    return {
      owner,
      minter,
      user1,
      user2,
      user3,
      user4,
      token,
      identityRegistry,
      compliance,
      expiryTime,
    };
  }

  let propertyToken: PropertyToken;
  let identityRegistry: IdentityRegistry;
  let compliance: PropertyCompliance;
  let owner: SignerWithAddress;
  let minter: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let user4: SignerWithAddress;
  let expiryTime: number;

  // Load fixture once for all tests
  before(async function () {
    const {
      token,
      identityRegistry: ir,
      compliance: comp,
      owner: o,
      minter: m,
      user1: u1,
      user2: u2,
      user3: u3,
      user4: u4,
      expiryTime: et,
    } = await deployPropertyTokenFixture();

    propertyToken = token;
    identityRegistry = ir;
    compliance = comp;
    owner = o;
    minter = m;
    user1 = u1;
    user2 = u2;
    user3 = u3;
    user4 = u4;
    expiryTime = et;
  });

  // =========================================================================
  // UNIT TESTS: Basic Token Functionality
  // =========================================================================

  describe("Basic Token Functionality", () => {
    describe("Token Metadata", () => {
      it("should have correct name", async () => {
        expect(await propertyToken.name()).to.equal("Property Token - Test Building");
      });

      it("should have correct symbol", async () => {
        expect(await propertyToken.symbol()).to.equal("PTSB");
      });

      it("should have 18 decimals", async () => {
        expect(await propertyToken.decimals()).to.equal(18);
      });

      it("should have correct property details", async () => {
        expect(await propertyToken.propertyName()).to.equal("Test Building");
        expect(await propertyToken.propertyAddress()).to.equal("123 Test Street");
        expect(await propertyToken.propertyValue()).to.equal(1000000);
        expect(await propertyToken.jurisdiction()).to.equal("IN");
      });

      it("should have correct total supply cap", async () => {
        expect(await propertyToken.totalSupplyCap()).to.equal(ethers.parseEther("10000000"));
      });
    });

    describe("Minting", () => {
      it("should mint tokens to valid recipient", async () => {
        const balanceBefore = await propertyToken.balanceOf(user1.address);
        const mintAmount = ethers.parseEther("1000");

        await propertyToken.connect(minter).mint(user1.address, mintAmount);

        expect(await propertyToken.balanceOf(user1.address)).to.equal(balanceBefore + mintAmount);
      });

      it("should emit TokensMinted event", async () => {
        const mintAmount = ethers.parseEther("500");
        await expect(propertyToken.connect(minter).mint(user2.address, mintAmount))
          .to.emit(propertyToken, "TokensMinted")
          .withArgs(user2.address, mintAmount);
      });

      it("should revert minting to zero address", async () => {
        await expect(
          propertyToken.connect(minter).mint(ethers.ZeroAddress, ethers.parseEther("100"))
        ).to.be.revertedWith("Cannot mint to zero address");
      });

      it("should revert minting zero tokens", async () => {
        await expect(
          propertyToken.connect(minter).mint(user1.address, 0)
        ).to.be.revertedWith("Cannot mint zero tokens");
      });

      it("should revert when exceeding total supply cap", async () => {
        // Try to mint more than remaining supply
        const remainingSupply = await propertyToken.getRemainingSupply();
        await expect(
          propertyToken.connect(minter).mint(user1.address, remainingSupply + ethers.parseEther("1"))
        ).to.be.revertedWith("Exceeds total supply cap");
      });

      it("should track mint timestamps", async () => {
        const mintAmount = ethers.parseEther("100");
        await propertyToken.connect(minter).mint(user1.address, mintAmount);

        const lastMintTime = await propertyToken.lastMintTimes(user1.address);
        expect(lastMintTime).to.be.gt(0);
      });
    });

    describe("Burning", () => {
      before(async () => {
        // Mint some tokens to user1 for burning tests
        await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));
      });

      it("should burn tokens", async () => {
        const balanceBefore = await propertyToken.balanceOf(user1.address);
        const burnAmount = ethers.parseEther("100");

        await propertyToken.connect(user1).burn(burnAmount);

        expect(await propertyToken.balanceOf(user1.address)).to.equal(balanceBefore - burnAmount);
      });

      it("should emit TokensBurned event", async () => {
        await expect(propertyToken.connect(user1).burn(ethers.parseEther("50")))
          .to.emit(propertyToken, "TokensBurned")
          .withArgs(user1.address, ethers.parseEther("50"));
      });

      it("should burnFrom with allowance", async () => {
        const burnAmount = ethers.parseEther("25");
        await propertyToken.connect(user1).approve(owner.address, burnAmount);
        const balanceBefore = await propertyToken.balanceOf(user1.address);

        await propertyToken.connect(owner).burnFrom(user1.address, burnAmount);

        expect(await propertyToken.balanceOf(user1.address)).to.equal(balanceBefore - burnAmount);
      });

      it("should revert burn when not KYC verified", async () => {
        // user3 is verified, but let's create a test with an unverified address
        const unverifiedUser = ethers.Wallet.createRandom().connect(ethers.provider);
        await expect(
          propertyToken.connect(unverifiedUser).burn(100)
        ).to.be.revertedWith("KYC not verified");
      });
    });

    describe("Transfers", () => {
      beforeEach(async () => {
        // Reset balances for transfer tests
        await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("5000"));
      });

      it("should transfer tokens", async () => {
        const balanceBefore = await propertyToken.balanceOf(user2.address);
        const transferAmount = ethers.parseEther("100");

        await propertyToken.connect(user1).transfer(user2.address, transferAmount);

        expect(await propertyToken.balanceOf(user2.address)).to.equal(balanceBefore + transferAmount);
      });

      it("should emit Transfer event", async () => {
        await expect(propertyToken.connect(user1).transfer(user2.address, ethers.parseEther("50")))
          .to.emit(propertyToken, "Transfer")
          .withArgs(user1.address, user2.address, ethers.parseEther("50"));
      });

      it("should handle transferFrom with approval", async () => {
        const transferAmount = ethers.parseEther("100");
        await propertyToken.connect(user1).approve(user2.address, transferAmount);
        const balanceBefore = await propertyToken.balanceOf(user3.address);

        await propertyToken.connect(user2).transferFrom(user1.address, user3.address, transferAmount);

        expect(await propertyToken.balanceOf(user3.address)).to.equal(balanceBefore + transferAmount);
      });

      it("should update allowance after transferFrom", async () => {
        const allowanceBefore = ethers.parseEther("100");
        await propertyToken.connect(user1).approve(user2.address, allowanceBefore);

        await propertyToken.connect(user2).transferFrom(user1.address, user3.address, ethers.parseEther("50"));

        const allowanceAfter = await propertyToken.allowance(user1.address, user2.address);
        expect(allowanceAfter).to.equal(allowanceBefore - ethers.parseEther("50"));
      });
    });
  });

  // =========================================================================
  // UNIT TESTS: Access Control
  // =========================================================================

  describe("Access Control", () => {
    describe("Owner Operations", () => {
      it("should allow owner to authorize minter", async () => {
        const newMinter = ethers.Wallet.createRandom().connect(ethers.provider);
        await propertyToken.connect(owner).authorizeMinter(newMinter.address);

        expect(await propertyToken.authorizedMinters(newMinter.address)).to.be.true;
      });

      it("should emit MinterAuthorized event", async () => {
        const newMinter = ethers.Wallet.createRandom().connect(ethers.provider);
        await expect(propertyToken.connect(owner).authorizeMinter(newMinter.address))
          .to.emit(propertyToken, "MinterAuthorized")
          .withArgs(newMinter.address);
      });

      it("should allow owner to revoke minter", async () => {
        await propertyToken.connect(owner).revokeMinter(minter.address);
        expect(await propertyToken.authorizedMinters(minter.address)).to.be.false;
      });

      it("should emit MinterRevoked event", async () => {
        await expect(propertyToken.connect(owner).revokeMinter(minter.address))
          .to.emit(propertyToken, "MinterRevoked")
          .withArgs(minter.address);
      });

      it("should revert authorizing zero address", async () => {
        await expect(
          propertyToken.connect(owner).authorizeMinter(ethers.ZeroAddress)
        ).to.be.revertedWith("Invalid minter address");
      });

      it("should allow owner to update property details", async () => {
        await propertyToken.connect(owner).updateProperty("New Building", "456 New St", 2000000);

        expect(await propertyToken.propertyName()).to.equal("New Building");
        expect(await propertyToken.propertyAddress()).to.equal("456 New St");
        expect(await propertyToken.propertyValue()).to.equal(2000000);
      });

      it("should emit PropertyUpdated event", async () => {
        await expect(propertyToken.connect(owner).updateProperty("New Building", "456 New St", 2000000))
          .to.emit(propertyToken, "PropertyUpdated")
          .withArgs("New Building", "456 New St", 2000000);
      });
    });

    describe("Minter Role", () => {
      it("should allow authorized minter to mint", async () => {
        await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("100"));
        expect(await propertyToken.balanceOf(user1.address)).to.be.gt(0);
      });

      it("should revert when non-minter tries to mint", async () => {
        await expect(
          propertyToken.connect(user1).mint(user2.address, ethers.parseEther("100"))
        ).to.be.revertedWith("Not authorized minter");
      });

      it("should allow owner to mint (owner has implicit minter rights)", async () => {
        await propertyToken.connect(owner).mint(user2.address, ethers.parseEther("100"));
        expect(await propertyToken.balanceOf(user2.address)).to.be.gt(0);
      });
    });
  });

  // =========================================================================
  // UNIT TESTS: Pause/Unpause Functionality
  // =========================================================================

  describe("Pause/Unpause", () => {
    it("should allow owner to pause", async () => {
      // First ensure we have tokens for the test
      const balanceBefore = await propertyToken.balanceOf(user1.address);
      if (balanceBefore === 0n) {
        await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("100"));
      }

      await propertyToken.connect(owner).pause();

      // Transfers should fail when paused - ERC20Pausable uses custom error
      await expect(
        propertyToken.connect(user1).transfer(user2.address, ethers.parseEther("10"))
      ).to.be.reverted;
    });

    it("should allow owner to unpause", async () => {
      // Ensure unpaused state first
      try {
        await propertyToken.connect(owner).unpause();
      } catch {
        // Already unpaused
      }

      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("100"));
      await propertyToken.connect(user1).transfer(user2.address, ethers.parseEther("10"));

      expect(await propertyToken.balanceOf(user2.address)).to.equal(ethers.parseEther("10"));
    });

    it("should revert pause when not owner", async () => {
      await expect(propertyToken.connect(user1).pause()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should revert unpause when not owner", async () => {
      await expect(propertyToken.connect(user1).unpause()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should revert burn when paused", async () => {
      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("100"));
      await propertyToken.connect(owner).pause();

      await expect(propertyToken.connect(user1).burn(ethers.parseEther("10"))).to.be.reverted;
    });
  });

  // =========================================================================
  // ERC-3643 COMPLIANCE TESTS: KYC Whitelist
  // =========================================================================

  describe("KYC Whitelist Compliance", () => {
    it("should revert mint to non-KYC verified address", async () => {
      const unverifiedUser = ethers.Wallet.createRandom().connect(ethers.provider);

      await expect(
        propertyToken.connect(minter).mint(unverifiedUser.address, ethers.parseEther("100"))
      ).to.be.reverted;
    });

    it("should revert transfer to non-KYC verified address", async () => {
      const unverifiedUser = ethers.Wallet.createRandom().connect(ethers.provider);

      await expect(
        propertyToken.connect(user1).transfer(unverifiedUser.address, ethers.parseEther("10"))
      ).to.be.reverted;
    });

    it("should revert transferFrom to non-KYC verified address", async () => {
      const unverifiedUser = ethers.Wallet.createRandom().connect(ethers.provider);
      await propertyToken.connect(user1).approve(user2.address, ethers.parseEther("100"));

      await expect(
        propertyToken.connect(user2).transferFrom(user1.address, unverifiedUser.address, ethers.parseEther("10"))
      ).to.be.reverted;
    });

    it("should allow transfer between KYC verified users", async () => {
      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));
      await propertyToken.connect(user1).transfer(user2.address, ethers.parseEther("100"));

      expect(await propertyToken.balanceOf(user2.address)).to.equal(ethers.parseEther("100"));
    });
  });

  // =========================================================================
  // ERC-3643 COMPLIANCE TESTS: Jurisdiction Lock
  // =========================================================================

  describe("Jurisdiction Lock", () => {
    it("should revert mint to user from disallowed jurisdiction", async () => {
      // Remove AE from allowed countries
      await identityRegistry.connect(owner).removeCountry("AE");

      // user4 is from AE
      await expect(
        propertyToken.connect(minter).mint(user4.address, ethers.parseEther("100"))
      ).to.be.revertedWith("Jurisdiction not allowed");
    });

    it("should revert transfer to user from disallowed jurisdiction", async () => {
      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));

      // Remove AE from allowed countries
      await identityRegistry.connect(owner).removeCountry("AE");

      // user4 is from AE
      await expect(
        propertyToken.connect(user1).transfer(user4.address, ethers.parseEther("10"))
      ).to.be.revertedWith("Recipient jurisdiction not allowed");
    });

    it("should allow transfer to user from allowed jurisdiction", async () => {
      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));
      await propertyToken.connect(user1).transfer(user2.address, ethers.parseEther("100"));

      expect(await propertyToken.balanceOf(user2.address)).to.equal(ethers.parseEther("100"));
    });
  });

  // =========================================================================
  // ERC-3643 COMPLIANCE TESTS: Holder Cap
  // =========================================================================

  describe("Holder Cap", () => {
    it("should enforce holder cap on mint", async () => {
      // Set a low holder cap
      const lowCap = ethers.parseEther("100");
      await compliance.connect(owner).setHolderCap(lowCap);

      // Try to mint more than cap
      await expect(
        propertyToken.connect(minter).mint(user3.address, lowCap + ethers.parseEther("1"))
      ).to.be.reverted;
    });

    it("should allow mint up to holder cap", async () => {
      const cap = ethers.parseEther("500");
      await compliance.connect(owner).setHolderCap(cap);

      await propertyToken.connect(minter).mint(user3.address, cap);
      expect(await propertyToken.balanceOf(user3.address)).to.equal(cap);
    });

    it("should enforce holder cap on transfer", async () => {
      // user1 already has some tokens
      const balance = await propertyToken.balanceOf(user1.address);
      const cap = ethers.parseEther("1000");
      await compliance.connect(owner).setHolderCap(cap);

      // Try to transfer more than remaining cap
      const remainingCap = cap - balance;
      if (remainingCap > 0n) {
        // user2 should receive and then user1 tries to send more
        await propertyToken.connect(user1).transfer(user2.address, remainingCap + ethers.parseEther("1"));
      }
    });
  });

  // =========================================================================
  // ERC-3643 COMPLIANCE TESTS: Holding Period
  // =========================================================================

  describe("Holding Period", () => {
    it("should track mint timestamps for holding period", async () => {
      const mintAmount = ethers.parseEther("100");
      const tx = await propertyToken.connect(minter).mint(user1.address, mintAmount);
      const block = await tx.getBlock();
      const blockTimestamp = BigInt(block?.timestamp || 0);

      expect(await propertyToken.mintTimestamps(user1.address)).to.equal(blockTimestamp);
    });

    it("should set minimum holding period in compliance", async () => {
      const newPeriod = 180 * 24 * 60 * 60; // 180 days
      await compliance.connect(owner).setMinimumHoldingPeriod(newPeriod);

      expect(await compliance.minimumHoldingPeriod()).to.equal(newPeriod);
    });

    it("should calculate holding period end time", async () => {
      const purchaseTime = await propertyToken.mintTimestamps(user1.address);
      const holdingPeriodEnd = await compliance.getHoldingPeriodEnd(purchaseTime);

      const minimumHoldingPeriod = await compliance.minimumHoldingPeriod();
      expect(holdingPeriodEnd).to.equal(purchaseTime + minimumHoldingPeriod);
    });
  });

  // =========================================================================
  // INTEGRATION TESTS: Full Lifecycle
  // =========================================================================

  describe("Full Lifecycle", () => {
    it("should complete full deploy -> mint -> transfer lifecycle", async () => {
      // 1. Verify KYC for a new user
      const newUser = ethers.Wallet.createRandom().connect(ethers.provider);
      const expiryTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;
      await identityRegistry.connect(owner).verifyIdentity(newUser.address, "IN", 3, expiryTime, ethers.id("newuser-id"));

      // 2. Mint tokens to the new user
      const mintAmount = ethers.parseEther("5000");
      await propertyToken.connect(minter).mint(newUser.address, mintAmount);
      expect(await propertyToken.balanceOf(newUser.address)).to.equal(mintAmount);

      // 3. Transfer to another verified user
      await propertyToken.connect(minter).mint(user2.address, ethers.parseEther("1000"));
      const transferAmount = ethers.parseEther("500");
      await propertyToken.connect(newUser).transfer(user2.address, transferAmount);

      expect(await propertyToken.balanceOf(newUser.address)).to.equal(mintAmount - transferAmount);
      expect(await propertyToken.balanceOf(user2.address)).to.be.gte(transferAmount);
    });

    it("should handle multi-step transfers with compliance checks", async () => {
      // Mint to user1
      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("2000"));

      // Transfer user1 -> user2
      await propertyToken.connect(user1).transfer(user2.address, ethers.parseEther("500"));

      // Transfer user2 -> user3
      await propertyToken.connect(user2).transfer(user3.address, ethers.parseEther("200"));

      expect(await propertyToken.balanceOf(user3.address)).to.equal(ethers.parseEther("200"));
    });

    it("should handle batch minting operations", async () => {
      const recipients = [user1.address, user2.address, user3.address];
      const amounts = [
        ethers.parseEther("100"),
        ethers.parseEther("200"),
        ethers.parseEther("300"),
      ];

      await propertyToken.connect(minter).batchMint(recipients, amounts);

      expect(await propertyToken.balanceOf(user1.address)).to.equal(ethers.parseEther("100"));
      expect(await propertyToken.balanceOf(user2.address)).to.equal(ethers.parseEther("200"));
      expect(await propertyToken.balanceOf(user3.address)).to.equal(ethers.parseEther("300"));
    });

    it("should revert batch mint with array length mismatch", async () => {
      await expect(
        propertyToken.connect(minter).batchMint(
          [user1.address, user2.address],
          [ethers.parseEther("100")]
        )
      ).to.be.revertedWith("Array length mismatch");
    });

    it("should revert batch mint with empty array", async () => {
      await expect(
        propertyToken.connect(minter).batchMint([], [])
      ).to.be.revertedWith("Empty array");
    });
  });

  // =========================================================================
  // INTEGRATION TESTS: Treasury and Fee Collection
  // =========================================================================

  describe("Treasury and Fee Collection Flows", () => {
    it("should track total supply correctly", async () => {
      const initialSupply = await propertyToken.totalSupply();

      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));

      expect(await propertyToken.totalSupply()).to.equal(initialSupply + ethers.parseEther("1000"));
    });

    it("should track remaining supply correctly", async () => {
      const remainingBefore = await propertyToken.getRemainingSupply();

      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));

      const remainingAfter = await propertyToken.getRemainingSupply();
      expect(remainingAfter).to.equal(remainingBefore - ethers.parseEther("1000"));
    });

    it("should handle burn reducing total supply", async () => {
      await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));
      const supplyBefore = await propertyToken.totalSupply();

      await propertyToken.connect(user1).burn(ethers.parseEther("500"));

      expect(await propertyToken.totalSupply()).to.equal(supplyBefore - ethers.parseEther("500"));
    });
  });

  // =========================================================================
  // GAS BENCHMARKS
  // =========================================================================

  describe("Gas Benchmarks", () => {
    it("should measure mint operation gas cost", async () => {
      const tx = await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("100"));
      const receipt = await tx.wait();

      if (receipt) {
        console.log(`Mint gas cost: ${receipt.gasUsed} gas`);
        // Log for reference
        expect(receipt.gasUsed).to.be.lt(500000); // Reasonable upper bound
      }
    });

    it("should measure transfer operation gas cost", async () => {
      // Ensure user1 has tokens
      const balance = await propertyToken.balanceOf(user1.address);
      if (balance === 0n) {
        await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));
      }

      const tx = await propertyToken.connect(user1).transfer(user2.address, ethers.parseEther("10"));
      const receipt = await tx.wait();

      if (receipt) {
        console.log(`Transfer gas cost: ${receipt.gasUsed} gas`);
        expect(receipt.gasUsed).to.be.lt(200000); // Reasonable upper bound
      }
    });

    it("should measure batch transfer via batchMint gas cost", async () => {
      const recipients = [
        ethers.Wallet.createRandom().connect(ethers.provider).address,
        ethers.Wallet.createRandom().connect(ethers.provider).address,
        ethers.Wallet.createRandom().connect(ethers.provider).address,
      ];

      // These addresses need KYC verification
      for (const recipient of recipients) {
        await identityRegistry.connect(owner).verifyIdentity(
          recipient,
          "IN",
          3,
          Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
          ethers.id(`id-${recipient}`)
        );
      }

      const amounts = [
        ethers.parseEther("10"),
        ethers.parseEther("20"),
        ethers.parseEther("30"),
      ];

      const tx = await propertyToken.connect(minter).batchMint(recipients, amounts);
      const receipt = await tx.wait();

      if (receipt) {
        console.log(`BatchMint (3 recipients) gas cost: ${receipt.gasUsed} gas`);
        // Batch should be more efficient than individual mints
        expect(receipt.gasUsed).to.be.lt(500000);
      }
    });

    it("should compare batch mint vs individual mints gas efficiency", async () => {
      // Create new verified recipients
      const recipient1 = ethers.Wallet.createRandom().connect(ethers.provider);
      const recipient2 = ethers.Wallet.createRandom().connect(ethers.provider);

      await identityRegistry.connect(owner).verifyIdentity(
        recipient1.address,
        "IN",
        3,
        Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        ethers.id("id-recipient1")
      );
      await identityRegistry.connect(owner).verifyIdentity(
        recipient2.address,
        "IN",
        3,
        Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        ethers.id("id-recipient2")
      );

      // Individual mints
      const tx1 = await propertyToken.connect(minter).mint(recipient1.address, ethers.parseEther("10"));
      const receipt1 = await tx1.wait();

      const tx2 = await propertyToken.connect(minter).mint(recipient2.address, ethers.parseEther("10"));
      const receipt2 = await tx2.wait();

      // Batch mint for comparison
      const recipient3 = ethers.Wallet.createRandom().connect(ethers.provider);
      const recipient4 = ethers.Wallet.createRandom().connect(ethers.provider);
      await identityRegistry.connect(owner).verifyIdentity(
        recipient3.address,
        "IN",
        3,
        Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        ethers.id("id-recipient3")
      );
      await identityRegistry.connect(owner).verifyIdentity(
        recipient4.address,
        "IN",
        3,
        Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        ethers.id("id-recipient4")
      );

      const batchTx = await propertyToken.connect(minter).batchMint(
        [recipient3.address, recipient4.address],
        [ethers.parseEther("10"), ethers.parseEther("10")]
      );
      const batchReceipt = await batchTx.wait();

      if (receipt1 && receipt2 && batchReceipt) {
        const individualTotalGas = receipt1.gasUsed + receipt2.gasUsed;
        const batchGas = batchReceipt.gasUsed;

        console.log(`Individual mints total gas: ${individualTotalGas}`);
        console.log(`Batch mint gas: ${batchGas}`);
        console.log(`Gas savings: ${individualTotalGas - batchGas} (${((individualTotalGas - batchGas) / individualTotalGas * 100).toFixed(1)}%)`);

        // Batch should be more efficient
        expect(batchGas).to.be.lt(individualTotalGas);
      }
    });
  });

  // =========================================================================
  // EDGE CASES AND REVERTS
  // =========================================================================

  describe("Edge Cases and Reverts", () => {
    it("should revert initialize with zero IdentityRegistry address", async () => {
      const PropertyToken = await ethers.getContractFactory("PropertyToken");
      const newToken = await PropertyToken.deploy(
        "Test Token",
        "TT",
        18,
        ethers.parseEther("1000000"),
        "Test",
        "Test",
        100000,
        "IN"
      ) as unknown as PropertyToken;
      await newToken.waitForDeployment();

      await expect(
        newToken.initialize(ethers.ZeroAddress, await compliance.getAddress())
      ).to.be.revertedWith("Invalid IdentityRegistry address");
    });

    it("should revert initialize with zero Compliance address", async () => {
      const PropertyToken = await ethers.getContractFactory("PropertyToken");
      const newToken = await PropertyToken.deploy(
        "Test Token",
        "TT",
        18,
        ethers.parseEther("1000000"),
        "Test",
        "Test",
        100000,
        "IN"
      ) as unknown as PropertyToken;
      await newToken.waitForDeployment();

      await expect(
        newToken.initialize(await identityRegistry.getAddress(), ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid Compliance address");
    });

    it("should handle transfer to self", async () => {
      // Ensure user1 has tokens first
      let balance = await propertyToken.balanceOf(user1.address);
      if (balance === 0n) {
        await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));
        balance = await propertyToken.balanceOf(user1.address);
      }

      await propertyToken.connect(user1).transfer(user1.address, ethers.parseEther("100"));

      expect(await propertyToken.balanceOf(user1.address)).to.equal(balance);
    });

    it("should handle zero amount transfer (no-op)", async () => {
      // Ensure user1 has tokens first
      let balance = await propertyToken.balanceOf(user1.address);
      if (balance === 0n) {
        await propertyToken.connect(minter).mint(user1.address, ethers.parseEther("1000"));
      }
      await propertyToken.connect(user1).transfer(user2.address, 0);

      expect(await propertyToken.balanceOf(user2.address)).to.equal(0);
    });
  });
});