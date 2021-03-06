// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.5.5;


contract IOwnedUpgradeabilityProxy {
    function upgradeTo(string memory targetVersion) public;
    function transferProxyOwnership(address newOwner) public;
    function upgradeToAndCall(string memory version, bytes memory data) public;
    function implementation(bytes4 func) public view returns (address);
    function proxyOwner() public view returns (address); // Same as upgradeabilityOwner()
    function upgradeabilityOwner() public view returns (address);
}
