import React, { Component } from 'react';
import FinishedMatchElements from './FinishedMatchElements';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

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
			<Segment>
				<Dimmer active={this.state.loading}>
					<Loader>Henter kamper som er ferdig</Loader>
				</Dimmer>
				<h3>Ferdig spilt i runde {this.props.roundNumber}</h3>
				{ finishedMatchElements }
			</Segment>
		);
	}
}

export default FinishedMatches;