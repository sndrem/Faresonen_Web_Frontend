import React from "react";
import PropTypes from "prop-types";
import {Dropdown} from "semantic-ui-react";

const SelectLeague = ({leagues, setSelectedLeague, selectedLeague}) => (
  <Dropdown
    fluid
    search
    selection
    options={leagues}
    onChange={(e, {value}) => setSelectedLeague(value)}
    placeholder="Velg liga/turnering"
    value={selectedLeague}
  />
);

SelectLeague.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  setSelectedLeague: PropTypes.func.isRequired,
  selectedLeague: PropTypes.string.isRequired
};

export default SelectLeague;
