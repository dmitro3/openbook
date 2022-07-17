require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require("hardhat-interface-generator");
require("hardhat-gas-reporter");
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
        url: "https://eth-mainnet.alchemyapi.io/v2/zzdikT2BoUCO8gxk57lf8_NqFQ0MnUG7",
        accounts: [process.env.ETH_KEY]
      }
    },
    kovan: {
      url: "https://eth-kovan.alchemyapi.io/v2/HEbnEOx1ZKSDnssxjxDbsPS3LykdVbup",
      accounts: [process.env.ETH_KEY]
    },
    localhost: {
      // accounts: [process.env.ETH_KEY]
    }
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21
  }
};
