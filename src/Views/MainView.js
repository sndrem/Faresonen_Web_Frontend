import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundList from '../Components/RoundList/RoundList';
import Menu from '../Components/Menu/Menu';

class MainView extends Component {


render() {
	console.log(this.props);
	return (
		<div>
       	  	<Menu switchLeagueName={this.props.switchLeagueName} showLeagues={true}></Menu>
			<Grid columns="4" centered>
				<Grid.Column>
					<h2>{this.props.leagueInfo.leagueName}</h2>
					<RoundList history={this.props.history} leagueName={this.props.leagueInfo.leagueName} tournamentId={this.props.leagueInfo.tournamentId} seasonId={this.props.leagueInfo.seasonId}></RoundList>
				</Grid.Column>
			</Grid>
		</div>
		)
	}
}

export default MainView;