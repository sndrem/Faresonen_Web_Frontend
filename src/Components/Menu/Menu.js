import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import LeagueMenuItems from '../LeagueMenu/LeagueMenuItems';

class FaresoneMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showLeague: this.props.showLeagues ? true : false
		}
	}

	render() {
		let leagueMenu = null;
		if(this.state.showLeague) {
			leagueMenu = <LeagueMenuItems switchLeagueName={this.props.switchLeagueName} />;
		}
		return (
			<div>
				<h1>Faresonen</h1>
				<Menu>
					<Link to='/'>
		            	<Menu.Item
		            	name='home'>
		            		Hjem
		            	</Menu.Item>
		            </Link>
		            { leagueMenu }

		          </Menu>
	          </div>
	        )
	}
}

export default FaresoneMenu;