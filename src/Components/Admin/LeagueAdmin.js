import React, { Component } from "react";
import { Button, Segment, Divider, Header } from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";
import FirebaseService from "../../services/firebaseService";

class LeagueAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      loading: true
    };
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const service = new FirebaseService();
    service.getLeagues().then(leagues => {
      this.setState({ leagues, loading: false });
    });
  }

  logOut = e => {
    e.preventDefault();
    firebaseConfig.auth().signOut();
  };

  render() {
    const { leagues, loading } = this.state;
    return (
      <Segment>
        <p>
          Dette er admin-sidene til Faresonen. Her kan du opprette, endre og
          slette ligaer
        </p>
        <Button onClick={this.logOut}>Logg ut</Button>
        <Divider />
        <Header as="h2">Ligaer</Header>
        {loading ? <p>Henter ligaer...</p> : ""}
        {leagues.map(league => {
          return <p>{league.name}</p>;
        })}
      </Segment>
    );
  }
}
export default LeagueAdmin;
