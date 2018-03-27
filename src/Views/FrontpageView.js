import React from "react";
import PropTypes from "prop-types";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import FirstSteps from "../Components/ProcedureSteps/FirstSteps";
import LeagueChooser from "../Components/LeagueChooser/LeagueChooser";

const FrontpageView = props => (
  <div>
    <FaresoneMenu switchLeagueName={props.switchLeagueName} />
    <FirstSteps />
    <LeagueChooser
      leagues={props.leagues}
      switchLeagueName={props.switchLeagueName}
      {...props}
    />
  </div>
);

FrontpageView.propTypes = {
  switchLeagueName: PropTypes.func.isRequired,
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tournamentId: PropTypes.number.isRequired,
      seasonId: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

export default FrontpageView;
