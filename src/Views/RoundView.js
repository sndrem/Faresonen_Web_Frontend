import React, { Component } from 'react';
import Menu from '../Components/Menu';
import NextMatches from '../Components/NextMatches';
import LeagueTable from '../Components/LeagueTable';
import axios from 'axios';

class RoundView extends Component {

	state = {
		leagueName: '',
		roundNumber: '',
		tournamentId: '',
		seasonId: '',
		matches: [],
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

		let { roundId } = this.props.match.params;
		const { tournamentId, seasonId } = this.props;
		roundId = parseInt(roundId, 10);
		this.getNextRound(roundId);
		this.getTable(tournamentId, seasonId);
	}

	getTable(tournamentId, seasonId) {
		console.log('Getting table for t-id: ', tournamentId);
		axios.get(`/table/${tournamentId}/${seasonId}`)
			.then(data => {
				this.setState({ table: data.data.item });
			})
			.catch(err => console.error(err));
	}

	getNextRound(roundId) {
		axios.get(`/rounds/${roundId}`)
			.then((data) => {
				this.setState({matches: data.data.match});
			})
			.catch(err => console.error(err));
	}

	render() {
		return (
				<div>
					<Menu switchLeagueName={this.props.switchLeagueName} />
					<h1>{this.state.leagueName} - {this.state.roundNumber}. Runde</h1>
					<NextMatches matches={this.state.matches} />
					<LeagueTable table={this.state.table} />
				</div>
			)
	}
}

export default RoundView;