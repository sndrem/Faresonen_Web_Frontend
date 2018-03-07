import React from "react";
import LeagueChooser from './LeagueChooser';
import data from '../../data/leagues';
import { shallow } from 'enzyme';
import '../../setupJest.js';

describe('LeagueChooser', () => {
	const elem = shallow(<LeagueChooser leagues={data.leagues} />);
	describe('League props should have data about leagues', () => {
		it('should be rendered a child component for each league defined', () => {
			expect(elem.props().children.length).toEqual(data.leagues.length);	
		})
		
	})
})