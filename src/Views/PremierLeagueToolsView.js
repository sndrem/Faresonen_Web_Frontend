import React, { Component } from "react";
import PropTypes from "prop-types";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import TypeOfGraphicSubMenu from "../Components/PremierLeagueTools/TypeOfGraphicSubMenu";

const PremierLeagueToolsView = props => (
  <div>
    <FaresoneMenu />
    <TypeOfGraphicSubMenu
      updateActiveItem={props.updateActiveItem}
      activeItem={props.activeItem}
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
