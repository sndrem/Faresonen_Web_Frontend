import React from "react";
import PropTypes from "prop-types";
import { Table, Segment, Dimmer, Loader, Message } from "semantic-ui-react";

const Topscorers = props => {
  if (props.players.length <= 0 && props.loading === false) {
    return (
      <Message negative>
        <Message.Header>Toppscorere ikke tilgjengelig</Message.Header>
        <p>
          Ingen toppscorere tilgjengelig for denne ligaen. Det kan være fordi
          ligaen ikke har startet, mål ikke er registrert på Altomfotball eller
          serveren er nede. Prøv igjen senere.
        </p>
      </Message>
    );
  }

  const topscorers = props.players.map(ts => (
    <Table.Row key={ts.name}>
      <Table.Cell>{ts.place}</Table.Cell>
      <Table.Cell>{ts.name}</Table.Cell>
      <Table.Cell>{ts.team}</Table.Cell>
      <Table.Cell>{ts.value1}</Table.Cell>
      <Table.Cell>{ts.value2}</Table.Cell>
      <Table.Cell>{ts.value3}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Segment>
      <Dimmer active={props.loading}>
        <Loader>Henter toppscorere</Loader>
      </Dimmer>
      <h1>Toppscorere</h1>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Posisjon</Table.HeaderCell>
            <Table.HeaderCell>Navn</Table.HeaderCell>
            <Table.HeaderCell>Lag</Table.HeaderCell>
            <Table.HeaderCell>Mål</Table.HeaderCell>
            <Table.HeaderCell>Kamper</Table.HeaderCell>
            <Table.HeaderCell>Snitt</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{topscorers}</Table.Body>
      </Table>
    </Segment>
  );
};

Topscorers.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      value1: PropTypes.number.isRequired,
      value2: PropTypes.number.isRequired,
      value3: PropTypes.number.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default Topscorers;
