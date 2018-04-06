import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import RoundListContainer from "../Components/RoundList/Containers/RoundListContainer";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import Steps from "../Components/ProcedureSteps/Steps";

const MainView = props => {
  const { leagueName, tournamentId, seasonId } = props.match.params;
  return (
    <div>
      <FaresoneMenu />
      <Steps className="no-print" league={leagueName} />
      <Grid columns="4" centered>
        <Grid.Column>
          <h2>{leagueName}</h2>
          <RoundListContainer
            leagueName={leagueName}
            tournamentId={parseInt(tournamentId, 10)}
            seasonId={parseInt(seasonId, 10)}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
};

MainView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired
};

export default MainView;
