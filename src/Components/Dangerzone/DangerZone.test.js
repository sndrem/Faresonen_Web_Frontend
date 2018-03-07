import React from "react";
import Dangerzone from './Dangerzone';
import { shallow } from 'enzyme';
import '../../setupJest.js';

describe('Dangerzone', () => {
	describe('teams should be sorted alphabetically', () => {
		it('should return a list of alphabetically sorted teams', () => {
			let teams = [
				{ name: 'Brann'},
				{ name: 'Start'},
				{ name: 'Vålerenga'},
				{ name: 'Bodø/Glimt'}
			]

			teams = Dangerzone.sortTeams(teams);
			expect(teams).toEqual([
				{ name: 'Bodø/Glimt'},
				{ name: 'Brann'},
				{ name: 'Start'},
				{ name: 'Vålerenga'}
			]);	
		})
		
	})

	describe('players with even number of yellow cards should be returned', () => {
		it('should filter out players with odd number yellow cards', () => {
			const teams = 
				{
					'Brann': {
						players: [
							{ 
								name: 'Ole',
								value1: 3
							},
							{ 
								name: 'Petter',
								value1: -1
							},
							{ 
								name: 'Sindre',
								value1: 0
							},
							{ 
								name: 'Nikko',
								value1: 2
							}
						]
					}
				}
			

			const filtered = Dangerzone.filterPlayers(teams);
			expect(filtered).toEqual([
				{
					'name': 'Brann',
					players: [{name: 'Nikko', value1: 2}]
				}
			])
		})
	})
})