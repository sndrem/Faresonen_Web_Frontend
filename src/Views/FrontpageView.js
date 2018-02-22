import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu from "../Components/Menu/Menu";
import FirstSteps from "../Components/ProcedureSteps/FirstSteps";
import LeagueChooser from "../Components/LeagueChooser/LeagueChooser";
import Leagues from "../Data/leagues";

class FrontpageView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: Leagues
		};
	}

	render() {
		return (
			<div>
				<Menu />
				<FirstSteps />
				<LeagueChooser
					leagues={this.state.data.leagues}
					switchLeagueName={this.props.switchLeagueName}
					{...this.props}
				/>
			</div>
		);
	}
}

FrontpageView.propTypes = {
	switchLeagueName: PropTypes.func.isRequired
};

export default FrontpageView;
