import React, { Component } from "react";
import axios from "axios";
import { Grid, List, Header } from "semantic-ui-react";

class FantasyStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        selectedPlayers: []
      },
      loading: true
    };
  }
  componentDidMount() {
    this.getMostSelectedPlayers(15);
  }

  getMostSelectedPlayers = limit => {
    axios.get("/fantasy/players").then(data => {
      const selectedPlayers = data.data
        .sort((a, b) => {
          const selectA = parseFloat(a.selected_by_percent);
          const selectB = parseFloat(b.selected_by_percent);
          if (selectA > selectB) return -1;
          if (selectA === selectB) return 0;
          if (selectA < selectB) return 1;
        })
        .filter(player => player.selected_by_percent !== "0.0")
        .slice(0, limit);
      this.setState({
        data: {
          selectedPlayers
        }
      });
    });
  };
  render() {
    const { selectedPlayers } = this.state.data;
    return (
      <Grid columns={4}>
        <Grid.Column>
          <Header as="h2">Mest valgte spillere</Header>
          <List
            items={selectedPlayers.map(
              player =>
                `${player.selected_by_percent}% - ${player.first_name} ${
                  player.second_name
                }`
            )}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
export default FantasyStatsContainer;
