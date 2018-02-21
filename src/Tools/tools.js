import axios from "axios";
const tools = {
	getChannelAndStadium(match) {
		return {
			channel: this.getChannel(match),
			stadium: this.getStadium(match)
		};
	},

	getChannel(match) {
		if (match.channel) {
			return axios.get(match.channel["@uri"]);
		} else {
			return null;
		}
	},

	getStadium(match) {
		if (match.stadium) {
			return axios.get(match.stadium["@uri"]);
		} else {
			return null;
		}
	},

	getDate(datetime) {
		return new Date(datetime).toLocaleDateString();
	},

	getTime(datetime) {
		return new Date(datetime).toLocaleTimeString();
	},

	getTableColors(leagueId) {
		let data = {
			greens: [],
			reds: []
		};

		switch (leagueId) {
			case 1:
				data.greens = [0, 1, 2];
				data.reds = [14, 15];
				return data;
			case 230:
				data.greens = [0, 1, 2, 3];
				data.reds = [17, 18, 19];
				return data;
			default:
				return data;
		}
	}
};

export default tools;
