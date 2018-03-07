import tools from './tools';

describe('Utility tools', () => {
	describe('getTableColors for Eliteserien (leagueID = 1)', () => {
		it('returns the correct list of colors for Eliteserien', () => {
			const data = tools.getTableColors(1);
			expect(data).toEqual({
				greens: [0, 1, 2],
				reds: [14, 15]
			})
		})
	})

	describe('getTableColors for Premier League (leagueID = 230)', () => {
		it('returns the correct list of colors for Eliteserien', () => {
			const data = tools.getTableColors(230);
			expect(data).toEqual({
				greens: [0, 1, 2, 3],
				reds: [17, 18, 19]
			})
		})
	})
})