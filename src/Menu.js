import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class FaresoneMenu extends Component {

	state = {}
  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  	handleSwitchLeagueNameClick = (e) => {
  		const leagueName = e.target.textContent;
  		this.props.switchLeagueName(leagueName);
  	}

	render() {
		const { activeItem } = this.state
		return (
			<Menu>
	            <Menu.Item 
	              name='eliteserien'
	              active={activeItem === 'eliteserien'}
	              onClick={this.handleSwitchLeagueNameClick}>
	              Eliteserien
	            </Menu.Item>
	             <Menu.Item 
	              name='OBOS-ligaen'
	              active={activeItem === 'OBOS-ligaen'}
	              onClick={this.handleSwitchLeagueNameClick}>
	              OBOS-ligaen
	            </Menu.Item>
	          </Menu>
	        )
	}
}

export default FaresoneMenu;