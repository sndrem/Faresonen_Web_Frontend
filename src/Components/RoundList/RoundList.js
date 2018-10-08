import React from "react";
import PropTypes from "prop-types";
import {
  Segment, Dimmer, Loader, Message,
} from "semantic-ui-react";
import RoundButtons from "../RoundButtons/RoundButtons";

const RoundList = (props) => {
  if (props.rounds.length === 0) {
    return (
      <Message info>
        Klarte ikke å hente runder. Sjekk at du er koblet til internett
      </Message>
    );
  }
  return (
    <Segment>
      <Dimmer active={props.loading}>
        <Loader>
Henter runder for
          {props.leagueName}
        </Loader>
      </Dimmer>
      <RoundButtons
        tournamentId={props.tournamentId}
        seasonId={props.seasonId}
        leagueName={props.leagueName}
        finished={false}
        rounds={props.rounds}
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
      roundNo: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RoundList;
