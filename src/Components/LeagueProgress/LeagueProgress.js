import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';
import axios from 'axios';
import tools from '../../Tools/tools';

class LeagueProgess extends Component {
	constructor(props){
		super(props);
		const { tournamentId, seasonId } = props;
		this.getRounds(tournamentId, seasonId);

		this.state = {
			finished: 0,
			left: 0,
			total: 0,
			loading: true
		}
	}

	getRounds(tournamentId, seasonId) {
		axios.get(`/rounds/${tournamentId}/${seasonId}`)
			.then((data) => {
				const calculatedRounds = this.calculateRounds(data.data.round);
				this.setState({
					finished: calculatedRounds.finished,
					left: calculatedRounds.left,
					total: calculatedRounds.finished + calculatedRounds.left,
					loading: false
				});
			}).catch(err => console.error(err));
	}

	calculateRounds(rounds) {
		return rounds.reduce((obj, round) => {
			const enddate = new Date(round.enddate);
			const now = new Date();

			if(now > enddate) {
				obj.finished++;
			} else {
				obj.left++;
			}
			
			return obj;
		}, {finished: 0, left: 0});
	}

	render() {
		return (<Progress className='no-print' color='green' progress='ratio' total={this.state.total} value={this.state.finished}>Progresjon for {this.props.leagueName}</Progress>)
	}
}

export default LeagueProgess;