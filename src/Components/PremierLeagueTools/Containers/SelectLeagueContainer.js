import React from "react";
import PropTypes from "prop-types";
import SelectLeague from "../SelectLeague";

const SelectLeagueContainer = ({
  setSelectedLeague,
  selectedLeague,
  leagues
}) => (
  <SelectLeague
    leagues={leagues}
    setSelectedLeague={setSelectedLeague}
    selectedLeague={selectedLeague}
  />
);
SelectLeagueContainer.propTypes = {
  setSelectedLeague: PropTypes.func.isRequired,
  selectedLeague: PropTypes.string.isRequired,
  leagues: PropTypes.array.isRequired
};
export default SelectLeagueContainer;
