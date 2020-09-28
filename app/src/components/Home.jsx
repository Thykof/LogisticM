import React from "react";

import OwnerPanel from './owner/OwnerPanel';
import SupplierPanel from './supplier/SupplierPanel';
import DeliveryManPanel from './delivery-man/DeliveryManPanel';
import CustomerPanel from './customer/CustomerPanel';
import Loading from './loading/Loading';
import { call, get } from '../strategies';

class Home extends React.Component {
	state = {
		owner: null,
		isSupplier: null,
		isDeliveryMan: null
	};

  async init() {
    const { drizzle, drizzleState } = this.props;

    console.log(drizzleState.offline.offline);

    this.setState({ owner: await call(drizzleState, drizzle, 'getOwner') });

    this.setState({
      isSupplier: await call(drizzleState, drizzle, 'isSupplier', [drizzleState.accounts[0]])
    });

    this.setState({
      isDeliveryMan: await call(drizzleState, drizzle, 'isDeliveryMan', [drizzleState.accounts[0]])
    });
  }

	async componentDidMount() {
		// this.props.drizzle.web3.eth.defaultAccount = this.props.drizzleState.accounts[0] //don't work
    await this.init()
	}

  async componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      console.log("init");
      await this.init()
    }
  }

  render () {
    const { drizzle, drizzleState } = this.props;
    console.log(drizzleState.offline.offline);

    const owner = get(drizzleState, 'getOwner', this.state.owner) || this.state.owner;
    const isSupplier = get(drizzleState, 'isSupplier', this.state.isSupplier) || this.state.isSupplier;
    const isDeliveryMan = get(drizzleState, 'isDeliveryMan', this.state.isDeliveryMan) || this.state.isDeliveryMan;

    console.log(owner);
    console.log(isSupplier);
    console.log(isDeliveryMan);
    console.log(this.state);
    //
    // if (!owner || !isSupplier || !isDeliveryMan) {
    //   return <Loading/>
    // }

    if (owner === drizzleState.accounts[0]) {
      return (
        <OwnerPanel
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
      )
    }

    if (isSupplier) {
      return (
        <SupplierPanel
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
      )
    }

    if (isDeliveryMan) {
      return (
        <DeliveryManPanel
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
      )
    }

    return (
      <CustomerPanel
        drizzle={drizzle}
        drizzleState={drizzleState}
      />
    )
  }
}

export default Home;
