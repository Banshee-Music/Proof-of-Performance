// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../interfaces/IIdentityVerifier.sol";

contract MockIdentityVerifier is IIdentityVerifier {
    bool public shouldVerify = true;

    function setShouldVerify(bool value) external {
        shouldVerify = value;
    }

    function verify(
        bytes calldata,
        bytes32
    ) external view override returns (bool) {
        return shouldVerify;
    }
}