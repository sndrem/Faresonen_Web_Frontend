import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Segment,
  Dimmer,
  Loader,
  List,
  Message
} from "semantic-ui-react";
import "./Dangerzone.css";

const Dangerzone = props => {
  if (props.players.length <= 0 && !props.loading) {
    return (
      <Message info className="no-print">
        <Message.Header>Faresonen ikke tilgjengelig</Message.Header>
        <p>
          Det er ingen spillere i Faresonen for
          {props.leagueName}.
        </p>
      </Message>
    );
  }

  return (
    <Segment>
      <Dimmer active={props.loading}>
        <Loader>Henter spillere i faresonen</Loader>
      </Dimmer>
      <h1>Faresonen i {props.leagueName}</h1>
      <Grid columns={4}>
        {props.players.map(team => (
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
        ))}
      </Grid>
    </Segment>
  );
};

Dangerzone.propTypes = {
  leagueName: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          place: PropTypes.number.isRequired,
          team: PropTypes.string.isRequired,
          value1: PropTypes.number.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default Dangerzone;
