import axios from 'axios';
const tools = {
	getChannelAndStadium(match) {
		return { 
			channel: this.getChannel(match),
			stadium: this.getStadium(match) 
		}
	},

	getChannel(match) {
		if(match.channel) {
			return axios.get(match.channel['@uri']);	
		} else {
			return null;
		}
	},

	getStadium(match) {
		if(match.stadium) {
			return axios.get(match.stadium['@uri'])	
		} else {
			return null;
		}
	},

	getDate(datetime) {
		return new Date(datetime).toLocaleDateString();
	},

	getTime(datetime) {
		return new Date(datetime).toLocaleTimeString();
	}
}

export default tools;