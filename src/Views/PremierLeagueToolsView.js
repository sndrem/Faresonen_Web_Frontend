import React from "react";
import PropTypes from "prop-types";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import TypeOfGraphicSubMenu from "../Components/PremierLeagueTools/TypeOfGraphicSubMenu";
import SelectLeagueContainer from "../Components/PremierLeagueTools/Containers/SelectLeagueContainer";

const PremierLeagueToolsView = props => (
  <div>
    <FaresoneMenu />
    <TypeOfGraphicSubMenu
      updateActiveItem={props.updateActiveItem}
      activeItem={props.activeItem}
    />
    <SelectLeagueContainer
      leagues={props.leagues}
      setSelectedLeague={props.setSelectedLeague}
      selectedLeague={props.selectedLeague}
    />
    {props.graphicComponent}
  </div>
);
PremierLeagueToolsView.propTypes = {
  activeItem: PropTypes.string.isRequired,
  updateActiveItem: PropTypes.func.isRequired,
  graphicComponent: PropTypes.node.isRequired
};
export default PremierLeagueToolsView;
