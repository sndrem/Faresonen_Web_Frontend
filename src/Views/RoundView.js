import React, { Component } from 'react';
import Menu from '../Components/Menu';
import axios from 'axios';

class RoundView extends Component {

	state = {
		leagueName: ''
	}

	componentDidMount() {
		this.setState({leagueName: this.props.leagueName})
		let { leagueId, roundNumber, roundId} = this.props.match.params;
		leagueId = parseInt(leagueId);
		roundId = parseInt(roundId);
		roundNumber = parseInt(roundNumber);
		axios.get(`/rounds/${roundId}`).then(data => console.log(data.data));
	}

	render() {
		return (
				<div>
					<Menu switchLeagueName={this.props.switchLeagueName} />
					<h1>{this.state.leagueName}</h1>
				</div>
			)
	}
}

export default RoundView;