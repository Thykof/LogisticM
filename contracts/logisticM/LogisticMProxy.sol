// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.5.5;

import "./LogisticMSharedStorage.sol";
import "../upgradeability/proxy/OwnedUpgradeabilityProxy.sol";
import "../commons/Ownable.sol";
import "../commons/Pausable.sol";
import "../upgradeability/ImplementationBase.sol";


/**
 * @title LogisticMProxy
 * @dev The proxy deployed by the registry.
 */
contract LogisticMProxy is
    LogisticMSharedStorage,
    OwnedUpgradeabilityProxy,
    ImplementationBase,
    Ownable,
    Pausable {

    constructor(string memory _version, address sender)
        public
        OwnedUpgradeabilityProxy(_version, sender)
    {
        require(msg.sender == address(registry), "LogisticMProxy: bad sender");

        // We need to initialize these implementations.
        // It will send variables like owner, _symbol...
        dCall(abi.encodeWithSignature("initializeOwner(address)", sender));
        dCall(abi.encodeWithSignature("initializeERC721()"));
    }

    /**
     * @dev Set the lock to `true` or `false`.
     * Used mainly in the tests, but can be usefull for the owner to bypass
     * some check and perform operations manually.
     * WARNING: always set lock to true after doing operations
     * @param lock_ The lock variable of the proxy contract.
     */
    function setLock(bool lock_) external whenPaused(paused) onlyOwner(owner) {
        lock = lock_;
    }
}
