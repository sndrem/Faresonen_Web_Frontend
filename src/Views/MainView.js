import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import RoundList from "../Components/RoundList/RoundList";
import Menu from "../Components/Menu/Menu";
import Steps from "../Components/ProcedureSteps/Steps";

function MainView(props) {
	const { leagueName, tournamentId, seasonId } = props.match.params;
	return (
		<div>
			<Menu />
			<Steps className="no-print" league={leagueName} />
			<Grid columns="4" centered>
				<Grid.Column>
					<h2>{leagueName}</h2>
					<RoundList
						history={props.history}
						leagueName={leagueName}
						tournamentId={tournamentId}
						seasonId={seasonId}
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
