import React, { Component } from "react";
import axios from "axios";
import { Message, Segment, Dimmer, Loader } from "semantic-ui-react";
import moment from "moment";
import LiveTeaseGenerator from "../LiveTeaseGenerator";
import leagues from "../../../Data/leagues";

class PremierLeagueToolsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
      error: ""
    };
  }

  componentDidMount() {
    // Fetch matches
    const { tournamentId, seasonId } = leagues.leagues[2];
    if (!tournamentId || !seasonId) {
      console.log(
        `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`
      );
      this.setState({
        error: `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`,
        loading: false
      });
    }
    this.getMatches(tournamentId, seasonId);
  }

  getMatches = (tournamentId, seasonId) => {
    axios
      .get(`/matches/${tournamentId}/${seasonId}`)
      .then(data => {
        this.setState({
          data: data.data,
          loading: false,
          error: ""
        });
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          data: {},
          loading: false,
          error:
            "Det var et problem ved henting av kamper. Sjekk at du er koblet til internett"
        });
      });
  };

  filterDoneMatches = matches =>
    matches.filter(match => match.confirmed !== "true");

  mapMatches = matches =>
    matches.map(match => ({
      key: match.name,
      value: match.name,
      text: `${match.name} - ${moment(match.starttime).format(
        "DD.MM.YYYY [Kl.] HH:mm"
      )}`
    }));

  render() {
    if (this.state.error) {
      return <Message warning>{this.state.error}</Message>;
    }

    let { match } = this.state.data;
    if (!match) {
      match = [];
    }
    let filtered = this.filterDoneMatches(match);
    console.log(filtered);
    filtered = this.mapMatches(filtered);

    return (
      <Segment>
        <Dimmer active={this.state.loading}>
          <Loader>henter kamper</Loader>
        </Dimmer>
        <LiveTeaseGenerator matches={filtered} />
      </Segment>
    );
  }
}
export default PremierLeagueToolsContainer;
