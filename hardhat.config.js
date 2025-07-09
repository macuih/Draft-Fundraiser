require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "./src/contracts", // This puts compiled JSON files where your React app can find them
  },
  networks: {
    hardhat: {},
    // You can add custom networks here if needed
    // Example:
    // localhost: {
    //   url: "http://127.0.0.1:8545"
    // }
  },
};
