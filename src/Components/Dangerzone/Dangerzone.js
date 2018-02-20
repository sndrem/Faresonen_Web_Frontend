import React, { Component } from 'react';
import { Grid, Segment, Dimmer, Loader, Table, Message } from 'semantic-ui-react';
import axios from 'axios';

class Dangerzone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
			loading: true
		}

		this.getPlayersWithYellowCards(this.props.tournamentId);
	}

	getPlayersWithYellowCards(tournamentId) {
		axios.get(`/statistics/yellowcards/${tournamentId}`).then((data) => {
			if(data.data.data.length <= 0) {
				this.setState({
					players: [],
					loading: false
				})
				return;
			}
			let playersGrouped = this.groupPlayers(data.data.data);
			playersGrouped = this.filterPlayers(playersGrouped);
			playersGrouped = this.sortTeams(playersGrouped);
			this.setState({
				players: [playersGrouped],
				loading: false
			})
		});
	}

	sortTeams(players) {
		return players.sort((a, b) => a.name.localeCompare(b.name));
	}

	filterPlayers(players) {
		const x = Object.keys(players).map(team => {
			return {
					name: team,
					players: players[team].players.filter(p => (p.value1 % 2) === 0)
				}
		});
		return x;
	}

	groupPlayers(players) {
		return players.reduce((obj, elem) => {
			
			if(!obj[elem.team]) {
				obj[elem.team] = {
					players: []
				};
			}

			if(obj[elem.team]) {
				obj[elem.team].players.push(elem);
			}

			return obj;
		}, {});
	}



	render() {
		if(this.state.players.length <= 0 && this.state.loading === false) {
			return (
				<Message negative={true}>
					<Message.Header>Faresonen ikke tilgjengelig</Message.Header>
					<p>Faresonen er ikke tilgjengelig for denne ligaen. Det kan være fordi ligaen ikke har startet, 
					gule kort ikke er registrert på Altomfotball eller serveren er nede. Prøv igjen senere.</p>
				</Message>
			)
		}
		
		const players = this.state.players.map(team => {
			return Object.keys(team).map(key => {
				return (
					<Grid.Column key={key}>
						<Table striped className='min-height' compact collapsing>
							<Table.Header>
								<Table.Row textAlign='center'>
									<Table.HeaderCell colSpan='2'>{team[key].name}</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
							{ team[key].players.map(player => {
								return (
									<Table.Row key={player.name}>
										<Table.Cell>{ player.name }</Table.Cell>
										<Table.Cell>{ player.value1 }</Table.Cell>
									</Table.Row>
								)
							}) }
							</Table.Body>
						</Table>
					</Grid.Column>
				)
			});
		});
		return (
			<Segment>
				<Dimmer active={this.state.loading}>
					<Loader>Henter spillere i faresonen</Loader>
				</Dimmer>
				<h1>Faresonen i {this.props.leagueName}</h1>
				<Grid columns={4}>
					{ players }
				</Grid>

			</Segment>
		)
	}
}

export default Dangerzone;