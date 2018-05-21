import React, { Component } from "react";
import { Segment, Header, Card, Dimmer, Loader } from "semantic-ui-react";
import FirebaseService from "../../../services/firebaseService";
import "./RemoveLeaguesContainer.css";

class RemoveLeaguesContainer extends Component {
  constructor(props) {
    super(props);
    this.service = new FirebaseService();
    this.state = {
      leagues: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getLeagues();
  }

  getLeagues() {
    this.service.getLeagues().then(leagues => {
      this.setState({ leagues, loading: false });
    });
  }

  removeLeague = event => {
    const { id } = event.target.dataset;
    this.removeLeagueFromState(parseFloat(id));
    this.service.removeLeague(id);
  };

  removeLeagueFromState = id => {
    const idFound = this.state.leagues.findIndex(
      league => parseFloat(league.id) === parseFloat(id)
    );
    if (idFound > -1) {
      this.state.leagues.splice(idFound, 1);
      this.setState({
        leagues: this.state.leagues
      });
    }
  };

  render() {
    const { leagues, loading } = this.state;
    return (
      <Segment>
        <Dimmer active={loading}>
          <Loader>Henter ligaer</Loader>
        </Dimmer>
        <Header as="h2">Fjern ligaer</Header>
        <Card.Group>
          {leagues.map(league => (
            <Card key={league.id}>
              <Card.Content>
                <Card.Header>{league.name}</Card.Header>
                <Card.Meta>ID: {league.id}</Card.Meta>
                <Card.Meta>
                  Aktiv sesong:{" "}
                  <a href={league.activeseason["@uri"]}>
                    {league.activeseason["@uri"]}
                  </a>
                </Card.Meta>
                <Card.Description
                  className="remove-league"
                  data-id={league.id}
                  onClick={this.removeLeague}
                >
                  Klikk her for å fjerne ligaen
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    );
  }
}
export default RemoveLeaguesContainer;
