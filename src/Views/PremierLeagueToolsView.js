import React from "react";
import PropTypes from "prop-types";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import TypeOfGraphicSubMenu from "../Components/PremierLeagueTools/TypeOfGraphicSubMenu";
import SelectLeagueContainer from "../Components/PremierLeagueTools/Containers/SelectLeagueContainer";

const PremierLeagueToolsView = ({
  leagues,
  updateActiveItem,
  activeItem,
  setSelectedLeague,
  selectedLeague,
  graphicComponent
}) => (
  <div>
    <FaresoneMenu />
    <TypeOfGraphicSubMenu
      updateActiveItem={updateActiveItem}
      activeItem={activeItem}
    />
    <SelectLeagueContainer
      leagues={leagues}
      setSelectedLeague={setSelectedLeague}
      selectedLeague={selectedLeague}
    />
    {graphicComponent}
  </div>
);
PremierLeagueToolsView.propTypes = {
  activeItem: PropTypes.string.isRequired,
  updateActiveItem: PropTypes.func.isRequired,
  graphicComponent: PropTypes.node.isRequired,
  leagues: PropTypes.array.isRequired,
  setSelectedLeague: PropTypes.func.isRequired,
  selectedLeague: PropTypes.string.isRequired
};
export default PremierLeagueToolsView;
