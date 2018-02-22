import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import LeagueMenuItems from "../LeagueMenu/LeagueMenuItems";

class FaresoneMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLeague: this.props.showLeagues
		};
	}

	render() {
		let leagueMenu = null;
		if (this.state.showLeague) {
			leagueMenu = (
				<LeagueMenuItems
					switchLeagueName={this.props.switchLeagueName}
				/>
			);
		}
		return (
			<div className="no-print">
				<h1>Faresonen</h1>
				<Menu>
					<Link to="/">
						<Menu.Item name="home">Hjem</Menu.Item>
					</Link>
					{leagueMenu}
				</Menu>
			</div>
		);
	}
}

FaresoneMenu.propTypes = {
	switchLeagueName: PropTypes.func.isRequired,
	showLeagues: PropTypes.bool.isRequired
};

export default FaresoneMenu;
