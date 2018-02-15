import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundTable from './RoundTable';

class MainView extends Component {

	render() {
		return (
				<Grid columns="4" centered>
					<Grid.Column>
						<h2>{this.props.leagueName}</h2>
						<RoundTable tournamentId='230' seasonId='339'></RoundTable>
					</Grid.Column>
				</Grid>
			)
	}
}

export default MainView;