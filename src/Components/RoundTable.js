import React, { Component } from 'react';
import axios from 'axios';
import { List, Button } from 'semantic-ui-react';
import './RoundTable.css';

class RoundTable extends Component {

	state = {
		tournamentId: this.props.tournamentId,
		seasonId: this.props.seasonId,
		rounds: []
	};

	componentDidMount() {
		const { tournamentId, seasonId } = this.state;
		this.getRounds(tournamentId, seasonId);
	}

	getRounds = (tournamentId, seasonId) => {

		axios.get(`/rounds/${tournamentId}/${seasonId}`)
			.then((data) => {
				this.setState({rounds: data.data.round});
			}).catch(err => console.error(err));
	}

	componentWillReceiveProps(nextProps) {
		const { tournamentId, seasonId } = nextProps;
		this.getRounds(tournamentId, seasonId);
	}

	navigateToRound = (e) => {
		const roundNumber = parseInt(e.target.dataset.round, 10);
		const roundId = parseInt(e.target.dataset.roundid, 10);
		const nextRoundId = parseInt(e.target.dataset.nextroundid, 10);
		this.props.history.push(`/league/${this.state.tournamentId}/round/${roundNumber}/roundId/${roundId}/nextRound/${nextRoundId}`);
	}
	
	render() {

		const roundElements = this.state.rounds.map((r, index, array) => {
			const endDate = r.enddate;
			const now = new Date().toISOString();
			let button = null;
			const nextRoundId = array[index + 1] ? array[index + 1].id : -1;
			if (endDate <= now) {
				button = <Button data-round={r.roundNo} data-roundid={r.id} data-nextroundid={nextRoundId} onClick={this.navigateToRound.bind(this)} className="round-buttons" fluid color='red'>
						{r.name}
					</Button>	
				} else {
				button = <Button data-round={r.roundNo} data-roundid={r.id} data-nextroundid={nextRoundId} onClick={this.navigateToRound.bind(this)} className="round-buttons" fluid color='blue'>
						{r.name}
					</Button>
				}

			return 	<List.Item key={r['@uri']} >
							{ button }
					</List.Item>
		});
		return (
				<List>
					{ roundElements }
				</List>
			)
	}
}

export default RoundTable;