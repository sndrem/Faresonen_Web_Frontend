import React, { Component } from "react";
import Menu from "../Components/Menu/Menu";
import LeagueProgress from "../Components/LeagueProgress/LeagueProgress";
import Matches from "../Components/Matches/Matches";
import NextMatches from "../Components/NextMatches/NextMatches";
import FinishedMatches from "../Components/Matches/FinishedMatches";
import LeagueTable from "../Components/LeagueTable/LeagueTable";
import Topscorers from "../Components/Topscorers/Topscorers";
import RoundSteps from "../Components/ProcedureSteps/RoundSteps";
import Dangerzone from "../Components/Dangerzone/Dangerzone";
import { Message } from "semantic-ui-react";
import axios from "axios";
import "../print.css";

class RoundView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leagueName: props.match.params.leagueName,
			roundNumber: props.match.params.roundNumber,
			tournamentId: props.match.params.tournamentId,
			seasonId: props.match.params.seasonId,
			matches: [],
			nextMatches: [],
			finishedMatches: [],
			table: [],
			loading: true
		};
	}

	componentDidMount() {
		let { roundId, nextRoundId } = this.props.match.params;
		roundId = parseInt(roundId, 10);
		nextRoundId = parseInt(nextRoundId, 10);
		this.getRound(roundId, "matches");
		this.getTable(
			this.props.match.params.tournamentId,
			this.props.match.params.seasonId
		);
		if (nextRoundId > 0) {
			this.getRound(nextRoundId, "nextMatches");
		}
	}

	getTable(tournamentId, seasonId) {
		axios
			.get(`/table/${tournamentId}/${seasonId}`)
			.then(data => {
				this.setState({ table: data.data.item });
			})
			.catch(err => console.error(err));
	}

	getRound(roundId, key) {
		axios
			.get(`/rounds/${roundId}`)
			.then(data => {
				data.data.match = data.data.match.sort((a, b) => {
					return a.starttime >= b.starttime;
				});

				data.data.finishedMatches = this.filterFinishedMatches(
					data.data.match
				);
				this.setState({
					[key]: data.data.match,
					finishedMatches: data.data.finishedMatches,
					loading: false
				});
			})
			.catch(err => console.error(err));
	}

	filterFinishedMatches(matches) {
		return matches
			.filter(m => !!m.confirmed === true)
			.sort((a, b) => a.starttime >= b.starttime);
	}

	render() {
		let finishedMatches = null;
		if (this.state.finishedMatches.length > 0 && !this.state.loading) {
			finishedMatches = (
				<FinishedMatches
					className="print"
					matches={this.state.finishedMatches}
					roundNumber={this.state.roundNumber}
				/>
			);
		} else {
			finishedMatches = (
				<Message className="no-print" info>
					<Message.Header>Ferdig spilte kamper</Message.Header>
					Det er ikke spilt noen kamper denne runden
				</Message>
			);
		}

		return (
			<div>
				<Menu switchLeagueName={this.props.switchLeagueName} />
				<RoundSteps
					className="no-print"
					round={this.state.roundNumber}
					league={this.state.leagueName}
				/>
				<LeagueProgress
					leagueName={this.state.leagueName}
					tournamentId={this.state.tournamentId}
					seasonId={this.state.seasonId}
				/>
				<Matches
					className="print"
					leagueName={this.state.leagueName}
					roundNumber={this.state.roundNumber}
					matches={this.state.matches}
				/>
				{finishedMatches}
				<LeagueTable
					className="print"
					leagueName={this.state.leagueName}
					table={this.state.table}
				/>
				<NextMatches
					className="print"
					matches={this.state.nextMatches}
					nextRoundNumber={this.state.roundNumber}
				/>
				<Topscorers
					className="print"
					tournamentId={this.state.tournamentId}
				/>
				<Dangerzone
					className="print"
					leagueName={this.state.leagueName}
					tournamentId={this.state.tournamentId}
				/>
			</div>
		);
	}
}

export default RoundView;
