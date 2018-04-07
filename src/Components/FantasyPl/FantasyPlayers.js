import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Segment, Dimmer, Loader, Icon } from "semantic-ui-react";

const FantasyPlayers = ({ teams, loading }) => {
  return (
    <Segment>
      <Dimmer active={loading}>
        <Loader>Henter Fantasy-spillere</Loader>
      </Dimmer>

      <Header as="h1">Fantasy PL</Header>
      <Grid columns={4}>
        {Object.keys(teams).map(key => (
          <Grid.Column key={key}>
            <Header as="h3">{teams[key].name}</Header>
            {Object.values(teams[key].players).map(player => (
              <div key={player.id}>
                <a href={`#/fantasy/player/${player.id}`}>
                  <p>
                    {player.first_name} {player.second_name} -{" "}
                    <Icon name="money" />
                    {player.now_cost / 10}£
                  </p>
                </a>
              </div>
            ))}
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};
FantasyPlayers.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          first_name: PropTypes.string.isRequired,
          second_name: PropTypes.string.isRequired,
          now_cost: PropTypes.number.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default FantasyPlayers;
