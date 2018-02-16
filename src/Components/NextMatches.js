import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import NextMatchInfo from './NextMatchInfo';

class NextMatches extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: props.matches
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		this.setState({...nextProps});
	}

	render() {
		const matches = this.state.matches.map(m => {
			return (
					<NextMatchInfo matchInfo={m} />
				)
		});

		return (
			<div>
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
			</div>
		)
	}
}

export default NextMatches;