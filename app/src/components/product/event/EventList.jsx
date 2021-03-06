import React from 'react'
import PropTypes from 'prop-types'
import { Accordion } from 'react-bootstrap';

import EventItem from './EventItem'
import { getPastEvents } from '../../../store/events-helpers'
import { getEventsAboutUser } from "../../../store/selectors"
import { EVENT_NAMES } from '../../../store/constants'

class EventList extends React.Component {
	componentDidMount () {
		getPastEvents(
			this.props.drizzle,
			this.props.eventNames,
			this.props.filters
		)
	}

	render () {
		let events = this.props.drizzleState.events.events
		if (!events) return null

		events = events.filter(event => {
			let keepThis = true
			for (var key in this.props.filter) {
				if (this.props.filter.hasOwnProperty(key)) {
					if (event.returnValues[key] !== this.props.filter[key]) {
						keepThis = false
					}
				}
			}
			return keepThis && this.props.eventNames.includes(event.event)
		})

		if (!this.props.showAll) {
			events = getEventsAboutUser(
				events,
				this.props.drizzleState.accounts[0]
			)
		}

		return (
			<Accordion defaultActiveKey={1}>
				{ events.map((event, idx) => {
					return (
						<EventItem
							key={idx}
							drizzle={this.props.drizzle}
							drizzleState={this.props.drizzleState}
							event={event}
							idx={idx}
						/>
					)
				})}
			</Accordion>
		)
	}
}

EventList.defaultProps = {
	eventNames: EVENT_NAMES,
	filters: {}, // passed to the web3 methods
	filter: {}, // used to filter on rendering
	showAll: false
}

EventList.propTypes = {
	eventNames: PropTypes.array.isRequired,
	filters: PropTypes.object,
	showAll: PropTypes.bool
};

export default EventList
