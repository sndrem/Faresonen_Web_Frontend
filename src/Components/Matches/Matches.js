import React from "react";
import PropTypes from "prop-types";
import { List, Divider, Segment, Dimmer, Loader } from "semantic-ui-react";
import MatchInfoContainer from "./Containers/MatchInfoContainer";
import events from "../../Tools/events";
import "./Matches.css";

const Matches = ({ matches, loading, leagueName, roundNumber }) => {
  const sorted = matches.sort(
    (a, b) => new Date(a.starttime) - new Date(b.starttime)
  );
  const nextMatches = sorted.map(m => {
    let className = "";

    if (m.status && events.postponed.includes(m.status["@uri"])) {
      className = "postponed no-print";
    } else if (!!m.confirmed === true) {
      className = "finished no-print";
    }
    return (
      <List.Item className={className} key={m.id}>
        <MatchInfoContainer match={m} />
        <Divider />
      </List.Item>
    );
  });
  return (
    <Segment className="print" padded="very">
      <Dimmer size="medium" active={loading}>
        <Loader>Henter kamper</Loader>
      </Dimmer>
      <h1>
        {leagueName} -{roundNumber}. Runde
      </h1>
      <List>{nextMatches}</List>
    </Segment>
  );
};

Matches.propTypes = {
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

export default Matches;
