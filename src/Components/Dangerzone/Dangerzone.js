import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Segment,
  Dimmer,
  Loader,
  List,
  Message
} from "semantic-ui-react";
import dangerzoneService from "../../services/dangerzoneService";
import DangerzoneStats from "../Stats/DangerzoneStats";
import "./Dangerzone.css";

class Dangerzone extends Component {
  static createPlayerElements(players) {
    return players.map(team => (
      <Grid.Column key={team.name}>
        <List className="similar-height">
          <List.Item>
            <List.Content>
              <List.Header>{team.name}</List.Header>
              <List.Description>
                {team.players.length} spillere
              </List.Description>
              <List.List>
                {team.players.map(player => (
                  <List.Item key={player.name}>
                    <List.Icon name="user" />
                    <List.Content>
                      <List.Header>{player.name}</List.Header>
                      <List.Description>
                        {player.value1}{" "}
                        {player.value1 > 1 ? "gule kort" : "gult kort"}
                        {", "}
                        {team.name}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List.List>
            </List.Content>
          </List.Item>
        </List>
      </Grid.Column>
    ));
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
    dangerzoneService.getPlayersWithYellowCards(tournamentId).then(data => {
      const { data: yellowCardResponse } = data.data;
      if (data.length <= 0) {
        this.setState({
          players: [],
          loading: false
        });
        return;
      }
      let playersGrouped = dangerzoneService.groupPlayers(yellowCardResponse);
      playersGrouped = dangerzoneService.filterPlayers(playersGrouped);
      playersGrouped = dangerzoneService.sortTeams(playersGrouped);
      this.setState({
        players: playersGrouped,
        loading: false
      });
    });
  }

  render() {
    if (this.state.players.length <= 0 && !this.state.loading) {
      return (
        <Message info className="no-print">
          <Message.Header>Faresonen ikke tilgjengelig</Message.Header>
          <p>
            Faresonen er ikke tilgjengelig for denne ligaen. Det kan være fordi
            ligaen ikke har startet, gule kort ikke er registrert på
            Altomfotball eller serveren er nede. Prøv igjen senere.
          </p>
        </Message>
      );
    }

    const players = Dangerzone.createPlayerElements(this.state.players);

    return (
      <Segment>
        <Dimmer active={this.state.loading}>
          <Loader>Henter spillere i faresonen</Loader>
        </Dimmer>
        <h1>Faresonen i {this.props.leagueName}</h1>
        <Grid columns={4}>{players}</Grid>
        {/* <Grid columns={12}>
          <DangerzoneStats data={this.state.players} />
        </Grid> */}
      </Segment>
    );
  }
}

Dangerzone.propTypes = {
  leagueName: PropTypes.string.isRequired,
  tournamentId: PropTypes.number.isRequired
};

export default Dangerzone;
