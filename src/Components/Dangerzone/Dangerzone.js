import React, { Component } from 'react';
import { Grid, Segment, Dimmer, Loader, List } from 'semantic-ui-react';
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
		console.log(this.state.players);
		const players = this.state.players.map(team => {
			return Object.keys(team).map(key => {
				return (
					<Grid.Column key={key}>
						<List>
							<List.Item>
								<List.Header>{team[key].name}</List.Header>
							</List.Item>
							{ team[key].players.map(player => {
								return (
									<List.Item key={player.name}>
										{ player.name } - { player.value1 }
									</List.Item>
								)
							}) }
						</List>
					</Grid.Column>
				)
			});
		});
		return (
			<Segment>
				<Dimmer active={this.state.loading}>
					<Loader>Henter spillere i faresonen</Loader>
				</Dimmer>

				<Grid columns={4}>
					{ players }
				</Grid>

			</Segment>
		)
	}
}

export default Dangerzone;