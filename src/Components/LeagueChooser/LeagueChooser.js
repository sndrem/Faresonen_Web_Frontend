import React from "react";
import PropTypes from "prop-types";
import { Grid, Card } from "semantic-ui-react";
import './LeagueChooser.css';

const LeagueChooser = props => {
  const leagues = props.leagues.map(league => (
    <Grid.Column key={league.tournamentId}>
      <Card className={league.active ? 'active': 'disabled'}
        href={league.active ? `#/league/${league.name}/${league.tournamentId}/${
          league.seasonId
        }/` : ''}
        image={league.image}
        header={league.name}
        description={`TurneringsID: ${league.tournamentId} - SesongID: ${
          league.seasonId
        }`}
      />
    </Grid.Column>
  ));
  return <Grid columns={3}>{leagues}</Grid>;
};

LeagueChooser.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      tournamentId: PropTypes.number.isRequired,
      seasonId: PropTypes.number.isRequired
    })
  ).isRequired
};

export default LeagueChooser;
