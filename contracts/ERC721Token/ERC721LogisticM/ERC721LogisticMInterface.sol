// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.5.5;

import "../ERC721Base/ERC721BaseInterface.sol";
import "../ERC721Base/ERC721BaseEvents.sol";


/**
 * @title ERC721LogisticMInterface
 * @dev Define the interface of the ERC721LogisticM logic contract.
 */
contract ERC721LogisticMInterface is ERC721BaseInterface {
    function initializeERC721() public;
    function mint(address to) public;
    function getCounter() public view returns (uint256);
}
