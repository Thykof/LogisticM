import React from 'react'

import Loading from './Loading';
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function({ initialized, drizzleState, children }) {
	//  Enable session (triggers QR Code modal)
	// provider.enable().then( () => {
	// 	//  Create Web3
	// 	const web3 = new Web3(provider);
	// });

	if (initialized &&
		drizzleState &&
		drizzleState.web3.status === "initialized" &&
		drizzleState.drizzleStatus.initialized) {
    return React.Children.only(children);
  }

	return <Loading/>
}
