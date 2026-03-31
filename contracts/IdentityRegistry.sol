// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title IdentityRegistry
 * @dev Manages KYC/identity verification for ERC-3643 compliance
 * @notice Integrates with ONCHAINID for identity verification
 */
contract IdentityRegistry is Ownable, EIP712 {
    using ECDSA for bytes32;

    // Struct for investor identity
    struct Identity {
        address investorAddress;
        string countryCode;      // ISO country code (IN for India, AE for UAE)
        uint256 kycLevel;         // KYC verification level
        uint256 expiryTime;      // KYC expiry timestamp
        bool isVerified;         // Overall verification status
        bytes32 identityId;     // ONCHAINID reference
    }

    // Supported jurisdictions
    mapping(string => bool) public allowedCountries;
    mapping(address => Identity) public identities;

    // Events
    event IdentityVerified(address indexed investor, string countryCode, uint256 kycLevel);
    event IdentityRevoked(address indexed investor);
    event CountryAdded(string indexed countryCode);
    event CountryRemoved(string indexed countryCode);

    // Domain separator for EIP-712 signatures
    bytes32 private constant _IDENTITY_TYPEHASH =
        keccak256("Identity(address investorAddress,string countryCode,uint256 kycLevel,uint256 expiryTime)");

    constructor() Ownable(msg.sender) EIP712("IdentityRegistry", "1.0.0") {
        // Initialize allowed countries - India and UAE for this RWA token
        allowedCountries["IN"] = true;  // India
        allowedCountries["AE"] = true;  // UAE
        allowedCountries["US"] = true;  // US (for testing)
    }

    /**
     * @dev Internal function to set identity
     */
    function _setIdentity(
        address investor,
        string memory countryCode,
        uint256 kycLevel,
        uint256 expiryTime,
        bytes32 identityId
    ) internal {
        identities[investor] = Identity({
            investorAddress: investor,
            countryCode: countryCode,
            kycLevel: kycLevel,
            expiryTime: expiryTime,
            isVerified: true,
            identityId: identityId
        });
    }

    /**
     * @dev Verify investor identity (called by authorized KYC providers)
     * @param investor Address of the investor
     * @param countryCode ISO country code
     * @param kycLevel KYC verification level (1-5)
     * @param expiryTime Unix timestamp when KYC expires
     * @param identityId ONCHAINID reference
     */
    function verifyIdentity(
        address investor,
        string calldata countryCode,
        uint256 kycLevel,
        uint256 expiryTime,
        bytes32 identityId
    ) external onlyOwner {
        require(investor != address(0), "Invalid investor address");
        require(allowedCountries[countryCode], "Country not allowed");
        require(kycLevel >= 1 && kycLevel <= 5, "Invalid KYC level");

        _setIdentity(investor, countryCode, kycLevel, expiryTime, identityId);

        emit IdentityVerified(investor, countryCode, kycLevel);
    }

    /**
     * @dev Batch verify multiple identities
     * @param investors Array of investor addresses
     * @param countryCodes Array of country codes
     * @param kycLevels Array of KYC levels
     * @param expiryTimes Array of expiry times
     * @param identityIds Array of ONCHAINID references
     */
    function batchVerifyIdentity(
        address[] calldata investors,
        string[] calldata countryCodes,
        uint256[] calldata kycLevels,
        uint256[] calldata expiryTimes,
        bytes32[] calldata identityIds
    ) external onlyOwner {
        require(
            investors.length == countryCodes.length &&
            investors.length == kycLevels.length &&
            investors.length == expiryTimes.length &&
            investors.length == identityIds.length,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < investors.length; i++) {
            require(investors[i] != address(0), "Invalid investor address");
            require(allowedCountries[countryCodes[i]], "Country not allowed");
            require(kycLevels[i] >= 1 && kycLevels[i] <= 5, "Invalid KYC level");

            _setIdentity(investors[i], countryCodes[i], kycLevels[i], expiryTimes[i], identityIds[i]);

            emit IdentityVerified(investors[i], countryCodes[i], kycLevels[i]);
        }
    }

    /**
     * @dev Revoke investor identity
     * @param investor Address of the investor
     */
    function revokeIdentity(address investor) external onlyOwner {
        require(identities[investor].isVerified, "Identity not verified");

        identities[investor].isVerified = false;
        emit IdentityRevoked(investor);
    }

    /**
     * @dev Check if investor is verified and KYC is valid
     * @param investor Address to check
     * @return True if verified and KYC is valid
     */
    function isVerified(address investor) public view returns (bool) {
        Identity memory identity = identities[investor];
        return identity.isVerified && identity.expiryTime > block.timestamp;
    }

    /**
     * @dev Check if investor is from allowed jurisdiction
     * @param investor Address to check
     * @return True if from allowed jurisdiction
     */
    function isJurisdictionAllowed(address investor) public view returns (bool) {
        Identity memory identity = identities[investor];
        return allowedCountries[identity.countryCode];
    }

    /**
     * @dev Get investor KYC level
     * @param investor Address to check
     * @return KYC level (0 if not verified)
     */
    function getKYCLevel(address investor) public view returns (uint256) {
        Identity memory identity = identities[investor];
        return identity.isVerified && identity.expiryTime > block.timestamp ? identity.kycLevel : 0;
    }

    /**
     * @dev Add allowed country
     * @param countryCode ISO country code
     */
    function addCountry(string calldata countryCode) external onlyOwner {
        allowedCountries[countryCode] = true;
        emit CountryAdded(countryCode);
    }

    /**
     * @dev Remove allowed country
     * @param countryCode ISO country code
     */
    function removeCountry(string calldata countryCode) external onlyOwner {
        allowedCountries[countryCode] = false;
        emit CountryRemoved(countryCode);
    }

    /**
     * @dev Get investor identity details
     * @param investor Address to check
     * @return Identity struct
     */
    function getIdentity(address investor) public view returns (Identity memory) {
        return identities[investor];
    }
}