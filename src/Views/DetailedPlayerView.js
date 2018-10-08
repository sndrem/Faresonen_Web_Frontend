import React from "react";
import PropTypes from "prop-types";
import PlayerStatsContainer from "../Components/PlayerStats/Containers/PlayerStatsContainer";

const DetailedPlayerView = ({
  match: {
    params: {playerId}
  }
}) => <PlayerStatsContainer playerId={playerId} />;

DetailedPlayerView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      playerId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
export default DetailedPlayerView;
