import React from 'react'
import { Alert, Card } from 'react-bootstrap';

import GrantAccess from './GrantAccess'
import RevokeRole from './RevokeRole'
import TransferOwnership from './TransferOwnership'
import ProductList from '../product/product-list/ProductList'
import EventList from '../product/event/EventList';

class OwnerPanel extends React.Component {
	state = { dataKey: null };

	componentDidMount() {
		const { drizzle } = this.props;

		const contract = drizzle.contracts.LogisticM;

		// let drizzle know we want to watch the `myString` method
		const dataKey = contract.methods.totalSupply.cacheCall();

		// save the `dataKey` to local component state for later reference
		this.setState({ dataKey });
	}

	render () {
		const { drizzle, drizzleState } = this.props;

		let totalSupply = drizzleState.contracts.LogisticM.totalSupply[
			this.state.dataKey
		]
		if (!totalSupply) return null
		totalSupply = Number(totalSupply.value)

		return (
			<div>
				<div className="section">
					<h2>SuperUser Panel</h2>

					<Card className="m-2 p-2">
						<p>Total product(s): {totalSupply}</p>
						<ProductList
							drizzle={drizzle}
							drizzleState={drizzleState}
							totalSupply={totalSupply}
						/>
					</Card>

					<Card className="m-2 p-2">
						<strong>Events:</strong>
						<EventList
							drizzle={drizzle}
							drizzleState={drizzleState}
							showAll={true}
						/>
					</Card>

					<div className="section">
						<div>
							<h3>Administrative tasks</h3>
							<Card className="m-2 p-2">
								<em>Add a supplier</em>
								<GrantAccess
									drizzle={drizzle}
									drizzleState={drizzleState}
									grandAccessMethod="addSupplierWithName"
								/>
								<br/>
								<em>Remove a supplier</em>
								<RevokeRole
									drizzle={drizzle}
									drizzleState={drizzleState}
									methodName="removeSupplier"
								/>
							</Card>
							<Card className="m-2 p-2">
								<em>Add a delivery man</em>
								<GrantAccess
									drizzle={drizzle}
									drizzleState={drizzleState}
									grandAccessMethod="addDeliveryManWithName"
								/>
								<br/>
								<em>Remove a delivery man</em>
								<RevokeRole
									drizzle={drizzle}
									drizzleState={drizzleState}
									methodName="removeDeliveryMan"
								/>
							</Card>
						</div>
						<Alert variant="danger" className="m-2">
							<h3>Danger zone</h3>

							<em>Transfer ownership</em>
							<TransferOwnership
								drizzle={drizzle}
								drizzleState={drizzleState}
							/>
						</Alert>
					</div>
				</div>
			</div>
		)
	}
}

export default OwnerPanel;
