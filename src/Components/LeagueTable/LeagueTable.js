import React, { Component } from "react";
import { Table, Segment, Dimmer, Loader } from "semantic-ui-react";
import LeagueTableItem from "./LeagueTableItem";
import axios from "axios";

class LeagueTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: [],
			leagueName: props.leagueName,
			loading: true
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ table: nextProps.table });
		if (nextProps.table && nextProps.table.length > 1) {
			this.getLeagueName(nextProps.table[0].tournament["@uri"]);
		}
	}

	getLeagueName(tournamentUri) {
		axios.get(tournamentUri).then(data => {
			this.setState({
				leagueName: data.data.name,
				loading: false
			});
		});
	}

	render() {
		const tableElements = this.state.table.map(t => (
			<LeagueTableItem key={t.id} tableData={t} />
		));

		return (
			<Segment className="print">
				<Dimmer active={this.state.loading}>
					<Loader>Henter tabell for {this.state.leagueName}</Loader>
				</Dimmer>
				<h1>Tabell: {this.state.leagueName}</h1>
				<Table striped={true} collapsing>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell />
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
					<Table.Body>{tableElements}</Table.Body>
				</Table>
			</Segment>
		);
	}
}

export default LeagueTable;
