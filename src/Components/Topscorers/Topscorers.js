import React, { Component } from 'react';
import { Table, Segment, Dimmer, Loader, Message } from 'semantic-ui-react';
import axios from 'axios';

class Topscorers extends Component {

	constructor(props) {
		super(props);
		this.state = {
			topscorers: [],
			loading: true
		}
	}

	componentDidMount() {
		const { tournamentId } = this.props;
		console.log(tournamentId);
		axios.get(`/statistics/topscorers/${tournamentId}`).then((data) => {
			console.log(data.data);
			this.setState({
				topscorers: data.data.data.slice(0, 10),
				loading: false
			})
		}).catch((err) => {
			console.error(err);
		});
	}

	render() {

		if(this.state.topscorers.length <= 0 && this.state.loading === false) {
			return (
				<Message negative={true}>
					<Message.Header>Toppscorere ikke tilgjengelig</Message.Header>
					<p>Ingen toppscorere tilgjengelig for denne ligaen. Det kan være fordi ligaen ikke har startet, 
					mål ikke er registrert på Altomfotball eller serveren er nede. Prøv igjen senere</p>
				</Message>
			)
		}


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
			<Segment>
				<Dimmer active={this.state.loading}>
					<Loader>Henter toppscorere</Loader>
				</Dimmer>
				<h1>Toppscorere</h1>
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
			</Segment>
		)
	}
}

export default Topscorers;