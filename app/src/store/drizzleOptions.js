// let drizzle know what contracts we want and how to access our test blockchain
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Logistic from "../contracts/Logistic.json";
import { EVENT_NAMES } from "./constants";

const INFURA_API_KEY = "72e095878aea473da1f797032f5c3e4f";

export default function getOptions(library) {
  return {
    contracts: [Logistic],
    events: {
      Logistic: EVENT_NAMES
    },
    // web3: {
    //   fallback: {
    //     type: "ws",
    //     url: "ws://5ad049057afe.ngrok.io",
    //   },
    // },
    // web3: {
    //   block: false,
    //   customProvider: new Web3.providers.HttpProvider("http://5ad049057afe.ngrok.io"),
    // },
    web3: {
      customProvider: library.currentProvider
    }
  }
}
