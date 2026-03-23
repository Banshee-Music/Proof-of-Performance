pragma solidity ^0.8.20;

contract BansheeReputation {

    address public trackerOracle;

    struct ArtistRep {
        uint256 chunksServed;
        uint256 uniqueFans;
        uint256 reputationScore;
    }

    mapping(address => ArtistRep) public reputation;

    modifier onlyOracle() {
        require(msg.sender == trackerOracle, "Not oracle");
        _;
    }

    constructor(address oracle) {
        trackerOracle = oracle;
    }

    event ReceiptRecorded(
        address artist,
        address fan,
        uint256 chunks
    );

    function recordReceipt(
        address artist,
        address fan,
        uint256 chunks
    ) external onlyOracle {

        ArtistRep storage rep = reputation[artist];

        rep.chunksServed += chunks;
        rep.uniqueFans += 1;

        rep.reputationScore =
            rep.chunksServed * 2 +
            rep.uniqueFans * 10;

        emit ReceiptRecorded(artist, fan, chunks);
    }

}