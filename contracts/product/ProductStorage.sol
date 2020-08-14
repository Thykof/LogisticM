pragma solidity ^0.5.0;

import "./ProductEvents.sol";
import "../proxy/Upgradeable.sol";


contract ProductStorage is Upgradeable, ProductEvents {
    struct Product {
        address purchaser;
        uint256 tokenId;
        string productName;
        mapping (address => address) sent; // from -> to
        mapping (address => address) received; // from -> by
    }

    // Mapping from productHash to Product
    mapping (bytes32 => Product) internal _products;

    // Mapping from tokenId to productHash
    mapping (uint256 => bytes32) internal tokenToProductHash;
}