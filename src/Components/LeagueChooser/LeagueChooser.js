import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, Message } from "semantic-ui-react";
import altOmFotballLeagueService from "../../services/altOmFotballLeagueService";

const LeagueChooser = props => {
  const leagues = props.leagues.map(league => {
    const activeSeason = altOmFotballLeagueService.getActiveSeasonNumber(
      league.activeseason["@uri"]
    );
    return (
      <Grid.Column key={league.id}>
        <Card
          href={`#/league/${league.name}/${league.id}/${activeSeason}/`}
          header={league.name}
          description={`TurneringsID: ${league.id} - SesongID: ${activeSeason}`}
        />
      </Grid.Column>
    );
  });
  return leagues.length > 0 ? (
    <Grid columns={3}>{leagues}</Grid>
  ) : (
    <Message info>
      <Message.Header>Ingen ligaer tilgjengelig</Message.Header>
      <p>
        Det er ingen ligaer lagt til i databasen. Dersom du er administrator kan
        du legge til kamper <a href="#/admin">her</a> eller få en administrator
        til å gjøre det for deg.
      </p>
    </Message>
  );
};

LeagueChooser.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      activeseason: PropTypes.shape({
        "@uri": PropTypes.string.isRequired
      })
    })
  ).isRequired
};

export default LeagueChooser;
