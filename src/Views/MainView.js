import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import RoundList from "../Components/RoundList/RoundList";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import Steps from "../Components/ProcedureSteps/Steps";

function MainView(props) {
	const { leagueName, tournamentId, seasonId } = props.match.params;
	return (
		<div>
			<FaresoneMenu />
			<Steps className="no-print" league={leagueName} />
			<Grid columns="4" centered>
				<Grid.Column>
					<h2>{leagueName}</h2>
					<RoundList
						history={props.history}
						leagueName={leagueName}
						tournamentId={parseInt(tournamentId, 10)}
						seasonId={parseInt(seasonId, 10)}
					/>
				</Grid.Column>
			</Grid>
		</div>
	);
}

MainView.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.object.isRequired
	}).isRequired,
	history: PropTypes.object.isRequired
};

export default MainView;
