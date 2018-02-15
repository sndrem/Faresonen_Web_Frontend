import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';
import './RoundTable.css';

class RoundTable extends Component {
	state = {
		rounds: [
			{
			uri:"http://api.tv2.no/sport/resources/rounds/150755/",
			created: "2017-06-14T10:16:36.183+02:00",
			updated: "2017-07-06T13:03:36.209+02:00",
			version: "4",
			enddate: "2017-08-18T00:00:00+02:00",
			id: "150755",
			name: "1. runde",
			roundNo: "1",
			matches:{
			uri: "http://api.tv2.no/sport/resources/rounds/150755/matches/"
			}
		},
		{
			uri:"http://api.tv2.no/sport/resources/rounds/150756/",
			created: "2017-06-14T10:16:36.183+02:00",
			updated: "2017-07-06T13:03:36.209+02:00",
			version: "4",
			enddate: "2017-08-18T00:00:00+02:00",
			id: "150755",
			name: "2. runde",
			roundNo: "2",
			matches:{
			uri: "http://api.tv2.no/sport/resources/rounds/150755/matches/"
			}
		}
		]
	};
	
	render() {
		const roundElements = this.state.rounds.map(r => {
			return 	<List.Item>
						<Button color='blue' className="round-buttons" key={r.uri} fluid>
							{r.name}
						</Button>
					</List.Item>
		});
		return (
				<List>
					{ roundElements }
				</List>
			)
	}
}

export default RoundTable;