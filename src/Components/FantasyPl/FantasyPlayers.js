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
        {Object.keys(teams).map(key => {
          if (teams[key].players.length === 0) {
            return "";
          }
          return (
            <Grid.Column key={key}>
              <Header as="h3">{teams[key].name}</Header>
              {Object.values(teams[key].players)
                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                .map(player => (
                  <div key={player.id}>
                    <a href={`#/fantasy/player/${player.id}`}>
                      {player.in_dreamteam ? (
                        <Icon name="star" color="yellow" />
                      ) : (
                        ""
                      )}
                      {player.first_name} {player.second_name} -{" "}
                    </a>
                    <span>£{player.now_cost / 10}</span>
                  </div>
                ))}
            </Grid.Column>
          );
        })}
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
