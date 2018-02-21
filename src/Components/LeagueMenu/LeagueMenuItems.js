import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class LeagueMenuItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: ""
		};
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handleSwitchLeagueNameClick = e => {
		const leagueName = e.target.textContent;
		const tournamentId = e.target.dataset.tournamentid;
		const seasonId = e.target.dataset.seasonid;
		this.props.switchLeagueName(leagueName, tournamentId, seasonId);
	};

	render() {
		return (
			<span>
				<Menu.Item
					name="eliteserien"
					onClick={this.handleSwitchLeagueNameClick}
					data-tournamentid="1"
					data-seasonid="340"
				>
					Eliteserien
				</Menu.Item>
				<Menu.Item
					name="OBOS-ligaen"
					onClick={this.handleSwitchLeagueNameClick}
					data-tournamentid="2"
					data-seasonid="340"
				>
					OBOS-ligaen
				</Menu.Item>
				<Menu.Item
					name="PremierLeague"
					onClick={this.handleSwitchLeagueNameClick}
					data-tournamentid="230"
					data-seasonid="339"
				>
					Premier League
				</Menu.Item>
			</span>
		);
	}
}

export default LeagueMenuItems;
