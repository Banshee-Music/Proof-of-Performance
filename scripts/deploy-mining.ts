import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  const reputationAddress = process.env.REPUTATION_ADDRESS;
  const tokenAddress = process.env.TOKEN_ADDRESS;

  if (!reputationAddress || !tokenAddress) {
    throw new Error("Missing REPUTATION_ADDRESS or TOKEN_ADDRESS in environment");
  }

  const initialOwner = deployer.address;

  const Mining = await ethers.getContractFactory("BansheeMining");
  const mining = await Mining.deploy(
    reputationAddress,
    tokenAddress,
    initialOwner
  );
  await mining.waitForDeployment();

  console.log("BansheeMining deployed:", await mining.getAddress());
  console.log("Owner:", initialOwner);
  console.log("Reputation:", reputationAddress);
  console.log("Token:", tokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});