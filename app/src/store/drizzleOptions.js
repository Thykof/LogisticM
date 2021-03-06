// let drizzle know what contracts we want and how to access our test blockchain

import OwnedRegistry from "../contracts/OwnedRegistry.json";

export default function getDrizzleOptions(web3) {
  return {
    contracts: [
        {
            contractName: 'OwnedRegistry',
            web3Contract: new web3.eth.Contract(OwnedRegistry.abi, '0x8328a01304Cd7EC9A124E60609E8d032A1bD40A1')
        }
    ],
    events: {
      LogisticM: ["ProxyCreated"]
    },
    // web3: {
    //   fallback: {
    //     type: "ws",
    //     url: "ws://127.0.0.1:8545",
    //   },
    // },
    web3: {
      block: false,
      customProvider: web3,
    },
    // web3: {
    //   block: false,
    //   customProvider: new Web3(Web3.givenProvider || "ws://localhost:8545"),
    //   // customProvider: new Web3("wss://kovan.infura.io/ws/v3/5b2a79e624554c8ab922b9a84b076645"),
    // },
  }
};
