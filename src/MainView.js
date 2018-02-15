import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundTable from './RoundTable';

class MainView extends Component {
	render() {
		return (
				<Grid columns="5" centered>
					<Grid.Column>
						<h2>Eliteserien</h2>
						<RoundTable></RoundTable>
					</Grid.Column>
				</Grid>
			)
	}
}

export default MainView;