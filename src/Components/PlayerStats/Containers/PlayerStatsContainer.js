import React, {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Grid, Statistic, Segment} from "semantic-ui-react";
import FaresoneMenu from "../../Menu/FaresoneMenu";
import PlayerProfile from "../PlayerProfile";

class PlayerStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        player: {},
        team: {}
      }
    };
  }

  componentDidMount = () => {
    const {playerId} = this.props;
    axios.get(`/fantasy/player/${playerId}`).then(data => {
      const player = data.data;
      if (player.team_code) {
        this.getTeam(player.team_code);
      }
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          player: data.data
        }
      }));
    });
  };

  // TODO Fetch team based on team code
  getTeam = teamId => {
    axios.get(`/fantasy/team/${teamId}`).then(data => {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          team: data.data
        }
      }));
    });
  };

  mapStats = player => [
    {key: "goals", label: "Mål", value: player.goals_scored},
    {key: "assists", label: "Assists", value: player.assists},
    {
      key: "pointsPerGame",
      label: "Poeng per kamp",
      value: player.points_per_game
    },
    {key: "minPlayed", label: "Min. spilt", value: player.minutes},
    {key: "influence", label: "Påvirkning", value: player.influence},
    {key: "creativity", label: "Kreativitet", value: player.creativity},
    {key: "form", label: "Form", value: player.form},
    {key: "bonus", label: "Bonus", value: player.bonus}
  ];

  render() {
    const {player, team} = this.state.data;

    const items = this.mapStats(player);
    return (
      <div>
        <FaresoneMenu />
        <Grid columns={2}>
          <Grid.Column>
            <PlayerProfile
              name={`${player.first_name} ${player.second_name}`}
              teamName={team.name}
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
            <Segment>
              <Statistic.Group widths={2} items={items} />
            </Segment>
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
