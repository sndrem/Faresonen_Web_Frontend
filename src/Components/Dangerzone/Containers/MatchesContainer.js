import React from "react";
import PropTypes from "prop-types";
import Matches from "../../Matches/Matches";

const MatchesContainer = ({leagueName, roundNumber, matches, loading}) => (
  <Matches
    className="print"
    leagueName={leagueName}
    roundNumber={roundNumber}
    matches={matches}
    loading={loading}
  />
);

MatchesContainer.propTypes = {
  leagueName: PropTypes.string.isRequired,
  roundNumber: PropTypes.number.isRequired,
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      hometeam: PropTypes.shape({"@uri": PropTypes.string.isRequired})
        .isRequired,
      awayteam: PropTypes.shape({"@uri": PropTypes.string.isRequired})
        .isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default MatchesContainer;
