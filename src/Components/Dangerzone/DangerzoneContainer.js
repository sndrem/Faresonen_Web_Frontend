import React, { Component } from "react";
import PropTypes from "prop-types";
import Dangerzone from "./Dangerzone";
import dangerzoneService from "../../services/dangerzoneService";

class DangerzoneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getPlayersWithYellowCards(this.props.tournamentId);
  }

  getPlayersWithYellowCards(tournamentId) {
    dangerzoneService.getPlayersWithYellowCards(tournamentId).then(data => {
      const { data: yellowCardResponse } = data.data;
      if (data.length <= 0) {
        this.setState({
          players: [],
          loading: false
        });
        return;
      }
      let playersGrouped = dangerzoneService.groupPlayers(yellowCardResponse);
      playersGrouped = dangerzoneService.filterPlayers(playersGrouped);
      playersGrouped = dangerzoneService.sortTeams(playersGrouped);
      this.setState({
        players: playersGrouped,
        loading: false
      });
    });
  }
  render() {
    const { players, loading } = this.state;
    return (
      <Dangerzone
        players={players}
        leagueName={this.props.leagueName}
        loading={loading}
      />
    );
  }
}

DangerzoneContainer.propTypes = {
  tournamentId: PropTypes.number.isRequired,
  leagueName: PropTypes.string.isRequired
};

export default DangerzoneContainer;
