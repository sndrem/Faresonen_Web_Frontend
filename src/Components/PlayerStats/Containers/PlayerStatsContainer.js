import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Grid, Statistic } from "semantic-ui-react";
import FaresoneMenu from "../../Menu/FaresoneMenu";
import PlayerProfile from "../PlayerProfile";

class PlayerStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        player: {}
      },
      loading: true
    };
  }

  componentDidMount = () => {
    const { playerId } = this.props;
    axios.get(`/fantasy/player/${playerId}`).then(data => {
      this.setState({
        data: {
          player: data.data
        },
        loading: false
      });
    });
  };

  mapStats = player => [
    { key: "assists", label: "Assists", value: player.assists },
    { key: "goals", label: "Mål", value: player.goals_scored },
    {
      key: "pointsPerGame",
      label: "Poeng per kamp",
      value: player.points_per_game
    },
    { key: "minPlayed", label: "Min. spilt", value: player.minutes },
    { key: "influence", label: "Påvirkning", value: player.influence },
    { key: "creativity", label: "Kreativitet", value: player.creativity },
    { key: "form", label: "Form", value: player.form }
  ];

  // TODO Fetch team based on team code

  render() {
    const { player } = this.state.data;
    console.log(player);
    if (!player) {
      return <p>Ingen data for spiller med ID: {this.props.playerId}</p>;
    }
    const items = this.mapStats(player);
    return (
      <div>
        <FaresoneMenu />
        <Grid columns={2}>
          <Grid.Column stretched>
            <PlayerProfile
              name={`${player.first_name} ${player.second_name}`}
              news={player.news}
              photo={player.photo}
              chanceOfPlayingNextRound={player.chance_of_playing_next_round}
              inDreamTeam={player.in_dreamteam}
              points={player.total_points}
              selectedBy={player.selected_by_percent}
              cost={player.now_cost}
            />
          </Grid.Column>
          <Grid.Column>
            <Statistic.Group horizontal items={items} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

PlayerStatsContainer.propTypes = {
  playerId: PropTypes.string.isRequired
};

export default PlayerStatsContainer;
