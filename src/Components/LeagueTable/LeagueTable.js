import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Segment, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import LeagueTableItem from "./LeagueTableItem";

class LeagueTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: [],
			leagueName: props.leagueName,
			tableColors: props.tableColors,
			loading: true
		};
	}

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		const { table } = nextProps;
		this.setState({ table });
		if (nextProps.table && table.length > 1) {
			// TODO RESOLVE FUNCTION??
			this.getLeagueName(table[0].tournament["@uri"]);
		} 

		// TODO Use this for correct testing?
		// return new Promise((resolve, reject) => {
		// 	const { table } = nextProps;
		// 	this.setState({ table });
		// 	if (nextProps.table && table.length > 1) {
		// 		// TODO RESOLVE FUNCTION??
		// 		this.getLeagueName(table[0].tournament["@uri"]);
		// 		resolve({});
		// 	} else {
		// 		resolve([])
		// 	}
		// });
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
		const tableElements = this.state.table.map((t, index) => {
			if (this.state.tableColors.greens.includes(index)) {
				return (
					<LeagueTableItem
						rowColor="green"
						key={t.id}
						tableData={t}
					/>
				);
			} else if (this.state.tableColors.reds.includes(index)) {
				return (
					<LeagueTableItem rowColor="red" key={t.id} tableData={t} />
				);
			}
			return <LeagueTableItem key={t.id} tableData={t} />;
		});

		return (
			<Segment className="print">
				<Dimmer active={this.state.loading}>
					<Loader>Henter tabell for {this.state.leagueName}</Loader>
				</Dimmer>
				<h1>Tabell: {this.state.leagueName}</h1>
				<Table>
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

LeagueTable.propTypes = {
	leagueName: PropTypes.string.isRequired,
	tableColors: PropTypes.shape({
		greens: PropTypes.arrayOf(PropTypes.number),
		reds: PropTypes.arrayOf(PropTypes.number)
	}).isRequired,
	table: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LeagueTable;
