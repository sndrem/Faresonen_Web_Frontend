import React, { Component } from "react";
import { Item } from "semantic-ui-react";
import moment from "moment-with-locales-es6";
import axios from "axios";
import tools from "../../Tools/tools";
moment.locale("no");

class MatchInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matchName: props.match.name,
			channel: "",
			stadium: "",
			startDate: tools.getDate(props.match.starttime),
			startTime: tools.getTime(props.match.starttime),
			referee: ""
		};	
	}

	componentDidMount() {
		if (this.props.match.referee) {
			this.getReferee(this.props.match.referee["@uri"]);
		}
			axios.all([tools.getChannelAndStadium(this.props.match)]).then(
			axios.spread(data => {
				if (data.channel) {
					data.channel.then(channel =>
						this.setState({ channel: channel.data.name })
					);
				} else {
					this.setState({
						channel: "Kanal ikke klar"
					});
				}

				if (data.stadium) {
					data.stadium.then(stadium =>
						this.setState({ stadium: stadium.data.name })
					);
				} else {
					this.setState({
						stadium: "Stadion klar"
					});
				}
			})
		);
	}

	getReferee(refUri) {
		axios.get(refUri).then(data => {
			this.setState({
				referee: this.formatRefereeName(data.data)
			});
		});
	}

	formatRefereeName(ref) {
		if(ref.firstname && ref.lastname) {
			return `${ref.firstname} ${ref.lastname}`.trim();	
		} else if(ref.firstname) {
			return `${ref.firstname}`.trim();
		} else if (ref.lastname) {
			return `${ref.lastname}`.trim();
		} else throw new Error('Referee must have either firstname or lastname property');
		
	}

	render() {
		return (
			<Item>
				<Item.Content>
					<Item.Header>
						{this.state.matchName}, {this.state.stadium}
					</Item.Header>
					<Item.Meta>
						{this.state.startDate} - Avspark kl.{" "}
						{this.state.startTime} på {this.state.channel}
					</Item.Meta>
					{this.state.referee && (
						<Item.Meta className="float-right">
							Dommer: {this.state.referee}
						</Item.Meta>
					)}
				</Item.Content>
			</Item>
		);
	}
}

export default MatchInfo;
