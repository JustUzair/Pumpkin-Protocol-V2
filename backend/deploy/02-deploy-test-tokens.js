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
  const utilityTokens = ["USDC", "WBTC", "WETH", "MATIC", "AAVE"];
  for (let i = 0; i < 5; i++) {
    const utlity = await deploy("Token", {
      from: deployer,
      args: [utilityTokens[i], utilityTokens[i]],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
    });

    log(`Utiltiy ${utilityTokens[i]} deployed at : ${utlity?.address}`);
  }

  log(
    "-----------------------------------------------------------------------------"
  );
};

module.exports.tags = ["all", "deploy-utility"];
