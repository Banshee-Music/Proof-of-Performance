import { expect } from "chai";
import { network } from "hardhat";

describe("BansheeReputation", function () {
  async function deployFixture() {
    const { ethers } = await network.connect();
    const [oracle, artist, fan, other] = await ethers.getSigners();

    const Reputation = await ethers.getContractFactory("BansheeReputation");
    const reputation = await Reputation.deploy(oracle.address);
    await reputation.waitForDeployment();

    return { ethers, oracle, artist, fan, other, reputation };
  }

  it("sets tracker oracle at deployment", async function () {
    const { oracle, reputation } = await deployFixture();
    expect(await reputation.trackerOracle()).to.equal(oracle.address);
  });

  it("allows oracle to record a receipt", async function () {
    const { oracle, artist, fan, reputation } = await deployFixture();

    await expect(
      reputation.connect(oracle).recordReceipt(artist.address, fan.address, 50)
    )
      .to.emit(reputation, "ReceiptRecorded")
      .withArgs(artist.address, fan.address, 50);

    const rep = await reputation.reputation(artist.address);
    expect(rep.chunksServed).to.equal(50);
    expect(rep.uniqueFans).to.equal(1);
    expect(rep.reputationScore).to.equal(110);
  });

  it("accumulates receipts correctly", async function () {
    const { oracle, artist, fan, reputation } = await deployFixture();

    await reputation.connect(oracle).recordReceipt(artist.address, fan.address, 50);
    await reputation.connect(oracle).recordReceipt(artist.address, fan.address, 25);

    const rep = await reputation.reputation(artist.address);
    expect(rep.chunksServed).to.equal(75);
    expect(rep.uniqueFans).to.equal(2);
    expect(rep.reputationScore).to.equal(170);
  });

  it("reverts if non-oracle tries to record a receipt", async function () {
    const { artist, fan, other, reputation } = await deployFixture();

    await expect(
      reputation.connect(other).recordReceipt(artist.address, fan.address, 50)
    ).to.be.revertedWith("Not oracle");
  });
});