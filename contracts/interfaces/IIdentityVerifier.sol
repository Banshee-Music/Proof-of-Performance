// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IIdentityVerifier {
    function verify(
        bytes calldata proof,
        bytes32 identityHash
    ) external view returns (bool);
}