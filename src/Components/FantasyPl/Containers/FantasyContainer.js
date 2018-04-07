import React, { Component } from "react";
import axios from "axios";
import FantasyPlayers from "../FantasyPlayers";

class FantasyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        teams: []
      },
      loading: true,
      error: ""
    };
  }

  componentDidMount() {
    axios
      .all([this.getPlayers(), this.getTeams()])
      .then(data => {
        const players = data[0].data;
        const teams = data[1].data;
        const groupedTeams = this.groupTeams(players, teams);
        this.setState({
          data: {
            teams: groupedTeams
          },
          loading: false,
          error: ""
        });
      })
      .catch(err => {
        console.warn("Problem fetching fantasy players");
        console.warn(err);
        this.setState({
          error: "Det oppsto desverre et problem ved henting av spillere."
        });
      });
  }

  getPlayers = () => axios.get("/fantasy/players");
  getTeams = () => axios.get("/fantasy/teams");

  groupTeams = (players, teams) =>
    players.reduce((obj, player) => {
      const team = teams.find(
        teamToFind => teamToFind.code === player.team_code
      );
      if (obj[player.team_code]) {
        // const playerWithTeam = this.connectPlayerAndTeam(player, teams);
        // eslint-disable-next-line
        player.team = team;
        obj[player.team_code].players.push(player);
      } else {
        // eslint-disable-next-line
        obj[player.team_code] = {
          name: team.name,
          players: []
        };
      }
      return obj;
    }, {});

  connectPlayerAndTeam = (player, teams) => {
    const mappedPlayer = player;
    const { team_code: teamCode } = player;
    const team = teams.find(teamToMatch => teamToMatch.code === teamCode);
    mappedPlayer.team = team;
    return mappedPlayer;
  };

  render() {
    return (
      <FantasyPlayers
        teams={this.state.data.teams}
        loading={this.state.loading}
      />
    );
  }
}
export default FantasyContainer;
