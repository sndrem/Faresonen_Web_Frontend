import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
import "./LeagueTable.css";

class LeagueTableItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.tableData,
			teamData: ""
		};

		this.getTeamData(props.tableData.team["@uri"]);
	}

	getTeamData(url) {
		axios.get(url).then(data => {
			this.setState({ teamData: data.data });
		});
	}

	render() {
		return (
			<Table.Row className={this.props.rowColor}>
				<Table.Cell>{this.state.data.position}.</Table.Cell>
				<Table.Cell>{this.state.teamData.name}</Table.Cell>
				<Table.Cell>{this.state.data.matches}</Table.Cell>
				<Table.Cell>{this.state.data.wins}</Table.Cell>
				<Table.Cell>{this.state.data.draws}</Table.Cell>
				<Table.Cell>{this.state.data.losses}</Table.Cell>
				<Table.Cell>{this.state.data.goalsFor}</Table.Cell>
				<Table.Cell>{this.state.data.goalsAgainst}</Table.Cell>
				<Table.Cell>{this.state.data.goalDifference}</Table.Cell>
				<Table.Cell>{this.state.data.points}</Table.Cell>
			</Table.Row>
		);
	}
}

export default LeagueTableItem;
