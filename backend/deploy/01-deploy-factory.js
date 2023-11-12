const { network } = require("hardhat");
const hre = require("hardhat");

const polygonscan = "https://api-testnet.polygonscan.com/";
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(deployer);
  // const chainId = network.config.chainId;

  log(
    "-----------------------------------------------------------------------------"
  );

  const tokenFactory = await deploy("TokenFactory", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(`Factory deployed at : ${tokenFactory?.address}`);

  log(
    "-----------------------------------------------------------------------------"
  );
};

module.exports.tags = ["all", "deploy-tokens"];
