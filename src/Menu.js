import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class FaresoneMenu extends Component {

	state = {}
  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state
		return (
			<Menu>
	            <Menu.Item 
	              name='eliteserien'
	              active={activeItem === 'eliteserien'}
	              onClick={this.handleItemClick}>
	              Eliteserien
	            </Menu.Item>
	             <Menu.Item 
	              name='OBOS-ligaen'
	              active={activeItem === 'OBOS-ligaen'}
	              onClick={this.handleItemClick}>
	              OBOS-ligaen
	            </Menu.Item>
	          </Menu>
	        )
	}
}

export default FaresoneMenu;