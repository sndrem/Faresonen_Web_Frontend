import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import moment from 'moment-with-locales-es6';
import axios from 'axios';
moment.locale('no');

class MatchInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			matchName: props.match.name,
			channel: '',
			stadium: '',
			startDate: new Date(props.match.starttime).toLocaleDateString(),
			startTime: new Date(props.match.starttime).toLocaleTimeString()
		}
		
		axios.all([this.getChannelAndStadium(props.match)])
			.then(axios.spread((data) => {
			data.channel.then(channel => this.setState({ channel: channel.data.name }));
			data.stadium.then(stadium => this.setState({ stadium: stadium.data.name }));
		}));
	}

	getChannelAndStadium(match) {
		return { 
			channel: this.getChannel(match),
			stadium: this.getStadium(match) 
		}
	}

	getChannel(match) {
		return axios.get(match.channel['@uri']);
	}

	getStadium(match) {
		return axios.get(match.stadium['@uri'])
	}



	render() {
		return (
				<Item>
					<Item.Content>
						<Item.Header>{this.state.matchName}, {this.state.stadium}</Item.Header>
						<Item.Meta>{this.state.startDate} - Avspark kl. {this.state.startTime} på {this.state.channel}</Item.Meta>
					</Item.Content>
				</Item>
			)
	}
}

export default MatchInfo;