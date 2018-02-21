import React, { Component } from 'react';
import Menu from '../Components/Menu/Menu'
import FirstSteps from '../Components/ProcedureSteps/FirstSteps';
import LeagueChooser from '../Components/LeagueChooser/LeagueChooser';
import Leagues from '../Data/leagues';

class FrontpageView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: Leagues
		}
	}

	render() {
		return (
			<div>
				<Menu />
				<FirstSteps />
				<LeagueChooser leagues={this.state.data.leagues} switchLeagueName={this.props.switchLeagueName} {...this.props} />
			</div>
		)
	}
}

export default FrontpageView;