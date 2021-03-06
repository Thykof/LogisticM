// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.5.5;

import "./NameEvents.sol";


/**
 * @title NameInterface
 * @dev Define the interface of the Name logic contract.
 */
contract NameInterface is NameEvents {
    function setName(address account, bytes32 nameBytes32) external;

    function getName(address account) external view returns (string memory);
    function getAddress(bytes32 nameBytes32) external view returns (address);
}
