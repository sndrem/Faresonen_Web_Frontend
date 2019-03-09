import React from "react";
import PropTypes from "prop-types";
import { Segment, Dimmer, Loader, Message } from "semantic-ui-react";
import RoundButtons from "../RoundButtons/RoundButtons";

const RoundList = ({ rounds, loading, leagueName, tournamentId, seasonId }) => {
  if (rounds.length === 0) {
    return (
      <Message info>
        Klarte ikke å hente runder. Sjekk at du er koblet til internett
      </Message>
    );
  }
  return (
    <Segment>
      <Dimmer active={loading}>
        <Loader>
          Henter runder for
          {leagueName}
        </Loader>
      </Dimmer>
      <RoundButtons
        tournamentId={tournamentId}
        seasonId={seasonId}
        leagueName={leagueName}
        finished={false}
        rounds={rounds}
        now={new Date().toISOString()}
      />
    </Segment>
  );
};

RoundList.propTypes = {
  leagueName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  tournamentId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired,
  rounds: PropTypes.arrayOf(
    PropTypes.shape({
      "@uri": PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nextRoundId: PropTypes.string,
      roundNo: PropTypes.string.isRequired
    })
  ).isRequired
};

export default RoundList;
