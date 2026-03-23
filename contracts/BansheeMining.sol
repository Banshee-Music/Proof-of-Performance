// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IReputation {
    function reputation(address artist)
        external
        view
        returns (
            uint256 chunksServed,
            uint256 uniqueFans,
            uint256 reputationScore
        );
}

contract BansheeToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("Banshee Token", "BNSH")
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

contract BansheeMining is Ownable {
    IReputation public reputationContract;
    BansheeToken public token;

    uint256 public epochEmission = 10000 ether;
    uint256 public epochLength = 1 days;

    mapping(address => uint256) public lastClaim;
    mapping(address => bool) public isArtist;

    address[] public artists;

    event ArtistRegistered(address indexed artist);
    event RewardClaimed(address indexed artist, uint256 amount);

    constructor(
        address repAddress,
        address tokenAddress,
        address initialOwner
    ) Ownable(initialOwner) {
        reputationContract = IReputation(repAddress);
        token = BansheeToken(tokenAddress);
    }

    function registerArtist(address artist) external onlyOwner {
        require(!isArtist[artist], "Already registered");

        artists.push(artist);
        isArtist[artist] = true;

        emit ArtistRegistered(artist);
    }

    function calculateTotalPower() public view returns (uint256 totalPower) {
        for (uint256 i = 0; i < artists.length; i++) {
            (, , uint256 repScore) = reputationContract.reputation(artists[i]);
            totalPower += repScore;
        }
    }

    function claimRewards() external {
        require(isArtist[msg.sender], "Not artist");
        require(
            block.timestamp >= lastClaim[msg.sender] + epochLength,
            "Epoch not finished"
        );

        uint256 totalPower = calculateTotalPower();
        require(totalPower > 0, "No network power");

        (, , uint256 artistPower) = reputationContract.reputation(msg.sender);
        require(artistPower > 0, "No mining power");

        uint256 reward = (epochEmission * artistPower) / totalPower;

        lastClaim[msg.sender] = block.timestamp;
        token.mint(msg.sender, reward);

        emit RewardClaimed(msg.sender, reward);
    }
}