const { network } = require("hardhat");
const hre = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(deployer);
  // const chainId = network.config.chainId;

  log(
    "-----------------------------------------------------------------------------"
  );

  const mintTest = await deploy("mintAllTestTokens", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(`Factory deployed at : ${mintTest?.address}`);

  log(
    "-----------------------------------------------------------------------------"
  );
};

module.exports.tags = ["all", "mint-utility"];
