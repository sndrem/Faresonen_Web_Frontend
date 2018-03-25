import React from "react";
import PropTypes from "prop-types";
import { Statistic } from "semantic-ui-react";

const DangerzoneStatistics = props => (
  <Statistic.Group widths="three">
    {props.socketConnected}
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
  socketConnected: PropTypes.element.isRequired,
  eliteserien: PropTypes.number.isRequired,
  obosligaen: PropTypes.number.isRequired
};
export default DangerzoneStatistics;
