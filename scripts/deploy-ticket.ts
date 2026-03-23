import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  const initialOwner = deployer.address;
  const verifierAddress = process.env.VERIFIER_ADDRESS || ethers.ZeroAddress;

  const Ticket = await ethers.getContractFactory("BansheeTicketMarketplace");
  const ticket = await Ticket.deploy(verifierAddress, initialOwner);
  await ticket.waitForDeployment();

  console.log("BansheeTicketMarketplace deployed:", await ticket.getAddress());
  console.log("Owner:", initialOwner);
  console.log("Verifier:", verifierAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});