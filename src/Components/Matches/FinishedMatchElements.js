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
	}

	componentDidMount() {
		this.getGoals(this.props.matchInfo.events['@uri']);
	}

	splitGameName(name) {
		return name.split('-');
	}

	getGoals(eventUri) {
		axios.get(eventUri).then(data => {
			const goalEvents = this.filterGoalEvents(data.data.event)
			const calculatedEvents = this.calculateHomeAndAwayEvents(goalEvents);
			this.extractPersonNames(calculatedEvents.home)
				.then(data => {
					this.setState({
						goalScorersHomeTeam: data
					})
				});
			this.extractPersonNames(calculatedEvents.away)
				.then(data => {
					this.setState({
						goalScorersAwayTeam: data
					})
				});
			
		}).catch(err => {
			console.error(err);
		})
	}

	extractPersonNames(events) {
		return new Promise((resolve, reject) => {
			const promises = [];
			events.forEach(e => {
				promises.push(this.getNameOfPerson(e.person1['@uri']));
			})

			axios.all(promises).then(data => {
				events.forEach((e, index, list) => {
					e.person1 = data[index].data;
				});
				resolve(events);
			});	
		});
	}



	calculateHomeAndAwayEvents(events) {
		return events.reduce((obj, e, index, list) => {
			const prevElementA = list[index - 1] === undefined ? null : list[index - 1].goalsTeamA;
			const prevElementB = list[index - 1] === undefined ? null : list[index - 1].goalsTeamB;
			
			const previousHomeScore = prevElementA === null ? 0 : parseInt(prevElementA, 10);
			const previousAwayScore = prevElementB === null ? 0 : parseInt(prevElementB, 10);

			const homeScore = parseInt(e.goalsTeamA, 10);
			const awayScore = parseInt(e.goalsTeamB, 10);

			if(homeScore > previousHomeScore) {
				obj.home.push(e);
			}

			if(awayScore > previousAwayScore) {
				obj.away.push(e);
			}
			

			return obj;
		}, { home: [], away: []});
	}

	filterGoalEvents(events) {
		return events.filter(e => {
			// http://api.tv2.no/sport/resources/eventtypes/3/ = mål
			// http://api.tv2.no/sport/resources/extendedeventtypes/304/ = straffer
			const eventType = e.eventtype['@uri'];
			const extendedEventType = e.extendedeventtype['@uri'];
			return eventType.includes('http://api.tv2.no/sport/resources/eventtypes/3/') || extendedEventType.includes('http://api.tv2.no/sport/resources/extendedeventtypes/304/');
		});
	}

	getNameOfPerson(uri) {
		return axios.get(uri);
	}

	formatGoalScoreText(scorers) {
		return scorers.map((scorer) => {
			if(scorer.extendedeventtype['@uri'].includes('http://api.tv2.no/sport/resources/extendedeventtypes/304/')) {
				return `${scorer.person1.lastname} (str. ${scorer.eventtime})`;
			} else {
				return `${scorer.person1.lastname} (${scorer.eventtime})`; 
			}
		}).join(', ');
	}

	render() {
		const [home, away] = this.splitGameName(this.props.matchInfo.name);
		const homeScorers = this.formatGoalScoreText(this.state.goalScorersHomeTeam);
		const awayScorers = this.formatGoalScoreText(this.state.goalScorersAwayTeam);

		return (
			<div>
				<Item>
					<Item.Content>
						<Item.Header>{ home } { this.props.matchInfo.goalsTeamAEndtime } - { this.props.matchInfo.goalsTeamBEndtime } { away }</Item.Header>
						{ this.props.matchInfo.goalsTeamAEndtime > 0 ? <Item.Description><b>{ home  }:</b> {homeScorers }</Item.Description> : '' }
						{ this.props.matchInfo.goalsTeamBEndtime > 0 ? <Item.Description><b>{ away }</b>: { awayScorers }</Item.Description> : '' }
					</Item.Content>
				</Item>
				<Divider /> 
			</div>
		)
	}
}

export default FinishedMatchElements;