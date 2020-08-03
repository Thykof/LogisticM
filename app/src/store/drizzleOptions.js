// let drizzle know what contracts we want and how to access our test blockchain

import Logistic from "../contracts/Logistic.json";
import { EVENT_NAMES } from "./constants";

// import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
// import { InjectedConnector } from '@web3-react/injected-connector'

// import Web3 from "web3";
// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const mnemonic = "finger retreat rude front release kid equal swear sibling habit beyond dwarf"
// const host = "http://13762fdc2f1f.ngrok.io"
// const http = "http://localhost:8545"
// const ws = "ws://localhost:8545"


const options = {
  contracts: [Logistic],
  events: {
    Logistic: EVENT_NAMES
  },
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  // web3: {
  //   block: false,
  //   // customProvider: new Web3(ws),
  //   // customProvider: new Web3(host),
  //   // customProvider: new Web3(new HDWalletProvider(mnemonic, host)),
  //   // customProvider: new Web3.providers.HttpProvider(host),
  // },
};

export default options;
