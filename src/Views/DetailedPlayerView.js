import React, { Component } from "react";
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
export default DetailedPlayerView;
