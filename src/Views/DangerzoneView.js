import React, { Component } from "react";
import { Grid, Dimmer, Loader, Segment, Message } from "semantic-ui-react";
import axios from "axios";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";

class DangerzoneView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				tippeligaen: [],
				obosligaen: []
			},
			loading: true
		};

		this.getPlayers();
	}

	getPlayers() {
		axios
			.get("/statistics/allDangerzonePlayers")
			.then(data => {
				this.setState({
					loading: false,
					data: {
						tippeligaen: data.data.pl,
						obosligaen: data.data.ch
					}
				});
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		const { tippeligaen, obosligaen } = this.state.data;
		return (
			<div>
				<FaresoneMenu />
				<Grid columns={2}>
					<Grid.Column>
						<Segment>
							<Dimmer active={this.state.loading}>
								<Loader>
									Henter spiller for Eliteserien og
									OBOS-ligaen
								</Loader>
							</Dimmer>
							<Message info>
								Tippeligaen-spillere: {tippeligaen.length} -
								OBOS-ligaen-spillere: {obosligaen.length}
							</Message>
						</Segment>
					</Grid.Column>

					<Grid.Column />
				</Grid>
			</div>
		);
	}
}

export default DangerzoneView;
