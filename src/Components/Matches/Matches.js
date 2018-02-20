import React, { Component } from 'react';
import { List, Divider, Segment, Dimmer, Loader } from 'semantic-ui-react';
import MatchInfo from './MatchInfo';

class Matches extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			matches: [],
			loading: true
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			matches: nextProps.matches,
			loading: false
		});
	}

	render() {
		const nextMatches = this.state.matches.map((m) => {
			return (
				<List.Item key={m.id}>
					<MatchInfo match={m}>
					</MatchInfo>
					<Divider />
				</List.Item>
				)
		});
		return (
			<Segment padded={'very'}>
				<Dimmer size={'medium'} active={this.state.loading}>
					<Loader>Henter kamper</Loader>
				</Dimmer>
				<List>
						{ nextMatches }
					</List>
			</Segment>
			)
	}
}

export default Matches;