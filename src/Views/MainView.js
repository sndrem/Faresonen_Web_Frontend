import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundList from '../Components/RoundList/RoundList';
import Menu from '../Components/Menu/Menu';
import Steps from '../Components/ProcedureSteps/Steps';

class MainView extends Component {
	constructor(props) {
		super(props);
		console.log(props.match.params)
	}


render() {
	return (
		<div>
			<Menu />
       	  	<Steps className='no-print' league={this.props.leagueInfo.leagueName} />
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