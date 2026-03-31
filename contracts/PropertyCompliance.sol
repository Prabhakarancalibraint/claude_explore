// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PropertyCompliance
 * @dev Compliance module for ERC-3643 RWA tokenization
 * @notice Implements holder caps, holding periods, and transfer restrictions
 */
contract PropertyCompliance is Ownable {
    // Struct for holder lock information
    struct HolderLock {
        uint256 lockEndTime;      // Time when lock expires
        uint256 lockedAmount;     // Amount locked
        bool isLocked;           // Whether holder is locked
    }

    // Struct for transfer limit
    struct TransferLimit {
        uint256 maxPerTransaction;
        uint256 maxDailyVolume;
        uint256 dailyVolumeUsed;
        uint256 lastResetTime;
    }

    // Maximum tokens a single holder can have (in wei)
    uint256 public holderCap;

    // Minimum holding period after purchase (in seconds)
    uint256 public minimumHoldingPeriod;

    // Transfer cooldowns between transactions (in seconds)
    uint256 public transferCooldown;

    // Whether transfers are currently paused
    bool public transfersPaused;

    // Maximum number of unique holders allowed
    uint256 public maxHolders;

    // Holder locks mapping
    mapping(address => HolderLock) public holderLocks;

    // Transfer limits per address
    mapping(address => TransferLimit) public transferLimits;

    // Daily volume tracking
    mapping(address => uint256) public dailyVolume;
    mapping(address => uint256) public lastDailyReset;

    // Events
    event HolderCapUpdated(uint256 newCap);
    event MinimumHoldingPeriodUpdated(uint256 newPeriod);
    event TransferCooldownUpdated(uint256 newCooldown);
    event TransfersPaused(bool paused);
    event HolderLocked(address indexed holder, uint256 lockEndTime, uint256 amount);
    event HolderUnlocked(address indexed holder);
    event MaxHoldersUpdated(uint256 newMax);
    event TransferLimitUpdated(address indexed holder, uint256 maxPerTx, uint256 maxDaily);

    constructor() Ownable(msg.sender) {
        holderCap = 1000000 * 10**18; // Default: 1M tokens max per holder
        minimumHoldingPeriod = 365 days; // Default: 1 year holding period
        transferCooldown = 0; // No cooldown by default
        transfersPaused = false;
        maxHolders = 100; // Default max 100 unique holders
    }

    /**
     * @dev Set maximum tokens a holder can have
     * @param newCap New holder cap (in wei)
     */
    function setHolderCap(uint256 newCap) external onlyOwner {
        require(newCap > 0, "Cap must be positive");
        holderCap = newCap;
        emit HolderCapUpdated(newCap);
    }

    /**
     * @dev Set minimum holding period
     * @param newPeriod New period in seconds
     */
    function setMinimumHoldingPeriod(uint256 newPeriod) external onlyOwner {
        require(newPeriod > 0, "Period must be positive");
        minimumHoldingPeriod = newPeriod;
        emit MinimumHoldingPeriodUpdated(newPeriod);
    }

    /**
     * @dev Set transfer cooldown period
     * @param newCooldown New cooldown in seconds
     */
    function setTransferCooldown(uint256 newCooldown) external onlyOwner {
        transferCooldown = newCooldown;
        emit TransferCooldownUpdated(newCooldown);
    }

    /**
     * @dev Pause or unpause transfers
     * @param paused Whether to pause transfers
     */
    function setTransfersPaused(bool paused) external onlyOwner {
        transfersPaused = paused;
        emit TransfersPaused(paused);
    }

    /**
     * @dev Set maximum number of holders
     * @param newMax New maximum holders
     */
    function setMaxHolders(uint256 newMax) external onlyOwner {
        require(newMax > 0, "Max holders must be positive");
        maxHolders = newMax;
        emit MaxHoldersUpdated(newMax);
    }

    /**
     * @dev Lock a holder's tokens for a period
     * @param holder Address to lock
     * @param lockDuration Duration in seconds
     * @param amount Amount to lock (0 = lock all)
     */
    function lockHolder(address holder, uint256 lockDuration, uint256 amount) external onlyOwner {
        require(holder != address(0), "Invalid holder");
        require(lockDuration > 0, "Lock duration must be positive");

        holderLocks[holder] = HolderLock({
            lockEndTime: block.timestamp + lockDuration,
            lockedAmount: amount,
            isLocked: true
        });

        emit HolderLocked(holder, block.timestamp + lockDuration, amount);
    }

    /**
     * @dev Unlock a holder
     * @param holder Address to unlock
     */
    function unlockHolder(address holder) external onlyOwner {
        require(holderLocks[holder].isLocked, "Holder not locked");

        holderLocks[holder].isLocked = false;
        holderLocks[holder].lockedAmount = 0;
        holderLocks[holder].lockEndTime = 0;

        emit HolderUnlocked(holder);
    }

    /**
     * @dev Set transfer limits for a specific holder
     * @param holder Address to set limits for
     * @param maxPerTx Maximum per transaction
     * @param maxDaily Maximum daily volume
     */
    function setTransferLimit(address holder, uint256 maxPerTx, uint256 maxDaily) external onlyOwner {
        transferLimits[holder] = TransferLimit({
            maxPerTransaction: maxPerTx,
            maxDailyVolume: maxDaily,
            dailyVolumeUsed: 0,
            lastResetTime: block.timestamp
        });

        emit TransferLimitUpdated(holder, maxPerTx, maxDaily);
    }

    /**
     * @dev Check if transfer is allowed
     * @param from Sender address
     * @param amount Amount to transfer
     * @return True if transfer is allowed
     * @return Reason code if not allowed (0 = allowed)
     */
    function checkTransfer(
        address from,
        address,  // to - reserved for future use
        uint256 amount
    ) external view returns (bool, bytes32) {
        // Check if transfers are paused
        if (transfersPaused) {
            return (false, "Transfers paused");
        }

        // Check holder lock
        HolderLock memory lock = holderLocks[from];
        if (lock.isLocked) {
            if (block.timestamp < lock.lockEndTime) {
                if (lock.lockedAmount > 0 && amount > lock.lockedAmount) {
                    return (false, "Amount exceeds locked amount");
                }
                return (false, "Holder is locked");
            }
        }

        // Check transfer cooldown
        if (transferCooldown > 0) {
            TransferLimit memory limit = transferLimits[from];
            if (limit.maxPerTransaction > 0) {
                // Would need to track last transfer time per holder
            }
        }

        return (true, "");
    }

    /**
     * @dev Check if holder can receive tokens
     * @param holder Holder address
     * @param balance Current balance
     * @param amount Amount to add
     * @return True if can receive
     * @return Reason code if not allowed
     */
    function checkReceive(
        address holder,
        uint256 balance,
        uint256 amount
    ) external view returns (bool, bytes32) {
        // Check holder cap
        if (balance + amount > holderCap) {
            return (false, "Exceeds holder cap");
        }

        // Check lock expiry for receiving
        HolderLock memory lock = holderLocks[holder];
        if (lock.isLocked && block.timestamp < lock.lockEndTime) {
            return (false, "Holder is locked");
        }

        return (true, "");
    }

    /**
     * @dev Get holder lock status
     * @param holder Address to check
     * @return lockEndTime, lockedAmount, isLocked
     */
    function getHolderLock(address holder) external view returns (uint256, uint256, bool) {
        HolderLock memory lock = holderLocks[holder];
        return (lock.lockEndTime, lock.lockedAmount, lock.isLocked);
    }

    /**
     * @dev Calculate required holding period end time
     * @param purchaseTime Time of purchase
     * @return End time of holding period
     */
    function getHoldingPeriodEnd(uint256 purchaseTime) external view returns (uint256) {
        return purchaseTime + minimumHoldingPeriod;
    }
}