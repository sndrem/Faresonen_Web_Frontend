import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundTable from '../Components/RoundTable';
import Menu from '../Components/Menu';

class MainView extends Component {


render() {
	return (
		<div>
       	  	<Menu switchLeagueName={this.props.switchLeagueName}></Menu>
			<Grid columns="4" centered>
				<Grid.Column>
					<h2>{this.props.leagueInfo.leagueName}</h2>
					<RoundTable history={this.props.history} tournamentId={this.props.leagueInfo.tournamentId} seasonId={this.props.leagueInfo.seasonId}></RoundTable>
				</Grid.Column>
			</Grid>
		</div>
		)
	}
}

export default MainView;