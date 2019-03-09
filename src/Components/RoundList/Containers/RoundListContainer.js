import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import RoundList from "../RoundList";

const RoundListContainer = ({ tournamentId, seasonId, leagueName }) => {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      getRounds(tournamentId, seasonId);
    },
    [tournamentId, seasonId]
  );

  const getRounds = (tournamentId, seasonId) => {
    axios
      .get(`/rounds/${tournamentId}/${seasonId}`)
      .then(data => {
        setRounds(data.data.round || []);
        setLoading(false);
      })
      .catch(() => {
        setRounds([]);
        setLoading(false);
      });
  };

  return (
    <RoundList
      rounds={rounds}
      leagueName={leagueName}
      loading={loading}
      tournamentId={tournamentId}
      seasonId={seasonId}
    />
  );
};

RoundListContainer.propTypes = {
  tournamentId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired,
  leagueName: PropTypes.string.isRequired
};

export default RoundListContainer;
