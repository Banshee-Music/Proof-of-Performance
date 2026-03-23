import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  const oracleAddress = deployer.address;

  const Reputation = await ethers.getContractFactory("BansheeReputation");
  const reputation = await Reputation.deploy(oracleAddress);
  await reputation.waitForDeployment();

  console.log("BansheeReputation deployed:", await reputation.getAddress());
  console.log("Tracker oracle:", oracleAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});