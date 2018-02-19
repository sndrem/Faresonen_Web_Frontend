import React, { Component } from 'react';
import Menu from '../Components/Menu/Menu';
import Matches from '../Components/Matches/Matches';
import NextMatches from '../Components/NextMatches/NextMatches';
import FinishedMatches from '../Components/Matches/FinishedMatches';
import LeagueTable from '../Components/LeagueTable/LeagueTable';
import Topscorers from '../Components/Topscorers/Topscorers';
import axios from 'axios';

class RoundView extends Component {

	constructor(props) {
		super(props);
		this.state ={
			leagueName: '',
			roundNumber: props.match.params.roundNumber,
			tournamentId: props.match.params.leagueId,
			seasonId: '',
			matches: [],
			nextMatches: [],
			finishedMatches: [],
			table: null
		}
	}


	componentDidMount() {
		this.setState({
			leagueName: this.props.leagueName,
			roundNumber: this.props.match.params.roundNumber,
			tournamentId: this.props.match.params.leagueId,
			seasonId: this.props.seasonId,
			table: []
		})

		let { roundId, nextRoundId } = this.props.match.params;
		roundId = parseInt(roundId, 10);
		nextRoundId = parseInt(nextRoundId, 10);
		this.getRound(roundId, 'matches');
		this.getTable(this.props.match.params.leagueId, this.props.seasonId);
		if(nextRoundId > 0) {
			this.getRound(nextRoundId, 'nextMatches');	
		} 
	}

	componentWillReceiveUpdate(nextProps, nextState) {
		console.log(nextProps);
	}

	getTable(tournamentId, seasonId) {
		console.log(tournamentId, seasonId);
		axios.get(`/table/${tournamentId}/${seasonId}`)
			.then(data => {
				console.log(data);
				this.setState({ table: data.data.item });
			})
			.catch(err => console.error(err));
	}

	getRound(roundId, key) {
		axios.get(`/rounds/${roundId}`)
			.then((data) => {
				data.data.match = data.data.match.sort((a, b) => {
					return a.starttime >= b.starttime;
				});

				data.data.finishedMatches = this.filterFinishedMatches(data.data.match);
				this.setState({
					[key]: data.data.match,
					finishedMatches: data.data.finishedMatches
				});
			})
			.catch(err => console.error(err));
	}

	filterFinishedMatches(matches) {
		return matches.filter(m => !!m.confirmed === true).sort((a, b) => a.starttime >= b.starttime);
	}

	render() {

		let finishedMatches = null;
		if(this.state.finishedMatches.length > 0) {
			finishedMatches = <FinishedMatches matches={this.state.finishedMatches} roundNumber={this.state.roundNumber} />
		} 

		return (
				<div>
					<Menu switchLeagueName={this.props.switchLeagueName} />
					<h1>{this.state.leagueName} - {this.state.roundNumber}. Runde</h1>
					<Matches matches={this.state.matches} />
					{ finishedMatches }
					<LeagueTable table={this.state.table} />
					<NextMatches matches={this.state.nextMatches} nextRoundNumber={this.state.roundNumber} />
					<Topscorers tournamentId={this.props.tournamentId} />
				</div>
			)
	}
}

export default RoundView;