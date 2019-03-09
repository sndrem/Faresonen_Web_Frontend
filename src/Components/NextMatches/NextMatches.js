import React from "react";
import PropTypes from "prop-types";
import { Table, Segment, Dimmer, Loader, Message } from "semantic-ui-react";
import NextMatchInfo from "./NextMatchInfo";

const NextMatches = ({ matches, nextRoundNumber, loading }) => {
  const nextMatchInfo = matches.map(m => (
    <NextMatchInfo key={m.id} matchInfo={m} nextRoundNumber={nextRoundNumber} />
  ));

  if (nextMatchInfo.length <= 0 && !loading) {
    return (
      <Message className="no-print" info>
        Kamper for neste runde er ikke klar, eller så holder du på å lage lefsen
        for sesongens siste runde.
      </Message>
    );
  }

  return (
    <Segment>
      <Dimmer active={loading}>
        <Loader>Henter neste runde</Loader>
      </Dimmer>
      <h1>Neste runde</h1>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Dato</Table.HeaderCell>
            <Table.HeaderCell>Kl.</Table.HeaderCell>
            <Table.HeaderCell>Runde</Table.HeaderCell>
            <Table.HeaderCell>Kamp</Table.HeaderCell>
            <Table.HeaderCell>Arena</Table.HeaderCell>
            <Table.HeaderCell>Kanal</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{nextMatchInfo}</Table.Body>
      </Table>
    </Segment>
  );
};

NextMatches.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  nextRoundNumber: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

export default NextMatches;
