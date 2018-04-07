import React from "react";
import {
  Grid,
  Header,
  Segment,
  Dimmer,
  Loader,
  Icon,
  Label
} from "semantic-ui-react";

const FantasyPlayers = ({ teams, loading }) => {
  console.log(teams);
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
              <div>
                <Label image>
                  <img src="http://fillmurray.com/100/100" />
                </Label>
                <p key={player.id}>
                  {player.first_name} {player.second_name} -{" "}
                  <Icon name="money" />
                  {player.now_cost / 10}£
                </p>
              </div>
            ))}
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

export default FantasyPlayers;
