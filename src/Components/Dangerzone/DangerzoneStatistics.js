import React from "react";
import PropTypes from "prop-types";
import { Statistic } from "semantic-ui-react";

const socketConnected = (connected = false) => {
  if (connected) {
    return (
      <Statistic>
        <Statistic.Value>
          <i className="green server icon" />
        </Statistic.Value>
        <Statistic.Label>Tilkoblet server</Statistic.Label>
      </Statistic>
    );
  }
  return (
    <Statistic>
      <Statistic.Value>
        <i className="red server icon" />
      </Statistic.Value>
      <Statistic.Label>Frakoblet server</Statistic.Label>
    </Statistic>
  );
};

const DangerzoneStatistics = props => (
  <Statistic.Group widths="three">
    {socketConnected(props.socketConnected)}
    <Statistic>
      <Statistic.Value>{props.eliteserien}</Statistic.Value>
      <Statistic.Label>Eliteserie-spillere</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value>{props.obosligaen}</Statistic.Value>
      <Statistic.Label>OBOSliga-spillere</Statistic.Label>
    </Statistic>
  </Statistic.Group>
);

DangerzoneStatistics.propTypes = {
  socketConnected: PropTypes.bool.isRequired,
  eliteserien: PropTypes.number.isRequired,
  obosligaen: PropTypes.number.isRequired
};
export default DangerzoneStatistics;
