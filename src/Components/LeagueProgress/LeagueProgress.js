import React, { Component } from "react";
import { Progress } from "semantic-ui-react";
import axios from "axios";

class LeagueProgess extends Component {
	constructor(props) {
		super(props);
		this.state = {
			finished: 0,
			left: 0,
			total: 0,
			loading: true
		};
	}

	componentDidMount() {
		const { tournamentId, seasonId } = this.props;
		this.getRounds(tournamentId, seasonId);
	}

	getRounds(tournamentId, seasonId) {
		axios
			.get(`/rounds/${tournamentId}/${seasonId}`)
			.then(data => {
				const calculatedRounds = LeagueProgess.calculateRounds(data.data.round);
				this.setState({
					finished: calculatedRounds.finished,
					left: calculatedRounds.left,
					total: calculatedRounds.finished + calculatedRounds.left,
					loading: false
				});
			})
			.catch(err => console.error(err));
	}

	static calculateRounds(rounds) {
		if(!rounds) throw new Error('Rounds cannot be undefined');
		return rounds.reduce(
			(obj, round) => {
				const enddate = new Date(round.enddate);
				const now = new Date();

				if (now > enddate) {
					obj.finished = obj.finished + 1;
				} else {
					obj.left = obj.left + 1;
				}

				return obj;
			},
			{ finished: 0, left: 0 }
		);
	}

	render() {
		return (
			<Progress
				className="no-print"
				color="green"
				progress="ratio"
				total={this.state.total}
				value={this.state.finished}
			>
				Progresjon for {this.props.leagueName}
			</Progress>
		);
	}
}

export default LeagueProgess;
