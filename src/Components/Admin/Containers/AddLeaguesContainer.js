import React, { Component } from "react";
import axios from "axios";
import { Button, Segment, Header, Dropdown } from "semantic-ui-react";
import altOmFotballLeagueService from "../../../services/altOmFotballLeagueService";
import FirebaseService from "../../../services/firebaseService";

class AddLeaguesContainer extends Component {
  constructor(props) {
    super(props);
    this.service = new FirebaseService();
    this.state = {
      leagues: [],
      selectedLeagues: [],
      loading: true
    };
    this.addLeagues = this.addLeagues.bind(this);
    this.saveLeagues = this.saveLeagues.bind(this);
  }

  componentDidMount() {
    this.getLeagues();
  }

  getLeagues = () => {
    altOmFotballLeagueService.getAllLeagues().then(data => {
      this.setState({
        leagues: data.data.tournament
      });
    });
  };

  addLeagues = (e, { value: values }) => {
    // Get values and return promises for each
    const promises = values.map(value =>
      altOmFotballLeagueService.getLeagueData(value)
    );
    // Fetch data about each league
    axios.all(promises).then(data => {
      const leagueData = data.map(d => d.data);
      this.setState({
        selectedLeagues: leagueData
      });
    });
  };

  saveLeagues = () => {
    const leagues = {};
    this.state.selectedLeagues.forEach(league => {
      leagues[league.id] = league;
    });

    this.service.saveLeagues(leagues);
  };

  render() {
    const { leagues } = this.state;
    return (
      <Segment>
        <Header as="h2">Legg til ligaer</Header>
        <Dropdown
          placeholder="Velg ligaer"
          fluid
          multiple
          search
          selection
          onChange={this.addLeagues}
          options={leagues.map(league => {
            return {
              name: league.name,
              text: league.name,
              value: parseFloat(league.id)
            };
          })}
        />
        <Button
          disabled={this.state.selectedLeagues.length === 0}
          onClick={this.saveLeagues}
        >
          Lagre kamper til database
        </Button>
      </Segment>
    );
  }
}
export default AddLeaguesContainer;
