import React, { Component } from "react";
import PropTypes from "prop-types";
import Matches from "../../Matches/Matches";

class MatchesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        matches: []
      },
      loading: true
    };
  }

  render() {
    return (
      <Matches
        className="print"
        leagueName={this.props.leagueName}
        roundNumber={this.props.roundNumber}
        matches={this.props.matches}
        loading={this.props.loading}
      />
    );
  }
}

MatchesContainer.propTypes = {
  leagueName: PropTypes.string.isRequired,
  roundNumber: PropTypes.number.isRequired,
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      hometeam: PropTypes.shape({ "@uri": PropTypes.string.isRequired })
        .isRequired,
      awayteam: PropTypes.shape({ "@uri": PropTypes.string.isRequired })
        .isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default MatchesContainer;
