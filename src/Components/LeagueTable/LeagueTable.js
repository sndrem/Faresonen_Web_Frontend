import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Segment, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import LeagueTableItem from "./LeagueTableItem";

const LeagueTable = ({ tableColors, table = [] }) => {
  const [leagueName, setLeagueName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      if (table && table.length > 1) {
        getLeagueName(table[0].tournament["@uri"]);
      }
    },
    [table]
  );

  const getLeagueName = tournamentUri => {
    axios.get(tournamentUri).then(data => {
      setLeagueName(data.data.name);
      setLoading(false);
    });
  };

  const createLeagueTableItems = (data, index) => {
    if (tableColors.greens.includes(index)) {
      return (
        <LeagueTableItem
          rowColor="green-table"
          key={data.id}
          tableData={data}
        />
      );
    }
    if (tableColors.reds.includes(index)) {
      return (
        <LeagueTableItem rowColor="red-table" key={data.id} tableData={data} />
      );
    }
    return <LeagueTableItem key={data.id} tableData={data} />;
  };

  const tableElements = table.map((t, index) =>
    createLeagueTableItems(t, index)
  );

  return (
    <Segment className="print">
      <Dimmer active={loading}>
        <Loader>Henter tabell</Loader>
      </Dimmer>
      <h1>Tabell: {leagueName}</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Lag</Table.HeaderCell>
            <Table.HeaderCell>K</Table.HeaderCell>
            <Table.HeaderCell>V</Table.HeaderCell>
            <Table.HeaderCell>U</Table.HeaderCell>
            <Table.HeaderCell>T</Table.HeaderCell>
            <Table.HeaderCell>+</Table.HeaderCell>
            <Table.HeaderCell>-</Table.HeaderCell>
            <Table.HeaderCell>+/-</Table.HeaderCell>
            <Table.HeaderCell>P</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{tableElements}</Table.Body>
      </Table>
    </Segment>
  );
};

LeagueTable.propTypes = {
  leagueName: PropTypes.string.isRequired,
  tableColors: PropTypes.shape({
    greens: PropTypes.arrayOf(PropTypes.number),
    reds: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  table: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LeagueTable;
