import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

class ProductLink extends React.Component {
	render () {
		const path = `/product/${this.props.productId}`

		if (this.props.as) {
			return (
				<div>
					<Link to={path}>
						<this.props.as>
							Details
						</this.props.as>
					</Link>
				</div>
			)
		}

		return (
			<Link to={path}>
					<span>{this.props.productId}</span>
			</Link>
		)
	}
}

ProductLink.propTypes = {
	productId: PropTypes.string.isRequired,
	label: PropTypes.string
};

export default ProductLink;
