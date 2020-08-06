import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import App from './App';
import './index.css';
import LoadWeb3 from "./components/load/LoadWeb3";
// import * as serviceWorker from './serviceWorker';


function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

ReactDOM.render((
	<Web3ReactProvider getLibrary={getLibrary}>
		<LoadWeb3 component={App}>
		</LoadWeb3>
	</Web3ReactProvider>
), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
