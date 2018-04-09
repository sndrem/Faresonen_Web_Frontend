import React, { Component } from "react";
import PropTypes from "prop-types";
import PlayerStatsContainer from "../Components/PlayerStats/Containers/PlayerStatsContainer";

class DetailedPlayerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  render() {
    const { playerId } = this.props.match.params;
    return <PlayerStatsContainer playerId={playerId} />;
  }
}
DetailedPlayerView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      playerId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
export default DetailedPlayerView;
