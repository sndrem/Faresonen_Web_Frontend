import React, { Component } from 'react';
import Menu from '../Components/Menu';
import Matches from '../Components/Matches';
import NextMatches from '../Components/NextMatches';
import LeagueTable from '../Components/LeagueTable';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';

class RoundView extends Component {

	state = {
		leagueName: '',
		roundNumber: '',
		tournamentId: '',
		seasonId: '',
		matches: [],
		nextMatches: [],
		table: null
	}

	componentDidMount() {
		this.setState({
			leagueName: this.props.leagueName,
			roundNumber: this.props.match.params.roundNumber,
			tournamentId: this.props.tournamentId,
			seasonId: this.props.seasonId,
			table: []
		})

		let { roundId, nextRoundId } = this.props.match.params;
		const { tournamentId, seasonId } = this.props;
		roundId = parseInt(roundId, 10);
		nextRoundId = parseInt(nextRoundId, 10);
		this.getRound(roundId, 'matches');
		this.getTable(tournamentId, seasonId);
		if(nextRoundId > 0) {
			this.getRound(nextRoundId, 'nextMatches');	
		} 
		
	}

	getTable(tournamentId, seasonId) {
		console.log('Getting table for t-id: ', tournamentId);
		axios.get(`/table/${tournamentId}/${seasonId}`)
			.then(data => {
				this.setState({ table: data.data.item });
			})
			.catch(err => console.error(err));
	}

	getRound(roundId, key) {
		axios.get(`/rounds/${roundId}`)
			.then((data) => {
				this.setState({[key]: data.data.match});
			})
			.catch(err => console.error(err));
	}

	render() {
		return (
				<div>
					<Menu switchLeagueName={this.props.switchLeagueName} />
					<h1>{this.state.leagueName} - {this.state.roundNumber}. Runde</h1>
					<Matches matches={this.state.matches} />
					<LeagueTable table={this.state.table} />
					<NextMatches matches={this.state.nextMatches} />
				</div>
			)
	}
}

export default RoundView;