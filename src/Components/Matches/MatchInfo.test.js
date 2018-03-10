import React from "react";
import { shallow, mount, render } from 'enzyme';
import '../../setupJest.js';
import MatchInfo from './MatchInfo';

describe('<MatchInfo />', () => {
	it('should format the referees name correctly', () => {
		const ref = {
			firstname: 'Martin',
			lastname: 'Atkinson'
		}

		const elem = shallow(<MatchInfo match={
			{
				name: 'Man. United - Liverpool'
			}
		} />);
		expect(elem.instance().formatRefereeName(ref)).toEqual('Martin Atkinson');
		ref.lastname = '';
		expect(elem.instance().formatRefereeName(ref)).toEqual('Martin');
		delete ref.lastname;
		expect(elem.instance().formatRefereeName(ref)).toEqual('Martin');
		ref.lastname = 'Moldeklev';
		delete ref.firstname;
		expect(elem.instance().formatRefereeName(ref)).toEqual('Moldeklev');
		function emptyRefObj() {
			elem.instance.formatRefereeName({});
		}
		expect(emptyRefObj).toThrow();
	})
})