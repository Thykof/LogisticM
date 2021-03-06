// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.5.5;

import "./IRegistry.sol";
import "../../logisticM/LogisticMProxy.sol";
import "../../commons/BytesLib.sol";


/**
 * @title Registry
 * @dev This contract works as a registry of versions, it holds the implementations for the registered versions.
 */
contract Registry is IRegistry {
    /// Mapping of versions to implementations of different functions
    mapping (string => mapping (bytes4 => address)) internal versions;

    /// Mapping of versions to list of identifiers of its functions
    mapping (string => bytes4[]) internal funcs;

    /// Fallback function implementation for each version
    mapping (string => address) internal fallbacks;

    /**
     * @dev Returns a function name and implementation for a given version, given its index
     */
    function getFunctionByIndex(string memory version, uint256 index) public view returns (bytes4, address) {
        bytes4 func = funcs[version][index];
        return (funcs[version][index], versions[version][func]);
    }

    /**
     * @dev Returns the number of functions (excluding the fallback function) registered for a specific version
     */
    function getFunctionCount(string memory version) public view returns (uint256) {
        return funcs[version].length;
    }

    /**
    * @dev Tells the address of the function implementation for a given version
    * @param version representing the version of the function implementation to be queried
    * @param func representing the signature of the function to be queried
    * @return address of the function implementation registered for the given version
    */
    function getFunction(string memory version, bytes4 func)
        public
        view
        returns (address)
    {
        return versions[version][func];
    }

    /**
     * @dev Returns the the fallback function for a specific version, if registered
     */
    function getFallback(string memory version) public view returns (address) {
        return fallbacks[version];
    }

    /**
     * @dev Registers a fallback function implementation for a version
     */
    function _addFallback(string memory version, address implementation) internal {
        require(fallbacks[version] == address(0), "Registry: fallback already defined");
        fallbacks[version] = implementation;
        emit FallbackAdded(version, implementation);
    }

    /**
    * @dev Registers a new version of a function with its implementation address
    * @param version representing the version name of the new function implementation to be registered
    * @param func representing the name of the function to be registered
    * @param implementation representing the address of the new function implementation to be registered
    */
    function _addVersionFromName(
        string memory version,
        string memory func,
        address implementation
    )
        internal
    {
        _addVersion(
            version,
            BytesLib.convertBytesToBytes4(abi.encodeWithSignature(func)),
            implementation
        );
    }

    /**
    * @dev Registers a new version of a function with its implementation address
    * @param version representing the version name of the new function implementation to be registered
    * @param func representing the signature of the function to be registered
    * @param implementation representing the address of the new function implementation to be registered
    */
    function _addVersion(
        string memory version,
        bytes4 func,
        address implementation
    )
        internal
    {
        require(
            versions[version][func] == address(0),
            "Registry: func already defined"
        );
        versions[version][func] = implementation;
        funcs[version].push(func);
        emit VersionAdded(version, func, implementation);
    }

    /**
    * @dev Creates an upgradeable proxy
    * @return address of the new proxy created
    */
    function _createProxy(string memory version)
        internal
        returns (LogisticMProxy)
    {
        LogisticMProxy proxy = new LogisticMProxy(version, msg.sender);
        emit ProxyCreated(address(proxy));
        return proxy;
    }

    /**
     * @dev For each function, set the version to the given `targetVersion`
     * @param targetVersion representing the version name of the new implementations to be set
     */
    function _upgradeFunctions(
        string memory currentVersion,
        string memory targetVersion
    )
        internal
    {
        bytes4 func;
        address impl;
        uint256 i;

        for (i = 0; i < getFunctionCount(currentVersion); i++) {
            (func, impl) = getFunctionByIndex(currentVersion, i);
            versions[targetVersion][func] = impl;
            funcs[targetVersion].push(func);
        }
    }
}
