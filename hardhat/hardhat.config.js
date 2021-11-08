require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// environment variables for deploying and etherscan verfication
const { MNEMONIC, API_RINKEBY, API_MAINNET, API_ETHERSCAN } = process.env;

module.exports = {
  networks: {
    hardhat: {
      // set chain ID to 1337 to solve MetaMask issue
      chainId: 1337,
      forking: {
        url: API_MAINNET,
        blockNumber: 13397621,
      },
    },
    rinkeby: {
      url: API_RINKEBY,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: API_ETHERSCAN,
  },
};
