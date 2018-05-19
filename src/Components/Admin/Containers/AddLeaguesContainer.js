import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import altOmFotballLeagueService from "../../../services/altOmFotballLeagueService";

class AddLeaguesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      loading: true
    };
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

  render() {
    return (
      <Segment>
        <Header as="h2">Legg til ligaer</Header>
      </Segment>
    );
  }
}
export default AddLeaguesContainer;
