import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

class Topscorers extends Component {

	constructor(props) {
		super(props);
		this.state = {
			topscorers: []
		}
	}

	componentDidMount() {
		const { tournamentId } = this.props;

		axios.get(`/statistics/topscorers/${tournamentId}`).then((data) => {
			this.setState({
				topscorers: data.data.data.slice(0, 10)
			})
		}).catch((err) => {
			console.error(err);
		});
	}

	render() {
		let topscorers = null;
		if(this.state.topscorers.length > 0) {
			topscorers = this.state.topscorers.map(ts => {
			return (
				<Table.Row key={ts.name}>
					<Table.Cell>{ts.place}</Table.Cell>
					<Table.Cell>{ts.name}</Table.Cell>
					<Table.Cell>{ts.team}</Table.Cell>
					<Table.Cell>{ts.value1}</Table.Cell>
					<Table.Cell>{ts.value2}</Table.Cell>
					<Table.Cell>{ts.value3}</Table.Cell>
				</Table.Row>
				)
			});	
		} 
		 
		return (
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Posisjon</Table.HeaderCell>
						<Table.HeaderCell>Navn</Table.HeaderCell>
						<Table.HeaderCell>Lag</Table.HeaderCell>
						<Table.HeaderCell>Mål</Table.HeaderCell>
						<Table.HeaderCell>Kamper</Table.HeaderCell>
						<Table.HeaderCell>Snitt</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				
				<Table.Body>
					{ topscorers }
				</Table.Body>
				
			</Table>
		)
	}
}

export default Topscorers;