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
				console.log(data.data);
				this.setState({rounds: data.data.round});
			});
	}

	componentWillReceiveProps(nextProps) {
		const { tournamentId, seasonId } = nextProps;
		this.getRounds(tournamentId, seasonId);
	}
	
	render() {

		const roundElements = this.state.rounds.map(r => {
			const endDate = r.enddate;
			const now = new Date().toISOString();

			let button = null;
			if (endDate <= now) {
				button =	<Button className="round-buttons" fluid color='red'>
						{r.name}
					</Button>	
				} else {
				button = <Button className="round-buttons" fluid color='blue'>
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