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
		const roundNumber = parseInt(e.target.dataset.round);
		this.props.history.push(`/league/${this.state.tournamentId}/round/${roundNumber}`);
	}
	
	render() {

		const roundElements = this.state.rounds.map(r => {
			const endDate = r.enddate;
			const now = new Date().toISOString();

			let button = null;
			if (endDate <= now) {
				button = <Button data-round={r.roundNo} onClick={this.navigateToRound.bind(this)} className="round-buttons" fluid color='red'>
						{r.name}
					</Button>	
				} else {
				button = <Button data-round={r.roundNo} onClick={this.navigateToRound.bind(this)} className="round-buttons" fluid color='blue'>
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