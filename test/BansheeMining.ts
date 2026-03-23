import { expect } from "chai";
import { network } from "hardhat";

describe("BansheeMining", function () {
  async function deployFixture() {
    const { ethers } = await network.connect();
    const [owner, oracle, artist1, artist2, fan, other] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("BansheeToken");
    const token = await Token.deploy(owner.address);
    await token.waitForDeployment();

    const Reputation = await ethers.getContractFactory("BansheeReputation");
    const reputation = await Reputation.deploy(oracle.address);
    await reputation.waitForDeployment();

    const Mining = await ethers.getContractFactory("BansheeMining");
    const mining = await Mining.deploy(
      await reputation.getAddress(),
      await token.getAddress(),
      owner.address
    );
    await mining.waitForDeployment();

    // VERY IMPORTANT: allow mining contract to mint tokens
    await token.transferOwnership(await mining.getAddress());

    return {
      ethers,
      owner,
      oracle,
      artist1,
      artist2,
      fan,
      other,
      token,
      reputation,
      mining,
    };
  }

  it("sets owner correctly", async function () {
    const { owner, mining } = await deployFixture();
    expect(await mining.owner()).to.equal(owner.address);
  });

  it("allows owner to register artists", async function () {
    const { owner, artist1, mining } = await deployFixture();

    await expect(mining.connect(owner).registerArtist(artist1.address))
      .to.emit(mining, "ArtistRegistered")
      .withArgs(artist1.address);

    expect(await mining.isArtist(artist1.address)).to.equal(true);
  });

  it("reverts if non-owner tries to register artist", async function () {
    const { artist1, other, mining } = await deployFixture();

    await expect(
      mining.connect(other).registerArtist(artist1.address)
    ).to.be.revertedWithCustomError(mining, "OwnableUnauthorizedAccount");
  });

  it("reverts on duplicate artist registration", async function () {
    const { owner, artist1, mining } = await deployFixture();

    await mining.connect(owner).registerArtist(artist1.address);

    await expect(
      mining.connect(owner).registerArtist(artist1.address)
    ).to.be.revertedWith("Already registered");
  });

  it("calculates total power from artist reputation", async function () {
    const { owner, oracle, artist1, artist2, fan, reputation, mining } =
      await deployFixture();

    await mining.connect(owner).registerArtist(artist1.address);
    await mining.connect(owner).registerArtist(artist2.address);

    // artist1 score = 50*2 + 10 = 110
    await reputation.connect(oracle).recordReceipt(artist1.address, fan.address, 50);

    // artist2 score = 100*2 + 10 = 210
    await reputation.connect(oracle).recordReceipt(artist2.address, fan.address, 100);

    expect(await mining.calculateTotalPower()).to.equal(320);
  });

  it("reverts claim if caller is not a registered artist", async function () {
    const { other, mining } = await deployFixture();

    await expect(mining.connect(other).claimRewards()).to.be.revertedWith(
      "Not artist"
    );
  });

  it("reverts claim if total network power is zero", async function () {
    const { owner, artist1, mining, ethers } = await deployFixture();

    await mining.connect(owner).registerArtist(artist1.address);

    await ethers.provider.send("evm_increaseTime", [24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine", []);

    await expect(mining.connect(artist1).claimRewards()).to.be.revertedWith(
      "No network power"
    );
  });

  it("reverts claim if artist has no mining power", async function () {
    const { owner, oracle, artist1, artist2, fan, reputation, mining, ethers } =
      await deployFixture();

    await mining.connect(owner).registerArtist(artist1.address);
    await mining.connect(owner).registerArtist(artist2.address);

    // Only artist2 has reputation
    await reputation.connect(oracle).recordReceipt(artist2.address, fan.address, 100);

    await ethers.provider.send("evm_increaseTime", [24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine", []);

    await expect(mining.connect(artist1).claimRewards()).to.be.revertedWith(
      "No mining power"
    );
  });

  it("mints rewards proportionally based on reputation", async function () {
    const { owner, oracle, artist1, artist2, fan, token, reputation, mining, ethers } =
      await deployFixture();

    await mining.connect(owner).registerArtist(artist1.address);
    await mining.connect(owner).registerArtist(artist2.address);

    // artist1 score = 110
    await reputation.connect(oracle).recordReceipt(artist1.address, fan.address, 50);

    // artist2 score = 210
    await reputation.connect(oracle).recordReceipt(artist2.address, fan.address, 100);

    const epochEmission = await mining.epochEmission();

    const expectedArtist1Reward = (epochEmission * 110n) / 320n;
    const expectedArtist2Reward = (epochEmission * 210n) / 320n;

    await ethers.provider.send("evm_increaseTime", [24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine", []);

    await expect(mining.connect(artist1).claimRewards())
      .to.emit(mining, "RewardClaimed")
      .withArgs(artist1.address, expectedArtist1Reward);

    expect(await token.balanceOf(artist1.address)).to.equal(expectedArtist1Reward);

    await expect(mining.connect(artist2).claimRewards())
      .to.emit(mining, "RewardClaimed")
      .withArgs(artist2.address, expectedArtist2Reward);

    expect(await token.balanceOf(artist2.address)).to.equal(expectedArtist2Reward);
  });

  // ✅ UPDATED TEST (Option 1 FIX)
  it("allows first claim immediately when artist has mining power", async function () {
    const { owner, oracle, artist1, fan, token, reputation, mining } =
      await deployFixture();

    await mining.connect(owner).registerArtist(artist1.address);

    // Give artist mining power
    await reputation.connect(oracle).recordReceipt(artist1.address, fan.address, 50);

    const expectedReward = await mining.epochEmission();

    await expect(mining.connect(artist1).claimRewards())
      .to.emit(mining, "RewardClaimed");

    expect(await token.balanceOf(artist1.address)).to.equal(expectedReward);
  });

  it("prevents immediate double claim in same epoch", async function () {
    const { owner, oracle, artist1, fan, reputation, mining, ethers } =
      await deployFixture();

    await mining.connect(owner).registerArtist(artist1.address);
    await reputation.connect(oracle).recordReceipt(artist1.address, fan.address, 50);

    await ethers.provider.send("evm_increaseTime", [24 * 60 * 60 + 1]);
    await ethers.provider.send("evm_mine", []);

    await mining.connect(artist1).claimRewards();

    await expect(mining.connect(artist1).claimRewards()).to.be.revertedWith(
      "Epoch not finished"
    );
  });
});