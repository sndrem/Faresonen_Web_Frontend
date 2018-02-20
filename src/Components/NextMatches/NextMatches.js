import React, { Component } from 'react';
import { Table, Segment, Dimmer, Loader } from 'semantic-ui-react';
import NextMatchInfo from './NextMatchInfo';

class NextMatches extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: props.matches,
			nextRoundNumber: props.nextRoundNumber,
			loading: true
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps,
			loading: false
		});
	}

	render() {
		const matches = this.state.matches.map(m => {
			return (
					<NextMatchInfo key={m.id} matchInfo={m} nextRoundNumber={this.state.nextRoundNumber} />
				)
		});

		return (
			<Segment>
				<Dimmer active={this.state.loading}>
					<Loader>Henter neste runde</Loader>
				</Dimmer>
				<h1>Neste runde</h1>
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Dato</Table.HeaderCell>
							<Table.HeaderCell>Kl.</Table.HeaderCell>
							<Table.HeaderCell>Runde</Table.HeaderCell>
							<Table.HeaderCell>Kamp</Table.HeaderCell>
							<Table.HeaderCell>Kanal</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{ matches }
					</Table.Body>
				</Table>
			</Segment>
		)
	}
}

export default NextMatches;