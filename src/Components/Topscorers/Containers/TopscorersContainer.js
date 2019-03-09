import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Topscorers from "../Topscorers";

const TopscorersContainer = ({ tournamentId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      axios
        .get(`/statistics/topscorers/${tournamentId}`)
        .then(data => {
          setPlayers(data.data.data.slice(0, 10));
          setLoading(false);
        })
        .catch(() => setPlayers([]));
    },
    [tournamentId]
  );

  return <Topscorers players={players} loading={loading} />;
};

TopscorersContainer.propTypes = {
  tournamentId: PropTypes.number.isRequired
};

export default TopscorersContainer;
