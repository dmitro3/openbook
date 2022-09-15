require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require("hardhat-interface-generator");
require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require('dotenv').config()
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

abiExporter: [
  {
    pretty: false,
    runOnCompile: true
  }
]

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API}`,
        accounts: [process.env.ETH_KEY]
      }
    },
    kovan: {
      url: `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMY_API}`,
      accounts: [process.env.ETH_KEY]
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21
  }
};
