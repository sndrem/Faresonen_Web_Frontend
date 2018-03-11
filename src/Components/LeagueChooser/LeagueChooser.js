import React, { Component } from "react";
import { Grid, Card } from "semantic-ui-react";

class LeagueChooser extends Component {
  handleClick(leagueData) {
    const { name, tournamentId, seasonId } = leagueData;
    this.props.switchLeagueName(name, tournamentId, seasonId);
    this.props.history.push(`/league/${name}/${tournamentId}/${seasonId}`);
  }

  render() {
    const leagues = this.props.leagues.map(league => (
      <Grid.Column key={league.tournamentId}>
        <Card
          onClick={() => this.handleClick(league)}
          image={league.image}
          header={league.name}
          description={`TurneringsID: ${league.tournamentId} - SesongID: ${
            league.seasonId
          }`}
        />
      </Grid.Column>
    ));
    return <Grid columns={3}>{leagues}</Grid>;
  }
}

export default LeagueChooser;
