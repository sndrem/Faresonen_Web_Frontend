import React, { Component } from 'react';
import FinishedMatchElements from './FinishedMatchElements';

class FinishedMatches extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: this.props.matches
		}
	}

	componentDidMount() {
		
	}


	render() {
		const finishedMatchElements = this.state.matches.map((m) => {
			return (
				<FinishedMatchElements key={m.id} matchInfo={m} />
			)
		});
		
		return (
			<div>
				<h3>Ferdig spilt i runde {this.props.roundNumber}</h3>
				{ finishedMatchElements }
			</div>
		);
	}
}

export default FinishedMatches;