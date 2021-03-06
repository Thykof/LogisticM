pragma solidity ^0.5.5;

import "../logisticM/LogisticMSharedStorage.sol";
import "./AccessInterface.sol";
import "../commons/Ownable.sol";
import "../upgradeability/ImplementationBase.sol";


/**
 * @title AccessImplementation
 * @dev The Access logic contract. This defines functions for user role
 * management.
 */
contract AccessImplementation is
    AccessInterface,
    LogisticMSharedStorage,
    Ownable,
    ImplementationBase {

    /**
    * @dev This function grant supplier role to account and set its name to nameBytes32.
    * @param account representing the address of the new supplier
    * @param nameBytes32 representing the name of the supplier
    */
    function addSupplierWithName(address account, bytes32 nameBytes32)
        external
        onlyOwner(owner)
    {
        addSupplier(account);
        dCall(abi.encodeWithSignature(
            "setName(address,bytes32)",
            account,
            nameBytes32
        ));
    }

    /**
    * @dev This function revoke supplier role.
    * @param account representing the address of the supplier
    */
    function removeSupplier(address account) external onlyOwner(owner) {
        logisticMRoles.removeSupplier(account);
        emit SupplierRemoved(account);
    }

    /**
    * @dev This function revoke supplier role to the caller.
    */
    function renounceSupplier() external {
        require(
            isSupplier(msg.sender),
            "Access: caller is not supplier"
        );
        logisticMRoles.removeSupplier(msg.sender);
        emit SupplierRemoved(msg.sender);
    }

    /**
    * @dev This function grant delivery man role to account and set its name to nameBytes32.
    * @param account representing the address of the new delivery man
    * @param nameBytes32 representing the name of the delivery man
    */
    function addDeliveryManWithName(address account, bytes32 nameBytes32)
        external
        onlyOwner(owner)
    {
        addDeliveryMan(account);
        dCall(abi.encodeWithSignature(
            "setName(address,bytes32)",
            account,
            nameBytes32
        ));
    }

    /**
    * @dev This function revoke delivery man role.
    * @param account representing the address of the delivery man
    */
    function removeDeliveryMan(address account) external onlyOwner(owner) {
        logisticMRoles.removeDeliveryMan(account);
        emit DeliveryManRemoved(account);
    }

    /**
    * @dev This function revoke delivery man role to the caller.
    */
    function renounceDeliveryMan() external {
        require(
            isDeliveryMan(msg.sender),
            "Access: caller is not delivery man"
        );
        logisticMRoles.removeDeliveryMan(msg.sender);
        emit DeliveryManRemoved(msg.sender);
    }

    /**
    * @dev This function returns the role of the given account.
    * Mapping from integer to role is describe in RolesLibrary.RoleNames
    * @return uint256 An integer representing the role of account
    */
    function getRole(address account)
        external
        view
        returns (uint256)
    {
        if (account == owner) {
            return uint256(RolesLibrary.RoleNames.Owner);
        }
        if (isSupplier(account)) {
            return uint256(RolesLibrary.RoleNames.Supplier);
        }
        if (isDeliveryMan(account)) {
            return uint256(RolesLibrary.RoleNames.DeliveryMan);
        }
        return uint256(RolesLibrary.RoleNames.Nobody);
    }

    /**
    * @dev This function grant supplier role to account.
    */
    function addSupplier(address account) public onlyOwner(owner) {
        require(account != owner, "Access: Owner can't be supplier");
        logisticMRoles.addSupplier(account);
        emit SupplierAdded(account);
    }

    /**
    * @dev This function grant delivery man role to account.
    */
    function addDeliveryMan(address account) public onlyOwner(owner) {
        require(account != owner, "Access: Owner can't be delivery man");
        logisticMRoles.addDeliveryMan(account);
        emit DeliveryManAdded(account);
    }

    /**
    * @dev This function returns true if the given account is a supplier.
    * @return bool Whether or not account has the supplier role.
    */
    function isSupplier(address account) public view returns (bool) {
        return logisticMRoles.isSupplier(account);
    }

    /**
    * @dev This function returns true if the given account is a delivery man.
    * @return bool Whether or not account has the delivery man role.
    */
    function isDeliveryMan(address account) public view returns (bool) {
        return logisticMRoles.isDeliveryMan(account);
    }
}
