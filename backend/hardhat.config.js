require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("dotenv").config();
const private_key = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    polygonzk_testnet: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [private_key],
      chainId: 1442,
    },
  },
};
