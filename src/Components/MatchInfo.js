import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import axios from 'axios';

class MatchInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			matchName: props.match.name,
			channel: '',
			stadium: '',
			starttime: props.match.starttime
		}

		axios.all([this.getChannelAndStadium(props.match)])
			.then(axios.spread((data) => {
			data.channel.then(channel => this.setState({ channel: channel.data.name }));
			data.stadium.then(stadium => this.setState({ stadium: stadium.data.name }));
		}));
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps, ' yeyeyeye');
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
		console.log(this.state);
		return (
				<Item>
					<Item.Content>
						<Item.Header>{this.state.matchName}, {this.state.channel}</Item.Header>
						<Item.Meta>{this.state.starttime}</Item.Meta>
					</Item.Content>
				</Item>
			)
	}
}

export default MatchInfo;