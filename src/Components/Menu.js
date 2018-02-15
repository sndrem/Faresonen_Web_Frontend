import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class FaresoneMenu extends Component {

	state = {}
  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  	handleSwitchLeagueNameClick = (e) => {
  		const leagueName = e.target.textContent;
  		const tournamentId = e.target.dataset.tournamentid;
  		const seasonId = e.target.dataset.seasonid;
  		this.props.switchLeagueName(leagueName, tournamentId, seasonId);
  	}

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<h1>Faresonen</h1>
				<Menu>
					<Link to='/'>
		            	<Menu.Item
		            	name='home'
		            	active={activeItem === 'home'}>
		            		Hjem
		            	</Menu.Item>
		            </Link>
		            <Menu.Item 
		              name='eliteserien'
		              active={activeItem === 'eliteserien'}
		              onClick={this.handleSwitchLeagueNameClick}
		              data-tournamentid='1'
		              data-seasonid='340'>
		              Eliteserien
		            </Menu.Item>
		             <Menu.Item 
		              name='OBOS-ligaen'
		              active={activeItem === 'OBOS-ligaen'}
		              onClick={this.handleSwitchLeagueNameClick}
		              data-tournamentid='2'
		              data-seasonid='340'>
		              OBOS-ligaen
		            </Menu.Item>
		            <Menu.Item 
		              name='PremierLeague'
		              active={activeItem === 'PremierLeague'}
		              onClick={this.handleSwitchLeagueNameClick}
		              data-tournamentid='230'
		              data-seasonid='339'>
		              Premier League
		            </Menu.Item>

		          </Menu>
	          </div>
	        )
	}
}

export default FaresoneMenu;