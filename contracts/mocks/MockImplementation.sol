pragma solidity ^0.5.0;


/**
 * @title ERC721Mock
 * @dev This contract is used for the tests.
 */
contract MockImplementationV0 {
    constructor() public {
        myMethod();
    }

    function myMethod() public pure {
        1 + 1;
    }
}
