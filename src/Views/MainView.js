import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundTable from '../Components/RoundTable';

class MainView extends Component {

	render() {
		return (
				<Grid columns="4" centered>
					<Grid.Column>
						<h2>{this.props.leagueName}</h2>
						<RoundTable tournamentId={this.props.tournamentId} seasonId={this.props.seasonId}></RoundTable>
					</Grid.Column>
				</Grid>
			)
	}
}

export default MainView;