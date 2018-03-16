import React, { Component } from "react";
import PropTypes from "prop-types";
import { Progress } from "semantic-ui-react";
import axios from "axios";
import events from "../../Tools/events";

class LeagueProgess extends Component {
  static removeFinishedRounds(rounds) {
    const promises = [];
    rounds.forEach(r => {
      promises.push(axios.get(r.matches["@uri"]));
    });

    return new Promise((resolve, reject) => {
      axios
        .all(promises)
        .then(data => {
          const filteredMatches = data.reduce(
            (obj, match) => {
              const { match: matchData } = match.data;

              if (matchData.every(m => m.confirmed === "true")) {
                // eslint-disable-next-line
                obj.finished += 1;
              } else if (LeagueProgess.roundHasPostponedMatches(matchData)) {
                obj.finished += 1;
              } else {
                // eslint-disable-next-line
                obj.left += 1;
              }
              return obj;
            },
            { finished: 0, left: 0 }
          );
          resolve(filteredMatches);
        })
        .catch(err => reject(err));
    });
  }

  static roundHasPostponedMatches(matches) {
    return matches.some(m => {
      let status = null;
      if (m.status) {
        status = m.status["@uri"];
      }
      return events.postponed.includes(status);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      finished: 0,
      left: 0,
      total: 0,
      loading: true
    };
  }

  componentDidMount() {
    const { tournamentId, seasonId } = this.props;
    this.getRounds(tournamentId, seasonId);
  }

  getRounds(tournamentId, seasonId) {
    axios
      .get(`/rounds/${tournamentId}/${seasonId}`)
      .then(data => {
        this.calculateRounds(data.data.round);
      })
      .catch(err => console.error(err));
  }

  calculateRounds(rounds) {
    LeagueProgess.removeFinishedRounds(rounds).then(calculated => {
      this.setState({
        finished: calculated.finished,
        left: calculated.left,
        total: calculated.finished + calculated.left,
        loading: false
      });
    });
  }

  render() {
    return (
      <Progress
        className="no-print"
        color="green"
        progress="ratio"
        total={this.state.total}
        value={this.state.finished}
      >
        Progresjon for {this.props.leagueName}
      </Progress>
    );
  }
}

LeagueProgess.propTypes = {
  leagueName: PropTypes.string.isRequired,
  tournamentId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired
};

export default LeagueProgess;
