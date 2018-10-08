import React from "react";
import PropTypes from "prop-types";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import FirstSteps from "../Components/ProcedureSteps/FirstSteps";
import LeagueChooser from "../Components/LeagueChooser/LeagueChooser";

const FrontpageView = ({switchLeagueName, leagues, error, loading}) => (
  <div>
    <FaresoneMenu switchLeagueName={switchLeagueName} />
    <FirstSteps />
    {loading ? (
      <p>Henter ligaer...</p>
    ) : (
      <LeagueChooser
        leagues={leagues}
        switchLeagueName={switchLeagueName}
        {...this.props}
      />
    )}
    {error ? <p>{error}</p> : ""}
  </div>
);

FrontpageView.propTypes = {
  switchLeagueName: PropTypes.func.isRequired,
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      activeseason: PropTypes.shape({
        "@uri": PropTypes.string.isRequired
      })
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

export default FrontpageView;
