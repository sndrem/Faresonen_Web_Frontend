import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import moment from 'moment-with-locales-es6';
import axios from 'axios';
import tools from '../Tools/tools';
moment.locale('no');

console.log(tools);

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
		
		axios.all([tools.getChannelAndStadium(props.match)])
			.then(axios.spread((data) => {
			if(data.channel) {
				data.channel.then(channel => this.setState({ channel: channel.data.name }));	
			} else {
				this.setState({
					channel: 'Kanal ikke klar'
				})
			}

			if(data.stadium) {
				data.stadium.then(stadium => this.setState({ stadium: stadium.data.name }));	
			} else {
				this.setState({
					stadium: 'Stadion klar'
				})
			}
			
			
		}));
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