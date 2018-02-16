import React, { Component } from 'react';
import Menu from '../Components/Menu';
import NextMatches from '../Components/NextMatches';
import axios from 'axios';

class RoundView extends Component {

	state = {
		leagueName: '',
		roundNumber: '',
		matches: []
	}

	componentDidMount() {
		this.setState({
			leagueName: this.props.leagueName,
			roundNumber: this.props.match.params.roundNumber
		})
		let { roundId} = this.props.match.params;
		roundId = parseInt(roundId, 10);
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
					<h1>{this.state.leagueName} - Runde {this.state.roundNumber}</h1>
					<NextMatches matches={this.state.matches} />
				</div>
			)
	}
}

export default RoundView;