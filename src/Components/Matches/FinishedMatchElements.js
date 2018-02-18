import React, { Component } from 'react';
import { Item, Divider } from 'semantic-ui-react';
import axios from 'axios';

class FinishedMatchElements extends Component {
	constructor(props) {
		super(props);
		this.state = {
			goalScorersHomeTeam: [],
			goalScorersAwayTeam: []

		}
		// console.table(props.matchInfo);
	}

	componentDidMount() {
		this.getGoals(this.props.matchInfo.events['@uri']);
	}

	splitGameName(name) {
		return name.split('-');
	}

	getGoals(eventUri) {
		axios.get(eventUri).then(data => {
			const goalEvents = this.filterGoalEvents(data.data.event);
			
		}).catch(err => {
			console.error(err);
		})
	}

	filterGoalEvents(events) {
		return events.filter(e => e.eventtype['@uri'].includes('http://api.tv2.no/sport/resources/eventtypes/3/'));
	}

	render() {
		const teamNames = this.splitGameName(this.props.matchInfo.name);

		return (
			<div>
				<Item>
					<Item.Content>
						<Item.Header>{teamNames[0]} {this.props.matchInfo.goalsTeamAEndtime} - {this.props.matchInfo.goalsTeamBEndtime} {teamNames[1]}</Item.Header>
						<Item.Description>Målscorer A:</Item.Description>
						<Item.Description>Målscorer B:</Item.Description>
					</Item.Content>
				</Item>
				<Divider /> 
			</div>
		)
	}
}

export default FinishedMatchElements;