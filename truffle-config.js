const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const developmentMnemonic =
  "finger retreat rude front release kid equal swear sibling habit beyond dwarf";
const INFURA_API_KEY = "72e095878aea473da1f797032f5c3e4f";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    kovan: {
      provider: () => new HDWalletProvider(developmentMnemonic, "https://kovan.infura.io/v3/" + INFURA_API_KEY),
      network_id: 42,
      gas: 6000000,
      gasPrice: 10000000000
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.5",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  plugins: ["solidity-coverage"]
};
