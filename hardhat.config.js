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
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/zzdikT2BoUCO8gxk57lf8_NqFQ0MnUG7"
      }
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
      details: {
        yul: false
      }
    }
  },
  mocha: {
    timeout: 200000
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21
  }
};
