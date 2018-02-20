import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundList from '../Components/RoundList/RoundList';
import Menu from '../Components/Menu/Menu';
import Steps from '../Components/ProcedureSteps/Steps';

class MainView extends Component {
	constructor(props) {
		super(props);
		console.log(props.match.params);
	}


render() {
	const { leagueName, tournamentId, seasonId } = this.props.match.params;
	return (
		<div>
			<Menu />
       	  	<Steps className='no-print' league={leagueName} />
			<Grid columns="4" centered>
				<Grid.Column>
					<h2>{leagueName}</h2>
					<RoundList history={this.props.history} leagueName={leagueName} tournamentId={tournamentId} seasonId={seasonId}></RoundList>
				</Grid.Column>
			</Grid>
		</div>
		)
	}
}

export default MainView;