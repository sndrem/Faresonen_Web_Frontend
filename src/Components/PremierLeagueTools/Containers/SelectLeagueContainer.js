import React from "react";
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

export default SelectLeagueContainer;
