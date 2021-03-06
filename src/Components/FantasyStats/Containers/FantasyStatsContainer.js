import React, {Component} from "react";
import {Message, Segment, Grid} from "semantic-ui-react";
import FantasyStatsList from "../FantasyStatsList";
import FantasyStatsService from "../../../services/FantasyStatsService";

class FantasyStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        selectedPlayers: [],
        expensivePlayers: []
      },
      errors: []
    };
  }

  componentDidMount() {
    this.getMostSelectedPlayers(10);
    this.getMostExpensivePlayers(10);
  }

  getMostExpensivePlayers = limit => {
    FantasyStatsService.getMostExpensivePlayer(limit)
      .then(data =>
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            expensivePlayers: data
          }
        }))
      )
      .catch(() => {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            expensivePlayers: []
          },
          loading: false,
          errors: [
            ...prevState.errors,
            "Kunne ikke hente de dyreste spillerne. Er du koblet til internett?"
          ]
        }));
      });
  };

  getMostSelectedPlayers = limit => {
    FantasyStatsService.getMostSelectedPlayers(limit)
      .then(data => {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            selectedPlayers: data
          }
        }));
      })
      .catch(() => {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            selectedPlayers: []
          },
          loading: false,
          errors: [
            ...prevState.errors,
            "Kunne ikke hente de mest valgte spillerne. Er du koblet til internett?"
          ]
        }));
      });
  };

  formatErrors = errors => (
    <Message info>
      <ul>
        {errors.map(error => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </Message>
  );

  render() {
    const {
      data: {selectedPlayers, expensivePlayers},
      errors
    } = this.state;
    if (errors.length > 0) {
      return this.formatErrors(errors);
    }

    return (
      <Segment>
        <Grid columns={4}>
          <Grid.Column>
            <FantasyStatsList
              players={selectedPlayers.map(
                player =>
                  `${player.selected_by_percent}% - ${player.first_name} ${
                    player.second_name
                  }`
              )}
              header="Mest valgte spillere"
            />
          </Grid.Column>
          <Grid.Column>
            <FantasyStatsList
              players={expensivePlayers.map(
                player =>
                  `£${(player.now_cost / 10).toFixed(1)} mill. - ${
                    player.first_name
                  } ${player.second_name}`
              )}
              header="Dyreste spillere"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
export default FantasyStatsContainer;
