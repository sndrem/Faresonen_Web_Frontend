import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Progress} from "semantic-ui-react";
import axios from "axios";
import events from "../../Tools/events";

const LeagueProgress = ({tournamentId, seasonId, leagueName}) => {
  const removeFinishedRounds = rounds => {
    if (!rounds) throw new Error("Rounds cannot be undefined");

    const promises = getMatchUris(rounds);

    return new Promise((resolve, reject) => {
      axios
        .all(promises)
        .then(data => {
          const filteredMatches = data.reduce(
            (obj, match) => {
              const {match: matchData} = match.data;
              if (
                matchData.every(
                  m =>
                    m.confirmed === "true" || roundHasFinishedMatches(matchData)
                )
              ) {
                // eslint-disable-next-line
                obj.finished += 1;
              } else if (roundHasPostponedMatches(matchData)) {
                // eslint-disable-next-line
                obj.finished += 1;
              } else {
                // eslint-disable-next-line
                obj.left += 1;
              }
              return obj;
            },
            {finished: 0, left: 0}
          );
          resolve(filteredMatches);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const getMatchUris = rounds => {
    return rounds.map(r => axios.get(r.matches["@uri"]));
  };

  const roundHasPostponedMatches = matches => {
    return matches.some(m => {
      let status = null;
      if (m.status) {
        status = m.status["@uri"];
      }
      return events.postponed.includes(status);
    });
  };

  const roundHasFinishedMatches = matches => {
    return matches.some(m => {
      let status = null;
      if (m.status) {
        status = m.status["@uri"];
      }
      return events.ended.includes(status);
    });
  };

  const [finished, setFinished] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(
    () => {
      getRounds(tournamentId, seasonId);
    },
    [tournamentId, seasonId]
  );

  const getRounds = (tournamentId, seasonId) => {
    axios.get(`/rounds/${tournamentId}/${seasonId}`).then(data => {
      calculateRounds(data.data.round);
    });
  };

  const calculateRounds = rounds => {
    removeFinishedRounds(rounds).then(({finished, left}) => {
      setFinished(finished);
      setTotal(finished + left);
    });
  };

  return (
    <Progress
      className="no-print"
      color="green"
      progress="ratio"
      total={total}
      value={finished}
    >
      Progresjon for {leagueName}
    </Progress>
  );
};

LeagueProgress.propTypes = {
  leagueName: PropTypes.string.isRequired,
  tournamentId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired
};

export default LeagueProgress;
