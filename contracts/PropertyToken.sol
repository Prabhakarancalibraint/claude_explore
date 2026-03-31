// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

import "./IdentityRegistry.sol";
import "./PropertyCompliance.sol";

/**
 * @title PropertyToken
 * @dev ERC-3643 (T-REX) compliant token for RWA real estate tokenization
 * @notice Implements fractional ownership with KYC integration and jurisdiction lock
 */
contract PropertyToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, EIP712 {
    // Token name and symbol
    string private _name;
    string private _symbol;

    // Contract references
    IdentityRegistry public identityRegistry;
    PropertyCompliance public compliance;

    // Token decimals (18 for fractional ownership)
    uint8 private _decimals;

    // Total supply cap for fractional ownership
    uint256 public totalSupplyCap;

    // Property details
    string public propertyName;
    string public propertyAddress;
    uint256 public propertyValue;        // In USD (stored as cents: value * 100)
    string public jurisdiction;          // Property jurisdiction (IN or AE)

    // Token issue tracking
    mapping(address => uint256) public lastMintTimes;
    mapping(address => uint256) public mintTimestamps;

    // Authorized minters (for tokenization workflow)
    mapping(address => bool) public authorizedMinters;

    // Events
    event TokenInitialized(
        string name,
        string symbol,
        uint256 totalSupply,
        string propertyName,
        string propertyAddress,
        string jurisdiction
    );
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    event IdentityRegistryUpdated(address indexed oldRegistry, address indexed newRegistry);
    event ComplianceUpdated(address indexed oldCompliance, address indexed newCompliance);
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);
    event PropertyUpdated(string propertyName, string propertyAddress, uint256 propertyValue);

    // Modifiers
    modifier onlyAuthorizedMinter() {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized minter");
        _;
    }

    /**
     * @dev Constructor
     * @param name_ Token name (e.g., "Property Token - Sample Building")
     * @param symbol_ Token symbol (e.g., "PTSB")
     * @param decimals_ Token decimals (18 for maximum fractional ownership)
     * @param totalSupplyCap_ Maximum total supply
     * @param propertyName_ Name of the property
     * @param propertyAddress_ Address of the property
     * @param propertyValue_ Value of the property in USD cents
     * @param jurisdiction_ Jurisdiction code (IN for India, AE for UAE)
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalSupplyCap_,
        string memory propertyName_,
        string memory propertyAddress_,
        uint256 propertyValue_,
        string memory jurisdiction_
    ) ERC20(name_, symbol_) EIP712("PropertyToken", "1.0.0") Ownable(msg.sender) {
        require(bytes(name_).length > 0, "Name required");
        require(bytes(symbol_).length > 0, "Symbol required");
        require(totalSupplyCap_ > 0, "Supply cap required");
        require(bytes(jurisdiction_).length > 0, "Jurisdiction required");

        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        totalSupplyCap = totalSupplyCap_;
        propertyName = propertyName_;
        propertyAddress = propertyAddress_;
        propertyValue = propertyValue_;
        jurisdiction = jurisdiction_;
    }

    /**
     * @dev Initialize contracts (called after deployment)
     * @param identityRegistryAddress Address of IdentityRegistry
     * @param complianceAddress Address of PropertyCompliance
     */
    function initialize(address identityRegistryAddress, address complianceAddress) external onlyOwner {
        require(identityRegistryAddress != address(0), "Invalid IdentityRegistry address");
        require(complianceAddress != address(0), "Invalid Compliance address");

        emit IdentityRegistryUpdated(address(identityRegistry), identityRegistryAddress);
        emit ComplianceUpdated(address(compliance), complianceAddress);

        identityRegistry = IdentityRegistry(identityRegistryAddress);
        compliance = PropertyCompliance(complianceAddress);
    }

    /**
     * @dev Mint new tokens (fractional ownership issuance)
     * @param to Address to mint tokens to
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyAuthorizedMinter {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Cannot mint zero tokens");

        // Check total supply cap
        uint256 newTotalSupply = totalSupply() + amount;
        require(newTotalSupply <= totalSupplyCap, "Exceeds total supply cap");

        // Check KYC verification
        require(identityRegistry.isVerified(to), "KYC not verified");

        // Check jurisdiction
        require(identityRegistry.isJurisdictionAllowed(to), "Jurisdiction not allowed");

        // Check compliance - receive check
        (bool canReceive, bytes32 reason) = compliance.checkReceive(to, balanceOf(to), amount);
        require(canReceive, string(abi.encodePacked("Transfer not allowed: ", reason)));

        _mint(to, amount);
        mintTimestamps[to] = block.timestamp;
        lastMintTimes[to] = block.timestamp;

        emit TokensMinted(to, amount);
    }

    /**
     * @dev Batch mint to multiple addresses
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to mint
     */
    function batchMint(address[] calldata recipients, uint256[] calldata amounts) external onlyAuthorizedMinter {
        require(recipients.length == amounts.length, "Array length mismatch");
        require(recipients.length > 0, "Empty array");

        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            uint256 amount = amounts[i];

            require(to != address(0), "Cannot mint to zero address");
            require(amount > 0, "Cannot mint zero tokens");

            uint256 newTotalSupply = totalSupply() + amount;
            require(newTotalSupply <= totalSupplyCap, "Exceeds total supply cap");

            require(identityRegistry.isVerified(to), "KYC not verified");
            require(identityRegistry.isJurisdictionAllowed(to), "Jurisdiction not allowed");

            (bool canReceive, bytes32 reason) = compliance.checkReceive(to, balanceOf(to), amount);
            require(canReceive, string(abi.encodePacked("Transfer not allowed: ", reason)));

            _mint(to, amount);
            mintTimestamps[to] = block.timestamp;
            lastMintTimes[to] = block.timestamp;

            emit TokensMinted(to, amount);
        }
    }

    /**
     * @dev Override transfer with compliance checks
     */
    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {
        // Check compliance before transfer
        (bool canTransfer, bytes32 reason) = compliance.checkTransfer(msg.sender, to, amount);
        require(canTransfer, string(abi.encodePacked("Transfer not allowed: ", reason)));

        // Check KYC for sender (if sending)
        if (balanceOf(msg.sender) > 0) {
            require(identityRegistry.isVerified(msg.sender), "Sender KYC not verified");
        }

        // Check KYC for recipient (if receiving)
        if (amount > 0 && to != address(0)) {
            require(identityRegistry.isVerified(to), "Recipient KYC not verified");
            require(identityRegistry.isJurisdictionAllowed(to), "Recipient jurisdiction not allowed");

            // Check compliance - receive check
            (bool canReceive, bytes32 reason2) = compliance.checkReceive(to, balanceOf(to), amount);
            require(canReceive, string(abi.encodePacked("Transfer not allowed: ", reason2)));
        }

        _transfer(msg.sender, to, amount);
        return true;
    }

    /**
     * @dev Override transferFrom with compliance checks
     */
    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused returns (bool) {
        require(!compliance.transfersPaused(), "Transfers paused");

        // Check compliance before transfer
        (bool canTransfer, bytes32 reason) = compliance.checkTransfer(from, to, amount);
        require(canTransfer, string(abi.encodePacked("Transfer not allowed: ", reason)));

        // Check KYC for sender
        if (balanceOf(from) > 0) {
            require(identityRegistry.isVerified(from), "Sender KYC not verified");
        }

        // Check KYC for recipient
        if (amount > 0 && to != address(0)) {
            require(identityRegistry.isVerified(to), "Recipient KYC not verified");
            require(identityRegistry.isJurisdictionAllowed(to), "Recipient jurisdiction not allowed");

            // Check compliance - receive check
            (bool canReceive, bytes32 reason2) = compliance.checkReceive(to, balanceOf(to), amount);
            require(canReceive, string(abi.encodePacked("Transfer not allowed: ", reason2)));
        }

        _spendAllowance(from, msg.sender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Burn tokens
     * @param amount Amount to burn
     */
    function burn(uint256 amount) public override whenNotPaused {
        require(identityRegistry.isVerified(msg.sender), "KYC not verified");
        super.burn(amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Burn tokens from specific address (for forced removal)
     * @param account Address to burn from
     * @param amount Amount to burn
     */
    function burnFrom(address account, uint256 amount) public override whenNotPaused {
        require(identityRegistry.isVerified(account), "KYC not verified");
        super.burnFrom(account, amount);
        emit TokensBurned(account, amount);
    }

    /**
     * @dev Authorize a minter
     * @param minter Address to authorize
     */
    function authorizeMinter(address minter) external onlyOwner {
        require(minter != address(0), "Invalid minter address");
        authorizedMinters[minter] = true;
        emit MinterAuthorized(minter);
    }

    /**
     * @dev Revoke minter authorization
     * @param minter Address to revoke
     */
    function revokeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
        emit MinterRevoked(minter);
    }

    /**
     * @dev Pause token transfers
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Update property details
     * @param newPropertyName New property name
     * @param newPropertyAddress New property address
     * @param newPropertyValue New property value in USD cents
     */
    function updateProperty(
        string memory newPropertyName,
        string memory newPropertyAddress,
        uint256 newPropertyValue
    ) external onlyOwner {
        propertyName = newPropertyName;
        propertyAddress = newPropertyAddress;
        propertyValue = newPropertyValue;
        emit PropertyUpdated(newPropertyName, newPropertyAddress, newPropertyValue);
    }

    /**
     * @dev Get remaining mintable tokens
     * @return Remaining tokens that can be minted
     */
    function getRemainingSupply() external view returns (uint256) {
        return totalSupplyCap - totalSupply();
    }

    /**
     * @dev Get token name
     */
    function name() public view override returns (string memory) {
        return _name;
    }

    /**
     * @dev Get token symbol
     */
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Get token decimals
     */
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Required override for ERC20Pausable
     */
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}