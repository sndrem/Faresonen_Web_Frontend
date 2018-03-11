import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Segment,
  Dimmer,
  Loader,
  Table,
  Message
} from "semantic-ui-react";
import axios from "axios";

class Dangerzone extends Component {
  static sortTeams(players) {
    return players.sort((a, b) => a.name.localeCompare(b.name));
  }

  static filterPlayers(players) {
    return Object.keys(players)
      .map(team => ({
        name: team,
        players: players[team].players.filter(
          p => p.value1 % 2 === 0 && p.value1 !== 0
        )
      }))
      .filter(team => team.players.length > 0);
  }

  static groupPlayers(players) {
    return players.reduce((obj, elem) => {
      if (!obj[elem.team]) {
        // eslint-disable-next-line no-param-reassign
        obj[elem.team] = {
          players: []
        };
      }

      if (obj[elem.team]) {
        obj[elem.team].players.push(elem);
      }
      return obj;
    }, {});
  }

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getPlayersWithYellowCards(this.props.tournamentId);
  }

  getPlayersWithYellowCards(tournamentId) {
    axios.get(`/statistics/yellowcards/${tournamentId}`).then(data => {
      const { data: yellowCardResponse } = data.data;
      if (data.length <= 0) {
        this.setState({
          players: [],
          loading: false
        });
        return;
      }
      let playersGrouped = Dangerzone.groupPlayers(yellowCardResponse);
      playersGrouped = Dangerzone.filterPlayers(playersGrouped);
      playersGrouped = Dangerzone.sortTeams(playersGrouped);
      this.setState({
        players: playersGrouped,
        loading: false
      });
    });
  }

  render() {
    if (this.state.players.length <= 0) {
      return (
        <Message info>
          <Message.Header>Faresonen ikke tilgjengelig</Message.Header>
          <p>
            Faresonen er ikke tilgjengelig for denne ligaen. Det kan være fordi
            ligaen ikke har startet, gule kort ikke er registrert på
            Altomfotball eller serveren er nede. Prøv igjen senere.
          </p>
        </Message>
      );
    }

    const players = this.state.players.map(team => (
      <Grid.Column key={team.name}>
        <Table striped className="min-height" compact collapsing>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell colSpan="2">{team.name}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {team.players.map(player => (
              <Table.Row key={player.name}>
                <Table.Cell>{player.name}</Table.Cell>
                <Table.Cell>{player.value1}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    ));
    return (
      <Segment>
        <Dimmer active={this.state.loading}>
          <Loader>Henter spillere i faresonen</Loader>
        </Dimmer>
        <h1>Faresonen i {this.props.leagueName}</h1>
        <Grid columns={4}>{players}</Grid>
      </Segment>
    );
  }
}

Dangerzone.propTypes = {
  leagueName: PropTypes.string.isRequired,
  tournamentId: PropTypes.number.isRequired
};

export default Dangerzone;
