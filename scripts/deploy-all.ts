import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const initialOwner = deployer.address;
  const oracleAddress = deployer.address;

  // Use ZeroAddress for now if no verifier is deployed yet
  const verifierAddress = ethers.ZeroAddress;

  const Token = await ethers.getContractFactory("BansheeToken");
  const token = await Token.deploy(initialOwner);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("BansheeToken deployed:", tokenAddress);

  const Reputation = await ethers.getContractFactory("BansheeReputation");
  const reputation = await Reputation.deploy(oracleAddress);
  await reputation.waitForDeployment();
  const reputationAddress = await reputation.getAddress();
  console.log("BansheeReputation deployed:", reputationAddress);

  const Mining = await ethers.getContractFactory("BansheeMining");
  const mining = await Mining.deploy(
    reputationAddress,
    tokenAddress,
    initialOwner
  );
  await mining.waitForDeployment();
  const miningAddress = await mining.getAddress();
  console.log("BansheeMining deployed:", miningAddress);

  const Ticket = await ethers.getContractFactory("BansheeTicketMarketplace");
  const ticket = await Ticket.deploy(verifierAddress, initialOwner);
  await ticket.waitForDeployment();
  const ticketAddress = await ticket.getAddress();
  console.log("BansheeTicketMarketplace deployed:", ticketAddress);

  // Transfer token ownership to mining contract so mining can mint rewards
  const transferTx = await token.transferOwnership(miningAddress);
  await transferTx.wait();
  console.log("BansheeToken ownership transferred to mining:", miningAddress);

  console.log("\nDeployment complete:");
  console.log({
    token: tokenAddress,
    reputation: reputationAddress,
    mining: miningAddress,
    ticketMarketplace: ticketAddress,
    verifier: verifierAddress,
    oracle: oracleAddress,
    owner: initialOwner,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});