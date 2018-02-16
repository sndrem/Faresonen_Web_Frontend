import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import tools from '../Tools/tools';
import axios from 'axios';

class NextMatchInfo extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			matchInfo: props.matchInfo,
			stadium: '',
			channel: '',
			date: tools.getDate(props.matchInfo.starttime),
			time: tools.getTime(props.matchInfo.starttime)
		}

		axios.all([tools.getChannelAndStadium(props.matchInfo)])
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
			<Table.Row>
				<Table.Cell>{this.state.date}</Table.Cell>
				<Table.Cell>{this.state.time}</Table.Cell>
				<Table.Cell>RUNDE XXX</Table.Cell>
				<Table.Cell>{this.state.matchInfo.name}</Table.Cell>
				<Table.Cell>{this.state.channel}</Table.Cell>
			</Table.Row>
		);
	}
}

export default NextMatchInfo;