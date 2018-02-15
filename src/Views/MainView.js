import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import RoundTable from '../Components/RoundTable';
import Menu from '../Components/Menu';

class MainView extends Component {

	state = {
	    leagueName: 'Eliteserien',
	    tournamentId: 1,
	    seasonId: 340
	}



  switchLeagueName = (leagueName, tournamentId, seasonId) => {
    this.setState({ leagueName, tournamentId, seasonId});
  }  


render() {
	return (
		<div>
       	  	<Menu switchLeagueName={this.switchLeagueName.bind(this)}></Menu>
			<Grid columns="4" centered>
				<Grid.Column>
					<h2>{this.state.leagueName}</h2>
					<RoundTable history={this.props.history} tournamentId={this.state.tournamentId} seasonId={this.state.seasonId}></RoundTable>
				</Grid.Column>
			</Grid>
		</div>
		)
	}
}

export default MainView;