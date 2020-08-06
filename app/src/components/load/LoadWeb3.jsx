import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function LoadWeb3({ Component }) {
  const POLLING_INTERVAL = 12000;

	const context = useWeb3React();
	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error
	} = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    console.log('running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

	 // Create WalletConnect Provider
	// const provider = new WalletConnectProvider({
	//   infuraId: "72e095878aea473da1f797032f5c3e4f"
	// });
	// await provider.enable()


	const walletconnect = new WalletConnectConnector({
	  rpc: { 42: "https://kovan.infura.io/v3/72e095878aea473da1f797032f5c3e4f" },
	  bridge: "https://bridge.walletconnect.org",
	  qrcode: true,
	  pollingInterval: POLLING_INTERVAL
	});
  // setActivatingConnector(walletconnect);
	activate(walletconnect);

	if (active) {
		return <Component library={library}></Component>
	}
	else {
		return "Loading...";
	}
}
