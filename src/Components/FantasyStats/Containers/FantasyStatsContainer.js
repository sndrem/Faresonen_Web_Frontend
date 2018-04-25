import React, { Component } from "react";
import { Segment, Grid, List, Header } from "semantic-ui-react";
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
      loading: true
    };
  }
  componentDidMount() {
    this.getMostSelectedPlayers(10);
    this.getMostExpensivePlayers(10);
  }

  getMostExpensivePlayers = limit => {
    FantasyStatsService.getMostExpensivePlayer(limit)
      .then(data =>
        this.setState({
          data: {
            ...this.state.data,
            expensivePlayers: data
          }
        })
      )
      .catch(err => {
        this.setState({
          data: {
            ...this.state.data,
            expensivePlayers: []
          }
        });
      });
  };

  getMostSelectedPlayers = limit => {
    FantasyStatsService.getMostSelectedPlayers(limit)
      .then(data => {
        this.setState({
          data: {
            ...this.state.data,
            selectedPlayers: data
          }
        });
      })
      .catch(err => {
        this.setState({
          data: {
            ...this.state.data,
            selectedPlayers: []
          }
        });
      });
  };

  render() {
    const { selectedPlayers, expensivePlayers } = this.state.data;
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
