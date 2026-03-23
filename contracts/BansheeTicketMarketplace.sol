// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IIdentityVerifier.sol";

contract BansheeTicketMarketplace is ERC721, Ownable {
    uint256 public ticketCounter;

    IIdentityVerifier public verifier;

    struct Ticket {
        address artist;
        bytes32 identityHash;
        string contentCID;
        uint256 mintedAt;
    }

    mapping(uint256 => Ticket) public tickets;

    event TicketMinted(
        uint256 indexed ticketId,
        address indexed buyer,
        address indexed artist,
        bytes32 identityHash
    );

    event ContentUnlocked(
        uint256 indexed ticketId,
        address indexed user
    );

    constructor(address verifierAddress, address initialOwner)
        ERC721("Banshee U2SSO Ticket", "BU2SSO")
        Ownable(initialOwner)
    {
        verifier = IIdentityVerifier(verifierAddress);
    }

    function mintTicket(
        bytes calldata zkProof,
        bytes32 identityHash,
        address artist,
        string calldata cid
    ) external {
        if (address(verifier) != address(0)) {
            require(
                verifier.verify(zkProof, identityHash),
                "Invalid identity proof"
            );
        }

        uint256 ticketId = ++ticketCounter;
        _safeMint(msg.sender, ticketId);

        tickets[ticketId] = Ticket({
            artist: artist,
            identityHash: identityHash,
            contentCID: cid,
            mintedAt: block.timestamp
        });

        emit TicketMinted(ticketId, msg.sender, artist, identityHash);
    }

    function unlockContent(uint256 ticketId) external {
        require(ownerOf(ticketId) == msg.sender, "Not owner");
        emit ContentUnlocked(ticketId, msg.sender);
    }
}