import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  const initialOwner = deployer.address;

  const Token = await ethers.getContractFactory("BansheeToken");
  const token = await Token.deploy(initialOwner);
  await token.waitForDeployment();

  console.log("BansheeToken deployed:", await token.getAddress());
  console.log("Owner:", initialOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});