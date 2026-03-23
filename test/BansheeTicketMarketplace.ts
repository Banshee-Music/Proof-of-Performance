import { expect } from "chai";
import { network } from "hardhat";

describe("BansheeTicketMarketplace", function () {
  async function deployFixture() {
    const { ethers } = await network.connect();
    const [owner, buyer, artist, other] = await ethers.getSigners();

    const MockVerifier = await ethers.getContractFactory("MockIdentityVerifier");
    const verifier = await MockVerifier.deploy();
    await verifier.waitForDeployment();

    const Ticket = await ethers.getContractFactory("BansheeTicketMarketplace");
    const ticket = await Ticket.deploy(
      await verifier.getAddress(),
      owner.address
    );
    await ticket.waitForDeployment();

    return { ethers, owner, buyer, artist, other, verifier, ticket };
  }

  it("sets the correct owner", async function () {
    const { owner, ticket } = await deployFixture();
    expect(await ticket.owner()).to.equal(owner.address);
  });

  it("mints a ticket when verifier returns true", async function () {
    const { ethers, buyer, artist, ticket } = await deployFixture();

    const zkProof = "0x1234";
    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("fan-1"));
    const cid = "ipfs://album-track-1";

    await expect(
      ticket.connect(buyer).mintTicket(zkProof, identityHash, artist.address, cid)
    )
      .to.emit(ticket, "TicketMinted")
      .withArgs(1, buyer.address, artist.address, identityHash);

    expect(await ticket.ownerOf(1)).to.equal(buyer.address);

    const stored = await ticket.tickets(1);
    expect(stored.artist).to.equal(artist.address);
    expect(stored.identityHash).to.equal(identityHash);
    expect(stored.contentCID).to.equal(cid);
    expect(stored.mintedAt).to.be.gt(0);
  });

  it("reverts minting when verifier returns false", async function () {
    const { ethers, buyer, artist, verifier, ticket } = await deployFixture();

    await verifier.setShouldVerify(false);

    const zkProof = "0x1234";
    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("fan-2"));
    const cid = "ipfs://album-track-2";

    await expect(
      ticket.connect(buyer).mintTicket(zkProof, identityHash, artist.address, cid)
    ).to.be.revertedWith("Invalid identity proof");
  });

  it("allows owner of a ticket to unlock content", async function () {
    const { ethers, buyer, artist, ticket } = await deployFixture();

    const zkProof = "0x1234";
    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("fan-3"));
    const cid = "ipfs://track-3";

    await ticket.connect(buyer).mintTicket(zkProof, identityHash, artist.address, cid);

    await expect(ticket.connect(buyer).unlockContent(1))
      .to.emit(ticket, "ContentUnlocked")
      .withArgs(1, buyer.address);
  });

  it("reverts unlock if caller is not the ticket owner", async function () {
    const { ethers, buyer, artist, other, ticket } = await deployFixture();

    const zkProof = "0x1234";
    const identityHash = ethers.keccak256(ethers.toUtf8Bytes("fan-4"));
    const cid = "ipfs://track-4";

    await ticket.connect(buyer).mintTicket(zkProof, identityHash, artist.address, cid);

    await expect(ticket.connect(other).unlockContent(1)).to.be.revertedWith(
      "Not owner"
    );
  });
});