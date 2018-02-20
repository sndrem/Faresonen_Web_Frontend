import React, { Component } from 'react';
import Menu from '../Components/Menu/Menu'
import FirstSteps from '../Components/ProcedureSteps/FirstSteps';
import LeagueChooser from '../Components/LeagueChooser/LeagueChooser';
import EliteserieImage from '../assets/images/eliteserien.png';
import ObosligaenImage from '../assets/images/obosligaen.png';
import PremierLeagueImage from '../assets/images/premierleague.png';

class FrontpageView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				leagues: [
					{
						name: 'Eliteserien',
						tournamentId: 1,
						seasonId: 340,
						image: EliteserieImage
					},
					{
						name: 'OBOS-ligaen',
						tournamentId: 2,
						seasonId: 340,
						image: ObosligaenImage
					},
					{
						name: 'Premier League',
						tournamentId: 230,
						seasonId: 339,
						image: PremierLeagueImage
					},
					{
						name: 'Champions League',
						tournamentId: 6330,
						seasonId: 339,
						image: PremierLeagueImage
					}
				]
			}
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