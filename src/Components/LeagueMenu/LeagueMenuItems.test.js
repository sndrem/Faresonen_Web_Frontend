import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import LeagueMenuItems from './LeagueMenuItems';
import { Menu } from 'semantic-ui-react';
import '../../setupJest.js';

describe('<LeagueMenuItems />', () => {
	it('It should render three <Menu.Item /> components', () => {
		const elem = shallow(<LeagueMenuItems switchLeagueName={() => {}} />);
		expect(elem.find(Menu.Item).length).toBe(3);	
	})


})

describe('<Menu.Item />', () => {
	it('should contain the correct data', () => {
		const elem = shallow(<LeagueMenuItems switchLeagueName={() => {}} />);
		// console.dir(elem.props().children);
		const eliteserieItem = elem.props().children[0];
		expect(eliteserieItem.props.name).toEqual('eliteserien');
		expect(eliteserieItem.props['data-tournamentid']).toEqual('1');
	})

	it('should have an onclick event', () => {
		const buttonClick = sinon.spy();
		const elem = shallow(<LeagueMenuItems switchLeagueName={buttonClick} />);
		const firstMenu = elem.find(Menu.Item).first();
		elem.find(Menu.Item).first().simulate('click', {
			target: {
				dataset: {
					tournamentid: firstMenu.props()['data-tournamentid'],
					seasonid: firstMenu.props()['data-seasonid']
				},
				textContent: firstMenu.props().children
			}
		});
		expect(buttonClick.firstCall.args).toEqual(['Eliteserien', '1', '340'])

	})
})