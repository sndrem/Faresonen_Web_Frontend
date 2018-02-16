import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import LeagueTableItem from './LeagueTableItem';

class LeagueTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			table: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ table: nextProps.table});
	}

	render() {
		const tableElements = this.state.table.map(t => {
			return (
						<LeagueTableItem key={t.id} tableData={t} />
				)
		});
		return (
				<div>
					<h1>Tabell</h1>
					<Table striped={true} compact={true}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell></Table.HeaderCell>
								<Table.HeaderCell>Lag</Table.HeaderCell>
								<Table.HeaderCell>K</Table.HeaderCell>
								<Table.HeaderCell>V</Table.HeaderCell>
								<Table.HeaderCell>U</Table.HeaderCell>
								<Table.HeaderCell>T</Table.HeaderCell>
								<Table.HeaderCell>+</Table.HeaderCell>
								<Table.HeaderCell>-</Table.HeaderCell>
								<Table.HeaderCell>+/-</Table.HeaderCell>
								<Table.HeaderCell>P</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{ tableElements }
						</Table.Body>
					</Table>
				</div>
			)
	}
}

export default LeagueTable;